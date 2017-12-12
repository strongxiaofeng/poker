module game
{
    export class MineBaseUI extends BaseUI
    {

        public constructor()
        {
            super();
        }
        //个人信息
        private btn_PersonalCenter: eui.AButton;
        //我是房主
        private btn_RoomMaster: eui.AButton;
        //消息公告
        private btn_InfoNotice: eui.AButton;
        //系统设置
        private btn_Setting: eui.AButton;
        //头像
        private group_Picture: eui.Group;
        private img_HeadPicture: eui.Image;
        private label_NickName: eui.ALabel;
        private label_Accountnum: eui.ALabel;
        private label_ID: eui.ALabel;
        //有无房主
        private btn_InfoNotice2: eui.AButton;
        private btn_Setting2: eui.AButton;
        private img_Info: eui.Image;
        private img_Info2: eui.Image;
        private label_InfoNum: eui.ALabel;
        private label_InfoNum2: eui.ALabel;
        private img_last: eui.Image;
        /**版本信息*/
        private label_version:eui.ALabel;
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        public initSetting(): void
        {
            super.initSetting();
            this.initShowData();
            this.showCirclePicture();
            this.haveRoomMaster();
            this.label_InfoNum.visible = false;
            this.label_InfoNum2.visible = false;
        }
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        public onMediatorCommand(type: MineCommands, params: any = null)
        {
            switch (type)
            {
                case MineCommands.initListener:
                    this.initListener(params)
                    break;
                case MineCommands.updateMsgRead:
                    this.shwoUnRead();
                    break;
            }
        }
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        protected initListener(mediator: MineMediator): void
        {
            this.registerEvent(this.btn_PersonalCenter, egret.TouchEvent.TOUCH_TAP, mediator.goPersonalCenterFun, mediator);
            this.registerEvent(this.btn_RoomMaster, egret.TouchEvent.TOUCH_TAP, mediator.HomeOwner, mediator);
            this.registerEvent(this.btn_InfoNotice, egret.TouchEvent.TOUCH_TAP, mediator.onNoticeInfo, mediator);
            this.registerEvent(this.btn_InfoNotice2, egret.TouchEvent.TOUCH_TAP, mediator.onNoticeInfo, mediator);
            this.registerEvent(this.btn_Setting, egret.TouchEvent.TOUCH_TAP, mediator.openSystem, mediator);
            this.registerEvent(this.btn_Setting2, egret.TouchEvent.TOUCH_TAP, mediator.openSystem, mediator);
        }
        /**
         * 当舞台尺寸发生变化
         */
        public onStageResize(evt: egret.Event): void
        {
            super.onStageResize(evt);
        }
        /**初始化数据*/
        private initShowData()
        {
            this.label_NickName.text = PersonalInfoModel.getInstance().nick;
            this.label_Accountnum.text = PersonalInfoModel.getInstance().username;
            this.label_ID.text = PersonalInfoModel.getInstance().user_id;
            this.label_version.text = LanguageUtil.translate("mine_lbl_version_info")+":"+"v1.0.0";
        }
        /*显示圆形头像*/
        private showCirclePicture(): void
        {
            //判断头像是不是默认
            if (PersonalInfoModel.getInstance().avatar)
            {
                this.img_HeadPicture.source = PersonalInfoModel.getInstance().avatar;
            }
            //显示圆形剪切图片的方法
            let w = this.img_HeadPicture.width;
            let c: egret.Shape = new egret.Shape();
            c.graphics.beginFill(0);
            c.graphics.drawCircle(0, 0, w / 2);
            c.x = w / 2 + 13;
            c.y = 100;
            this.group_Picture.addChild(c);
            this.img_HeadPicture.mask = c;
        }

        private shwoUnRead():void
        {
            let bool = NotifyModel.getInstance().unread_count > 0;
            // let model = ClubModel.getInstance();
            // let CreatNum = model.getCreatedClubNum();
            let CreatNum = 0;
            this.img_Info2.visible = false;
            this.img_Info.visible = false;
            if (CreatNum == 0)
            {
                this.img_Info2.visible = bool;
            }
            else if (CreatNum != 0)
            {
                this.img_Info.visible = bool;
            }
        }

        /**有无房主显示*/
        private haveRoomMaster(): void
        {
            // let model = ClubModel.getInstance();
            // let CreatNum = model.getCreatedClubNum();
            let CreatNum = 0;
            if (CreatNum == 0)
            {
                this.img_last.visible = false;
                this.btn_RoomMaster.visible = false;
                this.btn_InfoNotice.visible = false;
                this.btn_Setting.visible = false;
                this.btn_InfoNotice2.visible = true;
                this.btn_Setting2.visible = true;
            }
            else if (CreatNum != 0)
            {
                this.img_last.visible = true;
                this.btn_RoomMaster.visible = true;
                this.btn_InfoNotice.visible = true;
                this.btn_Setting.visible = true;
                this.btn_InfoNotice2.visible = false;
                this.btn_Setting2.visible = false;
            }
            this.shwoUnRead();
        }
    }
}