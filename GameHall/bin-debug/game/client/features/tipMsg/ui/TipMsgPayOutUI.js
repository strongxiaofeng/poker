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
    /** 派彩 */
    var TipMsgPayOutUI = (function (_super) {
        __extends(TipMsgPayOutUI, _super);
        /**
         * data[payOutN,isWin]
         * data[派彩金额，是否是天生赢家]
        */
        function TipMsgPayOutUI(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.skinName = game.SystemPath.skin_path + "tipMsg/tipMsgPayOutSkin.exml";
            return _this;
        }
        TipMsgPayOutUI.prototype.initSetting = function () {
            this.isWin();
            this.payOutN();
            this.payOutCTween();
        };
        TipMsgPayOutUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
        };
        /**是否是天生赢家*/
        TipMsgPayOutUI.prototype.isWin = function () {
            this.isWinnerGroup.visible = this.data[1];
        };
        /**派彩金额*/
        TipMsgPayOutUI.prototype.payOutN = function () {
            if (this.data[0] > 0) {
                this.payOutNum.text = game.NumberUtil.getSplitNumStr(this.data[0]);
            }
            else {
                game.MediatorManager.closeMediator(game.Mediators.Mediator_TipPayOut.name);
            }
        };
        /**派彩动画*/
        TipMsgPayOutUI.prototype.payOutCTween = function () {
            var y0 = 144;
            var y3 = 152;
            for (var i = 0; i < 7; i++) {
                if (i < 3) {
                    this["payOutImg" + i].y = y0 - i * 18.5;
                }
                else {
                    this["payOutImg" + i].y = y3 - (i - 3) * 18.5;
                }
            }
            this.payOutBg.visible = false;
            this.payOutTxtGroup.visible = false;
            this.payOutBg.alpha = 0.01;
            this.payOutTxtGroup.alpha = 0.01;
            for (var i = 0; i < 7; i++) {
                this["payOutImg" + i].visible = false;
                this["payOutImg" + i].y = this["payOutImg" + i].y - 150;
                this["payOutImg" + i].rotation = 0;
                this["payOutImg" + i].anchorOffsetX = 50;
                this["payOutImg" + i].anchorOffsetY = 50;
            }
            var index = 0;
            this.showChipMove(index);
        };
        TipMsgPayOutUI.prototype.showChipMove = function (index) {
            var _this = this;
            if (index < 7) {
                this["payOutImg" + index].visible = true;
                if (index == 2 || index == 6) {
                    game.CTween.get(this["payOutImg" + index]).to({ y: this["payOutImg" + index].y + 150 }, 200)
                        .to({ rotation: -10 }, 50)
                        .to({ rotation: 10 }, 50)
                        .to({ rotation: -10 }, 50)
                        .to({ rotation: 10 }, 50)
                        .to({ rotation: 0 }, 50)
                        .call(function () {
                        index++;
                        _this.showChipMove(index);
                    });
                }
                else {
                    game.CTween.get(this["payOutImg" + index]).to({ y: this["payOutImg" + index].y + 150 }, 200)
                        .call(function () {
                        index++;
                        _this.showChipMove(index);
                    });
                }
            }
            else if (index == 7) {
                this.payOutBg.visible = true;
                this.payOutTxtGroup.visible = true;
                game.CTween.get(this.payOutTxtGroup).to({ alpha: 1 }, 1000);
                game.CTween.get(this.payOutBg).to({ alpha: 1 }, 1000);
            }
            else {
                return;
            }
        };
        TipMsgPayOutUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.CTween.removeTweens(this);
        };
        return TipMsgPayOutUI;
    }(game.BaseUI));
    game.TipMsgPayOutUI = TipMsgPayOutUI;
    __reflect(TipMsgPayOutUI.prototype, "game.TipMsgPayOutUI");
})(game || (game = {}));
//# sourceMappingURL=TipMsgPayOutUI.js.map