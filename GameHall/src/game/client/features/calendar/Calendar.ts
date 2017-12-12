module game {

    /** 公共的日历组件 */
    export class Calendar extends eui.Component {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "calendar/calendarSkin.exml";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.initCurrentTime();
            this.setBtnText();
            this.initListener();
            this.initSetting();
        }

        private static instance: Calendar;
        /** 获取日历组件单例 */
        public static getInstance(): Calendar {
            if (!this.instance) {
                this.instance = new Calendar();
            }
            return this.instance;
        }

        // --------------------------------------- skin component ---------------------------------------

        /** 开始时间btn */
        private btnStart: eui.AButton;
        /** 结束时间btn */
        private btnEnd: eui.AButton;
        /** 前一个月btn */
        private btnPrevious: eui.AButton;
        /** 后一个月btn */
        private btnNext: eui.AButton;
        /** 当前月份label */
        private labelMonth: eui.ALabel;
        /** 日期格子容器
         * 子元素：date_0_0 ~ date_5_6
         */
        private groupDate: eui.Group;
        // /**取消*/
        // private btnCancel: eui.AButton;
        // /**确认*/
        // private btnConfirm: eui.AButton;
        /**日历*/
        private groupMain: eui.AButton;
        // --------------------------------------- API ---------------------------------------

        /** 所选择的开始时间 */
        public startTime: number;

        /** 所选择的结束时间 */
        public endTime: number;

        /** 设置默认开始与结束时间，传进来的时间戳会忽略时分秒，只计入年月日
         * @param startTime {number} 开始时间戳
         * @param endTime {number} 结束时间戳
         */
        public setPeriod(startTime: number, endTime: number): void {
            let start = new Date(startTime);
            this.startTime = new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate()
            ).getTime();
            let end = new Date(endTime);
            this.endTime = new Date(
                end.getFullYear(),
                end.getMonth(),
                end.getDate()
            ).getTime();
            this.setBtnText();
            let month;
            if (this.editType == Calendar.EditEnd) {
                month = end.getMonth();
            } else {
                month = start.getMonth();
            }
            this.shownMonth = month;
        }

        /** 设置位置与大小
         * @param x {number} 日历组件的X，默认为0
         * @param y {number} 日历组件的Y，默认为360
         * @param width {number} 日历组件的宽，手机版默认为舞台的宽度1080，PC版默认为460
         */
        public setPosition(x: number = 0, y: number = 360, width: number = 1080): void {
            this.x = x;
            this.y = y;
            if (!GlobalConfig.isMobile) {
                width = 460;
            }
            this.scaleX = width / 1080;
            this.scaleY = width / 1080;
        }
        public setOPen(img:any):void{
            CTweenManagerController.getInstance().startCTween(5,[this.groupMain,img]);
        }
        public setClose(img:any,callBack:Function,thisObj:any):void{
            CTweenManagerController.getInstance().startCTween(5,[this.groupMain,img],false,callBack,thisObj);
        }
        // --------------------------------------- variable ---------------------------------------

        /** 当前编辑的是开始时间 */
        private static EditStart: string = "EditStart";
        /** 当前编辑的是结束时间 */
        private static EditEnd: string = "EditEnd";

        // /** 临时开始时间 */
        // private startTime: number;
        // /** 临时结束时间 */
        // private endTime: number;

        /** 当前选择编辑的日期类型 */
        private _editType: string;
        /** 当前选择编辑的日期类型 */
        private get editType(): string { return this._editType; }
        private set editType(v: string) {
            this.btnStart.setState = v == Calendar.EditStart ? "down" : "up";
            this.btnEnd.setState = v == Calendar.EditEnd ? "down" : "up";
            if (this._editType === v) {
                return;
            }
            this._editType = v;
            this.shownMonth = this.shownMonth;
        }

        /** 当前显示的年份 */
        private shownYear: number;

        /** 当前显示的月份 */
        private _shownMonth: number;
        /** 当前显示的月份 */
        private get shownMonth(): number { return this._shownMonth; }
        private set shownMonth(v: number) {
            v = (v + 12) % 12;
            // 设置当前显示月
            this._shownMonth = v;
            this.labelMonth.text = this.getStrByNum(v + 1);
            // 设置月份选择按钮状态
            this.btnPrevious.enabled = (this.shownMonth == this.currentMonth);
            this.btnNext.enabled = !(this.shownMonth == this.currentMonth);
            this.btnPrevious.setState = !(this.shownMonth == this.currentMonth) ? "down" : "up";
            this.btnNext.setState = (this.shownMonth == this.currentMonth) ? "down" : "up";
            // 设置年
            this.shownYear = this.currentYear;
            if (this.currentMonth == 0 && this.shownMonth == 11) {
                this.shownYear = this.currentYear - 1;
            }
            // 刷新日历
            this.setCalendar();
            this.setCalendarStyle();
            this.setBtnText();
        }

        /** 当前年份（以服务器时间为准） */
        private currentYear: number;
        /** 当前月份（以服务器时间为准） */
        private currentMonth: number;
        /** 当前天（以服务器时间为准） */
        private currentDay: number;

        // --------------------------------------- init ---------------------------------------

        /** 初始化设置 */
        private initSetting(): void {
            this.editType = Calendar.EditStart;
        }

        /** 设置当前月份 */
        private initCurrentTime(): void {
            let timestamp: number = new Date().getTime();
            try {
                timestamp = GameModel.getInstance().timestamp.snapshot.timestamp;
            } catch (err) {
                DebugUtil.debug("cannot get server timestamp");
            }
            this.currentYear = new Date(timestamp).getFullYear();
            this.currentMonth = new Date(timestamp).getMonth();
            this.currentDay = new Date(timestamp).getDate();
            this.setPeriod(timestamp - 1000 * 60 * 60 * 24 * 30, timestamp);
            this.shownYear = this.currentYear;
            this.shownMonth = this.currentMonth;
        }

        // --------------------------------------- event listener ---------------------------------------

        /** 注册事件 */
        private initListener(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        }

        /** 处理点击事件 */
        private handleTap(evt: egret.TouchEvent): void {
            SoundPlayerNew.playEffect(SoundConst.click);
            switch (evt.target) {
                case this.btnStart:
                    this.editType = Calendar.EditStart;
                    break;
                case this.btnEnd:
                    this.editType = Calendar.EditEnd;
                    break;
                case this.btnPrevious:
                    this.shownMonth = this.shownMonth - 1;
                    break;
                case this.btnNext:
                    this.shownMonth = this.shownMonth + 1;
                    break;
                // case this.btnCancel:
                //     this.setPeriod(this.startTime, this.endTime);
                //     GameController.getInstance().sendNotification(NotifyConst.Notify_SetCalendar);
                //     break;
                // case this.btnConfirm:
                //     this.startTime = this.startTime;
                //     this.endTime = this.endTime;
                //     GameController.getInstance().sendNotification(NotifyConst.Notify_SetCalendar);
                //     break;
                default:
                    if (evt.target.name && (evt.target.name as string).indexOf("date_") > -1) {
                        let time = this.getTimeByName(evt.target.name);
                        if (this.checkValidTime(time)) {
                            let selectDate = new Date(time);
                            let month = selectDate.getMonth();
                            if (this.editType == Calendar.EditEnd) {
                                this.endTime = time;
                            } else {
                                this.startTime = time;
                            }
                            this.setBtnText();
                            this.shownMonth = month;
                        }
                    }
                    break;
            }
        }

        /** 根据点击的target.name获取时间戳，忽略了时分秒
         * @return {number}
         */
        private getTimeByName(name: string): number {
            let numStr = name.split("_");
            let x: number = +numStr[1];
            let y: number = +numStr[2];
            let num = x * 7 + y + 1;
            let nowTime = new Date(this.shownYear, this.shownMonth, 1).getTime();
            let fixNum = new Date(this.shownYear, this.shownMonth, 1).getDay();
            fixNum = fixNum == 0 ? 7 : fixNum;
            let distance = num - (fixNum - 1);
            return nowTime + 1000 * 60 * 60 * 24 * (distance - 1);
        }

        /** 检查某个时间可点击状态
         * @param currentTime {number} 所检查的时间戳
         * @return {boolean} true - 可点击 | false - 不可点击
         */
        private checkValidTime(currentTime: number): boolean {
            let valid = true;
            // 检查是否超过今天
            let today = new Date(this.currentYear, this.currentMonth, this.currentDay).getTime();
            if (currentTime > today) valid = false;
            // 检查是否超过一个月
            if (currentTime <= today - 1000 * 60 * 60 * 24 * 30) valid = false;
            // 检查结束时间是否小于开始时间
            if (this.editType == Calendar.EditEnd) {
                if (currentTime < this.startTime) valid = false;
            }
            // 检查开始时间是否大于结束时间
            if (this.editType == Calendar.EditStart) {
                if (currentTime > this.endTime) valid = false;
            }
            return valid;
        }

        // --------------------------------------- handle ui ---------------------------------------

        /** 设置日历上显示的日期 */
        private setCalendar(): void {
            let currentMonthDay;
            let lastMonthDay;
            currentMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf(this.shownMonth + 1) > -1 ? 31 : 30;
            lastMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf((this.shownMonth + 12 - 1) % 12 + 1) > -1 ? 31 : 30;
            if (this.shownMonth == 1) {
                currentMonthDay = ((this.shownYear % 4 == 0 && this.shownYear % 100 != 0) || this.shownYear % 400 == 0) ? 29 : 28;
            }
            if (this.shownMonth == 2) {
                lastMonthDay = ((this.shownYear % 4 == 0 && this.shownYear % 100 != 0) || this.shownYear % 400 == 0) ? 29 : 28;
            }
            let fixNum = new Date(this.shownYear, this.shownMonth, 1).getDay();
            fixNum = fixNum == 0 ? 7 : fixNum;
            for (let x = 0; x < 6; x++) {
                for (let y = 0; y < 7; y++) {
                    let group: eui.Group = this[`date_${x}_${y}`];
                    let txt: eui.ALabel = <eui.ALabel>group.getChildByName("txt");
                    let date = (x * 7 + y + 1) - (fixNum - 1);
                    if (date <= 0) {
                        date = date + lastMonthDay;
                    } else if (date > currentMonthDay) {
                        date = date - currentMonthDay;
                    }
                    txt.text = date + "";
                }
            }
        }

        /** 设置日历上每个日期的可点击状态 */
        private setCalendarStyle(): void {
            let highLightTime = this.editType == Calendar.EditEnd ? this.endTime : this.startTime;
            for (let x = 0; x < 6; x++) {
                for (let y = 0; y < 7; y++) {
                    let time = this.getTimeByName(`date_${x}_${y}`);
                    let valid = this.checkValidTime(time);
                    this.setDateStyle(x, y, valid);
                    if (time == highLightTime) {
                        this.setDateStyle(x, y, valid, true);
                    }
                }
            }
        }

        /** 设置每个格子的样式 */
        private setDateStyle(x: number, y: number, clickAble: boolean, highLight: boolean = false): void {
            let group: eui.Group = this[`date_${x}_${y}`];
            let txt: eui.ALabel = <eui.ALabel>group.getChildByName("txt");
            let bgd: eui.Image = <eui.Image>group.getChildByName("bgd");
            bgd.visible = highLight;
            txt.textColor = 0xE7B570;
            txt.alpha = clickAble ? 1 : 0.3;
            if (highLight) {
                txt.textColor = 0x000000;
                txt.alpha = 1;
            }
            let label = txt.text || "";
            txt.text = "0";
            txt.text = label;
        }

        /** 设置开始与结束时间选择按钮上文本 */
        private setBtnText(): void {
            let y, m, d;
            let start = new Date(this.startTime);
            y = start.getFullYear();
            m = start.getMonth();
            d = start.getDate();
            this.btnStart.label = `${y}/${this.getStrByNum(m + 1)}/${this.getStrByNum(d)}`;
            let end = new Date(this.endTime);
            y = end.getFullYear();
            m = end.getMonth();
            d = end.getDate();
            this.btnEnd.label = `${y}/${this.getStrByNum(m + 1)}/${this.getStrByNum(d)}`;
        }

        /** 数字转字符串，长度为2 */
        private getStrByNum(num): string {
            return (num / 100).toFixed(2).slice(2);
        }

        // --------------------------------------- dispose ---------------------------------------

        /** 关闭父级界面时调用 */
        public dispose(): void {
            if (this.parent) {
                this.parent.removeChild(this);
                this.visible = true;
                CTweenManagerController.getInstance().endAllCTween();
            }
        }

    }
}