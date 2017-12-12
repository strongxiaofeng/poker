module game {

    export class ClubMemberUI1 extends ClubMemberBaseUI {

        public constructor() {
            super();
        }

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.groupUser.visible = false;
            this.labelNoUser.visible = true;
            this.labelNotExist.visible = false;
            this.imgInputActive.visible = false;
            this.listArr = new eui.ArrayCollection();
            this.listUser.itemRenderer = ClubMemberItem;
            this.listUser.dataProvider = this.listArr;
            this.scrollerUser.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.btnAllPlayer.setState = "down";
            this.btnLockedPlayer.setState = "up";
            this.addChild(this.groupUser);
            this.labelSearch.prompt = LanguageUtil.translate("founder_lbl_input_tips");
            // state
            this.setPageState(true);
        }

        protected initListener(mediator: ClubMemberMediator): void {
            super.initListener(mediator);
            this.registerEvent(this.btnSearch, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnAllPlayer, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnLockedPlayer, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnAdd, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnReduce, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnCancel, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.btnConfirm, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}