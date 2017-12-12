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
var game;
(function (game) {
    var PCMenuUI = (function (_super) {
        __extends(PCMenuUI, _super);
        function PCMenuUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "menu/menuSkin.exml";
            return _this;
        }
        // ---------------------------------------------- init ----------------------------------------------
        /**组件创建完成初始化数据等操作 */
        PCMenuUI.prototype.initSetting = function () {
            this.groupLevel1.visible = true;
            this.groupLevel2.visible = false;
            this.groupLevel3.visible = false;
            this.groupLevel2.mask = this.mask2;
            this.groupLevel3.mask = this.mask3;
        };
        /** 收到mediator的通知 */
        PCMenuUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case MenuUICommands.initListener:
                    this.initListener(params);
                    break;
                case MenuUICommands.setVisible:
                    this.visible = params;
                    break;
                case MenuUICommands.addUI:
                    this.addUI(params);
                    break;
                case MenuUICommands.tweenUI:
                    this.tweenUI(params);
                    break;
                case MenuUICommands.closeUI:
                    this.closeUI(params);
                    break;
            }
        };
        // ---------------------------------------------- 监听事件 ----------------------------------------------
        /** 注册事件监听器 */
        PCMenuUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.closeBtn1, egret.TouchEvent.TOUCH_TAP, mediator.closeUI1, mediator);
            this.registerEvent(this.closeBtn2, egret.TouchEvent.TOUCH_TAP, mediator.closeUI2, mediator);
            this.registerEvent(this.closeBtn3, egret.TouchEvent.TOUCH_TAP, mediator.closeUI3, mediator);
        };
        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        PCMenuUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
        };
        // ---------------------------------------------- UI ----------------------------------------------
        PCMenuUI.prototype.addUI = function (info) {
            var group = this["groupLevel" + info.level];
            var container = this["container" + info.level];
            if (group && container) {
                container.removeChildren();
                container.addChild(info.ui);
                group.width = info.ui.width;
            }
            if (info.level == 1) {
                this.groupLevel1.left = (1920 - group.width) / 2;
                this.groupLevel2.left = (1920 - group.width) / 2;
                this.groupLevel3.left = (1920 - group.width) / 2;
                this.mask2.left = (1920 - group.width) / 2;
                this.mask3.left = (1920 - group.width) / 2;
            }
        };
        PCMenuUI.prototype.tweenUI = function (data) {
            var _this = this;
            var totalWidth = 0;
            for (var key in data) {
                if (data[key] && data[key].ui) {
                    totalWidth += data[key].ui.width;
                }
            }
            for (var i = 1; i <= 3; i++) {
                this["groupLevel" + i].visible = !!(data["info" + i]);
            }
            game.CTween.removeTweens(this.groupLevel1);
            game.CTween.removeTweens(this.groupLevel2);
            game.CTween.removeTweens(this.groupLevel3);
            // handle groupLevel1 & mask
            if (data.info1) {
                game.CTween.get(this.groupLevel1).to({
                    left: (1920 - totalWidth) / 2
                }, 400)
                    .call(function () { game.CTween.removeTweens(_this.groupLevel1); }, this);
                game.CTween.get(this.mask2).to({
                    left: (1920 - totalWidth) / 2
                }, 400)
                    .call(function () { game.CTween.removeTweens(_this.mask2); }, this);
                game.CTween.get(this.mask3).to({
                    left: (1920 - totalWidth) / 2
                }, 400)
                    .call(function () { game.CTween.removeTweens(_this.mask3); }, this);
            }
            // handle groupLevel2
            if (data.info2) {
                game.CTween.get(this.groupLevel2).to({
                    left: (1920 - totalWidth) / 2 + data.info1.ui.width
                }, 400)
                    .call(function () { game.CTween.removeTweens(_this.groupLevel2); }, this);
            }
            // handle groupLevel3
            if (data.info3) {
                game.CTween.get(this.groupLevel3).to({
                    left: 1920 - (1920 - totalWidth) / 2 - data.info3.ui.width
                }, 400)
                    .call(function () { game.CTween.removeTweens(_this.groupLevel3); }, this);
            }
        };
        PCMenuUI.prototype.closeUI = function (data) {
            var _this = this;
            game.CTween.removeTweens(this.groupLevel1);
            game.CTween.removeTweens(this.groupLevel2);
            game.CTween.removeTweens(this.groupLevel3);
            var totalWidth = this.groupLevel1.width;
            if (data.level == 3) {
                totalWidth += this.groupLevel2.width;
            }
            if (data.isDirect) {
                this.groupLevel1.left = (1920 - totalWidth) / 2;
                this.mask2.left = (1920 - totalWidth) / 2;
                this.mask3.left = (1920 - totalWidth) / 2;
                // handle groupLevel2
                if (data.level == 3) {
                    this.groupLevel2.left = (1920 - totalWidth) / 2 + this.groupLevel1.width;
                }
                else {
                    this.groupLevel2.left = (1920 - totalWidth) / 2 + this.groupLevel1.width - this.groupLevel2.width;
                    this.groupLevel2.visible = false;
                }
                // handle groupLevel3
                this.groupLevel3.left = (1920 - totalWidth) / 2 + this.groupLevel1.width - this.groupLevel3.width;
                this.groupLevel3.visible = false;
                data.callBack.apply(data.thisObj);
            }
            else {
                // handle groupLevel1 & mask
                game.CTween.get(this.groupLevel1).to({
                    left: (1920 - totalWidth) / 2
                }, 400).call(data.callBack, data.thisObj);
                game.CTween.get(this.mask2).to({
                    left: (1920 - totalWidth) / 2
                }, 400);
                game.CTween.get(this.mask3).to({
                    left: (1920 - totalWidth) / 2
                }, 400);
                // handle groupLevel2
                if (data.level == 3) {
                    game.CTween.get(this.groupLevel2).to({
                        left: (1920 - totalWidth) / 2 + this.groupLevel1.width
                    }, 400);
                }
                else {
                    game.CTween.get(this.groupLevel2).to({
                        left: (1920 - totalWidth) / 2 + this.groupLevel1.width - this.groupLevel2.width
                    }, 400).call(function () {
                        _this.groupLevel2.visible = false;
                    }, this);
                }
                // handle groupLevel3
                game.CTween.get(this.groupLevel3).to({
                    left: (1920 - totalWidth) / 2 + this.groupLevel1.width - this.groupLevel3.width
                }, 400).call(function () {
                    _this.groupLevel3.visible = false;
                }, this);
            }
        };
        // ---------------------------------------------- dispose ----------------------------------------------
        /** 资源释放 */
        PCMenuUI.prototype.dispose = function () {
            game.CTween.removeTweens(this.groupLevel1);
            game.CTween.removeTweens(this.groupLevel2);
            game.CTween.removeTweens(this.groupLevel3);
            game.CTween.removeTweens(this.mask2);
            game.CTween.removeTweens(this.mask3);
            _super.prototype.dispose.call(this);
        };
        return PCMenuUI;
    }(game.BaseUI));
    game.PCMenuUI = PCMenuUI;
    __reflect(PCMenuUI.prototype, "game.PCMenuUI");
})(game || (game = {}));
//# sourceMappingURL=PCMenuUI.js.map