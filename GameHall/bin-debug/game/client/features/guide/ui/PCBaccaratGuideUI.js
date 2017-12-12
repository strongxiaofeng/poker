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
    var PCBaccaratGuideUI = (function (_super) {
        __extends(PCBaccaratGuideUI, _super);
        function PCBaccaratGuideUI() {
            var _this = _super.call(this) || this;
            _this.index = 1;
            _this.skinName = "resource/skins/game_skins/pc/guide/baccaratGuideSkin.exml";
            return _this;
        }
        PCBaccaratGuideUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.index = 1;
            this.img_skipIcon.touchEnabled = false;
            this.showIndex();
            this.initListener();
        };
        PCBaccaratGuideUI.prototype.initListener = function () {
            var _this = this;
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.registerEvent(this.btn_skip, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.img_skipIcon.visible = true;
            }, this);
            this.registerEvent(this.btn_skip, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.img_skipIcon.visible = false;
            }, this);
            this.registerEvent(this.btn_startGame, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.img_skipIcon.visible = true;
            }, this);
            this.registerEvent(this.btn_startGame, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.img_skipIcon.visible = false;
            }, this);
        };
        PCBaccaratGuideUI.prototype.onClick = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (e.target) {
                case this.btn_skip:
                case this.btn_startGame:
                    this.img_skipIcon.visible = false;
                    this.skip();
                    break;
                default:
                    this.nextPage();
                    break;
            }
        };
        /**下一页 */
        PCBaccaratGuideUI.prototype.nextPage = function () {
            this.index++;
            if (this.index <= 11) {
                this.showIndex();
            }
            else {
                this.skip();
            }
        };
        /**刷新当前页 */
        PCBaccaratGuideUI.prototype.showIndex = function () {
            for (var i = 1; i <= 10; i++) {
                this["page" + i].visible = false;
            }
            this["page" + this.index].visible = true;
            if (this.index == 11) {
                this.btn_startGame.visible = true;
                this.btn_skip.visible = false;
            }
        };
        /**结束引导 */
        PCBaccaratGuideUI.prototype.skip = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_BaccaratGuide.name);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_BaccaratMediator.name);
            game.ClubController.getInstance().getSubscribeRoomList(game.GlobalConfig.clubId).then(function () {
                var roomNameArr = game.ClubModel.getInstance().getTheClubRooms();
                if (game.GlobalConfig.isMobile) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_ClubDetail);
                }
                else {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedRoomList);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn);
                }
            }).catch(function (data) {
                game.DebugUtil.debug('订阅我的俱乐部topic返回错误:' + data);
            });
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        PCBaccaratGuideUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        PCBaccaratGuideUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCBaccaratGuideUI;
    }(game.BaseUI));
    game.PCBaccaratGuideUI = PCBaccaratGuideUI;
    __reflect(PCBaccaratGuideUI.prototype, "game.PCBaccaratGuideUI");
})(game || (game = {}));
//# sourceMappingURL=PCBaccaratGuideUI.js.map