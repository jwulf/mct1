const magik = magikcraft.io;

export function getInsulinPotion(quantity = 1) {
    const MATERIAL = Java.type("org.bukkit.Material");
    const ItemStack = Java.type("org.bukkit.inventory.ItemStack");
    const potion = new ItemStack(MATERIAL['POTION']);
    // The typings need to have getInventory added to the BukkitPlayer type
    (magik.getSender() as any).getInventory().addItem(potion);
}
