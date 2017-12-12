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
    var CreateRoomTypeUI1 = (function (_super) {
        __extends(CreateRoomTypeUI1, _super);
        function CreateRoomTypeUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/createGameType/createRoomTypeSkin.exml";
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        CreateRoomTypeUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
        };
        /** 注册事件*/
        CreateRoomTypeUI1.prototype.initListener = function (mediator) {
            if (mediator === void 0) { mediator = null; }
            this.registerEvent(this.selectList, egret.TouchEvent.TOUCH_TAP, mediator.SelectType, mediator);
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 接收Mediator通知*/
        CreateRoomTypeUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case CreateRoomTypeCommands.initListener:
                    this.initListener(params);
                    break;
                case CreateRoomTypeCommands.updataList:
                    this.updataList(params);
                    break;
                case CreateRoomTypeCommands.updateType:
                    this.updateType(params);
                    break;
                case CreateRoomTypeCommands.showRoomCard:
                    this.showRoomCard(params);
                    break;
            }
        };
        /** 初始化列表*/
        CreateRoomTypeUI1.prototype.initList = function () {
            this.listData = new eui.ArrayCollection();
            this.selectList.dataProvider = this.listData;
            this.selectList.itemRenderer = game.CreateRoomItem;
        };
        /** 初始化top*/
        CreateRoomTypeUI1.prototype.showRoomCard = function (card) {
            this.homeCard.text = game.LanguageUtil.translate("global_lbl_room_card") + (game.NumberUtil.getSplitNumStr(card * 100 || 0));
            var labelWidth = this.homeCard.textWidth;
            this.roomCardImg.right = 115 + labelWidth || 0;
        };
        /** 更新游戏类型*/
        CreateRoomTypeUI1.prototype.updateType = function (type) {
            this.gameType.text = "" + (type || 0);
        };
        /** 更新游戏类型列表*/
        CreateRoomTypeUI1.prototype.updataList = function (data) {
            this.listData.source = data;
            this.listData.refresh();
        };
        /** 清空数据*/
        CreateRoomTypeUI1.prototype.disposeData = function () {
            this.listData = null;
        };
        CreateRoomTypeUI1.prototype.dispose = function () {
            this.disposeData();
            this.selectList.dataProvider = null;
            // this.selectList.dispose();
            this.selectList = null;
            _super.prototype.dispose.call(this);
        };
        return CreateRoomTypeUI1;
    }(game.CreateRoomTypeBaseUI));
    game.CreateRoomTypeUI1 = CreateRoomTypeUI1;
    __reflect(CreateRoomTypeUI1.prototype, "game.CreateRoomTypeUI1");
})(game || (game = {}));
//# sourceMappingURL=CreateRoomTypeUI.js.map