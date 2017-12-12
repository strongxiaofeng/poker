module game
{
	/**
	 *
	 * @author 帅波
	 * @date 2016.05.20
	 * @desc 时间工具
	 *
	 */
    export class TimeUtil
    {
        private static date: Date = new Date();
        public constructor()
        {
        }
		/**
		 * 获取当前时间戳
		 */
        public static getTimeStatmp(): number
        {
            return new Date().getTime();
        }

		/**
     * 根据秒数格式化字符串
     * @param second 毫秒
     * @param type 1: 00:00:00   2: yyyy-mm-dd h:m:s    3: 00:00   4: xx天前，xx小时前，xx分钟前
     * @return
     *
     */
        public static getFormatBySecond(second: number, type: number = 1): string
        {
            var str: string = "";
            switch (type)
            {
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
        }

        //1: 00:00:00
        private static getFormatBySecond1(t: number = 0): string
        {
            var hourst: number = Math.floor(t / 3600);
            var hours: string;
            if (hourst == 0)
            {
                hours = "00";
            } else
            {
                if (hourst < 10)
                    hours = "0" + hourst;
                else
                    hours = "" + hourst;
            }
            var minst: number = Math.floor((t - hourst * 3600) / 60);
            var secondt: number = Math.floor((t - hourst * 3600) % 60);
            var mins: string;
            var sens: string;
            if (minst == 0)
            {
                mins = "00";
            } else if (minst < 10)
            {
                mins = "0" + minst;
            } else
            {
                mins = "" + minst;
            }
            if (secondt == 0)
            {
                sens = "00";
            } else if (secondt < 10)
            {
                sens = "0" + secondt;
            } else
            {
                sens = "" + secondt;
            }
            return hours + ":" + mins + ":" + sens;
        }

        //3: 00:00
        private static getFormatBySecond3(t: number = 0): string
        {
            var hourst: number = Math.floor(t / 3600);
            var minst: number = Math.floor((t - hourst * 3600) / 60);
            var secondt: number = Math.floor((t - hourst * 3600) % 60);
            var mins: string;
            var sens: string;
            if (minst == 0)
            {
                mins = "00";
            } else if (minst < 10)
            {
                mins = "0" + minst;
            } else
            {
                mins = "" + minst;
            }
            if (secondt == 0)
            {
                sens = "00";
            } else if (secondt < 10)
            {
                sens = "0" + secondt;
            } else
            {
                sens = "" + secondt;
            }
            return mins + ":" + sens;
        }

        //2:yyyy-mm-dd h:m:s
        private static getFormatBySecond2(time: number): string
        {
            let date = new Date(time);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = this.checkTen(date.getDate()) + ' ';
            let h = this.checkTen(date.getHours()) + ':';
            let m = this.checkTen(date.getMinutes()) + ':';
            let s = this.checkTen(date.getSeconds());
            return Y + M + D + h + m + s;
        }

        private static getFormatBySecond9(time: number): string
        {
            var date: Date = new Date(time);
            var timeStr: string = "";
            var year: number = date.getFullYear();
            timeStr += year;
            timeStr += "/";
            var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
            if (month < 10)
            {
                timeStr += ("0" + month);
            } else
            {
                timeStr += month;
            }
            timeStr += "/";
            var day: number = date.getDate();
            if (day < 10)
            {
                timeStr += ("0" + day);
            } else
            {
                timeStr += day;
            }
            timeStr += " ";
            var hours: number = date.getHours();
            if (hours < 10)
            {
                timeStr += ("0" + hours);
            } else
            {
                timeStr += hours;
            }
            timeStr += ":";
            var minute: number = date.getMinutes();
            if (minute < 10)
            {
                timeStr += ("0" + minute);
            } else
            {
                timeStr += minute;
            }
            timeStr += ":";
            var second: number = date.getSeconds();
            if (second < 10)
            {
                timeStr += ("0" + second);
            } else
            {
                timeStr += second;
            }
            return timeStr;
        }

        //4:xx天前，xx小时前，xx分钟前
        private static getFormatBySecond4(time: number): string
        {
            var t = Math.floor(time / 3600);
            if (t > 0)
            {
                if (t > 24)
                {
                    return Math.floor(t / 24) + "天前";
                }
                else
                {
                    return t + "小时前";
                }
            }
            else
            {
                return Math.floor(time / 60) + "分钟前";
            }
        }

        private static getFormatBySecond5(time: number): string
        {
            //每个时间单位所对应的秒数
            var oneDay: number = 3600 * 24;
            var oneHourst: number = 3600;
            var oneMinst: number = 60;

            var days = Math.floor(time / oneDay);
            var hourst: number = Math.floor(time % oneDay / oneHourst)
            var minst: number = Math.floor((time - hourst * oneHourst) / oneMinst)  //Math.floor(time % oneDay % oneHourst / oneMinst);
            var secondt: number = Math.floor((time - hourst * oneHourst) % oneMinst) //time;

            var dayss: string = "";
            var hourss: string = ""
            var minss: string = "";
            var secss: string = ""
            if (time > 0)
            {
                //天
                if (days == 0)
                {
                    dayss = "";
                    //小时
                    if (hourst == 0)
                    {
                        hourss = "";
                        //分
                        if (minst == 0)
                        {
                            minss = "";
                            if (secondt == 0)
                            {
                                secss = "";
                            } else if (secondt < 10)
                            {
                                secss = "0" + secondt + "秒";
                            } else
                            {
                                secss = "" + secondt + "秒";
                            }

                            return secss;
                        }
                        else
                        {
                            minss = "" + minst + "分";
                            if (secondt == 0)
                            {
                                secss = "";
                            } else if (secondt < 10)
                            {
                                secss = "0" + secondt + "秒";
                            } else
                            {
                                secss = "" + secondt + "秒";
                            }

                        }

                        return minss + secss;
                    }
                    else
                    {
                        hourss = hourst + "小时";
                        if (minst == 0)
                        {
                            minss = "";
                            if (secondt == 0)
                            {
                                secss = "";
                            } else if (secondt < 10)
                            {
                                secss = "0" + secondt + "秒";
                            } else
                            {
                                secss = "" + secondt + "秒";
                            }

                            return secss

                        } else if (minst < 10)
                        {
                            minss = "0" + minst + "分";
                        } else
                        {
                            minss = "" + minst + "分";
                        }

                        return hourss + minss;

                    }
                }
                else
                {
                    dayss = days + "天";
                    if (hourst == 0)
                    {
                        hourss = "";
                    } else
                    {
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
        }

        //6:yyyy-mm-dd
        private static getFormatBySecond6(time: number): string
        {
            let date = new Date(time);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + '';
            return Y + M + D;

        }
        //7:h:m:
        private static getFormatBySecond7(time: number): string
        {
            var date: Date = new Date(time);
            var timeStr: string = "";
            var hours: number = date.getHours();
            if (hours < 10)
            {
                timeStr += ("0" + hours);
            } else
            {
                timeStr += hours;
            }
            timeStr += ":";
            var minute: number = date.getMinutes();
            if (minute < 10)
            {
                timeStr += ("0" + minute);
            } else
            {
                timeStr += minute;
            }
            return timeStr;
        }
        //8 yyyy.mm.dd h:m:
        private static getFormatBySecond8(time: number): string
        {
            var date: Date = new Date(time);
            var timeStr: string = "";
            timeStr = NumberUtil.formatDate(date, 0);
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
            var hours: number = date.getHours();
            if (hours < 10)
            {
                timeStr += ("0" + hours);
            } else
            {
                timeStr += hours;
            }
            timeStr += ":";
            var minute: number = date.getMinutes();
            if (minute < 10)
            {
                timeStr += ("0" + minute);
            } else
            {
                timeStr += minute;
            }
            return timeStr;
        }

        public static getDebugTime():string
        {
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
            let time = "[" + d + t + "]";
            return time;
        }

        private static checkTen(num:number):string
        {
            if(num < 10)
            {
                return "0" + num;
            }
            else
            {
                return "" + num;
            }
        }

        /** 根据当前时间获取今日/本周/本月开始时的时间戳
         * @param time {number} 当前时间戳
         * @param type {number} 1 - 今日 | 2 - 本周 | 3 - 本月
         */
        public static getTimeByNow(time: number, type: number): number {
            let date = new Date(time);
            let timeStamp: number;
            let y, m, d;
            y = date.getFullYear();
            m = date.getMonth();
            d = date.getDate();
            switch (type) {
                case 1:
                    timeStamp = new Date(y, m, d, 0, 0, 0).getTime();
                    break;
                case 2:
                    let days = date.getDay();
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
        }

    }
}
