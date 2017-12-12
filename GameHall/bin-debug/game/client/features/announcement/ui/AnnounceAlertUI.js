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
    var AnnounceAlertUI = (function (_super) {
        __extends(AnnounceAlertUI, _super);
        function AnnounceAlertUI(alerts) {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "announcement/announceAlert.exml";
            _this.alerts = alerts;
            _this.nextAlert();
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        AnnounceAlertUI.prototype.initSetting = function () {
            this.initListener();
            this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
            // CTweenManagerController.getInstance().startCTween(1,[this.announceGroup,this.alertGroup]); 
        };
        AnnounceAlertUI.prototype.initListener = function () {
            this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.nextAlert, this);
        };
        AnnounceAlertUI.prototype.nextAlert = function () {
            var _this = this;
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (this.alerts.length > 0) {
                var data = this.alerts.pop();
                var date = new Date();
                date.setTime(data.publish_time);
                this.titleTxt.text = data.title;
                this.contenteTxt.text = data.content;
                this.timeTxt.text = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes();
                egret.callLater(function () {
                    _this.contentGroup.height = _this.contenteTxt.textHeight;
                }, this);
            }
            else {
                // CTweenManagerController.getInstance().startCTween(1,[this.announceGroup,this.alertGroup],false,()=>{
                game.MediatorManager.closeMediator(game.Mediators.Mediator_AnnounceAlertMediator.name);
                // },this);
            }
        };
        AnnounceAlertUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.CTweenManagerController.getInstance().endAllCTween();
        };
        return AnnounceAlertUI;
    }(game.BaseUI));
    game.AnnounceAlertUI = AnnounceAlertUI;
    __reflect(AnnounceAlertUI.prototype, "game.AnnounceAlertUI");
})(game || (game = {}));
//# sourceMappingURL=AnnounceAlertUI.js.map