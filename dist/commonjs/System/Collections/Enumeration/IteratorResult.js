/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
"use strict";
var VOID0 = void (0);
var IteratorResult = (function () {
    function IteratorResult(value, index, done) {
        if (done === void 0) { done = false; }
        this.value = value;
        this.index = index;
        this.done = done;
        Object.freeze(this);
    }
    return IteratorResult;
}());
exports.IteratorResult = IteratorResult;
var IteratorResult;
(function (IteratorResult) {
    IteratorResult.Done = new IteratorResult(VOID0, VOID0, true);
    function GetDone(value) { return IteratorResult.Done; }
    IteratorResult.GetDone = GetDone;
})(IteratorResult = exports.IteratorResult || (exports.IteratorResult = {}));
Object.freeze(IteratorResult);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IteratorResult;
//# sourceMappingURL=IteratorResult.js.map