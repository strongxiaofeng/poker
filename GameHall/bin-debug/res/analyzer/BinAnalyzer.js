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
(function (R_1) {
    /**
     * @private
     */
    var BinAnalyzer = (function (_super) {
        __extends(BinAnalyzer, _super);
        /**
         * 构造函数
         */
        function BinAnalyzer() {
            var _this = _super.call(this) || this;
            /**
             * 字节流数据缓存字典
             */
            _this.fileDic = {};
            /**
             * 加载项字典
             */
            _this.RItemDic = [];
            _this._dataFormat = egret.HttpResponseType.ARRAY_BUFFER;
            /**
             * Loader对象池
             */
            _this.recycler = [];
            return _this;
        }
        /**
         * @inheritDoc
         */
        BinAnalyzer.prototype.loadFile = function (RItem, compFunc, thisObject) {
            if (this.fileDic[RItem.name]) {
                compFunc.call(thisObject, RItem);
                return;
            }
            var request = this.getRequest();
            this.RItemDic[request.hashCode] = { item: RItem, func: compFunc, thisObject: thisObject };
            request.open(R_1.$getVirtualUrl(RItem.url));
            request.send();
        };
        /**
         * 获取一个URLLoader对象
         */
        BinAnalyzer.prototype.getRequest = function () {
            var request = this.recycler.pop();
            if (!request) {
                request = new egret.HttpRequest();
                request.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            request.responseType = this._dataFormat;
            return request;
        };
        /**
         * 一项加载结束
         */
        BinAnalyzer.prototype.onLoadFinish = function (event) {
            var request = (event.target);
            var data = this.RItemDic[request.hashCode];
            delete this.RItemDic[request.hashCode];
            var RItem = data.item;
            var compFunc = data.func;
            RItem.loaded = (event.type == egret.Event.COMPLETE);
            if (RItem.loaded) {
                this.analyzeData(RItem, request.response);
            }
            this.recycler.push(request);
            compFunc.call(data.thisObject, RItem);
        };
        /**
         * 解析并缓存加载成功的数据
         */
        BinAnalyzer.prototype.analyzeData = function (RItem, data) {
            var name = RItem.name;
            if (this.fileDic[name] || (data != "" && !data)) {
                return;
            }
            this.fileDic[name] = data;
        };
        /**
         * @inheritDoc
         */
        BinAnalyzer.prototype.getRes = function (name) {
            return this.fileDic[name];
        };
        /**
         * @inheritDoc
         */
        BinAnalyzer.prototype.hasR = function (name) {
            var R = this.getRes(name);
            return R != null;
        };
        /**
         * @inheritDoc
         */
        BinAnalyzer.prototype.destroyRes = function (name) {
            if (this.fileDic[name]) {
                this.onRourceDestroy(this.fileDic[name]);
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        BinAnalyzer.prototype.onRourceDestroy = function (Rource) {
        };
        return BinAnalyzer;
    }(R_1.AnalyzerBase));
    R_1.BinAnalyzer = BinAnalyzer;
    __reflect(BinAnalyzer.prototype, "R.BinAnalyzer");
})(R || (R = {}));
//# sourceMappingURL=BinAnalyzer.js.map