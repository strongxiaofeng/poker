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
    var PictureEditorUI1 = (function (_super) {
        __extends(PictureEditorUI1, _super);
        function PictureEditorUI1(data) {
            var _this = _super.call(this, data) || this;
            _this.skinName = "resource/skins/game_skins/mobile/my/pictureEditor.exml";
            return _this;
        }
        return PictureEditorUI1;
    }(game.PictureEditorBaseUI));
    game.PictureEditorUI1 = PictureEditorUI1;
    __reflect(PictureEditorUI1.prototype, "game.PictureEditorUI1");
})(game || (game = {}));
//# sourceMappingURL=PictureEditorUI1.js.map