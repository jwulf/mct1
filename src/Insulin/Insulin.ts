import { isNode } from '../util/env';
import { debug } from '../util/log';
import * as State from '../State';
import { Interval } from '../util/timer';

/**
 * This is the Insulin class
 * Create a new instance of this class for basal and fast-acting insulins.
 *
 *  param {number} onsetDelay - the number of seconds before the insulin effect kicks instance.
 *  param {number} duration - the number of seconds of the total effective duration of this insulin.
 *  param {number} peak - whether this is a ramp-up, ramp-down or flat-response insulin. Set to 0 for a flat (consistent) effect. Set to true for a bell curve (more a saw tooth) centered on the peak.
 * param {number} power - the effect of the insulin. This is the peak power for insulins with a peak response.
 */
// const magik = magikcraft.io;
const sample_rate = 1;

export class Insulin {
    public onsetDelay: number;
    public duration: number;
    public peak: boolean;
    public angle: number;
    public bglDeltaPerUnit: number;
    public test_bgl = 0;
    public test_insulinOnBoard = 0;
    private exhaustionListeners: (() => void)[] = [];

    /**
     * Creates an instance of Insulin.
     * @param {any} onsetDelay - seconds delay till insulin effect starts
     * @param {number} duration - seconds of action
     * @param {number} bglDeltaPerUnit - power factor (how many mmol/l 1 unit will drop)
     * @param {boolean} [peak=false] set to true for a saw-tooth, false for flat response
     * @memberof Insulin
     */
    constructor(onsetDelay, duration: number, bglDeltaPerUnit: number, peak = false) {
        this.onsetDelay = onsetDelay;
        this.duration = duration;
        this.peak = peak; // Set to true for a saw-tooth acting insulin, false for a flat basal one
        this.bglDeltaPerUnit = bglDeltaPerUnit;

        /**
         * We treat the effect as an equilateral triangle.
         * The area of the triangle is the total effect (bglDeltaPerUnit).
         */
        if (this.peak) {
            const time = duration / sample_rate;
            const height = (2 * bglDeltaPerUnit) / time;
            this.angle = Math.atan(height / (0.5 * time));
        }
    }

    // When you take insulin, it sets up a timer loop that applies the effect of the insulin
    // until it runs out.

    take(amount: number) {
        // This timeout is the onset Delay of taking the insulin
        debug(`Taking ${amount} rapid`);
        State.changeRapidInsulin(amount);
        Interval.setTimeout(() => {
            debug('Starting absorption');
            this.doInsulinAbsorption(this.onsetDelay, amount);
        }, this.onsetDelay * 1000);
    }

    doInsulinAbsorption(elapsedTime: number, amount: number) {
        debug('Absorption started');
        // If peak is true, this applies the effect of the insulin in a saw-tooth curve,
        // peaking at its maximum mid-way through the duration.
        // the curve looks like this:  /\
        // If peak is false, the insulin absorption curve is flat, like a long-acting basal
        // insulin

        /**
         * Use trigonometry and discrete integration to calculate the effect.
         * We do this by modelling the insulin absorption as an equilateral triangle
         * and calculating a rectangular slice of the triangle at each sample time.
         */
        let effects: number[] = [];
        const calculateInsulinEffectWithPeak = ((power, duration, peak) => (elapsedTime: number):number => {
            if (elapsedTime >= duration / 2) {
                return (effects.pop() as number);
            }
            const effect = sample_rate*elapsedTime*Math.tan(Math.atan(4*this.bglDeltaPerUnit/duration)/duration);
            effects.push(effect);
            return effect;
        })(this.bglDeltaPerUnit, this.duration, this.peak);

        let _loop = Interval.setInterval(
            () => {
                debug(`Elapsed time: ${elapsedTime}`);
                debug(`Duration: ${this.duration - this.onsetDelay}`);
                if (elapsedTime >= this.duration - this.onsetDelay) {
                    // insulin effect exhausted
                    Interval.clearInterval(_loop);
                    debug('Insulin effect exhausted');
                    this.doExhaustion();
                    return;
                }
                debug('Doing insulin effect');
                const bglDelta = calculateInsulinEffectWithPeak(elapsedTime) * amount;
                const insulinAbsorbed = (bglDelta / (this.bglDeltaPerUnit * amount)) * amount;
                this.doSideEffects(bglDelta, insulinAbsorbed);
                elapsedTime += sample_rate;
            },
            sample_rate * 1000
        );
    }

    doSideEffects(bglDelta, insulinDelta) {
        if (isNode) {
            console.log('bglDelta:', bglDelta)
            this.test_bgl -= bglDelta;
            console.log('insulinDelta', insulinDelta);
            this.test_insulinOnBoard -= insulinDelta;
        } else {
            State.changeBGL(0 - bglDelta);
            State.changeRapidInsulin(0 - insulinDelta);
        }
    }

    onExhaustion(callback: () => void){
        this.exhaustionListeners.push(callback);
    }

    private doExhaustion() {
        if (this.exhaustionListeners) {
            this.exhaustionListeners.forEach(fn => fn());
        }
    }
}