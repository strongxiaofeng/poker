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
    var selectVideoItem = (function (_super) {
        __extends(selectVideoItem, _super);
        function selectVideoItem() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            _this.skinName = game.SystemPath.skin_path + "createRoom/selectVideoItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.complete, _this);
            return _this;
        }
        /**每次添加到舞台时 初始化 */
        selectVideoItem.prototype.onAdd = function () {
            var _this = this;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
            this.mainGroup.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.hiden, this);
            this.bgBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.hiden, this);
            this.bgBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.sourceName.textColor = 0x000000;
            }, this);
            this.bgBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.sourceName.textColor = 0xffffff;
            }, this);
            this.bgBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
                _this.sourceName.textColor = 0xffffff;
            }, this);
        };
        /** 点击到item*/
        selectVideoItem.prototype.itemTap = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            /** 发送通知UI，显示视频group*/
            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PC_SelectVideo, [this.data, this.sourceName.text]);
        };
        /** 取消点击状态*/
        selectVideoItem.prototype.itemTapOff = function () {
            this.selected = false;
            this.showBtn();
        };
        /** 取消点击状态*/
        selectVideoItem.prototype.itemTapOn = function () {
            this.selected = true;
            this.showBtn();
        };
        /** 取消点击状态*/
        selectVideoItem.prototype.clearTap = function () {
            this.selected = false;
            this.showBtn();
        };
        selectVideoItem.prototype.showBtn = function () {
            if (this.selected) {
                this.bgBtn.setState = "down";
            }
            else {
                this.bgBtn.setState = "up";
            }
        };
        /**根据this.data刷新数据 */
        selectVideoItem.prototype.dataChanged = function () {
            try {
                this.name = this.data;
                this.showData();
            }
            catch (e) { }
        };
        /** 显示高亮*/
        selectVideoItem.prototype.show = function () {
            this.bgBtn.setState = "disabled";
        };
        /** 隐藏高亮*/
        selectVideoItem.prototype.hiden = function () {
            this.showBtn();
        };
        /** UI加载完成*/
        selectVideoItem.prototype.complete = function () {
            this.dataChanged();
        };
        /** 更新数据*/
        selectVideoItem.prototype.showData = function () {
            this.sourceName.text = game.ClubModel.getInstance().getRoomSourcesName(this.data);
            // 个数
            this.tables.text = game.ClubModel.getInstance().getRoomSourcesNum(this.data) + "";
            // 描述文字
            this.Source.text = game.ClubModel.getInstance().getRoomSourcesTxt(this.data);
            this.sourceName.textColor = 0xffffff;
            this.bgBtn.setState = "up";
            this.mainGroup.touchThrough = true;
        };
        /**每次从舞台移除时 清除 */
        selectVideoItem.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () { }, this);
            this.mainGroup.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.hiden, this);
            this.bgBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.show, this);
            this.bgBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.hiden, this);
            this.bgBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, function () { }, this);
            this.bgBtn.removeEventListener(egret.TouchEvent.TOUCH_END, function () { }, this);
            this.bgBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () { }, this);
        };
        return selectVideoItem;
    }(eui.ItemRenderer));
    game.selectVideoItem = selectVideoItem;
    __reflect(selectVideoItem.prototype, "game.selectVideoItem");
})(game || (game = {}));
//# sourceMappingURL=selectVideoItem.js.map