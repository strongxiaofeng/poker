module game{
    export class ModifyNicknameBaseUI extends BaseUI
    {   
        
        public constructor(){
            super();
        }
//----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        public initSetting():void{
            super.initSetting();
        }
//------------------------------------接收通知---------------------------------------------------
/**收到miditor的通知*/
        public onMediatorCommand(){
            
        }
//------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        protected initListener(mediator:PersonalInformationMediator):void{
        }

    }
}