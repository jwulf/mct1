"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BGLBar_1 = require("./BGLBar");
var Controller_1 = require("./Controller");
var T1Player_1 = require("./T1Player");
var MCT1 = (function () {
    function MCT1() {
        this.t1player = new T1Player_1.T1Player();
        this.controller = new Controller_1.Controller();
        var deps = {
            Bars: magikcraft.io.Bars,
            sender: magikcraft.io.getSender(),
            textcomponent: magikcraft.io.TextComponent
        };
        this.bglBar = new BGLBar_1.BGLBar(1000, this.t1player.BGL, deps);
    }
    return MCT1;
}());
exports.MCT1 = MCT1;
