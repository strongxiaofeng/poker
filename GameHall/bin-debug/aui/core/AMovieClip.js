var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var eui;
(function (eui) {
    var AMovieClip = (function (_super) {
        __extends(AMovieClip, _super);
        function AMovieClip() {
            var _this = _super.call(this) || this;
            /**帧图数组 */
            _this.imgs = [];
            /**当前帧 */
            _this.currentFrame = 0;
            /**是否循环播放 默认true */
            _this.loop = true;
            /**播放速度 值越大播放越慢 */
            _this.speed = 5;
            /**计数器 */
            _this._flag = 0;
            return _this;
        }
        /** 开始播放 */
        AMovieClip.prototype.play = function () {
            this.currentFrame = 0;
            this.source = this.imgs[this.currentFrame];
            this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        };
        /**停止播放 */
        AMovieClip.prototype.stop = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        };
        AMovieClip.prototype.onFrame = function () {
            this._flag++;
            if (this._flag >= this.speed) {
                this.nextFrame();
                this._flag = 0;
            }
        };
        /**播下一帧 */
        AMovieClip.prototype.nextFrame = function () {
            this.currentFrame++;
            if (this.currentFrame == this.imgs.length) {
                this.dispatchEventWith(egret.Event.COMPLETE);
                if (this.loop) {
                    this.currentFrame = 0;
                }
                else {
                    this.stop();
                    return;
                }
            }
            this.source = this.imgs[this.currentFrame];
        };
        Object.defineProperty(AMovieClip.prototype, "sources", {
            /**设置图片数组 例如 'a0_png'到'a10_png' 那么设置为格式为 'a|0-10|_png' */
            set: function (str) {
                var arr = str.split("|");
                var numStr = arr[1];
                var start = parseInt(numStr.split("-")[0]);
                var end = parseInt(numStr.split("-")[1]);
                this.imgs = [];
                for (var i = start; i <= end; i++) {
                    this.imgs.push(arr[0] + i + arr[2]);
                }
            },
            enumerable: true,
            configurable: true
        });
        return AMovieClip;
    }(eui.Image));
    eui.AMovieClip = AMovieClip;
    __reflect(AMovieClip.prototype, "eui.AMovieClip");
})(eui || (eui = {}));
//# sourceMappingURL=AMovieClip.js.map