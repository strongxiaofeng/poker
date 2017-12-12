module game {

    export class NavbarBaseUI extends BaseUI {

        public constructor() {
            super();
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 顶部group */
        protected topGroup: eui.Group;
        /** 当前标签页名称 */
        protected pageTitle: eui.ALabel;
        /** 聊天按钮 */
        protected chatBtn: eui.AButton;
        /** 聊天红点提示 */
        protected chatDot: eui.Image;

        /** 底部导航group */
        protected bottomGroup: eui.Group;
        /** 导航栏俱乐部按钮 */
        protected clubBtn: eui.AButton;
        /** 导航栏首页按钮 */
        protected homeBtn: eui.AButton;
        /** 导航栏我的按钮 */
        protected mineBtn: eui.AButton;

        /** Assistive Touch group */
        protected assistiveTouch: eui.Group;
        /** assistive touch 背景 */
        protected touchBgd: eui.Rect;
        /** more btn group */
        protected moreBtnGroup: eui.Group;
        protected moreBgd: eui.Image;
        /** v = 0 , h = 0 */
        protected moreBtn: eui.AButton;
        /** v = -162 , h = 0 */
        protected userBtn: eui.AButton;
        /** v = -80 , h = -140 */
        protected lobbyBtn: eui.AButton;
        /** v = 80 , h = -140 */
        protected myclubBtn: eui.AButton;
        /** v = 162 , h = 0 */
        protected newsBtn: eui.AButton;
        /** 消息红点 v = -50 | 125 */
        protected newsDot: eui.Image;

        // ---------------------------------- 变量声明 ----------------------------------

        /** assistive touch 拖拽状态 */
        protected hasMove: boolean = false;
        /** assistive 停靠方向 left | right */
        protected assistiveDir: string = "right";

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.showHome();
            this.showAssistive(false);
            this.hasMove = false;
            this.assistiveDir = "right";
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: NavbarUICommands, params: any = null): void {
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
                    let bool = NotifyModel.getInstance().unread_count > 0;
                    this.showNewsDot(bool);
                    break;
                case NavbarUICommands.setNavbar:
                    if (params == "club") {
                        this.setBtnStats(0);
                        this.showClub();
                    } else if (params == "home") {
                        this.setBtnStats(1);
                        this.showHome();
                    } else if (params == "mine") {
                        this.setBtnStats(2);
                        this.showMine();
                    }
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: NavbarMediator): void {
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
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            switch (event.target) {
                case this.clubBtn:
                case this.myclubBtn:
                    MediatorManager.closeMediator(Mediators.Mediator_SystemSet.name);
                    MediatorManager.closeMediator(Mediators.Mediator_Notify.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyChat.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyList.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyContent.name);
                    MediatorManager.closeMediator(Mediators.Mediator_ChipContent.name);
                    // 打开俱乐部列表mediator
                    this.setBtnStats(0);
                    if (MediatorManager.isMediatorOpen(Mediators.Mediator_ClubHome.name)) { return; }
                    // let created = ClubController.getInstance().getClubList(ClubModel.ClubType_Created, 10);
                    // let joined = ClubController.getInstance().getClubList(ClubModel.ClubType_Joined, 10);
                    // Promise.all([created, joined]).then(() => {
                    this.showClub();
                    MediatorManager.openMediator(Mediators.Mediator_ClubHome);
                    // }).catch((err) => {
                    //     DebugUtil.error("", err);
                    // });
                    GameController.getInstance().sendNotification(NotifyConst.Notify_ClickNavbar);
                    break;
                case this.homeBtn:
                case this.lobbyBtn:
                    this.setBtnStats(1);
                    MediatorManager.closeMediator(Mediators.Mediator_SystemSet.name);
                    MediatorManager.closeMediator(Mediators.Mediator_Notify.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyChat.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyList.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyContent.name);
                    MediatorManager.closeMediator(Mediators.Mediator_ChipContent.name);
                    // 打开首页mediator
                    if (MediatorManager.isMediatorOpen(Mediators.Mediator_Home.name)) {
                        return;
                    }

                    MediatorManager.openMediator(Mediators.Mediator_Home);
                    
                    this.showHome();
                    GameController.getInstance().sendNotification(NotifyConst.Notify_ClickNavbar);
                    break;
                case this.mineBtn:
                case this.userBtn:
                    this.setBtnStats(2);
                    MediatorManager.closeMediator(Mediators.Mediator_SystemSet.name);
                    MediatorManager.closeMediator(Mediators.Mediator_Notify.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyChat.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyList.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyContent.name);
                    MediatorManager.closeMediator(Mediators.Mediator_ChipContent.name);
                    // 打开我的mediator
                    if (MediatorManager.isMediatorOpen(Mediators.Mediator_Mine.name)) {
                        return;
                    }
                    
                    MediatorManager.openMediator(Mediators.Mediator_Mine);
                    this.showMine();
                    GameController.getInstance().sendNotification(NotifyConst.Notify_ClickNavbar);
                    break;
                case this.newsBtn:
                case this.chatBtn:
                    // 打开消息中心
                    MediatorManager.closeMediator(Mediators.Mediator_SystemSet.name);
                    MediatorManager.closeMediator(Mediators.Mediator_Notify.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyChat.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyList.name);
                    MediatorManager.closeMediator(Mediators.Mediator_NotifyContent.name);
                    MediatorManager.closeMediator(Mediators.Mediator_ChipContent.name);
                    MediatorManager.openMediator(Mediators.Mediator_Notify, event.target == this.newsBtn);
                    GameController.getInstance().sendNotification(NotifyConst.Notify_ClickNavbar);
                    break;
                case this.moreBtn:
                case this.touchBgd:
                    this.toggleMore();
                    break;
            }

            //判断一下消息相关页面是否打开，打开的话需要关闭
            switch(event.target)
            {
                case this.userBtn:
                case this.lobbyBtn:
                case this.myclubBtn:
                // case this.newsBtn:
                    if(MediatorManager.isMediatorOpen(Mediators.Mediator_Notify.name))
                    {
                        MediatorManager.closeMediator(Mediators.Mediator_Notify.name);
                    }
                case this.newsBtn:
                    if(MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyChat.name))
                    {
                        MediatorManager.closeMediator(Mediators.Mediator_NotifyChat.name);
                    }
                    if(MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyList.name))
                    {
                        MediatorManager.closeMediator(Mediators.Mediator_NotifyList.name);
                    }
                    if(MediatorManager.isMediatorOpen(Mediators.Mediator_NotifyContent.name))
                    {
                        MediatorManager.closeMediator(Mediators.Mediator_NotifyContent.name);
                    }
                    break;
            }
        }

        /** 移动 Assistive Touch */
        protected moveAssistive(event: egret.TouchEvent): void {
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
                    } else {
                        this.moreBtnGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveAssistive, this);
                        this.fixAssistivePosition();
                        this.timeoutObj["assistiveTouch"] = setTimeout(() => {
                            this.assistiveTouch.alpha = 0.6;
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
                    let x = event.stageX;
                    let y = event.stageY;
                    let right = StageUtil.width - x - 250;
                    this.moreBtnGroup.y = y;
                    this.moreBtnGroup.right = right;
                    break;
            }
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 显示俱乐部列表 */
        protected showClub(): void {
            // groups
            this.topGroup.visible = true;
            this.bottomGroup.visible = true;
            // title
            this.pageTitle.text = LanguageUtil.translate("global_lbl_title_club");
            this.chatBtn.visible = true;
            // this.chatDot.visible = false;
            // btns
            this.setBtnStats(0);
            this.showAssistiveTouch(false);
            let bool = NotifyModel.getInstance().unread_count > 0;
            this.showNewsDot(bool);
        }

        /** 显示首页 */
        protected showHome(): void {
            // groups
            this.topGroup.visible = true;
            this.bottomGroup.visible = true;
            // title
            this.pageTitle.text = LanguageUtil.translate("home_btn_home");
            this.chatBtn.visible = true;
            // this.chatDot.visible = false;
            // btns
            this.setBtnStats(1);
            this.showAssistiveTouch(false);
            let bool = NotifyModel.getInstance().unread_count > 0;
            this.showNewsDot(bool);
        }

        /** 显示我的 */
        protected showMine(): void {
            // groups
            this.topGroup.visible = true;
            this.bottomGroup.visible = true;
            // title
            this.pageTitle.text = LanguageUtil.translate("mine_btn_mine");
            this.chatBtn.visible = false;
            this.chatDot.visible = false;
            // btns
            this.setBtnStats(2);
            this.showAssistiveTouch(false);
        }

        /** 显示消息红点 */
        protected showNewsDot(show: boolean): void {

            if(this.chatBtn.visible)
            {
                this.chatDot.visible = show;
            }
            else
            {
                this.chatDot.visible = false;
            }

            this.newsDot.visible = show;
        }

        /** 设置底部导航按钮状态
         *  @param index {number} 0 - club | 1 - home | 2 - mine
         */
        protected setBtnStats(index: number): void {
            let btns = [this.clubBtn, this.homeBtn, this.mineBtn];
            btns.forEach((btn, i) => {
                btn.setState = i == index ? "down" : "up";
            })
        }

        /** 设置导航栏与Assistive Touch显示状态
         * @param show {boolean} 显示Assistive Touch
         */
        protected showAssistiveTouch(show: boolean): void {
            if (this.moreBgd.visible) this.toggleMore();
            this.topGroup.visible = !show;
            this.bottomGroup.visible = !show;
            this.assistiveTouch.visible = show;
        }

        // ---------------------------------- Assistive Touch ----------------------------------

        /** 显示Assistive Touch */
        protected showAssistive(show: boolean = true): void {
            this.assistiveTouch.visible = show;
            this.moreBgd.visible = false;
            this.touchBgd.visible = false;
            [
                this.userBtn,
                this.lobbyBtn,
                this.myclubBtn,
                this.newsBtn
            ].forEach((btn) => {
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
                this.timeoutObj["assistiveTouch"] = setTimeout(() => {
                    this.assistiveTouch.alpha = 0.6;
                }, 5000);
            }
        }

        /** 切换菜单展开与隐藏状态 */
        protected toggleMore(): void {
            if (this.timeoutObj["assistiveTouch"]) {
                clearTimeout(this.timeoutObj["assistiveTouch"]);
            }
            this.assistiveTouch.alpha = 1;
            let btns = [this.userBtn, this.lobbyBtn, this.myclubBtn, this.newsBtn];
            let pos = [
                { v: -162, h: 0 },
                { v: -80, h: -140 },
                { v: 80, h: -140 },
                { v: 162, h: 0 },
            ];
            let isShow: boolean = this.moreBgd.visible;
            if (isShow) {
                // 已经展开需要收起
                this.moreBgd.visible = false;
                this.touchBgd.visible = false;
                btns.forEach((btn) => {
                    CTween.removeTweens(btn);
                    CTween.get(btn).to({
                        verticalCenter: 0,
                        horizontalCenter: 0,
                        alpha: 0
                    }, 150).call(() => {
                        btn.visible = false;
                    }, this);
                }, this);
                this.newsDot.verticalCenter = -50;
                this.timeoutObj["assistiveTouch"] = setTimeout(() => {
                    this.assistiveTouch.alpha = 0.6;
                }, 5000);
            } else {
                // 已经收起需要展开
                this.moreBgd.visible = true;
                this.touchBgd.visible = true;
                btns.forEach((btn, index) => {
                    btn.visible = true;
                    CTween.removeTweens(btn);
                    CTween.get(btn).to({
                        verticalCenter: pos[index].v,
                        horizontalCenter: this.assistiveDir == "right" ? pos[index].h : -pos[index].h,
                        alpha: 1
                    }, 150).call(() => {
                        this.newsDot.verticalCenter = 125;
                    }, this);
                }, this);
            }
        }

        /** 设置 Assistive touch 位置 */
        protected fixAssistivePosition(): void {
            let y = this.moreBtnGroup.y;
            let right = this.moreBtnGroup.right;
            this.assistiveDir = (StageUtil.width - 170 * 3) / 2 > right ? "right" : "left";
            y = Math.max(250, y);
            y = Math.min(y, StageUtil.height - 250);
            CTween.removeTweens(this.moreBtnGroup);
            CTween.get(this.moreBtnGroup).to({
                right: this.assistiveDir == "right" ? -170 : StageUtil.width - 170 - 170,
                y: y
            }, 100).call(() => {
                this.hasMove = false;
            }, this);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            CTween.removeTweens(this.moreBtnGroup);
            [this.userBtn, this.lobbyBtn, this.myclubBtn, this.newsBtn].forEach((btn) => {
                CTween.removeTweens(btn);
            }, this);
            super.dispose();
        }

    }

}