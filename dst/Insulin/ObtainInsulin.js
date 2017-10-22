"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
function giveInsulinPotion(quantity) {
    if (quantity === void 0) { quantity = 1; }
    var MATERIAL = Java.type("org.bukkit.Material");
    var ItemStack = Java.type("org.bukkit.inventory.ItemStack");
    var potion = new ItemStack(MATERIAL['POTION']);
    // The typings need to have getInventory added to the BukkitPlayer type
    magik.getSender().getInventory().addItem(potion);
}
exports.giveInsulinPotion = giveInsulinPotion;
