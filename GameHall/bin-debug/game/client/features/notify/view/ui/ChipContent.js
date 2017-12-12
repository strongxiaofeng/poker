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
    var ChipContent = (function (_super) {
        __extends(ChipContent, _super);
        function ChipContent() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/ChipAskContent.exml";
            ;
            return _this;
        }
        ChipContent.prototype.initSetting = function () {
            this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.registerEvent(this.goBackBtn, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        ChipContent.prototype.onTap = function (e) {
            switch (e.target) {
                case this.goBackBtn:
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_ChipContent.name);
                    break;
                case this.cancelBtn:
                    game.NotifyController.getInstance().isAllowChipAsk(this.message_id, false);
                    this.resultTxt.visible = true;
                    this.cancelBtn.visible = false;
                    this.confirmBtn.visible = false;
                    this.resultTxt.text = "已拒绝";
                    break;
                case this.confirmBtn:
                    var tipData = new game.TipMsgInfo();
                    tipData.msg = [
                        { text: game.LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
                        { text: this.msg.sender_nickname, textColor: enums.ColorConst.White },
                        { text: "  " + game.LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
                        { text: this.msg.sender_name + "\n", textColor: enums.ColorConst.White },
                        { text: game.LanguageUtil.translate("founder_lbl_assignment_type"), textColor: enums.ColorConst.Golden },
                        { text: "增加", textColor: enums.ColorConst.White },
                        { text: "  " + game.LanguageUtil.translate("founder_lbl_assignment_quantity"), textColor: enums.ColorConst.Golden },
                        { text: this.msg.chip_amount / 100, textColor: enums.ColorConst.White },
                    ];
                    tipData.confirmText = "确认";
                    tipData.cancelText = "取消";
                    tipData.comfirmCallBack = this.comfirmCallBack;
                    tipData.cancelCallBack = this.cancelCallBack;
                    tipData.thisObj = this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    break;
            }
        };
        ChipContent.prototype.cancelCallBack = function () {
        };
        ChipContent.prototype.comfirmCallBack = function () {
            game.NotifyController.getInstance().isAllowChipAsk(this.message_id, true);
            this.resultTxt.visible = true;
            this.cancelBtn.visible = false;
            this.confirmBtn.visible = false;
            this.resultTxt.text = "已同意";
        };
        /**收到miditor的通知*/
        ChipContent.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.initData:
                    // console.warn(params);
                    this.msg = params;
                    this.contentTxt.text = params.detail;
                    var date = new Date(params.create_time);
                    this.timeTxt.text = game.NumberUtil.formatDate(date, 3);
                    var bool = params.message_status == "waiting";
                    this.resultTxt.visible = !bool;
                    this.cancelBtn.visible = bool;
                    this.confirmBtn.visible = bool;
                    this.message_id = params.message_id;
                    switch (params.message_status) {
                        case "waiting":
                            break;
                        case "allowed":
                            this.resultTxt.text = "已同意";
                            break;
                        case "refused":
                            this.resultTxt.text = "已拒绝";
                            break;
                    }
                    this.isOwner(params.sender_id != +game.PersonalInfoModel.getInstance().user_id);
                    break;
            }
        };
        ChipContent.prototype.isOwner = function (flag) {
            if (flag === void 0) { flag = false; }
            if (flag) {
                this.timeTxt.bottom = 166;
            }
            else {
                this.timeTxt.bottom = 40;
                this.cancelBtn.visible = false;
                this.confirmBtn.visible = false;
                this.resultTxt.visible = false;
            }
        };
        return ChipContent;
    }(game.BaseUI));
    game.ChipContent = ChipContent;
    __reflect(ChipContent.prototype, "game.ChipContent");
})(game || (game = {}));
//# sourceMappingURL=ChipContent.js.map