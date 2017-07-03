"use strict";
var magik = magikcraft.io;
module.exports = function setInsulin(insulin) {
    var mct1 = magik.global('mct1');
    mct1.bars.insulin.setProgress(insulin);
    mct1.state.insulinOnBoard = insulin;
};
