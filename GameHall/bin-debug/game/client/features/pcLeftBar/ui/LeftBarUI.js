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
    /**我创建的 加入的 侧边栏 UI */
    var LeftBarUI = (function (_super) {
        __extends(LeftBarUI, _super);
        function LeftBarUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "leftMenu/leftMenuCreateSkin.exml";
            return _this;
        }
        LeftBarUI.prototype.initSetting = function () {
            this.initListener();
            this.btnsGroup_created.visible = false;
            this.btnsGroup_joined.visible = false;
            this.hoverGroup.visible = false;
            this.setSelectedGame(this.btn_baccarat);
            this.setClubName(game.GlobalConfig.clubId);
            this.gameBtnD(true);
        };
        LeftBarUI.prototype.initListener = function () {
            this.registerEvent(this.btn_createRoom, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
            this.registerEvent(this.btn_people, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
            this.registerEvent(this.btn_notice, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
            this.registerEvent(this.btn_share, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
            this.registerEvent(this.btn_dataCenter, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
            this.registerEvent(this.btn_anchor, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
            this.registerEvent(this.btn_active, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
            this.registerEvent(this.btn_edit, mouse.MouseEvent.MOUSE_MOVE, this.onMenuBtnHover, this);
            this.registerEvent(this.btn_createRoom, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
            this.registerEvent(this.btn_people, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
            this.registerEvent(this.btn_notice, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
            this.registerEvent(this.btn_share, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
            this.registerEvent(this.btn_dataCenter, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
            this.registerEvent(this.btn_anchor, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
            this.registerEvent(this.btn_active, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
            this.registerEvent(this.btn_edit, mouse.MouseEvent.MOUSE_OUT, this.onMenuBtnOut, this);
            this.registerEvent(this.btn_edit, egret.TouchEvent.TOUCH_TAP, this.editClub, this);
            this.registerEvent(this.btn_baccarat, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
            this.registerEvent(this.btn_multi, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
            this.registerEvent(this.btn_roulette, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
            this.registerEvent(this.btn_sicbo, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
            this.registerEvent(this.btn_niuniu, egret.TouchEvent.TOUCH_TAP, this.chooseGame, this);
            this.registerEvent(this.btn_people, egret.TouchEvent.TOUCH_TAP, this.openClubMember, this);
            this.registerEvent(this.btn_createRoom, egret.TouchEvent.TOUCH_TAP, this.openCreateRoom, this);
            this.registerEvent(this.btn_dataCenter, egret.TouchEvent.TOUCH_TAP, this.openDataCenter, this);
            this.registerEvent(this.btn_balanceDetail, egret.TouchEvent.TOUCH_TAP, this.openAssetDetail, this);
            this.registerEvent(this.btn_rule, egret.TouchEvent.TOUCH_TAP, this.openGameRule, this);
            this.registerEvent(this.btn_notice, egret.TouchEvent.TOUCH_TAP, this.openAnnounce, this);
            this.registerEvent(this.btn_share, egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        };
        LeftBarUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case LeftBarCommand.initCreateOrJoin:
                    this.initCreateOrJoin(params);
                    break;
                case LeftBarCommand.selectType:
                    this.setSelectedGameFuc(params);
                    break;
            }
        };
        /** 设置俱乐部名称 */
        LeftBarUI.prototype.setClubName = function (clubId) {
            var info = game.ClubModel.getInstance().getClubInfo(clubId);
            if (info && info.name) {
                this.clubNameLabel.text = info.name;
            }
        };
        /**设置显示为创建的 还是加入的侧边栏 */
        LeftBarUI.prototype.initCreateOrJoin = function (b) {
            this.isCreate = b;
            this.btnsGroup_created.visible = this.isCreate;
            this.btnsGroup_joined.visible = !this.isCreate;
            if (b) {
                game.GameController.getInstance().getShareUrl(game.GlobalConfig.clubId);
            }
        };
        /**鼠标悬停在菜单按钮上 */
        LeftBarUI.prototype.onMenuBtnHover = function (e) {
            var target = e.target;
            this.hoverGroup.visible = true;
            this.hoverLabel.text = target.name;
            this.hoverGroup.x = target.x + target.width / 2 - this.hoverGroup.width / 2;
            this.hoverGroup.y = target.y + target.height;
        };
        /**鼠标离开在菜单按钮 */
        LeftBarUI.prototype.onMenuBtnOut = function (e) {
            this.hoverGroup.visible = false;
        };
        /**编辑俱乐部 */
        LeftBarUI.prototype.editClub = function () {
            //打开编辑俱乐部
            game.MediatorManager.openMediator(game.Mediators.Mediator_PCMineMediator, game.PCMineMediator.Type_Club);
        };
        /**鼠标选择游戏类型 */
        LeftBarUI.prototype.chooseGame = function (e) {
            this.setSelectedGame(e.target);
            switch (e.target) {
                case this.btn_baccarat:
                    if (this.isCreate) {
                        if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_PCCreatedRoomList.name))
                            game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedRoomList);
                    }
                    else {
                        if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_PCJoinedRoomList.name))
                            game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedRoomList);
                    }
                    break;
                case this.btn_multi:
                    //判断是否需要新手引导
                    var isguide = localStorage.getItem("multiGuide" + game.PersonalInfoModel.getInstance().user_id);
                    if (isguide) {
                        game.CommonLoadingUI.getInstance().start();
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_BaccaratMediator.name);
                        game.BaccaratController.getInstance().sendMultiClubEnter().then(function () {
                            game.MediatorManager.openMediator(game.Mediators.Mediator_MultiBaccMediator);
                        });
                    }
                    else {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_PCJoinedRoomList.name);
                        game.MediatorManager.openMediator(game.Mediators.NewGuide, 2);
                        localStorage.setItem("multiGuide" + game.PersonalInfoModel.getInstance().user_id, "1");
                    }
                    break;
                case this.btn_roulette:
                case this.btn_sicbo:
                case this.btn_niuniu:
                    break;
            }
        };
        /**游戏类型按钮隐藏*/
        LeftBarUI.prototype.gameBtnD = function (isD) {
            this.btn_roulette.visible = !isD;
            this.btn_sicbo.visible = !isD;
            this.btn_niuniu.visible = !isD;
        };
        /**改变游戏卡的选中样式 1-5 */
        LeftBarUI.prototype.setSelectedGame = function (btn) {
            this.selectImg.x = btn.x;
            this.selectImg.y = btn.y;
            this.selectLabel.x = btn.x;
            this.selectLabel.y = btn.y + 22;
            this.selectLabel.text = btn.label;
        };
        /**收通知改变 */
        LeftBarUI.prototype.setSelectedGameFuc = function (type) {
            switch (type) {
                case 0:
                    this.setSelectedGame(this.btn_baccarat);
                    break;
            }
        };
        /**分享 */
        LeftBarUI.prototype.clickShare = function () {
            game.StageUtil.copyTxt(game.ClubModel.getInstance().getClubShareUrl(game.GlobalConfig.clubId));
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipGreen.name);
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipGreen, "复制成功");
        };
        /**打开公告列表信息界面 */
        LeftBarUI.prototype.openAnnounce = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_AnnounceList);
        };
        /** 打开俱乐部成员列表 */
        LeftBarUI.prototype.openClubMember = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_ClubMember);
        };
        /** 打开创建房间界面*/
        LeftBarUI.prototype.openCreateRoom = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreateRoom);
        };
        /** 打开数据中心 */
        LeftBarUI.prototype.openDataCenter = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_DataCenter);
        };
        /** 打开资产明细 */
        LeftBarUI.prototype.openAssetDetail = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_AssetDetail, game.AssetDetailOpenType.GameRoom);
        };
        /**打开游戏规则*/
        LeftBarUI.prototype.openGameRule = function () {
            game.MediatorManager.openMediator(game.Mediators.Mediator_GameRule);
        };
        LeftBarUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return LeftBarUI;
    }(game.BaseUI));
    game.LeftBarUI = LeftBarUI;
    __reflect(LeftBarUI.prototype, "game.LeftBarUI");
})(game || (game = {}));
//# sourceMappingURL=LeftBarUI.js.map