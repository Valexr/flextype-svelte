var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n){t.appendChild(n)}function f(t,n,e){t.insertBefore(n,e||null)}function s(t){t.parentNode.removeChild(t)}function l(t){return document.createElement(t)}function a(t){return document.createTextNode(t)}function i(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}let d;function p(t){d=t}const $=[],h=[],m=[],g=[],y=Promise.resolve();let x=!1;function b(t){m.push(t)}const _=new Set;function v(){do{for(;$.length;){const t=$.shift();p(t),w(t.$$)}for(;h.length;)h.pop()();for(let t=0;t<m.length;t+=1){const n=m[t];_.has(n)||(_.add(n),n())}m.length=0}while($.length);for(;g.length;)g.pop()();x=!1,_.clear()}function w(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(b)}}const A=new Set;function C(t,n){t&&t.i&&(A.delete(t),t.i(n))}function E(t,e,c){const{fragment:u,on_mount:f,on_destroy:s,after_update:l}=t.$$;u&&u.m(e,c),b(()=>{const e=f.map(n).filter(r);s?s.push(...e):o(e),t.$$.on_mount=[]}),l.forEach(b)}function k(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function q(t,n){-1===t.$$.dirty[0]&&($.push(t),x||(x=!0,y.then(v)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function N(n,r,c,u,f,s,l=[-1]){const a=d;p(n);const i=r.props||{},$=n.$$={fragment:null,ctx:null,props:s,update:t,not_equal:f,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:e(),dirty:l};let h=!1;$.ctx=c?c(n,i,(t,e,...o)=>{const r=o.length?o[0]:e;return $.ctx&&f($.ctx[t],$.ctx[t]=r)&&($.bound[t]&&$.bound[t](r),h&&q(n,t)),e}):[],$.update(),h=!0,o($.before_update),$.fragment=!!u&&u($.ctx),r.target&&(r.hydrate?$.fragment&&$.fragment.l(function(t){return Array.from(t.childNodes)}(r.target)):$.fragment&&$.fragment.c(),r.intro&&C(n.$$.fragment),E(n,r.target,r.anchor),v()),p(a)}class S{$destroy(){k(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}class j extends S{constructor(t){super(),N(this,t,null,null,c,{})}}function O(n){let e,o,r,c,d,p;const $=new j({});return{c(){var t;(t=$.$$.fragment)&&t.c(),e=a(" "),o=l("h1"),r=a("Hello "),c=l("span"),c.textContent=`${B}`,d=l("strong"),d.textContent="!",i(c,"class","svelte-1dvqwft"),i(d,"class","text-yellow-600"),i(o,"class","svelte-1dvqwft")},m(t,n){E($,t,n),f(t,e,n),f(t,o,n),u(o,r),u(o,c),u(o,d),p=!0},p:t,i(t){p||(C($.$$.fragment,t),p=!0)},o(t){!function(t,n,e,o){if(t&&t.o){if(A.has(t))return;A.add(t),(void 0).c.push(()=>{A.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}($.$$.fragment,t),p=!1},d(t){k($,t),t&&s(e),t&&s(o)}}}let B="Flextype Svelte";return new class extends S{constructor(t){super(),N(this,t,null,O,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
