var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var CTweenManagerController = (function () {
        function CTweenManagerController() {
            this.initDtoListener();
            this.groups = new game.Dictionary();
        }
        CTweenManagerController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new CTweenManagerController();
            }
            return this.instance;
        };
        /**开始某一段动画
         * @param type {number} 使用第几个动画，具体请看下方的说明
         * @param groupArr {Array<any>} 需要操作的显示对象，是一个数组
         * @param isStart {boolean} 是开始动画还是结束动画，结束动画是反序消失,默认是true开始动画
         * @param callBack {any} 动画结束后的回调
         * @param thisObj {any} 回调所使用的this对象
         */
        CTweenManagerController.prototype.startCTween = function (type, groupArr, isStart, callBack, thisObj) {
            if (isStart === void 0) { isStart = true; }
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
                        this.twoCTween(groupArr[0], 3, isStart);
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
        };
        /** 动画1
         * 出现：大小由0%变到120%，透明度从0%变成100%，然后变成100%
         * 不等待手动关闭
         * 关闭：大小从100%变到0%，透明度从100%变到0%
         */
        CTweenManagerController.prototype.oneCTween = function (group, group2, isStart) {
            var _this = this;
            game.CTween.removeTweens(group);
            game.CTween.removeTweens(group2);
            if (isStart) {
                group.visible = true;
                group2.visible = false;
                group.alpha = 0;
                game.CTween.get(group)
                    .to({ alpha: 1 }, 200)
                    .call(function () {
                    game.CTween.removeTweens(group);
                    group2.visible = true;
                    group2.alpha = 0;
                    group2.scaleX = 0;
                    group2.scaleY = 0;
                });
                game.CTween.get(group2)
                    .wait(200)
                    .to({ alpha: 0.8, scaleX: 1.1, scaleY: 1.1, }, 500)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1, }, 300)
                    .call(function () {
                    game.CTween.removeTweens(group2);
                    if (_this.oneCallBack && _this.oneThisObj) {
                        _this.oneCallBack.call(_this.oneThisObj);
                        _this.oneCallBack = null;
                        _this.oneThisObj = null;
                    }
                });
            }
            else {
                game.CTween.get(group)
                    .wait(500)
                    .to({ alpha: 0 }, 200)
                    .call(function () {
                    game.CTween.removeTweens(group);
                    group.visible = false;
                });
                game.CTween.get(group2)
                    .to({ alpha: 0, scaleX: 0, scaleY: 0, }, 500)
                    .call(function () {
                    game.CTween.removeTweens(group2);
                    group2.visible = false;
                    if (_this.oneCallBack && _this.oneThisObj) {
                        _this.oneCallBack.call(_this.oneThisObj);
                        _this.oneCallBack = null;
                        _this.oneThisObj = null;
                    }
                });
            }
        };
        /** 动画2
         * 出现：大小由0%变到120%，透明度从0%变成100%，然后变成100%
         * 等待3秒自动关闭
         * 关闭：大小从100%变到0%，透明度从100%变到0%
         */
        CTweenManagerController.prototype.twoCTween = function (group, waitTime, isStart) {
            var _this = this;
            game.CTween.removeTweens(group);
            if (isStart) {
                group.visible = true;
                group.scaleX = 0;
                group.scaleY = 0;
                group.alpha = 0;
                game.CTween.get(group)
                    .to({ alpha: 0.8, scaleX: 1.1, scaleY: 1.1, }, 500)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1, }, 300)
                    .wait(waitTime * 1000)
                    .to({ alpha: 0 }, 500)
                    .call(function () {
                    game.CTween.removeTweens(group);
                    group.visible = false;
                    if (_this.twoCallBack && _this.twoThisObj) {
                        _this.twoCallBack.call(_this.twoThisObj);
                        _this.twoCallBack = null;
                        _this.twoThisObj = null;
                    }
                });
            }
            else {
                game.CTween.removeTweens(group);
                group.visible = false;
                if (this.twoCallBack && this.twoThisObj) {
                    this.twoCallBack.call(this.twoThisObj);
                    this.twoCallBack = null;
                    this.twoThisObj = null;
                }
            }
        };
        /** 动画3
         * 出现：黄色蒙版透明度从0%变到100%，然后弹窗从屏幕下方滑入
         * 关闭：弹窗向下划出屏幕，然后黄色蒙版透明度从100%变到0%
         * @param group1{any} 需要控制的背景UI组件
         * @param group2{any} 需要滑入划出的UI组件
         * @param isStart{boolean} 是开始动画还是结束动画
         */
        CTweenManagerController.prototype.threeCTween = function (group1, group2, isStart, bott) {
            var _this = this;
            if (isStart === void 0) { isStart = true; }
            {
                if (!group1 || !group2)
                    return;
                game.CTween.removeTweens(group1);
                game.CTween.removeTweens(group2);
                if (isStart) {
                    group1.alpha = 0;
                    group2.bottom = -group2.height;
                    game.CTween.get(group1)
                        .to({ alpha: 1 }, 200)
                        .call(function () {
                        game.CTween.removeTweens(group1);
                        game.CTween.get(group2)
                            .to({ bottom: bott ? bott : 0 }, 500)
                            .call(function () {
                            game.CTween.removeTweens(group2);
                            if (_this.threeCallBack && _this.threeThisObj) {
                                _this.threeCallBack.call(_this.threeThisObj);
                                _this.threeCallBack = null;
                                _this.threeThisObj = null;
                            }
                        });
                    });
                }
                else {
                    group1.alpha = 1;
                    group2.bottom = 0;
                    game.CTween.get(group2)
                        .to({ bottom: -group2.height }, 500)
                        .call(function () {
                        game.CTween.removeTweens(group2);
                        game.CTween.get(group1)
                            .to({ alpha: 0 }, 200)
                            .call(function () {
                            game.CTween.removeTweens(group1);
                            if (_this.threeCallBack && _this.threeThisObj) {
                                _this.threeCallBack.call(_this.threeThisObj);
                                _this.threeCallBack = null;
                                _this.threeThisObj = null;
                            }
                        });
                    });
                }
            }
        };
        /** 动画4
         * 出现：黄色蒙版透明度从0%变到100%，然后弹窗从屏幕右边滑入
         * 关闭：弹窗向右划出屏幕，然后黄色蒙版透明度从100%变到0%
         * @param group1{eui.Image} 需要控制的背景UI组件
         * @param group2{eui.Group} 需要滑入划出的UI组件
         * @param isStart{boolean} 是开始动画还是结束动画
         */
        CTweenManagerController.prototype.fourCTween = function (group1, group2, isStart) {
            var _this = this;
            if (isStart === void 0) { isStart = true; }
            {
                if (!group1 || !group2)
                    return;
                game.CTween.removeTweens(group1);
                game.CTween.removeTweens(group2);
                if (isStart) {
                    group1.alpha = 0;
                    group2.right = -group2.width;
                    game.CTween.get(group1)
                        .to({ alpha: 1 }, 200)
                        .call(function () {
                        game.CTween.removeTweens(group1);
                        game.CTween.get(group2)
                            .to({ right: 0 }, 500)
                            .call(function () {
                            game.CTween.removeTweens(group2);
                            if (_this.fourCallBack && _this.fourThisObj) {
                                _this.fourCallBack.call(_this.fourThisObj);
                                _this.fourCallBack = null;
                                _this.fourThisObj = null;
                            }
                        });
                    });
                }
                else {
                    group1.alpha = 1;
                    group2.right = 0;
                    game.CTween.get(group2)
                        .to({ right: -group2.width }, 500)
                        .call(function () {
                        game.CTween.removeTweens(group2);
                        game.CTween.get(group1)
                            .to({ alpha: 0 }, 200)
                            .call(function () {
                            game.CTween.removeTweens(group1);
                            if (_this.fourCallBack && _this.fourThisObj) {
                                _this.fourCallBack.call(_this.fourThisObj);
                                _this.fourCallBack = null;
                                _this.fourThisObj = null;
                            }
                        });
                    });
                }
            }
        };
        /**动画5
         * 出现:向下滑出
         * 关闭：向上收回
         * @param isOpen 是否打开
        */
        CTweenManagerController.prototype.fiveCTween = function (group, isOpen, img) {
            var _this = this;
            var groupY = group.y;
            var move = groupY - group.height;
            // img.y = groupY;
            img.visible = true;
            img.height = group.height;
            group.mask = img;
            game.CTween.removeTweens(group);
            if (isOpen) {
                group.visible = true;
                group.y = move;
                game.CTween.get(group)
                    .to({ y: groupY }, 500)
                    .call(function () {
                    game.CTween.removeTweens(group);
                    if (_this.fiveCallBack && _this.fiveThisObj) {
                        _this.fiveCallBack.call(_this.fiveThisObj);
                        _this.fiveCallBack = null;
                        _this.fiveThisObj = null;
                    }
                });
            }
            else {
                game.CTween.get(group)
                    .to({ y: move }, 500)
                    .call(function () {
                    game.CTween.removeTweens(group);
                    group.visible = false;
                    group.y = groupY;
                    img.visible = false;
                    img.height = 0;
                    if (_this.fiveCallBack && _this.fiveThisObj) {
                        _this.fiveCallBack.call(_this.fiveThisObj);
                        _this.fiveCallBack = null;
                        _this.fiveThisObj = null;
                    }
                });
            }
        };
        /**动画6
         * 打开：渐现
        */
        CTweenManagerController.prototype.sixCTween = function (group, isOpen) {
            var _this = this;
            game.CTween.removeTweens(group);
            if (isOpen) {
                group.visible = true;
                group.alpha = 0;
                game.CTween.get(group)
                    .to({ alpha: 1 }, 1000)
                    .call(function () {
                    game.CTween.removeTweens(group);
                    if (_this.sixCallBack && _this.sixThisObj) {
                        _this.sixCallBack.call(_this.sixThisObj);
                        _this.sixCallBack = null;
                        _this.sixThisObj = null;
                    }
                });
            }
            else {
                game.CTween.get(group)
                    .to({ alpha: 0 }, 1000)
                    .call(function () {
                    group.visible = false;
                    game.CTween.removeTweens(group);
                    if (_this.sixCallBack && _this.sixThisObj) {
                        _this.sixCallBack.call(_this.sixThisObj);
                        _this.sixCallBack = null;
                        _this.sixThisObj = null;
                    }
                });
            }
        };
        /** 结束当前页面的所有动画 */
        CTweenManagerController.prototype.endAllCTween = function () {
        };
        CTweenManagerController.prototype.initDtoListener = function () {
            // // this.topicManager.addSocketListener(TopicType.baccarat, this.onBaccInfo, this);
            // this.topicManager.addSocketListener(TopicType.baccarat_desk, this.onBaccDesk, this);
            // this.topicManager.addSocketListener(TopicType.baccarat_statistics, this.onStatistics, this);
        };
        return CTweenManagerController;
    }());
    game.CTweenManagerController = CTweenManagerController;
    __reflect(CTweenManagerController.prototype, "game.CTweenManagerController");
})(game || (game = {}));
//# sourceMappingURL=CTweenManagerController.js.map