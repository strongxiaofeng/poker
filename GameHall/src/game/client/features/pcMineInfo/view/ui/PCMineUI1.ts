module game{
    export class PCMineUI1 extends BaseUI
    {
        public constructor(data){
            super();
            this.data = data;
            this.skinName = "resource/skins/game_skins/pc/my/mineSkin.exml";
        }
        protected data:any;
        //关闭当前页面
        // private closeMineBtn:eui.AButton;
        //账号
        private label_Accountnum:eui.ALabel;
        //ID
        private label_ID:eui.ALabel;
        //头像
        private UserHeadPic:eui.Image;
        //更换头像
        private btn_Choose:eui.AButton;

        private btn_ChooseC:eui.AButton;
        //头像框
        private headPicGroup:eui.Group;
        //用户昵称
        private label_NickName:eui.TextInput;
        //用户昵称遮罩
        private nickNameGroup:eui.Group;
        private label_NickName2:eui.ALabel;
        /**昵称背景图*/
        private imgBG:eui.Image;
        //编辑昵称
        private editBtn:eui.AButton;
        private editSureBtn:eui.AButton;
        /**编辑邀请码*/
        private btnEditCode:eui.AButton;
        private inviteTxt:eui.ALabel;
        //退出俱乐部
        private backClubBtn:eui.AButton;
        //移入移出效果
        private backImg1:eui.Image;
        private backImg2:eui.Image;
        //已加入的俱乐部
        private label_Back:eui.ALabel;
        private label_Back2:eui.ALabel;
        //提示相关
        private tipGroup:eui.Group;
        private errorLabel:eui.ALabel;
        /**退出当前账号*/
        private btn_BackUser:eui.AButton;
        //退出俱乐部效果资源
        private btnDown = "window_btn_into_p_pc_png";
        private btnUp = "window_btn_into_pc_png";
        private btnOver = "window_btn_into_h_pc_png";
        //退出账号效果资源
        private btnBackOver = "mine_btn_quitaccount_h_pc_png";
        private btnBackOut = "mine_btn_quitaccount_pc_png";
//----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        public initSetting():void{
            super.initSetting();
            this.showCirclePicture();
            this.initShowData(this.data);
            this.label_Back.visible = true;
            this.label_Back2.visible = false;
            this.tipGroup.alpha = 1;
            this.tipGroup.visible = false;

        }
//------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        public onMediatorCommand(type:PCMineCommands,params:any = null){
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
        }
//------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        protected initListener(mediator:PCMineMediator):void{
            // this.registerEvent(this.closeMineBtn,egret.TouchEvent.TOUCH_TAP,this.closeMine,this);
            this.registerEvent(this.backClubBtn,egret.TouchEvent.TOUCH_BEGIN,()=>{
                //相关效果
                this.label_Back.visible = false;
                this.label_Back2.visible = true;
                this.backImg1.source = this.btnDown;
                this.backImg2.source = this.btnDown;
            },this);
            this.registerEvent(this.backClubBtn, mouse.MouseEvent.MOUSE_OVER,()=>{
                this.backImg1.source = this.btnOver;
                this.backImg2.source = this.btnOver;
                this.isOut = true;
            }, this);
            this.registerEvent(this.backClubBtn, mouse.MouseEvent.MOUSE_OUT,()=>{
                if(this.isOut){
                    this.backImg1.source = this.btnUp;
                    this.backImg2.source = this.btnUp;
                }
            }, this);
            this.registerEvent(this.editSureBtn,egret.TouchEvent.TOUCH_TAP,this.sureFun,this);
            this.registerEvent(this.editBtn,egret.TouchEvent.TOUCH_TAP,this.editNick,this);
            this.registerEvent(this.label_NickName, egret.Event.CHANGE, this.onInput, this);
            this.registerEvent(this.label_NickName, egret.Event.FOCUS_OUT, this.nickNameOut, this);
            this.registerEvent(this.btn_Choose, egret.TouchEvent.TOUCH_TAP, mediator.openUserPE, mediator);
            this.registerEvent(this.backClubBtn,egret.TouchEvent.TOUCH_TAP,mediator.openExitClub,mediator);
            this.registerEvent(this.btn_ChooseC, egret.TouchEvent.TOUCH_TAP, mediator.openClubPE, mediator);
            this.registerEvent(this.btnEditCode, egret.TouchEvent.TOUCH_TAP, mediator.openinvitNumE, mediator);
            this.registerEvent(this.inviteTxt, egret.TouchEvent.TOUCH_TAP, mediator.openinvitNumE, mediator)
            this.registerEvent(this.btn_BackUser,egret.TouchEvent.TOUCH_TAP,this.backUesr,this);
            this.registerEvent(this.btn_BackUser, mouse.MouseEvent.MOUSE_OVER,()=>{
                (this.btn_BackUser.getChildByName("labelDisplay") as eui.Label).textColor = 0xE9B76F;
                (this.btn_BackUser.getChildByName("imgBackU") as eui.Image).source = this.btnBackOver;
            }, this);
            this.registerEvent(this.btn_BackUser, mouse.MouseEvent.MOUSE_OUT,()=>{
                (this.btn_BackUser.getChildByName("labelDisplay") as eui.Label).textColor = 0xFF0000;
                (this.btn_BackUser.getChildByName("imgBackU") as eui.Image).source = this.btnBackOut;
            }, this);
            this.registerEvent(this.btn_Choose, egret.TouchEvent.TOUCH_BEGIN, this.tapBegin, this);
            this.registerEvent(this.backClubBtn, egret.TouchEvent.TOUCH_BEGIN, this.tapBegin, this);
            this.registerEvent(this.btnEditCode, egret.TouchEvent.TOUCH_BEGIN, this.tapBegin, this);
            this.registerEvent(this.btn_ChooseC, egret.TouchEvent.TOUCH_BEGIN, this.tapBegin, this);
        }
        /**失去焦点一瞬间点击确认按钮*/
        protected isSure:boolean = true;
        /**失去焦点一瞬间点击按钮执行*/
        protected tapBegin(evt:egret.TouchEvent):void{
            if(!this.isFocusOut) return;
            switch(evt.target){
                case this.btn_Choose:
                case this.backClubBtn:
                case this.btnEditCode:
                case this.btn_ChooseC:
                    this.label_NickName.visible = false;
                    this.isSure = false;
                    setTimeout(()=>{
                        this.label_NickName.visible = true;
                        this.editNick();
                    },500);
                    break;
            }
        }
        private changeChooseC(flag:boolean):void
        {
            if(flag)
            {
                this.btn_ChooseC.enabled = true;
                this.btn_ChooseC.setState = "up";
                this.btn_Choose.enabled = true;
                this.btn_Choose.setState = "up";
            }
            else
            {
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
        }

        private changeEditBtn(flag:boolean):void
        {
            if(flag)
            {
                this.btnEditCode.enabled = true;
                this.btnEditCode.setState = "up";
            }
            else
            {
                this.btnEditCode.enabled = false;
                this.btnEditCode.setState = "down";
            }
            this.btn_ChooseC.enabled = true;
            this.btn_ChooseC.setState = "up";
        }
        private isOut:boolean = true;
        private changeBack(flag:boolean):void{
            this.backClubBtn.enabled = flag;
            this.backClubBtn.setState = flag ? "up" : "down";
            this.label_Back.visible = flag;
            this.label_Back2.visible = !flag;
            this.backImg1.source = flag ? this.btnUp : this.btnDown;
            this.backImg2.source = flag ? this.btnUp : this.btnDown;
            this.isOut = false;
            this.btn_Choose.enabled = true;
            this.btn_Choose.setState = "up";
        }
        //----------------------------基础信息------------------------------------
        /**
         * 当舞台尺寸发生变化
         */
        public onStageResize(evt: egret.Event): void {
            super.onStageResize(evt);
        }
        /*显示圆形头像*/
        private showCirclePicture():void{
            //显示圆形剪切图片的方法
			let c:egret.Shape = new egret.Shape();
			c.graphics.beginFill(0);
            if(this.data == PCMineMediator.Type_Club){
                c.graphics.drawCircle(0,0,97);
                c.x = 525/2;
                c.y = 215/2;
                this["headPicGroupC"].addChild(c);
                this["ClubHeadPic"].mask = c;
            }else{
                c.graphics.drawCircle(0,0,95);
                c.x = 525/2;
                c.y = 215/2;
                this.headPicGroup.addChild(c);
                this.UserHeadPic.mask = c;
            }
        }
        /**初始化和刷新数据数据*/
        protected initShowData(type: string): void {
            switch (type) {
                case PCMineMediator.Type_Club:
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
                    this.label_NickName2.text = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
                    this.updateAll();
                    break;
                case PCMineMediator.Type_User:
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

                    this["labelTop"].text = LanguageUtil.translate("mine_lbl_user_info");
                    if(PersonalInfoModel.getInstance().avatar){
                        this.UserHeadPic.source = PersonalInfoModel.getInstance().avatar;
                    }
                    if(PersonalInfoModel.getInstance().username){
                        this.label_Accountnum.text = LanguageUtil.translate("mine_lbl_ccount_number") + PersonalInfoModel.getInstance().username;
                    }
                    this.label_NickName2.text = PersonalInfoModel.getInstance().nick;
                    this.setJoinedClubNum();
                    this.label_ID.text =  "ID:" + PersonalInfoModel.getInstance().user_id;
                    break;
            }
        }

        protected setJoinedClubNum(): void {
            this.label_Back.text = LanguageUtil.translate("global_lbl_have_joined") + ":" + ClubModel.getInstance().getJoinedClubNum();
            this.label_Back2.text = LanguageUtil.translate("global_lbl_have_joined") + ":" + ClubModel.getInstance().getJoinedClubNum();
        }

        /**退出俱乐部*/
        private backClub():void{
            // MediatorManager.openMediator(Mediators.Mediator_ClubHome);
        }
        /**退出账号提示*/
        private backUesr():void{
            let tipData = new TipMsgInfo();
            tipData.msg = [{ text: LanguageUtil.translate("personal_lbl_lobby_login_warning_logout"), textColor: enums.ColorConst.Golden }];
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
            LoginController.getInstance().logOut();
            MediatorManager.closeAllMediator();
			MediatorManager.openMediator(Mediators.Mediator_Login);
		}
        /**关闭当前页面*/
        // protected closeMine():void{
        //     MediatorManager.closeMediator(Mediators.Mediator_PCMineMediator.name);
        // }
        //--------------------------------编辑昵称------------------------------------
        /**点击按钮输入框获得焦点*/
        protected editNick():void{
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
        }
        /**是否失去焦点*/
        protected isFocusOut:boolean = false;
        /**输入框失去焦点*/
        protected nickNameOut():void{
            // this.nickNameGroup.visible = true;
            // this.label_NickName2.text = this.label_NickName.text;
            // this.label_NickName.visible = false;
            // this.imgBG.alpha = 0.3;
            this.isFocusOut = true;
            this.isSure = true;
            this.sendRequest(this.label_NickName.text);
        }
        /**确定*/
        protected sureFun():void{
        }
        /** 输入框响应事件 */
        protected onInput(event: egret.Event): void {
            let txt = this.label_NickName.text;
            let maxLen = this.data == PCMineMediator.Type_Club ? 20 : 12;
            let len = LanguageUtil.translate("personal_lbl_nick_head_length") + "20" + LanguageUtil.translate("personal_lbl_nick_format_unit") + LanguageUtil.translate("personal_lbl_nick_format_end");
            let tips = this.data == PCMineMediator.Type_Club ? len : "personal_lbl_wrong_nick_length";
            if (StringUtil.getStrLen(txt) > maxLen) {
                this.tipError(tips);
                this.label_NickName.text = StringUtil.sliceByLen(txt, maxLen);
            }
            let tst = /\s/;
            if(tst.test(txt)){
                this.data == PCMineMediator.Type_Club ? this.tipError("俱乐部名称不能有空格") : this.tipError("昵称不能有空格");
            }
        }
        /** 提示输入错误 */
        protected tipError(msg: string): void {
            this.tipGroup.alpha = 1;
            this.tipGroup.visible = true;
            if(msg == "编辑成功"){
                this.tipGroup.visible = false;
                this.editBtn.visible = true;
                this.editSureBtn.visible = false;

                this.nickNameGroup.visible = true;
                this.label_NickName2.text = this.label_NickName.text;
                this.label_NickName.visible = false;
                this.imgBG.alpha = 0.3;
            }else{
                setTimeout(()=>{
                    if(this.isSure){
                        this.editNick();
                    }
                },100)
                this.errorLabel.visible = true;
                this["greenLabell"].visible = false;
                this.errorLabel.text = LanguageUtil.translate(msg);
            }
            CTween.removeTweens(this.tipGroup);
            CTween.get(this.tipGroup).wait(1500).to({ alpha: 0 }, 1500).call(() => {
                this.tipGroup.visible = false;
            }, this);
        }
        /** 发送改名请求 */
        protected sendRequest(txt:string): void {
            switch (this.data) {
                case PCMineMediator.Type_Club:
                    ClubController.getInstance().editClub(GlobalConfig.clubId + "", txt).then(() => {
                        // MediatorManager.closeMediator(Mediators.Mediator_PCMineMediator.name);
                        this.tipError("编辑成功");
                    }).catch((errCode) => {
                        let len = LanguageUtil.translate("global_lbl_club");//俱乐部
                        let tips = "修改俱乐部信息失败";
                        switch (errCode) {
                            case "name_length":
                                tips = len + LanguageUtil.translate("home_lbl_name_length");
                                break;
                            case "name_empty":
                            case "param_empty":
                                tips = len + LanguageUtil.translate("home_lbl_name_empty");
                                break;
                            case "name_character":
                                break;
                            case "name_illegal":
                                tips = len + LanguageUtil.translate("home_lbl_name_illegal");
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
                        this.label_NickName2.text = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId).name;
                        this.tipError(tips);
                    });
                    break;
                case PCMineMediator.Type_User:
                    PersonalInfoController.getInstance().updatePlayerInfo(txt).then(() => {
                        // MediatorManager.closeMediator(Mediators.Mediator_PCMineMediator.name);
                        this.tipError("编辑成功");
                    }).catch((errorCode) => {
                        let tips = "personal_lbl_update_failed";
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
                                let maxLen = LanguageUtil.translate("personal_lbl_nick_head_length") + "12" + LanguageUtil.translate("personal_lbl_nick_format_unit") + LanguageUtil.translate("personal_lbl_nick_format_end");;
                                tips = maxLen;
                                break;
                            case "nick_illegal":
                                tips = `非法的昵称`;
                                break;
                        }
                        this.label_NickName2.text = PersonalInfoModel.getInstance().nick;
                        this.tipError(tips);
                    });
                    break;
            }

        }
        //----------------编辑俱乐部相关------------------------
        /** 刷新全部*/
        protected updateAll(): void {
            let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
            this.updateClubName(clubInfo.name);
            this.updateInvitation(clubInfo.invitation_code);
            this.updateInviteTime(clubInfo.expire_time, clubInfo.start_time);
            this.updateInviteNum(clubInfo.max_players, clubInfo.joined_players);
            this.updateCreateTime(clubInfo.create_time)
            let url = clubInfo.img;
            if (url) this.setClubIcon(url);
        }
        /** 刷新俱乐部名*/
        protected updateClubName(name: string): void {
            this.label_NickName2.text = name;
        }
        /**刷新创建时间*/
        protected updateCreateTime(create_time:number):void{
            let createT = game.TimeUtil.getFormatBySecond(create_time,6);
            let createShow= createT.slice(0,4) + "/" + createT.slice(5,7) + "/" + createT.slice(8,10);
            this["foundClubDay"].text = LanguageUtil.translate("club_lbl_create_time") + createShow;
        }

        /** 刷新俱乐部邀请码*/
        protected updateInvitation(invit: string): void {
            this["clubCode"].text = invit;
        }

        /** 刷新俱乐部有效时间*/
        protected updateInviteTime(expireTime: number, startTime: number): void {
            if (expireTime && startTime) {
                let now = Date.now();
                let t = expireTime - startTime;
                let t2 =  expireTime - now;
                this["validDate"].text = Math.round(t2 / (1000 * 60 * 60 * 24)) + "d / " + Math.ceil(t / (1000 * 60 * 60 * 24)) + "d";
            }
            else {
                this["validDate"].text = "founder_lbl_none_limit";
            }
        }

        /** 刷新俱乐部有效人数*/
        protected updateInviteNum(maxPlayer: number, usedPlayer: number): void {
            if (maxPlayer && !isNaN(usedPlayer)) {
                this["validTimes"].text = (maxPlayer - usedPlayer) + " / " + maxPlayer;
            }
            else {
                this["validTimes"].text = "founder_lbl_none_limit";
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
                this["ClubHeadPic"].source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        }



        //-------------------dispose----------------------
        public dispose(): void {
            super.dispose();
            CTween.removeTweens(this.tipGroup);
        }
    }
}