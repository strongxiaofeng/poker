module game
{

	/**
	 * @desc 全局变量
	 */
    export class GlobalConfig
    {
        /**本地调试默认服务器地址 */
        // public static defaultIP: string = "//192.168.8.113:8989";
        public static defaultIP: string = "//192.168.8.158:8989";
        // public static defaultIP: string = "//192.168.8.205:8920";
        public static defaultUrl: string = "http:" + GlobalConfig.defaultIP;
        /**本地调试默认渠道 */
        public static defaultChannel: number = 1;
        /**渠道号 */
        public static channelId: number = 1;
        /**要连接socket的IP */
        // public static gameIp: string = "//192.168.8.113";
        public static gameIp: string = "//192.168.8.158";
        /**服务器socket地址 */
        public static host: string = "ws:" + GlobalConfig.defaultIP + "/goral/ws";
        /**http请求的地址 */
        public static httpHost: string = "http:" + GlobalConfig.defaultIP + "/goral/api/";
        /**是否需要log */
        public static needSendLog = true;
        /**是否支持webgl */
        public static isSupportWebGL: boolean;
        /**是否支持flash */
        public static isSupportFlash: boolean;
        /**是否支持flash */
        public static isSupportWebp: boolean;
        /**发布--版本号 */
        public static version: string = "0.0.810";
        /**产品版本号 */
        public static showVersion: string = "1.0";
        /**存一个全局的s玩家账号 用来token登录的 */
        public static userName: string = "";
        /**accessToken，用于登录 */
        public static accessToken: string = "";
        /**用于link登录 在一开始url里发过来的acessToken*/
        public static linkAccessToken: string = "";
        /**在请求渠道配置时发送过来的参数 是否是游客快速登录 是trial 不是no*/
        public static mode: string = "";
        /**loginToken */
        public static loginToken: string = "";
        /**注册的url */
        public static registerUrl: string = "";
        /**充值的url */
        public static rechargeUrl: string = "";
        /**OAuth登录的url */
        public static loginUrl: string = "";
        /**是否注册*/
        public static isRegister: boolean = false;
        /**是否是游客，新版完全由客户端自己判断，服务器不给其他判断标识 */
        public static isGuest: boolean = false;
        /**单次打赏荷官的金额-->暂时不确定单位是什么 */
        public static rewardDealer = 0;
        /**服务器即将维护 */
        public static serverMaintain = false;
        /**打印日志的级别是  0 debug  1  release*/
        public static logLevel: number = LogConst.LEVEL_DEBUG;
        /**是否是debug状态 */
        public static isDebug: boolean = false;

        /**h5视频直播的端口 */
        public static rtmp_port: string = "22001";
        public static h5rtmp_port: string = "8982";

        /**是否是移动端平台 */
        public static isMobile: boolean;
        /**是否是以固定高度为适配 */
        public static isFixedHight: boolean;
        /**多皮肤的类型 这是第几套皮肤 值也用枚举来定义*/
        public static multiSkinType: number = 1;

        /**渠道数据 */
        public static login_title_icon: string = "";
        public static poweredby_icon: string = "";
        public static poweredby_icon_url: string = "https://www.youtube.com/";
        public static pageLogoUrl: string = "";
        public static channelTitle: string = "";
        public static android_download: string = "";
        public static applink_url: string = "";
        public static ios_download: string = "";
        /**通过分享链接进来的邀请码 */
        public static invitation_code: string;
        /** 当前进入的俱乐部ID */
        public static clubId: number;
        /** 设置当前进入的俱乐部ID的时候订阅当前俱乐部同时取消上一个订阅的俱乐部 */
        public static setClubId(clubId: number): Promise<{}>
        {
            let userId = PersonalInfoModel.getInstance().user_id;
            let unSubscribeRoomList = null;
            if (GlobalConfig.clubId && GlobalConfig.clubId != clubId)
            {
                unSubscribeRoomList = ClubController.getInstance().getUnSubscribeRoomList(GlobalConfig.clubId);
            }
            let subscribeRoomList = ClubController.getInstance().getSubscribeRoomList(clubId);
            let allPromise = [subscribeRoomList];
            if (unSubscribeRoomList) allPromise.push(unSubscribeRoomList);
            GlobalConfig.clubId = clubId;
            return Promise.all(allPromise);
        }

        /** 盈余显示红色亏损显示绿色（中国地区） */
        public static payoutShowRed: boolean = true;

        public constructor()
        {
        }
        /**
		 * 获取视频播放的CDN节点
         *
		 */
        public static get mediaCdn(): string
        {
            return GlobalConfig.gameIp + ":" + GlobalConfig.h5rtmp_port;
        }

        /**视频回放用的端口 */
        public static get videoCallbackCdn(): string
        {
            return GlobalConfig.defaultIP;
        }

        public static getSocketIp(): string
        {
            let str = GlobalConfig.defaultIP.split(":")[0];
            str = str.replace("//", "");
            return str;
        }
    }
}
