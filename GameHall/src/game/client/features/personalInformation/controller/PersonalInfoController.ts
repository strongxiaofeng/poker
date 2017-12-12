module game {

    export class PersonalInfoController extends BaseController {

        // --------------------------------------- 初始化 ---------------------------------------

        private static instance: PersonalInfoController;

        public static getInstance(): PersonalInfoController {
            if (this.instance == null) {
                this.instance = new PersonalInfoController();
            }
            return this.instance;
        }

        public constructor() {
            super();
        }

        public initDtoListener(): void {
        }

        // --------------------------------------- account相关WS请求 ---------------------------------------

        /** 进入俱乐部时订阅在该俱乐部的账号信息
         * @param clubId {number} 俱乐部ID
         */
        public subscribeAccount(clubId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let userId = PersonalInfoModel.getInstance().user_id;
                let topicType = `/account/${clubId}/${userId}`;
                let callBack = function (data: topic.BaseResponse) {
                    if (data.code == 0) {
                        resolve();
                    } else {
                        reject();
                    }
                };
                this.topicManager.getTopicSubscribe(topicType, callBack, this);
            });
        }

        // --------------------------------------- player相关http请求 ---------------------------------------

        /** parameter中的authorization参数 */
        private getXhrHead(): string {
            let head = JSON.stringify({
                username: LoginController.getInstance().sendingName,
                login_token: LoginController.getInstance().login_Token
            });
            let secret: string = Base64Util.StringToBase64(head);
            return `authorization=${secret}`;
        }

        /** 获取个人信息 */
        public getPlayerInfo(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", GlobalConfig.httpHost + "player?" + this.getXhrHead(), true);
                xhr.onload = () => {
                    if (xhr.status == 200 && xhr.responseText) {
                        let info = JSON.parse(xhr.responseText);
                        [PersonalInfoModel.getInstance().nick,
                        PersonalInfoModel.getInstance().username,
                        PersonalInfoModel.getInstance().user_id,
                        PersonalInfoModel.getInstance().photo
                        ] = [info["nick"], info["username"], info["user_id"], info["avatar"]];
                        this.sendNotification(NotifyConst.Notify_PlayerInfo);
                        DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                        resolve();
                    } else {
                        reject();
                    }
                }
                xhr.onerror = (err) => {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        }

        /** 修改用户信息
         * @param nick {string} 用户昵称
         * @param avatar {egret.Texture} 用户头像
         */
        public updatePlayerInfo(nick?: string, avatar?: egret.Texture): Promise<{}> {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", GlobalConfig.httpHost + "player/update?" + this.getXhrHead(), true);
                var formData = new FormData();
                if (avatar) {
                    let imgBase64Str = avatar.toDataURL("image/png");
                    let imgBase64 = imgBase64Str.split(",")[1];
                    formData.append("avatar", imgBase64);
                    formData.append("avatar_name", "avatar.png");
                }
                if (nick) {
                    formData.append("nick", nick);
                }
                xhr.onload = () => {
                    switch (xhr.status) {
                        case 200:
                            PersonalInfoController.getInstance().getPlayerInfo();
                            resolve();
                            break;
                        case 400:
                            // 修改用户信息失败|昵称不能为空|昵称已存在|昵称只能是字母、汉字或数字的组合|最多只能输入12个字符
                            // update_failed|param_empty|nick_exists|wrong_nick_character|wrong_nick_length
                            reject(xhr.responseText);
                            break;
                    }
                }
                xhr.onerror = (err) => {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(formData);
            });
        }

        /** 获取用户列表
         * @param clubId {string} 俱乐部ID
         * @param condition {string} 搜索条件,可以用账号或昵称进行搜索,如果搜索全部可不录入搜索条件
         * @param playerNum {number} 搜索个数
         * @param locked {number} 0 - 查询所有玩家 | 1 - 查询已锁定玩家 (默认为0)
         * @param startIndex {number} 搜索起始位置，默认为0
         */
        public getPlayerList(clubId: string, condition: string = "", playerNum: number, locked: number = 0, startIndex: number = 0): Promise<{}> {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                let endIndex = startIndex + playerNum;
                let xhrUrl = this.getXhrHead();
                if (condition.length > 0) {
                    condition = encodeURIComponent(condition);
                    xhrUrl = `condition=${condition}&` + xhrUrl;
                }
                if (locked == 1) {
                    xhrUrl = `locked=${true}&` + xhrUrl;
                }
                xhr.open(
                    "GET",
                    GlobalConfig.httpHost +
                    `players?club_id=${clubId}&from_index=${startIndex}&to_index=${endIndex}&` + xhrUrl,
                    true
                );
                xhr.onload = () => {
                    if (xhr.status == 200 && xhr.responseText) {
                        let listData = JSON.parse(xhr.responseText);
                        PersonalInfoModel.getInstance().setPlayerList(listData["players"]);
                        DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                        resolve();
                    } else {
                        reject();
                    }
                }
                xhr.onerror = (err) => {
                    this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        }

        private getPlayerNameAndImgCallBack: Function;
        private getPlayerNameAndImgCallBackObj: any;
        /**通过user_id批量获取玩家的名字和图标 */
        public getPlayerNameAndImg(user_ids: Array<number>,isPop = false, callback:Function=null, callbackobj:any=null): void
        {
            this.getPlayerNameAndImgCallBack = callback;
            this.getPlayerNameAndImgCallBackObj = callbackobj;

            let xhr = new XMLHttpRequest();
            let xhrUrl = GlobalConfig.httpHost + "/players" + "?" + this.getXhrHead() + "&user_ids=";

            for (let i = user_ids.length - 1; i >= 0; i--)
            {
                xhrUrl += user_ids[i] + ",";
            }
            xhrUrl = xhrUrl.substr(0, xhrUrl.length - 1);

            xhr.open("GET", xhrUrl, true);
            xhr.onload = () =>
            {
                if (xhr.status == 200)
                {
                    //{:id1 : {name:"string", img:"string"}}
                    let listData = JSON.parse(xhr.responseText);
                    //加个回调
                    if(this.getPlayerNameAndImgCallBack && this.getPlayerNameAndImgCallBackObj)
                    {
                        this.getPlayerNameAndImgCallBack.apply(this.getPlayerNameAndImgCallBackObj, [listData]);
                        this.getPlayerNameAndImgCallBack = null;
                        this.getPlayerNameAndImgCallBackObj = null;
                    }
                    //没有回调才发通知,不然几个地方都刷新list头像，影响性能
                    else{
                        this.sendNotification(NotifyConst.Notify_Update_PlayerName,listData);
                    }

                    if(isPop)
                    {
                        this.sendNotification(NotifyConst.Notify_Update_PlayerNamePop,listData);
                    }
                    DebugUtil.debug(xhr.responseText, LogConst.LOGTYPE_MSG_RECV);
                }
                else if(xhr.status > 0)
                {
                    this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = (err) =>
            {
                this.onGetError(err);
            };
            xhr.send(null);
        }
        /**网络请求失败 */
        private onGetError(e) {
            DebugUtil.debug("网络请求失败:" + e);
        }

    }
}