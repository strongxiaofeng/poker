var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 负责将UI展现到舞台上，从舞台上清除
     * */
    var UIManager = (function () {
        function UIManager() {
        }
        /**打开一个UI */
        UIManager.OpenUI = function (ui, layer, direction, index) {
            if (index === void 0) { index = -1; }
            var uiName = egret.getQualifiedClassName(ui);
            game.DebugUtil.debug("UIManager open UI " + uiName + " 方向 " + direction);
            ui.layer = layer;
            game.LayerManager.getInstance().addUI(ui, layer, index);
            this.uiDic.setValue(egret.getQualifiedClassName(ui), ui);
            if (direction && game.GlobalConfig.isMobile) {
                game.LayerManager.getInstance().forbitTouch();
                var dir = {};
                if (VIEWDIRECTION.TOP == direction) {
                    dir = { "y": 0 };
                    ui.x = 0;
                    ui.y = -game.StageUtil.height;
                }
                else if (VIEWDIRECTION.BOTTOM == direction) {
                    dir = { "y": 0 };
                    ui.x = 0;
                    ui.y = game.StageUtil.height;
                }
                else if (VIEWDIRECTION.LEFT == direction) {
                    dir = { "x": 0 };
                    ui.y = 0;
                    ui.x = -game.StageUtil.width;
                }
                else if (VIEWDIRECTION.RIGHT == direction) {
                    dir = { "x": 0 };
                    ui.y = 0;
                    ui.x = game.StageUtil.width;
                }
                egret.Tween.removeTweens(ui);
                egret.Tween.get(ui).wait(200).to(dir, 400).call(function () {
                    egret.Tween.removeTweens(ui);
                    game.LayerManager.getInstance().openTouch();
                }, this);
            }
            else {
                ui.x = 0;
                ui.y = 0;
            }
        };
        /**隐藏其他的ui，主要用于视频回放 */
        UIManager.hideOtherUI = function (ui) {
            this.lastState.clear();
            var arr = this.uiDic.getAllValue();
            for (var i = arr.length - 1; i >= 0; i--) {
                var type = egret.getQualifiedClassName(arr[i]);
                if (ui != arr[i] && type != "NavbarUI1") {
                    this.lastState.setValue(egret.getQualifiedClassName(arr[i]), arr[i].visible);
                    arr[i].visible = false;
                }
            }
        };
        /**显示当前显示列表的ui */
        UIManager.showOtherUI = function () {
            var arr = this.uiDic.getAllValue();
            for (var i = arr.length - 1; i >= 0; i--) {
                arr[i].visible = this.lastState.getValue(egret.getQualifiedClassName(arr[i]));
            }
        };
        /**关闭当前界面 */
        UIManager.closeCur = function () {
        };
        /**关闭一个UI */
        UIManager.closeUI = function (ui, direction) {
            if (!ui)
                return;
            var uiName = egret.getQualifiedClassName(ui);
            game.DebugUtil.debug("UIManager close UI " + uiName + " 方向 " + direction);
            this.uiDic.removeKey(uiName);
            if (direction && game.GlobalConfig.isMobile) {
                var dir = {};
                if (VIEWDIRECTION.TOP == direction) {
                    dir = { "y": game.StageUtil.height };
                    ui.x = 0;
                }
                else if (VIEWDIRECTION.BOTTOM == direction) {
                    dir = { "y": -game.StageUtil.height };
                    ui.x = 0;
                }
                else if (VIEWDIRECTION.LEFT == direction) {
                    dir = { "x": game.StageUtil.width };
                    ui.y = 0;
                }
                else if (VIEWDIRECTION.RIGHT == direction) {
                    dir = { "x": -game.StageUtil.width };
                    ui.y = 0;
                }
                egret.Tween.removeTweens(ui);
                egret.Tween.get(ui).to(dir, 400).call(function () {
                    egret.Tween.removeTweens(ui);
                    ui.dispose();
                }, this);
            }
            else {
                ui.dispose();
            }
        };
        UIManager.onStageResize = function (e) {
            if (this.uiDic) {
                var uis = this.uiDic.getAllValue();
                for (var i = 0; i < uis.length; i++) {
                    var ui = uis[i];
                    if (ui) {
                        ui.onStageResize(e);
                    }
                }
            }
        };
        UIManager.uiDic = new game.Dictionary();
        UIManager.lastState = new game.Dictionary();
        return UIManager;
    }());
    game.UIManager = UIManager;
    __reflect(UIManager.prototype, "game.UIManager");
})(game || (game = {}));
//# sourceMappingURL=UIManager.js.map