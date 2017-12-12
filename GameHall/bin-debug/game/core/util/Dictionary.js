var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *
     * @author 帅波
     * @date 2016.05.20
     * @desc 字典
     *
     */
    var Dictionary = (function () {
        function Dictionary() {
            this.dict = {};
        }
        /**
         * 根据key来设置value
         */
        Dictionary.prototype.setValue = function (key, value) {
            this.dict[key] = value;
        };
        /**
         * 根据key获得value
         */
        Dictionary.prototype.getValue = function (key) {
            return this.dict[key];
        };
        /**
         * 获取所有key
         */
        Dictionary.prototype.getAllKey = function () {
            var keys = [];
            for (var key in this.dict) {
                keys.push(key);
            }
            return keys;
        };
        /**
         * 获取所有value
         */
        Dictionary.prototype.getAllValue = function () {
            var values = [];
            for (var key in this.dict) {
                values.push(this.dict[key]);
            }
            return values;
        };
        /**
         * 检测是否包含某个key
         */
        Dictionary.prototype.containsKey = function (key) {
            return this.dict[key] == null ? false : true;
        };
        /**
         * 移除某个key
         */
        Dictionary.prototype.removeKey = function (key) {
            this.dict[key] = null;
            delete this.dict[key];
        };
        /**
         * 移除某个value
         * temp:只能移除第一个value
         */
        Dictionary.prototype.removeValue = function (value) {
            for (var key in this.dict) {
                if (this.dict[key] == value) {
                    this.removeKey(key);
                    break;
                }
            }
        };
        /**
         * 根据Value获得Key
         */
        Dictionary.prototype.getKeyByValue = function (value) {
            for (var key in this.dict) {
                if (this.dict[key] == value) {
                    return key;
                }
            }
            return null;
        };
        /**
         * 获取key的个数
         */
        Dictionary.prototype.getKeyLength = function () {
            var count = 0;
            for (var key in this.dict) {
                count++;
            }
            return count;
        };
        /**
         * 清除所有数据
         */
        Dictionary.prototype.clear = function () {
            this.dict = null;
            this.dict = {};
        };
        Dictionary.prototype.toString = function () {
            return this.dict.toString();
        };
        return Dictionary;
    }());
    game.Dictionary = Dictionary;
    __reflect(Dictionary.prototype, "game.Dictionary");
})(game || (game = {}));
//# sourceMappingURL=Dictionary.js.map