"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BGL_1 = require("./BGL");
var BGLBar_1 = require("./BGLBar");
var effects_1 = require("./effects");
var T1Player = (function () {
    function T1Player() {
        this.BGL = new BGL_1.BGL(magikcraft.io.dixit, effects_1.effects);
        this.BGLBar = new BGLBar_1.BGLBar(1000, this.BGL, {
            Bars: magikcraft.io.Bars,
            sender: magikcraft.io.getSender(),
            textcomponent: magikcraft.io.TextComponent
        });
    }
    return T1Player;
}());
exports.T1Player = T1Player;
