module game
{
	/**
	 * 每个游戏对应的多个资源组，在请求进入房间之前会先加载这个组
	 *
	 */
    export class ResGroups
    {
        public static config:any;

        public static getMultiGroupName(name:string):string
        {
            // var config:any = com.LoadManager.getInstance().getRes("resGroupConfig_json");
            var str: string;
            if (GlobalConfig.isMobile)
            {
                str = this.config.mViews[name] ? this.config.mViews[name] : name;
            }
            else
            {
                str = this.config.pcViews[name] ? this.config.pcViews[name] : "";
            }

            // if(str.indexOf("commonInjectChip") > -1)
            // {
            //     str = str.replace("commonInjectChip","commonInjectChip" + (LanguageConstTypes.AmountType + 1));
            // }
            // if(str.indexOf("commonListChip") > -1)
            // {
            //     str = str.replace("commonListChip","commonListChip" + (LanguageConstTypes.AmountType + 1));
            // }

            if (!str) str = "";
            return str;
        }

    }
}