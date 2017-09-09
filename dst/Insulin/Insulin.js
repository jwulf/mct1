"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var secondsPerTick = 1;
var Insulin = (function () {
    /**
     * Creates an instance of Insulin.
     * @param {any} onsetDelay - millisecond delay till insulin effect starts
     * @param {number} duration - milliseconds of action
     * @param {number} power - power factor (don't know the units yet)
     * @param {boolean} [peak=false] set to true for a saw-tooth, false for flat response
     * @memberof Insulin
     */
    function Insulin(onsetDelay, duration, power, peak) {
        if (peak === void 0) { peak = false; }
        this.onsetDelay = onsetDelay;
        this.duration = duration;
        this.peak = peak; // Set to true for a saw-tooth acting insulin, false for a flat basal one
        this.power = power;
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
        var calculateInsulinEffect = (function (power, duration, peak) { return function (elapsedTime) {
            if (!peak) {
                return power;
            }
            var a = Math.atan(power / (duration * 0.5));
            var getE = function () {
                if (elapsedTime <= duration / 2) {
                    return a * elapsedTime;
                }
                else {
                    return a * duration - elapsedTime;
                }
            };
            var e = getE();
            var effect = e * a;
            // @TODO: Insulin is absorbed over a fixed period
            // but the amounts absorbed / still in-system at any given time
            // vary according to the absorption profile. Does it need some
            // kind of integral calculus? The area under the absorption curve
            // should equal the total amount, and the amount remaining in-system
            // at any point should be the total minus whatever has been absorbed.
            State.changeRapidInsulin(-a);
            return effect;
        }; })(this.power, this.duration, this.peak);
        var _loop = timer_1.Interval.setInterval(function () {
            log_1.debug("Elapsed time: " + elapsedTime);
            log_1.debug("Duration: " + (_this.duration - _this.onsetDelay));
            if (elapsedTime >= _this.duration - _this.onsetDelay) {
                // insulin effect exhausted
                timer_1.Interval.clearInterval(_loop);
                log_1.debug('Insulin effect exhausted');
                return;
            }
            // == Do Insulin effect ==
            // TODO: calculate insulin power
            log_1.debug('Doing insulin effect');
            var bglDelta = calculateInsulinEffect(elapsedTime) * amount;
            log_1.debug("Insulin bglDelta " + bglDelta);
            State.changeBGL(0 - bglDelta);
            elapsedTime += secondsPerTick;
        }, secondsPerTick * 1000);
    };
    return Insulin;
}());
exports.Insulin = Insulin;
