var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * @desc 全局变量
     */
    var GlobalConfig = (function () {
        function GlobalConfig() {
        }
        /** 设置当前进入的俱乐部ID的时候订阅当前俱乐部同时取消上一个订阅的俱乐部 */
        GlobalConfig.setClubId = function (clubId) {
            var userId = game.PersonalInfoModel.getInstance().user_id;
            var unSubscribeRoomList = null;
            if (GlobalConfig.clubId && GlobalConfig.clubId != clubId) {
                unSubscribeRoomList = game.ClubController.getInstance().getUnSubscribeRoomList(GlobalConfig.clubId);
            }
            var subscribeRoomList = game.ClubController.getInstance().getSubscribeRoomList(clubId);
            var allPromise = [subscribeRoomList];
            if (unSubscribeRoomList)
                allPromise.push(unSubscribeRoomList);
            GlobalConfig.clubId = clubId;
            return Promise.all(allPromise);
        };
        Object.defineProperty(GlobalConfig, "mediaCdn", {
            /**
             * 获取视频播放的CDN节点
             *
             */
            get: function () {
                return GlobalConfig.gameIp + ":" + GlobalConfig.h5rtmp_port;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalConfig, "videoCallbackCdn", {
            /**视频回放用的端口 */
            get: function () {
                return GlobalConfig.defaultIP;
            },
            enumerable: true,
            configurable: true
        });
        GlobalConfig.getSocketIp = function () {
            var str = GlobalConfig.defaultIP.split(":")[0];
            str = str.replace("//", "");
            return str;
        };
        /**本地调试默认服务器地址 */
        // public static defaultIP: string = "//192.168.8.113:8989";
        GlobalConfig.defaultIP = "//192.168.8.158:8989";
        // public static defaultIP: string = "//192.168.8.205:8920";
        GlobalConfig.defaultUrl = "http:" + GlobalConfig.defaultIP;
        /**本地调试默认渠道 */
        GlobalConfig.defaultChannel = 1;
        /**渠道号 */
        GlobalConfig.channelId = 1;
        /**要连接socket的IP */
        // public static gameIp: string = "//192.168.8.113";
        GlobalConfig.gameIp = "//192.168.8.158";
        /**服务器socket地址 */
        GlobalConfig.host = "ws:" + GlobalConfig.defaultIP + "/goral/ws";
        /**http请求的地址 */
        GlobalConfig.httpHost = "http:" + GlobalConfig.defaultIP + "/goral/api/";
        /**是否需要log */
        GlobalConfig.needSendLog = true;
        /**发布--版本号 */
        GlobalConfig.version = "0.0.810";
        /**产品版本号 */
        GlobalConfig.showVersion = "1.0";
        /**存一个全局的s玩家账号 用来token登录的 */
        GlobalConfig.userName = "";
        /**accessToken，用于登录 */
        GlobalConfig.accessToken = "";
        /**用于link登录 在一开始url里发过来的acessToken*/
        GlobalConfig.linkAccessToken = "";
        /**在请求渠道配置时发送过来的参数 是否是游客快速登录 是trial 不是no*/
        GlobalConfig.mode = "";
        /**loginToken */
        GlobalConfig.loginToken = "";
        /**注册的url */
        GlobalConfig.registerUrl = "";
        /**充值的url */
        GlobalConfig.rechargeUrl = "";
        /**OAuth登录的url */
        GlobalConfig.loginUrl = "";
        /**是否注册*/
        GlobalConfig.isRegister = false;
        /**是否是游客，新版完全由客户端自己判断，服务器不给其他判断标识 */
        GlobalConfig.isGuest = false;
        /**单次打赏荷官的金额-->暂时不确定单位是什么 */
        GlobalConfig.rewardDealer = 0;
        /**服务器即将维护 */
        GlobalConfig.serverMaintain = false;
        /**打印日志的级别是  0 debug  1  release*/
        GlobalConfig.logLevel = game.LogConst.LEVEL_DEBUG;
        /**是否是debug状态 */
        GlobalConfig.isDebug = false;
        /**h5视频直播的端口 */
        GlobalConfig.rtmp_port = "22001";
        GlobalConfig.h5rtmp_port = "8982";
        /**多皮肤的类型 这是第几套皮肤 值也用枚举来定义*/
        GlobalConfig.multiSkinType = 1;
        /**渠道数据 */
        GlobalConfig.login_title_icon = "";
        GlobalConfig.poweredby_icon = "";
        GlobalConfig.poweredby_icon_url = "https://www.youtube.com/";
        GlobalConfig.pageLogoUrl = "";
        GlobalConfig.channelTitle = "";
        GlobalConfig.android_download = "";
        GlobalConfig.applink_url = "";
        GlobalConfig.ios_download = "";
        /** 盈余显示红色亏损显示绿色（中国地区） */
        GlobalConfig.payoutShowRed = true;
        return GlobalConfig;
    }());
    game.GlobalConfig = GlobalConfig;
    __reflect(GlobalConfig.prototype, "game.GlobalConfig");
})(game || (game = {}));
//# sourceMappingURL=GlobalConfig.js.map