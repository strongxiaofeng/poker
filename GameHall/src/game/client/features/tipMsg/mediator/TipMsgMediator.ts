module game {

    export class TipMsgMediator extends BaseMediator {

        public constructor() {
            super();
        }

        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        protected initUI(): void {
            // var currentUI: any;
            // currentUI = egret.getDefinitionByName("game.TipMsgUI" + GlobalConfig.multiSkinType);
            this.ui = new TipMsgBaseUI(this.data);
            UIManager.OpenUI(this.ui, Mediators.Mediator_TipMsg.layer);
        }

        /**分发游戏数据 */
        protected initData(): void {
            this.addRegister(Mediators.Mediator_TipMsg.name, this);
            this.notifyUI(TipMsgUICommands.initListener, this);
        }

        /**关闭 */
        public dispose() {
            this.removeRegister(Mediators.Mediator_TipMsg.name);
            super.dispose();
        }
    }

    export class TipMsgInfo {
        /** 要显示的富文本，支持“\n”换行 */
        public msg: Array<tipMsgContent>;
        /** Optional - 要显示的富文本标题 */
        public title: Array<tipMsgContent>;
        /** Optional - 确定按钮上的文字 */
        public confirmText: string;
        /** Optional - 取消按钮上的文字，如果传入则会显示确认和取消两个按钮，否则只显示确定按钮 */
        public cancelText: string;
        /** Optional - 确定按钮点击回调 */
        public comfirmCallBack: Function;
        /** Optional - 取消按钮点击回调 */
        public cancelCallBack: Function;
        /** Optional - 按钮点击回调函数caller */
        public thisObj: any;
    }

    export class tipMsgContent {
        /** 文本 */
        text: string;
        /** 文本颜色 */
        textColor: number;
    }

}