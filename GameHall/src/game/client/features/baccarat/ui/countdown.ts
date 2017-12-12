module game
{
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    export class countdown extends eui.Component
    {

        public static type_bet = 'bet';
        public static type_deal_card = 'deal_card';
        public static type_payOut = 'payOut';
        public static type_shuffle = 'shuffle';


        /** 当前状态 */
        private _type: string = '';
        /** 一局游戏的时间 */
        private _timeAll: number = 0;
        /** 倒计时结束时间戳 */
        private _overTime: number = 0;
        /** 倒计时剩余时间 */
        private _time: number = 0;
        /** 倒计时计时器 */
        private interval: NodeJS.Timer;
        /** 背景半透明圆弧图片 */
        private roundBg: eui.Image;
        /** 背景红色圆弧图片 */
        private redroundBg: eui.Image;
        /** 倒计时文字 */
        private bgText: eui.BitmapLabel;
        /** 派彩/洗牌图片 */
        private payOutdBg: eui.Image;
        /** 是否是item用 */
        private isItem: boolean;
        /** 是否是item用 */
        private isPC: boolean;
        /** 倒计时的回调 */
        private stratCallBack: any;
        private stratThisObj: any;



        constructor(width: number, isItem: boolean = false, isPC: boolean = false)
        {
            super();
            this.width = width;
            this.height = width;
            this.touchEnabled = false;
            this.touchChildren = false;
            this.isItem = isItem;
            this.isPC = isPC;
            if (!this.isItem) {
                this.createBg();
            }
            else {
                this.startPayOut();
            }
        }

        /** 创建背景动画 */
        private createBg()
        {
            //底部的圈
            let bgImg = new eui.Image();
            bgImg.source = 'desk_pic_roomstatus_bg_png';
            bgImg.width = this.width;
            bgImg.height = this.height;
            this.addChild(bgImg);
        }


        /** 创建倒计时 */
        private createCountdown()
        {
            this.hiddenAll();
            if (!this.isItem) {
                //半透明圆弧
                if (!this.roundBg) {
                    this.roundBg = new eui.Image();
                    this.roundBg.source = 'desk_pic_roomstatus_countdown_png';
                    this.roundBg.width = this.width - 20;
                    this.roundBg.height = this.height - 20;
                    this.roundBg.top = 5;
                    this.roundBg.left = 10;
                    this.addChild(this.roundBg);
                }
                else {
                    this.roundBg.visible = true;
                }

                //红色圆弧
                if (!this.redroundBg) {
                    this.redroundBg = new eui.Image();
                    this.redroundBg.source = 'desk_pic_roomstatus_countdown2_png';
                    this.redroundBg.width = this.width - 20;
                    this.redroundBg.height = this.height - 20;
                    this.redroundBg.top = 5;
                    this.redroundBg.left = 10;
                    this.addChild(this.redroundBg);
                }
                else {
                    this.redroundBg.visible = true;
                }

                let time = 0
                let severTime = GameModel.getInstance().serverTime;

                if (!this._overTime) {
                    return
                }
                else {
                    time = this._overTime - severTime;
                    if (time < 0) {
                        time = 0;
                    }
                }

                //倒计时文字
                if (!this.bgText) {
                    this.bgText = new eui.BitmapLabel();
                    let intTime = Math.floor(time / 1000);
                    if (intTime > 10) {
                        this.bgText.font = 'game_share_golden_56_fnt';
                    }
                    else {
                        this.bgText.font = 'game_share_red_56_fnt';
                    }
                    this.bgText.verticalAlign = 'middle';
                    this.bgText.horizontalCenter = '0';
                    this.bgText.textAlign = "center";
                    this.bgText.text = intTime + '';
                    this.bgText.width = this.width - 20;
                    this.bgText.height = this.height - 20;
                    this.bgText.top = 10;
                    this.bgText.left = 10;
                    if (this.isPC) {
                        this.bgText.scaleX = 0.7;
                        this.bgText.scaleY = 0.7;
                        this.bgText.width = this.width - 10;
                        this.bgText.height = this.height - 10;
                        this.bgText.top = 5;
                        this.bgText.left = 5;
                    }
                    this.addChild(this.bgText);
                }
                else {
                    this.bgText.visible = true;
                }

                let shp = this.createMask();
                this.addChild(shp);
                this.redroundBg.mask = shp;
            }
            else {
                let time = 0
                let severTime = GameModel.getInstance().serverTime;
                if (!this._overTime) {
                    return
                }
                else {
                    time = this._overTime - severTime;
                    if (time < 0) {
                        time = 0;
                    }
                }
                //倒计时文字
                if (!this.bgText) {
                    this.bgText = new eui.BitmapLabel();
                    let intTime = Math.floor(time / 1000);
                    if (intTime > 10) {
                        this.bgText.font = 'game_share_golden_56_fnt';
                    }
                    else {
                        this.bgText.font = 'game_share_red_56_fnt';
                    }
                    this.bgText.horizontalCenter = 0;
                    this.bgText.verticalCenter = 0;
                    this.bgText.textAlign = "center";
                    this.bgText.verticalAlign = "middle";
                    this.bgText.text = intTime + '';
                    // this.bgText.width = this.width;
                    this.bgText.width = this.width * 2;
                    this.bgText.height = this.height;
                    if (this.isPC) {
                        this.bgText.width = this.width * 2;
                        this.bgText.scaleX = 0.5;
                        this.bgText.scaleY = 0.5;
                    }
                    this.addChild(this.bgText);
                }
                else {
                    this.bgText.visible = true;
                }

                this.createMask();
            }


        }


        private shape: egret.Shape;
        private num: number = 0;
        /** 创建倒计时遮罩层 */
        private createMask()
        {
            if (!this.shape) {
                this.shape = new egret.Shape();
            }
            else {
                this.shape.visible = true;
                this.shape.graphics.clear();
            }
            let shape = this.shape;
            let angle: number = 0;
            let r: number = this.width / 2;
            let self = this;

            let time = 0
            let severTime = GameModel.getInstance().serverTime;
            if (!this._overTime) {
                return
            }
            else {
                time = this._overTime - severTime;
            }
            this.interval = setInterval(this.start, 100, this, this.num);

            return shape;
        }

        private start(thisObj: countdown, num: number)
        {
            let self = thisObj
            let severTime = GameModel.getInstance().serverTime;
            let theTime = self._overTime - severTime;
            if (theTime >= 0) {
                if (!self.isItem) {
                    self.changeGraphics((theTime / self._timeAll) * 300, self.width / 2);
                }
                self.bgText.text = Math.floor(theTime / 1000) + '';
                if (theTime >= 10000) {
                    if (!self.isItem) {
                        self.redroundBg.source = 'desk_pic_roomstatus_countdown1_png';
                    }
                    self.bgText.font = 'game_share_golden_56_fnt';
                }
                else {
                    if (self.stratCallBack && self.stratThisObj) {
                        if (!(self.num % 10)) {
                            self.stratCallBack.call(self.stratThisObj, (theTime / 1000))
                        }
                        self.num++;
                    }
                    if (!self.isItem) {
                        self.redroundBg.source = 'desk_pic_roomstatus_countdown2_png';
                    }
                    self.bgText.font = 'game_share_red_56_fnt';
                }
            }
            else {
                if (self.interval) {
                    clearInterval(self.interval);
                    self.interval = null;
                }
                self.num = 0;
                self.startPayOut();
            }
        }

        private changeGraphics(angle, r)
        {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0xff0000);
            this.shape.graphics.moveTo(r, r);
            this.shape.graphics.lineTo(r, r * 2);
            //  圆弧活动范围 60 >> -240
            this.shape.graphics.drawArc(r, r, r, Math.PI / 180 * (angle - 240), Math.PI / 180 * 120, true);
            this.shape.graphics.lineTo(r, r);
            this.shape.graphics.endFill();
        }

        /** 创建派彩 */
        private createPayout()
        {
            this.hiddenAll();
            if (!this.isItem) {
                if (!this.payOutdBg) {
                    // menu_pic_shuffle
                    this.payOutdBg = new eui.Image();
                    this.payOutdBg.source = 'desk_pic_count_png';
                    this.payOutdBg.width = this.width - 50;
                    this.payOutdBg.height = this.height - 50;
                    this.payOutdBg.top = 25;
                    this.payOutdBg.left = 25;
                    this.addChild(this.payOutdBg);
                }
                else {
                    this.payOutdBg.source = 'desk_pic_count_png';
                    this.payOutdBg.visible = true;
                }
            }
            else {
                if (!this.payOutdBg) {
                    this.payOutdBg = new eui.Image();
                    this.payOutdBg.source = 'desk_pic_count_png';
                    // this.payOutdBg.width = this.width;
                    // this.payOutdBg.height = this.height;
                    this.payOutdBg.width = this.width - 10;
                    this.payOutdBg.height = this.height - 10;
                    this.payOutdBg.top = 5;
                    this.payOutdBg.left = 5;
                    this.addChild(this.payOutdBg);
                }
                else {
                    this.payOutdBg.source = 'desk_pic_count_png';
                    this.payOutdBg.visible = true;
                }
            }

        }

        /** 创建洗牌 */
        private createShuffle()
        {
            this.hiddenAll();
            if (!this.isItem) {
                if (!this.payOutdBg) {
                    this.payOutdBg = new eui.Image();
                    this.payOutdBg.source = 'desk_pic_shuffle_png';
                    this.payOutdBg.width = this.width - 50;
                    this.payOutdBg.height = this.height - 50;
                    this.payOutdBg.top = 25;
                    this.payOutdBg.left = 25;
                    this.addChild(this.payOutdBg);
                }
                else {
                    this.payOutdBg.source = 'desk_pic_shuffle_png';
                    this.payOutdBg.visible = true;
                }
            }
            else {
                if (!this.payOutdBg) {
                    this.payOutdBg = new eui.Image();
                    this.payOutdBg.source = 'desk_pic_shuffle_png';
                    this.payOutdBg.width = this.width;
                    this.payOutdBg.height = this.height;
                    this.addChild(this.payOutdBg);
                }
                else {
                    this.payOutdBg.source = 'desk_pic_shuffle_png';
                    this.payOutdBg.width = this.width;
                    this.payOutdBg.height = this.height - 10;
                    this.payOutdBg.visible = true;

                }
            }

        }

        /** 隐藏其他所有元素,除了背景 */
        private hiddenAll()
        {
            if (this.roundBg) {
                this.roundBg.visible = false;
            }
            if (this.redroundBg) {
                this.redroundBg.visible = false;
            }
            if (this.bgText) {
                this.bgText.visible = false;
            }
            if (this.payOutdBg) {
                this.payOutdBg.visible = false;
            }
        }

        /** 重新开始新一轮计时 */
        public startTime(timeAll: number, overTime: number)
        {
            if (overTime && timeAll) {
                this._timeAll = timeAll;
                this._overTime = overTime;
            }
            this.createCountdown();
        }

        /** 切换到派彩 */
        public startPayOut()
        {
            this.createPayout();
        }

        /** 切换到洗牌 */
        public startShuffle()
        {
            this.createShuffle();
        }

        /** 设置倒计时剩余10秒的回调（会把剩余时间传入,每隔一秒调用） */
        public setStratCallBack(stratCallBack: any, stratThisObj: any)
        {
            this.stratCallBack = stratCallBack;
            this.stratThisObj = stratThisObj;
        }

        /**释放资源 */
        public dispose()
        {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
            this.stratCallBack = null;
            this.stratThisObj = null;
            this.removeChildren();
        }

    }
}
