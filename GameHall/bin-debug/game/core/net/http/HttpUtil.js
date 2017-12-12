var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * @desc 处理一些http请求的类
     */
    var HttpUtil = (function () {
        function HttpUtil() {
        }
        /**
         * 发送http请求
         */
        HttpUtil.sendRequest = function ($url, str, $loadCallBack, $ioErrorCallBack, $thisObject, $dataFormat, $method, flag, moduleName) {
            if ($dataFormat === void 0) { $dataFormat = egret.URLLoaderDataFormat.TEXT; }
            if ($method === void 0) { $method = egret.URLRequestMethod.POST; }
            if (flag === void 0) { flag = false; }
            if (moduleName === void 0) { moduleName = ""; }
            var httpItem = new game.HttpItem($loadCallBack, $ioErrorCallBack, $dataFormat, $thisObject, flag, moduleName);
            httpItem.load($url, str, $method);
        };
        HttpUtil.sendRequestByHeader = function ($url, $vars, header, $loadCallBack, $ioErrorCallBack, $thisObject, $dataFormat, $method) {
            if ($dataFormat === void 0) { $dataFormat = egret.URLLoaderDataFormat.TEXT; }
            if ($method === void 0) { $method = egret.URLRequestMethod.POST; }
            var httpItem = new game.HttpItem($loadCallBack, $ioErrorCallBack, $dataFormat, $thisObject);
            httpItem.loadByHeader($url, $vars, $method, header);
        };
        return HttpUtil;
    }());
    game.HttpUtil = HttpUtil;
    __reflect(HttpUtil.prototype, "game.HttpUtil");
})(game || (game = {}));
//# sourceMappingURL=HttpUtil.js.map