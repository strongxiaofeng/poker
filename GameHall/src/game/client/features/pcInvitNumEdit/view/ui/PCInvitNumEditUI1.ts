module game{
    export class PCInvitNumEditUI1 extends BaseUI
    {
        public constructor(){
            super();
            this.skinName = "resource/skins/game_skins/pc/invitNumEdit/invitNumEdit.exml";
        }
    /**有效时间输入框的背景*/
    protected imgDataBg:eui.Image;
    /**有效人数输入框的背景*/
    protected imgTimesBg:eui.Image;
    /**有效时间输入框*/
    protected inputDate:eui.EditableText;
    /**有效人数输入框*/
    protected inputTimes:eui.EditableText;

    protected effectiveDay:eui.ALabel;
    protected effectiveMan:eui.ALabel;
    protected descriptionLabel:eui.ALabel;
    /**取消*/
    protected btn_Cancel:eui.AButton;
    /**确认*/
    protected btn_Sure:eui.AButton;
    //----------------------------------初始化------------------------------------------------------
    /**初始化一些东西*/
    public initSetting():void{
        super.initSetting();
        this.initInputData();
    }

    //------------------------------------接收通知---------------------------------------------------
    /**收到miditor的通知*/
    public onMediatorCommand(type:PCMInvitNumEditCommands,params:any = null){
        switch (type) {
            case PCMInvitNumEditCommands.initListener:
                this.initListener(params);
                break;
        }
    }
    //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        protected initListener(mediator:PCInvitNumEditMediator):void{
            this.registerEvent(this.btn_Cancel,egret.TouchEvent.TOUCH_TAP,this.cancelFun,this);
            this.registerEvent(this.btn_Sure,egret.TouchEvent.TOUCH_TAP,this.sureFun,this);

            this.registerEvent(this.inputDate,egret.TouchEvent.FOCUS_IN,this.clickInputD,this);
            this.registerEvent(this.inputDate,egret.TouchEvent.FOCUS_OUT,this.textChangeD,this);
            this.registerEvent(this.inputDate,egret.Event.CHANGE,this.textChangeD,this);

            this.registerEvent(this.inputTimes,egret.TouchEvent.FOCUS_IN,this.clickInputT,this);
            this.registerEvent(this.inputTimes,egret.TouchEvent.FOCUS_OUT,this.textChangeT,this);
            this.registerEvent(this.inputTimes,egret.Event.CHANGE,this.textChangeT,this);
        }
        /**初始化输入框数据数据*/
        protected initInputData():void{
            this.imgDataBg.alpha = 0.3;
            this.imgTimesBg.alpha = 0.3;
            this.inputDate.textColor = 0xA29B8E;
            this.inputTimes.textColor = 0xA29B8E;
            this.inputDate.text = LanguageUtil.translate("founder_lbl_none_limit");
            this.inputTimes.text = LanguageUtil.translate("founder_lbl_none_limit");
            this.textD = "0";
            this.textT = "0";
            this.effectiveDay.text = LanguageUtil.translate("founder_lbl_valid_time") + LanguageUtil.translate("founder_lbl_unit_per_day");
            this.effectiveMan.text = LanguageUtil.translate("founder_lbl_valid_player_amount") + LanguageUtil.translate("founder_lbl_unit_per_body");
            let len=LanguageUtil.translate("founder_lbl_edit_club_descrp_content1")+LanguageUtil.translate("founder_lbl_edit_club_descrp_content2")+LanguageUtil.translate("founder_lbl_edit_club_descrp_content3");
            this.descriptionLabel.text = len;
        }
        /**输入框点击事件*/
        protected clickInputD():void{
			SoundPlayerNew.playEffect(SoundConst.click);
            this.imgDataBg.alpha = 0.6;
            this.inputDate.textColor = 0x000000;
            this.inputDate.text = "";
        }
        /**输入框点击事件*/
        protected clickInputT():void{
			SoundPlayerNew.playEffect(SoundConst.click);
            this.imgTimesBg.alpha = 0.6;
            this.inputTimes.textColor = 0x000000;
            this.inputTimes.text = "";
        }
        protected textD:string;
        protected textT:string;
        /**输入框变化事件*/
        protected textChangeD(evt: egret.Event): void {
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                if (!this.inputDate.text) {
                    this.inputDate.text = LanguageUtil.translate("founder_lbl_none_limit");
                    this.textD = "0";
                } else if (this.inputDate.text == "0") {
                    this.inputDate.text = "1";
                    this.textD = "1";
                } else {
                    let num = /[^\d]/;///^[0-9]*$/
                    if (!num.test(this.inputDate.text)) {
                        this.textD = this.inputDate.text;
                    } else {
                        this.inputDate.text = this.textD;
                    }
                }
                this.imgDataBg.alpha = 0.3;
                this.inputDate.textColor = 0xA29B8E;
            } else {
                let num = /[^\d]/;///^[0-9]*$/
                if (!num.test(this.inputDate.text)) {
                    this.textD = this.inputDate.text;
                } else {
                    this.inputDate.text = this.textD;
                }
            }
        }
        /**输入框变化事件*/
        protected textChangeT(evt: egret.Event): void {
            if (evt.type == egret.TouchEvent.FOCUS_OUT) {
                if (!this.inputTimes.text) {
                    this.inputTimes.text = LanguageUtil.translate("founder_lbl_none_limit");
                    this.textT = "0";
                } else if (this.inputTimes.text == "0") {
                    this.inputTimes.text = "1";
                    this.textT = "1";
                } else {
                    let num = /[^\d]/;///^[0-9]*$/
                    if (!num.test(this.inputTimes.text)) {
                        this.textT = this.inputTimes.text;
                    } else {
                        this.inputTimes.text = this.textT;
                    }
                }
                this.imgTimesBg.alpha = 0.3;
                this.inputTimes.textColor = 0xA29B8E;
            } else {
                let num = /[^\d]/;///^[0-9]*$/
                if (!num.test(this.inputTimes.text)) {
                    this.textT = this.inputTimes.text;
                } else {
                    this.inputTimes.text = this.textT;
                }
            }
        }
        /**取消*/
        protected cancelFun():void{
			SoundPlayerNew.playEffect(SoundConst.click);
            GameController.getInstance().sendNotification(NotifyConst.Notify_PC_CloseMenu,2);
        }
        /**确认提示*/
        protected sureFun():void{
			SoundPlayerNew.playEffect(SoundConst.click);
            let tipData = new TipMsgInfo();
            tipData.msg = [{ text: LanguageUtil.translate("founder_lbl_edit_club_tips"), textColor: enums.ColorConst.Golden }];
			tipData.cancelText = "global_btn_cancel_text";
			tipData.confirmText = "global_btn_ok_text";
            tipData.cancelCallBack = this.canCelCloseRoomCallBack;
            tipData.comfirmCallBack = this.closeRoomCallBack;
            tipData.thisObj = this;
            MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
        }
        /** 取消关闭房间确定回调 */
		public canCelCloseRoomCallBack() {
			MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
		}
        /** 关闭房间确定回调 */
		public closeRoomCallBack() {
            this.sendRequest();
		}
        // ---------------------------------- 发送数据 ----------------------------------
        /** 发送编辑后俱乐部数据 */
        protected sendRequest(): void {
            let maxTime: number = null;
            let maxPlayers: number = null;
            let time = Number.parseInt(this.textD);
            if (!isNaN(time)) maxTime = time;
            let player = Number.parseInt(this.textT);
            if (!isNaN(player)) maxPlayers = player;
            ClubController.getInstance().editClub(GlobalConfig.clubId + "", null, maxTime, maxPlayers).then(() => {
                GameController.getInstance().sendNotification(NotifyConst.Notify_PC_CloseMenu,2);
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
            });
        }
    }
}