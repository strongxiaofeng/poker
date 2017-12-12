module game {
    /**
     * 俱乐部内部TOP条组件
     * by 郑戎辰
     */
    export class ClubTopUI extends BaseUI {
        /** 返回键 */
        protected goBackBtn: eui.AButton;
        /** 俱乐部名称 */
        protected clubName: eui.Label;
        /** TOPUI的mediator的this指向 */
        protected _mediator: ClubTopUIMediator;

        public constructor() {
            super();
            this.skinName = "resource/skins/game_skins/mobile/topUI/topUI.exml";
        }

        public initSetting() {
            super.initSetting();
        }

        public onMediatorCommand(type: any, params: any = null): void {
            switch (type) {
                case ClubTopUICommands.ClubTopUINotify_initListener:
                    this.registerEvent(this.goBackBtn, egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
                    break;
                case ClubTopUICommands.ClubTopUINotify_Show:
                    this.visible = true;
                    break;
                case ClubTopUICommands.ClubTopUINotify_Hidden:
                    this.visible = false;
                    break;
                case ClubTopUICommands.ClubTopUINotify_TitleName:
                    this.clubName.text = params;
                    break;
                case ClubTopUICommands.ClubTopUINotify_MediatorThis:
                    this._mediator = params;
                    break;
            }
        }

        /** 返回键点击事件 */
        public touchTap() {
            this._mediator.touchTap();
        }

        public dispoes() {
            super.dispose();
            this.goBackBtn = null;
            this.clubName = null;
            this._mediator = null;
        }

    }
}