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
    var PCRoomInfoUI1 = (function (_super) {
        __extends(PCRoomInfoUI1, _super);
        function PCRoomInfoUI1(data) {
            var _this = _super.call(this, data) || this;
            _this.data = data;
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        PCRoomInfoUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        // ---------------------------------- dispose ----------------------------------
        PCRoomInfoUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCRoomInfoUI1;
    }(game.RoomInfoBaseUI));
    game.PCRoomInfoUI1 = PCRoomInfoUI1;
    __reflect(PCRoomInfoUI1.prototype, "game.PCRoomInfoUI1");
})(game || (game = {}));
//# sourceMappingURL=PCRoomInfoUI1.js.map