module game{
    export class PersonalInformationMediator extends BaseMediator
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
			currentUI = egret.getDefinitionByName("game.PersonalInformationUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_PersonalInformation.layer);
        }
        /**初始化数据*/
        protected initData():void
        {
            this.addRegister(Mediators.Mediator_PersonalInformation.name, this);
            this.notifyUI(PersonalInformationCommands.initListener,this);
            this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
            this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName,LanguageUtil.translate('mine_lbl_user_info'));
            this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator,{mediator:Mediators.Mediator_Mine});

        }
        /** 注册通知 */
		public listNotification():Array<string> {
			return [
				NotifyConst.Notify_PlayerInfo,
			];
		}
		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_PlayerInfo:
                    this.notifyUI(PersonalInformationCommands.updateTextrue,this)
					break;
			}
		}
        /** 无法进入俱乐部弹框的确定返回*/
		private confirmBack(): void {
            MediatorManager.openMediator(Mediators.Mediator_ClubHome);
		}
        /*跳转到修改昵称*/
        public goModifyNicknameFun(): void {
            MediatorManager.openMediator(Mediators.Mediator_NameEdit, NameEditMediator.Type_User);
        }
        /*跳转到图片编辑*/
        public goPictureEditorFun():void{
            MediatorManager.openMediator(Mediators.Mediator_PictureEditor,PictureEditorMediator.Type_UserPicture);
        }
// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.removeRegister(Mediators.Mediator_PersonalInformation.name);
			super.dispose();
		}
    }
}