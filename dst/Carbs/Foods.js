"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carbohydrate_1 = require("./Carbohydrate");
/**
 * Foods - Carbohydrate(grams, GI, GL);
 */
var Foods = new Object({
    get apple() {
        return new Carbohydrate_1.Carbohydrate(15, 5, 5);
    }
});
exports.Food = {
    apple: Foods.apple
};
