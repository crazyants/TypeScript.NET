/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
"use strict";
var LinkedNodeList_1 = require("./LinkedNodeList");
var ArgumentNullException_1 = require("../Exceptions/ArgumentNullException");
var Enumerator_1 = require("./Enumeration/Enumerator");
var EmptyEnumerator_1 = require("./Enumeration/EmptyEnumerator");
var dispose_1 = require("../Disposable/dispose");
var Compare_1 = require("../Compare");
var CollectionBase_1 = require("./CollectionBase");
var extends_1 = require("../../extends");
var __extends = extends_1.default;
var VOID0 = void 0;
var OTHER = 'other';
var SetBase = (function (_super) {
    __extends(SetBase, _super);
    function SetBase(source) {
        _super.call(this, VOID0, Compare_1.areEqual);
        this._importEntries(source);
    }
    SetBase.prototype._getSet = function () {
        var s = this._set;
        if (!s)
            this._set = s = new LinkedNodeList_1.LinkedNodeList();
        return s;
    };
    SetBase.prototype.getCount = function () {
        return this._set ? this._set.unsafeCount : 0;
    };
    SetBase.prototype.exceptWith = function (other) {
        var _ = this;
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        Enumerator_1.forEach(other, function (v) {
            if (_._removeInternal(v))
                _._incrementModified();
        });
        _._signalModification();
    };
    SetBase.prototype.intersectWith = function (other) {
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        var _ = this;
        if (other instanceof SetBase) {
            var s = _._set;
            if (s)
                s.forEach(function (n) {
                    if (!other.contains(n.value) && _._removeInternal(n.value))
                        _._incrementModified();
                });
            _._signalModification();
        }
        else {
            dispose_1.using(_.newUsing(other), function (o) { return _.intersectWith(o); });
        }
    };
    SetBase.prototype.isProperSubsetOf = function (other) {
        var _this = this;
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        return other instanceof SetBase
            ? other.isProperSupersetOf(this)
            : dispose_1.using(this.newUsing(other), function (o) { return o.isProperSupersetOf(_this); });
    };
    SetBase.prototype.isProperSupersetOf = function (other) {
        var _this = this;
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        var result = true, count;
        if (other instanceof SetBase) {
            result = this.isSupersetOf(other);
            count = other.getCount();
        }
        else {
            count = dispose_1.using(this.newUsing(), function (o) {
                Enumerator_1.forEach(other, function (v) {
                    o.add(v);
                    return result = _this.contains(v);
                });
                return o.getCount();
            });
        }
        return result && this.getCount() > count;
    };
    SetBase.prototype.isSubsetOf = function (other) {
        var _this = this;
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        return other instanceof SetBase
            ? other.isSupersetOf(this)
            : dispose_1.using(this.newUsing(other), function (o) { return o.isSupersetOf(_this); });
    };
    SetBase.prototype.isSupersetOf = function (other) {
        var _this = this;
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        var result = true;
        Enumerator_1.forEach(other, function (v) {
            return result = _this.contains(v);
        });
        return result;
    };
    SetBase.prototype.overlaps = function (other) {
        var _this = this;
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        var result = false;
        Enumerator_1.forEach(other, function (v) { return !(result = _this.contains(v)); });
        return result;
    };
    SetBase.prototype.setEquals = function (other) {
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        return this.getCount() == (other instanceof SetBase
            ? other.getCount()
            : dispose_1.using(this.newUsing(other), function (o) { return o.getCount(); }))
            && this.isSubsetOf(other);
    };
    SetBase.prototype.symmetricExceptWith = function (other) {
        if (!other)
            throw new ArgumentNullException_1.ArgumentNullException(OTHER);
        var _ = this;
        if (other instanceof SetBase) {
            Enumerator_1.forEach(other, function (v) {
                if (_.contains(v)) {
                    if (_._removeInternal(v))
                        _._incrementModified();
                }
                else {
                    if (_._addInternal(v))
                        _._incrementModified();
                }
            });
            _._signalModification();
        }
        else {
            dispose_1.using(this.newUsing(other), function (o) { return _.symmetricExceptWith(o); });
        }
    };
    SetBase.prototype.unionWith = function (other) {
        this.importEntries(other);
    };
    SetBase.prototype._clearInternal = function () {
        var s = this._set;
        return s ? s.clear() : 0;
    };
    SetBase.prototype._onDispose = function () {
        _super.prototype._onDispose.call(this);
        this._set = null;
    };
    SetBase.prototype.contains = function (item) {
        return !(!this.getCount() || !this._getNode(item));
    };
    SetBase.prototype.getEnumerator = function () {
        var s = this._set;
        return s && this.getCount()
            ? LinkedNodeList_1.LinkedNodeList.valueEnumeratorFrom(s)
            : EmptyEnumerator_1.EmptyEnumerator;
    };
    SetBase.prototype.forEach = function (action, useCopy) {
        if (useCopy === void 0) { useCopy = false; }
        return useCopy
            ? _super.prototype.forEach.call(this, action, useCopy)
            : this._set.forEach(function (node, i) { return action(node.value, i); });
    };
    SetBase.prototype._removeNode = function (node) {
        return !!node
            && this.remove(node.value) != 0;
    };
    SetBase.prototype.removeFirst = function () {
        var s = this._set;
        return this._removeNode(s && s.first);
    };
    SetBase.prototype.removeLast = function () {
        var s = this._set;
        return this._removeNode(s && s.last);
    };
    return SetBase;
}(CollectionBase_1.CollectionBase));
exports.SetBase = SetBase;
function wipe(map, depth) {
    if (depth === void 0) { depth = 1; }
    if (map && depth) {
        for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
            var key = _a[_i];
            var v = map[key];
            delete map[key];
            wipe(v, depth - 1);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SetBase;
//# sourceMappingURL=SetBase.js.map