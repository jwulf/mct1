"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Insulin_1 = require("./Insulin");
/**
 * 5s onset delay
 * 30s effect duration
 * 30 power
 * true = saw-tooth response profile
 */
exports.rapid = new Insulin_1.Insulin(5, 30, 30, true);
