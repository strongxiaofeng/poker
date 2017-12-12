var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    /**
     * 路数组件
     * by 郑戎辰
     */
    var RoadMap = (function (_super) {
        __extends(RoadMap, _super);
        /**
         * 绘制路数模块
         * height为x,y坐标
         * width,height为宽高
         * unit为一个格子的宽度和高度（正方形）
         * 小格子为大格子的一半，所以不用传
         */
        function RoadMap(width, height, type, unit, isPC) {
            if (unit === void 0) { unit = 55; }
            if (isPC === void 0) { isPC = false; }
            var _this = _super.call(this) || this;
            /**是否是小格子（宽高只有一半） */
            _this.isMin = false;
            _this.x = 0;
            _this.y = 0;
            _this.unit = unit;
            _this.type = type;
            _this.RoadMapData = new game.RoadMapData();
            // 这三个类型高度为大格子的一半
            if (type == RoadMap.BigEyeRoad || type == RoadMap.CockRoachRoad || type == RoadMap.SmallRoad) {
                _this.isMin = true;
            }
            _this.setVar(width, height, _this.unit);
            _this.touchChildren = false;
            _this.touchEnabled = false;
            _this.isPC = isPC;
            return _this;
        }
        RoadMap.prototype.setVar = function (width, height, unit) {
            if (unit === void 0) { unit = 55; }
            this.widNum = Math.floor(width / unit);
            this.heiNum = Math.floor(height / unit);
            this.rectW = this.widNum * unit;
            this.rectH = this.heiNum * unit;
            this.width = this.rectW;
            this.height = this.rectH;
            this.startthisshp();
            this.setData();
        };
        RoadMap.prototype.setWidth = function (width, unit) {
            if (unit === void 0) { unit = 55; }
            this.removeChildren();
            if (this.shp && this.shp.graphics) {
                this.shp.graphics.clear();
            }
            // this.clearImg();
            this.setVar(width, this.rectH, unit);
        };
        // 开始绘制
        RoadMap.prototype.startthisshp = function () {
            this.shp = new egret.Shape();
            // 设置线条样式
            this.shp.graphics.lineStyle(2, 0xffffff);
            this.mainRect();
            this.bigRect();
            this.shp.graphics.endFill();
            this.shp.alpha = 0.1;
            this.addChild(this.shp);
        };
        /** 绘制边框位置和宽高 */
        RoadMap.prototype.mainRect = function () {
            this.shp.graphics.drawRect(this.x, this.y, this.rectW, this.rectH);
        };
        // 绘制格子边框
        RoadMap.prototype.bigRect = function () {
            // 横线
            for (var i = 0; i < this.heiNum; i++) {
                this.shp.graphics.moveTo(this.x, this.y + i * this.unit);
                this.shp.graphics.lineTo(this.x + this.widNum * this.unit, this.y + i * this.unit);
            }
            // 竖线
            for (var i = 0; i < this.widNum; i++) {
                this.shp.graphics.moveTo(this.x + (i + 1) * this.unit, this.y);
                this.shp.graphics.lineTo(this.x + (i + 1) * this.unit, this.y + this.rectH);
            }
        };
        // 处理数据
        RoadMap.prototype.setData = function (roadData) {
            this.clearImg();
            if (roadData) {
                this.roadData = JSON.parse(JSON.stringify(roadData));
                this.creatImg(roadData);
            }
            else {
                // var roadData = this.RoadMapData.returnData();
                // this.creatImg(roadData);
            }
        };
        // 设置模拟数据
        RoadMap.prototype.setSimulationData = function () {
            this.clearImg();
            var roadData = this.RoadMapData.returnData();
            this.creatImg(roadData);
        };
        // 展示数据
        RoadMap.prototype.creatImg = function (roadData) {
            if (!roadData)
                return;
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
        };
        /** 清除所有图片 */
        RoadMap.prototype.clearImg = function () {
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var g = this.getChildAt(i);
                if (g instanceof eui.Group) {
                    this.removeChild(g);
                }
            }
        };
        // 珠盘路
        RoadMap.prototype.handlingBeadRoad = function (data) {
            if (!data || !data.length)
                return;
            var arr = this.returnNewData(data);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].col < 0)
                    continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.BeadRoad, arr[i].icon, this.unit);
                img.x = this.x + arr[i].col * this.unit;
                img.y = this.y + arr[i].row * this.unit;
                // this.imgGroupArr.push(img);
                this.addChild(img);
            }
        };
        // 大路
        RoadMap.prototype.handlingBigRoad = function (data) {
            if (!data || !data.length)
                return;
            var arr = this.returnNewData(data);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].col < 0)
                    continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.BigRoad, arr[i].icon, this.unit);
                img.x = arr[i].col * this.unit;
                img.y = arr[i].row * this.unit;
                // this.imgGroupArr.push(img);
                this.addChild(img);
            }
        };
        // 大眼路
        RoadMap.prototype.handlingBigEyeRoad = function (data) {
            if (!data || !data.length)
                return;
            var arr = this.returnNewData(data);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].col < 0)
                    continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.BigEyeRoad, arr[i].icon, this.unit, this.isPC ? false : true);
                img.x = this.isPC ? arr[i].col * this.unit : arr[i].col * this.unit / 2;
                img.y = this.isPC ? arr[i].row * this.unit : arr[i].row * this.unit / 2;
                this.addChild(img);
            }
        };
        // 小路
        RoadMap.prototype.handlingSmallRoad = function (data) {
            if (!data || !data.length)
                return;
            var arr = this.returnNewData(data);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].col < 0)
                    continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.SmallRoad, arr[i].icon, this.unit, this.isPC ? false : true);
                img.x = this.isPC ? arr[i].col * this.unit : arr[i].col * this.unit / 2;
                img.y = this.isPC ? arr[i].row * this.unit : arr[i].row * this.unit / 2;
                this.addChild(img);
            }
        };
        // 凹凸路
        RoadMap.prototype.handlingCockRoachRoad = function (data) {
            if (!data || !data.length)
                return;
            var arr = this.returnNewData(data);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].col < 0)
                    continue;
                var img = this.RoadMapData.returnImg(this.RoadMapData.CockRoachRoad, arr[i].icon, this.unit, this.isPC ? false : true);
                img.x = this.isPC ? arr[i].col * this.unit : arr[i].col * this.unit / 2;
                img.y = this.isPC ? arr[i].row * this.unit : arr[i].row * this.unit / 2;
                this.addChild(img);
            }
        };
        // 处理路数数据
        RoadMap.prototype.returnNewData = function (data, isAsk) {
            if (isAsk === void 0) { isAsk = false; }
            if (!data || !data.length)
                return [];
            var arr = [];
            var maxCol = 0;
            for (var i = 0; i < data.length; i++) {
                arr.push(JSON.parse(JSON.stringify(data[i])));
                if (data[i].col > maxCol) {
                    maxCol = data[i].col;
                }
            }
            if (this.type == RoadMap.BeadRoad) {
                if (maxCol > this.widNum - 1) {
                    for (var i = 0; i < arr.length; i++) {
                        arr[i].col -= (maxCol - (this.widNum - 1));
                    }
                }
            }
            else if (this.type == RoadMap.BigRoad) {
                if (maxCol > this.widNum - 2) {
                    for (var i = 0; i < arr.length; i++) {
                        arr[i].col -= (maxCol - (this.widNum - 2));
                    }
                }
            }
            else {
                var newWid = this.isPC ? this.widNum : (this.widNum * 2);
                if (maxCol > (newWid - 2)) {
                    for (var i = 0; i < arr.length; i++) {
                        arr[i].col -= (maxCol - (newWid - 2));
                    }
                }
            }
            return arr;
        };
        /** 图片闪烁动画 */
        RoadMap.prototype.askRoad = function (data) {
            if (data) {
                egret.Tween.get(data)
                    .wait(200).call(function () { data.visible = false; }, this)
                    .wait(200).call(function () { data.visible = true; }, this)
                    .wait(200).call(function () { data.visible = false; }, this)
                    .wait(200).call(function () { data.visible = true; }, this)
                    .wait(200).call(function () {
                    data.visible = false;
                    egret.Tween.removeTweens(data);
                    if (data.parent)
                        data.parent.removeChild(data);
                }, this);
            }
        };
        /** 闲问路 */
        RoadMap.prototype.playerAskWay = function () {
            this.askWay(false);
        };
        /** 庄问路 */
        RoadMap.prototype.bankerAskWay = function () {
            this.askWay(true);
        };
        /** 问路 */
        RoadMap.prototype.askWay = function (isBanker) {
            var str = '';
            if (isBanker) {
                str = 'banker';
            }
            else {
                str = 'player';
            }
            if (this.roadData) {
                var arr = [];
                switch (this.type) {
                    case RoadMap.BeadRoad:
                        if (this.roadData.player_peek.bead_road) {
                            arr = this.returnNewData([this.roadData[str + "_peek"].bead_road], true);
                            if (arr[0].col < 0)
                                break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.BeadRoad, arr[0].icon, this.unit);
                            img.x = this.x + arr[0].col * this.unit;
                            img.y = this.y + arr[0].row * this.unit;
                            var newArr = this.returnNewData(this.roadData.bead_road, true);
                            var isMax = false;
                            for (var i = 0; i < newArr.length; i++) {
                                if (newArr[i].col == this.widNum - 1 && newArr[i].row == this.heiNum - 1) {
                                    isMax = true;
                                }
                            }
                            if (isMax) {
                                var newRoad = this.returnNewData(this.roadData.bead_road);
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
                            arr = this.returnNewData([this.roadData[str + "_peek"].big_road], true);
                            if (arr[0].col < 0)
                                break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.BigRoad, arr[0].icon, this.unit);
                            img.x = this.x + arr[0].col * this.unit;
                            img.y = this.y + arr[0].row * this.unit;
                            var newArr = this.returnNewData(this.roadData.big_road, true);
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
                            arr = this.returnNewData([this.roadData[str + "_peek"].big_eye_road], true);
                            if (arr[0].col < 0)
                                break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.BigEyeRoad, arr[0].icon, this.unit, this.isPC ? false : true);
                            img.x = this.isPC ? arr[0].col * this.unit : arr[0].col * this.unit / 2;
                            img.y = this.isPC ? arr[0].row * this.unit : arr[0].row * this.unit / 2;
                            var newArr = this.returnNewData(this.roadData.big_eye_road, true);
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
                            arr = this.returnNewData([this.roadData[str + "_peek"].small_road], true);
                            if (arr[0].col < 0)
                                break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.SmallRoad, arr[0].icon, this.unit, this.isPC ? false : true);
                            img.x = this.isPC ? arr[0].col * this.unit : arr[0].col * this.unit / 2;
                            img.y = this.isPC ? arr[0].row * this.unit : arr[0].row * this.unit / 2;
                            var newArr = this.returnNewData(this.roadData.small_road, true);
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
                            arr = this.returnNewData([this.roadData[str + "_peek"].cockroach_road], true);
                            if (arr[0].col < 0)
                                break;
                            var img = this.RoadMapData.returnImg(this.RoadMapData.CockRoachRoad, arr[0].icon, this.unit, this.isPC ? false : true);
                            img.x = this.isPC ? arr[0].col * this.unit : arr[0].col * this.unit / 2;
                            img.y = this.isPC ? arr[0].row * this.unit : arr[0].row * this.unit / 2;
                            var newArr = this.returnNewData(this.roadData.cockroach_road, true);
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
        };
        /**问路时是否占满*/
        RoadMap.prototype.askTwoImg = function (newArr, arr, img) {
            var isMax = false;
            for (var i = 0; i < newArr.length; i++) {
                if (newArr[i].col == arr[0].col && newArr[i].row == arr[0].row) {
                    isMax = true;
                }
            }
            if (isMax) {
                var unit = this.isPC ? this.unit : this.unit / 2;
                if (this.type == RoadMap.BigRoad)
                    unit = this.unit;
                img.x = this.x + (arr[0].col + 1) * unit;
            }
        };
        /** 清除所有信息的方法 */
        RoadMap.prototype.dispose = function () {
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
        };
        /**路书类型 珠盘路*/
        RoadMap.BeadRoad = "bead_road";
        /**路书类型 大路*/
        RoadMap.BigRoad = "big_road";
        /**路书类型 大眼路*/
        RoadMap.BigEyeRoad = "big_eye_road";
        /**路书类型 凹凸路(那两个字到底读啥)*/
        RoadMap.CockRoachRoad = "cockroach_road";
        /**路书类型 小路*/
        RoadMap.SmallRoad = "small_road";
        return RoadMap;
    }(eui.Group));
    game.RoadMap = RoadMap;
    __reflect(RoadMap.prototype, "game.RoadMap");
})(game || (game = {}));
//# sourceMappingURL=RoadMap.js.map