"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlucoseMonitor = (function () {
    function GlucoseMonitor(player, sampleRate, enabled) {
        if (sampleRate === void 0) { sampleRate = 1000; }
        if (enabled === void 0) { enabled = true; }
        this.player = player;
        this.sampleRate = sampleRate;
        this.enabled = enabled;
        // Node.js vs Minecraft run-time environment
        this.Interval = (typeof magikcraft === "undefined") ?
            { set: setInterval, clear: clearInterval } :
            { set: magikcraft.io.setInterval, clear: magikcraft.io.clearInterval };
    }
    Object.defineProperty(GlucoseMonitor.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (nowEnabled) {
            var _this = this;
            if (nowEnabled === this._enabled) {
                // No state change
                return;
            }
            this._enabled = nowEnabled;
            if (nowEnabled) {
                if (this.callback) {
                    this.loop = this.Interval.set(function () { return _this.callback(_this.player.BGL); }, this.sampleRate);
                    return;
                }
            }
            else {
                this.Interval.clear(this.loop);
            }
        },
        enumerable: true,
        configurable: true
    });
    return GlucoseMonitor;
}());
exports.GlucoseMonitor = GlucoseMonitor;
