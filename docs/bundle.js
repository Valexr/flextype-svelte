var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function u(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(t,n){t.appendChild(n)}function f(t,n,e){t.insertBefore(n,e||null)}function l(t){t.parentNode.removeChild(t)}function s(t){return document.createElement(t)}function a(t){return document.createTextNode(t)}function i(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}let d;function p(t){d=t}const $=[],m=[],h=[],g=[],y=Promise.resolve();let x=!1;function b(t){h.push(t)}function _(){const t=new Set;do{for(;$.length;){const t=$.shift();p(t),v(t.$$)}for(;m.length;)m.pop()();for(let n=0;n<h.length;n+=1){const e=h[n];t.has(e)||(e(),t.add(e))}h.length=0}while($.length);for(;g.length;)g.pop()();x=!1}function v(t){null!==t.fragment&&(t.update(t.dirty),o(t.before_update),t.fragment&&t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(b))}const w=new Set;let A;function E(t,n){t&&t.i&&(w.delete(t),t.i(n))}function k(t,e,u){const{fragment:c,on_mount:f,on_destroy:l,after_update:s}=t.$$;c&&c.m(e,u),b(()=>{const e=f.map(n).filter(r);l?l.push(...e):o(e),t.$$.on_mount=[]}),s.forEach(b)}function C(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx={})}function N(t,n){t.$$.dirty||($.push(t),x||(x=!0,y.then(_)),t.$$.dirty=e()),t.$$.dirty[n]=!0}function S(n,r,u,c,f,l){const s=d;p(n);const a=r.props||{},i=n.$$={fragment:null,ctx:null,props:l,update:t,not_equal:f,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(s?s.$$.context:[]),callbacks:e(),dirty:null};let $=!1;i.ctx=u?u(n,a,(t,e,o=e)=>(i.ctx&&f(i.ctx[t],i.ctx[t]=o)&&(i.bound[t]&&i.bound[t](o),$&&N(n,t)),e)):a,i.update(),$=!0,o(i.before_update),i.fragment=!!c&&c(i.ctx),r.target&&(r.hydrate?i.fragment&&i.fragment.l(function(t){return Array.from(t.childNodes)}(r.target)):i.fragment&&i.fragment.c(),r.intro&&E(n.$$.fragment),k(n,r.target,r.anchor),_()),p(s)}class j{$destroy(){C(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}class O extends j{constructor(t){super(),S(this,t,null,null,u,{})}}function q(n){let e,o,r,u,d,p;const $=new O({});return{c(){var t;(t=$.$$.fragment)&&t.c(),e=a(" "),o=s("h1"),r=a("Hello "),(u=s("span")).textContent=`${B}`,d=a("!"),i(u,"class","svelte-bu2xs"),i(o,"class","svelte-bu2xs")},m(t,n){k($,t,n),f(t,e,n),f(t,o,n),c(o,r),c(o,u),c(o,d),p=!0},p:t,i(t){p||(E($.$$.fragment,t),p=!0)},o(t){!function(t,n,e,o){if(t&&t.o){if(w.has(t))return;w.add(t),A.c.push(()=>{w.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}($.$$.fragment,t),p=!1},d(t){C($,t),t&&l(e),t&&l(o)}}}let B="Flextype Svelte";return new class extends j{constructor(t){super(),S(this,t,null,q,u,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
