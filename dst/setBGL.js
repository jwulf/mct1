"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("./effects");
function setBGL(bgl, insulinAbsorptionRate) {
    if (insulinAbsorptionRate === void 0) { insulinAbsorptionRate = 0; }
    var magik = magikcraft.io;
    var mct1 = magik.global('mct1');
    var say = magik.dixit;
    mct1.state.bgl = bgl;
    say(bgl);
    mct1.bars.bgl.setProgress(bgl);
    if (bgl > 0.2 && bgl < 0.4) {
        mct1.bars.bgl.setColor(magik.Bars.Color.GREEN);
    }
    else {
        mct1.bars.bgl.setColor(magik.Bars.Color.RED);
        if (bgl < 0.3 && insulinAbsorptionRate > 0.05) {
            say('WARNING: BGL Fall alert');
        }
        if (bgl < 0.2) {
            effects_1.effects('CONFUSION');
        }
        if (bgl > 0.8) {
            effects_1.effects('BLINDNESS');
        }
    }
}
exports.setBGL = setBGL;
