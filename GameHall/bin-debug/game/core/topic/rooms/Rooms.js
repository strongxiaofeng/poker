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
var topic;
(function (topic) {
    var Rooms = (function (_super) {
        __extends(Rooms, _super);
        function Rooms() {
            return _super.call(this) || this;
        }
        return Rooms;
    }(topic.BaseResponse));
    topic.Rooms = Rooms;
    __reflect(Rooms.prototype, "topic.Rooms");
    var RoomsSnapshot = (function () {
        function RoomsSnapshot() {
        }
        return RoomsSnapshot;
    }());
    topic.RoomsSnapshot = RoomsSnapshot;
    __reflect(RoomsSnapshot.prototype, "topic.RoomsSnapshot");
    var Room = (function () {
        function Room() {
        }
        return Room;
    }());
    topic.Room = Room;
    __reflect(Room.prototype, "topic.Room");
})(topic || (topic = {}));
//# sourceMappingURL=Rooms.js.map