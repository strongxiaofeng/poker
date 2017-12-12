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
    var BetRecordResult = (function (_super) {
        __extends(BetRecordResult, _super);
        function BetRecordResult(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.skinName = game.SystemPath.skin_path + "betRecord/betRecordResultSkin.exml";
            return _this;
        }
        BetRecordResult.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initSetting();
        };
        // --------------------------------------- init ---------------------------------------
        /** 初始化设置 */
        BetRecordResult.prototype.initSetting = function () {
            this.groupBaccarat.visible = false;
            this.groupRoulette.visible = false;
            this.groupDT.visible = false;
            this.groupSicbo.visible = false;
            switch (this.data.type) {
                case game.GameType.baccarat:
                    this.showBaccaratResult(this.data.history);
                    this.groupBaccarat.visible = true;
                    break;
                case game.GameType.roulette:
                    this.showRouletteResult(this.data.history);
                    this.groupRoulette.visible = true;
                    break;
                case game.GameType.sicbo:
                    this.showSicboResult(this.data.history);
                    this.groupSicbo.visible = true;
                    break;
                case game.GameType.dragon_tiger:
                    this.showDragonTigerResult(this.data.history);
                    this.groupDT.visible = true;
                    break;
            }
        };
        // --------------------------------------- handle ui ---------------------------------------
        /** 百家乐开彩结果 */
        BetRecordResult.prototype.showBaccaratResult = function (history) {
            if (history.cards && history.cards.length) {
                var showPlayer3 = false;
                var showBanker3 = false;
                // 显示扑克牌点数
                for (var i = history.cards.length - 1; i >= 0; i--) {
                    var cardType = history.cards[i].position;
                    var num = 0;
                    switch (cardType) {
                        case "player_1":
                            num = 0;
                            break;
                        case "player_2":
                            num = 2;
                            break;
                        case "player_3":
                            showPlayer3 = true;
                            num = 4;
                            break;
                        case "banker_1":
                            num = 1;
                            break;
                        case "banker_2":
                            num = 3;
                            break;
                        case "banker_3":
                            showBanker3 = true;
                            num = 5;
                            break;
                    }
                    var imgSource = "mpoker_pic_" + history.cards[i].card + "_png";
                    if (!game.GlobalConfig.isMobile) {
                        imgSource = "mpoker_pic_" + history.cards[i].card + "_pc_png";
                    }
                    this["imgCard" + num].source = imgSource;
                }
                // 是否显示第三张牌
                this["imgCard4"].visible = showPlayer3;
                this["imgCard5"].visible = showBanker3;
                if (game.GlobalConfig.isMobile) {
                    // 调整框的大小
                    this.imgPlayerBgd.width = showPlayer3 ? 220 : 220 - 77 - 5;
                    this.imgBankerBgd.width = showBanker3 ? 220 : 220 - 77 - 5;
                    // 调整点数位置
                    this.imgPlayerPoint.right = showPlayer3 ? 238 : 238 - 77 - 5;
                    this.imgBankerPoint.left = showBanker3 ? 238 : 238 - 77 - 5;
                }
                else {
                    // 调整框的大小
                    this.imgPlayerBgd.width = showPlayer3 ? 110 : 110 - 40 - 3;
                    this.imgBankerBgd.width = showBanker3 ? 110 : 110 - 40 - 3;
                    // 调整点数位置
                    this.imgPlayerPoint.right = showPlayer3 ? 120 : 120 - 40 - 3;
                    this.imgBankerPoint.left = showBanker3 ? 120 : 120 - 40 - 3;
                }
                // 设置庄闲点数
                var b = history.score.banker;
                var p = history.score.player;
                this.imgPlayerPoint.source = game.GlobalConfig.isMobile ? "recordpoints_pic_blue" + p + "_png" : "recordpoints_pic_blue" + p + "_pc_png";
                this.imgBankerPoint.source = game.GlobalConfig.isMobile ? "recordpoints_pic_red" + b + "_png" : "recordpoints_pic_red" + b + "_pc_png";
                // 设置开彩结果
                var BPT = "B";
                var pairB = "-";
                var pairP = "-";
                for (var i = history.round_result.length - 1; i >= 0; i--) {
                    switch (history.round_result[i]) {
                        case "banker":
                            BPT = "B";
                            break;
                        case "player":
                            BPT = "P";
                            break;
                        case "tie":
                            BPT = "T";
                            break;
                        case "player_pair":
                            pairP = "P";
                            break;
                        case "banker_pair":
                            pairB = "B";
                            break;
                    }
                }
                var resultImgSource = "baccarat_pic_bead." + BPT + pairB + pairP + "_png";
                if (!game.GlobalConfig.isMobile) {
                    resultImgSource = "baccarat_pic_bead." + BPT + pairB + pairP + "_pc_png";
                }
                this.imgResult.source = resultImgSource;
            }
            else {
                // 等待开彩
                this.imgPlayerBgd.visible = false;
                this.imgBankerBgd.visible = false;
                this.imgPlayerPoint.visible = false;
                this.imgBankerPoint.visible = false;
                this.imgResult.visible = false;
                for (var i = 0; i < 6; i++) {
                    this["imgCard" + i].source = game.GlobalConfig.isMobile ? "record_pic_pokerback_png" : "record_pic_pokerback_pc_png";
                }
            }
        };
        /** 轮盘开彩结果 */
        BetRecordResult.prototype.showRouletteResult = function (history) {
            if ((history.round_result && history.result) || history.result === 0) {
                this.groupRouletteNum.visible = true;
                this.groupRouletteWait.visible = false;
                var num = history.result;
                var src = "roulette_play_pic_opengreen_png";
                this.labelRoulette.text = num + "";
                if (game.RouletteModel.redNum.indexOf(num) > -1) {
                    src = "roulette_play_pic_openred_png";
                }
                if (game.RouletteModel.blackNum.indexOf(num) > -1) {
                    src = "roulette_play_pic_openblack_png";
                }
                this.imgRoulette.source = src;
            }
            else {
                // 等待开彩
                this.groupRouletteNum.visible = false;
                this.groupRouletteWait.visible = true;
            }
        };
        /** 龙虎开彩结果 */
        BetRecordResult.prototype.showDragonTigerResult = function (history) {
        };
        /** 骰宝开彩结果 */
        BetRecordResult.prototype.showSicboResult = function (history) {
        };
        // --------------------------------------- dispose ---------------------------------------
        /** 关闭父级界面时调用 */
        BetRecordResult.prototype.dispose = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return BetRecordResult;
    }(eui.Component));
    game.BetRecordResult = BetRecordResult;
    __reflect(BetRecordResult.prototype, "game.BetRecordResult");
})(game || (game = {}));
//# sourceMappingURL=BetRecordResult.js.map