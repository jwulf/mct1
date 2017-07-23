import { BGL } from '../BGL/BGL';
import { T1Player } from '../Player/T1Player';
import * as env from '../util/env';
import { Interval } from '../util/timer';

export abstract class GlucoseMonitor {
    sampleRate: number;
    loop: number;
    player: T1Player;
    private _enabled: boolean;

    constructor(player: T1Player, sampleRate: number = 1000, autostart = true) {
        this.player = player;
        this.sampleRate = sampleRate;
        this.enabled = autostart;
    }

    /**
     *
     * The monitor function is called every sampleRate milliseconds, and is where a
     * class extending GlucoseMonitor should do the actual monitoring side-effects,
     * such as updating a screen component, calculating and applying effects, or
     * writing to a disk or remote database.
     * @abstract
     * @param {BGL} BGL
     * @memberof GlucoseMonitor
     */
    abstract monitor(BGL: BGL): void;

    public get enabled() {
        return this._enabled;
    }

    public start() {
        this.enabled = true;
    }

    public stop() {
        this.enabled = false;
    }

    public set enabled(nowEnabled: boolean) {

        if (nowEnabled === this._enabled) {
            // No state change
            return;
        }
        this._enabled = nowEnabled;
        if (nowEnabled) {
            if (this.monitor) {
                this.loop = Interval.setInterval(() => this.monitor(this.player.BGL), this.sampleRate);
                return;
            }
        } else {
            Interval.clearInterval(this.loop);
        }
    }
}