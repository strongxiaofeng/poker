//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-pRent, Egret Technology.
//  All rights Rerved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var R;
(function (R) {
    /**
     * @private
     */
    var JsonAnalyzer = (function (_super) {
        __extends(JsonAnalyzer, _super);
        function JsonAnalyzer() {
            var _this = _super.call(this) || this;
            _this._dataFormat = egret.HttpResponseType.TEXT;
            return _this;
        }
        /**
         * 解析并缓存加载成功的数据
         */
        JsonAnalyzer.prototype.analyzeData = function (RItem, data) {
            var name = RItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            try {
                var str = data;
                this.fileDic[name] = JSON.parse(str);
            }
            catch (e) {
                egret.$warn(1017, RItem.url, data);
            }
        };
        return JsonAnalyzer;
    }(R.BinAnalyzer));
    R.JsonAnalyzer = JsonAnalyzer;
    __reflect(JsonAnalyzer.prototype, "R.JsonAnalyzer");
})(R || (R = {}));
//# sourceMappingURL=JsonAnalyzer.js.map