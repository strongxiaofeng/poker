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
    var PCMulitBaccGuide = (function (_super) {
        __extends(PCMulitBaccGuide, _super);
        function PCMulitBaccGuide() {
            var _this = this;
            var ui = new game.PCMultiBaccUI1(true);
            _this = _super.call(this, ui) || this;
            _this.skinName = game.SystemPath.skin_path + "guide/MulitBaccGuide.exml";
            return _this;
        }
        Object.defineProperty(PCMulitBaccGuide.prototype, "page", {
            /**重写这个函数 */
            set: function (value) {
                this._page = value;
                var ui = this.guideUI;
                if (value > 9) {
                    return;
                }
                this.clearHollow();
                if (value - 1 > 0) {
                    this["page" + (value - 1)].visible = false;
                }
                this["page" + value].visible = true;
                this.btn_startGame.visible = false;
                switch (value) {
                    case 1:
                        this.setHollows([]);
                        // console.warn(this["page" + value]);
                        break;
                    case 2:
                        {
                            var list = ui.mulitList.getItems();
                            var item = list[list.length - 1];
                            var pt = item.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + item.height + 20;
                            this.setHollows([this.createZone(pt.x, pt.y, item.width, item.height)]);
                        }
                        break;
                    case 3:
                        {
                            var list = ui.mulitList.getItems();
                            var item = list[list.length - 1];
                            var pt = item.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + 262 + 20;
                            this.setHollows([this.createZone(pt.x, pt.y, 550, 262)]);
                        }
                        break;
                    case 4:
                        {
                            var list = ui.mulitList.getItems();
                            var item = list[list.length - 1];
                            var pt = item.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + item.height + 20;
                            this.setHollows([this.createZone(pt.x, pt.y + 260, 550, 37)]);
                        }
                        break;
                    case 5:
                        {
                            var list = ui.mulitList.getItems();
                            var item = list[list.length - 1];
                            var pt = item.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + 53 + 20;
                            this["page" + value].x = pt.x + (item.width - 278 - 157);
                            this.setHollows([this.createZone(pt.x + (item.width - 278 - 20), pt.y + 4, 278, 53)]);
                        }
                        break;
                    case 6:
                        {
                            var list = ui.mulitList.getItems();
                            var item = list[list.length - 1];
                            var pt = item.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + item.height + 20;
                            this["page" + value].x = pt.x + (item.width - 550 - 157);
                            this.setHollows([this.createZone(pt.x + (item.width - 550 - 20 - 52), pt.y + 53, 550, 254)]);
                        }
                        break;
                    case 7:
                        {
                            var pt = ui.videoInfoGroup.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + 200;
                            this["page" + value].x = pt.x - 20 - 620;
                            this.setHollows([this.createZone(1361, 85, 544, 500)]);
                        }
                        break;
                    case 8:
                        {
                            var pt = ui.infoGroup.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + ui.infoGroup.height / 2 - 20;
                            this["page" + value].x = pt.x - 620 - 20;
                            this.setHollows([this.createZone(1361, 599, 544, 460)]);
                        }
                        break;
                    case 9:
                        this.setHollows([]);
                        this.btn_skip.visible = false;
                        this.btn_startGame.visible = true;
                        break;
                    default:
                        this.setHollows([]);
                        this.btn_skip.visible = false;
                        this.btn_startGame.visible = true;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        return PCMulitBaccGuide;
    }(game.NewGuideBaseUI));
    game.PCMulitBaccGuide = PCMulitBaccGuide;
    __reflect(PCMulitBaccGuide.prototype, "game.PCMulitBaccGuide");
})(game || (game = {}));
//# sourceMappingURL=PCMulitBaccGuide.js.map