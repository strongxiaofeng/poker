module game {

    export class RouletteUI1 extends RouletteBaseUI {

        public constructor(data) {
            super(data);
        }

        // ---------------------------------------- 皮肤组件 ----------------------------------------

        // ---------------------------------------- 变量声明 ----------------------------------------

        // ---------------------------------------- 初始化 ----------------------------------------

        /** 注册事件监听器 */
        public initListener(mediator: RouletteMediator): void {
            super.initListener(mediator);
        }

        public initSetting(): void {
            super.initSetting();
        }

        // ---------------------------------------- 操作筹码 ----------------------------------------

        // ---------------------------------------- 适配 ----------------------------------------

        /** 当舞台尺寸发生变化 */
        public onStageResize(evt: egret.Event): void {
            super.onStageResize(evt);
            let stageScale = StageUtil.width / StageUtil.height;
            if (stageScale) {
                // 4:3 - 16：9
                if (stageScale < 16 / 9) {
                    this.stageScale_4_3();
                }
                // 16：9 - 18.5：9
                else if (16 / 9 <= stageScale && stageScale < 18.5 / 9) {
                    this.stageScale_16_9();
                }
                // <= 18.5:9
                else if (18.5 / 9 <= stageScale) {
                    this.stageScale_185_9();
                }
            }
        }

        /** 4:3 - 16：9 */
        private stageScale_4_3(): void { }

        /** 16：9 - 18.5：9 */
        private stageScale_16_9(): void { }

        /** <= 18.5:9 */
        private stageScale_185_9(): void { }

        // ---------------------------------------- dispos ----------------------------------------

        public dispose(): void {
            super.dispose();
        }

    }
}