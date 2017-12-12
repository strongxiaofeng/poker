module game {

    export class CardRecordBuyItem extends eui.AItemRenderer {

        public constructor() {
            super();
            this.onStage().then(() => {
                this.init();
            }).catch(() => { });
            this.skinName = SystemPath.skin_path + "cardRecord/cardRecordBuyItemSkin.exml";
        }

        private onStage() {
            return new Promise((resolve, reject) => {
                let addToStage = () => {
                    this.removeEventListener(egret.Event.ADDED_TO_STAGE, addToStage, this);
                    resolve();
                }
                this.addEventListener(egret.Event.ADDED_TO_STAGE, addToStage, this);
            });
        }

        protected dataChanged() {
        }

        // ----------------------------------------------- skin component -----------------------------------------------

        /** 浅色背景 */
        private imgBgd: eui.Image;

        // ----------------------------------------------- variables -----------------------------------------------

        // 信息展示
        private labelYear: eui.ALabel;
        private labelHour: eui.ALabel;
        private labelCount: eui.ALabel;
        private labelNumber: eui.ALabel;
        private labelMoney: eui.ALabel;

        // ----------------------------------------------- handle data -----------------------------------------------

        protected init() {
            this.imgBgd.visible = this.data.showBgd;
            let Detail = (this.data as topic.RoomCardDetail);
            let date = new Date(Detail.time || 0);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            // 文本显示
            this.labelYear.text = `${y}/${(m / 100).toFixed(2).slice(2)}/${(d / 100).toFixed(2).slice(2)}`;
            this.labelHour.text = `${(hour / 100).toFixed(2).slice(2)}:${(min / 100).toFixed(2).slice(2)}:${(sec / 100).toFixed(2).slice(2)}`;
            this.labelCount.text = Math.abs(Detail.card_change) + "";
            this.labelNumber.text = Detail.serial_number;
            this.labelMoney.text = NumberUtil.getSplitNumStr(Detail.cash);
        }

    }
}