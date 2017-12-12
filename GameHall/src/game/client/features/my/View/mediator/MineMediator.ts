module game{
    export class MineMediator extends BaseMediator
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
			currentUI = egret.getDefinitionByName("game.MineUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_Mine.layer);
        }
        /**初始化数据*/
        protected initData():void
        {
            this.addRegister(Mediators.Mediator_Mine.name, this);
            this.notifyUI(MineCommands.initListener,this);
            this.sendNotification(NotifyConst.Notify_ClubTopUI_Hidden);
            this.sendNotification(NotifyConst.Notify_SwitchNavbar, true);
            this.sendNotification(NotifyConst.Notify_HideAssistiveTouch, "mine");
        }
        /**
         * 子类需要重写
         * */
		public listNotification(): Array<string> {
			return [
                NotifyConst.Notify_Update_ChatList,
				NotifyConst.Notify_Update_SysLast,
                NotifyConst.Notify_Update_AnnounceLast,
			];
		}
        /**
         * 子类需要重写
         * */
		public handleNotification(type: string, body: any): void 
        {
			switch (type) 
            {
                case NotifyConst.Notify_Update_ChatList:
                case NotifyConst.Notify_Update_SysLast:
                case NotifyConst.Notify_Update_AnnounceLast:
                    this.notifyUI(MineCommands.updateMsgRead);
                    break;
			}
		}
        /** 无法进入俱乐部弹框的确定返回*/
		private confirmBack(): void {
            MediatorManager.openMediator(Mediators.Mediator_ClubHome);
		}
        /**点击个人中心跳转的函数*/
        public goPersonalCenterFun():void{
            MediatorManager.openMediator(Mediators.Mediator_PersonalInformation);
            if(!MediatorManager.isMediatorOpen(Mediators.Mediator_ClubTopUI.name)){
                MediatorManager.openMediator(Mediators.Mediator_ClubTopUI);
                this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
            }
        }
        /**  跳转房主界面*/
        public HomeOwner():void{
            MediatorManager.openMediator(Mediators.Mediator_HomeOwner);
        }

        /**点击消息公共 */
        public onNoticeInfo():void
        {
            MediatorManager.openMediator(Mediators.Mediator_Notify);
        }

        /**点击系统设置 */
        public openSystem():void
        {
            MediatorManager.openMediator(Mediators.Mediator_SystemSet);
        }

// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.removeRegister(Mediators.Mediator_Mine.name);
			super.dispose();
		}
    }
}