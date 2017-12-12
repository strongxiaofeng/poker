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
    var MultiLanguageBaseUI = (function (_super) {
        __extends(MultiLanguageBaseUI, _super);
        function MultiLanguageBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "multiLanguage/multiLanguageSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        MultiLanguageBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
            this.initBtn();
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        MultiLanguageBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case MultiLanguageCommands.initListener:
                    this.initListeners(params);
                    break;
                case MultiLanguageCommands.showList:
                    this.showList(params);
                    break;
                case MultiLanguageCommands.mulSelected:
                    this.showMulSelected(params);
                    break;
                case MultiLanguageCommands.confirmBtnAble:
                    this.setBtn();
                    break;
                case MultiLanguageCommands.initListBtn:
                    this.showMulSelected(params, false);
                    break;
            }
        };
        /**注册事件 手动调用*/
        MultiLanguageBaseUI.prototype.initListeners = function (mediator) {
            this.registerEvent(this.multiLanguageList, eui.ItemTapEvent.ITEM_TAP, this.tapItem, this);
            this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, mediator.touchCancel, mediator);
            this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, mediator.touchConfirmBtn, mediator);
        };
        /** 初始化list*/
        MultiLanguageBaseUI.prototype.initList = function () {
            this.mullanguageArr = new eui.ArrayCollection();
            this.multiLanguageList.itemRenderer = game.MultiLanguageItem;
            this.multiLanguageList.dataProvider = this.mullanguageArr;
        };
        /** 显示列表*/
        MultiLanguageBaseUI.prototype.showList = function (arr) {
            this.mullanguageArr.source = arr;
            this.mullanguageArr.refresh();
            this.multiLanguageList.validateNow();
        };
        /** 显示多语言选择状态
         * isShowBtn  是否改变按钮状态，初始化时需要不改变按钮状态
        */
        MultiLanguageBaseUI.prototype.showMulSelected = function (str, isShowBtn) {
            if (isShowBtn === void 0) { isShowBtn = true; }
            for (var i = 0; i < this.multiLanguageList.numChildren; i++) {
                if (this.multiLanguageList.getChildAt(i).name == str) {
                    this.multiLanguageList.getChildAt(i)["setBtnAble"]();
                }
                else {
                    this.multiLanguageList.getChildAt(i)["setBtnDisable"]();
                }
            }
        };
        /** 初始化按钮状态*/
        MultiLanguageBaseUI.prototype.initBtn = function () {
            // this.confirmBtn.enabled = true;
            this.confirmBtn.touchEnabled = false;
            this.confirmBtn.setState = "disabled";
            // this.cancelBtn.touchEnabled = true;
        };
        /** 设置按钮状态*/
        MultiLanguageBaseUI.prototype.setBtn = function () {
            this.confirmBtn.touchEnabled = true;
            this.confirmBtn.setState = "up";
            // this.cancelBtn.touchEnabled = true;
            // this.confirmBtn.enabled = true;
            // this.cancelBtn.enabled = true;
        };
        /** 点击到了item*/
        MultiLanguageBaseUI.prototype.tapItem = function (e) {
        };
        // ---------------------------------- dispose ----------------------------------
        MultiLanguageBaseUI.prototype.dispose = function () {
            this.mullanguageArr.source = [];
            this.multiLanguageList.dataProvider = this.mullanguageArr;
            this.mullanguageArr.refresh();
            this.multiLanguageList.validateNow();
            _super.prototype.dispose.call(this);
        };
        return MultiLanguageBaseUI;
    }(game.BaseUI));
    game.MultiLanguageBaseUI = MultiLanguageBaseUI;
    __reflect(MultiLanguageBaseUI.prototype, "game.MultiLanguageBaseUI");
})(game || (game = {}));
//# sourceMappingURL=MultiLanguageBaseUI.js.map