
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
var e=function(t){if(void 0===t.composedPath)return t.target.closest(".ion-activatable");for(var e=t.composedPath(),n=0;n<e.length-2;n++){var i=e[n];if(!(i instanceof ShadowRoot)&&i.classList.contains("ion-activatable"))return i}},a=function(t){return t.classList.contains("ion-activatable-instant")},r=function(t){if(t.shadowRoot){var e=t.shadowRoot.querySelector("ion-ripple-effect");if(e)return e}return t.querySelector("ion-ripple-effect")},c="ion-activated",s=100,u=150,f=2500}}}));
