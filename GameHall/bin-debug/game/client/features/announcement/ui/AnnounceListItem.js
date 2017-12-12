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
    var AnnounceListItem = (function (_super) {
        __extends(AnnounceListItem, _super);
        function AnnounceListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "announcement/announceListItem.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        AnnounceListItem.prototype.onAdd = function () {
            this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelete, this);
        };
        AnnounceListItem.prototype.onRemove = function () {
            this.btn_delete.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelete, this);
        };
        /**删除这条公告 */
        AnnounceListItem.prototype.onDelete = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var tipData = new game.TipMsgInfo();
            tipData.msg = [{ text: game.LanguageUtil.translate("founder_lbl_remove_notice_tips"), textColor: enums.ColorConst.Golden }];
            tipData.cancelText = "global_btn_cancel_text";
            tipData.confirmText = "login_btn_confirm";
            tipData.comfirmCallBack = this.sureDelete;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        AnnounceListItem.prototype.sureDelete = function () {
            game.AnnounceController.getInstance().deleteAnnouncement(this.data.id);
        };
        AnnounceListItem.prototype.dataChanged = function () {
            this.left = 0;
            this.right = 0;
            var data = this.data;
            this.label_title.text = game.StringUtil.sliceByLen2(data.title, 32);
            var date = new Date();
            date.setTime(data.publish_time);
            this.label_date.text = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        };
        return AnnounceListItem;
    }(eui.ItemRenderer));
    game.AnnounceListItem = AnnounceListItem;
    __reflect(AnnounceListItem.prototype, "game.AnnounceListItem");
})(game || (game = {}));
//# sourceMappingURL=AnnounceListItem.js.map