"use strict";
var ObjectPool_1 = require("../../../../dist/commonjs/System/Disposable/ObjectPool");
var pool = new ObjectPool_1.default(40, function () { return new Array(100); });
//# sourceMappingURL=ObjectPool.js.map