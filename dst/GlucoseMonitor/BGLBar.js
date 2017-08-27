"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../util/log");
var Bar = require("magikcraft-lore-ui-bar");
var MCT1State = require("../State");
log_1.log('BGL Bar loading...');
var initialState = MCT1State.getState();
function show() {
    exports.bar = Bar.bar()
        .text("BGL: " + initialState.BGL)
        .color(Bar.color.GREEN)
        .style(Bar.style.NOTCHED_20)
        .progress(initialState.BGL)
        .show();
    if (!exports.subscription) {
        var previousState_1 = initialState;
        exports.subscription = MCT1State.fusionStore.subscribe(this, function (state) {
            if (previousState_1.BGL !== state.BGL) {
                var bglNum = Math.max(20, state.BGL);
                var bglString = bglNum.toFixed(1);
                previousState_1 = state;
                exports.bar.progress(bglNum * 5);
                exports.bar.text("BGL: " + bglString);
            }
        });
    }
}
exports.show = show;
function getBGLColor(bgl) {
    if (bgl < 4 || bgl > 8) {
        return Bar.color.RED;
    }
    return Bar.color.GREEN;
}
