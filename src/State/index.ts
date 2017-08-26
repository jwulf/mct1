declare var require: any, console: any;
const NanoFlux = require('nanoflux-fusion');

export const fusionStore = NanoFlux.getFusionStore();
export const getState = () => fusionStore.getState();

const subscription = fusionStore.subscribe(this, function (state) {
    // ... do something with the state
    // state is also available via fusionStore.getState()
    // console.log("Items:", state.items);
});

interface T1State {
    carbsOnBoard?: number;
    rapidInsulinOnBoard?: number;
    basalInsulinOnBoard?: number;
    BGL?: number;
}
// the 'fusionator' is responsible for the state manipulation
// it is called with two arguments, the previous state
// and an arguments array containing the arguments passed on actor call.
NanoFlux.createFusionator({
    changeBGL: function (previousState, args: number[]) {
        const { BGL } = previousState;
        const delta = args[0];
        const newBGL = BGL + delta;
        return { BGL: newBGL };
    },
    changeRapidInsulin: function (previousState, args: number[]): T1State {
        const { rapidInsulinOnBoard } = previousState;
        const delta = args[0];
        const newRapidInsulinOnBoard = rapidInsulinOnBoard + delta;
        return { rapidInsulinOnBoard: newRapidInsulinOnBoard };
    },
    changeBasalInsulin: function (previousState, args: number[]): T1State {
        const { basalInsulinOnBoard } = previousState;
        const delta = args[0];
        const newBasalInsulinOnBoard = basalInsulinOnBoard + delta;
        return { basalInsulinOnBoard: newBasalInsulinOnBoard };
    },
    changeCarbs: function (previousState, args: number[]): T1State {
        const { carbsOnBoard } = previousState;
        const delta = args[0];
        const newCarbsOnboard = carbsOnBoard + delta;
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

export const changeBGL = NanoFlux.getFusionActor("changeBGL");
export const changeRapidInsulin = NanoFlux.getFusionActor("changeRapidInsulin");
export const changeBasalInsulin = NanoFlux.getFusionActor("changeBasalInsulin");
export const changeCarbs = NanoFlux.getFusionActor("changeCarbs");
