import { BGL } from '../BGL';
import { T1Player } from '../T1Player';

export abstract class GlucoseMonitor {
    sampleRate: number;
    private _enabled: boolean;
    loop: number;
    player: T1Player;

    constructor(player: T1Player, sampleRate: number = 1000, enabled = true) {
        this.player = player;
        this.sampleRate = sampleRate;
        this.enabled = enabled;
    }

    abstract callback(BGL: BGL): void;

    public get enabled() {
        return this._enabled;
    }

    public set enabled(nowEnabled: boolean) {
        const magik = magikcraft.io;
        if (nowEnabled === this._enabled) {
            return;
        }
        this._enabled = nowEnabled;
        if (nowEnabled) {
            if (this.callback) {
                this.loop = magik.setInterval(() => this.callback(this.player.BGL), this.sampleRate);
                return;
            }
        } else {
            magik.clearInterval(this.loop);
        }
    }
}