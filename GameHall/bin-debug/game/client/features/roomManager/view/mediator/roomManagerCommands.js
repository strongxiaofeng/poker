/**mediator命令*/
var roomManagerCommands;
(function (roomManagerCommands) {
    /**事件监听*/
    roomManagerCommands[roomManagerCommands["initListener"] = 0] = "initListener";
    /** 数据有更新 */
    roomManagerCommands[roomManagerCommands["Notify_setting"] = 1] = "Notify_setting";
    /** 更新房间名数组 */
    roomManagerCommands[roomManagerCommands["Notify_clubRoomArr"] = 2] = "Notify_clubRoomArr";
    /** 更新房间状态 */
    roomManagerCommands[roomManagerCommands["roomStage"] = 3] = "roomStage";
    /** 更新房间路数 */
    roomManagerCommands[roomManagerCommands["updateRoadMap"] = 4] = "updateRoadMap";
    /** 房卡数量 */
    roomManagerCommands[roomManagerCommands["roomCardNum"] = 5] = "roomCardNum";
    /** 更新人数等 */
    roomManagerCommands[roomManagerCommands["Notify_info"] = 6] = "Notify_info";
})(roomManagerCommands || (roomManagerCommands = {}));
//# sourceMappingURL=roomManagerCommands.js.map