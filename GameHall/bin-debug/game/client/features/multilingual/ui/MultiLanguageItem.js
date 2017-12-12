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
    var MultiLanguageItem = (function (_super) {
        __extends(MultiLanguageItem, _super);
        function MultiLanguageItem() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            _this.skinName = game.SystemPath.skin_path + "multiLanguage/multiLanguageItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.complete, _this);
            return _this;
        }
        /**每次添加到舞台时 初始化 */
        MultiLanguageItem.prototype.onAdd = function () {
            this.mulBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
        };
        /**根据this.data刷新数据 */
        MultiLanguageItem.prototype.dataChanged = function () {
            this.name = this.data;
            if (game.GlobalConfig.isMobile) {
                this.update(this.data);
            }
            else {
                this.updatePC(this.data);
            }
            if (this.data == game.LanguageUtil.local) {
                this.setBtnAble();
            }
        };
        /** UI加载完成*/
        MultiLanguageItem.prototype.complete = function () {
            this.dataChanged();
        };
        /** 刷新*/
        MultiLanguageItem.prototype.update = function (data) {
            if (!data)
                return;
            switch (data) {
                case "zh_cn":
                    this.mulIcon.source = "flag_pic_cn_png";
                    this.mulLabel.text = "简体中文";
                    break;
                case "zh_hk":
                    this.mulIcon.source = "flag_pic_hk_png";
                    this.mulLabel.text = "繁体中文";
                    break;
                case "en_us":
                    this.mulIcon.source = "flag_pic_gb_png";
                    this.mulLabel.text = "English";
                    break;
                case "ko_kr":
                    this.mulIcon.source = "flag_pic_kr_png";
                    this.mulLabel.text = "한국어";
                    break;
                case "th_th":
                    this.mulIcon.source = "flag_pic_th_png";
                    this.mulLabel.text = "ภาษาไทย";
                    break;
                case "vi_vn":
                    this.mulIcon.source = "flag_pic_vn_png";
                    this.mulLabel.text = "";
                    break;
                case "zh_tw":
                    this.mulIcon.source = "flag_pic_tw_png";
                    this.mulLabel.text = "";
                    break;
                case "in_id":
                    this.mulIcon.source = "flag_pic_in_png";
                    this.mulLabel.text = "";
                    break;
                case "ja_jp":
                    this.mulIcon.source = "flag_pic_jp_png";
                    this.mulLabel.text = "";
                    break;
                case "ms_my":
                    this.mulIcon.source = "flag_pic_my_png";
                    this.mulLabel.text = "";
                    break;
            }
        };
        /** 刷新*/
        MultiLanguageItem.prototype.updatePC = function (data) {
            if (!data)
                return;
            switch (data) {
                case "zh_cn":
                    this.mulIcon.source = "flag_pic_cn_pc_png";
                    this.mulLabel.text = "简体中文";
                    break;
                case "zh_hk":
                    this.mulIcon.source = "flag_pic_hk_pc_png";
                    this.mulLabel.text = "繁体中文";
                    break;
                case "en_us":
                    this.mulIcon.source = "flag_pic_gb_pc_png";
                    this.mulLabel.text = "English";
                    break;
                case "ko_kr":
                    this.mulIcon.source = "flag_pic_kr_pc_png";
                    this.mulLabel.text = "한국어";
                    break;
                case "th_th":
                    this.mulIcon.source = "flag_pic_th_pc_png";
                    this.mulLabel.text = "ภาษาไทย";
                    break;
                case "vi_vn":
                    this.mulIcon.source = "flag_pic_vn_pc_png";
                    this.mulLabel.text = "";
                    break;
                case "zh_tw":
                    this.mulIcon.source = "flag_pic_tw_pc_png";
                    this.mulLabel.text = "";
                    break;
                case "in_id":
                    this.mulIcon.source = "flag_pic_in_pc_png";
                    this.mulLabel.text = "";
                    break;
                case "ja_jp":
                    this.mulIcon.source = "flag_pic_jp_pc_png";
                    this.mulLabel.text = "";
                    break;
                case "ms_my":
                    this.mulIcon.source = "flag_pic_my_pc_png";
                    this.mulLabel.text = "";
                    break;
            }
        };
        /** 点击选择*/
        MultiLanguageItem.prototype.touchBtn = function () {
            // this.mulLabel.textColor = 0xE6B973;
            // let str = this.mulLabel.text;
            // this.mulLabel.text = "";
            // this.mulLabel.text = str;
            this.mulBtn.setState = "disabled";
            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCMultiLanguage_Selected, this.data);
        };
        /** 设置按钮置灰状态*/
        MultiLanguageItem.prototype.setBtnDisable = function () {
            this.mulLabel.textColor = 0xc8c8c8;
            // let str = this.mulLabel.text;
            // this.mulLabel.text = "";
            // this.mulLabel.text = str;
            this.mulBtn.setState = "up";
        };
        /** 设置按钮高亮状态*/
        MultiLanguageItem.prototype.setBtnAble = function () {
            this.mulLabel.textColor = 0xE6B973;
            // let str = this.mulLabel.text;
            // this.mulLabel.text = "";
            // this.mulLabel.text = str;
            this.mulBtn.setState = "down";
        };
        /**每次从舞台移除时 清除 */
        MultiLanguageItem.prototype.onRemove = function () {
            this.mulBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
        };
        return MultiLanguageItem;
    }(eui.ItemRenderer));
    game.MultiLanguageItem = MultiLanguageItem;
    __reflect(MultiLanguageItem.prototype, "game.MultiLanguageItem");
})(game || (game = {}));
//# sourceMappingURL=MultiLanguageItem.js.map