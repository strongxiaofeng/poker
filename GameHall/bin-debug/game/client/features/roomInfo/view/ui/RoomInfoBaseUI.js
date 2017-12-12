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
    var RoomInfoBaseUI = (function (_super) {
        __extends(RoomInfoBaseUI, _super);
        function RoomInfoBaseUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.skinName = game.SystemPath.skin_path + "roomInfo/roomInfoSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        RoomInfoBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.maskB = new egret.Shape();
            this.maskP = new egret.Shape();
            this.maskT = new egret.Shape();
            this.groupCircle.addChild(this.maskB);
            this.groupCircle.addChild(this.maskP);
            this.groupCircle.addChild(this.maskT);
            this.polyline = new egret.Shape();
            this.groupLine.addChild(this.polyline);
            game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu]);
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        RoomInfoBaseUI.prototype.onMediatorCommand = function (type, params) {
            var _this = this;
            if (params === void 0) { params = null; }
            switch (type) {
                case RoomInfoUICommands.initListener:
                    this.initListener(params);
                    break;
                case RoomInfoUICommands.setRoomInfo:
                    if (game.GlobalConfig.isMobile) {
                        this.labelInfo.text = "";
                        if (params["roomName"]) {
                            this.labelInfo.text =
                                game.LanguageUtil.translate("global_lbl_room_text") + "：" + params["roomName"];
                        }
                        if (params["dealerName"]) {
                            this.labelInfo.text = this.labelInfo.text + "     " +
                                game.LanguageUtil.translate("global_lbl_dealer") + "：" + params["dealerName"];
                        }
                    }
                    break;
                case RoomInfoUICommands.setLimitInfo:
                    this.setLimitInfo(params);
                    break;
                case RoomInfoUICommands.setRoundInfo:
                    this.setRoundInfo(params);
                    if (this.timeoutObj["setRoundInfo"]) {
                        clearTimeout(this.timeoutObj["setRoundInfo"]);
                    }
                    this.timeoutObj["setRoundInfo"] = setTimeout(function () {
                        _this.setRoundInfo(params);
                    }, 200);
                    break;
                case RoomInfoUICommands.setPolyline:
                    this.setPolyline(params);
                    if (this.timeoutObj["setPolyline"]) {
                        clearTimeout(this.timeoutObj["setPolyline"]);
                    }
                    this.timeoutObj["setPolyline"] = setTimeout(function () {
                        _this.setPolyline(params);
                    }, 200);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        RoomInfoBaseUI.prototype.initListener = function (mediator) {
            if (game.GlobalConfig.isMobile)
                this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.imgBgd, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        };
        /** 响应点击事件 */
        RoomInfoBaseUI.prototype.onHandleTap = function (event) {
            switch (event.target) {
                case this.btnClose:
                case this.imgBgd:
                    game.CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
            }
        };
        RoomInfoBaseUI.prototype.closeCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_RoomInfo.name);
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 设置房间限额信息 */
        RoomInfoBaseUI.prototype.setLimitInfo = function (limit) {
            if (!game.GlobalConfig.isMobile)
                return;
            if (!limit || !limit.max || !limit.min) {
                return;
            }
            _a = [game.NumberUtil.getSplitNumStr(limit.min.player, 3),
                game.NumberUtil.getSplitNumStr(limit.min.banker, 3),
                game.NumberUtil.getSplitNumStr(limit.min.tie, 3),
                game.NumberUtil.getSplitNumStr(limit.min.player_pair, 3),
                game.NumberUtil.getSplitNumStr(limit.min.banker_pair, 3),
                game.NumberUtil.getSplitNumStr(limit.max.player, 3),
                game.NumberUtil.getSplitNumStr(limit.max.banker, 3),
                game.NumberUtil.getSplitNumStr(limit.max.tie, 3),
                game.NumberUtil.getSplitNumStr(limit.max.player_pair, 3),
                game.NumberUtil.getSplitNumStr(limit.max.banker_pair, 3)], this.minP.text = _a[0], this.minB.text = _a[1], this.minT.text = _a[2], this.minPP.text = _a[3], this.minBP.text = _a[4], this.maxP.text = _a[5], this.maxB.text = _a[6], this.maxT.text = _a[7], this.maxPP.text = _a[8], this.maxBP.text = _a[9];
            var _a;
        };
        /** 设置房间局数信息 */
        RoomInfoBaseUI.prototype.setRoundInfo = function (roundInfo) {
            var total = roundInfo.banker + roundInfo.player + roundInfo.tie;
            this.numPlayer.text = roundInfo.player + "";
            this.numBanker.text = roundInfo.banker + "";
            this.numTie.text = roundInfo.tie + "";
            this.numRound.text = total + "";
            var ratioB = 0, ratioP = 0, ratioT = 0;
            if (total > 0) {
                ratioB = ~~(roundInfo.banker * 100 / total);
                ratioT = ~~(roundInfo.tie * 100 / total);
                ratioP = 100 - ratioB - ratioT;
            }
            this.ratePlayer.text = ratioP + "%";
            this.rateBanker.text = ratioB + "%";
            this.rateTie.text = ratioT + "%";
            this.setMask(1, ratioP);
            this.setMask(2, ratioB);
            this.setMask(3, ratioT);
        };
        /** 设置百分比饼状图遮罩
         * @param type {number} 1 - player | 2 - banker | 3 - tie
         * @param percent {number} 百分比数字 (0 - 100)
         */
        RoomInfoBaseUI.prototype.setMask = function (type, percent) {
            var x = this.groupCircle.width / 2;
            // let x = GlobalConfig.isMobile ? 270 : 93;
            var y = this.groupCircle.height / 2;
            // let y = GlobalConfig.isMobile ? 220 : 93;
            var endAngle = (percent / 100) * 2 * Math.PI - Math.PI / 2;
            if (percent == 100) {
                endAngle = 2 * Math.PI - Math.PI / 2;
            }
            var mask, circle, r;
            switch (type) {
                case 1:
                    r = this.circlePlayer.height / 2;
                    // r = GlobalConfig.isMobile ? 150 : 63;
                    mask = this.maskP;
                    circle = this.circlePlayer;
                    break;
                case 2:
                    r = this.circleBanker.height / 2;
                    // r = GlobalConfig.isMobile ? 180 : 75;
                    mask = this.maskB;
                    circle = this.circleBanker;
                    break;
                case 3:
                    r = this.circleTie.height / 2;
                    // r = GlobalConfig.isMobile ? 120 : 51;
                    mask = this.maskT;
                    circle = this.circleTie;
                    break;
            }
            mask.graphics.clear();
            mask.graphics.beginFill(0x666666);
            mask.graphics.moveTo(x, y);
            mask.graphics.lineTo(x, y - r);
            mask.graphics.drawArc(x, y, r, -Math.PI / 2, endAngle, false);
            mask.graphics.lineTo(x, y);
            mask.graphics.endFill();
            circle.mask = mask;
        };
        /** 设置房间局数走势
         * @param roundInfo {Array<string>} P - player | B - banker | T - tie
         */
        RoomInfoBaseUI.prototype.setPolyline = function (roundInfo) {
            this.polyline.graphics.clear();
            var count = game.GlobalConfig.isMobile ? 15 : 12;
            for (var i = 1; i <= count; i++) {
                // dotB1 dotP1 dotT1 - dotB15 dotP15 dotT15
                this["dotB" + i].visible = false;
                this["dotP" + i].visible = false;
                this["dotT" + i].visible = false;
            }
            if (roundInfo.length == 0) {
                return;
            }
            this.polyline.graphics.lineStyle(4, 0xcccccc);
            var r = this["dotB1"].width;
            // let r = GlobalConfig.isMobile ? 35 : 18;
            for (var i = 0; i < roundInfo.length; i++) {
                var num = i + 1;
                var param = roundInfo[i].toUpperCase();
                this["dot" + param + num].visible = true;
                var x = this["dot" + param + num].x + r / 2;
                // let x = GlobalConfig.isMobile ? (-10 + 50 * i + r / 2) : (25 * i + 47 + r / 2);
                var y = this["dot" + param + num].y + r / 2;
                // let y = (param == "B" ? -7 : (param == "P" ? 470 : 232)) + r / 2;
                // if (!GlobalConfig.isMobile) {
                //     y = (param == "B" ? 39 : (param == "P" ? 153 : 98)) + r / 2;
                // }
                if (num == 1) {
                    this.polyline.graphics.moveTo(x, y);
                }
                else {
                    this.polyline.graphics.lineTo(x, y);
                }
            }
            this.polyline.graphics.endFill();
        };
        // ---------------------------------- dispose ----------------------------------
        RoomInfoBaseUI.prototype.dispose = function () {
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return RoomInfoBaseUI;
    }(game.BaseUI));
    game.RoomInfoBaseUI = RoomInfoBaseUI;
    __reflect(RoomInfoBaseUI.prototype, "game.RoomInfoBaseUI");
})(game || (game = {}));
//# sourceMappingURL=RoomInfoBaseUI.js.map