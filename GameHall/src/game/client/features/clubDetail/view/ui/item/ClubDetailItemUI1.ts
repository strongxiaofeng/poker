module game
{
    export class ClubDetailItemUI1 extends BaseClubDetailItemUI
    {
        /** 主体容器*/
        protected mainGroup: eui.Group;
        protected countdown: countdown;
        protected stageGroup: eui.Group;
        /** _skin 路书容器*/
        protected roadBgImg: eui.Image;// 背景图
        protected roadMap: eui.Group;// 主容器
        protected bead_road: eui.Group;// 珠盘路
        protected bead_roadMap: RoadMap;
        protected big_road: eui.Group;// 大路
        protected big_roadMap: RoadMap;
        protected big_eye_road: eui.Group;// 大眼路
        protected big_eye_roadMap: RoadMap;
        protected small_road: eui.Group;// 小路
        protected small_roadMap: RoadMap;
        protected cockroach_road: eui.Group;// 凹凸路
        protected cockroach_roadMap: RoadMap;
        protected shp: egret.Shape; //画笔
        public unit: number = 55; //路数大格子宽
        public minUnit: number = this.unit / 2; //路数小格子宽
        protected bigGeH: number = 6;   //路数大格子竖向个数
        /** 限额文本框 */
        protected limitAlebel: eui.ALabel;
        /** 房间名 */
        protected roomName: eui.ALabel;
        /** 房间名 */
        protected anchorImg: eui.ALabel;

        public constructor()
        {
            super();
            this.skinName = "resource/skins/game_skins/mobile/clubDetail/itemRender/clubDetailItem.exml";
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

        /**在item启用时 自动执行的初始化方法 */
        public onAdd()
        {
            super.onAdd();
            // this.onAddToStage();
            // this.roadMapWidth();
            // this.initRoadMap();
            // this.setXY();
            // this.drawShp();
            // this.initMouseEvent(true);
            // // this.initData();
        }

        public initItem()
        {
            if (!this.data) return;
            this.roadMapWidth();
            this.initRoadMap();
            this.setXY();
            this.drawShp();
            this.initMouseEvent(true);
            this.initCountdown();
            this.initData();
            this.updataRoadData();
        }

        /** 初始化数据 */
        public initData()
        {
            if (!this.data) return;
            this.setLimit();
            this.getRoomName();
            this.getDealerName();
            this.getlock();
            this.getIsHire();
            this.refreshStage();
        }

        /** 点击事件 */
        protected initMouseEvent(b: boolean): void
        {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        }

        /**  点击响应*/
        protected onTouchEnd(): void
        {
			/**
             * 订阅房间
            */
            CommonLoadingUI.getInstance().start();
            ClubController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_Enter, this.data);
        }

        /** 初始化计时器 */
        public initCountdown()
        {
            this.countdown = new game.countdown(75, true);
            this.stageGroup.addChild(this.countdown);
        }

        /** 设置倒计时 */
        public setCountdown(timeAll: number, overTime: number)
        {
            this.countdown.startTime(timeAll, overTime)
        }

        /* 获取房间名 */
        public getRoomName()
        {
            this.roomName.text = ClubModel.getInstance().getRoomName(this.data);
        }

        /* 获取荷官名字 */
        public getDealerName()
        {
            let dealerName = ClubModel.getInstance().getDealerName(this.data);
            if (dealerName) {
                this["onlyDealerName"].text = `荷官：${dealerName}`;
            }
        }

        /* 获取是否有锁 */
        public getlock()
        {
            let lockBool = ClubModel.getInstance().getlockBool(this.data);
            this["locked"].visible = lockBool;
        }

        /* 获取是否免拥 */
        public getIsHire()
        {
            // 免拥
			let isHire = ClubModel.getInstance().getRoomHire(this.data);
			if (isHire) {
				this["isHire"].source = "mine_pic_free_png";
			}
			else{
				this["isHire"].source = "mine_pic_free2_png";
			}
        }

        /** 刷新房间状态 */
        public refreshStage()
        {

            let stage = ClubModel.getInstance().getRoomStage(this.data);
            switch (stage) {
                // 下注
                case GameState.bet:
                    let betTime = ClubModel.getInstance().getRoomGameTime(this.data).bet_time;
                    let stopBetTime = ClubModel.getInstance().getStopBetTime(this.data);
                    this.setCountdown(betTime, stopBetTime);
                    if (this["shuffleLabel"].visible) {
                        this["shuffleLabel"].visible = false;
                    }
                    break;
                // 发牌
                case GameState.deal_card:
                    this.countdown.startPayOut();
                    break;
                // 派彩
                case GameState.payout:
                    this.countdown.startPayOut();
                    break;
                // 洗牌
                case GameState.shuffle:
                    this["shuffleLabel"].visible = true;
                    this.countdown.startShuffle();
                    break;
            }
        }

        // /** 刷新房间状态的图片 */
        // public refreshStageImg()
        // {
        //     let stage = ClubModel.getInstance().getRoomStage(this.data);
        //     this["timeOutLabel"].visible = false;
        //     this["shuffleImg"].visible = false;
        //     this["betImg"].visible = false;
        //     if (stage == GameState.shuffle) this["shuffleImg"].visible = true;
        // }

        /** 获取限额 */
        public setLimit()
        {
            // 限额文字
            let limitMax = ClubModel.getInstance().getLimitMax(this.data);
            let limitMin = ClubModel.getInstance().getLimitMin(this.data);
            this.limitAlebel.text = `限额：${NumberUtil.getSplitNumStr(limitMin,1)} - ${NumberUtil.getSplitNumStr(limitMax,1)}`;
        }

        /** 计算路数宽度 */
        private roadMapWidth(): void
        {
            this.roadMap.width = StageUtil.width - 310;
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

        /** 设置宽高 */
        public setContenWH(): void
        {
            if (this.roadMap) {
                this.roadMap.width = StageUtil.width - 310;
            }
            this.roadMapWidth();
            this.bead_roadMap.setWidth(this.bead_road.width);
            this.big_roadMap.setWidth(this.big_road.width, 55 / 2);
            this.big_eye_roadMap.setWidth(this.big_eye_road.width, 55 / 2);
            this.small_roadMap.setWidth(this.small_road.width, 55 / 2);
            this.cockroach_roadMap.setWidth(this.small_road.width, 55 / 2);
            this.setXY();
            this.drawShp();
            this.roadBgImg.width = this.bead_roadMap.rectW + this.big_roadMap.rectW;
            this.roadBgImg.height = this.bead_roadMap.rectH;
        }


        /** 绘制白色分割线*/
        public drawShp(): void
        {
            // 白色分割线
            if (this.shp) {
                this.shp.graphics.clear()
            }
            else {

                this.shp = new egret.Shape();
            }
            // 250是距离左边间距，因为是直接添加到舞台，所以xy是item左上角
            this.shp.graphics.lineStyle(1, 0xAAAAAA);
            // 珠盘路右边
            this.shp.graphics.moveTo(250 + this.bead_roadMap.rectW, 95);
            this.shp.graphics.lineTo(250 + this.bead_roadMap.rectW, this.bead_roadMap.rectH + 95);
            // 大路下面
            this.shp.graphics.moveTo(250 + this.bead_roadMap.rectW, this.big_roadMap.rectH + 95);
            this.shp.graphics.lineTo(250 + this.bead_roadMap.rectW + this.big_eye_roadMap.rectW, this.big_roadMap.rectH + 95);
            // 大眼路
            this.shp.graphics.moveTo(250 + this.bead_roadMap.rectW, this.big_roadMap.rectH + 95 + this.big_eye_roadMap.rectH);
            this.shp.graphics.lineTo(250 + this.bead_roadMap.rectW + this.big_eye_roadMap.rectW, this.big_roadMap.rectH + 95 + this.big_eye_roadMap.rectH);
            // 小路下面
            this.shp.graphics.moveTo(250 + this.bead_roadMap.rectW + this.small_roadMap.rectW, this.big_roadMap.rectH + 95 + this.big_eye_roadMap.rectH);
            this.shp.graphics.lineTo(250 + this.bead_roadMap.rectW + this.small_roadMap.rectW, this.big_roadMap.rectH + 95 + this.big_eye_roadMap.rectH + this.small_roadMap.rectH);

            this.shp.graphics.endFill();
            this.addChild(this.shp);
        }

        /** 设置坐标 */
        public setXY(): void
        {
            if (this.big_road && this.bead_roadMap) {
                this.big_road.x = this.bead_road.x + this.bead_roadMap.rectW;
            }
            if (this.big_road && this.big_eye_road) {
                this.big_eye_road.x = this.big_road.x;
                this.big_eye_road.y = this.big_road.y + this.big_roadMap.rectH;
            }
            if (this.big_road && this.small_road) {
                this.small_road.x = this.big_road.x;
                this.small_road.y = this.big_eye_road.y + this.big_eye_roadMap.rectH;
            }
            if (this.big_road && this.small_road) {
                this.cockroach_road.x = this.small_road.x + this.small_roadMap.rectW;
                this.cockroach_road.y = this.small_road.y;
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

        /** 获取路数数据 */
        public updataRoadData()
        {
            let roadData = ClubModel.getInstance().getSouesRoadMap(this.data);
            if (roadData) {
                this.setRoadMapData(roadData)
            }
        }


        /** 设置路数数据 */
        public setRoadMapData(roadData: any)
        {
            if (!roadData) return;
            this.bead_roadMap.setData(roadData);
            this.big_roadMap.setData(roadData);
            this.big_eye_roadMap.setData(roadData);
            this.small_roadMap.setData(roadData);
            this.cockroach_roadMap.setData(roadData);
        }

        /**当移除这个item时执行的清除方法 由子类重写*/
        public dispose()
        {
            this.bead_roadMap = null;
            this.bead_road = null;
            this.big_roadMap = null;
            this.big_road = null;
            this.big_eye_roadMap = null;
            this.big_eye_road = null;
            this.small_roadMap = null;
            this.small_road = null;
            this.cockroach_roadMap = null;
            this.cockroach_road = null;
            this.shp.graphics.clear();
            this.shp = null;
            this.countdown = null ;
            this.initMouseEvent(false);
        }
    }
}