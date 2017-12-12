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
    var PbBacBaseUI = (function (_super) {
        __extends(PbBacBaseUI, _super);
        function PbBacBaseUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data[0];
            _this.callBackMediator = data[1];
            _this.skinName = game.SystemPath.skin_path + "screenPlayback/screenPlaybackBac.exml";
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        PbBacBaseUI.prototype.initSetting = function () {
            this.setResult();
        };
        /** 收到mediator的通知 */
        PbBacBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PbBacCommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        /** 注册事件监听器 */
        PbBacBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        };
        /** 响应点击事件 */
        PbBacBaseUI.prototype.onHandleTap = function (event) {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_PbBacMediator.name);
            if (!game.GlobalConfig.isMobile) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCNavbar);
                if (this.callBackMediator.name == game.Mediators.Mediator_AssetDetail.name) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedRoomList);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                }
                else {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedRoomList);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, true);
                }
            }
            if (this.callBackMediator.name == game.Mediators.Mediator_AssetDetail.name) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_AssetDetail, game.AssetDetailOpenType.GameRoom);
            }
            else {
                game.MediatorManager.openMediator(this.callBackMediator);
            }
        };
        PbBacBaseUI.prototype.showVideo = function (url) {
            // console.warn("showVideo",url);
            game.DebugUtil.debug("showVideo:" + url);
            this.videoBg.visible = true;
            if (url && url.length > 0) {
                this.xplayer = game.StreamVideo.getInstance().connectVideo(this, url, this.videoCallBack, this.videoError);
            }
        };
        /**进度条区初始化*/
        PbBacBaseUI.prototype.initProgress = function (total) {
        };
        PbBacBaseUI.prototype.videoCallBack = function () {
            this.videoBg.visible = false;
            game.UIManager.hideOtherUI(this);
            this._totalTime = Math.floor(game.StreamVideo.getInstance().totalTime(this.xplayer));
            this.initProgress("00:" + this._totalTime);
            // StreamVideo.getInstance().popVideo(true);
            //写个onframe
            this.intervalObj["time"] = setInterval(this.loop, 100, this);
        };
        /**进度条进度(进度条总长796)*/
        PbBacBaseUI.prototype.progress = function (cur) {
        };
        PbBacBaseUI.prototype.loop = function (self) {
            var cur = Math.floor(game.StreamVideo.getInstance().currentTime(self.xplayer));
            self.progress(cur);
            if (cur < self._totalTime) {
                if (cur >= 0 && cur < self._payouTime - 2) {
                    if (self._status != "play") {
                        // this.showPayout(false);
                        // this.showEffect(false);
                    }
                    self._status = "play";
                }
                else if (cur >= self._payouTime - 2 && cur < self._payouTime) {
                    if (self._status != "effect") {
                        // this.showEffect(true);
                        // this.showPayout(false);
                        self.betResult();
                    }
                    self._status = "effect";
                }
                else if (cur >= self._payouTime) {
                    if (self._status != "payout") {
                        // this.showPayout(true);
                        // this.showEffect(true);
                        self.payOut();
                    }
                    self._status = "payout";
                }
            }
        };
        PbBacBaseUI.prototype.videoError = function () {
        };
        /** 展示开彩详情 */
        PbBacBaseUI.prototype.setResult = function () {
        };
        /**结果时*/
        PbBacBaseUI.prototype.betResult = function () {
        };
        /**派彩时*/
        PbBacBaseUI.prototype.payOut = function () {
        };
        PbBacBaseUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.videoCallBack = null;
            game.UIManager.showOtherUI();
            game.StreamVideo.getInstance().close(this.xplayer);
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoLoading.name);
            // StreamVideo.getInstance().popVideo(false);
            this.xplayer = null;
        };
        return PbBacBaseUI;
    }(game.BaseUI));
    game.PbBacBaseUI = PbBacBaseUI;
    __reflect(PbBacBaseUI.prototype, "game.PbBacBaseUI");
})(game || (game = {}));
//# sourceMappingURL=PbBacBaseUI.js.map