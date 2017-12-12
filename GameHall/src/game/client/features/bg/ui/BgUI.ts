module game
{
    export class BgUI extends BgBaseUI
    {
        private bg: eui.Image;
        public constructor()
        {
            super();
        }
        /**组件创建完成初始化数据等操作 */
        public initSetting(): void
        {
        }
        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        public onStageResize(evt: egret.Event): void
        {
            super.onStageResize(evt);
            if (this.bg)
            {
                if (this.width <= 1440) this.bg.width = 1440;
                else this.bg.width = this.width;

                if (this.height <= 1920) this.bg.height = 1920;
                else this.bg.height = this.height;
            }
        }
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void
        {
            super.dispose();
        }
    }
}