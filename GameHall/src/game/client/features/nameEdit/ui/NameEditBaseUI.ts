module game {

    export class NameEditBaseUI extends BaseUI {

        public constructor(data) {
            super();
            this.data = data;
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        protected cancelLabel: eui.ALabel
        protected titleLabel: eui.ALabel
        protected confirmLabel: eui.ALabel

        protected inputLabel: eui.EditableText;
        protected deleteBtn: eui.AButton;

        protected tipGroup: eui.Group;
        protected errorLabel: eui.ALabel

        /**取消*/
        protected cancelBtn:eui.AButton;
        /**确定*/
        protected confirmBtn:eui.AButton;
        /**返回*/
        protected backBtn:eui.AButton;

        // ---------------------------------- 变量声明 ----------------------------------

        protected data: any;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.setTitle(this.data);
            this.tipGroup.alpha = 1;
            this.tipGroup.visible = false;
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: NameEditUICommands, params: any = null): void {
            switch (type) {
                case NameEditUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: NameEditMediator): void {
            // this.registerEvent(this.cancelLabel, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            // this.registerEvent(this.confirmLabel, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.backBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.deleteBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.inputLabel, egret.Event.CHANGE, this.onInput, this);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            switch (event.target) {
                case this.cancelBtn:
                case this.backBtn:
                    MediatorManager.closeMediator(Mediators.Mediator_NameEdit.name);
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
        }

        /** 输入框响应事件 */
        protected onInput(event: egret.Event): void {
            this.inputLabel.text = this.inputLabel.text.trim();
            let txt = this.inputLabel.text;
            switch (this.data) {
                case NameEditMediator.Type_Club:
                case NameEditMediator.Type_User:
                    let maxLen = this.data == NameEditMediator.Type_Club ? 20 : 12;
                    let tips = this.data == NameEditMediator.Type_Club ? "最多只能输入20个字符" : "最多只能输入12个字符";
                    if (StringUtil.getStrLen(txt) > maxLen) {
                        this.tipError(tips);
                        this.inputLabel.text = StringUtil.sliceByLen(txt, maxLen);
                    }
                    break;
            }
        }

        /** 发送改名请求 */
        protected sendRequest(txt: string): void {
            switch (this.data) {
                case NameEditMediator.Type_Club:
                    ClubController.getInstance().editClub(GlobalConfig.clubId + "", txt).then(() => {
                        MediatorManager.closeMediator(Mediators.Mediator_NameEdit.name);
                    }).catch((errCode) => {
                        let tips = "修改俱乐部信息失败";
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
                        this.tipError(tips);
                    });
                    break;
                case NameEditMediator.Type_User:
                    PersonalInfoController.getInstance().updatePlayerInfo(txt).then(() => {
                        MediatorManager.closeMediator(Mediators.Mediator_NameEdit.name);
                        // MediatorManager.openMediator(Mediators.Mediator_PersonalInformation);
                    }).catch((errorCode) => {
                        let tips = "修改用户信息失败";
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
                                let maxLen = this.data == NameEditMediator.Type_Club ? 20 : 12;
                                tips = `最多只能输入${maxLen}个字符`;
                                break;
                        }
                        this.tipError(tips);
                        this.inputLabel.text = PersonalInfoModel.getInstance().nick;
                    });
                    break;
            }
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 设置当前页的标题
         *  @param type {string} 修改俱乐部名称 - NameEditMediator.Type_Club | 修改用户昵称 - NameEditMediator.Type_User
         */
        protected setTitle(type: string): void {
            switch (type) {
                case NameEditMediator.Type_Club:
                    this.titleLabel.text = LanguageUtil.translate("更换名称");
                    this.inputLabel.text = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
                    break;
                case NameEditMediator.Type_User:
                    this.titleLabel.text = LanguageUtil.translate("更换昵称");
                    this.inputLabel.text = PersonalInfoModel.getInstance().nick;
                    break;
            }
        }

        /** 提示输入错误 */
        protected tipError(msg: string): void {
            this.errorLabel.text = LanguageUtil.translate(msg);
            // this.tipGroup.alpha = 1;
            // this.tipGroup.visible = true;
            // CTween.removeTweens(this.tipGroup);
            // CTween.get(this.tipGroup).wait(1500).to({ alpha: 0 }, 1500).call(() => {
            //     this.tipGroup.visible = false;
            // }, this);
            CTweenManagerController.getInstance().startCTween(2,[this.tipGroup]);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            CTween.removeTweens(this.tipGroup);
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }

    }

}