<<<<<<<< HEAD:dist/assets/status-tap-LY-JaEpf.js
import{r as a,f as i,b as c,w as d,s as l}from"./index-TXaONsIV.js";/*!
========
import{r as a,f as i,b as c,w as d,s as l}from"./index-n_ODzJ9w.js";/*!
>>>>>>>> 54ce5aa56cbbb053114464c8045b91b3f1aa8f8a:dist/assets/status-tap-ozSfhz6Q.js
 * (C) Ionic http://ionicframework.com - MIT License
 */const m=()=>{const e=window;e.addEventListener("statusTap",()=>{a(()=>{const o=e.innerWidth,s=e.innerHeight,n=document.elementFromPoint(o/2,s/2);if(!n)return;const t=i(n);t&&new Promise(r=>c(t,r)).then(()=>{d(async()=>{t.style.setProperty("--overflow","hidden"),await l(t,300),t.style.removeProperty("--overflow")})})})})};export{m as startStatusTap};