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
    var CreateRoomTypeMediator = (function (_super) {
        __extends(CreateRoomTypeMediator, _super);
        function CreateRoomTypeMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**初始化 房间内的数据对象 */
        CreateRoomTypeMediator.prototype.initClientData = function () {
        };
        /** 初始化皮肤*/
        CreateRoomTypeMediator.prototype.initUI = function () {
            var cruntUI;
            cruntUI = egret.getDefinitionByName("game.CreateRoomTypeUI" + game.GlobalConfig.multiSkinType);
            this.ui = new cruntUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_CreateRoomType.layer);
        };
        /** 分发数据 */
        CreateRoomTypeMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_CreateRoomType.name, this);
            this.notifyUI(CreateRoomTypeCommands.initListener, this);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, game.LanguageUtil.translate("founder_lbl_select_game_type"));
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
            this.showItem();
            this.showRoomCard();
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        CreateRoomTypeMediator.prototype.listNotification = function () {
            return [];
        };
        /** 接收通知 */
        CreateRoomTypeMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
            }
        };
        // ---------------------------------- 用户操作 ----------------------------------
        /** 选择游戏类型*/
        CreateRoomTypeMediator.prototype.SelectType = function (e) {
            // MediatorManager.openMediator(Mediators.Mediator_CreateRoomInfo, this);
        };
        CreateRoomTypeMediator.prototype.showItem = function () {
            var type = ["baccarat", "roulette"];
            this.notifyUI(CreateRoomTypeCommands.updataList, type);
        };
        // ---------------------------------- 更新 ----------------------------------
        /** 更新类型*/
        CreateRoomTypeMediator.prototype.updateType = function () {
            // let model = ClubModel.getInstance().
        };
        /** 显示房卡*/
        CreateRoomTypeMediator.prototype.showRoomCard = function () {
            var card = game.ClubModel.getInstance().getRoomCardNum();
            this.notifyUI(CreateRoomTypeCommands.showRoomCard, card);
        };
        // ---------------------------------- dispose ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        CreateRoomTypeMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_CreateRoomType.name);
        };
        return CreateRoomTypeMediator;
    }(game.BaseMediator));
    game.CreateRoomTypeMediator = CreateRoomTypeMediator;
    __reflect(CreateRoomTypeMediator.prototype, "game.CreateRoomTypeMediator");
})(game || (game = {}));
//# sourceMappingURL=CreateRoomTypeMediator.js.map