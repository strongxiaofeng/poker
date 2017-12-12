var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * @desc 设备信息获取工具类
     */
    var DeviceUtil = (function () {
        function DeviceUtil() {
        }
        Object.defineProperty(DeviceUtil, "deviceModel", {
            /**
             * 获取deviceModel
             */
            get: function () {
                var osName = this.result.os.name.toLowerCase();
                var name = "windows";
                // android/ios/windows/mac/linux
                if (osName.indexOf('ios') > -1)
                    // name = " " + this.result.device.model + " ";
                    name = "ios";
                else if (osName.indexOf('window') > -1)
                    name = "windows";
                else if (osName.indexOf('android') > -1)
                    name = "android";
                else if (osName.indexOf('linux') > -1)
                    name = "linux";
                else if (osName.indexOf('mac') > -1)
                    name = "mac";
                if (DeviceUtil.isIos) {
                    name = "ios";
                }
                return name;
            },
            enumerable: true,
            configurable: true
        });
        /**获取是电脑端还是移动端*/
        DeviceUtil.isMobile = function () {
            var flag = true;
            if (this.result.os.name.toLowerCase().indexOf('window') > -1)
                flag = false;
            if (this.result.os.name.toLowerCase().indexOf('mac') > -1)
                flag = false;
            flag = true;
            return flag;
        };
        Object.defineProperty(DeviceUtil, "deviceOSType", {
            /**
             * 获取deviceOSType
             */
            get: function () {
                return "H5" + this.result.os.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtil, "osVersion", {
            /**
             * 获取osVersion
             */
            get: function () {
                return this.result.os.version;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtil, "isIos", {
            /**
             * 检测是否是IOS系统
             */
            get: function () {
                var osName = this.result.os.name;
                osName = osName.toLowerCase();
                if (osName.indexOf("ios") != -1) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtil, "isIpad", {
            get: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/ipad/)) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtil, "isIphone", {
            get: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/iphone/)) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtil, "isAndroid", {
            /**
             * 检测是否是IOS系统
             */
            get: function () {
                var osName = this.result.os.name;
                osName = osName.toLowerCase();
                if (osName.indexOf("android") != -1) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtil, "isUC", {
            /**
             * 获取是否是UC浏览器(安卓的UC不支持遮罩)
             */
            get: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/ucbrowser/)) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtil, "isFirefox", {
            /**
             * 获取是否是火狐浏览器
             */
            get: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/firefox/)) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtil, "isSafaris", {
            /**
             * 获取是否是safaris浏览器
             */
            get: function () {
                if (DeviceUtil.isIos) {
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/version\/([\d.]+).*mqqbrowser/)) {
                        return false;
                    }
                    if (ua.match(/version\/([\d.]+).*jisuliulanqi/)) {
                        return false;
                    }
                    if (ua.match(/ucbrowser/)) {
                        return false;
                    }
                    return ua.match(/version\/([\d.]+).*safari/) ? true : false;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        DeviceUtil.result = new UAParser().getResult();
        return DeviceUtil;
    }());
    game.DeviceUtil = DeviceUtil;
    __reflect(DeviceUtil.prototype, "game.DeviceUtil");
})(game || (game = {}));
//# sourceMappingURL=DeviceUtil.js.map