"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Insulin_1 = require("./Insulin");
/**
 * 5s onset delay
 * 300s effect duration
 * 2 power
 * false = flat response profile
 */
exports.basal = new Insulin_1.Insulin(5, 300, 2, false);
