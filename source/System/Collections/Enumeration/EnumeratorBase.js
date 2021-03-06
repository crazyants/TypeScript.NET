/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../Types", "../../Disposable/DisposableBase", "../../Disposable/ObjectPool", "./IteratorResult", "../../../extends"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Types_1 = require("../../Types");
    var DisposableBase_1 = require("../../Disposable/DisposableBase");
    var ObjectPool_1 = require("../../Disposable/ObjectPool");
    var IteratorResult_1 = require("./IteratorResult");
    var extends_1 = require("../../../extends");
    var __extends = extends_1.default;
    var VOID0 = void (0);
    var yielderPool;
    function yielder(recycle) {
        if (!yielderPool)
            yielderPool
                = new ObjectPool_1.ObjectPool(40, function () { return new Yielder(); }, function (y) { return y.yieldBreak(); });
        if (!recycle)
            return yielderPool.take();
        yielderPool.add(recycle);
    }
    var Yielder = (function () {
        function Yielder() {
            this._current = VOID0;
        }
        Object.defineProperty(Yielder.prototype, "current", {
            get: function () { return this._current; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Yielder.prototype, "index", {
            get: function () { return this._index; },
            enumerable: true,
            configurable: true
        });
        Yielder.prototype.yieldReturn = function (value) {
            this._current = value;
            if (this._index === VOID0)
                this._index = 0;
            else
                this._index++;
            return true;
        };
        Yielder.prototype.yieldBreak = function () {
            this._current = VOID0;
            this._index = VOID0;
            return false;
        };
        Yielder.prototype.dispose = function () {
            this.yieldBreak();
        };
        return Yielder;
    }());
    var EnumeratorState;
    (function (EnumeratorState) {
        EnumeratorState[EnumeratorState["Before"] = 0] = "Before";
        EnumeratorState[EnumeratorState["Running"] = 1] = "Running";
        EnumeratorState[EnumeratorState["After"] = 2] = "After";
    })(EnumeratorState || (EnumeratorState = {}));
    var EnumeratorBase = (function (_super) {
        __extends(EnumeratorBase, _super);
        function EnumeratorBase(_initializer, _tryGetNext, disposer, isEndless) {
            _super.call(this);
            this._initializer = _initializer;
            this._tryGetNext = _tryGetNext;
            this.reset();
            if (Types_1.Type.isBoolean(isEndless))
                this._isEndless = isEndless;
            else if (Types_1.Type.isBoolean(disposer))
                this._isEndless = disposer;
            if (Types_1.Type.isFunction(disposer))
                this._disposer = disposer;
        }
        Object.defineProperty(EnumeratorBase.prototype, "current", {
            get: function () {
                var y = this._yielder;
                return y && y.current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnumeratorBase.prototype, "index", {
            get: function () {
                var y = this._yielder;
                return y && y.index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnumeratorBase.prototype, "isEndless", {
            get: function () {
                return this._isEndless;
            },
            enumerable: true,
            configurable: true
        });
        EnumeratorBase.prototype.reset = function () {
            var _ = this;
            _.throwIfDisposed();
            var y = _._yielder;
            _._yielder = null;
            _._state = EnumeratorState.Before;
            if (y)
                yielder(y);
        };
        EnumeratorBase.prototype.moveNext = function () {
            var _ = this;
            try {
                switch (_._state) {
                    case EnumeratorState.Before:
                        _._yielder = _._yielder || yielder();
                        _._state = EnumeratorState.Running;
                        var initializer = _._initializer;
                        if (initializer)
                            initializer();
                    case EnumeratorState.Running:
                        if (_._tryGetNext(_._yielder)) {
                            return true;
                        }
                        else {
                            this.dispose();
                            return false;
                        }
                    default:
                        return false;
                }
            }
            catch (e) {
                this.dispose();
                throw e;
            }
        };
        EnumeratorBase.prototype.nextValue = function () {
            return this.moveNext()
                ? this.current
                : VOID0;
        };
        EnumeratorBase.prototype.next = function () {
            return this.moveNext()
                ? new IteratorResult_1.IteratorResult(this.current, this.index)
                : IteratorResult_1.IteratorResult.Done;
        };
        EnumeratorBase.prototype['return'] = function (value) {
            try {
                return value === VOID0 || this._state === EnumeratorState.After
                    ? IteratorResult_1.IteratorResult.Done
                    : new IteratorResult_1.IteratorResult(value, VOID0, true);
            }
            finally {
                this.dispose();
            }
        };
        EnumeratorBase.prototype._onDispose = function () {
            var _ = this;
            var disposer = _._disposer;
            _._initializer = null;
            _._disposer = null;
            var y = _._yielder;
            _._yielder = null;
            this._state = EnumeratorState.After;
            if (y)
                yielder(y);
            if (disposer)
                disposer();
        };
        return EnumeratorBase;
    }(DisposableBase_1.DisposableBase));
    exports.EnumeratorBase = EnumeratorBase;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EnumeratorBase;
});
//# sourceMappingURL=EnumeratorBase.js.map