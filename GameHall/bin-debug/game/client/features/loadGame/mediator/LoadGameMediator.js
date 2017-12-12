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
var game;
(function (game) {
    var LoadGameMediator = (function (_super) {
        __extends(LoadGameMediator, _super);
        function LoadGameMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        LoadGameMediator.prototype.initUI = function () {
            this.ui = new game.LoadGameUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_LoadGame.layer);
        };
        /**分发游戏数据 */
        LoadGameMediator.prototype.initData = function () {
            this.loadRes();
        };
        /**加载配置 资源 */
        LoadGameMediator.prototype.loadRes = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, p, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            p = 0;
                            id = setInterval(function () {
                                if (p >= 90)
                                    return;
                                p++;
                                self.notifyUI(LoadGameCommands.setProgress, p);
                            }, 200);
                            this.intervalObj["progress"] = id;
                            // await com.LoadManager.getInstance().loadGroup("login");
                            return [4 /*yield*/, com.LoadManager.getInstance().loadMultiGroup(game.ResGroups.getMultiGroupName("login"))];
                        case 1:
                            // await com.LoadManager.getInstance().loadGroup("login");
                            _a.sent();
                            this.loadComplete();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**加载结束 进入登录界面 */
        LoadGameMediator.prototype.loadComplete = function () {
            game.DebugUtil.debug("加载图片资源完成");
            game.SoundLoader.loadSoundSheet(game.SoundConst.Sheet_Public, function () {
                // MediatorManager.openMediator(Mediators.Mediator_VideoTest);
                // SoundPlayer.getInstance().playBgSound(SoundConst.BgSound_Hall);
                game.SoundPlayerNew.updateBgm();
                game.MediatorManager.openMediator(game.Mediators.Mediator_Login);
            }, this);
        };
        /**关闭 */
        LoadGameMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return LoadGameMediator;
    }(game.BaseMediator));
    game.LoadGameMediator = LoadGameMediator;
    __reflect(LoadGameMediator.prototype, "game.LoadGameMediator");
})(game || (game = {}));
//# sourceMappingURL=LoadGameMediator.js.map