var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /** 轮盘model */
    var RouletteModel = (function () {
        /** 构造函数 */
        function RouletteModel() {
        }
        /** 获取单例 */
        RouletteModel.getInstance = function () {
            if (this.instance == null) {
                this.instance = new RouletteModel();
            }
            return this.instance;
        };
        Object.defineProperty(RouletteModel, "redNum", {
            // ------------------------------------ 静态数据 ------------------------------------
            /** 红色数字 */
            get: function () {
                return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouletteModel, "blackNum", {
            /** 黑色数字 */
            get: function () {
                return [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouletteModel, "bigNum", {
            /** 大数字 */
            get: function () {
                var nums = [];
                for (var i = 19; i <= 36; i++) {
                    nums.push(i);
                }
                return nums;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouletteModel, "smallNum", {
            /** 小数字 */
            get: function () {
                var nums = [];
                for (var i = 1; i <= 18; i++) {
                    nums.push(i);
                }
                return nums;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouletteModel, "singleNum", {
            /** 单数字 */
            get: function () {
                var nums = [];
                for (var i = 1; i <= 36; i++) {
                    if (i % 2 == 1)
                        nums.push(i);
                }
                return nums;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouletteModel, "doubleNum", {
            /** 双数字 */
            get: function () {
                var nums = [];
                for (var i = 1; i <= 36; i++) {
                    if (i % 2 == 0)
                        nums.push(i);
                }
                return nums;
            },
            enumerable: true,
            configurable: true
        });
        /** 第1/2/3打  */
        RouletteModel.getDozen = function (index) {
            if ([1, 2, 3].indexOf(index) == -1)
                return [];
            var nums = [];
            for (var i = 12 * (index - 1) + 1; i <= 12 * index; i++) {
                nums.push(i);
            }
            return nums;
        };
        /** 第1/2/3列  */
        RouletteModel.getColumn = function (index) {
            if ([1, 2, 3].indexOf(index) == -1)
                return [];
            var nums = [];
            index = index % 3;
            for (var i = 1; i <= 36; i++) {
                if (i % 3 == index)
                    nums.push(i);
            }
            return nums;
        };
        Object.defineProperty(RouletteModel, "rollNum", {
            /** 法式轮盘数字排列规则 */
            get: function () {
                return [24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32, 0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouletteModel, "rollGroupNum", {
            /** 轮盘下角注、轮上孤注、零旁注上角、轮上零旁区域下注对应数字 */
            get: function () {
                return [
                    [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33],
                    [6, 34, 17, 9, 31, 14, 20, 1],
                    [25, 2, 21, 4, 19, 28, 7, 29, 18, 22],
                    [15, 32, 0, 26, 3, 35, 12]
                ];
            },
            enumerable: true,
            configurable: true
        });
        // ------------------------------------ 储存数据 ------------------------------------
        // roulette_lbl_red	红
        // roulette_lbl_black	黑
        // roulette_lbl_zero	零
        // global_lbl_single	单
        // global_lbl_double	双
        // global_lbl_big	大
        // global_lbl_small	小
        // roulette_lbl_four_number	四个号码
        // roulette_lbl_dozen_1	第一打
        // roulette_lbl_dozen_2	第二打
        // roulette_lbl_dozen_3	第三打
        // roulette_lbl_arrange_1	第一列
        // roulette_lbl_arrange_2	第二列
        // roulette_lbl_arrange_3	第三列
        // roulette_lbl_direct_bet	直接注
        // roulette_lbl_separate_bet	分注
        // roulette_lbl_line_ibet	线注
        // roulette_lbl_street_bet	街注
        // roulette_lbl_three_number	三数
        // roulette_lbl_horn_bet	角注
        /** 根据key获取翻译下注类型 */
        RouletteModel.translateBetType = function (type) {
            var strArr = type.split("_");
            var typeStr = strArr[0];
            var result = "_" + type;
            switch (typeStr) {
                case "red":
                case "black":
                    result = "roulette_lbl_" + typeStr;
                    break;
                case "big":
                case "small":
                case "single":
                case "double":
                    result = "global_lbl_" + typeStr;
                    break;
                case "four":
                    result = "roulette_lbl_four_number";
                    break;
                case "dozen":
                    result = "roulette_lbl_dozen_" + strArr[1];
                    break;
                case "column":
                    result = "roulette_lbl_arrange_" + strArr[1];
                    break;
                case "corner":
                    break;
                case "direct":
                    break;
                case "line":
                    break;
                case "split":
                    break;
                case "street":
                    break;
                case "three":
                    break;
            }
            return result;
        };
        // ------------------------------------ 检查数据 ------------------------------------
        /** 检查房间快照数据是否合法 true - 合法 | false - 不合法 */
        RouletteModel.prototype.checkRoomInfo = function () {
            return true;
        };
        // ------------------------------------ 变更数据 ------------------------------------
        /**通过子topic获取房间topic */
        RouletteModel.prototype.getRoomTopic = function () { };
        /** 收到轮盘base */
        RouletteModel.prototype.updateTable = function () { };
        /** 收到轮盘setting */
        RouletteModel.prototype.rouletteSetting = function () { };
        /** 收到轮盘stage */
        RouletteModel.prototype.rouletteStage = function () { };
        /** 收到轮盘desk */
        RouletteModel.prototype.rouletteDesk = function () { };
        /**获取某个房间的数据*/
        RouletteModel.prototype.getTable = function () { };
        /** 更新路书数据 */
        RouletteModel.prototype.updateRoadMap = function () { };
        /** 自定义下注方案 */
        RouletteModel.prototype.updataCustom = function () { };
        /** 清楚所有数据，主要用于断线重连 */
        RouletteModel.prototype.clearData = function () { };
        RouletteModel.prototype.clearCurRoom = function () { };
        /** 深克隆 */
        RouletteModel.prototype.clone = function (target) {
            if (!!target) {
                return JSON.parse(JSON.stringify(target));
            }
            return target;
        };
        Object.defineProperty(RouletteModel.prototype, "sideNum", {
            /** 旁注数目 */
            get: function () {
                return this._sideNum || 0;
            },
            set: function (num) {
                if (num >= 0 && num <= 9) {
                    this._sideNum = num;
                }
            },
            enumerable: true,
            configurable: true
        });
        /** 获取恢复下注的数据 */
        RouletteModel.prototype.getRecoveryData = function () { };
        /** 获取派彩数据 */
        RouletteModel.prototype.getPayout = function () { };
        /** 获取房间名 */
        RouletteModel.prototype.getRoomName = function () { };
        /** 获取牌局号 */
        RouletteModel.prototype.getRoundNo = function () { };
        /** 获取局数 */
        RouletteModel.prototype.getRoundNum = function () { };
        /** 获取下注时间 */
        RouletteModel.prototype.getBetTime = function () { };
        /** 获取开彩历史 */
        RouletteModel.prototype.getHistory = function () { };
        /** 获取比值 */
        RouletteModel.prototype.getRatio = function () { };
        /** 获取热门 */
        RouletteModel.prototype.getHot = function () { };
        /** 获取视频地址 */
        RouletteModel.prototype.getVideo = function () { };
        /** 获取荷官名 */
        RouletteModel.prototype.getDearlerName = function () { };
        /** 获取赔率 */
        RouletteModel.prototype.getBetRatio = function () { };
        /** 获取房间状态 */
        RouletteModel.prototype.getStage = function () { };
        /** 获取房间限额 */
        RouletteModel.prototype.getRoomLimit = function () { };
        /** 获取房间筹码列表 */
        RouletteModel.prototype.getChips = function () { };
        /** 获取开彩result */
        RouletteModel.prototype.getResult = function () { };
        return RouletteModel;
    }());
    game.RouletteModel = RouletteModel;
    __reflect(RouletteModel.prototype, "game.RouletteModel");
})(game || (game = {}));
//# sourceMappingURL=RouletteModel.js.map