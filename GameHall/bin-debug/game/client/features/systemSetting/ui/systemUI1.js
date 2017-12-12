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
    var SystemUI1 = (function (_super) {
        __extends(SystemUI1, _super);
        function SystemUI1(data) {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "systemSetting/systemSettingSkin.exml";
            _this.data = data;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        SystemUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
            this.showBtnSet();
            this.languageIcnSet();
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        SystemUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case SystemSettingCommands.initListener:
                    this.initListeners(params);
                    break;
            }
        };
        /**注册事件 手动调用*/
        SystemUI1.prototype.initListeners = function (mediator) {
            this.registerEvent(this.languageBtn, egret.TouchEvent.TOUCH_TAP, this.touchLanguageBtn, this);
            this.registerEvent(this.languageBtn, egret.TouchEvent.TOUCH_BEGIN, this.touchLanguageBtn, this);
            this.registerEvent(this.languageBtn, egret.TouchEvent.TOUCH_END, this.touchLanguageBtn, this);
            this.registerEvent(this.languageBtn, egret.TouchEvent.TOUCH_TAP, this.touchLanguageBtn, this);
            this.registerEvent(this.isOpenVoice, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
            this.registerEvent(this.isOpenMusic, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
            this.registerEvent(this.isOpenNotice, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
            this.registerEvent(this.isOpenShook, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
            this.registerEvent(this.isOpenSound, egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
        };
        /** 初始化list*/
        SystemUI1.prototype.initList = function () {
        };
        /** 多语言图标设置 */
        SystemUI1.prototype.languageIcnSet = function () {
            var languageType = game.LanguageUtil.local;
            var languageArr = game.LanguageUtil.languageTypes;
            switch (languageType) {
                case languageArr[7]:
                    this.languageIcn.source = "flag_pic_cn_png";
                    break;
                case languageArr[8]:
                    this.languageIcn.source = "flag_pic_hk_png";
                    break;
                case languageArr[0]:
                    this.languageIcn.source = "flag_pic_gb_png";
                    break;
            }
        };
        /** 点击多语言按钮*/
        SystemUI1.prototype.touchLanguageBtn = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_TAP:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_MultiLanguage, this.data);
                    break;
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.langBg.visible = true;
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.langBg.visible = false;
                    break;
            }
        };
        /** 点击按钮*/
        SystemUI1.prototype.touchBtn = function (e) {
            var state = "";
            switch (e.target) {
                case this.isOpenVoice:
                    state = this.isOpenVoice.currentState;
                    this.isOpenVoice.currentState = state == "up" ? "down" : "up";
                    game.SystemSettingMediator.isOpenVoice = state == "up";
                    game.SoundPlayerNew.setSoundOpen(game.SystemSettingMediator.isOpenVoice);
                    break;
                case this.isOpenMusic:
                    state = this.isOpenMusic.currentState;
                    this.isOpenMusic.currentState = state == "up" ? "down" : "up";
                    game.SystemSettingMediator.isOpenMusic = state == "up";
                    game.SoundPlayerNew.setMusicOpen(game.SystemSettingMediator.isOpenMusic);
                    break;
                case this.isOpenNotice:
                    state = this.isOpenNotice.currentState;
                    this.isOpenNotice.currentState = state == "up" ? "down" : "up";
                    game.SystemSettingMediator.isOpenNotice = state == "up";
                    break;
                case this.isOpenShook:
                    state = this.isOpenShook.currentState;
                    this.isOpenShook.currentState = state == "up" ? "down" : "up";
                    game.SystemSettingMediator.isOpenShook = state == "up";
                    break;
                case this.isOpenSound:
                    state = this.isOpenSound.currentState;
                    this.isOpenSound.currentState = state == "up" ? "down" : "up";
                    game.SystemSettingMediator.isOpenSound = state == "up";
                    break;
            }
        };
        /** 点击语音按钮*/
        SystemUI1.prototype.touchVoiceBtn = function () {
            var state = this.isOpenVoice.currentState;
            this.isOpenVoice.currentState = state == "up" ? "down" : "up";
            game.SystemSettingMediator.isOpenVoice = state == "up";
        };
        /** 点击背景音乐按钮*/
        SystemUI1.prototype.touchMusicBtn = function () {
            var state = this.isOpenMusic.currentState;
            this.isOpenMusic.currentState = state == "up" ? "down" : "up";
            game.SystemSettingMediator.isOpenMusic = state == "up";
        };
        /** 点击公告按钮*/
        SystemUI1.prototype.touchnoticeBtn = function () {
            var state = this.isOpenNotice.currentState;
            this.isOpenNotice.currentState = state == "up" ? "down" : "up";
            game.SystemSettingMediator.isOpenNotice = state == "up";
        };
        /** 点击震动按钮*/
        SystemUI1.prototype.touchshookBtn = function () {
            var state = this.isOpenShook.currentState;
            this.isOpenShook.currentState = state == "up" ? "down" : "up";
            game.SystemSettingMediator.isOpenShook = state == "up";
        };
        /** 点击音效按钮*/
        SystemUI1.prototype.touchsoundBtn = function () {
            var state = this.isOpenSound.currentState;
            this.isOpenSound.currentState = state == "up" ? "down" : "up";
            game.SystemSettingMediator.isOpenSound = state == "up";
        };
        /** 显示设置*/
        SystemUI1.prototype.showBtnSet = function () {
            this.isOpenVoice.currentState = game.SystemSettingMediator.isOpenVoice ? "down" : "up";
            this.isOpenMusic.currentState = game.SystemSettingMediator.isOpenMusic ? "down" : "up";
            this.isOpenNotice.currentState = game.SystemSettingMediator.isOpenNotice ? "down" : "up";
            this.isOpenShook.currentState = game.SystemSettingMediator.isOpenShook ? "down" : "up";
            this.isOpenSound.currentState = game.SystemSettingMediator.isOpenSound ? "down" : "up";
        };
        // ---------------------------------- dispose ----------------------------------
        SystemUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return SystemUI1;
    }(game.BaseUI));
    game.SystemUI1 = SystemUI1;
    __reflect(SystemUI1.prototype, "game.SystemUI1");
})(game || (game = {}));
//# sourceMappingURL=systemUI1.js.map