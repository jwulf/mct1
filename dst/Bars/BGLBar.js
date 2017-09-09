"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../util/log");
var Bar = require("magikcraft-lore-ui-bar");
var State = require("../State");
log.info('BGL Bar loading...');
var initialState = State.getState();
function init() {
    var bgl = initialState.BGL || 4;
    exports.bar = Bar.bar()
        .text("BGL: " + initialState.BGL)
        .color(Bar.color.GREEN)
        .style(Bar.style.NOTCHED_20)
        .progress(bgl)
        .show();
    if (!exports.subscription) {
        var previousState_1 = initialState;
        exports.subscription = State.subscribe(function (state) {
            if (previousState_1.BGL !== state.BGL) {
                var bgl_1 = state.BGL || 0;
                var bglNum = Math.min(20, bgl_1);
                var bglString = bglNum.toFixed(1);
                previousState_1 = state;
                exports.bar.progress(bglNum * 5);
                exports.bar.text("BGL: " + bglString);
                exports.bar.color(getBGLColor(bgl_1));
            }
        });
    }
}
exports.init = init;
function getBGLColor(bgl) {
    if (bgl < 4 || bgl > 8) {
        return Bar.color.RED;
    }
    return Bar.color.GREEN;
}
