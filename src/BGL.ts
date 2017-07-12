enum BGLunits {
    'mmolL',
    'mgdl'
}

/**
 *
 * The BGL class manages the player's Blood Glucose Level
 * Internally it stores the BGL in mmol/L, and provides a getter that
 * can return the value in mg/dl.
 *
 * say and effects are injected to facilitate unit testing
 *
 * @class BGL
 */
export class BGL {

    private bgl: number;
    private bglDelta: number;
    private static InitialLevel = 5;
    private say: (msg: string) => void;
    private effects: (effect: string) => void;
    public RISE_ALERT_WARN_THRESHOLD: number;
    public FALL_RATE_ALERT_THRESHOLD: number;
    public HIGH_EVENT_THRESHOLD: number;
    public LOW_EVENT_THRESHOLD: number;
    public LOW_ALERT_THRESHOLD: number;
    public HIGH_ALERT_THRESHOLD: number;

    constructor(say: (msg: string) => void, effects: (effect: string) => void) {
        this.bgl = BGL.InitialLevel;
        this.say = say;
        this.effects = effects;
    }
    getBGL(units: BGLunits = BGLunits.mmolL): number {
        switch (units) {
            case BGLunits.mmolL:
                return this.getBGLmmolL();
            case BGLunits.mgdl:
                return this.getBGLmgdl();
        }
    }

    getBGLmmolL() {
        return this.bgl;
    }

    getBGLmgdl() {
        return Math.round(this.bgl * 18);
    }

    applyBGLchange(delta: number) {

        // The following keeps newBGL 0 - 0.99
        const newBGL = (bgl => Math.min(bgl, 0.99))(Math.max(this.bgl + delta, 0));
        this.bgl = newBGL;
        this.bglDelta = delta;

        // Should alerts be moved out to a glucose monitor?
        if (this.BGLFallingFast()) {
            this.say('ALERT: BGL Falling fast');
        }
        if (this.BGLRisingFast()) {
            this.say('ALERT: BGL Rising fast');
        }
        if (this.BGLinRange()) {
            if (this.BGLGoingLow()) {
                this.say('WARNING: Dropping to a low!');
            }
        }

        // Effects
        if (!this.BGLinRange()) {
            if (this.BGLIsLow()) {
                this.effects('CONFUSION');
            }
            if (this.BGLIsHigh()) {
                this.effects('BLINDNESS');
            }
        }
        if (newBGL === 0) {
            this.say("Aaaarrrggh!"); // kill player
        }
    }

    BGLRisingFast() {
        return (this.bglDelta >= this.RISE_ALERT_WARN_THRESHOLD);
    }

    BGLFallingFast() {
        return (this.bglDelta <= this.FALL_RATE_ALERT_THRESHOLD);
    }

    BGLIsHigh() {
        return (this.bgl > this.HIGH_EVENT_THRESHOLD);
    }

    BGLIsLow() {
        return (this.bgl < this.LOW_EVENT_THRESHOLD);
    }

    BGLGoingLow() {
        return (this.bgl < this.LOW_ALERT_THRESHOLD && this.bglDelta < 0);
    }

    BGLinRange(): boolean {
        return (this.bgl > this.LOW_ALERT_THRESHOLD && this.bgl < this.HIGH_ALERT_THRESHOLD);
    }
}








