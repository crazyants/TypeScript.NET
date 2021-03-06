/*!
 * @author electricessence / https://github.com/electricessence/
 * Based upon .NET source.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Source: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
"use strict";
var LinkedNodeList_1 = require("../Collections/LinkedNodeList");
var dispose_1 = require("../Disposable/dispose");
var Subscription_1 = require("./Subscription");
var DisposableBase_1 = require("../Disposable/DisposableBase");
var extends_1 = require("../../extends");
var __extends = extends_1.default;
var SubscribableBase = (function (_super) {
    __extends(SubscribableBase, _super);
    function SubscribableBase() {
        _super.call(this);
    }
    SubscribableBase.prototype._getSubscribers = function () {
        var s = this.__subscriptions;
        return s
            ? s.map(function (node) { return (node && node.value && node.value.subscriber); })
            : null;
    };
    SubscribableBase.prototype._findEntryNode = function (subscriber) {
        var s = this.__subscriptions;
        return s && s.find(function (n) { return !!n.value && n.value.subscriber === subscriber; });
    };
    SubscribableBase.prototype.subscribe = function (subscriber) {
        var _ = this;
        _.throwIfDisposed();
        var n = _._findEntryNode(subscriber);
        if (n)
            return n.value;
        var _s = _.__subscriptions;
        if (!_s)
            _.__subscriptions = _s
                = new LinkedNodeList_1.LinkedNodeList();
        var s = new Subscription_1.Subscription(_, subscriber);
        _s.addNode({ value: s });
        return s;
    };
    SubscribableBase.prototype.unsubscribe = function (subscriber) {
        var _ = this;
        var n = _._findEntryNode(subscriber);
        if (n) {
            var s = n.value;
            _.__subscriptions.removeNode(n);
            if (s)
                s.dispose();
        }
    };
    SubscribableBase.prototype._unsubscribeAll = function (returnSubscribers) {
        if (returnSubscribers === void 0) { returnSubscribers = false; }
        var _ = this;
        var _s = _.__subscriptions;
        if (!_s)
            return null;
        var s = _s.map(function (n) { return n.value; });
        var u = returnSubscribers ? s.map(function (o) { return o.subscriber; }) : null;
        _s.clear();
        dispose_1.dispose.these(s);
        return u;
    };
    SubscribableBase.prototype.unsubscribeAll = function () {
        this._unsubscribeAll();
    };
    SubscribableBase.prototype._onDispose = function () {
        _super.prototype._onDispose.call(this);
        this._unsubscribeAll();
        var s = this.__subscriptions;
        this.__subscriptions = null;
        dispose_1.dispose(s);
    };
    return SubscribableBase;
}(DisposableBase_1.DisposableBase));
exports.SubscribableBase = SubscribableBase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubscribableBase;
//# sourceMappingURL=SubscribableBase.js.map