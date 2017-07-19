"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BGL_1 = require("./BGL");
var effects_1 = require("./effects");
var T1Player = (function () {
    function T1Player(name) {
        if (name === void 0) { name = "test-player"; }
        // Use an optional name via params (for testing), or get it from Bukkit
        this.name = (typeof magikcraft === "undefined") ? name : magikcraft.io.getSender().getName();
        var log = (typeof magikcraft === "undefined") ? console.log : magikcraft.io.dixit;
        this.BGL = new BGL_1.BGL(log, effects_1.effects);
    }
    return T1Player;
}());
exports.T1Player = T1Player;
