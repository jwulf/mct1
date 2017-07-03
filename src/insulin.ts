/**
 * This is the Insulin class
 * Create a new instance of this class for basal and fast-acting insulins.
 * 
 *  param {number} onsetDelay - the number of seconds before the insulin effect kicks instance.
 *  param {number} duration - the number of seconds of the total effective duration of this insulin.
 *  param {number} peak - the number of seconds to the peak action of the insulin. Set to 0 for a flat (consistent) effect. Is modelled as a bell curve centered on the peak.
 * param {number} power - the effect of the insulin. This is the peak power for insulins wiht a peak response.
 */
// const magik = magikcraft.io;
const secondsPerTick = 1;

class Insulin {
    public onsetDelay: number;
    public duration: number;
    public peak: number;
    public power: number;

    constructor(onsetDelay = 0, duration: number, power: number, peak = 0) {
        this.onsetDelay = onsetDelay;
        this.duration = duration;
        this.peak = peak;
        this.power = power;
    }

    calculateInsulinEffect(elapsedTime: number) {
        if (this.peak === 0) {
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
    }

    take(amount: number) {
        let elapsedTime = this.onsetDelay;
        const magik = magikcraft.io
        const mct1 = magik.global('mct1') as any;

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
                    const effect = this.calculateInsulinEffect(elapsedTime);
                    mct1.mutateBGL(effect);
                    elapsedTime += secondsPerTick;
                },
                secondsPerTick
            );
        }, this.onsetDelay);
    }

}