var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SoundPlayer = (function () {
        function SoundPlayer() {
            this.soundDic = new game.Dictionary();
            this.channelDic = new game.Dictionary();
        }
        SoundPlayer.getInstance = function () {
            if (this._instance == null) {
                this._instance = new SoundPlayer();
            }
            return this._instance;
        };
        /**
         * 播放音乐
         * @param url mp3地址
         * @param callBack 回调函数，播放完成会调用这个函数
         * @param thisObj 回调函数的对象
         *  */
        SoundPlayer.prototype.playSound = function (url, callBack, thisObj) {
            // url = "resource/music/room.mp3";
            this._callBack = callBack;
            this._thisObj = thisObj;
            this.startLoad(url);
        };
        /**播放背景音乐 */
        SoundPlayer.prototype.playBgSound = function (url) {
            if (this._bgUrl) {
                this.closeSound(this._bgUrl);
            }
            this._bgUrl = url;
            this.startLoad(url);
        };
        SoundPlayer.prototype.startLoad = function (url) {
            //创建 Sound 对象
            var sound = new egret.Sound();
            this.soundDic.setValue(url, sound);
            //添加加载完成侦听
            sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            //开始加载
            game.DebugUtil.debug("加载音乐：" + url);
            sound.load(url);
        };
        SoundPlayer.prototype.onLoadComplete = function (event) {
            //获取加载到的 Sound 对象
            var sound = event.currentTarget;
            var url = this.soundDic.getKeyByValue(sound);
            var loops = 1;
            //播放音乐
            if (url == this._bgUrl) {
                loops = 0;
            }
            var channel = sound.play(0, loops);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            this.channelDic.setValue(url, channel);
        };
        SoundPlayer.prototype.onSoundComplete = function (event) {
            egret.log("onSoundComplete");
            //获取加载到的 Sound 对象
            var channel = event.currentTarget;
            var url = this.channelDic.getKeyByValue(channel);
            if (this._callBack) {
                this._callBack.call(this._thisObj);
            }
            if (url != this._bgUrl) {
                this.closeSound(url);
            }
        };
        /**sound里面都是用url作为key */
        SoundPlayer.prototype.closeSound = function (url) {
            var channel = this.channelDic.getValue(url);
            var sound = this.soundDic.getValue(url);
            if (channel) {
                channel.stop();
                this.channelDic.removeKey(url);
            }
            if (sound) {
                sound.close();
                this.soundDic.removeKey(url);
            }
        };
        SoundPlayer.prototype.stop = function () {
            var arr = this.channelDic.getAllValue();
            var channel;
            for (var i = arr.length - 1; i >= 0; i--) {
                channel = arr[i];
                if (channel) {
                    channel.stop();
                    this.channelDic.removeValue(channel);
                }
            }
            var arr_sound = this.soundDic.getAllValue();
            var sound;
            for (var i = arr_sound.length - 1; i >= 0; i--) {
                sound = arr_sound[i];
                if (sound) {
                    sound.close();
                    this.soundDic.removeValue(sound);
                }
            }
        };
        SoundPlayer.prototype.play = function () {
            if (this.soundDic.getKeyLength() > 0) {
                //已经有声音在播放了
                return;
            }
            if (this._bgUrl) {
                this.playBgSound(this._bgUrl);
            }
        };
        return SoundPlayer;
    }());
    game.SoundPlayer = SoundPlayer;
    __reflect(SoundPlayer.prototype, "game.SoundPlayer");
})(game || (game = {}));
//# sourceMappingURL=SoundPlayer.js.map