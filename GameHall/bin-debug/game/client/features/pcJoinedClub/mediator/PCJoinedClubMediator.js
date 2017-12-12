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
    var PCJoinedClubMediator = (function (_super) {
        __extends(PCJoinedClubMediator, _super);
        function PCJoinedClubMediator() {
            var _this = _super.call(this) || this;
            /** 页数*/
            _this._pageIndex = 1;
            return _this;
        }
        /** 上一次的俱乐部列表 */
        // private lastListData
        /**初始化 房间内的数据对象 */
        PCJoinedClubMediator.prototype.initClientData = function () {
            this.lastNum = 0;
            this.isFirst = true;
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        PCJoinedClubMediator.prototype.initUI = function () {
            this.ui = new game.PCJoinedClubUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_PCJoinedClub.layer);
        };
        /** 开始处理数据 */
        PCJoinedClubMediator.prototype.initData = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_LeftBar.name);
            this.sendNotification(game.NotifyConst.Notify_PCNavChangeIcon, "card");
            this.addRegister(game.Mediators.Mediator_PCJoinedClub.name, this);
            this.notifyUI(PCJoinedCommands.initListener, this);
            this.pageIndex = 1;
        };
        /**
         * 子类需要重写
         * */
        PCJoinedClubMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_LeaveClub
            ];
        };
        /**
         * 子类需要重写
         * */
        PCJoinedClubMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_LeaveClub:
                    this.getListData();
                    break;
            }
        };
        /** 获取model数据*/
        PCJoinedClubMediator.prototype.getListData = function () {
            var _this = this;
            var pageNum = 10;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Joined, pageNum * this.pageIndex)
                .then(function () {
                var model = game.ClubModel.getInstance();
                var listData = model.getClubList(game.ClubModel.ClubType_Joined);
                listData.sort(function (a, b) {
                    return b.join_time - a.join_time;
                });
                var num = game.ClubModel.getInstance().getJoinedClubNum();
                _this.notifyUI(PCJoinedCommands.showTotalClub, num);
                if (_this.isFirst) {
                    _this.isFirst = false;
                    if (listData.length <= 0)
                        _this.notifyUI(PCJoinedCommands.showGroupTip);
                }
                if (_this.pageIndex * 10 >= num) {
                    _this.notifyUI(PCJoinedCommands.setAllLoaded);
                }
                else {
                    _this.notifyUI(PCJoinedCommands.hidenListLoading);
                }
                var arr = listData.slice((_this.pageIndex - 1) * 10, _this.pageIndex * 10);
                if (arr.length > 0) {
                    _this.notifyUI(PCJoinedCommands.getListData, arr);
                }
            }).catch(function (e) {
                _this.notifyUI(PCCreatedCommands.showGroupTip);
                game.DebugUtil.debug("打开俱乐部列表错误" + e);
            });
        };
        Object.defineProperty(PCJoinedClubMediator.prototype, "pageIndex", {
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
        PCJoinedClubMediator.prototype.pullUpRefreshList = function () {
            this.pageIndex--;
        };
        /** 下拉加载*/
        PCJoinedClubMediator.prototype.pullDownRefreshList = function () {
            this.pageIndex++;
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        PCJoinedClubMediator.prototype.dispose = function () {
            this.isFirst = true;
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_PCJoinedClub.name);
        };
        return PCJoinedClubMediator;
    }(game.BaseMediator));
    game.PCJoinedClubMediator = PCJoinedClubMediator;
    __reflect(PCJoinedClubMediator.prototype, "game.PCJoinedClubMediator");
})(game || (game = {}));
//# sourceMappingURL=PCJoinedClubMediator.js.map