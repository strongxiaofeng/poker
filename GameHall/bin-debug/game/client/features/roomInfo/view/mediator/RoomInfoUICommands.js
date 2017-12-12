/** 导航Mediator的ui指令 */
var RoomInfoUICommands;
(function (RoomInfoUICommands) {
    /** 初始化事件监听器 */
    RoomInfoUICommands[RoomInfoUICommands["initListener"] = 0] = "initListener";
    /** 显示房间名与荷官信息 */
    RoomInfoUICommands[RoomInfoUICommands["setRoomInfo"] = 1] = "setRoomInfo";
    /** 设置房间限额信息 */
    RoomInfoUICommands[RoomInfoUICommands["setLimitInfo"] = 2] = "setLimitInfo";
    /** 设置局数信息 */
    RoomInfoUICommands[RoomInfoUICommands["setRoundInfo"] = 3] = "setRoundInfo";
    /** 设置开局走势图 */
    RoomInfoUICommands[RoomInfoUICommands["setPolyline"] = 4] = "setPolyline";
})(RoomInfoUICommands || (RoomInfoUICommands = {}));
//# sourceMappingURL=RoomInfoUICommands.js.map