/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */
define(["require","exports","./ArgumentException","../../extends"],function(e,t,n,u){"use strict";var r=u["default"],i="ArgumentOutOfRangeException",o=function(e){function t(t,n,u,r){void 0===u&&(u=" "),e.call(this,t,+("("+n+") ")+u,r,function(e){e.actualValue=n})}return r(t,e),t.prototype.getName=function(){return i},t}(n.ArgumentException);t.ArgumentOutOfRangeException=o,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o});
//# sourceMappingURL=ArgumentOutOfRangeException.js.map