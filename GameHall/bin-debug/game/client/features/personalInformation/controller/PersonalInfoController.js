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
    var PersonalInfoController = (function (_super) {
        __extends(PersonalInfoController, _super);
        function PersonalInfoController() {
            return _super.call(this) || this;
        }
        PersonalInfoController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new PersonalInfoController();
            }
            return this.instance;
        };
        PersonalInfoController.prototype.initDtoListener = function () {
        };
        // --------------------------------------- account相关WS请求 ---------------------------------------
        /** 进入俱乐部时订阅在该俱乐部的账号信息
         * @param clubId {number} 俱乐部ID
         */
        PersonalInfoController.prototype.subscribeAccount = function (clubId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var userId = game.PersonalInfoModel.getInstance().user_id;
                var topicType = "/account/" + clubId + "/" + userId;
                var callBack = function (data) {
                    if (data.code == 0) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                };
                _this.topicManager.getTopicSubscribe(topicType, callBack, _this);
            });
        };
        // --------------------------------------- player相关http请求 ---------------------------------------
        /** parameter中的authorization参数 */
        PersonalInfoController.prototype.getXhrHead = function () {
            var head = JSON.stringify({
                username: game.LoginController.getInstance().sendingName,
                login_token: game.LoginController.getInstance().login_Token
            });
            var secret = game.Base64Util.StringToBase64(head);
            return "authorization=" + secret;
        };
        /** 获取个人信息 */
        PersonalInfoController.prototype.getPlayerInfo = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", game.GlobalConfig.httpHost + "player?" + _this.getXhrHead(), true);
                xhr.onload = function () {
                    if (xhr.status == 200 && xhr.responseText) {
                        var info = JSON.parse(xhr.responseText);
                        _a = [info["nick"], info["username"], info["user_id"], info["avatar"]], game.PersonalInfoModel.getInstance().nick = _a[0], game.PersonalInfoModel.getInstance().username = _a[1], game.PersonalInfoModel.getInstance().user_id = _a[2], game.PersonalInfoModel.getInstance().photo = _a[3];
                        _this.sendNotification(game.NotifyConst.Notify_PlayerInfo);
                        game.DebugUtil.debug(xhr.responseText, game.LogConst.LOGTYPE_MSG_RECV);
                        resolve();
                    }
                    else {
                        reject();
                    }
                    var _a;
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        };
        /** 修改用户信息
         * @param nick {string} 用户昵称
         * @param avatar {egret.Texture} 用户头像
         */
        PersonalInfoController.prototype.updatePlayerInfo = function (nick, avatar) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", game.GlobalConfig.httpHost + "player/update?" + _this.getXhrHead(), true);
                var formData = new FormData();
                if (avatar) {
                    var imgBase64Str = avatar.toDataURL("image/png");
                    var imgBase64 = imgBase64Str.split(",")[1];
                    formData.append("avatar", imgBase64);
                    formData.append("avatar_name", "avatar.png");
                }
                if (nick) {
                    formData.append("nick", nick);
                }
                xhr.onload = function () {
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
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(formData);
            });
        };
        /** 获取用户列表
         * @param clubId {string} 俱乐部ID
         * @param condition {string} 搜索条件,可以用账号或昵称进行搜索,如果搜索全部可不录入搜索条件
         * @param playerNum {number} 搜索个数
         * @param locked {number} 0 - 查询所有玩家 | 1 - 查询已锁定玩家 (默认为0)
         * @param startIndex {number} 搜索起始位置，默认为0
         */
        PersonalInfoController.prototype.getPlayerList = function (clubId, condition, playerNum, locked, startIndex) {
            var _this = this;
            if (condition === void 0) { condition = ""; }
            if (locked === void 0) { locked = 0; }
            if (startIndex === void 0) { startIndex = 0; }
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                var endIndex = startIndex + playerNum;
                var xhrUrl = _this.getXhrHead();
                if (condition.length > 0) {
                    condition = encodeURIComponent(condition);
                    xhrUrl = "condition=" + condition + "&" + xhrUrl;
                }
                if (locked == 1) {
                    xhrUrl = "locked=" + true + "&" + xhrUrl;
                }
                xhr.open("GET", game.GlobalConfig.httpHost +
                    ("players?club_id=" + clubId + "&from_index=" + startIndex + "&to_index=" + endIndex + "&") + xhrUrl, true);
                xhr.onload = function () {
                    if (xhr.status == 200 && xhr.responseText) {
                        var listData = JSON.parse(xhr.responseText);
                        game.PersonalInfoModel.getInstance().setPlayerList(listData["players"]);
                        game.DebugUtil.debug(xhr.responseText, game.LogConst.LOGTYPE_MSG_RECV);
                        resolve();
                    }
                    else {
                        reject();
                    }
                };
                xhr.onerror = function (err) {
                    _this.onGetError(err);
                    reject();
                };
                xhr.send(null);
            });
        };
        /**通过user_id批量获取玩家的名字和图标 */
        PersonalInfoController.prototype.getPlayerNameAndImg = function (user_ids, isPop, callback, callbackobj) {
            var _this = this;
            if (isPop === void 0) { isPop = false; }
            if (callback === void 0) { callback = null; }
            if (callbackobj === void 0) { callbackobj = null; }
            this.getPlayerNameAndImgCallBack = callback;
            this.getPlayerNameAndImgCallBackObj = callbackobj;
            var xhr = new XMLHttpRequest();
            var xhrUrl = game.GlobalConfig.httpHost + "/players" + "?" + this.getXhrHead() + "&user_ids=";
            for (var i = user_ids.length - 1; i >= 0; i--) {
                xhrUrl += user_ids[i] + ",";
            }
            xhrUrl = xhrUrl.substr(0, xhrUrl.length - 1);
            xhr.open("GET", xhrUrl, true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //{:id1 : {name:"string", img:"string"}}
                    var listData = JSON.parse(xhr.responseText);
                    //加个回调
                    if (_this.getPlayerNameAndImgCallBack && _this.getPlayerNameAndImgCallBackObj) {
                        _this.getPlayerNameAndImgCallBack.apply(_this.getPlayerNameAndImgCallBackObj, [listData]);
                        _this.getPlayerNameAndImgCallBack = null;
                        _this.getPlayerNameAndImgCallBackObj = null;
                    }
                    else {
                        _this.sendNotification(game.NotifyConst.Notify_Update_PlayerName, listData);
                    }
                    if (isPop) {
                        _this.sendNotification(game.NotifyConst.Notify_Update_PlayerNamePop, listData);
                    }
                    game.DebugUtil.debug(xhr.responseText, game.LogConst.LOGTYPE_MSG_RECV);
                }
                else if (xhr.status > 0) {
                    _this.onGetError(xhr.responseText);
                }
            };
            xhr.onerror = function (err) {
                _this.onGetError(err);
            };
            xhr.send(null);
        };
        /**网络请求失败 */
        PersonalInfoController.prototype.onGetError = function (e) {
            game.DebugUtil.debug("网络请求失败:" + e);
        };
        return PersonalInfoController;
    }(game.BaseController));
    game.PersonalInfoController = PersonalInfoController;
    __reflect(PersonalInfoController.prototype, "game.PersonalInfoController");
})(game || (game = {}));
//# sourceMappingURL=PersonalInfoController.js.map