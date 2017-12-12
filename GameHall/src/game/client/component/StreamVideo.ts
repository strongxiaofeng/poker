module game
{
	/**
	 *
	 */
    export class StreamVideo
    {
        private static instance: StreamVideo;
        public static getInstance(): StreamVideo
        {
            if (this.instance == null)
            {
                this.instance = new StreamVideo();
            }
            return this.instance;
        }

        private videoPlayer: any;                    //视频层
        private url: string;                         //视频服务器的地址
        private callBack: Function;             //链接成功后的回调
        private errorCallback: Function;        //链接失败后的回调
        private thisObject: any;
        private mediaUrl: string;         //服务器传过来的视频地址
        private mainDiv: any;
        private isSelfClose: boolean;     //是否是主动关闭的视频流
        private maxReconnectCount: number = 300;  //最大的重连视频次数
        private isVideoCallBack: boolean;  //是否是视频回放
        private _videoWidth: number = 0;   //视频当前的真正宽度
        private _curGame = "none";

        private playerComs: Array<XPlayer> = [];
        private xplayer2Args: any = {};
        private currentVideoId;

        public isSciboRoulette = false;

        private posX:number;
        private posY:number;
        private posW:number;
        private posH:number;
        public absolute:boolean;

        public constructor()
        {
            this.mainDiv = document.getElementById("mainDiv");
            //只有支持flash的pc浏览器才使用flash播放视频
            this.initVideoPlayCanavas();
            this.clearPos();
            this.updateSize(null);
            StageUtil.stage.addEventListener(egret.Event.RESIZE, this.updateSize, this);
            StageUtil.stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
        }
        /**
         * 检查canava的videoPlayer节点
         */
        private initVideoPlayCanavas(): void
        {
            this.videoPlayer = document.getElementById("videolayer");
            let firstChild = this.mainDiv.firstChild;
            if (this.videoPlayer == null)
            {
                this.videoPlayer = document.createElement('canvas');
                this.videoPlayer.id = "videolayer";
                this.mainDiv.insertBefore(this.videoPlayer,firstChild);
            }
            this.videoPlayer.width = 854;
            this.videoPlayer.height = 480;
            this.videoPlayer.style = "z-index:0;position:absolute;left: 0;top: 0;;width:100%;height:100%;";
            this.videoPlayer.style.display = "none";
        }

        /**
         * @param flag 需要将视频显示到顶层传true，显示在ui下层传false
         *  */
        public popVideo(flag:boolean):void
        {
            this.videoPlayer.style.zIndex = flag?1:0;
        }

        private clearPos():void
        {
            this.posX = 0;
            this.posY = 0;
            this.absolute = false;
            this.posW = StageUtil.width;
            this.posH = StageUtil.height;
        }

        /**
         * 视频默认是居中的
         * 所以填写x、y允许填写负值，以便向左移动
         *  */
        public setPos(x:number,y:number,w:number,h:number,absolute = false):void
        {
            this.posX = x;
            this.posY = y;
            this.posW = w;
            this.posH = h;
            this.absolute = absolute;
            this.updateSize(null);
        }

        public createXPlayer(timeStrap): XPlayer
        {
            return null;
        }
        public isScaleByHeight(): boolean
        {
            let nowInnerHeight: number = window.innerHeight;
            var WHScale = document.documentElement.clientWidth / window.innerHeight;
            if (WHScale < 1.3 || WHScale > 1.8)
            {
                return false;
            }
            else
            {
                return true; //isBasedOnHeight
            }
        }
        //h5视频，不需要传递isBasedOnHeight，这里直接做了判定，同一个视频在不同尺寸的界面，布局方式不一样。现在界面传的参数不准确，这里重新判定
        /**
         * 链接视频回放
         * isPlayback: 是否是回放的视频，回放视频的前面端口不一样
         */
        public connectVideo(thisObject: any, url: string, callBack: Function, errorCallback: Function = null,  game: string = "none", isPlayback:boolean = false): XPlayer
        {
            this.clearPos();
            MediatorManager.openMediator(Mediators.Mediator_VideoLoading);
            // ModuleManager.openModule(enums.ModuleName.LoadingVideoModule, null, enums.LayerConst.LAYER_SYSTEM);
            this.isSelfClose = false;
            
            DebugUtil.debug("[H5Video] connectVideo--" + (GlobalConfig.mediaCdn + url), LogConst.LOGTYPE_MSG_FIRED);
            this.left = 0;
            this.url = "video:" + GlobalConfig.mediaCdn + "" + url;
            var timeStrap = new Date().getTime();
            var _xplayer = new XPlayer(timeStrap);

            _xplayer.init(this.videoPlayer);
            this.currentVideoId = timeStrap;
            var x2Args: any = {};
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
        }
        /**
       * 链接视频服务器
       */
        public connectByUrl(thisObject: any, url: string, callBack: Function, errorCallback: Function, mediaUrl: string = "",loadingPos:any = null, game: string = "none"): XPlayer
        {
            this.clearPos();
            MediatorManager.openMediator(Mediators.Mediator_VideoLoading,loadingPos);
            // ModuleManager.openModule(enums.ModuleName.LoadingVideoModule, null, enums.LayerConst.LAYER_TIP);
            this.isSelfClose = false;
            
            DebugUtil.debug("[H5Video] connectByUrl--" + (url + mediaUrl), LogConst.LOGTYPE_MSG_FIRED);
            this.left = 0;
            var timeStrap = new Date().getTime();
            var _xplayer = new XPlayer(timeStrap);
            this.currentVideoId = timeStrap;

            _xplayer.init(this.videoPlayer);

            var x2Args: any = {};
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
        }

        private initCanvas(x2Args, xplayer): void
        {
            var self = this;
            if (xplayer.ready)
            {
                xplayer.play();
            }
            //this.updateSize(null);
            DebugUtil.debug("[H5Video] setSourceUrl--" + (x2Args.url + x2Args.mediaUrl), LogConst.LOGTYPE_MSG_FIRED);
            // xplayer.setSourceUrl("video://192.168.8.158:8982/video/game");
            xplayer.setSourceUrl(x2Args.url + x2Args.mediaUrl);
            xplayer.setStatusListener(function (code: number, id, msg: string)
            {
                DebugUtil.debug("[H5Video] statusListener--currentVideoID=" + self.currentVideoId + ".listenerVideoID = " + id + ",status=[" + code + ":" + msg + "]", LogConst.LOGTYPE_MSG_FIRED);
                var currentInfo = self.xplayer2Args[self.currentVideoId];
                switch (code)
                {
                    case 100:
                        if (self.currentVideoId != id) return;
                        xplayer.ready = true;
                        xplayer.play();
                        break;
                    case 103:
                        if (self.currentVideoId != id) return;
                        self.videoPlayer.style.display = "block";
                        DebugUtil.debug("ConnectSuccess Video[H5] ws:[" + self.url + "],stream:[" + (self.mediaUrl) + "]", LogConst.LOGTYPE_MSG_FIRED);
                        // ModuleManager.closeModuleByName(enums.ModuleName.LoadingVideoModule);
                        MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
                        if (!self.absolute)
                        {
                            // ModuleManager.getModule(enums.ModuleName.BackgroundView, "hideBg", false);
                            GameController.getInstance().sendNotification(NotifyConst.Notify_Background_Hide,true);
                        }
                        if (currentInfo && currentInfo.callBack)
                        {
                            currentInfo.callBack.call(currentInfo.thisObject);
                        }
                        self.updateSize(null);
                        break;
                    case 104:
                        self.removePlayer(id);
                        if (self.currentVideoId != id)
                        {
                            return;
                        }
                        if (currentInfo && currentInfo.errorCallback)
                        {
                            currentInfo.errorCallback.call(currentInfo.thisObject);
                        }
                        MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
                        // ModuleManager.closeModuleByName(enums.ModuleName.LoadingVideoModule);

                        DebugUtil.debug("ConnectClose Video[H5] ws:[" + self.url + "],stream:[" + (self.mediaUrl) + "]", LogConst.LOGTYPE_MSG_FIRED);

                        if (!self.isSelfClose && self.maxReconnectCount > 0)
                        {
                            self.maxReconnectCount--;
                            if (xplayer.ready)
                            {
                                xplayer.play();
                            }
                        }
                        break;
                    case 105:
                        self.removePlayer(id);
                        break;
                }
            });
        }

        public removePlayer(id)
        {
            for (var i = 0; i < this.playerComs.length; i++)
            {
                if (this.playerComs[i] && this.playerComs[i]["id"] == id)
                {
                    this.playerComs.splice(i, 1);
                    break;
                }
            }
            if (this.xplayer2Args[id]) delete this.xplayer2Args[id];

            DebugUtil.debug_logOnly("[H5Video] removePlayer--set videoId:" + id + " = null", LogConst.LOGTYPE_MSG_FIRED);
        }
        
        /**
         * 继续播放
         */
        public play(xplayer?): void
        {
            if (xplayer && xplayer.ready)
            {
                DebugUtil.debug_logOnly("[H5Video] play--" + xplayer.id, LogConst.LOGTYPE_MSG_FIRED);
                xplayer.resume();
            }
        }
        /**
         * 暂停渲染
         */
        public pause(xplayer?): void
        {
            if (xplayer && xplayer.ready)
            {
                DebugUtil.debug_logOnly("[H5Video] pause--" + xplayer.id, LogConst.LOGTYPE_MSG_FIRED);
                xplayer.pause();
            }
        }
        /**
         * 获取视频总时间
         */
        public totalTime(xplayer?): number
        {
            if (xplayer && xplayer.ready)
            {
                return xplayer.getDuration();
            }
            return 0;
        }
        /**
         * 获取视频当前播放的时间
         */
        public currentTime(xplayer?): number
        {
            if (xplayer && xplayer.ready)
            {
                return xplayer.getCurrentTime();
            }
            return 0;
        }

        /**
         * 视频跳到指定时间
         * 视频回放
         * */
        public seekSeconds(sec: number,xplayer?): void
        {
            if (this.isVideoCallBack == true)
            {
                if (xplayer && xplayer.ready)
                {
                    DebugUtil.debug_logOnly("[H5Video] seek--" + xplayer.id, LogConst.LOGTYPE_MSG_FIRED);
                    xplayer.seek(sec);
                }
            }
        }
        /**
         * 关闭视频服务器         */
        public close(xplayer?): void
        {
            /*if(this._isClosedFirstTime) return;
            this._isClosedFirstTime = true;*/
            this.isSelfClose = true;
            MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
            GameController.getInstance().sendNotification(NotifyConst.Notify_Background_Hide,false);

            if (xplayer)
            {
                DebugUtil.debug_logOnly("[H5Video] close--" + xplayer.id, LogConst.LOGTYPE_MSG_FIRED);
                xplayer && xplayer.stop();
                this.currentVideoId = 0;
            }
            //关闭视频的同时， 清空画布内容
            var context =this.videoPlayer.getContext("2d");
            if(context)
            {
                context.clearRect(0,0,this.videoPlayer.width,this.videoPlayer.height);
                // this.videoPlayer.style.display = "none";
            }
            this.videoPlayer.style.display = "none";
        }
        /**
         * 更新窗口尺寸         */
        private lastSizeH: number = -1;
        private lastSizeW: number = -1;
        private updateSize(evt: egret.Event): void
        {
            var w = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
            var h = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
            
            var canvas = this.videoPlayer;
            
            let constScale = StageUtil.height/StageUtil.width;
            let mobileHeight = 830;//移动版游戏内固定高度
            let gameW = w;
            let gameH = h;
            let videoW = w;
            let videoH = h;
            let offY = 0;
            let offX = 0;
            let abOffX = 0;
            let abOffY = 0;

            if (canvas != null)
            {
                if (canvas['userTyping'])
                    return;

                if(!GlobalConfig.isMobile)
                {
                    if(h/w >= constScale)
                    {
                        videoH = StageUtil.height*w/StageUtil.width;
                        gameH = StageUtil.height*w/StageUtil.width;
                        abOffY = (h - videoH)/2;
                    }
                    else
                    {
                        videoW = StageUtil.width*h/StageUtil.height;
                        gameW = StageUtil.width*h/StageUtil.height;
                        abOffX = (w - videoW)/2;
                    }

                    videoW = videoW*(this.posW/StageUtil.width);
                    videoH = videoH*(this.posH/StageUtil.height);
                    offX = (w - videoW)/2 + (w*this.posX/StageUtil.width);
                    offY = (h - videoH)/2 + (h*this.posY/StageUtil.height);//默认为居中适配，百家乐游戏内和视频预览
                    // console.warn("videoW:",videoW);
                    // console.warn("videoH:",videoH);
                    // console.warn("offY:",offY);
                    // console.warn("offX:",offX);

                    if(this.absolute)//暂时只是多桌使用
                    {
                        offX = abOffX + (gameW*this.posX/StageUtil.width);
                        offY = abOffY + (gameH*this.posY/StageUtil.height);
                    }
                    canvas.style.width = videoW + "px";
                    canvas.style.height = videoH + "px";
                    canvas.style.top = offY + "px";
                    canvas.style.left = offX + "px";
                }
                else
                {
                    if(this.absolute)
                    {
                        videoH = h*(this.posH/StageUtil.height);
                        videoW = w*(this.posW/StageUtil.width);
                        offX = (w*(this.posX/StageUtil.width));
                        offY = (h*(this.posY/StageUtil.height));

                        canvas.style.top = offY + "px";
                        canvas.style.left = offX + "px";
                        canvas.style.width = videoW + "px";
                        canvas.style.height = videoH + "px";
                    }
                    else
                    {
                        videoH = h*(mobileHeight/StageUtil.height);
                        canvas.style.top = 0 + "px";
                        canvas.style.left = 0 + "px";
                        canvas.style.width = videoW + "px";
                        canvas.style.height = videoH + "px";
                    }
                }
                
                this._videoWidth = videoW;
                DebugUtil.debug_logOnly("[UpdateSizeH5: ]" + videoW + "x" + videoH, LogConst.LOGTYPE_MSG_FIRED);
            }
        }
        /**
         * 设置视频的left值
         */
        public set left(value: number)
        {
            if (this.videoPlayer)
            {
                this.videoPlayer.style.position = "absolute";
                this.videoPlayer.style.zIndex = 0;
                this.videoPlayer.style.left = value + "px";
            }
        }
        private onActive(evt: egret.Event): void
        {
            this.updateSize(null);
        }
        /**
         * 获取视频宽度
         */
        public get videoWidth(): number
        {
            return this._videoWidth;
        }
    }
}
