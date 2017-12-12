module game{
    export class PCMineMediator extends BaseMediator
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
			currentUI = egret.getDefinitionByName("game.PCMineUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_PCMineMediator.layer);
        }
        /**初始化数据*/
        protected initData():void
        {
            let info = new MenuInfo();
            info.level = 1;
            info.mediatorClass = Mediators.Mediator_PCMineMediator;
            info.ui = this.ui;
            this.sendNotification(NotifyConst.Notify_PC_AddMenu, info);

            this.addRegister(Mediators.Mediator_PCMineMediator.name, this);
            this.notifyUI(PCMineCommands.initListener,this);

        }
        /** 注册通知 */
		public listNotification():Array<string> {
			return [
				NotifyConst.Notify_PlayerInfo,
                NotifyConst.Notify_ClubEditSuccess,
                NotifyConst.Notify_ClubTopUI_TitleName,
                NotifyConst.Notify_ClubList,
                NotifyConst.Notify_PC_MenuClosed
			];
		}
		/** 接收通知 */
		public handleNotification(type: string, body: any): void {
			switch (type) {
				case NotifyConst.Notify_PlayerInfo:
                case NotifyConst.Notify_ClubTopUI_TitleName:
                    this.notifyUI(PCMineCommands.updateTextrue,this);
					break;
                case NotifyConst.Notify_ClubEditSuccess:
                    let list = ClubController.getInstance().getClubList(
                        ClubModel.ClubType_Created,
                        ClubModel.getInstance().getCreatedClubNum());
                    let club = ClubController.getInstance().getClub(GlobalConfig.clubId + "");
                    Promise.all([list, club]).then((data) => {
                        this.notifyUI(PCMineCommands.clubUpdateSuccess, data[1]);
                        /**邀请码变了 再请求一次分享链接 */
				        GameController.getInstance().getShareUrl(GlobalConfig.clubId);
                    }).catch((err) => {
                        DebugUtil.error("", err);
                    });
                    break;
                case NotifyConst.Notify_ClubList:
                    this.notifyUI(PCMineCommands.setJoinedClubNum);
                    break;
                case NotifyConst.Notify_PC_MenuClosed:
                    if(body == Mediators.Mediator_PCInvitNumEditMediator.name)
                    {
                       this.notifyUI(PCMineCommands.changeEditBtn,true);
                    }
                    else if(body == Mediators.Mediator_PCPEMediator.name)
                    {
                        this.notifyUI(PCMineCommands.changeChooseC,true);
                    }else if(body == Mediators.Mediator_ExitClub.name){
                        this.notifyUI(PCMineCommands.changeBack,true);
                    }
                    break;
			}
		}
        /**打开编辑邀请码*/
        public openinvitNumE():void{
            // if(MediatorManager.isMediatorOpen(Mediators.Mediator_PCPEMediator.name)){
            //     MediatorManager.closeMediator(Mediators.Mediator_PCPEMediator.name);
            // }
            if(!MediatorManager.isMediatorOpen(Mediators.Mediator_PCInvitNumEditMediator.name)){
                MediatorManager.openMediator(Mediators.Mediator_PCInvitNumEditMediator);
                this.notifyUI(PCMineCommands.changeEditBtn,false);
            }
        }
        /**打开修改俱乐部头像*/
        public openClubPE():void{
            // if(MediatorManager.isMediatorOpen(Mediators.Mediator_PCInvitNumEditMediator.name)){
            //     MediatorManager.closeMediator(Mediators.Mediator_PCInvitNumEditMediator.name);
            // }
            if(!MediatorManager.isMediatorOpen(Mediators.Mediator_PCPEMediator.name)){
                MediatorManager.openMediator(Mediators.Mediator_PCPEMediator,PCPEMediator.Type_ClubPicture);
                this.notifyUI(PCMineCommands.changeChooseC,false);
            }
        }
        /**打开修改用户头像*/
        public openUserPE():void{
            // if(MediatorManager.isMediatorOpen(Mediators.Mediator_ExitClub.name)){
            //     MediatorManager.closeMediator(Mediators.Mediator_ExitClub.name);
            // }
            if(!MediatorManager.isMediatorOpen(Mediators.Mediator_PCPEMediator.name)){
                MediatorManager.openMediator(Mediators.Mediator_PCPEMediator,PCPEMediator.Type_UserPicture);
                this.notifyUI(PCMineCommands.changeChooseC,false);
            }
        }
        /** 打开退出俱乐部界面*/
        public openExitClub():void
        {
            // if(MediatorManager.isMediatorOpen(Mediators.Mediator_PCPEMediator.name)){
            //     MediatorManager.closeMediator(Mediators.Mediator_PCPEMediator.name);
            // }
            if(!MediatorManager.isMediatorOpen(Mediators.Mediator_ExitClub.name)){
                MediatorManager.openMediator(Mediators.Mediator_ExitClub);
                this.notifyUI(PCMineCommands.changeBack,false);
            }
        }
        /** 修改俱乐部名称 */
        public static Type_Club: string = "Type_Club";
        /** 修改用户昵称 */
        public static Type_User: string = "Type_User";
// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.removeRegister(Mediators.Mediator_PCMineMediator.name);
			super.dispose();
		}
    }
}