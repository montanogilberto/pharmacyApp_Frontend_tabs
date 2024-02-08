!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return r};var n,r={},o=Object.prototype,i=o.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",s=u.asyncIterator||"@@asyncIterator",l=u.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(n){f=function(t,e,n){return t[e]=n}}function h(t,e,n,r){var o=e&&e.prototype instanceof w?e:w,i=Object.create(o.prototype),u=new N(r||[]);return a(i,"_invoke",{value:O(t,n,u)}),i}function d(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}r.wrap=h;var v="suspendedStart",p="suspendedYield",y="executing",m="completed",g={};function w(){}function b(){}function x(){}var E={};f(E,c,(function(){return this}));var L=Object.getPrototypeOf,S=L&&L(L(T([])));S&&S!==o&&i.call(S,c)&&(E=S);var k=x.prototype=w.prototype=Object.create(E);function P(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function j(e,n){function r(o,a,u,c){var s=d(e[o],e,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==t(f)&&i.call(f,"__await")?n.resolve(f.__await).then((function(t){r("next",t,u,c)}),(function(t){r("throw",t,u,c)})):n.resolve(f).then((function(t){l.value=t,u(l)}),(function(t){return r("throw",t,u,c)}))}c(s.arg)}var o;a(this,"_invoke",{value:function(t,e){function i(){return new n((function(n,o){r(t,e,n,o)}))}return o=o?o.then(i,i):i()}})}function O(t,e,r){var o=v;return function(i,a){if(o===y)throw new Error("Generator is already running");if(o===m){if("throw"===i)throw a;return{value:n,done:!0}}for(r.method=i,r.arg=a;;){var u=r.delegate;if(u){var c=_(u,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===v)throw o=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=y;var s=d(t,e,r);if("normal"===s.type){if(o=r.done?m:p,s.arg===g)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(o=m,r.method="throw",r.arg=s.arg)}}}function _(t,e){var r=e.method,o=t.iterator[r];if(o===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=n,_(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var i=d(o,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,g;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,g):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function D(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(D,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[c];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function t(){for(;++o<e.length;)if(i.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=n,t.done=!0,t};return a.next=a}}throw new TypeError(t(e)+" is not iterable")}return b.prototype=x,a(k,"constructor",{value:x,configurable:!0}),a(x,"constructor",{value:b,configurable:!0}),b.displayName=f(x,l,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,f(t,l,"GeneratorFunction")),t.prototype=Object.create(k),t},r.awrap=function(t){return{__await:t}},P(j.prototype),f(j.prototype,s,(function(){return this})),r.AsyncIterator=j,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new j(h(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},P(k),f(k,l,"Generator"),f(k,c,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},r.values=T,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(A),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,o){return u.type="throw",u.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],u=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),s=i.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),A(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;A(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),g}},r}function n(t,e,n,r,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(r,o)}function r(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function u(t){n(a,o,i,u,c,"next",t)}function c(t){n(a,o,i,u,c,"throw",t)}u(void 0)}))}}System.register(["./index-legacy-wklah3Lp.js"],(function(t,n){"use strict";var o,i,a,u,c,s,l,f,h,d,v;return{setters:[function(t){o=t.d,i=t.K,a=t.e,u=t.g,c=t.b,s=t.f,l=t.h,f=t.j,h=t.k,d=t.l,v=t.m}],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
var n=new WeakMap,p=function(t,e,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];n.has(t)!==r&&(r?y(t,e,o,i):m(t,e))},y=function(t,e,r){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=e.parentNode,a=e.cloneNode(!1);a.classList.add("cloned-input"),a.tabIndex=-1,o&&(a.disabled=!0),i.appendChild(a),n.set(t,a);var u="rtl"===t.ownerDocument.dir?9999:-9999;t.style.pointerEvents="none",e.style.transform="translate3d(".concat(u,"px,").concat(r,"px,0) scale(0)")},m=function(t,e){var r=n.get(t);r&&(n.delete(t),r.remove()),t.style.pointerEvents="",e.style.transform=""},g=function(t,e,n){if(!n||!e)return function(){};var r=function(n){var r;(r=e)===r.getRootNode().activeElement&&p(t,e,n)},o=function(){return p(t,e,!1)},i=function(){return r(!0)},c=function(){return r(!1)};return a(n,"ionScrollStart",i),a(n,"ionScrollEnd",c),e.addEventListener("blur",o),function(){u(n,"ionScrollStart",i),u(n,"ionScrollEnd",c),e.removeEventListener("blur",o)}},w="input, textarea, [no-blur], [contenteditable]",b=function(){var t=!0,e=!1,n=document,r=function(){e=!0},o=function(){t=!0},i=function(r){if(e)e=!1;else{var o=n.activeElement;if(o&&!o.matches(w)){var i=r.target;i!==o&&(i.matches(w)||i.closest(w)||(t=!1,setTimeout((function(){t||o.blur()}),50)))}}};return a(n,"ionScrollStart",r),n.addEventListener("focusin",o,!0),n.addEventListener("touchend",i,!1),function(){u(n,"ionScrollStart",r,!0),n.removeEventListener("focusin",o,!0),n.removeEventListener("touchend",i,!1)}},x=function(t,e,n,r){var o,i=null!==(o=t.closest("ion-item,[ion-item]"))&&void 0!==o?o:t;return E(i.getBoundingClientRect(),e.getBoundingClientRect(),n,r)},E=function(t,e,n,r){var o=t.top,i=t.bottom,a=e.top,u=a+15,c=Math.min(e.bottom,r-n)-50-i,s=u-o,l=Math.round(c<0?-c:s>0?-s:0),f=Math.min(l,o-a),h=Math.abs(f)/.3;return{scrollAmount:f,scrollDuration:Math.min(400,Math.max(150,h)),scrollPadding:n,inputSafeY:4-(o-u)}},L="$ionPaddingTimer",S=function(t,e,n){var r=t[L];r&&clearTimeout(r),e>0?t.style.setProperty("--keyboard-offset","".concat(e,"px")):t[L]=setTimeout((function(){t.style.setProperty("--keyboard-offset","0px"),n&&n()}),120)},k=function(t,e,n){t.addEventListener("focusout",(function(){e&&S(e,0,n)}),{once:!0})},P=0,j="data-ionic-skip-scroll-assist",O=function(t,n,o,i,a,u,c){var s=arguments.length>7&&void 0!==arguments[7]&&arguments[7],h=u&&(void 0===c||c.mode===l.None),d=!1,v=void 0!==f?f.innerHeight:0,p=function(e){!1!==d?D(t,n,o,i,e.detail.keyboardHeight,h,s,v,!1):d=!0},y=function e(){d=!1,null==f||f.removeEventListener("ionKeyboardDidShow",p),t.removeEventListener("focusout",e,!0)},m=function(){var u=r(e().mark((function r(){return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.hasAttribute(j)){e.next=3;break}return n.removeAttribute(j),e.abrupt("return");case 3:D(t,n,o,i,a,h,s,v),null==f||f.addEventListener("ionKeyboardDidShow",p),t.addEventListener("focusout",y,!0);case 6:case"end":return e.stop()}}),r)})));return function(){return u.apply(this,arguments)}}();return t.addEventListener("focusin",m,!0),function(){t.removeEventListener("focusin",m,!0),null==f||f.removeEventListener("ionKeyboardDidShow",p),t.removeEventListener("focusout",y,!0)}},_=function(t){document.activeElement!==t&&(t.setAttribute(j,"true"),t.focus())},D=function(){var t=r(e().mark((function t(n,o,i,a,u,c){var s,l,f,y,m,g,w,b,E,L=arguments;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s=L.length>6&&void 0!==L[6]&&L[6],l=L.length>7&&void 0!==L[7]?L[7]:0,f=!(L.length>8&&void 0!==L[8])||L[8],i||a){t.next=5;break}return t.abrupt("return");case 5:if(y=x(n,i||a,u,l),!(i&&Math.abs(y.scrollAmount)<4)){t.next=10;break}return _(o),c&&null!==i&&(S(i,P),k(o,i,(function(){return P=0}))),t.abrupt("return");case 10:if(p(n,o,!0,y.inputSafeY,s),_(o),h((function(){return n.click()})),c&&i&&(P=y.scrollPadding,S(i,P)),"undefined"==typeof window){t.next=27;break}if(g=function(){var t=r(e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!==m&&clearTimeout(m),window.removeEventListener("ionKeyboardDidShow",w),window.removeEventListener("ionKeyboardDidShow",g),!i){t.next=6;break}return t.next=6,v(i,0,y.scrollAmount,y.scrollDuration);case 6:p(n,o,!1,y.inputSafeY),_(o),c&&k(o,i,(function(){return P=0}));case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w=function t(){window.removeEventListener("ionKeyboardDidShow",t),window.addEventListener("ionKeyboardDidShow",g)},!i){t.next=26;break}return t.next=20,d(i);case 20:if(b=t.sent,E=b.scrollHeight-b.clientHeight,!(f&&y.scrollAmount>E-b.scrollTop)){t.next=26;break}return"password"===o.type?(y.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",w)):window.addEventListener("ionKeyboardDidShow",g),m=setTimeout(g,1e3),t.abrupt("return");case 26:g();case 27:case"end":return t.stop()}}),t)})));return function(e,n,r,o,i,a){return t.apply(this,arguments)}}();t("startInputShims",function(){var t=r(e().mark((function t(n,a){var u,l,f,h,d,v,p,y,m,w,x,E,L,S,k,P;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!==o){t.next=2;break}return t.abrupt("return");case 2:return u="ios"===a,l="android"===a,f=n.getNumber("keyboardHeight",290),h=n.getBoolean("scrollAssist",!0),d=n.getBoolean("hideCaretOnScroll",u),v=n.getBoolean("inputBlurring",u),p=n.getBoolean("scrollPadding",!0),y=Array.from(o.querySelectorAll("ion-input, ion-textarea")),m=new WeakMap,w=new WeakMap,t.next=14,i.getResizeMode();case 14:for(x=t.sent,E=function(){var t=r(e().mark((function t(n){var r,o,i,a,u,v;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){return c(n,t)}));case 2:if(r=n.shadowRoot||n,o=r.querySelector("input")||r.querySelector("textarea"),i=s(n),a=i?null:n.closest("ion-footer"),o){t.next=8;break}return t.abrupt("return");case 8:i&&d&&!m.has(n)&&(u=g(n,o,i),m.set(n,u)),"date"===o.type||"datetime-local"===o.type||!i&&!a||!h||w.has(n)||(v=O(n,o,i,a,f,p,x,l),w.set(n,v));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),L=function(t){if(d){var e=m.get(t);e&&e(),m.delete(t)}if(h){var n=w.get(t);n&&n(),w.delete(t)}},v&&b(),S=0,k=y;S<k.length;S++)P=k[S],E(P);o.addEventListener("ionInputDidLoad",(function(t){E(t.detail)})),o.addEventListener("ionInputDidUnload",(function(t){L(t.detail)}));case 21:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}())}}}))}();
