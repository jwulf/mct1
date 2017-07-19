"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GlucoseMonitor_1 = require("./GlucoseMonitor");
var ConnectGlucoseMonitor = (function (_super) {
    __extends(ConnectGlucoseMonitor, _super);
    function ConnectGlucoseMonitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This callback is called every second, and is passed the Blood glucose reading of the player
     *
     * @param {BGL} BGL
     * @memberof ConnectGlucoseMonitor
     */
    ConnectGlucoseMonitor.prototype.callback = function (BGL) {
        var name = this.player.name;
        // Get the BGL Value in mmol/L:
        var bgl = BGL.getBGL();
        // HTTP Post this data somewhere
        //http.post();
    };
    return ConnectGlucoseMonitor;
}(GlucoseMonitor_1.GlucoseMonitor));
exports.ConnectGlucoseMonitor = ConnectGlucoseMonitor;
