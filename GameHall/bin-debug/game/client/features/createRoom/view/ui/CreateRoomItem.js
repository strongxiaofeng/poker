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
    var CreateRoomItem = (function (_super) {
        __extends(CreateRoomItem, _super);
        function CreateRoomItem() {
            var _this = _super.call(this) || this;
            /** 图片类型*/
            _this.ImgSoure = {
                //resource/img/lobbies/ui/main_surface/mine/icon/
                "baccarat": "icon_pic_baccarat.png",
                "dragontiger": "icon_pic_dragontiger.png",
                "roulette": "icon_pic_roulette.png",
                "sicbo": "icon_pic_sicbo.png",
                "bullfighting": "icon_pic_bullfighting.png",
                "mahjong": "icon_pic_mahjong.png",
            };
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/createGameType/createRoomItem.exml";
            return _this;
        }
        /** 数据变化*/
        CreateRoomItem.prototype.dataChanged = function () {
            if (this.gameTypeIcon) {
                this.initMouseEvent(true);
                this.gameTypeIcon.source = this.ImgSoure[this.data];
                switch (this.data) {
                    case "baccarat":
                        this.gameTypeBtn.label = game.LanguageUtil.translate("global_lbl_baccarat");
                        break;
                    case "dragontiger":
                        this.gameTypeBtn.label = game.LanguageUtil.translate("founder_btn_search_type_dt");
                        break;
                    case "roulette":
                        this.gameTypeBtn.label = game.LanguageUtil.translate("founder_btn_search_type_rt");
                        break;
                    case "sicbo":
                        this.gameTypeBtn.label = game.LanguageUtil.translate("founder_btn_search_type_sibo");
                        break;
                }
            }
        };
        /** 注册点击事件 */
        CreateRoomItem.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        };
        /** 点击事件*/
        CreateRoomItem.prototype.onTouchEnd = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_CreateRoomInfo, this.data);
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        CreateRoomItem.prototype.dispose = function () {
            this.initMouseEvent(false);
        };
        return CreateRoomItem;
    }(eui.ItemRenderer));
    game.CreateRoomItem = CreateRoomItem;
    __reflect(CreateRoomItem.prototype, "game.CreateRoomItem");
})(game || (game = {}));
//# sourceMappingURL=CreateRoomItem.js.map