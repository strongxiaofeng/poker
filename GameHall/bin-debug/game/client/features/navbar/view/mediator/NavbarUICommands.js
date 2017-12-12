/** 导航Mediator的ui指令 */
var NavbarUICommands;
(function (NavbarUICommands) {
    /** 初始化事件监听器 */
    NavbarUICommands[NavbarUICommands["initListener"] = 0] = "initListener";
    /** 切换导航条与assistiveTouch true - assistive | false - 导航栏 */
    NavbarUICommands[NavbarUICommands["setAssistiveTouch"] = 1] = "setAssistiveTouch";
    /** 切换底部条按钮状态 mine 是 我的的按钮 home 是 首页的按钮 club 是 俱乐部的按钮*/
    NavbarUICommands[NavbarUICommands["setChoosedBtn"] = 2] = "setChoosedBtn";
    /**显示红点 */
    NavbarUICommands[NavbarUICommands["showNewsDot"] = 3] = "showNewsDot";
    /** 进入 俱乐部/首页/我的界面切换样式 */
    NavbarUICommands[NavbarUICommands["setNavbar"] = 4] = "setNavbar";
})(NavbarUICommands || (NavbarUICommands = {}));
//# sourceMappingURL=NavbarUICommands.js.map