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
    /** 公共的日历组件 */
    var Calendar = (function (_super) {
        __extends(Calendar, _super);
        function Calendar() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "calendar/calendarSkin.exml";
            return _this;
        }
        Calendar.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initCurrentTime();
            this.setBtnText();
            this.initListener();
            this.initSetting();
        };
        /** 获取日历组件单例 */
        Calendar.getInstance = function () {
            if (!this.instance) {
                this.instance = new Calendar();
            }
            return this.instance;
        };
        /** 设置默认开始与结束时间，传进来的时间戳会忽略时分秒，只计入年月日
         * @param startTime {number} 开始时间戳
         * @param endTime {number} 结束时间戳
         */
        Calendar.prototype.setPeriod = function (startTime, endTime) {
            var start = new Date(startTime);
            this.startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
            var end = new Date(endTime);
            this.endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
            this.setBtnText();
            var month;
            if (this.editType == Calendar.EditEnd) {
                month = end.getMonth();
            }
            else {
                month = start.getMonth();
            }
            this.shownMonth = month;
        };
        /** 设置位置与大小
         * @param x {number} 日历组件的X，默认为0
         * @param y {number} 日历组件的Y，默认为360
         * @param width {number} 日历组件的宽，手机版默认为舞台的宽度1080，PC版默认为460
         */
        Calendar.prototype.setPosition = function (x, y, width) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 360; }
            if (width === void 0) { width = 1080; }
            this.x = x;
            this.y = y;
            if (!game.GlobalConfig.isMobile) {
                width = 460;
            }
            this.scaleX = width / 1080;
            this.scaleY = width / 1080;
        };
        Calendar.prototype.setOPen = function (img) {
            game.CTweenManagerController.getInstance().startCTween(5, [this.groupMain, img]);
        };
        Calendar.prototype.setClose = function (img, callBack, thisObj) {
            game.CTweenManagerController.getInstance().startCTween(5, [this.groupMain, img], false, callBack, thisObj);
        };
        Object.defineProperty(Calendar.prototype, "editType", {
            /** 当前选择编辑的日期类型 */
            get: function () { return this._editType; },
            set: function (v) {
                this.btnStart.setState = v == Calendar.EditStart ? "down" : "up";
                this.btnEnd.setState = v == Calendar.EditEnd ? "down" : "up";
                if (this._editType === v) {
                    return;
                }
                this._editType = v;
                this.shownMonth = this.shownMonth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "shownMonth", {
            /** 当前显示的月份 */
            get: function () { return this._shownMonth; },
            set: function (v) {
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
            },
            enumerable: true,
            configurable: true
        });
        // --------------------------------------- init ---------------------------------------
        /** 初始化设置 */
        Calendar.prototype.initSetting = function () {
            this.editType = Calendar.EditStart;
        };
        /** 设置当前月份 */
        Calendar.prototype.initCurrentTime = function () {
            var timestamp = new Date().getTime();
            try {
                timestamp = game.GameModel.getInstance().timestamp.snapshot.timestamp;
            }
            catch (err) {
                game.DebugUtil.debug("cannot get server timestamp");
            }
            this.currentYear = new Date(timestamp).getFullYear();
            this.currentMonth = new Date(timestamp).getMonth();
            this.currentDay = new Date(timestamp).getDate();
            this.setPeriod(timestamp - 1000 * 60 * 60 * 24 * 30, timestamp);
            this.shownYear = this.currentYear;
            this.shownMonth = this.currentMonth;
        };
        // --------------------------------------- event listener ---------------------------------------
        /** 注册事件 */
        Calendar.prototype.initListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        };
        /** 处理点击事件 */
        Calendar.prototype.handleTap = function (evt) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
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
                    if (evt.target.name && evt.target.name.indexOf("date_") > -1) {
                        var time = this.getTimeByName(evt.target.name);
                        if (this.checkValidTime(time)) {
                            var selectDate = new Date(time);
                            var month = selectDate.getMonth();
                            if (this.editType == Calendar.EditEnd) {
                                this.endTime = time;
                            }
                            else {
                                this.startTime = time;
                            }
                            this.setBtnText();
                            this.shownMonth = month;
                        }
                    }
                    break;
            }
        };
        /** 根据点击的target.name获取时间戳，忽略了时分秒
         * @return {number}
         */
        Calendar.prototype.getTimeByName = function (name) {
            var numStr = name.split("_");
            var x = +numStr[1];
            var y = +numStr[2];
            var num = x * 7 + y + 1;
            var nowTime = new Date(this.shownYear, this.shownMonth, 1).getTime();
            var fixNum = new Date(this.shownYear, this.shownMonth, 1).getDay();
            fixNum = fixNum == 0 ? 7 : fixNum;
            var distance = num - (fixNum - 1);
            return nowTime + 1000 * 60 * 60 * 24 * (distance - 1);
        };
        /** 检查某个时间可点击状态
         * @param currentTime {number} 所检查的时间戳
         * @return {boolean} true - 可点击 | false - 不可点击
         */
        Calendar.prototype.checkValidTime = function (currentTime) {
            var valid = true;
            // 检查是否超过今天
            var today = new Date(this.currentYear, this.currentMonth, this.currentDay).getTime();
            if (currentTime > today)
                valid = false;
            // 检查是否超过一个月
            if (currentTime <= today - 1000 * 60 * 60 * 24 * 30)
                valid = false;
            // 检查结束时间是否小于开始时间
            if (this.editType == Calendar.EditEnd) {
                if (currentTime < this.startTime)
                    valid = false;
            }
            // 检查开始时间是否大于结束时间
            if (this.editType == Calendar.EditStart) {
                if (currentTime > this.endTime)
                    valid = false;
            }
            return valid;
        };
        // --------------------------------------- handle ui ---------------------------------------
        /** 设置日历上显示的日期 */
        Calendar.prototype.setCalendar = function () {
            var currentMonthDay;
            var lastMonthDay;
            currentMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf(this.shownMonth + 1) > -1 ? 31 : 30;
            lastMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf((this.shownMonth + 12 - 1) % 12 + 1) > -1 ? 31 : 30;
            if (this.shownMonth == 1) {
                currentMonthDay = ((this.shownYear % 4 == 0 && this.shownYear % 100 != 0) || this.shownYear % 400 == 0) ? 29 : 28;
            }
            if (this.shownMonth == 2) {
                lastMonthDay = ((this.shownYear % 4 == 0 && this.shownYear % 100 != 0) || this.shownYear % 400 == 0) ? 29 : 28;
            }
            var fixNum = new Date(this.shownYear, this.shownMonth, 1).getDay();
            fixNum = fixNum == 0 ? 7 : fixNum;
            for (var x = 0; x < 6; x++) {
                for (var y = 0; y < 7; y++) {
                    var group = this["date_" + x + "_" + y];
                    var txt = group.getChildByName("txt");
                    var date = (x * 7 + y + 1) - (fixNum - 1);
                    if (date <= 0) {
                        date = date + lastMonthDay;
                    }
                    else if (date > currentMonthDay) {
                        date = date - currentMonthDay;
                    }
                    txt.text = date + "";
                }
            }
        };
        /** 设置日历上每个日期的可点击状态 */
        Calendar.prototype.setCalendarStyle = function () {
            var highLightTime = this.editType == Calendar.EditEnd ? this.endTime : this.startTime;
            for (var x = 0; x < 6; x++) {
                for (var y = 0; y < 7; y++) {
                    var time = this.getTimeByName("date_" + x + "_" + y);
                    var valid = this.checkValidTime(time);
                    this.setDateStyle(x, y, valid);
                    if (time == highLightTime) {
                        this.setDateStyle(x, y, valid, true);
                    }
                }
            }
        };
        /** 设置每个格子的样式 */
        Calendar.prototype.setDateStyle = function (x, y, clickAble, highLight) {
            if (highLight === void 0) { highLight = false; }
            var group = this["date_" + x + "_" + y];
            var txt = group.getChildByName("txt");
            var bgd = group.getChildByName("bgd");
            bgd.visible = highLight;
            txt.textColor = 0xE7B570;
            txt.alpha = clickAble ? 1 : 0.3;
            if (highLight) {
                txt.textColor = 0x000000;
                txt.alpha = 1;
            }
            var label = txt.text || "";
            txt.text = "0";
            txt.text = label;
        };
        /** 设置开始与结束时间选择按钮上文本 */
        Calendar.prototype.setBtnText = function () {
            var y, m, d;
            var start = new Date(this.startTime);
            y = start.getFullYear();
            m = start.getMonth();
            d = start.getDate();
            this.btnStart.label = y + "/" + this.getStrByNum(m + 1) + "/" + this.getStrByNum(d);
            var end = new Date(this.endTime);
            y = end.getFullYear();
            m = end.getMonth();
            d = end.getDate();
            this.btnEnd.label = y + "/" + this.getStrByNum(m + 1) + "/" + this.getStrByNum(d);
        };
        /** 数字转字符串，长度为2 */
        Calendar.prototype.getStrByNum = function (num) {
            return (num / 100).toFixed(2).slice(2);
        };
        // --------------------------------------- dispose ---------------------------------------
        /** 关闭父级界面时调用 */
        Calendar.prototype.dispose = function () {
            if (this.parent) {
                this.parent.removeChild(this);
                this.visible = true;
                game.CTweenManagerController.getInstance().endAllCTween();
            }
        };
        // --------------------------------------- variable ---------------------------------------
        /** 当前编辑的是开始时间 */
        Calendar.EditStart = "EditStart";
        /** 当前编辑的是结束时间 */
        Calendar.EditEnd = "EditEnd";
        return Calendar;
    }(eui.Component));
    game.Calendar = Calendar;
    __reflect(Calendar.prototype, "game.Calendar");
})(game || (game = {}));
//# sourceMappingURL=Calendar.js.map