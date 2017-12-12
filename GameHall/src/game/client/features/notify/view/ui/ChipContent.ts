module game
{
	export class ChipContent extends BaseUI
	{
		protected contentTxt:eui.Label;
		protected timeTxt:eui.Label;
		protected cancelBtn:eui.Button;
		protected confirmBtn:eui.Button;
		protected goBackBtn:eui.Button;

		protected resultTxt:eui.Label;

		private message_id:number;

		private msg:any;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "notify/ChipAskContent.exml";;
		}


		public initSetting(): void
		{
			this.registerEvent(this.cancelBtn,egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			this.registerEvent(this.confirmBtn,egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			this.registerEvent(this.goBackBtn,egret.TouchEvent.TOUCH_TAP,this.onTap,this)

		}

		private onTap(e:egret.Event):void
		{
			switch(e.target)
			{
				case this.goBackBtn:
					MediatorManager.closeMediator(Mediators.Mediator_ChipContent.name);
					break;
				case this.cancelBtn:
					NotifyController.getInstance().isAllowChipAsk(this.message_id,false);
					this.resultTxt.visible = true;
					this.cancelBtn.visible = false;
					this.confirmBtn.visible = false;
					this.resultTxt.text = "已拒绝";
					break;
				case this.confirmBtn:
					let tipData = new TipMsgInfo();
					tipData.msg = [
						{ text: LanguageUtil.translate("mine_lbl_user_name"), textColor: enums.ColorConst.Golden },
						{ text: this.msg.sender_nickname, textColor: enums.ColorConst.White },
						{ text: "  " + LanguageUtil.translate("mine_lbl_ccount_number"), textColor: enums.ColorConst.Golden },
						{ text: this.msg.sender_name + "\n", textColor: enums.ColorConst.White },
						{ text: LanguageUtil.translate("founder_lbl_assignment_type"), textColor: enums.ColorConst.Golden },
						{ text: "增加", textColor: enums.ColorConst.White },
						{ text: "  " + LanguageUtil.translate("founder_lbl_assignment_quantity"), textColor: enums.ColorConst.Golden },
						{ text: this.msg.chip_amount/100, textColor: enums.ColorConst.White },
					];
					tipData.confirmText = "确认";
					tipData.cancelText = "取消";
					tipData.comfirmCallBack = this.comfirmCallBack;
					tipData.cancelCallBack = this.cancelCallBack;
					tipData.thisObj = this;
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					break;
			}
		}

		private cancelCallBack():void
		{
			
		}

		private comfirmCallBack():void
		{
			NotifyController.getInstance().isAllowChipAsk(this.message_id,true);
			this.resultTxt.visible = true;
			this.cancelBtn.visible = false;
			this.confirmBtn.visible = false;
			this.resultTxt.text = "已同意";
		}

		/**收到miditor的通知*/
		public onMediatorCommand(type: NotifyCommands, params: any = null)
		{
			switch (type)
			{
				case NotifyCommands.initData:
					// console.warn(params);
					this.msg = params;
					this.contentTxt.text = params.detail;
					let date = new Date(params.create_time);
					this.timeTxt.text = NumberUtil.formatDate(date, 3);
					let bool = params.message_status == "waiting";
					this.resultTxt.visible = !bool;
					this.cancelBtn.visible = bool;
					this.confirmBtn.visible = bool;
					this.message_id = params.message_id;
					switch(params.message_status)
					{
						case "waiting":

							break;
						case "allowed":
							this.resultTxt.text = "已同意";
							break;
						case "refused":
							this.resultTxt.text = "已拒绝";
							break;
					}
					this.isOwner(params.sender_id != +PersonalInfoModel.getInstance().user_id);
					break;
			}
		}

		public isOwner(flag = false):void
		{
			if(flag)
			{
				this.timeTxt.bottom = 166;
			}
			else
			{
				this.timeTxt.bottom = 40;
				this.cancelBtn.visible = false;
				this.confirmBtn.visible = false;
				this.resultTxt.visible = false;
			}
		}
	}
}