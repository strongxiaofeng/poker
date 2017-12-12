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
    var NotifyPopBaseUI = (function (_super) {
        __extends(NotifyPopBaseUI, _super);
        function NotifyPopBaseUI() {
            var _this = _super.call(this) || this;
            /**最后一条消息，字符长度超过这个长度，就省略后面的 */
            _this.constNum = 24;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyPopSkin.exml";
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        NotifyPopBaseUI.prototype.initSetting = function () {
            this.group.y = -250;
            this.visible = false;
            // this.touchChildren = false;
        };
        /**收到miditor的通知*/
        NotifyPopBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.showContent:
                    this.type = params.type;
                    this.id = params.id;
                    this.club_id = params.club_id;
                    this.visible = true;
                    this.showContent(params.head, params.title);
                    break;
                case game.NotifyCommands.showHead:
                    this.showHead(params);
                    break;
            }
        };
        NotifyPopBaseUI.prototype.onTap = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var data = new game.NotifyItemData();
            data.type = this.type;
            data.id = this.id;
            data.club_id = this.club_id;
            this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            switch (this.type) {
                case 1:
                case 2:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyContent, data);
                    break;
                case 3:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyChat, data);
                    break;
            }
        };
        NotifyPopBaseUI.prototype.onComplete = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyPop.name);
            this.visible = false;
            this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        NotifyPopBaseUI.prototype.showHead = function (head) {
            this.typeTxt.text = head;
        };
        NotifyPopBaseUI.prototype.showContent = function (head, title) {
            this.typeTxt.text = head;
            if (game.StringUtil.getStrLen(title) > this.constNum) {
                this.titleTxt.text = game.StringUtil.sliceByLen(title, this.constNum, 0) + "...";
            }
            else {
                this.titleTxt.text = title;
            }
            game.CTween.get(this.group).to({ y: 0 }, 1000, egret.Ease.backOut).wait(2000).to({ y: -250 }, 500).call(this.onComplete, this);
            this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            // this.registerEvent(this,egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        };
        return NotifyPopBaseUI;
    }(game.BaseUI));
    game.NotifyPopBaseUI = NotifyPopBaseUI;
    __reflect(NotifyPopBaseUI.prototype, "game.NotifyPopBaseUI");
})(game || (game = {}));
//# sourceMappingURL=NotifyPopBaseUI.js.map