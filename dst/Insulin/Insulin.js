"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dose_1 = require("./Dose");
var log_1 = require("../util/log");
var State = require("../State");
var sample_rate = 1;
var milliseconds = 1000;
var Insulin = (function () {
    function Insulin(onsetDelay, duration, bglDeltaPerUnit, peak) {
        if (peak === void 0) { peak = false; }
        this.exhaustionListeners = [];
        this.onsetDelay = onsetDelay;
        this.duration = duration;
        this.peak = peak;
        this.bglDeltaPerUnit = bglDeltaPerUnit;
        if (this.peak) {
            var time = (duration - onsetDelay) / sample_rate;
            var height = (bglDeltaPerUnit * 2) / time;
            this.angle = Math.atan(height / (time / 2));
        }
    }
    Insulin.prototype.take = function (amount) {
        log_1.debug("Taking " + amount + " rapid");
        State.changeRapidInsulin(amount);
        new Dose_1.Dose(this.onsetDelay, this.duration, this.peak, this.bglDeltaPerUnit, this.doExhaustion).take(amount);
    };
    Insulin.prototype.onExhaustion = function (callback) {
        this.exhaustionListeners.push(callback);
    };
    Insulin.prototype.doExhaustion = function () {
        if (this.exhaustionListeners) {
            this.exhaustionListeners.forEach(function (fn) { return fn(); });
        }
    };
    return Insulin;
}());
exports.Insulin = Insulin;
