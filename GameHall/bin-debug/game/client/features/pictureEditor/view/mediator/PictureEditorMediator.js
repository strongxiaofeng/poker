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
    var PictureEditorMediator = (function (_super) {
        __extends(PictureEditorMediator, _super);
        function PictureEditorMediator() {
            return _super.call(this) || this;
        }
        /**初始化数据*/
        PictureEditorMediator.prototype.initClientData = function () {
        };
        /**初始化UI*/
        PictureEditorMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.PictureEditorUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI(this.data);
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PictureEditor.layer);
        };
        /**初始化数据*/
        PictureEditorMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_PictureEditor.name, this);
            this.notifyUI(PictureEditorCommands.initListener, this);
        };
        // ---------------------------------- dispose ----------------------------------
        PictureEditorMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_PictureEditor.name);
            _super.prototype.dispose.call(this);
        };
        /** 修改俱乐部头像 */
        PictureEditorMediator.Type_ClubPicture = "Type_ClubPicture";
        /** 修改用户头像 */
        PictureEditorMediator.Type_UserPicture = "Type_UserPicture";
        return PictureEditorMediator;
    }(game.BaseMediator));
    game.PictureEditorMediator = PictureEditorMediator;
    __reflect(PictureEditorMediator.prototype, "game.PictureEditorMediator");
})(game || (game = {}));
//# sourceMappingURL=PictureEditorMediator.js.map