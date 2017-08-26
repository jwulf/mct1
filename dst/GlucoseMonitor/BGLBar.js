"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bar = require("magikcraft-lore-ui-bar");
var MCT1State = require("../State");
var initialState = MCT1State.getState();
exports.bar = Bar.bar()
    .text("BGL: " + initialState.BGL)
    .color(Bar.color.GREEN)
    .style(Bar.style.NOTCHED_20)
    .progress(initialState.BGL)
    .show();
function getBGLColor(bgl) {
    if (bgl < 4 || bgl > 8) {
        return Bar.color.RED;
    }
    return Bar.color.GREEN;
}
var previousState = initialState;
var subscription = MCT1State.fusionStore.subscribe(this, function (state) {
    if (previousState.BGL !== state.BGL) {
        var bgl = Math.max(20, state.BGL);
        previousState = state;
        exports.bar.progress(bgl);
        exports.bar.text("BGL: " + state.BGL);
    }
});
