"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Insulin_1 = require("./Insulin");
/**
 * 5000ms onset delay
 * 60000ms effect duration
 * 30 power
 * true = saw-tooth response profile
 */
exports.rapid = new Insulin_1.Insulin(5000, 30000, 30, true);
