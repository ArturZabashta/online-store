(()=>{"use strict";var e={982:(e,n,t)=>{t.d(n,{Z:()=>r});var i=t(645),o=t.n(i)()((function(e){return e[1]}));o.push([e.id,".footer .rs-link:hover,.footer__link:hover{transition:all 1s ease-out}html{font-size:10px;scroll-behavior:smooth;height:100%}body{padding:0;margin:0;font-size:1.6rem;font-style:normal;height:100%;color:#444}.wrapper{max-width:1200px;overflow:hidden;margin:0 auto}.root{min-height:100%;display:flex;flex-direction:column}.header{box-shadow:0 1px 2px rgba(0,0,0,.25),0 5px 18px rgba(0,0,0,.22);display:flex;height:8rem;padding:1.5rem 2.5rem}.header__wrapper{width:100%;display:flex;align-items:center;justify-content:space-between;border:none}.header__logo{display:flex}.header__logo .logo{width:6rem;height:6rem}main{flex:1 1 auto}.footer{flex:0 0 auto;background-color:#f5f5f5}.footer__wrapper{display:flex;align-items:center;justify-content:space-between;border:none;padding:0 2.5rem}.footer__logo{width:10rem}.footer__text{display:flex;flex-direction:column-reverse}.footer__link{list-style:none;color:#444;text-decoration:none}.footer__link:hover{cursor:pointer;color:#009789}.footer .rs-link{width:90px;height:30px}.footer .rs-link:hover{cursor:pointer}.shop{display:flex;padding:2rem;height:80vh;gap:2%}.shop__tools{width:20%;background-color:#f5f5f5}.shop__items{display:flex;width:70%;background-color:#f5f5f5;padding:1rem;flex-wrap:wrap;overflow:overlay;gap:1rem}.shop__items .item{width:200px;height:200px;background-color:aqua}",""]);const r=o},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=e(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,i){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(i)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var d=[].concat(e[s]);i&&o[d[0]]||(t&&(d[2]?d[2]="".concat(t," and ").concat(d[2]):d[2]=t),n.push(d))}},n}},379:(e,n,t)=>{var i,o=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),r=[];function a(e){for(var n=-1,t=0;t<r.length;t++)if(r[t].identifier===e){n=t;break}return n}function s(e,n){for(var t={},i=[],o=0;o<e.length;o++){var s=e[o],d=n.base?s[0]+n.base:s[0],c=t[d]||0,l="".concat(d," ").concat(c);t[d]=c+1;var f=a(l),v={css:s[1],media:s[2],sourceMap:s[3]};-1!==f?(r[f].references++,r[f].updater(v)):r.push({identifier:l,updater:h(v,n),references:1}),i.push(l)}return i}function d(e){var n=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var r=t.nc;r&&(i.nonce=r)}if(Object.keys(i).forEach((function(e){n.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(n);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var c,l=(c=[],function(e,n){return c[e]=n,c.filter(Boolean).join("\n")});function f(e,n,t,i){var o=t?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=l(n,o);else{var r=document.createTextNode(o),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(r,a[n]):e.appendChild(r)}}function v(e,n,t){var i=t.css,o=t.media,r=t.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var p=null,u=0;function h(e,n){var t,i,o;if(n.singleton){var r=u++;t=p||(p=d(n)),i=f.bind(null,t,r,!1),o=f.bind(null,t,r,!0)}else t=d(n),i=v.bind(null,t,n),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return i(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;i(e=n)}else o()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i));var t=s(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<t.length;i++){var o=a(t[i]);r[o].references--}for(var d=s(e,n),c=0;c<t.length;c++){var l=a(t[c]);0===r[l].references&&(r[l].updater(),r.splice(l,1))}t=d}}}}},n={};function t(i){var o=n[i];if(void 0!==o)return o.exports;var r=n[i]={id:i,exports:{}};return e[i](r,r.exports,t),r.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.nc=void 0,(()=>{var e=t(379),n=t.n(e),i=t(982);n()(i.Z,{insert:"head",singleton:!1}),i.Z.locals;const o={render:()=>"\n        <section>\n          <h1>Error</h1>\n          <p>This is just a Error</p>\n        </section>\n      "},r=[{path:"/",component:{render:()=>"\n      <div class=\"shop\">\n        <aside class=\"shop__tools\"></aside>\n        <section class=\"shop__items\">\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        <div class = 'item'></div>\n        </section>\n      </div>\n      "}},{path:"/curt",component:{render:()=>"\n        \n      "}}],a=()=>{const e=location.hash.slice(1).toLowerCase()||"/",{component:n=o}=((e,n)=>n.find((n=>n.path.match(new RegExp(`^\\${e}$`,"gm"))))||void 0)(e,r)||{};document.getElementById("app").innerHTML=n.render()};window.addEventListener("hashchange",a),window.addEventListener("load",a),console.log("hi")})()})();