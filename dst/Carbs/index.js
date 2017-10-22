"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foods_1 = require("./Foods");
exports.Food = Foods_1.Food;
var magik = magikcraft.io;
function giveFood(type, quantity) {
    if (type === void 0) { type = 'APPLE'; }
    if (quantity === void 0) { quantity = 1; }
    var MATERIAL = Java.type("org.bukkit.Material");
    var ItemStack = Java.type("org.bukkit.inventory.ItemStack");
    var food = new ItemStack(MATERIAL[type]);
    for (var i = 0; i++; i < quantity) {
        magik.getSender().getInventory().addItem(food);
    }
}
exports.giveFood = giveFood;
