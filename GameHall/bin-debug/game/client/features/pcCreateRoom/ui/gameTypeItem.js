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
    var gameTypeItem = (function (_super) {
        __extends(gameTypeItem, _super);
        function gameTypeItem() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            _this.skinName = game.SystemPath.skin_path + "createRoom/gameTypeItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.complete, _this);
            return _this;
        }
        /**每次添加到舞台时 初始化 */
        gameTypeItem.prototype.onAdd = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItem, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        };
        /**根据this.data刷新数据 */
        gameTypeItem.prototype.dataChanged = function () {
            try {
                this.upData();
            }
            catch (e) { }
        };
        /** UI加载完成*/
        gameTypeItem.prototype.complete = function () {
            this.dataChanged();
        };
        /** 动态的数据 */
        gameTypeItem.prototype.upData = function () {
            switch (this.data) {
                case "baccarat":
                    this.gameType.text = game.LanguageUtil.translate("global_lbl_baccarat");
                    this.gameTypeImg.source = "icon_pic_baccarat_pc.png";
                    this.setItemable();
                    break;
                case "dragontiger":
                    this.gameType.text = game.LanguageUtil.translate("founder_btn_search_type_dt");
                    this.gameTypeImg.source = "icon_pic_dragontiger_pc.png";
                    this.setItemdisable();
                    break;
                case "roulette":
                    this.gameType.text = game.LanguageUtil.translate("founder_btn_search_type_rt");
                    this.gameTypeImg.source = "icon_pic_roulette_pc.png";
                    this.setItemdisable();
                    break;
                case "sicbo":
                    this.gameType.text = game.LanguageUtil.translate("founder_btn_search_type_sibo");
                    this.gameTypeImg.source = "icon_pic_sicbo_pc.png";
                    this.setItemdisable();
                    break;
                case "bullfighting":
                    this.gameType.text = game.LanguageUtil.translate("牛牛");
                    this.gameTypeImg.source = "icon_pic_bullfighting_pc.png";
                    this.setItemdisable();
                    break;
                case "mahjong":
                    this.gameType.text = game.LanguageUtil.translate("麻将");
                    this.gameTypeImg.source = "icon_pic_mahjong_pc.png";
                    this.setItemdisable();
                    break;
            }
        };
        /** 点击item*/
        gameTypeItem.prototype.touchItem = function () {
            if (this.isDisable)
                return;
            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PC_SelectType, this.gameType.text);
        };
        /** 点击按下item*/
        gameTypeItem.prototype.touchDown = function () {
            this.gameType.textColor = 0x7f6748;
        };
        /** 点击松开item*/
        gameTypeItem.prototype.touchEnd = function () {
            this.gameType.textColor = 0xefba73;
        };
        /** 正常item状态*/
        gameTypeItem.prototype.setItemable = function () {
            // this.gameType.textColor = 0xefba73;
            this.gameType.x = 100;
            this.isDisable = false;
            this.enabled = true;
            this.alpha = 1;
        };
        /** 禁用item状态*/
        gameTypeItem.prototype.setItemdisable = function () {
            // this.gameType.textColor = 0x7f6748;
            this.gameType.x = 110;
            this.isDisable = true;
            this.enabled = false;
            this.alpha = 0.4;
        };
        /**每次从舞台移除时 清除 */
        gameTypeItem.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () { }, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        };
        return gameTypeItem;
    }(eui.ItemRenderer));
    game.gameTypeItem = gameTypeItem;
    __reflect(gameTypeItem.prototype, "game.gameTypeItem");
})(game || (game = {}));
//# sourceMappingURL=gameTypeItem.js.map