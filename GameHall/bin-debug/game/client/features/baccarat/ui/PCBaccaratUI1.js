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
     * PC俱乐部房间列表UI组件
     * by 唐茂
     */
    var PCBaccaratUI1 = (function (_super) {
        __extends(PCBaccaratUI1, _super);
        function PCBaccaratUI1(data) {
            var _this = _super.call(this, data) || this;
            /** 筹码数组 */
            _this.chipArr = [100, 200, 300];
            /** 发牌背景资源 */
            _this.pokerBackRes = 'mpoker_pic_back_pc_png';
            /** 闲的总点数 */
            _this.playerPoint = 0;
            /** 庄的总点数 */
            _this.bankerPoint = 0;
            /**------------------数据相关-------------------------- */
            /** 当前选中的筹码 */
            _this.thisChip = 0;
            //----------------------------没有用字符串拼接的相关资源名----------------------------------
            /**发牌区庄闲的灰色背景*/
            _this.opencard_gray2 = "opencard_pic_gray2_pc_png";
            /**发牌区的灰色背景*/
            _this.opencard_gray = "opencard_pic_gray_pc_png";
            /**发牌区庄红色背景*/
            _this.opencard_red2 = "opencard_pic_red2_pc_png";
            /**发牌区闲蓝色背景*/
            _this.opencard_blue2 = "opencard_pic_blue2_pc_png";
            /**发牌区红色背景*/
            _this.opencard_red = "opencard_pic_red_pc_png";
            /**发牌区蓝色背景*/
            _this.opencard_blue = "opencard_pic_blue_pc_png";
            /**下注区闲的蓝字背景*/
            _this.baccarat_player = "baccarat_pic_player_b_pc_png";
            /**下注区闲的黄字背景*/
            _this.baccarat_player_y = "baccarat_pic_player_y_pc_png";
            /**下注区闲的蓝字比例背景*/
            _this.baccarat_playerNum = "bettingarea_pic_ratiop2_pc_png";
            /**下注区闲对的蓝字背景*/
            _this.baccarat_playerp = "baccarat_pic_playerpair_b_pc_png";
            /**下注区闲对的蓝比例背景*/
            _this.baccarat_playerpN = "bettingarea_pic_ratiopp2_pc_png";
            /**下注区和的绿字背景*/
            _this.baccarat_tie = "baccarat_pic_tie_g_pc_png";
            /**下注区和的黄字背景*/
            _this.baccarat_tie_y = "baccarat_pic_tie_y_pc_png";
            /**下注区和的绿字比例背景*/
            _this.baccarat_tieNum = "bettingarea_pic_ratiot2_pc_png";
            /**下注区庄的红字背景*/
            _this.baccarat_banker = "baccarat_pic_banker_r_pc_png";
            /**下注区庄对的红字背景*/
            _this.baccarat_bankerp = "baccarat_pic_bankerpair_r_pc_png";
            /**下注区庄对的红比例背景*/
            _this.baccarat_bankerpN = "bettingarea_pic_ratiobp2_pc_png";
            /**下注区庄的黄字背景*/
            _this.baccarat_banker_y = "baccarat_pic_banker_y_pc_png";
            /**下注区庄的红字比例背景*/
            _this.baccarat_bankerNum = "bettingarea_pic_ratiob2_pc_png";
            /**下注区和的黄字比例背景*/
            _this.baccarat_tieNum_y = "bettingarea_pic_ratiot1_pc_png";
            /**下注区庄闲的黄字比例背景*/
            _this.baccarat_pbNum_y = "bettingarea_pic_ratiopb1_pc_png";
            /**下注区闲对的黄字比例背景*/
            _this.bac_pN_y = "bettingarea_pic_ratiopp1_pc_png";
            /**下注区庄对的黄字比例背景*/
            _this.bac_bN_y = "bettingarea_pic_ratiobp1_pc_png";
            /**下注区闲对的黄字背景*/
            _this.bac_p_y = "baccarat_pic_playerpair_y_pc_png";
            /**下注区庄对黄字背景*/
            _this.bac_b_y = "baccarat_pic_bankerpair_y_pc_png";
            /**下注区庄的灰色字体*/
            _this.bac_b_g = "baccarat_pic_banker_w_pc_png";
            /**下注区闲的灰色字体*/
            _this.bac_p_g = "baccarat_pic_player_w_pc_png";
            /**下注区庄对的灰色字体*/
            _this.bac_bp_g = "baccarat_pic_bankerpair_w_pc_png";
            /**下注区闲对的灰色字体*/
            _this.bac_pp_g = "baccarat_pic_playerpair_w_pc_png";
            /**下注区和的灰色字体*/
            _this.bac_t_g = "baccarat_pic_tie_w_pc_png";
            /**下注区庄闲比例的灰色字体*/
            _this.bac_bpN_g = "bettingarea_pic_ratiopb3_pc_png";
            /**下注区庄对比例的灰色字体*/
            _this.bac_pbpN_g = "bettingarea_pic_ratiobp3_pc_png";
            /**下注区闲对比例的灰色字体*/
            _this.bac_ppN_g = "bettingarea_pic_ratiopp3_pc_png";
            /**下注区和比例的灰色字体*/
            _this.bac_tN_g = "bettingarea_pic_ratiot3_pc_png";
            /**座位区*/
            _this.seat_Mine_head = "desk_pic_myname_pc_png";
            _this.seat_Mine_money = "desk_pic_mymoney_pc_png";
            _this.seat_other_head = "desk_pic_name_pc_png";
            _this.seat_other_money = "desk_pic_money_pc_png";
            //-----------------------字体相关资源名------------------------------
            /**发牌区庄闲灰色字体*/
            _this.opencard_game_gray = "game_share_gray_156_pc_fnt";
            /**发牌区闲蓝色字体*/
            _this.opencard_game_blue = "game_share_blue_156_pc_fnt";
            /**发牌区庄红色字体*/
            _this.opencard_game_red = "game_share_red_156_pc_fnt";
            /**下注确认金色字体*/
            _this.baccarat_game_golden = "game_share_golden_30_pc_fnt";
            /**下注未确认灰色字体*/
            _this.baccarat_game_gray = "game_share_gray_23_pc_fnt";
            //-------------------------盈余字体资源-----------------
            /**red*/
            _this.bac_surplus_red = "game_share_red_73_pc_fnt";
            /**green*/
            _this.bac_surplus_green = "game_share_green_73_pc_fnt";
            /**确定下注的总金额*/
            _this.sureAllMoney = 0;
            /**确定下注的数据*/
            _this.sureMoneyData = { player: 0, tie: 0, banker: 0, player_pair: 0, banker_pair: 0 };
            _this.unit = 31;
            //--------------------------------------下注相关------------------------------------------------
            _this.mineSeatNum = [0];
            /**储存我的座号*/
            _this.storageMySeat = [];
            /**上一次其他玩家的下注信息*/
            _this.lastOtherBet = { banker: 0, banker_pair: 0, player: 0, player_pair: 0, tie: 0 };
            /**是否余额不住*/
            _this.isNot = false;
            _this.skinName = "resource/skins/game_skins/pc/baccarat/baccaratSkin.exml";
            _this.userChips = [];
            _this.roomChips = [];
            return _this;
        }
        PCBaccaratUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            game.MediatorManager.openMediator(game.Mediators.Mediator_RoomInfo, this.data);
            this.initListener();
            this.initRoadMap();
            this.initCountdown();
            game.CTween.get(this["ChipBg"], { loop: true }).to({ rotation: -360 }, 2000);
            // this.startMoVeclip(true);
            this.showProportion();
            // setTimeout(()=>{
            //     this.receiveSingleCard("player_1",26);
            // },2000)
            this.initChat();
            this.isAnchor();
            this.updataSureBtn(false);
            this.updataCancelBtn(false);
            // this.setEditGroup(false);
        };
        //---------------------------------------------事件-------------------------------------------------------
        /**注册事件*/
        PCBaccaratUI1.prototype.initListener = function () {
            var _this = this;
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
            this.registerEvent(this.limitBtn, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.limitMouseImg.visible = true;
            }, this);
            this.registerEvent(this.limitBtn, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.limitMouseImg.visible = false;
            }, this);
            // 输入框change事件
            this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
        };
        /* 点击响应事件 */
        PCBaccaratUI1.prototype.onTouchBtn = function (evt) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (evt.target) {
                case this.blueChip:
                    this.getCustomChips('blue');
                    break;
                case this.greenChip:
                    this.getCustomChips('green');
                    break;
                case this.redChip:
                    this.getCustomChips('red');
                    break;
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
                case this.sureBtn:
                    var isHave = this.roomCard();
                    if (isHave) {
                        this._mediator.sureFuc();
                        this.updataSureBtn(false);
                    }
                    else {
                        this.cancelBetUnSureNum();
                        this.showMsg("房卡不足请联系房主补充房卡", 'red');
                    }
                    break;
                case this.cancelBtn:
                    this._mediator.cancelFuc();
                    this.updataCancelBtn(false);
                    this.updataSureBtn(false);
                    break;
                case this.limitBtn:
                    this.goRoomLimit();
                    break;
                case this['playerWayBtn']:
                    this.playerAskWay();
                    break;
                case this['bankerWayBtn']:
                    this.bankerAskWay();
                    break;
                case this.btnCancel:
                    this.setEditGroup(false);
                    break;
                case this.editChipBtn:
                    this.setEditGroup(true);
                    this.setChips(this.userChips);
                    break;
                case this.btnConfirm:
                    this.confirmEditChip();
                    break;
                case this.groupMy:
                    var tipData = new game.TipMsgInfo();
                    tipData.msg = [{ text: '您不能在自己创建的俱乐部中进行本操作', textColor: enums.ColorConst.Golden }];
                    tipData.confirmText = "我知道了";
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    break;
            }
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        PCBaccaratUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            _super.prototype.onMediatorCommand.call(this, type, params);
            switch (type) {
                // 初始化监听
                case BaccaratUICommands.BaccaratNotify_initListener:
                    this._mediator = params;
                    break;
                case BaccaratUICommands.BaccaratNotify_mySeat:
                    this.setMySeat(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_othersSeat:
                    this.setOtherSeat(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_upDataBetNum:
                    this.updaBetNum(params.chipMoney, params.type, game.NumberUtil.getSplitNumStr(params.unMoney, 3));
                    this.unMoney = params.unMoney;
                    break;
                case BaccaratUICommands.BaccaratNotify_roadMapData:
                    this.setRoadMapData(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_customChips:
                    this.setCustomChips(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_showRedMsg:
                    this.showMsg(params, 'red');
                    // this._mediator.cancelFuc();
                    break;
                case BaccaratUICommands.BaccaratNotify_showGreenMsg:
                    this.showMsg(params, 'green');
                    break;
                case BaccaratUICommands.BaccaratNotify_cancelBet:
                    // if(this.sureMoneyData.banker==0&&this.sureMoneyData.banker_pair==0&&this.sureMoneyData.tie==0&&this.sureMoneyData.player==0&&this.sureMoneyData.player_pair==0){
                    //     this.cancelBet();
                    // }else{
                    //     this.cancelBetUnSureNum();
                    // }
                    this.cancelBetUnSureNum();
                    this[game.BaccaratModel.PLAYER + "BetZone"].alpha = 0;
                    this[game.BaccaratModel.TIE + "BetZone"].alpha = 0;
                    this[game.BaccaratModel.BANKER + "BetZone"].alpha = 0;
                    this[game.BaccaratModel.PLAYERPAIR + "BetZone"].alpha = 0;
                    this[game.BaccaratModel.BANKERPAIR + "BetZone"].alpha = 0;
                    break;
                case BaccaratUICommands.BaccaratNotify_showSureMoney:
                    this.showSureMoney(params);
                    var stage = game.ClubModel.getInstance().getRoomStage(this.data);
                    if (stage == 'bet') {
                        this['betAllNum'].text = game.NumberUtil.getSplitNumStr(this.sureAllMoney);
                    }
                    break;
                case BaccaratUICommands.BaccaratNotify_receiveSingleCard:
                    this.receiveSingleCard(params[0], params[1]);
                    this.cancelBetUnSureNum();
                    this.updataSureBtn(false);
                    this.updataCancelBtn(false);
                    break;
                case BaccaratUICommands.BaccaratNotify_setBetTime:
                    clearTimeout(this.setTimeoutStage);
                    this.setCountdown(params[0], params[1]);
                    break;
                case BaccaratUICommands.BaccaratNotify_toggleStage:
                    this.toggleStage(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_roomInfoMsg:
                    this.showRoomInfoMsg(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_gameResults:
                    this.gameResults(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_myPayOutResults:
                    this['chatImgGroup'].y = 0;
                    this.showMyPayOut(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_showOtherBet:
                    this.showOtherBet(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_roomChatMsg:
                    this.setChatData(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_isWinner:
                    this['isWinnerGroup'].visible = params;
                    this['isWinnerGroup'].alpha = 0.01;
                    game.CTween.get(this['isWinnerGroup']).to({ alpha: 1 });
                    if (params)
                        this['chatImgGroup'].y = -38;
                    break;
                case BaccaratUICommands.BaccaratNotify_isMy:
                    this.isMy = params;
                    this.togglewayBtnSty(!params);
                    this.editChipBtn.setState = !params ? 'up' : "disabled";
                    this.editChipBtn.enabled = !params;
                    this["ChipBg"].visible = !params;
                    this.groupMy.visible = params;
                    this.groupChipMy.visible = params;
                    break;
                case BaccaratUICommands.BaccaratNotify_showAllSeat:
                    this.showAllSeat(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_showAllBet:
                    this.showAllBet(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_allPay:
                    this.showAllPay(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_otherNewBet:
                    this.allBetFly(params);
                    break;
            }
        };
        /**是否有主播*/
        PCBaccaratUI1.prototype.isAnchor = function () {
            var isA = false;
            if (isA) {
                this.countdownGroup.x = 240;
                this.dealCardGroup.x = 210;
            }
            else {
                this.countdownGroup.x = 24;
                this.dealCardGroup.x = 24;
            }
        };
        //---------------------------------------------计时器-------------------------------------------------------
        /** 初始化计时器 */
        PCBaccaratUI1.prototype.initCountdown = function () {
            this.countdown = new game.countdown(130);
            this.countdownGroup.addChild(this.countdown);
            this.countdown.setStratCallBack(this.stratCallBack, this);
        };
        /** 设置倒计时 */
        PCBaccaratUI1.prototype.setCountdown = function (timeAll, overTime) {
            var _this = this;
            this.countdown.startTime(timeAll, overTime);
            this.setTimeoutStage = setTimeout(function () {
                _this.countdown.startPayOut();
            }, timeAll);
        };
        //---------------------------------------------------------路书区----------------------------------------------
        /** 初始化路书 */
        PCBaccaratUI1.prototype.initRoadMap = function () {
            this.bead_roadMap = new game.RoadMap(this.bead_road43.width, this.bead_road43.height, game.RoadMap.BeadRoad, this.unit, true);
            this.bead_road43.addChild(this.bead_roadMap);
            this.big_roadMap = new game.RoadMap(this.big_road43.width, this.big_road43.height, game.RoadMap.BigRoad, this.unit / 2, true);
            this.big_road43.addChild(this.big_roadMap);
            this.big_eye_roadMap = new game.RoadMap(this.big_eye_road43.width, this.big_eye_road43.height, game.RoadMap.BigEyeRoad, this.unit / 2, true);
            this.big_eye_road43.addChild(this.big_eye_roadMap);
            this.small_roadMap = new game.RoadMap(this.small_road43.width, this.small_road43.height, game.RoadMap.SmallRoad, this.unit / 2, true);
            this.small_road43.addChild(this.small_roadMap);
            this.cockroach_roadMap = new game.RoadMap(this.cockroach_road43.width, this.cockroach_road43.height, game.RoadMap.CockRoachRoad, this.unit / 2, true);
            this.cockroach_road43.addChild(this.cockroach_roadMap);
            this.drawShp();
            this.setContenWH();
        };
        /** 绘制白色分割线*/
        PCBaccaratUI1.prototype.drawShp = function () {
            // 白色分割线
            if (this.shp) {
                this.shp.graphics.clear();
            }
            else {
                this.shp = new egret.Shape();
            }
            this.shp.graphics.lineStyle(2, 0xa9a9a9);
            // 珠盘路右边
            this.shp.graphics.moveTo(this.bead_road43.width, this.bead_road43.y);
            this.shp.graphics.lineTo(this.bead_road43.width, this.bead_road43.height);
            // 大路下面
            this.shp.graphics.moveTo(this.bead_road43.width, this.big_road43.height);
            this.shp.graphics.lineTo(game.StageUtil.width - 774 - 185, this.big_road43.height);
            // 大眼路右面
            this.shp.graphics.moveTo(this.bead_road43.width + this.big_eye_road43.width, this.big_road43.height);
            this.shp.graphics.lineTo(this.bead_road43.width + this.big_eye_road43.width, this.big_road43.height + this.big_eye_road43.height);
            // 小路右面
            this.shp.graphics.moveTo(this.bead_road43.width + this.big_eye_road43.width + this.small_road43.width, this.big_road43.height);
            this.shp.graphics.lineTo(this.bead_road43.width + this.big_eye_road43.width + this.small_road43.width, this.big_road43.height + this.big_eye_road43.height);
            this.shp.graphics.endFill();
            this.roadMap43.addChild(this.shp);
        };
        /** 计算路书宽度 */
        PCBaccaratUI1.prototype.roadMapWidth = function () {
            this.roadMap43.width = game.StageUtil.width - 774 - 185;
            this.bead_road43.width = 10 * this.unit;
            this.big_road43.width = this.bead_road43.width * 1.7;
            this.big_eye_road43.width = this.bead_road43.width * 0.7;
            this.small_road43.width = this.bead_road43.width * 0.7;
            this.cockroach_road43.width = this.bead_road43.width * 0.7;
        };
        /** 设置宽高 */
        PCBaccaratUI1.prototype.setContenWH = function () {
            if (this.roadMap43) {
                this.roadMap43.width = game.StageUtil.width - 774 - 185;
            }
            this.roadMapWidth();
            this.bead_roadMap.setWidth(this.bead_road43.width, this.unit);
            this.big_roadMap.setWidth(this.big_road43.width, this.unit / 2);
            this.big_eye_roadMap.setWidth(this.big_eye_road43.width, this.unit / 2);
            this.small_roadMap.setWidth(this.small_road43.width, this.unit / 2);
            this.cockroach_roadMap.setWidth(this.small_road43.width, this.unit / 2);
            this.drawShp();
        };
        /** 设置路书数据 */
        PCBaccaratUI1.prototype.setRoadMapData = function (roadData) {
            if (!roadData)
                return;
            this.bead_roadMap.setData(roadData);
            this.big_roadMap.setData(roadData);
            this.big_eye_roadMap.setData(roadData);
            this.small_roadMap.setData(roadData);
            this.cockroach_roadMap.setData(roadData);
            this.threeImg(roadData);
        };
        /**闲问路 */
        PCBaccaratUI1.prototype.playerAskWay = function () {
            if (this.bead_roadMap) {
                this.bead_roadMap.playerAskWay();
            }
            if (this.big_roadMap) {
                this.big_roadMap.playerAskWay();
            }
            if (this.big_eye_roadMap) {
                this.big_eye_roadMap.playerAskWay();
            }
            if (this.small_roadMap) {
                this.small_roadMap.playerAskWay();
            }
            if (this.cockroach_roadMap) {
                this.cockroach_roadMap.playerAskWay();
            }
        };
        /** 庄问路 */
        PCBaccaratUI1.prototype.bankerAskWay = function () {
            if (this.bead_roadMap) {
                this.bead_roadMap.bankerAskWay();
            }
            if (this.big_roadMap) {
                this.big_roadMap.bankerAskWay();
            }
            if (this.big_eye_roadMap) {
                this.big_eye_roadMap.bankerAskWay();
            }
            if (this.small_roadMap) {
                this.small_roadMap.bankerAskWay();
            }
            if (this.cockroach_roadMap) {
                this.cockroach_roadMap.bankerAskWay();
            }
        };
        /**问路按钮样式*/
        PCBaccaratUI1.prototype.togglewayBtnSty = function (type) {
            this['playerWayBtn'].setState = type ? 'up' : "disabled";
            this['playerWayBtn'].enabled = type;
            this['bankerWayBtn'].setState = type ? 'up' : "disabled";
            this['bankerWayBtn'].enabled = type;
            this.askStage(type);
        };
        /**问路里三个小图的状态*/
        PCBaccaratUI1.prototype.askStage = function (sta) {
            this['playerWayBtn'].getChildByName("groupDisable").visible = !sta;
            this['playerWayBtn'].getChildByName("player_big_eye_road").visible = sta;
            this['playerWayBtn'].getChildByName("player_SmallRoad").visible = sta;
            this['playerWayBtn'].getChildByName("player_CockRoachRoad").visible = sta;
            this['bankerWayBtn'].getChildByName("groupDisable").visible = !sta;
            this['bankerWayBtn'].getChildByName("banker_big_eye_road").visible = sta;
            this['bankerWayBtn'].getChildByName("banker_SmallRoad").visible = sta;
            this['bankerWayBtn'].getChildByName("banker_CockRoachRoad").visible = sta;
        };
        /**问路里三个小图*/
        PCBaccaratUI1.prototype.threeImg = function (roadData) {
            if (roadData.player_peek || roadData.banker_peek) {
                var arr = ["player", "banker"];
                for (var i = 0; i < arr.length; i++) {
                    var ask = void 0;
                    if (i == 0) {
                        ask = roadData.player_peek;
                    }
                    else {
                        ask = roadData.banker_peek;
                    }
                    var tp = arr[i];
                    if (!ask.big_eye_road)
                        return;
                    //大眼路
                    var col1 = ask.big_eye_road.icon[0];
                    switch (col1) {
                        case "blue":
                            this[tp + "WayBtn"].getChildByName(tp + "_big_eye_road").source = "share_pic_bigeye.B_pc_png";
                            break;
                        case "red":
                            this[tp + "WayBtn"].getChildByName(tp + "_big_eye_road").source = "share_pic_bigeye.R_pc_png";
                            break;
                    }
                    if (!ask.small_road)
                        return;
                    //小路
                    var col2 = ask.small_road.icon[0];
                    switch (col2) {
                        case "blue":
                            this[tp + "WayBtn"].getChildByName(tp + "_SmallRoad").source = "share_pic_small.B_pc_png";
                            break;
                        case "red":
                            this[tp + "WayBtn"].getChildByName(tp + "_SmallRoad").source = "share_pic_small.R_pc_png";
                            break;
                    }
                    if (!ask.cockroach_road)
                        return;
                    //凹凸路
                    var col3 = ask.cockroach_road.icon[0];
                    switch (col3) {
                        case "blue":
                            this[tp + "WayBtn"].getChildByName(tp + "_CockRoachRoad").source = "share_pic_cockroach.B_pc_png";
                            break;
                        case "red":
                            this[tp + "WayBtn"].getChildByName(tp + "_CockRoachRoad").source = "share_pic_cockroach.R_pc_png";
                            break;
                        case "green":
                            this[tp + "WayBtn"].getChildByName(tp + "_CockRoachRoad").source = "share_pic_cockroach.T_pc_png";
                            break;
                    }
                }
            }
            else {
                this.askStage(false);
            }
        };
        //---------------------------------------筹码区------------------------------------------------------
        /** 点击筹码更新金额 */
        PCBaccaratUI1.prototype.getCustomChips = function (type) {
            switch (type) {
                case 'blue':
                    this.thisChip = 0;
                    this["ChipBg"].horizontalCenter = "-120.5";
                    break;
                case 'green':
                    this.thisChip = 1;
                    this["ChipBg"].horizontalCenter = "-27.5";
                    break;
                case 'red':
                    this.thisChip = 2;
                    this["ChipBg"].horizontalCenter = "62.5";
                    break;
            }
            this["ChipBg"].visible = true;
        };
        PCBaccaratUI1.prototype.changeArrNum = function (seat) {
            switch (seat) {
                case 1:
                    this.mineSeatNum.splice(0, 1, 0);
                    break;
                case 2:
                    this.mineSeatNum.splice(0, 1, 1);
                    break;
                case 3:
                    this.mineSeatNum.splice(0, 1, 2);
                    break;
                case 5:
                    this.mineSeatNum.splice(0, 1, 3);
                    break;
                case 6:
                    this.mineSeatNum.splice(0, 1, 4);
                    break;
                case 7:
                    this.mineSeatNum.splice(0, 1, 5);
                    break;
                case 8:
                    this.mineSeatNum.splice(0, 1, 6);
                    break;
            }
            // this.mineSeatNum.splice(0,1,0);
            return this.mineSeatNum[0];
        };
        /* 设置我的座位号和余额 */
        PCBaccaratUI1.prototype.setMySeat = function (mySeat) {
            for (var i = 0; i < 7; i++) {
                this["seatFrame" + i].visible = false;
            }
            if (mySeat && mySeat.data) {
                var seatNum = this.changeArrNum(mySeat.seat);
                this["seatUesrName" + seatNum].text = mySeat.data.nick;
                this["seatUesrBce" + seatNum].text = game.NumberUtil.getSplitNumStr(mySeat.data.balance);
                this["seatUesrName" + seatNum].textColor = 0xeedfb1;
                this["seatUesrBce" + seatNum].textColor = 0xeedfb1;
                this["seatUesrHead" + seatNum].source = this.seat_Mine_head;
                this["seatUesrBcePic" + seatNum].source = this.seat_Mine_money;
                this["seatNum" + seatNum].source = "seat_pic_myseat" + mySeat.seat + "_pc_png";
                this["seatFrame" + seatNum].visible = true;
            }
            this.storageMySeat.push(mySeat);
        };
        /* 设置其他人的座位号和余额 */
        PCBaccaratUI1.prototype.setOtherSeat = function (oSeat) {
            if (oSeat) {
                if (oSeat.length == 6) {
                    var allSeatArr = [];
                    for (var i = 0; i < oSeat.length; i++) {
                        allSeatArr.push(oSeat[i]);
                    }
                    allSeatArr.splice(this.mineSeatNum[0], 0, this.storageMySeat);
                    for (var i = 0; i < allSeatArr.length; i++) {
                        if (i != this.mineSeatNum[0]) {
                            this["seatNum" + i].source = "seat_pic_seat" + allSeatArr[i].seat + "_pc_png";
                            if (allSeatArr[i].data && allSeatArr[i].data.nick && allSeatArr[i].data.user_id) {
                                this["seatChair" + i].visible = false;
                                this["seatUesrName" + i].visible = true;
                                this["seatUesrBce" + i].visible = true;
                                this["seatUesrHead" + i].visible = true;
                                this["seatUesrBcePic" + i].visible = true;
                                this["seatUesrName" + i].text = allSeatArr[i].data.nick;
                                this["seatUesrBce" + i].text = game.NumberUtil.getSplitNumStr(allSeatArr[i].data.balance);
                                this["seatUesrName" + i].textColor = 0xD6B783;
                                this["seatUesrBce" + i].textColor = 0xD6B783;
                                this["seatUesrHead" + i].source = this.seat_other_head;
                                this["seatUesrBcePic" + i].source = this.seat_other_money;
                            }
                            else {
                                this["seatChair" + i].visible = true;
                                this["seatUesrName" + i].visible = false;
                                this["seatUesrBce" + i].visible = false;
                                this["seatUesrHead" + i].visible = false;
                                this["seatUesrBcePic" + i].visible = false;
                            }
                        }
                    }
                }
            }
        };
        /** 设置其他玩家的详细下注信息 */
        PCBaccaratUI1.prototype.showOtherBet = function (arr) {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet')
                return;
            if (arr) {
                if (arr.length == 6) {
                    var mySeat = this.mineSeatNum[0];
                    var j = void 0;
                    for (var i = 0; i < arr.length; i++) {
                        if (i >= mySeat) {
                            j = i + 1;
                        }
                        else {
                            j = i;
                        }
                        if (arr[i]) {
                            for (var key in arr[i]) {
                                if (this["seatChair" + j].visible) {
                                    this[key + "BetOther" + j].visible = false;
                                    this[key + "BetOtherNum" + j].visible = false;
                                    this[key + "BetMine" + j].visible = false;
                                    this[key + "BetMineNum" + j].visible = false;
                                }
                                else {
                                    if (arr[i][key]) {
                                        if (this.lastOtherBet.banker == arr[i].banker && this.lastOtherBet.banker_pair == arr[i].banker_pair && this.lastOtherBet.player == arr[i].player
                                            && this.lastOtherBet.player_pair == arr[i].player_pair && this.lastOtherBet.tie == arr[i].tie) {
                                            return;
                                        }
                                        else {
                                            var chatN = arr[i][key] - this.lastOtherBet[key];
                                            if (chatN) {
                                                this.newFlyChip(game.NumberUtil.getSplitNumStr(chatN, 1), key, game.NumberUtil.getSplitNumStr(arr[i][key], 1), j, true);
                                            }
                                            this.lastOtherBet[key] = arr[i][key];
                                        }
                                    }
                                    this[key + "BetMine" + j].visible = false;
                                    this[key + "BetMineNum" + j].visible = false;
                                }
                            }
                        }
                    }
                }
            }
        };
        /** 请求下注 */
        PCBaccaratUI1.prototype.reqBet = function (monney, type) {
            if (!type)
                return;
            var isHave = this.roomCard();
            if (isHave) {
                this._mediator.reqBet(monney, type);
                this.isOneBet = false;
            }
            else {
                this.showMsg("房卡不足请联系房主补充房卡", 'red');
            }
        };
        /** 设置确定按钮的样式 */
        PCBaccaratUI1.prototype.updataSureBtn = function (b) {
            this.sureBtn.setState = b ? 'up' : "disabled";
            this.sureBtn.enabled = b;
        };
        /** 设置取消按钮的样式 */
        PCBaccaratUI1.prototype.updataCancelBtn = function (b) {
            this.cancelBtn.setState = b ? 'up' : "disabled";
            this.cancelBtn.enabled = b;
        };
        /** 更新下注区金额 */
        PCBaccaratUI1.prototype.updaBetNum = function (chipMonney, type, unMoney) {
            this.newFlyChip(chipMonney, type, unMoney);
        };
        /** 新的飞筹码动画 */
        PCBaccaratUI1.prototype.newFlyChip = function (chipMoney, type, unMoney, seat, otherB) {
            if (seat === void 0) { seat = this.mineSeatNum[0]; }
            if (otherB === void 0) { otherB = false; }
            if (this.isNot)
                return;
            var group;
            var numSeat = seat;
            var numY = this[type + "BetGroup"].y + this[type + "BetGroup" + numSeat].y;
            var numX = this[type + "BetGroup"].x + this[type + "BetGroup" + numSeat].x;
            group = this[type + "BetGroup"];
            var chip = new game.betChip(chipMoney);
            if (numSeat < 3) {
                chip.x = this["seatUesrBce" + numSeat].x;
                chip.y = this["seatUesrBce" + numSeat].y - 30;
            }
            else if (numSeat == 3) {
                chip.x = this["seatUesrBce" + numSeat].x - 30;
                chip.y = this["seatUesrBce" + numSeat].y - 20;
            }
            else {
                chip.x = this["seatUesrBce" + numSeat].x + 70;
                chip.y = this["seatUesrBce" + numSeat].y - 30;
            }
            var stage = game.BaccaratModel.getInstance().getDeskStage(this.data);
            if (stage == "payout") {
                chip.x = 810;
                chip.y = -100;
            }
            this.betShowGroup.addChild(chip);
            game.CTween.removeTweens(chip);
            game.CTween.get(chip).to({ x: numX, y: numY }, 500)
                .call(this.disposeChip, this, [chip, unMoney, type, numSeat, otherB]);
            if (otherB) {
                this[type + "BetZone"].alpha = 0;
            }
            else {
                this[type + "BetZone"].alpha = 1;
            }
            this[type + "BetMineNum" + numSeat].font = this.baccarat_game_gray;
        };
        /** 飞筹码动画执行完的回调 */
        PCBaccaratUI1.prototype.disposeChip = function (item, unMoney, type, seat, b) {
            item.parent.removeChild(item);
            if (b) {
                var showJ = seat;
                this[type + "BetOtherNum" + showJ].text = unMoney;
                this[type + "BetOther" + showJ].visible = true;
                this[type + "BetOtherNum" + showJ].visible = true;
            }
            this.betUnSureNum(unMoney, type, b);
        };
        /** 更新筹码列表 */
        PCBaccaratUI1.prototype.setCustomChips = function (arr) {
            if (arr && arr.length) {
                this.chipArr = arr;
                this.roomChips = arr;
                this["blueChipNum"].text = game.NumberUtil.getSplitNumStr(arr[0], 1);
                this["greenChipNum"].text = game.NumberUtil.getSplitNumStr(arr[1], 1);
                this["redChipNum"].text = game.NumberUtil.getSplitNumStr(arr[2], 1);
            }
        };
        /** 弹出（红、绿）提示框 */
        PCBaccaratUI1.prototype.showMsg = function (msg, color) {
            var _this = this;
            msg = game.LanguageUtil.translate(msg);
            if (color == 'red') {
                var group = this["redMsgGroup"];
                this["redMsgTxt"].text = msg;
                if (msg == game.LanguageUtil.translate("global_lbl_bet_began") || msg == game.LanguageUtil.translate("game_lbl_bacc_warning_payouting")) {
                    this["redMsgGroup"].touchThrough = false;
                }
                else {
                    this["redMsgGroup"].touchThrough = true;
                }
                if (msg == game.LanguageUtil.translate("game_lbl_gold_not_enough")) {
                    // this.cancelBetUnSureNum();
                    // this.updataSureBtn(false);
                    // this.updataCancelBtn(false);
                    this.isNot = true;
                }
            }
            else {
                var group = this["greenMsgGroup"];
                this["greenMsgTxt"].text = msg;
                this["greenMsgGroup"].touchThrough = true;
            }
            game.CTween.removeTweens(group);
            group.alpha = 1;
            group.visible = true;
            game.CTween.get(group).wait(1000)
                .call(function () { _this.isNot = false; })
                .to({ alpha: 0 }, 2000)
                .call(function () { group.visible = false; });
            if (color == 'red') {
                this[game.BaccaratModel.PLAYER + "BetZone"].alpha = 0;
                this[game.BaccaratModel.TIE + "BetZone"].alpha = 0;
                this[game.BaccaratModel.BANKER + "BetZone"].alpha = 0;
                this[game.BaccaratModel.PLAYERPAIR + "BetZone"].alpha = 0;
                this[game.BaccaratModel.BANKERPAIR + "BetZone"].alpha = 0;
            }
        };
        /** 显示未确定的下注金额 */
        PCBaccaratUI1.prototype.betUnSureNum = function (unMoney, type, otherB) {
            if (otherB === void 0) { otherB = false; }
            if (!type)
                return;
            // if(this.isNot)return;
            for (var i = 0; i < 7; i++) {
                if (!unMoney || unMoney == '0') {
                    this[type + "BetOther" + i].visible = false;
                    this[type + "BetOtherNum" + i].visible = false;
                    this[type + "BetMineNum" + i].text = '0';
                    this[type + "BetMine" + i].visible = false;
                    this[type + "BetMineNum" + i].visible = false;
                    this[type + "BetOtherNum" + i].text = '0';
                }
                else {
                    if (!otherB) {
                        if (i == this.mineSeatNum[0]) {
                            this[type + "BetMine" + i].visible = true;
                            this[type + "BetMineNum" + i].visible = true;
                            this[type + "BetMineNum" + i].text = game.NumberUtil.getSplitNumStr(this.unMoney + this.sureMoneyData[type]);
                            this[type + "BetOther" + i].visible = false;
                            this[type + "BetOtherNum" + i].visible = false;
                            this.updataCancelBtn(true);
                            this.updataSureBtn(true);
                        }
                    }
                }
            }
        };
        /** 取消下注 */
        PCBaccaratUI1.prototype.cancelBet = function () {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet')
                return;
            this.betUnSureNum('0', game.BaccaratModel.PLAYER);
            this.betUnSureNum('0', game.BaccaratModel.TIE);
            this.betUnSureNum('0', game.BaccaratModel.BANKER);
            this.betUnSureNum('0', game.BaccaratModel.PLAYERPAIR);
            this.betUnSureNum('0', game.BaccaratModel.BANKERPAIR);
            this[game.BaccaratModel.PLAYER + "BetZone"].alpha = 0;
            this[game.BaccaratModel.TIE + "BetZone"].alpha = 0;
            this[game.BaccaratModel.BANKER + "BetZone"].alpha = 0;
            this[game.BaccaratModel.PLAYERPAIR + "BetZone"].alpha = 0;
            this[game.BaccaratModel.BANKERPAIR + "BetZone"].alpha = 0;
            this.updataSureBtn(false);
            this.updataCancelBtn(false);
        };
        /** 显示已确定的下注框 */
        PCBaccaratUI1.prototype.showSureMoney = function (monneyObj) {
            if (!monneyObj)
                return;
            this.sureAllMoney = 0;
            if (game.GlobalVariable.isEmptyObject(monneyObj)) {
                this.sureMoneyData = { player: 0, tie: 0, banker: 0, player_pair: 0, banker_pair: 0 };
            }
            else {
                this.sureMoneyData = monneyObj;
            }
            for (var key in monneyObj) {
                if (monneyObj[key]) {
                    var numSeat = this.mineSeatNum[0];
                    switch (key) {
                        case game.BaccaratModel.PLAYER:
                            this[key + "Img"].source = this.baccarat_player;
                            this[key + "NumImg"].source = this.baccarat_playerNum;
                            break;
                        case game.BaccaratModel.TIE:
                            this[key + "Img"].source = this.baccarat_tie;
                            this[key + "NumImg"].source = this.baccarat_tieNum;
                            break;
                        case game.BaccaratModel.BANKER:
                            this[key + "Img"].source = this.baccarat_banker;
                            this[key + "NumImg"].source = this.baccarat_bankerNum;
                            break;
                        case game.BaccaratModel.PLAYERPAIR:
                            this[key + "Img"].source = this.baccarat_playerp;
                            this[key + "NumImg"].source = this.baccarat_playerpN;
                            break;
                        case game.BaccaratModel.BANKERPAIR:
                            this[key + "Img"].source = this.baccarat_bankerp;
                            this[key + "NumImg"].source = this.baccarat_bankerpN;
                            break;
                    }
                    this[key + "BetMineNum" + numSeat].font = this.baccarat_game_golden;
                    this[key + "BetMineNum" + numSeat].text = game.NumberUtil.getSplitNumStr(monneyObj[key]);
                    // this[`${key}BetMineNum${numSeat}`].text = "1K";
                    this[key + "BetZone"].alpha = 0;
                }
                if (monneyObj[key] != 0) {
                    this.sureAllMoney += parseFloat(monneyObj[key]);
                }
            }
            this.updataSureBtn(false);
            this.updataCancelBtn(false);
        };
        /**取消未确定的下注框*/
        PCBaccaratUI1.prototype.cancelBetUnSureNum = function () {
            if (!this.sureMoneyData)
                return;
            var numSeat = this.mineSeatNum[0];
            for (var key in this.sureMoneyData) {
                if (!this.sureMoneyData[key]) {
                    this[key + "BetMineNum" + numSeat].text = '0';
                    this[key + "BetMine" + numSeat].visible = false;
                    this[key + "BetMineNum" + numSeat].visible = false;
                    this[key + "BetZone"].alpha = 0;
                }
                else {
                    this[key + "BetMineNum" + numSeat].text = game.NumberUtil.getSplitNumStr(this.sureMoneyData[key]);
                    this[key + "BetMineNum" + numSeat].font = this.baccarat_game_golden;
                }
            }
        };
        //----------------------------------发牌相关，房间状态----------------------------------
        /** 播放发牌闪电动画和界面  */
        PCBaccaratUI1.prototype.startMoVeclip = function (b) {
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
            this["player_1K"].visible = true;
            this["player_2K"].visible = true;
            this["player_3K"].visible = true;
            this["banker_1K"].visible = true;
            this["banker_2K"].visible = true;
            this["banker_3K"].visible = true;
            this['tiePayout'].visible = false;
            this.dealCardGroup.visible = b;
            if (b) {
                this.countdown.startPayOut();
                this['blueDealCard'].x = -219;
                game.CTween.get(this['blueDealCard']).to({ x: 0 }, 1000).call(function () {
                    _this.lightningE.visible = true;
                    _this.lightningE.width = 85;
                    _this.lightningE.height = 288;
                    _this.lightningE.play();
                }).wait(1000).call(function () {
                    _this.lightningE.stop();
                    _this.lightningE.visible = false;
                });
                this['redDealCard'].x = 438;
                game.CTween.get(this['redDealCard']).to({ x: 219 }, 1000);
            }
            else {
                this.lightningE.stop();
                this.lightningE.visible = false;
                this['tiePayout'].visible = false;
                // CTween.removeTweens(this["tieDealCard"]);
            }
        };
        /**
         * 新收到一张牌
         */
        PCBaccaratUI1.prototype.receiveSingleCard = function (name, num) {
            var _this = this;
            _super.prototype.receiveSingleCard.call(this, name, num);
            var card;
            card = this[name];
            card.visible = true;
            card.source = this.pokerBackRes;
            card.width = 86;
            card.height = 122;
            var x0 = card.x;
            var y0 = card.y;
            var distancex = 40, distancey = 40;
            if (name.indexOf("3") != -1) {
                distancex = 25;
                distancey = 120;
            }
            game.CTween.get(card)
                .to({ scaleX: 0, scaleY: 1.1, x: x0 - distancex, y: y0 - distancey }, 300)
                .call(function () { card.source = "mpoker_pic_" + num + "_pc_png"; })
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
                card.width = 86;
                card.height = 122;
            }, this);
            this[name + "K"].visible = false;
        };
        /** 切换房间状态 */
        PCBaccaratUI1.prototype.toggleStage = function (stage) {
            switch (stage) {
                case game.GameState.bet:
                    //显示隐藏
                    this.dealCardGroup.visible = false;
                    this.countdownGroup.visible = true;
                    this.hiddenStage();
                    this.betStage();
                    this.playerPoint = 0;
                    this.bankerPoint = 0;
                    this['betAllNum'].text = "0";
                    this.lastOtherBet = { banker: 0, banker_pair: 0, player: 0, player_pair: 0, tie: 0 };
                    game.CTween.removeTweens(this["tieRotationImg"]);
                    if (!this.isMy) {
                        this.togglewayBtnSty(true);
                    }
                    this['isMyPayOutGroup'].visible = false;
                    this['isWinnerGroup'].visible = false;
                    break;
                case game.GameState.deal_card:
                    //显示隐藏
                    this.dealCardGroup.visible = true;
                    this.countdownGroup.visible = false;
                    this.dealCardStage();
                    // this.sureMoneyData = { banker:0, banker_pair:0, player:0, player_pair:0, tie:0 };
                    this.isOneBet = true;
                    break;
                case game.GameState.payout:
                    //显示隐藏
                    this.dealCardGroup.visible = true;
                    this.countdownGroup.visible = false;
                    this.countdown.startPayOut();
                    this.showProportion();
                    this.isOneBet = true;
                    break;
                case game.GameState.shuffle:
                    //显示隐藏
                    this.dealCardGroup.visible = false;
                    this.countdownGroup.visible = true;
                    this.hiddenStage();
                    this.countdown.startShuffle();
                    if (!this.isMy) {
                        this.togglewayBtnSty(false);
                    }
                    this.isOneBet = true;
                    break;
            }
        };
        /** 隐藏跟房间状态有关的东西,恢复房间默认样式 */
        PCBaccaratUI1.prototype.hiddenStage = function () {
            this.countdown.startPayOut();
            if (this.dealCardGroup.visible == true) {
                this.startMoVeclip(true);
            }
            else {
                this.startMoVeclip(false);
            }
            this["payOutGroup"].visible = false;
            this["payOutNum"].text = '0';
            this.cancelBet();
            this.toggleDeaCardImg();
        };
        /** 切换到下注状态 */
        PCBaccaratUI1.prototype.betStage = function () {
            this.showSureMoney({ player: 0, tie: 0, banker: 0, player_pair: 0, banker_pair: 0 });
            this.cancelBet();
            //下注区默认显示
            this[game.BaccaratModel.PLAYER + "BetZone"].alpha = 0;
            this[game.BaccaratModel.TIE + "BetZone"].alpha = 0;
            this[game.BaccaratModel.BANKER + "BetZone"].alpha = 0;
            this[game.BaccaratModel.PLAYERPAIR + "BetZone"].alpha = 0;
            this[game.BaccaratModel.BANKERPAIR + "BetZone"].alpha = 0;
            this[game.BaccaratModel.PLAYER + "Img"].source = this.baccarat_player_y;
            this[game.BaccaratModel.PLAYER + "NumImg"].source = this.baccarat_pbNum_y;
            this[game.BaccaratModel.TIE + "Img"].source = this.baccarat_tie_y;
            this[game.BaccaratModel.TIE + "NumImg"].source = this.baccarat_tieNum_y;
            this[game.BaccaratModel.BANKER + "Img"].source = this.baccarat_banker_y;
            this[game.BaccaratModel.BANKER + "NumImg"].source = this.baccarat_pbNum_y;
            this[game.BaccaratModel.PLAYERPAIR + "Img"].source = this.bac_p_y;
            this[game.BaccaratModel.PLAYERPAIR + "NumImg"].source = this.bac_pN_y;
            this[game.BaccaratModel.BANKERPAIR + "Img"].source = this.bac_b_y;
            this[game.BaccaratModel.BANKERPAIR + "NumImg"].source = this.bac_bN_y;
        };
        /** 切换到发牌状态 */
        PCBaccaratUI1.prototype.dealCardStage = function () {
            this.countdown.startPayOut();
            this.startMoVeclip(true);
            this.updataSureBtn(false);
            this.updataCancelBtn(false);
            this.cancelBetUnSureNum();
        };
        /** 切换发牌区的图片显示 */
        PCBaccaratUI1.prototype.toggleDeaCardImg = function () {
            //默认样式
            this.playCardNum.font = this.opencard_game_blue;
            this['playerBlueBg'].source = this.opencard_blue;
            this['playPayImg'].source = this.opencard_blue2;
            this.bankerCardNum.font = this.opencard_game_red;
            this['bankerRedBg'].source = this.opencard_red;
            this['bankerPayImg'].source = this.opencard_red2;
            this.lightningE.visible = true;
            this['tiePayout'].visible = false;
            this['playerGrayBg'].visible = false;
            this['bankerGrayBg'].visible = false;
            this["player_1"].alpha = 1;
            this["player_2"].alpha = 1;
            this["player_3"].alpha = 1;
            this["banker_1"].alpha = 1;
            this["banker_2"].alpha = 1;
            this["banker_3"].alpha = 1;
        };
        /**下注区字体和比例变灰色*/
        PCBaccaratUI1.prototype.changeGray = function () {
            this[game.BaccaratModel.PLAYER + "Img"].source = this.bac_p_g;
            this[game.BaccaratModel.PLAYER + "NumImg"].source = this.bac_bpN_g;
            this[game.BaccaratModel.BANKER + "Img"].source = this.bac_b_g;
            this[game.BaccaratModel.BANKER + "NumImg"].source = this.bac_bpN_g;
            this[game.BaccaratModel.PLAYERPAIR + "Img"].source = this.bac_pp_g;
            this[game.BaccaratModel.PLAYERPAIR + "NumImg"].source = this.bac_ppN_g;
            this[game.BaccaratModel.BANKERPAIR + "Img"].source = this.bac_bp_g;
            this[game.BaccaratModel.BANKERPAIR + "NumImg"].source = this.bac_pbpN_g;
            this[game.BaccaratModel.TIE + "Img"].source = this.bac_t_g;
            this[game.BaccaratModel.TIE + "NumImg"].source = this.bac_tN_g;
        };
        /** 游戏结果 */
        PCBaccaratUI1.prototype.gameResults = function (score) {
            var _this = this;
            if (!score)
                return;
            var mySeat = this.mineSeatNum[0];
            var player = score.player;
            var banker = score.banker;
            this.changeGray();
            //和
            if (score.tie) {
                this['playerGrayBg'].visible = false;
                this['playPayImg'].source = this.opencard_gray2;
                this['playerBlueBg'].source = this.opencard_gray;
                this['bankerRedBg'].source = this.opencard_gray;
                this.playCardNum.font = this.opencard_game_gray;
                this['bankerGrayBg'].visible = false;
                this['bankerPayImg'].source = this.opencard_gray2;
                this.bankerCardNum.font = this.opencard_game_gray;
                this['tiePayout'].visible = true;
                this[game.BaccaratModel.TIE + "BetZone"].alpha = 1;
                this[game.BaccaratModel.TIE + "Img"].source = this.baccarat_tie;
                this[game.BaccaratModel.TIE + "NumImg"].source = this.baccarat_tieNum;
                this["tieRotationImg"].anchorOffsetX = 100.5;
                this["tieRotationImg"].anchorOffsetY = 99.5;
                this["imgTie"].alpha = 0.01;
                game.CTween.get(this["tieRotationImg"], { loop: true }).to({ rotation: -360 }, 1000)
                    .call(function () {
                    game.CTween.get(_this["imgTie"]).to({ alpha: 1 }, 500);
                });
                this["player_1"].alpha = 0.3;
                this["player_2"].alpha = 0.3;
                this["player_3"].alpha = 0.3;
                this["banker_1"].alpha = 0.3;
                this["banker_2"].alpha = 0.3;
                this["banker_3"].alpha = 0.3;
            }
            //闲
            if (player > banker) {
                this['playerGrayBg'].visible = false;
                this['playPayImg'].source = this.opencard_blue2;
                this['playerBlueBg'].source = this.opencard_blue;
                this['bankerRedBg'].source = this.opencard_gray;
                this.playCardNum.font = this.opencard_game_blue;
                this['bankerGrayBg'].visible = true;
                this['bankerPayImg'].source = this.opencard_gray2;
                this.bankerCardNum.font = this.opencard_game_gray;
                this['tiePayout'].visible = false;
                this[game.BaccaratModel.PLAYER + "BetZone"].alpha = 1;
                this[game.BaccaratModel.PLAYER + "Img"].source = this.baccarat_player;
                this[game.BaccaratModel.PLAYER + "NumImg"].source = this.baccarat_playerNum;
                this["player_1"].alpha = 1;
                this["player_2"].alpha = 1;
                this["player_3"].alpha = 1;
                this["banker_1"].alpha = 0.3;
                this["banker_2"].alpha = 0.3;
                this["banker_3"].alpha = 0.3;
                if (this.sureMoneyData.player) {
                    this[game.BaccaratModel.PLAYER + "BetMine" + mySeat].visible = true;
                    this[game.BaccaratModel.BANKER + "BetMine" + mySeat].visible = false;
                    this[game.BaccaratModel.TIE + "BetMine" + mySeat].visible = false;
                    this[game.BaccaratModel.PLAYER + "BetMineNum" + mySeat].visible = true;
                    this[game.BaccaratModel.BANKER + "BetMineNum" + mySeat].visible = false;
                    this[game.BaccaratModel.TIE + "BetMineNum" + mySeat].visible = false;
                }
            }
            //庄
            if (player < banker) {
                this['playerGrayBg'].visible = false;
                this['playPayImg'].source = this.opencard_gray2;
                this['playerBlueBg'].source = this.opencard_gray;
                this['bankerRedBg'].source = this.opencard_red;
                this.playCardNum.font = this.opencard_game_gray;
                this['bankerGrayBg'].visible = false;
                this['bankerPayImg'].source = this.opencard_red2;
                this.bankerCardNum.font = this.opencard_game_red;
                this['tiePayout'].visible = false;
                this[game.BaccaratModel.BANKER + "BetZone"].alpha = 1;
                this[game.BaccaratModel.BANKER + "Img"].source = this.baccarat_banker;
                this[game.BaccaratModel.BANKER + "NumImg"].source = this.baccarat_bankerNum;
                this["player_1"].alpha = 0.3;
                this["player_2"].alpha = 0.3;
                this["player_3"].alpha = 0.3;
                this["banker_1"].alpha = 1;
                this["banker_2"].alpha = 1;
                this["banker_3"].alpha = 1;
                if (this.sureMoneyData.banker) {
                    this[game.BaccaratModel.PLAYER + "BetMine" + mySeat].visible = false;
                    this[game.BaccaratModel.BANKER + "BetMine" + mySeat].visible = true;
                    this[game.BaccaratModel.TIE + "BetMine" + mySeat].visible = false;
                    this[game.BaccaratModel.PLAYER + "BetMineNum" + mySeat].visible = false;
                    this[game.BaccaratModel.BANKER + "BetMineNum" + mySeat].visible = true;
                    this[game.BaccaratModel.TIE + "BetMineNum" + mySeat].visible = false;
                }
            }
            //闲对
            if (score.player_pair) {
                this[game.BaccaratModel.PLAYERPAIR + "BetZone"].alpha = 1;
                this[game.BaccaratModel.PLAYERPAIR + "Img"].source = this.baccarat_playerp;
                this[game.BaccaratModel.PLAYERPAIR + "NumImg"].source = this.baccarat_playerpN;
            }
            else {
                this[game.BaccaratModel.PLAYERPAIR + "BetMine" + mySeat].visible = false;
                this[game.BaccaratModel.PLAYERPAIR + "BetMineNum" + mySeat].visible = false;
            }
            //庄对
            if (score.banker_pair) {
                this[game.BaccaratModel.BANKERPAIR + "BetZone"].alpha = 1;
                this[game.BaccaratModel.BANKERPAIR + "Img"].source = this.baccarat_bankerp;
                this[game.BaccaratModel.BANKERPAIR + "NumImg"].source = this.baccarat_bankerpN;
            }
            else {
                this[game.BaccaratModel.BANKERPAIR + "BetMine" + mySeat].visible = false;
                this[game.BaccaratModel.BANKERPAIR + "BetMineNum" + mySeat].visible = false;
            }
            this.playCardNum.text = player + '';
            this.bankerCardNum.text = banker + '';
        };
        /** 显示我的派彩结果 */
        PCBaccaratUI1.prototype.showMyPayOut = function (num) {
            if (num > 0) {
                this["payOutGroup"].visible = true;
                this["payOutNum"].text = game.NumberUtil.getSplitNumStr(num);
                this.showPayOutMove();
            }
            else {
                this["payOutGroup"].visible = false;
                this["payOutNum"].text = '0';
            }
        };
        /** 显示派彩动画 */
        PCBaccaratUI1.prototype.showPayOutMove = function () {
            var y0 = 132;
            var y3 = 140;
            for (var i = 0; i < 7; i++) {
                if (i < 3) {
                    this["payOutImg" + i].y = y0 - i * 15;
                }
                else {
                    this["payOutImg" + i].y = y3 - (i - 3) * 15;
                }
            }
            this.payOutBg.visible = false;
            this.payOutTxtGroup.visible = false;
            this.payOutBg.alpha = 0.01;
            this.payOutTxtGroup.alpha = 0.01;
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
        PCBaccaratUI1.prototype.showChipMove = function (index) {
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
                this.payOutTxtGroup.visible = true;
                game.CTween.get(this.payOutTxtGroup).to({ alpha: 1 }, 1000);
                game.CTween.get(this.payOutBg).to({ alpha: 1 }, 1000);
            }
            else {
                return;
            }
        };
        //----------------------限额相关--------------------
        /** 显示房间信息 */
        PCBaccaratUI1.prototype.showRoomInfoMsg = function (msg) {
            if (msg) {
                this['bottomRoomName'].text = game.LanguageUtil.translate("founder_lbl_room_name") + ":" + msg.name;
                this['bottomDealerName'].text = game.LanguageUtil.translate("global_lbl_dealer") + game.LanguageUtil.translate("global_lbl_name") + ":" + msg.dealerName;
                this['bottomRoundID'].text = game.LanguageUtil.translate("global_lbl_round_no") + ("\uFF1A" + msg.roundID);
                this['bottomLimit'].text = game.LanguageUtil.translate("global_lbl_room_list_limit") + ("\uFF1A" + game.NumberUtil.getSplitNumStr(msg.limitMin) + " - " + game.NumberUtil.getSplitNumStr(msg.limitMax));
            }
            else {
                this['bottomRoomName'].text = game.LanguageUtil.translate("founder_lbl_room_name");
                this['bottomDealerName'].text = game.LanguageUtil.translate("global_lbl_dealer") + game.LanguageUtil.translate("global_lbl_name") + ":";
                this['bottomRoundID'].text = game.LanguageUtil.translate("global_lbl_round_no") + ":";
                this['bottomLimit'].text = game.LanguageUtil.translate("global_lbl_room_list_limit") + "\uFF1A100-1,500";
            }
        };
        /**点击限额按钮*/
        PCBaccaratUI1.prototype.goRoomLimit = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_PCRoomLimit, this.data);
        };
        /**庄闲和按比例显示*/
        PCBaccaratUI1.prototype.showProportion = function () {
            var soData = game.ClubModel.getInstance().getRoomSource(this.data);
            if (!soData)
                return;
            var bankerNum = soData.round_statistics.banker;
            var playerNum = soData.round_statistics.player;
            var tieNum = soData.round_statistics.tie;
            if (soData) {
                this['playerBlueAlabel'].text = game.LanguageUtil.translate("game_lbl_player_simple") + playerNum;
                this['tieGreenAlabel'].text = game.LanguageUtil.translate("game_lbl_tie_simple") + tieNum;
                this['banklerRedAlabel'].text = game.LanguageUtil.translate("game_lbl_banker_simple") + bankerNum;
                if (bankerNum == playerNum && bankerNum == tieNum) {
                    this['playerBlueImg'].width = 101;
                    this['tieGreenImg'].width = 101;
                    this['banklerRedImg'].width = 101;
                    this['playerBlueImg'].x = 0;
                    this['tieGreenImg'].x = 102.5;
                    this['banklerRedImg'].x = 205;
                }
                else if (playerNum == 0) {
                    if (bankerNum == tieNum) {
                        this['playerBlueImg'].width = 0;
                        this['tieGreenImg'].width = 152;
                        this['banklerRedImg'].width = 152;
                        this['tieGreenImg'].x = 0;
                        this['banklerRedImg'].x = 154;
                    }
                    else {
                        if (bankerNum == 0) {
                            this['playerBlueImg'].width = 0;
                            this['tieGreenImg'].width = 306;
                            this['banklerRedImg'].width = 0;
                            this['tieGreenImg'].x = 0;
                        }
                        else if (tieNum == 0) {
                            this['playerBlueImg'].width = 0;
                            this['tieGreenImg'].width = 0;
                            this['banklerRedImg'].width = 306;
                            this['banklerRedImg'].x = 0;
                        }
                        else {
                            var btNum = bankerNum + tieNum;
                            this['playerBlueImg'].width = 0;
                            this['tieGreenImg'].width = (tieNum / btNum) * 304;
                            this['banklerRedImg'].width = (bankerNum / btNum) * 304;
                            this['tieGreenImg'].x = 0;
                            this['banklerRedImg'].x = (tieNum / btNum) * 304 + 2;
                        }
                    }
                }
                else if (bankerNum == 0) {
                    if (playerNum == tieNum) {
                        this['banklerRedImg'].width = 0;
                        this['tieGreenImg'].width = 152;
                        this['playerBlueImg'].width = 152;
                        this['tieGreenImg'].x = 154;
                        this['playerBlueImg'].x = 0;
                    }
                    else {
                        if (playerNum == 0) {
                            this['playerBlueImg'].width = 0;
                            this['tieGreenImg'].width = 306;
                            this['banklerRedImg'].width = 0;
                            this['tieGreenImg'].x = 0;
                        }
                        else if (tieNum == 0) {
                            this['playerBlueImg'].width = 306;
                            this['tieGreenImg'].width = 0;
                            this['banklerRedImg'].width = 0;
                            this['playerBlueImg'].x = 0;
                        }
                        else {
                            var ptNum = playerNum + tieNum;
                            this['playerBlueImg'].width = (playerNum / ptNum) * 304;
                            this['tieGreenImg'].width = (tieNum / ptNum) * 304;
                            this['banklerRedImg'].width = 0;
                            this['tieGreenImg'].x = (playerNum / ptNum) * 304 + 2;
                            this['playerBlueImg'].x = 0;
                        }
                    }
                }
                else if (tieNum == 0) {
                    if (playerNum == bankerNum) {
                        this['banklerRedImg'].width = 152;
                        this['tieGreenImg'].width = 0;
                        this['playerBlueImg'].width = 152;
                        this['banklerRedImg'].x = 154;
                        this['playerBlueImg'].x = 0;
                    }
                    else {
                        if (playerNum == 0) {
                            this['playerBlueImg'].width = 0;
                            this['tieGreenImg'].width = 0;
                            this['banklerRedImg'].width = 306;
                            this['banklerRedImg'].x = 0;
                        }
                        else if (bankerNum == 0) {
                            this['playerBlueImg'].width = 306;
                            this['tieGreenImg'].width = 0;
                            this['banklerRedImg'].width = 0;
                            this['playerBlueImg'].x = 0;
                        }
                        else {
                            var pbNum = playerNum + bankerNum;
                            this['playerBlueImg'].width = (playerNum / pbNum) * 304;
                            this['tieGreenImg'].width = 0;
                            this['banklerRedImg'].width = (bankerNum / pbNum) * 304;
                            this['banklerRedImg'].x = (playerNum / pbNum) * 304 + 2;
                            this['playerBlueImg'].x = 0;
                        }
                    }
                }
                else {
                    var allNum = playerNum + bankerNum + tieNum;
                    this['playerBlueImg'].width = (playerNum / allNum) * 303;
                    this['tieGreenImg'].width = (tieNum / allNum) * 303;
                    this['banklerRedImg'].width = (bankerNum / allNum) * 303;
                    this['playerBlueImg'].x = 0;
                    this['tieGreenImg'].x = (playerNum / allNum) * 303 + 1.5;
                    this['banklerRedImg'].x = (playerNum / allNum) * 303 + (tieNum / allNum) * 303 + 3;
                }
            }
        };
        /** 聊天框 */
        PCBaccaratUI1.prototype.initChat = function () {
            this.chat = new game.chat();
            this.chatGroup.addChild(this.chat);
            this.chat.top = 0;
            this.chat.bottom = 0;
            this.chat.left = 0;
            this.chat.right = 0;
            this.chatGroup.visible = true;
        };
        PCBaccaratUI1.prototype.setChatData = function (data) {
            if (!data || !data.length)
                return;
            if (this.chat) {
                this.chat.setData(data);
            }
        };
        //------------------------编辑筹码-----------------------------
        /** 隐藏或显示筹码编辑group
         * @param show {boolean} true - 显示筹码编辑group | false - 隐藏筹码编辑group
         */
        PCBaccaratUI1.prototype.setEditGroup = function (show) {
            this.chatGroup.visible = !show;
            this.groupChip.right = -435;
            this.groupChip.visible = show;
            if (show) {
                game.CTween.get(this.groupChip)
                    .to({ right: 0 }, 1000);
            }
            else {
                game.CTween.removeTweens(this.groupChip);
            }
            this.groupErr.visible = false;
            this.editChipBtn.touchEnabled = !show;
            this.btnConfirm.touchEnabled = !show;
            this.btnConfirm.setState = "disabled";
            for (var i = 0; i <= 2; i++) {
                this["chipBg" + i].alpha = 0.5;
            }
            if (show) {
                this.chipEdit0.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.editChipBtn.setState = "disabled";
            }
            else {
                this.setChips(this.userChips);
                this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.editChipBtn.setState = "up";
            }
        };
        /** 筹码编辑输入框响应 */
        PCBaccaratUI1.prototype.onEditChange = function (evt) {
            this.btnConfirm.touchEnabled = true;
            this.btnConfirm.setState = "up";
            var index = [this.chipEdit0, this.chipEdit1, this.chipEdit2].indexOf(evt.currentTarget);
            if (index == -1) {
                return;
            }
            this["chipBg" + index].alpha = 1;
            var text = this["chipEdit" + index].text;
            text = text.replace(/[^\d.]/g, '');
            if (text.length > 9) {
                this["chipEdit" + index].text = this.tet;
            }
            else {
                this["chipEdit" + index].text = text;
                this.tet = text;
            }
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                var valid = this.checkInput(index);
                if (!valid) {
                    if (!text) {
                        this["chipEdit" + index].text = "0";
                    }
                    // let num = this.userChips[index] || this.roomChips[index];
                    // (this[`chipEdit${index}`] as eui.TextInput).text = num / 100 + "";
                }
                else {
                    this["chipEdit" + index].text = "" + +text;
                }
                this.btnConfirm.enabled = valid;
            }
        };
        /** 筹码编辑输入框内容格式检查
         * @param index {number} 输入框编号
         */
        PCBaccaratUI1.prototype.checkInput = function (index) {
            /** 当前输入框 */
            var inputLabel = this["chipEdit" + index];
            /** 当前输入框对应的筹码金额显示框 */
            var text = inputLabel.text;
            text = text.trim();
            var text2 = text.replace(/\b(0+)/gi, "");
            if (!text) {
                this.showEditMsg("筹码金额不能为空");
                return false;
            }
            if (text == "0") {
                this.showEditMsg("筹码配置须大于0");
                this["chipEdit" + index].text = this.userChips[index] / 100 + "";
                return false;
            }
            if (text.split(".")[0].length > 9) {
                this.showEditMsg("最大只能输入9位整数和一位小数");
                return false;
            }
            return true;
        };
        /** 设置用户筹码
         * @param chips {Array<number>} 筹码列表
         */
        PCBaccaratUI1.prototype.setChips = function (chips) {
            // this.roomChips = ClubModel.getInstance().getClubRoomsSetting(this.data).chips.slice();
            for (var i = 0; i < 3; i++) {
                if (chips[i]) {
                    this.userChips[i] = chips[i];
                }
                else {
                    this.userChips[i] = this.roomChips[i];
                }
            }
            for (var i = 0; i <= 2; i++) {
                var num = this.userChips[i];
                // || this.roomChips[i];
                this["chipEdit" + i].text = num / 100 + "";
                this["chipNum" + i].text = game.NumberUtil.getSplitNumStr(num, 3);
            }
            this.chipEdit0.bottom = -5;
            this.chipEdit1.bottom = -5;
            this.chipEdit2.bottom = -5;
            this.chipEdit0.textDisplay.textAlign = "center";
            this.chipEdit1.textDisplay.textAlign = "center";
            this.chipEdit2.textDisplay.textAlign = "center";
            this.chipEdit0.textDisplay.verticalAlign = egret.VerticalAlign.BOTTOM;
            this.chipEdit1.textDisplay.verticalAlign = egret.VerticalAlign.BOTTOM;
            this.chipEdit2.textDisplay.verticalAlign = egret.VerticalAlign.BOTTOM;
            this.chipEdit0.textDisplay.size = 18;
            this.chipEdit1.textDisplay.size = 18;
            this.chipEdit2.textDisplay.size = 18;
        };
        /** 确认编辑筹码 */
        PCBaccaratUI1.prototype.confirmEditChip = function () {
            var _this = this;
            var chips = [];
            for (var i = 0; i <= 2; i++) {
                var valid = this.checkInput(i);
                if (!valid) {
                    return;
                }
                var text = this["chipEdit" + i].text;
                var text2 = text.replace(/\b(0+)/gi, "");
                var num = Math.round(100 * +text2);
                chips[i] = this.userChips[i] || this.roomChips[i];
                if (!isNaN(num)) {
                    chips[i] = num;
                }
                else {
                    this.showEditMsg("最大只能输入9位整数和一位小数");
                    return;
                }
                if (text.split(".")[1] && text.split(".")[1].length > 1) {
                    this.showEditMsg("最大只能输入9位整数和一位小数");
                    this["chipEdit" + i].textDisplay.setFocus();
                    return;
                }
            }
            game.BaccaratController.getInstance().setChips(this.data, chips).then(function () {
                game.BaccaratController.getInstance().getChips(_this.data).then(function (data) {
                    _this.setChips(data["chips"]);
                    _this.setEditGroup(false);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_Sidebar.name);
                });
            }).catch(function () {
                _this.showEditMsg("编辑失败");
            });
        };
        /** 显示筹码编辑输入错误信息
         * @param msg {string} 错误信息
         */
        PCBaccaratUI1.prototype.showEditMsg = function (msg) {
            var _this = this;
            this.alabelErr.text = game.LanguageUtil.translate(msg);
            game.CTween.removeTweens(this.groupErr);
            this.groupErr.alpha = 1;
            this.groupErr.visible = true;
            game.CTween.get(this.groupErr).wait(1000).to({
                alpha: 0
            }, 2000).call(function () {
                _this.groupErr.visible = false;
                _this.groupErr.alpha = 1;
            }, this);
        };
        //----------------------------------旁观-----------------------------------------
        /**转化*/
        PCBaccaratUI1.prototype.changeNum = function (key) {
            var seatN;
            switch (key) {
                case "1":
                    seatN = 0;
                    break;
                case "2":
                    seatN = 1;
                    break;
                case "3":
                    seatN = 2;
                    break;
                case "5":
                    seatN = 3;
                    break;
                case "6":
                    seatN = 4;
                    break;
                case "7":
                    seatN = 5;
                    break;
                case "8":
                    seatN = 6;
                    break;
            }
            return seatN;
        };
        /** 显示所有座位的信息 */
        PCBaccaratUI1.prototype.showAllSeat = function (seats) {
            if (seats) {
                for (var key in seats) {
                    var seatN = this.changeNum(key);
                    var seat = seats[key];
                    this["seatFrame" + seatN].visible = false;
                    this["seatNum" + seatN].source = "seat_pic_seat" + key + "_pc_png";
                    this["seatUesrHead" + seatN].source = this.seat_other_head;
                    this["seatUesrBcePic" + seatN].source = this.seat_other_money;
                    this["seatUesrName" + seatN].textColor = 0xD6B783;
                    this["seatUesrBce" + seatN].textColor = 0xD6B783;
                    if (seat && seat["nick"]) {
                        this["seatUesrHead" + seatN].visible = true;
                        this["seatUesrBcePic" + seatN].visible = true;
                        this["seatUesrName" + seatN].visible = true;
                        this["seatUesrBce" + seatN].visible = true;
                        this["seatChair" + seatN].visible = false;
                        this["seatUesrName" + seatN].text = seat.nick;
                        this["seatUesrBce" + seatN].text = game.NumberUtil.getSplitNumStr(seat.balance, 3) + '';
                        this["isMyPayName" + key].visible = true;
                        this["isMyPayImg" + key].visible = false;
                        this["isMyPayName" + key].text = seat.nick;
                    }
                    else {
                        this["seatUesrHead" + seatN].visible = false;
                        this["seatUesrBcePic" + seatN].visible = false;
                        this["seatUesrName" + seatN].visible = false;
                        this["seatUesrBce" + seatN].visible = false;
                        this["seatChair" + seatN].visible = true;
                        this["isMyPayName" + key].visible = false;
                        this["isMyPayImg" + key].visible = true;
                    }
                }
            }
        };
        /** 房主观战所有人的下注数据 */
        PCBaccaratUI1.prototype.showAllBet = function (allBet) {
            if (!allBet)
                return;
            for (var key in allBet) {
                var seatBet = allBet[key];
                var seatN = this.changeNum(key);
                var bets = { banker: 0, banker_pair: 0, player: 0, player_pair: 0, tie: 0 };
                for (var key1 in bets) {
                    this[key1 + "BetMine" + seatN].visible = false;
                    this[key1 + "BetMineNum" + seatN].visible = false;
                    if (seatBet[key1]) {
                        this[key1 + "BetOtherNum" + seatN].text = game.NumberUtil.getSplitNumStr(seatBet[key1], 1);
                        this[key1 + "BetOther" + seatN].visible = true;
                        this[key1 + "BetOtherNum" + seatN].visible = true;
                    }
                    else {
                        this[key1 + "BetOther" + seatN].visible = false;
                        this[key1 + "BetOtherNum" + seatN].visible = false;
                    }
                }
            }
        };
        /** 房主观战盈余 */
        PCBaccaratUI1.prototype.showAllPay = function (allPay) {
            if (!allPay)
                return;
            if (allPay[2] == false) {
                this['isMyPayOutGroup'].visible = false;
                return;
            }
            else {
                this['isMyPayOutGroup'].visible = true;
            }
            var newPay = allPay[0];
            for (var key in newPay) {
                var seatBet = newPay[key];
                this["isMyPayNum" + key].text = key + '';
                if (seatBet['bet']) {
                    this["isMyPayBetNum" + key].text = game.NumberUtil.getSplitNumStr(seatBet['bet']);
                }
                else {
                    this["isMyPayBetNum" + key].text = '——';
                }
                if (seatBet['pay']) {
                    this["isMyPayPayNum" + key].text = game.NumberUtil.getSplitNumStr(seatBet['pay']);
                }
                else {
                    this["isMyPayPayNum" + key].text = '——';
                }
            }
            if (allPay[1] > 0) {
                this['isMyPayOutNum'].font = this.bac_surplus_red;
                this['isMyPayOutNum'].text = '+' + game.NumberUtil.getSplitNumStr(allPay[1]);
            }
            else {
                this['isMyPayOutNum'].font = this.bac_surplus_green;
                this['isMyPayOutNum'].text = game.NumberUtil.getSplitNumStr(allPay[1]);
            }
        };
        /**  玩家下注的筹码动画 */
        PCBaccaratUI1.prototype.allBetFly = function (body) {
            var _this = this;
            if (!this.isMy)
                return;
            var group;
            var numSeat = body.seat;
            var lastChip, chipN;
            var numY = this[body.type + "BetGroup"].y + this[body.type + "BetGroup" + numSeat].y;
            var numX = this[body.type + "BetGroup"].x + this[body.type + "BetGroup" + numSeat].x;
            group = this[body.type + "BetGroup"];
            if (lastChip) {
                chipN = body.chipNum - lastChip;
            }
            else {
                chipN = body.chipNum;
            }
            var chip = new game.betChip(game.NumberUtil.getSplitNumStr(chipN, 3));
            lastChip = body.chipNum;
            if (numSeat < 3) {
                chip.x = this["seatUesrBce" + numSeat].x;
                chip.y = this["seatUesrBce" + numSeat].y - 30;
            }
            else if (numSeat == 3) {
                chip.x = this["seatUesrBce" + numSeat].x - 30;
                chip.y = this["seatUesrBce" + numSeat].y - 20;
            }
            else {
                chip.x = this["seatUesrBce" + numSeat].x + 70;
                chip.y = this["seatUesrBce" + numSeat].y - 30;
            }
            this.betShowGroup.addChild(chip);
            game.CTween.get(chip).to({ x: numX, y: numY }, 500).call(function () {
                _this[body.type + "BetOtherNum" + numSeat].text = game.NumberUtil.getSplitNumStr(body.chipNum, 1);
                _this[body.type + "BetOther" + numSeat].visible = true;
                _this[body.type + "BetOtherNum" + numSeat].visible = true;
                chip.parent.removeChild(chip);
            });
        };
        //------------------------------------dispose-------------------------------------------------
        PCBaccaratUI1.prototype.dispose = function () {
            this.disposeCTween();
            this.disposeR();
            this.disposeEvent();
            clearTimeout(this.setTimeoutStage);
            game.BaccaratModel.getInstance().sendRoomLeave(this.data);
            if (this.bead_roadMap) {
                this.bead_roadMap.dispose();
                this.bead_roadMap = null;
                this.bead_road43.removeChildren();
                this.bead_road43 = null;
            }
            if (this.big_roadMap) {
                this.big_roadMap.dispose();
                this.big_roadMap = null;
                this.big_road43.removeChildren();
                this.big_road43 = null;
            }
            if (this.big_eye_roadMap) {
                this.big_eye_roadMap.dispose();
                this.big_eye_roadMap = null;
                this.big_eye_road43.removeChildren();
                this.big_eye_road43 = null;
            }
            if (this.small_roadMap) {
                this.small_roadMap.dispose();
                this.small_roadMap = null;
                this.small_road43.removeChildren();
                this.small_road43 = null;
            }
            if (this.cockroach_roadMap) {
                this.cockroach_roadMap.dispose();
                this.cockroach_roadMap = null;
                this.cockroach_road43.removeChildren();
                this.cockroach_road43 = null;
            }
            game.MediatorManager.closeMediator(game.Mediators.Mediator_BaccaratMediator.name);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_RoomInfo.name);
            this._mediator = null;
            _super.prototype.dispose.call(this);
        };
        /**dispose CTween*/
        PCBaccaratUI1.prototype.disposeCTween = function () {
            game.CTween.removeTweens(this["ChipBg"]);
            game.CTween.removeTweens(this["tieRotationImg"]);
            game.CTween.removeTweens(this.groupErr);
            game.CTween.removeTweens(this.groupChip);
            game.CTween.removeTweens(this.payOutTxtGroup);
            game.CTween.removeTweens(this.payOutBg);
            game.CTween.removeTweens(this['blueDealCard']);
            for (var i = 0; i < 7; i++) {
                game.CTween.removeTweens(this["payOutImg" + i]);
            }
            game.CTween.removeTweens(this["tieRotationImg"]);
            game.CTween.removeTweens(this["imgTie"]);
            game.CTween.removeTweens(this["redDealCard"]);
            game.CTween.removeTweens(this["redMsgGroup"]);
            game.CTween.removeTweens(this['isWinnerGroup']);
        };
        /**dispose 对象*/
        PCBaccaratUI1.prototype.disposeR = function () {
            this.chat.dispose();
            // this.countdown.dispose();
            this.bead_roadMap.dispose();
            this.big_roadMap.dispose();
            this.big_eye_roadMap.dispose();
            this.small_roadMap.dispose();
            this.cockroach_roadMap.dispose();
            this.countdown.dispose();
        };
        /**dispose 事件*/
        PCBaccaratUI1.prototype.disposeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
            this.chipEdit0.removeEventListener(egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.chipEdit1.removeEventListener(egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.chipEdit2.removeEventListener(egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.chipEdit0.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.chipEdit1.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.chipEdit2.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
        };
        return PCBaccaratUI1;
    }(game.BaccaratBaseUI));
    game.PCBaccaratUI1 = PCBaccaratUI1;
    __reflect(PCBaccaratUI1.prototype, "game.PCBaccaratUI1");
})(game || (game = {}));
//# sourceMappingURL=PCBaccaratUI1.js.map