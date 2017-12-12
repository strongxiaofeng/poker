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
    /**
     * 轮播图广告组件
     * @param top,width,height 组件的top,width,height 值
     * @param params 一个用于盛放需要轮播的图片的数组Array['xxx.png','aaa.png']
     * by 郑戎辰
     */
    var BannerUI = (function (_super) {
        __extends(BannerUI, _super);
        function BannerUI(top, width, height, params) {
            var _this = _super.call(this) || this;
            /** 手机滑动开始值（非坐标） */
            _this.touchStartNum = 0;
            /** 手机滑动结束值（非坐标） */
            _this.touchEndNum = 0;
            /** 当前第几张图片 */
            _this.imageNum = 0;
            /** 一共有几张图片 */
            _this.imageNums = 0;
            /** 定时器 */
            _this.timeout = null;
            _this.roastingGroupList = new eui.List();
            _this.progressList = new eui.List();
            _this.width = width;
            _this.top = top;
            _this.height = height;
            _this.params = params;
            _this.onLoaded(params);
            _this.addEventListener(eui.UIEvent.CHANGE_START, _this.touchBegin, _this);
            _this.addEventListener(eui.UIEvent.CHANGE_END, _this.touchEnd, _this);
            _this.roastingGroupList.touchChildren = false;
            _this.imageNums = params.length ? params.length : 0;
            _this.creatTimeOut();
            return _this;
        }
        BannerUI.prototype.onLoaded = function (params) {
            if (!params)
                return;
            // 创建list
            var imgArr = new eui.ArrayCollection(params);
            var exml = "\n        <e:Skin xmlns:e=\"http://ns.egret.com/eui\"> <e:Image source=\"{data}\" height=\"" + this.height + "\" width=\"" + this.width + "\" verticalCenter=\"0\" fillMode=\"scale\"/> </e:Skin>";
            this.roastingGroupList.dataProvider = imgArr;
            var listLayout = new eui.HorizontalLayout();
            listLayout.gap = 0;
            this.roastingGroupList.layout = listLayout;
            this.roastingGroupList.itemRendererSkinName = exml;
            this.viewport = this.roastingGroupList;
            this.scrollPolicyH = eui.ScrollPolicy.ON;
            this.scrollPolicyV = eui.ScrollPolicy.OFF;
            this.verticalScrollBar = null;
            this.horizontalScrollBar = null;
            this.throwSpeed = 0;
            // 创建右下角进度条
            var pArr = [];
            for (var i = 0; i < params.length; i++) {
                pArr.push('club_pic_nextpage_png');
            }
            // 进度条定位
            this.progressList.right = 20;
            this.progressList.bottom = 10;
            this.progressArr = new eui.ArrayCollection(pArr);
            this.progressList.dataProvider = this.progressArr;
            var progressExml = "\n        <e:Skin xmlns:e=\"http://ns.egret.com/eui\"> <e:Image source=\"{data}\" height=\"28\" width=\"28\" fillMode=\"scale\"/> </e:Skin>";
            var progressLayout = new eui.HorizontalLayout();
            // 间隔
            progressLayout.gap = 5;
            this.progressList.layout = progressLayout;
            this.progressList.itemRendererSkinName = progressExml;
            this.addChildAt(this.progressList, 99);
            this.progressImg();
        };
        /** 触摸开始 */
        BannerUI.prototype.touchBegin = function (evt) {
            this.touchStartNum = this.viewport.scrollH;
        };
        /** 结束 */
        BannerUI.prototype.touchEnd = function (evt) {
            this.touchEndNum = this.viewport.scrollH;
            // 在第一张和最后一张的时候右滑(scrollH不会变)
            if (this.touchStartNum == this.touchEndNum) {
                if (this.imageNum == (this.imageNums - 1)) {
                    this.imageNum = 0;
                }
                else {
                    this.imageNum = this.imageNums - 1;
                }
                ;
            }
            else {
                if ((this.touchEndNum - this.touchStartNum) > 100) {
                    // this.viewport.scrollH
                    if (this.imageNum < (this.imageNums - 1)) {
                        this.imageNum++;
                    }
                    else {
                        this.imageNum = 0;
                    }
                }
                else if ((this.touchEndNum - this.touchStartNum) < -100) {
                    if (this.imageNum > 0) {
                        this.imageNum--;
                    }
                    else {
                        this.imageNum = this.imageNums;
                    }
                }
            }
            this.scollerStart();
            this.clearTimeOut();
            this.creatTimeOut();
            this.touchStartNum = this.viewport.scrollH;
        };
        /** 设置宽度 */
        BannerUI.prototype.setWidth = function (width) {
            if (this.params) {
                this.removeChildren();
                this.width = width;
                this.imageNum = 0;
                this.progressImg();
                this.clearTimeOut();
                this.creatTimeOut();
                this.onLoaded(this.params);
            }
        };
        /** 开始滚动 */
        BannerUI.prototype.scollerStart = function () {
            egret.Tween.get(this.viewport).to({ scrollH: this.imageNum * this.width }, 500);
            this.progressImg();
        };
        /** 计算进度条 */
        BannerUI.prototype.progressImg = function () {
            for (var i = 0; i < this.progressArr.length; i++) {
                this.progressArr.replaceItemAt('club_pic_nextpage_png', i);
            }
            this.progressArr.replaceItemAt('club_pic_currentpage_png', this.imageNum);
            this.progressArr.refresh();
        };
        /** 定时滚动 */
        BannerUI.prototype.creatTimeOut = function () {
            var _this = this;
            this.timeout = egret.setInterval(function () {
                if (_this.imageNum < (_this.imageNums - 1)) {
                    _this.imageNum++;
                }
                else {
                    _this.imageNum = 0;
                }
                _this.scollerStart();
            }, this, 3000);
        };
        /** 取消定时滚动 */
        BannerUI.prototype.clearTimeOut = function () {
            if (this.timeout) {
                egret.clearInterval(this.timeout);
            }
        };
        return BannerUI;
    }(eui.Scroller));
    game.BannerUI = BannerUI;
    __reflect(BannerUI.prototype, "game.BannerUI");
})(game || (game = {}));
//# sourceMappingURL=BannerUI.js.map