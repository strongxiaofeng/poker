module game {
	/**
	 * @desc 单个http请求
	 */
	export class HttpItem {
        private urlLoader:egret.URLLoader;
        private loaderCallBack:Function;
        private ioErrorCallBack:Function;
        private thisObject:any;
        private needTip:boolean;
        private isload = false;

        private url:string;
        private vars:egret.URLVariables;
        private str:string;
        private method:string;
        private header:egret.URLRequestHeader;
        private moduleName:string;
        private timeOutId:number;

        public constructor($loadCallBack: Function,$ioErrorCallBack: Function,$dataFormat:string,$thisObject:any,needTip = false,moduleName = "") {
            this.loaderCallBack = $loadCallBack;
            this.ioErrorCallBack = $ioErrorCallBack;
            this.thisObject = $thisObject;
            this.needTip = needTip;
            this.moduleName = moduleName;
            this.urlLoader = new egret.URLLoader();
            this.urlLoader.dataFormat = $dataFormat;
            this.urlLoader.addEventListener(egret.Event.COMPLETE,this.onLoaded,this);
            this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.ioErrorHandler,this);
		}

        public loadByHeader($url:string,$vars:egret.URLVariables,$method:string="POST",header:egret.URLRequestHeader):void
        {
            this.url = $url;
            this.vars = $vars;
            this.method = $method;
            this.header = header;
            var request:egret.URLRequest = new egret.URLRequest($url);
		    request.method = $method;
            request.data = $vars;
            request.requestHeaders.push(header);
            this.urlLoader.load(request);
            if(this.needTip)
            {
                // ComponentProgressLoading.getInstance().showLoading();
                this.timeOutId = egret.setTimeout(this.timeoutFuc,this,5000);
            }
        }

        private timeoutFuc():void
        {
            if(this.isload) return;
            // ComponentProgressLoading.getInstance().closeLoading();
            // var params: any = {};
            // params.type = ALERT.ALERT_OK_CANCEL;
            // params.thisObject = this;
            // params.tipMsg = LanguageUtil.translate("g_error_connection");
            // params.leftLabel = LanguageUtil.translate("g_btn_back_text");
            // params.rightLabel = LanguageUtil.translate("g_btn_retry_text");
            // params.imgRes = "pic_prompt_png";
            // params.msg = LanguageUtil.translate("g_request_server_timeout");
            // params.rightCallBack = this.reload;
            // params.leftCallBack = this.return;
            // MediatorManager.tipConfirm(params);
        }

        private reload():void
        {
            this.urlLoader.addEventListener(egret.Event.COMPLETE,this.onLoaded,this);
            this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.ioErrorHandler,this);
            if(this.header)
            {
                this.loadByHeader(this.url,this.vars,this.method,this.header);
            }
            else
            {
                this.load(this.url,this.str,this.method);
            }
        }

        private return():void
        {
            return;
            // if(GlobalConfig.isMobile)
            // {
            //     // GameController.getInstance().sendNotification(NotifyConst.Notify_TopReturn);
            // }
            // else
            // {
            //     // ModuleManager.closeModuleByName(this.moduleName);
            // }
        }

		/**
		 * load数据
		 */ 
		public load($url:string,$str:string,$method:string="POST"):void
        {
            this.url = $url;
            this.str = $str;
            this.method = $method;
		    var request:egret.URLRequest = new egret.URLRequest($url);
		    request.method = $method;
            request.data = $str;
            this.urlLoader.load(request);
            
            if(this.needTip)
            {
                // ComponentProgressLoading.getInstance().showLoading();
                this.timeOutId = egret.setTimeout(this.timeoutFuc,this,5000);
            }
		}
		/**
		 * 数据返回
		 */ 
        private onLoaded($evt:egret.Event):void{
            this.urlLoader.removeEventListener(egret.Event.COMPLETE,this.onLoaded,this);
            this.urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.ioErrorHandler,this);
            if(this.loaderCallBack!=null){
                this.loaderCallBack.call(this.thisObject,this.urlLoader.data);
            }
            if(this.needTip)
            {
                this.isload = true;
                egret.clearTimeout(this.timeOutId);
                // ComponentProgressLoading.getInstance().closeLoading();

            }
        }
        /**
         * io错误
         */ 
        private ioErrorHandler($evt:egret.IOErrorEvent):void{
            this.urlLoader.removeEventListener(egret.Event.COMPLETE,this.onLoaded,this);
            this.urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.ioErrorHandler,this);
            if(this.ioErrorCallBack!=null){
                this.ioErrorCallBack.call(this.thisObject);
            }
            if(this.needTip)
            {
                this.isload = false;
                egret.clearTimeout(this.timeOutId);
                // ComponentProgressLoading.getInstance().closeLoading();
            }
        }
	}
}
