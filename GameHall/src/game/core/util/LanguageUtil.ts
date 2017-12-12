module game
{
	/**
	 * @desc 对LanguageManager再次封装，减少调用写法
	 */
	export class LanguageUtil
	{
    	/**
    	 * 设置语言类型
    	 */
		public static set local(value: string)
		{
			LanguageManager.getInstance().locale = value;
		}
    	/**
    	 * 获取语言类型
    	 */
		public static get local(): string
		{
			// return "zh_cn";
			return LanguageManager.getInstance().locale;
		}
        /**
         * 翻译中文字符串
         */
		public static translate(sBeforeTra: string): string
		{
			// return sBeforeTra;
			return LanguageManager.getInstance().translate(sBeforeTra);
		}

		/** 所有语言种类 */
		public static get languageTypes(): Array<string>
		{
			return [
				"en_us",
				"in_id",
				"ja_jp",
				"ko_kr",
				"ms_my",
				"th_th",
				"vi_vn",
				"zh_cn",
				"zh_hk",
				"zh_tw",
			];
		}

		/**
		 * 先进行多语言转换后再替换
		 */
		public static rePlaceLanguage(sourceStr: string, replaceChar: string, replaceValue: string): string
		{
			sourceStr = LanguageUtil.translate(sourceStr);
			sourceStr = sourceStr.replace(replaceChar, replaceValue);
			return sourceStr;
		}

	}
}
