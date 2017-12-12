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
    var MultiLanguageMediator = (function (_super) {
        __extends(MultiLanguageMediator, _super);
        function MultiLanguageMediator() {
            return _super.call(this) || this;
        }
        /**初始化 房间内的数据对象 */
        MultiLanguageMediator.prototype.initClientData = function () {
            this.mulArr = [];
            this.selectedMultilingual = game.LanguageUtil.local;
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        MultiLanguageMediator.prototype.initUI = function () {
            if (game.GlobalConfig.isMobile) {
                this.ui = new game.MultiLanguageUI1();
            }
            else {
                this.ui = new game.PcMultiLanguageUI1();
            }
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_MultiLanguage.layer);
        };
        /** 开始处理数据 */
        MultiLanguageMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_MultiLanguage.name, this);
            if (game.GlobalConfig.isMobile) {
                this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
                if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_ClubTopUI.name)) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_ClubTopUI);
                }
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, "语言设置");
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, {
                    mediator: "",
                    callBack: this.callBack,
                    this: this,
                });
            }
            this.notifyUI(MultiLanguageCommands.initListener, this);
            this.showList();
        };
        /**
         * 子类需要重写
         * */
        MultiLanguageMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_PCMultiLanguage_Selected,
            ];
        };
        /**
         * 子类需要重写
         * */
        MultiLanguageMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_PCMultiLanguage_Selected:
                    this.multilingualSelect(body);
                    break;
            }
        };
        /** 显示列表*/
        MultiLanguageMediator.prototype.showList = function () {
            // this.mulArr = LanguageUtil.languageTypes;
            this.mulArr = ["zh_hk", "zh_cn", "en_us"];
            this.notifyUI(MultiLanguageCommands.showList, this.mulArr);
            // this.notifyUI(MultiLanguageCommands.mulSelected, this.selectedMultilingual);
        };
        /** 选择了多语言*/
        MultiLanguageMediator.prototype.multilingualSelect = function (str) {
            if (str != this.selectedMultilingual) {
                this.selectedMultilingual = str;
                /** 通知UI选择了多语言*/
                this.notifyUI(MultiLanguageCommands.mulSelected, str);
                this.notifyUI(MultiLanguageCommands.confirmBtnAble);
            }
        };
        /** 点击返回的回调*/
        MultiLanguageMediator.prototype.callBack = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_SystemSet, this.data);
        };
        /** 点击确定按钮*/
        MultiLanguageMediator.prototype.touchConfirmBtn = function () {
            /** 点击确定 发送通知修改多语言*/
            var msgData = new game.TipMsgInfo();
            msgData.msg = [{ text: "是否立即切换语言（需要重新登录）？", textColor: enums.ColorConst.Golden }];
            msgData.cancelText = "取消";
            msgData.confirmText = "确定";
            msgData.comfirmCallBack = this.confirmBack;
            msgData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, msgData);
        };
        /** 确定修改语言的回调*/
        MultiLanguageMediator.prototype.confirmBack = function () {
            /** 切换语言，重新登录*/
            game.GameController.getInstance().setUrlLang(this.selectedMultilingual);
        };
        /** 点击取消*/
        MultiLanguageMediator.prototype.touchCancel = function () {
            /** 点击取消的骚操作*/
            game.MediatorManager.closeMediator(game.Mediators.Mediator_MultiLanguage.name);
        };
        /** 关闭mediator, 要清除他的ui和数据,不再接受通知*/
        MultiLanguageMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_MultiLanguage.name);
        };
        return MultiLanguageMediator;
    }(game.BaseMediator));
    game.MultiLanguageMediator = MultiLanguageMediator;
    __reflect(MultiLanguageMediator.prototype, "game.MultiLanguageMediator");
})(game || (game = {}));
//# sourceMappingURL=MultiLanguageMediator.js.map