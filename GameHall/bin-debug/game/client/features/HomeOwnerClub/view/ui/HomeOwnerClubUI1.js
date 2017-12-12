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
    var HomeOwnerClubUI1 = (function (_super) {
        __extends(HomeOwnerClubUI1, _super);
        function HomeOwnerClubUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/clubitem/homeOwnerClubSkin.exml";
            if (game.GlobalConfig.clubId) {
                /** 没有俱乐部ID*/
            }
            return _this;
        }
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 接收Mediator通知*/
        HomeOwnerClubUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case HomeOwnerClubCommands.initListener:
                    this.initListener(params);
                    break;
                case HomeOwnerClubCommands.updateCard:
                    this.updateCard(params);
                    break;
            }
        };
        /**组件创建完成初始化数据等操作 */
        HomeOwnerClubUI1.prototype.initSetting = function () {
            this.initShow(false);
            this.updateType(1);
            this.haveRoom();
        };
        /** 注册事件 */
        HomeOwnerClubUI1.prototype.initListener = function (mediator) {
            if (mediator === void 0) { mediator = null; }
            this.registerEvent(this.createBtn, egret.TouchEvent.TOUCH_TAP, mediator.touchCreate, mediator);
            this.registerEvent(this.menberBtn, egret.TouchEvent.TOUCH_TAP, mediator.openMenber, mediator);
            this.registerEvent(this.dataBtn, egret.TouchEvent.TOUCH_TAP, mediator.openDataCenter, mediator);
            this.registerEvent(this.editBtn, egret.TouchEvent.TOUCH_TAP, mediator.openClubEdit, mediator);
            this.registerEvent(this.shareBtn, egret.TouchEvent.TOUCH_TAP, mediator.share, mediator);
            this.registerEvent(this.reateRoomBtn, egret.TouchEvent.TOUCH_TAP, mediator.touchCreate, mediator);
            this.registerEvent(this.Baccarat, egret.TouchEvent.TOUCH_BEGIN, this.TouchRoom, this);
            this.registerEvent(this.Baccarat, egret.TouchEvent.TOUCH_BEGIN, this.TouchRoom, this);
            this.registerEvent(this.Baccarat, egret.TouchEvent.TOUCH_END, this.TouchRoom, this);
            this.registerEvent(this, egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
            this.Baccarat.touchChildren = false;
        };
        /** 点击游戏界面*/
        HomeOwnerClubUI1.prototype.TouchRoom = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.initShow(true);
            }
            else {
                this.initShow(false);
            }
        };
        /** 点击游戏界面*/
        HomeOwnerClubUI1.prototype.TouchEnd = function (e) {
            switch (e.target) {
                case this.Baccarat:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_roomManagerMediator);
                    break;
                // 点击公告
                case this.notifyBtn:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_AnnounceList);
                    break;
            }
        };
        /** 点击bacca */
        HomeOwnerClubUI1.prototype.TouchBacc = function (e) {
            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubGames);
        };
        /** 初始显示*/
        HomeOwnerClubUI1.prototype.initShow = function (b) {
            this.MaskBaccrat.visible = b;
        };
        /** 更新房卡*/
        HomeOwnerClubUI1.prototype.updateCard = function (card) {
            this.homeCard.text = game.LanguageUtil.translate("global_lbl_room_card") + (game.NumberUtil.getSplitNumStr(card * 100 || 0));
            var labelWidth = this.homeCard.textWidth;
            this.roomCardImg.right = labelWidth + 115;
        };
        /** 更新游戏类型统计*/
        HomeOwnerClubUI1.prototype.updateType = function (num) {
            this.gameType.text = game.LanguageUtil.translate("global_lbl_game_type") + num;
        };
        /** 判断是否有房间 */
        HomeOwnerClubUI1.prototype.haveRoom = function () {
            /** 获取到总的房间名称数组*/
            var roomData = game.ClubModel.getInstance().getTheClubAllRooms();
            if (roomData && roomData.length) {
                this.GameTipGroup.visible = false;
                this.Baccarat.visible = true;
            }
            else {
                this.GameTipGroup.visible = true;
                this.Baccarat.visible = false;
            }
        };
        HomeOwnerClubUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return HomeOwnerClubUI1;
    }(game.BaseUI));
    game.HomeOwnerClubUI1 = HomeOwnerClubUI1;
    __reflect(HomeOwnerClubUI1.prototype, "game.HomeOwnerClubUI1");
})(game || (game = {}));
//# sourceMappingURL=HomeOwnerClubUI1.js.map