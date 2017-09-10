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
const milliseconds = 1000;
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
        debug(`Taking ${amount} rapid`);
        State.changeRapidInsulin(amount);

        // This timeout is the onset Delay of taking the insulin
        Interval.setTimeout(() => {
            debug('Starting absorption');
            this.doInsulinAbsorption(amount);
        }, this.onsetDelay * milliseconds);
    }

    doInsulinAbsorption(amount: number) {
        const dose = amount;
        debug('Absorption started');
        let elapsedTime = 0;

        let effects: number[] = [];

        const calculateInsulinEffectWithPeak = (power, duration) => elapsedTime => {
            if (elapsedTime > duration / 2) {
                return (effects.pop() as number);
            }
            const effect = sample_rate*elapsedTime*Math.tan(Math.atan(4*power/duration)/duration);
            effects.push(effect);
            return effect;
        };

        const calculateInsulinEffectWithoutPeak = (power, duration) => elapsedTime => {
            return power / duration;
        }

        const activeEffectTime = this.duration - this.onsetDelay;

        const calculateInsulinEffect = (this.peak) ? calculateInsulinEffectWithPeak(this.bglDeltaPerUnit, activeEffectTime) : calculateInsulinEffectWithoutPeak(this.bglDeltaPerUnit, activeEffectTime);

        let _loop = Interval.setInterval(
            () => {
                elapsedTime += sample_rate;
                debug(`Elapsed time: ${elapsedTime}`);
                debug(`Duration: ${activeEffectTime}`);
                if (elapsedTime >= activeEffectTime) {
                    // insulin effect exhausted
                    Interval.clearInterval(_loop);
                    debug('Insulin effect exhausted');
                    this.doExhaustion();
                    return;
                }
                debug('Doing insulin effect');
                const bglDelta = (amount > 0)? calculateInsulinEffect(elapsedTime) * dose : 0;
                const insulinAbsorbed = (amount > 0) ?  Math.min(amount, (bglDelta / (this.bglDeltaPerUnit * dose)) * dose): 0;
                amount -= insulinAbsorbed;
                this.doSideEffects(bglDelta, insulinAbsorbed);
            },
            sample_rate * milliseconds
        );
    }

    doSideEffects(bglDelta, insulinDelta) {
        if (isNode) {
            this.test_bgl -= bglDelta;
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