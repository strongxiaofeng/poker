module game {
	export class PCJoinedClubUI extends BaseUI {

		/** 列表滚动组件*/
		private joinedClubScroller: eui.Scroller;
		/** 列表*/
		private joinClubList: eui.List;
		/** 俱乐部数量*/
		private joinedNum: eui.BitmapLabel;
		/** 没有加入俱乐部提示*/
		private tipGroup: eui.Group;
		private arrayCollection: eui.ArrayCollection;
		/** loading*/
		private loading:updateListLoading;

		/** 加入俱乐部按钮*/
		private addBtn:eui.AButton;
		/** 加入俱乐部按钮圈*/
		private btnCircle:eui.Image;

		/** 加入俱乐部组group*/
		private joinGroup:eui.Group;
		/** 加入俱乐部邀请码*/
		private joinInput:eui.EditableText;
		/** 加入俱乐部group确定按钮*/
		private joinConfirmBtn:eui.AButton;
		/** 加入俱乐部group取消按钮*/
		private joinCancelBtn:eui.AButton;
		/** 加入俱乐部错误提示group*/
		private joinTipGroup:eui.Group;
		/** 加入俱乐部错误提示*/
		private joinTipMsg:eui.ALabel;
		private numArr = ["0","1","2","3","4","5","6","7","8","9"];
		/** 列表上拉刷新loading*/
		protected listLoader: ListLoader;

		public constructor() {
			super();
			this.skinName = SystemPath.skin_path + "joinedClub/joinedClubSkin.exml";
			this.listLoader = ListLoader.getInstance();
		}

// ---------------------------------- 初始化 ----------------------------------

		public initSetting() {
			super.initSetting();
			this.initList();
			this.tipGroup.visible = false;
			this.showCirclerun();
		}

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
		public onMediatorCommand(type: PCJoinedCommands, params: any = null): void {
			switch (type) {
				case PCJoinedCommands.initListener:
					this.initListeners(params);
					break;
				case PCJoinedCommands.getListData:
					this.updateList(params);
					break;
				case PCJoinedCommands.hidenListLoading:
					this.listLoader.setLoadComplete();
					break;
				case PCJoinedCommands.setAllLoaded:
					this.listLoader.setAllLoaded();
					break;
				case PCJoinedCommands.showGroupTip:
					this.isShowTipGroup(true);
					break;
				case PCJoinedCommands.showTotalClub:
					this.updateClubNum(params + "");
					break;
			}
		}

		/**注册事件 手动调用*/
		protected initListeners(mediator: PCJoinedClubMediator) {
			// this.registerEvent(this.joinedClubScroller, egret.Event.CHANGE, (e: egret.Event)=>{
			// 	let list = e.target.viewport;
			// 	if(list.contentHeight < list.height) return;
			// 	if (list.scrollV + list.height - list.contentHeight > 150) {
			// 		mediator.requestJoinedClubList();
			// 	}
			// }, this);
			this.listLoader.setList(this.joinedClubScroller, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
			this.registerEvent(this.addBtn, egret.TouchEvent.TOUCH_TAP, this.showJoinGroup,this);
			this.registerEvent(this.joinCancelBtn, egret.TouchEvent.TOUCH_TAP, ()=>{ this.showJoinGroup(null) },this);
			this.registerEvent(this.joinConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.joinClub,this);
		}

		/** 初始化list*/
		private initList(): void {
			this.joinedClubScroller.scrollPolicyV = eui.ScrollPolicy.ON;
			this.arrayCollection = new eui.ArrayCollection();
			this.joinClubList.itemRenderer = PCJoindClubItem;
			this.joinClubList.dataProvider = this.arrayCollection;
		}

// ---------------------------------- 用户操作 ----------------------------------

		/** 显示俱乐部弹框*/
		private showJoinGroup(e?:egret.TouchEvent):void
		{
			if(e)
			{
				this.joinGroup.visible = true;
				this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
				this.joinInput.text = "";
				this.joinInput.addEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                LayerManager.getInstance().addUI(this.joinGroup, enums.LayerConst.LAYER_TOP);
			}
			else
			{
				this.joinGroup.visible = false;
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.removeEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                this.addChild(this.joinGroup);
			}
		}

		/** 输入邀请码响应事件 */
        protected onJoinInput(): void
		{
            let txt = this.joinInput.text;
			if(this.checkNumIllegal(txt))
			{
				this.joinInput.text = txt.slice(0,-1);
			}
            this.joinConfirmBtn.enabled = txt.length && txt.length > 0;
            this.joinConfirmBtn.setState = this.joinConfirmBtn.enabled?'up':'disabled';
        }

		/** 加入一个俱乐部 */
        protected joinClub(): void
		{
            this.joinConfirmBtn.enabled = false;
            this.joinConfirmBtn.setState = 'disabled';
            let txt = this.joinInput.text;
            let exp = /\d{8}/;
            if (!exp.test(txt)) {
                let msg = "邀请码错误或已失效";
                this.showJoinError(msg);
            } else {
                ClubController.getInstance().joinClub(txt).then((obj: {
                    id: number;
                    creator_name: string;
                    name: string;
                    creator_id: number;
                    locked: boolean
                }) => {
					if (obj.locked) {
						let tipData = new TipMsgInfo();
						tipData.msg = [{ text: '抱歉您在"' + obj.name + '"的权限已被锁定 \n 请联系房主', textColor: enums.ColorConst.Golden }];
						tipData.confirmText = "我知道了";
						// tipData.comfirmCallBack = this.confirmBack;
						// tipData.thisObj = this;
						MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					} else {
						this.onJoinSuccess(obj.id);
					}
                }).catch((e:any) => {
					DebugUtil.debug(e + "加入俱乐部失败");
					this.onJoinFailed(txt, e);
					//owner_join  加入自己的俱乐部
					//repeat_join  加入已加入的俱乐部
					//invitation_code_unavailable 邀请码不可用？不知道这个啥时候出来的
                });
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

		/** 显示加入俱乐部失败提示*/
		private showJoinError(msg:string):void
		{
			this.joinTipMsg.text = "";
			this.joinTipMsg.text = msg;
			this.joinTipGroup.alpha = 1;
            this.joinTipGroup.visible = true;
            CTween.get(this.joinTipGroup).wait(2500).to({
                alpha: 0
            }, 500).call(() =>
			{
                this.joinTipGroup.visible = false;
                this.joinTipGroup.alpha = 1;
				this.joinTipMsg.text = "";
            }, this);
		}

		/** 加入俱乐部失败的回调
		 * @param txt 加入俱乐部输入框输入的文本
		 * @param e 加入失败的返回参数
		*/
		private onJoinFailed(txt:string, e:any):void
		{
			let msg = "邀请码错误或已失效";
			// switch (e)
			// {
			// 	case "owner_join":
			// 		msg = "此是您创建的俱乐部";
			// 		break;
			// 	case "repeat_join":
			// 		msg = "您已加入此俱乐部";
			// 		break;
			// 	case "invitation_code_unavailable":
			// 		msg = "邀请码错误或已失效";
			// 		break;
			// }
			if(e == "owner_join")//此俱乐部是您创建的
			{
				msg = "此俱乐部是您创建的";
			}
			else if(e == "invitation_code_unavailable")//邀请码错误或已失效
			{
				msg = "邀请码错误或已失效";
			}
			else
			{
				let js = JSON.parse(e);
				if(js.message == "repeat_join")//您已加入此俱乐部
				msg = "您已加入此俱乐部";
			}
			this.showJoinError(msg);
		}

		/** 加入俱乐部成功回调*/
		private onJoinSuccess(clubID):void
		{
			let joinedClubNum = (ClubModel.getInstance().getJoinedClubNum() + 1) || 1;
			ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, joinedClubNum).then(() =>
			{
				let clubInfo = ClubModel.getInstance().getJoinedClubById(+clubID);
				if (clubID)
				{
                    this.showJoinGroup(null);
					let creatorName: string = clubInfo.creator_name;
                    let clubName: string = clubInfo.name;
                    let tipData = new TipMsgInfo();
                    tipData.msg = [
                        { text: "您已加入由", textColor: enums.ColorConst.Golden },
                        { text: creatorName, textColor: enums.ColorConst.LightGray },
                        { text: "创建的", textColor: enums.ColorConst.Golden },
                        { text: clubName, textColor: enums.ColorConst.LightGray }
                    ];
                    tipData.confirmText = "我知道了";
					tipData.comfirmCallBack = ()=>{
						CommonLoadingUI.getInstance().start();
                        GlobalConfig.setClubId(clubID)
                        .then(()=>{
							CommonLoadingUI.getInstance().stop();
							//是否进行过新手引导
							let guidedUser = localStorage.getItem("guidedUser");
							let name = LoginController.getInstance().sendingName;
							let guided: boolean = false;

							if (!guidedUser) guidedUser = "";
							if (guidedUser.length > 0) {
								let arr = guidedUser.split(":");
								if (arr.indexOf(name) > -1) {
									guided = true;
								}
							}
							if (!guided) {
								let value = guidedUser;
								if (guidedUser.length > 0) value += ":" + name;
								else value += name;
								localStorage.setItem("guidedUser", value);
								CommonLoadingUI.getInstance().start();
								MediatorManager.openMediator(Mediators.Mediator_LeftBar,false);
								MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, null);
								MediatorManager.openMediator(Mediators.Mediator_BaccaratGuide);
							}else{
								ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn, "createBtn");
								MediatorManager.openMediator(Mediators.Mediator_LeftBar,false);
								ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn);
								MediatorManager.openMediator(Mediators.Mediator_PCJoinedRoomList);
							}
                        }).catch((e:Error)=>{
							CommonLoadingUI.getInstance().stop();
                            DebugUtil.debug(e.message + "订阅俱乐部失败");
                        });
                    };
					tipData.thisObj = this;
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
				}
				else
				{
                    DebugUtil.debug("获取俱乐部信息失败");
                }
			}) .catch((e) => {
				DebugUtil.debug(e + "加入俱乐部失败");
                let msg = "邀请码错误或已失效";
                this.showJoinError(msg);
            });
		}

// ---------------------------------- 刷新 ----------------------------------

		/** 刷新列表*/
		private updateList(listData: Array<ClubListInfo>): void
		{
			if(!listData) listData = [];
			this.arrayCollection.source = listData;
			this.arrayCollection.refresh();
			let num = listData.length || 0;
			this.isShowTipGroup(listData.length <= 0);
		}

		/** 是否显示没有俱乐部提示*/
		private isShowTipGroup(b): void {
			this.tipGroup.visible = b;
		}

		/** 刷新总俱乐部数*/
		private updateClubNum(num:string): void {
			if(parseInt(num) >= 10)
			{
				this.joinedNum.width = 80;
				this.joinedNum.right = 40;
			}
			this.joinedNum.text = num || 0 + "";
		}

		/** 按钮圈旋转*/
        protected showCirclerun():void
        {
			this.btnCircle.rotation = 0;
			CTween.get(this.btnCircle,{loop:true}).to({rotation:-360},4000);
        }

// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.listLoader.dispose();
			this.listLoader = null;
			this.showJoinGroup(null);
			CTween.removeTweens(this.btnCircle);
			super.dispose();
		}
	}
}