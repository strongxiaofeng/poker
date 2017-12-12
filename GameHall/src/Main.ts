/**
 * 项目入口
 */
class Main extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.setStartParams, this);
    }
    /**预设一些游戏参数 */
    private setStartParams()
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.setStartParams, this);
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        game.GlobalConfig.isMobile = egret.Capabilities.isMobile;
        // game.GlobalConfig.isMobile = true;

        this.checkDevice();
        this.getWindowParams();
        game.StageUtil.stage = this.stage;
        game.LayerManager.getInstance().initRootLayer(this);
        game.SystemPath.skin_type = game.GlobalConfig.isMobile ? "mobile" : "pc";
        game.SystemPath.skin_path = game.SystemPath.root + "skins/game_skins/" + game.SystemPath.skin_type + "/";

        if (!game.GlobalConfig.isMobile)
        {
            mouse.enable(this.stage);
            mouse.setMouseMoveEnabled(true);
        }
        this.stage.addEventListener(egret.Event.DEACTIVATE,this.deactivate,this);
        this.stage.addEventListener(egret.Event.ACTIVATE,this.activate,this);
        this.stage.addEventListener(egret.Event.RESIZE, (e) =>
        {
            window["popUpResize"]();
            game.UIManager.onStageResize(e);
        }, this);

        //滚轮事件
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',this.scrollFunc,false);//W3C
        }
        window.onmousewheel=document.onmousewheel=this.scrollFunc;//IE/Opera/Chrome

        com.LoadManager.getInstance().loadVersion(function ()
        {
            this.loadConfig();
        }, this);
    }

    /**鼠标滚轮 */
    private scrollFunc(e)
    {
        var direct="";
        e=e || window.event;
        if(e.wheelDelta)
        {//IE/Opera/Chrome
            direct = e.wheelDelta>0 ? "up" : "down";
        }
        else if(e.detail)
        {//Firefox
            direct = e.detail<0 ? "up" : "down";
        }
        game.NotifyManager.getInstance().distribute(game.NotifyConst.Notify_MouseWheel, direct);
    }

    private deactivate():void
    {
        // game.SoundPlayer.getInstance().stop();
        game.SoundPlayerNew.setActive(false);
    }

    private activate():void
    {
        // game.SoundPlayer.getInstance().play();
        game.SoundPlayerNew.setActive(true);
    }

    private getWindowParams()
    {
        game.DebugUtil.debug(window["gameUrlParam"] + " version:" + game.GlobalConfig.version);
        let channelId = parseInt(window["gameUrlParam"]["channelId"]);
        game.LanguageUtil.local = window["gameUrlParam"]["lang"];
        // game.LanguageUtil.local = enums.LanguageType.EN_US;
        game.GlobalConfig.payoutShowRed = [
            "zh_cn",
            "zh_tw",
            "zh_hk",
        ].indexOf(game.LanguageUtil.local.toLowerCase()) > -1;
        game.GlobalConfig.channelId = channelId > 0 ? channelId : game.GlobalConfig.defaultChannel;
        game.GlobalConfig.userName = window["gameUrlParam"]["username"].trim();
        game.GlobalConfig.linkAccessToken = window["gameUrlParam"]["accessToken"].trim();
        game.GlobalConfig.mode = window["gameUrlParam"]["mode"].trim();
        game.GlobalConfig.login_title_icon = window["gameUrlParam"]["login_title_icon"];
        game.GlobalConfig.poweredby_icon = window["gameUrlParam"]["poweredby_icon"];
        game.GlobalConfig.poweredby_icon_url = window["gameUrlParam"]["poweredby_icon_url"];
        game.GlobalConfig.pageLogoUrl = window["gameUrlParam"]["pageLogoUrl"];
        game.GlobalConfig.channelTitle = window["gameUrlParam"]["channelTitle"];
        game.GlobalConfig.invitation_code = window["gameUrlParam"]["invitation_code"];
        game.GlobalConfig.android_download = window["gameUrlParam"]["android_download"];
        game.GlobalConfig.applink_url = window["gameUrlParam"]["applink_url"];
        game.GlobalConfig.ios_download = window["gameUrlParam"]["ios_download"];


        if (window["gameUrlParam"]["c_params"])
        {
            let localUrl = window["location"]["href"];
            let staticIndex = localUrl.indexOf("static");
            let host = localUrl.slice(0, staticIndex);

            let arr = host.split(":");
            let gameIp = arr[1] + ":" + arr[2];
            game.GlobalConfig.host = "ws:" + gameIp + "goral/ws";
            game.GlobalConfig.httpHost = "http:" + gameIp + "goral/api/";
            game.GlobalConfig.gameIp = arr[1];
            game.GlobalConfig.defaultIP = gameIp;
            game.GlobalConfig.defaultUrl = "http:"+gameIp;
            game.DebugUtil.debug("game.GlobalConfig.gameIp:" + game.GlobalConfig.gameIp);
        }

    }

    /** 检测是否是手机，orientation与scaleMode处理 */
    private checkDevice(): void
    {
        if (!game.GlobalConfig.isMobile)
        {
            this.stage.orientation = egret.OrientationMode.AUTO;
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        else
        {
            let scale = this.stage.stageHeight / this.stage.stageWidth;
            if (scale <= 1.78)
            {
                //屏幕高度太矮 按ipad适配 高度不变
                game.GlobalConfig.isFixedHight = true;
                this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
            else
            {
                //屏幕比较高 按手机适配 宽度不变
                game.GlobalConfig.isFixedHight = false;
                this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
        }
        this.visible = true;
    }
    /**加载资源配置*/
    private async loadConfig()
    {
        let default_res = "resource/" + game.LanguageUtil.local + "_default.res.json";
        // let default_res = "resource/default.res.json";
        await com.LoadManager.getInstance().loadConfig(com.LoadManager.getInstance().getVersion(default_res), "resource/");
        game.DebugUtil.debug("加载resGroupConfig_json");
        com.LoadManager.getInstance().getResAsync("resGroupConfig_json", this.loadPre, this);
    }
    /**加载preload组 */
    private async loadPre()
    {
        game.ResGroups.config = com.LoadManager.getInstance().getRes("resGroupConfig_json");
        game.DebugUtil.debug("加载preload");
        await com.LoadManager.getInstance().loadMultiGroup(game.ResGroups.getMultiGroupName("preload"));
        this.onThemeLoadComplete();
    }
    private onThemeLoadComplete(): void
    {
        let theme = new eui.Theme(com.LoadManager.getInstance().getVersion("resource/default.thm.json"), this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.loadLanguage, this);
    }
    private loadLanguage():void
    {
        game.LanguageManager.getInstance().loadLanguageText(this.loadGame, this);
    }
    //进入启动界面
    private loadGame(): void
    {
        game.MediatorManager.openMediator(game.Mediators.Mediator_LoadGame);
        // var ui = new TestListUI();
        // this.addChild(ui);
    }
}


