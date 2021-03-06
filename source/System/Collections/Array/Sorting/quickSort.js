/*!
 * @author Sebastian Belmar / https://github.com/sebabelmar/
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../../Exceptions/ArgumentNullException"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ArgumentNullException_1 = require("../../../Exceptions/ArgumentNullException");
    function quickSort(target) {
        if (!target)
            throw new ArgumentNullException_1.ArgumentNullException("target");
        var len = target.length;
        return target.length < 2 ? target : sort(target, 0, len - 1);
    }
    exports.quickSort = quickSort;
    function sort(target, low, high) {
        if (low < high) {
            var swap, pivotIndex = Math.floor((low + high) / 2);
            swap = target[pivotIndex];
            target[pivotIndex] = target[high];
            target[high] = swap;
            var i = low;
            for (var j = low; j < high; j++) {
                if (target[j] < target[high]) {
                    swap = target[i];
                    target[i] = target[j];
                    target[j] = swap;
                    i++;
                }
            }
            swap = target[i];
            target[i] = target[high];
            target[high] = swap;
            sort(target, low, i - 1);
            sort(target, i + 1, high);
        }
        return target;
    }
});
//# sourceMappingURL=quickSort.js.map