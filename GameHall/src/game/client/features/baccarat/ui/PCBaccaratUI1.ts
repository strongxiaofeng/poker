module game
{
    /**
     * PC俱乐部房间列表UI组件
     * by 唐茂
     */
    export class PCBaccaratUI1 extends BaccaratBaseUI
    {
        public constructor(data: string)
        {
            super(data);
            this.skinName = "resource/skins/game_skins/pc/baccarat/baccaratSkin.exml";
            this.userChips = [];
            this.roomChips = [];
        }
        /** mediator的指向 */
        public _mediator: BaccaratMediator;
        //计时器
        public countdown: countdown;
        /** 计时器Group */
        public countdownGroup: eui.Group;
        // 路数相关
        /** 路书容器 */
        public roadMap43: eui.Group;
        /** 珠盘路 */
        public bead_road43: eui.Group;
        public bead_roadMap: RoadMap;
        /** 大路 */
        public big_road43: eui.Group;
        public big_roadMap: RoadMap;
        /** 大眼路路 */
        public big_eye_road43: eui.Group;
        public big_eye_roadMap: RoadMap;
        /** 小路 */
        public small_road43: eui.Group;
        public small_roadMap: RoadMap;
        /** 凹凸路 */
        public cockroach_road43: eui.Group;
        public cockroach_roadMap: RoadMap;
        /** 画笔 */
        public shp: egret.Shape;
        /** 筹码 */
        //蓝色
        public blueChip: eui.Image;
        //绿色
        public greenChip: eui.Image;
        //红色
        public redChip: eui.Image;
        /**------------- 点击下注  -------------- */
        // 父级
        public betShowGroup: eui.Group;
        // 闲
        public playerBetZone: eui.Image;
        // 庄
        public bankerBetZone: eui.Image;
        // 和
        public tieBetZone: eui.Image;
        // 闲对
        public player_pairBetZone: eui.Image;
        // 庄对
        public banker_pairBetZone: eui.Image;
        /** 筹码数组 */
        public chipArr: Array<number> = [100, 200, 300];
        /** 确定取消下注按钮 */
        public sureBtn: eui.AButton;
        public cancelBtn: eui.AButton;
        /**----------  发牌相关 -------- */
        /** 发牌Group */
        public dealCardGroup: eui.Group;
        /** 发牌闪电动画 */
        public lightningE: eui.AMovieClip;
        /** 发牌背景资源 */
        public pokerBackRes: string = 'mpoker_pic_back_pc_png';
        /** 闲的总点数 */
        protected playerPoint: number = 0;
        protected playCardNum: eui.BitmapLabel;
        /** 庄的总点数 */
        protected bankerPoint: number = 0;
        protected bankerCardNum: eui.BitmapLabel;
        /**限额按钮相关*/
        protected limitBtn: eui.AButton;
        protected limitMouseImg: eui.Image;
        //-------------------编辑筹码相关-------------------------
        /**编辑筹码框*/
        protected groupChip: eui.Group;
        /**编辑筹码按钮*/
        protected editChipBtn: eui.AButton;
        /**关闭编辑筹码按钮*/
        protected btnCancel: eui.AButton;
        /**确定编辑筹码按钮*/
        protected btnConfirm: eui.AButton;
        /**编辑错误提示*/
        protected groupErr: eui.Group;
        protected alabelErr: eui.ALabel;
        // 图标上显示数字
        protected chipNum0: eui.BitmapLabel;
        protected chipNum1: eui.BitmapLabel;
        protected chipNum2: eui.BitmapLabel;
        // 背景 
        protected chipBg0: eui.Image;
        protected chipBg1: eui.Image;
        protected chipBg2: eui.Image;
        // 编辑框
        protected chipEdit0: eui.TextInput;
        protected chipEdit1: eui.TextInput;
        protected chipEdit2: eui.TextInput;
        //-----------------变量申明---------------
        protected userChips: Array<number>;
        protected roomChips: Array<number>;

        /**房主旁观用*/
        protected groupMy: eui.Group;
        protected groupChipMy: eui.Group;
        /**------------------数据相关-------------------------- */
        /** 当前选中的筹码 */
        public thisChip: number = 0;
        //----------------------------没有用字符串拼接的相关资源名----------------------------------
        /**发牌区庄闲的灰色背景*/
        protected opencard_gray2: string = "opencard_pic_gray2_pc_png";
        /**发牌区的灰色背景*/
        protected opencard_gray: string = "opencard_pic_gray_pc_png";
        /**发牌区庄红色背景*/
        protected opencard_red2: string = "opencard_pic_red2_pc_png";
        /**发牌区闲蓝色背景*/
        protected opencard_blue2: string = "opencard_pic_blue2_pc_png";
        /**发牌区红色背景*/
        protected opencard_red: string = "opencard_pic_red_pc_png";
        /**发牌区蓝色背景*/
        protected opencard_blue: string = "opencard_pic_blue_pc_png";
        /**下注区闲的蓝字背景*/
        protected baccarat_player: string = "baccarat_pic_player_b_pc_png";
        /**下注区闲的黄字背景*/
        protected baccarat_player_y: string = "baccarat_pic_player_y_pc_png";
        /**下注区闲的蓝字比例背景*/
        protected baccarat_playerNum: string = "bettingarea_pic_ratiop2_pc_png";
        /**下注区闲对的蓝字背景*/
        protected baccarat_playerp: string = "baccarat_pic_playerpair_b_pc_png";
        /**下注区闲对的蓝比例背景*/
        protected baccarat_playerpN: string = "bettingarea_pic_ratiopp2_pc_png";
        /**下注区和的绿字背景*/
        protected baccarat_tie: string = "baccarat_pic_tie_g_pc_png";
        /**下注区和的黄字背景*/
        protected baccarat_tie_y: string = "baccarat_pic_tie_y_pc_png";
        /**下注区和的绿字比例背景*/
        protected baccarat_tieNum: string = "bettingarea_pic_ratiot2_pc_png";
        /**下注区庄的红字背景*/
        protected baccarat_banker: string = "baccarat_pic_banker_r_pc_png";
        /**下注区庄对的红字背景*/
        protected baccarat_bankerp: string = "baccarat_pic_bankerpair_r_pc_png";
        /**下注区庄对的红比例背景*/
        protected baccarat_bankerpN: string = "bettingarea_pic_ratiobp2_pc_png";
        /**下注区庄的黄字背景*/
        protected baccarat_banker_y: string = "baccarat_pic_banker_y_pc_png";
        /**下注区庄的红字比例背景*/
        protected baccarat_bankerNum: string = "bettingarea_pic_ratiob2_pc_png";
        /**下注区和的黄字比例背景*/
        protected baccarat_tieNum_y: string = "bettingarea_pic_ratiot1_pc_png";
        /**下注区庄闲的黄字比例背景*/
        protected baccarat_pbNum_y: string = "bettingarea_pic_ratiopb1_pc_png";
        /**下注区闲对的黄字比例背景*/
        protected bac_pN_y: string = "bettingarea_pic_ratiopp1_pc_png";
        /**下注区庄对的黄字比例背景*/
        protected bac_bN_y: string = "bettingarea_pic_ratiobp1_pc_png";
        /**下注区闲对的黄字背景*/
        protected bac_p_y: string = "baccarat_pic_playerpair_y_pc_png";
        /**下注区庄对黄字背景*/
        protected bac_b_y: string = "baccarat_pic_bankerpair_y_pc_png";
        /**下注区庄的灰色字体*/
        protected bac_b_g: string = "baccarat_pic_banker_w_pc_png";
        /**下注区闲的灰色字体*/
        protected bac_p_g: string = "baccarat_pic_player_w_pc_png";
        /**下注区庄对的灰色字体*/
        protected bac_bp_g: string = "baccarat_pic_bankerpair_w_pc_png";
        /**下注区闲对的灰色字体*/
        protected bac_pp_g: string = "baccarat_pic_playerpair_w_pc_png";
        /**下注区和的灰色字体*/
        protected bac_t_g: string = "baccarat_pic_tie_w_pc_png";
        /**下注区庄闲比例的灰色字体*/
        protected bac_bpN_g: string = "bettingarea_pic_ratiopb3_pc_png";
        /**下注区庄对比例的灰色字体*/
        protected bac_pbpN_g: string = "bettingarea_pic_ratiobp3_pc_png";
        /**下注区闲对比例的灰色字体*/
        protected bac_ppN_g: string = "bettingarea_pic_ratiopp3_pc_png";
        /**下注区和比例的灰色字体*/
        protected bac_tN_g: string = "bettingarea_pic_ratiot3_pc_png";
        /**座位区*/
        protected seat_Mine_head: string = "desk_pic_myname_pc_png";
        protected seat_Mine_money: string = "desk_pic_mymoney_pc_png";
        protected seat_other_head: string = "desk_pic_name_pc_png";
        protected seat_other_money: string = "desk_pic_money_pc_png";
        //-----------------------字体相关资源名------------------------------
        /**发牌区庄闲灰色字体*/
        protected opencard_game_gray: string = "game_share_gray_156_pc_fnt";
        /**发牌区闲蓝色字体*/
        protected opencard_game_blue: string = "game_share_blue_156_pc_fnt";
        /**发牌区庄红色字体*/
        protected opencard_game_red: string = "game_share_red_156_pc_fnt";
        /**下注确认金色字体*/
        protected baccarat_game_golden = "game_share_golden_30_pc_fnt";
        /**下注未确认灰色字体*/
        protected baccarat_game_gray = "game_share_gray_23_pc_fnt";
        //-------------------------盈余字体资源-----------------
        /**red*/
        protected bac_surplus_red = "game_share_red_73_pc_fnt";
        /**green*/
        protected bac_surplus_green = "game_share_green_73_pc_fnt";

        /**确定下注的总金额*/
        public sureAllMoney: number = 0;
        /**确定下注的数据*/
        public sureMoneyData = { player: 0, tie: 0, banker: 0, player_pair: 0, banker_pair: 0 };

        public initSetting()
        {
            super.initSetting();
            MediatorManager.openMediator(Mediators.Mediator_RoomInfo, this.data);
            this.initListener();
            this.initRoadMap();
            this.initCountdown();
            CTween.get(this["ChipBg"], { loop: true }).to({ rotation: -360 }, 2000);
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
        }
        //---------------------------------------------事件-------------------------------------------------------
        /**注册事件*/
        public initListener()
        {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
            this.registerEvent(this.limitBtn, mouse.MouseEvent.MOUSE_OVER, () =>
            {
                this.limitMouseImg.visible = true;
            }, this);
            this.registerEvent(this.limitBtn, mouse.MouseEvent.MOUSE_OUT, () =>
            {
                this.limitMouseImg.visible = false;
            }, this);
            // 输入框change事件
            this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
        }
        /* 点击响应事件 */
        protected onTouchBtn(evt: egret.TouchEvent): void
        {
            SoundPlayerNew.playEffect(SoundConst.click);
            switch (evt.target) {
                case this.blueChip:
                    this.getCustomChips('blue')
                    break;
                case this.greenChip:
                    this.getCustomChips('green')
                    break;
                case this.redChip:
                    this.getCustomChips('red')
                    break;
                case this.playerBetZone:
                    this.reqBet(this.chipArr[this.thisChip], BaccaratModel.PLAYER);
                    break;
                case this.bankerBetZone:
                    this.reqBet(this.chipArr[this.thisChip], BaccaratModel.BANKER);
                    break;
                case this.tieBetZone:
                    this.reqBet(this.chipArr[this.thisChip], BaccaratModel.TIE);
                    break;
                case this.player_pairBetZone:
                    this.reqBet(this.chipArr[this.thisChip], BaccaratModel.PLAYERPAIR);
                    break;
                case this.banker_pairBetZone:
                    this.reqBet(this.chipArr[this.thisChip], BaccaratModel.BANKERPAIR);
                    break;
                case this.sureBtn:
                    let isHave = this.roomCard();
                    if (isHave) {
                        this._mediator.sureFuc();
                        this.updataSureBtn(false);
                    } else {
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
                    let tipData = new TipMsgInfo();
                    tipData.msg = [{ text: '您不能在自己创建的俱乐部中进行本操作', textColor: enums.ColorConst.Golden }];
                    tipData.confirmText = "我知道了";
                    MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
                    break;
            }
        }
        /**未确定金额*/
        protected unMoney: number;
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void
        {
            super.onMediatorCommand(type, params);

            switch (type) {
                // 初始化监听
                case BaccaratUICommands.BaccaratNotify_initListener:
                    this._mediator = params;
                    break;
                case BaccaratUICommands.BaccaratNotify_mySeat:
                    this.setMySeat(params)
                    break;
                case BaccaratUICommands.BaccaratNotify_othersSeat:
                    this.setOtherSeat(params)
                    break;
                case BaccaratUICommands.BaccaratNotify_upDataBetNum:
                    this.updaBetNum(params.chipMoney, params.type, NumberUtil.getSplitNumStr(params.unMoney, 3));
                    this.unMoney = params.unMoney;
                    break;
                case BaccaratUICommands.BaccaratNotify_roadMapData:
                    this.setRoadMapData(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_customChips:
                    this.setCustomChips(params)
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
                    this[`${BaccaratModel.PLAYER}BetZone`].alpha = 0;
                    this[`${BaccaratModel.TIE}BetZone`].alpha = 0;
                    this[`${BaccaratModel.BANKER}BetZone`].alpha = 0;
                    this[`${BaccaratModel.PLAYERPAIR}BetZone`].alpha = 0;
                    this[`${BaccaratModel.BANKERPAIR}BetZone`].alpha = 0;
                    break;
                case BaccaratUICommands.BaccaratNotify_showSureMoney:
                    this.showSureMoney(params);
                    let stage = ClubModel.getInstance().getRoomStage(this.data);
                    if (stage == 'bet') {
                        this['betAllNum'].text = NumberUtil.getSplitNumStr(this.sureAllMoney);
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
                    CTween.get(this['isWinnerGroup']).to({ alpha: 1 })
                    if (params) this['chatImgGroup'].y = -38;
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
                    this.allBetFly(params)
                    break;
            }
        }
        /**是否有主播*/
        protected isAnchor(): void
        {
            let isA = false;
            if (isA) {
                this.countdownGroup.x = 240;
                this.dealCardGroup.x = 210;
            } else {
                this.countdownGroup.x = 24;
                this.dealCardGroup.x = 24;
            }
        }
        //---------------------------------------------计时器-------------------------------------------------------
        /** 初始化计时器 */
        public initCountdown()
        {
            this.countdown = new game.countdown(130);
            this.countdownGroup.addChild(this.countdown);
            this.countdown.setStratCallBack(this.stratCallBack, this);
        }
        /**房间状态的setTimeout*/
        protected setTimeoutStage: any;
        /** 设置倒计时 */
        public setCountdown(timeAll: number, overTime: number)
        {
            this.countdown.startTime(timeAll, overTime);
            this.setTimeoutStage = setTimeout(() =>
            {
                this.countdown.startPayOut();
            }, timeAll)
        }
        //---------------------------------------------------------路书区----------------------------------------------
        /** 初始化路书 */
        public initRoadMap(): void
        {
            this.bead_roadMap = new game.RoadMap(this.bead_road43.width, this.bead_road43.height, RoadMap.BeadRoad, this.unit, true);
            this.bead_road43.addChild(this.bead_roadMap);
            this.big_roadMap = new game.RoadMap(this.big_road43.width, this.big_road43.height, RoadMap.BigRoad, this.unit / 2, true);
            this.big_road43.addChild(this.big_roadMap);
            this.big_eye_roadMap = new game.RoadMap(this.big_eye_road43.width, this.big_eye_road43.height, RoadMap.BigEyeRoad, this.unit / 2, true);
            this.big_eye_road43.addChild(this.big_eye_roadMap);
            this.small_roadMap = new game.RoadMap(this.small_road43.width, this.small_road43.height, RoadMap.SmallRoad, this.unit / 2, true);
            this.small_road43.addChild(this.small_roadMap);
            this.cockroach_roadMap = new game.RoadMap(this.cockroach_road43.width, this.cockroach_road43.height, RoadMap.CockRoachRoad, this.unit / 2, true);
            this.cockroach_road43.addChild(this.cockroach_roadMap);
            this.drawShp();
            this.setContenWH();
        }

        /** 绘制白色分割线*/
        public drawShp(): void
        {
            // 白色分割线
            if (this.shp) {
                this.shp.graphics.clear()
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
            this.shp.graphics.lineTo(StageUtil.width - 774 - 185, this.big_road43.height);
            // 大眼路右面
            this.shp.graphics.moveTo(this.bead_road43.width + this.big_eye_road43.width, this.big_road43.height);
            this.shp.graphics.lineTo(this.bead_road43.width + this.big_eye_road43.width, this.big_road43.height + this.big_eye_road43.height);
            // 小路右面
            this.shp.graphics.moveTo(this.bead_road43.width + this.big_eye_road43.width + this.small_road43.width, this.big_road43.height);
            this.shp.graphics.lineTo(this.bead_road43.width + this.big_eye_road43.width + this.small_road43.width, this.big_road43.height + this.big_eye_road43.height);

            this.shp.graphics.endFill();
            this.roadMap43.addChild(this.shp);
        }

        private unit: number = 31;
        /** 计算路书宽度 */
        private roadMapWidth(): void
        {
            this.roadMap43.width = StageUtil.width - 774 - 185;
            this.bead_road43.width = 10 * this.unit;
            this.big_road43.width = this.bead_road43.width * 1.7;
            this.big_eye_road43.width = this.bead_road43.width * 0.7;
            this.small_road43.width = this.bead_road43.width * 0.7;
            this.cockroach_road43.width = this.bead_road43.width * 0.7;
        }

        /** 设置宽高 */
        public setContenWH(): void
        {
            if (this.roadMap43) {
                this.roadMap43.width = StageUtil.width - 774 - 185;
            }
            this.roadMapWidth();
            this.bead_roadMap.setWidth(this.bead_road43.width, this.unit);
            this.big_roadMap.setWidth(this.big_road43.width, this.unit / 2);
            this.big_eye_roadMap.setWidth(this.big_eye_road43.width, this.unit / 2);
            this.small_roadMap.setWidth(this.small_road43.width, this.unit / 2);
            this.cockroach_roadMap.setWidth(this.small_road43.width, this.unit / 2);
            this.drawShp();
        }
        /** 设置路书数据 */
        public setRoadMapData(roadData: any)
        {
            if (!roadData) return;
            this.bead_roadMap.setData(roadData);
            this.big_roadMap.setData(roadData);
            this.big_eye_roadMap.setData(roadData);
            this.small_roadMap.setData(roadData);
            this.cockroach_roadMap.setData(roadData);
            this.threeImg(roadData);
        }
        /**闲问路 */
        public playerAskWay()
        {
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
        }

        /** 庄问路 */
        public bankerAskWay()
        {
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
        }
        /**问路按钮样式*/
        protected togglewayBtnSty(type: boolean)
        {
            this['playerWayBtn'].setState = type ? 'up' : "disabled";
            this['playerWayBtn'].enabled = type;
            this['bankerWayBtn'].setState = type ? 'up' : "disabled";
            this['bankerWayBtn'].enabled = type;
            this.askStage(type);
        }
        /**问路里三个小图的状态*/
        protected askStage(sta: boolean)
        {
            (this['playerWayBtn'].getChildByName("groupDisable") as eui.Group).visible = !sta;
            (this['playerWayBtn'].getChildByName("player_big_eye_road") as eui.Image).visible = sta;
            (this['playerWayBtn'].getChildByName("player_SmallRoad") as eui.Image).visible = sta;
            (this['playerWayBtn'].getChildByName("player_CockRoachRoad") as eui.Image).visible = sta;
            (this['bankerWayBtn'].getChildByName("groupDisable") as eui.Group).visible = !sta;
            (this['bankerWayBtn'].getChildByName("banker_big_eye_road") as eui.Image).visible = sta;
            (this['bankerWayBtn'].getChildByName("banker_SmallRoad") as eui.Image).visible = sta;
            (this['bankerWayBtn'].getChildByName("banker_CockRoachRoad") as eui.Image).visible = sta;
        }
        /**问路里三个小图*/
        public threeImg(roadData: any): void
        {
            if (roadData.player_peek || roadData.banker_peek) {
                let arr = ["player", "banker"]
                for (let i = 0; i < arr.length; i++) {
                    let ask;
                    if (i == 0) {
                        ask = roadData.player_peek;
                    } else {
                        ask = roadData.banker_peek;
                    }
                    let tp = arr[i];
                    if (!ask.big_eye_road) return;
                    //大眼路
                    let col1 = ask.big_eye_road.icon[0];
                    switch (col1) {
                        case "blue":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_big_eye_road`) as eui.Image).source = "share_pic_bigeye.B_pc_png";
                            break;
                        case "red":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_big_eye_road`) as eui.Image).source = "share_pic_bigeye.R_pc_png";
                            break;
                    }
                    if (!ask.small_road) return;
                    //小路
                    let col2 = ask.small_road.icon[0];
                    switch (col2) {
                        case "blue":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_SmallRoad`) as eui.Image).source = "share_pic_small.B_pc_png";
                            break;
                        case "red":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_SmallRoad`) as eui.Image).source = "share_pic_small.R_pc_png";
                            break;
                    }
                    if (!ask.cockroach_road) return;
                    //凹凸路
                    let col3 = ask.cockroach_road.icon[0];
                    switch (col3) {
                        case "blue":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.B_pc_png";
                            break;
                        case "red":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.R_pc_png";
                            break;
                        case "green":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.T_pc_png";
                            break;
                    }
                }
            } else {
                this.askStage(false);
            }
        }
        //---------------------------------------筹码区------------------------------------------------------
        /** 点击筹码更新金额 */
        public getCustomChips(type)
        {
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
        }
        //--------------------------------------下注相关------------------------------------------------
        protected mineSeatNum: Array<number> = [0];
        protected changeArrNum(seat): number
        {
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
        }
        /**储存我的座号*/
        protected storageMySeat: Array<any> = [];
        /* 设置我的座位号和余额 */
        protected setMySeat(mySeat: { seat: string, data: { balance: number, nick: string, type: string, user_id: string } }): void
        {
            for (let i = 0; i < 7; i++) {
                (<eui.Image>this[`seatFrame${i}`]).visible = false;
            }
            if (mySeat && mySeat.data) {
                let seatNum = this.changeArrNum(mySeat.seat);
                (<eui.ALabel>this[`seatUesrName${seatNum}`]).text = mySeat.data.nick;
                (<eui.ALabel>this[`seatUesrBce${seatNum}`]).text = NumberUtil.getSplitNumStr(mySeat.data.balance);
                (<eui.ALabel>this[`seatUesrName${seatNum}`]).textColor = 0xeedfb1;
                (<eui.ALabel>this[`seatUesrBce${seatNum}`]).textColor = 0xeedfb1;
                (<eui.Image>this[`seatUesrHead${seatNum}`]).source = this.seat_Mine_head;
                (<eui.Image>this[`seatUesrBcePic${seatNum}`]).source = this.seat_Mine_money;
                (<eui.Image>this[`seatNum${seatNum}`]).source = "seat_pic_myseat" + mySeat.seat + "_pc_png";
                (<eui.Image>this[`seatFrame${seatNum}`]).visible = true;
            }
            this.storageMySeat.push(mySeat);
        }
        /* 设置其他人的座位号和余额 */
        protected setOtherSeat(oSeat: Array<{ seat: string, data: { balance: number, nick: string, type: string, user_id: string } }>): void
        {
            if (oSeat) {
                if (oSeat.length == 6) {
                    let allSeatArr: Array<any> = [];
                    for (let i = 0; i < oSeat.length; i++) {
                        allSeatArr.push(oSeat[i])
                    }
                    allSeatArr.splice(this.mineSeatNum[0], 0, this.storageMySeat)
                    for (let i = 0; i < allSeatArr.length; i++) {
                        if (i != this.mineSeatNum[0]) {
                            (<eui.Image>this[`seatNum${i}`]).source = "seat_pic_seat" + allSeatArr[i].seat + "_pc_png";
                            if (allSeatArr[i].data && allSeatArr[i].data.nick && allSeatArr[i].data.user_id) {
                                this[`seatChair${i}`].visible = false;
                                this[`seatUesrName${i}`].visible = true;
                                this[`seatUesrBce${i}`].visible = true;
                                this[`seatUesrHead${i}`].visible = true;
                                this[`seatUesrBcePic${i}`].visible = true;

                                this[`seatUesrName${i}`].text = allSeatArr[i].data.nick;
                                this[`seatUesrBce${i}`].text = NumberUtil.getSplitNumStr(allSeatArr[i].data.balance);
                                this[`seatUesrName${i}`].textColor = 0xD6B783;
                                this[`seatUesrBce${i}`].textColor = 0xD6B783;
                                this[`seatUesrHead${i}`].source = this.seat_other_head;
                                this[`seatUesrBcePic${i}`].source = this.seat_other_money;
                            }
                            else {
                                this[`seatChair${i}`].visible = true;
                                this[`seatUesrName${i}`].visible = false;
                                this[`seatUesrBce${i}`].visible = false;
                                this[`seatUesrHead${i}`].visible = false;
                                this[`seatUesrBcePic${i}`].visible = false;
                            }
                        }
                    }
                }
            }
        }
        /**上一次其他玩家的下注信息*/
        protected lastOtherBet = { banker: 0, banker_pair: 0, player: 0, player_pair: 0, tie: 0 };
        /** 设置其他玩家的详细下注信息 */
        public showOtherBet(arr: Array<{ banker, banker_pair, player, player_pair, tie }>)
        {
            let stage = ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet') return;
            if (arr) {
                if (arr.length == 6) {
                    let mySeat = this.mineSeatNum[0];
                    let j: number;
                    for (let i = 0; i < arr.length; i++) {
                        if (i >= mySeat) {
                            j = i + 1;
                        }
                        else {
                            j = i;
                        }
                        if (arr[i]) {
                            for (let key in arr[i]) {
                                if (this[`seatChair${j}`].visible) {
                                    this[`${key}BetOther${j}`].visible = false;
                                    this[`${key}BetOtherNum${j}`].visible = false;
                                    this[`${key}BetMine${j}`].visible = false;
                                    this[`${key}BetMineNum${j}`].visible = false;
                                }
                                else {
                                    if (arr[i][key]) {
                                        if (this.lastOtherBet.banker == arr[i].banker && this.lastOtherBet.banker_pair == arr[i].banker_pair && this.lastOtherBet.player == arr[i].player
                                            && this.lastOtherBet.player_pair == arr[i].player_pair && this.lastOtherBet.tie == arr[i].tie) {
                                            return;
                                        } else {
                                            let chatN = arr[i][key] - this.lastOtherBet[key];
                                            if (chatN) {

                                                this.newFlyChip(NumberUtil.getSplitNumStr(chatN, 1), key, NumberUtil.getSplitNumStr(arr[i][key], 1), j, true);
                                            }
                                            this.lastOtherBet[key] = arr[i][key];
                                        }
                                    }
                                    this[`${key}BetMine${j}`].visible = false;
                                    this[`${key}BetMineNum${j}`].visible = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        /** 请求下注 */
        public reqBet(monney: number, type: string)
        {
            if (!type) return;
            let isHave = this.roomCard();
            if (isHave) {
                this._mediator.reqBet(monney, type);
                this.isOneBet = false;
            } else {
                this.showMsg("房卡不足请联系房主补充房卡", 'red');
            }
        }
        /** 设置确定按钮的样式 */
        public updataSureBtn(b: boolean)
        {
            this.sureBtn.setState = b ? 'up' : "disabled";
            this.sureBtn.enabled = b;
        }

        /** 设置取消按钮的样式 */
        public updataCancelBtn(b: boolean)
        {
            this.cancelBtn.setState = b ? 'up' : "disabled";
            this.cancelBtn.enabled = b;
        }

        /** 更新下注区金额 */
        public updaBetNum(chipMonney: string, type: string, unMoney: string)
        {
            this.newFlyChip(chipMonney, type, unMoney);
        }
        /** 新的飞筹码动画 */
        public newFlyChip(chipMoney: string, type: string, unMoney: string, seat: number = this.mineSeatNum[0], otherB: boolean = false)
        {
            if (this.isNot) return;
            let group;
            let numSeat = seat;
            let numY: number = this[`${type}BetGroup`].y + this[`${type}BetGroup${numSeat}`].y;
            let numX: number = this[`${type}BetGroup`].x + this[`${type}BetGroup${numSeat}`].x;
            group = this[`${type}BetGroup`];
            let chip = new betChip(chipMoney);
            if (numSeat < 3) {
                chip.x = this[`seatUesrBce${numSeat}`].x;
                chip.y = this[`seatUesrBce${numSeat}`].y - 30;
            }
            else if (numSeat == 3) {
                chip.x = this[`seatUesrBce${numSeat}`].x - 30;
                chip.y = this[`seatUesrBce${numSeat}`].y - 20;
            }
            else {
                chip.x = this[`seatUesrBce${numSeat}`].x + 70;
                chip.y = this[`seatUesrBce${numSeat}`].y - 30;
            }
            let stage = BaccaratModel.getInstance().getDeskStage(this.data);
            if (stage == "payout") {
                chip.x = 810;
                chip.y = -100;
            }
            this.betShowGroup.addChild(chip);
            CTween.removeTweens(chip);
            CTween.get(chip).to({ x: numX, y: numY }, 500)
                .call(this.disposeChip, this, [chip, unMoney, type, numSeat, otherB]);
            if (otherB) {
                this[`${type}BetZone`].alpha = 0;
            } else {
                this[`${type}BetZone`].alpha = 1;
            }
            this[`${type}BetMineNum${numSeat}`].font = this.baccarat_game_gray;
        }
        /** 飞筹码动画执行完的回调 */
        public disposeChip(item: betChip, unMoney: string, type: string, seat: number, b: boolean)
        {
            item.parent.removeChild(item);
            if (b) {
                let showJ = seat;
                this[`${type}BetOtherNum${showJ}`].text = unMoney;
                this[`${type}BetOther${showJ}`].visible = true;
                this[`${type}BetOtherNum${showJ}`].visible = true;
            }
            this.betUnSureNum(unMoney, type, b);
        }
        /** 更新筹码列表 */
        public setCustomChips(arr: Array<number>)
        {
            if (arr && arr.length) {
                this.chipArr = arr;
                this.roomChips = arr;
                this["blueChipNum"].text = NumberUtil.getSplitNumStr(arr[0], 1);
                this["greenChipNum"].text = NumberUtil.getSplitNumStr(arr[1], 1);
                this["redChipNum"].text = NumberUtil.getSplitNumStr(arr[2], 1);
            }
        }
        /**是否余额不住*/
        protected isNot: boolean = false;
        /** 弹出（红、绿）提示框 */
        public showMsg(msg: string, color: string)
        {
            msg = LanguageUtil.translate(msg);
            if (color == 'red') {
                var group = this["redMsgGroup"];
                this["redMsgTxt"].text = msg;
                if (msg == LanguageUtil.translate("global_lbl_bet_began") || msg == LanguageUtil.translate("game_lbl_bacc_warning_payouting")) {
                    this["redMsgGroup"].touchThrough = false;
                }
                else {
                    this["redMsgGroup"].touchThrough = true;
                }
                if (msg == LanguageUtil.translate("game_lbl_gold_not_enough")) {
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
            CTween.removeTweens(group);
            group.alpha = 1;
            group.visible = true;
            CTween.get(group).wait(1000)
                .call(() => { this.isNot = false; })
                .to({ alpha: 0 }, 2000)
                .call(() => { group.visible = false; })
            if (color == 'red') {
                this[`${BaccaratModel.PLAYER}BetZone`].alpha = 0;
                this[`${BaccaratModel.TIE}BetZone`].alpha = 0;
                this[`${BaccaratModel.BANKER}BetZone`].alpha = 0;
                this[`${BaccaratModel.PLAYERPAIR}BetZone`].alpha = 0;
                this[`${BaccaratModel.BANKERPAIR}BetZone`].alpha = 0;
            }
        }
        /** 显示未确定的下注金额 */
        public betUnSureNum(unMoney: string, type: string, otherB: boolean = false)
        {
            if (!type) return;
            // if(this.isNot)return;
            for (let i = 0; i < 7; i++) {
                if (!unMoney || unMoney == '0') {
                    this[`${type}BetOther${i}`].visible = false;
                    this[`${type}BetOtherNum${i}`].visible = false;
                    this[`${type}BetMineNum${i}`].text = '0';

                    this[`${type}BetMine${i}`].visible = false;
                    this[`${type}BetMineNum${i}`].visible = false;
                    this[`${type}BetOtherNum${i}`].text = '0';
                }
                else {
                    if (!otherB) {
                        if (i == this.mineSeatNum[0]) {
                            this[`${type}BetMine${i}`].visible = true;
                            this[`${type}BetMineNum${i}`].visible = true;
                            this[`${type}BetMineNum${i}`].text = NumberUtil.getSplitNumStr(this.unMoney + this.sureMoneyData[type]);
                            this[`${type}BetOther${i}`].visible = false;
                            this[`${type}BetOtherNum${i}`].visible = false;
                            this.updataCancelBtn(true);
                            this.updataSureBtn(true);
                        }
                    }
                }
            }
        }
        /** 取消下注 */
        public cancelBet()
        {
            let stage = ClubModel.getInstance().getRoomStage(this.data);
            if (stage != 'bet') return;
            this.betUnSureNum('0', BaccaratModel.PLAYER);
            this.betUnSureNum('0', BaccaratModel.TIE);
            this.betUnSureNum('0', BaccaratModel.BANKER);
            this.betUnSureNum('0', BaccaratModel.PLAYERPAIR);
            this.betUnSureNum('0', BaccaratModel.BANKERPAIR);
            this[`${BaccaratModel.PLAYER}BetZone`].alpha = 0;
            this[`${BaccaratModel.TIE}BetZone`].alpha = 0;
            this[`${BaccaratModel.BANKER}BetZone`].alpha = 0;
            this[`${BaccaratModel.PLAYERPAIR}BetZone`].alpha = 0;
            this[`${BaccaratModel.BANKERPAIR}BetZone`].alpha = 0;
            this.updataSureBtn(false);
            this.updataCancelBtn(false);
        }

        /** 显示已确定的下注框 */
        public showSureMoney(monneyObj: { player, tie, banker, player_pair, banker_pair })
        {
            if (!monneyObj) return;
            this.sureAllMoney = 0;
            if (GlobalVariable.isEmptyObject(monneyObj)) {
                this.sureMoneyData = { player: 0, tie: 0, banker: 0, player_pair: 0, banker_pair: 0 };
            }
            else {
                this.sureMoneyData = monneyObj;
            }
            for (let key in monneyObj) {
                if (monneyObj[key]) {
                    let numSeat = this.mineSeatNum[0];
                    switch (key) {
                        case BaccaratModel.PLAYER:
                            this[`${key}Img`].source = this.baccarat_player;
                            this[`${key}NumImg`].source = this.baccarat_playerNum;
                            break;
                        case BaccaratModel.TIE:
                            this[`${key}Img`].source = this.baccarat_tie;
                            this[`${key}NumImg`].source = this.baccarat_tieNum;
                            break;
                        case BaccaratModel.BANKER:
                            this[`${key}Img`].source = this.baccarat_banker;
                            this[`${key}NumImg`].source = this.baccarat_bankerNum;
                            break;
                        case BaccaratModel.PLAYERPAIR:
                            this[`${key}Img`].source = this.baccarat_playerp;
                            this[`${key}NumImg`].source = this.baccarat_playerpN;
                            break;
                        case BaccaratModel.BANKERPAIR:
                            this[`${key}Img`].source = this.baccarat_bankerp;
                            this[`${key}NumImg`].source = this.baccarat_bankerpN;
                            break;
                    }
                    this[`${key}BetMineNum${numSeat}`].font = this.baccarat_game_golden;
                    this[`${key}BetMineNum${numSeat}`].text = NumberUtil.getSplitNumStr(monneyObj[key]);
                    // this[`${key}BetMineNum${numSeat}`].text = "1K";
                    this[`${key}BetZone`].alpha = 0;
                }
                if (monneyObj[key] != 0) {
                    this.sureAllMoney += parseFloat(monneyObj[key]);
                }
            }
            this.updataSureBtn(false);
            this.updataCancelBtn(false);
        }

        /**取消未确定的下注框*/
        protected cancelBetUnSureNum(): void
        {
            if (!this.sureMoneyData) return
            let numSeat = this.mineSeatNum[0];
            for (let key in this.sureMoneyData) {
                if (!this.sureMoneyData[key]) {
                    this[`${key}BetMineNum${numSeat}`].text = '0';
                    this[`${key}BetMine${numSeat}`].visible = false;
                    this[`${key}BetMineNum${numSeat}`].visible = false;
                    this[`${key}BetZone`].alpha = 0;
                }
                else {
                    this[`${key}BetMineNum${numSeat}`].text = NumberUtil.getSplitNumStr(this.sureMoneyData[key]);
                    this[`${key}BetMineNum${numSeat}`].font = this.baccarat_game_golden;
                }
            }
        }
        //----------------------------------发牌相关，房间状态----------------------------------
        /** 播放发牌闪电动画和界面  */
        public startMoVeclip(b: boolean)
        {
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
                CTween.get(this['blueDealCard']).to({ x: 0 }, 1000).call(() =>
                {
                    this.lightningE.visible = true;
                    this.lightningE.width = 85;
                    this.lightningE.height = 288;
                    this.lightningE.play();
                }).wait(1000).call(() =>
                {
                    this.lightningE.stop();
                    this.lightningE.visible = false;
                });
                this['redDealCard'].x = 438;
                CTween.get(this['redDealCard']).to({ x: 219 }, 1000);
            }
            else {
                this.lightningE.stop();
                this.lightningE.visible = false;
                this['tiePayout'].visible = false;
                // CTween.removeTweens(this["tieDealCard"]);
            }
        }
        /**
         * 新收到一张牌
         */
        public receiveSingleCard(name: string, num: number)
        {
            super.receiveSingleCard(name, num)
            var card: eui.Image;
            card = this[name];
            card.visible = true;
            card.source = this.pokerBackRes;
            card.width = 86;
            card.height = 122;
            var x0 = card.x;
            var y0 = card.y;
            let distancex = 40, distancey = 40;
            if (name.indexOf("3") != -1) {
                distancex = 25;
                distancey = 120;
            }
            CTween.get(card)
                .to({ scaleX: 0, scaleY: 1.1, x: x0 - distancex, y: y0 - distancey }, 300)
                .call(() => { card.source = `mpoker_pic_${num}_pc_png` })
                .to({ scaleX: 1, scaleY: 1, x: x0, y: y0 }, 300, egret.Ease.elasticOut)
                .call(() =>
                {
                    if (name.indexOf("player") > -1) {
                        this.playerPoint += BaccaratModel.getInstance().getPoint(num);
                        this.playerPoint = this.playerPoint % 10;
                        this.playCardNum.text = this.playerPoint + "";
                    }
                    else {
                        this.bankerPoint += BaccaratModel.getInstance().getPoint(num);
                        this.bankerPoint = this.bankerPoint % 10;
                        this.bankerCardNum.text = this.bankerPoint + "";
                    }
                    CTween.removeTweens(card);
                    card.width = 86;
                    card.height = 122;
                }, this)
            this[name + "K"].visible = false;
        }
        /** 切换房间状态 */
        public toggleStage(stage: String)
        {
            switch (stage) {
                case GameState.bet:
                    //显示隐藏
                    this.dealCardGroup.visible = false;
                    this.countdownGroup.visible = true;
                    this.hiddenStage();
                    this.betStage();
                    this.playerPoint = 0;
                    this.bankerPoint = 0;
                    this['betAllNum'].text = "0";
                    this.lastOtherBet = { banker: 0, banker_pair: 0, player: 0, player_pair: 0, tie: 0 };
                    CTween.removeTweens(this["tieRotationImg"]);
                    if (!this.isMy) {
                        this.togglewayBtnSty(true);
                    }
                    this['isMyPayOutGroup'].visible = false;
                    this['isWinnerGroup'].visible = false;
                    break;
                case GameState.deal_card:
                    //显示隐藏
                    this.dealCardGroup.visible = true;
                    this.countdownGroup.visible = false;
                    this.dealCardStage();
                    // this.sureMoneyData = { banker:0, banker_pair:0, player:0, player_pair:0, tie:0 };
                    this.isOneBet = true;
                    break;
                case GameState.payout:
                    //显示隐藏
                    this.dealCardGroup.visible = true;
                    this.countdownGroup.visible = false;
                    this.countdown.startPayOut();
                    this.showProportion();
                    this.isOneBet = true;
                    break;
                case GameState.shuffle:
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
        }

        /** 隐藏跟房间状态有关的东西,恢复房间默认样式 */
        public hiddenStage()
        {
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
        }

        /** 切换到下注状态 */
        public betStage()
        {
            this.showSureMoney({ player: 0, tie: 0, banker: 0, player_pair: 0, banker_pair: 0 });
            this.cancelBet();

            //下注区默认显示
            this[`${BaccaratModel.PLAYER}BetZone`].alpha = 0;
            this[`${BaccaratModel.TIE}BetZone`].alpha = 0;
            this[`${BaccaratModel.BANKER}BetZone`].alpha = 0;
            this[`${BaccaratModel.PLAYERPAIR}BetZone`].alpha = 0;
            this[`${BaccaratModel.BANKERPAIR}BetZone`].alpha = 0;

            this[`${BaccaratModel.PLAYER}Img`].source = this.baccarat_player_y;
            this[`${BaccaratModel.PLAYER}NumImg`].source = this.baccarat_pbNum_y;
            this[`${BaccaratModel.TIE}Img`].source = this.baccarat_tie_y;
            this[`${BaccaratModel.TIE}NumImg`].source = this.baccarat_tieNum_y;
            this[`${BaccaratModel.BANKER}Img`].source = this.baccarat_banker_y;
            this[`${BaccaratModel.BANKER}NumImg`].source = this.baccarat_pbNum_y;

            this[`${BaccaratModel.PLAYERPAIR}Img`].source = this.bac_p_y;
            this[`${BaccaratModel.PLAYERPAIR}NumImg`].source = this.bac_pN_y;
            this[`${BaccaratModel.BANKERPAIR}Img`].source = this.bac_b_y;
            this[`${BaccaratModel.BANKERPAIR}NumImg`].source = this.bac_bN_y;
        }

        /** 切换到发牌状态 */
        public dealCardStage()
        {
            this.countdown.startPayOut();
            this.startMoVeclip(true);
            this.updataSureBtn(false);
            this.updataCancelBtn(false);
            this.cancelBetUnSureNum();
        }
        /** 切换发牌区的图片显示 */
        public toggleDeaCardImg()
        {
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
        }
        /**下注区字体和比例变灰色*/
        protected changeGray(): void
        {
            this[`${BaccaratModel.PLAYER}Img`].source = this.bac_p_g;
            this[`${BaccaratModel.PLAYER}NumImg`].source = this.bac_bpN_g;
            this[`${BaccaratModel.BANKER}Img`].source = this.bac_b_g;
            this[`${BaccaratModel.BANKER}NumImg`].source = this.bac_bpN_g;
            this[`${BaccaratModel.PLAYERPAIR}Img`].source = this.bac_pp_g;
            this[`${BaccaratModel.PLAYERPAIR}NumImg`].source = this.bac_ppN_g;
            this[`${BaccaratModel.BANKERPAIR}Img`].source = this.bac_bp_g;
            this[`${BaccaratModel.BANKERPAIR}NumImg`].source = this.bac_pbpN_g;
            this[`${BaccaratModel.TIE}Img`].source = this.bac_t_g;
            this[`${BaccaratModel.TIE}NumImg`].source = this.bac_tN_g;
        }
        /** 游戏结果 */
        public gameResults(score: any)
        {
            if (!score) return;
            let mySeat = this.mineSeatNum[0];
            let player = score.player;
            let banker = score.banker;
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
                this[`${BaccaratModel.TIE}BetZone`].alpha = 1;
                this[`${BaccaratModel.TIE}Img`].source = this.baccarat_tie;
                this[`${BaccaratModel.TIE}NumImg`].source = this.baccarat_tieNum;
                this["tieRotationImg"].anchorOffsetX = 100.5;
                this["tieRotationImg"].anchorOffsetY = 99.5;
                this["imgTie"].alpha = 0.01;
                CTween.get(this["tieRotationImg"], { loop: true }).to({ rotation: -360 }, 1000)
                    .call(() =>
                    {
                        CTween.get(this["imgTie"]).to({ alpha: 1 }, 500);
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
                this[`${BaccaratModel.PLAYER}BetZone`].alpha = 1;
                this[`${BaccaratModel.PLAYER}Img`].source = this.baccarat_player;
                this[`${BaccaratModel.PLAYER}NumImg`].source = this.baccarat_playerNum;

                this["player_1"].alpha = 1;
                this["player_2"].alpha = 1;
                this["player_3"].alpha = 1;
                this["banker_1"].alpha = 0.3;
                this["banker_2"].alpha = 0.3;
                this["banker_3"].alpha = 0.3;

                if (this.sureMoneyData.player) {
                    this[`${BaccaratModel.PLAYER}BetMine${mySeat}`].visible = true;
                    this[`${BaccaratModel.BANKER}BetMine${mySeat}`].visible = false;
                    this[`${BaccaratModel.TIE}BetMine${mySeat}`].visible = false;
                    this[`${BaccaratModel.PLAYER}BetMineNum${mySeat}`].visible = true;
                    this[`${BaccaratModel.BANKER}BetMineNum${mySeat}`].visible = false;
                    this[`${BaccaratModel.TIE}BetMineNum${mySeat}`].visible = false;
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
                this[`${BaccaratModel.BANKER}BetZone`].alpha = 1;
                this[`${BaccaratModel.BANKER}Img`].source = this.baccarat_banker;
                this[`${BaccaratModel.BANKER}NumImg`].source = this.baccarat_bankerNum;

                this["player_1"].alpha = 0.3;
                this["player_2"].alpha = 0.3;
                this["player_3"].alpha = 0.3;
                this["banker_1"].alpha = 1;
                this["banker_2"].alpha = 1;
                this["banker_3"].alpha = 1;

                if (this.sureMoneyData.banker) {
                    this[`${BaccaratModel.PLAYER}BetMine${mySeat}`].visible = false;
                    this[`${BaccaratModel.BANKER}BetMine${mySeat}`].visible = true;
                    this[`${BaccaratModel.TIE}BetMine${mySeat}`].visible = false;
                    this[`${BaccaratModel.PLAYER}BetMineNum${mySeat}`].visible = false;
                    this[`${BaccaratModel.BANKER}BetMineNum${mySeat}`].visible = true;
                    this[`${BaccaratModel.TIE}BetMineNum${mySeat}`].visible = false;
                }
            }
            //闲对
            if (score.player_pair) {
                this[`${BaccaratModel.PLAYERPAIR}BetZone`].alpha = 1;
                this[`${BaccaratModel.PLAYERPAIR}Img`].source = this.baccarat_playerp;
                this[`${BaccaratModel.PLAYERPAIR}NumImg`].source = this.baccarat_playerpN;
            } else {
                this[`${BaccaratModel.PLAYERPAIR}BetMine${mySeat}`].visible = false;
                this[`${BaccaratModel.PLAYERPAIR}BetMineNum${mySeat}`].visible = false;
            }
            //庄对
            if (score.banker_pair) {
                this[`${BaccaratModel.BANKERPAIR}BetZone`].alpha = 1;
                this[`${BaccaratModel.BANKERPAIR}Img`].source = this.baccarat_bankerp;
                this[`${BaccaratModel.BANKERPAIR}NumImg`].source = this.baccarat_bankerpN;
            } else {
                this[`${BaccaratModel.BANKERPAIR}BetMine${mySeat}`].visible = false;
                this[`${BaccaratModel.BANKERPAIR}BetMineNum${mySeat}`].visible = false;
            }
            this.playCardNum.text = player + '';
            this.bankerCardNum.text = banker + '';
        }
        /** 显示我的派彩结果 */
        public showMyPayOut(num: number)
        {
            if (num > 0) {
                this["payOutGroup"].visible = true;
                this["payOutNum"].text = NumberUtil.getSplitNumStr(num);
                this.showPayOutMove();
            }
            else {
                this["payOutGroup"].visible = false;
                this["payOutNum"].text = '0';
            }
        }
        //派彩动画相关
        protected payOutBg: eui.Image;
        protected payOutTxtGroup: eui.Group;
        /** 显示派彩动画 */
        public showPayOutMove()
        {
            let y0 = 132;
            let y3 = 140;
            for (let i = 0; i < 7; i++) {
                if (i < 3) {
                    (<eui.Image>this[`payOutImg${i}`]).y = y0 - i * 15;
                }
                else {
                    (<eui.Image>this[`payOutImg${i}`]).y = y3 - (i - 3) * 15;
                }
            }

            this.payOutBg.visible = false;
            this.payOutTxtGroup.visible = false;
            this.payOutBg.alpha = 0.01;
            this.payOutTxtGroup.alpha = 0.01;
            for (let i = 0; i < 7; i++) {
                this[`payOutImg${i}`].visible = false;
                this[`payOutImg${i}`].y = this[`payOutImg${i}`].y - 150;
                this[`payOutImg${i}`].rotation = 0;
                (<eui.Image>this[`payOutImg${i}`]).anchorOffsetX = 50;
                (<eui.Image>this[`payOutImg${i}`]).anchorOffsetY = 50;
            }
            let index = 0;
            this.showChipMove(index);
        }

        public showChipMove(index: number)
        {
            if (index < 7) {
                this[`payOutImg${index}`].visible = true;
                if (index == 2 || index == 6) {
                    CTween.get(this[`payOutImg${index}`]).to({ y: this[`payOutImg${index}`].y + 150 }, 200)
                        .to({ rotation: -10 }, 50)
                        .to({ rotation: 10 }, 50)
                        .to({ rotation: -10 }, 50)
                        .to({ rotation: 10 }, 50)
                        .to({ rotation: 0 }, 50)
                        .call(() =>
                        {
                            index++;
                            this.showChipMove(index)
                        })
                }
                else {
                    CTween.get(this[`payOutImg${index}`]).to({ y: this[`payOutImg${index}`].y + 150 }, 200)
                        .call(() =>
                        {
                            index++;
                            this.showChipMove(index)
                        })
                }
            }
            else if (index == 7) {
                this.payOutBg.visible = true;
                this.payOutTxtGroup.visible = true;
                CTween.get(this.payOutTxtGroup).to({ alpha: 1 }, 1000);
                CTween.get(this.payOutBg).to({ alpha: 1 }, 1000)
            }
            else {
                return;
            }
        }

        //----------------------限额相关--------------------
        /** 显示房间信息 */
        public showRoomInfoMsg(msg: { name, rounds, roundID, limitMax, limitMin, dealerName })
        {
            if (msg) {
                this['bottomRoomName'].text = LanguageUtil.translate("founder_lbl_room_name") + ":" + msg.name;
                this['bottomDealerName'].text = LanguageUtil.translate("global_lbl_dealer") + LanguageUtil.translate("global_lbl_name") + ":" + msg.dealerName;
                this['bottomRoundID'].text = LanguageUtil.translate("global_lbl_round_no") + `：${msg.roundID}`;
                this['bottomLimit'].text = LanguageUtil.translate("global_lbl_room_list_limit") + `：${NumberUtil.getSplitNumStr(msg.limitMin)} - ${NumberUtil.getSplitNumStr(msg.limitMax)}`;
            } else {
                this['bottomRoomName'].text = LanguageUtil.translate("founder_lbl_room_name");
                this['bottomDealerName'].text = LanguageUtil.translate("global_lbl_dealer") + LanguageUtil.translate("global_lbl_name") + ":";
                this['bottomRoundID'].text = LanguageUtil.translate("global_lbl_round_no") + `:`;
                this['bottomLimit'].text = LanguageUtil.translate("global_lbl_room_list_limit") + `：100-1,500`;
            }
        }
        /**点击限额按钮*/
        protected goRoomLimit(): void
        {
            MediatorManager.openMediator(Mediators.Mediator_PCRoomLimit, this.data)
        }
        /**庄闲和按比例显示*/
        protected showProportion(): void
        {
            let soData = ClubModel.getInstance().getRoomSource(this.data);
            if (!soData) return;
            let bankerNum = soData.round_statistics.banker;
            let playerNum = soData.round_statistics.player;
            let tieNum = soData.round_statistics.tie;
            if (soData) {
                this['playerBlueAlabel'].text = LanguageUtil.translate("game_lbl_player_simple") + playerNum;
                this['tieGreenAlabel'].text = LanguageUtil.translate("game_lbl_tie_simple") + tieNum;
                this['banklerRedAlabel'].text = LanguageUtil.translate("game_lbl_banker_simple") + bankerNum;
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
                            let btNum = bankerNum + tieNum;
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
                            let ptNum = playerNum + tieNum;
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
                            let pbNum = playerNum + bankerNum;
                            this['playerBlueImg'].width = (playerNum / pbNum) * 304;
                            this['tieGreenImg'].width = 0;
                            this['banklerRedImg'].width = (bankerNum / pbNum) * 304;
                            this['banklerRedImg'].x = (playerNum / pbNum) * 304 + 2;
                            this['playerBlueImg'].x = 0;
                        }
                    }
                }
                else {
                    let allNum = playerNum + bankerNum + tieNum;
                    this['playerBlueImg'].width = (playerNum / allNum) * 303;
                    this['tieGreenImg'].width = (tieNum / allNum) * 303;
                    this['banklerRedImg'].width = (bankerNum / allNum) * 303;
                    this['playerBlueImg'].x = 0;
                    this['tieGreenImg'].x = (playerNum / allNum) * 303 + 1.5;
                    this['banklerRedImg'].x = (playerNum / allNum) * 303 + (tieNum / allNum) * 303 + 3;
                }
            }
        }
        //--------------------聊天组件----------------------------
        /** 保存chat组件 */
        public chat: chat;
        /** 放置组件的group */
        public chatGroup: eui.Group;
        /** 聊天框 */
        public initChat()
        {
            this.chat = new chat();
            this.chatGroup.addChild(this.chat);
            this.chat.top = 0;
            this.chat.bottom = 0;
            this.chat.left = 0;
            this.chat.right = 0;
            this.chatGroup.visible = true;
        }

        public setChatData(data: Array<any>)
        {
            if (!data || !data.length) return;
            if (this.chat) {
                this.chat.setData(data)
            }
        }
        //------------------------编辑筹码-----------------------------
        /** 隐藏或显示筹码编辑group
         * @param show {boolean} true - 显示筹码编辑group | false - 隐藏筹码编辑group
         */
        protected setEditGroup(show: boolean): void
        {
            this.chatGroup.visible = !show;
            this.groupChip.right = -435;
            this.groupChip.visible = show;
            if (show) {
                CTween.get(this.groupChip)
                    .to({ right: 0 }, 1000);
            } else {
                CTween.removeTweens(this.groupChip);
            }
            this.groupErr.visible = false;
            this.editChipBtn.touchEnabled = !show;
            this.btnConfirm.touchEnabled = !show;
            this.btnConfirm.setState = "disabled";
            for (let i = 0; i <= 2; i++) {
                (this[`chipBg${i}`] as eui.Image).alpha = 0.5;
            }
            if (show) {
                this.chipEdit0.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.editChipBtn.setState = "disabled";
            } else {
                this.setChips(this.userChips);
                this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.editChipBtn.setState = "up";
            }
        }
        protected tet: string;
        /** 筹码编辑输入框响应 */
        protected onEditChange(evt: egret.Event): void
        {
            this.btnConfirm.touchEnabled = true;
            this.btnConfirm.setState = "up";
            let index = [this.chipEdit0, this.chipEdit1, this.chipEdit2].indexOf(evt.currentTarget);
            if (index == -1) {
                return;
            }
            (this[`chipBg${index}`] as eui.Image).alpha = 1;
            let text = (this[`chipEdit${index}`] as eui.TextInput).text;
            text = text.replace(/[^\d.]/g, '');
            if (text.length > 9) {
                (this[`chipEdit${index}`] as eui.TextInput).text = this.tet;
            } else {
                (this[`chipEdit${index}`] as eui.TextInput).text = text;
                this.tet = text;
            }
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                let valid = this.checkInput(index);
                if (!valid) {
                    if (!text) {
                        (this[`chipEdit${index}`] as eui.TextInput).text = "0";
                    }
                    // let num = this.userChips[index] || this.roomChips[index];
                    // (this[`chipEdit${index}`] as eui.TextInput).text = num / 100 + "";
                } else {
                    (this[`chipEdit${index}`] as eui.TextInput).text = "" + +text;
                }
                this.btnConfirm.enabled = valid;
            }
        }
        /** 筹码编辑输入框内容格式检查
         * @param index {number} 输入框编号
         */
        protected checkInput(index: number): boolean
        {
            /** 当前输入框 */
            let inputLabel: eui.TextInput = this[`chipEdit${index}`];
            /** 当前输入框对应的筹码金额显示框 */
            let text = inputLabel.text;
            text = text.trim();
            let text2 = text.replace(/\b(0+)/gi, "");
            if (!text) {
                this.showEditMsg("筹码金额不能为空");
                return false;
            }
            if (text == "0") {
                this.showEditMsg("筹码配置须大于0");
                (this[`chipEdit${index}`] as eui.TextInput).text = this.userChips[index] / 100 + "";
                return false;
            }
            if (text.split(".")[0].length > 9) {
                this.showEditMsg("最大只能输入9位整数和一位小数");
                return false;
            }
            return true;
        }
        /** 设置用户筹码
         * @param chips {Array<number>} 筹码列表
         */
        protected setChips(chips: Array<number>): void
        {
            // this.roomChips = ClubModel.getInstance().getClubRoomsSetting(this.data).chips.slice();
            for (let i = 0; i < 3; i++) {
                if (chips[i]) {
                    this.userChips[i] = chips[i];
                } else {
                    this.userChips[i] = this.roomChips[i];
                }
            }
            for (let i = 0; i <= 2; i++) {
                let num = this.userChips[i];
                // || this.roomChips[i];
                (this[`chipEdit${i}`] as eui.TextInput).text = num / 100 + "";
                (this[`chipNum${i}`] as eui.ALabel).text = NumberUtil.getSplitNumStr(num, 3);
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
        }
        /** 确认编辑筹码 */
        protected confirmEditChip(): void
        {
            let chips: Array<number> = [];
            for (let i = 0; i <= 2; i++) {
                let valid = this.checkInput(i);
                if (!valid) {
                    return;
                }
                let text = (<eui.TextInput>this[`chipEdit${i}`]).text;
                let text2 = text.replace(/\b(0+)/gi, "");
                let num = Math.round(100 * +text2);
                chips[i] = this.userChips[i] || this.roomChips[i];
                if (!isNaN(num)) {
                    chips[i] = num;
                } else {
                    this.showEditMsg("最大只能输入9位整数和一位小数");
                    return;
                }
                if (text.split(".")[1] && text.split(".")[1].length > 1) {
                    this.showEditMsg("最大只能输入9位整数和一位小数");
                    (<eui.TextInput>this[`chipEdit${i}`]).textDisplay.setFocus();
                    return;
                }
            }
            BaccaratController.getInstance().setChips(this.data, chips).then(() =>
            {
                BaccaratController.getInstance().getChips(this.data).then((data) =>
                {
                    this.setChips(data["chips"]);
                    this.setEditGroup(false);
                    MediatorManager.closeMediator(Mediators.Mediator_Sidebar.name);
                });
            }).catch(() =>
            {
                this.showEditMsg("编辑失败");
            })
        }
        /** 显示筹码编辑输入错误信息
         * @param msg {string} 错误信息
         */
        protected showEditMsg(msg: string): void
        {
            this.alabelErr.text = LanguageUtil.translate(msg);
            CTween.removeTweens(this.groupErr);
            this.groupErr.alpha = 1;
            this.groupErr.visible = true;
            CTween.get(this.groupErr).wait(1000).to({
                alpha: 0
            }, 2000).call(() =>
            {
                this.groupErr.visible = false;
                this.groupErr.alpha = 1;
            }, this);
        }
        //----------------------------------旁观-----------------------------------------
        /**转化*/
        protected changeNum(key: string): number
        {
            let seatN: number;
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
        }
        /** 显示所有座位的信息 */
        public showAllSeat(seats: any)
        {
            if (seats) {
                for (let key in seats) {
                    let seatN: number = this.changeNum(key);
                    let seat = seats[key];
                    this[`seatFrame${seatN}`].visible = false;
                    this[`seatNum${seatN}`].source = "seat_pic_seat" + key + "_pc_png";
                    this[`seatUesrHead${seatN}`].source = this.seat_other_head;
                    this[`seatUesrBcePic${seatN}`].source = this.seat_other_money;
                    this[`seatUesrName${seatN}`].textColor = 0xD6B783;
                    this[`seatUesrBce${seatN}`].textColor = 0xD6B783;
                    if (seat && seat["nick"]) {
                        this[`seatUesrHead${seatN}`].visible = true;
                        this[`seatUesrBcePic${seatN}`].visible = true;
                        this[`seatUesrName${seatN}`].visible = true;
                        this[`seatUesrBce${seatN}`].visible = true;
                        this[`seatChair${seatN}`].visible = false;

                        this[`seatUesrName${seatN}`].text = seat.nick;
                        this[`seatUesrBce${seatN}`].text = NumberUtil.getSplitNumStr(seat.balance, 3) + '';

                        this[`isMyPayName${key}`].visible = true;
                        this[`isMyPayImg${key}`].visible = false;
                        this[`isMyPayName${key}`].text = seat.nick;
                    } else {
                        this[`seatUesrHead${seatN}`].visible = false;
                        this[`seatUesrBcePic${seatN}`].visible = false;
                        this[`seatUesrName${seatN}`].visible = false;
                        this[`seatUesrBce${seatN}`].visible = false;
                        this[`seatChair${seatN}`].visible = true;

                        this[`isMyPayName${key}`].visible = false;
                        this[`isMyPayImg${key}`].visible = true;
                    }
                }
            }
        }
        /** 房主观战所有人的下注数据 */
        public showAllBet(allBet: any)
        {
            if (!allBet) return;
            for (let key in allBet) {
                let seatBet = allBet[key];
                let seatN: number = this.changeNum(key);
                let bets = { banker: 0, banker_pair: 0, player: 0, player_pair: 0, tie: 0 }
                for (let key1 in bets) {
                    this[`${key1}BetMine${seatN}`].visible = false;
                    this[`${key1}BetMineNum${seatN}`].visible = false;
                    if (seatBet[key1]) {
                        this[`${key1}BetOtherNum${seatN}`].text = NumberUtil.getSplitNumStr(seatBet[key1], 1)
                        this[`${key1}BetOther${seatN}`].visible = true;
                        this[`${key1}BetOtherNum${seatN}`].visible = true;
                    }
                    else {
                        this[`${key1}BetOther${seatN}`].visible = false;
                        this[`${key1}BetOtherNum${seatN}`].visible = false;
                    }
                }
            }
        }
        /** 房主观战盈余 */
        public showAllPay(allPay: Array<any>)
        {
            if (!allPay) return;
            if (allPay[2] == false) {
                this['isMyPayOutGroup'].visible = false;
                return;
            }
            else {
                this['isMyPayOutGroup'].visible = true;
            }
            let newPay = allPay[0];
            for (let key in newPay) {
                let seatBet = newPay[key];
                this[`isMyPayNum${key}`].text = key + '';
                if (seatBet['bet']) {
                    this[`isMyPayBetNum${key}`].text = NumberUtil.getSplitNumStr(seatBet['bet']);
                }
                else {
                    this[`isMyPayBetNum${key}`].text = '——';
                }

                if (seatBet['pay']) {
                    this[`isMyPayPayNum${key}`].text = NumberUtil.getSplitNumStr(seatBet['pay']);
                }
                else {
                    this[`isMyPayPayNum${key}`].text = '——';
                }
            }

            if (allPay[1] > 0) {
                this['isMyPayOutNum'].font = this.bac_surplus_red;
                this['isMyPayOutNum'].text = '+' + NumberUtil.getSplitNumStr(allPay[1]);
            }
            else {
                this['isMyPayOutNum'].font = this.bac_surplus_green;
                this['isMyPayOutNum'].text = NumberUtil.getSplitNumStr(allPay[1]);
            }

        }
        /**  玩家下注的筹码动画 */
        public allBetFly(body: { seat: number, type: string, chipNum: number })
        {
            if (!this.isMy) return;
            let group;
            let numSeat = body.seat;
            let lastChip, chipN;
            let numY: number = this[`${body.type}BetGroup`].y + this[`${body.type}BetGroup${numSeat}`].y;
            let numX: number = this[`${body.type}BetGroup`].x + this[`${body.type}BetGroup${numSeat}`].x;
            group = this[`${body.type}BetGroup`];
            if (lastChip) {
                chipN = body.chipNum - lastChip;
            } else {
                chipN = body.chipNum;
            }
            let chip = new betChip(NumberUtil.getSplitNumStr(chipN, 3));
            lastChip = body.chipNum;
            if (numSeat < 3) {
                chip.x = this[`seatUesrBce${numSeat}`].x;
                chip.y = this[`seatUesrBce${numSeat}`].y - 30;
            }
            else if (numSeat == 3) {
                chip.x = this[`seatUesrBce${numSeat}`].x - 30;
                chip.y = this[`seatUesrBce${numSeat}`].y - 20;
            }
            else {
                chip.x = this[`seatUesrBce${numSeat}`].x + 70;
                chip.y = this[`seatUesrBce${numSeat}`].y - 30;
            }
            this.betShowGroup.addChild(chip);
            CTween.get(chip).to({ x: numX, y: numY }, 500).call(() =>
            {
                this[`${body.type}BetOtherNum${numSeat}`].text = NumberUtil.getSplitNumStr(body.chipNum, 1);
                this[`${body.type}BetOther${numSeat}`].visible = true;
                this[`${body.type}BetOtherNum${numSeat}`].visible = true;
                chip.parent.removeChild(chip);
            });
        }
        //------------------------------------dispose-------------------------------------------------
        public dispose()
        {
            this.disposeCTween();
            this.disposeR();
            this.disposeEvent();
            clearTimeout(this.setTimeoutStage);
            BaccaratModel.getInstance().sendRoomLeave(this.data);
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
            MediatorManager.closeMediator(Mediators.Mediator_BaccaratMediator.name);
            MediatorManager.closeMediator(Mediators.Mediator_RoomInfo.name);
            this._mediator = null;
            super.dispose();
        }
        /**dispose CTween*/
        protected disposeCTween(): void
        {
            CTween.removeTweens(this["ChipBg"]);
            CTween.removeTweens(this["tieRotationImg"]);
            CTween.removeTweens(this.groupErr);
            CTween.removeTweens(this.groupChip);
            CTween.removeTweens(this.payOutTxtGroup);
            CTween.removeTweens(this.payOutBg);
            CTween.removeTweens(this['blueDealCard']);
            for (let i = 0; i < 7; i++) {
                CTween.removeTweens(this[`payOutImg${i}`]);
            }
            CTween.removeTweens(this["tieRotationImg"]);
            CTween.removeTweens(this["imgTie"]);
            CTween.removeTweens(this["redDealCard"]);
            CTween.removeTweens(this["redMsgGroup"]);
            CTween.removeTweens(this['isWinnerGroup']);
        }
        /**dispose 对象*/
        protected disposeR(): void
        {

            this.chat.dispose();
            // this.countdown.dispose();
            this.bead_roadMap.dispose();
            this.big_roadMap.dispose();
            this.big_eye_roadMap.dispose();
            this.small_roadMap.dispose();
            this.cockroach_roadMap.dispose();
            this.countdown.dispose();
        }
        /**dispose 事件*/
        protected disposeEvent(): void
        {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
            this.chipEdit0.removeEventListener(egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.chipEdit1.removeEventListener(egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.chipEdit2.removeEventListener(egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.chipEdit0.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.chipEdit1.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.chipEdit2.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
        }
    }
}