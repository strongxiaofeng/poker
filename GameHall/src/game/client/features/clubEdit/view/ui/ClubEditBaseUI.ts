module game {

    export class ClubEditBaseUI extends BaseUI {

        public constructor(data) {
            super();
            this.data = data;
            this.skinName = "resource/skins/game_skins/mobile/clubEdit/clubEditSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 头像group */
        protected groupIcon: eui.Group;
        /** 头像 */
        protected imgIcon: eui.Image;
        /** 头像说明 */
        protected labelIcon: eui.AButton;
        /** 俱乐部名称 */
        protected clubName: eui.ALabel;
        protected clubNameBg: eui.Image;
        /** 俱乐部邀请码 */
        protected clubCode: eui.ALabel;
        /** 有效时间 */
        protected validDate: eui.ALabel;
        /** 有效人数 */
        protected validTimes: eui.ALabel;

        /** 编辑邀请码弹出层group */
        protected groupPopUp: eui.Group;
        protected groopTxt: eui.Group;
        /** 邀请码编辑说明 */
        protected groupGuide: eui.Group;
        /** 继续按钮 */
        protected btnNext: eui.AButton;
        /** 编辑邀请码group */
        protected groupEdit: eui.Group;
        /** 打开编辑说明Btn */
        protected btnRule: eui.AButton;
        /** 取消按钮 */
        protected btnCancel: eui.AButton;
        /** 确认按钮 */
        protected btnConfirm: eui.AButton;
        /** 有效时间输入框 */
        protected inputDate: eui.EditableText;
        protected imgDate: eui.Image;
        /** 有效人数输入框 */
        protected inputTimes: eui.EditableText;
        protected imgTimes: eui.Image;

        /** 编辑俱乐部名称按钮 */
        protected btnEditName: eui.AButton;
        /** 编辑俱乐部邀请码按钮 */
        protected btnEditCode: eui.AButton;

        /** 创建时间 */
        protected labelCreateTime: eui.ALabel;

        protected msgGroup: eui.Group;
        protected labelMsg: eui.ALabel;

        // ---------------------------------- 变量声明 ----------------------------------

        protected data: ClubEditInfo;
        /** 头像遮罩 */
        protected iconMask: egret.Shape;
        /** 头像遮罩group */
        protected maskGroup: eui.Group;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.initMask();
            // 设置皮肤组件可见状态
            // this.showEditPopUp(false);
            this.groupPopUp.visible = false;
            this.updateAll(this.data);
        }

        protected initMask(): void {
            // horizontalCenter="0"  width="388" height="388" verticalCenter="-50"
            let w = 388;
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
            } catch (err) {
                DebugUtil.error("", err);
            }
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: ClubEditUICommands, params: any = null): void {
            switch (type) {
                case ClubEditUICommands.initListener:
                    this.initListener(params);
                    break;
                case ClubEditUICommands.clubUpdateSuccess:
                    this.data = params;
                    this.updateAll(params);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: ClubEditMediator): void {
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
            this.registerEvent(this.inputDate, egret.Event.FOCUS_IN, () => {
                this.imgDate.source = "mine_pic_add_input2_png";
            }, this);
            this.registerEvent(this.inputTimes, egret.Event.FOCUS_IN, () => {
                this.imgTimes.source = "mine_pic_add_input2_png";
            }, this);
        }

        private editNameBegin(): void {
            this.clubNameBg.visible = true;
        }

        private editNameEnd(): void {
            this.clubNameBg.visible = false;
        }

        /** 点击事件 */
        protected handleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            switch (event.target) {
                case this.labelIcon:
                    // 打开编辑俱乐部图标界面
                    MediatorManager.openMediator(Mediators.Mediator_PictureEditor, PictureEditorMediator.Type_ClubPicture);
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
                    MediatorManager.openMediator(Mediators.Mediator_NameEdit, NameEditMediator.Type_Club);
                    break;
                case this.btnEditCode:
                    this.showEditPopUp(true);
                    break;
            }
        }

        /**确认提示*/
        protected sureFun(): void {
            let tipData = new TipMsgInfo();
            tipData.msg = [{ text: "编辑后将使之前的邀请码和链接失效。系统自\n动生成新的邀请码和链接。是否确认编辑？", textColor: enums.ColorConst.Golden }];
            tipData.cancelText = "取消";
            tipData.confirmText = "确定";
            tipData.cancelCallBack = this.cancelCallBack;
            tipData.comfirmCallBack = this.sendRequest;
            tipData.thisObj = this;
            MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
        }

        /** 取消关闭房间确定回调 */
        public cancelCallBack() {
            MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
        }

        // ---------------------------------- 发送数据 ----------------------------------

        /** 发送编辑后俱乐部数据 */
        protected sendRequest(): void {
            let maxTime: number = null;
            let maxPlayers: number = null;
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
            let time = Number.parseInt(this.inputDate.text);
            if (!isNaN(time)) maxTime = time;
            let player = Number.parseInt(this.inputTimes.text);
            if (!isNaN(player)) maxPlayers = player;
            ClubController.getInstance().editClub(GlobalConfig.clubId + "", null, maxTime, maxPlayers).then(() => {
                this.showEditPopUp(false);
            }).catch((errorCode) => {
                let msg = "编辑失败";
                switch (errorCode) {
                    case "max_time_length":
                        msg = "有效时间设置过长";
                        break;
                    case "max_players_length":
                        msg = "有效人数过多";
                        break;
                }
                this.showEditError(msg);
            });
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 刷新全部*/
        protected updateAll(data: ClubEditInfo): void {
            let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
            this.updateClubName(clubInfo.name);
            this.updateInvitation(data.invitation_code);
            this.updateInviteTime(data.expire_time, data.start_time);
            this.updateInviteNum(data.max_players, data.joined_players);
            let url = clubInfo.img;
            if (url) this.setClubIcon(url);
            this.setCreateTime(clubInfo.create_time);
        }

        /** 创建时间 */
        protected setCreateTime(time: number): void {
            let txt = LanguageUtil.translate("创建于") + "：";
            let timeStr = TimeUtil.getFormatBySecond(time, 6).split("-").join("/");
            this.labelCreateTime.text = txt + timeStr;
        }

        /** 刷新俱乐部名*/
        protected updateClubName(name: string): void {
            this.clubName.text = name;
        }

        /** 刷新俱乐部邀请码*/
        protected updateInvitation(invit: string): void {
            this.clubCode.text = invit;
        }

        /** 刷新俱乐部有效时间*/
        protected updateInviteTime(expireTime: number, startTime: number): void {
            if (expireTime && startTime) {
                let now = Date.now();
                let t = expireTime - startTime;
                let t2 = expireTime - now;
                this.validDate.text = Math.round(t2 / (1000 * 60 * 60 * 24)) + "d / " + Math.ceil(t / (1000 * 60 * 60 * 24)) + "d";
            }
            else {
                this.validDate.text = "无限制";
            }
        }

        /** 刷新俱乐部有效人数*/
        protected updateInviteNum(maxPlayer: number, usedPlayer: number): void {
            if (maxPlayer && !isNaN(usedPlayer)) {
                this.validTimes.text = (maxPlayer - usedPlayer) + " / " + maxPlayer;
            }
            else {
                this.validTimes.text = "无限制";
            }
        }

        /** 设置clubIcon */
        protected setClubIcon(url: string): void {
            let ip = GlobalConfig.defaultIP
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            let fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, (data) => {
                this.imgIcon.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        }

        /** 显示或隐藏编辑邀请码弹出层
         * @param show {boolean} true - 显示 | false - 隐藏
         */
        protected showEditPopUp(show: boolean): void {
            this.msgGroup.visible = false;
            this.msgGroup.alpha = 1;
            // this.groupPopUp.visible = show;
            CTweenManagerController.getInstance().startCTween(1,[this.groupPopUp,this.groopTxt],show)
            this.inputDate.text = "";
            this.inputTimes.text = "";
            if (show) {
                let needShowGuide = this.needShowGuide();
                if (needShowGuide) {
                    this.groupGuide.visible = true;
                    this.groupEdit.visible = false;
                    this.btnNext.visible = true;
                } else {
                    this.groupGuide.visible = false;
                    this.groupEdit.visible = true;
                    this.btnNext.visible = false;
                }
                this.setNeedShowGuide();
                LayerManager.getInstance().addUI(this.groupPopUp, enums.LayerConst.LAYER_TOP);
            } else {
                this.addChild(this.groupPopUp);
            }
        }

        /** 获取是否需要显示过弹窗 */
        protected needShowGuide(): boolean {
            let userId = PersonalInfoModel.getInstance().user_id;
            let need = localStorage.getItem("editCode" + userId);
            return !(userId == need);
        }

        /** 已经显示过弹窗 */
        protected setNeedShowGuide(): void {
            let userId = PersonalInfoModel.getInstance().user_id;
            localStorage.setItem("editCode" + userId, userId);
        }

        /** 显示编辑错误 */
        protected showEditError(msg: string): void {
            this.labelMsg.text = LanguageUtil.translate(msg);
            this.msgGroup.alpha = 1;
            this.msgGroup.visible = true;
            // CTween.get(this.msgGroup).wait(1500).to({
            //     alpha: 0
            // }, 1500).call(() => {
            //     this.msgGroup.visible = false;
            //     this.msgGroup.alpha = 1;
            //     this.labelMsg.text = "";
            // }, this);
            CTweenManagerController.getInstance().startCTween(2,[this.msgGroup]);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            this.showEditPopUp(false);
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }

    }
}