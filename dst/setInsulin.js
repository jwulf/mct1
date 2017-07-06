"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
function setInsulinLevel(insulin) {
    var mct1 = magik.global('mct1');
    mct1.bars.insulin.setProgress(insulin);
    mct1.state.insulinOnBoard = insulin;
}
exports.setInsulinLevel = setInsulinLevel;
