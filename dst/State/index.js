"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NanoFlux = require('nanoflux-fusion');
exports.fusionStore = NanoFlux.getFusionStore();
exports.getState = function () { return exports.fusionStore.getState(); };
var subscription = exports.fusionStore.subscribe(this, function (state) {
    // ... do something with the state
    // state is also available via fusionStore.getState()
    // console.log("Items:", state.items);
});
// the 'fusionator' is responsible for the state manipulation
// it is called with two arguments, the previous state
// and an arguments array containing the arguments passed on actor call.
NanoFlux.createFusionator({
    changeBGL: function (previousState, args) {
        var BGL = previousState.BGL;
        var delta = args[0];
        var newBGL = BGL + delta;
        return { BGL: newBGL };
    },
    changeRapidInsulin: function (previousState, args) {
        var rapidInsulinOnBoard = previousState.rapidInsulinOnBoard;
        var delta = args[0];
        var newRapidInsulinOnBoard = rapidInsulinOnBoard + delta;
        return { rapidInsulinOnBoard: newRapidInsulinOnBoard };
    },
    changeBasalInsulin: function (previousState, args) {
        var basalInsulinOnBoard = previousState.basalInsulinOnBoard;
        var delta = args[0];
        var newBasalInsulinOnBoard = basalInsulinOnBoard + delta;
        return { basalInsulinOnBoard: newBasalInsulinOnBoard };
    },
    changeCarbs: function (previousState, args) {
        var carbsOnBoard = previousState.carbsOnBoard;
        var delta = args[0];
        var newCarbsOnboard = carbsOnBoard + delta;
        return { carbsOnBoard: newCarbsOnboard };
    }
}, 
// define an initial state!
{
    BGL: 4,
    rapidInsulinOnBoard: 0,
    basalInsulinOnBoard: 0,
    carbsOnBoard: 0
});
exports.changeBGL = NanoFlux.getFusionActor("changeBGL");
exports.changeRapidInsulin = NanoFlux.getFusionActor("changeRapidInsulin");
exports.changeBasalInsulin = NanoFlux.getFusionActor("changeBasalInsulin");
exports.changeCarbs = NanoFlux.getFusionActor("changeCarbs");
