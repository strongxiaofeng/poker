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
    /**
     * 俱乐部多桌UI组件
     * by 郑戎辰
     */
    var MultiBaccBaseUI = (function (_super) {
        __extends(MultiBaccBaseUI, _super);
        function MultiBaccBaseUI(isGuide) {
            if (isGuide === void 0) { isGuide = false; }
            var _this = _super.call(this) || this;
            _this._isGuide = false;
            /** 当前页数 */
            _this.thePage = 0;
            /** 一页的个数 */
            _this.num = 10;
            /** 总的页数 */
            _this.zonePage = Math.ceil(game.ClubModel.getInstance().getTheClubPlainRooms().length / _this.num) - 1;
            _this._isGuide = isGuide;
            _this.skinName = game.SystemPath.skin_path + "mulitBaccarat/mulitBaccarat.exml";
            game.CommonLoadingUI.getInstance().stop();
            return _this;
        }
        MultiBaccBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            if (this._isGuide) {
                if (game.GlobalConfig.isMobile) {
                    this.mulitList.itemRenderer = game.MulitBaccItemUI1;
                }
                else {
                    this.mulitList.itemRenderer = game.PCMulitBaccItemUI1;
                }
                this.showListMsg(false);
                this.mulitList.addItems(["guide", "guide", "guide"]);
                this.mulitScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            else {
                // this.deskData = new eui.ArrayCollection();
                this.initListener();
                this.initList();
                this.initListLoader();
            }
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        MultiBaccBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                // 初始化监听
                case MultiBaccUICommands.MultiBaccNotify_initListener:
                    break;
                // desk数据有更新
                case MultiBaccUICommands.MultiBaccNotify_deskIn:
                    this.runItemFuc(params, 'deskIn');
                    break;
                // 视频源有更新
                case MultiBaccUICommands.MultiBaccNotify_souresPlayer:
                    this.updataItemFuc(params, 'souresIn');
                    break;
                // setting数据有更新
                case MultiBaccUICommands.MultiBaccNotify_settingIn:
                    this.runItemFuc(params, 'settingIn');
                    break;
                // case MultiBaccUICommands.MultiBaccNotify_roadMapData:
                // 	// this.runItemFuc(params, 'updataRoadData')
                // 	break;
                case MultiBaccUICommands.MultiBaccNotify_okeyBetMsg:
                    this.showOkeyBetMsg(params);
                    break;
                case MultiBaccUICommands.MultiBaccNotify_chipsIn:
                    this.runItemFuc(params, 'getCustomChips');
                    break;
                // case MultiBaccUICommands.MultiBaccNotify_UpDataList:
                // 	// this.upDataList();
                // 	break;
                case MultiBaccUICommands.MultiBaccNotify_HideBottomMore:
                    this.runAllItemFuc('showHideMore', false);
                    this.runItemFuc(params[0], 'showHideMore', params[1]);
                    this.mulitList.updateItemsLocation();
                    break;
                case MultiBaccUICommands.MultiBaccNotify_addItem:
                    this.deskData = game.ClubModel.getInstance().multiRoomList;
                    if (params) {
                        if (this.deskData.length < 10) {
                            this.mulitList.addItems([params]);
                        }
                    }
                    this.isHaveNextPage();
                    break;
                case MultiBaccUICommands.MultiBaccNotify_removeItem:
                    this.deskData = game.ClubModel.getInstance().multiRoomList;
                    if (params) {
                        this.mulitList.removeItem('data', params);
                    }
                    this.isHaveNextPage();
                    break;
                case MultiBaccUICommands.MultiBaccNotify_MulitUpDataList:
                    this.upDataMulitList();
            }
        };
        /* 点击响应事件 */
        MultiBaccBaseUI.prototype.onTouchBtn = function (evt) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (evt.target) {
            }
        };
        /** 初始化事件 */
        MultiBaccBaseUI.prototype.initListener = function () {
            //点击事件
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
            // // // 输入框change事件
            // this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            // this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            // this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_IN, this.onEditChange, this);
            // this.registerEvent(this.chipEdit0, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            // this.registerEvent(this.chipEdit1, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
            // this.registerEvent(this.chipEdit2, egret.TouchEvent.FOCUS_OUT, this.onEditChange, this);
        };
        /** 有房间成功下注显示的通知 */
        MultiBaccBaseUI.prototype.showOkeyBetMsg = function (msgArr) {
        };
        /*------------------------------- list -----------------------------------*/
        /** 初始化List */
        MultiBaccBaseUI.prototype.initList = function () {
            if (game.GlobalConfig.isMobile) {
                this.mulitList.itemRenderer = game.MulitBaccItemUI1;
            }
            else {
                this.mulitList.itemRenderer = game.PCMulitBaccItemUI1;
            }
            var arr = game.ClubModel.getInstance().multiRoomList;
            this.deskData = arr;
            this.mulitList.addItems(arr);
            this.mulitScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            if (arr && arr.length) {
                this.showListMsg(false);
            }
            else {
                this.showListMsg(true);
            }
        };
        ;
        /** 是否显示列表为空 */
        MultiBaccBaseUI.prototype.showListMsg = function (b) {
            if (b) {
                this.label_HaveNothing.visible = true;
            }
            else {
                this.label_HaveNothing.visible = false;
            }
        };
        /** 执行所有item的方法 */
        MultiBaccBaseUI.prototype.runAllItemFuc = function (fucName, params) {
            if (params === void 0) { params = null; }
            if (this.mulitList) {
                for (var i = 0; i < this.deskData.length; i++) {
                    var item = this.mulitList.getItem('data', this.deskData[i]);
                    if (item) {
                        item[fucName](params);
                    }
                }
            }
        };
        /** 执行某个item的方法 */
        MultiBaccBaseUI.prototype.runItemFuc = function (roomID, fucName, params) {
            if (params === void 0) { params = null; }
            if (this.mulitList) {
                var item = this.mulitList.getItem('data', roomID);
                if (item) {
                    item[fucName](params);
                }
            }
        };
        /** 通过souresID执行所有使用这个souresID（同一个视频源）的方法 */
        MultiBaccBaseUI.prototype.updataItemFuc = function (souresID, fucName, params) {
            if (params === void 0) { params = null; }
            var arr = this.deskData;
            if (arr && arr['length'] && this.mulitList) {
                for (var i = 0; i < arr.length; i++) {
                    var newSouresID = game.ClubModel.getInstance().roomIDTosouceID(arr[i]);
                    if (newSouresID == souresID) {
                        this.runItemFuc(arr[i], fucName, params);
                    }
                }
            }
        };
        MultiBaccBaseUI.prototype.initListLoader = function () {
            this.listLoader = game.ListLoader.getInstance();
            this.listLoader.setList(this.mulitScroller, this.loadCallBack, this, this.freshCallBack);
        };
        /** 下拉执行的事件 */
        MultiBaccBaseUI.prototype.freshCallBack = function () {
            var _this = this;
            if (this.zonePage <= 0) {
                this.showScrollerMsg();
                setTimeout(function () {
                    _this.listLoader.setLoadComplete();
                }, 1000);
            }
            else {
                if (this.thePage <= this.zonePage && this.thePage > 0) {
                    this.thePage--;
                    if (this.thePage < 0) {
                        this.thePage = 0;
                    }
                    game.BaccaratController.getInstance().sendMultiClubEnter(this.thePage).then(function () {
                        _this.mulitList.removeAll();
                        var arr = game.ClubModel.getInstance().multiRoomList;
                        _this.mulitList.addItems(arr);
                        _this.isHaveNextPage();
                        _this.upDataSouresList();
                    });
                }
                else {
                    this.isHaveNextPage();
                }
            }
        };
        /** 上拉执行的事件 */
        MultiBaccBaseUI.prototype.loadCallBack = function () {
            var _this = this;
            if (this.zonePage <= 0) {
                this.showScrollerMsg();
                setTimeout(function () {
                    _this.listLoader.setLoadComplete();
                }, 1000);
            }
            else {
                if (this.thePage < this.zonePage) {
                    this.thePage++;
                    game.BaccaratController.getInstance().sendMultiClubEnter(this.thePage).then(function () {
                        _this.mulitList.removeAll();
                        var arr = game.ClubModel.getInstance().multiRoomList;
                        _this.mulitList.addItems(arr);
                        _this.isHaveNextPage();
                        _this.upDataSouresList();
                    });
                }
                else {
                    this.isHaveNextPage();
                }
            }
        };
        /** 更新视频列表 */
        MultiBaccBaseUI.prototype.upDataSouresList = function () {
        };
        /** 是否有下一页 */
        MultiBaccBaseUI.prototype.isHaveNextPage = function () {
            this.zonePage = Math.ceil(game.ClubModel.getInstance().getTheClubPlainRooms().length / this.num) - 1;
            if (this.zonePage < 0) {
                this.zonePage = 0;
                this.listLoader.setAllLoaded();
            }
            if (this.zonePage > 0 && this.thePage < this.zonePage) {
                this.listLoader.setLoadComplete();
            }
            else {
                this.listLoader.setAllLoaded();
            }
        };
        /** 提示翻页无内容 */
        MultiBaccBaseUI.prototype.showScrollerMsg = function () {
            var _this = this;
            game.CTween.removeTweens(this.scrollerMsg);
            this.scrollerMsg.visible = true;
            this.scrollerMsg.alpha = 1;
            game.CTween.get(this.scrollerMsg).to({ alpha: 0.01 }, 3000).call(function () {
                _this.scrollerMsg.visible = false;
                _this.scrollerMsg.alpha = 0.01;
            }, this);
        };
        MultiBaccBaseUI.prototype.upDataMulitList = function () {
            var _this = this;
            game.BaccaratController.getInstance().sendMultiClubEnter(this.thePage).then(function () {
                _this.mulitList.removeAll();
                var arr = game.ClubModel.getInstance().multiRoomList;
                _this.mulitList.addItems(arr);
                _this.isHaveNextPage();
            });
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        MultiBaccBaseUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.listLoader) {
                this.listLoader.dispose();
            }
            this.deskData = null;
            this.mulitList = null;
        };
        return MultiBaccBaseUI;
    }(game.BaseUI));
    game.MultiBaccBaseUI = MultiBaccBaseUI;
    __reflect(MultiBaccBaseUI.prototype, "game.MultiBaccBaseUI");
})(game || (game = {}));
//# sourceMappingURL=MulitBaccBaseUI.js.map