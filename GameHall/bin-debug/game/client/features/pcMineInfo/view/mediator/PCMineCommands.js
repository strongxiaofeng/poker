/**Mediator的ui命令*/
var PCMineCommands;
(function (PCMineCommands) {
    /** 初始化事件监听器 */
    PCMineCommands[PCMineCommands["initListener"] = 0] = "initListener";
    /**更新头像*/
    PCMineCommands[PCMineCommands["updateTextrue"] = 1] = "updateTextrue";
    /**更新俱乐部信息*/
    PCMineCommands[PCMineCommands["clubUpdateSuccess"] = 2] = "clubUpdateSuccess";
    /** 更新加入的俱乐部个数 */
    PCMineCommands[PCMineCommands["setJoinedClubNum"] = 3] = "setJoinedClubNum";
    /**邀请码*/
    PCMineCommands[PCMineCommands["changeEditBtn"] = 4] = "changeEditBtn";
    /**编辑图片*/
    PCMineCommands[PCMineCommands["changeChooseC"] = 5] = "changeChooseC";
    /**退出俱乐部*/
    PCMineCommands[PCMineCommands["changeBack"] = 6] = "changeBack";
})(PCMineCommands || (PCMineCommands = {}));
//# sourceMappingURL=PCMineCommands.js.map