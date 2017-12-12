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
    var HomeBaseUI = (function (_super) {
        __extends(HomeBaseUI, _super);
        function HomeBaseUI() {
            var _this = _super.call(this) || this;
            /** group动画数组，用来dispose时*/
            _this.groupArr = [];
            _this.skinName = game.SystemPath.skin_path + "home/homeSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        HomeBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.myClubInfo.visible = false;
            this.joinedClubInfo.visible = false;
            this.clubIcon.mask = this.iconMask;
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        HomeBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case HomeUICommands.initListener:
                    this.initListener(params);
                    break;
                case HomeUICommands.showAvatar:
                    this.showAvatar();
                    break;
                case HomeUICommands.showNickName:
                    this.showNickName(params);
                    break;
                case HomeUICommands.setCardLabel:
                    this.setCardLabel(params);
                    break;
                case HomeUICommands.showClub:
                    this.showClub(params);
                    break;
                case HomeUICommands.lockedShowOrHide:
                    this.lockedShowOrHide(params);
                    break;
                case HomeUICommands.updateRooms:
                    this.updateRooms(params);
                    break;
                case HomeUICommands.updateOnlinePlayer:
                    this.updateOnlinePlayer(params);
                    break;
                case HomeUICommands.updateRecentClub:
                    this.updateRecentClub(params);
                    break;
                case HomeUICommands.updateClubGameType:
                    this.updateClubGameType(params);
                    break;
                case HomeUICommands.updateClubChips:
                    this.chipMoney.text = game.NumberUtil.getSplitNumStr(params);
                    break;
                case HomeUICommands.showLoginErrTip:
                    this.showInvitationTip(params);
                    break;
                case HomeUICommands.setClubData:
                    this.setClubData(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        HomeBaseUI.prototype.initListener = function (mediator) {
            var _this = this;
            this.registerEvent(this.joinBtn, egret.TouchEvent.TOUCH_TAP, this.showJoinGroup, this);
            this.registerEvent(this.creatBtn, egret.TouchEvent.TOUCH_TAP, this.showCreateGroup, this);
            this.registerEvent(this.joinCancelBtn, egret.TouchEvent.TOUCH_TAP, function () {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                _this.showJoinGroup(null);
            }, this);
            this.registerEvent(this.createCancelBtn, egret.TouchEvent.TOUCH_TAP, function () {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                _this.showCreateGroup(null);
            }, this);
            this.registerEvent(this.cardBtn, egret.TouchEvent.TOUCH_TAP, this.moreCard, this);
            this.registerEvent(this.createConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.createClub, this);
            this.registerEvent(this.joinConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.joinClub, this);
            this.registerEvent(this.clubDecoration, egret.TouchEvent.TOUCH_TAP, mediator.openClub, mediator);
            this.registerEvent(this.clubIcon, egret.TouchEvent.TOUCH_TAP, mediator.openClub, mediator);
            this.registerEvent(this.lockGroup, egret.TouchEvent.TOUCH_TAP, mediator.openClub, mediator);
        };
        /** 加入一个俱乐部 */
        HomeBaseUI.prototype.joinClub = function () {
            var _this = this;
            this.joinConfirmBtn.enabled = false;
            this.joinConfirmBtn.setState = 'disabled';
            var txt = this.joinInput.text;
            var exp = /\d{8}/;
            if (!exp.test(txt)) {
                var msg = game.LanguageUtil.translate("login_lbl_invitation_code_error_tips");
                this.showJoinError(msg);
            }
            else {
                game.ClubController.getInstance().joinClub(txt).then(function (obj) {
                    if (obj.locked) {
                        var tipData = new game.TipMsgInfo();
                        tipData.msg = [{ text: '抱歉您在"' + obj.name + '"的权限已被锁定 \n 请联系房主', textColor: enums.ColorConst.Golden }];
                        tipData.confirmText = "我知道了";
                        tipData.comfirmCallBack = function () {
                            game.MediatorManager.closeMediator(game.Mediators.Mediator_Home.name);
                            game.MediatorManager.openMediator(game.Mediators.Mediator_Home);
                        };
                        tipData.thisObj = _this;
                        game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    }
                    else {
                        _this.onJoinSuccess(obj.id);
                    }
                }).catch(function (e) {
                    var msg = game.LanguageUtil.translate("login_lbl_invitation_code_error_tips");
                    if (e == "owner_join") {
                        msg = game.LanguageUtil.translate("home_lbl_invitaion_owner_join");
                    }
                    else if (e == "invitation_code_unavailable") {
                        msg = game.LanguageUtil.translate("login_lbl_invitation_code_error_tips");
                    }
                    else {
                        var js = JSON.parse(e);
                        if (js.message == "repeat_join")
                            msg = game.LanguageUtil.translate("home_lbl_invitaion_repeat_join");
                    }
                    _this.showJoinError(msg);
                });
            }
        };
        /** 创建一个俱乐部 */
        HomeBaseUI.prototype.createClub = function () {
            var _this = this;
            this.createConfirmBtn.enabled = false;
            this.createConfirmBtn.setState = 'disabled';
            game.ClubController.getInstance().createClub(this.createInput.text.trim()).then(function () {
                _this.onCreateSuccess(_this.createInput.text.trim());
            }).catch(function (errorCode) {
                var msg = "";
                switch (errorCode) {
                    case "name_length":
                        msg = "home_lbl_name_length";
                        break;
                    case "name_empty":
                        msg = "home_lbl_name_empty";
                        break;
                    case "name_character":
                        msg = "home_lbl_name_character";
                        break;
                    case "name_illegal":
                        msg = "home_lbl_name_illegal";
                        break;
                    case "name_exists":
                        msg = "home_lbl_name_exists";
                        break;
                }
                _this.showCreateError(game.LanguageUtil.translate(msg));
            });
        };
        /** 创建俱乐部成功回调
         * @param clubName {string} 俱乐部名称
         */
        HomeBaseUI.prototype.onCreateSuccess = function (clubName) {
            var _this = this;
            var createdClubNum = (game.ClubModel.getInstance().getCreatedClubNum() + 1) || 1;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, createdClubNum).then(function () {
                var clubInfo = game.ClubModel.getInstance().getCreatedClubByName(clubName);
                _this.showCreateGroup(null);
                var tipData = new game.TipMsgInfo();
                tipData.msg = [
                    { text: game.LanguageUtil.rePlaceLanguage("home_lbl_create_club", "%s", _this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text.trim(), textColor: enums.ColorConst.LightGray }
                ];
                if (clubInfo) {
                    tipData.confirmText = game.LanguageUtil.translate("club_lbl_manage");
                    tipData.thisObj = _this;
                    tipData.comfirmCallBack = function () {
                        game.GlobalConfig.clubId = clubInfo.id;
                        game.MediatorManager.openMediator(game.Mediators.Mediator_HomeOwnerClub, game.Mediators.Mediator_Home);
                    };
                }
                else {
                    tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                    tipData.thisObj = null;
                    tipData.comfirmCallBack = null;
                }
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
            }).catch(function () {
                _this.showCreateGroup(null);
                var tipData = new game.TipMsgInfo();
                tipData.msg = [
                    { text: game.LanguageUtil.rePlaceLanguage("home_lbl_create_club", "%s", _this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text.trim(), textColor: enums.ColorConst.LightGray }
                ];
                tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                tipData.thisObj = null;
                tipData.comfirmCallBack = null;
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
            });
        };
        /** 加入俱乐部成功回调
         * @param clubId {number} 所加入俱乐部的ID
         */
        HomeBaseUI.prototype.onJoinSuccess = function (clubId) {
            var _this = this;
            var joinedClubNum = (game.ClubModel.getInstance().getJoinedClubNum() + 1) || 1;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Joined, joinedClubNum).then(function () {
                var clubInfo = game.ClubModel.getInstance().getJoinedClubById(+clubId);
                if (clubId) {
                    _this.showJoinGroup(null);
                    var creatorName = clubInfo.creator_name;
                    var clubName = clubInfo.name;
                    var tipData = new game.TipMsgInfo();
                    var txt = game.LanguageUtil.rePlaceLanguage("home_lbl_join_club", "%s", creatorName);
                    tipData.msg = [
                        { text: game.LanguageUtil.rePlaceLanguage(txt, "%s", clubName), textColor: enums.ColorConst.Golden }
                        // { text: creatorName, textColor: enums.ColorConst.LightGray },
                        // { text: LanguageUtil.translate("home_lbl_join_club"), textColor: enums.ColorConst.Golden },
                        // { text: clubName, textColor: enums.ColorConst.LightGray }
                    ];
                    tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                    tipData.comfirmCallBack = function () {
                        game.GlobalConfig.setClubId(clubId)
                            .then(function () {
                            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubGames, game.Mediators.Mediator_Home);
                        }).catch(function (e) {
                            game.DebugUtil.debug(e.message + "订阅俱乐部失败");
                        });
                    };
                    tipData.thisObj = _this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                }
                else {
                    game.DebugUtil.debug("获取俱乐部信息失败");
                }
            }).catch(function () {
                var msg = game.LanguageUtil.translate("login_lbl_invitation_code_error_tips");
                _this.showJoinError(msg);
            });
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 显示玩家头像 */
        HomeBaseUI.prototype.showAvatar = function () { };
        /** 设置头像圆形遮罩 */
        HomeBaseUI.prototype.setAvatarMask = function () { };
        /** 显示玩家昵称 */
        HomeBaseUI.prototype.showNickName = function (name) { };
        /** 设置房卡数量 */
        HomeBaseUI.prototype.setCardLabel = function (n) {
            if (n === void 0) { n = 0; }
        };
        /** 更多房卡 */
        HomeBaseUI.prototype.moreCard = function (event) {
        };
        /** 显示最近三个俱乐部 */
        HomeBaseUI.prototype.updateRecentClub = function (arr) { };
        /** 是否显示锁 */
        HomeBaseUI.prototype.lockedShowOrHide = function (b) {
            this.lockGroup.visible = b;
        };
        /** 显示首页今日投注数据*/
        HomeBaseUI.prototype.setClubData = function (data) { };
        /** 显示房间数 */
        HomeBaseUI.prototype.updateRooms = function (str) {
            if (this.roomNum)
                this.roomNum.text = str;
            if (this.myClubRoomNum)
                this.myClubRoomNum.text = str;
        };
        /** 显示在线人数 */
        HomeBaseUI.prototype.updateOnlinePlayer = function (str) {
            if (this.myClubOnlinePlayer)
                this.myClubOnlinePlayer.text = str;
        };
        /** 显示邀请码登录提示*/
        HomeBaseUI.prototype.showInvitationTip = function (params) {
            var _this = this;
            switch (params.code) {
                case 200:
                    /** 直接进入俱乐部*/
                    if (params.club) {
                        game.GlobalConfig.setClubId(params.club.id).then(function () {
                            if (game.GlobalConfig.isMobile) {
                                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubGames, game.Mediators.Mediator_Home);
                            }
                            else {
                                _this.enterJoinedClub();
                            }
                        }).catch(function (e) {
                            game.DebugUtil.debug("进入俱乐部失败" + e);
                        });
                    }
                    break;
                case 400:
                    switch (params.message) {
                        case "owner_join":
                            if (params.club) {
                                /** 通知UI 加入已加入的俱乐部*/
                                this.showTipGroup(this.loginJoinTip, this.loginJoinTipLabel, game.LanguageUtil.translate("home_lbl_invitaion_repeat_join"));
                                /** 进入俱乐部*/
                                game.GlobalConfig.setClubId(params.club.id).then(function () {
                                    if (game.GlobalConfig.isMobile) {
                                        game.MediatorManager.openMediator(game.Mediators.Mediator_ClubGames, game.Mediators.Mediator_Home);
                                    }
                                    else {
                                        _this.enterJoinedClub();
                                    }
                                }).catch(function (e) {
                                    game.DebugUtil.debug("进入俱乐部失败" + e);
                                });
                            }
                            else {
                                /** 通知UI 此俱乐部是您创建的*/
                                this.showTipGroup(this.loginJoinTip, this.loginJoinTipLabel, game.LanguageUtil.translate("home_lbl_invitaion_owner_join"));
                            }
                            break;
                        case "invitation_code_unavailable":
                            /** 通知UI 邀请码错误或已失效*/
                            this.showTipGroup(this.loginJoinTip, this.loginJoinTipLabel, game.LanguageUtil.translate("login_lbl_invitation_code_error_tips"));
                            break;
                        case "repeat_join":
                            /** 进入俱乐部*/
                            game.GlobalConfig.setClubId(params.club.id).then(function () {
                                if (game.GlobalConfig.isMobile) {
                                    game.MediatorManager.openMediator(game.Mediators.Mediator_ClubGames, game.Mediators.Mediator_Home);
                                }
                                else {
                                    _this.enterJoinedClub();
                                }
                            }).catch(function (e) {
                                game.DebugUtil.debug("进入俱乐部失败" + e);
                            });
                            this.showTipGroup(this.loginJoinTip, this.loginJoinTipLabel, game.LanguageUtil.translate("home_lbl_invitaion_repeat_join"));
                            break;
                    }
            }
        };
        HomeBaseUI.prototype.enterJoinedClub = function () {
            //是否进行过新手引导
            var guidedUser = localStorage.getItem("guidedUser");
            var name = game.LoginController.getInstance().sendingName;
            var guided = false;
            if (!guidedUser)
                guidedUser = "";
            if (guidedUser.length > 0) {
                var arr = guidedUser.split(":");
                if (arr.indexOf(name) > -1) {
                    guided = true;
                }
            }
            if (!guided) {
                var value = guidedUser;
                if (guidedUser.length > 0)
                    value += ":" + name;
                else
                    value += name;
                localStorage.setItem("guidedUser", value);
                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratGuide);
                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, null);
                return;
            }
            if (this.timeoutObj["enterJoinedClub"]) {
                clearTimeout(this.timeoutObj["enterJoinedClub"]);
            }
            this.timeoutObj["enterJoinedClub"] = setTimeout(function () {
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedRoomList);
                game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn);
            }, 200);
        };
        /** 显示俱乐部游戏类型 */
        HomeBaseUI.prototype.updateClubGameType = function (params) {
            var text = game.LanguageUtil.translate("global_lbl_no");
            var types = [];
            params.forEach(function (v) {
                switch (v.toLowerCase()) {
                    case "baccarat":
                        types.push(game.LanguageUtil.translate("global_lbl_baccarat"));
                        break;
                    case "roulette":
                        types.push(game.LanguageUtil.translate("founder_btn_search_type_rt"));
                        break;
                    case "sicbo":
                        types.push(game.LanguageUtil.translate("founder_btn_search_type_sibo"));
                        break;
                    case "dragontiger":
                        types.push(game.LanguageUtil.translate("founder_btn_search_type_dt"));
                        break;
                }
            });
            text = types.join(",") || text;
            this.gameType.text = text;
            this.myClubGameType.text = text;
        };
        /** 显示当前俱乐部信息 */
        HomeBaseUI.prototype.showClub = function (clubInfo) {
            if (clubInfo) {
                this.myClubInfo.visible = clubInfo.creator + "" == game.PersonalInfoModel.getInstance().user_id;
                this.joinedClubInfo.visible = !this.myClubInfo.visible;
                // info
                this.clubName.text = clubInfo.name || "";
                this.creator.text = clubInfo.creator_name || "";
                this.myClubTotalPlayer.text = game.NumberUtil.getSplitNumStr(clubInfo.users * 100 || 0);
                this.anchorNum.text = "0";
                this.roomNum.text = "0";
                this.myClubRoomNum.text = "0";
                this.myClubOnlinePlayer.text = "0";
                this.showProfit(clubInfo.id);
                this.myClubAnchor.text = "0";
                this.myClubCard.text = Math.abs(clubInfo.room_card_used | 0) + "";
                this.showTip(false);
            }
            else {
                this.showTip(true);
            }
        };
        /** 显示今日盈余*/
        HomeBaseUI.prototype.showProfit = function (id) {
            var _this = this;
            game.DataCenterController.getInstance().getTodayStatistics(id).then(function (data) {
                _this.myClubProfit.text = game.NumberUtil.getSplitNumStr(data.surplus, 3);
            }).catch(function (e) {
                game.DebugUtil.debug(e + "请求今日盈余失败");
            });
        };
        /** 有无俱乐部的显示切换*/
        HomeBaseUI.prototype.showTip = function (b) {
            this.tipLabel.visible = b;
            this.currentClub.visible = !b;
        };
        /** 设置clubIcon */
        HomeBaseUI.prototype.setClubIcon = function (url) { };
        /** 显示joingroup */
        HomeBaseUI.prototype.showJoinGroup = function (evt) { };
        /** 输入邀请码响应事件 */
        HomeBaseUI.prototype.onJoinInput = function () { };
        /** 显示joinError */
        HomeBaseUI.prototype.showJoinError = function (param) { };
        /** 显示创建group */
        HomeBaseUI.prototype.showCreateGroup = function (evt) { };
        /** 输入俱乐部名称响应事件 */
        HomeBaseUI.prototype.onCreateInput = function () { };
        /** 显示create错误 */
        HomeBaseUI.prototype.showCreateError = function (params) { };
        /** 显示一个红色提示*/
        HomeBaseUI.prototype.showTipGroup = function (group, label, txt) {
            label.text = "";
            label.text = txt;
            group.alpha = 1;
            group.visible = true;
            this.groupArr.push(group);
            game.CTweenManagerController.getInstance().startCTween(2, [group]);
            // CTween.get(group).wait(2500).to({
            //     alpha: 0
            // }, 500).call(() =>
            // {
            //     group.visible = false;
            //     group.alpha = 1;
            // 	label.text = "";
            //     CTween.removeTweens(group);
            // }, this);
        };
        // ---------------------------------- dispose ----------------------------------
        HomeBaseUI.prototype.dispose = function () {
            game.CTweenManagerController.getInstance().endAllCTween();
            // CTween.removeTweens(this.joinTipGroup);
            this.groupArr.forEach(function (element) {
                game.CTween.removeTweens(element);
            });
            this.showCreateGroup(null);
            this.showJoinGroup(null);
            _super.prototype.dispose.call(this);
        };
        return HomeBaseUI;
    }(game.BaseUI));
    game.HomeBaseUI = HomeBaseUI;
    __reflect(HomeBaseUI.prototype, "game.HomeBaseUI");
})(game || (game = {}));
//# sourceMappingURL=HomeBaseUI.js.map