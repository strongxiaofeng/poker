var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var topic;
(function (topic) {
    var UpdateRooms = (function () {
        function UpdateRooms() {
            this.action = "create";
            this.create = new UpdateRoomsCreate();
        }
        return UpdateRooms;
    }());
    topic.UpdateRooms = UpdateRooms;
    __reflect(UpdateRooms.prototype, "topic.UpdateRooms");
    var UpdateRoomsCreate = (function () {
        function UpdateRoomsCreate() {
        }
        return UpdateRoomsCreate;
    }());
    topic.UpdateRoomsCreate = UpdateRoomsCreate;
    __reflect(UpdateRoomsCreate.prototype, "topic.UpdateRoomsCreate");
    var UpdateRoomsCreateNormal = (function () {
        function UpdateRoomsCreateNormal() {
        }
        return UpdateRoomsCreateNormal;
    }());
    topic.UpdateRoomsCreateNormal = UpdateRoomsCreateNormal;
    __reflect(UpdateRoomsCreateNormal.prototype, "topic.UpdateRoomsCreateNormal");
    var RoomPreference = (function () {
        function RoomPreference() {
        }
        return RoomPreference;
    }());
    topic.RoomPreference = RoomPreference;
    __reflect(RoomPreference.prototype, "topic.RoomPreference");
    var RoomLimit = (function () {
        function RoomLimit() {
        }
        return RoomLimit;
    }());
    topic.RoomLimit = RoomLimit;
    __reflect(RoomLimit.prototype, "topic.RoomLimit");
    var BaccratRoomLimit = (function () {
        function BaccratRoomLimit() {
        }
        return BaccratRoomLimit;
    }());
    topic.BaccratRoomLimit = BaccratRoomLimit;
    __reflect(BaccratRoomLimit.prototype, "topic.BaccratRoomLimit");
})(topic || (topic = {}));
//# sourceMappingURL=UpdateRooms.js.map