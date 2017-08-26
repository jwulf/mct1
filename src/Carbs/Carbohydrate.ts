import { changeBGL } from '../State';
import { Interval } from '../util/timer';

export class Carbohydrate {
    grams: number;
    glycemicIndex: number;
    glycemicLoad: number;
    digestionLoop: number;
    Interval: any;

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
        this.grams -= 1; // 1gm/sec
        // impact player BGL
        changeBGL(digestedGlucose);
        // if grams <= 0; stop digestion
        if (this.grams <= 0) {
            Interval.clearInterval(this.digestionLoop);
        }
    }

    eat() {
        this.digestionLoop = Interval.setInterval(() => this.digest(), 1000);
    }
}