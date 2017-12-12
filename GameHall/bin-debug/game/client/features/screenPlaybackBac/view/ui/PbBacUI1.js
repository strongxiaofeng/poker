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
    var PbBacUI1 = (function (_super) {
        __extends(PbBacUI1, _super);
        function PbBacUI1(data) {
            var _this = _super.call(this, data) || this;
            /**派彩的金额*/
            _this.payN = 0;
            return _this;
            // this.skinName = "resource/skins/game_skins/mobile/screenPlayback/screenPlaybackBac.exml";
        }
        /**初始化*/
        PbBacUI1.prototype.initSetting = function () {
            this.initstr();
            _super.prototype.initSetting.call(this);
            this.roomHire();
            this.clubName();
            this.betDefaultY();
            this.initDetail();
            this.betArea();
            this.progressP(false);
        };
        /** 初始化字符串*/
        PbBacUI1.prototype.initstr = function () {
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
        };
        /**是否免佣*/
        PbBacUI1.prototype.roomHire = function () {
            var history = this.data.history;
            this.isHire = history.is_no_commission;
            if (this.isHire) {
                this.labelHire.visible = true;
                this.bankerNumImg.x = 0;
            }
            else {
                this.labelHire.visible = false;
                this.bankerNumImg.x = 24;
            }
        };
        //------------------------------Detail详情---------------------------------------------------
        /**俱乐部名称*/
        PbBacUI1.prototype.clubName = function () {
            var name = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
            this.labelClubName.text = "(" + name + ")";
        };
        /**初始化详情*/
        PbBacUI1.prototype.initDetail = function () {
            var history = this.data.history;
            this.labelRoomName.text = history.room_name;
            this.labelRoundNo.text = history.round_id;
            this.setListDetail(history.bets);
            this.setResult();
            this.showVideo(this.data.video);
            this.initProgress("00:00");
            this._payouTime = Math.floor((history.payout_time - history.start_bet_time) / 1000);
        };
        /**展示开彩详情（牌面）*/
        PbBacUI1.prototype.setResult = function () {
            var result = new game.BetRecordResult(this.data);
            this.groupResult.removeChildren();
            result.horizontalCenter = 0;
            result.verticalCenter = 0;
            this.groupResult.addChild(result);
        };
        /** 展示投注详情 */
        PbBacUI1.prototype.setListDetail = function (data) {
            this.listDetail.useVirtualLayout = false;
            this.listArray = new eui.ArrayCollection();
            this.listDetail.itemRenderer = BacDetailItem;
            this.listDetail.dataProvider = this.listArray;
            // 处理下注列表
            var listData = [];
            var temp = {};
            for (var i = data.length - 1; i >= 0; i--) {
                var bet_map = data[i].bet_map;
                for (var key in bet_map) {
                    if (!temp[key]) {
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
            var waitForResult = !(this.data.history.round_result && this.data.history.round_result.length);
            if (this.data.history.payouts) {
                for (var key in this.data.history.payouts) {
                    temp[key]["payout"] = this.data.history.payouts[key];
                }
            }
            for (var key in temp) {
                if (temp[key]["bet"] || temp[key]["payout"]) {
                    listData.push(temp[key]);
                    if (waitForResult) {
                        temp[key]["payout"] = "-1";
                    }
                }
            }
            if (listData.length == 1) {
                listData[0]["single"] = true;
            }
            if (listData.length == 2) {
                listData[0]["double"] = true;
            }
            listData.sort(function (a, b) {
                var typeA = a.key;
                var typeB = b.key;
                var result = 0;
                switch (a.type) {
                    case "baccarat":
                        result = game.BaccaratModel.sortByType(typeA, typeB);
                        break;
                }
                return result;
            });
            this.listArray.source = listData;
            this.listArray.refresh();
            this.listDetail.validateNow();
            // 设置等待开彩文本
            this.labelWaitPayout.visible = waitForResult;
        };
        //--------------------------下注区--------------------------
        /**下注区默认样式*/
        PbBacUI1.prototype.betDefaultY = function () {
            this.playerNumImg.source = this.y1;
            this.playerImg.source = this.yPlayer;
            if (this.isHire) {
                this.bankerNumImg.source = this.y1;
            }
            else {
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
        };
        /**下注区投注时*/
        PbBacUI1.prototype.betArea = function () {
            var betA = this.data.history.bets[0].bet_map;
            for (var key in betA) {
                this[key + "UnSureG"].visible = false;
                if (betA[key]) {
                    switch (key) {
                        case "player":
                            this.playerNumImg.source = this.b1;
                            this.playerImg.source = this.bPlayer;
                            break;
                        case "banker":
                            if (this.isHire) {
                                this.bankerNumImg.source = this.r1;
                            }
                            else {
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
                    this[key + "UnSureG"].visible = true;
                    this[key + "UnSureNum"].text = game.NumberUtil.getSplitNumStr(betA[key], 1);
                }
            }
        };
        /**结果时*/
        PbBacUI1.prototype.betResult = function () {
            var payO = this.data.history.payouts;
            this.betDefault();
            for (var key in payO) {
                this[key + "UnSureG"].visible = false;
                if (payO[key]) {
                    this.payN += payO[key];
                    this[key + "UnSureG"].visible = true;
                    this[key + "BetBg"].visible = true;
                }
            }
        };
        /**派彩时*/
        PbBacUI1.prototype.payOut = function () {
            this.payOutNum.text = game.NumberUtil.getSplitNumStr(this.payN, 1);
            if (this.payN) {
                this.groupPayOut.visible = true;
            }
            this.progressP(true);
        };
        /**下注区灰白状态*/
        PbBacUI1.prototype.betDefault = function () {
            this.playerNumImg.source = this.gr1;
            this.playerImg.source = this.grPlayer;
            if (this.isHire) {
                this.bankerNumImg.source = this.gr1;
            }
            else {
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
        };
        //-------------------------进度条区-------------------------------------
        /**进度条区派彩框*/
        PbBacUI1.prototype.progressP = function (isPayOut) {
            if (isPayOut) {
                this.imgPayOut.source = this.payOutI;
                this.alabelPayOut.textColor = 0xE7B570;
            }
            else {
                this.imgPayOut.source = this.payOutI2;
                this.alabelPayOut.textColor = 0x777777;
            }
        };
        /**进度条区初始化*/
        PbBacUI1.prototype.initProgress = function (total) {
            this.totalTime.text = total;
            this.imgGreen.width = 0;
            this.imgRound.x = 115;
            //修改
            this.progressP(true);
            if (this._payouTime && this._totalTime) {
                var dis = Math.floor((this._payouTime / this._totalTime) * 796);
                this.alabelPayOut.left = 71 + dis;
                this.imgPayOut.left = -19 + dis;
            }
        };
        /**进度条进度(进度条总长796)*/
        PbBacUI1.prototype.progress = function (cur) {
            var str = cur >= 10 ? cur.toString() : "0" + cur;
            this.progressTime.text = "00:" + str;
            var w = Math.floor(cur / this._totalTime * 796);
            this.imgGreen.width = w;
            this.imgRound.x = 115 + w;
        };
        //-------------------dispose-------------------
        PbBacUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PbBacUI1;
    }(game.PbBacBaseUI));
    game.PbBacUI1 = PbBacUI1;
    __reflect(PbBacUI1.prototype, "game.PbBacUI1");
    //--------------------------------投注Item----------------------------------
    /**百家乐投注Item*/
    var BacDetailItem = (function (_super) {
        __extends(BacDetailItem, _super);
        function BacDetailItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "screenPlayback/detailItem.exml";
            _this.onStage().then(function () {
                _this.init();
            }).catch(function () { });
            return _this;
        }
        BacDetailItem.prototype.onStage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var addToStage = function () {
                    _this.removeEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
                    resolve();
                };
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
            });
        };
        BacDetailItem.prototype.dataChanged = function () {
            try {
                this.init();
            }
            catch (e) { }
        };
        // ----------------------------------------------- variables -----------------------------------------------
        // ----------------------------------------------- handle data -----------------------------------------------
        BacDetailItem.prototype.init = function () {
            if (game.GlobalConfig.isMobile) {
                if (this.data.single) {
                    this.height = 110;
                }
            }
            else {
                if (this.data.single) {
                    this.height = 90;
                }
                if (this.data.double) {
                    this.height = 45;
                }
            }
            this.groupBaccarat.visible = false;
            switch (this.data.type) {
                case "baccarat":
                    this.groupBaccarat.visible = true;
                    var key = "";
                    switch (this.data.key) {
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
                    this.labelTitle.text = game.LanguageUtil.translate(key);
                    this.labelBet.text = game.NumberUtil.getSplitNumStr(this.data.bet);
                    this.labelPayout.text = !(this.data.payout == -1) ? game.NumberUtil.getSplitNumStr(this.data.payout) : "";
                    break;
            }
        };
        return BacDetailItem;
    }(eui.AItemRenderer));
    game.BacDetailItem = BacDetailItem;
    __reflect(BacDetailItem.prototype, "game.BacDetailItem");
})(game || (game = {}));
//# sourceMappingURL=PbBacUI1.js.map