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
    var ClubHomeMediator = (function (_super) {
        __extends(ClubHomeMediator, _super);
        function ClubHomeMediator() {
            var _this = _super.call(this) || this;
            _this._pageIndex = 1;
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**初始化 房间内的数据对象 */
        ClubHomeMediator.prototype.initClientData = function () {
        };
        /** 初始化皮肤*/
        ClubHomeMediator.prototype.initUI = function () {
            var currentUI;
            currentUI = egret.getDefinitionByName("game.ClubHomeUI" + game.GlobalConfig.multiSkinType);
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ClubHome.layer);
        };
        /** 分发数据 */
        ClubHomeMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_ClubHome.name, this);
            this.notifyUI(ClubHomeCommand.initListener, this);
            this.initeData();
            this.initeFunction();
            this.sendNotification(game.NotifyConst.Notify_SetNavbar, "club");
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, true);
            this.sendNotification(game.NotifyConst.Notify_HideAssistiveTouch);
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        ClubHomeMediator.prototype.listNotification = function () {
            return [
                // NotifyConst.Notify_ClubList,
                game.NotifyConst.Notify_RoomCard
            ];
        };
        /** 接收通知 */
        ClubHomeMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                // case NotifyConst.Notify_ClubList:
                // 	this.updateList();
                // 	break;
                case game.NotifyConst.Notify_RoomCard:
                    this.updateRoomCard();
                    break;
            }
        };
        // ---------------------------------- 更新 ----------------------------------
        /** 初始化函数*/
        ClubHomeMediator.prototype.initeFunction = function () {
            this.pageIndex = 1;
            this.updateUserFace();
            this.updateRoomCard();
            this.updateNickName();
        };
        /** 初始化变量*/
        ClubHomeMediator.prototype.initeData = function () {
            this.lastNum = 0;
            this.isfirst = true;
        };
        /** 更新头像*/
        ClubHomeMediator.prototype.updateUserFace = function () {
            var model = game.PersonalInfoModel.getInstance();
            var face = model.avatar;
            this.notifyUI(ClubHomeCommand.updateUserInfo, face);
        };
        /** 更新房卡信息*/
        ClubHomeMediator.prototype.updateRoomCard = function () {
            var RoomCard = game.ClubModel.getInstance().getRoomCardNum();
            this.notifyUI(ClubHomeCommand.updateRoomCard, RoomCard);
        };
        /** 更新昵称*/
        ClubHomeMediator.prototype.updateNickName = function () {
            var nick = game.PersonalInfoModel.getInstance().nick;
            this.notifyUI(ClubHomeCommand.updateNickName, nick);
        };
        /** 更新的回调*/
        ClubHomeMediator.prototype.requestData = function () {
            var _this = this;
            var model = game.ClubModel.getInstance();
            var totalCreated = model.getCreatedClubNum();
            var totalJoined = model.getJoinedClubNum();
            var createNum = 0;
            var joinNum = 0;
            /** 只请求创建的 */
            if (this.lastNum + 10 <= totalCreated) {
                createNum = this.lastNum + 10;
            }
            /** 创建的请求完了，还不够，还要再请求加入的*/
            if (this.lastNum < totalCreated && this.lastNum + 10 > totalCreated) {
                createNum = totalCreated;
                joinNum = this.lastNum + 10 - totalCreated;
            }
            /** 请求完了创建的，请求加入的*/
            if (this.lastNum >= totalCreated) {
                createNum = totalCreated;
                joinNum = this.lastNum + 10 - totalCreated;
            }
            joinNum = Math.min(joinNum, totalJoined);
            var created;
            if (createNum)
                created = game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, totalCreated);
            var joined;
            if (joinNum)
                joined = game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Joined, joinNum);
            Promise.all([created, joined]).then(function () {
                _this.updateList();
                game.DebugUtil.debug("用户操作更新");
            }).catch(function () {
                game.DebugUtil.debug("打开俱乐部列表错误");
            });
        };
        /**获取这些创建的俱乐部的分享链接 */
        ClubHomeMediator.prototype.requestClubShares = function (listData) {
            for (var i = 0; i < listData.length; i++) {
                game.GameController.getInstance().getShareUrl(listData[i].id);
            }
        };
        /** 更新列表*/
        ClubHomeMediator.prototype.updateList = function () {
            var model = game.ClubModel.getInstance();
            var totalCreated = model.getCreatedClubNum();
            var totalJoined = model.getJoinedClubNum();
            if (this.pageIndex * 10 >= totalCreated + totalJoined) {
                this.notifyUI(ClubHomeCommand.setAllLoaded);
            }
            else {
                this.notifyUI(ClubHomeCommand.hidenListLoading);
            }
            var createNum = 0;
            var joinNum = 0;
            if (this.lastNum + 10 <= totalCreated) {
                createNum = this.lastNum + 10;
            }
            if (this.lastNum < totalCreated && this.lastNum + 10 > totalCreated) {
                createNum = totalCreated;
                joinNum = this.lastNum + 10 - totalCreated;
            }
            if (this.lastNum >= totalCreated) {
                createNum = totalCreated;
                joinNum = this.lastNum + 10 - totalCreated;
            }
            joinNum = Math.min(joinNum, totalJoined);
            /** 取数据*/
            var CreatedListdata = model.getClubList(game.ClubModel.ClubType_Created, createNum);
            var JoinedListdata = model.getClubList(game.ClubModel.ClubType_Joined, joinNum);
            this.requestClubShares(CreatedListdata);
            /** 取id*/
            for (var i = 0; i < CreatedListdata.length; i++) {
                CreatedListdata[i]["type"] = "Create";
            }
            for (var i = 0; i < JoinedListdata.length; i++) {
                JoinedListdata[i]["type"] = "Join";
            }
            this.lastNum = CreatedListdata.length + JoinedListdata.length;
            /** 排序*/
            CreatedListdata.sort(function (a, b) {
                return b.create_time - a.create_time;
            });
            JoinedListdata.sort(function (a, b) {
                return b.order_by - a.order_by;
            });
            /** 总的数组 listData*/
            var listData = [];
            if (CreatedListdata.length > 0)
                listData = listData.concat(CreatedListdata);
            if (JoinedListdata.length > 0)
                listData = listData.concat(JoinedListdata);
            var arr = listData.slice((this.pageIndex - 1) * 10, this.pageIndex * 10);
            if (arr.length > 0) {
                var numCreate = 0;
                var numJoin = 0;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].type == "Create")
                        numCreate++;
                    if (arr[i].type == "Join")
                        numJoin++;
                }
                var creatN = model.getClubList(game.ClubModel.ClubType_Created, totalCreated);
                if (numCreate > 0)
                    arr.splice(0, 0, { type: "Label", listData: creatN });
                if (numJoin > 0) {
                    if (numCreate == 0) {
                        arr.splice(0, 0, { type: "Label", listData: "joined" });
                    }
                    else {
                        arr.splice(numCreate + 1, 0, { type: "Label", listData: "joined" });
                    }
                }
                this.notifyUI(ClubHomeCommand.updateList, arr);
            }
            else {
                if (this.isfirst) {
                    this.isfirst = false;
                    this.notifyUI(ClubHomeCommand.showTip);
                }
                else {
                    this.notifyUI(ClubHomeCommand.hidenListLoading);
                }
            }
        };
        Object.defineProperty(ClubHomeMediator.prototype, "pageIndex", {
            get: function () {
                return this._pageIndex;
            },
            set: function (v) {
                this._pageIndex = v;
                if (this._pageIndex == 0) {
                    this._pageIndex = 1;
                }
                this.requestData();
            },
            enumerable: true,
            configurable: true
        });
        /** 上拉加载*/
        ClubHomeMediator.prototype.pullUpRefreshList = function () {
            this.pageIndex--;
        };
        /** 下拉加载*/
        ClubHomeMediator.prototype.pullDownRefreshList = function () {
            this.pageIndex++;
        };
        // ---------------------------------- dispose ----------------------------------
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        ClubHomeMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_ClubHome.name);
        };
        return ClubHomeMediator;
    }(game.BaseMediator));
    game.ClubHomeMediator = ClubHomeMediator;
    __reflect(ClubHomeMediator.prototype, "game.ClubHomeMediator");
})(game || (game = {}));
//# sourceMappingURL=ClubHomeMediator.js.map