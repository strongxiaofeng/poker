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
    var AnnouncementListUI = (function (_super) {
        __extends(AnnouncementListUI, _super);
        function AnnouncementListUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "announcement/announcementListSkin.exml";
            return _this;
        }
        AnnouncementListUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.ac = new eui.ArrayCollection();
            this.announceList.itemRenderer = game.AnnounceListItem;
            this.announceList.dataProvider = this.ac;
            this.initListener();
        };
        AnnouncementListUI.prototype.initListener = function () {
            this.registerEvent(this.btn_addAnnounce, egret.TouchEvent.TOUCH_TAP, this.clickAddAnno, this);
            if (game.GlobalConfig.isMobile)
                this.registerEvent(this.btn_addRoomCard, egret.TouchEvent.TOUCH_TAP, this.clickAddRoomCard, this);
        };
        /**添加房卡 */
        AnnouncementListUI.prototype.clickAddRoomCard = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            game.DebugUtil.debug("添加房卡");
        };
        /**点击了 添加公告 */
        AnnouncementListUI.prototype.clickAddAnno = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            game.MediatorManager.openMediator(game.Mediators.Mediator_AddAnnounce);
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        AnnouncementListUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case AnnounceCommands.announceList:
                    this.updateList(params);
                    break;
            }
        };
        AnnouncementListUI.prototype.updateList = function (data) {
            var announcements = data.announcements;
            this.updateAnnounceCount(announcements.length);
            if (announcements.length > 10) {
                announcements = announcements.slice(0, 10);
            }
            this.ac.removeAll();
            if (announcements.length > 0) {
                for (var i = 0; i < announcements.length; i++) {
                    this.ac.addItem(announcements[i]);
                }
            }
            this.ac.refresh();
        };
        /**刷新公告数量 */
        AnnouncementListUI.prototype.updateAnnounceCount = function (n) {
            if (!game.GlobalConfig.isMobile)
                return;
            n = n > 0 ? n : 0;
            this.announceCountTxt.text = game.LanguageUtil.translate("founder_lbl_notice_count_nubmers") + "：" + n;
        };
        /**刷新房卡数量 */
        AnnouncementListUI.prototype.updateRoomCardCount = function (n) {
            if (!game.GlobalConfig.isMobile)
                return;
            n = n > 0 ? n : 0;
            this.roomCardCountTxt.text = game.LanguageUtil.translate("global_lbl_room_card") + n;
        };
        AnnouncementListUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return AnnouncementListUI;
    }(game.BaseUI));
    game.AnnouncementListUI = AnnouncementListUI;
    __reflect(AnnouncementListUI.prototype, "game.AnnouncementListUI");
})(game || (game = {}));
//# sourceMappingURL=AnnouncementListUI.js.map