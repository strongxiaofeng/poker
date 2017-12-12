var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var MyModel = (function () {
        function MyModel() {
        }
        MyModel.getInstance = function () {
            if (this.instance == null) {
                this.instance = new MyModel();
            }
            return this.instance;
        };
        return MyModel;
    }());
    game.MyModel = MyModel;
    __reflect(MyModel.prototype, "game.MyModel");
})(game || (game = {}));
//# sourceMappingURL=myModel.js.map