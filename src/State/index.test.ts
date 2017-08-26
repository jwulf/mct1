import * as MCT1State from './index';

describe('Test State Reducers', function () {
    test('Test shape of exports', function () {
        expect(MCT1State.fusionStore).toBeTruthy();
        expect(MCT1State.changeBasalInsulin).toBeTruthy();
        expect(MCT1State.changeRapidInsulin).toBeTruthy();
        expect(MCT1State.changeBGL).toBeTruthy();
        expect(MCT1State.changeCarbs).toBeTruthy();
    });
    test('Initial State', function () {
        expect(MCT1State.getState().BGL).toBe(4);
    });
    test('Mutate BGL', function () {
        expect(MCT1State.getState().BGL).toBe(4);
        MCT1State.changeBGL(2);
        expect(MCT1State.getState().BGL).toBe(6);
    });
    test('Mutate Carbs', function () {
        expect(MCT1State.getState().carbsOnBoard).toBe(0);
        MCT1State.changeCarbs(20);
        expect(MCT1State.getState().carbsOnBoard).toBe(20);
    });
    test('Mutate Rapid Insulin', function () {
        expect(MCT1State.getState().rapidInsulinOnBoard).toBe(0);
        MCT1State.changeRapidInsulin(12.5);
        expect(MCT1State.getState().rapidInsulinOnBoard).toBe(12.5);
    });
    test('Mutate Basal Insulin', function () {
        expect(MCT1State.getState().basalInsulinOnBoard).toBe(0);
        MCT1State.changeBasalInsulin(14.3);
        expect(MCT1State.getState().basalInsulinOnBoard).toBe(14.3);
    });
})