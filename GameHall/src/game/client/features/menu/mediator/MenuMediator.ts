module game {

    export class MenuMediator extends BaseMediator {

        public constructor() {
            super();
        }

        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        protected initUI(): void {
            var currentUI: any = egret.getDefinitionByName("game.PCMenuUI");
            this.ui = new currentUI();
            UIManager.OpenUI(this.ui, Mediators.Mediator_Menu.layer);
        }

        /** 分发游戏数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_Menu.name, this);
            // 初始化UI
            this.notifyUI(MenuUICommands.initListener, this);
            this.notifyUI(MenuUICommands.setVisible, false);
        }

        /** 注册通知 */
        public listNotification(): Array<string> {
            return [
                NotifyConst.Notify_PC_AddMenu,
                NotifyConst.Notify_PC_CloseMenu,
                NotifyConst.Notify_PC_CloseMenuDirect
            ];
        }

        /** 接收通知 */
        public handleNotification(type: string, body: any): void {
            switch (type) {
                case NotifyConst.Notify_PC_AddMenu:
                    if (body.level == 2 && this.menuInfo2) {
                        if (this.menuInfo3 && this.menuInfo3.ui) {
                            let name = this.menuInfo3.mediatorClass.name + "";
                            MediatorManager.closeMediator(name);
                            this.menuInfo3 = null;
                        }
                        if (this.menuInfo2 && this.menuInfo2.ui) {
                            let name = this.menuInfo2.mediatorClass.name + "";
                            MediatorManager.closeMediator(name);
                            this.menuInfo2 = null;
                        }
                    }
                    if (body.level == 3 && this.menuInfo3) {
                        if (this.menuInfo3 && this.menuInfo3.ui) {
                            let name = this.menuInfo3.mediatorClass.name + "";
                            MediatorManager.closeMediator(name);
                            this.menuInfo3 = null;
                        }
                    }
                    this[`menuInfo${body.level}`] = body;
                    this.notifyUI(MenuUICommands.addUI, body);
                    this.notifyUI(MenuUICommands.setVisible, true);
                    this.notifyUI(MenuUICommands.tweenUI, {
                        info1: this.menuInfo1,
                        info2: this.menuInfo2,
                        info3: this.menuInfo3,
                    });
                    break;
                case NotifyConst.Notify_PC_CloseMenu:
                    if ([1, 2, 3].indexOf(body) > -1) {
                        this[`closeUI${body}`]();
                    }
                    break;
                case NotifyConst.Notify_PC_CloseMenuDirect:
                    if ([1, 2, 3].indexOf(body) > -1) {
                        this[`closeUI${body}`](true);
                    }
                    break;
            }
        }

        private menuInfo1: MenuInfo;

        private menuInfo2: MenuInfo;

        private menuInfo3: MenuInfo;

        /**isDirect 是否直接关闭 不缓动 */
        public closeUI1(isDirect: boolean = false): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            if (this.menuInfo3 && this.menuInfo3.ui) {
                this.sendNotification(NotifyConst.Notify_PC_MenuClosed, this.menuInfo3.mediatorClass.name);
                MediatorManager.closeMediator(this.menuInfo3.mediatorClass.name);
            }
            if (this.menuInfo2 && this.menuInfo2.ui) {
                this.sendNotification(NotifyConst.Notify_PC_MenuClosed, this.menuInfo2.mediatorClass.name);
                MediatorManager.closeMediator(this.menuInfo2.mediatorClass.name);
            }
            if (this.menuInfo1 && this.menuInfo1.ui) {
                this.sendNotification(NotifyConst.Notify_PC_MenuClosed, this.menuInfo1.mediatorClass.name);
                MediatorManager.closeMediator(this.menuInfo1.mediatorClass.name);
            }
            this.menuInfo1 = null;
            this.menuInfo2 = null;
            this.menuInfo3 = null;
            this.notifyUI(MenuUICommands.setVisible, false);
        }

        /**isDirect 是否直接关闭 不缓动 */
        public closeUI2(isDirect: boolean = false): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            this.sendNotification(NotifyConst.Notify_PC_DataCenterBtnState);
            this.notifyUI(MenuUICommands.closeUI, {
                isDirect: isDirect,
                level: 2,
                callBack: () => {
                    if (this.menuInfo3 && this.menuInfo3.ui) {
                        this.sendNotification(NotifyConst.Notify_PC_MenuClosed, this.menuInfo3.mediatorClass.name);
                        MediatorManager.closeMediator(this.menuInfo3.mediatorClass.name);
                    }
                    if (this.menuInfo2 && this.menuInfo2.ui) {
                        this.sendNotification(NotifyConst.Notify_PC_MenuClosed, this.menuInfo2.mediatorClass.name);
                        MediatorManager.closeMediator(this.menuInfo2.mediatorClass.name);
                    }
                    this.menuInfo2 = null;
                    this.menuInfo3 = null;
                },
                thisObj: this
            });
        }

        /**isDirect 是否直接关闭 不缓动 */
        public closeUI3(isDirect: boolean = false): void {
			SoundPlayerNew.playEffect(SoundConst.click);
            this.notifyUI(MenuUICommands.closeUI, {
                level: 3,
                callBack: () => {
                    if (this.menuInfo3 && this.menuInfo3.ui) {
                        this.sendNotification(NotifyConst.Notify_PC_MenuClosed, this.menuInfo3.mediatorClass.name);
                        MediatorManager.closeMediator(this.menuInfo3.mediatorClass.name);
                    }
                    this.menuInfo3 = null;
                },
                thisObj: this
            });
        }

        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        public dispose(direction?: any): void {
            this.closeUI3();
            this.closeUI2();
            this.closeUI1();
            this.removeRegister(Mediators.Mediator_Menu.name);
            super.dispose();
        }

    }

    export class MenuInfo {
        /** ui */
        public ui: egret.DisplayObject;
        /** 三级菜单的级别 1 - 顶级菜单 | 2 - 子菜单 | 3 - 三级菜单 */
        public level: number;
        /** mediatorClass */
        public mediatorClass: MediatorClass;
    }

}