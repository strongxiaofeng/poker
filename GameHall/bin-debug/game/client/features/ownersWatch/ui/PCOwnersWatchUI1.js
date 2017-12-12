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
    /**
     * by 唐茂
     */
    var PCOwnersWatchUI1 = (function (_super) {
        __extends(PCOwnersWatchUI1, _super);
        function PCOwnersWatchUI1(data) {
            return _super.call(this, data) || this;
        }
        PCOwnersWatchUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        /** 注册监听事件 */
        PCOwnersWatchUI1.prototype.initListener = function () {
            _super.prototype.initListener.call(this);
            this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        };
        PCOwnersWatchUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            _super.prototype.onMediatorCommand.call(this, type, params);
            switch (type) {
                case OwnersWatchUICommands.OwnersWatchNotify_roomName:
                    this.roomName.text = params;
                    break;
            }
        };
        /**关闭*/
        PCOwnersWatchUI1.prototype.closeFun = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_OwnersWatchMediator.name);
        };
        //------------------------------------dispose-------------------------------------------------
        PCOwnersWatchUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCOwnersWatchUI1;
    }(game.OwnersWatchBaseUI));
    game.PCOwnersWatchUI1 = PCOwnersWatchUI1;
    __reflect(PCOwnersWatchUI1.prototype, "game.PCOwnersWatchUI1");
})(game || (game = {}));
//# sourceMappingURL=PCOwnersWatchUI1.js.map