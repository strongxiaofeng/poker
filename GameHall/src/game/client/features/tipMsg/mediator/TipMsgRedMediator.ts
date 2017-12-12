module game {
	export class TipMsgRedMediator extends BaseMediator {

        public constructor() {
            super();
        }
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        protected initUI(): void {
            this.ui = new TipMsgRedUI(this.data);
            UIManager.OpenUI(this.ui, Mediators.Mediator_TipRed.layer);

        }

        /**分发游戏数据 */
        protected initData(): void {
            // this.addRegister(Mediators.Mediator_TipMsg.name, this);
        }

        /**关闭 */
        public dispose() {
            // this.removeRegister(Mediators.Mediator_TipMsg.name);
            super.dispose();
        }
	}
}