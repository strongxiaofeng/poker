var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *
     * @desc 统一路径管理类
     *
     */
    var SystemPath = (function () {
        function SystemPath() {
        }
        SystemPath.root = "resource/"; //根目录
        SystemPath.skin_type = ""; //默认是pc
        SystemPath.skin_path = SystemPath.root + "skins/game_skins/";
        SystemPath.config_path = SystemPath.root + "config/";
        SystemPath.music_path = SystemPath.root + "music/";
        SystemPath.SKIN_PC = "pc"; //pc版
        SystemPath.SKIN_MOBILE = "mobile"; //移动版
        return SystemPath;
    }());
    game.SystemPath = SystemPath;
    __reflect(SystemPath.prototype, "game.SystemPath");
})(game || (game = {}));
//# sourceMappingURL=SystemPath.js.map