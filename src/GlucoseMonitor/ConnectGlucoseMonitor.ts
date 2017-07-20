import { T1Player } from '../Player/T1Player';
import { BGL } from '../BGL/BGL';
import { GlucoseMonitor } from './GlucoseMonitor';

export class ConnectGlucoseMonitor extends GlucoseMonitor {

        constructor(player: T1Player, sampleRate: number, autostart?: boolean) {
            super(player, sampleRate, autostart);
        }

        /**
         * The monitor event is called every {sampleRate} milliseconds
         *
         * @param {BGL} BGL
         * @memberof ConnectGlucoseMonitor
         */
        monitor(BGL: BGL) {

            const minecraftPlayername = this.player.name;

            // The current BGL Value in mmol/L:
            const bgl = BGL.getBGL();
            // HTTP Post this data somewhere
            //http.post();
        }

}