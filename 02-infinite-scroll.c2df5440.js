function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o);var i,a=o("iQIUW"),u=o("dSs1Y"),c=o("fZKcF"),l=o("2Rajk"),f=o("6fOXY"),s=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,y=/^0b[01]+$/i,g=/^0o[0-7]+$/i,m=parseInt,p="object"==typeof t&&t&&t.Object===Object&&t,v="object"==typeof self&&self&&self.Object===Object&&self,h=p||v||Function("return this")(),b=Object.prototype.toString,w=Math.max,j=Math.min,x=function(){return h.Date.now()};function O(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function T(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==b.call(e)}(e))return NaN;if(O(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=O(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(s,"");var n=y.test(e);return n||g.test(e)?m(e.slice(2),n?2:8):d.test(e)?NaN:+e}i=function(e,t,n){var r,o,i,a,u,c,l=0,f=!1,s=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function y(t){var n=r,i=o;return r=o=void 0,l=t,a=e.apply(i,n)}function g(e){return l=e,u=setTimeout(p,t),f?y(e):a}function m(e){var n=e-c;return void 0===c||n>=t||n<0||s&&e-l>=i}function p(){var e=x();if(m(e))return v(e);u=setTimeout(p,function(e){var n=t-(e-c);return s?j(n,i-(e-l)):n}(e))}function v(e){return u=void 0,d&&r?y(e):(r=o=void 0,a)}function h(){var e=x(),n=m(e);if(r=arguments,o=this,c=e,n){if(void 0===u)return g(c);if(s)return u=setTimeout(p,t),y(c)}return void 0===u&&(u=setTimeout(p,t)),a}return t=T(t)||0,O(n)&&(f=!!n.leading,i=(s="maxWait"in n)?w(T(n.maxWait)||0,t):i,d="trailing"in n?!!n.trailing:d),h.cancel=function(){void 0!==u&&clearTimeout(u),l=0,r=c=o=u=void 0},h.flush=function(){return void 0===u?a:v(x())},h};const N=document.querySelector(".search-form"),E=document.querySelector(".gallery"),q=new(0,f.PixabayAPI);let L,S=0;function D(e){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*e,behavior:"smooth"})}N.addEventListener("submit",(function(t){if(t.preventDefault(),E.innerHTML="",S=0,q.query=t.currentTarget.elements.searchQuery.value.trim(),!q.query)return a.Notify.warning("Please enter a picture title");(async function(){q.page=1;try{const t=await q.getImages();0===t.hits.length?a.Notify.failure("Sorry, there are no images matching your search query. Please try again."):(a.Notify.success(`Hooray! We found ${t.totalHits} images.`),(0,l.markUpGallery)(t,E),L=new(e(c))(".gallery a",{captionsData:"alt",captionDelay:250}),S+=t.hits.length,D(1))}catch(e){console.log(e.message)}u.Loading.remove()})(),t.target.reset()}));window.addEventListener("scroll",e(i)((function(){document.documentElement.getBoundingClientRect().bottom<document.documentElement.clientHeight+70&&(q.page+=1,async function(){try{const e=await q.getImages();if(S>=e.totalHits)return a.Notify.warning("We're sorry, but you've reached the end of search results."),void u.Loading.remove();(0,l.markUpGallery)(e,E),L.refresh(),S+=e.hits.length,D(2)}catch(e){console.log(e.message)}u.Loading.remove()}())}),250));
//# sourceMappingURL=02-infinite-scroll.c2df5440.js.map