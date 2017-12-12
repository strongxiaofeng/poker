module game {

    export class PCGameRuleUI1 extends GameRuleBaseUI {

        public constructor(data) {
            super(data);
            this.skinName = "resource/skins/game_skins/pc/gameRule/gameRuleSkin.exml";
        }
        /**百家乐按钮*/
        protected btnBac:eui.AButton;
        /**轮盘按钮*/
        protected btnRou:eui.AButton;
        /**骰宝按钮*/
        protected btnSic:eui.AButton;
        /**牛牛按钮*/
        protected btnTau:eui.AButton;
        /**上一页按钮*/
        protected btnLast:eui.AButton;
        /**下一页按钮*/
        protected btnNext:eui.AButton;
        protected imgLast:eui.Image;
        protected imgNext:eui.Image;
        /**当前页数*/
        protected pageNum:number = 1;
        /**游戏类型*/
        protected gameType:string;
        /**当前图片*/
        protected imgNow:eui.Image;
        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.initType();
            this.initBtn();
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
            this.registerEvent(this.btnLast, mouse.MouseEvent.MOUSE_OVER,()=>{
                this.imgLast.visible = true;
            }, this);
            this.registerEvent(this.btnLast, mouse.MouseEvent.MOUSE_OUT,()=>{
                this.imgLast.visible = false;
            }, this);
            this.registerEvent(this.btnLast, egret.TouchEvent.TOUCH_BEGIN,()=>{
                this.imgLast.visible = false;
            }, this);
            this.registerEvent(this.btnLast, egret.TouchEvent.TOUCH_END,()=>{
                this.imgLast.visible = false;
            }, this);
            this.registerEvent(this.btnNext, mouse.MouseEvent.MOUSE_OVER,()=>{
                this.imgNext.visible = true;
            }, this);
            this.registerEvent(this.btnNext, mouse.MouseEvent.MOUSE_OUT,()=>{
                this.imgNext.visible = false;
            }, this);
            this.registerEvent(this.btnNext, egret.TouchEvent.TOUCH_BEGIN,()=>{
                this.imgNext.visible = false;
            }, this);
            this.registerEvent(this.btnNext, egret.TouchEvent.TOUCH_END,()=>{
                this.imgNext.visible = false;
            }, this);
            this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, () => {
			    SoundPlayerNew.playEffect(SoundConst.click);
                MediatorManager.closeMediator(Mediators.Mediator_GameRule.name);
            }, this);
            this.registerEvent(this.btnLast, egret.TouchEvent.TOUCH_TAP, this.lastFun, this);
            this.registerEvent(this.btnNext, egret.TouchEvent.TOUCH_TAP, this.nextFun, this);
        }
        /**初始化类型*/
        protected initType(){
            this.gameType = "Bac";
            this.btnBac.touchEnabled = false;
            this.btnRou.touchEnabled = false;
            this.btnSic.touchEnabled = false;
            this.btnTau.touchEnabled = false;
            this[`btn${this.gameType}`].touchEnabled = true;
            this[`btn${this.gameType}`].setState = "down";
            this[`groupRule${this.gameType}`] = true;
        }
        /**初始化按钮*/
        protected initBtn():void{
            this.btnLast.setState = "disabled";
            this.btnLast.touchEnabled = false;
            this.btnNext.touchEnabled = true;
            this.btnNext.setState = "up";
            this.imgNow.x = 549;
        }
        /**上一页*/
        protected lastFun():void{
			SoundPlayerNew.playEffect(SoundConst.click);
            this.imgLast.visible = false;
            this.pageNum--;
            if(this.pageNum == 1){
                this.btnLast.setState = "disabled";
                this.btnLast.touchEnabled = false;
                this.btnNext.touchEnabled = true;
                this.btnNext.setState = "up";
            }else{
                this.btnLast.touchEnabled = true;
                this.btnNext.touchEnabled = true;
                this.btnLast.setState = "up";
                this.btnNext.setState = "up";
            }
            let str = "group" + this.gameType + this.pageNum;
            let str1 = "group" + this.gameType + (this.pageNum+1);
            this[str].visible = true;
            this[str1].visible = false;
            this.imgNow.x = 549 + (this.pageNum - 1)*38;
        }
        /**下一页*/
        protected nextFun():void{
			SoundPlayerNew.playEffect(SoundConst.click);
            this.imgNext.visible = false;
            this.pageNum++;
            if(this.pageNum == 6){
                this.btnLast.touchEnabled = true;
                this.btnLast.setState = "up";
                this.btnNext.setState = "disabled";
                this.btnNext.touchEnabled = false;
            }else{
                this.btnLast.touchEnabled = true;
                this.btnNext.touchEnabled = true;
                this.btnLast.setState = "up";
                this.btnNext.setState = "up";
            }
            let str = "group" + this.gameType + this.pageNum;
            let str1 = "group" + this.gameType + (this.pageNum-1);
            this[str].visible = true;
            this[str1].visible = false;
            this.imgNow.x = 549 + (this.pageNum - 1)*38;
        }
        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}