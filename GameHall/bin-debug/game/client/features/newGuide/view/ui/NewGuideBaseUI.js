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
    /**构造函数需要把需要引导的ui传进来 */
    var NewGuideBaseUI = (function (_super) {
        __extends(NewGuideBaseUI, _super);
        /**构造函数需要把需要引导的ui传进来 */
        function NewGuideBaseUI(guideUI) {
            var _this = _super.call(this) || this;
            /**当前页 */
            _this._page = 0;
            _this.guideUI = guideUI;
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        NewGuideBaseUI.prototype.initSetting = function () {
            this.container = new egret.DisplayObjectContainer();
            this.bitmap = new egret.Bitmap();
            this.bg = new egret.Shape();
            this.addChildAt(this.guideUI, 1); //添加到最底层
            this.page = 1;
        };
        Object.defineProperty(NewGuideBaseUI.prototype, "page", {
            /**重写这个函数 */
            set: function (value) {
                // this._page = value;
                // this.clearHollow();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置镂空
         * @param x 镂空区域坐标
         * @param y 镂空区域坐标
         * @param erase 镂空区域
         * */
        NewGuideBaseUI.prototype.setHollows = function (arr) {
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
            this.addChildAt(this.bitmap, this.getChildIndex(this.guideUI) + 1);
        };
        NewGuideBaseUI.prototype.clearHollow = function () {
            this.container.removeChildren();
            if (this.contains(this.bitmap)) {
                this.removeChild(this.bitmap);
            }
        };
        /**生成镂空区域 */
        NewGuideBaseUI.prototype.createZone = function (x, y, w, h) {
            var zone = new game.HollowZone();
            zone.x = x;
            zone.y = y;
            zone.erase = new egret.Shape();
            zone.erase.graphics.beginFill(0x411111);
            zone.erase.graphics.drawRect(0, 0, w, h);
            zone.erase.graphics.endFill();
            return zone;
        };
        /** 收到mediator的通知 */
        NewGuideBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case NewGuideCommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        NewGuideBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        /** */
        NewGuideBaseUI.prototype.onTap = function (e) {
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
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        NewGuideBaseUI.prototype.dispose = function () {
            this.guideUI.dispose();
            _super.prototype.dispose.call(this);
        };
        return NewGuideBaseUI;
    }(game.BaseUI));
    game.NewGuideBaseUI = NewGuideBaseUI;
    __reflect(NewGuideBaseUI.prototype, "game.NewGuideBaseUI");
})(game || (game = {}));
//# sourceMappingURL=NewGuideBaseUI.js.map