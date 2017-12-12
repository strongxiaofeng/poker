var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameModel = (function () {
        function GameModel() {
        }
        GameModel.getInstance = function () {
            if (this.instance == null) {
                this.instance = new GameModel();
            }
            return this.instance;
        };
        Object.defineProperty(GameModel.prototype, "timestamp", {
            set: function (obj) {
                this._offTime = egret.getTimer(); //更新服务器时的时间
                this._timestamp = obj;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameModel.prototype, "serverTime", {
            /**获取当前服务器时间 */
            get: function () {
                if (this._timestamp) {
                    return this._timestamp.snapshot.timestamp + egret.getTimer() - this._offTime;
                }
                else {
                    return new Date().getTime();
                }
            },
            enumerable: true,
            configurable: true
        });
        /** 邀请码登陆状态*/
        GameModel.invitationData = null;
        return GameModel;
    }());
    game.GameModel = GameModel;
    __reflect(GameModel.prototype, "game.GameModel");
})(game || (game = {}));
//# sourceMappingURL=GameModel.js.map