var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *
     * @author 帅波
     * @date 2016.05.20
     * @desc 时间工具
     *
     */
    var TimeUtil = (function () {
        function TimeUtil() {
        }
        /**
         * 获取当前时间戳
         */
        TimeUtil.getTimeStatmp = function () {
            return new Date().getTime();
        };
        /**
     * 根据秒数格式化字符串
     * @param second 毫秒
     * @param type 1: 00:00:00   2: yyyy-mm-dd h:m:s    3: 00:00   4: xx天前，xx小时前，xx分钟前
     * @return
     *
     */
        TimeUtil.getFormatBySecond = function (second, type) {
            if (type === void 0) { type = 1; }
            var str = "";
            switch (type) {
                case 1:
                    str = TimeUtil.getFormatBySecond1(second);
                    break;
                case 2:
                    str = TimeUtil.getFormatBySecond2(second);
                    break;
                case 3:
                    str = TimeUtil.getFormatBySecond3(second);
                    break;
                case 4:
                    str = TimeUtil.getFormatBySecond4(second);
                    break;
                case 5:
                    str = TimeUtil.getFormatBySecond5(second);
                    break;
                case 6:
                    str = TimeUtil.getFormatBySecond6(second);
                    break;
                case 7:
                    str = TimeUtil.getFormatBySecond7(second);
                    break;
                case 8:
                    str = TimeUtil.getFormatBySecond8(second);
                    break;
                case 9:
                    str = TimeUtil.getFormatBySecond9(second);
                    break;
            }
            return str;
        };
        //1: 00:00:00
        TimeUtil.getFormatBySecond1 = function (t) {
            if (t === void 0) { t = 0; }
            var hourst = Math.floor(t / 3600);
            var hours;
            if (hourst == 0) {
                hours = "00";
            }
            else {
                if (hourst < 10)
                    hours = "0" + hourst;
                else
                    hours = "" + hourst;
            }
            var minst = Math.floor((t - hourst * 3600) / 60);
            var secondt = Math.floor((t - hourst * 3600) % 60);
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return hours + ":" + mins + ":" + sens;
        };
        //3: 00:00
        TimeUtil.getFormatBySecond3 = function (t) {
            if (t === void 0) { t = 0; }
            var hourst = Math.floor(t / 3600);
            var minst = Math.floor((t - hourst * 3600) / 60);
            var secondt = Math.floor((t - hourst * 3600) % 60);
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return mins + ":" + sens;
        };
        //2:yyyy-mm-dd h:m:s
        TimeUtil.getFormatBySecond2 = function (time) {
            var date = new Date(time);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = this.checkTen(date.getDate()) + ' ';
            var h = this.checkTen(date.getHours()) + ':';
            var m = this.checkTen(date.getMinutes()) + ':';
            var s = this.checkTen(date.getSeconds());
            return Y + M + D + h + m + s;
        };
        TimeUtil.getFormatBySecond9 = function (time) {
            var date = new Date(time);
            var timeStr = "";
            var year = date.getFullYear();
            timeStr += year;
            timeStr += "/";
            var month = date.getMonth() + 1; //返回的月份从0-11；
            if (month < 10) {
                timeStr += ("0" + month);
            }
            else {
                timeStr += month;
            }
            timeStr += "/";
            var day = date.getDate();
            if (day < 10) {
                timeStr += ("0" + day);
            }
            else {
                timeStr += day;
            }
            timeStr += " ";
            var hours = date.getHours();
            if (hours < 10) {
                timeStr += ("0" + hours);
            }
            else {
                timeStr += hours;
            }
            timeStr += ":";
            var minute = date.getMinutes();
            if (minute < 10) {
                timeStr += ("0" + minute);
            }
            else {
                timeStr += minute;
            }
            timeStr += ":";
            var second = date.getSeconds();
            if (second < 10) {
                timeStr += ("0" + second);
            }
            else {
                timeStr += second;
            }
            return timeStr;
        };
        //4:xx天前，xx小时前，xx分钟前
        TimeUtil.getFormatBySecond4 = function (time) {
            var t = Math.floor(time / 3600);
            if (t > 0) {
                if (t > 24) {
                    return Math.floor(t / 24) + "天前";
                }
                else {
                    return t + "小时前";
                }
            }
            else {
                return Math.floor(time / 60) + "分钟前";
            }
        };
        TimeUtil.getFormatBySecond5 = function (time) {
            //每个时间单位所对应的秒数
            var oneDay = 3600 * 24;
            var oneHourst = 3600;
            var oneMinst = 60;
            var days = Math.floor(time / oneDay);
            var hourst = Math.floor(time % oneDay / oneHourst);
            var minst = Math.floor((time - hourst * oneHourst) / oneMinst); //Math.floor(time % oneDay % oneHourst / oneMinst);
            var secondt = Math.floor((time - hourst * oneHourst) % oneMinst); //time;
            var dayss = "";
            var hourss = "";
            var minss = "";
            var secss = "";
            if (time > 0) {
                //天
                if (days == 0) {
                    dayss = "";
                    //小时
                    if (hourst == 0) {
                        hourss = "";
                        //分
                        if (minst == 0) {
                            minss = "";
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + "秒";
                            }
                            else {
                                secss = "" + secondt + "秒";
                            }
                            return secss;
                        }
                        else {
                            minss = "" + minst + "分";
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + "秒";
                            }
                            else {
                                secss = "" + secondt + "秒";
                            }
                        }
                        return minss + secss;
                    }
                    else {
                        hourss = hourst + "小时";
                        if (minst == 0) {
                            minss = "";
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + "秒";
                            }
                            else {
                                secss = "" + secondt + "秒";
                            }
                            return secss;
                        }
                        else if (minst < 10) {
                            minss = "0" + minst + "分";
                        }
                        else {
                            minss = "" + minst + "分";
                        }
                        return hourss + minss;
                    }
                }
                else {
                    dayss = days + "天";
                    if (hourst == 0) {
                        hourss = "";
                    }
                    else {
                        if (hourst < 10)
                            hourss = "0" + hourst + "小时";
                        else
                            hourss = "" + hourst + "小时";
                        ;
                    }
                    return dayss + hourss;
                }
            }
            return "";
        };
        //6:yyyy-mm-dd
        TimeUtil.getFormatBySecond6 = function (time) {
            var date = new Date(time);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + '';
            return Y + M + D;
        };
        //7:h:m:
        TimeUtil.getFormatBySecond7 = function (time) {
            var date = new Date(time);
            var timeStr = "";
            var hours = date.getHours();
            if (hours < 10) {
                timeStr += ("0" + hours);
            }
            else {
                timeStr += hours;
            }
            timeStr += ":";
            var minute = date.getMinutes();
            if (minute < 10) {
                timeStr += ("0" + minute);
            }
            else {
                timeStr += minute;
            }
            return timeStr;
        };
        //8 yyyy.mm.dd h:m:
        TimeUtil.getFormatBySecond8 = function (time) {
            var date = new Date(time);
            var timeStr = "";
            timeStr = game.NumberUtil.formatDate(date, 0);
            // var year: number = date.getFullYear();
            // timeStr += year;
            // timeStr += ".";
            // var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
            // if(month < 10) {
            //     timeStr += ("0" + month);
            // } else {
            //     timeStr += month;
            // }
            // timeStr += ".";
            // var day: number = date.getDate();
            // if(day < 10) {
            //     timeStr += ("0" + day);
            // } else {
            //     timeStr += day;
            // }
            timeStr += "  ";
            var hours = date.getHours();
            if (hours < 10) {
                timeStr += ("0" + hours);
            }
            else {
                timeStr += hours;
            }
            timeStr += ":";
            var minute = date.getMinutes();
            if (minute < 10) {
                timeStr += ("0" + minute);
            }
            else {
                timeStr += minute;
            }
            return timeStr;
        };
        TimeUtil.getDebugTime = function () {
            // let severTime = GameModel.getInstance().serverTime;
            // let date = new Date(severTime);
            // let year = date.getFullYear();
            // let month = date.getMonth() + 1;
            // let dates = date.getDate();
            // let hours = date.getHours();
            // let minutes = date.getMinutes();
            // let secounds = date.getSeconds();
            var d = "";
            var t = "";
            // d = this.checkTen(year) + this.checkTen(month) + this.checkTen(dates);
            // t = this.checkTen(hours) + this.checkTen(minutes) + this.checkTen(secounds);
            var time = "[" + d + t + "]";
            return time;
        };
        TimeUtil.checkTen = function (num) {
            if (num < 10) {
                return "0" + num;
            }
            else {
                return "" + num;
            }
        };
        /** 根据当前时间获取今日/本周/本月开始时的时间戳
         * @param time {number} 当前时间戳
         * @param type {number} 1 - 今日 | 2 - 本周 | 3 - 本月
         */
        TimeUtil.getTimeByNow = function (time, type) {
            var date = new Date(time);
            var timeStamp;
            var y, m, d;
            y = date.getFullYear();
            m = date.getMonth();
            d = date.getDate();
            switch (type) {
                case 1:
                    timeStamp = new Date(y, m, d, 0, 0, 0).getTime();
                    break;
                case 2:
                    var days = date.getDay();
                    if (days == 0) {
                        days = 7;
                    }
                    days--;
                    timeStamp = new Date(y, m, d, 0, 0, 0).getTime() - days * 24 * 60 * 60 * 1000;
                    break;
                case 3:
                    timeStamp = new Date(y, m, 1, 0, 0, 0).getTime();
                    break;
            }
            return timeStamp;
        };
        TimeUtil.date = new Date();
        return TimeUtil;
    }());
    game.TimeUtil = TimeUtil;
    __reflect(TimeUtil.prototype, "game.TimeUtil");
})(game || (game = {}));
//# sourceMappingURL=TimeUtil.js.map