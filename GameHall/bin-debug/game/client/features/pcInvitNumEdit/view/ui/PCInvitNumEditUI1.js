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
    var PCInvitNumEditUI1 = (function (_super) {
        __extends(PCInvitNumEditUI1, _super);
        function PCInvitNumEditUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/pc/invitNumEdit/invitNumEdit.exml";
            return _this;
        }
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        PCInvitNumEditUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initInputData();
        };
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        PCInvitNumEditUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PCMInvitNumEditCommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        PCInvitNumEditUI1.prototype.initListener = function (mediator) {
            this.registerEvent(this.btn_Cancel, egret.TouchEvent.TOUCH_TAP, this.cancelFun, this);
            this.registerEvent(this.btn_Sure, egret.TouchEvent.TOUCH_TAP, this.sureFun, this);
            this.registerEvent(this.inputDate, egret.TouchEvent.FOCUS_IN, this.clickInputD, this);
            this.registerEvent(this.inputDate, egret.TouchEvent.FOCUS_OUT, this.textChangeD, this);
            this.registerEvent(this.inputDate, egret.Event.CHANGE, this.textChangeD, this);
            this.registerEvent(this.inputTimes, egret.TouchEvent.FOCUS_IN, this.clickInputT, this);
            this.registerEvent(this.inputTimes, egret.TouchEvent.FOCUS_OUT, this.textChangeT, this);
            this.registerEvent(this.inputTimes, egret.Event.CHANGE, this.textChangeT, this);
        };
        /**初始化输入框数据数据*/
        PCInvitNumEditUI1.prototype.initInputData = function () {
            this.imgDataBg.alpha = 0.3;
            this.imgTimesBg.alpha = 0.3;
            this.inputDate.textColor = 0xA29B8E;
            this.inputTimes.textColor = 0xA29B8E;
            this.inputDate.text = game.LanguageUtil.translate("founder_lbl_none_limit");
            this.inputTimes.text = game.LanguageUtil.translate("founder_lbl_none_limit");
            this.textD = "0";
            this.textT = "0";
            this.effectiveDay.text = game.LanguageUtil.translate("founder_lbl_valid_time") + game.LanguageUtil.translate("founder_lbl_unit_per_day");
            this.effectiveMan.text = game.LanguageUtil.translate("founder_lbl_valid_player_amount") + game.LanguageUtil.translate("founder_lbl_unit_per_body");
            var len = game.LanguageUtil.translate("founder_lbl_edit_club_descrp_content1") + game.LanguageUtil.translate("founder_lbl_edit_club_descrp_content2") + game.LanguageUtil.translate("founder_lbl_edit_club_descrp_content3");
            this.descriptionLabel.text = len;
        };
        /**输入框点击事件*/
        PCInvitNumEditUI1.prototype.clickInputD = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.imgDataBg.alpha = 0.6;
            this.inputDate.textColor = 0x000000;
            this.inputDate.text = "";
        };
        /**输入框点击事件*/
        PCInvitNumEditUI1.prototype.clickInputT = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.imgTimesBg.alpha = 0.6;
            this.inputTimes.textColor = 0x000000;
            this.inputTimes.text = "";
        };
        /**输入框变化事件*/
        PCInvitNumEditUI1.prototype.textChangeD = function (evt) {
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                if (!this.inputDate.text) {
                    this.inputDate.text = game.LanguageUtil.translate("founder_lbl_none_limit");
                    this.textD = "0";
                }
                else if (this.inputDate.text == "0") {
                    this.inputDate.text = "1";
                    this.textD = "1";
                }
                else {
                    var num = /[^\d]/; ///^[0-9]*$/
                    if (!num.test(this.inputDate.text)) {
                        this.textD = this.inputDate.text;
                    }
                    else {
                        this.inputDate.text = this.textD;
                    }
                }
                this.imgDataBg.alpha = 0.3;
                this.inputDate.textColor = 0xA29B8E;
            }
            else {
                var num = /[^\d]/; ///^[0-9]*$/
                if (!num.test(this.inputDate.text)) {
                    this.textD = this.inputDate.text;
                }
                else {
                    this.inputDate.text = this.textD;
                }
            }
        };
        /**输入框变化事件*/
        PCInvitNumEditUI1.prototype.textChangeT = function (evt) {
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                if (!this.inputTimes.text) {
                    this.inputTimes.text = game.LanguageUtil.translate("founder_lbl_none_limit");
                    this.textT = "0";
                }
                else if (this.inputTimes.text == "0") {
                    this.inputTimes.text = "1";
                    this.textT = "1";
                }
                else {
                    var num = /[^\d]/; ///^[0-9]*$/
                    if (!num.test(this.inputTimes.text)) {
                        this.textT = this.inputTimes.text;
                    }
                    else {
                        this.inputTimes.text = this.textT;
                    }
                }
                this.imgTimesBg.alpha = 0.3;
                this.inputTimes.textColor = 0xA29B8E;
            }
            else {
                var num = /[^\d]/; ///^[0-9]*$/
                if (!num.test(this.inputTimes.text)) {
                    this.textT = this.inputTimes.text;
                }
                else {
                    this.inputTimes.text = this.textT;
                }
            }
        };
        /**取消*/
        PCInvitNumEditUI1.prototype.cancelFun = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            game.GameController.getInstance().sendNotification(game.NotifyConst.Notify_PC_CloseMenu, 2);
        };
        /**确认提示*/
        PCInvitNumEditUI1.prototype.sureFun = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var tipData = new game.TipMsgInfo();
            tipData.msg = [{ text: game.LanguageUtil.translate("founder_lbl_edit_club_tips"), textColor: enums.ColorConst.Golden }];
            tipData.cancelText = "global_btn_cancel_text";
            tipData.confirmText = "global_btn_ok_text";
            tipData.cancelCallBack = this.canCelCloseRoomCallBack;
            tipData.comfirmCallBack = this.closeRoomCallBack;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        /** 取消关闭房间确定回调 */
        PCInvitNumEditUI1.prototype.canCelCloseRoomCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 关闭房间确定回调 */
        PCInvitNumEditUI1.prototype.closeRoomCallBack = function () {
            this.sendRequest();
        };
        // ---------------------------------- 发送数据 ----------------------------------
        /** 发送编辑后俱乐部数据 */
        PCInvitNumEditUI1.prototype.sendRequest = function () {
            var maxTime = null;
            var maxPlayers = null;
            var time = Number.parseInt(this.textD);
            if (!isNaN(time))
                maxTime = time;
            var player = Number.parseInt(this.textT);
            if (!isNaN(player))
                maxPlayers = player;
            game.ClubController.getInstance().editClub(game.GlobalConfig.clubId + "", null, maxTime, maxPlayers).then(function () {
                game.GameController.getInstance().sendNotification(game.NotifyConst.Notify_PC_CloseMenu, 2);
            }).catch(function (errorCode) {
                var msg = "编辑失败";
                switch (errorCode) {
                    case "max_time_length":
                        msg = "有效时间设置过长";
                        break;
                    case "max_players_length":
                        msg = "有效人数过多";
                        break;
                }
            });
        };
        return PCInvitNumEditUI1;
    }(game.BaseUI));
    game.PCInvitNumEditUI1 = PCInvitNumEditUI1;
    __reflect(PCInvitNumEditUI1.prototype, "game.PCInvitNumEditUI1");
})(game || (game = {}));
//# sourceMappingURL=PCInvitNumEditUI1.js.map