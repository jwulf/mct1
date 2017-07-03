const magik = magikcraft.io;
const PotionEffect = magik.type("potion.PotionEffect");
const PotionEffectType = magik.type("potion.PotionEffectType");
const Color = magik.type("Color");

export function effects(type: string, opts: any = {}) {
    if (!opts) {
        opts = {};
    }
    const duration = opts.duration || 500;
    const amplifier = opts.amplifier || 1;
    const color = opts.color || "GREEN";
    const c = Color[color];
    const l = PotionEffectType[type];
    const effect = new PotionEffect(l, duration, amplifier, true, true, c);
    magik.getSender().addPotionEffect(effect);
}