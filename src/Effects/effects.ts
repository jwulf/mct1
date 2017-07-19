import { MCT1 } from '../types/mct1';
import * as env from '../util/env';

export function effects(type: string, opts: any = {}) {
    if (env.isNode) {
        return type;
    }

    const magik = magikcraft.io;
    const PotionEffect = magik.type("potion.PotionEffect");
    const PotionEffectType = magik.type("potion.PotionEffectType");
    const Color = magik.type("Color");
    const mct1 = magik.global('mct1') as MCT1;

    if (mct1.effect[type]) {
        return;
    }

    mct1.effect[type] = true;
    const duration = opts.duration || 500;
    const amplifier = opts.amplifier || 1;
    const color = opts.color || "GREEN";
    const c = Color[color];
    const l = PotionEffectType[type];
    const effect = new PotionEffect(l, duration, amplifier, true, true, c);
    magik.getSender().addPotionEffect(effect);
    magik.setTimeout(() => {
        mct1.effect[type] = false;
    }, duration);
}