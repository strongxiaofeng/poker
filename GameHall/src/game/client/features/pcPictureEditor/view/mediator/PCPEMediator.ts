module game{
    export class PCPEMediator extends BaseMediator
    {
        public constructor()
        {
            super();
        }
        /**初始化数据*/
        protected initClientData(): void
        {

        }
        /**初始化UI*/
        protected initUI():void
        {
            var currentUI: any;
			currentUI = egret.getDefinitionByName("game.PCPEBaseUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_PCPEMediator.layer);
        }
        /**初始化数据*/
        protected initData():void
        {
            let info = new MenuInfo();
            info.level = 2;
            info.mediatorClass = Mediators.Mediator_PCPEMediator;
            info.ui = this.ui;
            this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);
            
            this.addRegister(Mediators.Mediator_PCPEMediator.name, this);
            this.notifyUI(PCPECommands.initListener,this);
        }
        /** 修改俱乐部头像 */
        public static Type_ClubPicture: string = "Type_ClubPicture";
        /** 修改用户头像 */
        public static Type_UserPicture: string = "Type_UserPicture";
// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.removeRegister(Mediators.Mediator_PCPEMediator.name);
			super.dispose();
		}
    }
}