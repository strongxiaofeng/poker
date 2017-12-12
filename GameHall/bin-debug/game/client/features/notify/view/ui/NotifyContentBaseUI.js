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
    var NotifyContentBaseUI = (function (_super) {
        __extends(NotifyContentBaseUI, _super);
        function NotifyContentBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyContent.exml";
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        NotifyContentBaseUI.prototype.initSetting = function () {
            this.titleTxt.text = "";
            this.contentTxt.text = "";
        };
        /**收到miditor的通知*/
        NotifyContentBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.showContent:
                    this.showContent(params);
                    break;
                case game.NotifyCommands.changeTopName:
                    this.changeTopName(params);
                    break;
            }
        };
        NotifyContentBaseUI.prototype.changeTopName = function (str) {
            this.clubName.text = str;
            this.registerEvent(this.goBackBtn, egret.TouchEvent.TOUCH_TAP, this.onGoBack, this);
        };
        NotifyContentBaseUI.prototype.onGoBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyContent.name);
        };
        NotifyContentBaseUI.prototype.showContent = function (info) {
            this.titleTxt.text = info.title;
            this.contentTxt.text = info.content;
            var date = new Date(info.publish_time);
            this.timeTxt.text = game.NumberUtil.formatDate(date, 3);
        };
        return NotifyContentBaseUI;
    }(game.BaseUI));
    game.NotifyContentBaseUI = NotifyContentBaseUI;
    __reflect(NotifyContentBaseUI.prototype, "game.NotifyContentBaseUI");
})(game || (game = {}));
//# sourceMappingURL=NotifyContentBaseUI.js.map