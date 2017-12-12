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
    var HomeOwnerMediator = (function (_super) {
        __extends(HomeOwnerMediator, _super);
        function HomeOwnerMediator() {
            return _super.call(this) || this;
        }
        ;
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        HomeOwnerMediator.prototype.initClientData = function () {
            this.initecode();
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        HomeOwnerMediator.prototype.initUI = function () {
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.HomeOwnerUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCHomeOwnerUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_HomeOwner.layer);
        };
        /** 分发游戏数据*/
        HomeOwnerMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_HomeOwner.name, this);
            this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_ClubTopUI.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubTopUI);
            }
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, "我是房主");
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_ClubHome });
            this.notifyUI(HomeOwnerCommands.initListener, this);
            this.updateAll();
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        HomeOwnerMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_ClubList,
            ];
        };
        /** 接收通知 */
        HomeOwnerMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_ClubList:
                    this.updateList();
            }
        };
        // ---------------------------------- 更新 ----------------------------------
        /** 初始化变量*/
        HomeOwnerMediator.prototype.initecode = function () {
            this.isUpdating = false;
            this.isShowTipLoading = false;
            this.LastCreateNum = 0;
        };
        /** 更新全部*/
        HomeOwnerMediator.prototype.updateAll = function () {
            this.sendUpdate();
            this.updateTop();
            this.updateRooms();
            this.updatePlayers();
        };
        /** 更新返回*/
        HomeOwnerMediator.prototype.sendUpdate = function () {
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, this.LastCreateNum + 10)
                .then(function () {
                game.DebugUtil.debug("用户操作更新");
            }).catch(function () {
                game.DebugUtil.debug("打开俱乐部列表错误");
            });
        };
        /** 更新top*/
        HomeOwnerMediator.prototype.updateTop = function () {
            var model = game.ClubModel.getInstance();
            var card = model.getRoomCardNum();
            var nick = game.PersonalInfoModel.getInstance().nick;
            var clubs = model.getCreatedClubNum();
            this.notifyUI(HomeOwnerCommands.updateNick, nick);
            this.notifyUI(HomeOwnerCommands.updateCard, card);
            this.notifyUI(HomeOwnerCommands.updateClubNum, clubs);
        };
        /** 请求在线人数*/
        HomeOwnerMediator.prototype.updatePlayers = function () {
            var model = game.ClubModel.getInstance();
            var CreatedListdata = model.getClubList(game.ClubModel.ClubType_Created);
            var allPromise = [];
            var num = 0;
            for (var i = CreatedListdata.length - 1; i >= 0; i--) {
                var pro = game.ClubController.getInstance().getOnlinePlayer(CreatedListdata[i].id + "");
                allPromise.push(pro);
            }
            Promise.all(allPromise).then(function (counts) {
                for (var key in counts[0]) {
                    num += counts[key];
                }
            }).catch(function (e) {
                game.DebugUtil.debug(e);
            });
            this.notifyUI(HomeOwnerCommands.updatePlayers, num);
        };
        /** 请求房间数*/
        HomeOwnerMediator.prototype.updateRooms = function () {
            var _this = this;
            var model = game.ClubModel.getInstance();
            var clublist = model.getClubList(game.ClubModel.ClubType_Created);
            var arr = [];
            var allPromise = [];
            for (var j = 0; j < clublist.length; j++) {
                var pro = game.ClubController.getInstance().getSubscribeClub(+(clublist[j].id));
                allPromise.push(pro);
            }
            Promise.all(allPromise).then(function (data) {
                for (var j = 0; j < data.length; j++) {
                    var num = 0;
                    for (var key in data[j].snapshot.rooms) {
                        num++;
                    }
                    arr.push(num);
                }
                _this.notifyUI(HomeOwnerCommands.updateRooms, arr);
            }).catch(function (e) {
                game.DebugUtil.debug("订阅俱乐部房间失败: " + e);
            });
        };
        /** 更新列表*/
        HomeOwnerMediator.prototype.updateList = function () {
            /** 取数据，然后发通知*/
            var model = game.ClubModel.getInstance();
            var CreatedListdata = model.getClubList(game.ClubModel.ClubType_Created);
            for (var i = 0; i < CreatedListdata.length; i++) {
                CreatedListdata[i]["type"] = "Create";
            }
            if (CreatedListdata.length == this.LastCreateNum) {
                this.setLoading(true, true, 3);
            }
            this.LastCreateNum = CreatedListdata.length;
            this.notifyUI(HomeOwnerCommands.updataClub, CreatedListdata);
        };
        /** 显示更新加载图*/
        HomeOwnerMediator.prototype.setLoading = function (show, isTimeout, num) {
            if (isTimeout === void 0) { isTimeout = false; }
            if (show) {
                this.notifyUI(HomeOwnerCommands.setLoading, [show, isTimeout, num]);
            }
            else {
                this.notifyUI(HomeOwnerCommands.setLoading, [false]);
                this.isUpdating = false;
                this.isShowTipLoading = false;
            }
        };
        // ---------------------------------- 用户操作 ----------------------------------
        /** 拉动列表*/
        HomeOwnerMediator.prototype.pullList = function (e) {
            var _this = this;
            var list = e.target.viewport;
            if (this.isUpdating) {
                this.notifyUI(HomeOwnerCommands.setScrollV, 160);
                if (this.isShowTipLoading) {
                    this.setLoading(true, true, 3);
                    if (list.scrollV + list.height - list.contentHeight < 0) {
                        this.setLoading(false);
                    }
                    this.timeoutObj["isShowTipLoading"] = setTimeout(function () {
                        _this.setLoading(false);
                        _this.notifyUI(HomeOwnerCommands.setScrollV, 0);
                    }, 3000);
                }
                else {
                    //返回数据之后关闭loading
                    this.timeoutObj["test"] = setTimeout(function () {
                        _this.setLoading(false);
                        _this.notifyUI(HomeOwnerCommands.setScrollV, 0);
                    }, 3000);
                }
                return;
            }
            if (list.scrollV + list.height - list.contentHeight > 100 && list.scrollV + list.height - list.contentHeight < 150) {
                this.setLoading(true, false, 1);
            }
            else if (list.scrollV + list.height - list.contentHeight > 150) {
                this.isUpdating = true;
                this.setLoading(true, true, 2);
                this.sendUpdate();
            }
            else {
                this.setLoading(false);
            }
        };
        // ---------------------------------- dispose ----------------------------------
        HomeOwnerMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_HomeOwner.name);
            _super.prototype.dispose.call(this);
        };
        return HomeOwnerMediator;
    }(game.BaseMediator));
    game.HomeOwnerMediator = HomeOwnerMediator;
    __reflect(HomeOwnerMediator.prototype, "game.HomeOwnerMediator");
})(game || (game = {}));
//# sourceMappingURL=HomeOwnerMediator.js.map