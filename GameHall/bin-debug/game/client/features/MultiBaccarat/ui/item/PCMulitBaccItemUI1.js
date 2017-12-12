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
    var PCMulitBaccItemUI1 = (function (_super) {
        __extends(PCMulitBaccItemUI1, _super);
        function PCMulitBaccItemUI1() {
            var _this = _super.call(this) || this;
            /** 当前选中的筹码 */
            _this.thisChip = 1;
            /** 路数相关 */
            _this.unit = 34;
            _this._isShow = false;
            _this.skinName = "resource/skins/game_skins/pc/mulitBaccarat/item/mulitBaccItem.exml";
            _this.roomChips = [];
            _this.userChips = [];
            return _this;
        }
        /** 点击事件 */
        PCMulitBaccItemUI1.prototype.initMouseEvent = function (b) {
            _super.prototype.initMouseEvent.call(this, b);
            if (b) {
                this.chipEdit0.addEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit0.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
                this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
            }
            else {
                this.chipEdit0.removeEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.TouchEvent.CHANGE, this.onEditChange, this);
                this.chipEdit0.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            }
        };
        PCMulitBaccItemUI1.prototype.initData = function () {
            _super.prototype.initData.call(this);
            if (this.data == "guide")
                return;
            this.getAllLimit();
            this.setIndexNum();
            this.setPolylineFuc();
        };
        PCMulitBaccItemUI1.prototype.souresIn = function () {
            _super.prototype.souresIn.call(this);
            var so = game.ClubModel.getInstance().getRoomSource(this.data);
            if (so) {
                if (so['round_statistics']) {
                    var round = so.round_statistics.rounds;
                    this.gamesNum.text = "\u5C40\u6570\uFF1A" + round;
                }
            }
        };
        /**  点击响应*/
        PCMulitBaccItemUI1.prototype.onTouchTap = function (evt) {
            _super.prototype.onTouchTap.call(this, evt);
            switch (evt.target) {
                case this.limitBtn:
                    var b1 = this.limitGroup.visible;
                    this.showLimitGroupFuc(2, !b1);
                    break;
                case this.limitBackBtn:
                    this.showLimitGroupFuc(2, false);
                    break;
                case this.editChipBtn:
                    this.setEditGroup(true);
                    break;
                case this.chipCancelBtn:
                    this.setEditGroup(false);
                    break;
                case this.chipSureBtn:
                    this.confirmEditChip();
                    break;
                case this.trendBtn:
                    var b2 = this.trendGroup.visible;
                    this.showLimitGroupFuc(1, !b2);
                    break;
                case this.trendBackBtn:
                    this.showLimitGroupFuc(1, false);
                    break;
                case this.joinBtn:
                    this.showJoin();
                    break;
                case this.bankerAskBtn:
                case this.playerAskBtn:
                    var b3 = this.trendGroup.visible;
                    var b4 = this.limitGroup.visible;
                    if (b3) {
                        this.showLimitGroupFuc(1, false);
                    }
                    else if (b4) {
                        this.showLimitGroupFuc(2, false);
                    }
                    break;
            }
        };
        PCMulitBaccItemUI1.prototype.onMouseOver = function (evt) {
            switch (evt.target) {
                case this.placeTopBtn:
                    this.showBHImg(1);
                    break;
                case this.placeBottomBtn:
                    this.showBHImg(2);
                    break;
                case this.joinBtn:
                    this.showBHImg(3);
                    break;
            }
        };
        PCMulitBaccItemUI1.prototype.onMouseOut = function () {
            this.bottomHoverGroup.visible = false;
        };
        /** 显示Btn的hover效果 */
        PCMulitBaccItemUI1.prototype.showBHImg = function (type) {
            var group = this.bottomHoverGroup;
            var label = this.bottomHoverLabel;
            switch (type) {
                case 1:
                    group.horizontalCenter = "-66%";
                    label.text = '置顶';
                    break;
                case 2:
                    group.horizontalCenter = "0";
                    label.text = '置底';
                    break;
                case 3:
                    group.horizontalCenter = "66%";
                    label.text = '进入房间';
                    break;
            }
            group.visible = true;
        };
        /** 初始化计时器 */
        PCMulitBaccItemUI1.prototype.initCountdown = function () {
            this.countdown = new game.countdown(45, true, true);
            this.stageGroup.addChild(this.countdown);
        };
        /** 点击筹码更新金额 */
        PCMulitBaccItemUI1.prototype.touchChips = function (type) {
            switch (type) {
                case 'blue':
                    this.thisChip = 0;
                    this["ChipBg"].verticalCenter = "-66%";
                    break;
                case 'green':
                    this.thisChip = 1;
                    this["ChipBg"].verticalCenter = "0";
                    break;
                case 'red':
                    this.thisChip = 2;
                    this["ChipBg"].verticalCenter = "66%";
                    break;
            }
            _super.prototype.touchChips.call(this, type);
        };
        /** 获取牌局号 */
        PCMulitBaccItemUI1.prototype.getRoundID = function () {
            var soData = game.ClubModel.getInstance().getRoomSource(this.data);
            if (soData) {
                this.roundID.text = '牌局号：' + soData.round_id;
            }
        };
        /** 获取所有限额 */
        PCMulitBaccItemUI1.prototype.getAllLimit = function () {
            var limit = game.ClubModel.getInstance().getLimit(this.data);
            if (limit) {
                var max = limit.max;
                for (var key in max) {
                    this[key + "MaxNum"].text = game.NumberUtil.getSplitNumStr(max[key]);
                }
                var min = limit.min;
                for (var key in min) {
                    this[key + "MinNum"].text = game.NumberUtil.getSplitNumStr(min[key]);
                }
            }
        };
        /** 获取我的下注 */
        PCMulitBaccItemUI1.prototype.showSureNum = function () {
            _super.prototype.showSureNum.call(this);
            var lastBet = game.BaccaratModel.getInstance().getLastBet(this.data);
            var num = 0;
            if (lastBet && typeof lastBet['banker'] == 'number') {
                num += lastBet['banker'];
                num += lastBet['tie'];
                num += lastBet['player'];
                num += lastBet['banker_pair'];
                num += lastBet['player_pair'];
            }
            if (num > 0) {
                this.betMsgText.text = game.NumberUtil.getSplitNumStr(num);
            }
            else {
                this.betMsgText.text = 0 + '';
            }
        };
        //----------------------筹码编辑区域-------------------------------
        /** 更新筹码列表 */
        PCMulitBaccItemUI1.prototype.setCustomChips = function (arr) {
            _super.prototype.setCustomChips.call(this, arr);
            if (arr && arr['length']) {
                this.setChips(arr);
            }
        };
        /** 隐藏或显示筹码编辑group
         * @param show {boolean} true - 显示筹码编辑group | false - 隐藏筹码编辑group
         */
        PCMulitBaccItemUI1.prototype.setEditGroup = function (show) {
            this.editChipsGroup.right = -540;
            this.editChipsGroup.visible = show;
            if (show) {
                game.CTween.get(this.editChipsGroup)
                    .to({ right: 0 }, 1000);
            }
            else {
                game.CTween.removeTweens(this.editChipsGroup);
            }
            this.groupMsg.visible = false;
            this.editChipBtn.touchEnabled = !show;
            this.chipSureBtn.touchEnabled = !show;
            this.chipSureBtn.setState = "disabled";
            for (var i = 0; i <= 2; i++) {
                this["chipBg" + i].alpha = 0.5;
            }
            if (show) {
                this.chipEdit0.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.editChipBtn.setState = "disabled";
            }
            else {
                this.setChips(this.userChips);
                this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.editChipBtn.setState = "up";
            }
        };
        /** 筹码编辑输入框响应 */
        PCMulitBaccItemUI1.prototype.onEditChange = function (evt) {
            this.chipSureBtn.touchEnabled = true;
            this.chipSureBtn.setState = "up";
            var index = [this.chipEdit0, this.chipEdit1, this.chipEdit2].indexOf(evt.currentTarget);
            if (index == -1) {
                return;
            }
            this["chipBg" + index].alpha = 1;
            var text = this["chipEdit" + index].text;
            text = text.replace(/[^\d.]/g, '');
            if (text.length > 9) {
                this["chipEdit" + index].text = this.tet;
            }
            else {
                this["chipEdit" + index].text = text;
                this.tet = text;
            }
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                var valid = this.checkInput(index);
                if (!valid) {
                    if (!text) {
                        this["chipEdit" + index].text = "0";
                    }
                    // let num = this.userChips[index] || this.roomChips[index];
                    // (this[`chipEdit${index}`] as eui.TextInput).text = num / 100 + "";
                }
                else {
                    this["chipEdit" + index].text = "" + +text;
                }
                this.chipSureBtn.enabled = valid;
            }
        };
        /** 设置用户筹码
         * @param chips {Array<number>} 筹码列表
         */
        PCMulitBaccItemUI1.prototype.setChips = function (chips) {
            this.roomChips = game.ClubModel.getInstance().getClubRoomsSetting(this.data).chips.slice();
            for (var i = 0; i < 3; i++) {
                if (chips[i]) {
                    this.userChips[i] = chips[i];
                }
                else {
                    this.userChips[i] = this.roomChips[i];
                }
            }
            for (var i = 0; i <= 2; i++) {
                var num = this.userChips[i];
                // || this.roomChips[i];
                this["chipEdit" + i].text = num / 100 + "";
                this["chipNum" + i].text = game.NumberUtil.getSplitNumStr(num, 3);
            }
            this.chipEdit0.textDisplay.textAlign = "center";
            this.chipEdit1.textDisplay.textAlign = "center";
            this.chipEdit2.textDisplay.textAlign = "center";
            this.chipEdit0.textDisplay.size = 20;
            this.chipEdit1.textDisplay.size = 20;
            this.chipEdit2.textDisplay.size = 20;
        };
        /** 筹码编辑输入框内容格式检查
         * @param index {number} 输入框编号
         */
        PCMulitBaccItemUI1.prototype.checkInput = function (index) {
            /** 当前输入框 */
            var inputLabel = this["chipEdit" + index];
            /** 当前输入框对应的筹码金额显示框 */
            var text = inputLabel.text;
            text = text.trim();
            var text2 = text.replace(/\b(0+)/gi, "");
            if (!text) {
                this.showChipsMsg("筹码金额不能为空");
                return false;
            }
            if (text == "0") {
                this.showChipsMsg("筹码配置须大于0");
                this["chipEdit" + index].text = this.userChips[index] / 100 + "";
                return false;
            }
            if (text.split(".")[0].length > 9) {
                this.showChipsMsg("最大只能输入9位整数和一位小数");
                return false;
            }
            return true;
        };
        /** 确认编辑筹码 */
        PCMulitBaccItemUI1.prototype.confirmEditChip = function () {
            var _this = this;
            var chips = [];
            for (var i = 0; i <= 2; i++) {
                var valid = this.checkInput(i);
                if (!valid) {
                    return;
                }
                var text = this["chipEdit" + i].text;
                var text2 = text.replace(/\b(0+)/gi, "");
                var num = Math.round(100 * +text2);
                chips[i] = this.userChips[i] || this.roomChips[i];
                if (!isNaN(num)) {
                    chips[i] = num;
                }
                else {
                    this.showChipsMsg("最大只能输入9位整数和一位小数");
                    this.chipSureBtn.setState = 'disabled';
                    this.chipSureBtn.enabled = false;
                    return;
                }
                if (text.split(".")[1] && text.split(".")[1].length > 1) {
                    this.showChipsMsg("最大只能输入9位整数和一位小数");
                    this["chipEdit" + i].textDisplay.setFocus();
                    return;
                }
            }
            game.BaccaratController.getInstance().setChips(this.data, chips).then(function () {
                game.BaccaratController.getInstance().getChips(_this.data).then(function (data) {
                    _this.setChips(data["chips"]);
                    _this.setEditGroup(false);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_Sidebar.name);
                });
            }).catch(function () {
                _this.showChipsMsg("编辑失败");
            });
        };
        /** 显示筹码编辑输入错误信息
         * @param msg {string} 错误信息
         */
        PCMulitBaccItemUI1.prototype.showChipsMsg = function (msg) {
            var _this = this;
            this.labelMsg.text = game.LanguageUtil.translate(msg);
            game.CTween.removeTweens(this.groupMsg);
            this.groupMsg.alpha = 1;
            this.groupMsg.visible = true;
            game.CTween.get(this.groupMsg).wait(1000).to({
                alpha: 0
            }, 2000).call(function () {
                _this.groupMsg.visible = false;
                _this.groupMsg.alpha = 1;
                game.CTween.removeTweens(_this.groupMsg);
            }, this);
        };
        /** 设置开局走势图 */
        PCMulitBaccItemUI1.prototype.setPolylineFuc = function () {
            var _this = this;
            var roundInfo = [];
            var roadMap = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadMap && roadMap.bead_road && roadMap.bead_road.length) {
                var beadRoad = roadMap.bead_road;
                var len = game.GlobalConfig.isMobile ? 15 : 20;
                len = Math.min(roadMap.bead_road.length, len);
                for (var i = roadMap.bead_road.length - len; i < roadMap.bead_road.length; i++) {
                    var icon = roadMap.bead_road[i].icon;
                    if (icon.indexOf("red") > -1) {
                        // 庄
                        roundInfo.push("B");
                    }
                    else if (icon.indexOf("blue") > -1) {
                        // 闲
                        roundInfo.push("P");
                    }
                    else if (icon.indexOf("green") > -1) {
                        // 和
                        roundInfo.push("T");
                    }
                }
            }
            this.setPolyline(roundInfo);
            if (this.lineInterVal) {
                clearInterval(this.lineInterVal);
            }
            this.lineInterVal = setInterval(function () {
                _this.setPolyline(roundInfo);
            }, 200);
        };
        /*----------------------------------------UI设置---------------------------------------------------------- */
        PCMulitBaccItemUI1.prototype.showJoin = function () {
            var tipData = new game.TipMsgInfo();
            tipData.msg = [
                { text: "你将退出多枱游戏，进入游戏房间。是否确认操作？", textColor: 0xFE0A00 }
            ];
            tipData.cancelText = "取消";
            tipData.confirmText = "确定";
            tipData.comfirmCallBack = this.comfirmCallBack;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        PCMulitBaccItemUI1.prototype.comfirmCallBack = function () {
            var _this = this;
            game.CommonLoadingUI.getInstance().start();
            game.BaccaratModel.getInstance().sendRoomEnter(this.data).then(function () {
                game.CommonLoadingUI.getInstance().stop();
                game.BaccaratController.getInstance().sendNotification(game.NotifyConst.Notify_LeftBar_SelectType, 0);
                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, _this.data);
            }).catch(function (e) {
                game.CommonLoadingUI.getInstance().stop();
                game.DebugUtil.error("", e);
            });
        };
        /** 显示或隐藏限额和走势图 */
        PCMulitBaccItemUI1.prototype.showLimitGroupFuc = function (type, isShow) {
            var _this = this;
            if (!type)
                return;
            this._isShow = isShow;
            game.CTween.removeTweens(this.mulitGroup);
            var groupp;
            if (type == 1)
                groupp = this.trendGroup;
            if (type == 2)
                groupp = this.limitGroup;
            if (isShow) {
                this.limitGroup.visible = type == 1 ? false : true;
                this.trendGroup.visible = type == 2 ? false : true;
                this.mulitGroup.visible = true;
                this.mulitGroup.x = -this.mulitGroup.width;
                game.CTween.get(this.mulitGroup).to({ x: 0 }, 500).call(function () {
                    game.CTween.removeTweens(_this.mulitGroup);
                });
            }
            else {
                this.mulitGroup.x = 0;
                game.CTween.get(this.mulitGroup).to({ x: -this.mulitGroup.width }, 500).call(function () {
                    game.CTween.removeTweens(_this.mulitGroup);
                    _this.mulitGroup.visible = false;
                    _this.limitGroup.visible = false;
                    _this.trendGroup.visible = false;
                });
            }
        };
        /** 显示我的派彩结果 */
        PCMulitBaccItemUI1.prototype.showMyPayOut = function (num) {
            _super.prototype.showMyPayOut.call(this, num);
            if (num > 0) {
                this['payOutNum'].text = game.NumberUtil.getSplitNumStr(num);
                this.showPayOutMove();
            }
            else {
                this['payOutNum'].text = 0 + '';
            }
        };
        /** 显示派彩动画 */
        PCMulitBaccItemUI1.prototype.showPayOutMove = function () {
            _super.prototype.showPayOutMove.call(this);
            this.payOutTxtGroup.visible = false;
            this.payOutTxtGroup.alpha = 0.01;
        };
        PCMulitBaccItemUI1.prototype.showChipMove = function (index) {
            _super.prototype.showChipMove.call(this, index);
            if (index == 7) {
                this.payOutTxtGroup.visible = true;
                game.CTween.get(this.payOutTxtGroup).to({ alpha: 1 }, 1000);
            }
        };
        /** 设置item序列号 */
        PCMulitBaccItemUI1.prototype.setIndexNum = function () {
            var arr = game.ClubModel.getInstance().multiRoomList;
            var index = arr.indexOf(this.data) + 1 + '';
            this['roomNumText'].text = index;
        };
        /** 更新下注区金额和显示动画 */
        PCMulitBaccItemUI1.prototype.updaBetNum = function (chipMonney, type, unMoney, isDealer) {
            if (isDealer === void 0) { isDealer = false; }
            if (!this.data)
                return;
            var stage = game.BaccaratModel.getInstance().getDesk(this.data).stage;
            if (stage != game.GameState.payout) {
                this.updataBtn(true);
            }
            _super.prototype.betUnSureNum.call(this, unMoney, type);
        };
        /** 弹出（红、绿）提示框 */
        PCMulitBaccItemUI1.prototype.showMsg = function (msg, color) {
            var group = this["msgGroup"];
            this["msgTxt"].text = msg;
            if (color == 'red') {
                this["msgTxt"].textColor = 0xfe0a00;
            }
            else {
                this["msgTxt"].textColor = 0x00a72f;
            }
            game.CTween.removeTweens(group);
            group.alpha = 1;
            group.visible = true;
            game.CTween.get(group).wait(1000).to({ alpha: 0 }, 2000).call(function () {
                group.visible = false;
                game.CTween.removeTweens(group);
            });
        };
        /** 绘制下注区百分比圆弧  */
        PCMulitBaccItemUI1.prototype.shepClicle = function (color, numberPercent, lineColor) {
            if (this[color + "Clicle"]) {
                this[color + "Clicle"].graphics.clear();
            }
            else {
                this[color + "Clicle"] = new egret.Shape;
            }
            if (isNaN(numberPercent) || numberPercent <= 0) {
                this[color + "Clicle"].graphics.clear();
                return;
            }
            var colorClicle = this[color + "Clicle"];
            colorClicle.graphics.lineStyle(3, lineColor);
            var r = this[color + "PercentGroup"].width / 2;
            colorClicle.graphics.drawArc(r, r, r - 5, Math.PI / 180 * -90, Math.PI / 180 * (360 / 100 * numberPercent - 90), false);
            //shep有BUG要画点其他东西才能画出圆弧
            colorClicle.graphics.moveTo(0, 0);
            this[color + "PercentGroup"].addChild(colorClicle);
        };
        /** 切换发牌区的图片显示 */
        PCMulitBaccItemUI1.prototype.toggleDeaCardImg = function () {
            _super.prototype.toggleDeaCardImg.call(this);
            this['playPayImg'].source = 'multipledesk_pic_blue2_pc_png';
            this['bankerPayImg'].source = 'multipledesk_pic_red2_pc_png';
            this['bankerPayImg'].scaleX = 1;
        };
        /** 游戏结果 */
        PCMulitBaccItemUI1.prototype.gameResults = function (score) {
            if (!score)
                return;
            _super.prototype.gameResults.call(this, score);
            var player = score.player;
            var banker = score.banker;
            var results = [];
            if (player > banker) {
                results.push('player');
            }
            else if (player < banker) {
                results.push('banker');
            }
            if (score.player_pair)
                results.push('player_pair');
            if (score.tie)
                results.push('tie');
            if (score.banker_pair)
                results.push('banker_pair');
            if (results.indexOf('player') != -1) {
                this['bankerPayImg'].source = 'multipledesk_pic_gray2_pc_png';
                this['bankerPayImg'].scaleX = -1;
                this['playPayImg'].source = 'multipledesk_pic_blue2_pc_png';
            }
            if (results.indexOf('banker') != -1) {
                this['playPayImg'].source = 'multipledesk_pic_gray2_pc_png';
                this['bankerPayImg'].source = 'multipledesk_pic_red2_pc_png';
                this['bankerPayImg'].scaleX = 1;
            }
            if (results.indexOf('tie') != -1) {
                this['playPayImg'].source = 'multipledesk_pic_gray2_pc_png';
                this['bankerPayImg'].source = 'multipledesk_pic_gray2_pc_png';
                this['bankerPayImg'].scaleX = -1;
            }
        };
        /** 设置房间局数走势
         * @param roundInfo {Array<string>} P - player | B - banker | T - tie
         */
        PCMulitBaccItemUI1.prototype.setPolyline = function (roundInfo) {
            if (!this.polyline) {
                this.polyline = new egret.Shape();
                this.groupLine.addChild(this.polyline);
            }
            this.polyline.graphics.clear();
            var count = game.GlobalConfig.isMobile ? 15 : 20;
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
        /**初始化路书*/
        PCMulitBaccItemUI1.prototype.initRoadMap = function () {
            this.bead_roadMap = new game.RoadMap(this.bead_road.width, this.bead_road.height, game.RoadMap.BeadRoad, 34);
            this.bead_road.addChild(this.bead_roadMap);
            this.big_roadMap = new game.RoadMap(this.big_road.width, this.big_road.height, game.RoadMap.BigRoad, 34 / 2);
            this.big_road.addChild(this.big_roadMap);
            this.big_eye_roadMap = new game.RoadMap(this.big_eye_road.width, this.big_eye_road.height, game.RoadMap.BigEyeRoad, 34 / 2);
            this.big_eye_road.addChild(this.big_eye_roadMap);
            this.small_roadMap = new game.RoadMap(this.small_road.width, this.small_road.height, game.RoadMap.SmallRoad, 34 / 2);
            this.small_road.addChild(this.small_roadMap);
            this.cockroach_roadMap = new game.RoadMap(this.cockroach_road.width, this.cockroach_road.height, game.RoadMap.CockRoachRoad, 34 / 2);
            this.cockroach_road.addChild(this.cockroach_roadMap);
            this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
            this.roadBgImg.height = this.bead_roadMap.rectH;
        };
        // /** 设置宽高 */
        // public setContenWH(): void
        // {
        //     this.roadMapWidth();
        //     this.bead_roadMap.setWidth(this.bead_road.width);
        //     this.big_roadMap.setWidth(this.big_road.width, 34 / 2);
        //     this.big_eye_roadMap.setWidth(this.big_eye_road.width, 34 / 2);
        //     this.small_roadMap.setWidth(this.small_road.width, 34 / 2);
        //     this.cockroach_roadMap.setWidth(this.small_road.width, 34 / 2);
        //     this.setXY();
        //     this.drawShp();
        //     this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
        //     this.roadBgImg.height = this.bead_roadMap.rectH;
        // }
        /** 计算路数宽度 */
        PCMulitBaccItemUI1.prototype.roadMapWidth = function () {
            this.bead_road.width = Math.floor(this.roadMap.width / this.unit / 3) * this.unit;
            this.big_road.width = this.bead_road.width * 2;
            this.big_eye_road.width = this.big_road.width;
            this.small_road.width = this.big_road.width / 2;
            this.cockroach_road.width = this.big_road.width / 2;
            if (Math.floor((this.roadMap.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 1) {
                this.bead_road.width += this.unit;
            }
            else if (Math.floor((this.roadMap.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 2) {
                this.bead_road.width += this.unit;
                this.big_road.width += this.unit;
                this.big_eye_road.width += this.unit;
                this.small_road.width += (this.unit / 2);
                this.cockroach_road.width += (this.unit / 2);
            }
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        PCMulitBaccItemUI1.prototype.onRemove = function () {
            if (this.lineInterVal) {
                clearInterval(this.lineInterVal);
            }
            game.CTween.removeTweens(this.mulitGroup);
        };
        return PCMulitBaccItemUI1;
    }(game.MulitBaccBaseItemUI));
    game.PCMulitBaccItemUI1 = PCMulitBaccItemUI1;
    __reflect(PCMulitBaccItemUI1.prototype, "game.PCMulitBaccItemUI1");
})(game || (game = {}));
//# sourceMappingURL=PCMulitBaccItemUI1.js.map