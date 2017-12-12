module game {

    export class CardRecordBetItem extends eui.AItemRenderer {

        public constructor() {
            super();
            this.onStage().then(() => {
                this.imgShowMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                this.imgShowLess.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                this.init();
            }).catch(() => { });
            this.detailHeight = GlobalConfig.isMobile ? 225 : 160;
            this.normalHeight = GlobalConfig.isMobile ? 165 : 70;
            this.skinName = SystemPath.skin_path + "cardRecord/cardRecordBetItemSkin.exml";
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
        /** 点击后高亮组 */
        private groupDown: eui.Group;
        /** 展开后详情组 */
        private groupDetail: eui.Group;
        /** 点击显示更多 */
        private imgShowMore: eui.Image;
        /** 点击收起详情 */
        private imgShowLess: eui.Image;

        // ----------------------------------------------- variables -----------------------------------------------

        /** 展开后item的高度 */
        private detailHeight: number;
        /** 收起后的高度 */
        private normalHeight: number;

        // 信息展示
        private labelYear: eui.ALabel;
        private labelHour: eui.ALabel;
        private labelCard: eui.ALabel;
        private labelRoomName: eui.ALabel;
        private labelRoundId: eui.ALabel;

        // 按下状态组
        private labelYearDown: eui.ALabel;
        private labelHourDown: eui.ALabel;
        private labelCardDown: eui.ALabel;
        private labelRoomNameDown: eui.ALabel;
        private labelRoundIdDown: eui.ALabel;

        private labelAccount0: eui.ALabel;
        private labelAccount1: eui.ALabel;
        private labelAccount2: eui.ALabel;
        private labelAccount3: eui.ALabel;
        private labelAccount4: eui.ALabel;
        private labelAccount5: eui.ALabel;
        private labelAccount6: eui.ALabel;
        private labelAccount7: eui.ALabel;

        // ----------------------------------------------- handle data -----------------------------------------------

        protected init() {
            this.imgBgd.visible = this.data.showBgd;
            this.height = this.normalHeight;
            this.groupDown.visible = false;
            this.groupDetail.visible = false;
            let Detail = (this.data as topic.RoomCardDetail);
            let date = new Date(Detail.time || 0);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            //
            if (GlobalConfig.isMobile) {
                this.detailHeight = this.normalHeight + Math.ceil((Detail.users.length + 1) / 2) * 60;
            } else {
                this.detailHeight = this.normalHeight + Math.ceil((Detail.users.length + 1) / 3) * 30;
            }
            // 文本显示
            this.labelYear.text = `${y}/${(m / 100).toFixed(2).slice(2)}/${(d / 100).toFixed(2).slice(2)}`;
            this.labelHour.text = `${(hour / 100).toFixed(2).slice(2)}:${(min / 100).toFixed(2).slice(2)}:${(sec / 100).toFixed(2).slice(2)}`;
            this.labelCard.text = Math.abs(Detail.card_change) + "";
            this.labelRoomName.text = Detail.room_name;
            this.labelRoundId.text = Detail.serial_number;
            let accounts: Array<string> = [];
            if (Detail.users) {
                Detail.users.forEach((user) => {
                    accounts.push(user.username);
                });
            }
            for (let i = 0; i <= 6; i++) {
                (this['labelAccount' + i] as eui.ALabel).text = accounts[i] || "";
            }
            this.labelAccount7.text = this.labelAccount0.text;
            this.labelAccount7.visible = accounts.length == 1;
            this.labelAccount0.visible = !(accounts.length == 1);
            // 按下状态组
            this.labelYearDown.text = this.labelYear.text;
            this.labelHourDown.text = this.labelHour.text;
            this.labelCardDown.text = this.labelCard.text;
            this.labelRoomNameDown.text = this.labelRoomName.text;
            this.labelRoundIdDown.text = this.labelRoundId.text;
        }

        /** 设置折叠状态 */
        public setItem(serial_number: string): void {
            if (serial_number != (this.data as topic.RoomCardDetail).serial_number) {
                this.height = this.normalHeight;
                this.groupDown.visible = false;
                this.groupDetail.visible = false;
            }
        }

        // ----------------------------------------------- handle event -----------------------------------------------

        private onTap(e: egret.TouchEvent): void {
            switch (e.target) {
                case this.imgShowMore:
                    this.height = this.detailHeight;
                    this.groupDown.visible = true;
                    // this.groupDetail.visible = true;
                    CTweenManagerController.getInstance().startCTween(6,[this.groupDetail]);
                    DataCenterController.getInstance().sendNotification(
                        NotifyConst.Notify_DataCenterItem,
                        (this.data as topic.RoomCardDetail).serial_number
                    );
                    break;
                case this.imgShowLess:
                    this.height = this.normalHeight;
                    this.groupDown.visible = false;
                    this.groupDetail.visible = false;
                    break;
            }
        }
    }
}