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
    var AssetBetDetailItem = (function (_super) {
        __extends(AssetBetDetailItem, _super);
        function AssetBetDetailItem() {
            var _this = _super.call(this) || this;
            _this.onStage().then(function () {
                _this.init();
            }).catch(function () { });
            _this.skinName = game.SystemPath.skin_path + "assetDetail/assetBetDetailItemSkin.exml";
            return _this;
        }
        AssetBetDetailItem.prototype.onStage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var addToStage = function () {
                    _this.removeEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
                    resolve();
                };
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
            });
        };
        AssetBetDetailItem.prototype.dataChanged = function () {
            try {
                this.init();
            }
            catch (e) { }
        };
        // ----------------------------------------------- variables -----------------------------------------------
        // ----------------------------------------------- handle data -----------------------------------------------
        AssetBetDetailItem.prototype.init = function () {
            if (this.data.single) {
                this.height = 60;
            }
            this.groupBaccarat.visible = false;
            this.groupRoulette.visible = false;
            this.groupSicbo.visible = false;
            this.groupDT.visible = false;
            switch (this.data.type) {
                case game.GameType.baccarat:
                    this.groupBaccarat.visible = true;
                    var key = "";
                    switch (this.data.key) {
                        case "tie":
                            key = "game_lbl_tie_simple";
                            break;
                        case "banker_pair":
                            key = "game_lbl_banker_pair_sim";
                            break;
                        case "player_pair":
                            key = "game_lbl_player_pair_sim";
                            break;
                        case "banker":
                            key = "game_lbl_banker_simple";
                            break;
                        case "player":
                            key = "game_lbl_player_simple";
                            break;
                    }
                    this.labelTitle.text = game.LanguageUtil.translate(key);
                    this.labelBet.text = game.NumberUtil.getSplitNumStr(this.data.bet);
                    this.labelPayout.text = !(this.data.payout == -1) ? game.NumberUtil.getSplitNumStr(this.data.payout) : "";
                    break;
                case game.GameType.sicbo:
                    this.groupSicbo.visible = true;
                    break;
                case game.GameType.roulette:
                    // 下注类型
                    var type = game.RouletteModel.translateBetType(this.data.key);
                    if (type.indexOf("_") == 0) {
                        this.groupRouletteBet.visible = true;
                        this.labelTitleRoulette.visible = false;
                        var nums_1 = [];
                        var strArr = type.split("_");
                        strArr.forEach(function (str) {
                            if (/\d+/.test(str)) {
                                nums_1.push(+str);
                            }
                        }, this);
                        for (var i = 0; i <= 5; i++) {
                            this["imgRoulette" + i].source = "";
                        }
                        for (var i = 0; i < nums_1.length; i++) {
                            var number = nums_1[i];
                            this["imgRoulette" + i].source = "roadmap_pic_" + number + "_png";
                        }
                        this.groupRouletteBet.horizontalCenter = (6 - nums_1.length) * (game.GlobalConfig.isMobile ? 45 / 2 : 20 / 2);
                    }
                    else {
                        this.labelTitleRoulette.text = game.LanguageUtil.translate(type);
                        this.groupRouletteBet.visible = false;
                        this.labelTitleRoulette.visible = true;
                    }
                    // 下注金额
                    this.labelBetRoulette.text = game.NumberUtil.getSplitNumStr(this.data.bet);
                    // 派彩金额
                    this.labelPayoutRoulette.text = !(this.data.payout == -1) ? game.NumberUtil.getSplitNumStr(this.data.payout) : "";
                    this.groupRoulette.visible = true;
                    break;
                case game.GameType.dragon_tiger:
                    this.groupDT.visible = true;
                    break;
            }
        };
        return AssetBetDetailItem;
    }(eui.AItemRenderer));
    game.AssetBetDetailItem = AssetBetDetailItem;
    __reflect(AssetBetDetailItem.prototype, "game.AssetBetDetailItem");
})(game || (game = {}));
//# sourceMappingURL=AssetBetDetailItem.js.map