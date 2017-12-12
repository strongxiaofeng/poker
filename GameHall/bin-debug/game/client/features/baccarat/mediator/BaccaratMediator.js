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
     * 俱乐部房间列表mediator组件
     * by 郑戎辰
     */
    var BaccaratMediator = (function (_super) {
        __extends(BaccaratMediator, _super);
        function BaccaratMediator() {
            var _this = _super.call(this) || this;
            /** 下注步骤 */
            _this.betNumArr = [];
            /** 确认下注下标 */
            _this.sureIndex = 0;
            /** 用户余额 */
            _this.balance = 0;
            /** 是否是房主 */
            _this.isMy = false;
            /** 其他玩家的下注数据 */
            _this.otherBets = null;
            /** 最后一次房间状态 */
            _this.lastStage = '';
            /** 最后一次的已发牌数量 */
            _this.lastCardsOder = [];
            _this.lastDeskStage = '';
            return _this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        BaccaratMediator.prototype.initUI = function () {
            var baccaratUI;
            if (game.GlobalConfig.isMobile) {
                baccaratUI = egret.getDefinitionByName("game.BaccaratUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                baccaratUI = egret.getDefinitionByName("game.PCBaccaratUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new baccaratUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_BaccaratMediator.layer);
        };
        /**
     * 子类需要重写
     * */
        BaccaratMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_Info,
                game.NotifyConst.Notify_Baccarat_DeskIn,
                game.NotifyConst.Notify_Baccarat_RoadMap,
                game.NotifyConst.Notify_Baccarat_Setting,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_Baccarat_Chips,
                game.NotifyConst.Notify_LockUser,
                game.NotifyConst.Notify_RoomChat,
                game.NotifyConst.Notify_SendChat,
                game.NotifyConst.Notify_PlayerBalance,
                game.NotifyConst.Notify_Update_PlayerName,
                game.NotifyConst.Show_VideoBack,
                game.NotifyConst.Close_VideoBack,
                game.NotifyConst.Notify_OtherRoomCard
            ];
        };
        /**
         * 子类需要重写
         * */
        BaccaratMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_Info:
                    if (body == this.data && !this.isMy) {
                        var desk = game.ClubModel.getInstance().getRoomInfoDesk(this.data);
                        if (!desk) {
                            game.MediatorManager.closeMediator(game.Mediators.Mediator_BaccaratMediator.name);
                            var tipData = new game.TipMsgInfo();
                            tipData.msg = [{ text: '房主房卡不足，您已被请离房间。对您造成的不便，敬请谅解。', textColor: enums.ColorConst.Golden }];
                            tipData.confirmText = "我知道了";
                            tipData.comfirmCallBack = this.confirmBack;
                            tipData.thisObj = this;
                            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                        }
                    }
                    break;
                case game.NotifyConst.Show_VideoBack:
                    console.warn("百家乐：", game.NotifyConst.Show_VideoBack, game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_BaccaratMediator.name));
                    if (this.ui) {
                        this.notifyUI(BaccaratUICommands.show_playback);
                    }
                    break;
                case game.NotifyConst.Close_VideoBack:
                    console.warn("百家乐：", game.NotifyConst.Close_VideoBack, game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_BaccaratMediator.name));
                    if (this.ui) {
                        this.notifyUI(BaccaratUICommands.close_playback);
                    }
                    break;
                case game.NotifyConst.Notify_Update_PlayerName:
                    this.updateUserBaseInfo(body);
                    break;
                case game.NotifyConst.Notify_RoomChat:
                    this.onRoomChat(body);
                    break;
                case game.NotifyConst.Notify_SendChat:
                    this.sendChat(body);
                    break;
                case game.NotifyConst.Notify_Baccarat_Info:
                    break;
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.judgeStage();
                    break;
                case game.NotifyConst.Notify_Baccarat_Setting:
                    // this.playerSeats();
                    break;
                case game.NotifyConst.Notify_Baccarat_DeskIn:
                    if (!this.isMy) {
                        this.playerSeats();
                        this.showOtherBet();
                    }
                    else {
                        this.showAllSeat();
                        this.showAllBet();
                    }
                    this.setOthersBets();
                    this.deskIn();
                    break;
                case game.NotifyConst.Notify_Baccarat_RoadMap:
                    if (body == this.data) {
                        this.updataRoadMap();
                    }
                    break;
                case game.NotifyConst.Notify_Baccarat_Chips:
                    if (body == this.data) {
                        this.setCustomChips();
                    }
                    break;
                case game.NotifyConst.Notify_LockUser:
                    if (body == game.GlobalConfig.clubId) {
                        var tipData = new game.TipMsgInfo();
                        tipData.msg = [{ text: '抱歉您在"' + game.ClubModel.getInstance().getClubInfo(body).name + '"的权限已被锁定 ， 请联系房主', textColor: enums.ColorConst.Golden }];
                        tipData.confirmText = "我知道了";
                        tipData.comfirmCallBack = this.confirmBack;
                        tipData.thisObj = this;
                        game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    }
                    break;
                case game.NotifyConst.Notify_PlayerBalance:
                    if (body == game.GlobalConfig.clubId) {
                        var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id);
                        this.notifyUI(ClubDetailUICommands.ClubDetailNotify_userBalance, balance);
                    }
                    break;
                case game.NotifyConst.Notify_OtherRoomCard:
                    this.otherRoomCard();
                    break;
            }
        };
        /** 开始处理数据 */
        BaccaratMediator.prototype.initData = function () {
            game.SoundPlayerNew.updateBgm();
            this.closeTop();
            if (!this.data)
                return;
            this.isMy = (game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).creator == (+game.PersonalInfoModel.getInstance().user_id) ? true : false);
            this.addRegister(game.Mediators.Mediator_BaccaratMediator.name, this);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_initListener, this);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_isMy, this.isMy);
            if (!this.isMy) {
                this.playerSeats();
            }
            this.setCustomChips();
            this.updataRoadMap();
            this.showRoomInfo();
            this.setOthersBets();
            this.judgeStage();
            this.deskIn();
            this.subchat();
            this.getIsHire();
            if (this.isMy) {
                this.showAllSeat();
                this.showAllBet();
                this.getMyCard();
            }
            else {
                this.showOtherBet();
                this.showSureNum();
            }
            var soData = game.ClubModel.getInstance().getRoomSource(this.data);
            var video = soData.video;
            if (video && video.length > 0) {
                this.notifyUI(BaccaratUICommands.showVideo, soData.video);
            }
            // SoundPlayer.getInstance().playBgSound(SoundConst.BgSound_Room);
            this.otherRoomCard();
        };
        /** 关闭TOP条 */
        BaccaratMediator.prototype.closeTop = function () {
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, false);
        };
        /**获取我的房卡 */
        BaccaratMediator.prototype.getMyCard = function () {
            var num = game.ClubModel.getInstance().getRoomCardNum();
            this.notifyUI(BaccaratUICommands.BaccaratNotify_isMyRoomCard, num);
        };
        /**获取其他人房卡*/
        BaccaratMediator.prototype.otherRoomCard = function () {
            var num = game.ClubModel.getInstance().getOtherRoomCardNum();
            this.notifyUI(BaccaratUICommands.BaccaratNotify_roomCardNum, num);
        };
        /** 获取我的座位和其他人的座位 */
        BaccaratMediator.prototype.playerSeats = function () {
            // 我的座位号和余额
            var mySeatNum = game.BaccaratModel.getInstance().getMySeat(this.data);
            if (mySeatNum && mySeatNum.data) {
                this.notifyUI(BaccaratUICommands.BaccaratNotify_mySeat, mySeatNum);
                this.sendNotification(game.NotifyConst.Notify_Baccarat_Bac, mySeatNum.data.balance);
                this.balance = mySeatNum.data.balance;
                // 其他人的座位号和余额
                var otherSeats = game.BaccaratModel.getInstance().getOthersSeat(this.data);
                this.notifyUI(BaccaratUICommands.BaccaratNotify_othersSeat, otherSeats);
            }
        };
        /** 设置下注区域的人数和余额 */
        BaccaratMediator.prototype.setOthersBets = function () {
            var oBets = game.BaccaratModel.getInstance().getOthersBets(this.data);
            if (oBets) {
                this.notifyUI(BaccaratUICommands.BaccaratNotify_othersBets, oBets);
            }
            var otherBets = [];
            if (this.isMy) {
                var allBet = game.BaccaratModel.getInstance().getAllBet(this.data);
                for (var key in allBet) {
                    otherBets.push(allBet[key]);
                }
            }
            else {
                otherBets = game.BaccaratModel.getInstance().getOtherBet(this.data);
            }
            if (this.otherBets) {
                for (var i = 0; i < otherBets.length; i++) {
                    var the = otherBets[i];
                    for (var key in the) {
                        if (the[key] > 0 && the[key] != this.otherBets[i][key]) {
                            var oldBet = this.otherBets[i][key];
                            oldBet = oldBet ? oldBet : 0;
                            this.notifyUI(BaccaratUICommands.BaccaratNotify_otherNewBet, { seat: i, type: key, chipNum: the[key] - oldBet });
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < otherBets.length; i++) {
                    var the = otherBets[i];
                    for (var key in the) {
                        if (the[key] > 0) {
                            this.notifyUI(BaccaratUICommands.BaccaratNotify_otherNewBet, { seat: i, type: key, chipNum: the[key] });
                        }
                    }
                }
            }
            this.otherBets = otherBets;
        };
        /* 获取是否免拥 */
        BaccaratMediator.prototype.getIsHire = function () {
            // 免拥
            var isHire = game.ClubModel.getInstance().getRoomHire(this.data);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_isHire, isHire);
        };
        /** 获取和设置自定义筹码 */
        BaccaratMediator.prototype.setCustomChips = function () {
            var _this = this;
            game.BaccaratController.getInstance().getChips(this.data).then(function (data) {
                if (data.chips && data.chips.length) {
                    _this.notifyUI(BaccaratUICommands.BaccaratNotify_customChips, data.chips);
                }
                else {
                    var setting = game.ClubModel.getInstance().getClubRoomsSetting(_this.data);
                    if (setting && setting.chips) {
                        _this.notifyUI(BaccaratUICommands.BaccaratNotify_customChips, setting.chips);
                    }
                }
            }).catch(function (data) {
                var setting = game.ClubModel.getInstance().getClubRoomsSetting(_this.data);
                if (setting && setting.chips) {
                    _this.notifyUI(BaccaratUICommands.BaccaratNotify_customChips, setting.chips);
                }
            });
        };
        /** 请求下注 */
        BaccaratMediator.prototype.reqBet = function (money, type) {
            if (!type)
                return;
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet') {
                this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, '前一局结算中，请稍后...');
                return;
            }
            ;
            if (money <= 0)
                return;
            //余额不足
            var mySeatNum = game.BaccaratModel.getInstance().getMySeat(this.data);
            var unSureArr = this.betNumArr.slice(this.sureIndex);
            if (money + this.getAllTotal(unSureArr) > mySeatNum.data.balance) {
                this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, '您的筹码余额不足');
            }
            else {
                var limit = game.ClubModel.getInstance().getLimit(this.data);
                if (money > limit.max[type] || money + this.getArrTotal(this.betNumArr, type) > limit.max[type]) {
                    var msg = '';
                    switch (type) {
                        case game.BaccaratModel.PLAYER:
                            msg = '闲';
                            break;
                        case game.BaccaratModel.TIE:
                            msg = '和';
                            break;
                        case game.BaccaratModel.BANKER:
                            msg = '庄';
                            break;
                        case game.BaccaratModel.PLAYERPAIR:
                            msg = '闲对';
                            break;
                        case game.BaccaratModel.BANKERPAIR:
                            msg = '庄对';
                            break;
                    }
                    msg += "\u4E0B\u6CE8\u9650\u989D\uFF1A" + game.NumberUtil.getSplitNumStr(limit.min[type]) + "-" + game.NumberUtil.getSplitNumStr(limit.max[type]);
                    this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, msg);
                }
                else {
                    this.addTotal(money, type);
                    this.notifyUI(BaccaratUICommands.BaccaratNotify_upDataBetNum, { chipMoney: game.NumberUtil.getSplitNumStr(money, 3), type: type, unMoney: this.getUnTotal(type) });
                }
            }
        };
        /** 添加一个下注步骤 */
        BaccaratMediator.prototype.addTotal = function (money, type) {
            if (money > 0 && type) {
                this.betNumArr.push({ money: money, type: type });
                this.balance -= money;
                var mySeatNum = game.BaccaratModel.getInstance().getMySeat(this.data);
                var newSeat = {};
                newSeat.seat = mySeatNum.seat;
                newSeat.data = {};
                newSeat.data.balance = this.balance;
                newSeat.data.nick = mySeatNum.data.nick;
                newSeat.data.type = mySeatNum.data.type;
                newSeat.data.user_id = mySeatNum.data.user_id;
                this.notifyUI(BaccaratUICommands.BaccaratNotify_mySeat, newSeat);
                this.sendNotification(game.NotifyConst.Notify_Baccarat_Bac, newSeat.data.balance);
            }
        };
        /** 获取某个区域下注步骤的总和 */
        BaccaratMediator.prototype.getArrTotal = function (arr, type) {
            if (arr.length == 0)
                return 0;
            else {
                var num = 0;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].type == type) {
                        num += arr[i].money;
                    }
                }
                return num;
            }
        };
        /** 获取所有下注步骤的总和 */
        BaccaratMediator.prototype.getAllTotal = function (arr) {
            if (arr.length == 0)
                return 0;
            else {
                var num = 0;
                num += this.getArrTotal(arr, game.BaccaratModel.PLAYER);
                num += this.getArrTotal(arr, game.BaccaratModel.BANKER);
                num += this.getArrTotal(arr, game.BaccaratModel.TIE);
                num += this.getArrTotal(arr, game.BaccaratModel.BANKERPAIR);
                num += this.getArrTotal(arr, game.BaccaratModel.PLAYERPAIR);
                return num;
            }
        };
        /** 获取某个区域未确定的下注 */
        BaccaratMediator.prototype.getUnTotal = function (type) {
            if (!type)
                return;
            else {
                var un = 0;
                var unSureArr = this.betNumArr.slice(this.sureIndex);
                un = this.getArrTotal(unSureArr, type);
                return un;
            }
        };
        /** 确认下注 */
        BaccaratMediator.prototype.sureFuc = function () {
            var _this = this;
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet')
                return;
            var unP = this.getUnTotal(game.BaccaratModel.PLAYER);
            var unB = this.getUnTotal(game.BaccaratModel.BANKER);
            var unT = this.getUnTotal(game.BaccaratModel.TIE);
            var unBP = this.getUnTotal(game.BaccaratModel.BANKERPAIR);
            var unPP = this.getUnTotal(game.BaccaratModel.PLAYERPAIR);
            if (unP + unB + unT + unBP + unPP == 0)
                return;
            var limit = game.ClubModel.getInstance().getLimit(this.data);
            var msg = '';
            game.CommonLoadingUI.getInstance().start(true);
            if (this.isLimit(game.BaccaratModel.PLAYER) || this.isLimit(game.BaccaratModel.BANKER) || this.isLimit(game.BaccaratModel.TIE) || this.isLimit(game.BaccaratModel.BANKERPAIR) || this.isLimit(game.BaccaratModel.PLAYERPAIR)) {
                this.cancelFuc();
                game.CommonLoadingUI.getInstance().stop();
            }
            else {
                var moneyObj = {};
                moneyObj.player = unP;
                moneyObj.tie = unT;
                moneyObj.banker = unB;
                moneyObj.banker_pair = unBP;
                moneyObj.player_pair = unPP;
                this.notifyUI(BaccaratUICommands.BaccaratNotify_okeyBet, false);
                game.BaccaratController.getInstance().reqBet(this.data, moneyObj).then(function () {
                    game.SoundPlayerNew.playEffect(game.SoundConst.bet_success);
                    _this.sureIndex = _this.betNumArr.length;
                    _this.notifyUI(BaccaratUICommands.BaccaratNotify_showGreenMsg, '下注成功');
                    _this.showSureNum();
                    game.CommonLoadingUI.getInstance().stop();
                }).catch(function () {
                    _this.betNumArr.splice(_this.sureIndex);
                    _this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, '下注失败');
                    _this.cancelFuc();
                    game.CommonLoadingUI.getInstance().stop();
                });
            }
        };
        /** 判断是否超出限额 */
        BaccaratMediator.prototype.isLimit = function (type) {
            var lastBet = game.BaccaratModel.getInstance().getLastBet(this.data)[type];
            lastBet = lastBet ? lastBet : 0;
            var typeBet = this.getUnTotal(type) + lastBet;
            var limit = game.ClubModel.getInstance().getLimit(this.data);
            if (this.getUnTotal(type)) {
                if (typeBet > limit.max[type] || (typeBet > 0 && typeBet < limit.min[type])) {
                    var msg = '';
                    switch (type) {
                        case game.BaccaratModel.PLAYER:
                            msg = '闲';
                            break;
                        case game.BaccaratModel.TIE:
                            msg = '和';
                            break;
                        case game.BaccaratModel.BANKER:
                            msg = '庄';
                            break;
                        case game.BaccaratModel.PLAYERPAIR:
                            msg = '闲对';
                            break;
                        case game.BaccaratModel.BANKERPAIR:
                            msg = '庄对';
                            break;
                    }
                    msg += "\u4E0B\u6CE8\u9650\u989D\uFF1A" + game.NumberUtil.getSplitNumStr(limit.min[type]) + "-" + game.NumberUtil.getSplitNumStr(limit.max[type]);
                    this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, msg);
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        /** 取消下注 */
        BaccaratMediator.prototype.cancelFuc = function () {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet')
                return;
            this.betNumArr.splice(this.sureIndex);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_cancelBet);
            // this.showSureFuc();
            this.playerSeats();
        };
        /** 显示已确认的下注 */
        BaccaratMediator.prototype.showSureFuc = function () {
            var sureArr = this.betNumArr.slice(0, this.sureIndex);
            var moneyObj = {};
            moneyObj.player = this.getArrTotal(sureArr, game.BaccaratModel.PLAYER);
            moneyObj.tie = this.getArrTotal(sureArr, game.BaccaratModel.TIE);
            moneyObj.banker = this.getArrTotal(sureArr, game.BaccaratModel.BANKER);
            moneyObj.player_pair = this.getArrTotal(sureArr, game.BaccaratModel.PLAYERPAIR);
            moneyObj.banker_pair = this.getArrTotal(sureArr, game.BaccaratModel.BANKERPAIR);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_showSureMoney, moneyObj);
        };
        /** 获取我的下注 */
        BaccaratMediator.prototype.showSureNum = function () {
            var lastBet = game.BaccaratModel.getInstance().getLastBet(this.data);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_showSureMoney, lastBet);
        };
        /** 获取其他人的下注 */
        BaccaratMediator.prototype.showOtherBet = function () {
            var otherBet = game.BaccaratModel.getInstance().getOtherBet(this.data);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_showOtherBet, otherBet);
        };
        /** 获取所有人的余额 */
        BaccaratMediator.prototype.showAllSeat = function () {
            var allSeat = game.BaccaratModel.getInstance().getAllSeat(this.data);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_showAllSeat, allSeat);
        };
        /** 获取所有人的下注 */
        BaccaratMediator.prototype.showAllBet = function () {
            var allBet = game.BaccaratModel.getInstance().getAllBet(this.data);
            this.notifyUI(BaccaratUICommands.BaccaratNotify_showAllBet, allBet);
        };
        /** 判断当前状态 */
        BaccaratMediator.prototype.judgeStage = function () {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            switch (stage) {
                case game.GameState.bet:
                    if (stage != this.lastStage) {
                        this.betNumArr = [];
                        this.sureIndex = 0;
                        this.otherBets = null;
                        this.notifyUI(BaccaratUICommands.BaccaratNotify_toggleStage, stage);
                        var stopBetTime = game.ClubModel.getInstance().getStopBetTime(this.data);
                        var betTime = game.ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
                        this.notifyUI(BaccaratUICommands.BaccaratNotify_setBetTime, [betTime, stopBetTime]);
                        this.notifyUI(BaccaratUICommands.BaccaratNotify_showGreenMsg, '已开局，请下注');
                        game.SoundPlayerNew.playEffect(game.SoundConst.start_bet);
                        this.showRoomInfo();
                    }
                    break;
                case game.GameState.deal_card:
                    if (stage != this.lastStage) {
                        this.notifyUI(BaccaratUICommands.BaccaratNotify_showRedMsg, '停止下注');
                        game.SoundPlayerNew.playEffect(game.SoundConst.stop_bet);
                        this.cancelFuc();
                        this.notifyUI(BaccaratUICommands.BaccaratNotify_toggleStage, stage);
                    }
                    this.checkCards();
                    break;
                case game.GameState.payout:
                    if (stage != this.lastStage) {
                        this.notifyUI(BaccaratUICommands.BaccaratNotify_toggleStage, stage);
                        this.checkCards();
                        this.judgeSoureStage();
                    }
                    break;
                case game.GameState.shuffle:
                    if (stage != this.lastStage) {
                        this.notifyUI(BaccaratUICommands.BaccaratNotify_toggleStage, stage);
                    }
                    break;
            }
            this.lastStage = stage;
        };
        /** desk数据有更新 */
        BaccaratMediator.prototype.deskIn = function () {
            var stage = game.BaccaratModel.getInstance().getDeskStage(this.data);
            switch (stage) {
                case game.GameState.bet:
                    if (stage != this.lastDeskStage) {
                    }
                    break;
                case game.GameState.deal_card:
                    if (stage != this.lastDeskStage) {
                    }
                    break;
                case game.GameState.payout:
                    if (stage != this.lastDeskStage) {
                        if (!this.isMy) {
                            var MyP = game.BaccaratModel.getInstance().getMyPayout(this.data);
                            var num = 0;
                            for (var key in MyP) {
                                if (MyP[key] > 0) {
                                    var sureArr = this.betNumArr.slice(0, this.sureIndex);
                                    var num_1 = game.NumberUtil.getSplitNumStr(MyP[key] - game.BaccaratModel.getInstance().getLastBet(this.data)[key], 3);
                                    this.notifyUI(BaccaratUICommands.BaccaratNotify_upDataBetNum, { chipMoney: num_1, type: key, unMoney: 0, isDealer: true });
                                }
                                num += MyP[key];
                            }
                            this.notifyUI(BaccaratUICommands.BaccaratNotify_showSureMoney, MyP);
                            if (num > 0) {
                                this.notifyUI(BaccaratUICommands.BaccaratNotify_myPayOutResults, num);
                                var isWinner = game.BaccaratModel.getInstance().getnaturalWinner(this.data);
                                if (isWinner) {
                                    this.notifyUI(BaccaratUICommands.BaccaratNotify_isWinner, isWinner);
                                }
                            }
                            //其他玩家的派彩
                            var otherP = game.BaccaratModel.getInstance().getOtherPayout(this.data);
                            for (var i = 0; i < otherP.length; i++) {
                                if (otherP[i].data > 0) {
                                    this.notifyUI(BaccaratUICommands.BaccaratNotify_otherPayOutResults, otherP);
                                    return;
                                }
                            }
                        }
                        else {
                            var newAll = {};
                            var allBet = game.BaccaratModel.getInstance().getAllBet(this.data);
                            for (var key in allBet) {
                                var bet = allBet[key];
                                var num = 0;
                                if (bet) {
                                    for (var key1 in bet) {
                                        num += bet[key1];
                                    }
                                }
                                newAll[key] = {};
                                newAll[key]['bet'] = num;
                            }
                            var allPay = game.BaccaratModel.getInstance().getAllPayout(this.data);
                            for (var key in allPay) {
                                var pay = allPay[key];
                                var num = 0;
                                if (pay) {
                                    for (var key1 in pay) {
                                        num += pay[key1];
                                    }
                                }
                                newAll[key]['pay'] = num;
                            }
                            var allB = 0;
                            var allP = 0;
                            for (var key in newAll) {
                                allB += newAll[key]['bet'];
                                allP += newAll[key]['pay'];
                            }
                            var isVisible = (allB == 0 && allP == 0) ? false : true;
                            this.notifyUI(BaccaratUICommands.BaccaratNotify_allPay, [newAll, allB - allP, isVisible]);
                        }
                    }
                    break;
                case game.GameState.shuffle:
                    if (stage != this.lastDeskStage) {
                    }
                    break;
            }
            this.lastDeskStage = stage;
        };
        /**
         * 在发牌状态中，检查是不是收到了新的牌
         */
        BaccaratMediator.prototype.checkCards = function () {
            var cards = game.ClubModel.getInstance().getRoomCards(this.data);
            var cardsOrder = game.ClubModel.getInstance().getRoomCardsOrder(this.data);
            //新发的有牌
            if (cardsOrder.length > this.lastCardsOder.length) {
                var cardName = "";
                for (var i_1 = 0; i_1 < cardsOrder.length; i_1++) {
                    cardName = cardsOrder[i_1];
                    //这张牌是新发的
                    if (this.lastCardsOder.indexOf(cardName) == -1) {
                        this.notifyUI(BaccaratUICommands.BaccaratNotify_receiveSingleCard, [cardName, cards[cardName]]);
                    }
                }
            }
            this.lastCardsOder = [];
            for (var i = 0; i < cardsOrder.length; i++) {
                this.lastCardsOder.push(cardsOrder[i]);
            }
        };
        /** 检查游戏结果 */
        BaccaratMediator.prototype.judgeSoureStage = function () {
            var score = game.ClubModel.getInstance().getRoomSource(this.data).score;
            this.notifyUI(BaccaratUICommands.BaccaratNotify_gameResults, score);
            this.judgeWinAreas(score);
        };
        /**
         * 判定judge区域
         * */
        BaccaratMediator.prototype.judgeWinAreas = function (score) {
            var _this = this;
            //判定闪烁的区域
            var judgeAreas = [];
            //新的声音的judgesound判定
            var judgeSound;
            if (score.player_pair) {
                judgeAreas.push(game.BaccaratModel.PLAYERPAIR);
            }
            if (score.banker_pair) {
                judgeAreas.push(game.BaccaratModel.BANKERPAIR);
            }
            if (score.tie) {
                judgeAreas.push(game.BaccaratModel.TIE);
                judgeSound = game.SoundConst.baccarat_tie_game;
                if (score.player_pair && score.banker_pair)
                    judgeSound = game.SoundConst.baccarat_tie_bpair_ppair;
                else if (score.player_pair)
                    judgeSound = game.SoundConst.baccarat_tie_ppair;
                else if (score.banker_pair)
                    judgeSound = game.SoundConst.baccarat_tie_bpair;
                else
                    judgeSound = game.SoundConst.baccarat_tie_game;
            }
            if (score.player > score.banker) {
                judgeAreas.push(game.BaccaratModel.PLAYER);
                if (score.player_pair && score.banker_pair)
                    judgeSound = game.SoundConst.baccarat_pwin_bpair_ppair;
                else if (score.player_pair)
                    judgeSound = game.SoundConst.baccarat_pwin_ppair;
                else if (score.banker_pair)
                    judgeSound = game.SoundConst.baccarat_pwin_bpair;
                else
                    judgeSound = game.SoundConst.baccarat_pwin;
            }
            if (score.player < score.banker) {
                judgeAreas.push(game.BaccaratModel.BANKER);
                judgeSound = game.SoundConst.baccarat_bwin;
                if (score.player_pair && score.banker_pair)
                    judgeSound = game.SoundConst.baccarat_bwin_bpair_ppair;
                else if (score.player_pair)
                    judgeSound = game.SoundConst.baccarat_bwin_ppair;
                else if (score.banker_pair)
                    judgeSound = game.SoundConst.baccarat_bwin_bpair;
                else
                    judgeSound = game.SoundConst.baccarat_bwin;
            }
            game.SoundPlayerNew.playEffect(game.SoundConst["banker_" + score.banker], 1, false, function () {
                game.SoundPlayerNew.playEffect(game.SoundConst["player_" + score.player], 1, false, function () {
                    game.SoundPlayerNew.playEffect(judgeSound, 1, false, function () {
                        // GameModel.getInstance().checkWinLoseCount();
                    }, _this, 2);
                }, _this, 2);
            }, this, 2);
            // this.notifyUI(BaccaratUICommands.showJudgeResult, judgeAreas);
        };
        /** 被锁定的点击回调 */
        BaccaratMediator.prototype.confirmBack = function () {
            if (game.GlobalConfig.isMobile) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
            }
            else {
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedClub);
            }
        };
        /** 刷新路数数据 */
        BaccaratMediator.prototype.updataRoadMap = function () {
            var roadData = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadData) {
                this.notifyUI(BaccaratUICommands.BaccaratNotify_roadMapData, roadData);
            }
        };
        /** 房间底部的文字 */
        BaccaratMediator.prototype.showRoomInfo = function () {
            if (!this.data)
                return;
            var seData = game.ClubModel.getInstance().getClubRoomsSetting(this.data);
            var soData = game.ClubModel.getInstance().getRoomSource(this.data);
            // 限额文字
            var limitMax = game.ClubModel.getInstance().getLimitMax(this.data);
            var limitMin = game.ClubModel.getInstance().getLimitMin(this.data);
            //荷官名
            var dealerName = game.ClubModel.getInstance().getDealerName(this.data);
            var msg = {};
            // 房间名
            msg.name = seData.room_name;
            // 局数
            msg.rounds = soData.round_statistics.rounds;
            // 局号
            msg.roundID = soData.round_id;
            // 限额
            msg.limitMax = limitMax;
            msg.limitMin = limitMin;
            if (!game.GlobalConfig.isMobile) {
                //荷官名
                msg.dealerName = dealerName;
            }
            this.notifyUI(BaccaratUICommands.BaccaratNotify_roomInfoMsg, msg);
        };
        /** 聊天相关 */
        BaccaratMediator.prototype.subchat = function () {
            var desk = game.BaccaratModel.getInstance().deskNum;
            this.chatTopic = "/chat_room/" + this.data + "/" + desk;
            var callBack = function (data) {
                this.onRoomChat(data);
            };
            // / chat_room / CB1_1000 / desk_id-- >
            game.NotifyController.getInstance().subChatRoom(this.chatTopic, callBack, this);
        };
        /**
         * 获取用户的基本信息，用户名和头像
         * 立即返回的值是已经缓存好的
         * 没有缓存的需要去服务器去，取到后，通过
         *  */
        BaccaratMediator.prototype.getUsersBaseInfo = function (ids) {
            if (!this.userArr) {
                this.userArr = new Array();
            }
            /**没有的ids */
            var noneIds = [];
            //对比那些没有，就去取
            for (var i = ids.length - 1; i >= 0; i--) {
                var has = false;
                for (var j = this.userArr.length - 1; j >= 0; j--) {
                    var info = this.userArr[j];
                    if (info.user_id == ids[i]) {
                        has = true;
                        break;
                    }
                }
                if (!has) {
                    noneIds.push(ids[i]);
                }
            }
            if (noneIds.length > 0) {
                game.PersonalInfoController.getInstance().getPlayerNameAndImg(noneIds);
            }
            return this.userArr;
        };
        /**获取单个id的基本信息 */
        BaccaratMediator.prototype.getUserBaseInfo = function (id) {
            if (!this.userArr) {
                this.userArr = new Array();
            }
            for (var j = this.userArr.length - 1; j >= 0; j--) {
                var info = this.userArr[j];
                if (info.user_id == id) {
                    return info;
                }
            }
            return null;
        };
        /**更新用户基本信息 */
        BaccaratMediator.prototype.updateUserBaseInfo = function (info) {
            if (!this.userArr) {
                this.userArr = new Array();
            }
            if (info) {
                for (var id in info) {
                    var player = info[id];
                    var base = new game.PlayerBaseInfo();
                    base.head = game.GlobalConfig.defaultUrl + player.avatar;
                    base.nick = player.nick;
                    base.user_id = +id;
                    this.userArr.push(base);
                }
            }
            //刷新所有人的头像和名字
            this.notifyUI(BaccaratUICommands.update_head, this.userArr);
        };
        /**收到本虚拟桌的聊天推送（总数据的数组） */
        BaccaratMediator.prototype.onRoomChat = function (records) {
            if (records && records.length) {
                var arr = JSON.parse(JSON.stringify(records));
                var ids = [];
                for (var i = 0; i < arr.length; i++) {
                    arr[i].isSelf = arr[i].user_id == +game.PersonalInfoModel.getInstance().user_id ? true : false;
                    if (arr[i].isSelf) {
                        arr[i].isHost = false;
                    }
                    else {
                        arr[i].isHost = arr[i].user_id == game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).creator ? true : false;
                    }
                    //座位相关
                    var seat = game.BaccaratModel.getInstance().getUserIDSeat(this.data, arr[i].user_id);
                    if (seat) {
                        arr[i].seat = seat.seat;
                        arr[i].sendPerson = seat.data.nick;
                    }
                    else {
                        arr[i].seat = '0';
                        arr[i].sendPerson = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).creator_name;
                    }
                    var base = this.getUserBaseInfo(arr[i].user_id);
                    if (base) {
                        arr[i].head = base.head;
                        arr[i].sendPerson = base.nick;
                    }
                    else {
                        ids.push(arr[i].user_id);
                    }
                }
                if (ids.length > 0) {
                    game.PersonalInfoController.getInstance().getPlayerNameAndImg(ids);
                }
                this.notifyUI(BaccaratUICommands.BaccaratNotify_roomChatMsg, arr);
            }
        };
        // public records: Array<topic.ChatRoom_Record> = [];
        // /** 判断是否有新聊天 */
        // public isNewChatMsg(records: Array<topic.ChatRoom_Record>)
        // {
        // 	this.records = records;
        // 	if (records && records.length) {
        // 		if (records[records.length - 1].user_id == +PersonalInfoModel.getInstance().user_id) {
        // 			this.onRoomChat(this.records)
        // 		}
        // 	}
        // 	if (this.chatMsgNum != records.length) {
        // 		this.notifyUI(BaccaratUICommands.BaccaratNotify_newChatMsg)
        // 	}
        // }
        BaccaratMediator.prototype.sendChat = function (str) {
            if (!str)
                return;
            if (this.chatTopic)
                game.NotifyController.getInstance().sendChatContent(this.chatTopic, str);
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        BaccaratMediator.prototype.dispose = function () {
            this.betNumArr = [];
            this.sureIndex = 0;
            this.lastStage = '';
            this.lastDeskStage = '';
            this.lastCardsOder = [];
            this.otherBets = null;
            this.removeRegister(game.Mediators.Mediator_BaccaratMediator.name);
            if (!game.GlobalConfig.isMobile) {
                game.MediatorManager.closeMediator(game.Mediators.Mediator_RoomInfo.name);
            }
            _super.prototype.dispose.call(this);
            // SoundPlayer.getInstance().playBgSound(SoundConst.BgSound_Hall);
            game.SoundPlayerNew.stopCurrentEffect();
            game.SoundPlayerNew.updateBgm();
        };
        return BaccaratMediator;
    }(game.BaseMediator));
    game.BaccaratMediator = BaccaratMediator;
    __reflect(BaccaratMediator.prototype, "game.BaccaratMediator");
})(game || (game = {}));
//# sourceMappingURL=BaccaratMediator.js.map