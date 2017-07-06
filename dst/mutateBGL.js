"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var mct1 = magik.global('mct1');
var say = magik.dixit;
var effects_1 = require("./effects");
function mutateBGL(bglDelta) {
    if (bglDelta === void 0) { bglDelta = 0; }
    var previous = mct1.state.bgl;
    mct1.state.bgl += bglDelta;
    var current = mct1.state.bgl;
    var rate = previous - current;
    mct1.bars.bgl.setProgress(current);
    if (current > 0.2 && current < 0.4) {
        mct1.bars.bgl.setColor(magik.Bars.Color.GREEN);
    }
    else {
        mct1.bars.bgl.setColor(magik.Bars.Color.RED);
        if (current < 0.3 && rate > 0.05) {
            say('WARNING: BGL fall alert');
        }
        if (current < 0.2) {
            effects_1.effects('CONFUSION');
        }
        if (current > 0.8) {
            effects_1.effects('BLINDNESS');
        }
    }
}
exports.mutateBGL = mutateBGL;
