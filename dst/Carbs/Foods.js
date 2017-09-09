"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carbohydrate_1 = require("./Carbohydrate");
/**
 * Foods - Carbohydrate(grams, GI, GL);
 */
exports.apple = new Carbohydrate_1.Carbohydrate(15, 5, 5);
var Foods = {
    APPLE: exports.apple
};
exports.getFood = function (type) {
};
