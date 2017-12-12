var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SoundPlayerNew = (function () {
        function SoundPlayerNew() {
        }
        /**开关背景音乐 */
        SoundPlayerNew.setMusicOpen = function (b) {
            this.isMusicOpen = b;
            if (b) {
                this.updateBgm();
            }
            else {
                if (this.lastMusicChannel) {
                    this.lastMusicChannel.stop();
                }
                this.lastMusicChannel = null;
                this.lastMusic = "";
            }
        };
        /**开关语音 音效 */
        SoundPlayerNew.setSoundOpen = function (b) {
            this.isSoundOpen = b;
            if (!b) {
                if (this.effectChannels.length > 0) {
                    for (var i = 0; i < this.effectChannels.length; i++) {
                        this.effectChannels[i].volume = 0;
                    }
                }
                SoundPlayerNew.stopCurrentEffect();
                // if(this.PlayingSheetSounds.length > 0)
                // {
                // 	for(let i=0; i<this.PlayingSheetSounds.length; i++)
                // 	{
                // 		this.PlayingSheetSounds[i].channel.volume = 0;
                // 	}
                // }
            }
        };
        /**
         * 加载并播放聊天语音
         */
        SoundPlayerNew.playVoice = function (url, callback, callbackObj) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (callbackObj === void 0) { callbackObj = null; }
            var sound;
            if (!this.voiceDic.getValue(url)) {
                sound = new egret.Sound();
                sound.addEventListener(egret.Event.COMPLETE, function (e) {
                    _this.voiceDic.setValue(url, sound);
                    var channel = sound.play(0, 1);
                    channel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
                        if (callback && callbackObj) {
                            callback.apply(callbackObj);
                        }
                    }, _this);
                }, this);
                sound.load(url);
            }
            else {
                sound = this.voiceDic.getValue(url);
                var channel = sound.play(0, 1);
                channel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
                    if (callback && callbackObj) {
                        callback.apply(callbackObj);
                    }
                }, this);
            }
        };
        /**
         * 播放一个游戏音效/语音
         * soundKey: SoundConst中的声音key
         * loop: 循环次数
         * isPlayBackSound: 是否是视频回放中的声音
         * priority: 语音优先级 默认3（最低级别）级别1：进入房间语音；级别2：发牌结果、连开、连赢、连输；级别3：其他语音。当有更高级别的语音在播放时，不播放低级别的语音。
         * */
        SoundPlayerNew.playEffect = function (soundKey, loop, isPlayBackSound, callback, callbackObj, priority) {
            var _this = this;
            if (loop === void 0) { loop = 1; }
            if (isPlayBackSound === void 0) { isPlayBackSound = false; }
            if (callback === void 0) { callback = null; }
            if (callbackObj === void 0) { callbackObj = null; }
            if (priority === void 0) { priority = 3; }
            // console.log("SoundPlayerNew playEffect ",soundKey);
            if (!this.isSoundOpen || !this.isMusicActive)
                return;
            var soundName = soundKey[0];
            var sheetName = soundKey[1];
            //单独音效
            if (soundKey.length == 1) {
                var sound = game.SoundLoader.getSingleSound(soundName);
                if (sound) {
                    //播放这个单音效
                    var channel = sound.play(0, loop);
                    this.effectChannels.push(channel);
                    channel.addEventListener(egret.Event.SOUND_COMPLETE, function (e) {
                        var index = _this.effectChannels.indexOf(channel);
                        _this.effectChannels.splice(index, 1);
                        if (callback) {
                            callback.call(callbackObj);
                        }
                    }, this);
                }
                else {
                    //即时加载 再播放
                    game.SoundLoader.loadSingleSound(soundName, function () {
                        _this.playEffect(soundKey, loop, isPlayBackSound, callback, callbackObj);
                    }, this);
                }
            }
            else if (soundKey.length == 2) {
                //有优先级更高的语音在播，就不播当前这个语音
                if (this.isHighPriorityExists(priority)) {
                    game.DebugUtil.debug("SoundPlayerNew " + soundKey[0] + "优先级不满足播放 return");
                    return;
                }
                var sheetObj = game.SoundLoader.getSheet(sheetName);
                //json中的sheet名字 不一定是我们定的名字，而是生成json配置的时候产生的名字,比如我们用dragon座位sheetname,实际名字是dragontiger
                var sheetNameInJson = "";
                for (var name in sheetObj.json) {
                    if (name) {
                        sheetNameInJson = name;
                        break;
                    }
                }
                var startTime = sheetObj.json[sheetNameInJson][soundName].startPosition;
                var endTime = sheetObj.json[sheetNameInJson][soundName].endPosition;
                game.DebugUtil.debug("开始播放合集声音" + sheetNameInJson + "的音效片段 " + soundName + " startTime:" + startTime + " endTime:" + endTime);
                this.playSheetSound(soundName, sheetObj.sound, startTime, endTime, callback, callbackObj, priority);
            }
        };
        /**停止当前的音效 退出房间时要调*/
        SoundPlayerNew.stopCurrentEffect = function () {
            // while(this.effectChannels.length > 0){
            // 	this.effectChannels.pop().stop();
            // }
            while (this.PlayingSheetSounds.length > 0) {
                this.PlayingSheetSounds.pop().channel.stop();
            }
        };
        /**是否有更高级别的语音在播放 */
        SoundPlayerNew.isHighPriorityExists = function (priority) {
            if (this.PlayingSheetSounds && this.PlayingSheetSounds.length > 0) {
                for (var i = 0; i < this.PlayingSheetSounds.length; i++) {
                    var playingSheetObj = this.PlayingSheetSounds[i];
                    if (playingSheetObj.priority < priority) {
                        console.log("有优先级更高的语音在播放：", playingSheetObj.name);
                        return true;
                    }
                }
            }
            return false;
        };
        /** 检测该播放哪首背景音乐 or 停止音乐 */
        SoundPlayerNew.updateBgm = function () {
            if (!this.isMusicOpen || !this.isMusicActive)
                return;
            var music = game.SoundConst.mainBgm[0];
            if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_BaccaratMediator.name)) {
                music = game.SoundConst.gameBgm[0];
            }
            if (music.length > 0) {
                this.playMusic(music);
            }
            else {
                if (this.lastMusicChannel) {
                    this.lastMusicChannel.stop();
                }
                this.lastMusicChannel = null;
                this.lastMusic = "";
            }
        };
        /**当页面激活 和 取消激活时执行 */
        SoundPlayerNew.setActive = function (b) {
            this.setMusicOpen(b);
            this.setSoundOpen(b);
            // if(b)
            // {
            // 	this.isMusicActive = true;
            // 	this.updateBgm();
            // }
            // else
            // {
            // 	this.isMusicActive = false;
            // 	if(this.lastMusicChannel) {
            // 		this.lastMusicChannel.stop();
            // 	}
            // 	this.lastMusicChannel = null;
            // 	this.lastMusic = "";
            // }
        };
        /**播放指定的背景音乐 */
        SoundPlayerNew.playMusic = function (name) {
            var _this = this;
            if (!this.isMusicOpen || !this.isMusicActive)
                return;
            if (!name)
                return;
            if (this.lastMusic == name && this.lastMusicChannel && this.lastMusicChannel.position != 0)
                return;
            if (this.lastMusicChannel)
                this.lastMusicChannel.stop();
            this.lastMusic = name;
            var music = game.SoundLoader.getSingleSound(name);
            if (music) {
                //播放这个单音效
                this.lastMusicChannel = music.play(0);
            }
            else {
                //即时加载 再看是否还需要播放
                game.SoundLoader.loadSingleSound(name, function () {
                    _this.updateBgm();
                }, this);
            }
        };
        /**
         * 播放sheet中的一个音效片段。只支持播放单次 不可以循环
         * */
        SoundPlayerNew.playSheetSound = function (soundName, sound, startTime, endTime, callback, callbackObj, priority) {
            if (callback === void 0) { callback = null; }
            if (callbackObj === void 0) { callbackObj = null; }
            var channel = sound.play(startTime, 1);
            if (endTime == 0) {
                channel["isEnd"] = false;
                channel.addEventListener(egret.Event.SOUND_COMPLETE, function (e) {
                    channel["isEnd"] = true;
                }, this);
            }
            var playSheetObj = new PlayingSheetSound();
            playSheetObj.name = soundName;
            playSheetObj.priority = priority;
            playSheetObj.channel = channel;
            playSheetObj.endTime = endTime;
            playSheetObj.callback = callback;
            playSheetObj.callbackObj = callbackObj;
            this.PlayingSheetSounds.push(playSheetObj);
            this.startCheckSheetSound(true);
        };
        /**
         * 开启 or 关闭 sheet音效片段终点的计时器
         * */
        SoundPlayerNew.startCheckSheetSound = function (b) {
            var _this = this;
            if (b) {
                if (!this.sheetInterval) {
                    this.sheetInterval = setInterval(function () {
                        _this.checkEndSound();
                    }, 10, this);
                }
            }
            else {
                clearInterval(this.sheetInterval);
                this.sheetInterval = null;
            }
        };
        /**
         * 遍历所有正在播放的合集音效 是否到达停止时间
         */
        SoundPlayerNew.checkEndSound = function () {
            if (this.PlayingSheetSounds.length > 0) {
                for (var i = 0; i < this.PlayingSheetSounds.length; i++) {
                    var playSheetObj = this.PlayingSheetSounds[i];
                    //这个合集音效播放位置已经超过了该音效片段的 endtime， 应该停下来了
                    if (playSheetObj.endTime > 0 && playSheetObj.channel.position >= playSheetObj.endTime) {
                        game.DebugUtil.debug("到达停止时间，停止一个音效片段 " + playSheetObj.name);
                        this.PlayingSheetSounds.splice(i--, 1);
                        playSheetObj.channel.stop();
                        if (playSheetObj.callback && playSheetObj.callbackObj) {
                            playSheetObj.callback.call(playSheetObj.callbackObj);
                        }
                    }
                    else if (playSheetObj.endTime == 0 && playSheetObj.channel["isEnd"]) {
                        game.DebugUtil.debug("语音播放结束，停止一个音效片段 " + playSheetObj.name);
                        this.PlayingSheetSounds.splice(i--, 1);
                        if (playSheetObj.callback && playSheetObj.callbackObj) {
                            playSheetObj.callback.call(playSheetObj.callbackObj);
                        }
                    }
                }
            }
            else {
                //没有正在播放的合集音效，就停止interval,减小性能开销
                this.startCheckSheetSound(false);
            }
        };
        /**音效开关*/
        SoundPlayerNew.isSoundOpen = true;
        /**背景音乐开关*/
        SoundPlayerNew.isMusicOpen = true;
        /**声音是否激活 当屏幕失去激活时 声音也不激活*/
        SoundPlayerNew.isMusicActive = true;
        /**正在播放的 音效通道*/
        SoundPlayerNew.effectChannels = [];
        /**上次背景音乐名*/
        SoundPlayerNew.lastMusic = "";
        /** 正在播放的合集音效数组 */
        SoundPlayerNew.PlayingSheetSounds = [];
        /**聊天语音的url与Sound对象 */
        SoundPlayerNew.voiceDic = new game.Dictionary();
        return SoundPlayerNew;
    }());
    game.SoundPlayerNew = SoundPlayerNew;
    __reflect(SoundPlayerNew.prototype, "game.SoundPlayerNew");
    var PlayingSheetSound = (function () {
        function PlayingSheetSound() {
        }
        return PlayingSheetSound;
    }());
    __reflect(PlayingSheetSound.prototype, "PlayingSheetSound");
})(game || (game = {}));
//# sourceMappingURL=SoundPlayerNew.js.map