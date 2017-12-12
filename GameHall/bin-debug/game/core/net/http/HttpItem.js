var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * @desc 单个http请求
     */
    var HttpItem = (function () {
        function HttpItem($loadCallBack, $ioErrorCallBack, $dataFormat, $thisObject, needTip, moduleName) {
            if (needTip === void 0) { needTip = false; }
            if (moduleName === void 0) { moduleName = ""; }
            this.isload = false;
            this.loaderCallBack = $loadCallBack;
            this.ioErrorCallBack = $ioErrorCallBack;
            this.thisObject = $thisObject;
            this.needTip = needTip;
            this.moduleName = moduleName;
            this.urlLoader = new egret.URLLoader();
            this.urlLoader.dataFormat = $dataFormat;
            this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onLoaded, this);
            this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
        }
        HttpItem.prototype.loadByHeader = function ($url, $vars, $method, header) {
            if ($method === void 0) { $method = "POST"; }
            this.url = $url;
            this.vars = $vars;
            this.method = $method;
            this.header = header;
            var request = new egret.URLRequest($url);
            request.method = $method;
            request.data = $vars;
            request.requestHeaders.push(header);
            this.urlLoader.load(request);
            if (this.needTip) {
                // ComponentProgressLoading.getInstance().showLoading();
                this.timeOutId = egret.setTimeout(this.timeoutFuc, this, 5000);
            }
        };
        HttpItem.prototype.timeoutFuc = function () {
            if (this.isload)
                return;
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
        };
        HttpItem.prototype.reload = function () {
            this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onLoaded, this);
            this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
            if (this.header) {
                this.loadByHeader(this.url, this.vars, this.method, this.header);
            }
            else {
                this.load(this.url, this.str, this.method);
            }
        };
        HttpItem.prototype.return = function () {
            return;
            // if(GlobalConfig.isMobile)
            // {
            //     // GameController.getInstance().sendNotification(NotifyConst.Notify_TopReturn);
            // }
            // else
            // {
            //     // ModuleManager.closeModuleByName(this.moduleName);
            // }
        };
        /**
         * load数据
         */
        HttpItem.prototype.load = function ($url, $str, $method) {
            if ($method === void 0) { $method = "POST"; }
            this.url = $url;
            this.str = $str;
            this.method = $method;
            var request = new egret.URLRequest($url);
            request.method = $method;
            request.data = $str;
            this.urlLoader.load(request);
            if (this.needTip) {
                // ComponentProgressLoading.getInstance().showLoading();
                this.timeOutId = egret.setTimeout(this.timeoutFuc, this, 5000);
            }
        };
        /**
         * 数据返回
         */
        HttpItem.prototype.onLoaded = function ($evt) {
            this.urlLoader.removeEventListener(egret.Event.COMPLETE, this.onLoaded, this);
            this.urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
            if (this.loaderCallBack != null) {
                this.loaderCallBack.call(this.thisObject, this.urlLoader.data);
            }
            if (this.needTip) {
                this.isload = true;
                egret.clearTimeout(this.timeOutId);
                // ComponentProgressLoading.getInstance().closeLoading();
            }
        };
        /**
         * io错误
         */
        HttpItem.prototype.ioErrorHandler = function ($evt) {
            this.urlLoader.removeEventListener(egret.Event.COMPLETE, this.onLoaded, this);
            this.urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
            if (this.ioErrorCallBack != null) {
                this.ioErrorCallBack.call(this.thisObject);
            }
            if (this.needTip) {
                this.isload = false;
                egret.clearTimeout(this.timeOutId);
                // ComponentProgressLoading.getInstance().closeLoading();
            }
        };
        return HttpItem;
    }());
    game.HttpItem = HttpItem;
    __reflect(HttpItem.prototype, "game.HttpItem");
})(game || (game = {}));
//# sourceMappingURL=HttpItem.js.map