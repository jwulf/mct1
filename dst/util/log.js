"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var env = require("./env");
exports.log = (env.isNode) ? console.log
    : magikcraft.io.dixit;
exports.debug = function (msg) { return ((_1.verbose) ? exports.log(msg) : undefined); };
