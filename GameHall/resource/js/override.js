var eui;
(function (eui) {
    var AImage = (function (_super) {
        __extends(AImage, _super);
        function AImage() {
            var _this = _super.call(this) || this;
            _this.source_press = "";
            _this.source_default = "";
            return _this;
        }
        Object.defineProperty(AImage.prototype, "source", {
            get: function () {
                return this._source;
            },
            set: function (value) {
                var url = com.LoadManager.getInstance().getUrlByKey(value);
                if(url) value = "resource/"+url;
                if (value == this._source) {
                    return;
                }
                this._source = value;
                if (this.$stage) {
                    this.parseSource();
                }
                else {
                    this.sourceChanged = true;
                    this.invalidateProperties();
                }
            },
            enumerable: true,
            configurable: true
        });
        return AImage;
    }(eui.Image));
    eui.AImage = AImage;
    __reflect(AImage.prototype, "eui.AImage");
})(eui || (eui = {}));