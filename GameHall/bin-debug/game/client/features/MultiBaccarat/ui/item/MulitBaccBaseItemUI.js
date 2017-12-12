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
    var MulitBaccBaseItemUI = (function (_super) {
        __extends(MulitBaccBaseItemUI, _super);
        function MulitBaccBaseItemUI() {
            var _this = _super.call(this) || this;
            /** 是否免拥 */
            _this.isHire = false;
            _this.unit = 34; //路数大格子宽
            _this.minUnit = _this.unit / 2; //路数小格子宽
            _this.bigGeH = 6; //路数大格子竖向个数
            /**------------------筹码相关-------------------------- */
            /** 当前选中的筹码 */
            _this.thisChip = 0;
            /** 下注步骤 */
            _this.betNumArr = [];
            /** 确认下注下标 */
            _this.sureIndex = 0;
            /** 用户余额 */
            _this.balance = 0;
            /** 发牌背景资源 */
            _this.pokerBackRes = 'mpoker_pic_back_png';
            /** 闲的总点数 */
            _this.playerPoint = 0;
            /** 庄的总点数 */
            _this.bankerPoint = 0;
            _this.setTimeNum = null;
            /** 最后一次房间状态 */
            _this.lastStage = '';
            /** 最后一次的已发牌数量 */
            _this.lastCardsOder = [];
            /**  timeout的保存*/
            _this.timeoutNum = null;
            _this.lastDeskStage = '';
            _this.percentWidth = 100;
            return _this;
        }
        // /**在item启用时 自动执行的初始化方法 */
        // public onAdd()
        // {
        // 	console.warn('1111');
        // 	this.roadMapWidth();
        // 	this.initCountdown();
        // 	this.initRoadMap();
        // 	this.setXY();
        // 	this.drawShp();
        // 	this.initMouseEvent(true);
        // 	this.initData();
        // 	CTween.get(this["ChipBg"], { loop: true }).to({ rotation: -360 }, 2000);
        // }
        // public initItem()
        // {
        // 	if (!this.data) return;
        // 	this.initData();
        // 	this.updataRoadData();
        // }
        /** 初始化数据 */
        MulitBaccBaseItemUI.prototype.initData = function () {
            if (this.data == "guide") {
                this.initRoadMap();
                this.bead_roadMap.setSimulationData();
                this.big_roadMap.setSimulationData();
                this.big_eye_roadMap.setSimulationData();
                this.small_roadMap.setSimulationData();
                this.cockroach_roadMap.setSimulationData();
            }
            if (!this.data || this.data == "guide")
                return;
            //静态资源
            this.roadMapWidth();
            this.initCountdown();
            this.initRoadMap();
            this.setXY();
            this.drawShp();
            this.initMouseEvent(true);
            game.CTween.get(this["ChipBg"], { loop: true }).to({ rotation: -360 }, 2000);
            //动态数据
            this.getCustomChips();
            this.settingIn();
            this.souresIn();
            this.deskIn();
            var isHire = game.ClubModel.getInstance().getRoomHire(this.data);
            this.showHire(isHire);
            this.updataRoadData();
        };
        /** 点击事件 */
        MulitBaccBaseItemUI.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                if (game.GlobalConfig.isMobile) {
                    //长按事件
                    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouBegin, this);
                    this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.clearTimer, this);
                    this.addEventListener(egret.TouchEvent.TOUCH_END, this.clearTimer, this);
                    this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.clearTimer, this);
                }
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                if (game.GlobalConfig.isMobile) {
                    this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouBegin, this);
                    this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.clearTimer, this);
                    this.removeEventListener(egret.TouchEvent.TOUCH_END, this.clearTimer, this);
                    this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.clearTimer, this);
                }
            }
        };
        /**  点击响应*/
        MulitBaccBaseItemUI.prototype.onTouchTap = function (evt) {
            switch (evt.target) {
                case this.playerBetZone:
                    this.reqBet(this.chipArr[this.thisChip], game.BaccaratModel.PLAYER);
                    break;
                case this.bankerBetZone:
                    this.reqBet(this.chipArr[this.thisChip], game.BaccaratModel.BANKER);
                    break;
                case this.tieBetZone:
                    this.reqBet(this.chipArr[this.thisChip], game.BaccaratModel.TIE);
                    break;
                case this.player_pairBetZone:
                    this.reqBet(this.chipArr[this.thisChip], game.BaccaratModel.PLAYERPAIR);
                    break;
                case this.banker_pairBetZone:
                    this.reqBet(this.chipArr[this.thisChip], game.BaccaratModel.BANKERPAIR);
                    break;
                case this.blueChip:
                    this.touchChips('blue');
                    break;
                case this.greenChip:
                    this.touchChips('green');
                    break;
                case this.redChip:
                    this.touchChips('red');
                    break;
                case this.sureBtn:
                    this.sureFuc();
                    break;
                case this.cancelBtn:
                    this.cancelFuc();
                    break;
                case this.bankerAskBtn:
                    this.bankerAsk();
                    break;
                case this.playerAskBtn:
                    this.playerAsk();
                    break;
                case this['editChipsBtn']:
                    game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_MulitBacc_EditChips, this.data);
                    break;
                case this.roomInfoBtn:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_RoomInfo, this.data);
                    break;
                case this.placeTopBtn:
                    this.placeTop();
                    // this.beFirst();
                    break;
                case this.placeBottomBtn:
                    this.placeBottom();
                    // this.beLast();
                    break;
            }
        };
        /** 长按事件 */
        MulitBaccBaseItemUI.prototype.onTouBegin = function (evt) {
            var _this = this;
            this.setTimeNum = setTimeout(function () {
                _this.touchGroup.visible = true;
                _this.setTimeNum = null;
            }, 1000);
        };
        /** 关闭长按回调 */
        MulitBaccBaseItemUI.prototype.clearTimer = function () {
            if (this.setTimeNum) {
                clearTimeout(this.setTimeNum);
            }
        };
        /** 获取和设置自定义筹码 */
        MulitBaccBaseItemUI.prototype.getCustomChips = function () {
            var _this = this;
            game.BaccaratController.getInstance().getChips(this.data).then(function (data) {
                if (data.chips && data.chips.length) {
                    _this.setCustomChips(data.chips);
                }
                else {
                    var setting = game.ClubModel.getInstance().getClubRoomsSetting(_this.data);
                    if (setting && setting.chips) {
                        _this.setCustomChips(setting.chips);
                    }
                }
            }).catch(function (data) {
                var setting = game.ClubModel.getInstance().getClubRoomsSetting(_this.data);
                if (setting && setting.chips) {
                    _this.setCustomChips(setting.chips);
                }
            });
        };
        /** desk数据有更新时触发 */
        MulitBaccBaseItemUI.prototype.deskIn = function () {
            this.getOthersBets();
            this.deskStage();
            if (!this.data)
                return;
            var stage = game.BaccaratModel.getInstance().getDesk(this.data).stage;
            if (stage != game.GameState.payout) {
                this.showSureNum();
            }
        };
        /** 视频源有更新时触发 */
        MulitBaccBaseItemUI.prototype.souresIn = function () {
            this.getRoundID();
            this.judgeStage();
            this.updataRoadData();
        };
        /** seting数据有更新时触发 */
        MulitBaccBaseItemUI.prototype.settingIn = function () {
            this.setLimit();
            this.getRoomName();
            this.getIsHire();
        };
        /** 初始化计时器 */
        MulitBaccBaseItemUI.prototype.initCountdown = function () {
        };
        /** 设置倒计时 */
        MulitBaccBaseItemUI.prototype.setCountdown = function (timeAll, overTime) {
            this.countdown.startTime(timeAll, overTime);
        };
        /** 获取房间名 */
        MulitBaccBaseItemUI.prototype.getRoomName = function () {
            this.roomName.text = game.ClubModel.getInstance().getRoomName(this.data);
        };
        /** 获取牌局号 */
        MulitBaccBaseItemUI.prototype.getRoundID = function () {
        };
        /** 获取是否免拥 */
        MulitBaccBaseItemUI.prototype.getIsHire = function () {
            // 免拥
            var isHire = game.ClubModel.getInstance().getRoomHire(this.data);
            if (isHire) {
                this["isHireImg"].source = "mine_pic_free_png";
            }
            else {
                this["isHireImg"].source = "mine_pic_free2_png";
            }
        };
        /** 获取限额 */
        MulitBaccBaseItemUI.prototype.setLimit = function () {
            // 限额文字
            var limitMax = game.ClubModel.getInstance().getLimitMax(this.data);
            var limitMin = game.ClubModel.getInstance().getLimitMin(this.data);
            this['limitAlebel'].text = "\u9650\u989D\uFF1A" + game.NumberUtil.getSplitNumStr(limitMin, 3) + " - " + game.NumberUtil.getSplitNumStr(limitMax, 3);
        };
        /** 获取路数数据 */
        MulitBaccBaseItemUI.prototype.updataRoadData = function () {
            var roadData = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadData) {
                this.setRoadMapData(roadData);
            }
        };
        /** 获取我的下注 */
        MulitBaccBaseItemUI.prototype.showSureNum = function () {
            var lastBet = game.BaccaratModel.getInstance().getLastBet(this.data);
            this.showSureMoney(lastBet);
        };
        /** 判断当前状态 */
        MulitBaccBaseItemUI.prototype.judgeStage = function () {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            switch (stage) {
                case game.GameState.bet:
                    if (stage != this.lastStage) {
                        this.showPercentClicle(0, 0, 0);
                        this.hiddenStage();
                        this.showSureMoney({ player: 0, tie: 0, banker: 0, player_pair: 0, banker_pair: 0 });
                        this.cancelBet();
                        this.toggleBetImg(true);
                        this.playerPoint = 0;
                        this.bankerPoint = 0;
                        var betTime = game.ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
                        var stopBetTime = game.ClubModel.getInstance().getStopBetTime(this.data);
                        this.setCountdown(betTime, stopBetTime);
                        if (this["shuffleLabel"].visible) {
                            this["shuffleLabel"].visible = false;
                        }
                        this.betNumArr = [];
                        this.sureIndex = 0;
                        this.showMsg('已开局，请下注', 'green');
                    }
                    break;
                case game.GameState.deal_card:
                    if (stage != this.lastStage) {
                        this.hiddenStage();
                        // this.isMoveOkey = false;
                        this.startMoVeclip(true);
                        this.showMsg('停止下注', 'red');
                        this.cancelFuc();
                        this.countdown.startPayOut();
                    }
                    // if (this.isMoveOkey) {
                    this.checkCards();
                    // }
                    break;
                case game.GameState.payout:
                    if (stage != this.lastStage) {
                        this.dealCardGroup.visible = true;
                        game.CTween.removeTweens(this['blueDealCard']);
                        game.CTween.removeTweens(this['redDealCard']);
                        this['blueDealCard'].x = 0;
                        this['redDealCard'].x = (game.StageUtil.width - 40) / 2;
                        this.checkCards();
                        this.judgeSoureStage();
                        this.countdown.startPayOut();
                    }
                    break;
                case game.GameState.shuffle:
                    if (stage != this.lastStage) {
                        this.hiddenStage();
                        this["shuffleLabel"].visible = true;
                        this.countdown.startShuffle();
                    }
                    break;
            }
            this.lastStage = stage;
        };
        /**
         * 在发牌状态中，检查是不是收到了新的牌
         */
        MulitBaccBaseItemUI.prototype.checkCards = function () {
            var cards = game.ClubModel.getInstance().getRoomCards(this.data);
            var cardsOrder = game.ClubModel.getInstance().getRoomCardsOrder(this.data);
            //新发的有牌
            if (cardsOrder.length > this.lastCardsOder.length) {
                var cardName = "";
                for (var i_1 = 0; i_1 < cardsOrder.length; i_1++) {
                    cardName = cardsOrder[i_1];
                    //这张牌是新发的
                    if (this.lastCardsOder.indexOf(cardName) == -1) {
                        this.receiveSingleCard(cardName, cards[cardName]);
                    }
                }
            }
            this.lastCardsOder = [];
            for (var i = 0; i < cardsOrder.length; i++) {
                this.lastCardsOder.push(cardsOrder[i]);
            }
        };
        /** 点击筹码更新金额 */
        MulitBaccBaseItemUI.prototype.touchChips = function (type) {
            this["ChipBg"].visible = true;
        };
        /** desk数据有更新 */
        MulitBaccBaseItemUI.prototype.deskStage = function () {
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
                        var MyP = game.BaccaratModel.getInstance().getMyPayout(this.data);
                        var num = 0;
                        for (var key in MyP) {
                            if (MyP[key] > 0) {
                                var sureArr = this.betNumArr.slice(0, this.sureIndex);
                                var num_1 = game.NumberUtil.getSplitNumStr(MyP[key] - game.BaccaratModel.getInstance().getLastBet(this.data)[key], 3);
                                this.updaBetNum(num_1, key, '0', true);
                            }
                            num += MyP[key];
                        }
                        this.showSureMoney(MyP);
                        if (num > 0) {
                            this.showMyPayOut(num);
                            game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_MulitBacc_OkeyBetMsg, ['payout', num, this.data]);
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
        /** 请求下注 */
        MulitBaccBaseItemUI.prototype.reqBet = function (money, type) {
            if (!type)
                return;
            var num = game.ClubModel.getInstance().getOtherRoomCardNum();
            if (num <= 0) {
                this.showMsg("房卡不足请联系房主补充房卡", 'red');
                return;
            }
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet') {
                this.showMsg('前一局结算中，请稍后...', 'red');
                return;
            }
            ;
            if (money <= 0)
                return;
            //余额不足
            var mySeatNum = game.BaccaratModel.getInstance().getMySeat(this.data);
            var unSureArr = this.betNumArr.slice(this.sureIndex);
            if (money + this.getAllTotal(unSureArr) > mySeatNum.data.balance) {
                this.showMsg('您的筹码余额不足', 'red');
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
                    this.showMsg(msg, 'red');
                }
                else {
                    this[type + "BetNumGroup"].visible = false;
                    this.addTotal(money, type);
                    this.updaBetNum(game.NumberUtil.getSplitNumStr(money, 3), type, game.NumberUtil.getSplitNumStr(this.getArrTotal(this.betNumArr, type), 3));
                }
            }
        };
        /** 检查游戏结果 */
        MulitBaccBaseItemUI.prototype.judgeSoureStage = function () {
            var score = game.ClubModel.getInstance().getRoomSource(this.data).score;
            this.gameResults(score);
        };
        /** 确认下注 */
        MulitBaccBaseItemUI.prototype.sureFuc = function () {
            var _this = this;
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet')
                return;
            var card = game.ClubModel.getInstance().getOtherRoomCardNum();
            if (card <= 0) {
                this.showMsg("房卡不足请联系房主补充房卡", 'red');
                this.cancelBet();
                return;
            }
            var unP = this.getUnTotal(game.BaccaratModel.PLAYER);
            var unB = this.getUnTotal(game.BaccaratModel.BANKER);
            var unT = this.getUnTotal(game.BaccaratModel.TIE);
            var unBP = this.getUnTotal(game.BaccaratModel.BANKERPAIR);
            var unPP = this.getUnTotal(game.BaccaratModel.PLAYERPAIR);
            var num = 0;
            num = unP + unB + unT + unBP + unPP;
            if (num == 0)
                return;
            var limit = game.ClubModel.getInstance().getLimit(this.data);
            var msg = '';
            if (this.isLimit(game.BaccaratModel.PLAYER) || this.isLimit(game.BaccaratModel.BANKER) || this.isLimit(game.BaccaratModel.TIE) || this.isLimit(game.BaccaratModel.BANKERPAIR) || this.isLimit(game.BaccaratModel.PLAYERPAIR)) {
                this.cancelFuc();
            }
            else {
                var moneyObj = {};
                moneyObj.player = unP;
                moneyObj.tie = unT;
                moneyObj.banker = unB;
                moneyObj.banker_pair = unBP;
                moneyObj.player_pair = unPP;
                this.updataBtn(false);
                game.BaccaratController.getInstance().reqBet(this.data, moneyObj).then(function () {
                    _this.sureIndex = _this.betNumArr.length;
                    _this.cancelBet();
                    _this.showMsg('下注成功', 'green');
                    _this.showSureFuc();
                    game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_MulitBacc_OkeyBetMsg, ['bet', num, _this.data]);
                }).catch(function () {
                    _this.betNumArr.splice(_this.sureIndex);
                    _this.showMsg('下注失败', 'red');
                    _this.cancelFuc();
                });
            }
        };
        /** 判断是否超出限额 */
        MulitBaccBaseItemUI.prototype.isLimit = function (type) {
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
                    this.showMsg(msg, 'red');
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
        MulitBaccBaseItemUI.prototype.cancelFuc = function () {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet')
                return;
            this.betNumArr.splice(this.sureIndex);
            this.cancelBet();
            this.showSureFuc();
            this.getOthersBets();
            // this.playerSeats();
        };
        /** 显示已确认的下注 */
        MulitBaccBaseItemUI.prototype.showSureFuc = function () {
            var sureArr = this.betNumArr.slice(0, this.sureIndex);
            var moneyObj = {};
            moneyObj.player = this.getArrTotal(sureArr, game.BaccaratModel.PLAYER);
            moneyObj.tie = this.getArrTotal(sureArr, game.BaccaratModel.TIE);
            moneyObj.banker = this.getArrTotal(sureArr, game.BaccaratModel.BANKER);
            moneyObj.player_pair = this.getArrTotal(sureArr, game.BaccaratModel.PLAYERPAIR);
            moneyObj.banker_pair = this.getArrTotal(sureArr, game.BaccaratModel.BANKERPAIR);
            this.showSureMoney(moneyObj);
            this.getOthersBets();
        };
        /** 设置下注区域的人数和余额 */
        MulitBaccBaseItemUI.prototype.getOthersBets = function () {
            var oBets = game.BaccaratModel.getInstance().getOthersBets(this.data);
            if (oBets) {
                this.setOthersBets(oBets);
            }
        };
        /** 获取所有下注步骤的总和 */
        MulitBaccBaseItemUI.prototype.getAllTotal = function (arr) {
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
        /** 获取某个区域下注步骤的总和 */
        MulitBaccBaseItemUI.prototype.getArrTotal = function (arr, type) {
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
        /** 获取某个区域未确定的下注 */
        MulitBaccBaseItemUI.prototype.getUnTotal = function (type) {
            if (!type)
                return;
            else {
                var un = 0;
                var unSureArr = this.betNumArr.slice(this.sureIndex);
                un = this.getArrTotal(unSureArr, type);
                return un;
            }
        };
        /** 添加一个下注步骤 */
        MulitBaccBaseItemUI.prototype.addTotal = function (money, type) {
            if (money > 0 && type) {
                this.betNumArr.push({ money: money, type: type });
                // this.balance -= money;
            }
        };
        /** item置顶 */
        MulitBaccBaseItemUI.prototype.placeTop = function () {
            if (!this.data)
                return;
            var arr = game.ClubModel.getInstance().multiAllRoomList;
            var index = arr.indexOf(this.data);
            if (index != -1) {
                var roomID = game.ClubModel.getInstance().multiAllRoomList.splice(index, 1);
                game.ClubModel.getInstance().multiAllRoomList.unshift(roomID[0]);
                game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_MulitUpDataList);
            }
        };
        /** item置底 */
        MulitBaccBaseItemUI.prototype.placeBottom = function () {
            if (!this.data)
                return;
            var arr = game.ClubModel.getInstance().multiAllRoomList;
            var index = arr.indexOf(this.data);
            if (index != -1) {
                var roomID = game.ClubModel.getInstance().multiAllRoomList.splice(index, 1);
                game.ClubModel.getInstance().multiAllRoomList.push(roomID[0]);
                game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_MulitUpDataList);
            }
        };
        /*----------------------------------------UI设置---------------------------------------------------------- */
        /** 显示是否免拥 */
        MulitBaccBaseItemUI.prototype.showHire = function (b) {
            if (b) {
                this['bankerOdds1'].visible = true;
                this['bankerOdds2'].visible = false;
            }
            else {
                this['bankerOdds1'].visible = false;
                this['bankerOdds2'].visible = true;
            }
        };
        /** 更新中间显示的文字 */
        MulitBaccBaseItemUI.prototype.upDataConterMsg = function (type, text) {
        };
        /** 确认和取消按钮的开启或禁用 */
        MulitBaccBaseItemUI.prototype.updataBtn = function (b) {
            this.updataSureBtn(b);
            this.updataCancelBtn(b);
        };
        /** 弹出（红、绿）提示框 */
        MulitBaccBaseItemUI.prototype.showMsg = function (msg, color) {
        };
        /** 隐藏跟房间状态有关的东西,恢复房间默认样式 */
        MulitBaccBaseItemUI.prototype.hiddenStage = function () {
            this.countdown.startPayOut();
            this.startMoVeclip(false);
            this["payOutGroup"].visible = false;
            this.cancelBet();
            this.toggleDeaCardImg();
        };
        /** 更新下注区金额和显示动画 */
        MulitBaccBaseItemUI.prototype.updaBetNum = function (chipMonney, type, unMoney, isDealer) {
            if (isDealer === void 0) { isDealer = false; }
            this.newFlyChip(chipMonney, type, unMoney, isDealer);
        };
        /** 新的飞筹码动画 */
        MulitBaccBaseItemUI.prototype.newFlyChip = function (chipMoney, type, unMoney, isDealer) {
            var _this = this;
            if (isDealer === void 0) { isDealer = false; }
            var group;
            var numY = 0;
            group = this[type + "BetZone"];
            switch (type) {
                case game.BaccaratModel.TIE:
                case game.BaccaratModel.PLAYERPAIR:
                case game.BaccaratModel.BANKERPAIR:
                    numY = this["playerBetZone"].height;
                    break;
            }
            var chip = new game.betChip(chipMoney);
            chip.x = game.StageUtil.width / 2 + this['centerMsgGroup'].width - chip.width / 2;
            chip.y = 0 - this["msgGroup"].height;
            // if (isDealer) {
            //     chip.y -= 200;
            // }
            this.betGroup.addChild(chip);
            if (isDealer) {
                game.CTween.get(chip).to({ x: group.x + group.width / 2 - chip.width / 2, y: numY + group.y + group.height / 2 - chip.height / 2 }, 500).call(function () {
                    chip.parent.removeChild(chip);
                    game.CTween.removeTweens(chip);
                });
            }
            else {
                this.updataBtn(true);
                game.CTween.get(chip).to({ x: group.x + group.width / 2 - chip.width / 2, y: numY + group.y + group.height / 2 - chip.height / 2 }, 500).call(function () {
                    _this.disposeChip(chip, unMoney, type);
                    game.CTween.removeTweens(chip);
                }, this);
            }
        };
        /** 飞筹码动画执行完的回调 */
        MulitBaccBaseItemUI.prototype.disposeChip = function (item, unMoney, type) {
            item.parent.removeChild(item);
            this.betUnSureNum(unMoney, type);
        };
        /** 设置下注区域的人数和余额 */
        MulitBaccBaseItemUI.prototype.setOthersBets = function (bets) {
            if (bets) {
                // 闲
                this["playerUNum"].text = bets.player.users;
                this["playerAmount"].text = game.NumberUtil.getSplitNumStr(bets.player.amount, 3);
                // 庄
                this["bankerUNum"].text = bets.banker.users;
                this["bankerAmount"].text = game.NumberUtil.getSplitNumStr(bets.banker.amount, 3);
                // 和
                this["tieUNum"].text = bets.tie.users;
                this["tieAmount"].text = game.NumberUtil.getSplitNumStr(bets.tie.amount, 3);
                // 闲对
                this["playerPairUnum"].text = bets.player_pair.users;
                this["playerPairAmount"].text = game.NumberUtil.getSplitNumStr(bets.player_pair.amount, 3);
                // 庄对
                this["bankerPairUnum"].text = bets.banker_pair.users;
                this["bankerPairAmount"].text = game.NumberUtil.getSplitNumStr(bets.banker_pair.amount, 3);
                //显示下注百分比
                var allAmount = 0;
                allAmount += bets.player.amount;
                allAmount += bets.banker.amount;
                allAmount += bets.tie.amount;
                var playerAmount = 0;
                playerAmount += bets.player.amount;
                var bankerAmount = 0;
                bankerAmount += bets.banker.amount;
                var tieAmount = 0;
                tieAmount += bets.tie.amount;
                var bluePercent = Math.round(playerAmount / allAmount * 10000 / 100);
                var bluePercentNew = isNaN(bluePercent) ? 0 : bluePercent;
                var redPercent = Math.round(bankerAmount / allAmount * 10000 / 100);
                var redPercentNew = isNaN(redPercent) ? 0 : redPercent;
                var greenPercentNew = 0;
                if (bluePercentNew > 0 || redPercentNew > 0) {
                    greenPercentNew = 100 - bluePercentNew - redPercentNew;
                }
                else if (bluePercentNew == 0 && redPercentNew == 0 && tieAmount > 0) {
                    greenPercentNew = 100 - bluePercentNew - redPercentNew;
                }
                this['bluePercent'].text = bluePercentNew + '%';
                this['redPercent'].text = redPercentNew + '%';
                this['greenPercent'].text = greenPercentNew + '%';
                this.showPercentClicle(bluePercentNew, redPercentNew, greenPercentNew);
            }
        };
        /** 设置下注区域百分比的圆弧 */
        MulitBaccBaseItemUI.prototype.showPercentClicle = function (blue, red, green) {
            this.shepClicle('blue', blue, 0x0088ff);
            this.shepClicle('red', red, 0xff1211);
            this.shepClicle('green', green, 0x1ebf4b);
        };
        /** 绘制下注区百分比圆弧  */
        MulitBaccBaseItemUI.prototype.shepClicle = function (color, numberPercent, lineColor) {
        };
        /** 更新筹码列表 */
        MulitBaccBaseItemUI.prototype.setCustomChips = function (arr) {
            if (arr && arr.length) {
                this.chipArr = arr;
                this["blueChipNum"].text = game.NumberUtil.getSplitNumStr(arr[0], 3);
                this["greenChipNum"].text = game.NumberUtil.getSplitNumStr(arr[1], 3);
                this["redChipNum"].text = game.NumberUtil.getSplitNumStr(arr[2], 3);
            }
        };
        /** 切换发牌区的图片显示 */
        MulitBaccBaseItemUI.prototype.toggleDeaCardImg = function () {
            //默认样式
            this.playCardNum.font = 'game_share_blue_260_fnt';
            this['playerBlueBg'].source = 'opencard_pic_blue_png';
            this.bankerCardNum.font = 'game_share_red_260_fnt';
            this['bankerRedBg'].source = 'opencard_pic_red_png';
            this['tieBetBg'].visible = false;
            this.lightningE.visible = true;
            this['tiePayout'].visible = false;
        };
        /** 取消下注或者隐藏未确定下注 */
        MulitBaccBaseItemUI.prototype.cancelBet = function () {
            this.betUnSureNum('0', game.BaccaratModel.PLAYER);
            this.betUnSureNum('0', game.BaccaratModel.TIE);
            this.betUnSureNum('0', game.BaccaratModel.BANKER);
            this.betUnSureNum('0', game.BaccaratModel.PLAYERPAIR);
            this.betUnSureNum('0', game.BaccaratModel.BANKERPAIR);
            this.updataBtn(false);
        };
        /** 未确定的下注金额 */
        MulitBaccBaseItemUI.prototype.betUnSureNum = function (unMoney, type) {
            if (!type)
                return;
            var group;
            var numGroup;
            var imgBg;
            group = this[type + "UnSureG"];
            numGroup = this[type + "UnSureNum"];
            imgBg = this[type + "BetBg"];
            if (!unMoney || unMoney == '0') {
                if (group.visible) {
                    group.visible = false;
                }
                if (numGroup.text != '0') {
                    numGroup.text = '0';
                }
                if (imgBg.visible) {
                    imgBg.visible = false;
                }
            }
            else {
                if (!group.visible) {
                    group.visible = true;
                }
                if (numGroup.text != unMoney) {
                    numGroup.text = unMoney;
                }
                if (!imgBg.visible) {
                    imgBg.visible = true;
                }
                if (!this.sureBtn.enabled) {
                    group.visible = false;
                }
            }
        };
        /** 显示已确定的下注框 */
        MulitBaccBaseItemUI.prototype.showSureMoney = function (monneyObj) {
            if (!monneyObj)
                return;
            var num = 0;
            for (var key in monneyObj) {
                if (monneyObj[key]) {
                    num += monneyObj[key];
                    this[key + "BetNumGroup"].visible = true;
                    this[key + "BetNum"].text = game.NumberUtil.getSplitNumStr(monneyObj[key], 3);
                    var source = this[key + "Img"].source;
                    var NumSource = this[key + "NumImg"].source;
                    if (key == 'player') {
                        this[key + "Img"].source = 'baccarat_pic_player_b_png';
                        this[key + "NumImg"].source = 'bettingarea_pic_ratiop2_png';
                    }
                    else if (key == 'tie') {
                        this[key + "Img"].source = 'baccarat_pic_tie_g_png';
                        this[key + "NumImg"].source = 'bettingarea_pic_ratiot2_png';
                    }
                    else if (key == 'banker') {
                        this[key + "Img"].source = 'baccarat_pic_banker_r_png';
                        this[key + "NumImg"].source = 'bettingarea_pic_ratiob2_png';
                    }
                    else if (key == 'player_pair') {
                        this[key + "Img"].source = 'baccarat_pic_playerpair_b_png';
                        this[key + "NumImg"].source = 'bettingarea_pic_ratiopp2_png';
                    }
                    else if (key == 'banker_pair') {
                        this[key + "Img"].source = 'baccarat_pic_bankerpair_r_png';
                        this[key + "NumImg"].source = 'bettingarea_pic_ratiobp2_png';
                    }
                }
                else {
                    this[key + "BetNumGroup"].visible = false;
                    this[key + "BetNum"].text = 0;
                    this[key + "Img"].source = this[key + "Img"].source.replace(/_r.png|_b.png|_g.png/, '_y.png');
                }
            }
            if (num > 0) {
                this.upDataConterMsg(2, "\u5DF2\u4E0B\u6CE8\uFF1A" + game.NumberUtil.getSplitNumStr(num, 3));
            }
            else {
                this.upDataConterMsg(1, '未下注');
            }
        };
        /**
         * 新收到一张牌
         */
        MulitBaccBaseItemUI.prototype.receiveSingleCard = function (name, num) {
            var _this = this;
            this.cancelBet();
            game.DebugUtil.debug("发一张牌:" + name);
            var card;
            card = this[name];
            card.visible = true;
            card.source = this.pokerBackRes;
            card.alpha = 1;
            var x0 = card.x;
            var y0 = card.y;
            card.scaleX = 0.5;
            var distancex = 40, distancey = 40;
            if (name.indexOf("3") != -1) {
                distancex = 25;
                distancey = 120;
                if (game.GlobalConfig.isMobile) {
                    if (name == 'banker_3') {
                        x0 = 0;
                        y0 = 130;
                    }
                    else if (name == 'player_3') {
                        x0 = 185;
                        y0 = 0;
                    }
                }
                else {
                    if (name == 'banker_3') {
                        x0 = 0;
                        y0 = 75;
                    }
                    else if (name == 'player_3') {
                        x0 = 110;
                        y0 = 0;
                    }
                }
            }
            game.CTween.get(card)
                .to({ scaleX: 0, scaleY: 1.1, x: x0 - distancex, y: y0 - distancey }, 300)
                .call(function () { card.source = "mpoker_pic_" + num + "_png"; })
                .to({ scaleX: 1, scaleY: 1, x: x0, y: y0 }, 300, egret.Ease.elasticOut)
                .call(function () {
                if (name.indexOf("player") > -1) {
                    _this.playerPoint += game.BaccaratModel.getInstance().getPoint(num);
                    _this.playerPoint = _this.playerPoint % 10;
                    _this.playCardNum.text = _this.playerPoint + "";
                }
                else {
                    _this.bankerPoint += game.BaccaratModel.getInstance().getPoint(num);
                    _this.bankerPoint = _this.bankerPoint % 10;
                    _this.bankerCardNum.text = _this.bankerPoint + "";
                }
                game.CTween.removeTweens(card);
            }, this);
        };
        // /** 动画是否播放完毕 */
        // public _isMoveOkey: boolean = false;
        // public get isMoveOkey(): boolean
        // {
        //     return this._isMoveOkey;
        // }
        // public set isMoveOkey(b: boolean)
        // {
        //     this._isMoveOkey = b;
        //     if (b) {
        //         this.lastCardsOder = [];
        //         this.checkCards();
        //     }
        // }
        /** 播放发牌闪电动画和界面  */
        MulitBaccBaseItemUI.prototype.startMoVeclip = function (b) {
            var _this = this;
            this["player_1"].source = this.pokerBackRes;
            this["player_1"].visible = false;
            this["player_2"].source = this.pokerBackRes;
            this["player_2"].visible = false;
            this["player_3"].source = this.pokerBackRes;
            this["player_3"].visible = false;
            this["banker_1"].source = this.pokerBackRes;
            this["banker_1"].visible = false;
            this["banker_2"].source = this.pokerBackRes;
            this["banker_2"].visible = false;
            this["banker_3"].source = this.pokerBackRes;
            this["banker_3"].visible = false;
            this.playCardNum.text = '0';
            this.bankerCardNum.text = '0';
            this.lightningE.visible = false;
            this['tiePayout'].visible = false;
            this.dealCardGroup.visible = false;
            if (b) {
                this.countdown.startPayOut();
                this['blueDealCard'].x = (-this['blueDealCard'].width);
                this['redDealCard'].x = (game.StageUtil.width - 40);
                this.dealCardGroup.visible = b;
                game.CTween.get(this['blueDealCard']).to({ x: 0 }, 1000).call(function () {
                    _this.lightningE.visible = true;
                    _this.lightningE.play();
                    // this.isMoveOkey = true;
                }).wait(1000).call(function () {
                    _this.lightningE.stop();
                    _this.lightningE.visible = false;
                    _this['blueDealCard'].x = 0;
                    _this['redDealCard'].x = (game.StageUtil.width - 40) / 2;
                    game.CTween.removeTweens(_this['blueDealCard']);
                });
                game.CTween.get(this['redDealCard']).to({ x: (game.StageUtil.width - 40) / 2 }, 1000).call(function () {
                    game.CTween.removeTweens(_this['redDealCard']);
                }, this);
            }
            else {
                this.lightningE.stop();
                this.lightningE.visible = false;
                this['tiePayout'].visible = false;
                game.CTween.removeTweens(this["tieDealCard"]);
            }
        };
        /** 设置确定按钮的样式 */
        MulitBaccBaseItemUI.prototype.updataSureBtn = function (b) {
            if (b) {
                this.sureBtn.setState = 'up';
                this.sureBtn.enabled = true;
            }
            else {
                this.sureBtn.setState = 'disabled';
                this.sureBtn.enabled = false;
            }
        };
        /** 设置取消按钮的样式 */
        MulitBaccBaseItemUI.prototype.updataCancelBtn = function (b) {
            if (b) {
                this.cancelBtn.setState = 'up';
                this.cancelBtn.enabled = true;
            }
            else {
                this.cancelBtn.setState = 'disabled';
                this.cancelBtn.enabled = false;
            }
        };
        /** 游戏结果（样式改变） */
        MulitBaccBaseItemUI.prototype.gameResults = function (score) {
            var _this = this;
            if (!score)
                return;
            this.lightningE.visible = false;
            var player = score.player;
            var banker = score.banker;
            var results = [];
            if (player > banker) {
                results.push('player');
            }
            else if (player < banker) {
                results.push('banker');
            }
            if (score.player_pair)
                results.push('player_pair');
            if (score.tie)
                results.push('tie');
            if (score.banker_pair)
                results.push('banker_pair');
            this.toggleBetImg(false);
            //闲赢
            if (results.indexOf('player') != -1) {
                this.bankerCardNum.font = 'game_share_gray_260_fnt';
                this['bankerRedBg'].source = 'opencard_pic_gray_png';
                // this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
                this.playCardNum.font = 'game_share_blue_260_fnt';
                this['playerBlueBg'].source = 'opencard_pic_blue_png';
                this["playerImg"].source = this["playerImg"].source.replace(/_y.png|_w.png/, '_b.png');
                this["playerNumImg"].source = this["playerNumImg"].source.replace(/pb1.png|pb3.png/, 'p2.png');
                this['playerBetBg'].visible = true;
                for (var i = 0; i < 3; i++) {
                    if (this["banker_" + (i + 1)].visible) {
                        this["banker_" + (i + 1)].alpha = 0.3;
                    }
                }
            }
            //和赢
            if (results.indexOf('tie') != -1) {
                this['tieBetBg'].visible = true;
                this.bankerCardNum.font = 'game_share_gray_260_fnt';
                this['bankerRedBg'].source = 'opencard_pic_gray_png';
                // this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
                this.playCardNum.font = 'game_share_gray_260_fnt';
                this['playerBlueBg'].source = 'opencard_pic_gray_png';
                // this['playPayImg'].source = 'baccarat_pic_pl2_png';
                this["tieImg"].source = this["tieImg"].source.replace(/_y.png|_w.png/, '_g.png');
                this["tieNumImg"].source = this["tieNumImg"].source.replace(/1.png|3.png/, '2.png');
                this['tiePayout'].visible = true;
                this["tieDealCardTxt"].visible = false;
                this["tieDealCardTxt"].alpha = 1;
                this["tieDealCardTxt"].visible = true;
                game.CTween.get(this["tieDealCard"], { loop: true }).to({ rotation: -360 }, 2000).call(function () {
                    game.CTween.removeTweens(_this['tieDealCard']);
                }, this);
                for (var i = 0; i < 3; i++) {
                    if (this["player_" + (i + 1)].visible) {
                        this["player_" + (i + 1)].alpha = 0.3;
                    }
                }
                for (var i = 0; i < 3; i++) {
                    if (this["banker_" + (i + 1)].visible) {
                        this["banker_" + (i + 1)].alpha = 0.3;
                    }
                }
            }
            else {
                this['tieBetBg'].visible = false;
                this['tiePayout'].visible = false;
            }
            //庄赢
            if (results.indexOf('banker') != -1) {
                this.playCardNum.font = 'game_share_gray_260_fnt';
                this['playerBlueBg'].source = 'opencard_pic_gray_png';
                // this['playPayImg'].source = 'baccarat_pic_pl2_png';
                this.bankerCardNum.font = 'game_share_red_260_fnt';
                this['bankerRedBg'].source = 'opencard_pic_red_png';
                // this['bankerPayImg'].source = 'baccarat_pic_bk1_png';
                this["bankerImg"].source = this["bankerImg"].source.replace(/_y.png|_w.png/, '_r.png');
                this["bankerNumImg"].source = this["bankerNumImg"].source.replace(/pb1.png|pb3.png/, 'b2.png');
                this["bankerOdds2"].source = 'bettingarea_pic_ratiob2_2_png';
                this['bankerBetBg'].visible = true;
                for (var i = 0; i < 3; i++) {
                    if (this["player_" + (i + 1)].visible) {
                        this["player_" + (i + 1)].alpha = 0.3;
                    }
                }
            }
            //闲对赢
            if (results.indexOf('player_pair') != -1) {
                this["player_pairImg"].source = this["player_pairImg"].source.replace(/_y.png|_w.png/, '_b.png');
                this["player_pairNumImg"].source = this["player_pairNumImg"].source.replace(/oppbp1.png|oppbp3.png/, 'opp2.png');
                this['player_pairBetBg'].visible = true;
            }
            //庄对赢
            if (results.indexOf('banker_pair') != -1) {
                this["banker_pairImg"].source = this["banker_pairImg"].source.replace(/_y.png|_w.png/, '_r.png');
                this["banker_pairNumImg"].source = this["banker_pairNumImg"].source.replace(/oppbp1.png|oppbp3.png/, 'obp2.png');
                this['banker_pairBetBg'].visible = true;
            }
            this.playCardNum.text = player + '';
            this.bankerCardNum.text = banker + '';
        };
        /** 切换下注区的图片显示 */
        MulitBaccBaseItemUI.prototype.toggleBetImg = function (b) {
            //默认样式
            if (b) {
                this["playerImg"].source = 'baccarat_pic_player_y_png';
                this["playerNumImg"].source = 'bettingarea_pic_ratiopb1_png';
                this["bankerImg"].source = 'baccarat_pic_banker_y_png';
                this["bankerNumImg"].source = 'bettingarea_pic_ratiopb1_png';
                this["bankerOdds2"].source = 'bettingarea_pic_ratiob2_1_png';
                this["tieImg"].source = 'baccarat_pic_tie_y_png';
                this["tieNumImg"].source = 'bettingarea_pic_ratiot1_png';
                this["player_pairImg"].source = 'baccarat_pic_playerpair_y_png';
                this["player_pairNumImg"].source = 'bettingarea_pic_ratioppbp1_png';
                this["banker_pairImg"].source = 'baccarat_pic_bankerpair_y_png';
                this["banker_pairNumImg"].source = 'bettingarea_pic_ratioppbp1_png';
            }
            else {
                this["playerImg"].source = 'baccarat_pic_player_w_png';
                this["playerNumImg"].source = 'bettingarea_pic_ratiopb3_png';
                this["bankerImg"].source = 'baccarat_pic_banker_w_png';
                this["bankerNumImg"].source = 'bettingarea_pic_ratiopb3_png';
                this["bankerOdds2"].source = 'bettingarea_pic_ratiob2_3_png';
                this["tieImg"].source = 'baccarat_pic_tie_w_png';
                this["tieNumImg"].source = 'bettingarea_pic_ratiot3_png';
                this["player_pairImg"].source = 'baccarat_pic_playerpair_w_png';
                this["player_pairNumImg"].source = 'bettingarea_pic_ratioppbp3_png';
                this["banker_pairImg"].source = 'baccarat_pic_bankerpair_w_png';
                this["banker_pairNumImg"].source = 'bettingarea_pic_ratioppbp3_png';
            }
        };
        /** 显示我的派彩结果 */
        MulitBaccBaseItemUI.prototype.showMyPayOut = function (num) {
            if (num > 0) {
                this["payOutGroup"].visible = true;
                this.upDataConterMsg(2, "\u6D3E\u5F69\uFF1A" + game.NumberUtil.getSplitNumStr(num));
                this.showPayOutMove();
            }
            else {
                this["payOutGroup"].visible = false;
            }
        };
        /** 显示派彩动画 */
        MulitBaccBaseItemUI.prototype.showPayOutMove = function () {
            var y0 = 0;
            var y3 = 0;
            if (game.GlobalConfig.isMobile) {
                y0 = 146;
                y3 = 154;
            }
            else {
                y0 = 92;
                y3 = 96;
                this.payOutTxtGroup.alpha = 0.01;
                this.payOutTxtGroup.visible = false;
            }
            for (var i = 0; i < 7; i++) {
                if (i < 3) {
                    this["payOutImg" + i].y = y0 - i * 15;
                }
                else {
                    this["payOutImg" + i].y = y3 - (i - 3) * 15;
                }
            }
            this.payOutBg.visible = false;
            this.payOutBg.alpha = 0.01;
            for (var i = 0; i < 7; i++) {
                this["payOutImg" + i].visible = false;
                this["payOutImg" + i].y = this["payOutImg" + i].y - 150;
                this["payOutImg" + i].rotation = 0;
                this["payOutImg" + i].anchorOffsetX = 50;
                this["payOutImg" + i].anchorOffsetY = 50;
            }
            var index = 0;
            this.showChipMove(index);
        };
        MulitBaccBaseItemUI.prototype.showChipMove = function (index) {
            var _this = this;
            if (index < 7) {
                this["payOutImg" + index].visible = true;
                if (index == 2 || index == 6) {
                    game.CTween.get(this["payOutImg" + index]).to({ y: this["payOutImg" + index].y + 150 }, 200)
                        .to({ rotation: -10 }, 50)
                        .to({ rotation: 10 }, 50)
                        .to({ rotation: -10 }, 50)
                        .to({ rotation: 10 }, 50)
                        .to({ rotation: 0 }, 50)
                        .call(function () {
                        index++;
                        _this.showChipMove(index);
                    });
                }
                else {
                    game.CTween.get(this["payOutImg" + index]).to({ y: this["payOutImg" + index].y + 150 }, 200)
                        .call(function () {
                        index++;
                        _this.showChipMove(index);
                    });
                }
            }
            else if (index == 7) {
                this.payOutBg.visible = true;
                game.CTween.get(this.payOutBg).to({ alpha: 1 }, 1000);
                if (!game.GlobalConfig.isMobile) {
                    this.payOutTxtGroup.visible = true;
                    game.CTween.get(this.payOutTxtGroup).to({ alpha: 1 }, 1000);
                }
            }
            else {
                return;
            }
        };
        /** 计算路数宽度 */
        MulitBaccBaseItemUI.prototype.roadMapWidth = function () {
        };
        /** 设置宽高 */
        MulitBaccBaseItemUI.prototype.setContenWH = function () {
        };
        /** 绘制白色分割线*/
        MulitBaccBaseItemUI.prototype.drawShp = function () {
            // 白色分割线
            if (this.shp) {
                this.shp.graphics.clear();
            }
            else {
                this.shp = new egret.Shape();
            }
            this.shp.graphics.lineStyle(1, 0xFFFFFF);
            // 珠盘路右边
            this.shp.graphics.moveTo(this.bead_roadMap.rectW, 0);
            this.shp.graphics.lineTo(this.bead_roadMap.rectW, this.bead_roadMap.rectH);
            // 大路下面
            this.shp.graphics.moveTo(this.bead_roadMap.rectW, this.big_roadMap.rectH);
            this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.big_eye_roadMap.rectW, this.big_roadMap.rectH);
            // 大眼路
            this.shp.graphics.moveTo(this.bead_roadMap.rectW, this.big_roadMap.rectH + this.big_eye_roadMap.rectH);
            this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.big_eye_roadMap.rectW, this.big_roadMap.rectH + this.big_eye_roadMap.rectH);
            // 小路下面
            this.shp.graphics.moveTo(this.bead_roadMap.rectW + this.small_roadMap.rectW, this.big_roadMap.rectH + this.big_eye_roadMap.rectH);
            this.shp.graphics.lineTo(this.bead_roadMap.rectW + this.small_roadMap.rectW, this.big_roadMap.rectH + this.big_eye_roadMap.rectH + this.small_roadMap.rectH);
            this.shp.graphics.endFill();
            this.roadMap.addChild(this.shp);
        };
        /** 设置坐标 */
        MulitBaccBaseItemUI.prototype.setXY = function () {
            if (this.big_road && this.bead_roadMap) {
                this.big_road.x = this.bead_road.x + this.bead_roadMap.rectW;
            }
            if (this.big_road && this.big_eye_road) {
                this.big_eye_road.x = this.big_road.x;
                this.big_eye_road.y = this.big_road.y + this.big_roadMap.rectH;
            }
            if (this.big_road && this.small_road) {
                this.small_road.x = this.big_road.x;
                this.small_road.y = this.big_eye_road.y + this.big_eye_roadMap.rectH;
            }
            if (this.big_road && this.small_road) {
                this.cockroach_road.x = this.small_road.x + this.small_roadMap.rectW;
                this.cockroach_road.y = this.small_road.y;
            }
        };
        /** 闲问路 */
        MulitBaccBaseItemUI.prototype.playerAsk = function () {
            if (this.bead_roadMap) {
                this.bead_roadMap.playerAskWay();
            }
            if (this.bead_roadMap) {
                this.big_roadMap.playerAskWay();
            }
            if (this.bead_roadMap) {
                this.big_eye_roadMap.playerAskWay();
            }
            if (this.bead_roadMap) {
                this.small_roadMap.playerAskWay();
            }
            if (this.bead_roadMap) {
                this.cockroach_roadMap.playerAskWay();
            }
        };
        /** 庄问路 */
        MulitBaccBaseItemUI.prototype.bankerAsk = function () {
            if (this.bead_roadMap) {
                this.bead_roadMap.bankerAskWay();
            }
            if (this.bead_roadMap) {
                this.big_roadMap.bankerAskWay();
            }
            if (this.bead_roadMap) {
                this.big_eye_roadMap.bankerAskWay();
            }
            if (this.bead_roadMap) {
                this.small_roadMap.bankerAskWay();
            }
            if (this.bead_roadMap) {
                this.cockroach_roadMap.bankerAskWay();
            }
        };
        /**初始化路书*/
        MulitBaccBaseItemUI.prototype.initRoadMap = function () {
        };
        /** 设置路数数据 */
        MulitBaccBaseItemUI.prototype.setRoadMapData = function (roadData) {
            if (!roadData)
                return;
            this.bead_roadMap.setData(roadData);
            this.big_roadMap.setData(roadData);
            this.big_eye_roadMap.setData(roadData);
            this.small_roadMap.setData(roadData);
            this.cockroach_roadMap.setData(roadData);
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        MulitBaccBaseItemUI.prototype.onRemove = function () {
            if (this.bead_roadMap)
                this.bead_roadMap.dispose();
            if (this.big_roadMap)
                this.bead_roadMap.dispose();
            if (this.big_eye_roadMap)
                this.bead_roadMap.dispose();
            if (this.small_roadMap)
                this.bead_roadMap.dispose();
            if (this.cockroach_roadMap)
                this.bead_roadMap.dispose();
            this.bead_roadMap = null;
            this.big_roadMap = null;
            this.big_eye_roadMap = null;
            this.small_roadMap = null;
            this.cockroach_roadMap = null;
            game.CTween.removeTweens(this["ChipBg"]);
            if (this["redClicle"]) {
                this["redClicle"].graphics.clear();
                this["redClicle"] = null;
            }
            if (this["greenClicle"]) {
                this["greenClicle"].graphics.clear();
                this["greenClicle"] = null;
            }
            if (this["blueClicle"]) {
                this["blueClicle"].graphics.clear();
                this["blueClicle"] = null;
            }
            if (this.countdown)
                this.countdown.dispose();
            this.countdown = null;
            if (this.shp) {
                this.shp.graphics.clear();
                this.shp = null;
            }
            this.initMouseEvent(false);
            if (this.setTimeNum) {
                clearTimeout(this.setTimeNum);
            }
        };
        return MulitBaccBaseItemUI;
    }(eui.BaseItem));
    game.MulitBaccBaseItemUI = MulitBaccBaseItemUI;
    __reflect(MulitBaccBaseItemUI.prototype, "game.MulitBaccBaseItemUI");
})(game || (game = {}));
//# sourceMappingURL=MulitBaccBaseItemUI.js.map