module game {

	export class GameController extends BaseController {

		public constructor() {
			super();
			this.initDtoListener();
		}

		private static instance: GameController;
		public static getInstance(): GameController {
			if (this.instance == null) {
				this.instance = new GameController();
			}
			return this.instance;
		}

		public initDtoListener(): void {
			TopicManager.getInstance().addSocketListener(TopicType.timestamp, this.onTimestamp, this); // 服务器时间
			TopicManager.getInstance().addSocketListener(TopicType.system_notify, this.onSystemNotify, this); // 系统消息

			//手动测试维护消息
			// setTimeout(()=> {
			// 	let data : topic.SystemNotify = new topic.SystemNotify();
			// 	data.snapshot = new topic.SystemNotifySnapshot();
			// 	data.snapshot.type = "maintenance_notify";
			// 	this.onSystemNotify(data)
			// }, 5000);
			// setTimeout(()=> {
			// 	let data : topic.SystemNotify = new topic.SystemNotify();
			// 	data.snapshot = new topic.SystemNotifySnapshot();
			// 	data.snapshot.type = "maintenance_start";
			// 	this.onSystemNotify(data)
			// }, 10000);
		}

		/** 请求服务器时间 */
		public getSeverTime() {
			TopicManager.getInstance().getTopicSnapshot(TopicType.timestamp);
			// 每2秒取一次服务器时间
			egret.setTimeout(this.getSeverTime, this, 10000);
		}

		private onTimestamp(info: topic.Timestamp) {
			GameModel.getInstance().timestamp = info;
		}

		/** 登陆完毕进入游戏 */
		public enterGame(): void {
			// TopicManager.getInstance().getTopicSubscribe(TopicType.system_notify);
			PersonalInfoController.getInstance().getPlayerInfo().then(() => {
				ClubController.getInstance().initDtoListener();
				TopicManager.getInstance().getTopicSubscribe(TopicType.room_card + "/" + PersonalInfoModel.getInstance().user_id, function ()
				{
					CommonLoadingUI.getInstance().stop();
					MediatorManager.openMediator(Mediators.Mediator_Bg);
					NotifyController.getInstance().reLogin();
					NotifyController.getInstance().getSystemLast();
					AnnounceController.getInstance().getLastAnnounce();
					NotifyController.getInstance().subChatList();

					if (GlobalConfig.isMobile) {
						MediatorManager.openMediator(Mediators.Mediator_Navbar);
						MediatorManager.openMediator(Mediators.Mediator_ClubTopUI);
					}
					else {
						MediatorManager.openMediator(Mediators.Mediator_PCNavbar);
						MediatorManager.openMediator(Mediators.Mediator_Menu);
					}
					MediatorManager.openMediator(Mediators.Mediator_Home);
				}, this);
				/** 订阅服务器时间 */
				this.getSeverTime();
			}).catch((err) => {
				DebugUtil.error("", err)
				CommonLoadingUI.getInstance().stop();
			});
		}

		/** 打开web弹窗
		 * @param url {string} iframe的URL地址
		 */
		public openPopUp(url: string): void {
			if (GlobalConfig.isMobile) {
				window["openPopUp"](url);
			} else {
				window["openPopUpPC"](url);
			}
		}

		private onSystemNotify(info: topic.SystemNotify): void {
			let time;
			let tipData;

			switch (info.snapshot.type) {
				case "maintenance_notify":
					//即将维护
					tipData = new TipMsgInfo();
					tipData.msg = [
						{ text: "服务器稍后将进行维护，连接将断开，\n对您造成的不便，请谅解。", textColor: enums.ColorConst.Golden }
					];
					tipData.confirmText = "我知道了";
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					break;
				case "maintenance_start":
					//开始维护
					tipData = new TipMsgInfo();
					tipData.msg = [
						{ text: "抱歉，服务器正在维护，\n请在维护结束后重新登录。", textColor: enums.ColorConst.Golden }
					];
					tipData.confirmText = "我知道了";
					tipData.thisObj = this;
					tipData.comfirmCallBack = function () {
						MediatorManager.closeAllMediator();
						MediatorManager.openMediator(Mediators.Mediator_Login);
					};
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					break;
				case "login_successful":
					GameController.getInstance().enterGame();
					break;
				case "club_locked":
					let clubId = info.snapshot.club_locked.club_id;
					this.sendNotification(NotifyConst.Notify_LockUser, clubId);
					break;
				case "duplicate_login":
					LoginController.getInstance().logOut();
					time = TimeUtil.getFormatBySecond(info.snapshot.time, 2);
					tipData = new TipMsgInfo();
					tipData.msg = [
						{ text: "您的账号于", textColor: enums.ColorConst.Golden },
						{ text: time, textColor: enums.ColorConst.LightGray },
						{ text: "\n在一台", textColor: enums.ColorConst.Golden },
						{ text: info.snapshot.duplicate_login.platform, textColor: enums.ColorConst.LightGray },
						{ text: "设备登陆。", textColor: enums.ColorConst.Golden }
					];
					tipData.confirmText = "我知道了";
					tipData.thisObj = this;
					tipData.comfirmCallBack = function () {
						MediatorManager.closeAllMediator();
						MediatorManager.openMediator(Mediators.Mediator_Login);
					};
					MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
					break;
				case "system_message":
					// NotifyController.getInstance().getSystemLast();
					let sys = info.snapshot["system_message"];
					if(sys.message_id && sys.user_id == PersonalInfoModel.getInstance().user_id)
					{
						NotifyController.getInstance().getSystemDetail(sys.message_id,true);
					}

					NotifyController.getInstance().getSystemLast();
					break;
				case "club_announcement":
					//之前取一次last
					let ann = info.snapshot["club_announcement"];
					let id = ann.announcement_id;
					let user_ids = ann.user_ids;
					if(id && user_ids)
					{
						for(let i = user_ids.length - 1;i >= 0; i--)
						{
							if(PersonalInfoModel.getInstance().user_id == user_ids[i] + "")
							{
								//请求公告详情
								AnnounceController.getInstance().getAnnounceDetail(id,true);
								break;
							}
						}
					}
					AnnounceController.getInstance().getLastAnnounce();
					break;
			}
		}


        /**获取分享url */
        public getShareUrl(club_id: number)
        {
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e)
            {
                if (xmlhttp.readyState == 4)
                {
                    let msg: string = xmlhttp.responseText;
                    switch (xmlhttp.status)
                    {
                        //成功
                        case 200:
                            let obj = JSON.parse(msg);
                            DebugUtil.debug("获取分享url "+msg);
                            if (obj && obj.url)
                            {
								ClubModel.getInstance().setClubShareUrl(club_id, decodeURIComponent(obj.url));
								DebugUtil.debug("请求了俱乐部"+club_id+"的分享链接："+decodeURIComponent(obj.url));
								// window.open(obj.url);
                            }
                            else
                            {
                                DebugUtil.debug("没有弹窗公告");
                            }
                            break;
                    }
                }
            }
            try
            {
                xmlhttp.open("GET", GlobalConfig.httpHost + "clubs/" + club_id+"/share" + "?" + LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function ()
                {
                    DebugUtil.debug("获取分享url onerror");
                    CommonLoadingUI.getInstance().stop();
                }
                xmlhttp.send();
            }
            catch (err)
            {
                DebugUtil.debug("获取分享url catch error");
                DebugUtil.debug(err);
                //断网会走这里
                CommonLoadingUI.getInstance().stop();
            }
        }

		/** 设置语言 */
		public setUrlLang(lang: string): void {
			let allLang = LanguageUtil.languageTypes;
			if (allLang.indexOf(lang) == -1) {
				return;
			}
			let fullUrl = window.location.href;
			let obj = window["getAllParams"]();
			if (!obj["urlLang"]) {
				obj["urlLang"] = "";
			}
			obj["urlLang"] = lang;
			let index = fullUrl.indexOf("?");
			let url = fullUrl;
			if (index > -1) {
				url = url.slice(0, index);
			}
			url += "?";
			for (let key in obj) {
				if (key && obj[key]) url += `${key}=${obj[key]}&`;
			}
			url = url.slice(0, url.length - 1);
			window.location.assign(url);
		}

	}
}