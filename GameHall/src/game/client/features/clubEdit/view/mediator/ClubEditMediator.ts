module game {

    export class ClubEditMediator extends BaseMediator {

        public constructor() {
            super();
        }

        // ---------------------------------- 初始化 ----------------------------------

        /** 初始化 房间内的数据对象 */
        protected initClientData(): void {

        }

        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        protected initUI(): void {
            var currentUI: any;
            // if (GlobalConfig.isMobile) {
            currentUI = egret.getDefinitionByName("game.ClubEditUI" + GlobalConfig.multiSkinType);
            // } else {
            // 	currentUI = egret.getDefinitionByName("game.PCClubEditUI" + GlobalConfig.multiSkinType);
            // }
            this.ui = new currentUI(this.data);
            UIManager.OpenUI(this.ui, Mediators.Mediator_ClubEdit.layer);
        }

        /** 分发游戏数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_ClubEdit.name, this);
            this.notifyUI(ClubEditUICommands.initListener, this);
            this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator,{mediator:Mediators.Mediator_HomeOwnerClub});
        }

        // ---------------------------------- 通知与状态响应 ----------------------------------

        /** 注册通知 */
        public listNotification(): Array<string> {
            return [
                NotifyConst.Notify_ClubEditSuccess
            ];
        }

        /** 接收通知 */
        public handleNotification(type: string, body: any): void {
            switch (type) {
                case NotifyConst.Notify_ClubEditSuccess:
                    let list = ClubController.getInstance().getClubList(
                        ClubModel.ClubType_Created,
                        ClubModel.getInstance().getCreatedClubNum());
                    let club = ClubController.getInstance().getClub(GlobalConfig.clubId + "");
                    Promise.all([list, club]).then((data) => {
                        this.notifyUI(ClubEditUICommands.clubUpdateSuccess, data[1]);
                        this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName,
                            ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name
                        );
                    }).catch((err) => {
                        DebugUtil.error("", err);
                    });
                    break;
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            this.removeRegister(Mediators.Mediator_ClubEdit.name);
            super.dispose();
        }

    }

}