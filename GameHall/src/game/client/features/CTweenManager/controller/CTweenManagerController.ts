module game
{
    export class CTweenManagerController
    {

        private static instance: CTweenManagerController;
        public static getInstance(): CTweenManagerController
        {
            if (this.instance == null) {
                this.instance = new CTweenManagerController();
            }
            return this.instance;
        }

        private groups: Dictionary;
        public constructor()
        {
            this.initDtoListener();
            this.groups = new Dictionary();
        }


        /**开始某一段动画
         * @param type {number} 使用第几个动画，具体请看下方的说明
         * @param groupArr {Array<any>} 需要操作的显示对象，是一个数组
         * @param isStart {boolean} 是开始动画还是结束动画，结束动画是反序消失,默认是true开始动画
         * @param callBack {any} 动画结束后的回调
         * @param thisObj {any} 回调所使用的this对象
         */
        public startCTween(type: number, groupArr: Array<any>, isStart: boolean = true, callBack?: Function, thisObj?: any)
        {
            {
                switch (type) {
                    case 1:
                        this.oneCallBack = callBack;
                        this.oneThisObj = thisObj;
                        this.oneCTween(groupArr[0], groupArr[1], isStart);
                        break;
                    case 2:
                        this.twoCallBack = callBack;
                        this.twoThisObj = thisObj;
                        this.twoCTween(groupArr[0], 3 ,isStart);
                        break;
                    case 3:
                        this.threeCallBack = callBack;
                        this.threeThisObj = thisObj;
                        this.threeCTween(groupArr[0], groupArr[1], isStart);
                        break;
                    case 4:
                        this.fourCallBack = callBack;
                        this.fourThisObj = thisObj;
                        this.fourCTween(groupArr[0], groupArr[1], isStart);
                        break;
                    case 5:
                        this.fiveCallBack = callBack;
                        this.fiveThisObj = thisObj;
                        this.fiveCTween(groupArr[0], isStart, groupArr[1]);
                        break;
                    case 6:
                        this.sixCallBack = callBack;
                        this.sixThisObj = thisObj;
                        this.sixCTween(groupArr[0], isStart);
                        break;
                }
            }
        }
        private oneCallBack: any;
        private oneThisObj: any;
        /** 动画1
         * 出现：大小由0%变到120%，透明度从0%变成100%，然后变成100%
         * 不等待手动关闭
         * 关闭：大小从100%变到0%，透明度从100%变到0%
         */
        private oneCTween(group: eui.Group, group2: eui.Group, isStart: boolean)
        {
            CTween.removeTweens(group);
            CTween.removeTweens(group2);
            if (isStart) {
                group.visible = true;
                group2.visible = false;
                group.alpha = 0;
                CTween.get(group)
                    .to({ alpha: 1 }, 200)
                    .call(() =>
                    {
                        CTween.removeTweens(group);
                        group2.visible = true;
                        group2.alpha = 0;
                        group2.scaleX = 0;
                        group2.scaleY = 0;
                    });
                CTween.get(group2)
                    .wait(200)
                    .to({ alpha: 0.8, scaleX: 1.1, scaleY: 1.1, }, 500)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1, }, 300)
                    .call(() =>
                    {
                        CTween.removeTweens(group2);
                        if (this.oneCallBack && this.oneThisObj) {
                            this.oneCallBack.call(this.oneThisObj);
                            this.oneCallBack = null;
                            this.oneThisObj = null;
                        }
                    });
            } else {
                CTween.get(group)
                    .wait(500)
                    .to({ alpha: 0 }, 200)
                    .call(() =>
                    {
                        CTween.removeTweens(group);
                        group.visible = false;
                    });
                CTween.get(group2)
                    .to({ alpha: 0, scaleX: 0, scaleY: 0, }, 500)
                    .call(() =>
                    {
                        CTween.removeTweens(group2);
                        group2.visible = false;
                        if (this.oneCallBack && this.oneThisObj) {
                            this.oneCallBack.call(this.oneThisObj);
                            this.oneCallBack = null;
                            this.oneThisObj = null;
                        }
                    });
            }
        }

        private twoCallBack: any;
        private twoThisObj: any;
        /** 动画2
         * 出现：大小由0%变到120%，透明度从0%变成100%，然后变成100%
         * 等待3秒自动关闭
         * 关闭：大小从100%变到0%，透明度从100%变到0%
         */
        private twoCTween(group: eui.Group, waitTime: number,isStart:boolean)
        {
            CTween.removeTweens(group);
            if(isStart){
                group.visible = true;
                group.scaleX = 0;
                group.scaleY = 0;
                group.alpha = 0;
                CTween.get(group)
                    .to({ alpha: 0.8, scaleX: 1.1, scaleY: 1.1, }, 500)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1, }, 300)
                    .wait(waitTime * 1000)
                    .to({ alpha: 0 }, 500)
                    .call(() =>
                    {
                        CTween.removeTweens(group);
                        group.visible = false;
                        if (this.twoCallBack && this.twoThisObj){
                            this.twoCallBack.call(this.twoThisObj);
                            this.twoCallBack = null;
                            this.twoThisObj = null;
                        }
                    });
            }else{
                CTween.removeTweens(group);
                group.visible = false;
                if (this.twoCallBack && this.twoThisObj){
                    this.twoCallBack.call(this.twoThisObj);
                    this.twoCallBack = null;
                    this.twoThisObj = null;
                }
            }
        }

        private threeCallBack: any;
        private threeThisObj: any;
        /** 动画3
         * 出现：黄色蒙版透明度从0%变到100%，然后弹窗从屏幕下方滑入
         * 关闭：弹窗向下划出屏幕，然后黄色蒙版透明度从100%变到0%
         * @param group1{any} 需要控制的背景UI组件
         * @param group2{any} 需要滑入划出的UI组件
         * @param isStart{boolean} 是开始动画还是结束动画
         */
        private threeCTween(group1: any, group2: any, isStart: boolean = true, bott?: number)
        {
            {
                if (!group1 || !group2) return;
                CTween.removeTweens(group1);
                CTween.removeTweens(group2);
                if (isStart) {
                    group1.alpha = 0;
                    group2.bottom = -group2.height;
                    CTween.get(group1)
                        .to({ alpha: 1 }, 200)
                        .call(() =>
                        {
                            CTween.removeTweens(group1)
                            CTween.get(group2)
                                .to({ bottom: bott ? bott : 0 }, 500)
                                .call(() =>
                                {
                                    CTween.removeTweens(group2);
                                    if (this.threeCallBack && this.threeThisObj) {
                                        this.threeCallBack.call(this.threeThisObj);
                                        this.threeCallBack = null;
                                        this.threeThisObj = null;
                                    }
                                })
                        })
                }
                else {
                    group1.alpha = 1;
                    group2.bottom = 0;
                    CTween.get(group2)
                        .to({ bottom: -group2.height }, 500)
                        .call(() =>
                        {
                            CTween.removeTweens(group2)
                            CTween.get(group1)
                                .to({ alpha: 0 }, 200)
                                .call(() =>
                                {
                                    CTween.removeTweens(group1)
                                    if (this.threeCallBack && this.threeThisObj) {
                                        this.threeCallBack.call(this.threeThisObj);
                                        this.threeCallBack = null;
                                        this.threeThisObj = null;
                                    }
                                })
                        })
                }
            }
        }

        private fourCallBack: any;
        private fourThisObj: any;
        /** 动画4
         * 出现：黄色蒙版透明度从0%变到100%，然后弹窗从屏幕右边滑入
         * 关闭：弹窗向右划出屏幕，然后黄色蒙版透明度从100%变到0%
         * @param group1{eui.Image} 需要控制的背景UI组件
         * @param group2{eui.Group} 需要滑入划出的UI组件
         * @param isStart{boolean} 是开始动画还是结束动画
         */
        private fourCTween(group1: eui.Image, group2: eui.Group, isStart: boolean = true)
        {
            {
                if (!group1 || !group2) return;
                CTween.removeTweens(group1);
                CTween.removeTweens(group2);
                if (isStart) {
                    group1.alpha = 0;
                    group2.right = -group2.width;
                    CTween.get(group1)
                        .to({ alpha: 1 }, 200)
                        .call(() =>
                        {
                            CTween.removeTweens(group1)
                            CTween.get(group2)
                                .to({ right: 0 }, 500)
                                .call(() =>
                                {
                                    CTween.removeTweens(group2);
                                    if (this.fourCallBack && this.fourThisObj) {
                                        this.fourCallBack.call(this.fourThisObj);
                                        this.fourCallBack = null;
                                        this.fourThisObj = null;
                                    }
                                })
                        })
                }
                else {
                    group1.alpha = 1;
                    group2.right = 0;
                    CTween.get(group2)
                        .to({ right: -group2.width }, 500)
                        .call(() =>
                        {
                            CTween.removeTweens(group2)
                            CTween.get(group1)
                                .to({ alpha: 0 }, 200)
                                .call(() =>
                                {
                                    CTween.removeTweens(group1)
                                    if (this.fourCallBack && this.fourThisObj) {
                                        this.fourCallBack.call(this.fourThisObj);
                                        this.fourCallBack = null;
                                        this.fourThisObj = null;
                                    }
                                })
                        })
                }
            }
        }
        private fiveCallBack: any;
        private fiveThisObj: any;
        /**动画5
         * 出现:向下滑出
         * 关闭：向上收回
         * @param isOpen 是否打开
        */
        private fiveCTween(group: eui.Group, isOpen: boolean, img: eui.Image): void
        {
            let groupY = group.y;
            let move = groupY - group.height;
            // img.y = groupY;
            img.visible = true;
            img.height = group.height;
            group.mask = img;
            CTween.removeTweens(group);
            if (isOpen) {
                group.visible = true;
                group.y = move;
                CTween.get(group)
                    .to({ y: groupY }, 500)
                    .call(() =>
                    {
                        CTween.removeTweens(group);
                        if (this.fiveCallBack && this.fiveThisObj) {
                            this.fiveCallBack.call(this.fiveThisObj);
                            this.fiveCallBack = null;
                            this.fiveThisObj = null;
                        }
                    });
            } else {
                CTween.get(group)
                    .to({ y: move }, 500)
                    .call(() =>
                    {
                        CTween.removeTweens(group);
                        group.visible = false;
                        group.y = groupY;
                        img.visible = false;
                        img.height = 0;
                        if (this.fiveCallBack && this.fiveThisObj) {
                            this.fiveCallBack.call(this.fiveThisObj);
                            this.fiveCallBack = null;
                            this.fiveThisObj = null;
                        }
                    });
            }
        }
        private sixCallBack: any;
        private sixThisObj: any;
        /**动画6
         * 打开：渐现
        */
        private sixCTween(group: eui.Group, isOpen: boolean): void
        {
            CTween.removeTweens(group);
            if (isOpen) {
                group.visible = true;
                group.alpha = 0;
                CTween.get(group)
                    .to({ alpha: 1 }, 1000)
                    .call(() =>
                    {
                        CTween.removeTweens(group);
                        if (this.sixCallBack && this.sixThisObj) {
                            this.sixCallBack.call(this.sixThisObj);
                            this.sixCallBack = null;
                            this.sixThisObj = null;
                        }
                    })
            } else {
                CTween.get(group)
                    .to({ alpha: 0 }, 1000)
                    .call(() =>
                    {
                        group.visible = false;
                        CTween.removeTweens(group);
                        if (this.sixCallBack && this.sixThisObj) {
                            this.sixCallBack.call(this.sixThisObj);
                            this.sixCallBack = null;
                            this.sixThisObj = null;
                        }
                    })
            }
        }
        /** 结束当前页面的所有动画 */
        public endAllCTween()
        {
            
        }

        private initDtoListener(): void
        {
            // // this.topicManager.addSocketListener(TopicType.baccarat, this.onBaccInfo, this);
            // this.topicManager.addSocketListener(TopicType.baccarat_desk, this.onBaccDesk, this);
            // this.topicManager.addSocketListener(TopicType.baccarat_statistics, this.onStatistics, this);
        }

    }
}