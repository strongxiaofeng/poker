/** PC menu Mediator的ui指令 */
var MenuUICommands;
(function (MenuUICommands) {
    /** 初始化事件监听器 */
    MenuUICommands[MenuUICommands["initListener"] = 0] = "initListener";
    /** 设置可见 */
    MenuUICommands[MenuUICommands["setVisible"] = 1] = "setVisible";
    /** 添加UI */
    MenuUICommands[MenuUICommands["addUI"] = 2] = "addUI";
    /** 平移动画 */
    MenuUICommands[MenuUICommands["tweenUI"] = 3] = "tweenUI";
    /** 关闭动画 */
    MenuUICommands[MenuUICommands["closeUI"] = 4] = "closeUI";
})(MenuUICommands || (MenuUICommands = {}));
//# sourceMappingURL=MenuUICommands.js.map