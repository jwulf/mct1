import { T1Player } from './T1Player';

const magik = magikcraft.io

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

class Insulin {
    public onsetDelay: number;
    public duration: number;
    public peak: boolean;
    public power: number;

    constructor(onsetDelay = 0, duration: number, power: number, peak = false) {
        this.onsetDelay = onsetDelay;
        this.duration = duration;
        this.peak = false; // Set to true for a saw-tooth acting insulin, false for a flat basal one
        this.power = power;
    }

    // If peak is true, this applies the effect of the insulin in a saw-tooth curve,
    // peaking at its maximum mid-way through the duration.
    // the curve looks like this:  /\
    // If peak is false, the insulin absorption curve is flat, like a long-acting basal 
    // insulin
    calculateInsulinEffect(elapsedTime: number) {
        if (!this.peak) {
            return this.power;
        }
        const a = Math.atan(this.power / (this.duration * 0.5));
        const getE = () => {
            if (elapsedTime <= this.duration / 2) {
                return a * elapsedTime;
            } else {
                return a * this.duration - elapsedTime;
            }
        };
        const e = getE();
        const effect = e * a;
        return effect;
    }

    // When you take insulin, it sets up a timer loop that applies the effect of the insulin
    // until it runs out.

    // TODO: Need to update some player.insulin state to display the "total amount of insulin onboard" in the insulin HUD
    take(amount: number, player: T1Player) {
        let elapsedTime = this.onsetDelay;
        // This timeout is the onset Delay of taking the insulin
        magik.setTimeout(() => {
            // the insulin starts to act
            let _loop = magik.setInterval(
                () => {
                    if (elapsedTime >= this.duration - this.onsetDelay) {
                        // insulin effect exhausted
                        magik.clearInterval(_loop);
                        return;
                    }
                    // == Do Insulin effect ==
                    // calculate insulin power
                    const bglDelta = this.calculateInsulinEffect(elapsedTime) * amount;
                    player.BGL.applyBGLchange(bglDelta);
                    elapsedTime += secondsPerTick;
                },
                secondsPerTick
            );
        }, this.onsetDelay);
    }
}