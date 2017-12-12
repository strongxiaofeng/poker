module game
{
    export class AnnounceController extends BaseController
    {
        private static _instance: AnnounceController;
        private constructor()
        {
            super();
        }
        public static getInstance(): AnnounceController
        {
            if (!this._instance) this._instance = new AnnounceController();
            return this._instance;
        }
        /**请求公告列表 */
        public requestAnnouncements(club_id?: number,isAll = false):void
        {
            let xmlhttp = new XMLHttpRequest();
            let clubid = GlobalConfig.clubId;
            if (club_id)
            {
                clubid = club_id;
            }
            let from = 0;
            let to = 20;
            var self = this;
            xmlhttp.onreadystatechange = function (e)
            {
                if (xmlhttp.readyState == 4)
                {
                    let msg: string = xmlhttp.responseText;
                    DebugUtil.debug(xmlhttp.status);
                    switch (xmlhttp.status)
                    {
                        //成功
                        case 200:
                            let obj = JSON.parse(msg);
                            self.sendNotification(NotifyConst.Notify_AnnounceList, obj);
                            break;
                    }
                }
            }
            try
            {
                if(isAll)
                {
                    xmlhttp.open("GET", GlobalConfig.httpHost + "announcements?from_index=" + from + "&to_index=" + to + "&" + LoginController.getInstance().getXhrHead(), true);
                }
                else
                {
                    xmlhttp.open("GET", GlobalConfig.httpHost + "announcements?club_id=" + clubid + "&from_index=" + from + "&to_index=" + to + "&" + LoginController.getInstance().getXhrHead(), true);
                }
                //xmlhttp.open("GET", GlobalConfig.httpHost + "announcements?club_id=" + clubid + "&from_index=" + from + "&to_index=" + to + "&" + LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function ()
                {
                    DebugUtil.debug("获取公告列表 onerror");
                    CommonLoadingUI.getInstance().stop();
                }
                xmlhttp.send();
            }
            catch (err)
            {
                DebugUtil.debug("获取公告列表 catch error");
                //断网会走这里
                CommonLoadingUI.getInstance().stop();
            }
        }
        /**添加公告 */
        public addAnnouncement(title: string, content: string, pop_up: boolean)
        {
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.open("POST", GlobalConfig.httpHost + "announcements" + "?" + LoginController.getInstance().getXhrHead(), true);
            xmlhttp.onload = function (e)
            {
                switch (xmlhttp.status)
                {
                    //成功
                    case 201:
                        DebugUtil.debug("创建公告成功 ");
                        self.sendNotification(NotifyConst.Notify_AddAnnounceSuccess);
                        break;
                    case 400:
                        DebugUtil.debug("创建公告失败 ");
                        let msg: string = xmlhttp.responseText;
                        if (msg == "title_length")
                        {
                            self.sendNotification(NotifyConst.Notify_AddAnnounceFail, "标题长度不合法");
                        }
                        else if (msg == "title_empty")
                        {
                            self.sendNotification(NotifyConst.Notify_AddAnnounceFail, "标题不能为空");
                        }
                        else if (msg == "content_length")
                        {
                            self.sendNotification(NotifyConst.Notify_AddAnnounceFail, "内容最多500字符（250汉字）");
                        }
                        else if (msg == "content_empty")
                        {
                            self.sendNotification(NotifyConst.Notify_AddAnnounceFail, "内容不能为空");
                        }
                        break;
                }
            }
            xmlhttp.onerror = function ()
            {
                DebugUtil.debug("添加公告 onError");
                CommonLoadingUI.getInstance().stop();
            }
            xmlhttp.send(JSON.stringify({ title: title, content: content, pop_up: pop_up, club_id: GlobalConfig.clubId }));
        }

        /**删除公告 */
        public deleteAnnouncement(id: string)
        {
            let xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function (e)
            {
                if (xmlhttp.readyState == 4)
                {
                    let msg: string = xmlhttp.responseText;
                    DebugUtil.debug(xmlhttp.status);
                    switch (xmlhttp.status)
                    {
                        //成功
                        case 200:
                            DebugUtil.debug("删除公告成功 ");
                            self.sendNotification(NotifyConst.Notify_DelAnnounceSuccess);
                            AnnounceController.getInstance().requestAnnouncements();
                            break;
                        case 400:
                            DebugUtil.debug("删除公告失败 ");
                            self.sendNotification(NotifyConst.Notify_DelAnnounceFail);
                            break;
                    }
                }
            }
            try
            {
                xmlhttp.open("POST", GlobalConfig.httpHost + "announcements/" + id + "/del?" + LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function ()
                {
                    DebugUtil.debug("删除公告 onerror");
                    CommonLoadingUI.getInstance().stop();
                }
                xmlhttp.send();
            }
            catch (err)
            {
                DebugUtil.debug("删除公告 catch error");
                DebugUtil.debug(err);
                //断网会走这里
                CommonLoadingUI.getInstance().stop();
            }
        }

        /**获取公告详情 */
        public getAnnounceDetail(id: string,isPop:boolean = false)
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
                            DebugUtil.debug("获取公告详情 " + obj);
                            self.sendNotification(NotifyConst.Notify_AnnounceDetail, obj);
                            if(isPop)
                            {
                                if(GlobalConfig.isMobile) MediatorManager.openMediator(Mediators.Mediator_NotifyPop,{type:2,obj:obj});
                            }
                            break;
                    }
                }
            }
            try
            {
                xmlhttp.open("GET", GlobalConfig.httpHost + "announcements/" + id + "?" + LoginController.getInstance().getXhrHead()+"&is_read=true", true);
                xmlhttp.onerror = function ()
                {
                    DebugUtil.debug("获取公告详情 onerror");
                    CommonLoadingUI.getInstance().stop();
                }
                xmlhttp.send();
            }
            catch (err)
            {
                DebugUtil.debug("获取公告详情 catch error");
                DebugUtil.debug(err);
                //断网会走这里
                CommonLoadingUI.getInstance().stop();
            }
        }
        /**获取弹窗公告 */
        public getAlertAnnounce()
        {
            let xmlhttp = new XMLHttpRequest();
            let club_id = GlobalConfig.clubId;
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
                            DebugUtil.debug("获取弹窗公告 " + obj);
                            if (obj && obj.announcements && obj.announcements.length > 0)
                            {
                                DebugUtil.debug('有要弹窗的公告' + obj.announcements);
                                MediatorManager.openMediator(Mediators.Mediator_AnnounceAlertMediator, obj.announcements);
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
                xmlhttp.open("GET", GlobalConfig.httpHost + "announcements/unread?club_id=" + club_id + "&" + LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function ()
                {
                    DebugUtil.debug("获取弹窗公告 onerror");
                    CommonLoadingUI.getInstance().stop();
                }
                xmlhttp.send();
            }
            catch (err)
            {
                DebugUtil.debug("获取弹窗公告 catch error");
                DebugUtil.debug(err);
                //断网会走这里
                CommonLoadingUI.getInstance().stop();
            }
        }

        /**获取最后一条俱乐部公告 */
        public getLastAnnounce(): void
        {
            let xmlhttp = new XMLHttpRequest();
            let club_id = GlobalConfig.clubId;
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
                            let obj:AnnounceLastData = JSON.parse(msg);
                            DebugUtil.debug("getLastAnnounce:" + obj);
                            NotifyModel.getInstance().unread_ann = obj.is_read?0:1;
                            self.sendNotification(NotifyConst.Notify_Update_AnnounceLast,obj);
                            break;
                    }
                }
            }
            try
            {
                xmlhttp.open("GET", GlobalConfig.httpHost + "announcements/last" + "?" + LoginController.getInstance().getXhrHead(), true);
                xmlhttp.onerror = function ()
                {
                    DebugUtil.debug("获取公告最后一条消息 onerror");
                    CommonLoadingUI.getInstance().stop();
                }
                xmlhttp.send();
            }
            catch (err)
            {
                DebugUtil.debug("获取公告最后一条消息 catch error");
                DebugUtil.debug(err);
                //断网会走这里
                CommonLoadingUI.getInstance().stop();
            }
        }
    }
}