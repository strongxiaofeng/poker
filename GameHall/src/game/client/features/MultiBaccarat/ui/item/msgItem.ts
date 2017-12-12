module game
{
    export class msgItem extends eui.BaseItem
    {
        public msgGroup: eui.Group;
        public roomNameLabel: eui.Label;
        public msgLabel: eui.Label;
        public msgImg: eui.Image;

        public constructor()
        {
            super();
            this.skinName = "resource/skins/game_skins/pc/mulitBaccarat/item/msgItem.exml";
        }


        public initData()
        {
            if (!this.data) return;
            super.initData();
            this.getRoomName()
            this.showNum();
            this.setImg();
        }

        /** 设置金额 */
        public showNum()
        {
            if (!this.data) return;
            if (this.data[0][0] == 'bet') {
                this.msgLabel.textColor = 0xECBC74;
            }
            if (this.data[0][0] == 'payout') {
                this.msgLabel.textColor = 0xFE0A00;
            }
            this.msgLabel.text = NumberUtil.getSplitNumStr(this.data[0][1]);

        }

        /** 获取房间名 */
        public getRoomName()
        {
            if (!this.data) return;
            this.roomNameLabel.text = ClubModel.getInstance().getRoomName(this.data[0][2]);
        }

        /** 设置图片宽度 */
        public setImg()
        {
            if (!this.data) return;
            if (this.data[0][0] == 'bet') {
                this.msgImg.source = 'record_pic_morebg1_png';
            }
            if (this.data[0][0] == 'payout') {
                this.msgImg.source = 'desk_btn_red_png';
            }

            let num = this.data[0][1] / this.data[1];
            this.msgImg.width = this.msgGroup.width * num;
        }

    }
}