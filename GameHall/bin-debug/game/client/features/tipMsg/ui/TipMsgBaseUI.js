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
    var TipMsgBaseUI = (function (_super) {
        __extends(TipMsgBaseUI, _super);
        function TipMsgBaseUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.skinName = game.SystemPath.skin_path + "tipMsg/tipMsgSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        TipMsgBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.setBtns(this.data.confirmText, this.data.cancelText);
            this.setMsg(this.data.msg);
            this.setTitle(this.data.title);
            if (game.GlobalConfig.isMobile) {
                game.CTweenManagerController.getInstance().startCTween(3, [this.joinGroupBgd, this.tipGroup], true);
            }
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        TipMsgBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case TipMsgUICommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        TipMsgBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.knowBtn, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        };
        /** 响应点击事件 */
        TipMsgBaseUI.prototype.onHandleTap = function (event) {
            var thisObj = this.data.thisObj;
            switch (event.target) {
                case this.cancelBtn:
                    this.callBack = this.data.cancelCallBack;
                    if (game.GlobalConfig.isMobile) {
                        game.CTweenManagerController.getInstance().startCTween(3, [this.joinGroupBgd, this.tipGroup], false, this.closeCallBack, this);
                    }
                    else {
                        this.closeCallBack();
                    }
                    break;
                case this.confirmBtn:
                case this.knowBtn:
                    this.callBack = this.data.comfirmCallBack;
                    if (game.GlobalConfig.isMobile) {
                        game.CTweenManagerController.getInstance().startCTween(3, [this.joinGroupBgd, this.tipGroup], false, this.closeCallBack, this);
                    }
                    else {
                        this.closeCallBack();
                    }
                    break;
            }
        };
        TipMsgBaseUI.prototype.closeCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
            if (this.data.thisObj && this.callBack) {
                this.callBack.call(this.data.thisObj);
            }
            this.callBack = null;
        };
        // ---------------------------------- UI操作 ----------------------------------
        TipMsgBaseUI.prototype.setBtns = function (confirmText, cancelText) {
            this.confirmBtn.label = game.LanguageUtil.translate(confirmText);
            this.knowBtn.label = game.LanguageUtil.translate(confirmText);
            this.cancelBtn.label = game.LanguageUtil.translate(cancelText);
            this.knowBtn.visible = !cancelText;
        };
        TipMsgBaseUI.prototype.setMsg = function (data) {
            var textFlow = [];
            for (var i = 0; i < data.length; i++) {
                textFlow.push({
                    text: data[i].text,
                    style: {
                        textColor: data[i].textColor
                    }
                });
            }
            this.msgLabel.textFlow = textFlow;
            // let h = this.msgLabel.textHeight;
            // if(h>=50){
            //     this.msgLabel.textAlign = "left";
            // }else{
            //     this.msgLabel.textAlign = "center";
            // }
        };
        TipMsgBaseUI.prototype.setTitle = function (data) {
            if (data && data.length && data.length > 0) {
                var textFlow = [];
                for (var i = 0; i < data.length; i++) {
                    textFlow.push({
                        text: data[i].text,
                        style: {
                            textColor: data[i].textColor
                        }
                    });
                }
                this.titleLabel.textFlow = textFlow;
                this.titleLabel.visible = true;
            }
            else {
                this.titleLabel.visible = false;
            }
        };
        // ---------------------------------- dispose ----------------------------------
        TipMsgBaseUI.prototype.dispose = function () {
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return TipMsgBaseUI;
    }(game.BaseUI));
    game.TipMsgBaseUI = TipMsgBaseUI;
    __reflect(TipMsgBaseUI.prototype, "game.TipMsgBaseUI");
})(game || (game = {}));
//# sourceMappingURL=TipMsgBaseUI.js.map