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
var R;
(function (R) {
    /**
     * Rource term. One of the Rources arrays in Rource.json.
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 资源项。对应 Rource.json 中 Rources 数组中的一项。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    var ResourceItem = (function () {
        /**
         * Constructor.
         * @param name Name of Rource term.
         * @param url URL of Rource term.
         * @param type Type of Rource term.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         * @param name 加载项名称。
         * @param url 要加载的文件地址。
         * @param type 加载项文件类型。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function ResourceItem(name, url, type) {
            /**
             * Name of the Rource term group.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 资源所属的组名。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            this.groupName = "";
            /**
             * The raw data object to be referenced.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 被引用的原始数据对象。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            this.data = null;
            this._loaded = false;
            this.name = name;
            this.url = url;
            this.type = type;
        }
        Object.defineProperty(ResourceItem.prototype, "loaded", {
            /**
             * Load complete flag.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 加载完成的标志。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.data ? this.data.loaded : this._loaded;
            },
            set: function (value) {
                if (this.data)
                    this.data.loaded = value;
                this._loaded = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Turn into a string.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 转成字符串。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.prototype.toString = function () {
            return "[ResourceItem name=\"" + this.name + "\" url=\"" + this.url + "\" type=\"" + this.type + "\"]";
        };
        /**
         * XML file.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * XML 文件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_XML = "xml";
        /**
         * Picture file.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 图片文件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_IMAGE = "image";
        /**
         * Binary file.
         * @version Egret 2.4
         * @platform Web
         * @language en_US
         */
        /**
         * 二进制文件。
         * @version Egret 2.4
         * @platform Web
         * @language zh_CN
         */
        ResourceItem.TYPE_BIN = "bin";
        /**
         * Text file.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 文本文件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_TEXT = "text";
        /**
         * JSON file.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * JSON 文件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_JSON = "json";
        /**
         * SpriteSheet file.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * SpriteSheet 文件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_SHEET = "sheet";
        /**
         * BitmapTextSpriteSheet file.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * BitmapTextSpriteSheet 文件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_FONT = "font";
        /**
         * Sound file.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 声音文件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_SOUND = "sound";
        return ResourceItem;
    }());
    R.ResourceItem = ResourceItem;
    __reflect(ResourceItem.prototype, "R.ResourceItem");
})(R || (R = {}));
//# sourceMappingURL=ResourceItem.js.map