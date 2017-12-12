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
    var roomManagerBaseUI = (function (_super) {
        __extends(roomManagerBaseUI, _super);
        function roomManagerBaseUI() {
            return _super.call(this) || this;
        }
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        roomManagerBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        roomManagerBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case roomManagerCommands.initListener:
                    this.initListener(params);
                    break;
                case roomManagerCommands.Notify_clubRoomArr:
                    this.chooseRoomName();
                    break;
            }
        };
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        roomManagerBaseUI.prototype.initListener = function (mediator) {
        };
        /**筛选房间名*/
        roomManagerBaseUI.prototype.chooseRoomName = function () {
        };
        /**
         * 当舞台尺寸发生变化
         */
        roomManagerBaseUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
        };
        return roomManagerBaseUI;
    }(game.BaseUI));
    game.roomManagerBaseUI = roomManagerBaseUI;
    __reflect(roomManagerBaseUI.prototype, "game.roomManagerBaseUI");
})(game || (game = {}));
//# sourceMappingURL=roomManagerBaseUI.js.map