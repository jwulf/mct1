"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * BGLBar creates a UI Bar to display the user's Blood Glucose Level
 *
 * Dependencies are injected to facilitate unit testing with mock objects
 *
 * The Bar progress is between 0 and 0.99, so it will need to be scaled wrt
 * the BGL, which is represented internally as mmol/L
 *
 * @class BGLBar
 */
var BGLBar = (function () {
    function BGLBar(updateInterval, BGL, deps) {
        var _this = this;
        var Bars = deps.Bars, sender = deps.sender, textcomponent = deps.textcomponent;
        // Max 0.5s - 2s update interval
        this.updateInterval = Math.min(Math.max(2000, updateInterval), 500);
        this.BGL = BGL;
        this.bar = Bars.addBar(sender, textcomponent("BGL"), Bars.Color.RED, Bars.Style.NOTCHED_20, 0.0 // Progress (0.0 - 1.0)
        );
        this.updateLoop = magikcraft.io.setInterval(function () {
            _this.update();
        }, updateInterval);
    }
    BGLBar.prototype.makeBarGreen = function () {
        this.bar.setColor(this.Bars.Color.GREEN);
    };
    BGLBar.prototype.makeBarRed = function () {
        this.bar.setColor(this.Bars.Color.RED);
    };
    BGLBar.prototype.update = function () {
        var bgl = this.BGL.getBGL();
        this.bar.setProgress(bgl);
        if (this.BGL.BGLinRange) {
            this.makeBarGreen();
        }
        else {
            this.makeBarRed();
        }
    };
    return BGLBar;
}());
exports.BGLBar = BGLBar;
