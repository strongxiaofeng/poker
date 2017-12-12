module game
{
    export class souresItem extends eui.AItemRenderer
    {

        public soureceBtn: eui.AButton;

        public constructor()
        {
            super();
            this.skinName = "resource/skins/game_skins/pc/mulitBaccarat/item/souresItem.exml";
        }

        public dataChanged()
        {
            super.dataChanged();
            try {
                this.initItem()
            }
            catch (e) {
                DebugUtil.debug(e);
            }
        }

        /**设置选中 */
        public select(flag:boolean):void
        {
            if(flag)
            {
                this.soureceBtn.setState ="down";
            }
            else
            {
                this.soureceBtn.setState = "up";
            }
        }

        /**在item启用时 自动执行的初始化方法 */
        public onAdd()
        {
            super.onAdd();
        }

        public initItem()
        {
            if (!this.data) return;
            this.setLabelNum();
        }

        public setLabelNum()
        {
            if (!this.data) return;
            if (this.data.num) {
                this.soureceBtn.label = this.data.num + 1 + '';
            }
        }
    }
}