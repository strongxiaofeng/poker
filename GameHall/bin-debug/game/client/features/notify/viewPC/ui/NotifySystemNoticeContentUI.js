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
    /**系统消息内容界面 */
    var NotifySystemNoticeContentUI = (function (_super) {
        __extends(NotifySystemNoticeContentUI, _super);
        function NotifySystemNoticeContentUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyContent.exml";
            return _this;
        }
        NotifySystemNoticeContentUI.prototype.initSetting = function () {
            this.titleTxt.text = "系统消息的标题";
            this.contentTxt.text = "系统消息的内容";
            this.timeTxt.text = "2017/09/01  20:53";
            this.initListener();
        };
        NotifySystemNoticeContentUI.prototype.initListener = function () {
            this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
        };
        NotifySystemNoticeContentUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.showContent:
                    this.updateData(params);
                    break;
            }
        };
        NotifySystemNoticeContentUI.prototype.updateData = function (info) {
            this.titleTxt.text = info.title;
            this.contentTxt.text = info.content;
            var date = new Date(info.publish_time);
            this.timeTxt.text = game.NumberUtil.formatDate(date, 2);
        };
        NotifySystemNoticeContentUI.prototype.clickClose = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifySystemNoticeContentMediatorPC.name);
        };
        NotifySystemNoticeContentUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return NotifySystemNoticeContentUI;
    }(game.BaseUI));
    game.NotifySystemNoticeContentUI = NotifySystemNoticeContentUI;
    __reflect(NotifySystemNoticeContentUI.prototype, "game.NotifySystemNoticeContentUI");
})(game || (game = {}));
//# sourceMappingURL=NotifySystemNoticeContentUI.js.map