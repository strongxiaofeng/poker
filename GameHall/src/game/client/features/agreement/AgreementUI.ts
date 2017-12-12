module game {
	export class AgreementUI extends BaseUI{
		private agreementGroup: eui.Group;
		private refuseBtn: eui.AButton;
		private agreeBtn: eui.AButton;
		private agreementLabel: eui.ALabel;
		private data: AgreementObj;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "agreement/agreementSkin.exml";
		}

		public initSetting()
		{
			super.initSetting();
			this.refuseBtn.enabled = false;
			this.agreeBtn.enabled = false;
		}
		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case AgreementCommands.initListener:
					this.initListener(params);
					break;
				case AgreementCommands.setAgreement:
					this.setAgreement(params);
					this.refuseBtn.enabled = true;
					this.agreeBtn.enabled = true;
					break;
			}
        }
		/**刷新用户协议内容 */
		private setAgreement(txt: string)
		{
			this.agreementLabel.text = LanguageUtil.translate(txt);
		}
		/**注册事件 */
		private initListener(data: AgreementObj)
		{
			this.data = data;
			this.registerEvent(this.refuseBtn, egret.TouchEvent.TOUCH_TAP, this.refuse, this);
			this.registerEvent(this.agreeBtn, egret.TouchEvent.TOUCH_TAP, this.sure, this);
			this.registerEvent(this.refuseBtn, mouse.MouseEvent.MOUSE_OVER, this.mouseEvent, this);
			this.registerEvent(this.refuseBtn, mouse.MouseEvent.MOUSE_OUT, this.mouseEvent, this);
			this.registerEvent(this.agreeBtn, mouse.MouseEvent.MOUSE_OVER, this.mouseEvent, this);
			this.registerEvent(this.agreeBtn, mouse.MouseEvent.MOUSE_OUT, this.mouseEvent, this);
		}
		/**鼠标事件*/
		private mouseEvent(e:egret.TouchEvent):void{
			if(GlobalConfig.isMobile)return;
			switch(e.type){
				case mouse.MouseEvent.MOUSE_OVER:
					switch(e.currentTarget){
						case this.refuseBtn:
							(this.refuseBtn.getChildByName("imgMouse") as eui.Image).source = "btn_confirm_h_pc_png";
							(this.refuseBtn.getChildByName("labelDisplay") as eui.Label).textColor = 0x654D29;
							break;
						case this.agreeBtn:
							(this.agreeBtn.getChildByName("imgMouse") as eui.Image).source = "btn_confirm_h_pc_png";
							(this.agreeBtn.getChildByName("labelDisplay") as eui.Label).textColor = 0x654D29;
							break;
					}
					break;
				case mouse.MouseEvent.MOUSE_OUT:
					switch(e.currentTarget){
						case this.refuseBtn:
							(this.refuseBtn.getChildByName("imgMouse") as eui.Image).source = "btn_confirm_pc_png";
							(this.refuseBtn.getChildByName("labelDisplay") as eui.Label).textColor = 0xCA1113;
							break;
						case this.agreeBtn:
							(this.agreeBtn.getChildByName("imgMouse") as eui.Image).source = "btn_confirm_pc_png";
							(this.agreeBtn.getChildByName("labelDisplay") as eui.Label).textColor = 0x25BF4E;
							break;
					}
					break;
			}
		}
		/**果断拒绝 */
		private refuse()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			if(this.data.refuseCallback && this.data.refuseCallbackObj)
			{
				this.data.refuseCallback.call(this.data.refuseCallbackObj);
			}
			MediatorManager.closeMediator(Mediators.Mediator_Agreement.name);
		}
		/**被迫接受 */
		private sure()
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			if(this.data.sureCallback && this.data.sureCallbackObj)
			{
				this.data.sureCallback.call(this.data.sureCallbackObj);
			}
			MediatorManager.closeMediator(Mediators.Mediator_Agreement.name);
		}
		/**重载关闭 */
        public dispose(): void {
			super.dispose();
		}
	}

	export class AgreementObj
	{
		refuseCallback: Function;
		refuseCallbackObj: any;
		sureCallback: Function;
		sureCallbackObj: any;
	}
}