"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mutateBGL_1 = require("./mutateBGL");
var magik = magikcraft.io;
/**
 * This is the Insulin class
 * Create a new instance of this class for basal and fast-acting insulins.
 *
 *  param {number} onsetDelay - the number of seconds before the insulin effect kicks instance.
 *  param {number} duration - the number of seconds of the total effective duration of this insulin.
 *  param {number} peak - the number of seconds to the peak action of the insulin. Set to 0 for a flat (consistent) effect. Is modelled as a bell curve centered on the peak.
 * param {number} power - the effect of the insulin. This is the peak power for insulins wiht a peak response.
 */
// const magik = magikcraft.io;
var secondsPerTick = 1;
var Insulin = (function () {
    function Insulin(onsetDelay, duration, power, peak) {
        if (onsetDelay === void 0) { onsetDelay = 0; }
        if (peak === void 0) { peak = 0; }
        this.onsetDelay = onsetDelay;
        this.duration = duration;
        this.peak = peak;
        this.power = power;
    }
    Insulin.prototype.calculateInsulinEffect = function (elapsedTime) {
        var _this = this;
        if (this.peak === 0) {
            return this.power;
        }
        var a = Math.atan(this.power / (this.duration * 0.5));
        var getE = function () {
            if (elapsedTime <= _this.duration / 2) {
                return a * elapsedTime;
            }
            else {
                return a * _this.duration - elapsedTime;
            }
        };
        var e = getE();
        var effect = e * a;
    };
    Insulin.prototype.take = function (amount) {
        var _this = this;
        var elapsedTime = this.onsetDelay;
        // This timeout is the onset Delay of taking the insulin
        magik.setTimeout(function () {
            // the insulin starts to act
            var _loop = magik.setInterval(function () {
                if (elapsedTime >= _this.duration - _this.onsetDelay) {
                    // insulin effect exhausted
                    magik.clearInterval(_loop);
                    return;
                }
                // == Do Insulin effect ==
                // calculate insulin power
                var bglDelta = _this.calculateInsulinEffect(elapsedTime);
                mutateBGL_1.mutateBGL(bglDelta);
                elapsedTime += secondsPerTick;
            }, secondsPerTick);
        }, this.onsetDelay);
    };
    return Insulin;
}());
