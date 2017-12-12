var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 每个游戏对应的多个资源组，在请求进入房间之前会先加载这个组
     *
     */
    var ResGroups = (function () {
        function ResGroups() {
        }
        ResGroups.getMultiGroupName = function (name) {
            // var config:any = com.LoadManager.getInstance().getRes("resGroupConfig_json");
            var str;
            if (game.GlobalConfig.isMobile) {
                str = this.config.mViews[name] ? this.config.mViews[name] : name;
            }
            else {
                str = this.config.pcViews[name] ? this.config.pcViews[name] : "";
            }
            // if(str.indexOf("commonInjectChip") > -1)
            // {
            //     str = str.replace("commonInjectChip","commonInjectChip" + (LanguageConstTypes.AmountType + 1));
            // }
            // if(str.indexOf("commonListChip") > -1)
            // {
            //     str = str.replace("commonListChip","commonListChip" + (LanguageConstTypes.AmountType + 1));
            // }
            if (!str)
                str = "";
            return str;
        };
        return ResGroups;
    }());
    game.ResGroups = ResGroups;
    __reflect(ResGroups.prototype, "game.ResGroups");
})(game || (game = {}));
//# sourceMappingURL=ResGroups.js.map