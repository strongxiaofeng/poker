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
    var AnnounceController = (function (_super) {
        __extends(AnnounceController, _super);
        function AnnounceController() {
            return _super.call(this) || this;
        }
        AnnounceController.getInstance = function () {
            if (!this._instance)
                this._instance = new AnnounceController();
            return this._instance;
        };
        /**请求公告列表 */
        AnnounceController.prototype.requestAnnouncements = function (club_id, isAll) {
            if (isAll === void 0) { isAll = false; }
            var xmlhttp = new XMLHttpRequest();
            var clubid = game.GlobalConfig.clubId;
            if (club_id) {
                clubid = club_id;
            }
            var from = 0;
            var to = 20;
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    game.DebugUtil.debug(xmlhttp.status);
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            var obj = JSON.parse(msg);
                            self.sendNotification(game.NotifyConst.Notify_AnnounceList, obj);
                            break;
                    }
                }
            };
            try {
                if (isAll) {
                    xmlhttp.open("GET", game.GlobalConfig.httpHost + "announcements?from_index=" + from + "&to_index=" + to + "&" + game.LoginController.getInstance().getXhrHead(), true);
                }
                else {
                    xmlhttp.open("GET", game.GlobalConfig.httpHost + "announcements?club_id=" + clubid + "&from_index=" + from + "&to_index=" + to + "&" + game.LoginController.getInstance().getXhrHead(), true);
                }
                //xmlhttp.open("GET", GlobalConfig.httpHost + "announcements?club_id=" + clubid + "&from_index=" + from + "&to_index=" + to + "&" + LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function () {
                    game.DebugUtil.debug("获取公告列表 onerror");
                    game.CommonLoadingUI.getInstance().stop();
                };
                xmlhttp.send();
            }
            catch (err) {
                game.DebugUtil.debug("获取公告列表 catch error");
                //断网会走这里
                game.CommonLoadingUI.getInstance().stop();
            }
        };
        /**添加公告 */
        AnnounceController.prototype.addAnnouncement = function (title, content, pop_up) {
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.open("POST", game.GlobalConfig.httpHost + "announcements" + "?" + game.LoginController.getInstance().getXhrHead(), true);
            xmlhttp.onload = function (e) {
                switch (xmlhttp.status) {
                    //成功
                    case 201:
                        game.DebugUtil.debug("创建公告成功 ");
                        self.sendNotification(game.NotifyConst.Notify_AddAnnounceSuccess);
                        break;
                    case 400:
                        game.DebugUtil.debug("创建公告失败 ");
                        var msg = xmlhttp.responseText;
                        if (msg == "title_length") {
                            self.sendNotification(game.NotifyConst.Notify_AddAnnounceFail, "标题长度不合法");
                        }
                        else if (msg == "title_empty") {
                            self.sendNotification(game.NotifyConst.Notify_AddAnnounceFail, "标题不能为空");
                        }
                        else if (msg == "content_length") {
                            self.sendNotification(game.NotifyConst.Notify_AddAnnounceFail, "内容最多500字符（250汉字）");
                        }
                        else if (msg == "content_empty") {
                            self.sendNotification(game.NotifyConst.Notify_AddAnnounceFail, "内容不能为空");
                        }
                        break;
                }
            };
            xmlhttp.onerror = function () {
                game.DebugUtil.debug("添加公告 onError");
                game.CommonLoadingUI.getInstance().stop();
            };
            xmlhttp.send(JSON.stringify({ title: title, content: content, pop_up: pop_up, club_id: game.GlobalConfig.clubId }));
        };
        /**删除公告 */
        AnnounceController.prototype.deleteAnnouncement = function (id) {
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    game.DebugUtil.debug(xmlhttp.status);
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            game.DebugUtil.debug("删除公告成功 ");
                            self.sendNotification(game.NotifyConst.Notify_DelAnnounceSuccess);
                            AnnounceController.getInstance().requestAnnouncements();
                            break;
                        case 400:
                            game.DebugUtil.debug("删除公告失败 ");
                            self.sendNotification(game.NotifyConst.Notify_DelAnnounceFail);
                            break;
                    }
                }
            };
            try {
                xmlhttp.open("POST", game.GlobalConfig.httpHost + "announcements/" + id + "/del?" + game.LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function () {
                    game.DebugUtil.debug("删除公告 onerror");
                    game.CommonLoadingUI.getInstance().stop();
                };
                xmlhttp.send();
            }
            catch (err) {
                game.DebugUtil.debug("删除公告 catch error");
                game.DebugUtil.debug(err);
                //断网会走这里
                game.CommonLoadingUI.getInstance().stop();
            }
        };
        /**获取公告详情 */
        AnnounceController.prototype.getAnnounceDetail = function (id, isPop) {
            if (isPop === void 0) { isPop = false; }
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            var obj = JSON.parse(msg);
                            game.DebugUtil.debug("获取公告详情 " + obj);
                            self.sendNotification(game.NotifyConst.Notify_AnnounceDetail, obj);
                            if (isPop) {
                                if (game.GlobalConfig.isMobile)
                                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyPop, { type: 2, obj: obj });
                            }
                            break;
                    }
                }
            };
            try {
                xmlhttp.open("GET", game.GlobalConfig.httpHost + "announcements/" + id + "?" + game.LoginController.getInstance().getXhrHead() + "&is_read=true", true);
                xmlhttp.onerror = function () {
                    game.DebugUtil.debug("获取公告详情 onerror");
                    game.CommonLoadingUI.getInstance().stop();
                };
                xmlhttp.send();
            }
            catch (err) {
                game.DebugUtil.debug("获取公告详情 catch error");
                game.DebugUtil.debug(err);
                //断网会走这里
                game.CommonLoadingUI.getInstance().stop();
            }
        };
        /**获取弹窗公告 */
        AnnounceController.prototype.getAlertAnnounce = function () {
            var xmlhttp = new XMLHttpRequest();
            var club_id = game.GlobalConfig.clubId;
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            var obj = JSON.parse(msg);
                            game.DebugUtil.debug("获取弹窗公告 " + obj);
                            if (obj && obj.announcements && obj.announcements.length > 0) {
                                game.DebugUtil.debug('有要弹窗的公告' + obj.announcements);
                                game.MediatorManager.openMediator(game.Mediators.Mediator_AnnounceAlertMediator, obj.announcements);
                            }
                            else {
                                game.DebugUtil.debug("没有弹窗公告");
                            }
                            break;
                    }
                }
            };
            try {
                xmlhttp.open("GET", game.GlobalConfig.httpHost + "announcements/unread?club_id=" + club_id + "&" + game.LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function () {
                    game.DebugUtil.debug("获取弹窗公告 onerror");
                    game.CommonLoadingUI.getInstance().stop();
                };
                xmlhttp.send();
            }
            catch (err) {
                game.DebugUtil.debug("获取弹窗公告 catch error");
                game.DebugUtil.debug(err);
                //断网会走这里
                game.CommonLoadingUI.getInstance().stop();
            }
        };
        /**获取最后一条俱乐部公告 */
        AnnounceController.prototype.getLastAnnounce = function () {
            var xmlhttp = new XMLHttpRequest();
            var club_id = game.GlobalConfig.clubId;
            var self = this;
            xmlhttp.onreadystatechange = function (e) {
                if (xmlhttp.readyState == 4) {
                    var msg = xmlhttp.responseText;
                    switch (xmlhttp.status) {
                        //成功
                        case 200:
                            var obj = JSON.parse(msg);
                            game.DebugUtil.debug("getLastAnnounce:" + obj);
                            game.NotifyModel.getInstance().unread_ann = obj.is_read ? 0 : 1;
                            self.sendNotification(game.NotifyConst.Notify_Update_AnnounceLast, obj);
                            break;
                    }
                }
            };
            try {
                xmlhttp.open("GET", game.GlobalConfig.httpHost + "announcements/last" + "?" + game.LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function () {
                    game.DebugUtil.debug("获取公告最后一条消息 onerror");
                    game.CommonLoadingUI.getInstance().stop();
                };
                xmlhttp.send();
            }
            catch (err) {
                game.DebugUtil.debug("获取公告最后一条消息 catch error");
                game.DebugUtil.debug(err);
                //断网会走这里
                game.CommonLoadingUI.getInstance().stop();
            }
        };
        return AnnounceController;
    }(game.BaseController));
    game.AnnounceController = AnnounceController;
    __reflect(AnnounceController.prototype, "game.AnnounceController");
})(game || (game = {}));
//# sourceMappingURL=AnnounceController.js.map