module game
{
	/**
	 *
	 * @desc 多语言管理器,包括语言转换和图片资源的转换
	 *
	 */
    export class LanguageManager
    {
        private static instance: LanguageManager;
        public static getInstance(): LanguageManager
        {
            if (this.instance == null)
            {
                this.instance = new LanguageManager();
            }
            return this.instance;
        }


        private jszip: JSZip;
        private language: any;        //多语言配置
        private _locale: string;        //当前语言类型

        public constructor()
        {
            
        }
		/**
		 * 设置多语言类型
		 */
        public set locale(value: string)
        {
            this._locale = value;
        }
		/**
		 * 获取多语言类型
		 */
        public get locale(): string
        {
            return this._locale;
        }
		/**
		 * 加载多语言包
		 */
        public loadLanguageText(callBack: Function, thisObject: any): void
        {
            com.LoadManager.getInstance().getResByUrl(com.LoadManager.getInstance().getVersion("resource/config/" + this._locale + ".cc"),
                (data: any) =>
                {
                    this.jszip = new JSZip(data);
                    var str = this.jszip.file(this.locale + ".json").asText();
                    this.language = JSON.parse(str);

                    if (callBack)
                    {
                        callBack.call(thisObject);
                    }
                }
                , this, com.ResourceItem.TYPE_BIN);
        }
        /**
         * 翻译中文字符串
         */
        public translate(sBeforeTra: string): string
        {
            var sTranslated: string = "";
            if (!sBeforeTra || sBeforeTra == "")
            {
                return sBeforeTra;
            }
            for (var key in this.language)
            {
                if (key == sBeforeTra)
                {
                    sTranslated = this.language[key];
                    break;
                }
            }
            if (sTranslated.length == 0)
            {
                sTranslated = sBeforeTra;
            }
            if (sTranslated == null)
            {
                sTranslated = "";
            }
            return sTranslated;
        }
    }
}
