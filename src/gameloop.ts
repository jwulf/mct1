const magik = magikcraft.io;
import { effects } from './effects';
const player = magik.getSender();
import { setBGL } from './setBGL';
const say = (msg) => magik.dixit(msg, player.getName());

export function gameloop() {
    const mct1 = magik.global('mct1') as any;
    // say(mct1);
    const state = mct1.state;
    // say(state.bgl);
    let bgl = state.bgl;
    let newBGL;
    const insulinOnBoard = state.insulinOnBoard;
    const carbsOnBoard = state.carbsOnBoard;

    const insulinAbsorptionRate = insulinOnBoard / 80 + 0.0025;

    // say(insulinAbsorptionRate.toString());

    if (insulinAbsorptionRate > 0) {

    }
    // do Insulin Absorption
    if (insulinOnBoard > 0) {
        const newInsulin = insulinOnBoard - insulinAbsorptionRate;
        const food = player.getFoodLevel();
        player.setFoodLevel(food - 1);
        mct1.setInsulin(Math.max(newInsulin, 0));

        // do BGL Absorption
        if (bgl > 0) {
            const bglAbsorbed = insulinAbsorptionRate * 0.8;
            newBGL = bgl - bglAbsorbed;
            newBGL = Math.max(newBGL, 0);
            newBGL = Math.min(newBGL, 0.99);
            if (newBGL == 0) {
                say("Aaaaaarggggh!");
            }
        }
    }

    // Do BGL increase
    if (state.insulinOnBoard == 0) {
        newBGL += 0.7;
    }

    setBGL(bgl);
}