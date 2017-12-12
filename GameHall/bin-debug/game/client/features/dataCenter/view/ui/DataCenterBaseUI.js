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
    var DataCenterBaseUI = (function (_super) {
        __extends(DataCenterBaseUI, _super);
        function DataCenterBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "dataCenter/dataCenterSkin.exml";
            return _this;
        }
        // ---------------------------------- 变量声明 ----------------------------------
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        DataCenterBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        DataCenterBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case DataCenterUICommands.initListener:
                    this.initListener(params);
                    break;
                case DataCenterUICommands.setClubIcon:
                    this.setClubIcon(params);
                    break;
                case DataCenterUICommands.setClubData:
                    this.setClubData(params);
                    break;
                case DataCenterUICommands.setBtnState:
                    this.setBtnState();
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        DataCenterBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.btnRealTime, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnBetRecord, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnQuotaRecord, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        };
        /** 响应点击事件 */
        DataCenterBaseUI.prototype.onHandleTap = function (event) {
        };
        // ---------------------------------- UI操作 ----------------------------------
        /** 设置俱乐部图标
         * @param url {string} 俱乐部图标URL
         */
        DataCenterBaseUI.prototype.setClubIcon = function (url) {
            var _this = this;
            if (url) {
                var ip = game.GlobalConfig.defaultIP;
                if (ip[ip.length - 1] == '/') {
                    ip = ip.slice(0, ip.length - 1);
                }
                if (url[0] == '/') {
                    url = url.slice(1);
                }
                var fullUrl = "http:" + ip + "/" + url + ("?" + new Date().getTime());
                com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                    _this.imgClubIcon.visible = true;
                    _this.imgClubIcon.source = data;
                    _this.imgClubIcon.mask = _this.maskClubIcon;
                }, this, com.ResourceItem.TYPE_IMAGE);
            }
            else {
                this.imgClubIcon.mask = null;
                this.maskClubIcon.$maskedObject = null;
                this.imgClubIcon.visible = false;
            }
        };
        /** 设置俱乐部数据 */
        DataCenterBaseUI.prototype.setClubData = function (data) {
            this.labelProfit.text = game.NumberUtil.getSplitNumStr(data.profit || 0, 3);
            this.labelBet.text = game.NumberUtil.getSplitNumStr(data.bet || 0, 3);
            this.labelTime.text = game.NumberUtil.getSplitNumStr(data.time * 100 || 0, 3);
            this.labelChip.text = game.NumberUtil.getSplitNumStr(data.chip || 0, 3);
            this.labelCard.text = game.NumberUtil.getSplitNumStr(Math.abs(data.card) * 100 || 0, 3);
        };
        /** 设置按钮样式 */
        DataCenterBaseUI.prototype.setBtnState = function () {
        };
        // ---------------------------------- dispose ----------------------------------
        DataCenterBaseUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return DataCenterBaseUI;
    }(game.BaseUI));
    game.DataCenterBaseUI = DataCenterBaseUI;
    __reflect(DataCenterBaseUI.prototype, "game.DataCenterBaseUI");
})(game || (game = {}));
//# sourceMappingURL=DataCenterBaseUI.js.map