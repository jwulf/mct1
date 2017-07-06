"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var mct1 = magik.global('mct1');
var say = magik.dixit;
var setBGLLevel_1 = require("./setBGLLevel");
function mutateBGL(bglDelta) {
    if (bglDelta === void 0) { bglDelta = 0; }
    var currentBGL = mct1.state.bgl;
    var newBGL = currentBGL + bglDelta;
    setBGLLevel_1.setBGLLevel(newBGL, bglDelta);
}
exports.mutateBGL = mutateBGL;
