/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require","exports","../../../Types","../../../Compare"],function(r,e,n,a){"use strict";function i(r){return Array.isArray(r)?r:[r]}function t(r,e,t){void 0===e&&(e=1),void 0===t&&(t=NaN);var u=!n.Type.isTrueNaN(t);return function(o,s){for(var p=i(r(o)),y=i(r(s)),N=Math.min(p.length,y.length),c=Array.isArray(e)?e:null,f=0;f<N;f++){var T=p[f],v=y[f],l=c?f<c.length?c[f]:1:e;u&&(n.Type.isTrueNaN(T)&&(T=t),n.Type.isTrueNaN(v)&&(v=t));var h=a.compare(T,v);if(0!==h)return l*h}return 0}}e.createComparer=t});
//# sourceMappingURL=createComparer.js.map