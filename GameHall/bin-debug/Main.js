var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 项目入口
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.setStartParams, _this);
        return _this;
    }
    /**预设一些游戏参数 */
    Main.prototype.setStartParams = function () {
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
        if (!game.GlobalConfig.isMobile) {
            mouse.enable(this.stage);
            mouse.setMouseMoveEnabled(true);
        }
        this.stage.addEventListener(egret.Event.DEACTIVATE, this.deactivate, this);
        this.stage.addEventListener(egret.Event.ACTIVATE, this.activate, this);
        this.stage.addEventListener(egret.Event.RESIZE, function (e) {
            window["popUpResize"]();
            game.UIManager.onStageResize(e);
        }, this);
        //滚轮事件
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', this.scrollFunc, false); //W3C
        }
        window.onmousewheel = document.onmousewheel = this.scrollFunc; //IE/Opera/Chrome
        com.LoadManager.getInstance().loadVersion(function () {
            this.loadConfig();
        }, this);
    };
    /**鼠标滚轮 */
    Main.prototype.scrollFunc = function (e) {
        var direct = "";
        e = e || window.event;
        if (e.wheelDelta) {
            direct = e.wheelDelta > 0 ? "up" : "down";
        }
        else if (e.detail) {
            direct = e.detail < 0 ? "up" : "down";
        }
        game.NotifyManager.getInstance().distribute(game.NotifyConst.Notify_MouseWheel, direct);
    };
    Main.prototype.deactivate = function () {
        // game.SoundPlayer.getInstance().stop();
        game.SoundPlayerNew.setActive(false);
    };
    Main.prototype.activate = function () {
        // game.SoundPlayer.getInstance().play();
        game.SoundPlayerNew.setActive(true);
    };
    Main.prototype.getWindowParams = function () {
        game.DebugUtil.debug(window["gameUrlParam"] + " version:" + game.GlobalConfig.version);
        var channelId = parseInt(window["gameUrlParam"]["channelId"]);
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
        if (window["gameUrlParam"]["c_params"]) {
            var localUrl = window["location"]["href"];
            var staticIndex = localUrl.indexOf("static");
            var host = localUrl.slice(0, staticIndex);
            var arr = host.split(":");
            var gameIp = arr[1] + ":" + arr[2];
            game.GlobalConfig.host = "ws:" + gameIp + "goral/ws";
            game.GlobalConfig.httpHost = "http:" + gameIp + "goral/api/";
            game.GlobalConfig.gameIp = arr[1];
            game.GlobalConfig.defaultIP = gameIp;
            game.GlobalConfig.defaultUrl = "http:" + gameIp;
            game.DebugUtil.debug("game.GlobalConfig.gameIp:" + game.GlobalConfig.gameIp);
        }
    };
    /** 检测是否是手机，orientation与scaleMode处理 */
    Main.prototype.checkDevice = function () {
        if (!game.GlobalConfig.isMobile) {
            this.stage.orientation = egret.OrientationMode.AUTO;
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        else {
            var scale = this.stage.stageHeight / this.stage.stageWidth;
            if (scale <= 1.78) {
                //屏幕高度太矮 按ipad适配 高度不变
                game.GlobalConfig.isFixedHight = true;
                this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
            else {
                //屏幕比较高 按手机适配 宽度不变
                game.GlobalConfig.isFixedHight = false;
                this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
        }
        this.visible = true;
    };
    /**加载资源配置*/
    Main.prototype.loadConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var default_res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        default_res = "resource/" + game.LanguageUtil.local + "_default.res.json";
                        // let default_res = "resource/default.res.json";
                        return [4 /*yield*/, com.LoadManager.getInstance().loadConfig(com.LoadManager.getInstance().getVersion(default_res), "resource/")];
                    case 1:
                        // let default_res = "resource/default.res.json";
                        _a.sent();
                        game.DebugUtil.debug("加载resGroupConfig_json");
                        com.LoadManager.getInstance().getResAsync("resGroupConfig_json", this.loadPre, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**加载preload组 */
    Main.prototype.loadPre = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        game.ResGroups.config = com.LoadManager.getInstance().getRes("resGroupConfig_json");
                        game.DebugUtil.debug("加载preload");
                        return [4 /*yield*/, com.LoadManager.getInstance().loadMultiGroup(game.ResGroups.getMultiGroupName("preload"))];
                    case 1:
                        _a.sent();
                        this.onThemeLoadComplete();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.onThemeLoadComplete = function () {
        var theme = new eui.Theme(com.LoadManager.getInstance().getVersion("resource/default.thm.json"), this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.loadLanguage, this);
    };
    Main.prototype.loadLanguage = function () {
        game.LanguageManager.getInstance().loadLanguageText(this.loadGame, this);
    };
    //进入启动界面
    Main.prototype.loadGame = function () {
        game.MediatorManager.openMediator(game.Mediators.Mediator_LoadGame);
        // var ui = new TestListUI();
        // this.addChild(ui);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map