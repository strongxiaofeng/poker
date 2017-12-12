var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
    var MediatorManager = (function () {
        function MediatorManager() {
        }
        /**记录几个主要显示模块的开始加载的时间 */
        MediatorManager.saveLoadTime = function (name, loadOver) {
            if (loadOver === void 0) { loadOver = false; }
            if (!name || !name.length)
                return;
            // switch(name){
            //     case Mediators.Mediator_HomePage.name:
            // 		if(loadOver) LoadTimeRecorder.getMainViewTime();
            //         else LoadTimeRecorder.setMainViewTime();
            //         break;
            //     case Mediators.Mediator_Baccarat.name:
            // 		if(loadOver) LoadTimeRecorder.getBaccaratViewTime();
            //         else LoadTimeRecorder.setBaccaratViewTime();
            //         break;
            //     case Mediators.Mediator_BaccaratMi.name:
            // 		if(loadOver) LoadTimeRecorder.getBaccaratMiViewTime();
            //         else LoadTimeRecorder.setBaccaratMiViewTime();
            //         break;
            //     case Mediators.Mediator_DragonTiger.name:
            // 		if(loadOver) LoadTimeRecorder.getDTViewTime();
            //         else LoadTimeRecorder.setDTViewTime();
            //         break;
            //     case Mediators.Mediator_Roulette.name:
            // 		if(loadOver) LoadTimeRecorder.getRouletteViewTime();
            //         else LoadTimeRecorder.setRouletteViewTime();
            //         break;
            //     case Mediators.Mediator_Sicbo.name:
            // 		if(loadOver) LoadTimeRecorder.getSicboViewTime();
            //         else LoadTimeRecorder.setSicboViewTime();
            //         break;
            // }
        };
        /**打开某个游戏的mediator */
        MediatorManager.openMediator = function (m, data, direction) {
            if (data === void 0) { data = null; }
            if (direction === void 0) { direction = 0; }
            game.DebugUtil.debug("MediatorManager openMediator " + m.name + " direction:" + direction);
            var name = m.name;
            this.saveLoadTime(name);
            if (direction) {
                m.direction = direction;
            }
            var layer = m.layer;
            if (!game.GlobalConfig.isMobile && m.layer_pc) {
                layer = m.layer_pc;
            }
            if ((m.res && game.GlobalConfig.isMobile) || (m.res_pc && (!game.GlobalConfig.isMobile))) {
                var resGroup = "";
                if (game.GlobalConfig.isMobile) {
                    resGroup = game.ResGroups.getMultiGroupName(m.res);
                }
                else {
                    resGroup = game.ResGroups.getMultiGroupName(m.res_pc);
                }
                var soundGroup = m.sounds;
                this.checkResLoad(resGroup, soundGroup, name, data, layer, m.direction);
            }
            else {
                this.checkSoundLoad(m.sounds, name, data, layer, m.direction);
            }
        };
        /**检查这个游戏的图片资源加载了没 */
        MediatorManager.checkResLoad = function (resGroup, soundGroup, name, data, layer, direction) {
            if (data === void 0) { data = null; }
            game.DebugUtil.debug("检查资源组是否被加载 " + resGroup);
            if (!com.LoadManager.getInstance().isMultiGroupLoaded(resGroup)) {
                this.loadResMultiGroup(resGroup, soundGroup, name, data, layer, direction);
            }
            else {
                this.checkSoundLoad(soundGroup, name, data, layer, direction);
            }
        };
        MediatorManager.loadResMultiGroup = function (resGroup, soundGroup, name, data, layer, direction) {
            if (data === void 0) { data = null; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            game.CommonLoadingUI.getInstance().start();
                            game.DebugUtil.debug("加载multi组 " + resGroup);
                            return [4 /*yield*/, com.LoadManager.getInstance().loadMultiGroup(resGroup, function (progress) {
                                    game.DebugUtil.debug("加载进度：" + progress[0] + "/" + progress[1]);
                                    // CommonLoadingUI.getInstance().setProgress(itemLoaded, itemTotal);
                                }, this)];
                        case 1:
                            _a.sent();
                            game.DebugUtil.debug("加载multi组 " + resGroup + " 完成");
                            game.CommonLoadingUI.getInstance().stop();
                            this.checkSoundLoad(soundGroup, name, data, layer, direction);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**检查这个游戏的音效资源加载了没 */
        MediatorManager.checkSoundLoad = function (soundGroup, name, data, layer, direction) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (soundGroup && game.SoundLoader.getSheet(soundGroup) == null) {
                game.CommonLoadingUI.getInstance().start();
                game.SoundLoader.loadSoundSheet(soundGroup, function () {
                    game.CommonLoadingUI.getInstance().stop();
                    _this.startMediator(name, data, layer, direction);
                }, this);
            }
            else {
                this.startMediator(name, data, layer, direction);
            }
        };
        /**启用指定的mediator */
        MediatorManager.startMediator = function (name, data, layer, direction) {
            if (data === void 0) { data = null; }
            // ComponentProgressLoading.getInstance().closeLoading();
            //如果要启用的mediator的UI 是在UI层级的，要关闭之前的UI层级的mediator
            if (layer == enums.LayerConst.LAYER_UI) {
                this.closeUIMediator(direction);
            }
            //如果重复打开相同的Mediator,要先停用再重新启用，不然会UI泄漏
            var mediator = this.mediatorDic.getValue(name);
            if (mediator && mediator.isStart)
                mediator.dispose();
            if (!mediator) {
                var cls = egret.getDefinitionByName("game." + name);
                mediator = new cls();
                this.mediatorDic.setValue(name, mediator);
            }
            game.DebugUtil.debug("MediatorManager startMediator " + name);
            mediator.start(data);
            this.saveLoadTime(name, true);
        };
        /**停用指定的Mediator */
        MediatorManager.closeMediator = function (name, direction) {
            game.DebugUtil.debug("MediatorManager closeMediator " + name);
            if (!this.isMediatorOpen(name)) {
                return;
            }
            var m = this.mediatorDic.getValue(name);
            if (m) {
                m.dispose(direction);
            }
        };
        /** 判断某个mediator是否打开了 */
        MediatorManager.isMediatorOpen = function (name) {
            var m = this.mediatorDic.getValue(name);
            if (m) {
                return m.isStart;
            }
            return false;
        };
        /**停用所有Mediator 当返回登录界面时需要这个*/
        MediatorManager.closeAllMediator = function () {
            var arr = this.mediatorDic.getAllValue();
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i])
                        arr[i].dispose();
                }
            }
        };
        /**停用当前的UI层的mediator 在打开一个新的UI层Mediator时调用 */
        MediatorManager.closeUIMediator = function (direction) {
            var keys = this.mediatorDic.getAllKey();
            if (keys.length > 0) {
                for (var i = 0; i < keys.length; i++) {
                    var name = keys[i];
                    var m = this.mediatorDic.getValue(name);
                    if (m && m.isStart && m.ui && m.ui.layer == enums.LayerConst.LAYER_UI) {
                        m.dispose(direction);
                    }
                }
            }
        };
        /**全局消息提示 */
        MediatorManager.tipMsg = function (msg, color) {
            if (color === void 0) { color = 0x00ff00; }
            // this.openMediator(Mediators.Mediator_PopTip, {type:"tip",msg:msg, color:color});
        };
        /**全局倒数提示 执行回调 */
        MediatorManager.tipDownTime = function (callBack, thisObj) {
            // this.openMediator(Mediators.Mediator_PopTip, {type:"downtime",callback:callBack, callbackObj:thisObj});
        };
        /*通用确定取消界面*/
        MediatorManager.tipConfirm = function (params) {
            // this.openMediator(Mediators.Mediator_ComfirAndCancelMediator,params);
        };
        /**打开过的mediator对象池 */
        MediatorManager.mediatorDic = new game.Dictionary();
        return MediatorManager;
    }());
    game.MediatorManager = MediatorManager;
    __reflect(MediatorManager.prototype, "game.MediatorManager");
})(game || (game = {}));
//# sourceMappingURL=MediatorManager.js.map