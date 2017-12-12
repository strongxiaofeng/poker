var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 通知管理类
     * @author beiyuan
     */
    var NotifyManager = (function () {
        function NotifyManager() {
            this.ObjDic = new Object();
            this.typeDic = new Object();
        }
        NotifyManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new NotifyManager();
            }
            return this.instance;
        };
        /**派发*/
        NotifyManager.prototype.distribute = function (type, body) {
            var arr = this.typeDic[type];
            if (arr) {
                var new_arr = arr.slice();
                var len = new_arr.length;
                var name;
                var n;
                for (var i = 0; i < len; i++) {
                    name = new_arr[i];
                    n = this.ObjDic[name];
                    if (n) {
                        n.handleNotification(type, body);
                    }
                }
            }
        };
        NotifyManager.prototype.hasObj = function (name) {
            if (this.ObjDic[name]) {
                return true;
            }
            else {
                return false;
            }
        };
        NotifyManager.prototype.addObj = function (name, obj) {
            if (this.ObjDic[name]) {
                game.DebugUtil.debug("Notify repeat Register:" + name);
                // this.removeObj(name);
                // throw new Error("Notify repeat Register:"+name);
            }
            else {
                this.ObjDic[name] = obj;
                //再组建一个type的字典
                this.configurationType(name, obj);
            }
        };
        /**
         * type字典重构
         * */
        NotifyManager.prototype.configurationType = function (name, obj) {
            var n = obj;
            if (n) {
                var list = n.listNotification();
                var len = list.length;
                var type = "";
                for (var i = 0; i < len; i++) {
                    type = list[i];
                    if (this.typeDic[type]) {
                        //添加到末尾
                        this.typeDic[type].push(name);
                    }
                    else {
                        this.typeDic[type] = [name];
                    }
                }
            }
        };
        NotifyManager.prototype.removeObj = function (name) {
            if (this.ObjDic[name]) {
                this.cleanType(name);
                delete this.ObjDic[name];
            }
        };
        NotifyManager.prototype.cleanType = function (name) {
            var n = this.ObjDic[name];
            if (n) {
                var list = n.listNotification();
                var len = list.length;
                var type;
                var arr;
                for (var i = 0; i < len; i++) {
                    type = list[i];
                    arr = this.typeDic[type];
                    if (arr) {
                        var index = arr.indexOf(name);
                        if (index > -1) {
                            arr.splice(index, 1);
                            if (arr.length > 0) {
                                this.typeDic[type] = arr;
                            }
                            else {
                                arr = null;
                                this.typeDic[type] = null;
                                delete this.typeDic[type];
                            }
                        }
                    }
                }
            }
        };
        return NotifyManager;
    }());
    game.NotifyManager = NotifyManager;
    __reflect(NotifyManager.prototype, "game.NotifyManager");
})(game || (game = {}));
//# sourceMappingURL=NotifyManager.js.map