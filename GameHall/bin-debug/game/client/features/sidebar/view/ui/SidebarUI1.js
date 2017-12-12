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
    var SidebarUI1 = (function (_super) {
        __extends(SidebarUI1, _super);
        function SidebarUI1(data) {
            return _super.call(this, data) || this;
        }
        // ---------------------------------- dispose ----------------------------------
        SidebarUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return SidebarUI1;
    }(game.SidebarBaseUI));
    game.SidebarUI1 = SidebarUI1;
    __reflect(SidebarUI1.prototype, "game.SidebarUI1");
})(game || (game = {}));
//# sourceMappingURL=SidebarUI1.js.map