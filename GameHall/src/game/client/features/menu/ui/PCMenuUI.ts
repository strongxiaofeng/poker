module game {

    export class PCMenuUI extends BaseUI {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "menu/menuSkin.exml";
        }

        // ---------------------------------------------- init ----------------------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            this.groupLevel1.visible = true;
            this.groupLevel2.visible = false;
            this.groupLevel3.visible = false;
            this.groupLevel2.mask = this.mask2;
            this.groupLevel3.mask = this.mask3;
        }

        /** 收到mediator的通知 */
        public onMediatorCommand(type: MenuUICommands, params: any = null): void {
            switch (type) {
                case MenuUICommands.initListener:
                    this.initListener(params);
                    break;
                case MenuUICommands.setVisible:
                    this.visible = params;
                    break;
                case MenuUICommands.addUI:
                    this.addUI(params);
                    break;
                case MenuUICommands.tweenUI:
                    this.tweenUI(params);
                    break;
                case MenuUICommands.closeUI:
                    this.closeUI(params);
                    break;
            }
        }

        // ---------------------------------------------- 皮肤组件 ----------------------------------------------

        private groupLevel1: eui.Group;
        private groupLevel2: eui.Group;
        private groupLevel3: eui.Group;

        private container1: eui.Group;
        private container2: eui.Group;
        private container3: eui.Group;

        private closeBtn1: eui.AButton;
        private closeBtn2: eui.AButton;
        private closeBtn3: eui.AButton;

        private mask2: eui.Image;
        private mask3: eui.Image;

        // ---------------------------------------------- 监听事件 ----------------------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: MenuMediator): void {
            this.registerEvent(this.closeBtn1, egret.TouchEvent.TOUCH_TAP, mediator.closeUI1, mediator);
            this.registerEvent(this.closeBtn2, egret.TouchEvent.TOUCH_TAP, mediator.closeUI2, mediator);
            this.registerEvent(this.closeBtn3, egret.TouchEvent.TOUCH_TAP, mediator.closeUI3, mediator);
        }

        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        public onStageResize(evt: egret.Event): void {
            super.onStageResize(evt);
        }

        // ---------------------------------------------- UI ----------------------------------------------

        private addUI(info: MenuInfo): void {
            let group: eui.Group = this[`groupLevel${info.level}`];
            let container: eui.Group = this[`container${info.level}`];
            if (group && container) {
                container.removeChildren();
                container.addChild(info.ui);
                group.width = info.ui.width;
            }
            if (info.level == 1) {
                this.groupLevel1.left = (1920 - group.width) / 2;
                this.groupLevel2.left = (1920 - group.width) / 2;
                this.groupLevel3.left = (1920 - group.width) / 2;
                this.mask2.left = (1920 - group.width) / 2;
                this.mask3.left = (1920 - group.width) / 2;
            }
        }

        private tweenUI(data: { info1: MenuInfo; info2: MenuInfo; info3: MenuInfo; }): void {
            let totalWidth = 0;
            for (let key in data) {
                if (data[key] && data[key].ui) {
                    totalWidth += data[key].ui.width;
                }
            }
            for (let i = 1; i <= 3; i++) {
                this[`groupLevel${i}`].visible = !!(data[`info${i}`]);
            }
            CTween.removeTweens(this.groupLevel1);
            CTween.removeTweens(this.groupLevel2);
            CTween.removeTweens(this.groupLevel3);
            // handle groupLevel1 & mask
            if (data.info1) {
                CTween.get(this.groupLevel1).to({
                    left: (1920 - totalWidth) / 2
                }, 400)
                .call(()=>{CTween.removeTweens(this.groupLevel1);}, this);
                CTween.get(this.mask2).to({
                    left: (1920 - totalWidth) / 2
                }, 400)
                .call(()=>{CTween.removeTweens(this.mask2);}, this);
                CTween.get(this.mask3).to({
                    left: (1920 - totalWidth) / 2
                }, 400)
                .call(()=>{CTween.removeTweens(this.mask3);}, this);
            }
            // handle groupLevel2
            if (data.info2) {
                CTween.get(this.groupLevel2).to({
                    left: (1920 - totalWidth) / 2 + data.info1.ui.width
                }, 400)
                .call(()=>{CTween.removeTweens(this.groupLevel2);}, this);
            }
            // handle groupLevel3
            if (data.info3) {
                CTween.get(this.groupLevel3).to({
                    left: 1920 - (1920 - totalWidth) / 2 - data.info3.ui.width
                }, 400)
                .call(()=>{CTween.removeTweens(this.groupLevel3);}, this);
            }
        }

        private closeUI(data: {isDirect:boolean; level: number; callBack: Function; thisObj: any; }): void {
            CTween.removeTweens(this.groupLevel1);
            CTween.removeTweens(this.groupLevel2);
            CTween.removeTweens(this.groupLevel3);
            let totalWidth: number = this.groupLevel1.width;
            if (data.level == 3) {
                totalWidth += this.groupLevel2.width;
            }
            if(data.isDirect)
            {
                this.groupLevel1.left = (1920 - totalWidth) / 2;
                this.mask2.left = (1920 - totalWidth) / 2;
                this.mask3.left = (1920 - totalWidth) / 2;

                // handle groupLevel2
                if (data.level == 3) {
                    this.groupLevel2.left = (1920 - totalWidth) / 2 + this.groupLevel1.width;
                } else {
                    this.groupLevel2.left = (1920 - totalWidth) / 2 + this.groupLevel1.width - this.groupLevel2.width;
                    this.groupLevel2.visible = false;
                }
                // handle groupLevel3
                this.groupLevel3.left = (1920 - totalWidth) / 2 + this.groupLevel1.width - this.groupLevel3.width;
                this.groupLevel3.visible = false;

                data.callBack.apply(data.thisObj);
            }
            else
            {
                // handle groupLevel1 & mask
                CTween.get(this.groupLevel1).to({
                    left: (1920 - totalWidth) / 2
                }, 400).call(data.callBack, data.thisObj);
                CTween.get(this.mask2).to({
                    left: (1920 - totalWidth) / 2
                }, 400);
                CTween.get(this.mask3).to({
                    left: (1920 - totalWidth) / 2
                }, 400);
                
                // handle groupLevel2
                if (data.level == 3) {
                    CTween.get(this.groupLevel2).to({
                        left: (1920 - totalWidth) / 2 + this.groupLevel1.width
                    }, 400);
                } else {
                    CTween.get(this.groupLevel2).to({
                        left: (1920 - totalWidth) / 2 + this.groupLevel1.width - this.groupLevel2.width
                    }, 400).call(() => {
                        this.groupLevel2.visible = false;
                    }, this);
                }
                // handle groupLevel3
                CTween.get(this.groupLevel3).to({
                    left: (1920 - totalWidth) / 2 + this.groupLevel1.width - this.groupLevel3.width
                }, 400).call(() => {
                    this.groupLevel3.visible = false;
                }, this);
            }
            
        }

        // ---------------------------------------------- dispose ----------------------------------------------

        /** 资源释放 */
        public dispose(): void {
            CTween.removeTweens(this.groupLevel1);
            CTween.removeTweens(this.groupLevel2);
            CTween.removeTweens(this.groupLevel3);
            CTween.removeTweens(this.mask2);
            CTween.removeTweens(this.mask3);
            super.dispose();
        }

    }
}