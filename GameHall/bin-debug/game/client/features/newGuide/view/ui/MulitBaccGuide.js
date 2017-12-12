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
    var MulitBaccGuide = (function (_super) {
        __extends(MulitBaccGuide, _super);
        function MulitBaccGuide() {
            var _this = _super.call(this) || this;
            _this._page = 0;
            _this.skinName = game.SystemPath.skin_path + "guide/NewGuide.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        MulitBaccGuide.prototype.initSetting = function () {
            this.container = new egret.DisplayObjectContainer();
            this.bitmap = new egret.Bitmap();
            this.bg = new egret.Shape();
            this.multiBacc = new game.MultiBaccUI1(true);
            this.addChildAt(this.multiBacc, 1); //添加到最底层
            this.page = 1;
        };
        /**
         * 设置镂空
         * @param x 镂空区域坐标
         * @param y 镂空区域坐标
         * @param erase 镂空区域
         * */
        MulitBaccGuide.prototype.setHollows = function (arr) {
            // console.warn("setHollows");
            this.bg.graphics.clear();
            this.bg.graphics.beginFill(0, 0.6);
            this.bg.graphics.drawRect(0, 0, game.StageUtil.width, game.StageUtil.height);
            this.bg.graphics.endFill();
            this.container.addChild(this.bg);
            for (var i = arr.length - 1; i >= 0; i--) {
                this.container.addChild(arr[i].erase);
                arr[i].erase.x = arr[i].x;
                arr[i].erase.y = arr[i].y;
                arr[i].erase.blendMode = egret.BlendMode.ERASE;
            }
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(this.container);
            this.bitmap.texture = renderTexture;
            this.addChildAt(this.bitmap, this.getChildIndex(this.multiBacc) + 1);
        };
        /**清除镂空 */
        MulitBaccGuide.prototype.clearHollow = function () {
            this.container.removeChildren();
            if (this.contains(this.bitmap)) {
                this.removeChild(this.bitmap);
            }
        };
        MulitBaccGuide.prototype.createZone = function (x, y, w, h) {
            var zone = new game.HollowZone();
            zone.x = x;
            zone.y = y;
            zone.erase = new egret.Shape();
            zone.erase.graphics.beginFill(0x411111);
            zone.erase.graphics.drawRect(0, 0, w, h);
            zone.erase.graphics.endFill();
            return zone;
        };
        Object.defineProperty(MulitBaccGuide.prototype, "page", {
            set: function (value) {
                this._page = value;
                if (value > 7) {
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
                        break;
                    case 2:
                        {
                            var pt = this.multiBacc.userName.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + 35 + 20;
                            var pt1 = this.multiBacc.userBalance.localToGlobal(0, 0);
                            this.setHollows([this.createZone(15, pt.y - 15, 273, 53), this.createZone(pt1.x - 44, pt.y - 15, 290, 70)]);
                        }
                        break;
                    case 3:
                        {
                            var pt = this.multiBacc.topMsg.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + 35 + 20;
                            var pt1 = this.multiBacc.assetBtn.localToGlobal(0, 0);
                            this.setHollows([this.createZone(15, pt.y - 15, 470, 53), this.createZone(pt1.x - 15, pt.y - 15, 345, 76)]);
                        }
                        break;
                    case 4:
                        {
                            var list = this.multiBacc.mulitList.getItems();
                            var item = list[list.length - 1];
                            var pt = item.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + item.height + 20;
                            this.setHollows([this.createZone(pt.x - 15, pt.y - 15, item.width + 30, item.height + 30)]);
                        }
                        break;
                    case 5:
                        {
                            var list = this.multiBacc.mulitList.getItems();
                            var item = list[list.length - 1];
                            item.showHideMore(true);
                            this.multiBacc.mulitList.updateItemsLocation();
                            var pt = item.localToGlobal(0, 0);
                            this["page" + value].y = pt.y + item.height + 20;
                            this.setHollows([this.createZone(pt.x - 15, pt.y - 15, item.width + 30, item.height + 30)]);
                        }
                        break;
                    case 6:
                        {
                            var list = this.multiBacc.mulitList.getItems();
                            var item = list[list.length - 1];
                            item.showHideMore(false);
                            this.multiBacc.mulitList.updateItemsLocation();
                            item = list[list.length - 2];
                            item.touchGroup.visible = true;
                            var pt = item.localToGlobal(0, 0);
                            this["page" + value].y = pt.y - this["page" + value].height;
                            this.setHollows([this.createZone(pt.x - 15, pt.y - 15, item.width + 30, item.height + 30)]);
                        }
                        break;
                    case 7:
                        this.setHollows([]);
                        this.btn_startGame.visible = true;
                        break;
                    default:
                        this.setHollows([]);
                        this.btn_startGame.visible = true;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        MulitBaccGuide.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case NewGuideCommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        MulitBaccGuide.prototype.initListener = function (mediator) {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        /** */
        MulitBaccGuide.prototype.onTap = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (e.target == this.btn_skip || e.target == this.btn_startGame) {
                game.CommonLoadingUI.getInstance().start();
                game.BaccaratController.getInstance().sendMultiClubEnter().then(function () {
                    game.MediatorManager.closeMediator(game.Mediators.NewGuide.name);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_MultiBaccMediator);
                });
            }
            else {
                this.page = (this._page + 1);
            }
        };
        // ---------------------------------- 刷新 ----------------------------------
        // ---------------------------------- 用户操作 ----------------------------------
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        MulitBaccGuide.prototype.dispose = function () {
            this.multiBacc.dispose();
            _super.prototype.dispose.call(this);
        };
        return MulitBaccGuide;
    }(game.BaseUI));
    game.MulitBaccGuide = MulitBaccGuide;
    __reflect(MulitBaccGuide.prototype, "game.MulitBaccGuide");
})(game || (game = {}));
//# sourceMappingURL=MulitBaccGuide.js.map