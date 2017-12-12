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
    var selectVideoSourceitem = (function (_super) {
        __extends(selectVideoSourceitem, _super);
        function selectVideoSourceitem() {
            var _this = _super.call(this) || this;
            _this.isInit = false;
            _this.isCom = false;
            _this.isAdd = false;
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/selectVideo/videoSourceItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.Complete, _this);
            return _this;
            // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.setAddtostage, this);
        }
        /** 皮肤加载完成*/
        selectVideoSourceitem.prototype.Complete = function () {
            // this.setComplete();
            this.dataChanged();
            this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
        };
        // setComplete()
        // {
        // 	this.isCom = true;
        // 	if(this.isCom && this.isAdd)
        // 	{
        // 		this.initItem();
        // 	}
        // }
        // setAddtostage()
        // {
        // 	this.isAdd = true;
        // 	if(this.isCom && this.isAdd)
        // 	{
        // 		this.initItem();
        // 	}
        // }
        selectVideoSourceitem.prototype.initItem = function () {
            this.initMouseEvent(true);
            this.initData();
        };
        /** 数据改变*/
        selectVideoSourceitem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            try {
                this.initItem();
            }
            catch (e) { }
        };
        /** 注册事件 */
        selectVideoSourceitem.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        };
        /** 点击事件*/
        selectVideoSourceitem.prototype.onTouchEnd = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_VideoSource, [this.data, this.ClubItemName1.text]);
        };
        selectVideoSourceitem.prototype.initData = function () {
            this.ClubItemName1.text = game.ClubModel.getInstance().getRoomSourcesName(this.data);
            // 个数
            this["Rooms1"].text = game.ClubModel.getInstance().getRoomSourcesNum(this.data);
            // 描述文字
            this["Profits1"].text = game.ClubModel.getInstance().getRoomSourcesTxt(this.data);
            // 游戏类型
            this["Games1"].text = game.ClubModel.getInstance().getRoomSourcesType(this.data);
        };
        /**当移除这个item时执行的清除方法 由子类重写*/
        selectVideoSourceitem.prototype.dispose = function () {
            this.initMouseEvent(false);
        };
        return selectVideoSourceitem;
    }(eui.ItemRenderer));
    game.selectVideoSourceitem = selectVideoSourceitem;
    __reflect(selectVideoSourceitem.prototype, "game.selectVideoSourceitem");
})(game || (game = {}));
//# sourceMappingURL=selectVideoSourceitem.js.map