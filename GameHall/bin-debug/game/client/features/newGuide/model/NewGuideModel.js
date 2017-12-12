var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var NewGuideModel = (function () {
        function NewGuideModel() {
            this._config = {
                "1": {
                    "path": "/resource/skins/game_skins/pc/guide/MulitBaccGuide.exml",
                }
            };
        }
        NewGuideModel.getInstance = function () {
            if (this._instance == null) {
                this._instance = new NewGuideModel();
            }
            return this._instance;
        };
        NewGuideModel.prototype.getConfig = function (type) {
            switch (type) {
                case 1://pc版多桌
                    break;
            }
        };
        return NewGuideModel;
    }());
    game.NewGuideModel = NewGuideModel;
    __reflect(NewGuideModel.prototype, "game.NewGuideModel");
    var GuideConfig = (function () {
        function GuideConfig() {
        }
        return GuideConfig;
    }());
    game.GuideConfig = GuideConfig;
    __reflect(GuideConfig.prototype, "game.GuideConfig");
    /**需要镂空的区域的对象 */
    var HollowZone = (function () {
        function HollowZone() {
        }
        return HollowZone;
    }());
    game.HollowZone = HollowZone;
    __reflect(HollowZone.prototype, "game.HollowZone");
})(game || (game = {}));
//# sourceMappingURL=NewGuideModel.js.map