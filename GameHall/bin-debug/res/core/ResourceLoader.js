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
     * @class R.RourceLoader
     * @classdesc
     * @extends egret.EventDispatcher
     * @private
     */
    var ResourceLoader = (function (_super) {
        __extends(ResourceLoader, _super);
        /**
         * 构造函数
         * @method R.RourceLoader#constructor
         */
        function ResourceLoader() {
            var _this = _super.call(this) || this;
            /**
             * 最大并发加载数
             */
            _this.thread = 2;
            /**
             * 正在加载的线程计数
             */
            _this.loadingCount = 0;
            /**
             * 一项加载结束回调函数。无论加载成功或者出错都将执行回调函数。示例：callBack(RItem:ResourceItem):void;
             * @member {Function} R.RourceLoader#callBack
             */
            _this.callBack = null;
            /**
             * R单例的引用
             * @member {any} R.RourceLoader#ResInstance
             */
            _this.resInstance = null;
            /**
             * 当前组加载的项总个数,key为groupName
             */
            _this.groupTotalDic = {};
            /**
             * 已经加载的项个数,key为groupName
             */
            _this.numLoadedDic = {};
            /**
             * 正在加载的组列表,key为groupName
             */
            _this.itemListDic = {};
            /**
             * 加载失败的组,key为groupName
             */
            _this.groupErrorDic = {};
            _this.retryTimesDic = {};
            _this.maxRetryTimes = 3;
            _this.failedList = new Array();
            /**
             * 优先级队列,key为priority，value为groupName列表
             */
            _this.priorityQueue = {};
            /**
             * 延迟加载队列
             */
            _this.lazyLoadList = new Array();
            /**
             * 资源解析库字典类
             */
            _this.analyzerDic = {};
            /**
             * 当前应该加载同优先级队列的第几列
             */
            _this.queueIndex = 0;
            return _this;
        }
        /**
         * 检查指定的组是否正在加载中
         * @method R.RourceLoader#isGroupInLoading
         * @param groupName {string}
         * @returns {boolean}
         */
        ResourceLoader.prototype.isGroupInLoading = function (groupName) {
            return this.itemListDic[groupName] !== undefined;
        };
        /**
         * 开始加载一组文件
         * @method R.RourceLoader#loadGroup
         * @param list {egret.Array<ResourceItem>} 加载项列表
         * @param groupName {string} 组名
         * @param priority {number} 加载优先级
         */
        ResourceLoader.prototype.loadGroup = function (list, groupName, priority) {
            if (priority === void 0) { priority = 0; }
            if (this.itemListDic[groupName] || !groupName)
                return;
            if (!list || list.length == 0) {
                egret.$warn(3201, groupName);
                var event_1 = new R.ResourceEvent(R.ResourceEvent.GROUP_LOAD_ERROR);
                event_1.groupName = groupName;
                this.dispatchEvent(event_1);
                return;
            }
            if (this.priorityQueue[priority])
                this.priorityQueue[priority].push(groupName);
            else
                this.priorityQueue[priority] = [groupName];
            this.itemListDic[groupName] = list;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var RItem = list[i];
                RItem.groupName = groupName;
            }
            this.groupTotalDic[groupName] = list.length;
            this.numLoadedDic[groupName] = 0;
            this.next();
        };
        /**
         * 加载一个文件
         * @method R.RourceLoader#loadItem
         * @param RItem {egret.ResourceItem} 要加载的项
         */
        ResourceLoader.prototype.loadItem = function (RItem) {
            this.lazyLoadList.push(RItem);
            RItem.groupName = "";
            this.next();
        };
        /**
         * 加载下一项
         */
        ResourceLoader.prototype.next = function () {
            while (this.loadingCount < this.thread) {
                var RItem = this.getOneResourceItem();
                if (!RItem)
                    break;
                this.loadingCount++;
                if (RItem.loaded) {
                    this.onItemComplete(RItem);
                }
                else {
                    var analyzer = this.resInstance.$getAnalyzerByType(RItem.type);
                    analyzer.loadFile(RItem, this.onItemComplete, this);
                }
            }
        };
        /**
         * 获取下一个待加载项
         */
        ResourceLoader.prototype.getOneResourceItem = function () {
            if (this.failedList.length > 0)
                return this.failedList.shift();
            var maxPriority = Number.NEGATIVE_INFINITY;
            for (var p in this.priorityQueue) {
                maxPriority = Math.max(maxPriority, p);
            }
            var queue = this.priorityQueue[maxPriority];
            if (!queue || queue.length == 0) {
                if (this.lazyLoadList.length == 0)
                    return null;
                //后请求的先加载，以便更快获取当前需要的资源
                return this.lazyLoadList.pop();
            }
            var length = queue.length;
            var list;
            for (var i = 0; i < length; i++) {
                if (this.queueIndex >= length)
                    this.queueIndex = 0;
                list = this.itemListDic[queue[this.queueIndex]];
                if (list.length > 0)
                    break;
                this.queueIndex++;
            }
            if (list.length == 0)
                return null;
            return list.shift();
        };
        /**
         * 加载结束
         */
        ResourceLoader.prototype.onItemComplete = function (RItem) {
            this.loadingCount--;
            var groupName = RItem.groupName;
            if (!RItem.loaded) {
                var times = this.retryTimesDic[RItem.name] || 1;
                if (times > this.maxRetryTimes) {
                    delete this.retryTimesDic[RItem.name];
                    R.ResourceEvent.dispatchResourceEvent(this.resInstance, R.ResourceEvent.ITEM_LOAD_ERROR, groupName, RItem);
                }
                else {
                    this.retryTimesDic[RItem.name] = times + 1;
                    this.failedList.push(RItem);
                    this.next();
                    return;
                }
            }
            if (groupName) {
                this.numLoadedDic[groupName]++;
                var itemsLoaded = this.numLoadedDic[groupName];
                var itemsTotal = this.groupTotalDic[groupName];
                if (!RItem.loaded) {
                    this.groupErrorDic[groupName] = true;
                }
                R.ResourceEvent.dispatchResourceEvent(this.resInstance, R.ResourceEvent.GROUP_PROGRS, groupName, RItem, itemsLoaded, itemsTotal);
                if (itemsLoaded == itemsTotal) {
                    var groupError = this.groupErrorDic[groupName];
                    this.removeGroupName(groupName);
                    delete this.groupTotalDic[groupName];
                    delete this.numLoadedDic[groupName];
                    delete this.itemListDic[groupName];
                    delete this.groupErrorDic[groupName];
                    if (groupError) {
                        R.ResourceEvent.dispatchResourceEvent(this, R.ResourceEvent.GROUP_LOAD_ERROR, groupName);
                    }
                    else {
                        R.ResourceEvent.dispatchResourceEvent(this, R.ResourceEvent.GROUP_COMPLETE, groupName);
                    }
                }
            }
            else {
                this.callBack.call(this.resInstance, RItem);
            }
            this.next();
        };
        /**
         * 从优先级队列中移除指定的组名
         */
        ResourceLoader.prototype.removeGroupName = function (groupName) {
            for (var p in this.priorityQueue) {
                var queue = this.priorityQueue[p];
                var index = 0;
                var found = false;
                var length_1 = queue.length;
                for (var i = 0; i < length_1; i++) {
                    var name_1 = queue[i];
                    if (name_1 == groupName) {
                        queue.splice(index, 1);
                        found = true;
                        break;
                    }
                    index++;
                }
                if (found) {
                    if (queue.length == 0) {
                        delete this.priorityQueue[p];
                    }
                    break;
                }
            }
        };
        return ResourceLoader;
    }(egret.EventDispatcher));
    R.ResourceLoader = ResourceLoader;
    __reflect(ResourceLoader.prototype, "R.ResourceLoader");
})(R || (R = {}));
//# sourceMappingURL=ResourceLoader.js.map