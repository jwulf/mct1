"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State = require("../State");
var timer_1 = require("../util/timer");
var Carbohydrate = (function () {
    function Carbohydrate(grams, glycemicIndex, glycemicLoad) {
        this.grams = grams;
        this.glycemicIndex = glycemicIndex;
        this.glycemicLoad = glycemicLoad;
    }
    Carbohydrate.prototype.digest = function () {
        var gramsPerSecond = 1;
        var digestionCoefficient = 0.004;
        // do Digestion
        // Convert some grams to bgl
        var digestedGlucose = Math.min(gramsPerSecond, digestionCoefficient * this.grams * this.glycemicIndex);
        // decrement grams
        this.grams -= gramsPerSecond; // 1gm/sec
        State.changeCarbs(-gramsPerSecond);
        // impact player BGL
        State.changeBGL(digestedGlucose);
        // if grams <= 0; stop digestion
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
