/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require","exports","../../../Exceptions/ArgumentNullException"],function(r,t,e){"use strict";function n(r){if(!r)throw new e.ArgumentNullException("target");for(var t=r.length,n=1;n<t;n++)for(var i=n,o=void 0;i>0&&r[o=i-1]>r[i];){var u=r[i];r[i]=r[o],r[o]=u,i--}return r}t.insertionSort=n});
//# sourceMappingURL=insertionSort.js.map