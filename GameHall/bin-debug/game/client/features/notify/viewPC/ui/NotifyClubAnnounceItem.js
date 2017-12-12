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
    /**俱乐部公告列表的item */
    var NotifyClubAnnounceItem = (function (_super) {
        __extends(NotifyClubAnnounceItem, _super);
        function NotifyClubAnnounceItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyItem_clubMsg.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        NotifyClubAnnounceItem.prototype.onAdd = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        NotifyClubAnnounceItem.prototype.dataChanged = function () {
            var _this = this;
            var data = this.data;
            this.titleTxt.text = data.club_name + "";
            this.contentTxt.text = data.name;
            this.dateTxt.text = game.NumberUtil.formatDate(new Date(data.time));
            this.newImg.visible = !data.is_read;
            this.setSelect(data.isSelect);
            //图标
            game.ClubController.getInstance().getClub(data.club_id + "").then(function (resp) {
                console.log("请求俱乐部信息获取头像 ", resp);
                resp.img;
                com.LoadManager.getInstance().getResByUrl(game.GlobalConfig.defaultUrl + resp.img, function (t) {
                    if (t) {
                        _this.headImg.source = t;
                        _this.headImg.mask = _this.head_default;
                    }
                    else {
                        _this.headImg.mask = null;
                        _this.head_default.visible = true;
                    }
                }, _this, com.ResourceItem.TYPE_IMAGE);
            }).catch(function (err) {
                game.DebugUtil.error("", err);
            });
        };
        /**设置选中样式 */
        NotifyClubAnnounceItem.prototype.setSelect = function (b) {
            this.selectedBg.visible = b;
            this.titleTxt.textColor = b ? 0x000000 : 0xC0C0C0;
            this.contentTxt.textColor = b ? 0x000000 : 0xC0C0C0;
            this.dateTxt.textColor = b ? 0x000000 : 0xC0C0C0;
        };
        NotifyClubAnnounceItem.prototype.setSelectById = function (id) {
            if (id == this.data.id) {
                this.setSelect(true);
            }
            else {
                this.setSelect(false);
            }
        };
        NotifyClubAnnounceItem.prototype.onTap = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.newImg.visible = false;
            game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectClubAnnounce, this.data.id);
            game.AnnounceController.getInstance().getAnnounceDetail(this.data.id + "");
        };
        NotifyClubAnnounceItem.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        return NotifyClubAnnounceItem;
    }(eui.ItemRenderer));
    game.NotifyClubAnnounceItem = NotifyClubAnnounceItem;
    __reflect(NotifyClubAnnounceItem.prototype, "game.NotifyClubAnnounceItem");
})(game || (game = {}));
//# sourceMappingURL=NotifyClubAnnounceItem.js.map