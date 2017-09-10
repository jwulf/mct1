"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../util/env");
var log_1 = require("../util/log");
var State = require("../State");
var timer_1 = require("../util/timer");
/**
 * This is the Insulin class
 * Create a new instance of this class for basal and fast-acting insulins.
 *
 *  param {number} onsetDelay - the number of seconds before the insulin effect kicks instance.
 *  param {number} duration - the number of seconds of the total effective duration of this insulin.
 *  param {number} peak - whether this is a ramp-up, ramp-down or flat-response insulin. Set to 0 for a flat (consistent) effect. Set to true for a bell curve (more a saw tooth) centered on the peak.
 * param {number} power - the effect of the insulin. This is the peak power for insulins with a peak response.
 */
// const magik = magikcraft.io;
var sample_rate = 1;
var Insulin = (function () {
    /**
     * Creates an instance of Insulin.
     * @param {any} onsetDelay - seconds delay till insulin effect starts
     * @param {number} duration - seconds of action
     * @param {number} bglDeltaPerUnit - power factor (how many mmol/l 1 unit will drop)
     * @param {boolean} [peak=false] set to true for a saw-tooth, false for flat response
     * @memberof Insulin
     */
    function Insulin(onsetDelay, duration, bglDeltaPerUnit, peak) {
        if (peak === void 0) { peak = false; }
        this.test_bgl = 0;
        this.test_insulinOnBoard = 0;
        this.exhaustionListeners = [];
        this.onsetDelay = onsetDelay;
        this.duration = duration;
        this.peak = peak; // Set to true for a saw-tooth acting insulin, false for a flat basal one
        this.bglDeltaPerUnit = bglDeltaPerUnit;
        /**
         * We treat the effect as an equilateral triangle.
         * The area of the triangle is the total effect (bglDeltaPerUnit).
         */
        if (this.peak) {
            var time = duration / sample_rate;
            var height = (2 * bglDeltaPerUnit) / time;
            this.angle = Math.atan(height / (0.5 * time));
        }
    }
    // When you take insulin, it sets up a timer loop that applies the effect of the insulin
    // until it runs out.
    Insulin.prototype.take = function (amount) {
        var _this = this;
        // This timeout is the onset Delay of taking the insulin
        log_1.debug("Taking " + amount + " rapid");
        State.changeRapidInsulin(amount);
        timer_1.Interval.setTimeout(function () {
            log_1.debug('Starting absorption');
            _this.doInsulinAbsorption(_this.onsetDelay, amount);
        }, this.onsetDelay * 1000);
    };
    Insulin.prototype.doInsulinAbsorption = function (elapsedTime, amount) {
        var _this = this;
        log_1.debug('Absorption started');
        // If peak is true, this applies the effect of the insulin in a saw-tooth curve,
        // peaking at its maximum mid-way through the duration.
        // the curve looks like this:  /\
        // If peak is false, the insulin absorption curve is flat, like a long-acting basal
        // insulin
        /**
         * Use trigonometry and discrete integration to calculate the effect.
         * We do this by modelling the insulin absorption as an equilateral triangle
         * and calculating a rectangular slice of the triangle at each sample time.
         */
        var effects = [];
        var calculateInsulinEffectWithPeak = (function (power, duration, peak) { return function (elapsedTime) {
            if (elapsedTime >= duration / 2) {
                return effects.pop();
            }
            var effect = sample_rate * elapsedTime * Math.tan(Math.atan(4 * _this.bglDeltaPerUnit / duration) / duration);
            effects.push(effect);
            return effect;
        }; })(this.bglDeltaPerUnit, this.duration, this.peak);
        var _loop = timer_1.Interval.setInterval(function () {
            log_1.debug("Elapsed time: " + elapsedTime);
            log_1.debug("Duration: " + (_this.duration - _this.onsetDelay));
            if (elapsedTime >= _this.duration - _this.onsetDelay) {
                // insulin effect exhausted
                timer_1.Interval.clearInterval(_loop);
                log_1.debug('Insulin effect exhausted');
                _this.doExhaustion();
                return;
            }
            log_1.debug('Doing insulin effect');
            var bglDelta = calculateInsulinEffectWithPeak(elapsedTime) * amount;
            var insulinAbsorbed = (bglDelta / (_this.bglDeltaPerUnit * amount)) * amount;
            log_1.debug("bglDelta " + bglDelta);
            elapsedTime += sample_rate;
        }, sample_rate * 1000);
    };
    Insulin.prototype.doSideEffects = function (bglDelta, insulinDelta) {
        if (env_1.isNode) {
            console.log(bglDelta);
            this.test_bgl -= bglDelta;
            console.log(insulinDelta);
            this.test_insulinOnBoard -= insulinDelta;
        }
        else {
            State.changeBGL(0 - bglDelta);
            State.changeRapidInsulin(0 - insulinDelta);
        }
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
