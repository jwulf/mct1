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
    function BGLBar(BGL) {
        this.BGL = BGL;
        var magik = magikcraft.io;
        this.bar = magik.Bars.addBar(magik.getSender(), magik.TextComponent("BGL"), magik.Bars.Color.RED, magik.Bars.Style.NOTCHED_20, 0.0 // Progress (0.0 - 1.0)
        );
    }
    BGLBar.prototype.makeBarGreen = function () {
        this.bar.setColor(magikcraft.io.Bars.Color.GREEN);
    };
    BGLBar.prototype.makeBarRed = function () {
        this.bar.setColor(magikcraft.io.Bars.Color.RED);
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
