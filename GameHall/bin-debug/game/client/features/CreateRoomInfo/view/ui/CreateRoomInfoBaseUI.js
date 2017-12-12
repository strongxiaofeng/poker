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
    var CreateRoomInfoBaseUI = (function (_super) {
        __extends(CreateRoomInfoBaseUI, _super);
        function CreateRoomInfoBaseUI() {
            return _super.call(this) || this;
        }
        /**组件创建完成初始化数据等操作 */
        CreateRoomInfoBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        /** 接收Mediator通知*/
        CreateRoomInfoBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case CreateRoomInfoCommands.initListener:
                    this.initListener(params);
                    break;
                case CreateRoomInfoCommands.initUI:
                    this.initUI();
                    break;
                case CreateRoomInfoCommands.videoSource:
                    if (params)
                        this.videoSource.text = params;
                    break;
                case CreateRoomInfoCommands.showRoomCard:
                    this.updateTop(params);
                    break;
            }
        };
        /** 注册事件*/
        CreateRoomInfoBaseUI.prototype.initListener = function (params) {
        };
        /** 初始化组件*/
        CreateRoomInfoBaseUI.prototype.initUI = function () {
            this.tipMsgGroup.alpha = 0.01;
            this.tipMsgGroup.visible = false;
        };
        /** 更新top*/
        CreateRoomInfoBaseUI.prototype.updateTop = function (card) {
            this.homeCard.text = game.LanguageUtil.translate("global_lbl_room_card") + (game.NumberUtil.getSplitNumStr(card * 100 || 0));
            var labelWidth = this.homeCard.textWidth;
            this.roomCardImg.right = 90 + labelWidth || 0;
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        CreateRoomInfoBaseUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return CreateRoomInfoBaseUI;
    }(game.BaseUI));
    game.CreateRoomInfoBaseUI = CreateRoomInfoBaseUI;
    __reflect(CreateRoomInfoBaseUI.prototype, "game.CreateRoomInfoBaseUI");
})(game || (game = {}));
//# sourceMappingURL=CreateRoomInfoBaseUI.js.map