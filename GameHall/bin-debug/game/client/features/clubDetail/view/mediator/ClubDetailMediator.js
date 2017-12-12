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
    /**
     * 俱乐部房间列表mediator组件
     * by 郑戎辰
     */
    var ClubDetailMediator = (function (_super) {
        __extends(ClubDetailMediator, _super);
        function ClubDetailMediator() {
            return _super.call(this) || this;
        }
        /**
         * 子类需要重写
         * */
        ClubDetailMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_Info,
                game.NotifyConst.Notify_Baccarat_Setting,
                game.NotifyConst.Notify_Baccarat_RoadMap,
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_Baccarat_RoomNameArr,
                game.NotifyConst.Notify_Baccarat_Enter,
                game.NotifyConst.Notify_Baccarat_EnterPwd,
                game.NotifyConst.Notify_LockUser,
                game.NotifyConst.Notify_RoomsInfo,
                game.NotifyConst.Notify_Baccarat_UpDataList,
                game.NotifyConst.Notify_PlayerBalance
            ];
        };
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        ClubDetailMediator.prototype.initUI = function () {
            this.ui = new game.ClubDetailUI1();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ClubDetail.layer);
        };
        /** 开始处理数据 */
        ClubDetailMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_ClubDetail.name, this);
            // 初始化监听
            this.notifyUI(ClubDetailUICommands.ClubDetailNotify_initListener);
            this.notifyUI(ClubDetailUICommands.ClubDetailNotify_clubRoomArr);
            // 设置TOP条名字
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            var name = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, name);
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, true);
            // 设置TOP条mediator指向和回调
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: game.Mediators.Mediator_ClubGames });
            // 设置用户名称
            this.notifyUI(ClubDetailUICommands.ClubDetailNotify_userName, game.PersonalInfoModel.getInstance().nick);
            var isMy = (game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).creator == (+game.PersonalInfoModel.getInstance().user_id) ? true : false);
            this.isMyClub(isMy);
            this.getRoomCard();
        };
        /**订阅其他人房卡数量 */
        ClubDetailMediator.prototype.getRoomCard = function () {
            if (!game.GlobalConfig.clubId)
                return;
            var creator_id = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).creator + "";
            game.ClubController.getInstance().getOtherRoomCard(creator_id).then(function (data) {
            });
        };
        /** 是否是我创建的 */
        ClubDetailMediator.prototype.isMyClub = function (b) {
            this.notifyUI(ClubDetailUICommands.ClubDetailNotify_isMy, b);
            if (b) {
                this.notifyUI(ClubDetailUICommands.ClubDetailNotify_HomeCardNum, game.ClubModel.getInstance().getRoomCardNum());
            }
            else {
                var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id);
                this.notifyUI(ClubDetailUICommands.ClubDetailNotify_userBalance, balance);
            }
        };
        /**
         * 子类需要重写
         * */
        ClubDetailMediator.prototype.handleNotification = function (type, body) {
            var _this = this;
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_Info:
                    break;
                case game.NotifyConst.Notify_Baccarat_Setting:
                    this.notifyUI(ClubDetailUICommands.ClubDetailNotify_setting, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoadMap:
                    this.notifyUI(ClubDetailUICommands.ClubDetailNotify_roadMap, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.notifyUI(ClubDetailUICommands.ClubDetailNotify_setting, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoomNameArr:
                    if (body == "/rooms/" + game.GlobalConfig.clubId) {
                        var arr = game.ClubModel.getInstance().getTheClubRooms();
                        if (arr && arr.length) {
                            var promiseArr = [];
                            for (var i = 0; i < arr.length; i++) {
                                var pro = game.ClubController.getInstance().getSubscribeRoom(arr[i]);
                                promiseArr.push(pro);
                            }
                            Promise.all(promiseArr).then(function () {
                                _this.notifyUI(ClubDetailUICommands.ClubDetailNotify_clubRoomArr);
                            });
                        }
                        else {
                            //没有房间也要发送一次通知 才好显示该俱乐部没有房间
                            this.notifyUI(ClubDetailUICommands.ClubDetailNotify_clubRoomArr);
                        }
                    }
                    break;
                case game.NotifyConst.Notify_Baccarat_UpDataList:
                    if (body == game.GlobalConfig.clubId) {
                        this.notifyUI(ClubDetailUICommands.ClubDetailNotify_clubRoomArr);
                    }
                    break;
                case game.NotifyConst.Notify_Baccarat_Enter:
                    this.reqEnterRoom(body);
                    break;
                case game.NotifyConst.Notify_Baccarat_EnterPwd:
                    this.reqEnterRoomPwd(body[0], body[1]);
                    break;
                case game.NotifyConst.Notify_LockUser:
                    if (body == game.GlobalConfig.clubId) {
                        var tipData = new game.TipMsgInfo();
                        tipData.msg = [{ text: '抱歉您在"' + game.ClubModel.getInstance().getClubInfo(body).name + '"的权限已被锁定 ， 请联系房主', textColor: enums.ColorConst.Golden }];
                        tipData.confirmText = "我知道了";
                        tipData.comfirmCallBack = this.confirmBack;
                        tipData.thisObj = this;
                        game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    }
                    break;
                case game.NotifyConst.Notify_PlayerBalance:
                    if (body == game.GlobalConfig.clubId) {
                        var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id);
                        this.notifyUI(ClubDetailUICommands.ClubDetailNotify_userBalance, balance);
                    }
                    break;
            }
        };
        /** 请求进入某个房间 */
        ClubDetailMediator.prototype.reqEnterRoom = function (roomID) {
            var _this = this;
            if (!roomID)
                return;
            game.CommonLoadingUI.getInstance().showConnect();
            var bool = game.ClubModel.getInstance().getlockBool(roomID);
            if (bool) {
                game.CommonLoadingUI.getInstance().stop();
                this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showPwd, roomID);
            }
            else {
                /**房主房卡*/
                var cardN = game.ClubModel.getInstance().getOtherRoomCardNum();
                if (cardN <= 0) {
                    this.notifyUI(ClubDetailUICommands.ClubDetailNotify_noRoomCard, "房主房卡不足，您暂时不能进行游戏。请联系房主。");
                    game.CommonLoadingUI.getInstance().stop();
                    return;
                }
                game.BaccaratModel.getInstance().sendRoomEnter(roomID).then(function () {
                    game.CommonLoadingUI.getInstance().stop();
                    game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, roomID);
                }).catch(function (e) {
                    game.CommonLoadingUI.getInstance().stop();
                    _this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showRedMsg, e.msg);
                    game.DebugUtil.error("", e);
                });
            }
        };
        /** 请求进入某个有密码的房间 */
        ClubDetailMediator.prototype.reqEnterRoomPwd = function (roomID, pwd) {
            var _this = this;
            game.CommonLoadingUI.getInstance().start();
            if (!roomID)
                return;
            /**房主房卡*/
            var cardN = game.ClubModel.getInstance().getOtherRoomCardNum();
            if (cardN <= 0) {
                this.notifyUI(ClubDetailUICommands.ClubDetailNotify_noRoomCard, "房主房卡不足，您暂时不能进行游戏。请联系房主。");
                game.CommonLoadingUI.getInstance().stop();
                return;
            }
            game.BaccaratModel.getInstance().sendRoomEnter(roomID, pwd).then(function () {
                game.CommonLoadingUI.getInstance().stop();
                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, roomID);
            }).catch(function (e) {
                game.CommonLoadingUI.getInstance().stop();
                _this.notifyUI(ClubDetailUICommands.ClubDetailNotify_showRedMsg, e.msg);
                game.DebugUtil.error("", e);
            });
        };
        /** 房间被锁定回调 */
        ClubDetailMediator.prototype.confirmBack = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        ClubDetailMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_ClubDetail.name);
            _super.prototype.dispose.call(this);
        };
        return ClubDetailMediator;
    }(game.BaseMediator));
    game.ClubDetailMediator = ClubDetailMediator;
    __reflect(ClubDetailMediator.prototype, "game.ClubDetailMediator");
})(game || (game = {}));
//# sourceMappingURL=ClubDetailMediator.js.map