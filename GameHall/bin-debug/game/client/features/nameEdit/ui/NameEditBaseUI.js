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
    var NameEditBaseUI = (function (_super) {
        __extends(NameEditBaseUI, _super);
        function NameEditBaseUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        NameEditBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.setTitle(this.data);
            this.tipGroup.alpha = 1;
            this.tipGroup.visible = false;
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        NameEditBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case NameEditUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        NameEditBaseUI.prototype.initListener = function (mediator) {
            // this.registerEvent(this.cancelLabel, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            // this.registerEvent(this.confirmLabel, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.backBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.deleteBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.inputLabel, egret.Event.CHANGE, this.onInput, this);
        };
        /** 响应点击事件 */
        NameEditBaseUI.prototype.onHandleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.cancelBtn:
                case this.backBtn:
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NameEdit.name);
                    break;
                case this.confirmBtn:
                    this.sendRequest(this.inputLabel.text);
                    break;
                // case this.cancelLabel:
                //     MediatorManager.closeMediator(Mediators.Mediator_NameEdit.name);
                //     break;
                // case this.confirmLabel:
                //     this.sendRequest(this.inputLabel.text);
                //     break;
                case this.deleteBtn:
                    this.inputLabel.text = "";
                    break;
            }
        };
        /** 输入框响应事件 */
        NameEditBaseUI.prototype.onInput = function (event) {
            this.inputLabel.text = this.inputLabel.text.trim();
            var txt = this.inputLabel.text;
            switch (this.data) {
                case game.NameEditMediator.Type_Club:
                case game.NameEditMediator.Type_User:
                    var maxLen = this.data == game.NameEditMediator.Type_Club ? 20 : 12;
                    var tips = this.data == game.NameEditMediator.Type_Club ? "最多只能输入20个字符" : "最多只能输入12个字符";
                    if (game.StringUtil.getStrLen(txt) > maxLen) {
                        this.tipError(tips);
                        this.inputLabel.text = game.StringUtil.sliceByLen(txt, maxLen);
                    }
                    break;
            }
        };
        /** 发送改名请求 */
        NameEditBaseUI.prototype.sendRequest = function (txt) {
            var _this = this;
            switch (this.data) {
                case game.NameEditMediator.Type_Club:
                    game.ClubController.getInstance().editClub(game.GlobalConfig.clubId + "", txt).then(function () {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_NameEdit.name);
                    }).catch(function (errCode) {
                        var tips = "修改俱乐部信息失败";
                        switch (errCode) {
                            case "name_length":
                                tips = "俱乐部名称过长";
                                break;
                            case "name_empty":
                            case "param_empty":
                                tips = "俱乐部名称不能为空";
                                break;
                            case "name_character":
                                tips = "俱乐部名称只能是字母、汉字或数字的组合";
                                break;
                            case "name_illegal":
                                tips = "俱乐部名称不合法";
                                break;
                            case "name_exists":
                                tips = "俱乐部名称已存在";
                                break;
                            case "max_time_length":
                                tips = "邀请码有效时间过长";
                                break;
                            case "max_players_length":
                                tips = "邀请码有效人数过多";
                                break;
                        }
                        _this.tipError(tips);
                    });
                    break;
                case game.NameEditMediator.Type_User:
                    game.PersonalInfoController.getInstance().updatePlayerInfo(txt).then(function () {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_NameEdit.name);
                        // MediatorManager.openMediator(Mediators.Mediator_PersonalInformation);
                    }).catch(function (errorCode) {
                        var tips = "修改用户信息失败";
                        switch (errorCode) {
                            case "update_failed":
                                tips = "修改用户信息失败";
                                break;
                            case "param_empty":
                                tips = "昵称不能为空";
                                break;
                            case "nick_exists":
                                tips = "昵称已存在";
                                break;
                            case "wrong_nick_character":
                            case "nick_empty":
                                tips = "昵称只能是字母、汉字或数字的组合";
                                break;
                            case "wrong_nick_length":
                                var maxLen = _this.data == game.NameEditMediator.Type_Club ? 20 : 12;
                                tips = "\u6700\u591A\u53EA\u80FD\u8F93\u5165" + maxLen + "\u4E2A\u5B57\u7B26";
                                break;
                        }
                        _this.tipError(tips);
                        _this.inputLabel.text = game.PersonalInfoModel.getInstance().nick;
                    });
                    break;
            }
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 设置当前页的标题
         *  @param type {string} 修改俱乐部名称 - NameEditMediator.Type_Club | 修改用户昵称 - NameEditMediator.Type_User
         */
        NameEditBaseUI.prototype.setTitle = function (type) {
            switch (type) {
                case game.NameEditMediator.Type_Club:
                    this.titleLabel.text = game.LanguageUtil.translate("更换名称");
                    this.inputLabel.text = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
                    break;
                case game.NameEditMediator.Type_User:
                    this.titleLabel.text = game.LanguageUtil.translate("更换昵称");
                    this.inputLabel.text = game.PersonalInfoModel.getInstance().nick;
                    break;
            }
        };
        /** 提示输入错误 */
        NameEditBaseUI.prototype.tipError = function (msg) {
            this.errorLabel.text = game.LanguageUtil.translate(msg);
            // this.tipGroup.alpha = 1;
            // this.tipGroup.visible = true;
            // CTween.removeTweens(this.tipGroup);
            // CTween.get(this.tipGroup).wait(1500).to({ alpha: 0 }, 1500).call(() => {
            //     this.tipGroup.visible = false;
            // }, this);
            game.CTweenManagerController.getInstance().startCTween(2, [this.tipGroup]);
        };
        // ---------------------------------- dispose ----------------------------------
        NameEditBaseUI.prototype.dispose = function () {
            game.CTween.removeTweens(this.tipGroup);
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return NameEditBaseUI;
    }(game.BaseUI));
    game.NameEditBaseUI = NameEditBaseUI;
    __reflect(NameEditBaseUI.prototype, "game.NameEditBaseUI");
})(game || (game = {}));
//# sourceMappingURL=NameEditBaseUI.js.map