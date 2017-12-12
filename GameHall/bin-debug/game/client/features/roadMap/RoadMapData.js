var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 路数数据模块
     * by 郑戎辰
     */
    var RoadMapData = (function () {
        /**
         * 处理路数的数据
         */
        function RoadMapData() {
            /**路书类型 珠盘路*/
            this.BeadRoad = "bead_road";
            /**路书类型 大眼路*/
            this.BigEyeRoad = "big_eye_road";
            /**路书类型 大路*/
            this.BigRoad = "big_road";
            /**路书类型 凹凸路(那两个字到底读啥)*/
            this.CockRoachRoad = "cockroach_road";
            /**路书类型 小路*/
            this.SmallRoad = "small_road";
            /**路书的图片资源与路书数据对应 的配置文件*/
            this.RoadIcons = {
                "BaccRoad": {
                    "bead_road": {
                        "baccarat_pic_bead.P--_png": ["blue"],
                        "baccarat_pic_bead.P-P_png": ["blue", "blue_dot"],
                        "baccarat_pic_bead.PB-_png": ["blue", "red_dot"],
                        "baccarat_pic_bead.PBP_png": ["blue", "red_dot", "blue_dot"],
                        "baccarat_pic_bead.T--_png": ["green"],
                        "baccarat_pic_bead.T-P_png": ["green", "blue_dot"],
                        "baccarat_pic_bead.TB-_png": ["green", "red_dot"],
                        "baccarat_pic_bead.TBP_png": ["green", "blue_dot", "red_dot"],
                        "baccarat_pic_bead.B--_png": ["red"],
                        "baccarat_pic_bead.B-P_png": ["red", "blue_dot"],
                        "baccarat_pic_bead.BB-_png": ["red", "red_dot"],
                        "baccarat_pic_bead.BBP_png": ["red", "red_dot", "blue_dot"]
                    },
                    "big_eye_road": {
                        "share_pic_bigeye.B_png": ["blue"],
                        "share_pic_bigeye.R_png": ["red"]
                    },
                    "big_road": {
                        "share_pic_big.T_png": ["slash"],
                        "share_pic_big.P_png": ["blue"],
                        "share_pic_big.PB_png": ["red_dot", "blue"],
                        "share_pic_big.PBP_png": ["red_dot", "blue", "blue_dot"],
                        "share_pic_big.PBPT_png": ["red_dot", "blue", "blue_dot", "slash"],
                        "share_pic_big.PBT_png": ["red_dot", "blue", "slash"],
                        "share_pic_big.PP_png": ["blue_dot", "blue"],
                        "share_pic_big.PPT_png": ["blue_dot", "blue", "slash"],
                        "share_pic_big.PT_png": ["slash", "blue"],
                        "share_pic_big.B_png": ["red"],
                        "share_pic_big.BB_png": ["red_dot", "red"],
                        "share_pic_big.BBP_png": ["red_dot", "red", "blue_dot"],
                        "share_pic_big.BBPT_png": ["red_dot", "red", "blue_dot", "slash"],
                        "share_pic_big.BBT_png": ["red_dot", "red", "slash"],
                        "share_pic_big.BP_png": ["blue_dot", "red"],
                        "share_pic_big.BPT_png": ["blue_dot", "red", "slash"],
                        "share_pic_big.BT_png": ["slash", "red"],
                    },
                    "cockroach_road": {
                        "share_pic_cockroach.B_png": ["blue"],
                        "share_pic_cockroach.R_png": ["red"],
                    },
                    "small_road": {
                        "share_pic_small.B_png": ["blue"],
                        "share_pic_small.R_png": ["red"],
                    }
                }
            };
            this.roadData = {
                "bead_road": [
                    {
                        "icon": [
                            "red",
                            "red_dot"
                        ],
                        "row": 0,
                        "col": 0,
                        "round_id": "B1-170526100848"
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 1,
                        "col": 0,
                        "round_id": "B1-170526100853"
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 2,
                        "col": 0,
                        "round_id": "B1-170526100858"
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 3,
                        "col": 0,
                        "round_id": "B1-170526100903"
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 4,
                        "col": 0,
                        "round_id": "B1-170526100908"
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 5,
                        "col": 0,
                        "round_id": "B1-170526100913"
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 1,
                        "round_id": "B1-170526100918"
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 1,
                        "round_id": "B1-170526100923"
                    },
                    {
                        "icon": [
                            "green",
                            "blue_dot"
                        ],
                        "row": 2,
                        "col": 1,
                        "round_id": "B1-170526100928"
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 3,
                        "col": 1,
                        "round_id": "B1-170526100933"
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 4,
                        "col": 1,
                        "round_id": "B1-170526100938"
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 5,
                        "col": 1,
                        "round_id": "B1-170526100943"
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 2,
                        "round_id": "B1-170526100948"
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 2,
                        "round_id": "B1-170526100953"
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 2,
                        "col": 2,
                        "round_id": "B1-170526100958"
                    },
                    {
                        "icon": [
                            "blue",
                            "red_dot"
                        ],
                        "row": 3,
                        "col": 2,
                        "round_id": "B1-170526101003"
                    }
                ],
                "big_road": [
                    {
                        "icon": [
                            "red",
                            "red_dot"
                        ],
                        "row": 0,
                        "col": 0
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 1,
                        "col": 0
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 2,
                        "col": 0
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 1
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 1
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 2,
                        "col": 1
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 2
                    },
                    {
                        "icon": [
                            "blue",
                            "slash"
                        ],
                        "row": 0,
                        "col": 3
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 3
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 4
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 1,
                        "col": 4
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 2,
                        "col": 4
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 5
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 5
                    },
                    {
                        "icon": [
                            "blue",
                            "red_dot"
                        ],
                        "row": 2,
                        "col": 5
                    }
                ],
                "big_eye_road": [
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 0
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 1,
                        "col": 0
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 2,
                        "col": 0
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 1
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 1
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 2,
                        "col": 1
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 2
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 3
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 3
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 4
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 1,
                        "col": 4
                    }
                ],
                "small_road": [
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 0
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 1
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 2
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 2
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 3
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 4
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 5
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 6
                    }
                ],
                "cockroach_road": [
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 0
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 1
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 2
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 1,
                        "col": 2
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 2,
                        "col": 2
                    },
                    {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 3
                    },
                    {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 4
                    }
                ],
                "banker_peek": {
                    "bead_road": {
                        "icon": [
                            "red"
                        ],
                        "row": 4,
                        "col": 2
                    },
                    "big_road": {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 6
                    },
                    "big_eye_road": {
                        "icon": [
                            "red"
                        ],
                        "row": 2,
                        "col": 4
                    },
                    "small_road": {
                        "icon": [
                            "blue"
                        ],
                        "row": 1,
                        "col": 6
                    },
                    "cockroach_road": {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 5
                    }
                },
                "player_peek": {
                    "bead_road": {
                        "icon": [
                            "blue"
                        ],
                        "row": 4,
                        "col": 2
                    },
                    "big_road": {
                        "icon": [
                            "blue"
                        ],
                        "row": 3,
                        "col": 5
                    },
                    "big_eye_road": {
                        "icon": [
                            "blue"
                        ],
                        "row": 0,
                        "col": 5
                    },
                    "small_road": {
                        "icon": [
                            "red"
                        ],
                        "row": 0,
                        "col": 7
                    },
                    "cockroach_road": {
                        "icon": [
                            "red"
                        ],
                        "row": 1,
                        "col": 4
                    }
                }
            };
        }
        RoadMapData.prototype.returnData = function () {
            return this.roadData;
        };
        /**
         * 返回路数的图片资源
         */
        RoadMapData.prototype.returnImg = function (type, iconArr, unit, isMin) {
            if (unit === void 0) { unit = 55; }
            var dataGroup = new eui.Group();
            var img1 = new eui.Image();
            if (isMin) {
                img1.top = 1;
                img1.left = 1;
                img1.width = unit / 2 - 2;
                img1.height = unit / 2 - 2;
            }
            else {
                img1.top = 2;
                img1.left = 2;
                img1.width = unit - 4;
                img1.height = unit - 4;
            }
            var color = this.getSourceByIcon(type, iconArr);
            img1.source = color;
            dataGroup.addChild(img1);
            return dataGroup;
        };
        /**
         * 根据icons数据 获得对应的图片资源
         * */
        RoadMapData.prototype.getSourceByIcon = function (gameType, iconArr) {
            //去掉iconArr中的重复数据
            var arr = [];
            for (var i = 0; i < iconArr.length; i++) {
                if (arr.indexOf(iconArr[i]) == -1) {
                    arr.push(iconArr[i]);
                }
            }
            var obj = this.RoadIcons['BaccRoad'][gameType];
            for (var name in obj) {
                if (this.compareArray(obj[name], arr)) {
                    return name;
                }
            }
            return "";
        };
        /**
         * 比较两个数组的元素是否一样  比如["a","b"] 和["b","a"] 是一样
         * */
        RoadMapData.prototype.compareArray = function (arr1, arr2) {
            if (arr1.length != arr2.length) {
                return false;
            }
            var indexs = [];
            for (var i = 0; i < arr1.length; i++) {
                var index = arr2.indexOf(arr1[i]);
                if (index == -1) {
                    return false;
                }
                else if (indexs.indexOf(index) != -1) {
                    return false;
                }
                else {
                    indexs.push(index);
                }
            }
            return true;
        };
        return RoadMapData;
    }());
    game.RoadMapData = RoadMapData;
    __reflect(RoadMapData.prototype, "game.RoadMapData");
})(game || (game = {}));
//# sourceMappingURL=RoadMapData.js.map