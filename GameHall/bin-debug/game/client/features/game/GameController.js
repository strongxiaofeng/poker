var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var GameController = (function (_super) {
        __extends(GameController, _super);
        function GameController() {
            var _this = _super.call(this) || this;
            _this.initDtoListener();
            return _this;
        }
        GameController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new GameController();
            }
            return this.instance;
        };
        GameController.prototype.initDtoListener = function () {
            game.TopicManager.getInstance().addSocketListener(game.TopicType.timestamp, this.onTimestamp, this); // 服务器时间
            game.TopicManager.getInstance().addSocketListener(game.TopicType.system_notify, this.onSystemNotify, this); // 系统消息
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
        };
        /** 请求服务器时间 */
        GameController.prototype.getSeverTime = function () {
            game.TopicManager.getInstance().getTopicSnapshot(game.TopicType.timestamp);
            // 每2秒取一次服务器时间
            egret.setTimeout(this.getSeverTime, this, 10000);
        };
        GameController.prototype.onTimestamp = function (info) {
            game.GameModel.getInstance().timestamp = info;
        };
        /** 登陆完毕进入游戏 */
        GameController.prototype.enterGame = function () {
            var _this = this;
            // TopicManager.getInstance().getTopicSubscribe(TopicType.system_notify);
            game.PersonalInfoController.getInstance().getPlayerInfo().then(function () {
                game.ClubController.getInstance().initDtoListener();
                game.TopicManager.getInstance().getTopicSubscribe(game.TopicType.room_card + "/" + game.PersonalInfoModel.getInstance().user_id, function () {
                    game.CommonLoadingUI.getInstance().stop();
                    game.MediatorManager.openMediator(game.Mediators.Mediator_Bg);
                    game.NotifyController.getInstance().reLogin();
                    game.NotifyController.getInstance().getSystemLast();
                    game.AnnounceController.getInstance().getLastAnnounce();
                    game.NotifyController.getInstance().subChatList();
                    if (game.GlobalConfig.isMobile) {
                        game.MediatorManager.openMediator(game.Mediators.Mediator_Navbar);
                        game.MediatorManager.openMediator(game.Mediators.Mediator_ClubTopUI);
                    }
                    else {
                        game.MediatorManager.openMediator(game.Mediators.Mediator_PCNavbar);
                        game.MediatorManager.openMediator(game.Mediators.Mediator_Menu);
                    }
                    game.MediatorManager.openMediator(game.Mediators.Mediator_Home);
                }, _this);
                /** 订阅服务器时间 */
                _this.getSeverTime();
            }).catch(function (err) {
                game.DebugUtil.error("", err);
                game.CommonLoadingUI.getInstance().stop();
            });
        };
        /** 打开web弹窗
         * @param url {string} iframe的URL地址
         */
        GameController.prototype.openPopUp = function (url) {
            if (game.GlobalConfig.isMobile) {
                window["openPopUp"](url);
            }
            else {
                window["openPopUpPC"](url);
            }
        };
        GameController.prototype.onSystemNotify = function (info) {
            var time;
            var tipData;
            switch (info.snapshot.type) {
                case "maintenance_notify":
                    //即将维护
                    tipData = new game.TipMsgInfo();
                    tipData.msg = [
                        { text: "服务器稍后将进行维护，连接将断开，\n对您造成的不便，请谅解。", textColor: enums.ColorConst.Golden }
                    ];
                    tipData.confirmText = "我知道了";
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    break;
                case "maintenance_start":
                    //开始维护
                    tipData = new game.TipMsgInfo();
                    tipData.msg = [
                        { text: "抱歉，服务器正在维护，\n请在维护结束后重新登录。", textColor: enums.ColorConst.Golden }
                    ];
                    tipData.confirmText = "我知道了";
                    tipData.thisObj = this;
                    tipData.comfirmCallBack = function () {
                        game.MediatorManager.closeAllMediator();
                        game.MediatorManager.openMediator(game.Mediators.Mediator_Login);
                    };
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    break;
                case "login_successful":
                    GameController.getInstance().enterGame();
                    break;
                case "club_locked":
                    var clubId = info.snapshot.club_locked.club_id;
                    this.sendNotification(game.NotifyConst.Notify_LockUser, clubId);
                    break;
                case "duplicate_login":
                    game.LoginController.getInstance().logOut();
                    time = game.TimeUtil.getFormatBySecond(info.snapshot.time, 2);
                    tipData = new game.TipMsgInfo();
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
                        game.MediatorManager.closeAllMediator();
                        game.MediatorManager.openMediator(game.Mediators.Mediator_Login);
                    };
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    break;
                case "system_message":
                    // NotifyController.getInstance().getSystemLast();
                    var sys = info.snapshot["system_message"];
                    if (sys.message_id && sys.user_id == game.PersonalInfoModel.getInstance().user_id) {
                        game.NotifyController.getInstance().getSystemDetail(sys.message_id, true);
                    }
                    game.NotifyController.getInstance().getSystemLast();
                    break;
                case "club_announcement":
                    //之前取一次last
                    var ann = info.snapshot["club_announcement"];
                    var id = ann.announcement_id;
                    var user_ids = ann.user_ids;
                    if (id && user_ids) {
                        for (var i = user_ids.length - 1; i >= 0; i--) {
                            if (game.PersonalInfoModel.getInstance().user_id == user_ids[i] + "") {
                                //请求公告详情
                                game.AnnounceController.getInstance().getAnnounceDetail(id, true);
                                break;
                            }
                        }
                    }
                    game.AnnounceController.getInstance().getLastAnnounce();
                    break;
            }
        };
        /**获取分享url */
        GameController.prototype.getShareUrl = function (club_id) {
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            var obj = JSON.parse(msg);
                            game.DebugUtil.debug("获取分享url " + msg);
                            if (obj && obj.url) {
                                game.ClubModel.getInstance().setClubShareUrl(club_id, decodeURIComponent(obj.url));
                                game.DebugUtil.debug("请求了俱乐部" + club_id + "的分享链接：" + decodeURIComponent(obj.url));
                                // window.open(obj.url);
                            }
                            else {
                                game.DebugUtil.debug("没有弹窗公告");
                            }
                            break;
                    }
                }
            };
            try {
                xmlhttp.open("GET", game.GlobalConfig.httpHost + "clubs/" + club_id + "/share" + "?" + game.LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function () {
                    game.DebugUtil.debug("获取分享url onerror");
                    game.CommonLoadingUI.getInstance().stop();
                };
                xmlhttp.send();
            }
            catch (err) {
                game.DebugUtil.debug("获取分享url catch error");
                game.DebugUtil.debug(err);
                //断网会走这里
                game.CommonLoadingUI.getInstance().stop();
            }
        };
        /** 设置语言 */
        GameController.prototype.setUrlLang = function (lang) {
            var allLang = game.LanguageUtil.languageTypes;
            if (allLang.indexOf(lang) == -1) {
                return;
            }
            var fullUrl = window.location.href;
            var obj = window["getAllParams"]();
            if (!obj["urlLang"]) {
                obj["urlLang"] = "";
            }
            obj["urlLang"] = lang;
            var index = fullUrl.indexOf("?");
            var url = fullUrl;
            if (index > -1) {
                url = url.slice(0, index);
            }
            url += "?";
            for (var key in obj) {
                if (key && obj[key])
                    url += key + "=" + obj[key] + "&";
            }
            url = url.slice(0, url.length - 1);
            window.location.assign(url);
        };
        return GameController;
    }(game.BaseController));
    game.GameController = GameController;
    __reflect(GameController.prototype, "game.GameController");
})(game || (game = {}));
//# sourceMappingURL=GameController.js.map