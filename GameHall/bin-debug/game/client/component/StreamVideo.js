var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game_1) {
    /**
     *
     */
    var StreamVideo = (function () {
        function StreamVideo() {
            this.maxReconnectCount = 300; //最大的重连视频次数
            this._videoWidth = 0; //视频当前的真正宽度
            this._curGame = "none";
            this.playerComs = [];
            this.xplayer2Args = {};
            this.isSciboRoulette = false;
            /**
             * 更新窗口尺寸         */
            this.lastSizeH = -1;
            this.lastSizeW = -1;
            this.mainDiv = document.getElementById("mainDiv");
            //只有支持flash的pc浏览器才使用flash播放视频
            this.initVideoPlayCanavas();
            this.clearPos();
            this.updateSize(null);
            game_1.StageUtil.stage.addEventListener(egret.Event.RESIZE, this.updateSize, this);
            game_1.StageUtil.stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
        }
        StreamVideo.getInstance = function () {
            if (this.instance == null) {
                this.instance = new StreamVideo();
            }
            return this.instance;
        };
        /**
         * 检查canava的videoPlayer节点
         */
        StreamVideo.prototype.initVideoPlayCanavas = function () {
            this.videoPlayer = document.getElementById("videolayer");
            var firstChild = this.mainDiv.firstChild;
            if (this.videoPlayer == null) {
                this.videoPlayer = document.createElement('canvas');
                this.videoPlayer.id = "videolayer";
                this.mainDiv.insertBefore(this.videoPlayer, firstChild);
            }
            this.videoPlayer.width = 854;
            this.videoPlayer.height = 480;
            this.videoPlayer.style = "z-index:0;position:absolute;left: 0;top: 0;;width:100%;height:100%;";
            this.videoPlayer.style.display = "none";
        };
        /**
         * @param flag 需要将视频显示到顶层传true，显示在ui下层传false
         *  */
        StreamVideo.prototype.popVideo = function (flag) {
            this.videoPlayer.style.zIndex = flag ? 1 : 0;
        };
        StreamVideo.prototype.clearPos = function () {
            this.posX = 0;
            this.posY = 0;
            this.absolute = false;
            this.posW = game_1.StageUtil.width;
            this.posH = game_1.StageUtil.height;
        };
        /**
         * 视频默认是居中的
         * 所以填写x、y允许填写负值，以便向左移动
         *  */
        StreamVideo.prototype.setPos = function (x, y, w, h, absolute) {
            if (absolute === void 0) { absolute = false; }
            this.posX = x;
            this.posY = y;
            this.posW = w;
            this.posH = h;
            this.absolute = absolute;
            this.updateSize(null);
        };
        StreamVideo.prototype.createXPlayer = function (timeStrap) {
            return null;
        };
        StreamVideo.prototype.isScaleByHeight = function () {
            var nowInnerHeight = window.innerHeight;
            var WHScale = document.documentElement.clientWidth / window.innerHeight;
            if (WHScale < 1.3 || WHScale > 1.8) {
                return false;
            }
            else {
                return true; //isBasedOnHeight
            }
        };
        //h5视频，不需要传递isBasedOnHeight，这里直接做了判定，同一个视频在不同尺寸的界面，布局方式不一样。现在界面传的参数不准确，这里重新判定
        /**
         * 链接视频回放
         * isPlayback: 是否是回放的视频，回放视频的前面端口不一样
         */
        StreamVideo.prototype.connectVideo = function (thisObject, url, callBack, errorCallback, game, isPlayback) {
            if (errorCallback === void 0) { errorCallback = null; }
            if (game === void 0) { game = "none"; }
            if (isPlayback === void 0) { isPlayback = false; }
            this.clearPos();
            game_1.MediatorManager.openMediator(game_1.Mediators.Mediator_VideoLoading);
            // ModuleManager.openModule(enums.ModuleName.LoadingVideoModule, null, enums.LayerConst.LAYER_SYSTEM);
            this.isSelfClose = false;
            game_1.DebugUtil.debug("[H5Video] connectVideo--" + (game_1.GlobalConfig.mediaCdn + url), game_1.LogConst.LOGTYPE_MSG_FIRED);
            this.left = 0;
            this.url = "video:" + game_1.GlobalConfig.mediaCdn + "" + url;
            var timeStrap = new Date().getTime();
            var _xplayer = new XPlayer(timeStrap);
            _xplayer.init(this.videoPlayer);
            this.currentVideoId = timeStrap;
            var x2Args = {};
            //记录xplayer 参数
            x2Args.timeStrap = timeStrap;
            x2Args.thisObject = thisObject;
            x2Args.url = this.url;
            x2Args.mediaUrl = "";
            x2Args.callBack = callBack;
            x2Args.errorCallback = errorCallback;
            x2Args.isVideoCallBack = true;
            this.xplayer2Args[timeStrap + ""] = x2Args;
            this.playerComs.push(_xplayer);
            this.initCanvas(x2Args, _xplayer);
            return _xplayer;
        };
        /**
       * 链接视频服务器
       */
        StreamVideo.prototype.connectByUrl = function (thisObject, url, callBack, errorCallback, mediaUrl, loadingPos, game) {
            if (mediaUrl === void 0) { mediaUrl = ""; }
            if (loadingPos === void 0) { loadingPos = null; }
            if (game === void 0) { game = "none"; }
            this.clearPos();
            game_1.MediatorManager.openMediator(game_1.Mediators.Mediator_VideoLoading, loadingPos);
            // ModuleManager.openModule(enums.ModuleName.LoadingVideoModule, null, enums.LayerConst.LAYER_TIP);
            this.isSelfClose = false;
            game_1.DebugUtil.debug("[H5Video] connectByUrl--" + (url + mediaUrl), game_1.LogConst.LOGTYPE_MSG_FIRED);
            this.left = 0;
            var timeStrap = new Date().getTime();
            var _xplayer = new XPlayer(timeStrap);
            this.currentVideoId = timeStrap;
            _xplayer.init(this.videoPlayer);
            var x2Args = {};
            //记录xplayer 参数
            x2Args.timeStrap = timeStrap;
            x2Args.url = url;
            x2Args.mediaUrl = mediaUrl;
            x2Args.callBack = callBack;
            x2Args.thisObject = thisObject;
            x2Args.errorCallback = errorCallback;
            x2Args.isVideoCallBack = false;
            this.xplayer2Args[timeStrap + ""] = x2Args;
            this.playerComs.push(_xplayer);
            this.initCanvas(x2Args, _xplayer);
            return _xplayer;
        };
        StreamVideo.prototype.initCanvas = function (x2Args, xplayer) {
            var self = this;
            if (xplayer.ready) {
                xplayer.play();
            }
            //this.updateSize(null);
            game_1.DebugUtil.debug("[H5Video] setSourceUrl--" + (x2Args.url + x2Args.mediaUrl), game_1.LogConst.LOGTYPE_MSG_FIRED);
            // xplayer.setSourceUrl("video://192.168.8.158:8982/video/game");
            xplayer.setSourceUrl(x2Args.url + x2Args.mediaUrl);
            xplayer.setStatusListener(function (code, id, msg) {
                game_1.DebugUtil.debug("[H5Video] statusListener--currentVideoID=" + self.currentVideoId + ".listenerVideoID = " + id + ",status=[" + code + ":" + msg + "]", game_1.LogConst.LOGTYPE_MSG_FIRED);
                var currentInfo = self.xplayer2Args[self.currentVideoId];
                switch (code) {
                    case 100:
                        if (self.currentVideoId != id)
                            return;
                        xplayer.ready = true;
                        xplayer.play();
                        break;
                    case 103:
                        if (self.currentVideoId != id)
                            return;
                        self.videoPlayer.style.display = "block";
                        game_1.DebugUtil.debug("ConnectSuccess Video[H5] ws:[" + self.url + "],stream:[" + (self.mediaUrl) + "]", game_1.LogConst.LOGTYPE_MSG_FIRED);
                        // ModuleManager.closeModuleByName(enums.ModuleName.LoadingVideoModule);
                        game_1.MediatorManager.closeMediator(game_1.Mediators.Mediator_VideoLoading.name);
                        if (!self.absolute) {
                            // ModuleManager.getModule(enums.ModuleName.BackgroundView, "hideBg", false);
                            game_1.GameController.getInstance().sendNotification(game_1.NotifyConst.Notify_Background_Hide, true);
                        }
                        if (currentInfo && currentInfo.callBack) {
                            currentInfo.callBack.call(currentInfo.thisObject);
                        }
                        self.updateSize(null);
                        break;
                    case 104:
                        self.removePlayer(id);
                        if (self.currentVideoId != id) {
                            return;
                        }
                        if (currentInfo && currentInfo.errorCallback) {
                            currentInfo.errorCallback.call(currentInfo.thisObject);
                        }
                        game_1.MediatorManager.closeMediator(game_1.Mediators.Mediator_VideoLoading.name);
                        // ModuleManager.closeModuleByName(enums.ModuleName.LoadingVideoModule);
                        game_1.DebugUtil.debug("ConnectClose Video[H5] ws:[" + self.url + "],stream:[" + (self.mediaUrl) + "]", game_1.LogConst.LOGTYPE_MSG_FIRED);
                        if (!self.isSelfClose && self.maxReconnectCount > 0) {
                            self.maxReconnectCount--;
                            if (xplayer.ready) {
                                xplayer.play();
                            }
                        }
                        break;
                    case 105:
                        self.removePlayer(id);
                        break;
                }
            });
        };
        StreamVideo.prototype.removePlayer = function (id) {
            for (var i = 0; i < this.playerComs.length; i++) {
                if (this.playerComs[i] && this.playerComs[i]["id"] == id) {
                    this.playerComs.splice(i, 1);
                    break;
                }
            }
            if (this.xplayer2Args[id])
                delete this.xplayer2Args[id];
            game_1.DebugUtil.debug_logOnly("[H5Video] removePlayer--set videoId:" + id + " = null", game_1.LogConst.LOGTYPE_MSG_FIRED);
        };
        /**
         * 继续播放
         */
        StreamVideo.prototype.play = function (xplayer) {
            if (xplayer && xplayer.ready) {
                game_1.DebugUtil.debug_logOnly("[H5Video] play--" + xplayer.id, game_1.LogConst.LOGTYPE_MSG_FIRED);
                xplayer.resume();
            }
        };
        /**
         * 暂停渲染
         */
        StreamVideo.prototype.pause = function (xplayer) {
            if (xplayer && xplayer.ready) {
                game_1.DebugUtil.debug_logOnly("[H5Video] pause--" + xplayer.id, game_1.LogConst.LOGTYPE_MSG_FIRED);
                xplayer.pause();
            }
        };
        /**
         * 获取视频总时间
         */
        StreamVideo.prototype.totalTime = function (xplayer) {
            if (xplayer && xplayer.ready) {
                return xplayer.getDuration();
            }
            return 0;
        };
        /**
         * 获取视频当前播放的时间
         */
        StreamVideo.prototype.currentTime = function (xplayer) {
            if (xplayer && xplayer.ready) {
                return xplayer.getCurrentTime();
            }
            return 0;
        };
        /**
         * 视频跳到指定时间
         * 视频回放
         * */
        StreamVideo.prototype.seekSeconds = function (sec, xplayer) {
            if (this.isVideoCallBack == true) {
                if (xplayer && xplayer.ready) {
                    game_1.DebugUtil.debug_logOnly("[H5Video] seek--" + xplayer.id, game_1.LogConst.LOGTYPE_MSG_FIRED);
                    xplayer.seek(sec);
                }
            }
        };
        /**
         * 关闭视频服务器         */
        StreamVideo.prototype.close = function (xplayer) {
            /*if(this._isClosedFirstTime) return;
            this._isClosedFirstTime = true;*/
            this.isSelfClose = true;
            game_1.MediatorManager.closeMediator(game_1.Mediators.Mediator_VideoLoading.name);
            game_1.GameController.getInstance().sendNotification(game_1.NotifyConst.Notify_Background_Hide, false);
            if (xplayer) {
                game_1.DebugUtil.debug_logOnly("[H5Video] close--" + xplayer.id, game_1.LogConst.LOGTYPE_MSG_FIRED);
                xplayer && xplayer.stop();
                this.currentVideoId = 0;
            }
            //关闭视频的同时， 清空画布内容
            var context = this.videoPlayer.getContext("2d");
            if (context) {
                context.clearRect(0, 0, this.videoPlayer.width, this.videoPlayer.height);
                // this.videoPlayer.style.display = "none";
            }
            this.videoPlayer.style.display = "none";
        };
        StreamVideo.prototype.updateSize = function (evt) {
            var w = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
            var h = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
            var canvas = this.videoPlayer;
            var constScale = game_1.StageUtil.height / game_1.StageUtil.width;
            var mobileHeight = 830; //移动版游戏内固定高度
            var gameW = w;
            var gameH = h;
            var videoW = w;
            var videoH = h;
            var offY = 0;
            var offX = 0;
            var abOffX = 0;
            var abOffY = 0;
            if (canvas != null) {
                if (canvas['userTyping'])
                    return;
                if (!game_1.GlobalConfig.isMobile) {
                    if (h / w >= constScale) {
                        videoH = game_1.StageUtil.height * w / game_1.StageUtil.width;
                        gameH = game_1.StageUtil.height * w / game_1.StageUtil.width;
                        abOffY = (h - videoH) / 2;
                    }
                    else {
                        videoW = game_1.StageUtil.width * h / game_1.StageUtil.height;
                        gameW = game_1.StageUtil.width * h / game_1.StageUtil.height;
                        abOffX = (w - videoW) / 2;
                    }
                    videoW = videoW * (this.posW / game_1.StageUtil.width);
                    videoH = videoH * (this.posH / game_1.StageUtil.height);
                    offX = (w - videoW) / 2 + (w * this.posX / game_1.StageUtil.width);
                    offY = (h - videoH) / 2 + (h * this.posY / game_1.StageUtil.height); //默认为居中适配，百家乐游戏内和视频预览
                    // console.warn("videoW:",videoW);
                    // console.warn("videoH:",videoH);
                    // console.warn("offY:",offY);
                    // console.warn("offX:",offX);
                    if (this.absolute) {
                        offX = abOffX + (gameW * this.posX / game_1.StageUtil.width);
                        offY = abOffY + (gameH * this.posY / game_1.StageUtil.height);
                    }
                    canvas.style.width = videoW + "px";
                    canvas.style.height = videoH + "px";
                    canvas.style.top = offY + "px";
                    canvas.style.left = offX + "px";
                }
                else {
                    if (this.absolute) {
                        videoH = h * (this.posH / game_1.StageUtil.height);
                        videoW = w * (this.posW / game_1.StageUtil.width);
                        offX = (w * (this.posX / game_1.StageUtil.width));
                        offY = (h * (this.posY / game_1.StageUtil.height));
                        canvas.style.top = offY + "px";
                        canvas.style.left = offX + "px";
                        canvas.style.width = videoW + "px";
                        canvas.style.height = videoH + "px";
                    }
                    else {
                        videoH = h * (mobileHeight / game_1.StageUtil.height);
                        canvas.style.top = 0 + "px";
                        canvas.style.left = 0 + "px";
                        canvas.style.width = videoW + "px";
                        canvas.style.height = videoH + "px";
                    }
                }
                this._videoWidth = videoW;
                game_1.DebugUtil.debug_logOnly("[UpdateSizeH5: ]" + videoW + "x" + videoH, game_1.LogConst.LOGTYPE_MSG_FIRED);
            }
        };
        Object.defineProperty(StreamVideo.prototype, "left", {
            /**
             * 设置视频的left值
             */
            set: function (value) {
                if (this.videoPlayer) {
                    this.videoPlayer.style.position = "absolute";
                    this.videoPlayer.style.zIndex = 0;
                    this.videoPlayer.style.left = value + "px";
                }
            },
            enumerable: true,
            configurable: true
        });
        StreamVideo.prototype.onActive = function (evt) {
            this.updateSize(null);
        };
        Object.defineProperty(StreamVideo.prototype, "videoWidth", {
            /**
             * 获取视频宽度
             */
            get: function () {
                return this._videoWidth;
            },
            enumerable: true,
            configurable: true
        });
        return StreamVideo;
    }());
    game_1.StreamVideo = StreamVideo;
    __reflect(StreamVideo.prototype, "game.StreamVideo");
})(game || (game = {}));
//# sourceMappingURL=StreamVideo.js.map