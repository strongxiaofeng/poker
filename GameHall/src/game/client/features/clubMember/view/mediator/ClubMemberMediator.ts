module game {

    export class ClubMemberMediator extends BaseMediator {

        public constructor() {
            super();
        }

        /** 是否正在刷新列表*/
        private isUpdating: boolean;
        /** 是否有更多内容需要刷新*/
        private isShowTipLoading: boolean;

        // ---------------------------------- 初始化 ----------------------------------

        /** 初始化 房间内的数据对象 */
        protected initClientData(): void {
            this.isUpdating = false;
            this.isShowTipLoading = false;
            this.condition = "";
            this.pageIndex = 1;
            this.locked = 0;
        }

        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        protected initUI(): void {
            var currentUI: any;
            if (GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.ClubMemberUI" + GlobalConfig.multiSkinType);
                this.ui = new currentUI();
                UIManager.OpenUI(this.ui, Mediators.Mediator_ClubMember.layer);
            } else {
                currentUI = egret.getDefinitionByName("game.PCClubMemberUI" + GlobalConfig.multiSkinType);
                this.ui = new currentUI();
                UIManager.OpenUI(this.ui, Mediators.Mediator_ClubMember.layer_pc);
            }
        }

        /** 分发游戏数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_ClubMember.name, this);
            this.notifyUI(ClubMemberUICommands.initListener, this);
            ClubController.getInstance().getOnlinePlayer(GlobalConfig.clubId + "").then((count) => {
                this.notifyUI(ClubMemberUICommands.setOnlinePlayer, count);
            }).catch(() => {
                DebugUtil.debug("获取俱乐部在线人数失败");
            });
            let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
            if (clubInfo) this.notifyUI(ClubMemberUICommands.setPlayerNum, clubInfo.users || 0);
            this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, "成员");
            this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_HomeOwnerClub });
            // 请求游戏数据
            this.sendSearchRequest();
        }

        // ---------------------------------- 搜索条件 ----------------------------------

        public condition: string;
        /** 0 - 查询所有玩家 | 1 - 查询已锁定玩家 (默认为0) */
        public locked: number;

        public pageIndex: number;

        public static SetCondition: string = "SetCondition";

        // ---------------------------------- 发送数据 ----------------------------------

        /** 发送搜索玩家请求 */
        public sendSearchRequest(): void {
            PersonalInfoController.getInstance().getPlayerList(
                GlobalConfig.clubId + "",
                this.condition + "",
                this.pageIndex * 20,
                this.locked
            ).then(() => {
                this.notifyUI(ClubMemberUICommands.refreshList, this.condition);
            }).catch(() => {

            });
        }

        // ---------------------------------- 通知与状态响应 ----------------------------------

        /** 注册通知 */
        public listNotification(): Array<string> {
            return [
                NotifyConst.Notify_UserDetail,
                NotifyConst.Notify_UpdateUserList
            ];
        }

        /** 接收通知 */
        public handleNotification(type: string, body: any): void {
            switch (type) {
                case NotifyConst.Notify_UserDetail:
                    this.notifyUI(ClubMemberUICommands.userDetail, body);
                    break;
                case NotifyConst.Notify_UpdateUserList:
                    this.sendSearchRequest();
                    break;
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            this.removeRegister(Mediators.Mediator_ClubMember.name);
            super.dispose();
        }

    }

}