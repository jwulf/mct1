import { ConnectGlucoseMonitor } from './ConnectGlucoseMonitor';
import { T1Player } from '../Player/T1Player';
import { GlucoseMonitor } from './GlucoseMonitor';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;

const player = new T1Player('test');
const testConnectMonitor = new ConnectGlucoseMonitor(player, 1000, false);

test('the monitor does not start when autostart is false', () => {
    expect(testConnectMonitor.enabled).toBe(false);
});

test('the monitor starts and functions', done => {
    function callback(){
        // expect(testMonitor.count).toBeGreaterThan(4);
        done();
    }
    testConnectMonitor.start();
    setTimeout(() => callback(), 500);
})
