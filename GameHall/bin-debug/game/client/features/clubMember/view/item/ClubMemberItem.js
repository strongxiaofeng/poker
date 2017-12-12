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
    var ClubMemberItem = (function (_super) {
        __extends(ClubMemberItem, _super);
        function ClubMemberItem() {
            var _this = _super.call(this) || this;
            _this.exmlComplete = false;
            _this.skinName = game.SystemPath.skin_path + "clubMember/clubMemberItemSkin.exml";
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removeStage, _this);
            _this.onStage().then(function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
                _this.init();
                // this.txt_set_lock.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
                // this.txt_set_lock.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
                // this.txt_set_chips.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
                // this.txt_set_chips.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
                _this.txt_set_lock.addEventListener(mouse.MouseEvent.MOUSE_OVER, _this.mouseOver, _this);
                _this.txt_set_lock2.addEventListener(mouse.MouseEvent.MOUSE_OVER, _this.mouseOver, _this);
                _this.txt_set_chips.addEventListener(mouse.MouseEvent.MOUSE_OVER, _this.mouseOver, _this);
                _this.txt_set_lock.addEventListener(mouse.MouseEvent.MOUSE_OUT, _this.mouseOut, _this);
                _this.txt_set_lock2.addEventListener(mouse.MouseEvent.MOUSE_OUT, _this.mouseOut, _this);
                _this.txt_set_chips.addEventListener(mouse.MouseEvent.MOUSE_OUT, _this.mouseOut, _this);
            }).catch(function () {
            });
            return _this;
        }
        Object.defineProperty(ClubMemberItem.prototype, "avatar", {
            get: function () {
                return this._avatar;
            },
            set: function (url) {
                if (!url) {
                    return;
                }
                if (this._avatar == url) {
                    return;
                }
                this.setAvatarMask();
                this._avatar = url;
                var ip = game.GlobalConfig.defaultIP;
                if (ip[ip.length - 1] == '/') {
                    ip = ip.slice(0, ip.length - 1);
                }
                if (url[0] == '/') {
                    url = url.slice(1);
                }
                var fullUrl = "http:" + ip + "/" + url + ("?" + new Date().getTime());
                try {
                    com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                        this.img_head.source = data;
                    }, this, com.ResourceItem.TYPE_IMAGE);
                }
                catch (err) {
                    game.DebugUtil.debug("获取用户头像失败");
                }
            },
            enumerable: true,
            configurable: true
        });
        ClubMemberItem.prototype.removeStage = function () {
        };
        /**鼠标移入事件*/
        ClubMemberItem.prototype.mouseOver = function (e) {
            switch (e.currentTarget) {
                case this.txt_set_lock:
                    this.txt_set_lock.getChildByName("labelDisplay").textColor = 0xffe98e;
                    this.txt_set_lock.getChildByName("imgLock").source = "mine_btn_lockuser_h_pc_png";
                    break;
                case this.txt_set_lock2:
                    this.txt_set_lock2.getChildByName("labelDisplay").textColor = 0xffe98e;
                    this.txt_set_lock2.getChildByName("imgLock").source = "mine_btn_lockuser_h_pc_png";
                    break;
                case this.txt_set_chips:
                    this.txt_set_chips.getChildByName("labelDisplay").textColor = 0xffe98e;
                    this.txt_set_chips.getChildByName("imgChip").source = "mine_btn_distribution_h_pc_png";
                    break;
            }
        };
        /**鼠标移出事件*/
        ClubMemberItem.prototype.mouseOut = function (e) {
            switch (e.currentTarget) {
                case this.txt_set_lock:
                    this.txt_set_lock.getChildByName("labelDisplay").textColor = 0xe9b964;
                    this.txt_set_lock.getChildByName("imgLock").source = "mine_btn_lockuser_pc_png";
                    break;
                case this.txt_set_lock2:
                    this.txt_set_lock2.getChildByName("labelDisplay").textColor = 0xe9b964;
                    this.txt_set_lock2.getChildByName("imgLock").source = "mine_btn_lockuser_pc_png";
                    break;
                case this.txt_set_chips:
                    this.txt_set_chips.getChildByName("labelDisplay").textColor = 0xe9b964;
                    this.txt_set_chips.getChildByName("imgChip").source = "mine_btn_distribution_pc_png";
                    break;
            }
        };
        ClubMemberItem.prototype.onStage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.once(egret.Event.ADDED_TO_STAGE, resolve, _this);
            });
        };
        ClubMemberItem.prototype.dataChanged = function () {
            try {
                this.init();
            }
            catch (e) {
                // this.init();
            }
        };
        ClubMemberItem.prototype.init = function () {
            var _this = this;
            var data = game.PersonalInfoModel.getInstance().getPlayerInfoById(this.data.user_id);
            this.img_head_mask.visible = false;
            this.avatar = data.avatar;
            this.isLock = data.locked;
            this.txt_name.text = data.nick;
            var joinTime = game.TimeUtil.getFormatBySecond(data.join_time, 6).replace(/\-/g, "/");
            this.txt_join_time.text = joinTime;
            this.txt_acc.text = data.username;
            this.txt_date.text = game.TimeUtil.getFormatBySecond(data.last_login_time, 6).replace(/\-/g, "/");
            game.ClubController.getInstance().subscribeAccount(game.GlobalConfig.clubId, this.data.user_id, true).then(function () {
                var balance = game.ClubModel.getInstance().getPayerBalance(data.user_id);
                _this.txt_chips.text = game.NumberUtil.getSplitNumStr(balance);
            }).catch(function () {
                game.DebugUtil.debug("getPayerBalance failed");
            });
        };
        /** 设置头像圆形遮罩 */
        ClubMemberItem.prototype.setAvatarMask = function () {
            //显示圆形剪切图片的方法
            // let w = 200;
            // let avatarMask = new egret.Shape();
            // avatarMask.graphics.beginFill(0xff0000);
            // avatarMask.graphics.drawCircle(w / 2, w / 2, w / 2);
            // avatarMask.x = 5;
            // avatarMask.y = 5;
            // this.groupAvatar.addChild(avatarMask);
            // this.img_head.mask = avatarMask;
            this.img_head.mask = this.img_head_mask;
        };
        Object.defineProperty(ClubMemberItem.prototype, "isLock", {
            /**锁定玩家 */
            set: function (v) {
                this._isLock = v;
                if (game.GlobalConfig.isMobile) {
                    if (this.img_lockBgd) {
                        this.img_lockBgd.visible = this._isLock;
                    }
                    this.txt_set_lock3.text = this._isLock ? "founder_btn_unlock_remember" : "founder_btn_lock_remember";
                    this.img_lock.visible = this._isLock;
                    this.img_head_mask.alpha = this._isLock ? 0.3 : 1;
                    this.img_head.alpha = this._isLock ? 0.3 : 1;
                    this.txt_set_chips3.visible = !this._isLock;
                    this.txt_set_chips2.visible = this._isLock;
                }
                else {
                    if (this.img_lockBgd) {
                        this.img_lockBgd.visible = this._isLock;
                    }
                    this.txt_set_lock.visible = !this._isLock;
                    this.txt_set_lock2.visible = this._isLock;
                    this.img_lock.visible = this._isLock;
                    this.img_head_mask.alpha = this._isLock ? 0.3 : 1;
                    this.img_head.alpha = this._isLock ? 0.3 : 1;
                    this.txt_set_chips.enabled = !this._isLock;
                    this.txt_set_chips.setState = this._isLock ? "disabled" : "up";
                }
            },
            enumerable: true,
            configurable: true
        });
        ClubMemberItem.prototype.onTap = function (e) {
            switch (e.target) {
                case this.txt_set_lock:
                case this.txt_set_lock2:
                case this.txt_set_lock3:
                    this.lockUesr(this._isLock);
                    break;
                case this.txt_set_chips:
                case this.txt_set_chips3:
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_UserDetail, this.data.user_id);
                    break;
            }
        };
        /**锁定玩家的弹框*/
        ClubMemberItem.prototype.lockUesr = function (boo) {
            var userInfo = game.PersonalInfoModel.getInstance().getPlayerInfoById(this.data.user_id);
            var tipData = new game.TipMsgInfo();
            if (boo) {
                tipData.title = [
                    { text: game.LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.nick, textColor: enums.ColorConst.LightGray },
                    { text: "  " + game.LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.username, textColor: enums.ColorConst.LightGray }
                ];
                tipData.msg = [{ text: game.LanguageUtil.translate("founder_lbl_unlock_user_tips"), textColor: enums.ColorConst.Golden }];
                tipData.comfirmCallBack = this.closeRoomCallBack;
            }
            else {
                tipData.title = [
                    { text: game.LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.nick, textColor: enums.ColorConst.LightGray },
                    { text: "  " + game.LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
                    { text: userInfo.username, textColor: enums.ColorConst.LightGray }
                ];
                tipData.msg = [{ text: game.LanguageUtil.translate("founder_lbl_lock_user_tips"), textColor: enums.ColorConst.Golden }];
                tipData.comfirmCallBack = this.closeRoomCallBack;
            }
            tipData.cancelText = game.LanguageUtil.translate("global_btn_cancel_text");
            tipData.confirmText = game.LanguageUtil.translate("global_btn_ok_text");
            tipData.cancelCallBack = this.canCelCloseRoomCallBack;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        /**取消的回调*/
        ClubMemberItem.prototype.canCelCloseRoomCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /**确定的回调*/
        ClubMemberItem.prototype.closeRoomCallBack = function () {
            var _this = this;
            if (this._isLock) {
                game.ClubController.getInstance().unlockUser(game.GlobalConfig.clubId + "", this.data.user_id + "").then(function () {
                    _this.isLock = false;
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_UpdateUserList);
                    if (game.GlobalConfig.isMobile) {
                        _this.txt_set_chips3.visible = true;
                        _this.txt_set_chips2.visible = false;
                    }
                    else {
                        _this.txt_set_chips.enabled = true;
                        _this.txt_set_chips.setState = "up";
                    }
                }).catch(function () { });
            }
            else {
                game.ClubController.getInstance().lockUser(game.GlobalConfig.clubId + "", this.data.user_id + "").then(function () {
                    _this.isLock = true;
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_UpdateUserList);
                    if (game.GlobalConfig.isMobile) {
                        _this.txt_set_chips3.visible = false;
                        _this.txt_set_chips2.visible = true;
                    }
                    else {
                        _this.txt_set_chips.enabled = false;
                        _this.txt_set_chips.setState = "disabled";
                    }
                }).catch(function () { });
            }
        };
        return ClubMemberItem;
    }(eui.AItemRenderer));
    game.ClubMemberItem = ClubMemberItem;
    __reflect(ClubMemberItem.prototype, "game.ClubMemberItem");
})(game || (game = {}));
//# sourceMappingURL=ClubMemberItem.js.map