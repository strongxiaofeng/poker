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
    var HomeMediator = (function (_super) {
        __extends(HomeMediator, _super);
        function HomeMediator() {
            return _super.call(this) || this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /** 初始化 房间内的数据对象 */
        HomeMediator.prototype.initClientData = function () {
            this.isLocked = false;
        };
        /** 初始化 当前皮肤类型界面 pc还是移动，哪一套UI */
        HomeMediator.prototype.initUI = function () {
            var _this = this;
            var currentUI;
            if (game.GlobalConfig.isMobile) {
                currentUI = egret.getDefinitionByName("game.HomeUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                currentUI = egret.getDefinitionByName("game.PCHomeUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Home.layer);
            var promiseClub1 = game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, 5);
            var promiseClub2 = game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Joined, 5);
            Promise.all([
                promiseClub1,
                promiseClub2
            ]).then(function () {
                _this.initClubInfo();
            }).catch(function () {
                game.DebugUtil.debug("首页获取俱乐部列表信息失败");
            });
        };
        /** 分发游戏数据 */
        HomeMediator.prototype.initData = function () {
            game.CommonLoadingUI.getInstance().stop();
            if (game.GameModel.invitationData)
                this.invitationTip();
            game.MediatorManager.closeMediator(game.Mediators.Mediator_LeftBar.name);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            this.sendNotification(game.NotifyConst.Notify_HideAssistiveTouch);
            this.addRegister(game.Mediators.Mediator_Home.name, this);
            this.notifyUI(HomeUICommands.initListener, this);
            this.notifyUI(HomeUICommands.showAvatar);
            this.notifyUI(HomeUICommands.showNickName, game.PersonalInfoModel.getInstance().nick);
            this.notifyUI(HomeUICommands.setCardLabel, game.ClubModel.getInstance().getRoomCardNum());
            this.sendNotification(game.NotifyConst.Notify_PCNavChangeIcon, "card");
        };
        /** 显示首页俱乐部信息 */
        HomeMediator.prototype.initClubInfo = function () {
            var _this = this;
            var clubInfo = game.ClubModel.getInstance().getHomeClub();
            this.notifyUI(HomeUICommands.showClub, clubInfo);
            if (!clubInfo)
                return;
            this.clubId = clubInfo.id;
            this.creator = clubInfo.creator;
            if (clubInfo && clubInfo.id) {
                this.getRecentClub();
                this.getRooms();
                this.requestData();
                game.ClubController.getInstance().getClubGameType(clubInfo.id)
                    .then(function (arr) {
                    _this.notifyUI(HomeUICommands.updateClubGameType, arr);
                }).catch(function (e) {
                    game.DebugUtil.debug("请求首页俱乐部游戏类型失败" + e.message);
                });
                if (clubInfo.creator == +game.PersonalInfoModel.getInstance().user_id) {
                    this.getOnlinePlayer();
                }
                else {
                    this.checkLocked();
                    this.requestChips(clubInfo.id);
                }
            }
        };
        // ---------------------------------- 通知与状态响应 ----------------------------------
        /** 注册通知 */
        HomeMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_PlayerInfo,
                game.NotifyConst.Notify_LockUser,
                game.NotifyConst.Notify_ClubList,
            ];
        };
        /** 接收通知 */
        HomeMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_PlayerInfo:
                    this.notifyUI(HomeUICommands.showNickName, game.PersonalInfoModel.getInstance().nick);
                    this.notifyUI(HomeUICommands.showAvatar);
                    break;
                case game.NotifyConst.Notify_LockUser:
                    this.checkLocked();
                    break;
                case game.NotifyConst.Notify_ClubList:
                    this.getRecentClub();
                    break;
            }
        };
        // ---------------------------------- 用户操作 ----------------------------------
        /** 点击俱乐部图标进入俱乐部*/
        HomeMediator.prototype.openClub = function (e) {
            var clubInfo = game.ClubModel.getInstance().getHomeClub();
            if (!clubInfo)
                return;
            if (this.creator == +game.PersonalInfoModel.getInstance().user_id) {
                game.CommonLoadingUI.getInstance().start();
                /** 创建的俱乐部,*/
                game.GlobalConfig.setClubId(clubInfo.id)
                    .then(function () {
                    game.CommonLoadingUI.getInstance().stop();
                    if (game.GlobalConfig.isMobile) {
                        game.MediatorManager.openMediator(game.Mediators.Mediator_HomeOwnerClub, game.Mediators.Mediator_Home);
                    }
                    else {
                        game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, true);
                        game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedRoomList);
                        game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn);
                    }
                })
                    .catch(function (e) {
                    game.CommonLoadingUI.getInstance().stop();
                    game.DebugUtil.debug(e.message + "订阅俱乐部失败");
                });
            }
            else {
                /** 加入的俱乐部*/
                this.openJoinedClub(clubInfo.name);
            }
        };
        // ---------------------------------- 刷新 ----------------------------------
        /** 判断是否被锁*/
        HomeMediator.prototype.checkLocked = function () {
            var club = game.ClubModel.getInstance().getHomeClub();
            if (!club)
                return;
            if (club.locked) {
                /** 被锁了 显示锁*/
                this.notifyUI(HomeUICommands.lockedShowOrHide, true);
                this.isLocked = true;
            }
            else {
                /** 没锁 隐藏锁*/
                this.notifyUI(HomeUICommands.lockedShowOrHide, false);
                this.isLocked = false;
            }
        };
        /** 首页俱乐部获取房间数量*/
        HomeMediator.prototype.getRooms = function () {
            var _this = this;
            var model = game.ClubModel.getInstance().getHomeClub();
            game.ClubController.getInstance().getSubscribeClub(model.id)
                .then(function (data) {
                var num = 0;
                for (var key in data.snapshot.rooms)
                    num++;
                _this.notifyUI(HomeUICommands.updateRooms, game.NumberUtil.getSplitNumStr(num * 100 || 0));
            })
                .catch(function (e) {
                game.DebugUtil.debug("获取首页俱乐部房间信息失败" + e);
            });
        };
        /** 请求俱乐部筹码余额*/
        HomeMediator.prototype.requestChips = function (clubId) {
            var _this = this;
            game.ClubController.getInstance().subscribeAccount(clubId, game.PersonalInfoModel.getInstance().user_id, true)
                .then(function () {
                var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id, clubId) || 0;
                _this.notifyUI(HomeUICommands.updateClubChips, balance);
            }).catch(function (e) {
                game.DebugUtil.debug(e + "订阅用户在某俱乐部的信息失败");
            });
        };
        /** 首页俱乐部获取在线人数*/
        HomeMediator.prototype.getOnlinePlayer = function () {
            var _this = this;
            var model = game.ClubModel.getInstance().getHomeClub();
            game.ClubController.getInstance().getOnlinePlayer("" + model.id)
                .then(function (count) {
                var num = game.NumberUtil.getSplitNumStr(+count * 100 || 0);
                _this.notifyUI(HomeUICommands.updateOnlinePlayer, num);
            }).catch(function (e) {
                game.DebugUtil.debug("获取在线人数失败" + e);
            });
        };
        /** 请求首页俱乐部最近三个数据*/
        HomeMediator.prototype.requestRecentClub = function () {
            var model = game.ClubModel.getInstance();
            var totalCreated = model.getCreatedClubNum();
            var totalJoined = model.getJoinedClubNum();
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, totalCreated);
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Joined, totalJoined);
        };
        /** 获取首页俱乐部最近三个数据*/
        HomeMediator.prototype.getRecentClub = function () {
            var model = game.ClubModel.getInstance();
            // let totalCreated = model.getCreatedClubNum();
            // let totalJoined = model.getJoinedClubNum();
            /** 取3个数据*/
            var recentCreatedClub = model.getClubList(game.ClubModel.ClubType_Created, 3);
            var recentJoinedClub = model.getClubList(game.ClubModel.ClubType_Joined, 3);
            recentCreatedClub.sort(function (a, b) {
                return a.create_time - b.create_time;
            });
            recentJoinedClub.sort(function (a, b) {
                return a.order_by - b.order_by;
            });
            var createArr = [];
            var joinArr = [];
            for (var i = 0; i < recentCreatedClub.length; i++) {
                createArr.push(recentCreatedClub[i].name);
            }
            for (var i = 0; i < recentJoinedClub.length; i++) {
                joinArr.push(recentJoinedClub[i].name);
            }
            this.notifyUI(HomeUICommands.updateRecentClub, [createArr, joinArr]);
        };
        /** 进入最近创建的俱乐部*/
        HomeMediator.prototype.openCreatedClub = function (e) {
            var info = game.ClubModel.getInstance().getCreatedClubByName(e.target.text);
            game.CommonLoadingUI.getInstance().start();
            game.GlobalConfig.setClubId(info.id)
                .then(function () {
                game.CommonLoadingUI.getInstance().stop();
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn, "createBtn");
                game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, true);
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedRoomList);
            }).catch(function (e) {
                game.CommonLoadingUI.getInstance().stop();
                game.DebugUtil.debug(e + "进入最近创建的俱乐部失败");
            });
        };
        /** 进入最近加入的俱乐部
         * 参数是俱乐部名称，判断是否被锁
        */
        HomeMediator.prototype.openJoinedClub = function (name) {
            var _this = this;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Joined, 10).then(function () {
                var model = game.ClubModel.getInstance();
                var recentJoinedClub = model.getClubList(game.ClubModel.ClubType_Joined, 10);
                for (var i = 0; i < recentJoinedClub.length; i++) {
                    if (recentJoinedClub[i].name == name) {
                        if (recentJoinedClub[i].locked) {
                            var tipData = new game.TipMsgInfo();
                            tipData.msg = [{ text: game.LanguageUtil.rePlaceLanguage("global_lbl_club_locked", "%s", recentJoinedClub[i].name), textColor: enums.ColorConst.Golden }];
                            tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                            tipData.comfirmCallBack = null;
                            tipData.thisObj = _this;
                            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                        }
                        else {
                            /** 进入俱乐部*/
                            _this.enterClub(recentJoinedClub[i].id);
                        }
                        return;
                    }
                }
            }).catch(function () {
                game.DebugUtil.debug("首页获取俱乐部列表信息失败");
            });
        };
        /** 进入俱乐部*/
        HomeMediator.prototype.enterClub = function (clubId) {
            game.CommonLoadingUI.getInstance().start();
            game.GlobalConfig.setClubId(clubId)
                .then(function () {
                game.CommonLoadingUI.getInstance().stop();
                if (game.GlobalConfig.isMobile) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_ClubGames, game.Mediators.Mediator_Home);
                }
                else {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedRoomList);
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn, "joinBtn");
                }
            }).catch(function (e) {
                game.CommonLoadingUI.getInstance().stop();
                game.DebugUtil.debug(e + "进入最近加入的俱乐部失败");
            });
        };
        /** 邀请码登陆提示*/
        HomeMediator.prototype.invitationTip = function () {
            var params = JSON.parse(JSON.stringify(game.GameModel.invitationData));
            this.notifyUI(HomeUICommands.showLoginErrTip, params);
            game.GameModel.invitationData = null;
        };
        /** 请求首页数据*/
        HomeMediator.prototype.requestData = function () {
            var _this = this;
            game.DataCenterController.getInstance().getHomeStatistics()
                .then(function (data) {
                _this.notifyUI(HomeUICommands.setClubData, data);
                // bet_total:0
                // recharge_in_total:0
                // recharge_out_total:0
            }).catch(function (e) {
                game.DebugUtil.debug(e + "请求首页数据失败");
            });
        };
        // ---------------------------------- dispose ----------------------------------
        HomeMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_Home.name);
            _super.prototype.dispose.call(this);
        };
        return HomeMediator;
    }(game.BaseMediator));
    game.HomeMediator = HomeMediator;
    __reflect(HomeMediator.prototype, "game.HomeMediator");
})(game || (game = {}));
//# sourceMappingURL=HomeMediator.js.map