module game {

    export class BetRecordResult extends eui.Component {

        public constructor(data: topic.BetHistoryItem) {
            super();
            this.data = data;
            this.skinName = SystemPath.skin_path + "betRecord/betRecordResultSkin.exml";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.initSetting();
        }

        // --------------------------------------- skin component ---------------------------------------

        // groups
        private groupBaccarat: eui.Group;
        private groupRoulette: eui.Group;
        private groupDT: eui.Group;
        private groupSicbo: eui.Group;

        // baccarat
        /** 闲蓝色框 */
        private imgPlayerBgd: eui.Image;
        /** 庄红色框 */
        private imgBankerBgd: eui.Image;
        /** 闲点数 */
        private imgPlayerPoint: eui.Image;
        /** 庄点数 */
        private imgBankerPoint: eui.Image;
        /** 开彩结果 */
        private imgResult: eui.Image;
        private imgCard0: eui.Image;
        private imgCard1: eui.Image;
        private imgCard2: eui.Image;
        private imgCard3: eui.Image;
        private imgCard4: eui.Image;
        private imgCard5: eui.Image;

        // roulette
        private groupRouletteWait: eui.Group;
        private groupRouletteNum: eui.Group;
        private imgRoulette: eui.Image;
        private labelRoulette: eui.BitmapLabel;


        // --------------------------------------- variable ---------------------------------------

        private data: topic.BetHistoryItem;

        // --------------------------------------- init ---------------------------------------

        /** 初始化设置 */
        private initSetting(): void {
            this.groupBaccarat.visible = false;
            this.groupRoulette.visible = false;
            this.groupDT.visible = false;
            this.groupSicbo.visible = false;
            switch (this.data.type) {
                case GameType.baccarat:
                    this.showBaccaratResult(<topic.BaccaratHistory>this.data.history);
                    this.groupBaccarat.visible = true;
                    break;
                case GameType.roulette:
                    this.showRouletteResult(<topic.RouletteHistory>this.data.history);
                    this.groupRoulette.visible = true;
                    break;
                case GameType.sicbo:
                    this.showSicboResult(<topic.SicboHistory>this.data.history);
                    this.groupSicbo.visible = true;
                    break;
                case GameType.dragon_tiger:
                    this.showDragonTigerResult(<topic.DragonTigerHistory>this.data.history);
                    this.groupDT.visible = true;
                    break;
            }
        }

        // --------------------------------------- handle ui ---------------------------------------

        /** 百家乐开彩结果 */
        private showBaccaratResult(history: topic.BaccaratHistory): void {
            if (history.cards && history.cards.length) {
                let showPlayer3 = false;
                let showBanker3 = false;
                // 显示扑克牌点数
                for (let i = history.cards.length - 1; i >= 0; i--) {
                    let cardType = history.cards[i].position;
                    let num: number = 0;
                    switch (cardType) {
                        case "player_1":
                            num = 0;
                            break;
                        case "player_2":
                            num = 2;
                            break;
                        case "player_3":
                            showPlayer3 = true;
                            num = 4;
                            break;
                        case "banker_1":
                            num = 1;
                            break;
                        case "banker_2":
                            num = 3;
                            break;
                        case "banker_3":
                            showBanker3 = true;
                            num = 5;
                            break;
                    }
                    let imgSource = `mpoker_pic_${history.cards[i].card}_png`;
                    if (!GlobalConfig.isMobile) {
                        imgSource = `mpoker_pic_${history.cards[i].card}_pc_png`;
                    }
                    (this[`imgCard${num}`] as eui.Image).source = imgSource;
                }
                // 是否显示第三张牌
                (this[`imgCard4`] as eui.Image).visible = showPlayer3;
                (this[`imgCard5`] as eui.Image).visible = showBanker3;
                if (GlobalConfig.isMobile) {
                    // 调整框的大小
                    this.imgPlayerBgd.width = showPlayer3 ? 220 : 220 - 77 - 5;
                    this.imgBankerBgd.width = showBanker3 ? 220 : 220 - 77 - 5;
                    // 调整点数位置
                    this.imgPlayerPoint.right = showPlayer3 ? 238 : 238 - 77 - 5;
                    this.imgBankerPoint.left = showBanker3 ? 238 : 238 - 77 - 5;
                } else {
                    // 调整框的大小
                    this.imgPlayerBgd.width = showPlayer3 ? 110 : 110 - 40 - 3;
                    this.imgBankerBgd.width = showBanker3 ? 110 : 110 - 40 - 3;
                    // 调整点数位置
                    this.imgPlayerPoint.right = showPlayer3 ? 120 : 120 - 40 - 3;
                    this.imgBankerPoint.left = showBanker3 ? 120 : 120 - 40 - 3;
                }
                // 设置庄闲点数
                let b = history.score.banker;
                let p = history.score.player;
                this.imgPlayerPoint.source = GlobalConfig.isMobile ? `recordpoints_pic_blue${p}_png` : `recordpoints_pic_blue${p}_pc_png`;
                this.imgBankerPoint.source = GlobalConfig.isMobile ? `recordpoints_pic_red${b}_png` : `recordpoints_pic_red${b}_pc_png`;
                // 设置开彩结果
                let BPT = "B";
                let pairB = "-";
                let pairP = "-";
                for (let i = history.round_result.length - 1; i >= 0; i--) {
                    switch (history.round_result[i]) {
                        case "banker":
                            BPT = "B";
                            break;
                        case "player":
                            BPT = "P";
                            break;
                        case "tie":
                            BPT = "T";
                            break;
                        case "player_pair":
                            pairP = "P";
                            break;
                        case "banker_pair":
                            pairB = "B";
                            break;
                    }
                }
                let resultImgSource = `baccarat_pic_bead.${BPT}${pairB}${pairP}_png`;
                if (!GlobalConfig.isMobile) {
                    resultImgSource = `baccarat_pic_bead.${BPT}${pairB}${pairP}_pc_png`;
                }
                this.imgResult.source = resultImgSource;
            } else {
                // 等待开彩
                this.imgPlayerBgd.visible = false;
                this.imgBankerBgd.visible = false;
                this.imgPlayerPoint.visible = false;
                this.imgBankerPoint.visible = false;
                this.imgResult.visible = false;
                for (let i = 0; i < 6; i++) {
                    (this[`imgCard${i}`] as eui.Image).source = GlobalConfig.isMobile ? "record_pic_pokerback_png" : "record_pic_pokerback_pc_png";
                }
            }
        }

        /** 轮盘开彩结果 */
        private showRouletteResult(history: topic.RouletteHistory): void {
            if ((history.round_result && history.result) || history.result === 0) {
                this.groupRouletteNum.visible = true;
                this.groupRouletteWait.visible = false;
                let num = history.result;
                let src = "roulette_play_pic_opengreen_png";
                this.labelRoulette.text = num + "";
                if (RouletteModel.redNum.indexOf(num) > -1) {
                    src = "roulette_play_pic_openred_png";
                }
                if (RouletteModel.blackNum.indexOf(num) > -1) {
                    src = "roulette_play_pic_openblack_png";
                }
                this.imgRoulette.source = src;
            } else {
                // 等待开彩
                this.groupRouletteNum.visible = false;
                this.groupRouletteWait.visible = true;
            }
        }

        /** 龙虎开彩结果 */
        private showDragonTigerResult(history: topic.DragonTigerHistory): void {

        }

        /** 骰宝开彩结果 */
        private showSicboResult(history: topic.SicboHistory): void {

        }

        // --------------------------------------- dispose ---------------------------------------

        /** 关闭父级界面时调用 */
        public dispose(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

    }
}