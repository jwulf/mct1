"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../../util/log");
/**
 *
 * BGLBar creates a UI Bar to display the user's Blood Glucose Level
 *
 * Dependencies are injected to facilitate unit testing with mock objects
 *
 * The Bar progress is between 0 and 0.99, so it needs to be scaled wrt
 * the BGL, which is represented internally as mmol/L
 *
 * @class BGLBar
 */
var BGLBar = (function () {
    function BGLBar(BGL, deps) {
        var _this = this;
        this.makeBarRed = function () {
            _this.bar.setColor(_this.Bars.Color.RED);
        };
        var Bars = deps.Bars, sender = deps.sender, textcomponent = deps.textcomponent;
        this.BGL = BGL;
        this.bar = Bars.addBar(sender, textcomponent("BGL"), Bars.Color.RED, Bars.Style.NOTCHED_20, 0.0 // Progress (0.0 - 1.0)
        );
    }
    BGLBar.prototype.makeBarGreen = function () {
        log_1.log(this.Bars.toString());
        log_1.log(Object.keys(this.Bars));
        this.bar.setColor(this.Bars.Color.GREEN);
    };
    BGLBar.prototype.update = function () {
        var bgl = this.BGL.getBGL();
        log_1.log("Current BGL is " + bgl);
        // Bar progress is 0 - 0.99
        var scaledBGL = Math.max(bgl / 30, 0.99);
        this.bar.setProgress(scaledBGL);
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
