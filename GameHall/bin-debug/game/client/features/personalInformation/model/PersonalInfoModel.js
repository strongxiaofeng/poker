var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /** 个人信息model */
    var PersonalInfoModel = (function () {
        // ------------------------------------ init ------------------------------------
        function PersonalInfoModel() {
        }
        /** 获取单例 */
        PersonalInfoModel.getInstance = function () {
            if (this._instance == null) {
                this._instance = new PersonalInfoModel();
            }
            return this._instance;
        };
        Object.defineProperty(PersonalInfoModel.prototype, "nick", {
            /** 用户昵称 */
            get: function () { return this._nick; },
            set: function (v) {
                this._nick = v || this._nick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalInfoModel.prototype, "username", {
            /** 用户名 */
            get: function () { return this._username; },
            set: function (v) {
                this._username = v || this._username;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalInfoModel.prototype, "user_id", {
            /** 用户ID */
            get: function () { return this._user_id; },
            set: function (v) {
                this._user_id = v || this._user_id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalInfoModel.prototype, "photo", {
            /** 用户头像URL */
            get: function () { return this._photo; },
            set: function (v) {
                if (this._photo === v)
                    return;
                this._photo = v || this._photo;
                this.setAvatar(v);
            },
            enumerable: true,
            configurable: true
        });
        // ------------------------------------ 储存数据 ------------------------------------
        /** 储存用户列表
         * @param listData {Array<PlayerInfo>} 列表数据
         */
        PersonalInfoModel.prototype.setPlayerList = function (listData) {
            this.playerList = listData;
        };
        // ------------------------------------ 数据处理 ------------------------------------
        /** 根据头像URL加载头像 */
        PersonalInfoModel.prototype.setAvatar = function (url) {
            var ip = game.GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            var fullUrl = "http:" + ip + "/" + url + ("?" + new Date().getTime());
            try {
                com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                    this.avatar = data;
                    game.PersonalInfoController.getInstance().sendNotification(game.NotifyConst.Notify_PlayerInfo);
                }, this, com.ResourceItem.TYPE_IMAGE);
            }
            catch (err) {
                game.DebugUtil.debug("获取用户头像失败");
            }
        };
        // ------------------------------------ 获取数据 ------------------------------------
        /** 获取用户列表 */
        PersonalInfoModel.prototype.getPlayerList = function () {
            var list = [];
            if (this.playerList)
                list = JSON.parse(JSON.stringify(this.playerList));
            return list;
        };
        /** 根据用户id获取用户信息
         * @param userId {string} 用户id
         */
        PersonalInfoModel.prototype.getPlayerInfoById = function (userId) {
            for (var i = this.playerList.length - 1; i >= 0; i--) {
                if ((this.playerList[i].user_id + "") == userId) {
                    return this.playerList[i];
                }
            }
            return null;
        };
        /** 清除所有数据*/
        PersonalInfoModel.prototype.clearData = function () {
            this._nick = "";
            this._username = "";
            this._photo = "";
            this._user_id = "";
            this.avatar = null;
            this.playerList = [];
        };
        return PersonalInfoModel;
    }());
    game.PersonalInfoModel = PersonalInfoModel;
    __reflect(PersonalInfoModel.prototype, "game.PersonalInfoModel");
    /** 用户列表用户信息格式 */
    var PlayerInfo = (function () {
        function PlayerInfo() {
        }
        return PlayerInfo;
    }());
    game.PlayerInfo = PlayerInfo;
    __reflect(PlayerInfo.prototype, "game.PlayerInfo");
    var PlayerBaseInfo = (function () {
        function PlayerBaseInfo() {
        }
        return PlayerBaseInfo;
    }());
    game.PlayerBaseInfo = PlayerBaseInfo;
    __reflect(PlayerBaseInfo.prototype, "game.PlayerBaseInfo");
})(game || (game = {}));
//# sourceMappingURL=PersonalInfoModel.js.map