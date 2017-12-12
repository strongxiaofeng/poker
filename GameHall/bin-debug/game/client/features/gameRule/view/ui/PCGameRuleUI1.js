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
    var PCGameRuleUI1 = (function (_super) {
        __extends(PCGameRuleUI1, _super);
        function PCGameRuleUI1(data) {
            var _this = _super.call(this, data) || this;
            /**当前页数*/
            _this.pageNum = 1;
            _this.skinName = "resource/skins/game_skins/pc/gameRule/gameRuleSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        PCGameRuleUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initType();
            this.initBtn();
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        PCGameRuleUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case GameRuleUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        PCGameRuleUI1.prototype.initListener = function (mediator) {
            var _this = this;
            // tap事件
            this.registerEvent(this.btnLast, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.imgLast.visible = true;
            }, this);
            this.registerEvent(this.btnLast, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.imgLast.visible = false;
            }, this);
            this.registerEvent(this.btnLast, egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.imgLast.visible = false;
            }, this);
            this.registerEvent(this.btnLast, egret.TouchEvent.TOUCH_END, function () {
                _this.imgLast.visible = false;
            }, this);
            this.registerEvent(this.btnNext, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.imgNext.visible = true;
            }, this);
            this.registerEvent(this.btnNext, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.imgNext.visible = false;
            }, this);
            this.registerEvent(this.btnNext, egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.imgNext.visible = false;
            }, this);
            this.registerEvent(this.btnNext, egret.TouchEvent.TOUCH_END, function () {
                _this.imgNext.visible = false;
            }, this);
            this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, function () {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                game.MediatorManager.closeMediator(game.Mediators.Mediator_GameRule.name);
            }, this);
            this.registerEvent(this.btnLast, egret.TouchEvent.TOUCH_TAP, this.lastFun, this);
            this.registerEvent(this.btnNext, egret.TouchEvent.TOUCH_TAP, this.nextFun, this);
        };
        /**初始化类型*/
        PCGameRuleUI1.prototype.initType = function () {
            this.gameType = "Bac";
            this.btnBac.touchEnabled = false;
            this.btnRou.touchEnabled = false;
            this.btnSic.touchEnabled = false;
            this.btnTau.touchEnabled = false;
            this["btn" + this.gameType].touchEnabled = true;
            this["btn" + this.gameType].setState = "down";
            this["groupRule" + this.gameType] = true;
        };
        /**初始化按钮*/
        PCGameRuleUI1.prototype.initBtn = function () {
            this.btnLast.setState = "disabled";
            this.btnLast.touchEnabled = false;
            this.btnNext.touchEnabled = true;
            this.btnNext.setState = "up";
            this.imgNow.x = 549;
        };
        /**上一页*/
        PCGameRuleUI1.prototype.lastFun = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.imgLast.visible = false;
            this.pageNum--;
            if (this.pageNum == 1) {
                this.btnLast.setState = "disabled";
                this.btnLast.touchEnabled = false;
                this.btnNext.touchEnabled = true;
                this.btnNext.setState = "up";
            }
            else {
                this.btnLast.touchEnabled = true;
                this.btnNext.touchEnabled = true;
                this.btnLast.setState = "up";
                this.btnNext.setState = "up";
            }
            var str = "group" + this.gameType + this.pageNum;
            var str1 = "group" + this.gameType + (this.pageNum + 1);
            this[str].visible = true;
            this[str1].visible = false;
            this.imgNow.x = 549 + (this.pageNum - 1) * 38;
        };
        /**下一页*/
        PCGameRuleUI1.prototype.nextFun = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.imgNext.visible = false;
            this.pageNum++;
            if (this.pageNum == 6) {
                this.btnLast.touchEnabled = true;
                this.btnLast.setState = "up";
                this.btnNext.setState = "disabled";
                this.btnNext.touchEnabled = false;
            }
            else {
                this.btnLast.touchEnabled = true;
                this.btnNext.touchEnabled = true;
                this.btnLast.setState = "up";
                this.btnNext.setState = "up";
            }
            var str = "group" + this.gameType + this.pageNum;
            var str1 = "group" + this.gameType + (this.pageNum - 1);
            this[str].visible = true;
            this[str1].visible = false;
            this.imgNow.x = 549 + (this.pageNum - 1) * 38;
        };
        // ---------------------------------- dispose ----------------------------------
        PCGameRuleUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCGameRuleUI1;
    }(game.GameRuleBaseUI));
    game.PCGameRuleUI1 = PCGameRuleUI1;
    __reflect(PCGameRuleUI1.prototype, "game.PCGameRuleUI1");
})(game || (game = {}));
//# sourceMappingURL=PCGameRuleUI1.js.map