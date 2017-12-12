module game {

    export class CommonChipItem extends eui.Component {

        public constructor() {
            super();
            // this.skinName = SystemPath.skin_path + "sicbo/item/CommonChipItemSkin.exml";
        }

        public createChildren() {
            super.createChildren();
            this.touchEnabled = false;
            this.touchChildren = false;
        }

        /** 加钱 */
        public addMoney() { }

        /** 减钱 */
        public subMoney() { }

        /** 重设筹码样式 */
        public reset() { }

        /** 清空筹码 */
        public clear(): void { }

    }
}