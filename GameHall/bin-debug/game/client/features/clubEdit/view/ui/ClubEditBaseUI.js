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
    var ClubEditBaseUI = (function (_super) {
        __extends(ClubEditBaseUI, _super);
        function ClubEditBaseUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.skinName = "resource/skins/game_skins/mobile/clubEdit/clubEditSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        ClubEditBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initMask();
            // 设置皮肤组件可见状态
            // this.showEditPopUp(false);
            this.groupPopUp.visible = false;
            this.updateAll(this.data);
        };
        ClubEditBaseUI.prototype.initMask = function () {
            // horizontalCenter="0"  width="388" height="388" verticalCenter="-50"
            var w = 388;
            try {
                this.maskGroup = new eui.Group();
                this.iconMask = new egret.Shape();
                this.maskGroup.width = w;
                this.maskGroup.height = w;
                this.maskGroup.horizontalCenter = 0;
                this.maskGroup.verticalCenter = -50;
                this.maskGroup.addChild(this.iconMask);
                this.iconMask.graphics.beginFill(0xff0000);
                this.iconMask.graphics.drawCircle(w / 2, w / 2, w / 2);
                this.iconMask.x = 0;
                this.iconMask.y = 0;
                this.groupIcon.addChild(this.maskGroup);
                this.imgIcon.mask = this.iconMask;
            }
            catch (err) {
                game.DebugUtil.error("", err);
            }
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        ClubEditBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case ClubEditUICommands.initListener:
                    this.initListener(params);
                    break;
                case ClubEditUICommands.clubUpdateSuccess:
                    this.data = params;
                    this.updateAll(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        ClubEditBaseUI.prototype.initListener = function (mediator) {
            var _this = this;
            this.registerEvent(this.labelIcon, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnNext, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnRule, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnCancel, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnConfirm, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnEditName, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnEditName, egret.TouchEvent.TOUCH_BEGIN, this.editNameBegin, this);
            this.registerEvent(this.btnEditName, egret.TouchEvent.TOUCH_END, this.editNameEnd, this);
            this.registerEvent(this.btnEditName, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.editNameEnd, this);
            this.registerEvent(this.btnEditCode, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.inputDate, egret.Event.FOCUS_IN, function () {
                _this.imgDate.source = "mine_pic_add_input2_png";
            }, this);
            this.registerEvent(this.inputTimes, egret.Event.FOCUS_IN, function () {
                _this.imgTimes.source = "mine_pic_add_input2_png";
            }, this);
        };
        ClubEditBaseUI.prototype.editNameBegin = function () {
            this.clubNameBg.visible = true;
        };
        ClubEditBaseUI.prototype.editNameEnd = function () {
            this.clubNameBg.visible = false;
        };
        /** 点击事件 */
        ClubEditBaseUI.prototype.handleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.labelIcon:
                    // 打开编辑俱乐部图标界面
                    game.MediatorManager.openMediator(game.Mediators.Mediator_PictureEditor, game.PictureEditorMediator.Type_ClubPicture);
                    break;
                case this.btnNext:
                    this.groupGuide.visible = false;
                    this.groupEdit.visible = true;
                    this.btnNext.visible = false;
                    break;
                case this.btnRule:
                    this.groupEdit.visible = false;
                    this.groupGuide.visible = true;
                    this.btnNext.visible = true;
                    break;
                case this.btnCancel:
                    this.showEditPopUp(false);
                    break;
                case this.btnConfirm:
                    this.sureFun();
                    break;
                case this.btnEditName:
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NameEdit, game.NameEditMediator.Type_Club);
                    break;
                case this.btnEditCode:
                    this.showEditPopUp(true);
                    break;
            }
        };
        /**确认提示*/
        ClubEditBaseUI.prototype.sureFun = function () {
            var tipData = new game.TipMsgInfo();
            tipData.msg = [{ text: "编辑后将使之前的邀请码和链接失效。系统自\n动生成新的邀请码和链接。是否确认编辑？", textColor: enums.ColorConst.Golden }];
            tipData.cancelText = "取消";
            tipData.confirmText = "确定";
            tipData.cancelCallBack = this.cancelCallBack;
            tipData.comfirmCallBack = this.sendRequest;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        /** 取消关闭房间确定回调 */
        ClubEditBaseUI.prototype.cancelCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        // ---------------------------------- 发送数据 ----------------------------------
        /** 发送编辑后俱乐部数据 */
        ClubEditBaseUI.prototype.sendRequest = function () {
            var _this = this;
            var maxTime = null;
            var maxPlayers = null;
            if (this.inputDate.text == "0") {
                this.inputDate.text = "1";
            }
            else if (this.inputDate.text == "") {
                this.inputDate.text = "0";
            }
            if (this.inputTimes.text == "0") {
                this.inputTimes.text = "1";
            }
            else if (this.inputTimes.text == "") {
                this.inputTimes.text = "0";
            }
            var time = Number.parseInt(this.inputDate.text);
            if (!isNaN(time))
                maxTime = time;
            var player = Number.parseInt(this.inputTimes.text);
            if (!isNaN(player))
                maxPlayers = player;
            game.ClubController.getInstance().editClub(game.GlobalConfig.clubId + "", null, maxTime, maxPlayers).then(function () {
                _this.showEditPopUp(false);
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
                _this.showEditError(msg);
            });
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 刷新全部*/
        ClubEditBaseUI.prototype.updateAll = function (data) {
            var clubInfo = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId);
            this.updateClubName(clubInfo.name);
            this.updateInvitation(data.invitation_code);
            this.updateInviteTime(data.expire_time, data.start_time);
            this.updateInviteNum(data.max_players, data.joined_players);
            var url = clubInfo.img;
            if (url)
                this.setClubIcon(url);
            this.setCreateTime(clubInfo.create_time);
        };
        /** 创建时间 */
        ClubEditBaseUI.prototype.setCreateTime = function (time) {
            var txt = game.LanguageUtil.translate("创建于") + "：";
            var timeStr = game.TimeUtil.getFormatBySecond(time, 6).split("-").join("/");
            this.labelCreateTime.text = txt + timeStr;
        };
        /** 刷新俱乐部名*/
        ClubEditBaseUI.prototype.updateClubName = function (name) {
            this.clubName.text = name;
        };
        /** 刷新俱乐部邀请码*/
        ClubEditBaseUI.prototype.updateInvitation = function (invit) {
            this.clubCode.text = invit;
        };
        /** 刷新俱乐部有效时间*/
        ClubEditBaseUI.prototype.updateInviteTime = function (expireTime, startTime) {
            if (expireTime && startTime) {
                var now = Date.now();
                var t = expireTime - startTime;
                var t2 = expireTime - now;
                this.validDate.text = Math.round(t2 / (1000 * 60 * 60 * 24)) + "d / " + Math.ceil(t / (1000 * 60 * 60 * 24)) + "d";
            }
            else {
                this.validDate.text = "无限制";
            }
        };
        /** 刷新俱乐部有效人数*/
        ClubEditBaseUI.prototype.updateInviteNum = function (maxPlayer, usedPlayer) {
            if (maxPlayer && !isNaN(usedPlayer)) {
                this.validTimes.text = (maxPlayer - usedPlayer) + " / " + maxPlayer;
            }
            else {
                this.validTimes.text = "无限制";
            }
        };
        /** 设置clubIcon */
        ClubEditBaseUI.prototype.setClubIcon = function (url) {
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
                _this.imgIcon.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        /** 显示或隐藏编辑邀请码弹出层
         * @param show {boolean} true - 显示 | false - 隐藏
         */
        ClubEditBaseUI.prototype.showEditPopUp = function (show) {
            this.msgGroup.visible = false;
            this.msgGroup.alpha = 1;
            // this.groupPopUp.visible = show;
            game.CTweenManagerController.getInstance().startCTween(1, [this.groupPopUp, this.groopTxt], show);
            this.inputDate.text = "";
            this.inputTimes.text = "";
            if (show) {
                var needShowGuide = this.needShowGuide();
                if (needShowGuide) {
                    this.groupGuide.visible = true;
                    this.groupEdit.visible = false;
                    this.btnNext.visible = true;
                }
                else {
                    this.groupGuide.visible = false;
                    this.groupEdit.visible = true;
                    this.btnNext.visible = false;
                }
                this.setNeedShowGuide();
                game.LayerManager.getInstance().addUI(this.groupPopUp, enums.LayerConst.LAYER_TOP);
            }
            else {
                this.addChild(this.groupPopUp);
            }
        };
        /** 获取是否需要显示过弹窗 */
        ClubEditBaseUI.prototype.needShowGuide = function () {
            var userId = game.PersonalInfoModel.getInstance().user_id;
            var need = localStorage.getItem("editCode" + userId);
            return !(userId == need);
        };
        /** 已经显示过弹窗 */
        ClubEditBaseUI.prototype.setNeedShowGuide = function () {
            var userId = game.PersonalInfoModel.getInstance().user_id;
            localStorage.setItem("editCode" + userId, userId);
        };
        /** 显示编辑错误 */
        ClubEditBaseUI.prototype.showEditError = function (msg) {
            this.labelMsg.text = game.LanguageUtil.translate(msg);
            this.msgGroup.alpha = 1;
            this.msgGroup.visible = true;
            // CTween.get(this.msgGroup).wait(1500).to({
            //     alpha: 0
            // }, 1500).call(() => {
            //     this.msgGroup.visible = false;
            //     this.msgGroup.alpha = 1;
            //     this.labelMsg.text = "";
            // }, this);
            game.CTweenManagerController.getInstance().startCTween(2, [this.msgGroup]);
        };
        // ---------------------------------- dispose ----------------------------------
        ClubEditBaseUI.prototype.dispose = function () {
            this.showEditPopUp(false);
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return ClubEditBaseUI;
    }(game.BaseUI));
    game.ClubEditBaseUI = ClubEditBaseUI;
    __reflect(ClubEditBaseUI.prototype, "game.ClubEditBaseUI");
})(game || (game = {}));
//# sourceMappingURL=ClubEditBaseUI.js.map