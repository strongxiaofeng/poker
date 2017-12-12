module game {

    export class HomeBaseUI extends BaseUI {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "home/homeSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        // INFO GROUP

        /** 顶部信息栏 */
        protected infoGroup: eui.Group;
        /** 用户头像 */
        protected avatar: eui.Image;
        /** 用户昵称 */
        protected nickName: eui.ALabel;
        /** 房卡icon */
        protected cardIcon: eui.Image;
        /** 房卡数量label */
        protected cardLabel: eui.ALabel;
        /** 房卡按钮 */
        protected cardBtn: eui.AButton;

        /** 无俱乐部提示 */
        protected tipLabel: eui.ALabel;
        /** 当前俱乐部信息group */
        protected currentClub: eui.Group;
        /** 俱乐部Icon */
        protected clubIcon: eui.Image;
        /** 俱乐部徽标框 */
        protected clubDecoration: eui.Image;
        /** 俱乐部名称Label */
        protected clubName: eui.ALabel;
        /** 俱乐部图标组 */
        protected clubFace: eui.Group;
        /** 俱乐部锁组件*/
        protected lockGroup: eui.Group;
        /** 俱乐部徽标遮罩*/
        protected iconMask: eui.Image;

        // 我加入的俱乐部

        /** 我加入的俱乐部 */
        protected joinedClubInfo: eui.Group;
        /** 筹码余额Label */
        protected chipMoney: eui.BitmapLabel;
        /** 创建人Label */
        protected creator: eui.ALabel;
        /** 房间数量Label */
        protected roomNum: eui.ALabel;
        /** 在线主播Label */
        protected anchorNum: eui.ALabel;
        /** 游戏类型Label */
        protected gameType: eui.ALabel;

        // 我创建的俱乐部

        /** 我创建的俱乐部 */
        protected myClubInfo: eui.Group;
        /** 房间数量 */
        protected myClubRoomNum: eui.ALabel;
        /** 在线玩家 */
        protected myClubOnlinePlayer: eui.ALabel;
        /** 今日盈余 */
        protected myClubProfit: eui.ALabel;
        /** 游戏类型 */
        protected myClubGameType: eui.ALabel;
        /** 玩家总数 */
        protected myClubTotalPlayer: eui.ALabel;
        /** 在线主播 */
        protected myClubAnchor: eui.ALabel;
        /** 房卡消耗 */
        protected myClubCard: eui.ALabel;

        /** 加入俱乐部Button */
        protected joinBtn: eui.AButton;
        /** 创建俱乐部Button */
        protected creatBtn: eui.AButton;

        // JOIN Group

        /** 加入俱乐部group */
        protected joinGroup: eui.Group;
        /** 输入邀请码group */
        protected joinInputGroup: eui.Group;
        /** 邀请码输入框 */
        protected joinInput: eui.EditableText;
        /** 取消join按钮 */
        protected joinCancelBtn: eui.AButton;
        /** 确定join按钮 */
        protected joinConfirmBtn: eui.AButton;
        /** join错误提示 */
        protected joinTipGroup: eui.Group;
        /** join错误提示文字 */
        protected joinTipLabel: eui.ALabel;

        // CREATE GROUP

        /** 创建俱乐部group */
        protected createGroup: eui.Group;
        /** 输入俱乐部名称group */
        protected createInputGroup: eui.Group;
        /** 俱乐部名称输入框 */
        protected createInput: eui.EditableText;
        /** 创建俱乐部取消按钮 */
        protected createCancelBtn: eui.AButton;
        /** 创建俱乐部确认按钮 */
        protected createConfirmBtn: eui.AButton;
        /** 创建俱乐部错误提示 */
        protected createTipGroup: eui.Group;
        /** 创建俱乐部错误提示label */
        protected createErrorMsg: eui.ALabel;

        /** 旋转动画img */
        protected spinImg: eui.Group;
        /** 闪烁动画group */
        protected shineGroup: eui.Group;
        // shineImg0
        /** 登陆进入游戏后的提示*/
        private loginJoinTip:eui.Group;
        /** 登陆进入游戏后的提示文本*/
        private loginJoinTipLabel:eui.ALabel;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.myClubInfo.visible = false;
            this.joinedClubInfo.visible = false;
            this.clubIcon.mask = this.iconMask;
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: HomeUICommands, params: any = null): void {
            switch (type) {
                case HomeUICommands.initListener:
                    this.initListener(params);
                    break;
                case HomeUICommands.showAvatar:
                    this.showAvatar();
                    break;
                case HomeUICommands.showNickName:
                    this.showNickName(params);
                    break;
                case HomeUICommands.setCardLabel:
                    this.setCardLabel(params);
                    break;
                case HomeUICommands.showClub:
                    this.showClub(params);
                    break;
                case HomeUICommands.lockedShowOrHide:
                    this.lockedShowOrHide(params);
                    break;
                case HomeUICommands.updateRooms:
                    this.updateRooms(params);
                    break;
                case HomeUICommands.updateOnlinePlayer:
                    this.updateOnlinePlayer(params);
                    break;
                case HomeUICommands.updateRecentClub:
                    this.updateRecentClub(params);
                    break;
                case HomeUICommands.updateClubGameType:
                    this.updateClubGameType(params);
                    break;
                case HomeUICommands.updateClubChips:
                    this.chipMoney.text = NumberUtil.getSplitNumStr(params);
                    break;
                case HomeUICommands.showLoginErrTip:
                    this.showInvitationTip(params);
                    break;
                case HomeUICommands.setClubData:
                    this.setClubData(params);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: HomeMediator): void {
            this.registerEvent(this.joinBtn, egret.TouchEvent.TOUCH_TAP, this.showJoinGroup, this);
            this.registerEvent(this.creatBtn, egret.TouchEvent.TOUCH_TAP, this.showCreateGroup, this);
            this.registerEvent(this.joinCancelBtn, egret.TouchEvent.TOUCH_TAP, () => {
                SoundPlayerNew.playEffect(SoundConst.click);
                this.showJoinGroup(null); }, this);
            this.registerEvent(this.createCancelBtn, egret.TouchEvent.TOUCH_TAP, () => {
			    SoundPlayerNew.playEffect(SoundConst.click);
                this.showCreateGroup(null); }, this);
            this.registerEvent(this.cardBtn, egret.TouchEvent.TOUCH_TAP, this.moreCard, this);
            this.registerEvent(this.createConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.createClub, this);
            this.registerEvent(this.joinConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.joinClub, this);
            this.registerEvent(this.clubDecoration, egret.TouchEvent.TOUCH_TAP, mediator.openClub, mediator);
            this.registerEvent(this.clubIcon, egret.TouchEvent.TOUCH_TAP, mediator.openClub, mediator);
            this.registerEvent(this.lockGroup, egret.TouchEvent.TOUCH_TAP, mediator.openClub, mediator);
        }

        /** 加入一个俱乐部 */
        protected joinClub(): void {
            this.joinConfirmBtn.enabled = false;
            this.joinConfirmBtn.setState = 'disabled';
            let txt = this.joinInput.text;
            let exp = /\d{8}/;
            if (!exp.test(txt)) {
                let msg = LanguageUtil.translate("login_lbl_invitation_code_error_tips");
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
                        tipData.comfirmCallBack = () => {
                            MediatorManager.closeMediator(Mediators.Mediator_Home.name);
                            MediatorManager.openMediator(Mediators.Mediator_Home);
                        };
                        tipData.thisObj = this;
						MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
                    } else {
                        this.onJoinSuccess(obj.id);
                    }
                }).catch((e:any) => {
                    let msg = LanguageUtil.translate("login_lbl_invitation_code_error_tips");
                    if(e == "owner_join")
                    {
                        msg = LanguageUtil.translate("home_lbl_invitaion_owner_join");
                    }
                    else if(e == "invitation_code_unavailable")
                    {
                        msg = LanguageUtil.translate("login_lbl_invitation_code_error_tips");
                    }
                    else
                    {
                        let js = JSON.parse(e);
                        if(js.message == "repeat_join")
                        msg = LanguageUtil.translate("home_lbl_invitaion_repeat_join");
                    }
                    this.showJoinError(msg);
                });
            }
        }

        /** 创建一个俱乐部 */
        private createClub(): void {
            this.createConfirmBtn.enabled = false;
            this.createConfirmBtn.setState = 'disabled';
            ClubController.getInstance().createClub(this.createInput.text.trim()).then(() => {
                this.onCreateSuccess(this.createInput.text.trim());
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
        protected onCreateSuccess(clubName: string): void {
            let createdClubNum = (ClubModel.getInstance().getCreatedClubNum() + 1) || 1;
            ClubController.getInstance().getClubList(ClubModel.ClubType_Created, createdClubNum).then(() => {
                let clubInfo = ClubModel.getInstance().getCreatedClubByName(clubName);
                this.showCreateGroup(null);
                let tipData = new TipMsgInfo();
                tipData.msg = [
                    { text: LanguageUtil.rePlaceLanguage("home_lbl_create_club","%s",this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text.trim(), textColor: enums.ColorConst.LightGray }
                ];
                if (clubInfo) {
                    tipData.confirmText = LanguageUtil.translate("club_lbl_manage");
                    tipData.thisObj = this;
                    tipData.comfirmCallBack = function () {
                        GlobalConfig.clubId = clubInfo.id;
                        MediatorManager.openMediator(Mediators.Mediator_HomeOwnerClub, Mediators.Mediator_Home);
                    };
                } else {
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
                        // { text: creatorName, textColor: enums.ColorConst.LightGray },
                        // { text: LanguageUtil.translate("home_lbl_join_club"), textColor: enums.ColorConst.Golden },
                        // { text: clubName, textColor: enums.ColorConst.LightGray }
                    ];
                    tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
                    tipData.comfirmCallBack = () => {
                        GlobalConfig.setClubId(clubId)
                            .then(() => {
                                MediatorManager.openMediator(Mediators.Mediator_ClubGames, Mediators.Mediator_Home);
                            }).catch((e: Error) => {
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

        // ---------------------------------- UI操作 ----------------------------------

        /** 显示玩家头像 */
        protected showAvatar(): void { }

        /** 设置头像圆形遮罩 */
        protected setAvatarMask(): void { }

        /** 显示玩家昵称 */
        protected showNickName(name: string): void { }

        /** 设置房卡数量 */
        protected setCardLabel(n: number = 0): void { }

        /** 更多房卡 */
        protected moreCard(event: egret.TouchEvent): void {
        }

        /** 显示最近三个俱乐部 */
        protected updateRecentClub(arr): void { }

        /** 是否显示锁 */
        protected lockedShowOrHide(b: boolean): void {
            this.lockGroup.visible = b;
        }

        /** 显示首页今日投注数据*/
        protected setClubData(data :any):void
        {  }

        /** 显示房间数 */
        protected updateRooms(str: string): void {
            if (this.roomNum) this.roomNum.text = str;
            if (this.myClubRoomNum) this.myClubRoomNum.text = str;
        }

        /** 显示在线人数 */
        protected updateOnlinePlayer(str: string): void {
            if (this.myClubOnlinePlayer) this.myClubOnlinePlayer.text = str;
        }

        /** 显示邀请码登录提示*/
        protected showInvitationTip(params: any): void {
            switch (params.code) {
                case 200:
                    /** 直接进入俱乐部*/
                    if (params.club) {
                        GlobalConfig.setClubId(params.club.id).then(() => {
                            if (GlobalConfig.isMobile) {
                                MediatorManager.openMediator(Mediators.Mediator_ClubGames, Mediators.Mediator_Home);
                            } else {
                                this.enterJoinedClub();
                            }
                        }).catch((e) => {
                            DebugUtil.debug("进入俱乐部失败" + e);
                        });
                    }
                    break;
                case 400:
                    switch (params.message) {
                        case "owner_join":
                            if (params.club) {
                                /** 通知UI 加入已加入的俱乐部*/
                                this.showTipGroup(this.loginJoinTip, this.loginJoinTipLabel, LanguageUtil.translate("home_lbl_invitaion_repeat_join"));
                                /** 进入俱乐部*/
                                GlobalConfig.setClubId(params.club.id).then(() => {
                                    if (GlobalConfig.isMobile) {
                                        MediatorManager.openMediator(Mediators.Mediator_ClubGames, Mediators.Mediator_Home);
                                    } else {
                                        this.enterJoinedClub();
                                    }
                                }).catch((e) => {
                                    DebugUtil.debug("进入俱乐部失败" + e);
                                });
                            } else {
                                /** 通知UI 此俱乐部是您创建的*/
                                this.showTipGroup(this.loginJoinTip, this.loginJoinTipLabel, LanguageUtil.translate("home_lbl_invitaion_owner_join"));
                            }
                            break;
                        case "invitation_code_unavailable":
                            /** 通知UI 邀请码错误或已失效*/
                            this.showTipGroup(this.loginJoinTip, this.loginJoinTipLabel, LanguageUtil.translate("login_lbl_invitation_code_error_tips"));
                            break;
                        case "repeat_join":
                            /** 进入俱乐部*/
                            GlobalConfig.setClubId(params.club.id).then(() => {
                                if (GlobalConfig.isMobile) {
                                    MediatorManager.openMediator(Mediators.Mediator_ClubGames, Mediators.Mediator_Home);
                                } else {
                                    this.enterJoinedClub();
                                }
                            }).catch((e) => {
                                DebugUtil.debug("进入俱乐部失败" + e);
                            });
                            this.showTipGroup(this.loginJoinTip, this.loginJoinTipLabel, LanguageUtil.translate("home_lbl_invitaion_repeat_join"));
                            break;
                    }
            }
        }

        private enterJoinedClub():void
        {
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
                MediatorManager.openMediator(Mediators.Mediator_BaccaratGuide);
                MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator,null);
                return;
            }
            if(this.timeoutObj["enterJoinedClub"]){
                clearTimeout(this.timeoutObj["enterJoinedClub"]);
            }
            this.timeoutObj["enterJoinedClub"] = setTimeout(function() {
                MediatorManager.openMediator(Mediators.Mediator_PCJoinedRoomList);
                MediatorManager.openMediator(Mediators.Mediator_LeftBar,false);
                ClubController.getInstance().sendNotification(NotifyConst.Notify_PCNavChangeBtn);
            }, 200);
        }

        /** 显示俱乐部游戏类型 */
        protected updateClubGameType(params: Array<string>): void {
            let text = LanguageUtil.translate("global_lbl_no");
            let types = [];
            params.forEach((v) => {
                switch (v.toLowerCase()) {
                    case "baccarat":
                        types.push(LanguageUtil.translate("global_lbl_baccarat"));
                        break;
                    case "roulette":
                        types.push(LanguageUtil.translate("founder_btn_search_type_rt"));
                        break;
                    case "sicbo":
                        types.push(LanguageUtil.translate("founder_btn_search_type_sibo"));
                        break;
                    case "dragontiger":
                        types.push(LanguageUtil.translate("founder_btn_search_type_dt"));
                        break;
                }
            });
            text = types.join(",") || text;
            this.gameType.text = text;
            this.myClubGameType.text = text;
        }

        /** 显示当前俱乐部信息 */
        protected showClub(clubInfo: ClubListInfo): void {
            if (clubInfo) {
                this.myClubInfo.visible = clubInfo.creator + "" == PersonalInfoModel.getInstance().user_id;
                this.joinedClubInfo.visible = !this.myClubInfo.visible;
                // info
                this.clubName.text = clubInfo.name || "";
                this.creator.text = clubInfo.creator_name || "";
                this.myClubTotalPlayer.text = NumberUtil.getSplitNumStr(clubInfo.users * 100||0);
                this.anchorNum.text = "0";
                this.roomNum.text = "0";
                this.myClubRoomNum.text = "0";
                this.myClubOnlinePlayer.text = "0";
                this.showProfit(clubInfo.id);
                this.myClubAnchor.text = "0";
                this.myClubCard.text = Math.abs(clubInfo.room_card_used | 0) + "";
                this.showTip(false);
            } else {
                this.showTip(true);
            }
        }

        /** 显示今日盈余*/
        protected showProfit(id):void
        {
            DataCenterController.getInstance().getTodayStatistics(id).then((data: {
				surplus: number;
				bet: number;
				bet_count: number;
				balance: number;
				room_card_used: number
			}) => {
				this.myClubProfit.text = NumberUtil.getSplitNumStr(data.surplus,3);
			}).catch((e)=>{
				DebugUtil.debug( e + "请求今日盈余失败");
			});
        }

        /** 有无俱乐部的显示切换*/
        protected showTip(b: boolean): void {
            this.tipLabel.visible = b;
            this.currentClub.visible = !b;
        }

        /** 设置clubIcon */
        protected setClubIcon(url: string): void { }

        /** 显示joingroup */
        protected showJoinGroup(evt?: egret.TouchEvent): void { }

        /** 输入邀请码响应事件 */
        protected onJoinInput(): void { }

        /** 显示joinError */
        protected showJoinError(param: string): void { }

        /** 显示创建group */
        protected showCreateGroup(evt?: egret.TouchEvent): void { }

        /** 输入俱乐部名称响应事件 */
        protected onCreateInput(): void { }

        /** 显示create错误 */
        protected showCreateError(params: string): void { }

        /** group动画数组，用来dispose时*/
        private groupArr = [];
        /** 显示一个红色提示*/
        private showTipGroup(group:eui.Group, label:eui.ALabel, txt:string):void
        {
            label.text = "";
            label.text = txt;
            group.alpha = 1;
            group.visible = true;
            this.groupArr.push(group);
            CTweenManagerController.getInstance().startCTween(2,[group]);
            // CTween.get(group).wait(2500).to({
            //     alpha: 0
            // }, 500).call(() =>
			// {
            //     group.visible = false;
            //     group.alpha = 1;
			// 	label.text = "";
            //     CTween.removeTweens(group);
            // }, this);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            CTweenManagerController.getInstance().endAllCTween();
            // CTween.removeTweens(this.joinTipGroup);
            this.groupArr.forEach(element => {
                CTween.removeTweens(element);
            });
            this.showCreateGroup(null);
            this.showJoinGroup(null);
            super.dispose();
        }

    }

}