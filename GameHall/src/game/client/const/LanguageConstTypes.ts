module game {
	/**
	 * 多语言类型配置，目前主要是各国，大额数字显示，和日期的显示
	 * @author 
	 */
	export class LanguageConstTypes 
	{
		/**初始化好的金钱显示类型 */
		public static AmountType:number;

		/**日期类型 */
		public static DateType:number;

		public constructor() 
		{
    		
		}
		
		public static init():void
		{
			this.AmountType = this.getAmountType(LanguageUtil.local);
			this.DateType = this.getDateType(LanguageUtil.local);
		}
		

		/**
		 * 获取日期的类型
		 *  */
        public static getDateType(lang:string):number
        {
            let type = 0;
            switch(lang)
			{
				case enums.LanguageType.ZH_TW:
				case enums.LanguageType.ZH_HK:
				case enums.LanguageType.ZH_CN:
					type = 0;
					break;
				case enums.LanguageType.EN_US:
				case enums.LanguageType.VI_VN:
				case enums.LanguageType.MS_MY:
				case enums.LanguageType.TH_TH:
					type = 1;
					break;
				case enums.LanguageType.IN_ID:
					type = 2;
					break;
				case enums.LanguageType.KO_KR:
					type = 3;
					break;
				case enums.LanguageType.JA_JP:
					type = 4;
					break;
				default:
					type = 0;
					break;
			}
            return type;
        }

		/**
		 * 获取钱的类型
		 *  */
        public static getAmountType(lang:string):number
		{
			let type = 0;
            switch(lang)
			{
				case enums.LanguageType.EN_US:
				case enums.LanguageType.ZH_TW:
				case enums.LanguageType.ZH_HK:
				case enums.LanguageType.ZH_CN:
				case enums.LanguageType.MS_MY:
				case enums.LanguageType.KO_KR:
				case enums.LanguageType.JA_JP:
				case enums.LanguageType.TH_TH:
				case enums.LanguageType.VI_VN:
					type = 0;
					break;
				case enums.LanguageType.IN_ID:
					type = 1;
					break;
				default:
					type = 0;
					break;
			}
            return type;
		}
	}
}
