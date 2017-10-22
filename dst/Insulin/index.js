"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Insulin_1 = require("../Insulin/Insulin");
var rapid = new Insulin_1.Insulin(5, 30, 30, true);
exports.rapid = rapid;
var basal = new Insulin_1.Insulin(5, 300, 2, false);
exports.basal = basal;
