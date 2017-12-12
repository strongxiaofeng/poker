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
    var SoundAnalyzer = (function (_super) {
        __extends(SoundAnalyzer, _super);
        /**
         * 构造函数
         */
        function SoundAnalyzer() {
            var _this = _super.call(this) || this;
            /**
             * 字节流数据缓存字典
             */
            _this.soundDic = {};
            /**
             * 加载项字典
             */
            _this.RItemDic = [];
            return _this;
        }
        /**
         * @inheritDoc
         */
        SoundAnalyzer.prototype.loadFile = function (RItem, callBack, thisObject) {
            if (this.soundDic[RItem.name]) {
                callBack.call(thisObject, RItem);
                return;
            }
            var sound = new egret.Sound();
            sound.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            this.RItemDic[sound.$hashCode] = { item: RItem, func: callBack, thisObject: thisObject };
            sound.load(R.$getVirtualUrl(RItem.url));
            if (RItem.data) {
                sound.type = RItem.data.soundType;
            }
        };
        /**
         * 一项加载结束
         */
        SoundAnalyzer.prototype.onLoadFinish = function (event) {
            var sound = (event.$target);
            sound.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            var data = this.RItemDic[sound.$hashCode];
            delete this.RItemDic[sound.$hashCode];
            var RItem = data.item;
            var compFunc = data.func;
            RItem.loaded = (event.$type == egret.Event.COMPLETE);
            if (RItem.loaded) {
                this.analyzeData(RItem, sound);
            }
            compFunc.call(data.thisObject, RItem);
        };
        /**
         * 解析并缓存加载成功的数据
         */
        SoundAnalyzer.prototype.analyzeData = function (RItem, data) {
            var name = RItem.name;
            if (this.soundDic[name] || !data) {
                return;
            }
            this.soundDic[name] = data;
        };
        /**
         * @inheritDoc
         */
        SoundAnalyzer.prototype.getRes = function (name) {
            return this.soundDic[name];
        };
        /**
         * @inheritDoc
         */
        SoundAnalyzer.prototype.hasR = function (name) {
            return !!this.getRes(name);
        };
        /**
         * @inheritDoc
         */
        SoundAnalyzer.prototype.destroyRes = function (name) {
            if (this.soundDic[name]) {
                delete this.soundDic[name];
                return true;
            }
            return false;
        };
        return SoundAnalyzer;
    }(R.AnalyzerBase));
    R.SoundAnalyzer = SoundAnalyzer;
    __reflect(SoundAnalyzer.prototype, "R.SoundAnalyzer");
})(R || (R = {}));
//# sourceMappingURL=SoundAnalyzer.js.map