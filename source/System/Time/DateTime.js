/*!
 * @author electricessence / https://github.com/electricessence/
 * Based on .NET DateTime's interface.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./TimeSpan", "./ClockTime", "./TimeStamp"], factory);
    }
})(function (require, exports) {
    "use strict";
    var TimeSpan_1 = require("./TimeSpan");
    var ClockTime_1 = require("./ClockTime");
    var TimeStamp_1 = require("./TimeStamp");
    var DateTime = (function () {
        function DateTime(value, kind) {
            if (value === void 0) { value = new Date(); }
            if (kind === void 0) { kind = 1; }
            var _ = this;
            _._kind = kind;
            if (value instanceof DateTime)
                _._value = value.toJsDate();
            else if (value instanceof Date)
                _._setJsDate(value);
            else
                _._value = value === void (0)
                    ? new Date()
                    : new Date(value);
        }
        DateTime.prototype.toJsDate = function () {
            return new Date(this._value.getTime());
        };
        DateTime.prototype._setJsDate = function (value) {
            this._time = null;
            this._value = new Date(value.getTime());
        };
        Object.defineProperty(DateTime.prototype, "kind", {
            get: function () {
                return this._kind;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "year", {
            get: function () {
                return this._value.getFullYear();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "month", {
            get: function () {
                return this._value.getMonth();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "calendarMonth", {
            get: function () {
                return this._value.getMonth() + 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "calendar", {
            get: function () {
                return {
                    year: this.year,
                    month: this.calendarMonth,
                    day: this.day
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "day", {
            get: function () {
                return this._value.getDate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "dayIndex", {
            get: function () {
                return this._value.getDate() - 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "dayOfWeek", {
            get: function () {
                return this._value.getDay();
            },
            enumerable: true,
            configurable: true
        });
        DateTime.prototype.addMilliseconds = function (ms) {
            ms = ms || 0;
            return new DateTime(this._value.getTime() + ms, this._kind);
        };
        DateTime.prototype.addSeconds = function (seconds) {
            seconds = seconds || 0;
            return this.addMilliseconds(seconds * 1000);
        };
        DateTime.prototype.addMinutes = function (minutes) {
            minutes = minutes || 0;
            return this.addMilliseconds(minutes * 60000);
        };
        DateTime.prototype.addHours = function (hours) {
            hours = hours || 0;
            return this.addMilliseconds(hours * 3600000);
        };
        DateTime.prototype.addDays = function (days) {
            days = days || 0;
            return this.addMilliseconds(days * 86400000);
        };
        DateTime.prototype.addMonths = function (months) {
            months = months || 0;
            var d = this.toJsDate();
            d.setMonth(d.getMonth() + months);
            return new DateTime(d, this._kind);
        };
        DateTime.prototype.addYears = function (years) {
            years = years || 0;
            var d = this.toJsDate();
            d.setFullYear(d.getFullYear() + years);
            return new DateTime(d, this._kind);
        };
        DateTime.prototype.add = function (time) {
            return this.addMilliseconds(time.getTotalMilliseconds());
        };
        DateTime.prototype.subtract = function (time) {
            return this.addMilliseconds(-time.getTotalMilliseconds());
        };
        DateTime.prototype.timePassedSince = function (previous) {
            return DateTime.between(previous, this);
        };
        Object.defineProperty(DateTime.prototype, "date", {
            get: function () {
                var _ = this;
                return new DateTime(new Date(_.year, _.month, _.day), _._kind);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "timeOfDay", {
            get: function () {
                var _ = this;
                var t = _._time;
                if (!t) {
                    var d = this._value;
                    _._time = t = new ClockTime_1.ClockTime(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
                }
                return t;
            },
            enumerable: true,
            configurable: true
        });
        DateTime.prototype.toTimeStamp = function () {
            return TimeStamp_1.TimeStamp.from(this);
        };
        Object.defineProperty(DateTime, "now", {
            get: function () {
                return new DateTime();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "toUniversalTime", {
            get: function () {
                var _ = this;
                if (_._kind != 1)
                    return new DateTime(_, _._kind);
                var d = _._value;
                return new DateTime(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()), 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime, "today", {
            get: function () {
                return DateTime.now.date;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime, "tomorrow", {
            get: function () {
                var today = DateTime.today;
                return today.addDays(1);
            },
            enumerable: true,
            configurable: true
        });
        DateTime.between = function (first, last) {
            var f = first instanceof DateTime ? first._value : first, l = last instanceof DateTime ? last._value : last;
            return new TimeSpan_1.TimeSpan(l.getTime() - f.getTime());
        };
        DateTime.isLeapYear = function (year) {
            return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        };
        DateTime.daysInMonth = function (year, month) {
            return (new Date(year, month + 1, 0)).getDate();
        };
        DateTime.from = function (yearOrDate, month, day) {
            if (month === void 0) { month = 0; }
            if (day === void 0) { day = 1; }
            var year;
            if (typeof yearOrDate == "object") {
                day = yearOrDate.day;
                month = yearOrDate.month;
                year = yearOrDate.year;
            }
            else {
                year = yearOrDate;
            }
            return new DateTime(new Date(year, month, day));
        };
        DateTime.fromCalendarDate = function (yearOrDate, month, day) {
            if (month === void 0) { month = 1; }
            if (day === void 0) { day = 1; }
            var year;
            if (typeof yearOrDate == "object") {
                day = yearOrDate.day;
                month = yearOrDate.month;
                year = yearOrDate.year;
            }
            else {
                year = yearOrDate;
            }
            return new DateTime(new Date(year, month - 1, day));
        };
        return DateTime;
    }());
    exports.DateTime = DateTime;
    Object.freeze(DateTime);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DateTime;
});
//# sourceMappingURL=DateTime.js.map