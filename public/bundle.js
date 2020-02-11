
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (var k in src)
            { tar[k] = src[k]; }
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file: file, line: line, column: column, char: char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            var lets = definition[2](fn(dirty));
            if (typeof $$scope.dirty === 'object') {
                var merged = [];
                var len = Math.max($$scope.dirty.length, lets.length);
                for (var i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (var i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                { iterations[i].d(detaching); }
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            { node.removeAttribute(attribute); }
        else if (node.getAttribute(attribute) !== value)
            { node.setAttribute(attribute, value); }
    }
    function set_svg_attributes(node, attributes) {
        for (var key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        var e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    var current_component;
    function set_current_component(component) {
        current_component = component;
    }

    var dirty_components = [];
    var binding_callbacks = [];
    var render_callbacks = [];
    var flush_callbacks = [];
    var resolved_promise = Promise.resolve();
    var update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    var flushing = false;
    var seen_callbacks = new Set();
    function flush() {
        if (flushing)
            { return; }
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (var i = 0; i < dirty_components.length; i += 1) {
                var component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                { binding_callbacks.pop()(); }
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (var i$1 = 0; i$1 < render_callbacks.length; i$1 += 1) {
                var callback = render_callbacks[i$1];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            var dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    var outroing = new Set();
    var outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                { return; }
            outroing.add(block);
            outros.c.push(function () {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        { block.d(1); }
                    callback();
                }
            });
            block.o(local);
        }
    }

    var globals = (typeof window !== 'undefined' ? window : global);

    function get_spread_update(levels, updates) {
        var update = {};
        var to_null_out = {};
        var accounted_for = { $$scope: 1 };
        var i = levels.length;
        while (i--) {
            var o = levels[i];
            var n = updates[i];
            if (n) {
                for (var key in o) {
                    if (!(key in n))
                        { to_null_out[key] = 1; }
                }
                for (var key$1 in n) {
                    if (!accounted_for[key$1]) {
                        update[key$1] = n[key$1];
                        accounted_for[key$1] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (var key$2 in o) {
                    accounted_for[key$2] = 1;
                }
            }
        }
        for (var key$3 in to_null_out) {
            if (!(key$3 in update))
                { update[key$3] = undefined; }
        }
        return update;
    }

    function bind(component, name, callback) {
        var index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        var ref = component.$$;
        var fragment = ref.fragment;
        var on_mount = ref.on_mount;
        var on_destroy = ref.on_destroy;
        var after_update = ref.after_update;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(function () {
            var new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push.apply(on_destroy, new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        var $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty) {
        if ( dirty === void 0 ) dirty = [-1];

        var parent_component = current_component;
        set_current_component(component);
        var prop_values = options.props || {};
        var $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: props,
            update: noop,
            not_equal: not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: dirty
        };
        var ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, function (i, ret) {
                var rest = [], len = arguments.length - 2;
                while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

                var value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        { $$.bound[i](value); }
                    if (ready)
                        { make_dirty(component, i); }
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                { transition_in(component.$$.fragment); }
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    var SvelteComponent = function SvelteComponent () {};

    SvelteComponent.prototype.$destroy = function $destroy () {
        destroy_component(this, 1);
        this.$destroy = noop;
    };
    SvelteComponent.prototype.$on = function $on (type, callback) {
        var callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return function () {
            var index = callbacks.indexOf(callback);
            if (index !== -1)
                { callbacks.splice(index, 1); }
        };
    };
    SvelteComponent.prototype.$set = function $set () {
        // overridden by instance, if it has props
    };

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.18.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target: target, node: node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target: target, node: node, anchor: anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node: node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            { dispatch_dev("SvelteDOMRemoveAttribute", { node: node, attribute: attribute }); }
        else
            { dispatch_dev("SvelteDOMSetAttribute", { node: node, attribute: attribute, value: value }); }
    }
    var SvelteComponentDev = /*@__PURE__*/(function (SvelteComponent) {
        function SvelteComponentDev(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            SvelteComponent.call(this);
        }

        if ( SvelteComponent ) SvelteComponentDev.__proto__ = SvelteComponent;
        SvelteComponentDev.prototype = Object.create( SvelteComponent && SvelteComponent.prototype );
        SvelteComponentDev.prototype.constructor = SvelteComponentDev;
        SvelteComponentDev.prototype.$destroy = function $destroy () {
            SvelteComponent.prototype.$destroy.call(this);
            this.$destroy = function () {
                console.warn("Component was already destroyed"); // eslint-disable-line no-console
            };
        };

        return SvelteComponentDev;
    }(SvelteComponent));

    /* src/Tailwindcss.svelte generated by Svelte v3.18.2 */

    function create_fragment(ctx) {
    	var block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx: ctx
    	});

    	return block;
    }

    var Tailwindcss = /*@__PURE__*/(function (SvelteComponentDev) {
    	function Tailwindcss(options) {
    		SvelteComponentDev.call(this, options);
    		init(this, options, null, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tailwindcss",
    			options: options,
    			id: create_fragment.name
    		});
    	}

    	if ( SvelteComponentDev ) Tailwindcss.__proto__ = SvelteComponentDev;
    	Tailwindcss.prototype = Object.create( SvelteComponentDev && SvelteComponentDev.prototype );
    	Tailwindcss.prototype.constructor = Tailwindcss;

    	return Tailwindcss;
    }(SvelteComponentDev));

    /* node_modules/svelte-awesome/components/svg/Path.svelte generated by Svelte v3.18.2 */

    var file = "node_modules/svelte-awesome/components/svg/Path.svelte";

    function create_fragment$1(ctx) {
    	var path;
    	var path_levels = [{ key: "path-" + /*id*/ ctx[0] }, /*data*/ ctx[1]];
    	var path_data = {};

    	for (var i = 0; i < path_levels.length; i += 1) {
    		path_data = assign(path_data, path_levels[i]);
    	}

    	var block = {
    		c: function create() {
    			path = svg_element("path");
    			set_svg_attributes(path, path_data);
    			add_location(path, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},
    		p: function update(ctx, ref) {
    			var dirty = ref[0];

    			set_svg_attributes(path, get_spread_update(path_levels, [
    				dirty & /*id*/ 1 && { key: "path-" + /*id*/ ctx[0] },
    				dirty & /*data*/ 2 && /*data*/ ctx[1]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) { detach_dev(path); }
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx: ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	var id = $$props.id; if ( id === void 0 ) id = "";
    	var data = $$props.data; if ( data === void 0 ) data = {};
    	var writable_props = ["id", "data"];

    	Object.keys($$props).forEach(function (key) {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") { console.warn(("<Path> was created with unknown prop '" + key + "'")); }
    	});

    	$$self.$set = function ($$props) {
    		if ("id" in $$props) { $$invalidate(0, id = $$props.id); }
    		if ("data" in $$props) { $$invalidate(1, data = $$props.data); }
    	};

    	$$self.$capture_state = function () {
    		return { id: id, data: data };
    	};

    	$$self.$inject_state = function ($$props) {
    		if ("id" in $$props) { $$invalidate(0, id = $$props.id); }
    		if ("data" in $$props) { $$invalidate(1, data = $$props.data); }
    	};

    	return [id, data];
    }

    var Path = /*@__PURE__*/(function (SvelteComponentDev) {
    	function Path(options) {
    		SvelteComponentDev.call(this, options);
    		init(this, options, instance, create_fragment$1, safe_not_equal, { id: 0, data: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Path",
    			options: options,
    			id: create_fragment$1.name
    		});
    	}

    	if ( SvelteComponentDev ) Path.__proto__ = SvelteComponentDev;
    	Path.prototype = Object.create( SvelteComponentDev && SvelteComponentDev.prototype );
    	Path.prototype.constructor = Path;

    	var prototypeAccessors = { id: { configurable: true },data: { configurable: true } };

    	prototypeAccessors.id.get = function () {
    		throw new Error("<Path>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.id.set = function (value) {
    		throw new Error("<Path>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.data.get = function () {
    		throw new Error("<Path>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.data.set = function (value) {
    		throw new Error("<Path>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	Object.defineProperties( Path.prototype, prototypeAccessors );

    	return Path;
    }(SvelteComponentDev));

    /* node_modules/svelte-awesome/components/svg/Polygon.svelte generated by Svelte v3.18.2 */

    var file$1 = "node_modules/svelte-awesome/components/svg/Polygon.svelte";

    function create_fragment$2(ctx) {
    	var polygon;
    	var polygon_levels = [{ key: "polygon-" + /*id*/ ctx[0] }, /*data*/ ctx[1]];
    	var polygon_data = {};

    	for (var i = 0; i < polygon_levels.length; i += 1) {
    		polygon_data = assign(polygon_data, polygon_levels[i]);
    	}

    	var block = {
    		c: function create() {
    			polygon = svg_element("polygon");
    			set_svg_attributes(polygon, polygon_data);
    			add_location(polygon, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, polygon, anchor);
    		},
    		p: function update(ctx, ref) {
    			var dirty = ref[0];

    			set_svg_attributes(polygon, get_spread_update(polygon_levels, [
    				dirty & /*id*/ 1 && { key: "polygon-" + /*id*/ ctx[0] },
    				dirty & /*data*/ 2 && /*data*/ ctx[1]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) { detach_dev(polygon); }
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx: ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	var id = $$props.id; if ( id === void 0 ) id = "";
    	var data = $$props.data; if ( data === void 0 ) data = {};
    	var writable_props = ["id", "data"];

    	Object.keys($$props).forEach(function (key) {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") { console.warn(("<Polygon> was created with unknown prop '" + key + "'")); }
    	});

    	$$self.$set = function ($$props) {
    		if ("id" in $$props) { $$invalidate(0, id = $$props.id); }
    		if ("data" in $$props) { $$invalidate(1, data = $$props.data); }
    	};

    	$$self.$capture_state = function () {
    		return { id: id, data: data };
    	};

    	$$self.$inject_state = function ($$props) {
    		if ("id" in $$props) { $$invalidate(0, id = $$props.id); }
    		if ("data" in $$props) { $$invalidate(1, data = $$props.data); }
    	};

    	return [id, data];
    }

    var Polygon = /*@__PURE__*/(function (SvelteComponentDev) {
    	function Polygon(options) {
    		SvelteComponentDev.call(this, options);
    		init(this, options, instance$1, create_fragment$2, safe_not_equal, { id: 0, data: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Polygon",
    			options: options,
    			id: create_fragment$2.name
    		});
    	}

    	if ( SvelteComponentDev ) Polygon.__proto__ = SvelteComponentDev;
    	Polygon.prototype = Object.create( SvelteComponentDev && SvelteComponentDev.prototype );
    	Polygon.prototype.constructor = Polygon;

    	var prototypeAccessors = { id: { configurable: true },data: { configurable: true } };

    	prototypeAccessors.id.get = function () {
    		throw new Error("<Polygon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.id.set = function (value) {
    		throw new Error("<Polygon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.data.get = function () {
    		throw new Error("<Polygon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.data.set = function (value) {
    		throw new Error("<Polygon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	Object.defineProperties( Polygon.prototype, prototypeAccessors );

    	return Polygon;
    }(SvelteComponentDev));

    /* node_modules/svelte-awesome/components/svg/Raw.svelte generated by Svelte v3.18.2 */

    var file$2 = "node_modules/svelte-awesome/components/svg/Raw.svelte";

    function create_fragment$3(ctx) {
    	var g;

    	var block = {
    		c: function create() {
    			g = svg_element("g");
    			add_location(g, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);
    			g.innerHTML = /*raw*/ ctx[0];
    		},
    		p: function update(ctx, ref) {
    			var dirty = ref[0];

    			if (dirty & /*raw*/ 1) { g.innerHTML = /*raw*/ ctx[0]; }		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) { detach_dev(g); }
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx: ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	var cursor = 870711;

    	function getId() {
    		cursor += 1;
    		return ("fa-" + (cursor.toString(16)));
    	}

    	var raw;
    	var data = $$props.data;

    	function getRaw(data) {
    		if (!data || !data.raw) {
    			return null;
    		}

    		var rawData = data.raw;
    		var ids = {};

    		rawData = rawData.replace(/\s(?:xml:)?id=["']?([^"')\s]+)/g, function (match, id) {
    			var uniqueId = getId();
    			ids[id] = uniqueId;
    			return (" id=\"" + uniqueId + "\"");
    		});

    		rawData = rawData.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, function (match, rawId, _, pointerId) {
    			var id = rawId || pointerId;

    			if (!id || !ids[id]) {
    				return match;
    			}

    			return ("#" + (ids[id]));
    		});

    		return rawData;
    	}

    	var writable_props = ["data"];

    	Object.keys($$props).forEach(function (key) {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") { console.warn(("<Raw> was created with unknown prop '" + key + "'")); }
    	});

    	$$self.$set = function ($$props) {
    		if ("data" in $$props) { $$invalidate(1, data = $$props.data); }
    	};

    	$$self.$capture_state = function () {
    		return { cursor: cursor, raw: raw, data: data };
    	};

    	$$self.$inject_state = function ($$props) {
    		if ("cursor" in $$props) { cursor = $$props.cursor; }
    		if ("raw" in $$props) { $$invalidate(0, raw = $$props.raw); }
    		if ("data" in $$props) { $$invalidate(1, data = $$props.data); }
    	};

    	$$self.$$.update = function () {
    		if ($$self.$$.dirty & /*data*/ 2) {
    			 $$invalidate(0, raw = getRaw(data));
    		}
    	};

    	return [raw, data];
    }

    var Raw = /*@__PURE__*/(function (SvelteComponentDev) {
    	function Raw(options) {
    		SvelteComponentDev.call(this, options);
    		init(this, options, instance$2, create_fragment$3, safe_not_equal, { data: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Raw",
    			options: options,
    			id: create_fragment$3.name
    		});

    		var ref = this.$$;
    		var ctx = ref.ctx;
    		var props = options.props || {};

    		if (/*data*/ ctx[1] === undefined && !("data" in props)) {
    			console.warn("<Raw> was created without expected prop 'data'");
    		}
    	}

    	if ( SvelteComponentDev ) Raw.__proto__ = SvelteComponentDev;
    	Raw.prototype = Object.create( SvelteComponentDev && SvelteComponentDev.prototype );
    	Raw.prototype.constructor = Raw;

    	var prototypeAccessors = { data: { configurable: true } };

    	prototypeAccessors.data.get = function () {
    		throw new Error("<Raw>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.data.set = function (value) {
    		throw new Error("<Raw>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	Object.defineProperties( Raw.prototype, prototypeAccessors );

    	return Raw;
    }(SvelteComponentDev));

    /* node_modules/svelte-awesome/components/svg/Svg.svelte generated by Svelte v3.18.2 */

    var file$3 = "node_modules/svelte-awesome/components/svg/Svg.svelte";

    function create_fragment$4(ctx) {
    	var svg;
    	var svg_class_value;
    	var svg_role_value;
    	var current;
    	var default_slot_template = /*$$slots*/ ctx[13].default;
    	var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

    	var block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) { default_slot.c(); }
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "class", svg_class_value = "fa-icon " + /*className*/ ctx[0] + " svelte-16zikvn");
    			attr_dev(svg, "x", /*x*/ ctx[8]);
    			attr_dev(svg, "y", /*y*/ ctx[9]);
    			attr_dev(svg, "width", /*width*/ ctx[1]);
    			attr_dev(svg, "height", /*height*/ ctx[2]);
    			attr_dev(svg, "aria-label", /*label*/ ctx[11]);
    			attr_dev(svg, "role", svg_role_value = /*label*/ ctx[11] ? "img" : "presentation");
    			attr_dev(svg, "viewBox", /*box*/ ctx[3]);
    			attr_dev(svg, "style", /*style*/ ctx[10]);
    			toggle_class(svg, "fa-spin", /*spin*/ ctx[4]);
    			toggle_class(svg, "fa-pulse", /*pulse*/ ctx[6]);
    			toggle_class(svg, "fa-inverse", /*inverse*/ ctx[5]);
    			toggle_class(svg, "fa-flip-horizontal", /*flip*/ ctx[7] === "horizontal");
    			toggle_class(svg, "fa-flip-vertical", /*flip*/ ctx[7] === "vertical");
    			add_location(svg, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, ref) {
    			var dirty = ref[0];

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 4096) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[12], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null));
    			}

    			if (!current || dirty & /*className*/ 1 && svg_class_value !== (svg_class_value = "fa-icon " + /*className*/ ctx[0] + " svelte-16zikvn")) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (!current || dirty & /*x*/ 256) {
    				attr_dev(svg, "x", /*x*/ ctx[8]);
    			}

    			if (!current || dirty & /*y*/ 512) {
    				attr_dev(svg, "y", /*y*/ ctx[9]);
    			}

    			if (!current || dirty & /*width*/ 2) {
    				attr_dev(svg, "width", /*width*/ ctx[1]);
    			}

    			if (!current || dirty & /*height*/ 4) {
    				attr_dev(svg, "height", /*height*/ ctx[2]);
    			}

    			if (!current || dirty & /*label*/ 2048) {
    				attr_dev(svg, "aria-label", /*label*/ ctx[11]);
    			}

    			if (!current || dirty & /*label*/ 2048 && svg_role_value !== (svg_role_value = /*label*/ ctx[11] ? "img" : "presentation")) {
    				attr_dev(svg, "role", svg_role_value);
    			}

    			if (!current || dirty & /*box*/ 8) {
    				attr_dev(svg, "viewBox", /*box*/ ctx[3]);
    			}

    			if (!current || dirty & /*style*/ 1024) {
    				attr_dev(svg, "style", /*style*/ ctx[10]);
    			}

    			if (dirty & /*className, spin*/ 17) {
    				toggle_class(svg, "fa-spin", /*spin*/ ctx[4]);
    			}

    			if (dirty & /*className, pulse*/ 65) {
    				toggle_class(svg, "fa-pulse", /*pulse*/ ctx[6]);
    			}

    			if (dirty & /*className, inverse*/ 33) {
    				toggle_class(svg, "fa-inverse", /*inverse*/ ctx[5]);
    			}

    			if (dirty & /*className, flip*/ 129) {
    				toggle_class(svg, "fa-flip-horizontal", /*flip*/ ctx[7] === "horizontal");
    			}

    			if (dirty & /*className, flip*/ 129) {
    				toggle_class(svg, "fa-flip-vertical", /*flip*/ ctx[7] === "vertical");
    			}
    		},
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) { detach_dev(svg); }
    			if (default_slot) { default_slot.d(detaching); }
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx: ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	var className = $$props.class;
    	var width = $$props.width;
    	var height = $$props.height;
    	var box = $$props.box;
    	var spin = $$props.spin; if ( spin === void 0 ) spin = false;
    	var inverse = $$props.inverse; if ( inverse === void 0 ) inverse = false;
    	var pulse = $$props.pulse; if ( pulse === void 0 ) pulse = false;
    	var flip = $$props.flip; if ( flip === void 0 ) flip = null;
    	var x = $$props.x; if ( x === void 0 ) x = undefined;
    	var y = $$props.y; if ( y === void 0 ) y = undefined;
    	var style = $$props.style; if ( style === void 0 ) style = undefined;
    	var label = $$props.label; if ( label === void 0 ) label = undefined;

    	var writable_props = [
    		"class",
    		"width",
    		"height",
    		"box",
    		"spin",
    		"inverse",
    		"pulse",
    		"flip",
    		"x",
    		"y",
    		"style",
    		"label"
    	];

    	Object.keys($$props).forEach(function (key) {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") { console.warn(("<Svg> was created with unknown prop '" + key + "'")); }
    	});

    	var $$slots = $$props.$$slots; if ( $$slots === void 0 ) $$slots = {};
    	var $$scope = $$props.$$scope;

    	$$self.$set = function ($$props) {
    		if ("class" in $$props) { $$invalidate(0, className = $$props.class); }
    		if ("width" in $$props) { $$invalidate(1, width = $$props.width); }
    		if ("height" in $$props) { $$invalidate(2, height = $$props.height); }
    		if ("box" in $$props) { $$invalidate(3, box = $$props.box); }
    		if ("spin" in $$props) { $$invalidate(4, spin = $$props.spin); }
    		if ("inverse" in $$props) { $$invalidate(5, inverse = $$props.inverse); }
    		if ("pulse" in $$props) { $$invalidate(6, pulse = $$props.pulse); }
    		if ("flip" in $$props) { $$invalidate(7, flip = $$props.flip); }
    		if ("x" in $$props) { $$invalidate(8, x = $$props.x); }
    		if ("y" in $$props) { $$invalidate(9, y = $$props.y); }
    		if ("style" in $$props) { $$invalidate(10, style = $$props.style); }
    		if ("label" in $$props) { $$invalidate(11, label = $$props.label); }
    		if ("$$scope" in $$props) { $$invalidate(12, $$scope = $$props.$$scope); }
    	};

    	$$self.$capture_state = function () {
    		return {
    			className: className,
    			width: width,
    			height: height,
    			box: box,
    			spin: spin,
    			inverse: inverse,
    			pulse: pulse,
    			flip: flip,
    			x: x,
    			y: y,
    			style: style,
    			label: label
    		};
    	};

    	$$self.$inject_state = function ($$props) {
    		if ("className" in $$props) { $$invalidate(0, className = $$props.className); }
    		if ("width" in $$props) { $$invalidate(1, width = $$props.width); }
    		if ("height" in $$props) { $$invalidate(2, height = $$props.height); }
    		if ("box" in $$props) { $$invalidate(3, box = $$props.box); }
    		if ("spin" in $$props) { $$invalidate(4, spin = $$props.spin); }
    		if ("inverse" in $$props) { $$invalidate(5, inverse = $$props.inverse); }
    		if ("pulse" in $$props) { $$invalidate(6, pulse = $$props.pulse); }
    		if ("flip" in $$props) { $$invalidate(7, flip = $$props.flip); }
    		if ("x" in $$props) { $$invalidate(8, x = $$props.x); }
    		if ("y" in $$props) { $$invalidate(9, y = $$props.y); }
    		if ("style" in $$props) { $$invalidate(10, style = $$props.style); }
    		if ("label" in $$props) { $$invalidate(11, label = $$props.label); }
    	};

    	return [
    		className,
    		width,
    		height,
    		box,
    		spin,
    		inverse,
    		pulse,
    		flip,
    		x,
    		y,
    		style,
    		label,
    		$$scope,
    		$$slots
    	];
    }

    var Svg = /*@__PURE__*/(function (SvelteComponentDev) {
    	function Svg(options) {
    		SvelteComponentDev.call(this, options);

    		init(this, options, instance$3, create_fragment$4, safe_not_equal, {
    			class: 0,
    			width: 1,
    			height: 2,
    			box: 3,
    			spin: 4,
    			inverse: 5,
    			pulse: 6,
    			flip: 7,
    			x: 8,
    			y: 9,
    			style: 10,
    			label: 11
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Svg",
    			options: options,
    			id: create_fragment$4.name
    		});

    		var ref = this.$$;
    		var ctx = ref.ctx;
    		var props = options.props || {};

    		if (/*className*/ ctx[0] === undefined && !("class" in props)) {
    			console.warn("<Svg> was created without expected prop 'class'");
    		}

    		if (/*width*/ ctx[1] === undefined && !("width" in props)) {
    			console.warn("<Svg> was created without expected prop 'width'");
    		}

    		if (/*height*/ ctx[2] === undefined && !("height" in props)) {
    			console.warn("<Svg> was created without expected prop 'height'");
    		}

    		if (/*box*/ ctx[3] === undefined && !("box" in props)) {
    			console.warn("<Svg> was created without expected prop 'box'");
    		}
    	}

    	if ( SvelteComponentDev ) Svg.__proto__ = SvelteComponentDev;
    	Svg.prototype = Object.create( SvelteComponentDev && SvelteComponentDev.prototype );
    	Svg.prototype.constructor = Svg;

    	var prototypeAccessors = { class: { configurable: true },width: { configurable: true },height: { configurable: true },box: { configurable: true },spin: { configurable: true },inverse: { configurable: true },pulse: { configurable: true },flip: { configurable: true },x: { configurable: true },y: { configurable: true },style: { configurable: true },label: { configurable: true } };

    	prototypeAccessors.class.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.class.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.width.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.width.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.height.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.height.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.box.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.box.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.spin.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.spin.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.inverse.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.inverse.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.pulse.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.pulse.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.flip.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.flip.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.x.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.x.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.y.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.y.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.style.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.style.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.label.get = function () {
    		throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.label.set = function (value) {
    		throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	Object.defineProperties( Svg.prototype, prototypeAccessors );

    	return Svg;
    }(SvelteComponentDev));

    /* node_modules/svelte-awesome/components/Icon.svelte generated by Svelte v3.18.2 */

    var Object_1 = globals.Object;
    var console_1 = globals.console;

    function get_each_context(ctx, list, i) {
    	var child_ctx = ctx.slice();
    	child_ctx[29] = list[i];
    	child_ctx[31] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	var child_ctx = ctx.slice();
    	child_ctx[32] = list[i];
    	child_ctx[31] = i;
    	return child_ctx;
    }

    // (4:4) {#if self}
    function create_if_block(ctx) {
    	var t0;
    	var t1;
    	var if_block2_anchor;
    	var current;
    	var if_block0 = /*self*/ ctx[0].paths && create_if_block_3(ctx);
    	var if_block1 = /*self*/ ctx[0].polygons && create_if_block_2(ctx);
    	var if_block2 = /*self*/ ctx[0].raw && create_if_block_1(ctx);

    	var block = {
    		c: function create() {
    			if (if_block0) { if_block0.c(); }
    			t0 = space();
    			if (if_block1) { if_block1.c(); }
    			t1 = space();
    			if (if_block2) { if_block2.c(); }
    			if_block2_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) { if_block0.m(target, anchor); }
    			insert_dev(target, t0, anchor);
    			if (if_block1) { if_block1.m(target, anchor); }
    			insert_dev(target, t1, anchor);
    			if (if_block2) { if_block2.m(target, anchor); }
    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*self*/ ctx[0].paths) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    					transition_in(if_block0, 1);
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, function () {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*self*/ ctx[0].polygons) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, function () {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*self*/ ctx[0].raw) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    					transition_in(if_block2, 1);
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, function () {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) { if_block0.d(detaching); }
    			if (detaching) { detach_dev(t0); }
    			if (if_block1) { if_block1.d(detaching); }
    			if (detaching) { detach_dev(t1); }
    			if (if_block2) { if_block2.d(detaching); }
    			if (detaching) { detach_dev(if_block2_anchor); }
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(4:4) {#if self}",
    		ctx: ctx
    	});

    	return block;
    }

    // (5:6) {#if self.paths}
    function create_if_block_3(ctx) {
    	var each_1_anchor;
    	var current;
    	var each_value_1 = /*self*/ ctx[0].paths;
    	var each_blocks = [];

    	for (var i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	var out = function (i) { return transition_out(each_blocks[i], 1, 1, function () {
    		each_blocks[i] = null;
    	}); };

    	var block = {
    		c: function create() {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*self*/ 1) {
    				each_value_1 = /*self*/ ctx[0].paths;
    				var i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					var child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) { return; }

    			for (var i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) { detach_dev(each_1_anchor); }
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(5:6) {#if self.paths}",
    		ctx: ctx
    	});

    	return block;
    }

    // (6:8) {#each self.paths as path, i}
    function create_each_block_1(ctx) {
    	var current;

    	var path = new Path({
    			props: {
    				id: /*i*/ ctx[31],
    				data: /*path*/ ctx[32]
    			},
    			$$inline: true
    		});

    	var block = {
    		c: function create() {
    			create_component(path.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(path, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			var path_changes = {};
    			if (dirty[0] & /*self*/ 1) { path_changes.data = /*path*/ ctx[32]; }
    			path.$set(path_changes);
    		},
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(path.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(path.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(path, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(6:8) {#each self.paths as path, i}",
    		ctx: ctx
    	});

    	return block;
    }

    // (10:6) {#if self.polygons}
    function create_if_block_2(ctx) {
    	var each_1_anchor;
    	var current;
    	var each_value = /*self*/ ctx[0].polygons;
    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	var out = function (i) { return transition_out(each_blocks[i], 1, 1, function () {
    		each_blocks[i] = null;
    	}); };

    	var block = {
    		c: function create() {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*self*/ 1) {
    				each_value = /*self*/ ctx[0].polygons;
    				var i;

    				for (i = 0; i < each_value.length; i += 1) {
    					var child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) { return; }

    			for (var i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) { detach_dev(each_1_anchor); }
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(10:6) {#if self.polygons}",
    		ctx: ctx
    	});

    	return block;
    }

    // (11:8) {#each self.polygons as polygon, i}
    function create_each_block(ctx) {
    	var current;

    	var polygon = new Polygon({
    			props: {
    				id: /*i*/ ctx[31],
    				data: /*polygon*/ ctx[29]
    			},
    			$$inline: true
    		});

    	var block = {
    		c: function create() {
    			create_component(polygon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(polygon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			var polygon_changes = {};
    			if (dirty[0] & /*self*/ 1) { polygon_changes.data = /*polygon*/ ctx[29]; }
    			polygon.$set(polygon_changes);
    		},
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(polygon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(polygon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(polygon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(11:8) {#each self.polygons as polygon, i}",
    		ctx: ctx
    	});

    	return block;
    }

    // (15:6) {#if self.raw}
    function create_if_block_1(ctx) {
    	var updating_data;
    	var current;

    	function raw_data_binding(value) {
    		/*raw_data_binding*/ ctx[27].call(null, value);
    	}

    	var raw_props = {};

    	if (/*self*/ ctx[0] !== void 0) {
    		raw_props.data = /*self*/ ctx[0];
    	}

    	var raw = new Raw({ props: raw_props, $$inline: true });
    	binding_callbacks.push(function () { return bind(raw, "data", raw_data_binding); });

    	var block = {
    		c: function create() {
    			create_component(raw.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(raw, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			var raw_changes = {};

    			if (!updating_data && dirty[0] & /*self*/ 1) {
    				updating_data = true;
    				raw_changes.data = /*self*/ ctx[0];
    				add_flush_callback(function () { return updating_data = false; });
    			}

    			raw.$set(raw_changes);
    		},
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(raw.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(raw.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(raw, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(15:6) {#if self.raw}",
    		ctx: ctx
    	});

    	return block;
    }

    // (1:0) <Svg label={label} width={width} height={height} box={box} style={combinedStyle}   spin={spin} flip={flip} inverse={inverse} pulse={pulse} class={className}>
    function create_default_slot(ctx) {
    	var if_block_anchor;
    	var current;
    	var default_slot_template = /*$$slots*/ ctx[26].default;
    	var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[28], null);
    	var if_block = /*self*/ ctx[0] && create_if_block(ctx);

    	var block = {
    		c: function create() {
    			if (!default_slot) {
    				if (if_block) { if_block.c(); }
    				if_block_anchor = empty();
    			}

    			if (default_slot) { default_slot.c(); }
    		},
    		m: function mount(target, anchor) {
    			if (!default_slot) {
    				if (if_block) { if_block.m(target, anchor); }
    				insert_dev(target, if_block_anchor, anchor);
    			}

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!default_slot) {
    				if (/*self*/ ctx[0]) {
    					if (if_block) {
    						if_block.p(ctx, dirty);
    						transition_in(if_block, 1);
    					} else {
    						if_block = create_if_block(ctx);
    						if_block.c();
    						transition_in(if_block, 1);
    						if_block.m(if_block_anchor.parentNode, if_block_anchor);
    					}
    				} else if (if_block) {
    					group_outros();

    					transition_out(if_block, 1, 1, function () {
    						if_block = null;
    					});

    					check_outros();
    				}
    			}

    			if (default_slot && default_slot.p && dirty[0] & /*$$scope*/ 268435456) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[28], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[28], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (!default_slot) {
    				if (if_block) { if_block.d(detaching); }
    				if (detaching) { detach_dev(if_block_anchor); }
    			}

    			if (default_slot) { default_slot.d(detaching); }
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(1:0) <Svg label={label} width={width} height={height} box={box} style={combinedStyle}   spin={spin} flip={flip} inverse={inverse} pulse={pulse} class={className}>",
    		ctx: ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	var current;

    	var svg = new Svg({
    			props: {
    				label: /*label*/ ctx[6],
    				width: /*width*/ ctx[7],
    				height: /*height*/ ctx[8],
    				box: /*box*/ ctx[10],
    				style: /*combinedStyle*/ ctx[9],
    				spin: /*spin*/ ctx[2],
    				flip: /*flip*/ ctx[5],
    				inverse: /*inverse*/ ctx[3],
    				pulse: /*pulse*/ ctx[4],
    				class: /*className*/ ctx[1],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx: ctx }
    			},
    			$$inline: true
    		});

    	var block = {
    		c: function create() {
    			create_component(svg.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(svg, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			var svg_changes = {};
    			if (dirty[0] & /*label*/ 64) { svg_changes.label = /*label*/ ctx[6]; }
    			if (dirty[0] & /*width*/ 128) { svg_changes.width = /*width*/ ctx[7]; }
    			if (dirty[0] & /*height*/ 256) { svg_changes.height = /*height*/ ctx[8]; }
    			if (dirty[0] & /*box*/ 1024) { svg_changes.box = /*box*/ ctx[10]; }
    			if (dirty[0] & /*combinedStyle*/ 512) { svg_changes.style = /*combinedStyle*/ ctx[9]; }
    			if (dirty[0] & /*spin*/ 4) { svg_changes.spin = /*spin*/ ctx[2]; }
    			if (dirty[0] & /*flip*/ 32) { svg_changes.flip = /*flip*/ ctx[5]; }
    			if (dirty[0] & /*inverse*/ 8) { svg_changes.inverse = /*inverse*/ ctx[3]; }
    			if (dirty[0] & /*pulse*/ 16) { svg_changes.pulse = /*pulse*/ ctx[4]; }
    			if (dirty[0] & /*className*/ 2) { svg_changes.class = /*className*/ ctx[1]; }

    			if (dirty[0] & /*$$scope, self*/ 268435457) {
    				svg_changes.$$scope = { dirty: dirty, ctx: ctx };
    			}

    			svg.$set(svg_changes);
    		},
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(svg.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svg.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(svg, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx: ctx
    	});

    	return block;
    }

    function normaliseData(data) {
    	if ("iconName" in data && "icon" in data) {
    		var normalisedData = {};
    		var faIcon = data.icon;
    		var name = data.iconName;
    		var width = faIcon[0];
    		var height = faIcon[1];
    		var paths = faIcon[4];
    		var iconData = { width: width, height: height, paths: [{ d: paths }] };
    		normalisedData[name] = iconData;
    		return normalisedData;
    	}

    	return data;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	var className = $$props.class; if ( className === void 0 ) className = "";
    	var data = $$props.data;
    	var scale = $$props.scale; if ( scale === void 0 ) scale = 1;
    	var spin = $$props.spin; if ( spin === void 0 ) spin = false;
    	var inverse = $$props.inverse; if ( inverse === void 0 ) inverse = false;
    	var pulse = $$props.pulse; if ( pulse === void 0 ) pulse = false;
    	var flip = $$props.flip; if ( flip === void 0 ) flip = null;
    	var label = $$props.label; if ( label === void 0 ) label = null;
    	var self = $$props.self; if ( self === void 0 ) self = null;
    	var style = $$props.style; if ( style === void 0 ) style = null;

    	// internal
    	var x = 0;

    	var y = 0;
    	var childrenHeight = 0;
    	var childrenWidth = 0;
    	var outerScale = 1;
    	var width;
    	var height;
    	var combinedStyle;
    	var box;

    	function init() {
    		if (typeof data === "undefined") {
    			return;
    		}

    		var normalisedData = normaliseData(data);
    		var ref = Object.keys(normalisedData);
    		var name = ref[0];
    		var icon = normalisedData[name];

    		if (!icon.paths) {
    			icon.paths = [];
    		}

    		if (icon.d) {
    			icon.paths.push({ d: icon.d });
    		}

    		if (!icon.polygons) {
    			icon.polygons = [];
    		}

    		if (icon.points) {
    			icon.polygons.push({ points: icon.points });
    		}

    		$$invalidate(0, self = icon);
    	}

    	function normalisedScale() {
    		var numScale = 1;

    		if (typeof scale !== "undefined") {
    			numScale = Number(scale);
    		}

    		if (isNaN(numScale) || numScale <= 0) {
    			// eslint-disable-line no-restricted-globals
    			console.warn("Invalid prop: prop \"scale\" should be a number over 0."); // eslint-disable-line no-console

    			return outerScale;
    		}

    		return numScale * outerScale;
    	}

    	function calculateBox() {
    		if (self) {
    			return ("0 0 " + (self.width) + " " + (self.height));
    		}

    		return ("0 0 " + width + " " + height);
    	}

    	function calculateRatio() {
    		if (!self) {
    			return 1;
    		}

    		return Math.max(self.width, self.height) / 16;
    	}

    	function calculateWidth() {
    		if (childrenWidth) {
    			return childrenWidth;
    		}

    		if (self) {
    			return self.width / calculateRatio() * normalisedScale();
    		}

    		return 0;
    	}

    	function calculateHeight() {
    		if (childrenHeight) {
    			return childrenHeight;
    		}

    		if (self) {
    			return self.height / calculateRatio() * normalisedScale();
    		}

    		return 0;
    	}

    	function calculateStyle() {
    		var combined = "";

    		if (style !== null) {
    			combined += style;
    		}

    		var size = normalisedScale();

    		if (size === 1) {
    			return combined;
    		}

    		if (combined !== "" && !combined.endsWith(";")) {
    			combined += "; ";
    		}

    		return (combined + "font-size: " + size + "em");
    	}

    	var writable_props = [
    		"class",
    		"data",
    		"scale",
    		"spin",
    		"inverse",
    		"pulse",
    		"flip",
    		"label",
    		"self",
    		"style"
    	];

    	Object_1.keys($$props).forEach(function (key) {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") { console_1.warn(("<Icon> was created with unknown prop '" + key + "'")); }
    	});

    	var $$slots = $$props.$$slots; if ( $$slots === void 0 ) $$slots = {};
    	var $$scope = $$props.$$scope;

    	function raw_data_binding(value) {
    		self = value;
    		$$invalidate(0, self);
    	}

    	$$self.$set = function ($$props) {
    		if ("class" in $$props) { $$invalidate(1, className = $$props.class); }
    		if ("data" in $$props) { $$invalidate(11, data = $$props.data); }
    		if ("scale" in $$props) { $$invalidate(12, scale = $$props.scale); }
    		if ("spin" in $$props) { $$invalidate(2, spin = $$props.spin); }
    		if ("inverse" in $$props) { $$invalidate(3, inverse = $$props.inverse); }
    		if ("pulse" in $$props) { $$invalidate(4, pulse = $$props.pulse); }
    		if ("flip" in $$props) { $$invalidate(5, flip = $$props.flip); }
    		if ("label" in $$props) { $$invalidate(6, label = $$props.label); }
    		if ("self" in $$props) { $$invalidate(0, self = $$props.self); }
    		if ("style" in $$props) { $$invalidate(13, style = $$props.style); }
    		if ("$$scope" in $$props) { $$invalidate(28, $$scope = $$props.$$scope); }
    	};

    	$$self.$capture_state = function () {
    		return {
    			className: className,
    			data: data,
    			scale: scale,
    			spin: spin,
    			inverse: inverse,
    			pulse: pulse,
    			flip: flip,
    			label: label,
    			self: self,
    			style: style,
    			x: x,
    			y: y,
    			childrenHeight: childrenHeight,
    			childrenWidth: childrenWidth,
    			outerScale: outerScale,
    			width: width,
    			height: height,
    			combinedStyle: combinedStyle,
    			box: box
    		};
    	};

    	$$self.$inject_state = function ($$props) {
    		if ("className" in $$props) { $$invalidate(1, className = $$props.className); }
    		if ("data" in $$props) { $$invalidate(11, data = $$props.data); }
    		if ("scale" in $$props) { $$invalidate(12, scale = $$props.scale); }
    		if ("spin" in $$props) { $$invalidate(2, spin = $$props.spin); }
    		if ("inverse" in $$props) { $$invalidate(3, inverse = $$props.inverse); }
    		if ("pulse" in $$props) { $$invalidate(4, pulse = $$props.pulse); }
    		if ("flip" in $$props) { $$invalidate(5, flip = $$props.flip); }
    		if ("label" in $$props) { $$invalidate(6, label = $$props.label); }
    		if ("self" in $$props) { $$invalidate(0, self = $$props.self); }
    		if ("style" in $$props) { $$invalidate(13, style = $$props.style); }
    		if ("x" in $$props) { x = $$props.x; }
    		if ("y" in $$props) { y = $$props.y; }
    		if ("childrenHeight" in $$props) { childrenHeight = $$props.childrenHeight; }
    		if ("childrenWidth" in $$props) { childrenWidth = $$props.childrenWidth; }
    		if ("outerScale" in $$props) { outerScale = $$props.outerScale; }
    		if ("width" in $$props) { $$invalidate(7, width = $$props.width); }
    		if ("height" in $$props) { $$invalidate(8, height = $$props.height); }
    		if ("combinedStyle" in $$props) { $$invalidate(9, combinedStyle = $$props.combinedStyle); }
    		if ("box" in $$props) { $$invalidate(10, box = $$props.box); }
    	};

    	$$self.$$.update = function () {
    		if ($$self.$$.dirty[0] & /*data*/ 2048) {
    			 {
    				init();
    				$$invalidate(7, width = calculateWidth());
    				$$invalidate(8, height = calculateHeight());
    				$$invalidate(9, combinedStyle = calculateStyle());
    				$$invalidate(10, box = calculateBox());
    			}
    		}
    	};

    	return [
    		self,
    		className,
    		spin,
    		inverse,
    		pulse,
    		flip,
    		label,
    		width,
    		height,
    		combinedStyle,
    		box,
    		data,
    		scale,
    		style,
    		x,
    		y,
    		childrenHeight,
    		childrenWidth,
    		outerScale,
    		init,
    		normalisedScale,
    		calculateBox,
    		calculateRatio,
    		calculateWidth,
    		calculateHeight,
    		calculateStyle,
    		$$slots,
    		raw_data_binding,
    		$$scope
    	];
    }

    var Icon = /*@__PURE__*/(function (SvelteComponentDev) {
    	function Icon(options) {
    		SvelteComponentDev.call(this, options);

    		init(
    			this,
    			options,
    			instance$4,
    			create_fragment$5,
    			safe_not_equal,
    			{
    				class: 1,
    				data: 11,
    				scale: 12,
    				spin: 2,
    				inverse: 3,
    				pulse: 4,
    				flip: 5,
    				label: 6,
    				self: 0,
    				style: 13
    			},
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options: options,
    			id: create_fragment$5.name
    		});

    		var ref = this.$$;
    		var ctx = ref.ctx;
    		var props = options.props || {};

    		if (/*data*/ ctx[11] === undefined && !("data" in props)) {
    			console_1.warn("<Icon> was created without expected prop 'data'");
    		}
    	}

    	if ( SvelteComponentDev ) Icon.__proto__ = SvelteComponentDev;
    	Icon.prototype = Object.create( SvelteComponentDev && SvelteComponentDev.prototype );
    	Icon.prototype.constructor = Icon;

    	var prototypeAccessors = { class: { configurable: true },data: { configurable: true },scale: { configurable: true },spin: { configurable: true },inverse: { configurable: true },pulse: { configurable: true },flip: { configurable: true },label: { configurable: true },self: { configurable: true },style: { configurable: true } };

    	prototypeAccessors.class.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.class.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.data.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.data.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.scale.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.scale.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.spin.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.spin.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.inverse.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.inverse.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.pulse.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.pulse.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.flip.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.flip.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.label.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.label.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.self.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.self.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.style.get = function () {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.style.set = function (value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	Object.defineProperties( Icon.prototype, prototypeAccessors );

    	return Icon;
    }(SvelteComponentDev));

    var faFileCode = {
      prefix: 'far',
      iconName: 'file-code',
      icon: [384, 512, [], "f1c9", "M149.9 349.1l-.2-.2-32.8-28.9 32.8-28.9c3.6-3.2 4-8.8.8-12.4l-.2-.2-17.4-18.6c-3.4-3.6-9-3.7-12.4-.4l-57.7 54.1c-3.7 3.5-3.7 9.4 0 12.8l57.7 54.1c1.6 1.5 3.8 2.4 6 2.4 2.4 0 4.8-1 6.4-2.8l17.4-18.6c3.3-3.5 3.1-9.1-.4-12.4zm220-251.2L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM256 51.9l76.1 76.1H256zM336 464H48V48h160v104c0 13.3 10.7 24 24 24h104zM209.6 214c-4.7-1.4-9.5 1.3-10.9 6L144 408.1c-1.4 4.7 1.3 9.6 6 10.9l24.4 7.1c4.7 1.4 9.6-1.4 10.9-6L240 231.9c1.4-4.7-1.3-9.6-6-10.9zm24.5 76.9l.2.2 32.8 28.9-32.8 28.9c-3.6 3.2-4 8.8-.8 12.4l.2.2 17.4 18.6c3.3 3.5 8.9 3.7 12.4.4l57.7-54.1c3.7-3.5 3.7-9.4 0-12.8l-57.7-54.1c-3.5-3.3-9.1-3.2-12.4.4l-17.4 18.6c-3.3 3.5-3.1 9.1.4 12.4z"]
    };
    var faListAlt = {
      prefix: 'far',
      iconName: 'list-alt',
      icon: [512, 512, [], "f022", "M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v340a6 6 0 0 1-6 6zm-42-92v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm-252 12c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36 36 16.118 36 36z"]
    };

    var faCog = {
      prefix: 'fas',
      iconName: 'cog',
      icon: [512, 512, [], "f013", "M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"]
    };
    var faDatabase = {
      prefix: 'fas',
      iconName: 'database',
      icon: [448, 512, [], "f1c0", "M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"]
    };
    var faPalette = {
      prefix: 'fas',
      iconName: 'palette',
      icon: [512, 512, [], "f53f", "M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"]
    };
    var faPlug = {
      prefix: 'fas',
      iconName: 'plug',
      icon: [384, 512, [], "f1e6", "M320,32a32,32,0,0,0-64,0v96h64Zm48,128H16A16,16,0,0,0,0,176v32a16,16,0,0,0,16,16H32v32A160.07,160.07,0,0,0,160,412.8V512h64V412.8A160.07,160.07,0,0,0,352,256V224h16a16,16,0,0,0,16-16V176A16,16,0,0,0,368,160ZM128,32a32,32,0,0,0-64,0v96h64Z"]
    };
    var faToolbox = {
      prefix: 'fas',
      iconName: 'toolbox',
      icon: [512, 512, [], "f552", "M502.63 214.63l-45.25-45.25c-6-6-14.14-9.37-22.63-9.37H384V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v80H77.25c-8.49 0-16.62 3.37-22.63 9.37L9.37 214.63c-6 6-9.37 14.14-9.37 22.63V320h128v-16c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v16h128v-16c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v16h128v-82.75c0-8.48-3.37-16.62-9.37-22.62zM320 160H192V96h128v64zm64 208c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-16H192v16c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-16H0v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96H384v16z"]
    };
    var faUserCircle = {
      prefix: 'fas',
      iconName: 'user-circle',
      icon: [496, 512, [], "f2bd", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"]
    };

    /* src/App.svelte generated by Svelte v3.18.2 */

    var file$4 = "src/App.svelte";

    function get_each_context$1(ctx, list, i) {
    	var child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (118:1) {#each navItems as navItem, i}
    function create_each_block$1(ctx) {
    	var a;
    	var t;
    	var a_href_value;
    	var a_alt_value;
    	var a_class_value;
    	var a_data_tooltip_value;
    	var current;

    	var icon = new Icon({
    			props: {
    				data: /*navItem*/ ctx[3].icon,
    				class: "fill-current",
    				scale: /*navItem*/ ctx[3].scale
    			},
    			$$inline: true
    		});

    	var block = {
    		c: function create() {
    			a = element("a");
    			create_component(icon.$$.fragment);
    			t = space();
    			attr_dev(a, "onclick", "void(0)");
    			attr_dev(a, "href", a_href_value = /*navItem*/ ctx[3].href);
    			attr_dev(a, "alt", a_alt_value = /*navItem*/ ctx[3].name);
    			attr_dev(a, "class", a_class_value = "nav-item text-gray-100 hover:text-gray-600 " + /*navItem*/ ctx[3].class + " svelte-1jmqzvv");
    			attr_dev(a, "data-tooltip", a_data_tooltip_value = /*navItem*/ ctx[3].name);
    			add_location(a, file$4, 118, 2, 5516);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			mount_component(icon, a, null);
    			append_dev(a, t);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) { detach_dev(a); }
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(118:1) {#each navItems as navItem, i}",
    		ctx: ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	var t;
    	var nav;
    	var current;
    	var tailwindcss = new Tailwindcss({ $$inline: true });
    	var each_value = /*navItems*/ ctx[0];
    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	var out = function (i) { return transition_out(each_blocks[i], 1, 1, function () {
    		each_blocks[i] = null;
    	}); };

    	var block = {
    		c: function create() {
    			create_component(tailwindcss.$$.fragment);
    			t = space();
    			nav = element("nav");

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(nav, "class", "nav-main svelte-1jmqzvv");
    			add_location(nav, file$4, 116, 0, 5459);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(tailwindcss, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, nav, anchor);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(nav, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, ref) {
    			var dirty = ref[0];

    			if (dirty & /*navItems*/ 1) {
    				each_value = /*navItems*/ ctx[0];
    				var i;

    				for (i = 0; i < each_value.length; i += 1) {
    					var child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(nav, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) { return; }
    			transition_in(tailwindcss.$$.fragment, local);

    			for (var i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tailwindcss.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tailwindcss, detaching);
    			if (detaching) { detach_dev(t); }
    			if (detaching) { detach_dev(nav); }
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx: ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	var flextype = $$props.flextype; if ( flextype === void 0 ) flextype = {
    		flextype: {
    			width: 180,
    			height: 180,
    			raw: "<circle cx=\"90\" cy=\"90\" r=\"90\" style=\"fill:black;\"/><path d=\"M65.463,46.035L54.132,136.565L88.557,136.537L93.108,102.223L114.39,102.4L117.383,81.019L95.468,80.851L96.626,71.661L124.72,71.615L128.019,45.759L65.463,46.035Z\" style=\"fill:white;\"/>"
    		}
    	};

    	var name = "Flextype Svelte";

    	var navItems = [
    		{
    			id: 0,
    			class: "nav-logo",
    			name: "Flextype",
    			icon: flextype,
    			scale: 2
    		},
    		{
    			id: 1,
    			class: "",
    			name: "Entries",
    			icon: faDatabase
    		},
    		{
    			id: 2,
    			class: "",
    			name: "Fieldsets",
    			icon: faListAlt
    		},
    		{
    			id: 3,
    			class: "",
    			name: "Themes",
    			icon: faPalette
    		},
    		{
    			id: 4,
    			class: "",
    			name: "Snippets",
    			icon: faFileCode
    		},
    		{
    			id: 5,
    			class: "",
    			name: "Plugins",
    			icon: faPlug
    		},
    		{
    			id: 6,
    			class: "",
    			name: "Tools",
    			icon: faToolbox
    		},
    		{
    			id: 7,
    			class: "",
    			name: "Settings",
    			icon: faCog
    		},
    		{
    			id: 8,
    			class: "nav-user",
    			name: "User",
    			icon: faUserCircle
    		}
    	];

    	var writable_props = ["flextype"];

    	Object.keys($$props).forEach(function (key) {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") { console.warn(("<App> was created with unknown prop '" + key + "'")); }
    	});

    	$$self.$set = function ($$props) {
    		if ("flextype" in $$props) { $$invalidate(1, flextype = $$props.flextype); }
    	};

    	$$self.$capture_state = function () {
    		return { flextype: flextype, name: name, navItems: navItems };
    	};

    	$$self.$inject_state = function ($$props) {
    		if ("flextype" in $$props) { $$invalidate(1, flextype = $$props.flextype); }
    		if ("name" in $$props) { name = $$props.name; }
    		if ("navItems" in $$props) { $$invalidate(0, navItems = $$props.navItems); }
    	};

    	return [navItems, flextype];
    }

    var App = /*@__PURE__*/(function (SvelteComponentDev) {
    	function App(options) {
    		SvelteComponentDev.call(this, options);
    		init(this, options, instance$5, create_fragment$6, safe_not_equal, { flextype: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options: options,
    			id: create_fragment$6.name
    		});
    	}

    	if ( SvelteComponentDev ) App.__proto__ = SvelteComponentDev;
    	App.prototype = Object.create( SvelteComponentDev && SvelteComponentDev.prototype );
    	App.prototype.constructor = App;

    	var prototypeAccessors = { flextype: { configurable: true } };

    	prototypeAccessors.flextype.get = function () {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	prototypeAccessors.flextype.set = function (value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	};

    	Object.defineProperties( App.prototype, prototypeAccessors );

    	return App;
    }(SvelteComponentDev));

    var app = new App({
    	target: document.body,
    	// props: {
    	// 	name: 'FlexType'
    	// }
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
