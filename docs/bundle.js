var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n){t.appendChild(n)}function a(t,n,e){t.insertBefore(n,e||null)}function f(t){t.parentNode.removeChild(t)}function l(t){return document.createTextNode(t)}let s;function i(t){s=t}const d=[],m=[],p=[],$=[],h=Promise.resolve();let g=!1;function y(t){p.push(t)}function b(){const t=new Set;do{for(;d.length;){const t=d.shift();i(t),x(t.$$)}for(;m.length;)m.pop()();for(let n=0;n<p.length;n+=1){const e=p[n];t.has(e)||(e(),t.add(e))}p.length=0}while(d.length);for(;$.length;)$.pop()();g=!1}function x(t){null!==t.fragment&&(t.update(t.dirty),o(t.before_update),t.fragment&&t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(y))}const _=new Set;let w;function v(t,n){t&&t.i&&(_.delete(t),t.i(n))}function k(t,e,c){const{fragment:u,on_mount:a,on_destroy:f,after_update:l}=t.$$;u&&u.m(e,c),y(()=>{const e=a.map(n).filter(r);f?f.push(...e):o(e),t.$$.on_mount=[]}),l.forEach(y)}function A(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx={})}function E(t,n){t.$$.dirty||(d.push(t),g||(g=!0,h.then(b)),t.$$.dirty=e()),t.$$.dirty[n]=!0}function N(n,r,c,u,a,f){const l=s;i(n);const d=r.props||{},m=n.$$={fragment:null,ctx:null,props:f,update:t,not_equal:a,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:e(),dirty:null};let p=!1;m.ctx=c?c(n,d,(t,e,o=e)=>(m.ctx&&a(m.ctx[t],m.ctx[t]=o)&&(m.bound[t]&&m.bound[t](o),p&&E(n,t)),e)):d,m.update(),p=!0,o(m.before_update),m.fragment=!!u&&u(m.ctx),r.target&&(r.hydrate?m.fragment&&m.fragment.l(function(t){return Array.from(t.childNodes)}(r.target)):m.fragment&&m.fragment.c(),r.intro&&v(n.$$.fragment),k(n,r.target,r.anchor),b()),i(l)}class j{$destroy(){A(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}class C extends j{constructor(t){super(),N(this,t,null,null,c,{})}}function O(t){let n,e,o,r,c,s;const i=new C({});return{c(){var u,a,f,s,d;(u=i.$$.fragment)&&u.c(),n=l(" "),a="h1",e=document.createElement(a),o=l("Hello "),r=l(t.name),c=l("!"),f=e,s="class",null==(d="bg-black text-white svelte-t1i89w")?f.removeAttribute(s):f.getAttribute(s)!==d&&f.setAttribute(s,d)},m(t,f){k(i,t,f),a(t,n,f),a(t,e,f),u(e,o),u(e,r),u(e,c),s=!0},p(t,n){s&&!t.name||function(t,n){n=""+n,t.data!==n&&(t.data=n)}(r,n.name)},i(t){s||(v(i.$$.fragment,t),s=!0)},o(t){!function(t,n,e,o){if(t&&t.o){if(_.has(t))return;_.add(t),w.c.push(()=>{_.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}(i.$$.fragment,t),s=!1},d(t){A(i,t),t&&f(n),t&&f(e)}}}function S(t,n,e){let{name:o}=n;return t.$set=t=>{"name"in t&&e("name",o=t.name)},{name:o}}return new class extends j{constructor(t){super(),N(this,t,S,O,c,{name:0})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
