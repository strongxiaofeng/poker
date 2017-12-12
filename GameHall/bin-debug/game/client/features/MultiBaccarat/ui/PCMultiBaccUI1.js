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
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    var PCMultiBaccUI1 = (function (_super) {
        __extends(PCMultiBaccUI1, _super);
        function PCMultiBaccUI1(isGuide) {
            if (isGuide === void 0) { isGuide = false; }
            var _this = _super.call(this, isGuide) || this;
            _this.msgArrData = [];
            _this.msgMax = 0;
            return _this;
        }
        PCMultiBaccUI1.prototype.initSetting = function () {
            var _this = this;
            _super.prototype.initSetting.call(this);
            if (this._isGuide) {
                this.souresData = new eui.ArrayCollection();
                for (var i = 0; i < 12; i++) {
                    this.souresData.addItem({ "num": i });
                }
                this.souresList.itemRenderer = game.souresItem;
                this.souresList.useVirtualLayout = false;
                this.souresList.dataProvider = this.souresData;
                this.souresData.refresh();
                this.souresScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                this.msgData = [[["bet", 90000000, "百家乐1号房"], 90000000],
                    [["bet", 8000000, "百家乐3号房"], 90000000],
                    [["payout", 100000, "百家乐1号房"], 90000000],
                    [["bet", 2000000, "百家乐2号房"], 90000000],
                    [["payout", 80000000, "百家乐3号房"], 90000000],
                    [["bet", 100000, "百家乐1号房"], 90000000],
                    [["bet", 5000000, "百家乐3号房"], 90000000],
                    [["payout", 100000, "百家乐5号房"], 90000000]];
                this.recordList.itemRenderer = game.msgItem;
                this.recordScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                this.recordList.mouseWheelEnable = true;
                this.recordList.addItems(this.msgData);
                return;
            }
            this.setSouresList();
            this.initMsgList();
            var arr = game.ClubModel.getInstance().multiRoomList;
            if (arr && arr['length']) {
                this.setTimeNum = setTimeout(function () {
                    var e = {};
                    e['item'] = { num: 0, roomID: arr[0] };
                    e['itemRenderer'] = _this.souresList.getElementAt(0);
                    _this.onListItem(e);
                    _this.setTimeNum = null;
                }, this, 1000);
            }
        };
        PCMultiBaccUI1.prototype.initListener = function () {
            _super.prototype.initListener.call(this);
            this.registerEvent(this.souresList, eui.ItemTapEvent.ITEM_TAP, this.onListItem, this);
        };
        PCMultiBaccUI1.prototype.clearSouresItemState = function () {
            if (this.souresList.numElements > 0) {
                for (var i = this.souresList.numElements - 1; i >= 0; i--) {
                    var item = this.souresList.getChildAt(i);
                    if (item) {
                        item.select(false);
                    }
                }
            }
        };
        PCMultiBaccUI1.prototype.onListItem = function (e) {
            this.closeVideo();
            this.clearSouresItemState();
            var data = e.item;
            var item = e.itemRenderer;
            item.select(true);
            this.roomNameLabel.text = game.ClubModel.getInstance().getRoomName(data.roomID);
            this.souresPlayerName.text = data.num + 1 + '号桌';
            // let source = ClubModel.getInstance().getSourceToSourceID(data.soureceID);
            var source = game.ClubModel.getInstance().getRoomSource(data.roomID);
            var pt = this.videoGroup.localToGlobal(-60, 0);
            game.StreamVideo.getInstance().connectByUrl(this, "video:" + game.GlobalConfig.mediaCdn, this.onVideoConnected, this.onVideoConnectError, source.video, pt);
            game.StreamVideo.getInstance().absolute = true;
        };
        PCMultiBaccUI1.prototype.onVideoConnected = function () {
            game.StreamVideo.getInstance().popVideo(true);
            var pt = this.videoGroup.localToGlobal(0, 0);
            game.StreamVideo.getInstance().setPos(pt.x, pt.y, this.videoGroup.width, this.videoGroup.height - 40, true);
        };
        PCMultiBaccUI1.prototype.onVideoConnectError = function () {
        };
        PCMultiBaccUI1.prototype.closeVideo = function () {
            game.StreamVideo.getInstance().popVideo(false);
            game.StreamVideo.getInstance().close(this.xplayer);
            this.xplayer = null;
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoLoading.name);
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        PCMultiBaccUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            _super.prototype.onMediatorCommand.call(this, type, params);
            switch (type) {
            }
        };
        /** 是否显示列表为空 */
        PCMultiBaccUI1.prototype.showListMsg = function (b) {
            if (b) {
                this.label_HaveNothing.visible = true;
                this.bodyGroup.visible = false;
            }
            else {
                this.label_HaveNothing.visible = false;
                this.bodyGroup.visible = true;
            }
        };
        /** 设置视频List */
        PCMultiBaccUI1.prototype.setSouresList = function () {
            var arr = game.ClubModel.getInstance().multiRoomList;
            var sourceArr = [];
            if (arr && arr['length']) {
                for (var i = 0; i < arr.length; i++) {
                    // let soureceID = ClubModel.getInstance().getRoomSourceID(arr[i]);
                    // sourceArr.push({ num: i, soureceID: soureceID })
                    sourceArr.push({ num: i, roomID: arr[i] });
                }
                this.souresData = new eui.ArrayCollection(sourceArr);
                // this.souresData.source = sourceArr;
                this.souresList.itemRenderer = game.souresItem;
                this.souresList.useVirtualLayout = false;
                this.souresList.dataProvider = this.souresData;
                this.souresData.refresh();
                this.souresScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
        };
        /** 刷新视频List */
        PCMultiBaccUI1.prototype.upDataSouresList = function () {
            var _this = this;
            this.souresData = null;
            this.souresData = new eui.ArrayCollection();
            var arr = game.ClubModel.getInstance().multiRoomList;
            var sourceArr = [];
            if (arr && arr['length']) {
                for (var i = 0; i < arr.length; i++) {
                    // let soureceID = ClubModel.getInstance().getRoomSourceID(arr[i]);
                    // sourceArr.push({ num: i, soureceID: soureceID })
                    sourceArr.push({ num: i, roomID: arr[i] });
                }
            }
            this.souresData.source = sourceArr;
            this.souresList.dataProvider = this.souresData;
            this.souresData.refresh();
            if (this.updataSetTimeNum) {
                clearTimeout(this.updataSetTimeNum);
            }
            this.updataSetTimeNum = setTimeout(function () {
                var e = {};
                e['item'] = { num: 0, roomID: arr[0] };
                e['itemRenderer'] = _this.souresList.getElementAt(0);
                _this.onListItem(e);
                _this.updataSetTimeNum = null;
            }, this, 1000);
        };
        /** 设置右下角消息的list */
        PCMultiBaccUI1.prototype.initMsgList = function () {
            this.msgData = [];
            this.recordList.itemRenderer = game.msgItem;
            this.recordScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.recordList.mouseWheelEnable = true;
        };
        /** 刷新消息List */
        PCMultiBaccUI1.prototype.upDataMsgList = function (arr) {
            if (arr && arr['length']) {
                this.msgData = arr;
                this.recordList.addItems(arr);
            }
        };
        /** 有房间成功下注显示的通知 */
        PCMultiBaccUI1.prototype.showOkeyBetMsg = function (msgArr) {
            if (msgArr && msgArr['length']) {
                if (msgArr[1] > this.msgMax) {
                    this.msgMax = msgArr[1];
                }
                for (var i = 0; i < this.msgArrData.length; i++) {
                    var arr = this.msgArrData[i];
                    arr[1] = this.msgMax;
                }
                this.msgArrData.unshift([msgArr, this.msgMax]);
                this.recordList.removeAll();
                this.recordList.addItems(this.msgArrData);
            }
        };
        /** 执行soureList所有item的方法 */
        PCMultiBaccUI1.prototype.runAllSoureceItemFuc = function (fucName, params) {
            if (params === void 0) { params = null; }
            if (this.souresList) {
                for (var i = 0; i < this.souresList.dataProvider.length; i++)
                    if (this.souresList.getElementAt(i)) {
                        this.souresList.getElementAt(i)[fucName](params);
                    }
            }
        };
        /** 执行soureList某个item的方法 */
        PCMultiBaccUI1.prototype.runSoureceItemFuc = function (roomID, fucName, params) {
            if (params === void 0) { params = null; }
            if (this.souresList) {
                for (var i = 0; i < this.souresList.dataProvider.length; i++)
                    if (this.souresList.getElementAt(i)) {
                        if (this.souresList.getElementAt(i)["data"] == roomID) {
                            this.souresList.getElementAt(i)[fucName](params);
                        }
                    }
            }
        };
        PCMultiBaccUI1.prototype.upDataMulitList = function () {
            var _this = this;
            game.BaccaratController.getInstance().sendMultiClubEnter(this.thePage).then(function () {
                _this.mulitList.removeAll();
                var arr = game.ClubModel.getInstance().multiRoomList;
                _this.mulitList.addItems(arr);
                _this.isHaveNextPage();
                _this.runAllItemFuc('setIndexNum');
                _this.upDataSouresList();
            });
        };
        PCMultiBaccUI1.prototype.dispose = function () {
            this.closeVideo();
            if (this.setTimeNum) {
                clearTimeout(this.setTimeNum);
                this.setTimeNum = null;
            }
            if (this.updataSetTimeNum) {
                clearTimeout(this.updataSetTimeNum);
                this.updataSetTimeNum = null;
            }
            _super.prototype.dispose.call(this);
        };
        return PCMultiBaccUI1;
    }(game.MultiBaccBaseUI));
    game.PCMultiBaccUI1 = PCMultiBaccUI1;
    __reflect(PCMultiBaccUI1.prototype, "game.PCMultiBaccUI1");
})(game || (game = {}));
//# sourceMappingURL=PCMultiBaccUI1.js.map