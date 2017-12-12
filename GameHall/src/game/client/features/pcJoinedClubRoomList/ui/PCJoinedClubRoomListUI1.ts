module game
{
	export class PCJoinedClubRoomListUI1 extends BaseUI
	{
		/** 列表滚动组件*/
		private joinedRoomScroll:eui.Scroller;
		/** 列表组件*/
		private joinedRoomList:eui.List;
		/** 列表组件*/
		private arrData:eui.ArrayCollection;
		/** 密码输入框group*/
		private pwdGroup:eui.Group;
		/** 密码输入框group*/
		private pwdTipGroup:eui.Group;
		/** 密码输入框提示*/
		private pwdInput:eui.EditableText;
		/** 密码输入提示文本*/
		private pwdTipLabel:eui.ALabel;
		/** 密码输入框取消按钮*/
		private cancelBtn:eui.AButton;
		/** 密码输入框确定按钮*/
		private confirmBtn:eui.AButton;
		/** 当前房间ID*/
		private pwdRoomID:string;

		/** 显示房间按钮组*/
		private allBtn:eui.AButton;
		/** 房间按钮组*/
		private btnGroup:eui.Group;
		/** 所有房间按钮*/
		private allRoomBtn:eui.AButton;
		/** 所有房间按钮*/
		private publicBtn:eui.AButton;
		/** 所有房间按钮*/
		private privateBtn:eui.AButton;

		/** 没有房间提示*/
		private tipLabel:eui.ALabel;
		/** 列表上拉刷新loading*/
		protected listLoader: ListLoader;
		private numArr = ["0","1","2","3","4","5","6","7","8","9"];

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "joinedClub/joinedClubRoomList/joinedClubRoomListSkin.exml";
			this.listLoader = ListLoader.getInstance();	
		}

		public initSetting()
		{
			super.initSetting();
			this.initList();
			this.showPwd(null);
			this.btnGroup.visible = false;
			this.tipLabel.visible = false;
		}

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
		public onMediatorCommand(type: PCJoinedRoomListCommands, params: any = null): void
		{
			switch(type)
			{
				case PCJoinedRoomListCommands.initListener:
					this.initListeners(params);
					break;
				case PCJoinedRoomListCommands.showList:
					this.showList(params);
					break;
				case PCJoinedRoomListCommands.showPwd:
					this.showPwd(params);
					break;
				case PCJoinedRoomListCommands.showMsg:
					this.showMsg(params);
					break;
				case PCJoinedRoomListCommands.showBtnState:
					this.showBtnState(params);
					break;
				case PCJoinedRoomListCommands.updateRoadMap:
					this.updateRoadMap(params, "updataRoadData");
					break;
				case PCJoinedRoomListCommands.roomStage:
					this.updateStage(params, "updateStage");
					break;
				case PCJoinedRoomListCommands.hidenListLoading:
					this.listLoader.setLoadComplete();
					break;
				case PCJoinedRoomListCommands.showListNoMore:
					this.listLoader.setAllLoaded();
					break;
				case PCJoinedRoomListCommands.showRoomTip:
					this.tipLabel.visible = params;
					break;
				case PCJoinedRoomListCommands.showRoomBtnEnable:
					this.showBtnEnable(params);
					break;
				case PCJoinedRoomListCommands.noRoomCard:
					let tipData = new TipMsgInfo();
                    tipData.msg = [{ text: LanguageUtil.translate(params), textColor: enums.ColorConst.Golden }];
                    tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
                    tipData.comfirmCallBack = this.confirmBack;
                    tipData.thisObj = this;
                    MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					break;
			}
		}
		protected confirmBack(){
            MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
        }
		/**注册事件 手动调用*/
		protected initListeners(mediator: PCJoinedClubRoomListMediator):void
		{
			this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, ()=>{this.showPwd(null)},this);
			this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.reqEnterPwd,this);
			this.registerEvent(this.allBtn, egret.TouchEvent.TOUCH_TAP, this.showBtnGroup,this);
			this.registerEvent(this.allRoomBtn, egret.TouchEvent.TOUCH_TAP, mediator.showAllRoom,mediator);
			this.registerEvent(this.publicBtn, egret.TouchEvent.TOUCH_TAP, mediator.showPublicRoom,mediator);
			this.registerEvent(this.privateBtn, egret.TouchEvent.TOUCH_TAP, mediator.showPrivateRoom,mediator);
			this.listLoader.setList(this.joinedRoomScroll, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
		}

		/** 初始化列表*/
		private initList():void
		{
			this.arrData = new eui.ArrayCollection();
			this.joinedRoomList.itemRenderer = PCJoinedClubRoomItem;
			this.joinedRoomList.dataProvider = this.arrData;
			this.joinedRoomScroll.scrollPolicyH = eui.ScrollPolicy.OFF;
		}

		/** 
		 * 刷新列表
		 * @param listData 列表数据，暂定any
		 */
		private showList(listData: any):void
		{
			if(!listData) listData = [];

			let privateArrN: Array<any> = [];
            let commonArrN: Array<any> = [];
			for(let i = 0; i <= listData.length - 1; i++)
			{
				let locked = ClubModel.getInstance().getlockBool(listData[i]);
				if (locked == true) {
					privateArrN.push(listData[i]);
				} else if (locked == false) {
					commonArrN.push(listData[i]);
				}
			}
			/** 筛选*/
			if(this.type == 0)
			{
				this.arrData.source = listData;
				this.tipLabel.visible = listData.length <= 0;
			}
			else if(this.type == 1)
			{
				this.arrData.source = commonArrN;
				this.tipLabel.visible = commonArrN.length <= 0;
			}
			else if(this.type == 2)
			{
				this.arrData.source = privateArrN;
				this.tipLabel.visible = privateArrN.length <= 0;
			}
			// this.arrData.source = listData;
			this.joinedRoomList.useVirtualLayout = false;
            this.arrData.refresh();
			this.joinedRoomList.validateNow();
			// this.tipLabel.visible = listData.length <= 0;
		}	

		/** 刷新某房间的路书*/
		private updateRoadMap(roomID:string, funcName):void
		{
			if(this.joinedRoomList)
			{
				for(let i = 0; i < this.joinedRoomList.dataProvider.length; i++)
				{
					if(this.joinedRoomList.getElementAt(i))
					{
						if (this.joinedRoomList.getElementAt(i)["data"] == roomID) {
							this.joinedRoomList.getElementAt(i)[funcName]();
						}
					}
				}
			}
		}

		/**刷新某房间状态*/
		public updateStage(souresID: string, fucName: string):void
		{
			if(!this.joinedRoomList) return;
            if (this.joinedRoomList.dataProvider && this.joinedRoomList.dataProvider.length)
			{
                for (let i = 0; i < this.joinedRoomList.dataProvider.length; i++)
				{
                    let newSouresID = ClubModel.getInstance().roomIDTosouceID(this.joinedRoomList.getElementAt(i)["data"]);
                    if (newSouresID == souresID)
					{
						this.joinedRoomList.getElementAt(i)[fucName]();
                    }
                }
            }
		}

		/** 显示按钮是否启用*/
		private showBtnEnable(btn?:string):void
		{
			switch(btn)
			{
				case "privateBtn":
					this.privateBtn.setState = "disabled";
					this.privateBtn.enabled = false;
					break;
				case "publicBtn":
					this.publicBtn.setState = "disabled";
					this.publicBtn.enabled = false;
					break;
				case "allBtn":
					this.privateBtn.setState = "disabled";
					this.privateBtn.enabled = false;
					this.publicBtn.setState = "disabled";
					this.publicBtn.enabled = false;
					this.allRoomBtn.setState = "disabled";
					this.allRoomBtn.enabled = false;
					break;
					default:
					this.privateBtn.setState = "up";
					this.privateBtn.enabled = true;
					this.publicBtn.setState = "up";
					this.publicBtn.enabled = true;
					this.allRoomBtn.setState = "up";
					this.allRoomBtn.enabled = true;
					break;
			}
		}


		/** 显示或隐藏密码输入框group*/
		private showPwd(roomID?:string):void
		{
			if(roomID)
			{
				this.pwdGroup.visible = true;
				this.pwdTipGroup.visible = false;
				this.confirmBtn.setState = 'disabled';
				this.pwdInput.text = "";
				this.pwdRoomID = roomID;
				this.pwdInput.addEventListener(egret.Event.CHANGE, this.onpwdInput, this);
				// this.pwdInput.addEventListener(egret.Event.FOCUS_OUT, this.outpwdInput, this);
				LayerManager.getInstance().addUI(this.pwdGroup, enums.LayerConst.LAYER_TOP);
			}
			else
			{
				this.pwdGroup.visible = false;
				this.pwdTipGroup.visible = false;
				this.pwdGroup.removeEventListener(egret.Event.CHANGE, this.onpwdInput, this);
                this.addChild(this.pwdGroup);
			}
		}

		/** onpwdInput*/
		private onpwdInput():void
		{
			let txt = this.pwdInput.text;
			if(this.checkNumIllegal(txt))
			{
				this.pwdInput.text = txt.slice(0,-1);
			}
            this.confirmBtn.enabled = txt.length && txt.length > 0;
            this.confirmBtn.setState = this.confirmBtn.enabled?'up':'disabled';
		}
		
        /** 发送进入密码房间请求 */
        public reqEnterPwd()
        {
            let txt = this.pwdInput.text;
            if (!txt || txt == '' || txt.length != 6) {
				this.showMsg(LanguageUtil.translate("global_lbl_room_password_error"));
            }
            else {
                ClubController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_EnterPwd, [this.pwdRoomID, txt]);
            }
        }

		/** 输入其他字符*/
		public checkNumIllegal(str:string): boolean
		{
			if(!str) return true;
			if(str == "") return true;
			str = str + "";
			for(let i = 0; i<str.length; i++)
			{
				if(this.numArr.indexOf(str.charAt(i)) <0)
				{
					return true;
				}
			}
			return false;
		}

		/** 显示密码输入错误提示*/
		private showMsg(msg:string):void
		{
			if(!this.pwdGroup.visible) return;
			this.pwdTipGroup.alpha = 1;
			this.pwdTipLabel.text = msg;
			this.pwdTipGroup.visible = true;
			CTween.removeTweens(this.pwdTipGroup);
			CTween.get(this.pwdTipGroup)
			.wait(10)
			.to({alpha:0.01}, 3000)
			.call(()=>{
				this.pwdTipGroup.visible = false;
				CTween.removeTweens(this.pwdTipGroup);
			})
		}

		/** 显示选择房间按钮group*/
		public showBtnGroup():void
		{
			this.btnGroup.visible = !this.btnGroup.visible;
		}

		private type:number = 0;
		/** 显示按钮状态
		 * all  显示所有房间
		 * public  显示普通房间
		 * private  显示私人房间
		*/
		private showBtnState(state:string):void
		{
			switch (state)
			{
				case "all":
					this.type = 0;
					this.allBtn.label = LanguageUtil.translate("founder_btn_all_room");
					this.allRoomBtn.setState = "down";
					this.publicBtn.setState = this.publicBtn.setState == "disabled"?"disabled":"up";
					this.privateBtn.setState = this.privateBtn.setState == "disabled"?"disabled":"up";
					break;
				case "public":
					this.type = 1;
					this.allBtn.label = LanguageUtil.translate("founder_btn_normal_room");
					this.allRoomBtn.setState = "up";
					this.publicBtn.setState = "down";
					this.privateBtn.setState = this.privateBtn.setState == "disabled"?"disabled":"up";
					break;
				case "private":
					this.type = 2;
					this.allBtn.label = LanguageUtil.translate("founder_btn_private_room");
					this.allRoomBtn.setState = "up";
					this.publicBtn.setState = this.publicBtn.setState == "disabled"?"disabled":"up";
					this.privateBtn.setState = "down";
					break;
			}
			this.btnGroup.visible = false;
		}

// ---------------------------------- dispose ----------------------------------
		
		/**关闭mediator, 要清除他的ui和数据,不再接受通知 */
		public dispose(): void
		{
			CTween.removeTweens(this.pwdTipGroup);
			this.listLoader.dispose();
			this.listLoader = null;
			this.showPwd(null);
			super.dispose();
		}
	}
}