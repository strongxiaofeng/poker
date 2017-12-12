var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var NotifyModel = (function () {
        function NotifyModel() {
            this._unread_ann = 0;
            this._unread_sys = 0;
            this._unread_chat = 0;
            this._headImgUrls = new game.Dictionary();
        }
        NotifyModel.prototype.clearData = function () {
            this._unread_ann = 0;
            this._unread_sys = 0;
            this._unread_chat = 0;
            this._headImgUrls = new game.Dictionary();
        };
        /**存储一波头像和昵称地址 value:{nick, avatar}*/
        NotifyModel.prototype.setHeadImgUrl = function (user_id, obj) {
            if (user_id && obj) {
                this._headImgUrls.setValue(user_id, obj);
            }
            else {
                game.DebugUtil.debug("存储头像地址失败，value或者userid不合法");
            }
        };
        /**取某人的狗头的url地址 */
        NotifyModel.prototype.getHeadImgUrlAndNick = function (user_id) {
            return this._headImgUrls.getValue(user_id);
        };
        /**清除所有存储的头像地址 */
        NotifyModel.prototype.clearHeadImgUrls = function () {
        };
        NotifyModel.getInstance = function () {
            if (this._instance == null) {
                this._instance = new NotifyModel();
            }
            return this._instance;
        };
        Object.defineProperty(NotifyModel.prototype, "unread_ann", {
            set: function (value) {
                this._unread_ann = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyModel.prototype, "unread_sys", {
            set: function (value) {
                this._unread_sys = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyModel.prototype, "chatList", {
            get: function () {
                return this._chatList;
            },
            set: function (value) {
                this._chatList = value;
                this._unread_chat = 0;
                var arr = value.snapshot.record;
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].last_message.read == "unread") {
                        this._unread_chat++;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyModel.prototype, "sysList", {
            set: function (value) {
                // this._unread_sys = 0;
                this._sysList = value;
                // for(let i = value.messages.length -1;i >= 0;i--)
                // {
                // 	if(!value.messages[i].is_read)
                // 	{
                // 		this._unread_sys++;
                // 	}
                // }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyModel.prototype, "unread_count", {
            get: function () {
                return this._unread_ann + this._unread_sys + this._unread_chat;
            },
            enumerable: true,
            configurable: true
        });
        return NotifyModel;
    }());
    game.NotifyModel = NotifyModel;
    __reflect(NotifyModel.prototype, "game.NotifyModel");
})(game || (game = {}));
//# sourceMappingURL=NotifyModel.js.map