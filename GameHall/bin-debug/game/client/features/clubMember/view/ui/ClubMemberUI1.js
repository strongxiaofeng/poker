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
    var ClubMemberUI1 = (function (_super) {
        __extends(ClubMemberUI1, _super);
        function ClubMemberUI1() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        ClubMemberUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.groupUser.visible = false;
            this.labelNoUser.visible = true;
            this.labelNotExist.visible = false;
            this.imgInputActive.visible = false;
            this.listArr = new eui.ArrayCollection();
            this.listUser.itemRenderer = game.ClubMemberItem;
            this.listUser.dataProvider = this.listArr;
            this.scrollerUser.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.btnAllPlayer.setState = "down";
            this.btnLockedPlayer.setState = "up";
            this.addChild(this.groupUser);
            this.labelSearch.prompt = game.LanguageUtil.translate("founder_lbl_input_tips");
            // state
            this.setPageState(true);
        };
        ClubMemberUI1.prototype.initListener = function (mediator) {
            _super.prototype.initListener.call(this, mediator);
            this.registerEvent(this.btnSearch, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnAllPlayer, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnLockedPlayer, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnAdd, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnReduce, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnCancel, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnConfirm, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        };
        // ---------------------------------- dispose ----------------------------------
        ClubMemberUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ClubMemberUI1;
    }(game.ClubMemberBaseUI));
    game.ClubMemberUI1 = ClubMemberUI1;
    __reflect(ClubMemberUI1.prototype, "game.ClubMemberUI1");
})(game || (game = {}));
//# sourceMappingURL=ClubMemberUI1.js.map