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
    var ImageAnalyzer = (function (_super) {
        __extends(ImageAnalyzer, _super);
        /**
         * 构造函数
         */
        function ImageAnalyzer() {
            var _this = _super.call(this) || this;
            /**
             * 字节流数据缓存字典
             */
            _this.fileDic = {};
            /**
             * 加载项字典
             */
            _this.RItemDic = [];
            /**
             * Loader对象池
             */
            _this.recycler = [];
            return _this;
        }
        /**
         * @inheritDoc
         */
        ImageAnalyzer.prototype.loadFile = function (RItem, compFunc, thisObject) {
            if (this.fileDic[RItem.name]) {
                compFunc.call(thisObject, RItem);
                return;
            }
            var loader = this.getLoader();
            this.RItemDic[loader.$hashCode] = { item: RItem, func: compFunc, thisObject: thisObject };
            loader.load(R_1.$getVirtualUrl(RItem.url));
        };
        /**
         * 获取一个Loader对象
         */
        ImageAnalyzer.prototype.getLoader = function () {
            var loader = this.recycler.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        };
        /**
         * 一项加载结束
         */
        ImageAnalyzer.prototype.onLoadFinish = function (event) {
            var request = (event.$target);
            var data = this.RItemDic[request.$hashCode];
            delete this.RItemDic[request.$hashCode];
            var RItem = data.item;
            var compFunc = data.func;
            RItem.loaded = (event.$type == egret.Event.COMPLETE);
            if (RItem.loaded) {
                var texture = new egret.Texture();
                texture._setBitmapData(request.data);
                this.analyzeData(RItem, texture);
            }
            this.recycler.push(request);
            compFunc.call(data.thisObject, RItem);
        };
        /**
         * 解析并缓存加载成功的数据
         */
        ImageAnalyzer.prototype.analyzeData = function (RItem, texture) {
            var name = RItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }
            this.fileDic[name] = texture;
            var config = RItem.data;
            if (config && config["scale9grid"]) {
                var str = config["scale9grid"];
                var list = str.split(",");
                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
        };
        /**
         * @inheritDoc
         */
        ImageAnalyzer.prototype.getRes = function (name) {
            return this.fileDic[name];
        };
        /**
         * @inheritDoc
         */
        ImageAnalyzer.prototype.hasR = function (name) {
            var R = this.getRes(name);
            return R != null;
        };
        /**
         * @inheritDoc
         */
        ImageAnalyzer.prototype.destroyRes = function (name) {
            if (this.fileDic[name]) {
                this.onRourceDestroy(this.fileDic[name]);
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        ImageAnalyzer.prototype.onRourceDestroy = function (texture) {
            texture.dispose();
        };
        return ImageAnalyzer;
    }(R_1.AnalyzerBase));
    R_1.ImageAnalyzer = ImageAnalyzer;
    __reflect(ImageAnalyzer.prototype, "R.ImageAnalyzer");
})(R || (R = {}));
//# sourceMappingURL=ImageAnalyzer.js.map