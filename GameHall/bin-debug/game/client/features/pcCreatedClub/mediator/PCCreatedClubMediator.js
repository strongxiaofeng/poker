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
    var PCCreatedClubMediator = (function (_super) {
        __extends(PCCreatedClubMediator, _super);
        function PCCreatedClubMediator() {
            var _this = _super.call(this) || this;
            _this._pageIndex = 1;
            return _this;
        }
        /**初始化 房间内的数据对象 */
        PCCreatedClubMediator.prototype.initClientData = function () {
            this.lastNum = 0;
            this.isFirst = true;
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        PCCreatedClubMediator.prototype.initUI = function () {
            this.ui = new game.PCCreatedClubUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCCreatedClub.layer);
        };
        /** 开始处理数据 */
        PCCreatedClubMediator.prototype.initData = function () {
            this.sendNotification(game.NotifyConst.Notify_PCNavChangeIcon, "card");
            game.MediatorManager.closeMediator(game.Mediators.Mediator_LeftBar.name);
            this.addRegister(game.Mediators.Mediator_PCCreatedClub.name, this);
            this.notifyUI(PCCreatedCommands.initListener, this);
            // this.requestCreatedClubList();
            // this.getListData();
            this.totalListData();
            this.pageIndex = 1;
        };
        /**
         * 子类需要重写
         * */
        PCCreatedClubMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_LeaveClub,
            ];
        };
        /**
         * 子类需要重写
         * */
        PCCreatedClubMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_LeaveClub:
                    this.getListData();
                    this.totalListData();
                    break;
            }
        };
        /** 获取俱乐部统计数据*/
        PCCreatedClubMediator.prototype.totalListData = function () {
            var _this = this;
            var createdClubNum = (game.ClubModel.getInstance().getCreatedClubNum() + 1) || 1;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, createdClubNum)
                .then(function () {
                var model = game.ClubModel.getInstance();
                var listData = model.getClubList(game.ClubModel.ClubType_Created);
                _this.requestPlayerOnline(listData); //获取在线人数
                _this.requestRoomNum(listData); //获取房间数
            }).catch(function (e) {
                game.DebugUtil.debug("获取俱乐部统计数据错误" + e);
            });
        };
        /** 获取俱乐部列表数据*/
        PCCreatedClubMediator.prototype.getListData = function () {
            var _this = this;
            var pageNum = 10;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, pageNum * this.pageIndex)
                .then(function () {
                var model = game.ClubModel.getInstance();
                var listData = model.getClubList(game.ClubModel.ClubType_Created);
                _this.requestClubShares(listData);
                listData.sort(function (a, b) {
                    return b.create_time - a.create_time;
                });
                var num = game.ClubModel.getInstance().getCreatedClubNum();
                _this.notifyUI(PCCreatedCommands.showTotalNum, num);
                if (_this.isFirst) {
                    _this.isFirst = false;
                    if (listData.length <= 0)
                        _this.notifyUI(PCCreatedCommands.showGroupTip);
                }
                if (_this.pageIndex * pageNum >= num) {
                    _this.notifyUI(PCCreatedCommands.setAllLoaded);
                }
                else {
                    _this.notifyUI(PCCreatedCommands.hidenListLoading);
                }
                var arr = listData.slice((_this.pageIndex - 1) * pageNum, _this.pageIndex * pageNum);
                if (arr.length > 0) {
                    _this.notifyUI(PCCreatedCommands.getListData, arr);
                }
            }).catch(function (e) {
                _this.notifyUI(PCCreatedCommands.showGroupTip);
                game.DebugUtil.debug("打开俱乐部列表错误" + e);
            });
        };
        /**获取这些俱乐部的分享链接 */
        PCCreatedClubMediator.prototype.requestClubShares = function (listData) {
            for (var i = 0; i < listData.length; i++) {
                game.GameController.getInstance().getShareUrl(listData[i].id);
            }
        };
        Object.defineProperty(PCCreatedClubMediator.prototype, "pageIndex", {
            get: function () {
                return this._pageIndex;
            },
            set: function (v) {
                this._pageIndex = v;
                if (this._pageIndex == 0) {
                    this._pageIndex = 1;
                }
                this.getListData();
            },
            enumerable: true,
            configurable: true
        });
        /** 上拉加载*/
        PCCreatedClubMediator.prototype.pullUpRefreshList = function () {
            this.pageIndex--;
        };
        /** 下拉加载*/
        PCCreatedClubMediator.prototype.pullDownRefreshList = function () {
            this.pageIndex++;
        };
        /** 请求在线人数*/
        PCCreatedClubMediator.prototype.requestPlayerOnline = function (data) {
            var _this = this;
            if (!data)
                data = [];
            var allPromise = [];
            for (var i = 0; i < data.length; i++) {
                /** 请求下在线人数promise*/
                allPromise.push(game.ClubController.getInstance().getOnlinePlayer(data[i].id + ""));
            }
            Promise.all(allPromise).then(function (data) {
                _this.notifyUI(PCCreatedCommands.getPlayerOnline, data);
            }).catch(function (e) {
                game.DebugUtil.debug(e + "请求在线人数失败");
            });
        };
        /** 请求房间数*/
        PCCreatedClubMediator.prototype.requestRoomNum = function (data) {
            var createdNum = game.ClubModel.getInstance().getCreatedClubNum();
            var list = game.ClubModel.getInstance().getClubList(game.ClubModel.ClubType_Created, createdNum);
            var roomNum = 0;
            var playerNum = 0;
            list.forEach(function (info) {
                roomNum += info.rooms_count || 0;
                playerNum += info.online_users || 0;
            });
            this.notifyUI(PCCreatedCommands.getRoomNum, roomNum);
            this.notifyUI(PCCreatedCommands.getPlayerOnline, playerNum);
        };
        /** 关闭mediator, 要清除他的ui和数据,不再接受通知*/
        PCCreatedClubMediator.prototype.dispose = function () {
            this.isFirst = true;
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_PCCreatedClub.name);
        };
        return PCCreatedClubMediator;
    }(game.BaseMediator));
    game.PCCreatedClubMediator = PCCreatedClubMediator;
    __reflect(PCCreatedClubMediator.prototype, "game.PCCreatedClubMediator");
})(game || (game = {}));
//# sourceMappingURL=PCCreatedClubMediator.js.map