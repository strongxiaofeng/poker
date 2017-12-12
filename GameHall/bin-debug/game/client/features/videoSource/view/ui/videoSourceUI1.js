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
    var videoSourceUI1 = (function (_super) {
        __extends(videoSourceUI1, _super);
        function videoSourceUI1(data) {
            var _this = _super.call(this, data) || this;
            _this.timeConst = 10;
            _this.skinName = "resource/skins/game_skins/mobile/homeOwner/selectVideo/videoInfoSkin.exml";
            return _this;
        }
        /** 接收Mediator通知*/
        videoSourceUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case videoSourceCommands.VIUINotify_upDate:
                    this.upDate(params, 'upData');
                    break;
                case videoSourceCommands.VIUINotify_showRoadMap:
                    this.upDate(params, 'upDateRoadMap');
                    break;
                case videoSourceCommands.showPreview:
                    this.showPreview(params);
                    break;
            }
        };
        videoSourceUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
            this.hidenPreview();
        };
        /** 初始化UI*/
        videoSourceUI1.prototype.initList = function () {
            var arr = game.ClubModel.getInstance().getRoomSourcesArrKey(this.data);
            this.ListData = new eui.ArrayCollection(arr);
            this.VideoList.dataProvider = this.ListData;
            this.VideoList.itemRenderer = game.videoSourceItem;
            this.VideoScroller.viewport = this.VideoList;
            this.VideoScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.ListData.refresh();
        };
        // 更新List数据
        videoSourceUI1.prototype.upDateList = function () {
            var arr = game.ClubModel.getInstance().getRoomSourcesArrKey(this.data);
            this.ListData.source = arr;
            this.ListData.refresh();
        };
        // 收到订阅的数据,更新List
        videoSourceUI1.prototype.upDate = function (sourceID, fucName, params) {
            if (params === void 0) { params = null; }
            if (this.VideoList) {
                for (var i = 0; i < this.VideoList.dataProvider.length; i++)
                    if (this.VideoList.getElementAt(i)) {
                        if (this.VideoList.getElementAt(i)["data"] == sourceID) {
                            this.VideoList.getElementAt(i)[fucName]();
                        }
                    }
            }
        };
        /** 通过souresID执行所有使用这个souresID（同一个视频源）的方法 */
        videoSourceUI1.prototype.updataItemFuc = function (souresID, fucName, params) {
            if (params === void 0) { params = null; }
            var arr = game.ClubModel.getInstance().getTheClubRooms();
            if (arr && arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    var newSouresID = game.ClubModel.getInstance().roomIDTosouceID(arr[i]);
                    if (newSouresID == souresID) {
                        this.upDate(arr[i], fucName, params);
                    }
                }
            }
        };
        /** 预览视频*/
        videoSourceUI1.prototype.showPreview = function (params) {
            // this.showVideoGroup.visible = true;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hidenPreview, this);
            this.params = params;
            game.CTweenManagerController.getInstance().startCTween(1, [this.showGroup, this.showVideoGroup], true, this.videoGo, this);
        };
        /**加载视频*/
        videoSourceUI1.prototype.videoGo = function () {
            game.LayerManager.getInstance().addUI(this.showVideoGroup, enums.LayerConst.LAYER_TOP);
            var pt = this.videoGroup.localToGlobal(0, 0);
            this.xplayer = game.StreamVideo.getInstance().connectByUrl(this, "video:" + game.GlobalConfig.mediaCdn, this.onVideoConnected, this.onVideoConnectError, this.params, pt);
            this.timer = new egret.Timer(1000, this.timeConst);
            this.timeALabel.text = "10s";
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.timer.start();
        };
        videoSourceUI1.prototype.timerFunc = function (e) {
            var showTime = this.timeConst - e.target.currentCount;
            this.timeALabel.text = showTime + "s";
        };
        videoSourceUI1.prototype.timerComFunc = function () {
            if (this.timer) {
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
                this.timer.stop();
                this.timer = null;
            }
            this.hidenPreview();
        };
        /** 关闭预览*/
        videoSourceUI1.prototype.hidenPreview = function () {
            // this.showVideoGroup.visible = false;
            game.CTweenManagerController.getInstance().startCTween(1, [this.showGroup, this.showVideoGroup], false);
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hidenPreview, this);
            this.addChild(this.showVideoGroup);
            this.closeVideo();
        };
        videoSourceUI1.prototype.closeVideo = function () {
            game.StreamVideo.getInstance().popVideo(false);
            game.StreamVideo.getInstance().close(this.xplayer);
            this.xplayer = null;
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoLoading.name);
        };
        videoSourceUI1.prototype.onVideoConnected = function () {
            game.StreamVideo.getInstance().popVideo(true);
            var pt = this.videoGroup.localToGlobal(0, 0);
            // console.warn("this.videoGroup:",pt.x,pt.y,this.videoGroup.width,this.videoGroup.height);
            game.StreamVideo.getInstance().setPos(pt.x, pt.y, this.videoGroup.width, this.videoGroup.height, true);
        };
        videoSourceUI1.prototype.onVideoConnectError = function () {
        };
        videoSourceUI1.prototype.dispose = function () {
            this.ListData = null;
            this.VideoList = null;
            this.timerComFunc();
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return videoSourceUI1;
    }(game.videoSourceBaseUI));
    game.videoSourceUI1 = videoSourceUI1;
    __reflect(videoSourceUI1.prototype, "game.videoSourceUI1");
})(game || (game = {}));
//# sourceMappingURL=videoSourceUI1.js.map