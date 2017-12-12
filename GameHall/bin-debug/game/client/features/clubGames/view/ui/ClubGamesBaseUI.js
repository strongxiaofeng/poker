var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    /**
     * 俱乐部游戏列表UI组件
     * by 郑戎辰
     */
    var ClubGamesBaseUI = (function (_super) {
        __extends(ClubGamesBaseUI, _super);
        function ClubGamesBaseUI() {
            return _super.call(this) || this;
        }
        ClubGamesBaseUI.prototype.initSetting = function () {
            this.payoutRecord.touchChildren = false;
            this.creditRecord.touchChildren = false;
            this.bettingSummary.touchChildren = false;
            this.baccBtn.touchChildren = false;
            this.multiBtn.touchChildren = false;
            this.rouletteBtn.touchChildren = false;
            this.tigerBtn.touchChildren = false;
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        ClubGamesBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case ClubGamesUICommands.ClubGamesNotify_initListener:
                    this.registerEvent(this, egret.TouchEvent.TOUCH_BEGIN, this.onTouchBtn, this);
                    this.registerEvent(this, egret.TouchEvent.TOUCH_END, this.onTouchBtnEnd, this);
                    break;
                case ClubGamesUICommands.ClubGamesNotify_userName:
                    if (!params)
                        return;
                    this.userName.text = params;
                    break;
                case ClubGamesUICommands.ClubGamesNotify_userBalance:
                    if (!params)
                        return;
                    this.userBalance.text = game.NumberUtil.getSplitNumStr(params);
                    this["chipImg"].right = this.userBalance.width + 30 + this.addChip.width;
                    break;
                case ClubGamesUICommands.ClubGamesNotify_HomeCardNum:
                    if (!params)
                        return;
                    this["roomCardTxt"].text = "\u623F\u5361\uFF1A" + game.NumberUtil.getSplitNumStr(params * 100);
                    this["roomCardImg"].right = this["roomCardTxt"].width + 130;
                    break;
                case ClubGamesUICommands.ClubGamesNotify_IsRoasting:
                    if (!params)
                        return;
                    // this.roastingGroup.visible = true;
                    // this.gamesGroup.top = 475;
                    // this.roastingImgsShow(params);
                    break;
                case ClubGamesUICommands.ClubGamesNotify_isMy:
                    this.isMy(params);
                    break;
            }
        };
        ClubGamesBaseUI.prototype.isMy = function (b) {
            this["roomCardGroup"].visible = false;
            this["balanceGroup"].visible = false;
            if (b) {
                this["roomCardGroup"].visible = true;
                // this["userTop"].visible = false;
            }
            else {
                this["balanceGroup"].visible = true;
            }
        };
        /**
         * 页面的点击事件
         */
        ClubGamesBaseUI.prototype.onTouchBtn = function (evt) {
            switch (evt.target) {
                case this.payoutRecord:
                    this["payoutRecordImg"].setState = "down";
                    break;
                case this.creditRecord:
                    this["creditRecordImg"].setState = "down";
                    break;
                case this.bettingSummary:
                    this["bettingSummaryImg"].setState = "down";
                    break;
                case this.baccBtn:
                    this["baccDesk"].visible = true;
                    break;
                case this.multiBtn:
                    this["multiDesk"].visible = true;
                    break;
                case this.rouletteBtn:
                    this["rouletteDesk"].visible = true;
                    break;
                case this.tigerBtn:
                    this["tigerDesk"].visible = true;
                    break;
                case this.addChip:
                    // NotifyController.getInstance().askChip(GlobalConfig.clubId,1000);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_AskChip, game.GlobalConfig.clubId);
                    break;
            }
        };
        ClubGamesBaseUI.prototype.headBack = function (info) {
            // console.warn("headBack",info);
            if (this.chatData) {
                if (info[this.chatData.owner_id]) {
                    this.chatData.imgURL = info[this.chatData.owner_id].avatar;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyChat, this.chatData);
                    game.CommonLoadingUI.getInstance().stop();
                }
            }
        };
        /**
        * 页面的点击事件
        */
        ClubGamesBaseUI.prototype.onTouchBtnEnd = function (evt) {
            var _this = this;
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (evt.target) {
                case this.payoutRecord:
                    this["payoutRecordImg"].setState = "up";
                    game.MediatorManager.openMediator(game.Mediators.Mediator_AssetDetail, game.AssetDetailOpenType.BetRecord);
                    break;
                case this.creditRecord:
                    this["creditRecordImg"].setState = "up";
                    game.MediatorManager.openMediator(game.Mediators.Mediator_AssetDetail, game.AssetDetailOpenType.QuotaRecord);
                    break;
                case this.bettingSummary:
                    this["bettingSummaryImg"].setState = "up";
                    game.CommonLoadingUI.getInstance().start(true);
                    var club = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId);
                    this.chatData = new game.NotifyItemData();
                    this.chatData.club_id = game.GlobalConfig.clubId;
                    this.chatData.owner_id = club.creator;
                    this.chatData.id = +game.PersonalInfoModel.getInstance().user_id;
                    this.chatData.name = club.creator_name;
                    game.PersonalInfoController.getInstance().getPlayerNameAndImg([club.creator], false, this.headBack, this);
                    //单独取房主的头像，再进入房间
                    break;
                case this.baccBtn:
                    this["baccDesk"].visible = false;
                    game.CommonLoadingUI.getInstance().start();
                    game.ClubController.getInstance().getSubscribeRoomList(game.GlobalConfig.clubId).then(function () {
                        //是否进行过新手引导
                        var guidedUser = localStorage.getItem("guidedUser");
                        var name = game.LoginController.getInstance().sendingName;
                        var guided = false;
                        if (!guidedUser)
                            guidedUser = "";
                        if (guidedUser.length > 0) {
                            var arr = guidedUser.split(":");
                            if (arr.indexOf(name) > -1) {
                                guided = true;
                            }
                        }
                        if (!guided) {
                            var value = guidedUser;
                            if (guidedUser.length > 0)
                                value += ":" + name;
                            else
                                value += name;
                            localStorage.setItem("guidedUser", value);
                            game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratGuide);
                            game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, null);
                        }
                        else {
                            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubDetail, 'bacc');
                        }
                    }).catch(function (data) {
                        game.CommonLoadingUI.getInstance().stop();
                        game.DebugUtil.debug('订阅我的俱乐部topic返回错误:' + data);
                    });
                    break;
                case this.multiBtn:
                    game.ClubController.getInstance().getSubscribeRoomList(game.GlobalConfig.clubId).then(function () {
                        //判断是否需要新手引导
                        var isguide = localStorage.getItem("multiGuide" + game.PersonalInfoModel.getInstance().user_id);
                        if (isguide) {
                            _this["multiDesk"].visible = false;
                            game.CommonLoadingUI.getInstance().start();
                            game.BaccaratController.getInstance().sendMultiClubEnter().then(function () {
                                game.MediatorManager.openMediator(game.Mediators.Mediator_MultiBaccMediator);
                            });
                        }
                        else {
                            game.MediatorManager.openMediator(game.Mediators.NewGuide, 1);
                            localStorage.setItem("multiGuide" + game.PersonalInfoModel.getInstance().user_id, "1");
                        }
                    });
                    break;
                case this.rouletteBtn:
                    this["rouletteDesk"].visible = false;
                    break;
                case this.tigerBtn:
                    this["tigerDesk"].visible = false;
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
        };
        ClubGamesBaseUI.prototype.createRoom = function (data) {
            game.DebugUtil.debug('创建房间成功');
        };
        /**
         * 是否显示广告
         */
        ClubGamesBaseUI.prototype.roastingImgsShow = function (params) {
            if (!params)
                return;
            this.BannerUI = new game.BannerUI(495, this.width, 230, params);
            this.addChild(this.BannerUI);
        };
        ClubGamesBaseUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
            if (this.BannerUI) {
                this.BannerUI.setWidth(game.StageUtil.width);
            }
        };
        ClubGamesBaseUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.topUI) {
                this.topUI.dispose();
            }
            this.topUI = null;
        };
        return ClubGamesBaseUI;
    }(game.BaseUI));
    game.ClubGamesBaseUI = ClubGamesBaseUI;
    __reflect(ClubGamesBaseUI.prototype, "game.ClubGamesBaseUI");
})(game || (game = {}));
//# sourceMappingURL=ClubGamesBaseUI.js.map