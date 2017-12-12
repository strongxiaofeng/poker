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
    var PbBacMediator = (function (_super) {
        __extends(PbBacMediator, _super);
        function PbBacMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        PbBacMediator.prototype.initClientData = function () {
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        PbBacMediator.prototype.initUI = function () {
            this.sendNotification(game.NotifyConst.Show_VideoBack);
            if (game.GlobalConfig.isMobile) {
                this.ui = new game.PbBacUI1(this.data);
            }
            else {
                this.ui = new game.PCPbBacUI1(this.data);
            }
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PbBacMediator.layer);
        };
        /** 分发游戏数据 */
        PbBacMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_PbBacMediator.name, this);
            this.notifyUI(PbBacCommands.initListener, this);
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        PbBacMediator.prototype.listNotification = function () {
            return [];
        };
        /** 接收通知 */
        PbBacMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        // ---------------------------------- dispose ----------------------------------
        PbBacMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PbBacMediator.name);
            _super.prototype.dispose.call(this);
            this.sendNotification(game.NotifyConst.Close_VideoBack);
        };
        return PbBacMediator;
    }(game.BaseMediator));
    game.PbBacMediator = PbBacMediator;
    __reflect(PbBacMediator.prototype, "game.PbBacMediator");
})(game || (game = {}));
//# sourceMappingURL=PbBacMediator.js.map