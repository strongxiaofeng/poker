var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
    *
    * @author
    *
    */
    var StageUtil = (function () {
        function StageUtil() {
        }
        Object.defineProperty(StageUtil, "width", {
            get: function () {
                if (this.stage)
                    return this.stage.stageWidth;
                else
                    return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtil, "height", {
            get: function () {
                if (this.stage)
                    return this.stage.stageHeight;
                else
                    return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtil, "frameRate", {
            get: function () {
                if (this.stage)
                    return this.stage.frameRate;
                else
                    return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtil, "top", {
            /**
             * 获取离上边界距离
             */
            get: function () {
                var top = 0;
                if (game.GlobalConfig.isMobile) {
                    top = document.documentElement.clientHeight - window.innerHeight;
                    if (top > 44)
                        top = top / 2;
                }
                return top;
            },
            enumerable: true,
            configurable: true
        });
        StageUtil.setMaxTouched = function (n) {
            if (n === void 0) { n = 1; }
            if (this.stage)
                this.stage.maxTouches = n;
            ;
        };
        /**将内容复制到剪切板 */
        StageUtil.copyTxt = function (txt) {
            window["copyTxt"](txt);
        };
        /**设置屏幕同时可触摸数量 */
        StageUtil.maxTouches = function (num) {
            this.stage.maxTouches = num;
        };
        StageUtil.canvasHeight = 0;
        return StageUtil;
    }());
    game.StageUtil = StageUtil;
    __reflect(StageUtil.prototype, "game.StageUtil");
})(game || (game = {}));
//# sourceMappingURL=StageUtil.js.map