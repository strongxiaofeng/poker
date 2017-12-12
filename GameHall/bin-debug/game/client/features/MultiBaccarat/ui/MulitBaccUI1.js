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
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    var MultiBaccUI1 = (function (_super) {
        __extends(MultiBaccUI1, _super);
        function MultiBaccUI1(isGuide) {
            if (isGuide === void 0) { isGuide = false; }
            var _this = _super.call(this, isGuide) || this;
            _this.roomChips = [];
            _this.userChips = [];
            return _this;
        }
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        MultiBaccUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            _super.prototype.onMediatorCommand.call(this, type, params);
            switch (type) {
                // 用户名
                case MultiBaccUICommands.MultiBaccNotify_userName:
                    this.userName.text = params;
                    break;
                // 余额
                case MultiBaccUICommands.MultiBaccNotify_userBalance:
                    this.userBalance.text = game.NumberUtil.getSplitNumStr(params);
                    break;
                case MultiBaccUICommands.MultiBaccNotify_editChips:
                    this.data = params;
                    this.setEditGroup(true);
                    break;
            }
        };
        /** 初始化事件 */
        MultiBaccUI1.prototype.initListener = function () {
            _super.prototype.initListener.call(this);
            // // 输入框change事件
            // this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            // this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            // this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
        };
        /* 点击响应事件 */
        MultiBaccUI1.prototype.onTouchBtn = function (evt) {
            _super.prototype.onTouchBtn.call(this, evt);
            switch (evt.target) {
                case this.goBackBtn:
                    game.BaccaratController.getInstance().sendMultiClubLeave();
                    game.MediatorManager.openMediator(game.Mediators.Mediator_ClubGames);
                    // BaccaratModel.getInstance().sendRoomLeave(this.data);
                    break;
                case this.btnConfirm:
                    this.confirmEditChip();
                    break;
                case this.btnCancel:
                    this.setEditGroup(false);
                    this.setChips([]);
                    break;
                case this['assetBtn']:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_AssetDetail, game.AssetDetailOpenType.GameRoom);
                    break;
                case this.topMulitBtn:
                    this.ruleGroup.visible = !this.ruleGroup.visible;
                    break;
                case this.ruleBtn:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_GameRule, game.GameType.baccarat);
                    this.ruleGroup.visible = false;
                    break;
                case this.sysSettingBtn:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_SystemSet, "inGame");
                    break;
                case this.smsBtn:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_Notify);
                    this.ruleGroup.visible = false;
                    break;
            }
        };
        /** 是否显示列表为空 */
        MultiBaccUI1.prototype.showListMsg = function (b) {
            if (b) {
                this.label_HaveNothing.visible = true;
            }
            else {
                this.label_HaveNothing.visible = false;
            }
        };
        /** 筹码编辑输入框响应 */
        MultiBaccUI1.prototype.onEditChange = function (evt) {
            this.btnConfirm.touchEnabled = true;
            this.btnConfirm.setState = "up";
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
                this.btnConfirm.enabled = valid;
            }
        };
        /** 设置用户筹码
         * @param chips {Array<number>} 筹码列表
         */
        MultiBaccUI1.prototype.setChips = function (chips) {
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
            this.chipEdit0.textDisplay.size = 40;
            this.chipEdit1.textDisplay.size = 40;
            this.chipEdit2.textDisplay.size = 40;
        };
        /** 隐藏或显示筹码编辑group
         * @param show {boolean} true - 显示筹码编辑group | false - 隐藏筹码编辑group
         */
        MultiBaccUI1.prototype.setEditGroup = function (show) {
            var _this = this;
            // this['imgBgd'].visible = show;
            // this.groupChip.visible = show;
            game.CTweenManagerController.getInstance().startCTween(1, [this.goupOut, this.groupChip], show);
            this.btnConfirm.enabled = !show;
            this.btnConfirm.setState = "disabled";
            this.groupMsg.visible = false;
            for (var i = 0; i <= 2; i++) {
                this["chipBg" + i].alpha = 0.5;
            }
            if (show) {
                this.chipEdit0.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.addEventListener(egret.Event.CHANGE, this.onEditChange, this);
            }
            else {
                this.chipEdit0.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit1.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
                this.chipEdit2.removeEventListener(egret.Event.CHANGE, this.onEditChange, this);
            }
            game.BaccaratController.getInstance().getChips(this.data).then(function (data) {
                _this.setChips(data["chips"]);
            }).catch(function () {
                _this.setChips([]);
            });
        };
        /** 筹码编辑输入框内容格式检查
         * @param index {number} 输入框编号
         */
        MultiBaccUI1.prototype.checkInput = function (index) {
            /** 当前输入框 */
            var inputLabel = this["chipEdit" + index];
            /** 当前输入框对应的筹码金额显示框 */
            var text = inputLabel.text;
            text = text.trim();
            var text2 = text.replace(/\b(0+)/gi, "");
            if (!text) {
                this.showMsg("筹码金额不能为空");
                return false;
            }
            if (text == "0") {
                this.showMsg("筹码配置须大于0");
                this["chipEdit" + index].text = this.userChips[index] / 100 + "";
                return false;
            }
            if (text.split(".")[0].length > 9) {
                this.showMsg("最大只能输入9位整数和一位小数");
                return false;
            }
            return true;
        };
        /** 确认编辑筹码 */
        MultiBaccUI1.prototype.confirmEditChip = function () {
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
                    this.showMsg("最大只能输入9位整数和一位小数");
                    return;
                }
                if (text.split(".")[1] && text.split(".")[1].length > 1) {
                    this.showMsg("最大只能输入9位整数和一位小数");
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
                _this.showMsg("编辑失败");
            });
        };
        /** 显示筹码编辑输入错误信息
         * @param msg {string} 错误信息
         */
        MultiBaccUI1.prototype.showMsg = function (msg) {
            this.labelMsg.text = game.LanguageUtil.translate(msg);
            game.CTween.removeTweens(this.groupMsg);
            this.groupMsg.alpha = 1;
            this.groupMsg.visible = true;
            // CTween.get(this.groupMsg).wait(1000).to({
            //     alpha: 0
            // }, 2000).call(() =>
            // {
            //     this.groupMsg.visible = false;
            //     this.groupMsg.alpha = 1;
            // }, this);
            game.CTweenManagerController.getInstance().startCTween(2, [this.groupMsg]);
        };
        /** 有房间成功下注显示的通知 */
        MultiBaccUI1.prototype.showOkeyBetMsg = function (msgArr) {
            var _this = this;
            if (msgArr && msgArr['length']) {
                var msg = '';
                if (msgArr[0] == 'payout') {
                    msg = game.ClubModel.getInstance().getRoomName(msgArr[2]) + "\u6D3E\u5F69\uFF1A" + game.NumberUtil.getSplitNumStr(msgArr[1], 3);
                }
                if (msgArr[0] == 'bet') {
                    msg = game.ClubModel.getInstance().getRoomName(msgArr[2]) + "\u4E0B\u6CE8\uFF1A" + game.NumberUtil.getSplitNumStr(msgArr[1], 3);
                }
                game.CTween.removeTweens(this.topMsg);
                this.topMsg.text = msg;
                this.topMsg.y = 90;
                game.CTween.get(this.topMsg).to({ y: -this.topMsg.height }, 1000).call(function () {
                    _this.topMsg.y = 28;
                });
            }
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        MultiBaccUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.CTweenManagerController.getInstance().endAllCTween();
        };
        return MultiBaccUI1;
    }(game.MultiBaccBaseUI));
    game.MultiBaccUI1 = MultiBaccUI1;
    __reflect(MultiBaccUI1.prototype, "game.MultiBaccUI1");
})(game || (game = {}));
//# sourceMappingURL=MulitBaccUI1.js.map