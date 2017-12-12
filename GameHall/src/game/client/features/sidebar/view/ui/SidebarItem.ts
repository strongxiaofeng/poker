module game {
    export class SidebarItem extends eui.AItemRenderer {


        public constructor() {
            super();
            this.skinName = "resource/skins/game_skins/mobile/sidebar/sidebarItemSkin.exml";
            this.onStage().then(() => {
                this.roadMap = new game.RoadMap(this.groupRoadMap.width, this.groupRoadMap.height, RoadMap.BigRoad, 44);
                this.groupRoadMap.addChild(this.roadMap);
                this.initMouseEvent(true);
                this.groupCount.visible = true;
                this.countdown = new game.countdown(75, true);
                this.countdown.scaleX = 0.8;
                this.countdown.scaleY = 0.8;
                this.countdown.right = 0;
                this.countdown.verticalCenter = 0;
                this.groupCount.addChild(this.countdown);
                this.dataChanged();
            }).catch(() => {
                DebugUtil.debug("初始化失败");
            });
        }

        // ---------------------------------- 皮肤组件 ----------------------------------

        /** 房间名 */
        private roomName: eui.ALabel;
        /** 免佣图标 */
        private imgFree: eui.Image;
        /** 结算图标 */
        private imgCount: eui.Image;
        /** 洗牌图标 */
        private imgShuffle: eui.Image;
        /** 倒计时组件容器group */
        private groupCount: eui.Group;
        /** 路数容器group */
        private groupRoadMap: eui.Group;
        /** 私人房图标 */
        private imgLock: eui.Image;
        /** 洗牌中提示文本 */
        private labelShuffle: eui.Label;

        // ---------------------------------- 变量声明 ----------------------------------

        /** 路书组件 */
        private roadMap: RoadMap;

        protected countdown: countdown;

        // ---------------------------------- 初始化 ----------------------------------

        private onStage() {
            return new Promise((resolve, reject) => {
                this.once(egret.Event.ADDED_TO_STAGE, resolve, this);
            });
        }

        protected dataChanged() {
            try {
                this.updataRoadData();
                this.initData();
            } catch (e) { }
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 点击事件 */
        protected initMouseEvent(b: boolean): void {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            }
        }

        /**  点击响应*/
        protected onTouch(): void {
            CommonLoadingUI.getInstance().showConnect();
            let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
            if (clubInfo.creator == +PersonalInfoModel.getInstance().user_id) {
                BaccaratController.getInstance().getSubscribeRoomDesk(this.data).then(() => {
                    CommonLoadingUI.getInstance().stop();
                    MediatorManager.closeMediator(Mediators.Mediator_Sidebar.name);
                    MediatorManager.openMediator(Mediators.Mediator_OwnersWatchMediator, this.data);
                }).catch((e) => {
                    CommonLoadingUI.getInstance().stop();
                    console.debug(e);
                })
            } else {
                ClubController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_Enter, this.data);
            }
        }

        public initData() {
            this.imgLock.visible = ClubModel.getInstance().getlockBool(this.data);
            this.roomName.text = ClubModel.getInstance().getRoomName(this.data);
            this.imgFree.visible = ClubModel.getInstance().getClubRoomsSetting(this.data).is_no_commission;
            this.onRoomState();
        }

        public updataRoadData(): void {
            let roadData = ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadData && this.roadMap) {
                this.roadMap.setData(roadData);
            }
        }

        /** 根据房间状态显示UI */
        public onRoomState(): void {
            let state = ClubModel.getInstance().getRoomStage(this.data);
            this.labelShuffle.visible = false;
            switch (state) {
                case GameState.bet:
                    let betTime = ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
                    let stopBetTime = ClubModel.getInstance().getStopBetTime(this.data);
                    this.countdown.visible = true;
                    this.imgCount.visible = false;
                    this.countdown.startTime(betTime, stopBetTime);
                    break;
                case GameState.deal_card:
                    this.countdown.startPayOut();
                    this.countdown.visible = false;
                    this.imgCount.visible = true;
                    break;
                case GameState.payout:
                    this.countdown.visible = false;
                    this.imgCount.visible = true;
                    this.countdown.startPayOut();
                    break;
                case GameState.shuffle:
                    this.countdown.visible = true;
                    this.imgCount.visible = false;
                    this.countdown.startShuffle();
                    this.labelShuffle.visible = true;
                    break;
            }
        }

        /**当移除这个item时执行的清除方法 由子类重写*/
        public dispose() {
            this.initMouseEvent(false);
        }

    }
}