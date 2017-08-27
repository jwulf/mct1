"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../State");
var timer_1 = require("../util/timer");
var Carbohydrate = (function () {
    function Carbohydrate(grams, glycemicIndex, glycemicLoad) {
        this.grams = grams;
        this.glycemicIndex = glycemicIndex;
        this.glycemicLoad = glycemicLoad;
    }
    Carbohydrate.prototype.digest = function () {
        var singleGramPerSecond = 1;
        // do Digestion
        // Convert some grams to bgl
        var digestedGlucose = Math.min(singleGramPerSecond, 0.1 * this.grams * this.glycemicIndex);
        // decrement grams
        this.grams -= singleGramPerSecond; // 1gm/sec
        // impact player BGL
        State_1.changeBGL(digestedGlucose);
        // if grams <= 0; stop digestion
        if (this.grams <= 0) {
            timer_1.Interval.clearInterval(this.digestionLoop);
        }
    };
    Carbohydrate.prototype.eat = function () {
        var _this = this;
        this.digestionLoop = timer_1.Interval.setInterval(function () { return _this.digest(); }, 1000);
    };
    return Carbohydrate;
}());
exports.Carbohydrate = Carbohydrate;
