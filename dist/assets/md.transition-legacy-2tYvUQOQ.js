System.register(["./index-legacy-wklah3Lp.js"],(function(n,e){"use strict";var t,i;return{setters:[function(n){t=n.q,i=n.o}],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
n("mdTransitionAnimation",(function(n,e){var o,a,r,l="40px",c="back"===e.direction,s=e.enteringEl,d=e.leavingEl,u=t(s),m=u.querySelector("ion-toolbar"),f=i();if(f.addElement(u).fill("both").beforeRemoveClass("ion-page-invisible"),c?f.duration((null!==(o=e.duration)&&void 0!==o?o:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):f.duration((null!==(a=e.duration)&&void 0!==a?a:0)||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(".concat(l,")"),"translateY(".concat("0px",")")).fromTo("opacity",.01,1),m){var b=i();b.addElement(m),f.addAnimation(b)}if(d&&c){f.duration((null!==(r=e.duration)&&void 0!==r?r:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)");var v=i();v.addElement(t(d)).onFinish((function(n){1===n&&v.elements.length>0&&v.elements[0].style.setProperty("display","none")})).fromTo("transform","translateY(".concat("0px",")"),"translateY(".concat(l,")")).fromTo("opacity",1,0),f.addAnimation(v)}return f}))}}}));
