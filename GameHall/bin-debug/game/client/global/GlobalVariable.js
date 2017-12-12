var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *  全局的单列对象
     * @author zhangbeiyuan
     */
    var GlobalVariable = (function () {
        function GlobalVariable() {
        }
        /**检测对象是否为空*/
        GlobalVariable.isEmptyObject = function (obj) {
            var t;
            for (t in obj)
                return !1;
            return !0;
        };
        GlobalVariable.copyObject = function (obj) {
            var str, newobj = obj.constructor === Array ? [] : {};
            if (typeof obj !== 'object') {
                return;
            }
            else if (JSON) {
                str = JSON.stringify(obj),
                    newobj = JSON.parse(str); //还原
            }
            else {
                for (var i in obj) {
                    newobj[i] = typeof obj[i] === 'object' ?
                        GlobalVariable.copyObject(obj[i]) : obj[i];
                }
            }
            return newobj;
        };
        /**根据闲和庄的局数获取对应的矩形宽度*/
        GlobalVariable.getLen = function (arr, defaultLen) {
            var n1 = arr[0];
            var n2 = arr[1];
            var n3 = arr[2];
            var total = arr[3];
            var len = [defaultLen, defaultLen, defaultLen];
            var totalLen = defaultLen * 3;
            if (total == 0) {
                return len;
            }
            //最小宽度
            var minLen = 44;
            var max = "n1";
            if (n2 >= n1 && n2 >= n3)
                max = "n2";
            else if (n3 >= n1 && n3 >= n2)
                max = "n3";
            if ("n1" != max) {
                if (n1 > 0 && n1 / total * totalLen < 30) {
                    len[0] = minLen;
                }
                else {
                    len[0] = Math.ceil(n1 / total * totalLen);
                }
            }
            if ("n2" != max) {
                if (n2 > 0 && n2 / total * totalLen < 30) {
                    len[1] = minLen;
                }
                else {
                    len[1] = Math.ceil(n2 / total * totalLen);
                }
            }
            if ("n3" != max) {
                if (n3 > 0 && n3 / total * totalLen < 30) {
                    len[2] = minLen;
                }
                else {
                    len[2] = Math.ceil(n3 / total * totalLen);
                }
            }
            if (max == "n1") {
                len[0] = totalLen - len[1] - len[2];
            }
            else if (max == "n2") {
                len[1] = totalLen - len[0] - len[2];
            }
            else if (max == "n3") {
                len[2] = totalLen - len[0] - len[1];
            }
            return len;
        };
        /**服务器状态，是否在维护911为系统维护*/
        GlobalVariable.serverStatus = 0;
        /**默认筹码列表*/
        GlobalVariable.availbleChips = [50, 100, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000,
            1000000, 2000000, 5000000,
            10000000, 20000000, 30000000, 50000000,
            100000000, 200000000, 300000000, 500000000,
            1000000000, 2000000000, 3000000000, 5000000000,
            10000000000, 20000000000, 30000000000, 50000000000];
        GlobalVariable.RewardModule = "";
        /**用户协议 */
        GlobalVariable.userAgreement = "";
        return GlobalVariable;
    }());
    game.GlobalVariable = GlobalVariable;
    __reflect(GlobalVariable.prototype, "game.GlobalVariable");
})(game || (game = {}));
//# sourceMappingURL=GlobalVariable.js.map