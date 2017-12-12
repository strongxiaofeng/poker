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
     * 俱乐部游戏列表mediator组件
     * by 郑戎辰
     */
    var ClubGamesMediator = (function (_super) {
        __extends(ClubGamesMediator, _super);
        function ClubGamesMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        ClubGamesMediator.prototype.initUI = function () {
            this.ui = new game.ClubGamesUI1();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_ClubGames.layer);
        };
        /** 开始处理数据 */
        ClubGamesMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_ClubGames.name, this);
            // 隐藏底部条
            this.sendNotification(game.NotifyConst.Notify_ShowAssistiveTouch);
            // 设置TOP
            var name = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name;
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_Show);
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_TitleName, name);
            this.sendNotification(game.NotifyConst.Notify_SwitchNavbar, true);
            // 设置TOP条mediator指向和回调
            this.sendNotification(game.NotifyConst.Notify_ClubTopUI_BackMediator, { mediator: '', callBack: this.callBaclFuc, this: this });
            //初始化数据
            this.notifyUI(ClubGamesUICommands.ClubGamesNotify_initListener);
            this.notifyUI(ClubGamesUICommands.ClubGamesNotify_userName, game.PersonalInfoModel.getInstance().nick);
            this.notifyUI(ClubGamesUICommands.ClubGamesNotify_IsRoasting, ['login_pic_bg_png', 'main_pic_bg_png', 'login_pic_bg_png', 'main_pic_topbg_png', 'main_pic_bg_png']);
            var isMy = (game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).creator == (+game.PersonalInfoModel.getInstance().user_id) ? true : false);
            this.isMyClub(isMy);
        };
        /** 是否是我创建的 */
        ClubGamesMediator.prototype.isMyClub = function (b) {
            var _this = this;
            this.notifyUI(ClubGamesUICommands.ClubGamesNotify_isMy, b);
            if (b) {
                this.notifyUI(ClubGamesUICommands.ClubGamesNotify_HomeCardNum, game.ClubModel.getInstance().getRoomCardNum());
            }
            else {
                // PersonalInfoModel.getInstance().
                game.ClubController.getInstance().subscribeAccount(game.GlobalConfig.clubId, game.PersonalInfoModel.getInstance().user_id, false).then(function () {
                    var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id);
                    _this.notifyUI(ClubGamesUICommands.ClubGamesNotify_userBalance, balance);
                });
                this.getAdvertisingImg();
                //获取弹窗公告
                game.AnnounceController.getInstance().getAlertAnnounce();
            }
        };
        /**
         * 子类需要重写
         * */
        ClubGamesMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_LockUser,
                game.NotifyConst.Notify_PlayerBalance
            ];
        };
        /**
         * 子类需要重写
         * */
        ClubGamesMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_LockUser:
                    if (game.GlobalConfig.clubId == body) {
                        var tipData = new game.TipMsgInfo();
                        tipData.msg = [{ text: '抱歉您在"' + game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId).name + '"的权限已被锁定 \n 请联系房主', textColor: enums.ColorConst.Golden }];
                        tipData.confirmText = "我知道了";
                        tipData.comfirmCallBack = this.confirmBack;
                        tipData.thisObj = this;
                        game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    }
                    break;
                case game.NotifyConst.Notify_PlayerBalance:
                    if (body == game.GlobalConfig.clubId) {
                        var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id);
                        this.notifyUI(ClubGamesUICommands.ClubGamesNotify_userBalance, balance);
                    }
                    break;
            }
        };
        // 取消订阅
        ClubGamesMediator.prototype.callBaclFuc = function () {
            game.ClubController.getInstance().getUnSubscribeRoomList(game.GlobalConfig.clubId);
            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
        };
        /** 无法进入俱乐部弹框的确定返回*/
        ClubGamesMediator.prototype.confirmBack = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
        };
        /** 获取广告图 */
        ClubGamesMediator.prototype.getAdvertisingImg = function () {
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        ClubGamesMediator.prototype.dispose = function () {
            this.removeRegister(game.Mediators.Mediator_ClubGames.name);
            _super.prototype.dispose.call(this);
        };
        return ClubGamesMediator;
    }(game.BaseMediator));
    game.ClubGamesMediator = ClubGamesMediator;
    __reflect(ClubGamesMediator.prototype, "game.ClubGamesMediator");
})(game || (game = {}));
//# sourceMappingURL=ClubGamesMediator.js.map