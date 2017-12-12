module game
{
	export class PCNavbarUI1 extends BaseUI
	{
		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "navbar/navbarSkin.exml";
		}
		private logo: eui.Image;
		/** 主group*/
		private mainGroup:eui.Group;
		/** 用户头像*/
		private avatar:eui.Image;
		/** 用户昵称*/
		private userName:eui.ALabel;
		/** 用户房卡*/
		private roomCard:eui.ALabel;
		/** 房卡图标*/
		private cardIcon:eui.Image;
		/** 筹码图标*/
		private chipIcon:eui.Image;
		/** 主页按钮*/
		private homeBtn:eui.AButton;
		/** 加入的俱乐部的按钮*/
		private joinBtn:eui.AButton;
		/** 创建的俱乐部的按钮*/
		private createBtn:eui.AButton;
		/** 二维码按钮*/
		private imgQR:eui.AImage;
		/** 加图标*/
		private add:eui.AButton;
		/** 用户信息组*/
		private userGroup:eui.Group;

		/** 背景音乐开*/
		private musicOnBtn:eui.AButton;
		/** 背景音乐关*/
		private musicOffBtn:eui.AButton;
		/** 音效开*/
		private videoOnBtn:eui.AButton;
		/** 音效关*/
		private videoOffBtn:eui.AButton;
		/** 多语言按钮*/
		private multilingualBtn:eui.AButton;
		/** 聊天按钮*/
		private chatBtn:eui.AButton;
		/** 设置区覆盖提示文字*/
		private coveredLabel:eui.ALabel;
		/** 设置区覆盖提示group*/
		private coveredGroup:eui.Group;
		/**新消息红点 */
		private redPoint: eui.Image;

// ---------------------------------- 初始化 ----------------------------------

		/**组件创建完成初始化数据等操作 */
		public initSetting(): void {
			super.initSetting();
			this.updateAll();
			this.setAvatarMask();
			this.initecode();
			this.updateBtnState("homeBtn");
			this.musicOnBtn.visible = true;
			this.musicOffBtn.visible = false;
			this.videoOnBtn.visible = true;
			this.videoOffBtn.visible = false;
			this.coveredGroup.visible = false;
			this.showLogo();
		}
		private showLogo()
		{
			if (!GlobalConfig.poweredby_icon)
			{
				this.logo.source = "login_pic_uee_pc_png";
			}
			else
			{
				DebugUtil.debug("top条请求logo "+GlobalConfig.defaultUrl + GlobalConfig.poweredby_icon);
				com.LoadManager.getInstance().getResByUrl(GlobalConfig.defaultUrl + GlobalConfig.poweredby_icon, (t: egret.Texture) => {
					if (t) {
						this.logo.source = t;
						// let w = t.textureWidth ,h = t.textureHeight;
						// this.logo.height = h*(75/w);
					}
					else {
						this.logo.source = "login_pic_uee_pc_png";
					}
				}, this, com.ResourceItem.TYPE_IMAGE);
			}
		}
		/** 初始化变量*/
		private initecode():void
		{
		}
// ---------------------------------- 接收Mediator通知 ----------------------------------

		/** 收到mediator的通知 */
		public onMediatorCommand(type: PCNavbarCommands, params: any = null): void {
			switch (type) {
				case PCNavbarCommands.initListener:
					this.initListener(params);
					break;
				case PCNavbarCommands.updateInfo:
					this.updateAll();
					break;
				case PCNavbarCommands.changeBtn:
					this.updateBtnState(params);
					break;
				case PCNavbarCommands.changeIcon:
					this.changeIcon(params);
					break;
				case PCNavbarCommands.changeBalance:
					this.changeBalance(params);
					break;
				case PCNavbarCommands.showMainGroup:
					this.showMainGroup(params);
					break;
				case PCNavbarCommands.mineMoney:
					this.refreshChip(params);
					break;
				case PCNavbarCommands.showNewMsg:
					this.redPoint.visible = params;
					break;
				case PCNavbarCommands.showRoomCard:
					this.updateRoomCard(ClubModel.getInstance().getRoomCardNum());
					break;
			}
		}

// ---------------------------------- 监听事件 ----------------------------------

		/** 注册事件监听器 */
		protected initListener(mediator: PCNavbarMediator): void {
			this.registerEvent(this.homeBtn, egret.TouchEvent.TOUCH_TAP, this.touchHome,this);
			this.registerEvent(this.joinBtn, egret.TouchEvent.TOUCH_TAP, this.touchJoin,this);
			this.registerEvent(this.createBtn, egret.TouchEvent.TOUCH_TAP, this.touchCreate,this);
			this.registerEvent(this.userGroup, egret.TouchEvent.TOUCH_TAP, this.openMineInfo,this);

			this.registerEvent(this.musicOnBtn, egret.TouchEvent.TOUCH_TAP, this.isOpenMusic,this);
			this.registerEvent(this.musicOffBtn, egret.TouchEvent.TOUCH_TAP, this.isOpenMusic,this);
			this.registerEvent(this.videoOnBtn, egret.TouchEvent.TOUCH_TAP, this.isOpenVoice,this);
			this.registerEvent(this.videoOffBtn, egret.TouchEvent.TOUCH_TAP, this.isOpenVoice,this);
			this.registerEvent(this.multilingualBtn, egret.TouchEvent.TOUCH_TAP, this.multilingual,this);
			this.registerEvent(this.chatBtn, egret.TouchEvent.TOUCH_TAP, this.openChat,this);

			this.registerEvent(this.musicOnBtn, mouse.MouseEvent.MOUSE_OVER, ()=>{this.showCoveredGroup(196)},this);
			this.registerEvent(this.musicOnBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup,this);
			this.registerEvent(this.musicOffBtn, mouse.MouseEvent.MOUSE_OVER, ()=>{this.showCoveredGroup(196)},this);
			this.registerEvent(this.musicOffBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup,this);
			this.registerEvent(this.videoOnBtn, mouse.MouseEvent.MOUSE_OVER, ()=>{this.showCoveredGroup(134)},this);
			this.registerEvent(this.videoOnBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup,this);
			this.registerEvent(this.videoOffBtn, mouse.MouseEvent.MOUSE_OVER, ()=>{this.showCoveredGroup(134)},this);
			this.registerEvent(this.videoOffBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup,this);
			this.registerEvent(this.multilingualBtn, mouse.MouseEvent.MOUSE_OVER, ()=>{this.showCoveredGroup(75)},this);
			this.registerEvent(this.multilingualBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup,this);
			this.registerEvent(this.chatBtn, mouse.MouseEvent.MOUSE_OVER, ()=>{this.showCoveredGroup(14)},this);
			this.registerEvent(this.chatBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup,this);

			//点击logo跳转
			this.registerEvent(this.logo, egret.TouchEvent.TOUCH_TAP, ()=>{
				window.open(GlobalConfig.poweredby_icon_url);
			},this);
		}

// ---------------------------------- 刷新 ----------------------------------

		/** 刷新个人信息*/
		private updateAll():void
		{
			let model = PersonalInfoModel.getInstance();
			this.updateUserFace(model.avatar);
			this.updateNickName(model.nick);
			this.updateRoomCard(ClubModel.getInstance().getRoomCardNum());
			this.updateChips(ClubModel.getInstance().getPayerBalance(model.user_id));
		}
		/** 刷新头像*/
		private updateUserFace(texture:egret.Texture):void
		{
			if(texture) this.avatar.source = texture;
		}
		/** 头像遮罩*/
		private setAvatarMask():void
		{
			let w = this.avatar.width;
			let H = this.avatar.height;
            let mask: egret.Shape = new egret.Shape();
            mask.graphics.beginFill(0xff0000);
            mask.graphics.drawCircle(0, 0, w / 2);
            mask.x = w / 2;
            mask.y = H / 2;
            this.userGroup.addChild(mask);
            this.avatar.mask = mask;
		}
		/** 刷新昵称*/
		private updateNickName(nick):void
		{
			this.userName.text = nick;
		}
		/** 刷新房卡*/
		private updateRoomCard(card:number):void
		{
			if(this.cardIcon.visible)this.roomCard.text = NumberUtil.getSplitNumStr(card*100 || 0);
			// this.cardIcon.x = 312 - this.roomCard.textWidth - 10;
			this.add.x = 260 + this.roomCard.textWidth;
			if(this.add.x >= 380) this.add.x = 380;
		}
		/** 刷新筹码*/
		private updateChips(chips:number):void
		{
			if(this.chipIcon.visible)this.roomCard.text = NumberUtil.getSplitNumStr(chips);
			// this.chipIcon.x = 317 - this.roomCard.textWidth - 10;
			// if(this.chipIcon.x <= 211) this.chipIcon.x = 211;
		}
		/** 主按钮状态切换
		 * @param 字符串 homeBtn 切换成主页按钮选中状态
		 * @param 字符串 joinBtn 切换成加入的按钮选中状态
		 * @param 字符串 createBtn 切换成创建的按钮选中状态
		 * @param 不传参默认为所有按钮都未选中状态，房间列表需要
		*/
		private updateBtnState(str:string):void
		{
			switch(str)
			{
				case "homeBtn":
					this.homeBtn.setState = "down";
					this.joinBtn.setState = "up";
					this.createBtn.setState = "up";
					break;
				case "joinBtn":
					this.homeBtn.setState = "up";
					this.joinBtn.setState = "down";
					this.createBtn.setState = "up";
					break;
				case "createBtn":
					this.homeBtn.setState = "up";
					this.joinBtn.setState = "up";
					this.createBtn.setState = "down";
					break;
					default:
					this.homeBtn.setState = "up";
					this.joinBtn.setState = "up";
					this.createBtn.setState = "up";
					break;
			}
		}

		/** 切换图标
		 * @param chip 显示 筹码图标和筹码
		 * @param card 显示 房卡图标和房卡
		*/
		private changeIcon(type:string):void
		{
			let model = PersonalInfoModel.getInstance();
			switch (type)
			{
				case "chip":
					this.chipIcon.visible = true;
					this.cardIcon.visible = false;
					this.add.visible = false;
					this.updateChips(ClubModel.getInstance().getPayerBalance(model.user_id));
					break;
				case "card":
					this.chipIcon.visible = false;
					this.cardIcon.visible = true;
					this.add.visible = true;
					this.updateRoomCard(ClubModel.getInstance().getRoomCardNum());
					// if(GlobalConfig.clubId && PersonalInfoModel.getInstance().user_id)
					// {
					// 	ClubController.getInstance().unsubscribeAccount(GlobalConfig.clubId, PersonalInfoModel.getInstance().user_id);
					// }
					break;
			}
		}

		/** 刷筹码*/
		private changeBalance(balance:any):void
		{
			let model = PersonalInfoModel.getInstance();
			this.updateChips(ClubModel.getInstance().getPayerBalance(model.user_id));
		}

		/** 刷新筹码*/
		private refreshChip(params:number):void
		{
			this.roomCard.text = NumberUtil.getSplitNumStr(params);
		}

		/** 显示或隐藏导航栏
		 * b   显示或隐藏
		*/
		private showMainGroup(b:boolean):void
		{
			this.mainGroup.visible = b;
		}

		/** 设置显示覆盖group*/
		private showCoveredGroup(right:number):void
		{
			switch(right)
			{
				case 196:
					this.coveredLabel.text = "音乐";
					break;
				case 134:
					this.coveredLabel.text = "音效";
					break;
				case 75:
					this.coveredLabel.text = "语言";
					break;
				case 14:
					this.coveredLabel.text = "消息";
					break;
			}
			this.coveredGroup.right = right;
			this.coveredGroup.visible = true;
		}

		/** 隐藏覆盖group*/
		private hidenCoveredGroup():void
		{
			this.coveredGroup.visible = false;
		}

// ---------------------------------- 用户操作 ----------------------------------

		/** 点击主页按钮*/
		private touchHome(e:egret.TouchEvent):void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.updateBtnState("homeBtn");
			if(!MediatorManager.isMediatorOpen(Mediators.Mediator_Home.name))
			{
				MediatorManager.openMediator(Mediators.Mediator_Home);
			}
		}

		/** 点击加入的按钮*/
		private touchJoin(e:egret.TouchEvent):void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.updateBtnState("joinBtn");
			if(!MediatorManager.isMediatorOpen(Mediators.Mediator_PCJoinedClub.name))
			{
				MediatorManager.openMediator(Mediators.Mediator_PCJoinedClub);
			}
		}

		/** 点击创建的按钮*/
		private touchCreate(e:egret.TouchEvent):void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.updateBtnState("createBtn");
			if(!MediatorManager.isMediatorOpen(Mediators.Mediator_PCCreatedClub.name))
			{
				MediatorManager.openMediator(Mediators.Mediator_PCCreatedClub);
			}
		}

		/**打开PC个人中心*/
		protected openMineInfo():void{
			SoundPlayerNew.playEffect(SoundConst.click);
			MediatorManager.openMediator(Mediators.Mediator_PCMineMediator,PCMineMediator.Type_User);
		}

		/** 开启背景音乐*/
		private isOpenMusic():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			let b = this.musicOnBtn.visible?false:true;
			this.musicOnBtn.visible = b;
			this.musicOffBtn.visible = !b;

			SoundPlayerNew.setMusicOpen(b);
			// MediatorManager.openMediator(Mediators.Mediator_VideoLoading);
		}

		/** 开启语音*/
		private isOpenVoice():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			let b = this.videoOnBtn.visible?false:true;
			this.videoOnBtn.visible = b;
			this.videoOffBtn.visible = !b;

			SoundPlayerNew.setSoundOpen(b);
		}

		/** 打开多语言设置*/
		private multilingual():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			if(GlobalConfig.isMobile)
			{
				Mediators.Mediator_MultiLanguage.layer = enums.LayerConst.LAYER_UI;
			}
			else
			{
				Mediators.Mediator_MultiLanguage.layer = enums.LayerConst.LAYER_TIP;
			}
			MediatorManager.openMediator(Mediators.Mediator_MultiLanguage);
		}

		/** 打开聊天*/
		private openChat():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			MediatorManager.openMediator(Mediators.Mediator_NotifyMediatorPC);
		}

		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void
		{
			super.dispose();
		}
	}
}