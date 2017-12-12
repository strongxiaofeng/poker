module enums {
	/**
	 *
	 * @desc 专门针对一些枚举变量对应字符串的转换
	 *
	 */
    export class LanguageType {
        private static instance : LanguageType;
        public static getInstance(): LanguageType{
            if(this.instance == null){
                this.instance = new LanguageType();
            }
            return this.instance;
        }



        public static ZH_CN: string = "zh_cn";         //简体中文
        public static ZH_TW: string = "zh_tw";         //台湾繁文
        public static EN_US: string = "en_us";         //英文
        public static MS_MY: string = "ms_my";         //马来西亚
        public static VI_VN: string = "vi_vn";         //越南
        public static KO_KR: string = "ko_kr";         //韩国
        public static JA_JP: string = "ja_jp";         //日本
        public static IN_ID: string = "in_id";         //印度尼西亚
        public static TH_TH: string = "th_th";         //泰国
        public static ZH_HK: string = "zh_hk";         //香港
        public constructor() {
        }
    }
}
