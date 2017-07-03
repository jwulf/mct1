"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
function setInsulin(insulin) {
    var mct1 = magikcraft.io.global('mct1');
    mct1.bars.insulin.setProgress(insulin);
    mct1.state.insulinOnBoard = insulin;
}
exports.setInsulin = setInsulin;
