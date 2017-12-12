module game
{
	/**
     * 路数组件
     * by 郑戎辰
     */
    export class RoadMap extends eui.Group
    {
        /** 横向的大格子个数 */
        private widNum: number;
        /** 纵向的大格子个数 */
        private heiNum: number;
        // /** 横向的小格子个数 */
        // private minWidNum: number;
        // /** 纵向的小格子个数 */
        // private minHeiNum: number;
        /** 实际绘制宽度 */
        public rectW: number;
        /** 实际绘制高度 */
        public rectH: number;
        /** 画笔 */
        public shp: egret.Shape;
        /** 基础单位（一个格子的大小） */
        private unit: number;
        /** 处理数据和图片资源 */
        private RoadMapData: RoadMapData;
        /** 路数类型 */
        private type: string;

        /**路书类型 珠盘路*/
        public static BeadRoad: string = "bead_road";
        /**路书类型 大路*/
        public static BigRoad: string = "big_road";
        /**路书类型 大眼路*/
        public static BigEyeRoad: string = "big_eye_road";
        /**路书类型 凹凸路(那两个字到底读啥)*/
        public static CockRoachRoad: string = "cockroach_road";
        /**路书类型 小路*/
        public static SmallRoad: string = "small_road";
        /**是否是小格子（宽高只有一半） */
        public isMin: boolean = false;
        /**是否是PC*/
        protected isPC: boolean;
		/**
		 * 绘制路数模块
		 * height为x,y坐标
		 * width,height为宽高
		 * unit为一个格子的宽度和高度（正方形）
		 * 小格子为大格子的一半，所以不用传
		 */
        public constructor(width: number, height: number, type: string, unit: number = 55, isPC: boolean = false)
        {
            super();
            this.x = 0;
            this.y = 0;
            this.unit = unit;
            this.type = type;
            this.RoadMapData = new RoadMapData();
            // 这三个类型高度为大格子的一半
            if (type == RoadMap.BigEyeRoad || type == RoadMap.CockRoachRoad || type == RoadMap.SmallRoad) {
                this.isMin = true;
            }
            this.setVar(width, height, this.unit);
            this.touchChildren = false;
            this.touchEnabled = false;
            this.isPC = isPC;
        }

        public setVar(width: number, height: number, unit: number = 55): void
        {
            this.widNum = Math.floor(width / unit);
            this.heiNum = Math.floor(height / unit);
            this.rectW = this.widNum * unit;
            this.rectH = this.heiNum * unit;
            this.width = this.rectW;
            this.height = this.rectH;
            this.startthisshp();
            this.setData();
        }

        public setWidth(width: number, unit: number = 55): void
        {
            this.removeChildren();
            if (this.shp && this.shp.graphics) {
                this.shp.graphics.clear();
            }
            // this.clearImg();
            this.setVar(width, this.rectH, unit);
        }


        // 开始绘制
        private startthisshp(): void
        {
            this.shp = new egret.Shape();
            // 设置线条样式
            this.shp.graphics.lineStyle(2, 0xffffff);
            this.mainRect();
            this.bigRect();
            this.shp.graphics.endFill();
            this.shp.alpha = 0.1;
            this.addChild(this.shp);
        }

        /** 绘制边框位置和宽高 */
        private mainRect()
        {
            this.shp.graphics.drawRect(this.x, this.y, this.rectW, this.rectH);
        }

        // 绘制格子边框
        private bigRect()
        {
            // 横线
            for (let i = 0; i < this.heiNum; i++) {
                this.shp.graphics.moveTo(this.x, this.y + i * this.unit);
                this.shp.graphics.lineTo(this.x + this.widNum * this.unit, this.y + i * this.unit);
            }
            // 竖线
            for (let i = 0; i < this.widNum; i++) {
                this.shp.graphics.moveTo(this.x + (i + 1) * this.unit, this.y);
                this.shp.graphics.lineTo(this.x + (i + 1) * this.unit, this.y + this.rectH);
            }
        }

        private roadData: any;
        // 处理数据
        public setData(roadData?: any)
        {
            this.clearImg();
            if (roadData) {
                this.roadData = JSON.parse(JSON.stringify(roadData));
                this.creatImg(roadData);
            }
            //模拟数据
            else {
                // var roadData = this.RoadMapData.returnData();
                // this.creatImg(roadData);
            }
        }

        // 设置模拟数据
        public setSimulationData()
        {
            this.clearImg();
            var roadData = this.RoadMapData.returnData();
            this.creatImg(roadData);
        }

        // 展示数据
        private creatImg(roadData)
        {
            if (!roadData) return;
            switch (this.type) {
                case RoadMap.BeadRoad:
                    this.handlingBeadRoad(roadData.bead_road);
                    break;
                case RoadMap.BigRoad:
                    this.handlingBigRoad(roadData.big_road);
                    break;
                case RoadMap.BigEyeRoad:
                    this.handlingBigEyeRoad(roadData.big_eye_road);
                    break;
                case RoadMap.SmallRoad:
                    this.handlingSmallRoad(roadData.small_road);
                    break;
                case RoadMap.CockRoachRoad:
                    this.handlingCockRoachRoad(roadData.cockroach_road);
                    break;
            }
        }

        /** 清除所有图片 */
        public clearImg(): void
        {
            for (let i = this.numChildren - 1; i >= 0; i--) {
                let g = this.getChildAt(i);
                if (g instanceof eui.Group) {
                    this.removeChild(g);
                }
            }
        }

        // 珠盘路
        private handlingBeadRoad(data: Array<any>)
        {
            if (!data || !data.length) return;
            let arr = this.returnNewData(data);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].col < 0) continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.BeadRoad, arr[i].icon, this.unit);
                img.x = this.x + arr[i].col * this.unit;
                img.y = this.y + arr[i].row * this.unit;
                // this.imgGroupArr.push(img);
                this.addChild(img);
            }
        }

        // 大路
        private handlingBigRoad(data: Array<any>)
        {
            if (!data || !data.length) return;
            let arr = this.returnNewData(data);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].col < 0) continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.BigRoad, arr[i].icon, this.unit);
                img.x = arr[i].col * this.unit;
                img.y = arr[i].row * this.unit;
                // this.imgGroupArr.push(img);
                this.addChild(img);
            }
        }

        // 大眼路
        private handlingBigEyeRoad(data: Array<any>)
        {
            if (!data || !data.length) return;
            let arr = this.returnNewData(data);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].col < 0) continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.BigEyeRoad, arr[i].icon, this.unit, this.isPC ? false : true);
                img.x = this.isPC ? arr[i].col * this.unit : arr[i].col * this.unit / 2;
                img.y = this.isPC ? arr[i].row * this.unit : arr[i].row * this.unit / 2;
                this.addChild(img);
            }
        }

        // 小路
        private handlingSmallRoad(data: Array<any>)
        {
            if (!data || !data.length) return;
            let arr = this.returnNewData(data);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].col < 0) continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.SmallRoad, arr[i].icon, this.unit, this.isPC ? false : true);
                img.x = this.isPC ? arr[i].col * this.unit : arr[i].col * this.unit / 2;
                img.y = this.isPC ? arr[i].row * this.unit : arr[i].row * this.unit / 2;
                this.addChild(img);
            }
        }

        // 凹凸路
        private handlingCockRoachRoad(data: Array<any>)
        {
            if (!data || !data.length) return;
            let arr = this.returnNewData(data);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].col < 0) continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.CockRoachRoad, arr[i].icon, this.unit, this.isPC ? false : true);
                img.x = this.isPC ? arr[i].col * this.unit : arr[i].col * this.unit / 2;
                img.y = this.isPC ? arr[i].row * this.unit : arr[i].row * this.unit / 2;
                this.addChild(img);
            }
        }

        // 处理路数数据
        private returnNewData(data: Array<any>, isAsk: boolean = false): Array<any>
        {
            if (!data || !data.length) return [];
            let arr: Array<any> = [];
            let maxCol: number = 0;
            for (let i = 0; i < data.length; i++) {
                arr.push(JSON.parse(JSON.stringify(data[i])))
                if (data[i].col > maxCol) {
                    maxCol = data[i].col;
                }
            }
            if (this.type == RoadMap.BeadRoad) {
                if (maxCol > this.widNum - 1) {
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].col -= (maxCol - (this.widNum - 1))
                    }
                }

            }
            else if (this.type == RoadMap.BigRoad) {
                if (maxCol > this.widNum - 2) {
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].col -= (maxCol - (this.widNum - 2))
                    }
                }
            }
            else {
                let newWid = this.isPC ? this.widNum : (this.widNum * 2);
                if (maxCol > (newWid - 2)) {
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].col -= (maxCol - (newWid - 2))
                    }
                }
            }
            return arr;
        }

        /** 图片闪烁动画 */
        private askRoad(data): void
        {
            if (data) {
                egret.Tween.get(data)
                    .wait(200).call(() => { data.visible = false; }, this)
                    .wait(200).call(() => { data.visible = true; }, this)
                    .wait(200).call(() => { data.visible = false; }, this)
                    .wait(200).call(() => { data.visible = true; }, this)
                    .wait(200).call(() =>
                    {
                        data.visible = false;
                        egret.Tween.removeTweens(data);
                        if (data.parent) data.parent.removeChild(data);
                    }, this)
            }
        }

        /** 闲问路 */
        public playerAskWay()
        {
            this.askWay(false)
        }

        /** 庄问路 */
        public bankerAskWay()
        {
            this.askWay(true)
        }

        /** 问路 */
        private askWay(isBanker: boolean)
        {
            let str = '';

            if (isBanker) {
                str = 'banker'
            }
            else {
                str = 'player'
            }

            if (this.roadData) {
                let arr = [];
                switch (this.type) {
                    case RoadMap.BeadRoad:
                        if (this.roadData.player_peek.bead_road) {
                            arr = this.returnNewData([this.roadData[`${str}_peek`].bead_road], true);
                            if (arr[0].col < 0) break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.BeadRoad, arr[0].icon, this.unit);
                            img.x = this.x + arr[0].col * this.unit;
                            img.y = this.y + arr[0].row * this.unit;

                            let newArr = this.returnNewData(this.roadData.bead_road, true);
                            let isMax: boolean = false;
                            for (let i = 0; i < newArr.length; i++) {
                                if (newArr[i].col == this.widNum - 1 && newArr[i].row == this.heiNum - 1) {
                                    isMax = true;
                                }
                            }
                            if (isMax) {
                                let newRoad = this.returnNewData(this.roadData.bead_road);
                                newRoad.push({ icon: [], row: 0, col: arr[0].col + 1, round_id: "" });
                                this.clearImg();
                                this.handlingBeadRoad(this.returnNewData(newRoad));
                            }
                            this.addChild(img);
                            this.askRoad(img);
                        }
                        else {
                            arr = null;
                        }
                        break;
                    case RoadMap.BigRoad:
                        if (this.roadData.player_peek.big_road) {
                            arr = this.returnNewData([this.roadData[`${str}_peek`].big_road], true);
                            if (arr[0].col < 0) break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.BigRoad, arr[0].icon, this.unit);
                            img.x = this.x + arr[0].col * this.unit;
                            img.y = this.y + arr[0].row * this.unit;

                            let newArr = this.returnNewData(this.roadData.big_road, true);
                            this.askTwoImg(newArr, arr, img);

                            this.addChild(img);
                            this.askRoad(img);
                        }
                        else {
                            arr = null;
                        }
                        break;
                    case RoadMap.BigEyeRoad:
                        if (this.roadData.player_peek.big_eye_road) {
                            arr = this.returnNewData([this.roadData[`${str}_peek`].big_eye_road], true);
                            if (arr[0].col < 0) break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.BigEyeRoad, arr[0].icon, this.unit, this.isPC ? false : true);
                            img.x = this.isPC ? arr[0].col * this.unit : arr[0].col * this.unit / 2;
                            img.y = this.isPC ? arr[0].row * this.unit : arr[0].row * this.unit / 2;

                            let newArr = this.returnNewData(this.roadData.big_eye_road, true);
                            this.askTwoImg(newArr, arr, img);

                            this.addChild(img);
                            this.askRoad(img);
                        }
                        else {
                            arr = null;
                        }
                        break;
                    case RoadMap.SmallRoad:
                        if (this.roadData.player_peek.small_road) {
                            arr = this.returnNewData([this.roadData[`${str}_peek`].small_road], true);
                            if (arr[0].col < 0) break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.SmallRoad, arr[0].icon, this.unit, this.isPC ? false : true);
                            img.x = this.isPC ? arr[0].col * this.unit : arr[0].col * this.unit / 2;
                            img.y = this.isPC ? arr[0].row * this.unit : arr[0].row * this.unit / 2;

                            let newArr = this.returnNewData(this.roadData.small_road, true);
                            this.askTwoImg(newArr, arr, img);

                            this.addChild(img);
                            this.askRoad(img);
                        }
                        else {
                            arr = null;
                        }
                        break;
                    case RoadMap.CockRoachRoad:
                        if (this.roadData.player_peek.cockroach_road) {
                            arr = this.returnNewData([this.roadData[`${str}_peek`].cockroach_road], true);
                            if (arr[0].col < 0) break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.CockRoachRoad, arr[0].icon, this.unit, this.isPC ? false : true);
                            img.x = this.isPC ? arr[0].col * this.unit : arr[0].col * this.unit / 2;
                            img.y = this.isPC ? arr[0].row * this.unit : arr[0].row * this.unit / 2;
                            let newArr = this.returnNewData(this.roadData.cockroach_road, true);
                            this.askTwoImg(newArr, arr, img);
                            this.addChild(img);
                            this.askRoad(img);
                        }
                        else {
                            arr = null;
                        }
                        break;
                }
            }
        }
        /**问路时是否占满*/
        public askTwoImg(newArr: Array<any>, arr: Array<any>, img: eui.Group): void
        {
            let isMax: boolean = false;
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i].col == arr[0].col && newArr[i].row == arr[0].row) {
                    isMax = true;
                }
            }
            if (isMax) {
                let unit = this.isPC ? this.unit : this.unit / 2;
                if (this.type == RoadMap.BigRoad) unit = this.unit;
                img.x = this.x + (arr[0].col + 1) * unit;
            }
        }
        /** 清除所有信息的方法 */
        public dispose()
        {
            this.clearImg();
            this.RoadMapData = null;
            if (this.shp) {
                this.shp.graphics.clear();
            }
            this.roadData = null;
            this.removeChildren();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}
