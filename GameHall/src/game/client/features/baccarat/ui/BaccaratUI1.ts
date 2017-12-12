module game
{
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    export class BaccaratUI1 extends BaccaratBaseUI
    {
        /** mediator的指向 */
        public _mediator: BaccaratMediator;
        /** 后退按钮 */
        public backBtn: eui.AButton;
        /** 聊天按钮 */
        public chatBtn43: eui.AButton;
        public mulitBtn: eui.AButton;
        public homeBtn: eui.AButton;
        /** 确定取消下注按钮 */
        public sureBtn: eui.AButton;
        public cancelBtn: eui.AButton;
        /** 底部bottom显示的房间信息 */
        public bottomRoomName: eui.ALabel;
        public bottomRounds: eui.ALabel;
        public bottomRoundID: eui.ALabel;
        public bottomLimit: eui.ALabel;
        protected bottomAlabel: eui.ALabel;
        /** 是否免拥 */
        public isHire: boolean = false;

        /** ---------  座位区相关 -------------------- */
        public seatGroup: eui.Group;
        public otherSeatBet: eui.Group;
        public otherSeatData: eui.Group;
        public otherSeatMask: eui.Image;

        /**----------  发牌相关 -------- */
        /** 发牌Group */
        public dealCardGroup: eui.Group;
        /** 发牌闪电动画 */
        public lightningE: eui.AMovieClip;
        /** 发牌背景资源 */
        public pokerBackRes: string = 'mpoker_pic_back_png';
        /** 闲的总点数 */
        protected playerPoint: number = 0;
        protected playCardNum: eui.BitmapLabel;
        /** 庄的总点数 */
        protected bankerPoint: number = 0;
        protected bankerCardNum: eui.BitmapLabel;

        /**------------- 下注区  -------------- */
        // 父级
        public betGroup: eui.Group;
        // 闲
        public playerBetZone: eui.Group;
        // 庄
        public bankerBetZone: eui.Group;
        // 和
        public tieBetZone: eui.Group;
        // 闲对
        public player_pairBetZone: eui.Group;
        // 庄对
        public banker_pairBetZone: eui.Group;
        /** 筹码 */
        //蓝色
        public blueChip: eui.Group;
        //绿色
        public greenChip: eui.Group;
        //红色
        public redChip: eui.Group;
        //计时器
        public countdown: countdown;
        /** 计时器Group */
        public countdownGroup: eui.Group;

        /**------------------数据相关-------------------------- */
        /** 当前选中的筹码 */
        public thisChip: number = 0;
        /** 筹码数组 */
        public chipArr: Array<number>;

        /** ----------------- 派彩动画 ------------------------------ */

        public payOutBg: eui.Image;
        public payOutTxtGroup: eui.Group;
        public payOutImg0: eui.Image;
        public payOutImg1: eui.Image;
        public payOutImg2: eui.Image;
        public payOutImg3: eui.Image;
        public payOutImg4: eui.Image;
        public payOutImg5: eui.Image;
        public payOutImg6: eui.Image;

        /* ----------------- 4:3屏幕 ------------------- */
        // 路数相关
        /** 大路数容器 */
        public roadMap43: eui.Group;
        /** 珠盘路 */
        public bead_road43: eui.Group;
        public bead_roadMap: RoadMap;
        /** 珠盘路 */
        public big_road43: eui.Group;
        public big_roadMap: RoadMap;
        /** 珠盘路 */
        public big_eye_road43: eui.Group;
        public big_eye_roadMap: RoadMap;
        /** 珠盘路 */
        public small_road43: eui.Group;
        public small_roadMap: RoadMap;
        /** 珠盘路 */
        public cockroach_road43: eui.Group;
        public cockroach_roadMap: RoadMap;
        /** 画笔 */
        public shp: egret.Shape;
        /** 路数数据 */
        public RoadMapData: any;
        /** 路数放大 */
        public maxRoad: eui.Group;
        /** 放置放大的路数 */
        public maxRoadGroup: eui.Group;

        //-------------------适配(18.5:9)------------------------

        public static unit: number = 55;
        /*4:3时group*/
        protected group43: eui.Group;
        /*18.5:9时group*/
        protected group18: eui.Group;
        /** 路书容器 */
        public roadMap18: eui.Group;
        /** 珠盘路 */
        public bead_road18: eui.Group;
        /** 珠盘路 */
        public big_road18: eui.Group;
        /** 珠盘路 */
        public big_eye_road18: eui.Group;
        /** 珠盘路 */
        public small_road18: eui.Group;
        /** 珠盘路 */
        public cockroach_road18: eui.Group;
        //问路按钮
        protected playerWayBtn18: eui.AButton;
        protected bankerWayBtn18: eui.AButton;
        //确认撤销按钮
        protected cancelBtn18: eui.AButton;
        protected sureBtn18: eui.AButton;
        /**聊天按钮*/
        protected chatBtn18: eui.AButton;
        protected btnGroup18: eui.Group;
        /**是否是18.5:9*/
        protected is18: boolean;
        //筹码点击图
        protected blueChip18: eui.Image;
        protected greenChip18: eui.Image;
        protected redChip18: eui.Image;
        /**筹码背景*/
        protected ChipBg18: eui.Image;
        /**筹码数*/
        protected blueChipNum18: eui.BitmapLabel;
        protected greenChipNum18: eui.BitmapLabel;
        protected redChipNum18: eui.BitmapLabel;
        /**操作区group*/
        protected operatingGroup: eui.Group;
        protected roomCardTxt: eui.ALabel;


        public constructor(data: string)
        {
            super(data);
        }

        public initSetting()
        {
            super.initSetting();
            this.mobileAdaptation();
            this.initListener();
            this.initRoadMap();
            this.initCountdown();
            this.showTopChat()
            if (this.is18) {
                CTween.get(this.ChipBg18, { loop: true }).to({ rotation: -360 }, 2000);
            } else {
                CTween.get(this["ChipBg"], { loop: true }).to({ rotation: -360 }, 2000);
            }
        }



        public initListener()
        {
            //点击事件
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
            //长按事件
            this.registerEvent(this, egret.TouchEvent.TOUCH_BEGIN, this.onTouBegin, this);
            this.registerEvent(this, egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.registerEvent(this, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }

        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: BaccaratUICommands, params: any = null): void
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
                case BaccaratUICommands.BaccaratNotify_othersBets:
                    this.setOthersBets(params)
                    break;
                case BaccaratUICommands.BaccaratNotify_upDataBetNum:
                    if (params.isDealer) {
                        this.updaBetNum(params.chipMoney, params.type, NumberUtil.getSplitNumStr(params.unMoney, 3), params.isDealer);
                    }
                    else {
                        this.updaBetNum(params.chipMoney, params.type, NumberUtil.getSplitNumStr(params.unMoney, 3));
                    }
                    break;
                case BaccaratUICommands.BaccaratNotify_customChips:
                    this.setCustomChips(params)
                    break;
                case BaccaratUICommands.BaccaratNotify_showRedMsg:
                    this.showMsg(params, 'red');
                    break;
                case BaccaratUICommands.BaccaratNotify_showGreenMsg:
                    this.showMsg(params, 'green');
                    break;
                case BaccaratUICommands.BaccaratNotify_showSureMoney:
                    this.showSureMoney(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_cancelBet:
                    this.cancelBet();
                    break;
                case BaccaratUICommands.BaccaratNotify_toggleStage:
                    this.toggleStage(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_receiveSingleCard:
                    this.receiveSingleCard(params[0], params[1]);
                    break;
                case BaccaratUICommands.BaccaratNotify_setBetTime:
                    this.setCountdown(params[0], params[1]);
                    break;
                case BaccaratUICommands.BaccaratNotify_gameResults:
                    this.gameResults(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_myPayOutResults:
                    this.showMyPayOut(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_roadMapData:
                    this.setRoadMapData(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_otherPayOutResults:
                    this.showOtherPayOut(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_roomInfoMsg:
                    this.showRoomInfoMsg(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_showOtherBet:
                    this.showOtherBet(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_roomChatMsg:
                    this.setChatData(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_okeyBet:
                    this.updataSureBtn(params);
                    this.updataCancelBtn(params);
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
                case BaccaratUICommands.BaccaratNotify_isMy:
                    this.isMy = params;
                    if (params) {
                        this['isMySeatsGroup'].visible = true;

                        this['mySeatGroup'].visible = false;
                        this['seatGroup'].visible = false;

                        this.togglewayBtnSty(false);

                        this.blueChip.alpha = 0.5;
                        this.blueChip18.alpha = 0.5;
                        this.greenChip.alpha = 0.5;
                        this.greenChip18.alpha = 0.5;
                        this.redChip.alpha = 0.5;
                        this.redChip18.alpha = 0.5;

                        this['blueChipNum'].alpha = 0.5;
                        this['greenChipNum'].alpha = 0.5;
                        this['redChipNum'].alpha = 0.5;

                        this['blueChipNum18'].alpha = 0.5;
                        this['greenChipNum18'].alpha = 0.5;
                        this['redChipNum18'].alpha = 0.5;

                        this['ChipBg'].visible = false;

                    }
                    else {
                        this['isMySeatsGroup'].visible = false;

                        this['mySeatGroup'].visible = true;
                        this['seatGroup'].visible = true;

                        this.togglewayBtnSty(true);

                        this.blueChip.alpha = 1;
                        this.blueChip18.alpha = 1;
                        this.greenChip.alpha = 1;
                        this.greenChip18.alpha = 1;
                        this.redChip.alpha = 1;
                        this.redChip18.alpha = 1;

                        this['blueChipNum'].alpha = 1;
                        this['greenChipNum'].alpha = 1;
                        this['redChipNum'].alpha = 1;
                        this['blueChipNum18'].alpha = 1;
                        this['greenChipNum18'].alpha = 1;
                        this['redChipNum18'].alpha = 1;

                        this['ChipBg'].visible = true;

                    }
                    break;
                case BaccaratUICommands.BaccaratNotify_isHire:
                    this.isHire = params;
                    this.showHire(params);
                    break;
                case BaccaratUICommands.BaccaratNotify_isWinner:
                    this['isWinnerGroup'].visible = params;
                    this['isWinnerGroup'].alpha = 0.01;
                    CTween.get(this['isWinnerGroup']).to({ alpha: 1 })
                    break;
                case BaccaratUICommands.BaccaratNotify_otherNewBet:
                    this.otherBetFly(params)
                    break;
                case BaccaratUICommands.BaccaratNotify_isMyRoomCard:
                    this.roomCardTxt.text = `房卡：${params}`
                    break;
            }
        }
        /* 点击响应事件 */
        protected onTouchBtn(evt: egret.TouchEvent): void
        {
            SoundPlayerNew.playEffect(SoundConst.click);
            switch (evt.target) {
                case this.backBtn:
                    if (this.isMy) {
                        let lock = ClubModel.getInstance().getlockBool(this.data);
                        if (lock) {
                            MediatorManager.openMediator(Mediators.Mediator_roomManagerMediator);
                        }
                        else {
                            // BaccaratController.getInstance().isMyRoomLeave(this.data);
                            MediatorManager.openMediator(Mediators.Mediator_OwnersWatchMediator, this.data);
                        }
                    }
                    else {
                        BaccaratModel.getInstance().sendRoomLeave(this.data);
                        MediatorManager.openMediator(Mediators.Mediator_ClubDetail);
                    }
                    break;
                case this.homeBtn:
                    MediatorManager.openMediator(Mediators.Mediator_RoomInfo, this.data);
                    break;
                case this.mulitBtn:
                    MediatorManager.openMediator(Mediators.Mediator_Sidebar, [this.data, this.isMy]);
                    break;
                case this.chatBtn43:
                case this.chatBtn18:
                    this.showchat();
                    break;
                default:
                    if (this.isMy) {
                        switch (evt.target) {
                            case this['isMyseatTop']:
                                this['isMyTopGroup'].visible = true;
                                break;
                            case this['isMyseatBottom']:
                                this['isMyBottomGroup'].visible = true;
                                break;
                            case this['isMyTopGroup']:
                                this['isMyTopGroup'].visible = false;
                                break;
                            case this['isMyBottomGroup']:
                                this['isMyBottomGroup'].visible = false;
                                break;
                            case this.playerBetZone:
                            case this.bankerBetZone:
                            case this.tieBetZone:
                            case this.player_pairBetZone:
                            case this.banker_pairBetZone:
                            case this.sureBtn:
                            case this.sureBtn18:
                            case this.cancelBtn:
                            case this.cancelBtn18:
                            case this.blueChip:
                            case this.blueChip18:
                            case this.greenChip:
                            case this.greenChip18:
                            case this.seatGroup:
                            case this.otherSeatBet:
                                let tipData = new TipMsgInfo();
                                tipData.msg = [{ text: '您不能在自己创建的俱乐部中进行本操作', textColor: enums.ColorConst.Golden }];
                                tipData.confirmText = "我知道了";
                                MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
                                break;
                        }
                    }
                    else {
                        switch (evt.target) {
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
                            case this.sureBtn18:
                                let isHave = this.roomCard();
                                if (isHave) {
                                    this._mediator.sureFuc();
                                } else {
                                    this.cancelBet();
                                    this.showMsg("房卡不足请联系房主补充房卡", 'red');
                                }
                                break;
                            case this.cancelBtn:
                            case this.cancelBtn18:
                                this._mediator.cancelFuc();
                                break;
                            case this.blueChip:
                            case this.blueChip18:
                                this.getCustomChips('blue')
                                break;
                            case this.greenChip:
                            case this.greenChip18:
                                this.getCustomChips('green')
                                break;
                            case this.redChip:
                            case this.redChip18:
                                this.getCustomChips('red')
                                break;
                            case this.seatGroup:
                                this.showOtherSeats(true)
                                break;
                            case this.otherSeatBet:
                                this.showOtherSeats(false)
                                break;
                            case this['playerWayBtn']:
                            case this.playerWayBtn18:
                                this.playerAskWay();
                                break;
                            case this['bankerWayBtn']:
                            case this.bankerWayBtn18:
                                this.bankerAskWay();
                                break;
                        }
                    }
                    break;
            }
        }
        /**手机适配比例*/
        protected mobileAdaptation(): void
        {
            let h = StageUtil.height, w = StageUtil.width;
            //适配情况4:3(12:9),16:9,18.5:9
            //高的比例
            let a = h / (w / 9);
            //a与标准高的比例的差的绝对值
            let h12 = (a - 12) >= 0 ? (a - 12) : -(a - 12);
            let h16 = (a - 16) >= 0 ? (a - 16) : -(a - 16);
            let h18 = (a - 18.5) >= 0 ? (a - 18.5) : -(a - 18.5);
            //判断更接近哪一个比例
            if (h12 < h16 && h12 < h18) {//4:3(12:9)
                this.is18 = false;
                this.proportion4();
            }
            else if (h16 < h12 && h16 < h18) {//16:9
                this.is18 = false;
                this.proportion16();
            }
            else if (h18 < h16 && h18 < h12) {//18.5:9
                this.is18 = true;
                this.proportion18();
            }
            this.groupProportion();
        }
        /**适配比例4:3(12:9)*/
        protected proportion4(): void
        {
            this.group43.visible = true;
            this.group18.visible = false;

        }
        /**适配比例16:9*/
        protected proportion16(): void
        {
            this.group43.visible = true;
            this.group18.visible = false;
        }
        /**适配比例18.5:9*/
        protected proportion18(): void
        {
            this.group43.visible = false;
            this.group18.visible = true;
        }
        /*相关group适配**/
        protected groupProportion(): void
        {
            if (this.is18) {
                this.betGroup.bottom = "33.5775%";
                this.operatingGroup.top = "66.42%";
                this.videoBg.bottom = "37.91%";
            } else {
                this.betGroup.bottom = 550;
                this.videoBg.bottom = 621;
            }
        }
        /** 长按事件 */
        public onTouBegin(evt: egret.TouchEvent)
        {
            switch (evt.target) {
                case this.bead_road43:
                    this.longTouchCallBack(RoadMap.BeadRoad)
                    break;
                case this.big_road43:
                    this.longTouchCallBack(RoadMap.BigRoad)
                    break;
                case this.big_eye_road43:
                    this.longTouchCallBack(RoadMap.BigEyeRoad)
                    break;
                case this.small_road43:
                    this.longTouchCallBack(RoadMap.SmallRoad)
                    break;
                case this.cockroach_road43:
                    this.longTouchCallBack(RoadMap.CockRoachRoad)
                    break;
            }
        }

        /** 长按事件结束 */
        public onTouchEnd(evt: egret.TouchEvent)
        {
            this.clearTimer();
        }

        /** 初始化计时器 */
        public initCountdown()
        {
            this.countdown = new game.countdown(185);
            this.countdownGroup.addChild(this.countdown);
            this.countdown.setStratCallBack(this.stratCallBack, this);
        }

        /** 设置倒计时 */
        public setCountdown(timeAll: number, overTime: number)
        {
            this.countdown.startTime(timeAll, overTime)
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
            if (this.is18) {
                if (b) {
                    if (this.sureBtn18.setState != 'up') {
                        this.sureBtn18.setState = 'up';
                    }
                    if (!this.sureBtn18.enabled) {
                        this.sureBtn18.enabled = true;
                    }
                }
                else {
                    if (this.sureBtn18.setState != 'disabled') {
                        this.sureBtn18.setState = 'disabled';
                    }
                    if (this.sureBtn18.enabled) {
                        this.sureBtn18.enabled = false;
                    }
                }
            }
            else {
                if (b) {
                    if (this.sureBtn.setState != 'up') {
                        this.sureBtn.setState = 'up';
                    }
                    if (!this.sureBtn.enabled) {
                        this.sureBtn.enabled = true;
                    }
                }
                else {
                    if (this.sureBtn.setState != 'disabled') {
                        this.sureBtn.setState = 'disabled';
                    }
                    if (this.sureBtn.enabled) {
                        this.sureBtn.enabled = false;
                    }
                }
            }
        }

        /** 设置取消按钮的样式 */
        public updataCancelBtn(b: boolean)
        {
            if (this.is18) {
                if (b) {
                    this.cancelBtn18.setState = 'up';
                    this.cancelBtn18.enabled = true;
                }
                else {
                    this.cancelBtn18.setState = 'disabled';
                    this.cancelBtn18.enabled = false;
                }
            } else {
                if (b) {
                    this.cancelBtn.setState = 'up';
                    this.cancelBtn.enabled = true;
                }
                else {
                    this.cancelBtn.setState = 'disabled';
                    this.cancelBtn.enabled = false;
                }
            }
        }

        /** 更新下注区金额和显示动画 */
        public updaBetNum(chipMonney: string, type: string, unMoney: string, isDealer = false)
        {
            this.newFlyChip(chipMonney, type, unMoney, isDealer);
        }

        /** 更新筹码列表 */
        public setCustomChips(arr: Array<number>)
        {
            if (arr && arr.length) {
                this.chipArr = arr;
                if (this.is18) {
                    this.blueChipNum18.text = NumberUtil.getSplitNumStr(arr[0], 3);
                    this.greenChipNum18.text = NumberUtil.getSplitNumStr(arr[1], 3);
                    this.redChipNum18.text = NumberUtil.getSplitNumStr(arr[2], 3);
                } else {
                    this["blueChipNum"].text = NumberUtil.getSplitNumStr(arr[0], 3);
                    this["greenChipNum"].text = NumberUtil.getSplitNumStr(arr[1], 3);
                    this["redChipNum"].text = NumberUtil.getSplitNumStr(arr[2], 3);
                }
            }
        }

        /** 点击筹码更新金额 */
        public getCustomChips(type)
        {
            switch (type) {
                case 'blue':
                    this.thisChip = 0;
                    if (this.is18) {
                        this.ChipBg18.horizontalCenter = "-58.82%";
                    } else {
                        this["ChipBg"].horizontalCenter = "-66%";
                    }
                    break;
                case 'green':
                    this.thisChip = 1;
                    if (this.is18) {
                        this.ChipBg18.horizontalCenter = "3.67%";
                    } else {
                        this["ChipBg"].horizontalCenter = "0";
                    }
                    break;
                case 'red':
                    this.thisChip = 2;
                    if (this.is18) {
                        this.ChipBg18.horizontalCenter = "63.97%";
                    } else {
                        this["ChipBg"].horizontalCenter = "66%";
                    }
                    break;
            }
            if (this.is18) {
                this.ChipBg18.visible = true;
            } else {
                this["ChipBg"].visible = true;
            }
        }


        /** 新的飞筹码动画 */
        public newFlyChip(chipMoney: string, type: string, unMoney: any, isDealer = false)
        {
            let group;
            let numY = 0;

            group = this[`${type}BetZone`];
            switch (type) {
                case BaccaratModel.TIE:
                case BaccaratModel.PLAYERPAIR:
                case BaccaratModel.BANKERPAIR:
                    numY = this[`playerBetZone`].height;
                    break;
            }
            let chip = new betChip(chipMoney);
            chip.x = StageUtil.width / 2 - chip.width / 2;
            chip.y = 0 - this["seatGroup"].height - this["mySeatGroup"].height;
            if (isDealer) {
                chip.y -= 200;
            }
            this.betGroup.addChild(chip);
            if (isDealer) {
                CTween.get(chip).to({ x: group.x + group.width / 2 - chip.width / 2, y: numY + group.y + group.height / 2 - chip.height / 2 }, 500).call(() =>
                {
                    chip.parent.removeChild(chip);
                });
            }
            else {
                this.updataSureBtn(true);
                this.updataCancelBtn(true);
                CTween.get(chip).to({ x: group.x + group.width / 2 - chip.width / 2, y: numY + group.y + group.height / 2 - chip.height / 2 }, 500).call(this.disposeChip, this, [chip, unMoney, type]);
            }
        }

        /** 飞筹码动画执行完的回调 */
        public disposeChip(item: betChip, unMoney: string, type: string)
        {
            item.parent.removeChild(item);
            this.betUnSureNum(unMoney, type);
        }

        /** 未确定的下注金额 */
        public betUnSureNum(unMoney: string, type: string)
        {
            if (!type) return;
            let group: eui.Group;
            let numGroup: eui.BitmapLabel;
            let imgBg: eui.Image;

            group = this[`${type}UnSureG`];
            numGroup = this[`${type}UnSureNum`];
            imgBg = this[`${type}BetBg`];

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
            }

            if (this.is18) {
                if (!this.sureBtn18.enabled) {
                    group.visible = false
                }
            }
            else {
                if (!this.sureBtn.enabled) {
                    group.visible = false
                }
            }
        }

        /** 显示荷官飞筹码动画 */
        protected showDealerChip(chipMoney: string, type: string, sureMoney: string)
        {
            this.newFlyChip(chipMoney, BaccaratModel.PLAYER, sureMoney, true)
        }

        /* 设置我的座位号和余额 */
        protected setMySeat(mySeat: { seat: string, data: { balance: number, nick: string, type: string, user_id: string } }): void
        {
            if (mySeat && mySeat.data.nick) {
                (<eui.Group>this["mySeatGroup"]).visible = true;
                (<eui.BitmapLabel>this["mySeatNum"]).text = mySeat.seat + '';
                (<eui.Label>this["myName"]).text = mySeat.data.nick;
                (<eui.BitmapLabel>this["myBalance"]).text = NumberUtil.getSplitNumStr(mySeat.data.balance);
            }
            else {
                (<eui.Group>this["mySeatGroup"]).visible = false;
            }
        }

        /* 设置其他人的座位号和余额 */
        protected setOtherSeat(oSeat: Array<{ seat: string, data: { balance: number, nick: string, type: string, user_id: string } }>): void
        {
            if (oSeat) {
                if (oSeat.length == 6) {
                    for (let i = 0; i < oSeat.length; i++) {
                        this[`steatNum${i}`].text = oSeat[i].seat;
                        this[`steatBetNum${i}`].text = oSeat[i].seat;
                        if (oSeat[i].data && oSeat[i].data.nick && oSeat[i].data.balance) {
                            this[`seatImgGroup${i}`].visible = false;
                            this[`seatUser${i}`].visible = true;
                            this[`seatUName${i}`].text = oSeat[i].data.nick;
                            this[`seatUBce${i}`].text = NumberUtil.getSplitNumStr(oSeat[i].data.balance, 3);

                            this[`seatBetImgGroup${i}`].visible = false;
                            this[`seatBetUser${i}`].visible = true;
                            this[`seatBetUName${i}`].text = oSeat[i].data.nick;
                            this[`seatBetUBce${i}`].text = NumberUtil.getSplitNumStr(oSeat[i].data.balance, 3);
                        }
                        else {
                            this[`seatImgGroup${i}`].visible = true;
                            this[`seatUser${i}`].visible = false;
                            this[`seatUName${i}`].text = '';
                            this[`seatUBce${i}`].text = '';

                            this[`seatBetImgGroup${i}`].visible = true;
                            this[`seatBetUser${i}`].visible = false;
                            this[`seatBetUName${i}`].text = '';
                            this[`seatBetUBce${i}`].text = '';
                        }
                    }
                }
            }
        }

        /** 设置其他玩家的详细下注信息 */
        public showOtherBet(arr: Array<{ banker, banker_pair, player, player_pair, tie }>)
        {
            if (arr) {
                if (arr.length == 6) {
                    for (let i = 0; i < arr.length; i++) {
                        let bet = arr[i];
                        if (bet.player || bet.player == 0) {
                            this[`seat${i}playerBet`].text = NumberUtil.getSplitNumStr(bet.player, 3);
                            this[`seat${i}bankerBet`].text = NumberUtil.getSplitNumStr(bet.banker, 3);
                            this[`seat${i}tieBet`].text = NumberUtil.getSplitNumStr(bet.tie, 3);
                            this[`seat${i}player_pairBet`].text = NumberUtil.getSplitNumStr(bet.player_pair, 3);
                            this[`seat${i}banker_pairBet`].text = NumberUtil.getSplitNumStr(bet.banker_pair, 3);
                        }
                        else {
                            this[`seat${i}playerBet`].text = '——';
                            this[`seat${i}bankerBet`].text = '——';
                            this[`seat${i}tieBet`].text = '——';
                            this[`seat${i}player_pairBet`].text = '——';
                            this[`seat${i}banker_pairBet`].text = '——';
                        }
                    }
                }
            }
        }

        /**  其他玩家下注的筹码动画 */
        public otherBetFly(body: { seat: number, type: string, chipNum: number })
        {
            let group;
            let numY = 0;
            group = this[`${body.type}BetZone`];
            switch (body.type) {
                case BaccaratModel.TIE:
                case BaccaratModel.PLAYERPAIR:
                case BaccaratModel.BANKERPAIR:
                    numY = this[`playerBetZone`].height;
                    break;
            }
            let chip = new betChip(NumberUtil.getSplitNumStr(body.chipNum, 3));
            if (this.isMy) {
                chip.x = this[`isMySeat${body.seat}`].x + chip.width / 2;
                if (body.seat <= 2) {
                    chip.y = 0 - (this["seatGroup"].height * 1.5);
                }
                else {
                    chip.y = 0 - (this["seatGroup"].height * 0.5);
                }
            }
            else {
                chip.x = this[`otherSeat${body.seat}`].x + chip.width / 2;
                chip.y = 0 - (this["seatGroup"].height / 2);
            }
            this.betGroup.addChild(chip);
            CTween.get(chip).to({ x: group.x + group.width / 2 - chip.width / 2, y: numY + group.y + group.height / 2 - chip.height / 2 }, 500).call(() =>
            {
                chip.parent.removeChild(chip);
            });
        }

        /** 显示和隐藏其他玩家的座位和下注 */
        public showOtherSeats(b: boolean)
        {
            if (b) {
                this.otherSeatBet.visible = b;
            }
            if (this.isMy) {
                this['isMySeatsGroup'].visible = !b;
            }
            else {
                this['mySeatGroup'].visible = !b;
                this['seatGroup'].visible = !b;
            }
            this.otherSeatData.y = 150;
            this.otherSeatMask.y = this.otherSeatData.y;
            CTweenManagerController.getInstance().startCTween(5, [this.otherSeatData, this.otherSeatMask], b, () =>
            {
                if (!b) {
                    this.otherSeatBet.visible = b;
                }
            }, this);
        }

        /** 设置下注区域的人数和余额 */
        public setOthersBets(bets: any)
        {
            if (bets) {
                // 闲
                this["playerUNum"].text = bets.player.users;
                this["playerAmount"].text = NumberUtil.getSplitNumStr(bets.player.amount, 3);
                // 庄
                this["bankerUNum"].text = bets.banker.users;
                this["bankerAmount"].text = NumberUtil.getSplitNumStr(bets.banker.amount, 3);
                // 和
                this["tieUNum"].text = bets.tie.users;
                this["tieAmount"].text = NumberUtil.getSplitNumStr(bets.tie.amount, 3);
                // 闲对
                this["playerPairUnum"].text = bets.player_pair.users;
                this["playerPairAmount"].text = NumberUtil.getSplitNumStr(bets.player_pair.amount, 3);
                // 庄对
                this["bankerPairUnum"].text = bets.banker_pair.users;
                this["bankerPairAmount"].text = NumberUtil.getSplitNumStr(bets.banker_pair.amount, 3);

                //显示下注百分比
                let allAmount = 0;
                allAmount += bets.player.amount;
                allAmount += bets.banker.amount;
                allAmount += bets.tie.amount;
                let playerAmount = 0;
                playerAmount += bets.player.amount;
                let bankerAmount = 0;
                bankerAmount += bets.banker.amount;
                let tieAmount = 0;
                tieAmount += bets.tie.amount;
                let bluePercent = Math.round(playerAmount / allAmount * 10000 / 100);
                let bluePercentNew = isNaN(bluePercent) ? 0 : bluePercent;
                let redPercent = Math.round(bankerAmount / allAmount * 10000 / 100);
                let redPercentNew = isNaN(redPercent) ? 0 : redPercent;

                let greenPercentNew = 0;
                if (bluePercentNew > 0 || redPercentNew > 0) {
                    greenPercentNew = 100 - bluePercentNew - redPercentNew;
                }
                else if (bluePercentNew == 0 && redPercentNew == 0 && tieAmount > 0) {
                    greenPercentNew = 100 - bluePercentNew - redPercentNew;
                }

                this['bluePercent'].text = bluePercentNew + '%';
                this['redPercent'].text = redPercentNew + '%';
                this['greenPercent'].text = greenPercentNew + '%';

                this.showPercentClicle(bluePercentNew, redPercentNew, greenPercentNew)
            }
        }

        /** 显示所有座位的信息 */
        public showAllSeat(seats: any)
        {
            if (seats) {
                for (let key in seats) {
                    let seat = seats[key];
                    this[`isMySeatNum${key}`].text = key + '';
                    this[`isMyTopNum${key}`].text = key + '';
                    if (seat['nick']) {
                        this[`isMySeatImg${key}`].visible = false;
                        this[`isMySeatName${key}`].text = seat.nick + '';
                        this[`isMySeatName${key}`].visible = true;
                        this[`isMySeatBalanceNum${key}`].text = NumberUtil.getSplitNumStr(seat.balance, 3) + '';
                        this[`isMySeatBalanceNum${key}`].visible = true;


                        this[`isMySeatTopImg${key}`].visible = false;
                        this[`isMyTopName${key}`].text = seat.nick + '';
                        this[`isMyTopName${key}`].visible = true;
                        this[`isMyTopBalanceNum${key}`].text = NumberUtil.getSplitNumStr(seat.balance, 3) + '';
                        this[`isMyTopBalanceNum${key}`].visible = true;

                        this[`isMyPayName${key}`].visible = true;
                        this[`isMyPayName${key}`].text = seat.nick + '';
                        this[`isMyPayImg${key}`].visible = false;
                    }
                    else {
                        this[`isMySeatImg${key}`].visible = true;
                        this[`isMySeatName${key}`].visible = false;
                        this[`isMySeatBalanceNum${key}`].visible = false;

                        this[`isMySeatTopImg${key}`].visible = true;
                        this[`isMyTopName${key}`].visible = false;
                        this[`isMyTopBalanceNum${key}`].visible = false;

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
                let bets = { banker: 0, banker_pair: 0, player: 0, player_pair: 0, tie: 0 }
                for (let key1 in bets) {
                    if (seatBet[key1]) {
                        this[`isMyTopBet${key1}${key}`].text = NumberUtil.getSplitNumStr(seatBet[key1], 3)
                    }
                    else {
                        this[`isMyTopBet${key1}${key}`].text = '——';
                    }
                }
            }
        }

        /** 显示是否免拥 */
        public showHire(b: boolean)
        {
            if (b) {
                this['bankerOdds1'].visible = true;
                this['bankerOdds2'].visible = false;
            }
            else {
                this['bankerOdds1'].visible = false;
                this['bankerOdds2'].visible = true;
            }
        }

        /** 盈余 */
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
                    this[`isMyPayBetNum${key}`].text = '--';
                }

                if (seatBet['pay']) {
                    this[`isMyPayPayNum${key}`].text = NumberUtil.getSplitNumStr(seatBet['pay']);
                }
                else {
                    this[`isMyPayPayNum${key}`].text = '--';
                }
            }

            if (allPay[1] > 0) {
                this['isMyPayOutNum'].font = 'game_share_red_105_fnt';
                this['isMyPayOutNum'].text = '+' + NumberUtil.getSplitNumStr(allPay[1]);
            }
            else {
                this['isMyPayOutNum'].font = 'game_share_green_105_fnt';
                this['isMyPayOutNum'].text = NumberUtil.getSplitNumStr(allPay[1]);
            }

        }


        public bluePercentGroup: eui.Group;
        public blueClicle: egret.Shape;

        public redPercentGroup: eui.Group;
        public redClicle: egret.Shape;

        public greenPercentGroup: eui.Group;
        public greenClicle: egret.Shape;

        /** 设置下注区域百分比的圆弧 */
        public showPercentClicle(blue: number, red: number, green: number)
        {
            if (blue && blue > 0) {
                this.shepClicle('blue', blue, 0x0088ff)
            }
            if (red && red > 0) {
                this.shepClicle('red', red, 0xff1211)
            }
            if (green && green > 0) {
                this.shepClicle('green', green, 0x1ebf4b)
            }
        }

        /** 绘制下注区百分比圆弧  */
        public shepClicle(color: string, numberPercent: number, lineColor: number)
        {
            if (this[`${color}Clicle`]) {
                this[`${color}Clicle`].graphics.clear();
            }
            else {
                this[`${color}Clicle`] = new egret.Shape;
            }
            let colorClicle = this[`${color}Clicle`];
            colorClicle.graphics.lineStyle(6, lineColor);
            let r = this[`${color}PercentGroup`].width / 2;
            colorClicle.graphics.drawArc(r, r, r, Math.PI / 180 * - 90, Math.PI / 180 * (360 / 100 * numberPercent - 90), false);
            //shep有BUG要画点其他东西才能画出圆弧
            colorClicle.graphics.moveTo(0, 0);
            this[`${color}PercentGroup`].addChild(colorClicle);
        }

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

            this['tiePayout'].visible = false;
            this.dealCardGroup.visible = b;
            if (b) {
                this.countdown.startPayOut();
                this['blueDealCard'].x = (-this['blueDealCard'].width)
                CTween.get(this['blueDealCard']).to({ x: 0 }, 1000).call(() =>
                {
                    this.lightningE.visible = true;
                    this.lightningE.play();
                }).wait(1000).call(() =>
                {
                    this.lightningE.stop();
                    this.lightningE.visible = false;
                });
                this['redDealCard'].x = StageUtil.width;
                CTween.get(this['redDealCard']).to({ x: StageUtil.width / 2 }, 1000);
            }
            else {
                this.lightningE.stop();
                this.lightningE.visible = false;
                this['tiePayout'].visible = false;
                CTween.removeTweens(this["tieDealCard"]);
            }
        }

        /** 弹出（红、绿）提示框 */
        public showMsg(msg: string, color: string)
        {
            if (color == 'red') {
                var group = this["redMsgGroup"];
                this["redMsgTxt"].text = msg;
            }
            else {
                var group = this["greenMsgGroup"];
                this["greenMsgTxt"].text = msg;
            }
            CTween.removeTweens(group);
            // group.alpha = 1;
            // group.visible = true;
            // CTween.get(group).wait(1000).to({ alpha: 0 }, 2000).call(() =>
            // {
            //     group.visible = false;
            // })
            CTweenManagerController.getInstance().startCTween(2, [group]);
        }


        /** 显示已确定的下注框 */
        public showSureMoney(monneyObj: { player, tie, banker, player_pair, banker_pair })
        {
            if (!monneyObj) return;
            for (let key in monneyObj) {
                if (monneyObj[key]) {
                    this[`${key}BetNumGroup`].visible = true;
                    this[`${key}BetNum`].text = NumberUtil.getSplitNumStr(monneyObj[key], 3);
                    let source: string = this[`${key}Img`].source;
                    let NumSource: string = this[`${key}NumImg`].source;
                    if (key == 'player') {
                        this[`${key}Img`].source = 'baccarat_pic_player_b_png';
                        this[`${key}NumImg`].source = 'bettingarea_pic_ratiop2_png';
                    }
                    else if (key == 'tie') {
                        this[`${key}Img`].source = 'baccarat_pic_tie_g_png';
                        this[`${key}NumImg`].source = 'bettingarea_pic_ratiot2_png';
                    }
                    else if (key == 'banker') {
                        this[`${key}Img`].source = 'baccarat_pic_banker_r_png';
                        this[`${key}NumImg`].source = 'bettingarea_pic_ratiob2_png';
                    }
                    else if (key == 'player_pair') {
                        this[`${key}Img`].source = 'baccarat_pic_playerpair_b_png';
                        this[`${key}NumImg`].source = 'bettingarea_pic_ratiopp2_png';
                    }
                    else if (key == 'banker_pair') {
                        this[`${key}Img`].source = 'baccarat_pic_bankerpair_r_png';
                        this[`${key}NumImg`].source = 'bettingarea_pic_ratiobp2_png';
                    }
                }
                else {
                    this[`${key}BetNumGroup`].visible = false;
                    this[`${key}BetNum`].text = 0;
                    this[`${key}Img`].source = this[`${key}Img`].source.replace(/_r.png|_b.png|_g.png/, '_y.png');
                }
            }
            this.cancelBet();
        }

        /** 取消下注或者隐藏未确定下注 */
        public cancelBet()
        {
            this.betUnSureNum('0', BaccaratModel.PLAYER);
            this.betUnSureNum('0', BaccaratModel.TIE);
            this.betUnSureNum('0', BaccaratModel.BANKER);
            this.betUnSureNum('0', BaccaratModel.PLAYERPAIR);
            this.betUnSureNum('0', BaccaratModel.BANKERPAIR);
            this.updataSureBtn(false);
            this.updataCancelBtn(false);
        }

        /** 切换房间状态 */
        public toggleStage(stage: String)
        {
            this.shuffleRoadLabel.visible = false;
            switch (stage) {
                case GameState.bet:
                    this.hiddenStage();
                    this.betStage();
                    this.playerPoint = 0;
                    this.bankerPoint = 0;
                    this.shepClicle('blue', 0, 0x0088ff);
                    this.shepClicle('red', 0, 0xff1211);
                    this.shepClicle('green', 0, 0x1ebf4b);
                    this.shuffleRoadLabel.text = '';
                    if (!this.isMy) {
                        this.togglewayBtnSty(true);
                    }
                    this['isMyPayOutGroup'].visible = false;
                    this['isWinnerGroup'].visible = false;
                    break;
                case GameState.deal_card:
                    this.hiddenStage();
                    this.dealCardStage();
                    this.isOneBet = true;
                    break;
                case GameState.payout:
                    this.dealCardGroup.visible = true;
                    this['redDealCard'].x = StageUtil.width / 2;
                    this.countdown.startPayOut();
                    this.isOneBet = true;
                    break;
                case GameState.shuffle:
                    this.hiddenStage();
                    this.countdown.startShuffle();
                    this.cancelBet();
                    this.shuffleRoadLabel.text = '洗牌中';
                    this.shuffleRoadLabel.visible = true;
                    if (!this.isMy) {
                        this.togglewayBtnSty(false);
                    }
                    this.isOneBet = true;
                    break;
            }

            // this.dealCardGroup.visible = false;
        }

        /** 隐藏跟房间状态有关的东西,恢复房间默认样式 */
        public hiddenStage()
        {
            this.countdown.startPayOut();
            this.startMoVeclip(false);
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
            this.toggleBetImg(true);
            this.showOtherPayOut([]);
        }

        /** 切换到发牌状态 */
        public dealCardStage()
        {
            this.startMoVeclip(true);
            this.cancelBet();
        }

        public setTimeNum: any = false;
        public maxRoadMap: RoadMap;
        protected maxRoadOut: eui.Group;
        /** 长按路数回调 */
        public longTouchCallBack(type: string)
        {
            let self = this;
            this.setTimeNum = setTimeout((self) =>
            {
                // this.maxRoad.visible = true;
                if (type == RoadMap.BeadRoad) {
                    this.maxRoadMap = new RoadMap(this.maxRoadGroup.width, this.maxRoadGroup.height, type, this.maxRoadGroup.height / 6);
                    this.maxRoad.bottom = 350;
                    this['maxRoadArrow'].x = this.bead_road43.width / 2;
                    this['maxRoadTxt'].text = '珠盘路';
                }
                else {
                    this['maxRoadArrow'].x = this.bead_road43.width + (this.big_road43.width / 2);
                    if (type == RoadMap.BigRoad) {
                        this.maxRoadMap = new RoadMap(this.maxRoadGroup.width, this.maxRoadGroup.height, type, this.maxRoadGroup.height / 6);
                        this.maxRoad.bottom = 350;
                        this['maxRoadTxt'].text = '大路';
                    }
                    else if (type == RoadMap.BigEyeRoad) {
                        this.maxRoadMap = new RoadMap(this.maxRoadGroup.width, this.maxRoadGroup.height, type, this.maxRoadGroup.height / 6, true);
                        this.maxRoad.bottom = 175;
                        this['maxRoadTxt'].text = '大眼路';
                    }
                    else if (type == RoadMap.SmallRoad) {
                        this.maxRoadMap = new RoadMap(this.maxRoadGroup.width, this.maxRoadGroup.height, type, this.maxRoadGroup.height / 6, true);
                        this.maxRoad.bottom = 87.5;
                        this['maxRoadArrow'].x = this.bead_road43.width + (this.small_road43.width / 2);
                        this['maxRoadTxt'].text = '小路';
                    }
                    else if (type == RoadMap.CockRoachRoad) {
                        this.maxRoadMap = new RoadMap(this.maxRoadGroup.width, this.maxRoadGroup.height, type, this.maxRoadGroup.height / 6, true);
                        this.maxRoad.bottom = 87.5;
                        this['maxRoadArrow'].x = this.bead_road43.width + this.small_road43.width + (this.cockroach_road43.width / 2);
                        this['maxRoadTxt'].text = '曱甴路';
                    }
                }
                this.maxRoadGroup.addChild(this.maxRoadMap);
                if (this.RoadMapData) {
                    this.maxRoadMap.setData(this.RoadMapData);
                }
                CTweenManagerController.getInstance().startCTween(1, [this.maxRoadOut, this.maxRoad], true);
            }, 1000)
        }

        /** 关闭长按回调 */
        public clearTimer()
        {
            if (this.setTimeNum) {
                clearTimeout(this.setTimeNum);
            }
            if (this.maxRoad.visible) {
                // this.maxRoad.visible = false;
                CTweenManagerController.getInstance().startCTween(1, [this.maxRoadOut, this.maxRoad], false);
            }
            if (this.maxRoadMap) {
                this.maxRoadGroup.removeChild(this.maxRoadMap);
                this.maxRoadMap = null;
            }
        }

        /**
         * 新收到一张牌
         */
        public receiveSingleCard(name: string, num: number)
        {
            super.receiveSingleCard(name, num);
            this.cancelBet();

            DebugUtil.debug("发一张牌:" + name);
            var card: eui.Image;
            card = this[name];

            card.visible = true;
            card.alpha = 1;
            card.source = this.pokerBackRes;
            var x0 = card.x;
            var y0 = card.y;
            let distancex = 40, distancey = 40;
            if (name.indexOf("3") != -1) {
                distancex = 25;
                distancey = 120;
                if (name == 'banker_3') {
                    x0 = 0;
                    y0 = 165;
                }
                else if (name == 'player_3') {
                    x0 = 240;
                    y0 = 0;
                }
            }
            CTween.get(card)
                .to({ scaleX: 0, scaleY: 1.1, x: x0 - distancex, y: y0 - distancey }, 300)
                .call(() => { card.source = `mpoker_pic_${num}_png` })
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
                }, this)
        }

        /** 游戏结果 */
        public gameResults(score: any)
        {
            if (!score) return;

            let player = score.player;
            let banker = score.banker;
            let results: Array<string> = [];
            if (player > banker) {
                results.push('player');
            }
            else if (player < banker) {
                results.push('banker');
            }
            if (score.player_pair) results.push('player_pair');
            if (score.tie) results.push('tie');
            if (score.banker_pair) results.push('banker_pair');

            this.toggleBetImg(false);
            if (results.indexOf('player') != -1) {
                this.bankerCardNum.font = 'game_share_gray_260_fnt'
                this['bankerRedBg'].source = 'opencard_pic_gray_png';
                this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
                this.playCardNum.font = 'game_share_blue_260_fnt'
                this['playerBlueBg'].source = 'opencard_pic_blue_png';
                this['playPayImg'].source = 'baccarat_pic_pl1_png';
                this[`playerImg`].source = this[`playerImg`].source.replace(/_y.png|_w.png/, '_b.png');
                this[`playerNumImg`].source = this[`playerNumImg`].source.replace(/pb1.png|pb3.png/, 'p2.png');
                this['playerBetBg'].visible = true;

                for (let i = 0; i < 3; i++) {
                    if (this[`banker_${i + 1}`].visible) {
                        this[`banker_${i + 1}`].alpha = 0.3;
                    }
                }
            }
            if (results.indexOf('tie') != -1) {
                this['tieBetBg'].visible = true;
                this.bankerCardNum.font = 'game_share_gray_260_fnt'
                this['bankerRedBg'].source = 'opencard_pic_gray_png';
                this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
                this.playCardNum.font = 'game_share_gray_260_fnt'
                this['playerBlueBg'].source = 'opencard_pic_gray_png';
                this['playPayImg'].source = 'baccarat_pic_pl2_png';
                this[`tieImg`].source = this[`tieImg`].source.replace(/_y.png|_w.png/, '_g.png');
                this[`tieNumImg`].source = this[`tieNumImg`].source.replace(/1.png|3.png/, '2.png');
                this['tiePayout'].visible = true;
                this["tieDealCardTxt"].visible = false;
                this["tieDealCardTxt"].alpha = 1;

                this["tieDealCardTxt"].visible = true;

                for (let i = 0; i < 3; i++) {
                    if (this[`player_${i + 1}`].visible) {
                        this[`player_${i + 1}`].alpha = 0.3;
                    }
                }

                for (let i = 0; i < 3; i++) {
                    if (this[`banker_${i + 1}`].visible) {
                        this[`banker_${i + 1}`].alpha = 0.3;
                    }
                }

                CTween.get(this["tieDealCard"], { loop: true }).to({ rotation: -360 }, 2000)
            }
            else {
                this['tieBetBg'].visible = false;
                this['tiePayout'].visible = false;
            }
            if (results.indexOf('banker') != -1) {
                this.playCardNum.font = 'game_share_gray_260_fnt'
                this['playerBlueBg'].source = 'opencard_pic_gray_png';
                this['playPayImg'].source = 'baccarat_pic_pl2_png';
                this.bankerCardNum.font = 'game_share_red_260_fnt'
                this['bankerRedBg'].source = 'opencard_pic_red_png';
                this['bankerPayImg'].source = 'baccarat_pic_bk1_png';
                this[`bankerImg`].source = this[`bankerImg`].source.replace(/_y.png|_w.png/, '_r.png');
                this[`bankerNumImg`].source = this[`bankerNumImg`].source.replace(/pb1.png|pb3.png/, 'b2.png');
                this[`bankerOdds2`].source = 'bettingarea_pic_ratiob2_2_png';
                this['bankerBetBg'].visible = true;

                for (let i = 0; i < 3; i++) {
                    if (this[`player_${i + 1}`].visible) {
                        this[`player_${i + 1}`].alpha = 0.3;
                    }
                }
            }
            if (results.indexOf('player_pair') != -1) {
                this[`player_pairImg`].source = this[`player_pairImg`].source.replace(/_y.png|_w.png/, '_b.png');
                this[`player_pairNumImg`].source = this[`player_pairNumImg`].source.replace(/oppbp1.png|oppbp3.png/, 'opp2.png');
                this['player_pairBetBg'].visible = true;
            }
            if (results.indexOf('banker_pair') != -1) {
                this[`banker_pairImg`].source = this[`banker_pairImg`].source.replace(/_y.png|_w.png/, '_r.png');
                this[`banker_pairNumImg`].source = this[`banker_pairNumImg`].source.replace(/oppbp1.png|oppbp3.png/, 'obp2.png');
                this['banker_pairBetBg'].visible = true;
            }

            this.playCardNum.text = player + '';
            this.bankerCardNum.text = banker + '';
        }

        /** 切换发牌区的图片显示 */
        public toggleDeaCardImg()
        {
            //默认样式
            this.playCardNum.font = 'game_share_blue_260_fnt'
            this['playerBlueBg'].source = 'opencard_pic_blue_png';
            this['playPayImg'].source = 'baccarat_pic_pl1_png';
            this.bankerCardNum.font = 'game_share_red_260_fnt'
            this['bankerRedBg'].source = 'opencard_pic_red_png';
            this['bankerPayImg'].source = 'baccarat_pic_bk1_png';
            this['tieBetBg'].visible = false;
            this.lightningE.visible = true;
            this['tiePayout'].visible = false;
        }

        /** 切换下注区的图片显示 */
        public toggleBetImg(b: boolean)
        {
            //默认样式
            if (b) {
                this[`playerImg`].source = 'baccarat_pic_player_y_png';
                this[`playerNumImg`].source = 'bettingarea_pic_ratiopb1_png';

                this[`bankerImg`].source = 'baccarat_pic_banker_y_png';
                this[`bankerNumImg`].source = 'bettingarea_pic_ratiopb1_png';
                this[`bankerOdds2`].source = 'bettingarea_pic_ratiob2_1_png';

                this[`tieImg`].source = 'baccarat_pic_tie_y_png';
                this[`tieNumImg`].source = 'bettingarea_pic_ratiot1_png'

                this[`player_pairImg`].source = 'baccarat_pic_playerpair_y_png';
                this[`player_pairNumImg`].source = 'bettingarea_pic_ratioppbp1_png';

                this[`banker_pairImg`].source = 'baccarat_pic_bankerpair_y_png';
                this[`banker_pairNumImg`].source = 'bettingarea_pic_ratioppbp1_png';

            }
            //派彩未中
            else {
                this[`playerImg`].source = 'baccarat_pic_player_w_png';
                this[`playerNumImg`].source = 'bettingarea_pic_ratiopb3_png';

                this[`bankerImg`].source = 'baccarat_pic_banker_w_png';
                this[`bankerNumImg`].source = 'bettingarea_pic_ratiopb3_png';
                this[`bankerOdds2`].source = 'bettingarea_pic_ratiob2_3_png';

                this[`tieImg`].source = 'baccarat_pic_tie_w_png';
                this[`tieNumImg`].source = 'bettingarea_pic_ratiot3_png'

                this[`player_pairImg`].source = 'baccarat_pic_playerpair_w_png';
                this[`player_pairNumImg`].source = 'bettingarea_pic_ratioppbp3_png';

                this[`banker_pairImg`].source = 'baccarat_pic_bankerpair_w_png';
                this[`banker_pairNumImg`].source = 'bettingarea_pic_ratioppbp3_png';
            }
        }

        /** 显示我的派彩结果 */
        public showMyPayOut(num: number)
        {
            if (num > 0) {
                this["payOutNum"].text = NumberUtil.getSplitNumStr(num);
                this["payOutGroup"].visible = true;
                this.showPayOutMove();
            }
            else {
                this["payOutGroup"].visible = false;
                this["payOutNum"].text = '0';
            }
        }


        /** 显示派彩动画 */
        public showPayOutMove()
        {
            let y0 = 144;
            let y3 = 152;

            for (let i = 0; i < 7; i++) {
                if (i < 3) {
                    (<eui.Image>this[`payOutImg${i}`]).y = y0 - i * 18.5;
                }
                else {
                    (<eui.Image>this[`payOutImg${i}`]).y = y3 - (i - 3) * 18.5;
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

        /** 显示其他人的派彩结果 */
        public showOtherPayOut(otherData: Array<any>)
        {
            if (otherData.length > 0) {
                CTween.removeTweens(this['otherPayout']);
                for (let i = 0; i < otherData.length; i++) {
                    if (otherData[i].data > 0) {
                        this[`other${i}Num`].text = NumberUtil.getSplitNumStr(otherData[i].data) + '';
                    }
                    else {
                        this[`other${i}Num`].text = '——';
                    }
                }
                this['otherPayout'].y = -this['otherPayout'].height;
                this['otherPayout'].visible = true;
                CTween.get(this['otherPayout']).to({ y: 0 }, 1500);
            }
            else {
                this['otherPayout'].visible = false;
                for (let i = 0; i < 6; i++) {
                    this[`other${i}Num`].text = '——';
                }
            }
        }

        /** 显示底部的房间信息 */
        public showRoomInfoMsg(msg: { name, rounds, roundID, limitMax, limitMin })
        {
            if (msg) {
                // this.bottomRoomName.text = `房间：${msg.name}`;
                // this.bottomRounds.text = `局数：${msg.rounds}`;
                // this.bottomRoundID.text = `局号：${msg.roundID}`;
                // this.bottomLimit.text = `限额：${NumberUtil.getSplitNumStr(msg.limitMin)} - ${NumberUtil.getSplitNumStr(msg.limitMax)}`;
                let roomN = `房间：${msg.name}`,
                    roundNum = `局数：${msg.rounds}`,
                    roundID = `局号：${msg.roundID}`,
                    roomL = `限额：${NumberUtil.getSplitNumStr(msg.limitMin, 3)} - ${NumberUtil.getSplitNumStr(msg.limitMax, 3)}`;
                this.bottomAlabel.text = roomN + " | " + roundNum + " | " + roundID + " | " + roomL;
            }
        }

        /** 保存chat组件 */
        public chat: chat;
        /** 放置组件的group */
        public chatGroup: eui.Group;
        /** 显示聊天框 */
        public showchat()
        {
            if (!this.chat) {
                this.chat = new chat();
                this.chatGroup.addChild(this.chat);
                this.chat.top = 0;
                this.chat.bottom = 0;
                this.chat.left = 0;
                this.chat.right = 0;
                this.chatGroup.visible = true;
                this.chat.setCallBack(this, this.closeChat);
                this.chat.setData(this.lastChatData);
            }
            else {
                this.chatGroup.visible = true;
            }
        }

        protected update_head(arr: Array<PlayerBaseInfo>): void
        {
            if (this.chat) {
                this.chat.updateHead(arr);
            }
        }

        /** 聊天框关闭按钮的回调 */
        public closeChat()
        {
            this.chatGroup.visible = false;
        }

        public topChatList: eui.List;
        public tipChatData: eui.ArrayCollection;
        /** 显示上部聊天框 */
        public showTopChat()
        {
            this.tipChatData = new eui.ArrayCollection([]);
            this.topChatList.itemRenderer = topChatItem;
            this.topChatList.useVirtualLayout = false;
            this.topChatList.dataProvider = this.tipChatData;
            this.tipChatData.refresh();
        }

        /** 设置上部两条聊天的数据 */
        public setTopChatData(data: Array<any>)
        {
            this.tipChatData = null;
            this.tipChatData = new eui.ArrayCollection(data);
            this.topChatList.dataProvider = this.tipChatData;
            this.tipChatData.refresh();
        }

        private lastChatData: Array<any>;
        /** 设置聊天数据 */
        public setChatData(data: Array<any>)
        {
            if (!data || !data.length) return;
            this.lastChatData = data;
            if (this.chat) {
                this.chat.setData(data);
            }

            let TopData = data.slice(-2);
            this.setTopChatData(TopData)
        }

        /*-------------------------------------- 路数相关 ------------------------------- */
        /** 初始化路书 */
        public initRoadMap(): void
        {
            if (this.is18) {
                this.bead_roadMap = new game.RoadMap(this.bead_road18.width, this.bead_road18.height, RoadMap.BeadRoad, BaccaratUI1.unit);
                this.bead_road18.addChild(this.bead_roadMap);
                this.big_roadMap = new game.RoadMap(this.big_road18.width, this.big_road18.height, RoadMap.BigRoad, BaccaratUI1.unit / 2);
                this.big_road18.addChild(this.big_roadMap);
                this.big_eye_roadMap = new game.RoadMap(this.big_eye_road18.width, this.big_eye_road18.height, RoadMap.BigEyeRoad, BaccaratUI1.unit / 2);
                this.big_eye_road18.addChild(this.big_eye_roadMap);
                this.small_roadMap = new game.RoadMap(this.small_road18.width, this.small_road18.height, RoadMap.SmallRoad, BaccaratUI1.unit / 2);
                this.small_road18.addChild(this.small_roadMap);
                this.cockroach_roadMap = new game.RoadMap(this.cockroach_road18.width, this.cockroach_road18.height, RoadMap.CockRoachRoad, BaccaratUI1.unit / 2);
                this.cockroach_road18.addChild(this.cockroach_roadMap);
            } else {
                const unit = BaccaratUI1.unit;
                this.bead_roadMap = new game.RoadMap(this.bead_road43.width, this.bead_road43.height, RoadMap.BeadRoad, BaccaratUI1.unit);
                this.bead_road43.addChild(this.bead_roadMap);
                this.big_roadMap = new game.RoadMap(this.big_road43.width, this.big_road43.height, RoadMap.BigRoad, BaccaratUI1.unit / 2);
                this.big_road43.addChild(this.big_roadMap);
                this.big_eye_roadMap = new game.RoadMap(this.big_eye_road43.width, this.big_eye_road43.height, RoadMap.BigEyeRoad, BaccaratUI1.unit / 2);
                this.big_eye_road43.addChild(this.big_eye_roadMap);
                this.small_roadMap = new game.RoadMap(this.small_road43.width, this.small_road43.height, RoadMap.SmallRoad, BaccaratUI1.unit / 2);
                this.small_road43.addChild(this.small_roadMap);
                this.cockroach_roadMap = new game.RoadMap(this.cockroach_road43.width, this.cockroach_road43.height, RoadMap.CockRoachRoad, BaccaratUI1.unit / 2);
                this.cockroach_road43.addChild(this.cockroach_roadMap);
            }
            this.setXY();
            this.drawShp();
            this.setContenWH();
            this.shuffleRoad();
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
            // 250是距离左边间距，因为是直接添加到舞台，所以xy是item左上角
            this.shp.graphics.lineStyle(1, 0xAAAAAA);
            // 珠盘路右边
            this.shp.graphics.moveTo(this.bead_roadMap.rectW, this.bead_roadMap.y);
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
            if (this.is18) {
                this.roadMap18.addChild(this.shp);
            } else {
                this.roadMap43.addChild(this.shp);
            }
        }


        /** 计算路数宽度 */
        private roadMapWidth(): void
        {
            if (this.is18) {
                this.roadMap18.width = StageUtil.width;
                this.bead_road18.width = Math.floor(this.roadMap18.width / BaccaratUI1.unit / 3) * BaccaratUI1.unit;
                this.big_road18.width = this.bead_road18.width * 2;
                this.big_eye_road18.width = this.big_road18.width;
                this.small_road18.width = this.big_road18.width / 2;
                this.cockroach_road18.width = this.big_road18.width / 2;
                if (Math.floor((this.roadMap18.width - this.bead_road18.width - this.big_road18.width) / BaccaratUI1.unit % 3) == 1) {
                    this.bead_road18.width += BaccaratUI1.unit;
                }
                else if (Math.floor((this.roadMap18.width - this.bead_road18.width - this.big_road18.width) / BaccaratUI1.unit % 3) == 2) {
                    this.bead_road18.width += BaccaratUI1.unit;
                    this.big_road18.width += BaccaratUI1.unit;
                    this.big_eye_road18.width += BaccaratUI1.unit;
                    this.small_road18.width += (BaccaratUI1.unit / 2);
                    this.cockroach_road18.width += (BaccaratUI1.unit / 2);
                }
            } else {
                this.roadMap43.width = StageUtil.width - 130;
                this.bead_road43.width = Math.floor(this.roadMap43.width / BaccaratUI1.unit / 3) * BaccaratUI1.unit;
                this.big_road43.width = this.bead_road43.width * 2;
                this.big_eye_road43.width = this.big_road43.width;
                this.small_road43.width = this.big_road43.width / 2;
                this.cockroach_road43.width = this.big_road43.width / 2;
                if (Math.floor((this.roadMap43.width - this.bead_road43.width - this.big_road43.width) / BaccaratUI1.unit % 3) == 1) {
                    this.bead_road43.width += BaccaratUI1.unit;
                }
                else if (Math.floor((this.roadMap43.width - this.bead_road43.width - this.big_road43.width) / BaccaratUI1.unit % 3) == 2) {
                    this.bead_road43.width += BaccaratUI1.unit;
                    this.big_road43.width += BaccaratUI1.unit;
                    this.big_eye_road43.width += BaccaratUI1.unit;
                    this.small_road43.width += (BaccaratUI1.unit / 2);
                    this.cockroach_road43.width += (BaccaratUI1.unit / 2);
                }
            }
        }

        /** 设置宽高 */
        public setContenWH(): void
        {
            if (this.is18) {
                if (this.roadMap18) {
                    this.roadMap18.width = StageUtil.width;
                }
                this.roadMapWidth();
                this.bead_roadMap.setWidth(this.bead_road18.width);
                this.big_roadMap.setWidth(this.big_road18.width, 55 / 2);
                this.big_eye_roadMap.setWidth(this.big_eye_road18.width, 55 / 2);
                this.small_roadMap.setWidth(this.small_road18.width, 55 / 2);
                this.cockroach_roadMap.setWidth(this.small_road18.width, 55 / 2);
                this.setXY();
                this.drawShp();
            } else {
                if (this.roadMap43) {
                    this.roadMap43.width = StageUtil.width - 310;
                }
                this.roadMapWidth();
                this.bead_roadMap.setWidth(this.bead_road43.width);
                this.big_roadMap.setWidth(this.big_road43.width, 55 / 2);
                this.big_eye_roadMap.setWidth(this.big_eye_road43.width, 55 / 2);
                this.small_roadMap.setWidth(this.small_road43.width, 55 / 2);
                this.cockroach_roadMap.setWidth(this.small_road43.width, 55 / 2);
                this.setXY();
                this.drawShp();
            }
        }

        /** 设置坐标 */
        public setXY(): void
        {
            if (this.is18) {
                if (this.big_road18 && this.bead_roadMap) {
                    this.big_road18.x = this.bead_road18.x + this.bead_roadMap.rectW;
                }
                if (this.big_road18 && this.big_eye_road18) {
                    this.big_eye_road18.x = this.big_road18.x;
                    this.big_eye_road18.y = this.big_road18.y + this.big_roadMap.rectH;
                }
                if (this.big_road18 && this.small_road18) {
                    this.small_road18.x = this.big_road18.x;
                    this.small_road18.y = this.big_eye_road18.y + this.big_eye_roadMap.rectH;
                }
                if (this.big_road18 && this.small_road18) {
                    this.cockroach_road18.x = this.small_road18.x + this.small_roadMap.rectW;
                    this.cockroach_road18.y = this.small_road18.y;
                }
            } else {
                if (this.big_road43 && this.bead_roadMap) {
                    this.big_road43.x = this.bead_road43.x + this.bead_roadMap.rectW;
                }
                if (this.big_road43 && this.big_eye_road43) {
                    this.big_eye_road43.x = this.big_road43.x;
                    this.big_eye_road43.y = this.big_road43.y + this.big_roadMap.rectH;
                }
                if (this.big_road43 && this.small_road43) {
                    this.small_road43.x = this.big_road43.x;
                    this.small_road43.y = this.big_eye_road43.y + this.big_eye_roadMap.rectH;
                }
                if (this.big_road43 && this.small_road43) {
                    this.cockroach_road43.x = this.small_road43.x + this.small_roadMap.rectW;
                    this.cockroach_road43.y = this.small_road43.y;
                }
            }
        }

        /** 设置路数数据 */
        public setRoadMapData(roadData: any)
        {
            if (!roadData) return;
            this.RoadMapData = roadData;
            this.bead_roadMap.setData(roadData);
            this.big_roadMap.setData(roadData);
            this.big_eye_roadMap.setData(roadData);
            this.small_roadMap.setData(roadData);
            this.cockroach_roadMap.setData(roadData);
            this.threeImg(roadData);
        }

        /** 切换问路按钮样式 */
        public togglewayBtnSty(b: boolean)
        {
            if (this.is18) {
                if (b) {
                    if (this.playerWayBtn18.setState != 'up') {
                        this.playerWayBtn18.setState = 'up';
                    }
                    if (!this.playerWayBtn18.enabled) {
                        this.playerWayBtn18.enabled = true;
                    }

                    if (this.bankerWayBtn18.setState != 'up') {
                        this.bankerWayBtn18.setState = 'up';
                    }
                    if (!this.bankerWayBtn18.enabled) {
                        this.bankerWayBtn18.enabled = true;
                    }
                }
                else {
                    if (this.playerWayBtn18.setState != 'disabled') {
                        this.playerWayBtn18.setState = 'disabled';
                    }
                    if (this.playerWayBtn18.enabled) {
                        this.playerWayBtn18.enabled = false;
                    }

                    if (this.bankerWayBtn18.setState != 'disabled') {
                        this.bankerWayBtn18.setState = 'disabled';
                    }
                    if (this.bankerWayBtn18.enabled) {
                        this.bankerWayBtn18.enabled = false;
                    }
                }
            }
            else {
                if (b) {
                    if (this['playerWayBtn'].setState != 'up') {
                        this['playerWayBtn'].setState = 'up';
                    }
                    if (!this['playerWayBtn'].enabled) {
                        this['playerWayBtn'].enabled = true;
                    }

                    if (this['bankerWayBtn'].setState != 'up') {
                        this['bankerWayBtn'].setState = 'up';
                    }
                    if (!this['bankerWayBtn'].enabled) {
                        this['bankerWayBtn'].enabled = true;
                    }
                }
                else {
                    if (this['playerWayBtn'].setState != 'disabled') {
                        this['playerWayBtn'].setState = 'disabled';
                    }
                    if (this['playerWayBtn'].enabled) {
                        this['playerWayBtn'].enabled = false;
                    }

                    if (this['bankerWayBtn'].setState != 'disabled') {
                        this['bankerWayBtn'].setState = 'disabled';
                    }
                    if (this['bankerWayBtn'].enabled) {
                        this['bankerWayBtn'].enabled = false;
                    }
                }
            }
            this.askStage(b);
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
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_big_eye_road`) as eui.Image).source = "share_pic_bigeye.B_png";
                            (this[`${tp}WayBtn18`].getChildByName(`${tp}_big_eye_road`) as eui.Image).source = "share_pic_bigeye.B_png";
                            break;
                        case "red":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_big_eye_road`) as eui.Image).source = "share_pic_bigeye.R_png";
                            (this[`${tp}WayBtn18`].getChildByName(`${tp}_big_eye_road`) as eui.Image).source = "share_pic_bigeye.R_png";
                            break;
                    }
                    if (!ask.small_road) return;
                    //小路
                    let col2 = ask.small_road.icon[0];
                    switch (col2) {
                        case "blue":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_SmallRoad`) as eui.Image).source = "share_pic_small.B_png";
                            (this[`${tp}WayBtn18`].getChildByName(`${tp}_SmallRoad`) as eui.Image).source = "share_pic_small.B_png";
                            break;
                        case "red":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_SmallRoad`) as eui.Image).source = "share_pic_small.R_png";
                            (this[`${tp}WayBtn18`].getChildByName(`${tp}_SmallRoad`) as eui.Image).source = "share_pic_small.R_png";
                            break;
                    }
                    if (!ask.cockroach_road) return;
                    //凹凸路
                    let col3 = ask.cockroach_road.icon[0];
                    switch (col3) {
                        case "blue":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.B_png";
                            (this[`${tp}WayBtn18`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.B_png";
                            break;
                        case "red":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.R_png";
                            (this[`${tp}WayBtn18`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.R_png";
                            break;
                        case "green":
                            (this[`${tp}WayBtn`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.T_png";
                            (this[`${tp}WayBtn18`].getChildByName(`${tp}_CockRoachRoad`) as eui.Image).source = "share_pic_cockroach.T_png";
                            break;
                    }
                }
            } else {
                this.askStage(false);
            }
        }
        // this.bead_roadMap.playerAskWay()

        /** 闲问路 */
        public playerAskWay()
        {
            if (this.bead_roadMap) {
                this.bead_roadMap.playerAskWay()
            }
            if (this.big_roadMap) {
                this.big_roadMap.playerAskWay()
            }
            if (this.big_eye_roadMap) {
                this.big_eye_roadMap.playerAskWay()
            }
            if (this.small_roadMap) {
                this.small_roadMap.playerAskWay()
            }
            if (this.cockroach_roadMap) {
                this.cockroach_roadMap.playerAskWay()
            }
        }

        /** 庄问路 */
        public bankerAskWay()
        {
            if (this.bead_roadMap) {
                this.bead_roadMap.bankerAskWay()
            }
            if (this.big_roadMap) {
                this.big_roadMap.bankerAskWay()
            }
            if (this.big_eye_roadMap) {
                this.big_eye_roadMap.bankerAskWay()
            }
            if (this.small_roadMap) {
                this.small_roadMap.bankerAskWay()
            }
            if (this.cockroach_roadMap) {
                this.cockroach_roadMap.bankerAskWay()
            }
        }

        public shuffleRoadLabel = new eui.Label();
        /** 添加洗牌样式 */
        public shuffleRoad()
        {
            if (this.shuffleRoadLabel) {
                this.shuffleRoadLabel.size = 90;
                this.shuffleRoadLabel.alpha = 0.5;
                this.shuffleRoadLabel.textAlign = 'center';
                this.shuffleRoadLabel.verticalCenter = 'middle';
                this.shuffleRoadLabel.touchEnabled = false;
                this.shuffleRoadLabel.verticalCenter = "0";
                this.shuffleRoadLabel.horizontalCenter = "0";
                if (this.is18) {
                    this.roadMap18.addChild(this.shuffleRoadLabel);
                } else {
                    this.roadMap43.addChild(this.shuffleRoadLabel);
                }
            }
        }

        /* 当尺寸发生变化时 */
        public onStageResize(evt: egret.Event): void
        {
            super.onStageResize(evt);
            this.setContenWH();
        }

        /**-----------------------------------    音效类   ----------------------------- */


        /**-----------------------------------    内存清理   ----------------------------- */
        public dispose()
        {
            ClubController.getInstance().sendNotification(NotifyConst.Notify_SwitchNavbar, true);
            this._mediator = null;
            CTween.removeAllTweens();
            if (this.blueClicle) {
                this.blueClicle.graphics.clear();
                this.bluePercentGroup.removeChild(this.blueClicle);
            }
            if (this.redClicle) {
                this.redClicle.graphics.clear();
                this.redPercentGroup.removeChild(this.redClicle);
            }
            if (this.greenClicle) {
                this.greenClicle.graphics.clear();
                this.greenPercentGroup.removeChild(this.greenClicle);
            }
            this.shuffleRoadLabel = null;
            if (this.bead_roadMap) {
                this.bead_roadMap.dispose();
                this.bead_roadMap = null;
                this.bead_road43.removeChildren();
                this.bead_road43 = null;
                this.bead_road18.removeChildren();
                this.bead_road18 = null;
            }
            if (this.big_roadMap) {
                this.big_roadMap.dispose();
                this.big_roadMap = null;
                this.big_road43.removeChildren();
                this.big_road43 = null;
                this.big_road18.removeChildren();
                this.big_road18 = null;
            }
            if (this.big_eye_roadMap) {
                this.big_eye_roadMap.dispose();
                this.big_eye_roadMap = null;
                this.big_eye_road43.removeChildren();
                this.big_eye_road43 = null;
                this.big_eye_road18.removeChildren();
                this.big_eye_road18 = null;
            }
            if (this.small_roadMap) {
                this.small_roadMap.dispose();
                this.small_roadMap = null;
                this.small_road43.removeChildren();
                this.small_road43 = null;
                this.small_road18.removeChildren();
                this.small_road18 = null;
            }
            if (this.cockroach_roadMap) {
                this.cockroach_roadMap.dispose();
                this.cockroach_roadMap = null;
                this.cockroach_road43.removeChildren();
                this.cockroach_road43 = null;
                this.cockroach_road18.removeChildren();
                this.cockroach_road18 = null;
            }
            this.maxRoadGroup.removeChildren();
            this.maxRoadMap = null;

            if (this.chat) {
                this.chat.dispose();
                this.chat = null;
                this.chatGroup.removeChildren();
                this.chatGroup = null;
            }
            CTweenManagerController.getInstance().endAllCTween();
            this.countdown.dispose();
            super.dispose();
        }
    }
}