module game
{
	export class PCPbBacUI1 extends PbBacBaseUI
	{
		/**房间名*/
        protected labelRoomName: eui.ALabel;
        /**游戏局号*/
        protected labelRoundNo: eui.ALabel;
        /**等待派彩*/
        protected labelWaitPayout: eui.ALabel;

		/**进度条上的圆*/
        protected imgRound: eui.Image;
        /**绿色图片*/
        protected imgGreen: eui.Image;
        /**灰色图片*/
        protected grayBar: eui.Image;
        /** 派彩group*/
        private tipGroup:eui.Group;
        /**派彩图片*/
        protected imgPayOut: eui.Image;
        /**派彩字样*/
        protected alabelPayOut: eui.ALabel;
        /**进展时间*/
        protected progressTime: eui.ALabel;
        /**总时间*/
        protected totalTime: eui.ALabel;

        /** 显示牌局详情的group*/
		protected groupResult:eui.Group;
        /**结果list*/
        protected listDetail: eui.List;
        /**结果list数组*/
        protected listArray: eui.ArrayCollection;

        /**派彩Group*/
        protected groupPayOut: eui.Group;
        /**派彩的金额*/
        protected payOutNum: eui.BitmapLabel;
        /**派彩的金额*/
        protected payN:number = 0;

        /**yellow 1:1*/
        protected y1:string;
        /**yellow 1:11*/
        protected y11:string;
        /**player yellow 1:11*/
        protected py11:string;
        /**yellow 1:8*/
        protected y8:string;
        /**blue 1:1*/
        protected b1:string;
        /**red 1:1*/
        protected r1:string;
        /**blue 1:11*/
        protected b11:string;
        /**red 1:11*/
        protected r11:string;
        /**green 1:8*/
        protected g8:string;
        /**灰白(gray) 1:1*/
        protected gr1:string;
        /**灰白(gray) 1:11*/
        protected gr11:string;
        /**player 灰白(gray) 1:11*/
        protected pgr11:string;
        /**灰白(gray) 1:8*/
        protected gr8:string;
        /**蓝闲*/
        protected bPlayer:string;
        /**红庄*/
        protected rBanker:string;
        /**蓝闲对*/
        protected bPlayer_pair:string;
        /**红庄对*/
        protected rBanker_pair:string;
        /**绿和*/
        protected gTie:string;
        /**灰白闲*/
        protected grPlayer:string;
        /**灰白庄*/
        protected grBanker:string;
        /**灰白闲对*/
        protected grPlayer_pair:string;
        /**灰白庄对*/
        protected grBanker_pair:string;
        /**灰白和*/
        protected grTie:string;
        /**黄闲*/
        protected yPlayer:string;
        /**黄庄*/
        protected yBanker:string;
        /**黄闲对*/
        protected yPlayer_pair:string;
        /**黄庄对*/
        protected yBanker_pair:string;
        /**黄和*/
        protected yTie:string;
        /**免佣时庄比例资源*/
        protected hR:string;
        protected hY:string;
        protected hGr:string;
        /** 未确定的筹码img*/
        protected unSureChip:string;
        /** 确定了的筹码img*/
        protected sureChip:string;

        private banker_pairBetZone:eui.Image;
        private player_pairBetZone:eui.Image;
        private tieBetZone:eui.Image;
        private bankerBetZone:eui.Image;
        private playerBetZone:eui.Image;

        private banker_pairImg:eui.Image;
        private banker_pairNumImg:eui.Image;
        private player_pairImg:eui.Image;
        private player_pairNumImg:eui.Image;
        private tieImg:eui.Image;
        private tieNumImg:eui.Image;
        private bankerImg:eui.Image;
        private bankerNumImg:eui.Image;
        private playerImg:eui.Image;
        private playerNumImg:eui.Image;
        /**是否免佣*/
        protected isHire:boolean;
        /**6点赔0.5*/
        protected labelHire:eui.Label;

		public constructor(data)
		{
			super(data);
            // this.skinName = SystemPath.skin_path + "screenPlayback/screenPlaybackBac.exml";
		}

		/**初始化*/
        public initSetting()
        {
            this.initstr();
            super.initSetting();
            this.roomHire();
            this.betDefaultY();
            this.initDetail();
            this.betArea();
            this.betResult();
            this.payOut();
            this.showTotalNum();
        }

        /** 初始化str*/
        private initstr():void
        {
            /**yellow 1:1*/
            this.y1 = "bettingarea_pic_ratiopb1_pc_png";
            /**yellow 1:11*/
            this.y11 = "bettingarea_pic_ratiobp1_pc_png";
            /**player yellow 1:11*/
            this.py11 = "bettingarea_pic_ratiopp1_pc_png";
            /**yellow 1:8*/
            this.y8 = "bettingarea_pic_ratiot1_pc_png";
            /**blue 1:1*/
            this.b1 = "bettingarea_pic_ratiop2_pc_png";
            /**red 1:1*/
            this.r1 = "bettingarea_pic_ratiob2_pc_png";
            /**blue 1:11*/
            this.b11 = "bettingarea_pic_ratiopp2_pc_png";
            /**red 1:11*/
            this.r11 = "bettingarea_pic_ratiobp2_pc_png";
            /**green 1:8*/
            this.g8 = "bettingarea_pic_ratiot2_pc_png";
            /**灰白(gray) 1:1*/
            this.gr1 = "bettingarea_pic_ratiopb3_pc_png";
            /**灰白(gray) 1:11*/
            this.gr11 = "bettingarea_pic_ratiobp3_pc_png";
            /**player 灰白(gray) 1:11*/
            this.pgr11 = "bettingarea_pic_ratiopp3_pc_png";
            /**灰白(gray) 1:8*/
            this.gr8 = "bettingarea_pic_ratiot3_pc_png";
            /**蓝闲*/
            this.bPlayer = "baccarat_pic_player_b_pc_png";
            /**红庄*/
            this.rBanker = "baccarat_pic_banker_r_pc_png";
            /**蓝闲对*/
            this.bPlayer_pair = "record_pic_betcolor1_pc_png";
            /**红庄对*/
            this.rBanker_pair = "record_pic_betcolor5_pc_png";
            /**绿和*/
            this.gTie = "baccarat_pic_tie_g_pc_png";
            /**灰白闲*/
            this.grPlayer = "baccarat_pic_player_w_pc_png";
            /**灰白庄*/
            this.grBanker = "baccarat_pic_banker_w_pc_png";
            /**灰白闲对*/
            this.grPlayer_pair = "baccarat_pic_playerpair_w_pc_png";
            /**灰白庄对*/
            this.grBanker_pair = "baccarat_pic_bankerpair_w_pc_png";
            /**灰白和*/
            this.grTie = "baccarat_pic_tie_w_pc_png";
            /**黄闲*/
            this.yPlayer = "baccarat_pic_player_y_pc_png";
            /**黄庄*/
            this.yBanker = "baccarat_pic_banker_y_pc_png";
            /**黄闲对*/
            this.yPlayer_pair = "baccarat_pic_playerpair_y_pc_png";
            /**黄庄对*/
            this.yBanker_pair = "baccarat_pic_bankerpair_y_pc_png";
            /**黄和*/
            this.yTie = "baccarat_pic_tie_y_pc_png";
            /**免佣时庄比例资源*/
            this.hR = "bettingarea_pic_ratiob2_2_pc_png";
            this.hY = "bettingarea_pic_ratiob2_1_pc_png";
            this.hGr = "bettingarea_pic_ratiob2_3_pc_png";
            /** 未确定的筹码img*/
            this.unSureChip = "bettingarea_pic_mypay2_pc_png";
            /** 确定了的筹码img*/
            this.sureChip = "bettingarea_pic_mypay_pc_png";
        }

        /** 注册事件监听器 */
        protected initListener(mediator: PbBacMediator): void
        {
            super.initListener(mediator);
            this.registerEvent(this.tipGroup, egret.TouchEvent.TOUCH_TAP, this.tapPayoutBtn, this);
        }

		/**初始化详情*/
        protected initDetail(): void
        {
            let history:topic.GameHistory = this.data.history;
            this.labelRoomName.text = "房间名：" + history.room_name;
            this.labelRoundNo.text = "牌局号：" + history.round_id;
            this.setListDetail(history.bets);
            this.setResult();
            this.initProgress("00:00");
            this.showVideo(this.data.video);
            this._payouTime = Math.floor((history.payout_time - history.start_bet_time)/1000);
        }

		/** 展示开彩牌详情 */
        protected setResult(): void
        {
            let result = new BetRecordResult(this.data);
            this.groupResult.removeChildren();
            result.horizontalCenter = 0;
            result.verticalCenter = 0;
            this.groupResult.addChild(result);
        }

		/** 展示投注详情 */
        private setListDetail(data: Array<{ bet_map: {}; bet_time: number }>): void
		{
            this.listDetail.useVirtualLayout = false;
            this.listArray = new eui.ArrayCollection();
            this.listDetail.itemRenderer = BacDetailItem;
            this.listDetail.dataProvider = this.listArray;
            // 处理下注列表
            let listData = [];
            let temp = {};
            for (let i = data.length - 1; i >= 0; i--)
            {
                let bet_map = data[i].bet_map;
                for (let key in bet_map)
                {
                    if (!temp[key])
                    {
                        temp[key] = {
                            type: this.data.type,
                            key: key,
                            bet: 0,
                            payout: 0
                        };
                    }
                    temp[key]["bet"] += bet_map[key];
                }
            }
            let waitForResult: boolean = !(this.data.history.round_result && this.data.history.round_result.length);
            if (this.data.history.payouts)
            {
                for (let key in this.data.history.payouts)
                {
                    temp[key]["payout"] = this.data.history.payouts[key];
                }
            }
            for (let key in temp)
            {
                if (temp[key]["bet"] || temp[key]["payout"])
                {
                    listData.push(temp[key]);
                    if (waitForResult)
                    {
                        temp[key]["payout"] = "-1";
                    }
                }
            }
            if (listData.length == 1)
            {
                listData[0]["single"] = true;
            }
            if (listData.length == 2)
            {
                listData[0]["double"] = true;
            }
            listData.sort((a,b)=>{
                let typeA = a.key;
                let typeB = b.key;
                let result = 0;
                switch (a.type){
                    case "baccarat":
                        result = BaccaratModel.sortByType(typeA,typeB);
                        break;
                }
                return result;
            })
            this.listArray.source = listData;
            this.listArray.refresh();
            this.listDetail.validateNow();
            // 设置等待开彩文本
            this.labelWaitPayout.visible = waitForResult;
		}


        /**是否免佣*/
        protected roomHire():void{
            let history = this.data.history;
            this.isHire = history.is_no_commission;
            if(this.isHire){
                this.labelHire.visible = true;
            }else{
                this.labelHire.visible = false;
            }
        }

        /**下注区默认样式*/
        protected betDefaultY():void
        {
            this.playerNumImg.source = this.y1;
            this.playerImg.source = this.yPlayer;
            if(this.isHire){
                this.bankerNumImg.source = this.y1;
            }else{
                this.bankerNumImg.source = this.hY;
            }
            this.bankerImg.source = this.yBanker;
            this.player_pairNumImg.source = this.py11;
            this.player_pairImg.source = this.yPlayer_pair;
            this.banker_pairNumImg.source = this.y11;
            this.banker_pairImg.source = this.yBanker_pair;
            this.tieNumImg.source = this.y8;
            this.tieImg.source = this.yTie;
            this.banker_pairBetZone.alpha = 0.01;
            this.player_pairBetZone.alpha = 0.01;
            this.tieBetZone.alpha = 0.01;
            this.bankerBetZone.alpha = 0.01;
            this.playerBetZone.alpha = 0.01;
        }

        /**下注区灰白状态*/
        protected betDefault(): void
        {
            this.playerNumImg.source = this.gr1;
            this.playerImg.source = this.grPlayer;
            if(this.isHire){
                this.bankerNumImg.source = this.gr1;
            }else{
                this.bankerNumImg.source = this.hGr;
            }
            this.bankerImg.source = this.grBanker;
            this.player_pairNumImg.source = this.pgr11;
            this.player_pairImg.source = this.grPlayer_pair;
            this.banker_pairNumImg.source = this.gr11;
            this.banker_pairImg.source = this.grBanker_pair;
            this.tieNumImg.source = this.gr8;
            this.tieImg.source = this.grTie;
            this.banker_pairBetZone.alpha = 0.01;
            this.player_pairBetZone.alpha = 0.01;
            this.tieBetZone.alpha = 0.01;
            this.bankerBetZone.alpha = 0.01;
            this.playerBetZone.alpha = 0.01;
        }
      
        /**下注区投注时*/
        protected betArea()
        {
            let betA = this.data.history.bets[0].bet_map;
            for (let key in betA)
            {
                this[`${key}BetMine0`].visible = false;
                this[`${key}BetMine0`].source = this.unSureChip;
                if (betA[key])
                {
                    switch(key){
                        case "player":
                            this.playerNumImg.source = this.b1;
                            this.playerImg.source = this.bPlayer;
                            break;
                        case "banker":
                            if(this.isHire){
                                this.bankerNumImg.source = this.r1;
                            }else{
                                this.bankerNumImg.source = this.hR;
                            }
                            this.bankerImg.source = this.rBanker;
                            break;
                        case "player_pair":
                            this.player_pairNumImg.source = this.b11;
                            this.player_pairImg.source = this.bPlayer_pair;
                            break;
                        case "banker_pair":
                            this.banker_pairNumImg.source = this.r11;
                            this.banker_pairImg.source = this.rBanker_pair;
                            break;
                        case "tie":
                            this.tieNumImg.source = this.g8;
                            this.tieImg.source = this.gTie;
                            break;
                    }
                    this[`${key}BetMine0`].visible = true;
                    this[`${key}BetMineNum0`].visible = true;
                    this[`${key}BetMineNum1`].visible = false;
                    // this[`${key}BetMine0`].source = this.sureChip;
                    this[`${key}BetMineNum0`].text = NumberUtil.getSplitNumStr(betA[key]);
                    this[`${key}BetMineNum1`].text = NumberUtil.getSplitNumStr(betA[key], 3);
                }
            }
        }
        
        /**结果时*/
        protected betResult(): void
        {
            let payO = this.data.history.payouts;
            this.betDefault();
            for (let key in payO)
            {
                this[`${key}BetMine0`].source = this.sureChip;
                if (payO[key])
                {
                    this.payN += payO[key];
                    this[`${key}BetMineNum0`].visible = false;
                    this[`${key}BetMineNum1`].visible = true;
                    this[`${key}BetZone`].alpha = 1;
                }
            }
        }

        /**派彩时*/
        protected payOut():void{
            if (this.payN)
            {
                this.payOutNum.text = NumberUtil.getSplitNumStr(this.payN);
                this.groupPayOut.visible = true;
            }
            let payO = this.data.history.payouts;
            for (let key in payO)
            {
                if (payO[key])
                {
                    this.payN += payO[key];
                    this[`${key}BetMine0`].source = this.unSureChip;
                    this[`${key}BetMine0`].visible = true;
                    this[`${key}BetMineNum0`].visible = false;
                    this[`${key}BetMineNum1`].visible = true;
                    this[`${key}BetZone`].alpha = 1;
                }
            }
        }

        /** 显示派彩统计*/
        private showTotalNum():void
        {
            let payO = this.data.history.payouts;
            let num = 0;
            for (let key in payO)
            {
                num += payO[key];
            }
            this["totalMoney"].text = NumberUtil.getSplitNumStr(num);
        }
		
        /**进度条区初始化*/
        protected initProgress(total:string): void
        {
            this.totalTime.text = total;
            this.imgGreen.width = 0;
            this.imgRound.x = 415;
            if(this._payouTime && this._totalTime)
            {
                let dis = Math.floor((this._payouTime/this._totalTime)*1118);
                this.tipGroup.x = 341 + dis - this.tipGroup.width/2;
            }
        }
        /**进度条进度1118*/
        protected progress(cur:number): void
        {
            let str = cur >= 10?cur.toString():"0" + cur;
            this.progressTime.text = "00:" + str;
            let w = Math.floor(cur/this._totalTime*1118);
            this.imgGreen.width = w;
            this.imgRound.x = 415 + w;
        }
        
        /** 派彩按钮*/
        private tapPayoutBtn():void
        {
            this.imgGreen.width = this.tipGroup.x - this.imgGreen.x + this.tipGroup.width/2;
            this.imgRound.x = this.tipGroup.x + this.tipGroup.width/2 - this.imgRound.width/2;
        }

        public dispose(): void
        {
            super.dispose();
        }
	}
}