module game {

    /** 轮盘model */
    export class RouletteModel {

        /** 构造函数 */
        public constructor() { }

        /** 单例对象 */
        private static instance: RouletteModel;
        /** 获取单例 */
        public static getInstance(): RouletteModel {
            if (this.instance == null) {
                this.instance = new RouletteModel();
            }
            return this.instance;
        }

        // ------------------------------------ 静态数据 ------------------------------------

        /** 红色数字 */
        public static get redNum(): Array<number> {
            return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        }

        /** 黑色数字 */
        public static get blackNum(): Array<number> {
            return [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        }

        /** 大数字 */
        public static get bigNum(): Array<number> {
            let nums = [];
            for (let i = 19; i <= 36; i++) {
                nums.push(i);
            }
            return nums;
        }

        /** 小数字 */
        public static get smallNum(): Array<number> {
            let nums = [];
            for (let i = 1; i <= 18; i++) {
                nums.push(i);
            }
            return nums;
        }

        /** 单数字 */
        public static get singleNum(): Array<number> {
            let nums = [];
            for (let i = 1; i <= 36; i++) {
                if (i % 2 == 1) nums.push(i);
            }
            return nums;
        }

        /** 双数字 */
        public static get doubleNum(): Array<number> {
            let nums = [];
            for (let i = 1; i <= 36; i++) {
                if (i % 2 == 0) nums.push(i);
            }
            return nums;
        }

        /** 第1/2/3打  */
        public static getDozen(index: number): Array<number> {
            if ([1, 2, 3].indexOf(index) == -1) return [];
            let nums = [];
            for (let i = 12 * (index - 1) + 1; i <= 12 * index; i++) {
                nums.push(i);
            }
            return nums;
        }

        /** 第1/2/3列  */
        public static getColumn(index: number): Array<number> {
            if ([1, 2, 3].indexOf(index) == -1) return [];
            let nums = [];
            index = index % 3;
            for (let i = 1; i <= 36; i++) {
                if (i % 3 == index) nums.push(i);
            }
            return nums;
        }

        /** 法式轮盘数字排列规则 */
        public static get rollNum(): Array<number> {
            return [24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32, 0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16];
        }

        /** 轮盘下角注、轮上孤注、零旁注上角、轮上零旁区域下注对应数字 */
        public static get rollGroupNum(): Array<Array<number>> {
            return [
                [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33],
                [6, 34, 17, 9, 31, 14, 20, 1],
                [25, 2, 21, 4, 19, 28, 7, 29, 18, 22],
                [15, 32, 0, 26, 3, 35, 12]
            ];
        }

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
        public static translateBetType(type: string): string {
            let strArr: Array<string> = type.split("_");
            let typeStr: string = strArr[0];
            let result = "_" + type;
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
        }

        // ------------------------------------ 储存数据 ------------------------------------

        /** 储存路书 */
        private _roadmap: Dictionary;

        /** 所有房间的数据 */
        private _tables: Dictionary;

        // ------------------------------------ 检查数据 ------------------------------------

        /** 检查房间快照数据是否合法 true - 合法 | false - 不合法 */
        public checkRoomInfo(): boolean {
            return true;
        }

        // ------------------------------------ 变更数据 ------------------------------------

        /**通过子topic获取房间topic */
        private getRoomTopic() { }

        /** 收到轮盘base */
        public updateTable() { }

        /** 收到轮盘setting */
        public rouletteSetting() { }

        /** 收到轮盘stage */
        public rouletteStage() { }

        /** 收到轮盘desk */
        public rouletteDesk() { }

        /**获取某个房间的数据*/
        public getTable() { }

        /** 更新路书数据 */
        public updateRoadMap() { }

        /** 自定义下注方案 */
        public updataCustom() { }

        /** 清楚所有数据，主要用于断线重连 */
        public clearData() { }

        public clearCurRoom() { }

        /** 深克隆 */
        public clone(target: any): any {
            if (!!target) {
                return JSON.parse(JSON.stringify(target));
            }
            return target;
        }

        // ------------------------------------ 获取数据 ------------------------------------

        private _sideNum: number;
        /** 旁注数目 */
        public get sideNum(): number {
            return this._sideNum || 0;
        }
        public set sideNum(num: number) {
            if (num >= 0 && num <= 9) {
                this._sideNum = num;
            }
        }

        /** 获取恢复下注的数据 */
        public getRecoveryData() { }

        /** 获取派彩数据 */
        public getPayout() { }

        /** 获取房间名 */
        public getRoomName() { }

        /** 获取牌局号 */
        public getRoundNo() { }

        /** 获取局数 */
        public getRoundNum() { }

        /** 获取下注时间 */
        public getBetTime() { }

        /** 获取开彩历史 */
        public getHistory() { }

        /** 获取比值 */
        public getRatio() { }

        /** 获取热门 */
        public getHot() { }

        /** 获取视频地址 */
        public getVideo() { }

        /** 获取荷官名 */
        public getDearlerName() { }

        /** 获取赔率 */
        public getBetRatio() { }

        /** 获取房间状态 */
        public getStage() { }

        /** 获取房间限额 */
        public getRoomLimit() { }

        /** 获取房间筹码列表 */
        public getChips() { }

        /** 获取开彩result */
        public getResult() { }

    }
}