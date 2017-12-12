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
    var PCHomeUI1 = (function (_super) {
        __extends(PCHomeUI1, _super);
        // ---------------------------------- 声明 ----------------------------------
        function PCHomeUI1() {
            var _this = _super.call(this) || this;
            _this.numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            return _this;
            // this.skinName = SystemPath.skin_path + "home/homeSkin.exml";
        }
        // ---------------------------------- 初始化 ----------------------------------
        PCHomeUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.showCirclerun();
            this.tipGroup.visible = false;
            this.currentClub.visible = false;
            this.lockGroup.visible = false;
            // this.clubIcon.mask = this.iconMask;
            this.showJoinGroup(null);
            this.showCreateGroup(null);
            // this.gameTypeLabel.text = LanguageUtil.translate("global_lbl_room_nums");
            // this.anchorNumLabel.text = LanguageUtil.translate("global_lbl_online_anchor");
            // this.roomNumLabel.text = LanguageUtil.translate("global_lbl_game_type");
        };
        /** 注册事件监听器 */
        PCHomeUI1.prototype.initListener = function (mediator) {
            _super.prototype.initListener.call(this, mediator);
            for (var i = 0; i < 3; i++) {
                this.registerEvent(this["createClub" + i], egret.TouchEvent.TOUCH_TAP, mediator.openCreatedClub, mediator);
                this.registerEvent(this["joinClub" + i], egret.TouchEvent.TOUCH_TAP, function (e) {
                    game.SoundPlayerNew.playEffect(game.SoundConst.click);
                    mediator.openJoinedClub.call(mediator, e.target.text);
                }, this);
            }
        };
        // ---------------------------------- 刷新 ----------------------------------
        /** 有无俱乐部的显示切换*/
        PCHomeUI1.prototype.showTip = function (b) {
            this.tipGroup.visible = b;
            this.currentClub.visible = !b;
            this.createdStatistics.visible = !b;
        };
        /** 显示最近三个俱乐部 */
        PCHomeUI1.prototype.updateRecentClub = function (arr) {
            if (arr[0].length == 0) {
                this.createClub0.text = "——";
            }
            else {
                for (var i = 0; i < 3; i++) {
                    this["createClub" + i].text = arr[0][i] || "";
                }
            }
            if (arr[1].length == 0) {
                this.joinClub0.text = "——";
            }
            else {
                for (var i = 0; i < 3; i++) {
                    this["joinClub" + i].text = arr[1][i] || "";
                }
            }
        };
        /** 显示首页今日投注数据*/
        PCHomeUI1.prototype.setClubData = function (data) {
            this.showJoinedStatistics(data.bet_total || 0, data.recharge_in_total || 0, data.recharge_out_total || 0);
        };
        /** 显示当前俱乐部信息 */
        PCHomeUI1.prototype.showClub = function (clubInfo) {
            _super.prototype.showClub.call(this, clubInfo);
            this.joinedStatistics.visible = false;
            if (clubInfo && clubInfo.img) {
                this.setClubIcon(clubInfo.img);
            }
        };
        /** 显示joingroup */
        PCHomeUI1.prototype.showJoinGroup = function (evt) {
            if (evt) {
                this.joinGroup.visible = true;
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.text = "";
                this.joinInput.addEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                game.LayerManager.getInstance().addUI(this.joinGroup, enums.LayerConst.LAYER_TOP);
            }
            else {
                this.joinGroup.visible = false;
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.removeEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                this.addChild(this.joinGroup);
            }
        };
        /** 显示创建group */
        PCHomeUI1.prototype.showCreateGroup = function (evt) {
            if (evt) {
                this.createGroup.visible = true;
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.text = "";
                this.createInput.addEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect();
                game.LayerManager.getInstance().addUI(this.createGroup, enums.LayerConst.LAYER_TOP);
            }
            else {
                this.createGroup.visible = false;
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.removeEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect(false);
                this.addChild(this.createGroup);
            }
        };
        /** 创建俱乐部成功回调
        * @param clubName {string} 俱乐部名称
        */
        PCHomeUI1.prototype.onCreateSuccess = function (clubName) {
            var _this = this;
            var createdClubNum = (game.ClubModel.getInstance().getCreatedClubNum() + 1) || 1;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, createdClubNum).then(function () {
                var clubInfo = game.ClubModel.getInstance().getCreatedClubByName(clubName);
                _this.showCreateGroup(null);
                var tipData = new game.TipMsgInfo();
                tipData.msg = [
                    { text: game.LanguageUtil.rePlaceLanguage("home_lbl_create_club", "%s", _this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text, textColor: enums.ColorConst.LightGray }
                ];
                if (clubInfo) {
                    tipData.confirmText = game.LanguageUtil.translate("club_lbl_manage");
                    tipData.thisObj = _this;
                    tipData.comfirmCallBack = function () {
                        game.GlobalConfig.setClubId(clubInfo.id)
                            .then(function () {
                            game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedRoomList);
                            game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, true);
                            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn);
                        }).catch();
                    };
                }
                else {
                    tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                    tipData.thisObj = null;
                    tipData.comfirmCallBack = null;
                }
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
            }).catch(function () {
            });
        };
        /** 加入俱乐部成功回调
        * @param clubId {number} 所加入俱乐部的ID
        */
        PCHomeUI1.prototype.onJoinSuccess = function (clubId) {
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
                        // { text: LanguageUtil.translate("home_lbl_join_club_1"), textColor: enums.ColorConst.Golden },
                        // { text: creatorName, textColor: enums.ColorConst.LightGray },
                        // { text: LanguageUtil.translate("home_lbl_join_club_2"), textColor: enums.ColorConst.Golden },
                        // { text: clubName, textColor: enums.ColorConst.LightGray }
                    ];
                    tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                    tipData.comfirmCallBack = function () {
                        game.GlobalConfig.setClubId(clubId)
                            .then(function () {
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
                                game.CommonLoadingUI.getInstance().start();
                                game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, null);
                                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratGuide);
                            }
                            else {
                                game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedRoomList);
                                game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn);
                            }
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
        /** 显示创建俱乐部动画效果 */
        PCHomeUI1.prototype.showCreateEffect = function (show) {
            var _this = this;
            if (show === void 0) { show = true; }
            if (show) {
                if (this.intervalObj["spinImg"]) {
                    clearInterval(this.intervalObj["spinImg"]);
                }
                this.intervalObj["spinImg"] = setInterval(function () {
                    _this.spinImg.rotation = (_this.spinImg.rotation + 3) % 360 - 180;
                }, 50);
                for (var i = 0; i < 9; i++) {
                    var img = this["shineImg" + i];
                    this.shineImg(img, true);
                }
            }
            else {
                if (this.intervalObj["spinImg"]) {
                    clearInterval(this.intervalObj["spinImg"]);
                }
                for (var i = 0; i < 9; i++) {
                    var img = this["shineImg" + i];
                    this.shineImg(img, false);
                }
            }
        };
        /** 星型图标动画 */
        PCHomeUI1.prototype.shineImg = function (img, show) {
            var _this = this;
            if (show === void 0) { show = true; }
            if (show) {
                var w = this.shineGroup.width;
                var h = this.shineGroup.height;
                img.scaleX = img.scaleY = Math.random() * 1 + 0.5;
                img.rotation = Math.random() * 360 - 180;
                img.x = Math.random() * w;
                img.y = h - Math.random() * Math.sin(img.x * Math.PI / w) * h;
                img.alpha = 0;
                game.CTween.removeTweens(img);
                game.CTween.get(img)
                    .wait(Math.random() * 800)
                    .to({ alpha: 1 }, 600)
                    .to({ alpha: 0 }, 400)
                    .call(function () {
                    _this.shineImg(img);
                }, this);
            }
            else {
                game.CTween.removeTweens(img);
            }
        };
        /** 输入邀请码响应事件 */
        PCHomeUI1.prototype.onJoinInput = function () {
            var txt = this.joinInput.text;
            if (this.checkNumIllegal(txt)) {
                this.joinInput.text = txt.slice(0, -1);
            }
            this.joinConfirmBtn.enabled = txt.length && txt.length > 0;
            this.joinConfirmBtn.setState = this.joinConfirmBtn.enabled ? 'up' : 'disabled';
        };
        /** 输入俱乐部名称响应事件 */
        PCHomeUI1.prototype.onCreateInput = function () {
            var txt = this.createInput.text.trim();
            this.createInput.text = txt;
            this.createConfirmBtn.enabled = txt.length && txt.length > 0;
            this.createConfirmBtn.setState = this.createConfirmBtn.enabled ? 'up' : 'disabled';
        };
        /** 显示joinError */
        PCHomeUI1.prototype.showJoinError = function (param) {
            var _this = this;
            this.joinTipLabel.text = "";
            this.joinTipLabel.text = param;
            this.joinTipGroup.alpha = 1;
            this.joinTipGroup.visible = true;
            game.CTween.get(this.joinTipGroup).wait(2500).to({
                alpha: 0
            }, 500).call(function () {
                _this.joinTipGroup.visible = false;
                _this.joinTipGroup.alpha = 1;
                _this.joinTipLabel.text = "";
            }, this);
        };
        /** 显示create错误 */
        PCHomeUI1.prototype.showCreateError = function (params) {
            var _this = this;
            this.createErrorMsg.text = game.LanguageUtil.translate(params);
            this.createTipGroup.alpha = 1;
            this.createTipGroup.visible = true;
            game.CTween.get(this.createTipGroup).wait(1500).to({
                alpha: 0
            }, 1500).call(function () {
                _this.createTipGroup.visible = false;
                _this.createTipGroup.alpha = 1;
                _this.createErrorMsg.text = "";
            }, this);
        };
        /** 输入其他字符*/
        PCHomeUI1.prototype.checkNumIllegal = function (str) {
            if (!str)
                return true;
            if (str == "")
                return true;
            str = str + "";
            for (var i = 0; i < str.length; i++) {
                if (this.numArr.indexOf(str.charAt(i)) < 0) {
                    //包含除数字之外的字符
                    return true;
                }
            }
            return false;
        };
        /** 按钮圈旋转*/
        PCHomeUI1.prototype.showCirclerun = function () {
            this.createBtn_circle.rotation = 0;
            this.joinBtn_circle.rotation = 0;
            game.CTween.get(this.createBtn_circle, { loop: true }).to({ rotation: -360 }, 4000);
            game.CTween.get(this.joinBtn_circle, { loop: true }).to({ rotation: 360 }, 4000);
        };
        // /** 刷新投注率和派彩率的线*/
        // private showCreatedStatistics(bet,pay):void
        // {
        // 	this.betBar.width = bet;
        // 	this.betALabel.text = bet+"%";
        // 	this.payoutBar.width = pay;
        // 	this.payoutALabel.text = pay+"%";
        // }
        /** 刷新投注数额和筹码转入转出
         * @param bet —— 今日投注数额
         * @param chipGet —— 今日筹码转入
         * @param chipOut —— 今日筹码转出
        */
        PCHomeUI1.prototype.showJoinedStatistics = function (bet, chipGet, chipOut) {
            this.betNum.text = game.NumberUtil.getSplitNumStr(bet, 3);
            this.chipGet.text = game.NumberUtil.getSplitNumStr(chipGet, 3);
            this.chipOut.text = game.NumberUtil.getSplitNumStr(chipOut, 3);
            this.showSTatistisc();
        };
        /** 显示统计文本位置*/
        PCHomeUI1.prototype.showSTatistisc = function () {
            var str1 = new eui.Label();
            str1.text = this.betNum.text;
            var str2 = new eui.Label();
            str2.text = this.chipGet.text;
            var str3 = new eui.Label();
            str3.text = this.chipOut.text;
            // this.betLabel.right = this.betNum.textWidth + 10;
            // this.chipGetLabel.right = this.chipGet.textWidth + 10;
            // this.chipOutLabel.right = this.chipOut.textWidth + 10;
            this.betLabel.text = game.LanguageUtil.translate("H5_home_lbl_betting_today");
            this.chipGetLabel.text = game.LanguageUtil.translate("H5_home_lbl_today_chips_into");
            this.chipOutLabel.text = game.LanguageUtil.translate("H5_home_lbl_today_chips_out");
            this.betLabel.right = str1.textWidth + 10;
            this.chipGetLabel.right = str2.textWidth + 10;
            this.chipOutLabel.right = str3.textWidth + 10;
        };
        /** 设置clubIcon */
        PCHomeUI1.prototype.setClubIcon = function (url) {
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
                _this.clubIcon.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        // ---------------------------------- dispose ----------------------------------
        PCHomeUI1.prototype.dispose = function () {
            game.CTween.removeTweens(this.createTipGroup);
            game.CTween.removeTweens(this.createBtn_circle);
            game.CTween.removeTweens(this.joinBtn_circle);
            _super.prototype.dispose.call(this);
        };
        return PCHomeUI1;
    }(game.HomeBaseUI));
    game.PCHomeUI1 = PCHomeUI1;
    __reflect(PCHomeUI1.prototype, "game.PCHomeUI1");
})(game || (game = {}));
//# sourceMappingURL=PCHomeUI1.js.map