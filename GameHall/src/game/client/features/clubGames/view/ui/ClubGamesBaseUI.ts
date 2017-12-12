module game
{
    /**
     * 俱乐部游戏列表UI组件
     * by 郑戎辰
     */
    export class ClubGamesBaseUI extends BaseUI
    {
        /** 顶部TOP栏 */
        protected topUI: game.BaseUI;
        /** 玩家昵称 */
        protected userName: eui.ALabel;
        /** 用户余额 */
        protected userBalance: eui.BitmapLabel;
        /** 派彩记录 */
        protected payoutRecord: eui.Group;
        /** 额度记录 */
        protected creditRecord: eui.Group;
        /** 投注汇总 */
        protected bettingSummary: eui.Group;
        /** 装4个游戏的group */
        protected gamesGroup: eui.Group;
        /** 百家乐 */
        protected baccBtn: eui.Group;
        /** 多桌 */
        protected multiBtn: eui.Group;
        /** 轮盘 */
        protected rouletteBtn: eui.Group;
        /** 龙虎 */
        protected tigerBtn: eui.Group;
        /** 轮播图 */
        protected BannerUI: BannerUI;
        // /** 轮播图 */
        // protected roastingGroup: eui.Scroller;

        protected addChip: eui.Button;

        public constructor()
        {
            super();
        }

        public initSetting()
        {
            this.payoutRecord.touchChildren = false;
            this.creditRecord.touchChildren = false;
            this.bettingSummary.touchChildren = false;
            this.baccBtn.touchChildren = false;
            this.multiBtn.touchChildren = false;
            this.rouletteBtn.touchChildren = false;
            this.tigerBtn.touchChildren = false;
        }

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void
        {
            switch (type) {
                case ClubGamesUICommands.ClubGamesNotify_initListener:
                    this.registerEvent(this, egret.TouchEvent.TOUCH_BEGIN, this.onTouchBtn, this);
                    this.registerEvent(this, egret.TouchEvent.TOUCH_END, this.onTouchBtnEnd, this);
                    break;
                case ClubGamesUICommands.ClubGamesNotify_userName:
                    if (!params) return;
                    this.userName.text = params;
                    break;
                case ClubGamesUICommands.ClubGamesNotify_userBalance:
                    if (!params) return;
                    this.userBalance.text = NumberUtil.getSplitNumStr(params);
                    this["chipImg"].right = this.userBalance.width + 30 + this.addChip.width;
                    break;
                case ClubGamesUICommands.ClubGamesNotify_HomeCardNum:
                    if (!params) return;
                    this["roomCardTxt"].text = `房卡：${NumberUtil.getSplitNumStr(params * 100)}`;
                    this["roomCardImg"].right = this["roomCardTxt"].width + 130;
                    break;
                case ClubGamesUICommands.ClubGamesNotify_IsRoasting:
                    if (!params) return;
                    // this.roastingGroup.visible = true;
                    // this.gamesGroup.top = 475;
                    // this.roastingImgsShow(params);
                    break;
                case ClubGamesUICommands.ClubGamesNotify_isMy:
                    this.isMy(params);
                    break;
            }
        }

        public isMy(b: boolean)
        {
            this["roomCardGroup"].visible = false;
            this["balanceGroup"].visible = false;
            if (b) {
                this["roomCardGroup"].visible = true;
                // this["userTop"].visible = false;
            }
            else {
                this["balanceGroup"].visible = true;
            }
        }

        /**
         * 页面的点击事件
         */
        protected onTouchBtn(evt: egret.TouchEvent): void
        {
            switch (evt.target) {
                case this.payoutRecord:
                    (<eui.AButton>this["payoutRecordImg"]).setState = "down";
                    break;
                case this.creditRecord:
                    (<eui.AButton>this["creditRecordImg"]).setState = "down";
                    break;
                case this.bettingSummary:
                    (<eui.AButton>this["bettingSummaryImg"]).setState = "down";
                    break;
                case this.baccBtn:
                    (<eui.Image>this["baccDesk"]).visible = true;
                    break;
                case this.multiBtn:
                    (<eui.Image>this["multiDesk"]).visible = true;
                    break;
                case this.rouletteBtn:
                    (<eui.Image>this["rouletteDesk"]).visible = true;
                    break;
                case this.tigerBtn:
                    (<eui.Image>this["tigerDesk"]).visible = true;
                    break;
                case this.addChip:
                    // NotifyController.getInstance().askChip(GlobalConfig.clubId,1000);
                    MediatorManager.openMediator(Mediators.Mediator_AskChip, GlobalConfig.clubId);
                    break;
            }
        }

        private chatData: NotifyItemData;
        private headBack(info): void
        {
            // console.warn("headBack",info);
            if (this.chatData) {
                if (info[this.chatData.owner_id]) {
                    this.chatData.imgURL = info[this.chatData.owner_id].avatar;
                    MediatorManager.openMediator(Mediators.Mediator_NotifyChat, this.chatData);
                    CommonLoadingUI.getInstance().stop();
                }
            }
        }

        /**
        * 页面的点击事件
        */
        protected onTouchBtnEnd(evt: egret.TouchEvent): void
        {
            SoundPlayerNew.playEffect(SoundConst.click);
            switch (evt.target) {
                case this.payoutRecord:
                    (<eui.AButton>this["payoutRecordImg"]).setState = "up";
                    MediatorManager.openMediator(Mediators.Mediator_AssetDetail, AssetDetailOpenType.BetRecord);
                    break;
                case this.creditRecord:
                    (<eui.AButton>this["creditRecordImg"]).setState = "up";
                    MediatorManager.openMediator(Mediators.Mediator_AssetDetail, AssetDetailOpenType.QuotaRecord);
                    break;
                case this.bettingSummary:
                    (<eui.AButton>this["bettingSummaryImg"]).setState = "up";
                    CommonLoadingUI.getInstance().start(true);
                    let club = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
                    this.chatData = new NotifyItemData();
                    this.chatData.club_id = GlobalConfig.clubId;
                    this.chatData.owner_id = club.creator;
                    this.chatData.id = +PersonalInfoModel.getInstance().user_id;
                    this.chatData.name = club.creator_name;
                    PersonalInfoController.getInstance().getPlayerNameAndImg([club.creator], false, this.headBack, this);
                    //单独取房主的头像，再进入房间
                    break;
                case this.baccBtn:
                    (<eui.Image>this["baccDesk"]).visible = false;
                    CommonLoadingUI.getInstance().start();
                    ClubController.getInstance().getSubscribeRoomList(GlobalConfig.clubId).then(() =>
                    {
                        //是否进行过新手引导
                        let guidedUser = localStorage.getItem("guidedUser");
                        let name = LoginController.getInstance().sendingName;
                        let guided: boolean = false;

                        if (!guidedUser) guidedUser = "";
                        if (guidedUser.length > 0) {
                            let arr = guidedUser.split(":");
                            if (arr.indexOf(name) > -1) {
                                guided = true;
                            }
                        }

                        if (!guided) {
                            let value = guidedUser;
                            if (guidedUser.length > 0) value += ":" + name;
                            else value += name;
                            localStorage.setItem("guidedUser", value);
                            MediatorManager.openMediator(Mediators.Mediator_BaccaratGuide);
                            MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, null);
                        }
                        else {
                            MediatorManager.openMediator(Mediators.Mediator_ClubDetail, 'bacc');
                        }
                    }).catch((data: topic.BaseResponse) =>
                    {
                        CommonLoadingUI.getInstance().stop();
                        DebugUtil.debug('订阅我的俱乐部topic返回错误:' + data);
                    });

                    break;
                case this.multiBtn:
                    ClubController.getInstance().getSubscribeRoomList(GlobalConfig.clubId).then(() =>
                    {
                        //判断是否需要新手引导
                        let isguide = localStorage.getItem("multiGuide" + PersonalInfoModel.getInstance().user_id);

                        if (isguide) {
                            (<eui.Image>this["multiDesk"]).visible = false;
                            CommonLoadingUI.getInstance().start();
                            BaccaratController.getInstance().sendMultiClubEnter().then(() =>
                            {
                                MediatorManager.openMediator(Mediators.Mediator_MultiBaccMediator);
                            });
                        }
                        else {
                            MediatorManager.openMediator(Mediators.NewGuide, 1);
                            localStorage.setItem("multiGuide" + PersonalInfoModel.getInstance().user_id, "1");
                        }
                    })
                    break;
                case this.rouletteBtn:
                    (<eui.Image>this["rouletteDesk"]).visible = false;
                    break;
                case this.tigerBtn:
                    (<eui.Image>this["tigerDesk"]).visible = false;
                    // // 模拟数据创建房间（测试用）
                    // ClubController.getInstance().createRoom(1040, GameType.baccarat, 'B3', 'test1', [100, 1000, 10000], {
                    //     'max': {
                    //         'banker': 11111111111,
                    //         player: 1111111111111,
                    //         tie: 1111111111,
                    //         banker_pair: 111111111111,
                    //         player_pair: 111111111111111
                    //     },
                    //     'min': {
                    //         banker: 2,
                    //         player: 2,
                    //         tie: 2,
                    //         banker_pair: 2,
                    //         player_pair: 2
                    //     }
                    // }, 'private','11111111',false)

                    // 模拟数据创建视频源（测试用）
                    // {
                    //     let topicType = `/sources/2`;
                    //     let update: any = {};
                    //     update.action = "create";
                    //     update.create = {};
                    //     update.create.type = 'baccarat';
                    //     update.create.group = '1';
                    //     update.create.preference = {};
                    //     update.create.preference.video = '/video/game1';
                    //     update.create.preference.video_for_dealer = 'video used by dealer server';
                    //     update.create.preference.status_time = {};
                    //     update.create.preference.status_time.bet_time = 15000;
                    //     update.create.preference.status_time.payout_time = 5000;
                    //     update.create.preference.status_time.open_round_time = 2000;
                    //     update.create.preference.status_time.mi_time = 20000;
                    //     update.create.preference.status_time.mi_time_next = 20000;
                    //     // 回调
                    //     let callBack = function (data: topic.BaseResponse)
                    //     {
                    //         console.warn(data)
                    //     };
                    //     TopicManager.getInstance().getTopicUpdate(topicType, update, callBack, this);
                    // }

                    //
                    break;
            }
        }

        private createRoom(data)
        {
            DebugUtil.debug('创建房间成功')
        }

        /**
         * 是否显示广告
         */
        protected roastingImgsShow(params: any): void
        {
            if (!params) return;
            this.BannerUI = new game.BannerUI(495, this.width, 230, params);
            this.addChild(this.BannerUI);
        }

        public onStageResize(evt: egret.Event)
        {
            super.onStageResize(evt);
            if (this.BannerUI) {
                this.BannerUI.setWidth(StageUtil.width);
            }
        }

        public dispose(): void
        {
            super.dispose();
            if (this.topUI) {
                this.topUI.dispose();
            }
            this.topUI = null;
        }
    }
}