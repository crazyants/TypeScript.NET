/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","../System/Compare","../System/Collections/Array/Compare","../System/Collections/Array/Utility","../System/Collections/Enumeration/Enumerator","../System/Types","../System/Integer","../System/Functions","../System/Collections/Enumeration/ArrayEnumerator","../System/Collections/Enumeration/EnumeratorBase","../System/Collections/Dictionaries/Dictionary","../System/Collections/Queue","../System/Disposable/dispose","../System/Disposable/DisposableBase","../System/Collections/Enumeration/UnsupportedEnumerableException","../System/Disposable/ObjectDisposedException","../System/Collections/Sorting/KeySortedContext","../System/Exceptions/ArgumentNullException","../System/Exceptions/ArgumentOutOfRangeException"],function(t,e,n,r,o,u,i,s,f,a,c,l,p,d,y,h,v,m,w,g){"use strict";function E(){return u.empty}function N(t,e){void 0===e&&(e=null);var n=new m["default"](e,t.keySelector,t.order,t.comparer);return t.parent?N(t.parent,n):n}function _(t){if(t)throw new v["default"]("Enumerable")}var x={},I=void 0,D=function(t){return 0},b=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),e.prototype.Greater=function(t,e){return t>e?t:e},e.prototype.Lesser=function(t,e){return e>t?t:e},e}(f["default"]),R=new b;Object.freeze(R);var k=function(t){function e(e,n){t.call(this,n),this._enumeratorFactory=e,this._isEndless=!0}return __extends(e,t),Object.defineProperty(e.prototype,"isEndless",{get:function(){return this._isEndless},enumerable:!0,configurable:!0}),e.prototype.getEnumerator=function(){return this.throwIfDisposed(),this._enumeratorFactory()},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._enumeratorFactory=null},e.prototype.asEnumerable=function(){var t=this;return t.throwIfDisposed(),new e(function(){return t.getEnumerator()})},e.prototype.doAction=function(t,e,n){void 0===n&&(n=this.isEndless);var r=this,o=!r.throwIfDisposed();return new A(function(){var u,i=0;return new c["default"](function(){_(o),e&&e(),i=0,u=r.getEnumerator()},function(e){for(_(o);u.moveNext();){var n=t(u.current,i++);if(n===!1||0===n)return e.yieldBreak();if(2!==n)return e.yieldReturn(u.current)}return!1},function(){d.dispose(u)},n)},function(){o=!0},n)},e.prototype.force=function(){this.throwIfDisposed(),this.doAction(D).getEnumerator().moveNext()},e.prototype.skip=function(t){var e=this;return e.throwIfDisposed(),isFinite(t)?(s["default"].assert(t,"count"),this.doAction(function(e,n){return t>n?2:1})):A.empty()},e.prototype.take=function(t){if(!(t>0))return A.empty();var e=this;if(e.throwIfDisposed(),!isFinite(t))throw new g["default"]("count",t,"Must be finite.");return s["default"].assert(t,"count"),e.doAction(function(e,n){return t>n},null,!1)},e.prototype.elementAt=function(t){var e=this.elementAtOrDefault(t,x);if(e===x)throw new g["default"]("index",t,"is greater than or equal to the number of elements in source");return e},e.prototype.elementAtOrDefault=function(t,e){void 0===e&&(e=null);var n=this;n.throwIfDisposed(),s["default"].assertZeroOrGreater(t,"index");var r=t;return d.using(this.getEnumerator(),function(t){for(var n=0;t.moveNext();){if(n==r)return t.current;n++}return e})},e.prototype.first=function(){var t=this.firstOrDefault(x);if(t===x)throw new Error("first:The sequence is empty.");return t},e.prototype.firstOrDefault=function(t){void 0===t&&(t=null);var e=this;return e.throwIfDisposed(),d.using(this.getEnumerator(),function(e){return e.moveNext()?e.current:t})},e.prototype.single=function(){var t=this;return t.throwIfDisposed(),d.using(this.getEnumerator(),function(t){if(t.moveNext()){var e=t.current;if(!t.moveNext())return e;throw new Error("single:sequence contains more than one element.")}throw new Error("single:The sequence is empty.")})},e.prototype.singleOrDefault=function(t){void 0===t&&(t=null);var e=this;return e.throwIfDisposed(),d.using(this.getEnumerator(),function(e){if(e.moveNext()){var n=e.current;if(!e.moveNext())return n}return t})},e.prototype.any=function(){var t=this;return t.throwIfDisposed(),d.using(this.getEnumerator(),function(t){return t.moveNext()})},e.prototype.isEmpty=function(){return!this.any()},e.prototype.traverseBreadthFirst=function(t,e){void 0===e&&(e=R.Identity);var n=this,r=n._isEndless||null;return new A(function(){var o,u,i,s=0;return new c["default"](function(){s=0,u=[],i=0,o=n.getEnumerator()},function(n){for(;;){if(o.moveNext())return u[i++]=o.current,n.yieldReturn(e(o.current,s));if(!i)return n.yieldBreak();var r=A.from(u).selectMany(t);if(!r.any())return n.yieldBreak();s++,u=[],i=0,o.dispose(),o=r.getEnumerator()}},function(){d.dispose(o),u.length=0},r)},null,r)},e.prototype.traverseDepthFirst=function(t,e){void 0===e&&(e=R.Identity);var n=this,r=n._isEndless||null;return new A(function(){var o,i,s=[];return new c["default"](function(){o=n.getEnumerator(),i=0},function(n){for(;;){if(o.moveNext()){var r=e(o.current,i);s[i++]=o;var f=A.fromAny(t(o.current));return o=f?f.getEnumerator():u.empty,n.yieldReturn(r)}if(0==i)return!1;o.dispose(),o=s[--i],s.length=i}},function(){try{d.dispose(o)}finally{d.dispose.these(s)}},r)},null,r)},e.prototype.flatten=function(){var t=this,e=t._isEndless||null;return new A(function(){var n,r=null;return new c["default"](function(){n=t.getEnumerator()},function(t){for(;;){if(r){if(r.moveNext())return t.yieldReturn(r.current);r.dispose(),r=null}if(n.moveNext()){var e=n.current,o=!i["default"].isString(e)&&A.fromAny(e);if(o){r=o.selectMany(R.Identity).flatten().getEnumerator();continue}return t.yieldReturn(e)}return t.yieldBreak()}},function(){d.dispose(n,r)},e)},null,e)},e.prototype.pairwise=function(t){var e=this;return new A(function(){var n;return new c["default"](function(){n=e.getEnumerator(),n.moveNext()},function(e){var r=n.current;return n.moveNext()&&e.yieldReturn(t(r,n.current))},function(){d.dispose(n)},e._isEndless)},null,e._isEndless)},e.prototype.scan=function(t,e){var n=e!==I,r=this;return new A(function(){var o,u,i;return new c["default"](function(){o=r.getEnumerator(),i=!0},function(r){return i?(i=!1,n?r.yieldReturn(u=e):o.moveNext()&&r.yieldReturn(u=o.current)):o.moveNext()?r.yieldReturn(u=t(u,o.current)):!1},function(){d.dispose(o)},r._isEndless)},null,r._isEndless)},e.prototype.select=function(t){var e=this,n=!e.throwIfDisposed();return new A(function(){var r,o=0;return new c["default"](function(){_(n),o=0,r=e.getEnumerator()},function(e){return _(n),r.moveNext()?e.yieldReturn(t(r.current,o++)):e.yieldBreak()},function(){d.dispose(r)},e._isEndless)},function(){n=!0},e._isEndless)},e.prototype._selectMany=function(t,e){var n=this,r=n._isEndless||null;return e||(e=function(t,e){return e}),new A(function(){var o,i,s=0;return new c["default"](function(){o=n.getEnumerator(),i=void 0,s=0},function(n){if(i===I&&!o.moveNext())return!1;do{if(!i){var r=t(o.current,s++);if(!r)continue;i=u.from(r)}if(i.moveNext())return n.yieldReturn(e(o.current,i.current));i.dispose(),i=null}while(o.moveNext());return!1},function(){d.dispose(o,i),o=null,i=null},r)},null,r)},e.prototype.selectMany=function(t,e){return this._selectMany(t,e)},e.prototype._choose=function(t){var e=this,n=!e.throwIfDisposed();return new A(function(){var r,o=0;return new c["default"](function(){_(n),o=0,r=e.getEnumerator()},function(e){for(_(n);r.moveNext();){var u=t(r.current,o++);if(null!==u&&u!==I)return e.yieldReturn(u)}return!1},function(){d.dispose(r)},e._isEndless)},function(){n=!0},e._isEndless)},e.prototype.choose=function(t){return void 0===t&&(t=R.Identity),this._choose(t)},e.prototype.where=function(t){var e=this,n=!e.throwIfDisposed();return new A(function(){var r,o=0;return new c["default"](function(){_(n),o=0,r=e.getEnumerator()},function(e){for(_(n);r.moveNext();)if(t(r.current,o++))return e.yieldReturn(r.current);return!1},function(){d.dispose(r)},e._isEndless)},function(){n=!0},e._isEndless)},e.prototype.ofType=function(t){var e;switch(t){case Number:e=i["default"].NUMBER;break;case String:e=i["default"].STRING;break;case Boolean:e=i["default"].BOOLEAN;break;case Function:e=i["default"].FUNCTION;break;default:return this.where(function(e){return e instanceof t})}return this.choose().where(function(t){return typeof t===e})},e.prototype.except=function(t,e){var n=this,r=!n.throwIfDisposed();return new A(function(){var o,i;return new c["default"](function(){_(r),o=n.getEnumerator(),i=new l["default"](e),t&&u.forEach(t,function(t){return i.addByKeyValue(t,!0)})},function(t){for(_(r);o.moveNext();){var e=o.current;if(!i.containsKey(e))return i.addByKeyValue(e,!0),t.yieldReturn(e)}return!1},function(){d.dispose(o),i.clear()},n._isEndless)},function(){r=!0},n._isEndless)},e.prototype.distinct=function(t){return this.except(null,t)},e.prototype.distinctUntilChanged=function(t){void 0===t&&(t=R.Identity);var e=this,r=!e.throwIfDisposed();return new A(function(){var o,u,i=!0;return new c["default"](function(){_(r),o=e.getEnumerator()},function(e){for(_(r);o.moveNext();){var s=t(o.current);if(i)i=!1;else if(n.areEqual(u,s))continue;return u=s,e.yieldReturn(o.current)}return!1},function(){d.dispose(o)},e._isEndless)},function(){r=!0},e._isEndless)},e.prototype.defaultIfEmpty=function(t){void 0===t&&(t=null);var e=this,n=!e.throwIfDisposed();return new A(function(){var r,o;return new c["default"](function(){o=!0,_(n),r=e.getEnumerator()},function(e){return _(n),r.moveNext()?(o=!1,e.yieldReturn(r.current)):o?(o=!1,e.yieldReturn(t)):!1},function(){d.dispose(r)},e._isEndless)},null,e._isEndless)},e.prototype.zip=function(t,e){var n=this;return n.throwIfDisposed(),new A(function(){var r,o,i=0;return new c["default"](function(){i=0,r=n.getEnumerator(),o=u.from(t)},function(t){return r.moveNext()&&o.moveNext()&&t.yieldReturn(e(r.current,o.current,i++))},function(){d.dispose(r,o)})})},e.prototype.zipMultiple=function(t,e){var n=this;return n.throwIfDisposed(),t.length?new A(function(){var r,o,i,s=0;return new c["default"](function(){r=new p["default"](t),s=0,o=n.getEnumerator(),i=null},function(t){if(o.moveNext())for(;;){for(;!i;){if(!r.count)return t.yieldBreak();var n=r.dequeue();n&&(i=u.from(n))}if(i.moveNext())return t.yieldReturn(e(o.current,i.current,s++));i.dispose(),i=null}return t.yieldBreak()},function(){d.dispose(o,r)})}):A.empty()},e.prototype.join=function(t,e,n,r,o){void 0===o&&(o=R.Identity);var u=this;return new A(function(){var i,s,f=null,a=0;return new c["default"](function(){i=u.getEnumerator(),s=A.from(t).toLookup(n,R.Identity,o)},function(t){for(;;){if(null!=f){var n=f[a++];if(n!==I)return t.yieldReturn(r(i.current,n));n=null,a=0}if(!i.moveNext())return t.yieldBreak();var o=e(i.current);f=s.get(o)}},function(){d.dispose(i)})})},e.prototype.groupJoin=function(t,e,n,r,o){void 0===o&&(o=R.Identity);var u=this;return new A(function(){var i,s=null;return new c["default"](function(){i=u.getEnumerator(),s=A.from(t).toLookup(n,R.Identity,o)},function(t){return i.moveNext()&&t.yieldReturn(r(i.current,s.get(e(i.current))))},function(){d.dispose(i)})})},e.prototype.merge=function(t){var e=this,n=e._isEndless||null;return t&&0!=t.length?new A(function(){var r,o;return new c["default"](function(){r=e.getEnumerator(),o=new p["default"](t)},function(t){for(;;){for(;!r&&o.count;)r=u.from(o.dequeue());if(r&&r.moveNext())return t.yieldReturn(r.current);{if(!r)return t.yieldBreak();r.dispose(),r=null}}},function(){d.dispose(r,o)},n)},null,n):e},e.prototype.concat=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.merge(t)},e.prototype.union=function(t,e){void 0===e&&(e=R.Identity);var n=this,r=n._isEndless||null;return new A(function(){var o,i,s;return new c["default"](function(){o=n.getEnumerator(),s=new l["default"](e)},function(e){var n;if(i===I){for(;o.moveNext();)if(n=o.current,!s.containsKey(n))return s.addByKeyValue(n,null),e.yieldReturn(n);i=u.from(t)}for(;i.moveNext();)if(n=i.current,!s.containsKey(n))return s.addByKeyValue(n,null),e.yieldReturn(n);return!1},function(){d.dispose(o,i)},r)},null,r)},e.prototype.insertAt=function(t,e){s["default"].assertZeroOrGreater(t,"index");var n=t,r=this,o=r._isEndless||null;return r.throwIfDisposed(),new A(function(){var t,i,s=0,f=!1;return new c["default"](function(){s=0,t=r.getEnumerator(),i=u.from(e),f=!1},function(e){return s==n&&(f=!0,i.moveNext())?e.yieldReturn(i.current):t.moveNext()?(s++,e.yieldReturn(t.current)):!f&&i.moveNext()&&e.yieldReturn(i.current)},function(){d.dispose(t,i)},o)},null,o)},e.prototype.alternateMultiple=function(t){var e=this;return new A(function(){var n,r,o,u;return new c["default"](function(){u=new a["default"](A.toArray(t)),o=e.getEnumerator();var i=o.moveNext();r=i?1:0,i&&(n=o.current)},function(t){switch(r){case 0:return t.yieldBreak();case 2:if(u.moveNext())return t.yieldReturn(u.current);u.reset(),r=1}var e=n,i=o.moveNext();return r=i?2:0,i&&(n=o.current),t.yieldReturn(e)},function(){d.dispose(o,u)},e._isEndless)},null,e._isEndless)},e.prototype.alternateSingle=function(t){return this.alternateMultiple(A.make(t))},e.prototype.alternate=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.alternateMultiple(t)},e.prototype.catchError=function(t){var e=this,n=!e.throwIfDisposed();return new A(function(){var r;return new c["default"](function(){try{_(n),r=e.getEnumerator()}catch(t){}},function(e){try{if(_(n),r.moveNext())return e.yieldReturn(r.current)}catch(o){t(o)}return!1},function(){d.dispose(r)})})},e.prototype.finallyAction=function(t){var e=this,n=!e.throwIfDisposed();return new A(function(){var r;return new c["default"](function(){_(n),r=e.getEnumerator()},function(t){return _(n),r.moveNext()?t.yieldReturn(r.current):!1},function(){try{d.dispose(r)}finally{t()}})})},e.prototype.buffer=function(t){if(1>t||!isFinite(t))throw new Error("Invalid buffer size.");s["default"].assert(t,"size");var e,n=this;return new A(function(){var r;return new c["default"](function(){r=n.getEnumerator()},function(n){var u=o.initialize(t);for(e=0;t>e&&r.moveNext();)u[e++]=r.current;return u.length=e,e&&n.yieldReturn(u)},function(){d.dispose(r)},n._isEndless)},null,n._isEndless)},e.prototype.share=function(){var t=this;t.throwIfDisposed();var e;return new A(function(){return e||(e=t.getEnumerator())},function(){d.dispose(e)},t._isEndless)},e}(y["default"]);e.InfiniteEnumerable=k;var A=function(t){function e(e,n,r){void 0===r&&(r=null),t.call(this,e,n),this._isEndless=r}return __extends(e,t),e.from=function(t){var n=e.fromAny(t);if(!n)throw new h["default"];return n},e.fromAny=function(t,n){if(void 0===n&&(n=null),i["default"].isObject(t)||i["default"].isString(t)){if(t instanceof e)return t;if(i["default"].isArrayLike(t))return new B(t);if(u.isEnumerable(t))return new e(function(){return t.getEnumerator()},null,t.isEndless)}return n},e.toArray=function(t){return t instanceof e?t.toArray():u.toArray(t)},e.choice=function(t){var e=t&&t.length;if(!e||!isFinite(e))throw new g["default"]("length",length);return new k(function(){return new c["default"](null,function(e){return e.yieldReturn(s["default"].random.select(t))},!0)})},e.chooseFrom=function(){for(var t=[],n=0;n<arguments.length;n++)t[n-0]=arguments[n];return e.choice(t)},e.cycle=function(t){var e=t&&t.length;if(!e||!isFinite(e))throw new g["default"]("length",length);return new k(function(){var e=0;return new c["default"](function(){e=0},function(n){return e>=t.length&&(e=0),n.yieldReturn(t[e++])},!0)})},e.cycleThrough=function(){for(var t=[],n=0;n<arguments.length;n++)t[n-0]=arguments[n];return e.cycle(t)},e.empty=function(){return new O(E)},e.repeat=function(t,n){return void 0===n&&(n=1/0),n>0?isFinite(n)&&s["default"].assert(n,"count")?new O(function(){var e=n,r=0;return new c["default"](function(){r=0},function(n){return r++<e&&n.yieldReturn(t)},null,!1)}):new e(function(){return new c["default"](null,function(e){return e.yieldReturn(t)},!0)}):e.empty()},e.repeatWithFinalize=function(t,e){return new k(function(){var n;return new c["default"](function(){n=t()},function(t){return t.yieldReturn(n)},function(){e(n)},!0)})},e.make=function(t){return e.repeat(t,1)},e.range=function(t,n,r){if(void 0===r&&(r=1),!isFinite(t))throw new g["default"]("start",t,"Must be a finite number.");if(!(n>0))return e.empty();if(!r)throw new g["default"]("step",r,"Must be a valid value");if(!isFinite(r))throw new g["default"]("step",r,"Must be a finite number.");return s["default"].assert(n,"count"),new O(function(){var e,o=n,u=0;return new c["default"](function(){u=0,e=t},function(t){var i=u++<o&&t.yieldReturn(e);return i&&n>u&&(e+=r),i},!1)})},e.rangeDown=function(t,n,r){return void 0===r&&(r=1),r=-1*Math.abs(r),e.range(t,n,r)},e.toInfinity=function(t,e){if(void 0===t&&(t=0),void 0===e&&(e=1),!isFinite(t))throw new g["default"]("start",t,"Must be a finite number.");if(!e)throw new g["default"]("step",e,"Must be a valid value");if(!isFinite(e))throw new g["default"]("step",e,"Must be a finite number.");return new k(function(){var n;return new c["default"](function(){n=t},function(t){var r=n;return n+=e,t.yieldReturn(r)},!0)})},e.toNegativeInfinity=function(t,n){return void 0===t&&(t=0),void 0===n&&(n=1),e.toInfinity(t,-n)},e.rangeTo=function(t,e,n){if(void 0===n&&(n=1),isNaN(e)||!isFinite(e))throw new g["default"]("to",e,"Must be a finite number.");if(n&&!isFinite(n))throw new g["default"]("step",n,"Must be a finite non-zero number.");return n=Math.abs(n),new O(function(){var r;return new c["default"](function(){r=t},e>t?function(t){var o=e>=r&&t.yieldReturn(r);return o&&(r+=n),o}:function(t){var o=r>=e&&t.yieldReturn(r);return o&&(r-=n),o},!1)})},e.matches=function(t,e,n){void 0===n&&(n="");var r=typeof t;if(r!=i["default"].STRING)throw new Error("Cannot exec RegExp matches of type '"+r+"'.");return e instanceof RegExp&&(n+=e.ignoreCase?"i":"",n+=e.multiline?"m":"",e=e.source),-1===n.indexOf("g")&&(n+="g"),new O(function(){var r;return new c["default"](function(){r=new RegExp(e,n)},function(e){var n=r.exec(t);return null!==n?e.yieldReturn(n):!1})})},e.generate=function(t,n){return void 0===n&&(n=1/0),isNaN(n)||0>=n?e.empty():isFinite(n)&&s["default"].assert(n,"count")?new O(function(){var e=n,r=0;return new c["default"](function(){r=0},function(n){var o=r++;return e>o&&n.yieldReturn(t(o))},!1)}):new k(function(){var e=0;return new c["default"](function(){e=0},function(n){return n.yieldReturn(t(e++))},!0)})},e.unfold=function(t,e,n){return void 0===n&&(n=!1),new k(function(){var r,o,u=0;return new c["default"](function(){u=0,r=t,o=!n},function(t){var n=u++;return o?o=!1:r=e(r,n),t.yieldReturn(r)},!0)})},e.forEach=function(t,e){u.forEach(t,e)},e.map=function(t,e){return u.map(t,e)},e.max=function(t){return t.takeUntil(function(t){return t==+(1/0)},!0).aggregate(R.Greater)},e.min=function(t){return t.takeUntil(function(t){return t==-(1/0)},!0).aggregate(R.Lesser)},e.weave=function(t){if(!t)throw new w["default"]("enumerables");return new e(function(){var e,n,r;return new c["default"](function(){r=0,e=new p["default"],n=u.from(t)},function(t){var r;if(n){for(;!r&&n.moveNext();){var o=n.current;o&&(r=u.from(o))&&e.enqueue(r)}r||(n=null)}for(;!r&&e.count;)r=e.dequeue(),r.moveNext()?e.enqueue(r):(d.dispose(r),r=null);return r?t.yieldReturn(r.current):t.yieldBreak()},function(){d.dispose.these(e.dump()),d.dispose(n,e),n=null,e=null})})},e.prototype.doAction=function(e,n,r){return void 0===r&&(r=this.isEndless),t.prototype.doAction.call(this,e,n,r)},e.prototype.skip=function(e){return t.prototype.skip.call(this,e)},e.prototype.skipWhile=function(t){return this.throwIfDisposed(),this.doAction(function(e,n){return t(e,n)?2:1})},e.prototype.takeWhile=function(t){if(this.throwIfDisposed(),!t)throw new w["default"]("predicate");return this.doAction(function(e,n){return t(e,n)?1:0},null,null)},e.prototype.takeUntil=function(t,e){if(this.throwIfDisposed(),!t)throw new w["default"]("predicate");if(!e)return this.doAction(function(e,n){return t(e,n)?0:1},null,null);var n=!1;return this.doAction(function(e,r){return n?0:(n=t(e,r),1)},function(){n=!1},null)},e.prototype.forEach=function(t){var e=this;e.throwIfDisposed(),u.throwIfEndless(e.isEndless);var n=0;d.using(e.getEnumerator(),function(r){for(u.throwIfEndless(r.isEndless);e.throwIfDisposed()&&r.moveNext()&&t(r.current,n++)!==!1;);})},e.prototype.toArray=function(t){return t?this.where(t).toArray():this.copyTo([])},e.prototype.copyTo=function(t,e){if(void 0===e&&(e=0),this.throwIfDisposed(),!t)throw new w["default"]("target");return s["default"].assertZeroOrGreater(e),u.forEach(this,function(n,r){t[r+e]=n}),t},e.prototype.toLookup=function(t,e,n){void 0===e&&(e=R.Identity),void 0===n&&(n=R.Identity);var r=new l["default"](n);return this.forEach(function(n){var o=t(n),u=e(n),i=r.getValue(o);i!==I?i.push(u):r.addByKeyValue(o,[u])}),new q(r)},e.prototype.toMap=function(t,e){var n={};return this.forEach(function(r,o){n[t(r,o)]=e(r,o)}),n},e.prototype.toDictionary=function(t,e,n){void 0===n&&(n=R.Identity);var r=new l["default"](n);return this.forEach(function(n,o){return r.addByKeyValue(t(n,o),e(n,o))}),r},e.prototype.toJoinedString=function(t,e){return void 0===t&&(t=""),void 0===e&&(e=R.Identity),this.select(e).toArray().join(t)},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var n=this;if(!(t>0))return n;if(!isFinite(t))return e.empty();s["default"].assert(t,"count");var r=t;return new e(function(){var t,e;return new c["default"](function(){t=n.getEnumerator(),e=new p["default"]},function(n){for(;t.moveNext();)if(e.enqueue(t.current),e.count>r)return n.yieldReturn(e.dequeue());return!1},function(){d.dispose(t,e)})})},e.prototype.skipToLast=function(t){if(!(t>0))return e.empty();var n=this;return isFinite(t)?(s["default"].assert(t,"count"),n.reverse().take(t).reverse()):n},e.prototype.where=function(e){return t.prototype.where.call(this,e)},e.prototype.select=function(e){return t.prototype.select.call(this,e)},e.prototype.selectMany=function(t,e){return this._selectMany(t,e)},e.prototype.choose=function(t){return void 0===t&&(t=R.Identity),this._choose(t)},e.prototype.reverse=function(){var t=this,n=!t.throwIfDisposed();return u.throwIfEndless(t._isEndless),new e(function(){var e,r=0;return new c["default"](function(){_(n),e=t.toArray(),r=e.length},function(t){return r&&t.yieldReturn(e[--r])},function(){e.length=0})},function(){n=!0})},e.prototype.shuffle=function(){var t=this,n=!t.throwIfDisposed();return u.throwIfEndless(t._isEndless),new e(function(){var e,r,o;return new c["default"](function(){_(n),e=t.toArray(),r=o=e.length},function(t){if(!o)return t.yieldBreak();var n=s["default"].random(o),r=e[n];return e[n]=e[--o],e[o]=null,o%32==0&&(e.length=o),t.yieldReturn(r)},function(){e.length=0})},function(){n=!0})},e.prototype.count=function(t){var e=0;return this.forEach(t?function(n,r){t(n,r)&&++e}:function(){++e}),e},e.prototype.all=function(t){if(!t)throw new w["default"]("predicate");var e=!0;return this.forEach(function(n,r){return t(n,r)?void 0:(e=!1,!1)}),e},e.prototype.every=function(t){return this.all(t)},e.prototype.any=function(e){if(!e)return t.prototype.any.call(this);var n=!1;return this.forEach(function(t,r){return n=e(t,r),!n}),n},e.prototype.some=function(t){return this.any(t)},e.prototype.contains=function(t,e){return e?this.any(function(n){return e(n)===e(t)}):this.any(function(e){return e===t})},e.prototype.indexOf=function(t,e){var r=-1;return this.forEach(e?function(o,u){return n.areEqual(e(o,u),e(t,u),!0)?(r=u,!1):void 0}:function(e,o){return n.areEqual(e,t,!0)?(r=o,!1):void 0}),r},e.prototype.lastIndexOf=function(t,e){var r=-1;return this.forEach(e?function(o,u){n.areEqual(e(o,u),e(t,u),!0)&&(r=u)}:function(e,o){n.areEqual(e,t,!0)&&(r=o)}),r},e.prototype.merge=function(e){return t.prototype.merge.call(this,e)},e.prototype.concat=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.merge(t)},e.prototype.intersect=function(t,n){var r=this;return new e(function(){var e,o,i;return new c["default"](function(){e=r.getEnumerator(),o=new l["default"](n),i=new l["default"](n),u.forEach(t,function(t){o.addByKeyValue(t,!0)})},function(t){for(;e.moveNext();){var n=e.current;if(!i.containsKey(n)&&o.containsKey(n))return i.addByKeyValue(n,!0),t.yieldReturn(n)}return t.yieldBreak()},function(){d.dispose(e,o,i)},r._isEndless)},null,r._isEndless)},e.prototype.sequenceEqual=function(t,e){return void 0===e&&(e=n.areEqual),d.using(this.getEnumerator(),function(n){return d.using(u.from(t),function(t){for(u.throwIfEndless(n.isEndless&&t.isEndless);n.moveNext();)if(!t.moveNext()||!e(n.current,t.current))return!1;return!t.moveNext()})})},e.prototype.ofType=function(e){return t.prototype.ofType.call(this,e)},e.prototype.except=function(e,n){return t.prototype.except.call(this,e,n)},e.prototype.distinct=function(e){return t.prototype.distinct.call(this,e)},e.prototype.distinctUntilChanged=function(e){return void 0===e&&(e=R.Identity),t.prototype.distinctUntilChanged.call(this,e)},e.prototype.orderBy=function(t){return void 0===t&&(t=R.Identity),new F(this,t,1)},e.prototype.orderUsing=function(t){return new F(this,null,1,null,t)},e.prototype.orderUsingReversed=function(t){return new F(this,null,-1,null,t)},e.prototype.orderByDescending=function(t){return void 0===t&&(t=R.Identity),new F(this,t,-1)},e.prototype.buffer=function(e){return t.prototype.buffer.call(this,e)},e.prototype.groupBy=function(t,n,r){var o=this;return n||(n=R.Identity),new e(function(){return o.toLookup(t,n,r).getEnumerator()})},e.prototype.partitionBy=function(t,n,r,o){void 0===r&&(r=function(t,e){return new S(t,e)}),void 0===o&&(o=R.Identity);var u=this;return n||(n=R.Identity),new e(function(){var e,i,s,f,a;return new c["default"](function(){e=u.getEnumerator(),e.moveNext()?(i=t(e.current),s=o(i),f=[n(e.current)],a=1):f=null},function(u){if(!f)return u.yieldBreak();for(var c,l;(c=e.moveNext())&&(l=e.current,s===o(t(l)));)f[a++]=n(l);var p=r(i,f);return c?(l=e.current,i=t(l),s=o(i),f=[n(l)],a=1):f=null,u.yieldReturn(p)},function(){d.dispose(e),f=null})})},e.prototype.aggregate=function(t,e){return this.scan(t,e).lastOrDefault()},e.prototype.average=function(t){void 0===t&&(t=i["default"].numberOrNaN);var e=0,n=this.sum(function(n,r){return e++,t(n,r)});return isNaN(n)||!e?NaN:n/e},e.prototype.max=function(){return this.aggregate(R.Greater)},e.prototype.min=function(){return this.aggregate(R.Lesser)},e.prototype.maxBy=function(t){return void 0===t&&(t=R.Identity),this.aggregate(function(e,n){return t(e)>t(n)?e:n})},e.prototype.minBy=function(t){return void 0===t&&(t=R.Identity),this.aggregate(function(e,n){return t(e)<t(n)?e:n})},e.prototype.sum=function(t){void 0===t&&(t=i["default"].numberOrNaN);var e=0,n=0;return this.forEach(function(r){var o=t(r);return isNaN(o)?(e=NaN,!1):void(isFinite(o)?e+=o:n+=o>0?1:-1)}),isNaN(e)?NaN:n?n*(1/0):e},e.prototype.product=function(t){void 0===t&&(t=i["default"].numberOrNaN);var e=1,n=!1;return this.forEach(function(r,o){n=!0;var u=t(r,o);return isNaN(u)?(e=NaN,!1):0==u?(e=0,!1):void(e*=u)}),n&&isNaN(e)?NaN:e},e.prototype.quotient=function(t){void 0===t&&(t=i["default"].numberOrNaN);var e=0,n=NaN;return this.forEach(function(r,o){var u=t(r,o);if(e++,1===e)n=u;else{if(isNaN(u)||0===u||!isFinite(u))return n=NaN,!1;n/=u}}),1===e&&(n=NaN),n},e.prototype.last=function(){var t=this;t.throwIfDisposed();var e=void 0,n=!1;if(t.forEach(function(t){n=!0,e=t}),!n)throw new Error("last:No element satisfies the condition.");return e},e.prototype.lastOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=void 0,r=!1;return e.forEach(function(t){r=!0,n=t}),r?n:t},e.prototype.share=function(){return t.prototype.share.call(this)},e.prototype.catchError=function(e){return t.prototype.catchError.call(this,e)},e.prototype.finallyAction=function(e){return t.prototype.finallyAction.call(this,e)},e.prototype.memoize=function(){var t,n,r=this,o=!r.throwIfDisposed();return new e(function(){var e=0;return new c["default"](function(){_(o),n||(n=r.getEnumerator()),t||(t=[]),e=0},function(r){_(o);var u=e++;return u>=t.length?n.moveNext()?r.yieldReturn(t[u]=n.current):!1:r.yieldReturn(t[u])})},function(){o=!0,t&&(t.length=0),t=null,d.dispose(n),n=null})},e}(k);e.Enumerable=A;var O=function(t){function e(e,n){t.call(this,e,n,!1)}return __extends(e,t),e}(A);e.FiniteEnumerable=O;var B=function(t){function e(e){t.call(this,function(){return n.throwIfDisposed(),new a["default"](function(){return n.throwIfDisposed("The underlying ArrayEnumerable was disposed.","ArrayEnumerator"),n._source})});var n=this;n._disposableObjectName="ArrayEnumerable",n._source=e}return __extends(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._source=null},Object.defineProperty(e.prototype,"source",{get:function(){return this._source},enumerable:!0,configurable:!0}),e.prototype.toArray=function(){var t=this;return t.throwIfDisposed(),u.toArray(t._source)},e.prototype.asEnumerable=function(){return new e(this._source)},e.prototype.forEach=function(t){var e=this;e.throwIfDisposed(),u.forEach(e._source,t)},e.prototype.any=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r.length;return o&&(!e||t.prototype.any.call(this,e))},e.prototype.count=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r.length;return o&&(e?t.prototype.count.call(this,e):o)},e.prototype.elementAtOrDefault=function(t,e){void 0===e&&(e=null);var n=this;n.throwIfDisposed(),s["default"].assertZeroOrGreater(t,"index");var r=n._source;return t<r.length?r[t]:e},e.prototype.last=function(){var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t.prototype.last.call(this)},e.prototype.lastOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t},e.prototype.skip=function(t){var e=this;return t>0?new A(function(){return new a["default"](function(){return e._source},t)}):e},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var e=this;return e.take(e._source.length-t)},e.prototype.skipToLast=function(t){if(!(t>0))return A.empty();var e=this;if(!isFinite(t))return e;var n=e._source?e._source.length:0;return e.skip(n-t)},e.prototype.reverse=function(){var t=this;return new A(function(){return new a["default"](function(){return t._source},t._source?t._source.length-1:0,-1)})},e.prototype.memoize=function(){return this.asEnumerable()},e.prototype.sequenceEqual=function(o,u){return void 0===u&&(u=n.areEqual),i["default"].isArrayLike(o)?r.areEqual(this.source,o,!0,u):o instanceof e?o.sequenceEqual(this.source,u):t.prototype.sequenceEqual.call(this,o,u)},e.prototype.toJoinedString=function(e,n){void 0===e&&(e=""),void 0===n&&(n=R.Identity);var r=this._source;return!n&&Array.isArray(r)?r.join(e):t.prototype.toJoinedString.call(this,e,n)},e}(O),S=function(t){function e(e,n){t.call(this,n),this._groupKey=e}return __extends(e,t),Object.defineProperty(e.prototype,"key",{get:function(){return this._groupKey},enumerable:!0,configurable:!0}),e}(B),q=function(){function t(t){this._dictionary=t}return Object.defineProperty(t.prototype,"count",{get:function(){return this._dictionary.count},enumerable:!0,configurable:!0}),t.prototype.get=function(t){return this._dictionary.getValue(t)},t.prototype.contains=function(t){return this._dictionary.containsKey(t)},t.prototype.getEnumerator=function(){var t,e=this;return new c["default"](function(){t=e._dictionary.getEnumerator()},function(e){if(!t.moveNext())return!1;var n=t.current;return e.yieldReturn(new S(n.key,n.value))},function(){d.dispose(t)})},t}(),F=function(t){function e(e,r,o,i,s){void 0===s&&(s=n.compare),t.call(this,null),this.source=e,this.keySelector=r,this.order=o,this.parent=i,this.comparer=s,u.throwIfEndless(e&&e.isEndless)}return __extends(e,t),e.prototype.createOrderedEnumerable=function(t,n){return new e(this.source,t,n,this)},e.prototype.thenBy=function(t){
return this.createOrderedEnumerable(t,1)},e.prototype.thenUsing=function(t){return new e(this.source,null,1,this,t)},e.prototype.thenByDescending=function(t){return this.createOrderedEnumerable(t,-1)},e.prototype.thenUsingReversed=function(t){return new e(this.source,null,-1,this,t)},e.prototype.getEnumerator=function(){var t,e,n=this,r=0;return new c["default"](function(){r=0,t=A.toArray(n.source),e=N(n).generateSortedIndexes(t)},function(n){return r<e.length?n.yieldReturn(t[e[r++]]):!1},function(){t&&(t.length=0),t=null,e&&(e.length=0),e=null},!1)},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this.source=null,this.keySelector=null,this.order=null,this.parent=null},e}(O);Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=A});
//# sourceMappingURL=Linq.js.map
