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
var com;
(function (com) {
    /** 资源加载管理
     * @desc 每个独立的资源都会创建一个ResourceItem，包含加载信息和加载完成后的数据
     * */
    var LoadManager = (function (_super) {
        __extends(LoadManager, _super);
        // ----------------------------------------------- init -----------------------------------------------
        function LoadManager() {
            var _this = _super.call(this) || this;
            /**并行加载数，用来控制 _loaderList的数量*/
            _this._loaderS = 6;
            /** 解析器字典 */
            _this.analyzerDic = {};
            _this.analyzerClassMap = {};
            /** 已加载的普通资源列表 - ResourceItem */
            _this._loadedResDic = {};
            /** 加载的sheet，包含解析完和未解析完的 - SheetItem */
            _this._loadedSheetDic = {};
            /** 加载的font文件 */
            _this._loadedFontDic = {};
            /** 正在加载的资源对象，再次收到这个对象的加载请求，
             * 就添加到回调列表里，等待资源加载完后，集体执行回调
             * */
            _this._loadingResDic = {};
            _this.loadGroupList = [];
            _this.curGroupName = "";
            _this.loadedGroups = [];
            /**等待加载的group */
            _this.waitLoadGroup = [];
            _this.storageFull = false;
            _this._resList = new Array();
            _this._loaderList = new Array();
            _this._resourceJson = new Object();
            _this.init();
            return _this;
        }
        LoadManager.prototype.init = function () {
            for (var i = 0; i < this._loaderS; i++) {
                this._loaderList[i] = new com.LoadItem();
                this._loaderList[i].index = i;
            }
            var analyzerClassMap = this.analyzerClassMap;
            analyzerClassMap[com.ResourceItem.TYPE_BIN] = com.BinAnalyzer;
            analyzerClassMap[com.ResourceItem.TYPE_IMAGE] = com.ImageAnalyzer;
            analyzerClassMap[com.ResourceItem.TYPE_TEXT] = com.TextAnalyzer;
            analyzerClassMap[com.ResourceItem.TYPE_JSON] = com.JsonAnalyzer;
            analyzerClassMap[com.ResourceItem.TYPE_SHEET] = com.SheetAnalyzer;
            analyzerClassMap[com.ResourceItem.TYPE_FONT] = com.FontAnalyzer;
            analyzerClassMap[com.ResourceItem.TYPE_SOUND] = com.SoundAnalyzer;
            analyzerClassMap[com.ResourceItem.TYPE_XML] = com.XMLAnalyzer;
            analyzerClassMap[com.ResourceItem.TYPE_ZIP] = com.ZipAnalyer;
        };
        /** 获取单例 */
        LoadManager.getInstance = function () {
            if (LoadManager._instacne == null) {
                LoadManager._instacne = new LoadManager();
                LoadManager.startUpListener();
            }
            return LoadManager._instacne;
        };
        /** 启动监听 */
        LoadManager.startUpListener = function () {
            com.LoadManager.getInstance().addEventListener(com.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            com.LoadManager.getInstance().addEventListener(com.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            com.LoadManager.getInstance().addEventListener(com.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        };
        /** 组资源加载完毕 */
        LoadManager.onResourceLoadComplete = function (evt) {
            var callList = LoadManager.groupDic.getValue(evt.groupName);
            if (callList && callList.loadComplement) {
                callList.loadComplement.call(callList.thisObject);
                LoadManager.removeGroupListener(evt.groupName);
            }
            //判断多个资源组加载的情况
            for (var key in LoadManager.groupsDic) {
                if (key.indexOf(evt.groupName) > -1) {
                    var obj = LoadManager.groupsDic[key];
                    var groups = obj.groups;
                    var index = groups.indexOf(evt.groupName);
                    if (index > -1) {
                        groups.splice(index, 1);
                    }
                    else {
                        continue;
                    }
                    if (groups.length > 0) {
                        var total = key.split(",").length;
                        obj.onResourceProgress.call(obj.thisObject, total - groups.length, total);
                    }
                    else {
                        obj.loadComplement.call(obj.thisObject); //执行回调
                        delete LoadManager.groupsDic[key];
                    }
                }
            }
        };
        /** 组资源加载进度 */
        LoadManager.onResourceProgress = function (evt) {
            var callList = LoadManager.groupDic.getValue(evt.groupName);
            if (callList && callList.onResourceProgress) {
                callList.onResourceProgress.call(callList.thisObject, evt.itemsLoaded, evt.itemsTotal);
            }
        };
        /** 单个条目加载失败 */
        LoadManager.onItemLoadError = function (evt) {
            var callList = LoadManager.groupDic.getValue(evt.groupName);
            if (callList && callList.onItemLoadError) {
                callList.onItemLoadError.call(callList.thisObject, evt.itemsLoaded, evt.itemsTotal);
                game.DebugUtil.debug("Url:" + evt.resItem.url + " has failed to load");
            }
        };
        /** 移除对应的group监听 */
        LoadManager.removeGroupListener = function ($name) {
            LoadManager.groupDic.removeKey($name);
        };
        // ----------------------------------------------- version文件 -----------------------------------------------
        LoadManager.prototype.loadVersion = function (callback, thisObj) {
            this.verCompleteCallBack = callback;
            this.verThisObject = thisObj;
            this.getResByUrl("resource/" + "version.json?" + new Date().getTime(), this.onVerisonLoade, this, com.ResourceItem.TYPE_JSON);
        };
        LoadManager.prototype.onVerisonLoade = function (json) {
            this.verJsonData = json;
            if (this.verCompleteCallBack != null) {
                this.verCompleteCallBack.call(this.verThisObject);
                this.verCompleteCallBack = null;
                this.verThisObject = null;
            }
        };
        LoadManager.prototype.getVersion = function (url) {
            for (var key in this.verJsonData.files) {
                if ("resource/" + key == url) {
                    url = url + "?" + this.verJsonData.files[key];
                }
            }
            if (url.indexOf("?") == -1) {
                url = url + "?" + new Date().getTime();
            }
            return url;
        };
        // ----------------------------------------------- 加载default.res.json -----------------------------------------------
        /** 这个函数只是用来加载default.res.json的
         * 其他静态资源都是从这里读取的，主要通过getRes()这个函数去取
         */
        LoadManager.prototype.loadConfig = function (url, resourceRoot, type) {
            var _this = this;
            if (type === void 0) { type = com.ResourceItem.TYPE_JSON; }
            return new Promise(function (resolve, reject) {
                var configDone = function () {
                    resolve();
                };
                com.LoadManager.getInstance().addEventListener(com.ResourceEvent.CONFIG_COMPLETE, configDone, _this);
                _this._resourceRoot = resourceRoot;
                _this._resourceName = url;
                var item = new com.ResourceItem(url, url, com.ResourceItem.TYPE_JSON);
                _this.addRes(item, false, true);
            });
        };
        /** 检查default.res.json是否已经加载 */
        LoadManager.prototype.isConfigLoaded = function () {
            return !!(this._resourceJson
                && this._resourceJson.hasOwnProperty("groups")
                && this._resourceJson.hasOwnProperty("resources")
                && this._resourceJson.hasOwnProperty("sheet"));
        };
        // ----------------------------------------------- 加载资源组 -----------------------------------------------
        /** 根据组名加载一组资源
         * @method RES.loadGroup
         * @param groupName {string}
         * @param priority {number}
         */
        LoadManager.prototype.loadGroup = function (groupName, $priority) {
            var _this = this;
            if ($priority === void 0) { $priority = 0; }
            return new Promise(function (resolve, reject) {
                var loadDone = function () { resolve(); };
                var loadError = function () { reject(); };
                LoadManager.groupDic.setValue(groupName, { thisObject: _this, loadComplement: loadDone, onResourceLoadError: loadError });
                if (_this.curGroupName != "") {
                    _this.waitLoadGroup.push(groupName);
                    return;
                }
                if (_this.isGroupLoaded(groupName)) {
                    _this.curGroupName = groupName;
                    _this.groupLoadSucc();
                    return;
                }
                if (_this._resourceJson
                    && _this._resourceJson.hasOwnProperty("groups")
                    && _this._resourceJson.hasOwnProperty("resources")
                    && _this._resourceJson.hasOwnProperty("sheet")) {
                    if (_this._resourceJson["groups"][groupName]) {
                        _this.curGroupName = groupName;
                        var keys = _this._resourceJson["groups"][groupName];
                        var item;
                        if (keys.indexOf(".files") > -1) {
                            if (game.GlobalConfig.isSupportWebp == true) {
                                var webp = keys.replace(".files", ".webps");
                                item = new com.ResourceItem(keys, _this._resourceRoot + webp, com.ResourceItem.TYPE_ZIP);
                            }
                            else {
                                item = new com.ResourceItem(keys, _this._resourceRoot + keys, com.ResourceItem.TYPE_ZIP);
                            }
                            item.groupName = groupName;
                            _this.addRes(item);
                        }
                        else {
                            _this.curGroupList = keys.split(",");
                            var name = "";
                            var obj;
                            //过滤一次
                            for (var i = _this.curGroupList.length - 1; i >= 0; i--) {
                                //跳过了..
                                name = _this.curGroupList[i];
                                if (_this._loadedResDic[name] || _this._loadedSheetDic[name] || _this._loadedFontDic[name]) {
                                    //已加载，删掉
                                    _this.curGroupList.splice(i, 1);
                                }
                            }
                            if (_this.curGroupList.length == 0) {
                                _this.groupLoadSucc();
                                return;
                            }
                            var len = _this.curGroupList.length;
                            for (var i = 0; i < len; i++) {
                                name = _this.curGroupList[i];
                                if (_this._resourceJson["resources"][name]) {
                                    obj = _this._resourceJson["resources"][name];
                                }
                                else if (_this._resourceJson["sheet"][name]) {
                                    obj = _this._resourceJson["sheet"][name];
                                }
                                item = new com.ResourceItem(name, _this._resourceRoot + obj.url, obj.type);
                                item.groupName = groupName;
                                _this.addRes(item);
                            }
                        }
                    }
                    else {
                        throw new Error("no this group:" + groupName);
                    }
                }
            });
        };
        /** 请求加载多个资源组
         * 资源组的名称用逗号隔开,比如 "login,proload,public"
         * */
        LoadManager.prototype.loadMultiGroup = function (groupNames, onResourceProgress, thisObject) {
            var _this = this;
            if (onResourceProgress === void 0) { onResourceProgress = null; }
            if (thisObject === void 0) { thisObject = null; }
            return new Promise(function (resolve, reject) {
                var multiDone = function (params) {
                    resolve();
                };
                var multiProgress = function (params) {
                    if (onResourceProgress && thisObject) {
                        onResourceProgress.call(thisObject, [params, groupNames.split(",").length]);
                    }
                };
                LoadManager.groupsDic[groupNames] = {
                    thisObject: _this,
                    loadComplement: multiDone,
                    onResourceProgress: multiProgress,
                    groups: groupNames.split(",")
                };
                if (groupNames == "") {
                    return;
                }
                var split = groupNames.split(",");
                for (var g = 0; g < split.length; g++) {
                    //已经加载的跳过
                    if (_this.isGroupLoaded(split[g])) {
                        com.ResourceEvent.dispatchResourceEvent(_this, com.ResourceEvent.GROUP_COMPLETE, split[g]);
                        continue;
                    }
                    //没有加载的，就加载第一个
                    _this.loadGroup(split[g]);
                }
            });
        };
        /** 检查某个资源组是否已经加载完成
         * @method RES.isGroupLoaded
         * @param name {string}
         * @returns {boolean}
         */
        LoadManager.prototype.isGroupLoaded = function (groupName) {
            return this.loadedGroups.indexOf(groupName) != -1;
        };
        /**多个资源组是否都加载完成 */
        LoadManager.prototype.isMultiGroupLoaded = function (groupNames) {
            var split = groupNames.split(",");
            for (var g in split) {
                if (this.isGroupLoaded(split[g]) == false) {
                    return false;
                }
            }
            return true;
        };
        /**zip加载专用，不能单独调用 */
        LoadManager.prototype.setGroupList = function (list) {
            this.curGroupList = list;
        };
        /** 检查资源组加载进度 */
        LoadManager.prototype.checkGroupList = function (res) {
            if (this.curGroupList && this.curGroupList.length > 0 && res.groupName == this.curGroupName) {
                var index = this.curGroupList.indexOf(res.name);
                //移除
                if (index > -1) {
                    this.loadGroupList.push(res.name);
                    var curLen = this.curGroupList.length;
                    if (curLen == this.loadGroupList.length) {
                        //资源组加载完成
                        this.groupLoadSucc();
                    }
                    else {
                        com.ResourceEvent.dispatchResourceEvent(this, com.ResourceEvent.GROUP_PROGRESS, this.curGroupName, res, this.loadGroupList.length, this.curGroupList.length);
                    }
                }
            }
        };
        /** 资源组加载成功 */
        LoadManager.prototype.groupLoadSucc = function () {
            com.ResourceEvent.dispatchResourceEvent(this, com.ResourceEvent.GROUP_COMPLETE, this.curGroupName);
            this.loadGroupList = [];
            this.loadedGroups.push(this.curGroupName);
            this.curGroupName = "";
            this.curGroupList = null;
            if (this.waitLoadGroup.length > 0) {
                this.loadGroup(this.waitLoadGroup.shift());
            }
        };
        // ----------------------------------------------- ResourceItem的加载与解析 -----------------------------------------------
        /** 添加一个ResourceItem加载项
         *  @desc 先检查资源的版本号，再从localStorage取，如果没有则放进加载队列
         */
        LoadManager.prototype.addRes = function (res, isPriority, needVer) {
            if (isPriority === void 0) { isPriority = false; }
            if (needVer === void 0) { needVer = true; }
            //统一加版本号：
            if (needVer) {
                if (res.url.indexOf("?") > -1) {
                    res.url = res.url.slice(0, res.url.indexOf("?"));
                }
                res.url = this.getVersion(res.url);
            }
            var hasItem = this._loadingResDic[res.name];
            if (hasItem) {
                if (hasItem.key == res.key && hasItem.type == res.type) {
                    if (res.groupName)
                        hasItem.groupName = res.groupName + "";
                    hasItem.addCallback(res.getCallback());
                    res.dispose();
                    return;
                }
            }
            else {
                this._loadingResDic[res.name] = res;
            }
            //看localStorage是否有这个资源，有就直接返回图片
            if (res.url.indexOf("?") > -1) {
                var arr = res.url.split("?");
                var key = arr[0];
                var ver = arr[1];
                var local = egret.localStorage.getItem(key);
                if (local && local != "") {
                    var r = local.split("?");
                    //预防性报错，以便及时修改策略
                    if (r[0] == ver) {
                        var str = r.slice(1).join('?');
                        var localData;
                        try {
                            localData = this.str2ab(str);
                            res.data = localData;
                            res.isLocal = true;
                            game.DebugUtil.debug("localStorage取得" + res.key);
                            this.analyzer(res);
                            return; //localStorage取出里有资源，直接取
                        }
                        catch (err) {
                            game.DebugUtil.debug("str2ab错误" + err);
                        }
                    }
                    else {
                        // 版本号不同，删除原来的localStorage
                        game.DebugUtil.debug("localStorage删除：" + res.key + "local version:" + r[0] + "current version:" + ver);
                        egret.localStorage.removeItem(key);
                    }
                }
            }
            if (isPriority) {
                this._resList.unshift(res);
            }
            else {
                this._resList.push(res);
            }
            if (this._resList.length < this._loaderS) {
                this.startLoad();
            }
        };
        /** 开始加载一个ResourceItem */
        LoadManager.prototype.startLoad = function () {
            //看还剩余几个加载器
            var len = this._loaderList.length;
            if (len > 0 && this._resList.length > 0) {
                for (var i = 0; i < len; i++) {
                    if (this._resList.length <= 0) {
                        break;
                    }
                    var load = this._loaderList.pop(); //减小底层运算
                    var res = this._resList.shift(); //加载有优先级
                    load.addEventListener(egret.Event.COMPLETE, this.handleLoad, this);
                    load.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleLoadErr, this);
                    load.addEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
                    load.startLoad(res);
                }
            }
        };
        /** 解析一个加载完毕的ResourceItem */
        LoadManager.prototype.analyzer = function (res) {
            var analyzer = this.analyzerDic[res.type];
            if (!analyzer) {
                var clazz = this.analyzerClassMap[res.type];
                if (!clazz) {
                    if (true) {
                        egret.$error(3203, res.type);
                    }
                    return;
                }
                analyzer = this.analyzerDic[res.type] = new clazz();
            }
            analyzer.analyzerFile(res, this.analyzerCom, this);
        };
        /** ResourceItem解析成功回调 */
        LoadManager.prototype.analyzerCom = function (res) {
            //还需要加版本号
            if (!this.storageFull && res.isLocal == false && res.type === com.ResourceItem.TYPE_ZIP) {
                var storeData = this.ab2str(res.data);
                var store = egret.localStorage.setItem(res.key, res.version + "?" + storeData);
                if (store) {
                    game.DebugUtil.debug("存入 localStorage成功: " + res.url);
                }
                else {
                    game.DebugUtil.debug("存入 localStorage失败: " + res.url);
                    this.storageFull = true;
                }
            }
            switch (res.type) {
                case com.ResourceItem.TYPE_ZIP:
                    var zipItem = new com.ZipItem();
                    zipItem.setRes(res);
                    return;
                case com.ResourceItem.TYPE_IMAGE:
                    if (this._loadedSheetDic[res.name]) {
                        var sheet = this._loadedSheetDic[res.name];
                        if (sheet.Loaded) {
                            throw new Error("sheet repeat load ?..." + res.url + "...name:" + res.name);
                        }
                        else {
                            sheet.setImg(res);
                            //sheet处理完成...
                            if (sheet.Loaded) {
                                sheet.executeCall();
                            }
                        }
                    }
                    else if (this._loadedFontDic[res.name]) {
                        var font = this._loadedFontDic[res.name];
                        if (font.Loaded) {
                            throw new Error("font repeat load ?..." + res.url + "...name:" + res.name);
                        }
                        else {
                            font.setImg(res);
                            if (font.Loaded) {
                                font.executeCall();
                            }
                        }
                    }
                    break;
                case com.ResourceItem.TYPE_FONT:
                    if (this._loadedFontDic[res.name]) {
                        this.checkGroupList(res);
                        return;
                    }
                    var fontItem = new com.FontItem();
                    fontItem.setJson(res);
                    this._loadedFontDic[res.name] = fontItem;
                    var imgItem = new com.ResourceItem(res.name, fontItem.getTexturePath(), com.ResourceItem.TYPE_IMAGE);
                    imgItem.groupName = res.groupName;
                    this.addRes(imgItem, true);
                    return;
                case com.ResourceItem.TYPE_SHEET:
                    if (this._loadedSheetDic[res.name]) {
                        this.checkGroupList(res);
                        return;
                    }
                    var sheetObj = res.getRes();
                    var sheetUrl = res.key;
                    sheetUrl = com.AnalyzerBase.getStringSprit(sheetUrl) + sheetObj["file"];
                    var sheetItem = new com.SheetItem();
                    sheetItem.setJson(res);
                    this._loadedSheetDic[res.name] = sheetItem;
                    //还要加版本号
                    var sheetImg = new com.ResourceItem(res.name, sheetUrl, com.ResourceItem.TYPE_IMAGE);
                    sheetImg.groupName = res.groupName;
                    this.addRes(sheetImg, true);
                    return;
                case com.ResourceItem.TYPE_JSON:
                    if (res.name == this._resourceName) {
                        var obj = res.getRes();
                        var len = 0;
                        var i = 0;
                        var name = "";
                        var keys = "";
                        var type = "";
                        var url = "";
                        var subkeys = "";
                        if (obj.groups && obj.groups.length) {
                            this._resourceJson["groups"] = {};
                            len = obj.groups.length;
                            for (i = 0; i < len; i++) {
                                name = obj.groups[i].name;
                                keys = obj.groups[i].keys;
                                this._resourceJson["groups"][name] = keys;
                            }
                        }
                        if (obj.resources && obj.resources.length) {
                            this._resourceJson["resources"] = {};
                            this._resourceJson["sheet"] = {};
                            len = obj.resources.length;
                            for (i = 0; i < len; i++) {
                                subkeys = "";
                                name = obj.resources[i].name;
                                type = obj.resources[i].type;
                                url = obj.resources[i].url;
                                if (obj.resources[i].subkeys) {
                                    subkeys = obj.resources[i].subkeys;
                                }
                                if (type == "sheet") {
                                    this._resourceJson["sheet"][name] = { "type": type, "url": url, "subkeys": subkeys.split(",") };
                                }
                                else {
                                    this._resourceJson["resources"][name] = { "type": type, "url": url, "subkeys": subkeys };
                                }
                            }
                        }
                        com.ResourceEvent.dispatchResourceEvent(this, com.ResourceEvent.CONFIG_COMPLETE);
                    }
                    break;
            }
            this._loadedResDic[res.name] = res;
            //执行资源的回调 ，如果有的话
            res.executeCall(res.getRes());
            this.checkGroupList(res);
            //删除正在加载的对象，没bug
            if (this._loadingResDic[res.name]) {
                delete this._loadingResDic[res.name];
            }
        };
        LoadManager.prototype.handleLoad = function (e) {
            var loader = e.target;
            loader.resItem.data = loader.data;
            this.analyzer(loader.resItem);
            //加回去
            loader.removeEventListener(egret.Event.COMPLETE, this.handleLoad, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleLoadErr, this);
            loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
            loader.reset();
            this._loaderList.push(loader);
            this.startLoad();
        };
        LoadManager.prototype.handleProgress = function (e) { };
        LoadManager.prototype.handleLoadErr = function (e) {
            var loader = e.target;
            loader.removeEventListener(egret.Event.COMPLETE, this.handleLoad, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleLoadErr, this);
            loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
            //加载失败，回调的资源是空
            // loader.resItem.executeCall(null);
            loader.resItem.dispose();
            loader.reset();
            this._loaderList.push(loader);
            this.startLoad();
        };
        // ----------------------------------------------- 获取资源 -----------------------------------------------
        /** 同步方式获取缓存的已经加载成功的资源。
         * <br>资源类型和对应的返回值类型关系如下：
         * <br>RES.ResourceItem.TYPE_BIN : ArrayBuffer JavaScript 原生对象
         * <br>RES.ResourceItem.TYPE_IMAGE : 返回 egret.texture
         * <br>RES.ResourceItem.TYPE_JSON : Object
         * <br>RES.ResourceItem.TYPE_SHEET : Object
         * <br>  1. 如果传入的参数是整个 SpriteSheet 的名称返回的是 {"image1":Texture,"image2":Texture} 这样的格式。
         * <br>  2. 如果传入的是 "sheet.image1"，返回的是单个资源。
         * <br>  3. 如果传入的是 "image1" 单个资源的名称，返回的是单个资源。但是如果有两张 SpriteSheet 中有单个图片资源名称相同，不确定返回哪个
         * <br>RES.ResourceItem.TYPE_SOUND : HtmlSound Html 对象
         * <br>RES.ResourceItem.TYPE_TEXT : string
         * @param key 对应配置文件里的 name 属性或 subKeys 属性的一项。
         */
        LoadManager.prototype.getRes = function (key) {
            if (this._loadedFontDic[key]) {
                return this._loadedFontDic[key].getRes();
            }
            else if (this._loadedResDic[key]) {
                return this._loadedResDic[key].getRes();
            }
            else {
                //再在sheet里找，没有就没有了，返回null
                return this.findSheet(key);
            }
        };
        /** 通过key异步获取资源
         * @method RES.getResAsync
         * @param key {string}
         * @param compFunc {Function} 回调函数。示例：compFunc(data,url):void。
         * @param thisObject {any}
         */
        LoadManager.prototype.getResAsync = function (key, compFunc, thisObject) {
            if (this._loadedFontDic[key]) {
                compFunc.call(thisObject, this._loadedFontDic[key].getRes(), key);
                return true;
            }
            else if (this._loadedResDic[key]) {
                var item = this._loadedResDic[key];
                compFunc.call(thisObject, item.getRes(), key);
                return true;
            }
            else {
                //sheet里找
                var t = this.findSheet(key);
                if (t) {
                    compFunc.call(thisObject, t, key);
                    return true;
                }
            }
            //还要加载sheet里的
            if (this._resourceJson["resources"][key]) {
                var obj = this._resourceJson["resources"][key];
                var item = new com.ResourceItem(key, this._resourceRoot + obj.url, obj.type);
                item.needCallback(compFunc, thisObject);
                this.addRes(item);
                return true;
            }
            else {
                for (var index in this._resourceJson["sheet"]) {
                    var obj = this._resourceJson["sheet"][index];
                    if (obj) {
                        if (obj.subkeys.indexOf(key) > -1) {
                            var item = new com.ResourceItem(index, this._resourceRoot + obj.url, com.ResourceItem.TYPE_SHEET);
                            item.needCallback(compFunc, thisObject, key);
                            this.addRes(item);
                            return true;
                        }
                    }
                }
                if (key.indexOf(".") > -1) {
                    var arr = key.split(".");
                    if (this._resourceJson["sheet"][arr[0]]) {
                        var obj = this._resourceJson["sheet"][arr[0]];
                        if (obj) {
                            if (obj.subkeys.indexOf(arr[1]) > -1) {
                                var item = new com.ResourceItem(arr[0], this._resourceRoot + obj.url, com.ResourceItem.TYPE_SHEET);
                                item.needCallback(compFunc, thisObject, arr[1]);
                                this.addRes(item);
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        /** 通过url获取资源
         * @method RES.getResByUrl
         * @param url {string}
         * @param compFunc {Function}
         * @param thisObject {any}
         * @param type {string}
         */
        LoadManager.prototype.getResByUrl = function (url, compFunc, thisObject, type, priority) {
            if (type === void 0) { type = ""; }
            if (priority === void 0) { priority = false; }
            if (this.getRes(url)) {
                compFunc.call(thisObject, this.getRes(url));
                return;
            }
            var item = new com.ResourceItem(url, url, type);
            item.needCallback(compFunc, thisObject);
            this.addRes(item, priority, false);
        };
        // ----------------------------------------------- util -----------------------------------------------
        /** 通过资源在default.res.json中的key获取其URL */
        LoadManager.prototype.getUrlByKey = function (key) {
            if (this._resourceJson && this._resourceJson["resources"] && this._resourceJson["resources"][key]) {
                return this._resourceJson["resources"][key]["url"];
            }
            return key;
        };
        /**是否是空闲*/
        LoadManager.prototype.isIdle = function () {
            return this._loaderList.length == this._loaderS;
        };
        /** ArrayBuffer to String */
        LoadManager.prototype.ab2str = function (buf) {
            var binary = '';
            var bytes = new Uint8Array(buf);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return binary;
        };
        /** String to ArrayBuffer */
        LoadManager.prototype.str2ab = function (str) {
            var buf = new ArrayBuffer(str.length * 2); //2 bytes for each char
            var bufView = new Uint8Array(buf);
            for (var i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            return buf;
        };
        /**key 对应配置文件里的 name 属性或 sbuKeys 属性的一项。 */
        LoadManager.prototype.hasRes = function (key) {
            if (this._resourceJson["resources"][key]) {
                return true;
            }
            else {
                //再在sheet里找，没有就没有了，返回null
                for (var index in this._resourceJson["sheet"]) {
                    var obj = this._resourceJson["sheet"][index];
                    if (obj) {
                        if (obj.subkeys.indexOf(key) > -1) {
                            return true;
                        }
                    }
                }
            }
            if (key.indexOf(".") > -1) {
                var arr = key.split(".");
                if (this._resourceJson["sheet"][arr[0]]) {
                    var obj = this._resourceJson["sheet"][arr[0]];
                    if (obj) {
                        if (obj.subkeys.indexOf(arr[1]) > -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /** 检查sheet文件里是否含有指定的资源 */
        LoadManager.prototype.findSheet = function (key) {
            var t = null;
            for (var sheet in this._loadedSheetDic) {
                t = this._loadedSheetDic[sheet].getRes(key);
                if (t) {
                    return t;
                }
            }
            if (key.indexOf(".") > -1) {
                var arr = key.split(".");
                if (this._loadedSheetDic[arr[0]]) {
                    t = this._loadedSheetDic[arr[0]].getRes(arr[1]);
                    if (t) {
                        return t;
                    }
                }
            }
            return t;
        };
        /**用来加载自定义皮肤的 */
        LoadManager.prototype.loadEXMlGroup = function (arr) {
            this.curGroupList = arr;
            var len = arr.length;
            var item;
            this.curGroupName = "thmGroup";
            for (var i = 0; i < len; i++) {
                var name_1 = this.curGroupList[i];
                item = new com.ResourceItem(name_1, this.curGroupList[i], com.ResourceItem.TYPE_XML);
                item.groupName = "thmGroup";
                this.addRes(item, false, false);
            }
        };
        // ----------------------------------------------- todo -----------------------------------------------
        LoadManager.prototype.createGroup = function ($name, $keys, $override) {
            if ($override === void 0) { $override = false; }
            //暂时没实现
            return false;
        };
        LoadManager.prototype.destroyRes = function ($name, $force) {
            if ($force === void 0) { $force = true; }
            //暂时没实现
            return false;
        };
        LoadManager.prototype.setMaxRetryTimes = function ($retry) {
            //暂时没实现
        };
        LoadManager.prototype.parseConfig = function ($data, $folder) {
            //暂时没实现
        };
        LoadManager.prototype.registerAnalyzer = function ($type, $analyzerClass) {
            //暂时没实现
        };
        LoadManager.groupDic = new game.Dictionary();
        LoadManager.groupsDic = {};
        return LoadManager;
    }(egret.EventDispatcher));
    com.LoadManager = LoadManager;
    __reflect(LoadManager.prototype, "com.LoadManager");
})(com || (com = {}));
//# sourceMappingURL=LoadManager.js.map