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
const secondsPerTick = 1;

export class Insulin {
    public onsetDelay: number;
    public duration: number;
    public peak: boolean;
    public power: number;

    /**
     * Creates an instance of Insulin.
     * @param {any} onsetDelay - millisecond delay till insulin effect starts
     * @param {number} duration - milliseconds of action
     * @param {number} power - power factor (don't know the units yet)
     * @param {boolean} [peak=false] set to true for a saw-tooth, false for flat response
     * @memberof Insulin
     */
    constructor(onsetDelay, duration: number, power: number, peak = false) {
        this.onsetDelay = onsetDelay;
        this.duration = duration;
        this.peak = peak; // Set to true for a saw-tooth acting insulin, false for a flat basal one
        this.power = power;
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
        }, this.onsetDelay);
    }

    doInsulinAbsorption(elapsedTime: number, amount: number) {
        debug('Absorption started');
        // If peak is true, this applies the effect of the insulin in a saw-tooth curve,
        // peaking at its maximum mid-way through the duration.
        // the curve looks like this:  /\
        // If peak is false, the insulin absorption curve is flat, like a long-acting basal
        // insulin
        const calculateInsulinEffect = ((power, duration, peak) => (elapsedTime: number) => {
            if (!peak) {
                return power;
            }
            const a = Math.atan(power / (duration * 0.5));
            const getE = () => {
                if (elapsedTime <= duration / 2) {
                    return a * elapsedTime;
                } else {
                    return a * duration - elapsedTime;
                }
            };
            const e = getE();
            const effect = e * a;
            // @TODO: Insulin is absorbed over a fixed period
            // but the amounts absorbed / still in-system at any given time
            // vary according to the absorption profile. Does it need some
            // kind of integral calculus? The area under the absorption curve
            // should equal the total amount, and the amount remaining in-system
            // at any point should be the total minus whatever has been absorbed.
            State.changeRapidInsulin(-a);

            return effect;
        })(this.power, this.duration, this.peak);

        let _loop = Interval.setInterval(
            () => {
                debug(`Elapsed time: ${elapsedTime}`);
                debug(`Duration: ${this.duration - this.onsetDelay}`);
                if (elapsedTime >= this.duration - this.onsetDelay) {
                    // insulin effect exhausted
                    Interval.clearInterval(_loop);
                    debug('Insulin effect exhausted');
                    return;
                }
                // == Do Insulin effect ==
                // TODO: calculate insulin power
                debug('Doing insulin effect');
                const bglDelta = calculateInsulinEffect(elapsedTime) * amount;
                debug(`Insulin bglDelta ${bglDelta}`);
                State.changeBGL(0-bglDelta);
                elapsedTime += secondsPerTick;
            },
            secondsPerTick * 1000
        );
    }
}