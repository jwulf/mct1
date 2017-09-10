import { Insulin } from './Insulin';

const testInsulin = new Insulin(2, 10, 2, true);

describe('Insulin function', () => {
    test('Test insulin function', done => {
        testInsulin.test_bgl = 8;
        testInsulin.test_insulinOnBoard = 1;
        function tests() {
            try {
                expect(testInsulin.test_insulinOnBoard).toBe(0);
                expect(testInsulin.test_bgl).toBe(6);
            } catch (e) {
                done.fail(e);
            }
            done();
        }
        testInsulin.onExhaustion(tests);
        testInsulin.take(1);
    }, 20000);
})