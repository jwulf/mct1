import { T1Player } from '../Player/T1Player';
import { Interval } from '../util/timer';

export class Carbohydrate {
    grams: number;
    glycemicIndex: number;
    glycemicLoad: number;
    digestionLoop: number;
    Interval: any;
    player: T1Player;

    constructor (grams: number, glycemicIndex: number, glycemicLoad: number) {
        this.grams = grams;
        this.glycemicIndex = glycemicIndex;
        this.glycemicLoad = glycemicLoad;
    }

    digest(){
        // do Digestion
        // Convert some grams to bgl
        const digestedGlucose = Math.min(1 * this.grams * this.glycemicIndex);
        // decrement grams
        // impact player BGL
        this.player.BGL.applyBGLchange(digestedGlucose);
        // if grams <= 0; stop digestion
        if (this.grams <= 0) {
            clearInterval(this.digestionLoop);
        }
    }

    eat(player: T1Player) {
        this.player = player;
        this.digestionLoop = Interval.setInterval(this.digest, 1000);
    }
}