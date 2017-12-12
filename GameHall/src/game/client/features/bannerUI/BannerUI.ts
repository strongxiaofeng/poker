module game {
    /**
     * 轮播图广告组件
     * @param top,width,height 组件的top,width,height 值
     * @param params 一个用于盛放需要轮播的图片的数组Array['xxx.png','aaa.png']
     * by 郑戎辰
     */
    export class BannerUI extends eui.Scroller {
        /** 轮播图List */
        protected roastingGroupList: eui.List;
        /** 轮播图List */
        protected params: Array<string>;
        /** 进度条List */
        protected progressList: eui.List;
        /** 轮播图List的数据 */
        protected progressArr: eui.ArrayCollection;
        /** 手机滑动开始值（非坐标） */
        protected touchStartNum: number = 0;
        /** 手机滑动结束值（非坐标） */
        protected touchEndNum: number = 0;
        /** 当前第几张图片 */
        public imageNum: number = 0;
        /** 一共有几张图片 */
        protected imageNums: number = 0;
        /** 定时器 */
        protected timeout: any = null;


        public constructor(top: number, width: number, height: number, params: Array<any>) {
            super();
            this.roastingGroupList = new eui.List();
            this.progressList = new eui.List();
            this.width = width;
            this.top = top;
            this.height = height;
            this.params = params;
            this.onLoaded(params);
            this.addEventListener(eui.UIEvent.CHANGE_START, this.touchBegin, this);
            this.addEventListener(eui.UIEvent.CHANGE_END, this.touchEnd, this);
            this.roastingGroupList.touchChildren = false;
            this.imageNums = params.length ? params.length : 0;

            this.creatTimeOut();
        }

        public onLoaded(params: Array<any>): void {
            if (!params) return;
            // 创建list
            let imgArr = new eui.ArrayCollection(params);
            let exml = `
        <e:Skin xmlns:e="http://ns.egret.com/eui"> <e:Image source="{data}" height="${this.height}" width="${this.width}" verticalCenter="0" fillMode="scale"/> </e:Skin>`;
            this.roastingGroupList.dataProvider = imgArr;
            let listLayout = new eui.HorizontalLayout();
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
            var pArr: Array<string> = [];
            for (let i = 0; i < params.length; i++) {
                pArr.push('club_pic_nextpage_png')
            }
            // 进度条定位
            this.progressList.right = 20;
            this.progressList.bottom = 10;

            this.progressArr = new eui.ArrayCollection(pArr);
            this.progressList.dataProvider = this.progressArr;
            var progressExml = `
        <e:Skin xmlns:e="http://ns.egret.com/eui"> <e:Image source="{data}" height="28" width="28" fillMode="scale"/> </e:Skin>`;
            var progressLayout = new eui.HorizontalLayout();
            // 间隔
            progressLayout.gap = 5;
            this.progressList.layout = progressLayout;
            this.progressList.itemRendererSkinName = progressExml;
            this.addChildAt(this.progressList, 99);
            this.progressImg();
        }

        /** 触摸开始 */
        private touchBegin(evt: egret.TouchEvent) {
            this.touchStartNum = this.viewport.scrollH;
        }

        /** 结束 */
        private touchEnd(evt: egret.TouchEvent) {
            this.touchEndNum = this.viewport.scrollH;
            // 在第一张和最后一张的时候右滑(scrollH不会变)
            if (this.touchStartNum == this.touchEndNum) {
                if (this.imageNum == (this.imageNums - 1)) {
                    this.imageNum = 0;
                }
                else {
                    this.imageNum = this.imageNums - 1;
                };
            }
            else {
                if ((this.touchEndNum - this.touchStartNum) > 100) {
                    // this.viewport.scrollH
                    if (this.imageNum < (this.imageNums - 1)) {
                        this.imageNum++
                    }
                    else {
                        this.imageNum = 0;
                    }

                }
                else if ((this.touchEndNum - this.touchStartNum) < -100) {
                    if (this.imageNum > 0) {
                        this.imageNum--
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
        }

        /** 设置宽度 */
        public setWidth(width: number) {
            if (this.params) {
                this.removeChildren();
                this.width = width;
                this.imageNum = 0;
                this.progressImg();
                this.clearTimeOut();
                this.creatTimeOut();
                this.onLoaded(this.params);
            }
        }

        /** 开始滚动 */
        private scollerStart() {
            egret.Tween.get(this.viewport).to({ scrollH: this.imageNum * this.width }, 500);
            this.progressImg();
        }

        /** 计算进度条 */
        private progressImg() {
            for (let i = 0; i < this.progressArr.length; i++) {
                this.progressArr.replaceItemAt('club_pic_nextpage_png', i);
            }
            this.progressArr.replaceItemAt('club_pic_currentpage_png', this.imageNum);
            this.progressArr.refresh();
        }

        /** 定时滚动 */
        private creatTimeOut() {
            this.timeout = egret.setInterval(
                () => {
                    if (this.imageNum < (this.imageNums - 1)) {
                        this.imageNum++
                    }
                    else {
                        this.imageNum = 0;
                    }
                    this.scollerStart();
                }, this, 3000)
        }

        /** 取消定时滚动 */
        private clearTimeOut() {
            if (this.timeout) {
                egret.clearInterval(this.timeout);
            }
        }

    }
}
