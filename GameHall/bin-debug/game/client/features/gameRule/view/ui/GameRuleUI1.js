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
    var GameRuleUI1 = (function (_super) {
        __extends(GameRuleUI1, _super);
        function GameRuleUI1(data) {
            var _this = _super.call(this, data) || this;
            /**变化的高度*/
            _this.changeH = 0;
            _this.skinName = "resource/skins/game_skins/mobile/gameRule/gameRuleSkin.exml";
            return _this;
        }
        // ---------------------------------- 设置文本是否换行 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        GameRuleUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.checkLabel0();
            this.checkLabel1();
            this.checkLabel2();
            // this.checkLabel3();
            // this.checkLabel4();
            this.checkLabel5();
            this.checkLabel6();
        };
        /** groupBasic*/
        /** 判断是否换行*/
        GameRuleUI1.prototype.checkLabel0 = function () {
            this.labelWrap([this.longLabel0], this.groupBasic);
            this.moveDown(this.groupBasic);
        };
        /** groupCard*/
        GameRuleUI1.prototype.checkLabel1 = function () {
            this.labelWrap([this.longLabel1, this.longLabel2], this.groupCard, true, this.longLabelIcon2);
            this.moveDown(this.groupCard);
        };
        /** groupCount*/
        GameRuleUI1.prototype.checkLabel2 = function () {
            this.labelWrap([this.longLabel3, this.longLabel4], this.groupCount, true, this.longLabelIcon4);
            this.moveDown(this.groupCount);
        };
        /** groupResult*/
        GameRuleUI1.prototype.checkLabel3 = function () {
            this.labelWrap([this.longLabel13], this.groupResult);
            this.moveDown(this.groupResult);
        };
        /** groupDouble*/
        GameRuleUI1.prototype.checkLabel4 = function () {
        };
        /** groupThird*/
        GameRuleUI1.prototype.checkLabel5 = function () {
            this.labelWrap([this.longLabel14], this.groupThird);
            this.moveDown(this.groupThird);
        };
        /** groupThird0*/
        GameRuleUI1.prototype.checkLabel6 = function () {
            this.labelWrap([this.longLabel15, this.longLabel16], this.groupThird0);
            this.moveDown(this.groupThird0);
        };
        /** 换行
         * @param laArr 判断的文本的数组
         * @param group 当前Group
         * @param isAdjacent 是否相邻
        */
        GameRuleUI1.prototype.labelWrap = function (labArr, group, isAdjacent, icon) {
            if (isAdjacent === void 0) { isAdjacent = false; }
            var lastH = 0;
            for (var i = 0; i < labArr.length; i++) {
                labArr[i].newlineAble = true;
                //text高度
                var txtH = labArr[i].textHeight;
                //label高度
                var labH = labArr[i].height;
                //判断是否要换行
                if (labH < txtH) {
                    if (isAdjacent && lastH) {
                        this.txtMoveH(labArr[i], lastH);
                        this.iconMoveH(icon, lastH);
                    }
                    labArr[i].height = txtH;
                    var moveH = txtH - labH;
                    lastH = moveH;
                    this.changeH += moveH;
                }
                var str = labArr[i].text;
                labArr[i].text = str;
            }
        };
        /**图标下移*/
        GameRuleUI1.prototype.iconMoveH = function (icon, moveH) {
            icon.top = icon.top + moveH;
        };
        /**文本下移*/
        GameRuleUI1.prototype.txtMoveH = function (txt, moveH) {
            txt.top = txt.top + moveH;
        };
        /**
         * group下移函数
        */
        GameRuleUI1.prototype.moveDown = function (group) {
            switch (group) {
                case this.groupBasic:
                    this.moveH(this.groupBasic, [this.groupCard, this.groupCount, this.groupResult, this.groupDouble, this.groupThird, this.groupThird0]);
                    break;
                case this.groupCard:
                    this.moveH(this.groupCard, [this.groupCount, this.groupResult, this.groupDouble, this.groupThird, this.groupThird0]);
                    break;
                case this.groupCount:
                    this.moveH(this.groupCount, [this.groupResult, this.groupDouble, this.groupThird, this.groupThird0]);
                    break;
                case this.groupResult:
                    this.moveH(this.groupResult, [this.groupDouble, this.groupThird, this.groupThird0]);
                    break;
                case this.groupDouble:
                    this.moveH(this.groupDouble, [this.groupThird, this.groupThird0]);
                    break;
                case this.groupThird:
                    this.moveH(this.groupThird, [this.groupThird0]);
                    break;
                case this.groupThird0:
                    this.moveH(this.groupThird0, []);
                    break;
            }
        };
        /**下移具体操作
         *
        */
        GameRuleUI1.prototype.moveH = function (group, arr) {
            var owerH = group.height;
            group.height = owerH + this.changeH;
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].top = arr[i].top + this.changeH;
                }
            }
        };
        // ---------------------------------- dispose ----------------------------------
        GameRuleUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return GameRuleUI1;
    }(game.GameRuleBaseUI));
    game.GameRuleUI1 = GameRuleUI1;
    __reflect(GameRuleUI1.prototype, "game.GameRuleUI1");
})(game || (game = {}));
//# sourceMappingURL=GameRuleUI1.js.map