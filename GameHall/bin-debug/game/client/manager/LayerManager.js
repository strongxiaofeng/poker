var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *
     * @desc 界面层级管理器
     *
     */
    var LayerManager = (function () {
        function LayerManager() {
            this.bgLayer = new egret.DisplayObjectContainer();
            this.uiLayer = new egret.DisplayObjectContainer();
            this.titleLayer = new egret.DisplayObjectContainer();
            this.menuLayer = new egret.DisplayObjectContainer();
            this.tipLayer = new egret.DisplayObjectContainer();
            this.topLayer = new egret.DisplayObjectContainer();
            this.systemLayer = new egret.DisplayObjectContainer();
        }
        LayerManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new LayerManager();
            }
            return this.instance;
        };
        LayerManager.prototype.onStageResize = function () {
            if (this.rooUI) {
                if (game.GlobalConfig.isMobile) {
                    return;
                }
                else {
                    if (game.StageUtil.height > LayerManager.DesignHeight) {
                        this.rooUI.y = (game.StageUtil.height - LayerManager.DesignHeight) / 2;
                        this.rooUI.scaleY = LayerManager.DesignHeight / game.StageUtil.height;
                    }
                    else {
                        this.rooUI.y = 0;
                        this.rooUI.scaleY = 1;
                    }
                }
            }
        };
        /**
         * 初始化根显示对象
         */
        LayerManager.prototype.initRootLayer = function (root) {
            this.rooUI = root;
            root.addChild(this.bgLayer);
            root.addChild(this.uiLayer);
            root.addChild(this.titleLayer);
            root.addChild(this.menuLayer);
            root.addChild(this.tipLayer);
            root.addChild(this.topLayer);
            root.addChild(this.systemLayer);
            this.onStageResize();
        };
        /** 添加显示
         * @param display {egret.DisplayObject} 要添加到UI的显示对象
         * @param layer {number} UI层级
         */
        LayerManager.prototype.addUI = function (display, layer, index) {
            if (index === void 0) { index = -1; }
            if (index > -1) {
                switch (layer) {
                    case enums.LayerConst.LAYER_BG:
                        this.bgLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_UI:
                        this.uiLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_TITLE:
                        this.titleLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_MENU:
                        this.menuLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_TIP:
                        this.tipLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_TOP:
                        this.topLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_SYSTEM:
                        this.systemLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_ROOT:
                        this.rooUI.addChildAt(display, index);
                        break;
                }
            }
            else {
                switch (layer) {
                    case enums.LayerConst.LAYER_BG:
                        this.bgLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_UI:
                        this.uiLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_TITLE:
                        this.titleLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_MENU:
                        this.menuLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_TIP:
                        this.tipLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_TOP:
                        this.topLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_SYSTEM:
                        this.systemLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_ROOT:
                        this.rooUI.addChild(display);
                        break;
                }
            }
        };
        /**
         * 设置uilayer的显示和隐藏
         */
        LayerManager.prototype.showOrHideUI = function (value) {
            this.uiLayer.visible = value;
        };
        LayerManager.prototype.openTouch = function () {
            // this.rooUI.touchThrough = true;
            this.rooUI.touchEnabled = true;
            this.rooUI.touchChildren = true;
        };
        LayerManager.prototype.forbitTouch = function () {
            // this.rooUI.touchThrough = false;
            this.rooUI.touchEnabled = false;
            this.rooUI.touchChildren = false;
        };
        /**
         * ui公共排版函数
         * */
        LayerManager.prototype.setLayer = function (display, type, offX, offY) {
            if (offX === void 0) { offX = 0; }
            if (offY === void 0) { offY = 0; }
            if (display) {
                if (display.parent) {
                    switch (type) {
                        case 1://居中
                            display.x = (game.StageUtil.width - display.width) / 2 + offX;
                            display.y = (game.StageUtil.height - display.height) / 2 + offY;
                            break;
                    }
                }
            }
        };
        LayerManager.DesignWidth = 1920;
        LayerManager.DesignHeight = 1080;
        return LayerManager;
    }());
    game.LayerManager = LayerManager;
    __reflect(LayerManager.prototype, "game.LayerManager");
})(game || (game = {}));
//# sourceMappingURL=LayerManager.js.map