/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var r, isCommonJS, isRequireJS, isNodeJS;
    return {
        setters:[],
        execute: function() {
            r = eval('require');
            exports_1("isCommonJS", isCommonJS = !!(r && r.resolve));
            exports_1("isRequireJS", isRequireJS = !!(r && r.toUrl && r.defined));
            exports_1("isNodeJS", isNodeJS = typeof process == "object"
                && process.toString() === "[object process]"
                && process.nextTick != void 0);
            Object.freeze(exports);
        }
    }
});
//# sourceMappingURL=Environment.js.map