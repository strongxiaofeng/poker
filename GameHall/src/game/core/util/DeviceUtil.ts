module game {
	/**
	 * @desc 设备信息获取工具类
	 */
	export class DeviceUtil {
    	private static result:any = new UAParser().getResult();
		public constructor() {
		}
		/**
		 * 获取deviceModel
		 */
        public static get deviceModel():string{
            var osName = this.result.os.name.toLowerCase();
            var name = "windows";
            // android/ios/windows/mac/linux
            if(osName.indexOf('ios') > -1)
                // name = " " + this.result.device.model + " ";
                name = "ios";
            else if(osName.indexOf('window') > -1)
                name = "windows";
            else if(osName.indexOf('android') > -1)
                name = "android";
            else if(osName.indexOf('linux') > -1)
                name = "linux";
            else if(osName.indexOf('mac') > -1)
                name = "mac";
            if(DeviceUtil.isIos)
            {
                name = "ios";
            }
            return name;
        }
        /**获取是电脑端还是移动端*/
        public static isMobile():boolean {
            var flag:boolean = true;
            if(this.result.os.name.toLowerCase().indexOf('window') > -1) flag = false;
            if(this.result.os.name.toLowerCase().indexOf('mac') > -1) flag = false;
            flag = true;
            return flag;
        }
        /**
         * 获取deviceOSType
         */
        public static get deviceOSType():string{
            return "H5"+this.result.os.name;
        }
        /**
         * 获取osVersion
         */
        public static get osVersion():string{
            return this.result.os.version;
        }
        /**
         * 检测是否是IOS系统
         */
        public static get isIos():boolean{
            let osName: string = this.result.os.name;
            osName = osName.toLowerCase();
            if(osName.indexOf("ios")!=-1){
                return true;
            }
            return false;
        }
        public static get isIpad():boolean{
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/ipad/)) {
                return true;
            }
            return false;
        }
        public static get isIphone():boolean{
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/iphone/)) {
                return true;
            }
            return false;
        }
        /**
         * 检测是否是IOS系统
         */
        public static get isAndroid(): boolean {
            let osName: string = this.result.os.name;
            osName = osName.toLowerCase();
            if(osName.indexOf("android") != -1) {
                return true;
            }
            return false;
        }
        /**
         * 获取是否是UC浏览器(安卓的UC不支持遮罩)
         */
        public static get isUC(): boolean {
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/ucbrowser/)) {
                return true;
            }
            return false;
        }
        /**
         * 获取是否是火狐浏览器
         */
        public static get isFirefox():boolean{
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/firefox/)) {
                return true;
            }
            return false;
        }
        /**
         * 获取是否是safaris浏览器
         */
        public static get isSafaris():boolean{
            if(DeviceUtil.isIos){
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/version\/([\d.]+).*mqqbrowser/)) {
                    return false;
                }
                if(ua.match(/version\/([\d.]+).*jisuliulanqi/)) {
                    return false;
                }
                if(ua.match(/ucbrowser/)) {
                    return false;
                }
                return ua.match(/version\/([\d.]+).*safari/) ? true : false;
            }
            return false;
        }
	}
}
