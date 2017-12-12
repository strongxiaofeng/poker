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
    /**系统消息列表的item */
    var NotifySystemNoticeItem = (function (_super) {
        __extends(NotifySystemNoticeItem, _super);
        function NotifySystemNoticeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyItem_systemMsg.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        NotifySystemNoticeItem.prototype.onAdd = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        NotifySystemNoticeItem.prototype.dataChanged = function () {
            console.log("系统消息item datachanged");
            var data = this.data;
            this.contentTxt.text = data.name;
            this.dateTxt.text = game.NumberUtil.formatDate(new Date(data.time));
            this.newImg.visible = !data.is_read;
            this.setSelect(data.isSelect);
        };
        /**设置选中样式 */
        NotifySystemNoticeItem.prototype.setSelect = function (b) {
            this.selectedBg.visible = b;
            this.contentTxt.textColor = b ? 0x000000 : 0xC0C0C0;
            this.dateTxt.textColor = b ? 0x000000 : 0xC0C0C0;
        };
        NotifySystemNoticeItem.prototype.setSelectById = function (id) {
            if (id == this.data.id) {
                this.setSelect(true);
            }
            else {
                this.setSelect(false);
            }
        };
        NotifySystemNoticeItem.prototype.onTap = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.newImg.visible = false;
            game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectSysMsg, this.data.id);
            game.NotifyController.getInstance().getSystemDetail(this.data.id);
        };
        NotifySystemNoticeItem.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        return NotifySystemNoticeItem;
    }(eui.ItemRenderer));
    game.NotifySystemNoticeItem = NotifySystemNoticeItem;
    __reflect(NotifySystemNoticeItem.prototype, "game.NotifySystemNoticeItem");
})(game || (game = {}));
//# sourceMappingURL=NotifySystemNoticeItem.js.map