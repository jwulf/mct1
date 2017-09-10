import { Insulin } from './Insulin';


describe('Insulin function', () => {
    test('Rapid insulin function', done => {
        const testInsulin = new Insulin(2, 15, 2, true);
        testInsulin.test_bgl = 8;
        testInsulin.test_insulinOnBoard = 1;
        function tests() {
            try {
                //expect(testInsulin.test_insulinOnBoard).toBeLessThan(0.1);
                //expect(testInsulin.test_insulinOnBoard).toBeGreaterThan(0);
                expect(testInsulin.test_bgl).toBeLessThan(4.1);
                expect(testInsulin.test_bgl).toBeGreaterThan(3.9);
            } catch (e) {
                done.fail(e);
            }
            done();
        }
        testInsulin.onExhaustion(tests);
        testInsulin.take(2);
    }, 20000);
})