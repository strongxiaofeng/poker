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
    var ExitClubMediator = (function (_super) {
        __extends(ExitClubMediator, _super);
        function ExitClubMediator() {
            var _this = _super.call(this) || this;
            _this._pageIndex = 1;
            return _this;
        }
        /**初始化 房间内的数据对象 */
        ExitClubMediator.prototype.initClientData = function () {
            this.lastNum = 0;
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        ExitClubMediator.prototype.initUI = function () {
            if (game.GlobalConfig.isMobile) {
                this.ui = new game.ExitClubUI1();
            }
            else {
                this.ui = new game.PCExitClubUI1();
            }
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ExitClub.layer);
        };
        /** 开始处理数据 */
        ExitClubMediator.prototype.initData = function () {
            if (game.GlobalConfig.isMobile) {
                this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
                if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_ClubTopUI.name)) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_ClubTopUI);
                }
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, "退出俱乐部");
                this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, {
                    mediator: game.Mediators.Mediator_PersonalInformation
                });
            }
            else {
                var info = new game.MenuInfo();
                info.level = 2;
                info.mediatorClass = game.Mediators.Mediator_ExitClub;
                info.ui = this.ui;
                this.sendNotification(game.NotifyConst.Notify_PC_AddMenu, info);
            }
            this.addRegister(game.Mediators.Mediator_ExitClub.name, this);
            this.notifyUI(ExitClubCommands.initListener, this);
            // this.requestJoinedClubList();
            this.pageIndex = 1;
        };
        /**
         * 子类需要重写
         * */
        ExitClubMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_LeaveClub,
            ];
        };
        /**
         * 子类需要重写
         * */
        ExitClubMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_LeaveClub:
                    this.getListData();
                    break;
            }
        };
        // /** 请求列表*/
        // public requestJoinedClubList(): void {
        // 	let model = ClubModel.getInstance();
        // 	let totalJoin = model.getJoinedClubNum();
        // 	let joinNum = 0;
        // 	this.lastNum += 20;
        // 	joinNum = Math.min(this.lastNum, totalJoin);
        // 	if(totalJoin <= 0) return;
        // 	ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, joinNum)
        // 	.then(() => {
        // 		DebugUtil.debug("用户操作更新");
        // 	}).catch(() => {
        // 		DebugUtil.debug("打开俱乐部列表错误");
        // 	});
        // }
        /** 获取model数据*/
        ExitClubMediator.prototype.getListData = function () {
            var _this = this;
            var pageNum = 10;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Joined, pageNum * this.pageIndex)
                .then(function () {
                var model = game.ClubModel.getInstance();
                var listData = model.getClubList(game.ClubModel.ClubType_Joined);
                var n = game.ClubModel.getInstance().getJoinedClubNum();
                _this.notifyUI(ExitClubCommands.showAllNum, n);
                listData.sort(function (a, b) {
                    return b.create_time - a.create_time;
                });
                var num = game.ClubModel.getInstance().getJoinedClubNum();
                if (_this.pageIndex * pageNum >= num) {
                    _this.notifyUI(ExitClubCommands.setAllLoaded);
                }
                else {
                    _this.notifyUI(ExitClubCommands.hidenListLoading);
                }
                var arr = listData.slice((_this.pageIndex - 1) * pageNum, _this.pageIndex * pageNum);
                if (arr.length > 0) {
                    _this.notifyUI(ExitClubCommands.showList, arr);
                }
                if (arr.length == 0 && game.ClubModel.getInstance().getJoinedClubNum() == 0) {
                    _this.notifyUI(ExitClubCommands.showList, arr);
                }
            }).catch(function () {
                game.DebugUtil.debug("打开俱乐部列表错误");
            });
        };
        Object.defineProperty(ExitClubMediator.prototype, "pageIndex", {
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
        ExitClubMediator.prototype.pullUpRefreshList = function () {
            this.pageIndex--;
        };
        /** 下拉加载*/
        ExitClubMediator.prototype.pullDownRefreshList = function () {
            this.pageIndex++;
        };
        /** 关闭mediator, 要清除他的ui和数据,不再接受通知*/
        ExitClubMediator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeRegister(game.Mediators.Mediator_ExitClub.name);
        };
        return ExitClubMediator;
    }(game.BaseMediator));
    game.ExitClubMediator = ExitClubMediator;
    __reflect(ExitClubMediator.prototype, "game.ExitClubMediator");
})(game || (game = {}));
//# sourceMappingURL=ExitClubMediator.js.map