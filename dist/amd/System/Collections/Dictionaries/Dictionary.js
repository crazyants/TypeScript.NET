/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)};define(["require","exports","../../Compare","../../Types","../../Functions","../Enumeration/EnumeratorBase","../LinkedNodeList","../../Disposable/ObjectPool","./DictionaryBase"],function(e,t,r,n,o,u,i,s,a){"use strict";function c(e){return p||(p=new s.ObjectPool(20,function(){return new i.LinkedNodeList},function(e){return e.clear()})),e?void p.add(e):p.take()}function l(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function f(e){return null===e?d:e===y?n.Type.UNDEFINED:n.Type.hasMemberOfType(e,_,n.Type.FUNCTION)?e.getHashCode():typeof e.toString==n.Type.FUNCTION?e.toString():Object.prototype.toString.call(e)}var p,y=void 0,v=function(){function e(e,t,r,n){this.key=e,this.value=t,this.previous=r,this.next=n}return e}(),d="null",_="getHashCode",h=function(e){function t(t){void 0===t&&(t=o.Functions.Identity),e.call(this),this._keyComparer=t,this._entries=c(),this._buckets={}}return __extends(t,e),t.prototype.getCount=function(){return this._entries.unsafeCount},t.prototype._getBucket=function(e,t){if(null===e||e===y||!t&&!this.getCount())return null;var r=this._buckets,n=l(r,e)?r[e]:y;return t&&!n&&(r[e]=n=c()),n},t.prototype._getBucketEntry=function(e,t,r){if(null===e||e===y||!this.getCount())return null;var n=this,o=n._keyComparer,u=o(e);return r||(r=n._getBucket(t||f(u))),r&&r.find(function(e){return o(e.key)===u})},t.prototype._getEntry=function(e){var t=this._getBucketEntry(e);return t&&t.value},t.prototype.getValue=function(e){var t=this._getEntry(e);return t?t.value:y},t.prototype._setValueInternal=function(e,t){var n=this,o=n._buckets,u=n._entries,i=n._keyComparer,s=i(e),a=f(s),l=n._getBucket(a),p=l&&n._getBucketEntry(e,a,l);if(p){if(t!==y){var d=p.value.value;return p.value.value=t,!r.areEqual(t,d)}var _=l.removeNode(p),h=u.removeNode(p.value);if(_&&!l.count&&(delete o[a],c(l),l=null),_!==h)throw"Entries and buckets are out of sync.";if(_)return!0}else if(t!==y){l||(l=n._getBucket(a,!0));var k=new v(e,t);return u.addNode(k),l.addNode(new v(e,k)),!0}return!1},t.prototype._clearInternal=function(){var e=this,t=e._buckets;for(var r in t)if(t.hasOwnProperty(r)){var n=t[r];delete t[r],c(n)}return e._entries.clear()},t.prototype.getEnumerator=function(){var e,t,r=this;return new u.EnumeratorBase(function(){e=r._version,t=r._entries.first},function(n){if(null!=t){r.assertVersion(e);var o={key:t.key,value:t.value};return t=t.next,n.yieldReturn(o)}return n.yieldBreak()})},t.prototype.getKeys=function(){for(var e=this,t=[],r=e._entries.first;r;)t.push(r.key),r=r.next;return t},t.prototype.getValues=function(){for(var e=this,t=[],r=e._entries.first;r;)t.push(r.value),r=r.next;return t},t}(a["default"]);t.Dictionary=h,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=h});
//# sourceMappingURL=Dictionary.js.map
