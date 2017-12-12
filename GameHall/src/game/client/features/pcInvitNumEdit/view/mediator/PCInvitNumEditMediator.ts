module game {

    export class PCInvitNumEditMediator extends BaseMediator {

        public constructor() {
            super();
        }

        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        protected initUI(): void {
            var currentUI: any;
            currentUI = egret.getDefinitionByName("game.PCInvitNumEditUI" + GlobalConfig.multiSkinType);
            this.ui = new currentUI(this.data);
            UIManager.OpenUI(this.ui, Mediators.Mediator_PCInvitNumEditMediator.layer);
        }

        /**分发游戏数据 */
        protected initData(): void {
            let info = new MenuInfo();
            info.level = 2;
            info.mediatorClass = Mediators.Mediator_PCInvitNumEditMediator;
            info.ui = this.ui;
            this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);
            
            this.addRegister(Mediators.Mediator_PCInvitNumEditMediator.name, this);
            this.notifyUI(PCMInvitNumEditCommands.initListener, this);
        }
        /**关闭 */
        public dispose() {
            this.removeRegister(Mediators.Mediator_PCInvitNumEditMediator.name);
            super.dispose();
        }
    }
}