module game {

    export class QuotaRecordItem extends eui.AItemRenderer {

        public constructor() {
            super();
            this.onStage().then(() => {
                this.init();
            }).catch(() => { });
            this.skinName = SystemPath.skin_path + "quotaRecord/quotaRecordItemSkin.exml";
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
        /** 年月日 */
        private labelYear: eui.ALabel;
        /** 时分秒 */
        private labelHour: eui.ALabel;
        /** 用户名 */
        private labelAccount: eui.ALabel;
        /** 用户ID */
        private labelRoundId: eui.ALabel;
        /** 交易金额 */
        private labelMoney: eui.ALabel;
        /** 投注记录类型 */
        private labelType: eui.ALabel;
        /** 账户余额 */
        private labelBalance: eui.ALabel;

        // ----------------------------------------------- variables -----------------------------------------------


        // ----------------------------------------------- handle data -----------------------------------------------

        protected init() {
            this.imgBgd.visible = this.data.showBgd;
            let history: topic.TransferHistoryItem = this.data;
            let date = new Date(history.time || 0);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            // 文本显示
            this.labelYear.text = `${y}/${(m / 100).toFixed(2).slice(2)}/${(d / 100).toFixed(2).slice(2)}`;
            this.labelHour.text = `${(hour / 100).toFixed(2).slice(2)}:${(min / 100).toFixed(2).slice(2)}:${(sec / 100).toFixed(2).slice(2)}`;
            this.labelAccount.text = history.username || "";
            this.labelRoundId.text = history.serial_number || "";
            if (history.balance > 0) {
                this.labelMoney.textColor = GlobalConfig.payoutShowRed ? 0xff0000 : 0x00ff00;
            } else {
                this.labelMoney.textColor = GlobalConfig.payoutShowRed ? 0x00ff00 : 0xff0000;
            }
            this.labelMoney.text = NumberUtil.getSplitNumStr(history.balance);
            if (history.balance > 0) {
                this.labelMoney.text = "+" + this.labelMoney.text;
            }
            let type = "";
            switch (history.transfer_type) {
                case "bet":
                    type = "founder_lbl_data_center_bet_title";
                    break;
                case "payout":
                    type = "派彩";
                    break;
                case "reward_dealer":
                    type = "founder_btn_affair_type_reward";
                    break;
                case "recharge":
                    if (history.balance >= 0) {
                        type = "founder_btn_affair_type_transfer_in";
                    } else {
                        type = "founder_btn_affair_type_transfer_out";
                    }
                    break;
                case "rollback":
                    type = "founder_btn_affair_type_back_bet";
                    break;
            }
            this.labelType.text = LanguageUtil.translate(type);
            this.labelBalance.text = NumberUtil.getSplitNumStr(history.balance_after);
        }

    }
}