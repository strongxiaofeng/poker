module game
{
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    export class OwnersWatchUI1 extends OwnersWatchBaseUI
    {
        public constructor(data: string)
        {
            super(data);
        }


        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void
        {
            super.onMediatorCommand(type, params);
            switch (type) {

            }
        }

        /** 初始化事件 */
        public initListener()
        {
            super.initListener();
        }

        /* 点击响应事件 */
        protected onTouchBtn(evt: egret.TouchEvent): void
        {
            super.onTouchBtn(evt);
            switch (evt.target) {

            }
        }

    }
}