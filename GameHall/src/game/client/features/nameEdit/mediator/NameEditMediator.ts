module game {

    export class NameEditMediator extends BaseMediator {

        public constructor() {
            super();
        }

        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        protected initUI(): void {
            var currentUI: any;
            // if (GlobalConfig.isMobile) {
            currentUI = egret.getDefinitionByName("game.NameEditUI" + GlobalConfig.multiSkinType);
            // } else {
            // 	currentUI = egret.getDefinitionByName("game.PCNameEditUI" + GlobalConfig.multiSkinType);
            // }
            this.ui = new currentUI(this.data);
            UIManager.OpenUI(this.ui, Mediators.Mediator_NameEdit.layer);
        }

        /**分发游戏数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_NameEdit.name, this);
            this.notifyUI(NameEditUICommands.initListener, this);
        }

        /** 修改俱乐部名称 */
        public static Type_Club: string = "Type_Club";
        /** 修改用户昵称 */
        public static Type_User: string = "Type_User";

        /**关闭 */
        public dispose() {
            this.removeRegister(Mediators.Mediator_NameEdit.name);
            super.dispose();
        }
    }
}