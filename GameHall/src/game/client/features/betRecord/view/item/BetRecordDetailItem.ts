module game {

    export class BetRecordDetailItem extends eui.AItemRenderer {

        public constructor() {
            super();
            this.onStage().then(() => {
                this.init();
            }).catch(() => { });
            this.skinName = SystemPath.skin_path + "betRecord/betRecordDetailItemSkin.exml";
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
            try {
                this.init();
            } catch (e) { }
        }

        // ----------------------------------------------- skin component -----------------------------------------------

        private groupBaccarat: eui.Group;
        private groupRoulette: eui.Group;
        private groupSicbo: eui.Group;
        private groupDT: eui.Group;

        // baccrat
        private labelTitle: eui.ALabel;
        private labelBet: eui.ALabel;
        private labelPayout: eui.ALabel;

        // roulette
        private labelTitleRoulette: eui.ALabel;
        private groupRouletteBet: eui.Group;
        private labelBetRoulette: eui.ALabel;
        private labelPayoutRoulette: eui.ALabel;
        private imgRoulette0: eui.Image;
        private imgRoulette1: eui.Image;
        private imgRoulette2: eui.Image;
        private imgRoulette3: eui.Image;
        private imgRoulette4: eui.Image;
        private imgRoulette5: eui.Image;

        // ----------------------------------------------- variables -----------------------------------------------


        // ----------------------------------------------- handle data -----------------------------------------------

        protected init() {
            if (GlobalConfig.isMobile) {
                if (this.data.single) {
                    this.height = 110;
                }
            } else {
                if (this.data.single) {
                    this.height = 90;
                }
                if (this.data.double) {
                    this.height = 45;
                }
            }
            this.groupBaccarat.visible = false;
            this.groupRoulette.visible = false;
            this.groupSicbo.visible = false;
            this.groupDT.visible = false;
            switch (this.data.type) {
                case GameType.baccarat:
                    this.groupBaccarat.visible = true;
                    let key = "";
                    switch (this.data.key) {
                        case "tie":
                            key = "game_lbl_tie_simple";
                            break;
                        case "banker_pair":
                            key = "game_lbl_banker_pair_sim";
                            break;
                        case "player_pair":
                            key = "game_lbl_player_pair_sim";
                            break;
                        case "banker":
                            key = "game_lbl_banker_simple";
                            break;
                        case "player":
                            key = "game_lbl_player_simple";
                            break;
                    }
                    this.labelTitle.text = LanguageUtil.translate(key);
                    this.labelBet.text = NumberUtil.getSplitNumStr(this.data.bet);
                    this.labelPayout.text = !(this.data.payout == -1) ? NumberUtil.getSplitNumStr(this.data.payout) : "";
                    break;
                case GameType.sicbo:
                    this.groupSicbo.visible = true;
                    break;
                case GameType.roulette:
                    // 下注类型
                    let type = RouletteModel.translateBetType(this.data.key);
                    if (type.indexOf("_") == 0) {
                        this.groupRouletteBet.visible = true;
                        this.labelTitleRoulette.visible = false;
                        let nums = [];
                        let strArr = type.split("_");
                        strArr.forEach((str) => {
                            if (/\d+/.test(str)) {
                                nums.push(+str);
                            }
                        }, this);
                        for (let i = 0; i <= 5; i++) {
                            (this["imgRoulette" + i] as eui.Image).source = "";
                        }
                        for (let i = 0; i < nums.length; i++) {
                            let number = nums[i];
                            (this["imgRoulette" + i] as eui.Image).source = `roadmap_pic_${number}_png`;
                        }
                        this.groupRouletteBet.horizontalCenter = (6 - nums.length) * (GlobalConfig.isMobile ? 45 / 2 : 20 / 2);
                    } else {
                        this.labelTitleRoulette.text = LanguageUtil.translate(type);
                        this.groupRouletteBet.visible = false;
                        this.labelTitleRoulette.visible = true;
                    }
                    // 下注金额
                    this.labelBetRoulette.text = NumberUtil.getSplitNumStr(this.data.bet);
                    // 派彩金额
                    this.labelPayoutRoulette.text = !(this.data.payout == -1) ? NumberUtil.getSplitNumStr(this.data.payout) : "";
                    this.groupRoulette.visible = true;
                    break;
                case GameType.dragon_tiger:
                    this.groupDT.visible = true;
                    break;
            }
        }

    }
}