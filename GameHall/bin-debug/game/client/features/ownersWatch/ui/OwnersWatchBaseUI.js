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
     * 俱乐部多桌UI组件
     * by 郑戎辰
     */
    var OwnersWatchBaseUI = (function (_super) {
        __extends(OwnersWatchBaseUI, _super);
        function OwnersWatchBaseUI(data) {
            var _this = _super.call(this) || this;
            //----------------字体资源-----------------
            _this.red_fnt = "game_share_red_100_fnt";
            _this.green_fnt = "game_share_green_100_fnt";
            _this.red_pc_fnt = "game_share_red_48_pc_fnt";
            _this.green_pc_fnt = "game_share_green_48_pc_fnt";
            _this._pageIndex = 1;
            _this.data = data;
            _this.listLoader = game.ListLoader.getInstance();
            _this.skinName = game.SystemPath.skin_path + "ownersWatch/ownersWatch.exml";
            game.CommonLoadingUI.getInstance().stop();
            return _this;
        }
        OwnersWatchBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.deskData = new eui.ArrayCollection();
            this.initListener();
            this.initCountdown();
            this.initList();
            this.refreshStage();
            this.isOne();
            this.pageIndex = 1;
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        OwnersWatchBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case OwnersWatchUICommands.OwnersWatchNotify_deskNum:
                    this.deskCount.text = "\u684C\u67B1\uFF1A" + params;
                    break;
                case OwnersWatchUICommands.OwnersWatchNotify_playerNum:
                    this.playerCount.text = "\u73A9\u5BB6\uFF1A" + params;
                    break;
                case OwnersWatchUICommands.OwnersWatchNotify_roomCardNum:
                    this.roomCardTxt.text = "\u623F\u5361\uFF1A" + params;
                    break;
                case OwnersWatchUICommands.OwnersWatchNotify_upData:
                    this.upDataList();
                    break;
                case OwnersWatchUICommands.OwnersWatchNotify_souresUpData:
                    this.refreshStage();
                    break;
                case OwnersWatchUICommands.OwnersWatchNotify_todayStis:
                    this.updataText(params, 1);
                    break;
                case OwnersWatchUICommands.OwnersWatchNotify_theStis:
                    this.updataText(params, 2);
                    break;
            }
        };
        /* 点击响应事件 */
        OwnersWatchBaseUI.prototype.onTouchBtn = function (evt) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (evt.target) {
                case this.msgBtn:
                    if (!game.GlobalConfig.isMobile) {
                        this.msgGroup.visible = true;
                    }
                    else {
                        game.CTweenManagerController.getInstance().startCTween(1, [this.msgGroup, this.msgTxtGroup]);
                    }
                    break;
                case this.joinConfirmBtn:
                    if (!game.GlobalConfig.isMobile) {
                        this.msgGroup.visible = false;
                    }
                    else {
                        game.CTweenManagerController.getInstance().startCTween(1, [this.msgGroup, this.msgTxtGroup], false);
                    }
                    break;
            }
        };
        /**判断是否是第一次进入*/
        OwnersWatchBaseUI.prototype.isOne = function () {
            var watchUser = localStorage.getItem("watchUser");
            var name = game.LoginController.getInstance().sendingName;
            var watch = false;
            if (!watchUser)
                watchUser = "";
            if (watchUser.length > 0) {
                var arr = watchUser.split(":");
                if (arr.indexOf(name) > -1) {
                    watch = true;
                }
            }
            if (!watch) {
                var value = watchUser;
                if (watchUser.length > 0)
                    value += ":" + name;
                else
                    value += name;
                localStorage.setItem("watchUser", value);
                this.msgGroup.visible = true;
            }
            else {
                this.msgGroup.visible = false;
            }
        };
        /** 初始化事件 */
        OwnersWatchBaseUI.prototype.initListener = function () {
            //点击事件
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
            this.listLoader.setList(this.mulitScroller, this.pullDownRefreshList, this, this.pullUpRefreshList);
        };
        /*------------------------------- list -----------------------------------*/
        /** 初始化List */
        OwnersWatchBaseUI.prototype.initList = function () {
            if (game.GlobalConfig.isMobile) {
                this.mulitList.itemRenderer = game.OwnersWatchItemUI1;
            }
            else {
                this.mulitList.itemRenderer = game.PCOwnersWatchItemUI1;
            }
            this.mulitList.useVirtualLayout = false;
            // let arr = BaccaratModel.getInstance().getOwnersDesks();
            // for (let i = 0; i < 15; i++) {
            // 	if (arr[0]) {
            // 		arr.push(arr[0])
            // 	}
            // }
            // this.deskData.source = arr.slice(0, 10);
            // this.mulitList.dataProvider = this.deskData;
            // this.deskData.refresh();
            this.mulitScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            // if (arr && arr.length) {
            // 	this.showListMsg(false)
            // }
            // else {
            // 	this.showListMsg(true)
            // }
        };
        ;
        /** 初始化计时器 */
        OwnersWatchBaseUI.prototype.initCountdown = function () {
            if (!this.countdown) {
                if (game.GlobalConfig.isMobile) {
                    this.countdown = new game.countdown(65, true);
                }
                else {
                    this.countdown = new game.countdown(130);
                }
                this.stageGroup.addChild(this.countdown);
            }
            // this.countdown = new game.countdown(65, true);
            // this.stageGroup.addChild(this.countdown);
        };
        /** 刷新List数据 */
        OwnersWatchBaseUI.prototype.upDataList = function () {
            this.deskData = null;
            this.deskData = new eui.ArrayCollection();
            // let pageNum = 10;
            var arr = game.BaccaratModel.getInstance().getOwnersDesks();
            this.deskData.source = arr;
            this.mulitList.dataProvider = this.deskData;
            this.deskData.refresh();
            this.mulitList.validateNow();
            // if (this.pageIndex * pageNum >= arr.length) {
            // 	this.listLoader.setAllLoaded();
            // } else {
            // 	this.listLoader.setLoadComplete();
            // }
            if (arr && arr.length) {
                this.showListMsg(false);
            }
            else {
                this.showListMsg(true);
            }
        };
        Object.defineProperty(OwnersWatchBaseUI.prototype, "pageIndex", {
            get: function () {
                return this._pageIndex;
            },
            set: function (v) {
                this._pageIndex = v;
                if (this._pageIndex == 0) {
                    this._pageIndex = 1;
                }
                this.upDataList();
            },
            enumerable: true,
            configurable: true
        });
        /** 上拉加载*/
        OwnersWatchBaseUI.prototype.pullUpRefreshList = function () {
            var _this = this;
            game.BaccaratController.getInstance().getSubscribeRoomDesk(this.data, game.BaccaratController.roomDeskPrevious).then(function () {
                // this.pageIndex--;
                _this.listLoader.setLoadComplete();
            });
        };
        /** 下拉加载*/
        OwnersWatchBaseUI.prototype.pullDownRefreshList = function () {
            var _this = this;
            game.BaccaratController.getInstance().getSubscribeRoomDesk(this.data, game.BaccaratController.roomDeskNext).then(function () {
                // this.pageIndex++;
                _this.listLoader.setLoadComplete();
            });
        };
        /** 是否显示列表为空 */
        OwnersWatchBaseUI.prototype.showListMsg = function (b) {
            if (b) {
                this.label_HaveNothing.visible = true;
            }
            else {
                this.label_HaveNothing.visible = false;
            }
        };
        /** 设置倒计时 */
        OwnersWatchBaseUI.prototype.setCountdown = function (timeAll, overTime) {
            this.countdown.startTime(timeAll, overTime);
        };
        /** 更改统计文字 */
        /**
         *
         * @param type 1 为今日统计，2为本局统计
         *
         */
        OwnersWatchBaseUI.prototype.updataText = function (data, type) {
            if (data) {
                if (type == 1) {
                    this.todayBet.text = game.NumberUtil.getSplitNumStr(data.bet, 3);
                    this.todayPayout.text = game.NumberUtil.getSplitNumStr(data.payout, 3);
                    this.todayZone.text = game.NumberUtil.getSplitNumStr(data.surplus, 3);
                    if (data.surplus >= 0) {
                        if (data.surplus > 0) {
                            this.todayZone.text = '+' + this.todayZone.text;
                        }
                        this.todayZone.font = game.GlobalConfig.isMobile ? this.red_fnt : this.red_pc_fnt;
                    }
                    else {
                        this.todayZone.font = game.GlobalConfig.isMobile ? this.green_fnt : this.green_pc_fnt;
                    }
                }
                else if (type == 2) {
                    this.theBet.text = game.NumberUtil.getSplitNumStr(data.bet, 3);
                    this.thePayout.text = game.NumberUtil.getSplitNumStr(data.payout, 3);
                    this.theZone.text = game.NumberUtil.getSplitNumStr(data.surplus, 3);
                    if (data.surplus >= 0) {
                        if (data.surplus > 0) {
                            this.theZone.text = '+' + this.theZone.text;
                        }
                        this.theZone.font = game.GlobalConfig.isMobile ? this.red_fnt : this.red_pc_fnt;
                    }
                    else {
                        this.theZone.font = game.GlobalConfig.isMobile ? this.green_fnt : this.green_pc_fnt;
                    }
                }
            }
            else {
                if (type == 1) {
                    this.todayBet.text = '0';
                    this.todayPayout.text = '0';
                    this.todayZone.text = '0';
                    this.todayZone.font = game.GlobalConfig.isMobile ? this.red_fnt : this.red_pc_fnt;
                }
                else if (type == 2) {
                    this.theBet.text = '0';
                    this.thePayout.text = '0';
                    this.theZone.text = '0';
                    this.theZone.font = game.GlobalConfig.isMobile ? this.red_fnt : this.red_pc_fnt;
                }
            }
        };
        /** 刷新房间状态 */
        OwnersWatchBaseUI.prototype.refreshStage = function () {
            var stage = game.ClubModel.getInstance().getRoomStage(this.data);
            switch (stage) {
                // 下注
                case game.GameState.bet:
                    var betTime = game.ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
                    var stopBetTime = game.ClubModel.getInstance().getStopBetTime(this.data);
                    this.setCountdown(betTime, stopBetTime);
                    break;
                // 发牌
                case game.GameState.deal_card:
                    this.countdown.startPayOut();
                    break;
                // 派彩
                case game.GameState.payout:
                    this.countdown.startPayOut();
                    break;
                // 洗牌
                case game.GameState.shuffle:
                    this.countdown.startShuffle();
                    break;
            }
        };
        /** 执行所有item的方法 */
        OwnersWatchBaseUI.prototype.runAllItemFuc = function (fucName, params) {
            if (params === void 0) { params = null; }
            if (this.mulitList) {
                for (var i = 0; i < this.mulitList.dataProvider.length; i++)
                    if (this.mulitList.getElementAt(i)) {
                        this.mulitList.getElementAt(i)[fucName](params);
                    }
            }
        };
        /** 执行某个item的方法 */
        OwnersWatchBaseUI.prototype.runItemFuc = function (roomID, fucName, params) {
            if (params === void 0) { params = null; }
            if (this.mulitList) {
                for (var i = 0; i < this.mulitList.dataProvider.length; i++)
                    if (this.mulitList.getElementAt(i)) {
                        if (this.mulitList.getElementAt(i)["data"] == roomID) {
                            this.mulitList.getElementAt(i)[fucName](params);
                        }
                    }
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        OwnersWatchBaseUI.prototype.dispose = function () {
            this.deskData = null;
            this.mulitList = null;
            _super.prototype.dispose.call(this);
            game.CTweenManagerController.getInstance().endAllCTween();
        };
        return OwnersWatchBaseUI;
    }(game.BaseUI));
    game.OwnersWatchBaseUI = OwnersWatchBaseUI;
    __reflect(OwnersWatchBaseUI.prototype, "game.OwnersWatchBaseUI");
})(game || (game = {}));
//# sourceMappingURL=OwnersWatchBaseUI.js.map