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
    var NavbarBaseUI = (function (_super) {
        __extends(NavbarBaseUI, _super);
        function NavbarBaseUI() {
            var _this = _super.call(this) || this;
            // ---------------------------------- 变量声明 ----------------------------------
            /** assistive touch 拖拽状态 */
            _this.hasMove = false;
            /** assistive 停靠方向 left | right */
            _this.assistiveDir = "right";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        NavbarBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.showHome();
            this.showAssistive(false);
            this.hasMove = false;
            this.assistiveDir = "right";
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        NavbarBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case NavbarUICommands.initListener:
                    this.initListener(params);
                    break;
                case NavbarUICommands.setAssistiveTouch:
                    this.showAssistiveTouch(params);
                    break;
                case NavbarUICommands.setChoosedBtn:
                    if (params == "mine") {
                        this.setBtnStats(2);
                        this.showMine();
                    }
                    break;
                case NavbarUICommands.showNewsDot:
                    var bool = game.NotifyModel.getInstance().unread_count > 0;
                    this.showNewsDot(bool);
                    break;
                case NavbarUICommands.setNavbar:
                    if (params == "club") {
                        this.setBtnStats(0);
                        this.showClub();
                    }
                    else if (params == "home") {
                        this.setBtnStats(1);
                        this.showHome();
                    }
                    else if (params == "mine") {
                        this.setBtnStats(2);
                        this.showMine();
                    }
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        NavbarBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.chatBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            // normal btns
            this.registerEvent(this.clubBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.homeBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.mineBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.touchBgd, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            // assistive touch moreBtn
            this.registerEvent(this.moreBtn, egret.TouchEvent.TOUCH_BEGIN, this.moveAssistive, this);
            this.registerEvent(this.moreBtn, egret.TouchEvent.TOUCH_END, this.moveAssistive, this);
            this.registerEvent(this.moreBtn, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.moveAssistive, this);
            // assistive menu btns
            this.registerEvent(this.userBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.lobbyBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.myclubBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.newsBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        };
        /** 响应点击事件 */
        NavbarBaseUI.prototype.onHandleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.clubBtn:
                case this.myclubBtn:
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_SystemSet.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_Notify.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChat.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyList.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyContent.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_ChipContent.name);
                    // 打开俱乐部列表mediator
                    this.setBtnStats(0);
                    if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_ClubHome.name)) {
                        return;
                    }
                    // let created = ClubController.getInstance().getClubList(ClubModel.ClubType_Created, 10);
                    // let joined = ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, 10);
                    // Promise.all([created, joined]).then(() => {
                    this.showClub();
                    game.MediatorManager.openMediator(game.Mediators.Mediator_ClubHome);
                    // }).catch((err) => {
                    //     DebugUtil.error("", err);
                    // });
                    game.GameController.getInstance().sendNotification(game.NotifyConst.Notify_ClickNavbar);
                    break;
                case this.homeBtn:
                case this.lobbyBtn:
                    this.setBtnStats(1);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_SystemSet.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_Notify.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChat.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyList.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyContent.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_ChipContent.name);
                    // 打开首页mediator
                    if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_Home.name)) {
                        return;
                    }
                    game.MediatorManager.openMediator(game.Mediators.Mediator_Home);
                    this.showHome();
                    game.GameController.getInstance().sendNotification(game.NotifyConst.Notify_ClickNavbar);
                    break;
                case this.mineBtn:
                case this.userBtn:
                    this.setBtnStats(2);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_SystemSet.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_Notify.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChat.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyList.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyContent.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_ChipContent.name);
                    // 打开我的mediator
                    if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_Mine.name)) {
                        return;
                    }
                    game.MediatorManager.openMediator(game.Mediators.Mediator_Mine);
                    this.showMine();
                    game.GameController.getInstance().sendNotification(game.NotifyConst.Notify_ClickNavbar);
                    break;
                case this.newsBtn:
                case this.chatBtn:
                    // 打开消息中心
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_SystemSet.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_Notify.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChat.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyList.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyContent.name);
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_ChipContent.name);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_Notify, event.target == this.newsBtn);
                    game.GameController.getInstance().sendNotification(game.NotifyConst.Notify_ClickNavbar);
                    break;
                case this.moreBtn:
                case this.touchBgd:
                    this.toggleMore();
                    break;
            }
            //判断一下消息相关页面是否打开，打开的话需要关闭
            switch (event.target) {
                case this.userBtn:
                case this.lobbyBtn:
                case this.myclubBtn:
                    // case this.newsBtn:
                    if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_Notify.name)) {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_Notify.name);
                    }
                case this.newsBtn:
                    if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyChat.name)) {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChat.name);
                    }
                    if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyList.name)) {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyList.name);
                    }
                    if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyContent.name)) {
                        game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyContent.name);
                    }
                    break;
            }
        };
        /** 移动 Assistive Touch */
        NavbarBaseUI.prototype.moveAssistive = function (event) {
            var _this = this;
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    if (this.timeoutObj["assistiveTouch"]) {
                        clearTimeout(this.timeoutObj["assistiveTouch"]);
                    }
                    this.assistiveTouch.alpha = 1;
                    this.moreBtnGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveAssistive, this);
                    break;
                case egret.TouchEvent.TOUCH_END:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    if (!this.hasMove) {
                        this.toggleMore();
                    }
                    else {
                        this.moreBtnGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveAssistive, this);
                        this.fixAssistivePosition();
                        this.timeoutObj["assistiveTouch"] = setTimeout(function () {
                            _this.assistiveTouch.alpha = 0.6;
                        }, 5000);
                    }
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    if (this.moreBgd.visible) {
                        this.toggleMore();
                        if (this.timeoutObj["assistiveTouch"]) {
                            clearTimeout(this.timeoutObj["assistiveTouch"]);
                        }
                    }
                    this.hasMove = true;
                    var x = event.stageX;
                    var y = event.stageY;
                    var right = game.StageUtil.width - x - 250;
                    this.moreBtnGroup.y = y;
                    this.moreBtnGroup.right = right;
                    break;
            }
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 显示俱乐部列表 */
        NavbarBaseUI.prototype.showClub = function () {
            // groups
            this.topGroup.visible = true;
            this.bottomGroup.visible = true;
            // title
            this.pageTitle.text = game.LanguageUtil.translate("global_lbl_title_club");
            this.chatBtn.visible = true;
            // this.chatDot.visible = false;
            // btns
            this.setBtnStats(0);
            this.showAssistiveTouch(false);
            var bool = game.NotifyModel.getInstance().unread_count > 0;
            this.showNewsDot(bool);
        };
        /** 显示首页 */
        NavbarBaseUI.prototype.showHome = function () {
            // groups
            this.topGroup.visible = true;
            this.bottomGroup.visible = true;
            // title
            this.pageTitle.text = game.LanguageUtil.translate("home_btn_home");
            this.chatBtn.visible = true;
            // this.chatDot.visible = false;
            // btns
            this.setBtnStats(1);
            this.showAssistiveTouch(false);
            var bool = game.NotifyModel.getInstance().unread_count > 0;
            this.showNewsDot(bool);
        };
        /** 显示我的 */
        NavbarBaseUI.prototype.showMine = function () {
            // groups
            this.topGroup.visible = true;
            this.bottomGroup.visible = true;
            // title
            this.pageTitle.text = game.LanguageUtil.translate("mine_btn_mine");
            this.chatBtn.visible = false;
            this.chatDot.visible = false;
            // btns
            this.setBtnStats(2);
            this.showAssistiveTouch(false);
        };
        /** 显示消息红点 */
        NavbarBaseUI.prototype.showNewsDot = function (show) {
            if (this.chatBtn.visible) {
                this.chatDot.visible = show;
            }
            else {
                this.chatDot.visible = false;
            }
            this.newsDot.visible = show;
        };
        /** 设置底部导航按钮状态
         *  @param index {number} 0 - club | 1 - home | 2 - mine
         */
        NavbarBaseUI.prototype.setBtnStats = function (index) {
            var btns = [this.clubBtn, this.homeBtn, this.mineBtn];
            btns.forEach(function (btn, i) {
                btn.setState = i == index ? "down" : "up";
            });
        };
        /** 设置导航栏与Assistive Touch显示状态
         * @param show {boolean} 显示Assistive Touch
         */
        NavbarBaseUI.prototype.showAssistiveTouch = function (show) {
            if (this.moreBgd.visible)
                this.toggleMore();
            this.topGroup.visible = !show;
            this.bottomGroup.visible = !show;
            this.assistiveTouch.visible = show;
        };
        // ---------------------------------- Assistive Touch ----------------------------------
        /** 显示Assistive Touch */
        NavbarBaseUI.prototype.showAssistive = function (show) {
            var _this = this;
            if (show === void 0) { show = true; }
            this.assistiveTouch.visible = show;
            this.moreBgd.visible = false;
            this.touchBgd.visible = false;
            [
                this.userBtn,
                this.lobbyBtn,
                this.myclubBtn,
                this.newsBtn
            ].forEach(function (btn) {
                btn.verticalCenter = 0;
                btn.horizontalCenter = 0;
                btn.visible = false;
                btn.alpha = 0;
            }, this);
            this.newsDot.verticalCenter = -50;
            if (this.timeoutObj["assistiveTouch"]) {
                clearTimeout(this.timeoutObj["assistiveTouch"]);
            }
            if (show) {
                this.timeoutObj["assistiveTouch"] = setTimeout(function () {
                    _this.assistiveTouch.alpha = 0.6;
                }, 5000);
            }
        };
        /** 切换菜单展开与隐藏状态 */
        NavbarBaseUI.prototype.toggleMore = function () {
            var _this = this;
            if (this.timeoutObj["assistiveTouch"]) {
                clearTimeout(this.timeoutObj["assistiveTouch"]);
            }
            this.assistiveTouch.alpha = 1;
            var btns = [this.userBtn, this.lobbyBtn, this.myclubBtn, this.newsBtn];
            var pos = [
                { v: -162, h: 0 },
                { v: -80, h: -140 },
                { v: 80, h: -140 },
                { v: 162, h: 0 },
            ];
            var isShow = this.moreBgd.visible;
            if (isShow) {
                // 已经展开需要收起
                this.moreBgd.visible = false;
                this.touchBgd.visible = false;
                btns.forEach(function (btn) {
                    game.CTween.removeTweens(btn);
                    game.CTween.get(btn).to({
                        verticalCenter: 0,
                        horizontalCenter: 0,
                        alpha: 0
                    }, 150).call(function () {
                        btn.visible = false;
                    }, _this);
                }, this);
                this.newsDot.verticalCenter = -50;
                this.timeoutObj["assistiveTouch"] = setTimeout(function () {
                    _this.assistiveTouch.alpha = 0.6;
                }, 5000);
            }
            else {
                // 已经收起需要展开
                this.moreBgd.visible = true;
                this.touchBgd.visible = true;
                btns.forEach(function (btn, index) {
                    btn.visible = true;
                    game.CTween.removeTweens(btn);
                    game.CTween.get(btn).to({
                        verticalCenter: pos[index].v,
                        horizontalCenter: _this.assistiveDir == "right" ? pos[index].h : -pos[index].h,
                        alpha: 1
                    }, 150).call(function () {
                        _this.newsDot.verticalCenter = 125;
                    }, _this);
                }, this);
            }
        };
        /** 设置 Assistive touch 位置 */
        NavbarBaseUI.prototype.fixAssistivePosition = function () {
            var _this = this;
            var y = this.moreBtnGroup.y;
            var right = this.moreBtnGroup.right;
            this.assistiveDir = (game.StageUtil.width - 170 * 3) / 2 > right ? "right" : "left";
            y = Math.max(250, y);
            y = Math.min(y, game.StageUtil.height - 250);
            game.CTween.removeTweens(this.moreBtnGroup);
            game.CTween.get(this.moreBtnGroup).to({
                right: this.assistiveDir == "right" ? -170 : game.StageUtil.width - 170 - 170,
                y: y
            }, 100).call(function () {
                _this.hasMove = false;
            }, this);
        };
        // ---------------------------------- dispose ----------------------------------
        NavbarBaseUI.prototype.dispose = function () {
            game.CTween.removeTweens(this.moreBtnGroup);
            [this.userBtn, this.lobbyBtn, this.myclubBtn, this.newsBtn].forEach(function (btn) {
                game.CTween.removeTweens(btn);
            }, this);
            _super.prototype.dispose.call(this);
        };
        return NavbarBaseUI;
    }(game.BaseUI));
    game.NavbarBaseUI = NavbarBaseUI;
    __reflect(NavbarBaseUI.prototype, "game.NavbarBaseUI");
})(game || (game = {}));
//# sourceMappingURL=NavbarBaseUI.js.map