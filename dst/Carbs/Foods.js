"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carbohydrate_1 = require("./Carbohydrate");
exports.Food = new Object({
    get apple() {
        return new Carbohydrate_1.Carbohydrate(15, 5, 5);
    }
});
