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
    var BetRecordItem = (function (_super) {
        __extends(BetRecordItem, _super);
        function BetRecordItem() {
            var _this = _super.call(this) || this;
            _this.onStage().then(function () {
                _this.imgShowMore.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
                _this.imgShowLess.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
                _this.btnVideo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
                _this.init();
            }).catch(function () { });
            _this.detailHeight = game.GlobalConfig.isMobile ? 480 : 195;
            _this.normalHeight = game.GlobalConfig.isMobile ? 165 : 70;
            _this.skinName = game.SystemPath.skin_path + "betRecord/betRecordItemSkin.exml";
            return _this;
        }
        BetRecordItem.prototype.onStage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var addToStage = function () {
                    _this.removeEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
                    resolve();
                };
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, addToStage, _this);
            });
        };
        BetRecordItem.prototype.dataChanged = function () {
        };
        /** 视频回放详情 */
        // private videoData: topic.Video;
        // ----------------------------------------------- handle data -----------------------------------------------
        BetRecordItem.prototype.init = function () {
            var _this = this;
            this.imgBgd.visible = this.data.showBgd;
            this.height = this.normalHeight;
            this.groupDown.visible = false;
            this.groupDetail.visible = false;
            var history = this.data.history;
            var date = new Date(history.start_bet_time || 0);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            // 文本显示
            this.labelYear.text = y + "/" + (m / 100).toFixed(2).slice(2) + "/" + (d / 100).toFixed(2).slice(2);
            this.labelHour.text = (hour / 100).toFixed(2).slice(2) + ":" + (min / 100).toFixed(2).slice(2) + ":" + (sec / 100).toFixed(2).slice(2);
            this.labelAccount.text = history.username || "";
            this.labelUserId.text = (history.user_id + "") || "";
            this.labelBet.text = game.NumberUtil.getSplitNumStr(history.bet, 2);
            if (history.payout >= history.bet) {
                this.labelPayout.textColor = game.GlobalConfig.payoutShowRed ? 0xff0000 : 0x00ff00;
            }
            else {
                this.labelPayout.textColor = game.GlobalConfig.payoutShowRed ? 0x00ff00 : 0xff0000;
            }
            if (this.data.labelUserId == game.PersonalInfoModel.getInstance().user_id) {
                this.labelPayout.textColor = this.labelPayout.textColor == 0xff0000 ? 0x00ff00 : 0xff0000;
            }
            this.labelPayout.text = game.NumberUtil.getSplitNumStr(history.payout);
            this.labelRoomName.text = history.room_name;
            this.labelRoundNo.text = history.round_id;
            // 按下状态组
            this.labelYearDown.text = this.labelYear.text;
            this.labelHourDown.text = this.labelHour.text;
            this.labelAccountDown.text = this.labelAccount.text;
            this.labelUserIdDown.text = this.labelUserId.text;
            this.labelBetDown.text = this.labelBet.text;
            this.labelPayoutDown.text = this.labelPayout.text;
            if (!game.GlobalConfig.isMobile) {
                this.labelRoomNameDown.text = this.labelRoomName.text;
                this.labelRoundNoDown.text = this.labelRoundNo.text;
            }
            // 展示结果组与投注记录
            this.setListDetail(history.bets);
            this.setResult();
            // 获取视频回放信息
            game.DataCenterController.getInstance().getVideoInfo(history.round_id).then(function (data) {
                if (data.snapshot.video) {
                    _this.btnVideo.enabled = true;
                    _this.btnVideo.setState = "up";
                    _this.data["video"] = data.snapshot.video;
                }
            }).catch(function (e) {
                game.DebugUtil.debug("获取video详情失败" + e.massage);
            });
        };
        /** 展示投注详情 */
        BetRecordItem.prototype.setListDetail = function (data) {
            this.listDetail.useVirtualLayout = false;
            this.listArray = new eui.ArrayCollection();
            this.listDetail.itemRenderer = game.BetRecordDetailItem;
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
                    case game.GameType.baccarat:
                        result = game.BaccaratModel.sortByType(typeA, typeB);
                        break;
                    case game.GameType.roulette:
                        break;
                    case game.GameType.sicbo:
                        break;
                    case game.GameType.dragon_tiger:
                        break;
                }
                return result;
            });
            this.listArray.source = listData;
            this.listArray.refresh();
            this.listDetail.validateNow();
            if (game.GlobalConfig.isMobile) {
                this.detailHeight = Math.max(this.detailHeight, this.normalHeight + 135 + 65 + listData.length * 60 + 10);
            }
            else {
                this.detailHeight = Math.max(this.detailHeight, this.normalHeight + 35 + listData.length * 30);
            }
            // 设置等待开彩文本
            this.labelWaitPayout.visible = waitForResult;
            this.labelWaitPayout2.visible = waitForResult;
            this.labelWaitPayoutDown.visible = waitForResult;
            this.labelPayout.visible = !waitForResult;
            this.labelPayoutDown.visible = !waitForResult;
            this.btnVideo.enabled = false;
            this.btnVideo.setState = "disabled";
        };
        /** 展示开彩详情 */
        BetRecordItem.prototype.setResult = function () {
            var result = new game.BetRecordResult(this.data);
            this.groupResult.removeChildren();
            result.horizontalCenter = 0;
            result.verticalCenter = 0;
            this.groupResult.addChild(result);
        };
        /** 设置折叠状态 */
        BetRecordItem.prototype.setItem = function (roundId) {
            if (roundId != this.data.history.round_id) {
                this.height = this.normalHeight;
                this.groupDown.visible = false;
                this.groupDetail.visible = false;
                // CTweenManagerController.getInstance().startCTween(6,[this.groupDetail],false,()=>{
                //     this.groupDown.visible = false;
                //     this.height = this.normalHeight;
                // },this);
            }
        };
        // ----------------------------------------------- handle event -----------------------------------------------
        BetRecordItem.prototype.onTap = function (e) {
            switch (e.target) {
                case this.imgShowMore:
                    this.height = this.detailHeight;
                    this.groupDown.visible = true;
                    // this.groupDetail.visible = true;
                    game.CTweenManagerController.getInstance().startCTween(6, [this.groupDetail]);
                    game.DataCenterController.getInstance().sendNotification(game.NotifyConst.Notify_DataCenterItem, this.data.history.round_id);
                    break;
                case this.imgShowLess:
                    this.groupDown.visible = false;
                    this.height = this.normalHeight;
                    this.groupDetail.visible = false;
                    // CTweenManagerController.getInstance().startCTween(6,[this.groupDetail],false,()=>{
                    //     this.groupDown.visible = false;
                    //     this.height = this.normalHeight;
                    // },this);
                    break;
                case this.btnVideo:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_PbBacMediator, [this.data, game.Mediators.Mediator_BetRecord]);
                    break;
            }
        };
        return BetRecordItem;
    }(eui.AItemRenderer));
    game.BetRecordItem = BetRecordItem;
    __reflect(BetRecordItem.prototype, "game.BetRecordItem");
})(game || (game = {}));
//# sourceMappingURL=BetRecordItem.js.map