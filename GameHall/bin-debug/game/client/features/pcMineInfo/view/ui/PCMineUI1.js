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
    var PCMineUI1 = (function (_super) {
        __extends(PCMineUI1, _super);
        function PCMineUI1(data) {
            var _this = _super.call(this) || this;
            //退出俱乐部效果资源
            _this.btnDown = "window_btn_into_p_pc_png";
            _this.btnUp = "window_btn_into_pc_png";
            _this.btnOver = "window_btn_into_h_pc_png";
            //退出账号效果资源
            _this.btnBackOver = "mine_btn_quitaccount_h_pc_png";
            _this.btnBackOut = "mine_btn_quitaccount_pc_png";
            /**失去焦点一瞬间点击确认按钮*/
            _this.isSure = true;
            _this.isOut = true;
            /**是否失去焦点*/
            _this.isFocusOut = false;
            _this.data = data;
            _this.skinName = "resource/skins/game_skins/pc/my/mineSkin.exml";
            return _this;
        }
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        PCMineUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.showCirclePicture();
            this.initShowData(this.data);
            this.label_Back.visible = true;
            this.label_Back2.visible = false;
            this.tipGroup.alpha = 1;
            this.tipGroup.visible = false;
        };
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        PCMineUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PCMineCommands.initListener:
                    this.initListener(params);
                    break;
                case PCMineCommands.updateTextrue:
                    this.initShowData(this.data);
                    break;
                case PCMineCommands.clubUpdateSuccess:
                    this.updateAll();
                    break;
                case PCMineCommands.setJoinedClubNum:
                    this.setJoinedClubNum();
                    break;
                case PCMineCommands.changeEditBtn:
                    this.changeEditBtn(params);
                    break;
                case PCMineCommands.changeChooseC:
                    this.changeChooseC(params);
                    break;
                case PCMineCommands.changeBack:
                    this.changeBack(params);
                    break;
            }
        };
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        PCMineUI1.prototype.initListener = function (mediator) {
            var _this = this;
            // this.registerEvent(this.closeMineBtn,egret.TouchEvent.TOUCH_TAP,this.closeMine,this);
            this.registerEvent(this.backClubBtn, egret.TouchEvent.TOUCH_BEGIN, function () {
                //相关效果
                _this.label_Back.visible = false;
                _this.label_Back2.visible = true;
                _this.backImg1.source = _this.btnDown;
                _this.backImg2.source = _this.btnDown;
            }, this);
            this.registerEvent(this.backClubBtn, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.backImg1.source = _this.btnOver;
                _this.backImg2.source = _this.btnOver;
                _this.isOut = true;
            }, this);
            this.registerEvent(this.backClubBtn, mouse.MouseEvent.MOUSE_OUT, function () {
                if (_this.isOut) {
                    _this.backImg1.source = _this.btnUp;
                    _this.backImg2.source = _this.btnUp;
                }
            }, this);
            this.registerEvent(this.editSureBtn, egret.TouchEvent.TOUCH_TAP, this.sureFun, this);
            this.registerEvent(this.editBtn, egret.TouchEvent.TOUCH_TAP, this.editNick, this);
            this.registerEvent(this.label_NickName, egret.Event.CHANGE, this.onInput, this);
            this.registerEvent(this.label_NickName, egret.Event.FOCUS_OUT, this.nickNameOut, this);
            this.registerEvent(this.btn_Choose, egret.TouchEvent.TOUCH_TAP, mediator.openUserPE, mediator);
            this.registerEvent(this.backClubBtn, egret.TouchEvent.TOUCH_TAP, mediator.openExitClub, mediator);
            this.registerEvent(this.btn_ChooseC, egret.TouchEvent.TOUCH_TAP, mediator.openClubPE, mediator);
            this.registerEvent(this.btnEditCode, egret.TouchEvent.TOUCH_TAP, mediator.openinvitNumE, mediator);
            this.registerEvent(this.inviteTxt, egret.TouchEvent.TOUCH_TAP, mediator.openinvitNumE, mediator);
            this.registerEvent(this.btn_BackUser, egret.TouchEvent.TOUCH_TAP, this.backUesr, this);
            this.registerEvent(this.btn_BackUser, mouse.MouseEvent.MOUSE_OVER, function () {
                _this.btn_BackUser.getChildByName("labelDisplay").textColor = 0xE9B76F;
                _this.btn_BackUser.getChildByName("imgBackU").source = _this.btnBackOver;
            }, this);
            this.registerEvent(this.btn_BackUser, mouse.MouseEvent.MOUSE_OUT, function () {
                _this.btn_BackUser.getChildByName("labelDisplay").textColor = 0xFF0000;
                _this.btn_BackUser.getChildByName("imgBackU").source = _this.btnBackOut;
            }, this);
            this.registerEvent(this.btn_Choose, egret.TouchEvent.TOUCH_BEGIN, this.tapBegin, this);
            this.registerEvent(this.backClubBtn, egret.TouchEvent.TOUCH_BEGIN, this.tapBegin, this);
            this.registerEvent(this.btnEditCode, egret.TouchEvent.TOUCH_BEGIN, this.tapBegin, this);
            this.registerEvent(this.btn_ChooseC, egret.TouchEvent.TOUCH_BEGIN, this.tapBegin, this);
        };
        /**失去焦点一瞬间点击按钮执行*/
        PCMineUI1.prototype.tapBegin = function (evt) {
            var _this = this;
            if (!this.isFocusOut)
                return;
            switch (evt.target) {
                case this.btn_Choose:
                case this.backClubBtn:
                case this.btnEditCode:
                case this.btn_ChooseC:
                    this.label_NickName.visible = false;
                    this.isSure = false;
                    setTimeout(function () {
                        _this.label_NickName.visible = true;
                        _this.editNick();
                    }, 500);
                    break;
            }
        };
        PCMineUI1.prototype.changeChooseC = function (flag) {
            if (flag) {
                this.btn_ChooseC.enabled = true;
                this.btn_ChooseC.setState = "up";
                this.btn_Choose.enabled = true;
                this.btn_Choose.setState = "up";
            }
            else {
                this.btn_ChooseC.enabled = false;
                this.btn_ChooseC.setState = "down";
                this.btn_Choose.enabled = false;
                this.btn_Choose.setState = "down";
            }
            this.btnEditCode.enabled = true;
            this.btnEditCode.setState = "up";
            this.backClubBtn.enabled = true;
            this.backClubBtn.setState = "up";
            this.backClubBtn.enabled = true;
            this.backClubBtn.setState = "up";
            this.label_Back.visible = true;
            this.label_Back2.visible = false;
            this.backImg1.source = this.btnUp;
            this.backImg2.source = this.btnUp;
        };
        PCMineUI1.prototype.changeEditBtn = function (flag) {
            if (flag) {
                this.btnEditCode.enabled = true;
                this.btnEditCode.setState = "up";
            }
            else {
                this.btnEditCode.enabled = false;
                this.btnEditCode.setState = "down";
            }
            this.btn_ChooseC.enabled = true;
            this.btn_ChooseC.setState = "up";
        };
        PCMineUI1.prototype.changeBack = function (flag) {
            this.backClubBtn.enabled = flag;
            this.backClubBtn.setState = flag ? "up" : "down";
            this.label_Back.visible = flag;
            this.label_Back2.visible = !flag;
            this.backImg1.source = flag ? this.btnUp : this.btnDown;
            this.backImg2.source = flag ? this.btnUp : this.btnDown;
            this.isOut = false;
            this.btn_Choose.enabled = true;
            this.btn_Choose.setState = "up";
        };
        //----------------------------基础信息------------------------------------
        /**
         * 当舞台尺寸发生变化
         */
        PCMineUI1.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
        };
        /*显示圆形头像*/
        PCMineUI1.prototype.showCirclePicture = function () {
            //显示圆形剪切图片的方法
            var c = new egret.Shape();
            c.graphics.beginFill(0);
            if (this.data == game.PCMineMediator.Type_Club) {
                c.graphics.drawCircle(0, 0, 97);
                c.x = 525 / 2;
                c.y = 215 / 2;
                this["headPicGroupC"].addChild(c);
                this["ClubHeadPic"].mask = c;
            }
            else {
                c.graphics.drawCircle(0, 0, 95);
                c.x = 525 / 2;
                c.y = 215 / 2;
                this.headPicGroup.addChild(c);
                this.UserHeadPic.mask = c;
            }
        };
        /**初始化和刷新数据数据*/
        PCMineUI1.prototype.initShowData = function (type) {
            switch (type) {
                case game.PCMineMediator.Type_Club:
                    this["headPicGroupC"].visible = true;
                    this["headPicGroup"].visible = false;
                    this.btn_ChooseC.visible = true;
                    this.btn_Choose.visible = false;
                    this.label_Accountnum.visible = false;
                    this.label_ID.visible = false;
                    this["uesrBackGroup"].visible = false;
                    this["clubInvitGroup"].visible = true;
                    this.tipGroup.y = 500;
                    this["nickGroup"].y = 442;
                    this["btn_BackUser"].visible = false;
                    this["labelTop"].text = "global_btn_edit";
                    this.label_NickName2.text = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
                    this.updateAll();
                    break;
                case game.PCMineMediator.Type_User:
                    this["headPicGroupC"].visible = false;
                    this["headPicGroup"].visible = true;
                    this.btn_ChooseC.visible = false;
                    this.btn_Choose.visible = true;
                    this.label_Accountnum.visible = true;
                    this.label_ID.visible = true;
                    this["uesrBackGroup"].visible = true;
                    this["clubInvitGroup"].visible = false;
                    this.tipGroup.y = 554;
                    this["nickGroup"].y = 493;
                    this["btn_BackUser"].visible = true;
                    this["labelTop"].text = game.LanguageUtil.translate("mine_lbl_user_info");
                    if (game.PersonalInfoModel.getInstance().avatar) {
                        this.UserHeadPic.source = game.PersonalInfoModel.getInstance().avatar;
                    }
                    if (game.PersonalInfoModel.getInstance().username) {
                        this.label_Accountnum.text = game.LanguageUtil.translate("mine_lbl_ccount_number") + game.PersonalInfoModel.getInstance().username;
                    }
                    this.label_NickName2.text = game.PersonalInfoModel.getInstance().nick;
                    this.setJoinedClubNum();
                    this.label_ID.text = "ID:" + game.PersonalInfoModel.getInstance().user_id;
                    break;
            }
        };
        PCMineUI1.prototype.setJoinedClubNum = function () {
            this.label_Back.text = game.LanguageUtil.translate("global_lbl_have_joined") + ":" + game.ClubModel.getInstance().getJoinedClubNum();
            this.label_Back2.text = game.LanguageUtil.translate("global_lbl_have_joined") + ":" + game.ClubModel.getInstance().getJoinedClubNum();
        };
        /**退出俱乐部*/
        PCMineUI1.prototype.backClub = function () {
            // MediatorManager.openMediator(Mediators.Mediator_ClubHome);
        };
        /**退出账号提示*/
        PCMineUI1.prototype.backUesr = function () {
            var tipData = new game.TipMsgInfo();
            tipData.msg = [{ text: game.LanguageUtil.translate("personal_lbl_lobby_login_warning_logout"), textColor: enums.ColorConst.Golden }];
            tipData.cancelText = "global_btn_cancel_text";
            tipData.confirmText = "global_btn_ok_text";
            tipData.cancelCallBack = this.canCelCloseRoomCallBack;
            tipData.comfirmCallBack = this.closeRoomCallBack;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        /** 取消关闭房间确定回调 */
        PCMineUI1.prototype.canCelCloseRoomCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 关闭房间确定回调 */
        PCMineUI1.prototype.closeRoomCallBack = function () {
            game.LoginController.getInstance().logOut();
            game.MediatorManager.closeAllMediator();
            game.MediatorManager.openMediator(game.Mediators.Mediator_Login);
        };
        /**关闭当前页面*/
        // protected closeMine():void{
        //     MediatorManager.closeMediator(Mediators.Mediator_PCMineMediator.name);
        // }
        //--------------------------------编辑昵称------------------------------------
        /**点击按钮输入框获得焦点*/
        PCMineUI1.prototype.editNick = function () {
            this.nickNameGroup.visible = false;
            this.label_NickName.visible = true;
            this.label_NickName.textDisplay.size = 20;
            this.label_NickName.textDisplay.textColor = 0x000000;
            this.label_NickName.textDisplay.fontFamily = eui.ALabel.defaultFont;
            this.label_NickName.textDisplay.textAlign = egret.HorizontalAlign.CENTER;
            this.label_NickName.textDisplay.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.label_NickName.text = this.label_NickName2.text;
            this.label_NickName.textDisplay.setFocus();
            this.label_NickName["focusState"] = true;
            this.editBtn.visible = false;
            this.editSureBtn.visible = true;
            this.imgBG.alpha = 1;
            this.isFocusOut = false;
        };
        /**输入框失去焦点*/
        PCMineUI1.prototype.nickNameOut = function () {
            // this.nickNameGroup.visible = true;
            // this.label_NickName2.text = this.label_NickName.text;
            // this.label_NickName.visible = false;
            // this.imgBG.alpha = 0.3;
            this.isFocusOut = true;
            this.isSure = true;
            this.sendRequest(this.label_NickName.text);
        };
        /**确定*/
        PCMineUI1.prototype.sureFun = function () {
        };
        /** 输入框响应事件 */
        PCMineUI1.prototype.onInput = function (event) {
            var txt = this.label_NickName.text;
            var maxLen = this.data == game.PCMineMediator.Type_Club ? 20 : 12;
            var len = game.LanguageUtil.translate("personal_lbl_nick_head_length") + "20" + game.LanguageUtil.translate("personal_lbl_nick_format_unit") + game.LanguageUtil.translate("personal_lbl_nick_format_end");
            var tips = this.data == game.PCMineMediator.Type_Club ? len : "personal_lbl_wrong_nick_length";
            if (game.StringUtil.getStrLen(txt) > maxLen) {
                this.tipError(tips);
                this.label_NickName.text = game.StringUtil.sliceByLen(txt, maxLen);
            }
            var tst = /\s/;
            if (tst.test(txt)) {
                this.data == game.PCMineMediator.Type_Club ? this.tipError("俱乐部名称不能有空格") : this.tipError("昵称不能有空格");
            }
        };
        /** 提示输入错误 */
        PCMineUI1.prototype.tipError = function (msg) {
            var _this = this;
            this.tipGroup.alpha = 1;
            this.tipGroup.visible = true;
            if (msg == "编辑成功") {
                this.tipGroup.visible = false;
                this.editBtn.visible = true;
                this.editSureBtn.visible = false;
                this.nickNameGroup.visible = true;
                this.label_NickName2.text = this.label_NickName.text;
                this.label_NickName.visible = false;
                this.imgBG.alpha = 0.3;
            }
            else {
                setTimeout(function () {
                    if (_this.isSure) {
                        _this.editNick();
                    }
                }, 100);
                this.errorLabel.visible = true;
                this["greenLabell"].visible = false;
                this.errorLabel.text = game.LanguageUtil.translate(msg);
            }
            game.CTween.removeTweens(this.tipGroup);
            game.CTween.get(this.tipGroup).wait(1500).to({ alpha: 0 }, 1500).call(function () {
                _this.tipGroup.visible = false;
            }, this);
        };
        /** 发送改名请求 */
        PCMineUI1.prototype.sendRequest = function (txt) {
            var _this = this;
            switch (this.data) {
                case game.PCMineMediator.Type_Club:
                    game.ClubController.getInstance().editClub(game.GlobalConfig.clubId + "", txt).then(function () {
                        // MediatorManager.closeMediator(Mediators.Mediator_PCMineMediator.name);
                        _this.tipError("编辑成功");
                    }).catch(function (errCode) {
                        var len = game.LanguageUtil.translate("global_lbl_club"); //俱乐部
                        var tips = "修改俱乐部信息失败";
                        switch (errCode) {
                            case "name_length":
                                tips = len + game.LanguageUtil.translate("home_lbl_name_length");
                                break;
                            case "name_empty":
                            case "param_empty":
                                tips = len + game.LanguageUtil.translate("home_lbl_name_empty");
                                break;
                            case "name_character":
                                break;
                            case "name_illegal":
                                tips = len + game.LanguageUtil.translate("home_lbl_name_illegal");
                                break;
                            case "name_exists":
                                tips = "home_lbl_name_exists";
                                break;
                            case "max_time_length":
                                tips = "邀请码有效时间过长";
                                break;
                            case "max_players_length":
                                tips = "邀请码有效人数过多";
                                break;
                        }
                        _this.label_NickName2.text = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
                        _this.tipError(tips);
                    });
                    break;
                case game.PCMineMediator.Type_User:
                    game.PersonalInfoController.getInstance().updatePlayerInfo(txt).then(function () {
                        // MediatorManager.closeMediator(Mediators.Mediator_PCMineMediator.name);
                        _this.tipError("编辑成功");
                    }).catch(function (errorCode) {
                        var tips = "personal_lbl_update_failed";
                        switch (errorCode) {
                            case "update_failed":
                                tips = "personal_lbl_update_failed";
                                break;
                            case "param_empty":
                                tips = "personal_lbl_nick_empty";
                                break;
                            case "nick_exists":
                                tips = "personal_lbl_nick_exists";
                                break;
                            case "wrong_nick_character":
                            case "nick_empty":
                                tips = "personal_lbl_wrong_nick_character";
                                break;
                            case "wrong_nick_length":
                                var maxLen = game.LanguageUtil.translate("personal_lbl_nick_head_length") + "12" + game.LanguageUtil.translate("personal_lbl_nick_format_unit") + game.LanguageUtil.translate("personal_lbl_nick_format_end");
                                ;
                                tips = maxLen;
                                break;
                            case "nick_illegal":
                                tips = "\u975E\u6CD5\u7684\u6635\u79F0";
                                break;
                        }
                        _this.label_NickName2.text = game.PersonalInfoModel.getInstance().nick;
                        _this.tipError(tips);
                    });
                    break;
            }
        };
        //----------------编辑俱乐部相关------------------------
        /** 刷新全部*/
        PCMineUI1.prototype.updateAll = function () {
            var clubInfo = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId);
            this.updateClubName(clubInfo.name);
            this.updateInvitation(clubInfo.invitation_code);
            this.updateInviteTime(clubInfo.expire_time, clubInfo.start_time);
            this.updateInviteNum(clubInfo.max_players, clubInfo.joined_players);
            this.updateCreateTime(clubInfo.create_time);
            var url = clubInfo.img;
            if (url)
                this.setClubIcon(url);
        };
        /** 刷新俱乐部名*/
        PCMineUI1.prototype.updateClubName = function (name) {
            this.label_NickName2.text = name;
        };
        /**刷新创建时间*/
        PCMineUI1.prototype.updateCreateTime = function (create_time) {
            var createT = game.TimeUtil.getFormatBySecond(create_time, 6);
            var createShow = createT.slice(0, 4) + "/" + createT.slice(5, 7) + "/" + createT.slice(8, 10);
            this["foundClubDay"].text = game.LanguageUtil.translate("club_lbl_create_time") + createShow;
        };
        /** 刷新俱乐部邀请码*/
        PCMineUI1.prototype.updateInvitation = function (invit) {
            this["clubCode"].text = invit;
        };
        /** 刷新俱乐部有效时间*/
        PCMineUI1.prototype.updateInviteTime = function (expireTime, startTime) {
            if (expireTime && startTime) {
                var now = Date.now();
                var t = expireTime - startTime;
                var t2 = expireTime - now;
                this["validDate"].text = Math.round(t2 / (1000 * 60 * 60 * 24)) + "d / " + Math.ceil(t / (1000 * 60 * 60 * 24)) + "d";
            }
            else {
                this["validDate"].text = "founder_lbl_none_limit";
            }
        };
        /** 刷新俱乐部有效人数*/
        PCMineUI1.prototype.updateInviteNum = function (maxPlayer, usedPlayer) {
            if (maxPlayer && !isNaN(usedPlayer)) {
                this["validTimes"].text = (maxPlayer - usedPlayer) + " / " + maxPlayer;
            }
            else {
                this["validTimes"].text = "founder_lbl_none_limit";
            }
        };
        /** 设置clubIcon */
        PCMineUI1.prototype.setClubIcon = function (url) {
            var _this = this;
            var ip = game.GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            var fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                _this["ClubHeadPic"].source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        //-------------------dispose----------------------
        PCMineUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.CTween.removeTweens(this.tipGroup);
        };
        return PCMineUI1;
    }(game.BaseUI));
    game.PCMineUI1 = PCMineUI1;
    __reflect(PCMineUI1.prototype, "game.PCMineUI1");
})(game || (game = {}));
//# sourceMappingURL=PCMineUI1.js.map