"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("./effects");
var globals_1 = require("./globals");
var magik = magikcraft.io;
var mct1 = magik.global('mct1');
var say = magik.dixit;
function setBGLLevel(bgl, bglDelta) {
    if (bglDelta === void 0) { bglDelta = 0; }
    // The following line keeps newBGL 0 - 0.99
    var newBGL = (function (bgl) { return Math.min(bgl, 0.99); })(Math.max(bgl, 0));
    mct1.state.bgl = newBGL;
    // say(bgl);
    mct1.bars.bgl.setProgress(bgl);
    if (BGLFallingFast(bglDelta)) {
        say('ALERT: BGL Falling fast');
    }
    if (BGLRisingFast(bglDelta)) {
        say('ALERT: BGL Rising fast');
    }
    if (BGLinRange(bgl)) {
        makeBarGreen();
        if (BGLGoingLow(bgl, bglDelta)) {
            say('WARNING: Dropping to a low!');
        }
    }
    else {
        makeBarRed();
        if (BGLIsLow(bgl)) {
            effects_1.effects('CONFUSION');
        }
        if (BGLIsHigh(bgl)) {
            effects_1.effects('BLINDNESS');
        }
    }
    if (newBGL === 0) {
        say("Aaaarrrggh!"); // kill player
    }
}
exports.setBGLLevel = setBGLLevel;
function BGLRisingFast(bglDelta) {
    return (bglDelta >= globals_1.globals.RISE_ALERT_WARN_THRESHOLD);
}
function BGLFallingFast(bglDelta) {
    return (bglDelta <= globals_1.globals.FALL_RATE_ALERT_THRESHOLD);
}
function BGLIsHigh(bgl) {
    return (bgl > globals_1.globals.HIGH_EVENT_THRESHOLD);
}
function BGLIsLow(bgl) {
    return (bgl < globals_1.globals.LOW_EVENT_THRESHOLD);
}
function BGLGoingLow(bgl, bglDelta) {
    return (bgl < globals_1.globals.LOW_ALERT_THRESHOLD && bglDelta < 0);
}
function BGLinRange(bgl) {
    return (bgl > globals_1.globals.LOW_ALERT_THRESHOLD && bgl < globals_1.globals.HIGH_ALERT_THRESHOLD);
}
function makeBarGreen() {
    mct1.bars.bgl.setColor(magik.Bars.Color.GREEN);
}
function makeBarRed() {
    mct1.bars.bgl.setColor(magik.Bars.Color.RED);
}
