module game
{
    export class MulitBaccItemUI1 extends MulitBaccBaseItemUI
    {
        public unit: number = 55;
        public constructor()
        {
            super();
            this.skinName = "resource/skins/game_skins/mobile/mulitBaccarat/item/mulitBaccItem.exml";
        }

        /**  点击响应*/
        protected onTouchTap(evt: egret.TouchEvent): void
        {
            this.touchGroup.visible = false;
            super.onTouchTap(evt);
            switch (evt.target) {
                case this.moreBtn:
                    BaccaratController.getInstance().sendNotification(NotifyConst.Notify_MulitBacc_HideBottomMore, [this.data, !this.isShowMore]);
                    break;
            }
        }

        /** 视频源有更新时触发 */
        public souresIn()
        {
            super.souresIn();
            this.getDealerName();
        }

        /** 初始化计时器 */
        public initCountdown()
        {
            this.countdown = new game.countdown(75, true);
            this.stageGroup.addChild(this.countdown);
        }

        /** 获取荷官名字 */
        public getDealerName()
        {
            if (this.data == "guide") return;
            let dealerName = ClubModel.getInstance().getDealerName(this.data);
            if (dealerName) {
                this["onlyDealerName"].text = `荷官：${dealerName}`;
            }
        }

        /** 获取牌局号 */
        public getRoundID()
        {
            if (this.data == "guide") return;
            let soData = ClubModel.getInstance().getRoomSource(this.data);
            if (soData) {
                this.roundID.text = soData.round_id;
            }
        }

        /*----------------------------------------UI设置---------------------------------------------------------- */

        /** 是否在显示 */
        private isShowMore: boolean = false;
        /** 显示下方的下注区 */
        public showHideMore(b: boolean)
        {
            this.isShowMore = b;
            if (b) {
                this.height = 965;
                this.moreBtn.setState = 'down';
                this.bottomGroup.visible = true;
            }
            else {
                this.height = 520;
                this.moreBtn.setState = 'up';
                this.bottomGroup.visible = false;
            }
        }

        /** 更新中间显示的文字 */
        public upDataConterMsg(type: number, text?: string)
        {
            let centerMsg = <eui.Label>this['centerMsg'];
            centerMsg.alpha = 1;
            switch (type) {
                /** 普通灰色 */
                case 1:
                    centerMsg.text = text;
                    centerMsg.textColor = 0xFFFFFF;
                    centerMsg.alpha = 0.5;
                    break;
                /** 金色 */
                case 2:
                    centerMsg.text = text;
                    centerMsg.textColor = 0xE9B76F;
                    break;
            }
        }

        /** 更新下注区金额和显示动画 */
        public updaBetNum(chipMonney: string, type: string, unMoney: string, isDealer = false)
        {
            this.newFlyChip(chipMonney, type, unMoney, isDealer);
        }

        /** 点击筹码更新金额 */
        public touchChips(type)
        {
            switch (type) {
                case 'blue':
                    this.thisChip = 0;
                    this["ChipBg"].horizontalCenter = "-66%";
                    break;
                case 'green':
                    this.thisChip = 1;
                    this["ChipBg"].horizontalCenter = "0";
                    break;
                case 'red':
                    this.thisChip = 2;
                    this["ChipBg"].horizontalCenter = "66%";
                    break;
            }
            super.touchChips(type);
        }

        /** 绘制下注区百分比圆弧  */
        public shepClicle(color: string, numberPercent: number, lineColor: number)
        {
            if (this[`${color}Clicle`]) {
                this[`${color}Clicle`].graphics.clear();
            }
            else {
                this[`${color}Clicle`] = new egret.Shape;
            }
            if (isNaN(numberPercent) || numberPercent <= 0) {
                this[`${color}Clicle`].graphics.clear();
                return;
            }
            let colorClicle = this[`${color}Clicle`];
            colorClicle.graphics.lineStyle(6, lineColor);
            let r = this[`${color}PercentGroup`].width / 2;
            colorClicle.graphics.drawArc(r, r, r - 5, Math.PI / 180 * - 90, Math.PI / 180 * (360 / 100 * numberPercent - 90), false);
            //shep有BUG要画点其他东西才能画出圆弧
            colorClicle.graphics.moveTo(0, 0);
            this[`${color}PercentGroup`].addChild(colorClicle);
        }


        /** 弹出（红、绿）提示框 */
        public showMsg(msg: string, color: string)
        {
            if (color == 'red') {
                var group = this["redMsgGroup"];
                this["redMsgTxt"].text = msg;
            }
            else {
                var group = this["greenMsgGroup"];
                this["greenMsgTxt"].text = msg;
            }
            // CTween.removeTweens(group);
            // group.alpha = 1;
            // group.visible = true;
            // CTween.get(group).wait(1000).to({ alpha: 0 }, 2000).call(() =>
            // {
            //     group.visible = false;
            //     CTween.removeTweens(group);
            // })
            CTweenManagerController.getInstance().startCTween(2,[group]);
        }

        /** 切换发牌区的图片显示 */
        public toggleDeaCardImg()
        {
            super.toggleDeaCardImg()
            this['playPayImg'].source = 'baccarat_pic_pl1_png';
            this['bankerPayImg'].source = 'baccarat_pic_bk1_png';
        }

        /** 游戏结果 */
        public gameResults(score: any)
        {
            if (!score) return;
            super.gameResults(score);
            let player = score.player;
            let banker = score.banker;
            let results: Array<string> = [];
            if (player > banker) {
                results.push('player');
            }
            else if (player < banker) {
                results.push('banker');
            }
            if (score.player_pair) results.push('player_pair');
            if (score.tie) results.push('tie');
            if (score.banker_pair) results.push('banker_pair');


            if (results.indexOf('player') != -1) {
                this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
                this['playPayImg'].source = 'baccarat_pic_pl1_png';
            }
            if (results.indexOf('banker') != -1) {
                this['playPayImg'].source = 'baccarat_pic_pl2_png';
                this['bankerPayImg'].source = 'baccarat_pic_bk1_png';
            }
            if (results.indexOf('tie') != -1) {
                this['bankerPayImg'].source = 'baccarat_pic_bk2_png';
                this['playPayImg'].source = 'baccarat_pic_pl2_png';
            }
        }

        /**初始化路书*/
        public initRoadMap(): void
        {
            this.bead_roadMap = new game.RoadMap(this.bead_road.width, this.bead_road.height, RoadMap.BeadRoad);
            this.bead_road.addChild(this.bead_roadMap);
            this.big_roadMap = new game.RoadMap(this.big_road.width, this.big_road.height, RoadMap.BigRoad, 55 / 2);
            this.big_road.addChild(this.big_roadMap);
            this.big_eye_roadMap = new game.RoadMap(this.big_eye_road.width, this.big_eye_road.height, RoadMap.BigEyeRoad, 55 / 2);
            this.big_eye_road.addChild(this.big_eye_roadMap);
            this.small_roadMap = new game.RoadMap(this.small_road.width, this.small_road.height, RoadMap.SmallRoad, 55 / 2);
            this.small_road.addChild(this.small_roadMap);
            this.cockroach_roadMap = new game.RoadMap(this.cockroach_road.width, this.cockroach_road.height, RoadMap.CockRoachRoad, 55 / 2);
            this.cockroach_road.addChild(this.cockroach_roadMap);

            this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
            this.roadBgImg.height = this.bead_roadMap.rectH;
        }


        // /** 设置宽高 */
        // public setContenWH(): void
        // {
        //     if (this.roadMap) {
        //         this.roadMap.width = StageUtil.width - 300;
        //     }
        //     this.roadMapWidth();
        //     this.bead_roadMap.setWidth(this.bead_road.width);
        //     this.big_roadMap.setWidth(this.big_road.width, 55 / 2);
        //     this.big_eye_roadMap.setWidth(this.big_eye_road.width, 55 / 2);
        //     this.small_roadMap.setWidth(this.small_road.width, 55 / 2);
        //     this.cockroach_roadMap.setWidth(this.small_road.width, 55 / 2);
        //     this.setXY();
        //     this.drawShp();
        //     this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
        //     this.roadBgImg.height = this.bead_roadMap.rectH;
        // }

        /** 计算路数宽度 */
        public roadMapWidth(): void
        {
            this.roadMap.width = StageUtil.width - 300;
            this.bead_road.width = Math.floor(this.roadMap.width / this.unit / 3) * this.unit;
            this.big_road.width = this.bead_road.width * 2;
            this.big_eye_road.width = this.big_road.width;
            this.small_road.width = this.big_road.width / 2;
            this.cockroach_road.width = this.big_road.width / 2;
            if (Math.floor((this.roadMap.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 1) {
                this.bead_road.width += this.unit;
            }
            else if (Math.floor((this.roadMap.width - this.bead_road.width - this.big_road.width) / this.unit % 3) == 2) {
                this.bead_road.width += this.unit;
                this.big_road.width += this.unit;
                this.big_eye_road.width += this.unit;
                this.small_road.width += (this.unit / 2);
                this.cockroach_road.width += (this.unit / 2);
            }
        }

        /**当移除这个item时执行的清除方法 由子类重写*/
        public onRemove()
        {
            super.onRemove();
            CTweenManagerController.getInstance().endAllCTween();
            CTween.removeTweens(this["redMsgGroup"]);
            CTween.removeTweens(this["greenMsgGroup"]);
        }

    }
}
