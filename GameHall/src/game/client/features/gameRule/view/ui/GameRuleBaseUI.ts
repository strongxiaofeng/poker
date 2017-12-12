module game {

    export class GameRuleBaseUI extends BaseUI {

        public constructor(data) {
            super();
            this.data = data;
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 关闭按钮 */
        protected btnClose: eui.AButton;

        // ---------------------------------- 变量声明 ----------------------------------

        /** gameType */
        protected data: string;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: GameRuleUICommands, params: any = null): void {
            switch (type) {
                case GameRuleUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: GameRuleMediator): void {
            // tap事件
            this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, () => {
			    SoundPlayerNew.playEffect(SoundConst.click);
                MediatorManager.closeMediator(Mediators.Mediator_GameRule.name);
            }, this);
        }


        // ---------------------------------- UI操作 ----------------------------------


        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}