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
    var SidebarItem = (function (_super) {
        __extends(SidebarItem, _super);
        function SidebarItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/sidebar/sidebarItemSkin.exml";
            _this.onStage().then(function () {
                _this.roadMap = new game.RoadMap(_this.groupRoadMap.width, _this.groupRoadMap.height, game.RoadMap.BigRoad, 44);
                _this.groupRoadMap.addChild(_this.roadMap);
                _this.initMouseEvent(true);
                _this.groupCount.visible = true;
                _this.countdown = new game.countdown(75, true);
                _this.countdown.scaleX = 0.8;
                _this.countdown.scaleY = 0.8;
                _this.countdown.right = 0;
                _this.countdown.verticalCenter = 0;
                _this.groupCount.addChild(_this.countdown);
                _this.dataChanged();
            }).catch(function () {
                game.DebugUtil.debug("初始化失败");
            });
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        SidebarItem.prototype.onStage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.once(egret.Event.ADDED_TO_STAGE, resolve, _this);
            });
        };
        SidebarItem.prototype.dataChanged = function () {
            try {
                this.updataRoadData();
                this.initData();
            }
            catch (e) { }
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 点击事件 */
        SidebarItem.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            }
        };
        /**  点击响应*/
        SidebarItem.prototype.onTouch = function () {
            var _this = this;
            game.CommonLoadingUI.getInstance().showConnect();
            var clubInfo = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId);
            if (clubInfo.creator == +game.PersonalInfoModel.getInstance().user_id) {
                game.BaccaratController.getInstance().getSubscribeRoomDesk(this.data).then(function () {
                    game.CommonLoadingUI.getInstance().stop();
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_Sidebar.name);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_OwnersWatchMediator, _this.data);
                }).catch(function (e) {
                    game.CommonLoadingUI.getInstance().stop();
                    console.debug(e);
                });
            }
            else {
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_Enter, this.data);
            }
        };
        SidebarItem.prototype.initData = function () {
            this.imgLock.visible = game.ClubModel.getInstance().getlockBool(this.data);
            this.roomName.text = game.ClubModel.getInstance().getRoomName(this.data);
            this.imgFree.visible = game.ClubModel.getInstance().getClubRoomsSetting(this.data).is_no_commission;
            this.onRoomState();
        };
        SidebarItem.prototype.updataRoadData = function () {
            var roadData = game.ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadData && this.roadMap) {
                this.roadMap.setData(roadData);
            }
        };
        /** 根据房间状态显示UI */
        SidebarItem.prototype.onRoomState = function () {
            var state = game.ClubModel.getInstance().getRoomStage(this.data);
            this.labelShuffle.visible = false;
            switch (state) {
                case game.GameState.bet:
                    var betTime = game.ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
                    var stopBetTime = game.ClubModel.getInstance().getStopBetTime(this.data);
                    this.countdown.visible = true;
                    this.imgCount.visible = false;
                    this.countdown.startTime(betTime, stopBetTime);
                    break;
                case game.GameState.deal_card:
                    this.countdown.startPayOut();
                    this.countdown.visible = false;
                    this.imgCount.visible = true;
                    break;
                case game.GameState.payout:
                    this.countdown.visible = false;
                    this.imgCount.visible = true;
                    this.countdown.startPayOut();
                    break;
                case game.GameState.shuffle:
                    this.countdown.visible = true;
                    this.imgCount.visible = false;
                    this.countdown.startShuffle();
                    this.labelShuffle.visible = true;
                    break;
            }
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        SidebarItem.prototype.dispose = function () {
            this.initMouseEvent(false);
        };
        return SidebarItem;
    }(eui.AItemRenderer));
    game.SidebarItem = SidebarItem;
    __reflect(SidebarItem.prototype, "game.SidebarItem");
})(game || (game = {}));
//# sourceMappingURL=SidebarItem.js.map