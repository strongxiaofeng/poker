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
    var SelectVideoUI1 = (function (_super) {
        __extends(SelectVideoUI1, _super);
        function SelectVideoUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/selectVideo/selectVideoSkin.exml";
            return _this;
        }
        /** 接收Mediator通知*/
        SelectVideoUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case SelectVideoCommands.upDateList:
                    this.upDateList();
                    break;
            }
        };
        /** 初始化设置*/
        SelectVideoUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
        };
        /** 初始化list*/
        SelectVideoUI1.prototype.initList = function () {
            var arr = game.ClubModel.getInstance().getListSources();
            this.listData = new eui.ArrayCollection(arr);
            this.videoSourceList.dataProvider = this.listData;
            this.videoSourceList.itemRenderer = game.selectVideoSourceitem;
            this.videoSourceScroller.viewport = this.videoSourceList;
            this.videoSourceScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        };
        // 更新List数据
        SelectVideoUI1.prototype.upDateList = function () {
            var arr = game.ClubModel.getInstance().getListSources();
            this.listData.source = arr;
            this.listData.refresh();
        };
        return SelectVideoUI1;
    }(game.SelectVideoBaseUI));
    game.SelectVideoUI1 = SelectVideoUI1;
    __reflect(SelectVideoUI1.prototype, "game.SelectVideoUI1");
})(game || (game = {}));
//# sourceMappingURL=SelectVideoUI1.js.map