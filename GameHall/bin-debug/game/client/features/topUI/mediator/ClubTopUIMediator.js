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
    var ClubTopUIMediator = (function (_super) {
        __extends(ClubTopUIMediator, _super);
        function ClubTopUIMediator() {
            return _super.call(this) || this;
        }
        /**
         * 子类需要重写
         * */
        ClubTopUIMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_ClubTopUI_Show,
                game.NotifyConst.Notify_ClubTopUI_Hidden,
                game.NotifyConst.Notify_ClubTopUI_TitleName,
                game.NotifyConst.Notify_ClubTopUI_BackMediator
            ];
        };
        /**
        * 子类需要重写
        * */
        ClubTopUIMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_ClubTopUI_Show:
                    if (!body) {
                        this._mediator = null;
                        this._callBack = null;
                        this._this = null;
                    }
                    ClubTopUIMediator.UIVisible = true;
                    this.notifyUI(ClubTopUICommands.ClubTopUINotify_Show);
                    break;
                case game.NotifyConst.Notify_ClubTopUI_Hidden:
                    if (!body) {
                        this._mediator = null;
                        this._callBack = null;
                        this._this = null;
                    }
                    ClubTopUIMediator.UIVisible = false;
                    this.notifyUI(ClubTopUICommands.ClubTopUINotify_Hidden);
                    break;
                case game.NotifyConst.Notify_ClubTopUI_TitleName:
                    this.notifyUI(ClubTopUICommands.ClubTopUINotify_TitleName, body);
                    break;
                case game.NotifyConst.Notify_ClubTopUI_BackMediator:
                    this._mediator = body.mediator;
                    if (body.callBack && body.this) {
                        this._callBack = body.callBack;
                        this._this = body.this;
                    }
                    else {
                        this._callBack = null;
                        this._this = null;
                    }
                    break;
            }
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        ClubTopUIMediator.prototype.initUI = function () {
            this.ui = new game.ClubTopUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ClubTopUI.layer);
        };
        /** 开始处理数据 */
        ClubTopUIMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_ClubTopUI.name, this);
            this.notifyUI(ClubTopUICommands.ClubTopUINotify_initListener);
            this.notifyUI(ClubTopUICommands.ClubTopUINotify_MediatorThis, this);
        };
        /** 点击打开mediator */
        ClubTopUIMediator.prototype.touchTap = function () {
            if (this._callBack && this._this) {
                this._callBack.bind(this._this)();
            }
            else if (this._mediator) {
                game.MediatorManager.openMediator(this._mediator);
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        ClubTopUIMediator.prototype.dispose = function () {
            this._mediator = null;
            this._callBack = null;
            this._this = null;
            ClubTopUIMediator.UIVisible = false;
            this.removeRegister(game.Mediators.Mediator_ClubTopUI.name);
            _super.prototype.dispose.call(this);
        };
        ClubTopUIMediator.UIVisible = false;
        return ClubTopUIMediator;
    }(game.BaseMediator));
    game.ClubTopUIMediator = ClubTopUIMediator;
    __reflect(ClubTopUIMediator.prototype, "game.ClubTopUIMediator");
})(game || (game = {}));
//# sourceMappingURL=ClubTopUIMediator.js.map