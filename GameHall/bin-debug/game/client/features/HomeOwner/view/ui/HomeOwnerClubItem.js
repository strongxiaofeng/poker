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
    var HomeOwnerClubItem = (function (_super) {
        __extends(HomeOwnerClubItem, _super);
        function HomeOwnerClubItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/homeOwnerClubItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.Complete, _this);
            return _this;
        }
        /** 数据变化*/
        HomeOwnerClubItem.prototype.dataChanged = function () {
        };
        /** UI初始化完成*/
        HomeOwnerClubItem.prototype.Complete = function () {
            this.initMouseEvent(true);
            this.typeData = this.data;
            this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
        };
        /** 注册点击事件 */
        HomeOwnerClubItem.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        };
        /** 点击事件*/
        HomeOwnerClubItem.prototype.onTouchEnd = function () {
            if (this.data && this.data.id) {
                game.GlobalConfig.setClubId(this.data.id)
                    .then(function () {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_HomeOwnerClub);
                }).catch(function (e) {
                    game.DebugUtil.debug(e.message + "订阅俱乐部失败");
                });
            }
        };
        Object.defineProperty(HomeOwnerClubItem.prototype, "typeData", {
            /** 设置数据*/
            set: function (typeData) {
                var _this = this;
                var name = typeData.name;
                var Profits = typeData.Profits | 0;
                var Games = typeData.Games || "";
                var AllPlayer = typeData.users | 0;
                var Anchor = typeData.Anchor | 0;
                var RoomCard = typeData.RoomCard | 0;
                this.clubInvitation.text = typeData.invitation_code || "";
                this.clubItemName.text = name + "";
                this.profits.text = Profits + "";
                this.games.text = Games + "";
                this.allPlayer.text = AllPlayer + "";
                this.anchor.text = Anchor + "";
                this.roomCard.text = RoomCard + "";
                /** 获取房间数*/
                game.ClubController.getInstance().getSubscribeClub(+(this.data.id)).then(function (data) {
                    var num = 0;
                    for (var key in data.snapshot.rooms) {
                        num++;
                    }
                    _this.rooms.text = num + "";
                }).catch(function (e) {
                    game.DebugUtil.debug("订阅俱乐部房间失败:" + e);
                });
                /** 获取在线人数*/
                game.ClubController.getInstance().getOnlinePlayer(this.data.id)
                    .then(function (count) {
                    _this.players.text = game.NumberUtil.getSplitNumStr(+count * 100 || 0);
                    game.DebugUtil.debug("getOnlinePlayer" + count + _this.data.id);
                }).catch(function (e) {
                    game.DebugUtil.debug("获取在线人数失败:" + e);
                });
            },
            enumerable: true,
            configurable: true
        });
        /**当移除这个item时执行的清除方法 由子类重写*/
        HomeOwnerClubItem.prototype.dispose = function () {
            this.initMouseEvent(false);
        };
        return HomeOwnerClubItem;
    }(eui.ItemRenderer));
    game.HomeOwnerClubItem = HomeOwnerClubItem;
    __reflect(HomeOwnerClubItem.prototype, "game.HomeOwnerClubItem");
})(game || (game = {}));
//# sourceMappingURL=HomeOwnerClubItem.js.map