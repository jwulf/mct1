import { T1Player } from '../Player/T1Player';
import { GlucoseMonitor } from './GlucoseMonitor';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;

class TestMonitor extends GlucoseMonitor {
    public count = 0;

    monitor(BGL) {
        this.count ++;
    }

    constructor(player, sampleRate, enabled) {
        super(player, sampleRate, enabled);
    }
}

const player = new T1Player('test');
const testMonitor = new TestMonitor(player, 1000, false);

test('the monitor does not start when autostart is false', () => {
    expect(testMonitor.enabled).toBe(false);
});

test('the monitor starts with a zero count', () => {
    expect(testMonitor.count).toBe(0);
});

test('the monitor starts and functions', done => {
    function callback(){
        expect(testMonitor.count).toBeGreaterThan(4);
        done();
    }
    testMonitor.start();
    setTimeout(() => callback(), 5500);
})
