module game{
    /**
     * by 唐茂
     */
    export class PCOwnersWatchUI1 extends OwnersWatchBaseUI
    {
        public constructor(data:string)
        {
            super(data);
        }
        /**关闭*/
        private closeBtn:eui.AButton;
        /**房间名*/
        private roomName:eui.ALabel;
        public initSetting()
		{
			super.initSetting();
		}
        /** 注册监听事件 */
        public initListener()
        {
            super.initListener();
            this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        }
        public onMediatorCommand(type: OwnersWatchUICommands, params: any = null): void
		{   super.onMediatorCommand(type, params);
			switch (type) {
				case OwnersWatchUICommands.OwnersWatchNotify_roomName:
                    this.roomName.text = params;
					break;	
			}
		}
        /**关闭*/
        private closeFun():void{
			SoundPlayerNew.playEffect(SoundConst.click);
            MediatorManager.closeMediator(Mediators.Mediator_OwnersWatchMediator.name);
        }
        //------------------------------------dispose-------------------------------------------------
        public dispose()
        {
            super.dispose();
        }
    }
}