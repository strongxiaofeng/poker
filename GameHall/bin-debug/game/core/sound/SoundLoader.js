var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 多语言的声音 都用合集
     * 非多语言的音效,即时加载
     *
     */
    var SoundLoader = (function () {
        function SoundLoader() {
        }
        /**通过name加载一个声音合集，name必须是定义好的5个name之一 */
        SoundLoader.loadSoundSheet = function (name, callback, callbackObj) {
            // if(!SoundPlayerNew.isMusicOpen) {
            // 	callback.call(callbackObj);
            // 	return;
            // }
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (callbackObj === void 0) { callbackObj = null; }
            game.DebugUtil.debug("加载声音合集 " + name);
            this.loadingSheetSound = name;
            var mp3Url = game.SystemPath.music_path + game.LanguageUtil.local + game.SoundConst.sheetUrl[name] + ".mp3";
            var jsonUrl = game.SystemPath.music_path + game.LanguageUtil.local + game.SoundConst.sheetUrl[name] + ".json";
            com.LoadManager.getInstance().getResByUrl(jsonUrl, function (jsonData) {
                com.LoadManager.getInstance().getResByUrl(mp3Url, function (data) {
                    if (data) {
                        game.DebugUtil.debug("声音合集" + _this.loadingSheetSound + "加载完成");
                        //将这个合集的声音文件和json文件存起来
                        var sheet = new SoundSheetObj();
                        sheet.json = jsonData;
                        sheet.sound = data;
                        _this.soundSheets[_this.loadingSheetSound] = sheet;
                        _this.loadingSheetSound = "";
                        if (callback && callbackObj) {
                            callback.call(callbackObj);
                        }
                    }
                }, _this, com.ResourceItem.TYPE_SOUND);
            }, this, com.ResourceItem.TYPE_JSON);
        };
        /**加载单个音效 */
        SoundLoader.loadSingleSound = function (name, callback, callbackObj) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (callbackObj === void 0) { callbackObj = null; }
            if (this.loadingSingleSounds.indexOf(name) >= 0) {
                //已经正在加载的单音效 不重复去加载
                return;
            }
            else {
                game.DebugUtil.debug("开始加载单个声音:" + name);
                this.loadingSingleSounds.push(name);
            }
            var url = game.SystemPath.music_path + game.SoundConst.soundUrl[name];
            com.LoadManager.getInstance().getResByUrl(url, function (data) {
                if (data) {
                    game.DebugUtil.debug("单个声音 " + name + "加载完成");
                    _this.singSoundsDic.setValue(name, data);
                    //从加载队列移除该音效
                    var loadIndex = _this.loadingSingleSounds.indexOf(name);
                    _this.loadingSingleSounds.splice(loadIndex, 1);
                    if (callback && callbackObj) {
                        callback.call(callbackObj);
                    }
                }
            }, this, com.ResourceItem.TYPE_SOUND);
        };
        /**通过name获取非合集的音效 如果这个音效还未加载完，返回null*/
        SoundLoader.getSingleSound = function (name) {
            var sound = this.singSoundsDic.getValue(name);
            if (sound) {
                return sound;
            }
            else {
                return null;
            }
        };
        /**通过sheet名 获取sheet的声音和json配置 */
        SoundLoader.getSheet = function (name) {
            var sheet = this.soundSheets[name];
            console.log("通过name" + name + "获取音效集:", sheet, this.soundSheets);
            if (sheet) {
                return sheet;
            }
            else {
                return null;
            }
        };
        /**合集名对应的声音文件和配置 */
        SoundLoader.soundSheets = {
            "baccarat": null,
            "dragon": null,
            "public": null,
            "roulette": null,
            "sicbo": null,
        };
        /**正在加载的sheet */
        SoundLoader.loadingSheetSound = "";
        /**非合集的音效字典 */
        SoundLoader.singSoundsDic = new game.Dictionary();
        /**正在加载的单音效队列 */
        SoundLoader.loadingSingleSounds = [];
        return SoundLoader;
    }());
    game.SoundLoader = SoundLoader;
    __reflect(SoundLoader.prototype, "game.SoundLoader");
    var SoundSheetObj = (function () {
        function SoundSheetObj() {
        }
        return SoundSheetObj;
    }());
    __reflect(SoundSheetObj.prototype, "SoundSheetObj");
})(game || (game = {}));
//# sourceMappingURL=SoundLoader.js.map