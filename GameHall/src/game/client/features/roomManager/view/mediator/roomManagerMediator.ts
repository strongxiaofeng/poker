module game
{
    export class roomManagerMediator extends BaseMediator
    {
        public constructor()
        {
            super();
        }

        /**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [
                NotifyConst.Notify_Baccarat_Info,
                NotifyConst.Notify_Baccarat_Setting,
                NotifyConst.Notify_Baccarat_RoadMap,
                NotifyConst.Notify_Baccarat_SouresPlayer,
                NotifyConst.Notify_Baccarat_RoomNameArr,
                NotifyConst.Notify_Baccarat_Enter,
                NotifyConst.Notify_Baccarat_EnterPwd,
            ];
        }

        /**
         * 子类需要重写
         * */
        public handleNotification(type: string, body: any): void
        {
            switch (type) {
                case NotifyConst.Notify_Baccarat_Info:
                    this.notifyUI(roomManagerCommands.Notify_info, body);
                    break;
                case NotifyConst.Notify_Baccarat_Setting:
                    this.notifyUI(roomManagerCommands.Notify_setting, body);
                    break;
                case NotifyConst.Notify_Baccarat_RoadMap:
                    this.notifyUI(roomManagerCommands.updateRoadMap, body);
                    break;
                case NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.notifyUI(roomManagerCommands.Notify_setting, body);
                    break;
                case NotifyConst.Notify_Baccarat_RoomNameArr:
                    /** 收到删除俱乐部通知*/
                    this.notifyUI(roomManagerCommands.Notify_clubRoomArr);
                    break;
                case NotifyConst.Notify_Baccarat_Enter: 
                    this.reqEnterRoom(body)
                    break;
                case NotifyConst.Notify_Baccarat_EnterPwd:
                    this.reqEnterRoomPwd(body[0], body[1])
                    break;
            }
        }

        /**初始化数据*/
        protected initClientData(): void
        {

        }

        /**初始化UI*/
        protected initUI(): void
        {
            var currentUI: any;
            currentUI = egret.getDefinitionByName("game.roomManagerUI" + GlobalConfig.multiSkinType);
            this.ui = new currentUI();
            UIManager.OpenUI(this.ui, Mediators.Mediator_roomManagerMediator.layer);
        }
        /**初始化数据*/
        protected initData(): void
        {
            this.addRegister(Mediators.Mediator_roomManagerMediator.name, this);
            this.notifyUI(roomManagerCommands.initListener);
            this.notifyUI(roomManagerCommands.Notify_clubRoomArr);

            this.sendNotification(NotifyConst.Notify_ShowAssistiveTouch);
            let name = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
            this.sendNotification(NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(NotifyConst.Notify_ClubTopUI_TitleName, name);
            this.sendNotification(NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: Mediators.Mediator_HomeOwnerClub });
            this.getRoomCard();

            

        }

        /** 请求进入某个房间 */
        public reqEnterRoom(roomID: string)
        {
            if (!roomID) return;
            BaccaratModel.getInstance().sendRoomEnter(roomID).then(() =>
            {
                CommonLoadingUI.getInstance().stop();
                MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, roomID);
            }).catch((e) =>
            {
                CommonLoadingUI.getInstance().stop();
                // this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showRedMsg, e.msg);
                DebugUtil.error("", e);
            });
        }

        /** 请求进入某个有密码的房间 */
        public reqEnterRoomPwd(roomID: string, pwd: number)
        {
            CommonLoadingUI.getInstance().start();
            if (!roomID) return;
            BaccaratModel.getInstance().sendRoomEnter(roomID, pwd).then(() =>
            {
                CommonLoadingUI.getInstance().stop();
                MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, roomID);
            }).catch((e) =>
            {
                CommonLoadingUI.getInstance().stop();
                this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showRedMsg, e.msg);
                DebugUtil.error("", e);
            });
        }

        /** 获取房卡数量 */
        public getRoomCard()
        {
            let num = ClubModel.getInstance().getRoomCardNum();
            this.notifyUI(roomManagerCommands.roomCardNum, num);
        }


        // ---------------------------------- dispose ----------------------------------
        public dispose(): void
        {
            this.removeRegister(Mediators.Mediator_roomManagerMediator.name);
            super.dispose();
        }
    }
}