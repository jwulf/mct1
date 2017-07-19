"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNode = (typeof magikcraft === "undefined");
exports.log = (exports.isNode) ? console.log : magikcraft.io.dixit;
