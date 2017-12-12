module game{
    export class PersonalInformationBaseUI extends BaseUI
    {

        public constructor(){
            super();
        }
        //头像
        private btn_PictureEditor:eui.AButton;
        private img_ShowCircle:eui.Image;
        private group_ShowCircle:eui.Group;
        private group_MaxOut:eui.Group;
        //昵称
        private btn_NickName:eui.AButton;
        //用户名
        private label_NickName:eui.ALabel;
        //ID
        private btn_ID:eui.AButton;
        private label_ID:eui.ALabel;
        //退出俱乐部
        private btn_Back:eui.AButton;
        private label_Back:eui.ALabel;
        //退出账号
        private btn_BackUser:eui.AButton;

//----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        public initSetting():void{
            super.initSetting();
            this.showCirclePicture();
            this.initShowData();

        }
//------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        public onMediatorCommand(type:PersonalInformationCommands,params:any = null){
            switch (type) {
                case PersonalInformationCommands.initListener:
                    this.initListener(params);
                    break;
                case PersonalInformationCommands.updateTextrue:
                    //判断头像是不是默认
                    if(PersonalInfoModel.getInstance().avatar){
                        this.img_ShowCircle.source = PersonalInfoModel.getInstance().avatar;
                    }
                    if(PersonalInfoModel.getInstance().nick){
                        this.label_NickName.text = PersonalInfoModel.getInstance().nick;
                    }
                    break;
            }
        }
//------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        protected initListener(mediator:PersonalInformationMediator):void{
            this.registerEvent(this.btn_NickName,egret.TouchEvent.TOUCH_TAP,mediator.goModifyNicknameFun,mediator);
            this.registerEvent(this.btn_PictureEditor,egret.TouchEvent.TOUCH_TAP,mediator.goPictureEditorFun,mediator);
            this.registerEvent(this.btn_BackUser,egret.TouchEvent.TOUCH_TAP,this.backUesr,this);
            this.registerEvent(this.btn_Back,egret.TouchEvent.TOUCH_TAP,this.backClub,this);
        }
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
			c.graphics.drawCircle(0,0,65);
            c.x = 65;
            c.y = 65;
			this.group_ShowCircle.addChild(c);
			this.img_ShowCircle.mask = c;
        }
        /***/
        private initShowData():void{
            if(PersonalInfoModel.getInstance().avatar){
                        this.img_ShowCircle.source = PersonalInfoModel.getInstance().avatar;
                    }
            if(PersonalInfoModel.getInstance().nick){
                this.label_NickName.text = PersonalInfoModel.getInstance().nick;
            }
            this.label_ID.text = PersonalInfoModel.getInstance().user_id;
            this.label_Back.text = LanguageUtil.translate("global_lbl_have_joined") + ":"+ ClubModel.getInstance().getJoinedClubNum();
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
        /**退出俱乐部*/
        private backClub():void{
            MediatorManager.openMediator(Mediators.Mediator_ExitClub);
        }
    }
}