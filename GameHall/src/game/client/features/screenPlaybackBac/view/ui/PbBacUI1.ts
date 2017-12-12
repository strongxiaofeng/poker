module game
{

    export class PbBacUI1 extends PbBacBaseUI
    {
        public constructor(data)
        {
            super(data);
            // this.skinName = "resource/skins/game_skins/mobile/screenPlayback/screenPlaybackBac.exml";
        }
        //--------------头部区-------------------
        /**俱乐部名称*/
        protected labelClubName: eui.ALabel;
        //---------------筹码显示区------------------
        /**闲比例图*/
        protected playerNumImg: eui.Image;
        /**庄比例图*/
        protected bankerNumImg: eui.Image;
        /**和比例图*/
        protected tieNumImg: eui.Image;
        /**闲对比例图*/
        protected player_pairNumImg: eui.Image;
        /**庄对比例图*/
        protected banker_pairNumImg: eui.Image;
        /**闲图*/
        protected playerImg: eui.Image;
        /**庄图*/
        protected bankerImg: eui.Image;
        /**和图*/
        protected tieImg: eui.Image;
        /**闲对图*/
        protected player_pairImg: eui.Image;
        /**庄对图*/
        protected banker_pairImg: eui.Image;
        /**闲结果图*/
        protected playerBetBg: eui.Image;
        /**庄结果图*/
        protected bankerBetBg: eui.Image;
        /**和结果图*/
        protected tieBetBg: eui.Image;
        /**闲对结果图*/
        protected player_pairBetBg: eui.Image;
        /**庄对结果图*/
        protected banker_pairBetBg: eui.Image;
        /**闲筹码框Group*/
        protected playerUnSureG: eui.Group;
        /**庄筹码框Group*/
        protected bankerUnSureG: eui.Group;
        /**和筹码框Group*/
        protected tieUnSureG: eui.Group;
        /**闲对筹码框Group*/
        protected player_pairUnSureG: eui.Group;
        /**庄对筹码框Group*/
        protected banker_pairUnSureG: eui.Group;
        /**闲筹码金额*/
        protected playerUnSureNum: eui.BitmapLabel;
        /**庄筹码金额*/
        protected bankerUnSureNum: eui.BitmapLabel;
        /**和筹码金额*/
        protected tieUnSureNum: eui.BitmapLabel;
        /**闲对筹码金额*/
        protected player_pairUnSureNum: eui.BitmapLabel;
        /**庄对筹码金额*/
        protected banker_pairUnSureNum: eui.BitmapLabel;
        //---------------投注项区------------------
        /**房间名*/
        protected labelRoomName: eui.ALabel;
        /**游戏局号*/
        protected labelRoundNo: eui.ALabel;
        /**等待派彩*/
        protected labelWaitPayout: eui.ALabel
        /**显示牌的区域*/
        protected groupResult: eui.Group;
        /**结果list*/
        protected listDetail: eui.List;
        /**结果list数组*/
        protected listArray: eui.ArrayCollection;
        //---------------进度条区------------------
        /**进度条上的圆*/
        protected imgRound: eui.Image;
        /**绿色图片*/
        protected imgGreen: eui.Image;
        /**派彩图片*/
        protected imgPayOut: eui.Image;
        /**派彩字样*/
        protected alabelPayOut: eui.ALabel;
        /**进展时间*/
        protected progressTime: eui.ALabel;
        /**总时间*/
        protected totalTime: eui.ALabel;
        //---------------派彩区------------------
        /**派彩Group*/
        protected groupPayOut: eui.Group;
        /**派彩的金额*/
        protected payOutNum: eui.BitmapLabel;

        /**派彩的金额*/
        protected payN:number = 0;
        //-----------------UI用到的相关资源--------------------------
        /**yellow 1:1*/
        protected y1:string;
        /**yellow 1:11*/
        protected y11:string;
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
        /**派彩图片 派彩时*/
        protected payOutI:string;
        /**派彩图片 非派彩时*/
        protected payOutI2:string;
        //----------------------免佣相关------------------------
        /**6点赔0.5*/
        protected labelHire:eui.Label;
        /**是否免佣*/
        protected isHire:boolean;
        /**免佣时庄比例资源*/
        protected hR:string;
        protected hY:string;
        protected hGr:string;
        /**初始化*/
        public initSetting()
        {
            this.initstr();
            super.initSetting();
            this.roomHire();
            this.clubName();
            this.betDefaultY();
            this.initDetail();
            this.betArea();
            this.progressP(false);
        }
        /** 初始化字符串*/
        private initstr():void
        {
            /**yellow 1:1*/
            this.y1 = "bettingarea_pic_ratiopb1_png";
            /**yellow 1:11*/
            this.y11 = "bettingarea_pic_ratioppbp1_png";
            /**yellow 1:8*/
            this.y8 = "bettingarea_pic_ratiot1_png";
            /**blue 1:1*/
            this.b1 = "bettingarea_pic_ratiop2_png";
            /**red 1:1*/
            this.r1 = "bettingarea_pic_ratiob2_png";
            /**blue 1:11*/
            this.b11 = "bettingarea_pic_ratiopp2_png";
            /**red 1:11*/
            this.r11 = "bettingarea_pic_ratiobp2_png";
            /**green 1:8*/
            this.g8 = "bettingarea_pic_ratiot2_png";
            /**灰白(gray) 1:1*/
            this.gr1 = "bettingarea_pic_ratiopb3_png";
            /**灰白(gray) 1:11*/
            this.gr11 = "bettingarea_pic_ratioppbp3_png";
            /**灰白(gray) 1:8*/
            this.gr8 = "bettingarea_pic_ratiot3_png";
            /**蓝闲*/
            this.bPlayer = "baccarat_pic_player_b_png";
            /**红庄*/
            this.rBanker = "baccarat_pic_banker_r_png";
            /**蓝闲对*/
            this.bPlayer_pair = "baccarat_pic_playerpair_b_png";
            /**红庄对*/
            this.rBanker_pair = "baccarat_pic_bankerpair_r_png";
            /**绿和*/
            this.gTie = "baccarat_pic_tie_g_png";
            /**灰白闲*/
            this.grPlayer = "baccarat_pic_player_w_png";
            /**灰白庄*/
            this.grBanker = "baccarat_pic_banker_w_png";
            /**灰白闲对*/
            this.grPlayer_pair = "baccarat_pic_playerpair_w_png";
            /**灰白庄对*/
            this.grBanker_pair = "baccarat_pic_bankerpair_w_png";
            /**灰白和*/
            this.grTie = "baccarat_pic_tie_w_png";
            /**黄闲*/
            this.yPlayer = "baccarat_pic_player_y_png";
            /**黄庄*/
            this.yBanker = "baccarat_pic_banker_y_png";
            /**黄闲对*/
            this.yPlayer_pair = "baccarat_pic_playerpair_y_png";
            /**黄庄对*/
            this.yBanker_pair = "baccarat_pic_bankerpair_y_png";
            /**黄和*/
            this.yTie = "baccarat_pic_tie_y_png";
            /**派彩图片 派彩时*/
            this.payOutI = "record_btn_payout_png";
            /**派彩图片 非派彩时*/
            this.payOutI2 = "record_btn_payout_d_png";
            //----------------------免佣相关------------------------
            /**免佣时庄比例资源*/
            this.hR = "bettingarea_pic_ratiob2_2_png";
            this.hY = "bettingarea_pic_ratiob2_1_png";
            this.hGr = "bettingarea_pic_ratiob2_3_png";
        }
        /**是否免佣*/
        protected roomHire():void{
            let history = this.data.history;
            this.isHire = history.is_no_commission;
            if(this.isHire){
                this.labelHire.visible = true;
                this.bankerNumImg.x = 0;
            }else{
                this.labelHire.visible = false;
                this.bankerNumImg.x = 24;
            }
        }
        //------------------------------Detail详情---------------------------------------------------
        /**俱乐部名称*/
        protected clubName(): void
        {
            let name = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
            this.labelClubName.text = "(" + name + ")";
        }
        /**初始化详情*/
        protected initDetail(): void
        {
            let history:topic.GameHistory = this.data.history;
            this.labelRoomName.text = history.room_name;
            this.labelRoundNo.text = history.round_id;
            this.setListDetail(history.bets);
            this.setResult();
            this.showVideo(this.data.video);
            this.initProgress("00:00");
            this._payouTime = Math.floor((history.payout_time - history.start_bet_time)/1000);
        }
        /**展示开彩详情（牌面）*/
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
        //--------------------------下注区--------------------------
        /**下注区默认样式*/
        protected betDefaultY():void{
            this.playerNumImg.source = this.y1;
            this.playerImg.source = this.yPlayer;
            if(this.isHire){
                this.bankerNumImg.source = this.y1;
            }else{
                this.bankerNumImg.source = this.hY;
            }
            this.bankerImg.source = this.yBanker;
            this.player_pairNumImg.source = this.y11;
            this.player_pairImg.source = this.yPlayer_pair;
            this.banker_pairNumImg.source = this.y11;
            this.banker_pairImg.source = this.yBanker_pair;
            this.tieNumImg.source = this.y8;
            this.tieImg.source = this.yTie;
            this.playerBetBg.visible = false;
            this.bankerBetBg.visible = false;
            this.player_pairBetBg.visible = false;
            this.banker_pairBetBg.visible = false;
            this.tieBetBg.visible = false;
        }
        /**下注区投注时*/
        protected betArea()
        {
            let betA = this.data.history.bets[0].bet_map;
            for (let key in betA)
            {
                this[`${key}UnSureG`].visible = false;
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
                    this[`${key}UnSureG`].visible = true;
                    this[`${key}UnSureNum`].text = NumberUtil.getSplitNumStr(betA[key], 1);
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
                this[`${key}UnSureG`].visible = false;
                if (payO[key])
                {
                    this.payN += payO[key];
                    this[`${key}UnSureG`].visible = true;
                    this[`${key}BetBg`].visible = true;
                }
            }
        }
        /**派彩时*/
        protected payOut():void{
            this.payOutNum.text = NumberUtil.getSplitNumStr(this.payN, 1);
            if (this.payN)
            {
                this.groupPayOut.visible = true;
            }
            this.progressP(true);
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
            this.player_pairNumImg.source = this.gr11;
            this.player_pairImg.source = this.grPlayer_pair;
            this.banker_pairNumImg.source = this.gr11;
            this.banker_pairImg.source = this.grBanker_pair;
            this.tieNumImg.source = this.gr8;
            this.tieImg.source = this.grTie;
            this.playerBetBg.visible = false;
            this.bankerBetBg.visible = false;
            this.player_pairBetBg.visible = false;
            this.banker_pairBetBg.visible = false;
            this.tieBetBg.visible = false;
        }
        //-------------------------进度条区-------------------------------------
        /**进度条区派彩框*/
        protected progressP(isPayOut: boolean): void
        {
            if (isPayOut)
            {
                this.imgPayOut.source = this.payOutI;
                this.alabelPayOut.textColor = 0xE7B570;
            } else
            {
                this.imgPayOut.source = this.payOutI2;
                this.alabelPayOut.textColor = 0x777777;
            }
        }
        /**进度条区初始化*/
        protected initProgress(total:string): void
        {
            this.totalTime.text = total;
            this.imgGreen.width = 0;
            this.imgRound.x = 115;
            //修改
            this.progressP(true);
            if(this._payouTime && this._totalTime)
            {
                let dis = Math.floor((this._payouTime/this._totalTime)*796);
                this.alabelPayOut.left = 71 + dis;
                this.imgPayOut.left = -19 + dis;
            }
        }
        /**进度条进度(进度条总长796)*/
        protected progress(cur:number): void
        {
            let str = cur >= 10?cur.toString():"0" + cur;
            this.progressTime.text = "00:" + str;
            let w = Math.floor(cur/this._totalTime*796);
            this.imgGreen.width = w;
            this.imgRound.x = 115 + w;
        }
        //-------------------dispose-------------------
        public dispose(): void
        {
            super.dispose();
        }
    }

    //--------------------------------投注Item----------------------------------
    /**百家乐投注Item*/
    export class BacDetailItem extends eui.AItemRenderer
    {
        public constructor()
        {
            super();
            this.skinName = SystemPath.skin_path + "screenPlayback/detailItem.exml";
            this.onStage().then(() =>
            {
                this.init();
            }).catch(() => { });
        }

        private onStage()
        {
            return new Promise((resolve, reject) =>
            {
                let addToStage = () =>
                {
                    this.removeEventListener(egret.Event.ADDED_TO_STAGE, addToStage, this);
                    resolve();
                }
                this.addEventListener(egret.Event.ADDED_TO_STAGE, addToStage, this);
            });
        }
        protected dataChanged()
        {
            try
            {
                this.init();
            } catch (e) { }
        }
        // ----------------------------------------------- skin component -----------------------------------------------
        private groupBaccarat: eui.Group;
        // baccrat
        private labelTitle: eui.ALabel;
        private labelBet: eui.ALabel;
        private labelPayout: eui.ALabel;
        // ----------------------------------------------- variables -----------------------------------------------
        // ----------------------------------------------- handle data -----------------------------------------------
        protected init()
        {
            if (GlobalConfig.isMobile)
            {
                if (this.data.single)
                {
                    this.height = 110;
                }
            } else
            {
                if (this.data.single)
                {
                    this.height = 90;
                }
                if (this.data.double)
                {
                    this.height = 45;
                }
            }
            this.groupBaccarat.visible = false;
            switch (this.data.type)
            {
                case "baccarat":
                    this.groupBaccarat.visible = true;
                    let key = "";
                    switch (this.data.key)
                    {
                        case "tie":
                            key = "和";
                            break;
                        case "banker_pair":
                            key = "庄对";
                            break;
                        case "player_pair":
                            key = "闲对";
                            break;
                        case "banker":
                            key = "庄";
                            break;
                        case "player":
                            key = "闲";
                            break;
                    }
                    this.labelTitle.text = LanguageUtil.translate(key);
                    this.labelBet.text = NumberUtil.getSplitNumStr(this.data.bet);
                    this.labelPayout.text = !(this.data.payout == -1) ? NumberUtil.getSplitNumStr(this.data.payout) : "";
                    break;
            }
        }
    }
}