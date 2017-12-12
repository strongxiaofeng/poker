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
    var AskChip = (function (_super) {
        __extends(AskChip, _super);
        function AskChip() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/AskChip.exml";
            return _this;
        }
        AskChip.prototype.initSetting = function () {
            this.registerEvent(this.btnCancel, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.registerEvent(this.btnConfirm, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.registerEvent(this.labelEditChip, egret.Event.CHANGE, this.onChange, this);
        };
        AskChip.prototype.onTap = function (e) {
            switch (e.target) {
                case this.btnCancel:
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_AskChip.name);
                    break;
                case this.btnConfirm:
                    var count = parseInt(this.labelEditChip.text);
                    if (count > 0) {
                        game.NotifyController.getInstance().askChip(this.club_id, count * 100);
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_AskChip.name);
                    }
                    else {
                        this.redMsgGroup.visible = true;
                        game.CTween.get(this.redMsgGroup).wait(500).to({ visible: false }, 500);
                    }
                    break;
            }
        };
        AskChip.prototype.onChange = function (e) {
            this.btnConfirm.enabled = this.labelEditChip.text.length > 0;
        };
        /**收到miditor的通知*/
        AskChip.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.initData:
                    this.club_id = params;
                    break;
            }
        };
        AskChip.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btnConfirm.enabled = false;
            this.labelEditChip.text = "";
        };
        return AskChip;
    }(game.BaseUI));
    game.AskChip = AskChip;
    __reflect(AskChip.prototype, "game.AskChip");
})(game || (game = {}));
//# sourceMappingURL=AskChip.js.map