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
    var BaccaratGuideUI = (function (_super) {
        __extends(BaccaratGuideUI, _super);
        function BaccaratGuideUI() {
            var _this = _super.call(this) || this;
            _this.index = 1;
            _this.skinName = game.SystemPath.skin_path + "guide/baccaratGuideSkin.exml";
            return _this;
        }
        BaccaratGuideUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.index = 1;
            this.showIndex();
            this.initListener();
        };
        BaccaratGuideUI.prototype.initListener = function () {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        BaccaratGuideUI.prototype.onClick = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (e.target) {
                case this.btn_skip:
                case this.btn_skipIcon:
                case this.btn_startGame:
                    this.skip();
                    break;
                default:
                    this.nextPage();
                    break;
            }
        };
        /**下一页 */
        BaccaratGuideUI.prototype.nextPage = function () {
            this.index++;
            if (this.index <= 10) {
                this.showIndex();
            }
            else {
                this.skip();
            }
        };
        /**刷新当前页 */
        BaccaratGuideUI.prototype.showIndex = function () {
            for (var i = 1; i <= 10; i++) {
                this["page" + i].visible = false;
            }
            this["page" + this.index].visible = true;
            if (this.index == 10) {
                this.btn_startGame.visible = true;
            }
        };
        /**结束引导 */
        BaccaratGuideUI.prototype.skip = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_BaccaratGuide.name);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_BaccaratMediator.name);
            game.ClubController.getInstance().getSubscribeRoomList(game.GlobalConfig.clubId).then(function () {
                var roomNameArr = game.ClubModel.getInstance().getTheClubRooms();
                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubDetail);
            }).catch(function (data) {
                game.DebugUtil.debug('订阅我的俱乐部topic返回错误:' + data);
            });
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        BaccaratGuideUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        BaccaratGuideUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return BaccaratGuideUI;
    }(game.BaseUI));
    game.BaccaratGuideUI = BaccaratGuideUI;
    __reflect(BaccaratGuideUI.prototype, "game.BaccaratGuideUI");
})(game || (game = {}));
//# sourceMappingURL=BaccaratGuideUI.js.map