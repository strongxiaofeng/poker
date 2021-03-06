module game {
	export class TipMsgPayOutMediator extends BaseMediator {

        public constructor() {
            super();
        }
		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        protected initUI(): void {
            this.ui = new TipMsgPayOutUI(this.data);
            UIManager.OpenUI(this.ui, Mediators.Mediator_TipPayOut.layer);

        }

        /**分发游戏数据 */
        protected initData(): void {
        }

        /**关闭 */
        public dispose() {
            super.dispose();
        }
	}
}