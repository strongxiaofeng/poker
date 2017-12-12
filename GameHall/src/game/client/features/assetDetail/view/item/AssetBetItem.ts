module game {

    export class AssetBetItem extends eui.AItemRenderer {

        public constructor() {
            super();
            this.onStage().then(() => {
                this.imgShowMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                this.imgShowLess.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                this.btnVideo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                this.init();
            }).catch(() => { });
            this.detailHeight = GlobalConfig.isMobile ? 480 : 85 + 60 + 35;
            this.normalHeight = GlobalConfig.isMobile ? 165 : 85;
            this.skinName = SystemPath.skin_path + "assetDetail/assetBetItemSkin.exml";
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
        private imgShowMore: eui.AButton | eui.Image;
        /** 点击收起详情 */
        private imgShowLess: eui.Image;

        // 信息展示
        /** 年月日 */
        private labelYear: eui.ALabel;
        /** 时分秒 */
        private labelHour: eui.ALabel;
        /** 用户名 */
        private labelAccount: eui.ALabel;
        /** 用户ID */
        private labelUserId: eui.ALabel;
        /** 投注 */
        private labelBet: eui.ALabel;
        /** 派彩 */
        private labelPayout: eui.ALabel;
        /** 等待派彩文本 */
        private labelWaitPayout: eui.ALabel;
        private labelWaitPayout2: eui.ALabel;
        // 按下状态组
        private labelYearDown: eui.ALabel;
        private labelHourDown: eui.ALabel;
        private labelAccountDown: eui.ALabel;
        private labelUserIdDown: eui.ALabel;
        private labelBetDown: eui.ALabel;
        private labelPayoutDown: eui.ALabel;
        private labelRoomNameDown: eui.ALabel;
        private labelRoundNoDown: eui.ALabel;
        private labelWaitPayoutDown: eui.ALabel;
        /** 房间名 */
        private labelRoomName: eui.ALabel;
        /** 牌局号 */
        private labelRoundNo: eui.ALabel;
        /** 结果展示group */
        private groupResult: eui.Group;
        /** 投注列表 */
        private listDetail: eui.List;
        /** 视频回放按钮 */
        private btnVideo: eui.AButton;

        // ----------------------------------------------- variables -----------------------------------------------

        private listArray: eui.ArrayCollection;
        /** 展开后item的高度 */
        private detailHeight: number;
        /** 收起后的高度 */
        private normalHeight: number;

        /** 视频回放详情 */
        // private videoData: topic.Video;

        // ----------------------------------------------- handle data -----------------------------------------------

        protected init() {
            this.imgBgd.visible = this.data.showBgd;
            this.height = this.normalHeight;
            this.groupDown.visible = false;
            this.groupDetail.visible = false;
            let history: topic.GameHistory = (this.data as topic.BetHistoryItem).history;
            let date = new Date(history.start_bet_time || 0);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            // 文本显示
            this.labelYear.text = `${y}/${(m / 100).toFixed(2).slice(2)}/${(d / 100).toFixed(2).slice(2)}`;
            this.labelHour.text = `${(hour / 100).toFixed(2).slice(2)}:${(min / 100).toFixed(2).slice(2)}:${(sec / 100).toFixed(2).slice(2)}`;
            this.labelAccount.text = this.translateGameType();
            this.labelUserId.text = (history.round_id + "") || "";
            this.labelBet.text = NumberUtil.getSplitNumStr(history.bet, 2);
            if (history.payout >= history.bet) {
                this.labelPayout.textColor = GlobalConfig.payoutShowRed ? 0xff0000 : 0x00ff00;
            } else {
                this.labelPayout.textColor = GlobalConfig.payoutShowRed ? 0x00ff00 : 0xff0000;
            }
            if (this.data.labelUserId == PersonalInfoModel.getInstance().user_id) {
                this.labelPayout.textColor = this.labelPayout.textColor == 0xff0000 ? 0x00ff00 : 0xff0000;
            }
            this.labelPayout.text = NumberUtil.getSplitNumStr(history.payout);
            this.labelRoomName.text = history.room_name;
            this.labelRoundNo.text = history.round_id;
            // 按下状态组
            this.labelYearDown.text = this.labelYear.text;
            this.labelHourDown.text = this.labelHour.text;
            this.labelAccountDown.text = this.labelAccount.text;
            this.labelUserIdDown.text = this.labelUserId.text;
            this.labelBetDown.text = this.labelBet.text;
            this.labelPayoutDown.text = this.labelPayout.text;
            if (!GlobalConfig.isMobile) {
                this.labelRoomNameDown.text = this.labelRoomName.text;
                this.labelRoundNoDown.text = this.labelRoundNo.text;
            }
            // 展示结果组与投注记录
            this.setListDetail(history.bets);
            this.setResult();
            // 获取视频回放信息
            DataCenterController.getInstance().getVideoInfo(history.round_id).then((data: topic.Video) => {
                if (data.snapshot.video) {
                    this.btnVideo.enabled = true;
                    this.btnVideo.setState = "up";
                    this.data["video"] = data.snapshot.video;
                }
            }).catch((e) => {
                DebugUtil.debug("获取video详情失败" + e.massage);
            });
        }

        /** 翻译游戏类型 */
        private translateGameType(): string {
            let type = "";
            switch (this.data.type) {
                case GameType.baccarat:
                    type = "global_lbl_baccarat";
                    break;
                case GameType.roulette:
                    type = "founder_btn_search_type_rt";
                    break;
                case GameType.sicbo:
                    type = "founder_btn_search_type_sibo";
                    break;
            }
            return LanguageUtil.translate(type);
        }
        /** 展示投注详情 */
        private setListDetail(data: Array<{ bet_map: {}; bet_time: number }>): void {
            this.listDetail.useVirtualLayout = false;
            this.listArray = new eui.ArrayCollection();
            if (GlobalConfig.isMobile) {
                this.listDetail.itemRenderer = BetRecordDetailItem;
            } else {
                this.listDetail.itemRenderer = AssetBetDetailItem;
            }
            this.listDetail.dataProvider = this.listArray;
            // 处理下注列表
            let listData = [];
            let temp = {};
            for (let i = data.length - 1; i >= 0; i--) {
                let bet_map = data[i].bet_map;
                for (let key in bet_map) {
                    if (!temp[key]) {
                        temp[key] = {
                            type: this.data.type,
                            key: key,
                            bet: 0,
                            payout: 0
                        };
                    }
                    temp[key]["bet"] += bet_map[key];
                }
            }
            let waitForResult: boolean = !(this.data.history.round_result && this.data.history.round_result.length);
            if (this.data.history.payouts) {
                for (let key in this.data.history.payouts) {
                    temp[key]["payout"] = this.data.history.payouts[key];
                }
            }
            for (let key in temp) {
                if (temp[key]["bet"] || temp[key]["payout"]) {
                    listData.push(temp[key]);
                    if (waitForResult) {
                        temp[key]["payout"] = "-1";
                    }
                }
            }
            if (listData.length == 1) {
                listData[0]["single"] = true;
            }
            if (listData.length == 2) {
                listData[0]["double"] = true;
            }
            listData.sort((a, b) => {
                let typeA = a.key;
                let typeB = b.key;
                let result = 0;
                switch (a.type) {
                    case GameType.baccarat:
                        result = BaccaratModel.sortByType(typeA, typeB);
                        break;
                    case GameType.roulette:
                        break;
                    case GameType.sicbo:
                        break;
                    case GameType.dragon_tiger:
                        break;
                }
                return result;
            });
            this.listArray.source = listData;
            this.listArray.refresh();
            this.listDetail.validateNow();
            if (GlobalConfig.isMobile) {
                this.detailHeight = Math.max(this.detailHeight, this.normalHeight + 135 + 65 + listData.length * 60 + 10);
            } else {
                this.detailHeight = Math.max(this.detailHeight, this.normalHeight + 35 + listData.length * 30);
            }
            // 设置等待开彩文本
            this.labelWaitPayout.visible = waitForResult;
            this.labelWaitPayout2.visible = waitForResult;
            this.labelWaitPayoutDown.visible = waitForResult;
            this.labelPayout.visible = !waitForResult;
            this.labelPayoutDown.visible = !waitForResult;
            this.btnVideo.enabled = false;
            this.btnVideo.setState = "disabled";
        }

        /** 展示开彩详情 */
        private setResult(): void {
            let result = new BetRecordResult(this.data);
            this.groupResult.removeChildren();
            result.horizontalCenter = 0;
            result.verticalCenter = 0;
            this.groupResult.addChild(result);
        }

        /** 设置折叠状态 */
        public setItem(roundId: string): void {
            if (roundId != this.data.history.round_id) {
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
                    CTweenManagerController.getInstance().startCTween(6, [this.groupDetail]);
                    DataCenterController.getInstance().sendNotification(NotifyConst.Notify_DataCenterItem, this.data.history.round_id);
                    break;
                case this.imgShowLess:
                    this.height = this.normalHeight;
                    this.groupDown.visible = false;
                    this.groupDetail.visible = false;
                    break;
                case this.btnVideo:
                    MediatorManager.openMediator(Mediators.Mediator_PbBacMediator, [this.data, Mediators.Mediator_AssetDetail]);
                    break;
            }
        }

    }
}