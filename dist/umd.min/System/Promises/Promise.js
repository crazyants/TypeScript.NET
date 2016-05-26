/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 * Although most of the following code is written from scratch, it is
 * heavily influenced by Q (https://github.com/kriskowal/q) and uses some of Q's spec.
 */
var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","../Types","../Threading/deferImmediate","../Disposable/DisposableBase","../Exceptions/InvalidOperationException","../Exceptions/ArgumentException","../Exceptions/ArgumentNullException","../Disposable/ObjectPool","../Collections/Set","../Threading/defer"],t)}(function(t,e){"use strict";function n(t){return a["default"].hasMemberOfType(t,b,a["default"].FUNCTION)}function r(t,e,r){var i=e?e(t):t;return i&&n(i)?T.wrap(i):r(i)}function i(t,e){return function(){t.thenThis(function(t){e.resolve(t)},function(t){e.reject(t)})}}function o(t,e,n){return function(){t.thenThis(function(t){return g.defer(function(){return e.resolve(t)},n)},function(t){return g.defer(function(){return e.reject(t)},n)})}}function s(t,e,n){try{var r=n?n(e):e;t&&t.resolve(r)}catch(i){t.reject(i)}}function l(t,e,n,r){try{var i=r?r(n):n;t&&t(i)}catch(o){e&&e(o)}}function u(t,e,n){t instanceof S?t.thenThis(e,n):t.then(e,n)}var a=t("../Types"),c=t("../Threading/deferImmediate"),h=t("../Disposable/DisposableBase"),f=t("../Exceptions/InvalidOperationException"),p=t("../Exceptions/ArgumentException"),d=t("../Exceptions/ArgumentNullException"),v=t("../Disposable/ObjectPool"),_=t("../Collections/Set"),g=t("../Threading/defer"),y=void 0,w="Promise",m=w+"State",b="then",x="target",j=function(t){function e(e,n,r){t.call(this),this._state=e,this._result=n,this._error=r,this._disposableObjectName=m}return __extends(e,t),e.prototype._onDispose=function(){this._state=y,this._result=y,this._error=y},e.prototype.getState=function(){return this._state},Object.defineProperty(e.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isPending",{get:function(){return this.getState()===T.State.Pending},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isSettled",{get:function(){return this.getState()!=T.State.Pending},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isFulfilled",{get:function(){return this.getState()===T.State.Fulfilled},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isRejected",{get:function(){return this.getState()===T.State.Rejected},enumerable:!0,configurable:!0}),e.prototype.getResult=function(){return this._result},Object.defineProperty(e.prototype,"result",{get:function(){return this.throwIfDisposed(),this.getResult()},enumerable:!0,configurable:!0}),e.prototype.getError=function(){return this._error},Object.defineProperty(e.prototype,"error",{get:function(){return this.throwIfDisposed(),this.getError()},enumerable:!0,configurable:!0}),e}(h.DisposableBase);e.PromiseState=j;var S=function(t){function e(){t.call(this,T.State.Pending),this._disposableObjectName=w}return __extends(e,t),e.prototype.then=function(t,e){var n=this;return T.pending(function(r,i){n.thenThis(function(e){return l(r,i,e,t)},function(t){return e?l(r,null,t,e):i(t)})})},e.prototype.delayFromNow=function(t){void 0===t&&(t=0),this.throwIfDisposed();var e=T.pending();return g.defer(i(this,e),t),e},e.prototype.delayAfterResolve=function(t){void 0===t&&(t=0),this.throwIfDisposed();var e=T.pending();return o(this,e,t),e},e.prototype["catch"]=function(t){return this.throwIfDisposed(),this.then(y,t)},e.prototype["finally"]=function(t){return this.throwIfDisposed(),this.then(t,t)},e.prototype.finallyThis=function(t){this.throwIfDisposed();var e=function(){return c.deferImmediate(t)};return this.thenThis(e,e),this},e}(j);e.PromiseBase=S;var E=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),e.prototype.thenSynchronous=function(t,e){this.throwIfDisposed();try{switch(this.state){case T.State.Fulfilled:return t?r(this._result,t,T.resolve):this;case T.State.Rejected:return e?r(this._error,e,T.resolve):this}}catch(n){return new D(n)}throw new Error("Invalid state for a resolved promise.")},e.prototype.thenThis=function(t,e){switch(this.throwIfDisposed(),this.state){case T.State.Fulfilled:t&&t(this._result);break;case T.State.Rejected:e&&e(this._error)}return this},e}(S);e.Resolvable=E;var I=function(t){function e(e,n,r){t.call(this),this._result=n,this._error=r,this._state=e}return __extends(e,t),e}(E);e.Resolved=I;var P=function(t){function e(e){t.call(this,T.State.Fulfilled,e)}return __extends(e,t),e}(I),D=function(t){function e(e){t.call(this,T.State.Rejected,y,e)}return __extends(e,t),e}(I),O=function(t){function e(e){var r=this;if(t.call(this),this._target=e,!e)throw new d.ArgumentNullException(x);if(!n(e))throw new p.ArgumentException(x,"Must be a promise-like object.");e.then(function(t){r._state=T.State.Fulfilled,r._result=t,r._error=y,r._target=y},function(t){r._state=T.State.Rejected,r._error=t,r._target=y})}return __extends(e,t),e.prototype.thenSynchronous=function(e,n){this.throwIfDisposed();var r=this._target;if(!r)return t.prototype.thenSynchronous.call(this,e,n);var i=T.pending();return u(r,function(t){return s(i,t,e)},function(t){return n?s(i,t,n):i.reject(t)}),i},e.prototype.thenThis=function(e,n){this.throwIfDisposed();var r=this._target;return r?(u(r,e,n),this):t.prototype.thenThis.call(this,e,n)},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._target=y},e}(E),T=function(t){function e(e){t.call(this),e&&this.resolveUsing(e)}return __extends(e,t),e.prototype.thenSynchronous=function(n,r){if(this.throwIfDisposed(),this._state)return t.prototype.thenSynchronous.call(this,n,r);var i=new e;return(this._waiting||(this._waiting=[])).push(R.PromiseCallbacks.init(n,r,i)),i},e.prototype.thenThis=function(e,n){return this.throwIfDisposed(),this._state?t.prototype.thenThis.call(this,e,n):((this._waiting||(this._waiting=[])).push(R.PromiseCallbacks.init(e,n)),this)},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._resolvedCalled=y},e.prototype.resolveUsing=function(t,r){var i=this;if(void 0===r&&(r=!1),!t)throw new d.ArgumentNullException("resolver");if(this._resolvedCalled)throw new f.InvalidOperationException(".resolve() already called.");if(this.state)throw new f.InvalidOperationException("Already resolved: "+e.State[this.state]);this._resolvedCalled=!0;var o=function(t){i._resolvedCalled=!1,i.reject(t)},s=function(t){i._resolvedCalled=!1,i.resolve(t)};c.deferImmediate(function(){t(function(t){if(t==i)throw new f.InvalidOperationException("Cannot resolve a promise as itself.");n(t)?u(t,s,o):s(t)},o)})},e.prototype.resolve=function(t,n){if(void 0===n&&(n=!1),this.throwIfDisposed(),t==this)throw new f.InvalidOperationException("Cannot resolve a promise as itself.");if(this._state){if(!n||this._state==e.State.Fulfilled&&this._result===t)return;throw new f.InvalidOperationException("Changing the fulfilled state/value of a promise is not supported.")}if(this._resolvedCalled){if(n)throw new f.InvalidOperationException(".resolve() already called.")}else{this._state=e.State.Fulfilled,this._result=t,this._error=y;var r=this._waiting;if(r){this._waiting=y;for(var i=0,o=r;i<o.length;i++){var l=o[i],u=l.onFulfilled,a=l.promise,c=a;R.PromiseCallbacks.recycle(l),s(c,t,u)}r.length=0}}},e.prototype.reject=function(t,n){if(void 0===n&&(n=!1),this.throwIfDisposed(),this._state){if(!n||this._state==e.State.Rejected&&this._error===t)return;throw new f.InvalidOperationException("Changing the rejected state/value of a promise is not supported.")}if(this._resolvedCalled){if(n)throw new f.InvalidOperationException(".resolve() already called.")}else{this._state=e.State.Rejected,this._error=t;var r=this._waiting;if(r){this._waiting=null;for(var i=0,o=r;i<o.length;i++){var l=o[i],u=l.onRejected,a=l.promise,c=a;R.PromiseCallbacks.recycle(l),u?s(c,t,u):c.reject(t)}r.length=0}}},e}(E);e.Promise=T;var C=function(t){function e(e){if(t.call(this),this._resolver=e,!e)throw new d.ArgumentNullException("resolver");this._resolvedCalled=!0}return __extends(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._resolver=y},e.prototype._onThen=function(){var t=this._resolver;t&&(this._resolver=y,this._resolvedCalled=!1,this.resolveUsing(t))},e.prototype.thenSynchronous=function(e,n){return this._onThen(),t.prototype.thenSynchronous.call(this,e,n)},e.prototype.thenThis=function(e,n){return this._onThen(),t.prototype.thenThis.call(this,e,n)},e}(T);e.LazyPromise=C;var R;!function(t){var e;!function(t){function e(){return o||(o=new v.ObjectPool(40,n,function(t){t.onFulfilled=null,t.onRejected=null,t.promise=null}))}function n(){return{onFulfilled:null,onRejected:null,promise:null}}function r(t,n,r){var i=e().take();return i.onFulfilled=t,i.onRejected=n,i.promise=r,i}function i(t){e().add(t)}var o;t.init=r,t.recycle=i}(e=t.PromiseCallbacks||(t.PromiseCallbacks={}))}(R||(R={}));var T;!function(t){function e(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(!t&&!e.length)throw new d.ArgumentNullException("promises");var r=(Array.isArray(t)?t:[t]).concat(e);return!r.length||r.every(function(t){return!t})?new P(r):a(function(t,e){var n=[],i=r.length;n.length=i;for(var o=new _.Set(r.map(function(t,e){return e})),s=function(){e=null,t=null,r.length=0,r=null,o.dispose(),o=null},l=function(){var e=t;e&&!o.count&&(s(),e(n))},u=function(e,r){t&&(n[r]=e,o.remove(r),l())},a=function(t){var n=e;n&&(s(),n(t))},c=function(t){var e=r[t];e?e.then(function(e){return u(e,t)},a):o.remove(t),l()},h=0;o&&i>h;h++)c(h)})}function r(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=t&&(Array.isArray(t)?t:[t]).concat(e);if(!r||!r.length||!(r=r.filter(function(t){return null!=t})).length)throw new p.ArgumentException("Nothing to wait for.");var i=r.length;if(1==i)return l(r[0]);for(var o=0;i>o;o++){var s=r[o];if(s instanceof S&&s.isSettled)return s}return a(function(t,e){for(var n=function(){e=null,t=null,r.length=0,r=null},i=function(t,e){t&&(n(),t(e))},o=function(e){return i(t,e)},s=function(t){return i(e,t)},l=0,u=r;l<u.length;l++){var a=u[l];if(!t)break;a.then(o,s)}})}function i(t){return n(t)?l(t):new P(t)}function o(t){return new D(t)}function s(t){return new C(t)}function l(e){if(!e)throw new d.ArgumentNullException(x);return e instanceof t?this:new O(e)}function u(t){if(!t)throw new d.ArgumentNullException(b);return new O({then:t})}function a(e){return new t(e)}!function(t){t[t.Pending=0]="Pending",t[t.Fulfilled=1]="Fulfilled",t[t.Rejected=-1]="Rejected"}(t.State||(t.State={}));var c=t.State;Object.freeze(c),t.all=e,t.race=r,t.resolve=i,t.reject=o,t.lazy=s,t.wrap=l,t.createFrom=u,t.pending=a}(T=e.Promise||(e.Promise={}))});
//# sourceMappingURL=Promise.js.map
