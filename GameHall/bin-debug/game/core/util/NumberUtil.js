var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * @desc 数字工具类
     */
    var NumberUtil = (function () {
        function NumberUtil() {
        }
        /**
         * 传入数字，返回千位逗号隔开的字符串效果
         * @param num 单位为分
         * @param isShort 是否为简写-->例如：10000000 --> 100k 1为大于等于1000就开始缩写 2为大于100000才开始缩写 3是保留一位小数
         * ----已添加单元测试 2017.4.17 17:58
         */
        NumberUtil.getSplitNumStr = function (num, isShort) {
            if (isShort === void 0) { isShort = 0; }
            if (typeof num != "number") {
                return "0";
            }
            var preFix = num >= 0 ? "" : "-";
            num = Math.abs(num);
            num = num || 0;
            num = num / 100;
            //小数部分
            var decimal = "";
            var code = num.toString(10);
            if (code.indexOf(".") != -1) {
                // code = num.toFixed(2);
                var a = (num + "").split(".");
                if (a[1].length == 1) {
                    a[1] = a[1] + "0";
                }
                else {
                    a[1] = a[1].slice(0, 2);
                }
                code = a.join(".");
            }
            if (isShort) {
                code = this.num2short(num, isShort);
            }
            var data = code.split(".");
            var integer = data[0];
            var tailData = data[1];
            var DecimalPoint = "."; //小数点
            var Semicolon = ","; //分隔号
            // switch(LanguageConstTypes.AmountType)
            // {
            //     case 0:
            //         DecimalPoint = ".";
            //         Semicolon = ",";
            //         break;
            //     case 1:
            //         DecimalPoint = ",";
            //         Semicolon = ".";
            //         break;
            // }
            if (tailData) {
                if (tailData.length == 2 && tailData[1] == "0") {
                    tailData = tailData.substr(0, 1);
                    decimal = DecimalPoint + tailData;
                }
                else if (tailData.length == 2 && tailData[0] == "0" && tailData[1] == "0") {
                    tailData = "";
                    decimal = "";
                }
                else {
                    decimal = DecimalPoint + tailData;
                }
            }
            var result = integer.replace(/\B(?=(?:\d{3})+$)/g, Semicolon) + decimal;
            return preFix + result;
        };
        /**
         * 1000-->K
           1000 000-->M
           1 000 000 000-->B
           1 000 000 000 000-->T
         */
        NumberUtil.num2short = function (value, type) {
            var num = 0;
            var result = "";
            var suffix = "";
            var mini = 1000;
            if (type == 2) {
                mini = 100000;
            }
            if (value >= mini && value < 1000000) {
                num = value / 1000;
                suffix = "K";
            }
            else if (value >= 1000000 && value < 1000000000) {
                num = value / 1000000;
                suffix = "M";
            }
            else if (value >= 1000000000 && value < 1000000000000) {
                num = value / 1000000000;
                suffix = "B";
            }
            else if (value >= 1000000000000) {
                num = value / 1000000000000;
                suffix = "T";
            }
            else {
                num = value;
            }
            result = num.toString();
            var actNum = 4;
            if (result.indexOf(".") > -1 && suffix == "") {
                actNum = 5;
            }
            if (result.length > actNum) {
                if (type == 1) {
                    result = result.slice(0, actNum);
                }
            }
            var bNum = parseFloat(result); //小数点后保留两位
            // let rNum = (Math.floor(bNum * 100))/100;
            //小数点后只显示一位小数
            if (type == 2 || type == 3) {
                bNum = (Math.floor(bNum * 10)) / 10;
            }
            else {
                if (suffix != "") {
                    bNum = Math.floor(bNum); //策划要求去掉小数
                }
            }
            return bNum + suffix;
        };
        NumberUtil.formatDate = function (date, type) {
            if (type === void 0) { type = 0; }
            var d = "";
            var t = "";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var dates = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var secounds = date.getSeconds();
            var dateType = 3;
            switch (dateType) {
                case 0:
                    d = year + game.LanguageUtil.translate("g_year") + month + game.LanguageUtil.translate("g_month") + dates + game.LanguageUtil.translate("g_day");
                    t = hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secounds < 10 ? "0" + secounds : secounds);
                    break;
                case 1:
                    d = (dates < 10 ? "0" + dates : "" + dates) + "/" + (month < 10 ? "0" + month : "" + month) + "/" + year;
                    t = hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secounds < 10 ? "0" + secounds : secounds);
                    break;
                case 2:
                    d = (dates < 10 ? "0" + dates : "" + dates) + "-" + (month < 10 ? "0" + month : "" + month) + "-" + year;
                    t = hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secounds < 10 ? "0" + secounds : secounds);
                    break;
                case 3:
                    d = year + "/" + (month < 10 ? "0" + month : "" + month) + "/" + (dates < 10 ? "0" + dates : "" + dates);
                    t = hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secounds < 10 ? "0" + secounds : secounds);
                    break;
                case 4:
                    d = year + game.LanguageUtil.translate("g_year") + (month < 10 ? "0" + month : "" + month) + game.LanguageUtil.translate("g_month") + (dates < 10 ? "0" + dates : "" + dates) + game.LanguageUtil.translate("g_day");
                    t = hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secounds < 10 ? "0" + secounds : secounds);
                    break;
            }
            switch (type) {
                case 0:
                    return d;
                case 1:
                    return t;
                case 2:
                    return d + " " + t;
                case 3:
                    return d + " " + hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
            }
        };
        /**返回经过精度处理的2位小数,如果这个2位小数的末位是0，会省去0*/
        NumberUtil.getCheckedNumber = function (n) {
            var n0 = parseInt(n.toFixed(0));
            var n1 = parseFloat(n.toFixed(1));
            var n2 = parseFloat(n.toFixed(2));
            if (n2 == n1) {
                if (n1 == n0) {
                    return n0;
                }
                else {
                    return n1;
                }
            }
            else {
                return n2;
            }
        };
        return NumberUtil;
    }());
    game.NumberUtil = NumberUtil;
    __reflect(NumberUtil.prototype, "game.NumberUtil");
})(game || (game = {}));
//# sourceMappingURL=NumberUtil.js.map