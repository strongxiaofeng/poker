module game
{

    export class TipMsgBaseUI extends BaseUI
    {

        public constructor(data)
        {
            super();
            this.data = data;
            this.skinName = SystemPath.skin_path + "tipMsg/tipMsgSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------
        protected joinGroupBgd: eui.Image;
        protected tipGroup: eui.Group;
        protected msgLabel: eui.ALabel;
        protected titleLabel: eui.ALabel;
        protected cancelBtn: eui.AButton;
        protected confirmBtn: eui.AButton;
        protected knowBtn: eui.AButton;

        // ---------------------------------- 变量声明 ----------------------------------

        protected data: TipMsgInfo;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void
        {
            super.initSetting();
            this.setBtns(
                this.data.confirmText,
                this.data.cancelText
            );
            this.setMsg(this.data.msg);
            this.setTitle(this.data.title);
            if(GlobalConfig.isMobile){
                CTweenManagerController.getInstance().startCTween(3, [this.joinGroupBgd, this.tipGroup], true);
            }
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: TipMsgUICommands, params: any = null): void
        {
            switch (type) {
                case TipMsgUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: TipMsgMediator): void
        {
            this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.knowBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void
        {
            let thisObj = this.data.thisObj;
            switch (event.target) {
                case this.cancelBtn:
                    this.callBack = this.data.cancelCallBack;
                    if(GlobalConfig.isMobile){
                        CTweenManagerController.getInstance().startCTween(3, [this.joinGroupBgd, this.tipGroup], false, this.closeCallBack, this)
                    }else{
                        this.closeCallBack();
                    }
                    break;
                case this.confirmBtn:
                case this.knowBtn:
                    this.callBack = this.data.comfirmCallBack;
                    if(GlobalConfig.isMobile){
                        CTweenManagerController.getInstance().startCTween(3, [this.joinGroupBgd, this.tipGroup], false, this.closeCallBack, this)
                    }else{
                        this.closeCallBack();
                    }
                    break;
            }
        }

        protected callBack: any;
        protected closeCallBack()
        {
            MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
            if (this.data.thisObj && this.callBack) {
                this.callBack.call(this.data.thisObj);
            }
            this.callBack = null;
        }


        // ---------------------------------- UI操作 ----------------------------------

        protected setBtns(confirmText: string, cancelText?: string): void
        {
            this.confirmBtn.label = LanguageUtil.translate(confirmText);
            this.knowBtn.label = LanguageUtil.translate(confirmText);
            this.cancelBtn.label = LanguageUtil.translate(cancelText);
            this.knowBtn.visible = !cancelText;
        }

        protected setMsg(data: Array<tipMsgContent>): void
        {
            let textFlow: Array<egret.ITextElement> = [];
            for (let i = 0; i < data.length; i++) {
                textFlow.push({
                    text: data[i].text,
                    style: {
                        textColor: data[i].textColor
                    }
                });
            }
            this.msgLabel.textFlow = textFlow;
            // let h = this.msgLabel.textHeight;
            // if(h>=50){
            //     this.msgLabel.textAlign = "left";
            // }else{
            //     this.msgLabel.textAlign = "center";
            // }
        }

        protected setTitle(data: Array<tipMsgContent>): void
        {
            if (data && data.length && data.length > 0) {
                let textFlow: Array<egret.ITextElement> = [];
                for (let i = 0; i < data.length; i++) {
                    textFlow.push({
                        text: data[i].text,
                        style: {
                            textColor: data[i].textColor
                        }
                    });
                }
                this.titleLabel.textFlow = textFlow;
                this.titleLabel.visible = true;
            } else {
                this.titleLabel.visible = false;
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void
        {
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }

    }

}