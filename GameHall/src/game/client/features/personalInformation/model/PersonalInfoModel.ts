module game {

    /** 个人信息model */
    export class PersonalInfoModel {

        // ------------------------------------ init ------------------------------------

        public constructor() {

        }

        /** 单例对象 */
        private static _instance: PersonalInfoModel;
        /** 获取单例 */
        public static getInstance(): PersonalInfoModel {
            if (this._instance == null) {
                this._instance = new PersonalInfoModel();
            }
            return this._instance;
        }

        // ------------------------------------ 变量声明 ------------------------------------

        private _nick: string;
        /** 用户昵称 */
        public get nick(): string { return this._nick; }
        public set nick(v: string) {
            this._nick = v || this._nick;
        }

        private _username: string;
        /** 用户名 */
        public get username(): string { return this._username; }
        public set username(v: string) {
            this._username = v || this._username;
        }

        private _user_id: string;
        /** 用户ID */
        public get user_id(): string { return this._user_id; }
        public set user_id(v: string) {
            this._user_id = v || this._user_id;
        }

        private _photo: string;
        /** 用户头像URL */
        public get photo(): string { return this._photo; }
        public set photo(v: string) {
            if (this._photo === v) return;
            this._photo = v || this._photo;
            this.setAvatar(v);
        }

        /** 用户头像Texture */
        public avatar: egret.Texture;

        /** 用户列表 */
        private playerList: Array<PlayerInfo>;

        // ------------------------------------ 储存数据 ------------------------------------

        /** 储存用户列表
         * @param listData {Array<PlayerInfo>} 列表数据
         */
        public setPlayerList(listData: Array<PlayerInfo>): void {
            this.playerList = listData;
        }

        // ------------------------------------ 数据处理 ------------------------------------

        /** 根据头像URL加载头像 */
        private setAvatar(url: string): void {
            let ip = GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            let fullUrl = "http:" + ip + "/" + url + ("?" + new Date().getTime());
            try {
                com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                    this.avatar = data;
                    PersonalInfoController.getInstance().sendNotification(NotifyConst.Notify_PlayerInfo);
                }, this, com.ResourceItem.TYPE_IMAGE);
            } catch (err) {
                DebugUtil.debug("获取用户头像失败");
            }
        }

        // ------------------------------------ 获取数据 ------------------------------------

        /** 获取用户列表 */
        public getPlayerList(): Array<PlayerInfo> {
            let list: Array<PlayerInfo> = [];
            if (this.playerList) list = JSON.parse(JSON.stringify(this.playerList));
            return list;
        }

        /** 根据用户id获取用户信息
         * @param userId {string} 用户id
         */
        public getPlayerInfoById(userId: string): PlayerInfo {
            for (let i = this.playerList.length - 1; i >= 0; i--) {
                if ((this.playerList[i].user_id + "") == userId) {
                    return this.playerList[i];
                }
            }
            return null;
        }
        /** 清除所有数据*/
        public clearData(): void {
            this._nick = "";
            this._username = "";
            this._photo = "";
            this._user_id = "";
            this.avatar = null;
            this.playerList = [];
        }
    }

    /** 用户列表用户信息格式 */
    export class PlayerInfo {
        /** 用户ID */
        public user_id: number;
        /** 用户名 */
        public username: string;
        /** 用户昵称 */
        public nick: string;
        /** 加入时间 */
        public join_time: number;
        /** 上次登录时间 */
        public last_login_time: number;
        /** 是否被锁定 */
        public locked: boolean;
        /** 头像URL */
        public avatar: string;
    }

    export class PlayerBaseInfo
    {
        /** 用户ID */
        public user_id: number;
        /** 用户名 */
        public nick: string;
        /**头像的url */
        public head:string;
    }
}