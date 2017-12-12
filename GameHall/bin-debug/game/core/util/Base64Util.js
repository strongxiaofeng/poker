var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**base64相关 */
    var Base64Util = (function () {
        function Base64Util() {
        }
        Base64Util.StringToBase64 = function (str) {
            var base64;
            base64 = window.btoa(str);
            return base64;
        };
        Base64Util.ArrayBufferToBase64 = function (buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        };
        Base64Util.Base64ToArrayBuffer = function (base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        };
        return Base64Util;
    }());
    game.Base64Util = Base64Util;
    __reflect(Base64Util.prototype, "game.Base64Util");
})(game || (game = {}));
//# sourceMappingURL=Base64Util.js.map