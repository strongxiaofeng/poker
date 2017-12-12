module game {

    export class PCBgUI extends BgBaseUI {

        public constructor() {
            super();
        }

        // spinImg1 - spinImg16

        // 1080/2 = 540

        // 1920/3 = 640

        protected stepObj: {};

        protected len: number;

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            this.stepObj = {};
            this.len = 800;
            this.startMove();
        }

        protected startMove(): void {
            for (let i = 1; i <= 16; i++) {
                if (i <= 10) {
                    this.stepObj[`step${i}`] = Math.round((Math.random() - 1) * this.len / 10 + i * this.len / 10);
                } else {
                    this.stepObj[`step${i}`] = Math.round((Math.random() - 1) * this.len / 10 + (i - 10) * this.len / 4);
                }
                this.initStepObj(i);
                this.intervalObj[`move${i}`] = setInterval((i) => {
                    if (this.stepObj[`step${i}`] >= this.len) {
                        this.initStepObj(i);
                        this.stepObj[`step${i}`] = 0;
                    }
                    this.moveImg(i,
                        this.stepObj[`scaleX${i}`],
                        this.stepObj[`offX${i}`],
                        this.stepObj[`offY${i}`],
                        this.stepObj[`step${i}`]
                    );
                    this.stepObj[`step${i}`]++;
                }, 30, i);
            }
        }

        protected initStepObj(i: number): void {
            this.stepObj[`scaleX${i}`] = Math.random() * 0.6 + 0.8;
            this.stepObj[`offX${i}`] = Math.random() * 120 - 60;
            this.stepObj[`offY${i}`] = Math.random() * 120 - 60;
            this.stepObj[`spin${i}`] = Math.round(Math.random()) * 2 - 1;
        }

        /** 让每一个小图标沿着曲线轨迹移动 */
        protected moveImg(index: number, scaleX: number, offX: number, offY: number, step: number): void {
            let img: eui.Image = this[`spinImg${index}`];
            let arc, x, y;
            if (index <= 10) {
                img.alpha = (this.len - step) / this.len;
                img.scaleX = ((this.len - step) / this.len) * 0.8 + 0.3;
                img.scaleY = ((this.len - step) / this.len) * 0.8 + 0.3;
                arc = (0.75 * Math.PI / 2) * ((this.len - step) / this.len);
                x = 1920 - (step / this.len) * (1920 / 4) * scaleX;
                y = 1080 - 1080 * Math.tan(arc) / 2.4;
            } else {
                img.alpha = step / this.len;
                img.scaleX = (step / this.len) * 0.8 + 0.3;
                img.scaleY = (step / this.len) * 0.8 + 0.3;
                arc = (step / this.len) * (Math.PI / 2);
                x = (step / this.len) * (scaleX * 1920 / 3);
                y = (1080 / 2) - Math.sin(arc) * (1080 / 2);
            }
            img.x = x + offX;
            img.y = y + offY;
            img.rotation = (img.rotation + this.stepObj[`spin${index}`]) % 360;
        }

        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        public onStageResize(evt: egret.Event): void {
            super.onStageResize(evt);
        }

        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void {
            super.dispose();
        }

    }
}