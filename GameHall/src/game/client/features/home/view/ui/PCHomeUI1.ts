module game
{
	export class PCHomeUI1 extends HomeBaseUI
	{
// ---------------------------------- 声明 ----------------------------------
		public constructor()
		{
			super();
			// this.skinName = SystemPath.skin_path + "home/homeSkin.exml";
		}
		/** 没有最近俱乐部提示组*/
		private tipGroup:eui.Group;
		/** 最近俱乐部组*/
		private listClubGroup:eui.Group;
		/** 最近加入的俱乐部*/
		private joinClub0:eui.ALabel;
		private joinClub1:eui.ALabel;
		private joinClub2:eui.ALabel;
		/** 最近创建的俱乐部*/
		private createClub0:eui.ALabel;
		private createClub1:eui.ALabel;
		private createClub2:eui.ALabel;
		/** 加入俱乐部按钮圈 */
		private joinBtn_circle:eui.Image;
		/** 创建俱乐部按钮圈 */
		private createBtn_circle:eui.Image;

        /** 创建的俱乐部统计*/
        private createdStatistics:eui.Group;
		/** 今日投注率线 */
		private betBar:eui.Image;
		/** 今日派彩率线 */
		private payoutBar:eui.Image;
		/** 今日投注率文本 */
		private betALabel:eui.ALabel;
		/** 今日派彩率文本 */
		private payoutALabel:eui.ALabel;

        /** 加入的俱乐部统计*/
        private joinedStatistics:eui.Group;
        /** 今日下注数额*/
        private betLabel:eui.ALabel;
        private betNum:eui.ALabel;
        /** 今日筹码转入*/
        private chipGetLabel:eui.ALabel;
        private chipGet:eui.ALabel;
        /** 今日筹码转出*/
        private chipOutLabel:eui.ALabel;
        private chipOut:eui.ALabel;

        private numArr = ["0","1","2","3","4","5","6","7","8","9"];
        private gameTypeLabel:eui.ALabel;
        private anchorNumLabel:eui.ALabel;
        private roomNumLabel:eui.ALabel;

// ---------------------------------- 初始化 ----------------------------------

		public initSetting(): void
		{
			super.initSetting();
			this.showCirclerun();
			this.tipGroup.visible = false;
			this.currentClub.visible = false;
            this.lockGroup.visible = false;
            // this.clubIcon.mask = this.iconMask;
            this.showJoinGroup(null);
			this.showCreateGroup(null);
            // this.gameTypeLabel.text = LanguageUtil.translate("global_lbl_room_nums");
            // this.anchorNumLabel.text = LanguageUtil.translate("global_lbl_online_anchor");
            // this.roomNumLabel.text = LanguageUtil.translate("global_lbl_game_type");
		}

        /** 注册事件监听器 */
        protected initListener(mediator: HomeMediator): void
        {
            super.initListener(mediator);
            for(let i = 0; i < 3; i++)
            {
               	this.registerEvent(this["createClub" + i], egret.TouchEvent.TOUCH_TAP, mediator.openCreatedClub,mediator);
	            this.registerEvent(this["joinClub" + i], egret.TouchEvent.TOUCH_TAP, (e)=>{
			        SoundPlayerNew.playEffect(SoundConst.click);
	                mediator.openJoinedClub.call(mediator, e.target.text);
	            },this);
            }
        }

// ---------------------------------- 刷新 ----------------------------------

		/** 有无俱乐部的显示切换*/
        protected showTip(b:boolean):void
        {
            this.tipGroup.visible = b;
            this.currentClub.visible = !b;
            this.createdStatistics.visible = !b;
        }

		/** 显示最近三个俱乐部 */
        protected updateRecentClub(arr): void {
            if(arr[0].length == 0)
            {
                this.createClub0.text = "——";
            }
            else
            {
                for(let i = 0; i < 3; i++)
                {
                    this["createClub" + i].text = arr[0][i] || "";
                }
            }
            if(arr[1].length == 0)
            {
                this.joinClub0.text = "——";
            }
            else
            {
                for(let i = 0; i < 3; i++)
                {
                    this["joinClub" + i].text = arr[1][i] || "";
                }
            }
        }
        /** 显示首页今日投注数据*/
        protected setClubData(data :any):void
        {   
            this.showJoinedStatistics(
                data.bet_total || 0,
                data.recharge_in_total || 0,
                data.recharge_out_total || 0
            );
        }

		/** 显示当前俱乐部信息 */
        protected showClub(clubInfo: ClubListInfo): void {
            super.showClub(clubInfo);
            this.joinedStatistics.visible = false;
            if (clubInfo && clubInfo.img) {
                this.setClubIcon(clubInfo.img);
            }
        }

		/** 显示joingroup */
        protected showJoinGroup(evt?: egret.TouchEvent): void {
            if (evt) {
                this.joinGroup.visible = true;
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.text = "";
                this.joinInput.addEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                LayerManager.getInstance().addUI(this.joinGroup, enums.LayerConst.LAYER_TOP);
            } else {
                this.joinGroup.visible = false;
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.removeEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                this.addChild(this.joinGroup);
            }
        }

		/** 显示创建group */
        protected showCreateGroup(evt?: egret.TouchEvent): void {
            if (evt) {
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

         /** 创建俱乐部成功回调
         * @param clubName {string} 俱乐部名称
         */
        protected onCreateSuccess(clubName: string): void
        {
            let createdClubNum = (ClubModel.getInstance().getCreatedClubNum() + 1) || 1;
            ClubController.getInstance().getClubList(ClubModel.ClubType_Created, createdClubNum).then(() => {
                let clubInfo = ClubModel.getInstance().getCreatedClubByName(clubName);
                this.showCreateGroup(null);
                let tipData = new TipMsgInfo();
                tipData.msg = [
                    { text: LanguageUtil.rePlaceLanguage("home_lbl_create_club","%s",this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text, textColor: enums.ColorConst.LightGray }
                ];
                if (clubInfo) {
                    tipData.confirmText = LanguageUtil.translate("club_lbl_manage");
                    tipData.thisObj = this;
                    tipData.comfirmCallBack = ()=> {
                        GlobalConfig.setClubId(clubInfo.id)
                        .then(()=>{
                            MediatorManager.openMediator(Mediators.Mediator_PCCreatedRoomList);
                            MediatorManager.openMediator(Mediators.Mediator_LeftBar,true);
                            ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn);
                        }).catch();
                    };
                } else {
                    tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
                    tipData.thisObj = null;
                    tipData.comfirmCallBack = null;
                }
                MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
            }).catch(() => {

            });
        }

         /** 加入俱乐部成功回调
         * @param clubId {number} 所加入俱乐部的ID
         */
        protected onJoinSuccess(clubId: any): void {
            let joinedClubNum = (ClubModel.getInstance().getJoinedClubNum() + 1) || 1;
            ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, joinedClubNum).then(() => {
                let clubInfo = ClubModel.getInstance().getJoinedClubById(+clubId);
                if (clubId) {
                    this.showJoinGroup(null);
                    let creatorName: string = clubInfo.creator_name;
                    let clubName: string = clubInfo.name;
                    let tipData = new TipMsgInfo();
                    let txt = LanguageUtil.rePlaceLanguage("home_lbl_join_club","%s",creatorName);
                    tipData.msg = [
                        { text: LanguageUtil.rePlaceLanguage(txt,"%s",clubName), textColor: enums.ColorConst.Golden }
                        // { text: LanguageUtil.translate("home_lbl_join_club_1"), textColor: enums.ColorConst.Golden },
                        // { text: creatorName, textColor: enums.ColorConst.LightGray },
                        // { text: LanguageUtil.translate("home_lbl_join_club_2"), textColor: enums.ColorConst.Golden },
                        // { text: clubName, textColor: enums.ColorConst.LightGray }
                    ];
                    tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
                    tipData.comfirmCallBack = ()=>{
                        GlobalConfig.setClubId(clubId)
                        .then(()=>{
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
                            }
                            else {
                                MediatorManager.openMediator(Mediators.Mediator_PCJoinedRoomList);
                                MediatorManager.openMediator(Mediators.Mediator_LeftBar,false);
                                ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn);
                            }
                        }).catch((e:Error)=>{
                            DebugUtil.debug(e.message + "订阅俱乐部失败");
                        });
                    };
                    tipData.thisObj = this;
                    MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
                } else {
                    DebugUtil.debug("获取俱乐部信息失败");
                }
            }).catch(() => {
                let msg = LanguageUtil.translate("login_lbl_invitation_code_error_tips");
                this.showJoinError(msg);
            });
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

		/** 输入邀请码响应事件 */
        protected onJoinInput(): void {
            let txt = this.joinInput.text;
            if(this.checkNumIllegal(txt))
			{
				this.joinInput.text = txt.slice(0,-1);
			}
            this.joinConfirmBtn.enabled = txt.length && txt.length > 0;
            this.joinConfirmBtn.setState = this.joinConfirmBtn.enabled?'up':'disabled';
        }

		/** 输入俱乐部名称响应事件 */
        protected onCreateInput(): void {
            let txt = this.createInput.text.trim();
            this.createInput.text = txt;
            this.createConfirmBtn.enabled = txt.length && txt.length > 0;
            this.createConfirmBtn.setState = this.createConfirmBtn.enabled?'up':'disabled';
        }

		/** 显示joinError */
        protected showJoinError(param: string): void
        {
            this.joinTipLabel.text = "";
            this.joinTipLabel.text = param;
            this.joinTipGroup.alpha = 1;
            this.joinTipGroup.visible = true;
            CTween.get(this.joinTipGroup).wait(2500).to({
                alpha: 0
            }, 500).call(() => {
                this.joinTipGroup.visible = false;
                this.joinTipGroup.alpha = 1;
                this.joinTipLabel.text = "";
            }, this);
        }

		/** 显示create错误 */
        protected showCreateError(params: string): void {
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
					//包含除数字之外的字符
					return true;
				}
			}
			return false;
		}

		/** 按钮圈旋转*/
        protected showCirclerun():void
        {
			this.createBtn_circle.rotation = 0;
			this.joinBtn_circle.rotation = 0;
			CTween.get(this.createBtn_circle,{loop:true}).to({rotation:-360},4000);
			CTween.get(this.joinBtn_circle,{loop:true}).to({rotation:360},4000);
        }

		// /** 刷新投注率和派彩率的线*/
		// private showCreatedStatistics(bet,pay):void
		// {
		// 	this.betBar.width = bet;
		// 	this.betALabel.text = bet+"%";
		// 	this.payoutBar.width = pay;
		// 	this.payoutALabel.text = pay+"%";
		// }

        /** 刷新投注数额和筹码转入转出
         * @param bet —— 今日投注数额
         * @param chipGet —— 今日筹码转入
         * @param chipOut —— 今日筹码转出
        */
		private showJoinedStatistics(bet:number, chipGet:number, chipOut:number):void
		{
            this.betNum.text = NumberUtil.getSplitNumStr(bet, 3);
			this.chipGet.text = NumberUtil.getSplitNumStr(chipGet, 3);
			this.chipOut.text = NumberUtil.getSplitNumStr(chipOut, 3);
            this.showSTatistisc();
		}

        /** 显示统计文本位置*/
        private showSTatistisc():void
        {
            let str1 = new eui.Label();
            str1.text = this.betNum.text;
            let str2 = new eui.Label();
            str2.text = this.chipGet.text;
            let str3 = new eui.Label();
            str3.text = this.chipOut.text;
            // this.betLabel.right = this.betNum.textWidth + 10;
			// this.chipGetLabel.right = this.chipGet.textWidth + 10;
			// this.chipOutLabel.right = this.chipOut.textWidth + 10;
            this.betLabel.text = LanguageUtil.translate("H5_home_lbl_betting_today");
            this.chipGetLabel.text = LanguageUtil.translate("H5_home_lbl_today_chips_into");
            this.chipOutLabel.text = LanguageUtil.translate("H5_home_lbl_today_chips_out");
            this.betLabel.right = str1.textWidth + 10;
			this.chipGetLabel.right = str2.textWidth + 10;
			this.chipOutLabel.right = str3.textWidth + 10;
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
                this.clubIcon.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        }

// ---------------------------------- dispose ----------------------------------

        public dispose(): void {
			CTween.removeTweens(this.createTipGroup);
			CTween.removeTweens(this.createBtn_circle);
			CTween.removeTweens(this.joinBtn_circle);
            super.dispose();
        }
	}
}