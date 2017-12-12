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
    var SystemSettingMediator = (function (_super) {
        __extends(SystemSettingMediator, _super);
        function SystemSettingMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        SystemSettingMediator.prototype.initClientData = function () {
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        SystemSettingMediator.prototype.initUI = function () {
            this.ui = new game.SystemUI1(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_SystemSet.layer);
        };
        /** 开始处理数据 */
        SystemSettingMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_SystemSet.name, this);
            this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_ClubTopUI.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubTopUI);
            }
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, game.LanguageUtil.translate("mine_btn_system_set"));
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, {
                mediator: "",
                callBack: this.callBack, this: this
            });
            this.notifyUI(SystemSettingCommands.initListener, this);
            this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
        };
        /**
         * 子类需要重写
         * */
        SystemSettingMediator.prototype.listNotification = function () {
            return [];
        };
        /**
         * 子类需要重写
         * */
        SystemSettingMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        /** 点击返回的回调*/
        SystemSettingMediator.prototype.callBack = function () {
            if (this.data == "inGame") {
                this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, false);
            }
            else {
                this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, true);
                this.sendNotification(game.NotifyConst.Notify_HideAssistiveTouch, "mine");
            }
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_SystemSet.name);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_MultiLanguage.name);
        };
        /** 关闭mediator, 要清除他的ui和数据,不再接受通知*/
        SystemSettingMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_SystemSet.name);
            _super.prototype.dispose.call(this);
            this.sendNotification(game.NotifyConst.Notify_HideAssistiveTouch);
        };
        /** 是否开启语音*/
        SystemSettingMediator.isOpenVoice = true;
        /** 是否开启背景音乐*/
        SystemSettingMediator.isOpenMusic = true;
        /** 是否开启公告*/
        SystemSettingMediator.isOpenNotice = true;
        /** 是否开启震动*/
        SystemSettingMediator.isOpenShook = true;
        /** 是否开启音效*/
        SystemSettingMediator.isOpenSound = true;
        return SystemSettingMediator;
    }(game.BaseMediator));
    game.SystemSettingMediator = SystemSettingMediator;
    __reflect(SystemSettingMediator.prototype, "game.SystemSettingMediator");
})(game || (game = {}));
//# sourceMappingURL=systemSettingMediator.js.map