module game{
    export class roomManagerBaseUI extends BaseUI
    {   
        
        public constructor(){
            super();
        }
        
       
//----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        public initSetting():void
        {
            super.initSetting();
        }
//------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        public onMediatorCommand(type:roomManagerCommands,params:any = null)
        {
            switch (type) {
                case roomManagerCommands.initListener:
                    this.initListener(params);
                    break;
                case roomManagerCommands.Notify_clubRoomArr:
                    this.chooseRoomName();
                    break;
            }
        }
//------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        protected initListener(mediator:PictureEditorMediator):void
        {
           
        }
        
        /**筛选房间名*/
        protected chooseRoomName(): void
        {

        }

        /**
         * 当舞台尺寸发生变化
         */
        public onStageResize(evt: egret.Event): void
        {
            super.onStageResize(evt);
        }
       
    }

}