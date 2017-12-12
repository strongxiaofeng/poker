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
     * 俱乐部多桌mediator组件
     * by 郑戎辰
     */
    var MultiBaccMediator = (function (_super) {
        __extends(MultiBaccMediator, _super);
        function MultiBaccMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        MultiBaccMediator.prototype.initUI = function () {
            var multibaccUI;
            if (game.GlobalConfig.isMobile) {
                multibaccUI = egret.getDefinitionByName("game.MultiBaccUI" + game.GlobalConfig.multiSkinType);
            }
            else {
                multibaccUI = egret.getDefinitionByName("game.PCMultiBaccUI" + game.GlobalConfig.multiSkinType);
            }
            this.ui = new multibaccUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_MultiBaccMediator.layer);
        };
        /**
     * 子类需要重写
     * */
        MultiBaccMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_Baccarat_SouresPlayer,
                game.NotifyConst.Notify_Baccarat_DeskIn,
                // NotifyConst.Notify_Baccarat_RoadMap,
                game.NotifyConst.Notify_Baccarat_Setting,
                game.NotifyConst.Notify_Baccarat_Chips,
                game.NotifyConst.Notify_LockUser,
                game.NotifyConst.Notify_PlayerBalance,
                game.NotifyConst.Notify_MulitBacc_OkeyBetMsg,
                game.NotifyConst.Notify_MulitBacc_EditChips,
                game.NotifyConst.Notify_Baccarat_RoomNameArr,
                game.NotifyConst.Notify_Baccarat_UpDataList,
                game.NotifyConst.Notify_MulitBacc_HideBottomMore,
                game.NotifyConst.Notify_Baccarat_MulitUpDataList
            ];
        };
        /**
         * 子类需要重写
         * */
        MultiBaccMediator.prototype.handleNotification = function (type, body) {
            var _this = this;
            switch (type) {
                case game.NotifyConst.Notify_Baccarat_Info:
                    break;
                case game.NotifyConst.Notify_Baccarat_SouresPlayer:
                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_souresPlayer, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_Setting:
                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_settingIn, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_DeskIn:
                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_deskIn, body);
                    break;
                // case NotifyConst.Notify_Baccarat_RoadMap:
                // 	this.notifyUI(MultiBaccUICommands.MultiBaccNotify_roadMapData, body)
                // 	break;
                case game.NotifyConst.Notify_Baccarat_Chips:
                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_chipsIn, body);
                    break;
                case game.NotifyConst.Notify_LockUser:
                    if (body == game.GlobalConfig.clubId) {
                        var tipData = new game.TipMsgInfo();
                        tipData.msg = [{ text: '抱歉您在"' + game.ClubModel.getInstance().getClubInfo(body).name + '"的权限已被锁定 ， 请联系房主', textColor: enums.ColorConst.Golden }];
                        tipData.confirmText = "我知道了";
                        tipData.comfirmCallBack = function () {
                            if (game.GlobalConfig.isMobile) {
                                game.MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
                            }
                            else {
                                game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedClub);
                            }
                        };
                        tipData.thisObj = this;
                        game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    }
                    break;
                case game.NotifyConst.Notify_PlayerBalance:
                    if (body == game.GlobalConfig.clubId) {
                        this.upDataBalance();
                    }
                    break;
                case game.NotifyConst.Notify_MulitBacc_OkeyBetMsg:
                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_okeyBetMsg, body);
                    break;
                case game.NotifyConst.Notify_MulitBacc_EditChips:
                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_editChips, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_RoomNameArr:
                    if (body == "/rooms/" + game.GlobalConfig.clubId) {
                        var arr_1 = game.ClubModel.getInstance().getTheClubRooms();
                        if (arr_1) {
                            var mulitArr_1 = game.ClubModel.getInstance().multiAllRoomList;
                            for (var k = 0; k < mulitArr_1.length; k++) {
                                //这个房间是被删除的
                                if (arr_1.indexOf(mulitArr_1[k]) == -1) {
                                    game.BaccaratController.getInstance().sendMultiRoomLeave(mulitArr_1[k]);
                                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_removeItem, mulitArr_1[k]);
                                    mulitArr_1.splice(k, 1);
                                }
                            }
                            var _loop_1 = function (i) {
                                //这个是新增加的房间
                                if (mulitArr_1.indexOf(arr_1[i]) == -1) {
                                    game.ClubController.getInstance().getSubscribeRoom(arr_1[i]).then(function () {
                                        game.BaccaratController.getInstance().sendMultiRoomEnter(arr_1[i]).then(function () {
                                            mulitArr_1.push(arr_1[i]);
                                            _this.notifyUI(MultiBaccUICommands.MultiBaccNotify_addItem, arr_1[i]);
                                        });
                                    });
                                }
                            };
                            for (var i = 0; i < arr_1.length; i++) {
                                _loop_1(i);
                            }
                        }
                        // //没有房间也要发送一次通知 才好显示该俱乐部没有房间
                        // this.notifyUI(MultiBaccUICommands.MultiBaccNotify_UpDataList);
                    }
                    break;
                // case NotifyConst.Notify_Baccarat_UpDataList:
                // 	if (body == 'mulit') {
                // 		this.notifyUI(MultiBaccUICommands.MultiBaccNotify_UpDataList, body)
                // 	}
                // 	break;
                case game.NotifyConst.Notify_MulitBacc_HideBottomMore:
                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_HideBottomMore, body);
                    break;
                case game.NotifyConst.Notify_Baccarat_MulitUpDataList:
                    this.notifyUI(MultiBaccUICommands.MultiBaccNotify_MulitUpDataList, body);
                    break;
            }
        };
        /** 开始处理数据 */
        MultiBaccMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_MultiBaccMediator.name, this);
            this.closeTop();
            this.notifyUI(MultiBaccUICommands.MultiBaccNotify_initListener);
            this.upDataUserName();
            this.upDataBalance();
        };
        /** 关闭TOP条 */
        MultiBaccMediator.prototype.closeTop = function () {
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Hidden);
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, false);
        };
        /** 刷新昵称 */
        MultiBaccMediator.prototype.upDataUserName = function () {
            // 设置用户名称
            this.notifyUI(MultiBaccUICommands.MultiBaccNotify_userName, game.PersonalInfoModel.getInstance().nick);
        };
        /** 刷新余额 */
        MultiBaccMediator.prototype.upDataBalance = function () {
            var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id);
            this.notifyUI(MultiBaccUICommands.MultiBaccNotify_userBalance, balance);
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        MultiBaccMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_MultiBaccMediator.name);
            _super.prototype.dispose.call(this);
        };
        return MultiBaccMediator;
    }(game.BaseMediator));
    game.MultiBaccMediator = MultiBaccMediator;
    __reflect(MultiBaccMediator.prototype, "game.MultiBaccMediator");
})(game || (game = {}));
//# sourceMappingURL=MultiBaccMediator.js.map