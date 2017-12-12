module game
{
	export class PCCreatedClubUI extends BaseUI
	{
		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "createdClub/createdClubSkin.exml";
			this.listLoader = ListLoader.getInstance();
		}
		/** 列表滚动组件*/
		private createdClubScroller: eui.Scroller;
		/** 列表*/
		private createdClubList: eui.List;
		/** 俱乐部数量*/
		private clubNum: eui.BitmapLabel;
		/** 房间数*/
		private roomNum: eui.BitmapLabel;
		/** 在线人数*/
		private playersOnline: eui.BitmapLabel;
		/** 没有创建的俱乐部提示*/
		private tipGroup: eui.Group;
		private arrayCollection: eui.ArrayCollection;

		/** 创建俱乐部按钮*/
		private addBtn:eui.AButton;
		/** 创建俱乐部按钮圈圈*/
		private btnCircle:eui.Image;
		/** 创建俱乐部星星*/
		private spinImg:eui.Image;
		/** 创建俱乐部弹框背景组*/
		private shineGroup:eui.Group;

		/** 创建俱乐部group*/
		private createGroup:eui.Group;
		/** 创建俱乐部失败提示group*/
		private createTipGroup:eui.Group;
		/** 创建俱乐部失败提示文本*/
		private createErrorMsg:eui.ALabel;
		/** 创建俱乐部输入框*/
		private createInput:eui.EditableText;
		/** 创建俱乐部取消按钮*/
		private createCancelBtn:eui.AButton;
		/** 创建俱乐部确定按钮*/
		private createConfirmBtn:eui.AButton;
		/** 列表上拉刷新loading*/
		protected listLoader: ListLoader;

// ---------------------------------- 初始化 ----------------------------------

		public initSetting() {
			super.initSetting();
			this.initList();
			this.tipGroup.visible = false;
			this.showCreateGroup(null);
			this.showCirclerun();
		}

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
		public onMediatorCommand(type: PCCreatedCommands, params: any = null): void {
			switch (type) {
				case PCCreatedCommands.initListener:
					this.initListeners(params);
					break;
				case PCCreatedCommands.getListData:
					this.updateList(params);
					break;
				case PCCreatedCommands.getPlayerOnline:
					let num = 0;
					for(let i = 0; i < params.length; i++)
					{
						num += params[i];
					}
					this.showPlayersNum(num + "");
					break;
				case PCCreatedCommands.getRoomNum:
					let rooms = params || 0;
					this.showRoomNum(rooms + "");
					break;
				case PCCreatedCommands.hidenListLoading:
					this.listLoader.setLoadComplete();
					break;
				case PCCreatedCommands.setAllLoaded:
					this.listLoader.setAllLoaded();
					break;
				case PCCreatedCommands.showGroupTip:
					this.isShowTipGroup(true);
					break;
				case PCCreatedCommands.showTotalNum:
					this.showClubNum(params + "");
					break;
			}
		}

		/**注册事件 手动调用*/
		protected initListeners(mediator: PCCreatedClubMediator) {
			this.registerEvent(this.addBtn, egret.TouchEvent.TOUCH_TAP, this.showCreateGroup,this);
			this.registerEvent(this.createCancelBtn, egret.TouchEvent.TOUCH_TAP, ()=>{ 
				SoundPlayerNew.playEffect(SoundConst.click);
				this.showCreateGroup(null); },this);
			this.registerEvent(this.createConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.createClub,this);
			this.listLoader.setList(this.createdClubScroller, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
		}

		/** 初始化list*/
		private initList(): void {
			this.createdClubScroller.scrollPolicyV = eui.ScrollPolicy.ON;
			this.arrayCollection = new eui.ArrayCollection();
			this.createdClubList.itemRenderer = PCCreatedClubItem;
			this.createdClubList.useVirtualLayout = false;
			this.createdClubList.dataProvider = this.arrayCollection;
		}

		/** 刷新列表*/
		private updateList(listData: Array<ClubListInfo>):void
		{
			if(!listData) listData = [];
			this.arrayCollection.source = listData;
			this.arrayCollection.refresh();
		}

		/** 是否显示没有俱乐部提示*/
		private isShowTipGroup(b: boolean): void {
			this.tipGroup.visible = b;
		}

		/** 显示俱乐部总数*/
		private showClubNum(num:string): void {
			if(parseInt(num) >= 10)
			{
				this.clubNum.width = 80;
				this.clubNum.right = 40;
			}
			this.clubNum.text = num || 0 + "";
		}

		/** 显示房间总数*/
		private showRoomNum(num:string): void {
			if(parseInt(num) >= 10)
			{
				this.roomNum.width = 80;
				this.roomNum.right = 40;
			}
			this.roomNum.text = num || 0 + "";
		}

		/** 显示在线人数*/
		private showPlayersNum(num:string): void {
			if(parseInt(num) >= 10)
			{
				this.playersOnline.width = 80;
				this.playersOnline.right = 40;
			}
			this.playersOnline.text = num || 0 + "";
		}


		/** 显示创建俱乐部弹框*/
		private showCreateGroup(e?:egret.TouchEvent):void
		{
			if (e) {
				SoundPlayerNew.playEffect(SoundConst.click);
                this.createGroup.visible = true;
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.text = "";
                this.createInput.addEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect();
                LayerManager.getInstance().addUI(this.createGroup, enums.LayerConst.LAYER_TOP);
            } else {
                this.createGroup.visible = false;
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.removeEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect(false);
                this.addChild(this.createGroup);
            }
		}

		/** 输入俱乐部名称响应事件 */
        protected onCreateInput(): void {
            let txt = this.createInput.text.trim();
			this.createInput.text = txt;
            this.createConfirmBtn.enabled = txt.length && txt.length > 0;
            this.createConfirmBtn.setState = this.createConfirmBtn.enabled?'up':'disabled';
        }

		/** 创建一个俱乐部 */
        private createClub(): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            this.createConfirmBtn.enabled = false;
            this.createConfirmBtn.setState = 'disabled';
            ClubController.getInstance().createClub(this.createInput.text).then(() => {
                this.onCreateSuccess(this.createInput.text);
            }).catch((errorCode) => {
                let msg = "";
                switch (errorCode) {
					case "name_length":
                        msg = "home_lbl_name_length";
                        break;
                    case "name_empty":
                        msg = "home_lbl_name_empty";
                        break;
                    case "name_character":
                        msg = "home_lbl_name_character";
                        break;
                    case "name_illegal":
                        msg = "home_lbl_name_illegal";
                        break;
                    case "name_exists":
                        msg = "home_lbl_name_exists";
                        break;
                }
                this.showCreateError(LanguageUtil.translate(msg));
            });
        }

		/** 创建俱乐部成功回调
         * @param clubName {string} 俱乐部名称
         */
		private onCreateSuccess(clubName:string):void
		{
			let createdClubNum = (ClubModel.getInstance().getCreatedClubNum() + 1) || 1;
			ClubController.getInstance().getClubList(ClubModel.ClubType_Created, createdClubNum).then(() =>
			{
				let clubInfo = ClubModel.getInstance().getCreatedClubByName(clubName);
				this.showCreateGroup(null);
                let tipData = new TipMsgInfo();
                tipData.msg = [
                    { text: LanguageUtil.rePlaceLanguage("home_lbl_create_club","%s",this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text.trim(), textColor: enums.ColorConst.White }
                ];
                if (clubInfo) {
                    tipData.confirmText = LanguageUtil.translate("club_lbl_manage");
                    tipData.thisObj = this;
                    tipData.comfirmCallBack = ()=> {
						CommonLoadingUI.getInstance().start();
						GlobalConfig.setClubId(clubInfo.id)
						.then(()=>{
							CommonLoadingUI.getInstance().stop();
							MediatorManager.openMediator(Mediators.Mediator_LeftBar,true);
							MediatorManager.openMediator(Mediators.Mediator_PCCreatedRoomList);
							ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn, "");
						}).catch((e)=>{
							CommonLoadingUI.getInstance().stop();
							DebugUtil.debug(e + "进入俱乐部失败");
						});
                    };
				}
				else
				{
                    tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
                    tipData.thisObj = null;
                    tipData.comfirmCallBack = null;
                }
				MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
			}).catch(() => {
                this.showCreateGroup(null);
                let tipData = new TipMsgInfo();
                tipData.msg = [
                    { text: LanguageUtil.rePlaceLanguage("home_lbl_create_club","%s",this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text.trim(), textColor: enums.ColorConst.LightGray }
                ];
                tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
                tipData.thisObj = null;
                tipData.comfirmCallBack = null;
                MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
            });
		}

		/** 按钮圈旋转*/
        protected showCirclerun():void
        {
			this.btnCircle.rotation = 0;
			CTween.get(this.btnCircle,{loop:true}).to({rotation:-360},4000);
        }

		/** 显示创建俱乐部动画效果 */
        protected showCreateEffect(show: boolean = true): void {
            if (show) {
                if (this.intervalObj["spinImg"]) {
                    clearInterval(this.intervalObj["spinImg"]);
                }
                this.intervalObj["spinImg"] = setInterval(() => {
                    this.spinImg.rotation = (this.spinImg.rotation + 3) % 360 - 180;
                }, 50);
                for (let i = 0; i < 9; i++) {
                    let img = this["shineImg" + i];
                    this.shineImg(img, true);
                }
            } else {
                if (this.intervalObj["spinImg"]) {
                    clearInterval(this.intervalObj["spinImg"]);
                }
                for (let i = 0; i < 9; i++) {
                    let img = this["shineImg" + i];
                    this.shineImg(img, false);
                }
            }
        }

		/** 星型图标动画 */
        protected shineImg(img: eui.Image, show: boolean = true): void {
            if (show) {
                let w = this.shineGroup.width;
                let h = this.shineGroup.height;
                img.scaleX = img.scaleY = Math.random() * 1 + 0.5;
                img.rotation = Math.random() * 360 - 180;
                img.x = Math.random() * w;
                img.y = h - Math.random() * Math.sin(img.x * Math.PI / w) * h;
                img.alpha = 0;
                CTween.removeTweens(img);
                CTween.get(img)
                    .wait(Math.random() * 800)
                    .to({ alpha: 1 }, 600)
                    .to({ alpha: 0 }, 400)
                    .call(() => {
                        this.shineImg(img);
                    }, this);
            } else {
                CTween.removeTweens(img);
            }
        }

		/** 显示create错误*/
		private showCreateError(params:string):void
		{
			this.createErrorMsg.text = LanguageUtil.translate(params);
            this.createTipGroup.alpha = 1;
            this.createTipGroup.visible = true;
            CTween.get(this.createTipGroup).wait(1500).to({
                alpha: 0
            }, 1500).call(() => {
                this.createTipGroup.visible = false;
                this.createTipGroup.alpha = 1;
                this.createErrorMsg.text = "";
            }, this);
		}

// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.listLoader.dispose();
			this.listLoader = null;
			this.showCreateGroup(null);
			CTween.removeTweens(this.createTipGroup);
			CTween.removeTweens(this.btnCircle);
			super.dispose();
		}
	}
}