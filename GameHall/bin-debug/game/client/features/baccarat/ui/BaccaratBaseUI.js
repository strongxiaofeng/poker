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
var game;
(function (game) {
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    var BaccaratBaseUI = (function (_super) {
        __extends(BaccaratBaseUI, _super);
        function BaccaratBaseUI(data) {
            var _this = _super.call(this) || this;
            /** 是否是房主 */
            _this.isMy = false;
            /**一局游戏是否是第一次下注*/
            _this.isOneBet = true;
            _this.data = data;
            if (game.GlobalConfig.isMobile) {
                _this.skinName = "resource/skins/game_skins/mobile/baccarat/baccaratSkin.exml";
            }
            game.CommonLoadingUI.getInstance().stop();
            return _this;
        }
        BaccaratBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.playInitMusic();
            this.videoShow = false;
            this.videoBg.visible = true;
            this.streamVo = game.StreamVideo.getInstance();
        };
        BaccaratBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case BaccaratUICommands.showVideo:
                    if (!this.videoShow) {
                        this.videoBg.visible = true;
                        // MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
                        this.videoPath = params;
                        this.xplayer = this.streamVo.connectByUrl(this, "video:" + game.GlobalConfig.mediaCdn, this.onVideoConnected, this.onVideoConnectError, this.videoPath);
                    }
                    break;
                case BaccaratUICommands.update_head:
                    this.update_head(params);
                    break;
                case BaccaratUICommands.show_playback:
                    console.warn("百家乐：", "show_playback");
                    if (this.streamVo) {
                        this.streamVo.close(this.xplayer);
                    }
                    this.videoBg.visible = true;
                    this.videoShow = false;
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoLoading.name);
                    break;
                case BaccaratUICommands.close_playback:
                    console.warn("百家乐：", "close_playback");
                    this.xplayer = this.streamVo.connectByUrl(this, "video:" + game.GlobalConfig.mediaCdn, this.onVideoConnected, this.onVideoConnectError, this.videoPath);
                    break;
                case BaccaratUICommands.BaccaratNotify_roomCardNum:
                    this.roomCardNum = params;
                    break;
            }
        };
        /** 初始化计时器 */
        BaccaratBaseUI.prototype.initCountdown = function () {
        };
        BaccaratBaseUI.prototype.stratCallBack = function (time) {
            if (time > 0) {
                if (time == 10) {
                    game.SoundPlayerNew.playEffect(game.SoundConst.count_down, 1, false, null, null, 2);
                    game.SoundPlayerNew.playEffect(game.SoundConst.clock_bomb);
                }
                else if (time < 10 && time > 0) {
                    game.SoundPlayerNew.playEffect(game.SoundConst.clock_bomb);
                }
            }
        };
        BaccaratBaseUI.prototype.update_head = function (arr) {
        };
        /**房卡不为0*/
        BaccaratBaseUI.prototype.roomCard = function () {
            if (this.isOneBet) {
                if (this.roomCardNum > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        };
        BaccaratBaseUI.prototype.onVideoConnected = function () {
            this.videoBg.visible = false;
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoLoading.name);
            this.videoShow = true;
        };
        BaccaratBaseUI.prototype.onVideoConnectError = function () {
            this.videoBg.visible = true;
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoLoading.name);
        };
        BaccaratBaseUI.prototype.receiveSingleCard = function (name, num) {
            game.SoundPlayerNew.playEffect(game.SoundConst.cards_dealing);
            if (name == "player_3") {
                game.SoundPlayerNew.playEffect(game.SoundConst.baccarat_player_drawcard, 1, false, null, null, 2);
            }
            if (name == "banker_3") {
                game.SoundPlayerNew.playEffect(game.SoundConst.baccarat_banker_drawcard, 1, false, null, null, 2);
            }
        };
        /**-----------------------------------    音效类   ----------------------------- */
        /**
         * 进入时播放声音
         * */
        BaccaratBaseUI.prototype.playInitMusic = function () {
            // SoundPlayerNew.updateBgm();
            game.SoundPlayerNew.playEffect(game.SoundConst.baccarat_welcome, 1, false, null, null, 1);
        };
        /**-----------------------------------    内存清理   ----------------------------- */
        BaccaratBaseUI.prototype.dispose = function () {
            if (this.streamVo) {
                this.streamVo.close(this.xplayer);
            }
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoLoading.name);
            _super.prototype.dispose.call(this);
        };
        return BaccaratBaseUI;
    }(game.BaseUI));
    game.BaccaratBaseUI = BaccaratBaseUI;
    __reflect(BaccaratBaseUI.prototype, "game.BaccaratBaseUI");
})(game || (game = {}));
//# sourceMappingURL=BaccaratBaseUI.js.map