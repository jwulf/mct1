import { BGL } from './BGL';

interface IDependencies {
    Bars: BossBarAPI;
    sender: BukkitPlayer;
    textcomponent: TextComponent;
}

/**
 *
 * BGLBar creates a UI Bar to display the user's Blood Glucose Level
 *
 * Dependencies are injected to facilitate unit testing with mock objects
 *
 * The Bar progress is between 0 and 0.99, so it will need to be scaled wrt
 * the BGL, which is represented internally as mmol/L
 *
 * @class BGLBar
 */
export class BGLBar {

    public updateInterval: number;
    public bar: BossBar;
    public Bars: BossBarAPI;
    private BGL: BGL;
    private updateLoop: any;

    constructor(updateInterval: number, BGL: BGL, deps: IDependencies) {
        const { Bars, sender, textcomponent } = deps;
        // Max 0.5s - 2s update interval
        this.updateInterval = Math.min(Math.max(2000, updateInterval), 500);
        this.BGL = BGL;
        this.bar = Bars.addBar(sender,
            textcomponent("BGL"),
            Bars.Color.RED,
            Bars.Style.NOTCHED_20,
            0.0 // Progress (0.0 - 1.0)
        );
        this.updateLoop = magikcraft.io.setInterval(()=> {
            this.update();
        }, updateInterval);
    }

    makeBarGreen() {
        this.bar.setColor(this.Bars.Color.GREEN);
    }

    makeBarRed() {
        this.bar.setColor(this.Bars.Color.RED);
    }

    update() {
        const bgl = this.BGL.getBGL();
        this.bar.setProgress(bgl);
        if (this.BGL.BGLinRange) {
            this.makeBarGreen();
        } else {
            this.makeBarRed();
        }
    }
}