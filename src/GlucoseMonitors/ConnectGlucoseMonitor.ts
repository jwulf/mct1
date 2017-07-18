import { BGL } from '../BGL';
import { GlucoseMonitor } from './GlucoseMonitor';

export class ConnectGlucoseMonitor extends GlucoseMonitor {

        /**
         * This callback is called every second, and is passed the Blood glucose reading of the player
         *
         * @param {BGL} BGL
         * @memberof ConnectGlucoseMonitor
         */
        callback(BGL: BGL) {
            const name = this.player.name;
            // Get the BGL Value in mmol/L:
            const bgl = BGL.getBGL();
            // HTTP Post this data somewhere
            //http.post();
        }

}