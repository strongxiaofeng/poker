/**mediator命令*/
enum roomManagerCommands
{
    /**事件监听*/
    initListener,
    /** 数据有更新 */
    Notify_setting,
    /** 更新房间名数组 */
    Notify_clubRoomArr,
    /** 更新房间状态 */
    roomStage,
    /** 更新房间路数 */
    updateRoadMap,
    /** 房卡数量 */
    roomCardNum,
    /** 更新人数等 */
    Notify_info
}