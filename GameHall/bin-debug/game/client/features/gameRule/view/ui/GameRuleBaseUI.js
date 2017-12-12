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
    var GameRuleBaseUI = (function (_super) {
        __extends(GameRuleBaseUI, _super);
        function GameRuleBaseUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        GameRuleBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        GameRuleBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case GameRuleUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        GameRuleBaseUI.prototype.initListener = function (mediator) {
            // tap事件
            this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, function () {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                game.MediatorManager.closeMediator(game.Mediators.Mediator_GameRule.name);
            }, this);
        };
        // ---------------------------------- UI操作 ----------------------------------
        // ---------------------------------- dispose ----------------------------------
        GameRuleBaseUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return GameRuleBaseUI;
    }(game.BaseUI));
    game.GameRuleBaseUI = GameRuleBaseUI;
    __reflect(GameRuleBaseUI.prototype, "game.GameRuleBaseUI");
})(game || (game = {}));
//# sourceMappingURL=GameRuleBaseUI.js.map