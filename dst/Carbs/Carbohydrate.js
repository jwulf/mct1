"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State = require("../State");
var timer_1 = require("../util/timer");
var Carbohydrate = (function () {
    function Carbohydrate(grams, glycemicIndex, glycemicLoad) {
        if (glycemicIndex === void 0) { glycemicIndex = 1; }
        if (glycemicLoad === void 0) { glycemicLoad = 1; }
        this.grams = grams;
        this.glycemicIndex = glycemicIndex;
        this.glycemicLoad = glycemicLoad;
    }
    Carbohydrate.prototype.digest = function () {
        var gramsPerSecond = 1;
        var digestionCoefficient = 0.004;
        var digestedGlucose = Math.min(gramsPerSecond, digestionCoefficient * this.grams * this.glycemicIndex);
        this.grams -= gramsPerSecond;
        State.changeCarbs(-gramsPerSecond);
        State.changeBGL(digestedGlucose);
        if (this.grams <= 0) {
            timer_1.Interval.clearInterval(this.digestionLoop);
        }
    };
    Carbohydrate.prototype.eat = function () {
        var _this = this;
        this.digestionLoop = timer_1.Interval.setInterval(function () { return _this.digest(); }, 1000);
        State.changeCarbs(this.grams);
    };
    return Carbohydrate;
}());
exports.Carbohydrate = Carbohydrate;
