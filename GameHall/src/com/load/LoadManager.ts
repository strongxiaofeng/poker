module com {

	/** 资源加载管理
	 * @desc 每个独立的资源都会创建一个ResourceItem，包含加载信息和加载完成后的数据
	 * */
	export class LoadManager extends egret.EventDispatcher {

		// ----------------------------------------------- 变量声明 -----------------------------------------------

		/** 等待加载资源队列 */
		private _resList: Array<ResourceItem>;
		/** 加载器列表 */
		private _loaderList: Array<LoadItem>;
		/**并行加载数，用来控制 _loaderList的数量*/
		private _loaderS = 6;
		/** 解析器字典 */
		private analyzerDic: any = {};
		private analyzerClassMap: any = {};
		/** 已加载的普通资源列表 - ResourceItem */
		private _loadedResDic: any = {};
		/** 加载的sheet，包含解析完和未解析完的 - SheetItem */
		private _loadedSheetDic: any = {};
		/** 加载的font文件 */
		private _loadedFontDic: any = {};
		/** 正在加载的资源对象，再次收到这个对象的加载请求，
		 * 就添加到回调列表里，等待资源加载完后，集体执行回调
		 * */
		private _loadingResDic: any = {};
		/** 静态资源根目录，相对路径 */
		private _resourceRoot: string;
		/** dafault.res.json路径 */
		private _resourceName: string;
		/** 已经加载的dafault.res.json */
		private _resourceJson: Object;
		/**group加载 */
		private curGroupList: Array<string>;
		private loadGroupList: Array<string> = [];
		private curGroupName: string = "";
		private loadedGroups: Array<string> = [];
		/**等待加载的group */
		private waitLoadGroup: Array<string> = [];
		/**版本控制json文件 */
		private versionJson: any;
		/** version文件 */
		private verJsonData: any;
		private verCompleteCallBack: Function;
		private verThisObject: any;
		private storageFull = false;

		public static groupDic: game.Dictionary = new game.Dictionary();
		public static groupsDic: Object = {};

		// ----------------------------------------------- init -----------------------------------------------

		public constructor() {
			super();
			this._resList = new Array<ResourceItem>();
			this._loaderList = new Array<LoadItem>();
			this._resourceJson = new Object();
			this.init();
		}

		private init(): void {
			for (var i = 0; i < this._loaderS; i++) {
				this._loaderList[i] = new LoadItem();
				this._loaderList[i].index = i;
			}
			let analyzerClassMap = this.analyzerClassMap;
			analyzerClassMap[ResourceItem.TYPE_BIN] = BinAnalyzer;
			analyzerClassMap[ResourceItem.TYPE_IMAGE] = ImageAnalyzer;
			analyzerClassMap[ResourceItem.TYPE_TEXT] = TextAnalyzer;
			analyzerClassMap[ResourceItem.TYPE_JSON] = JsonAnalyzer;
			analyzerClassMap[ResourceItem.TYPE_SHEET] = SheetAnalyzer;
			analyzerClassMap[ResourceItem.TYPE_FONT] = FontAnalyzer;
			analyzerClassMap[ResourceItem.TYPE_SOUND] = SoundAnalyzer;
			analyzerClassMap[ResourceItem.TYPE_XML] = XMLAnalyzer;
			analyzerClassMap[ResourceItem.TYPE_ZIP] = ZipAnalyer;
		}

		/** 单例 */
		private static _instacne: LoadManager;

		/** 获取单例 */
		public static getInstance(): LoadManager {
			if (LoadManager._instacne == null) {
				LoadManager._instacne = new LoadManager();
				LoadManager.startUpListener();
			}
			return LoadManager._instacne;
		}

		/** 启动监听 */
		public static startUpListener(): void {
			com.LoadManager.getInstance().addEventListener(com.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			com.LoadManager.getInstance().addEventListener(com.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			com.LoadManager.getInstance().addEventListener(com.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		}

		/** 组资源加载完毕 */
		private static onResourceLoadComplete(evt: com.ResourceEvent): void {
			var callList: any = LoadManager.groupDic.getValue(evt.groupName);
			if (callList && callList.loadComplement) {
				callList.loadComplement.call(callList.thisObject);
				LoadManager.removeGroupListener(evt.groupName);
			}
			//判断多个资源组加载的情况
			for (let key in LoadManager.groupsDic) {
				if (key.indexOf(evt.groupName) > -1)//包含这个组
				{
					let obj = LoadManager.groupsDic[key];
					let groups: Array<string> = obj.groups;
					let index = groups.indexOf(evt.groupName);
					if (index > -1) {
						groups.splice(index, 1);
					} else {
						continue;
					}
					if (groups.length > 0) {
						let total = key.split(",").length;
						obj.onResourceProgress.call(obj.thisObject, total - groups.length, total);
					} else {
						obj.loadComplement.call(obj.thisObject);//执行回调
						delete LoadManager.groupsDic[key];
					}
				}
			}
		}

		/** 组资源加载进度 */
		private static onResourceProgress(evt: com.ResourceEvent): void {
			var callList: any = LoadManager.groupDic.getValue(evt.groupName);
			if (callList && callList.onResourceProgress) {
				callList.onResourceProgress.call(callList.thisObject, evt.itemsLoaded, evt.itemsTotal);
			}
		}

		/** 单个条目加载失败 */
		private static onItemLoadError(evt: com.ResourceEvent): void {
			var callList: any = LoadManager.groupDic.getValue(evt.groupName);
			if (callList && callList.onItemLoadError) {
				callList.onItemLoadError.call(callList.thisObject, evt.itemsLoaded, evt.itemsTotal);
				game.DebugUtil.debug("Url:" + evt.resItem.url + " has failed to load");
			}
		}

		/** 移除对应的group监听 */
		public static removeGroupListener($name: string): void {
			LoadManager.groupDic.removeKey($name);
		}

		// ----------------------------------------------- version文件 -----------------------------------------------

		public loadVersion(callback: Function, thisObj: any): void {
			this.verCompleteCallBack = callback;
			this.verThisObject = thisObj;
			this.getResByUrl("resource/" + "version.json?" + new Date().getTime(), this.onVerisonLoade, this, ResourceItem.TYPE_JSON);
		}

		private onVerisonLoade(json: any): void {
			this.verJsonData = json;
			if (this.verCompleteCallBack != null) {
				this.verCompleteCallBack.call(this.verThisObject);
				this.verCompleteCallBack = null;
				this.verThisObject = null;
			}
		}

		public getVersion(url: string): string {
			for (var key in this.verJsonData.files) {
				if ("resource/" + key == url) {
					url = url + "?" + this.verJsonData.files[key];
				}
			}
			if (url.indexOf("?") == -1) {
				url = url + "?" + new Date().getTime();
			}
			return url;
		}

		// ----------------------------------------------- 加载default.res.json -----------------------------------------------

		/** 这个函数只是用来加载default.res.json的
		 * 其他静态资源都是从这里读取的，主要通过getRes()这个函数去取
		 */
		public loadConfig(url: string, resourceRoot: string, type = ResourceItem.TYPE_JSON): Promise<{}> {
			return new Promise((resolve, reject) => {
				var configDone = () => {
					resolve();
				};
				com.LoadManager.getInstance().addEventListener(com.ResourceEvent.CONFIG_COMPLETE, configDone, this);
				this._resourceRoot = resourceRoot;
				this._resourceName = url;
				var item = new ResourceItem(url, url, ResourceItem.TYPE_JSON);
				this.addRes(item, false, true);
			});
		}

		/** 检查default.res.json是否已经加载 */
		public isConfigLoaded(): boolean {
			return !!(this._resourceJson
				&& this._resourceJson.hasOwnProperty("groups")
				&& this._resourceJson.hasOwnProperty("resources")
				&& this._resourceJson.hasOwnProperty("sheet"));
		}

		// ----------------------------------------------- 加载资源组 -----------------------------------------------

		/** 根据组名加载一组资源
		 * @method RES.loadGroup
		 * @param groupName {string}
		 * @param priority {number}
         */
		public loadGroup(groupName: string, $priority: number = 0): Promise<{}> {
			return new Promise((resolve, reject) => {
				let loadDone = () => { resolve(); };
				let loadError = () => { reject(); };
				LoadManager.groupDic.setValue(groupName, { thisObject: this, loadComplement: loadDone, onResourceLoadError: loadError });
				if (this.curGroupName != "") {
					this.waitLoadGroup.push(groupName);
					return;
				}
				if (this.isGroupLoaded(groupName)) {
					this.curGroupName = groupName;
					this.groupLoadSucc();
					return;
				}
				if (this._resourceJson
					&& this._resourceJson.hasOwnProperty("groups")
					&& this._resourceJson.hasOwnProperty("resources")
					&& this._resourceJson.hasOwnProperty("sheet")) {
					if (this._resourceJson["groups"][groupName]) {
						this.curGroupName = groupName;
						var keys: string = this._resourceJson["groups"][groupName];
						var item: ResourceItem;
						if (keys.indexOf(".files") > -1)//加载的zip
						{
							if (game.GlobalConfig.isSupportWebp == true)//需要加载webp的资源
							{
								let webp = keys.replace(".files", ".webps");
								item = new ResourceItem(keys, this._resourceRoot + webp, ResourceItem.TYPE_ZIP);
							} else {
								item = new ResourceItem(keys, this._resourceRoot + keys, ResourceItem.TYPE_ZIP);
							}
							item.groupName = groupName;
							this.addRes(item);
						} else {
							this.curGroupList = keys.split(",");
							var name = "";
							var obj: any;
							//过滤一次
							for (let i = this.curGroupList.length - 1; i >= 0; i--) {
								//跳过了..
								name = this.curGroupList[i];
								if (this._loadedResDic[name] || this._loadedSheetDic[name] || this._loadedFontDic[name]) {
									//已加载，删掉
									this.curGroupList.splice(i, 1);
								}
							}
							if (this.curGroupList.length == 0) {
								this.groupLoadSucc();
								return;
							}
							var len = this.curGroupList.length;
							for (let i = 0; i < len; i++) {
								name = this.curGroupList[i];
								if (this._resourceJson["resources"][name]) {
									obj = this._resourceJson["resources"][name];
								}
								else if (this._resourceJson["sheet"][name]) {
									obj = this._resourceJson["sheet"][name];
								}
								item = new ResourceItem(name, this._resourceRoot + obj.url, obj.type);
								item.groupName = groupName;
								this.addRes(item);
							}
						}
					} else {
						throw new Error("no this group:" + groupName);
					}
				}
			});
		}

		/** 请求加载多个资源组
		 * 资源组的名称用逗号隔开,比如 "login,proload,public"
		 * */
		public loadMultiGroup(groupNames: string, onResourceProgress: Function = null, thisObject: any = null): Promise<{}> {

			return new Promise((resolve, reject) => {
				let multiDone = (params) => {
					resolve();
				};
				let multiProgress = (params) => {
					if (onResourceProgress && thisObject) {
						onResourceProgress.call(thisObject, [params, groupNames.split(",").length]);
					}
				}
				LoadManager.groupsDic[groupNames] = {
					thisObject: this,
					loadComplement: multiDone,
					onResourceProgress: multiProgress,
					groups: groupNames.split(",")
				};
				if (groupNames == "") { return; }
				let split = groupNames.split(",");
				for (let g = 0; g < split.length; g++) {
					//已经加载的跳过
					if (this.isGroupLoaded(split[g])) {
						ResourceEvent.dispatchResourceEvent(this, ResourceEvent.GROUP_COMPLETE, split[g]);
						continue;
					}
					//没有加载的，就加载第一个
					this.loadGroup(split[g]);
				}
			});
		}

		/** 检查某个资源组是否已经加载完成
		 * @method RES.isGroupLoaded
		 * @param name {string}
		 * @returns {boolean}
         */
		public isGroupLoaded(groupName: string): boolean {
			return this.loadedGroups.indexOf(groupName) != -1;
		}

		/**多个资源组是否都加载完成 */
		public isMultiGroupLoaded(groupNames: string): boolean {
			let split = groupNames.split(",");
			for (let g in split) {
				if (this.isGroupLoaded(split[g]) == false) {
					return false;
				}
			}
			return true;
		}

		/**zip加载专用，不能单独调用 */
		public setGroupList(list: Array<string>): void {
			this.curGroupList = list;
		}

		/** 检查资源组加载进度 */
		private checkGroupList(res: ResourceItem): void {
			if (this.curGroupList && this.curGroupList.length > 0 && res.groupName == this.curGroupName) {
				let index = this.curGroupList.indexOf(res.name);
				//移除
				if (index > -1) {
					this.loadGroupList.push(res.name);
					let curLen = this.curGroupList.length;
					if (curLen == this.loadGroupList.length) {
						//资源组加载完成
						this.groupLoadSucc();
					} else {
						ResourceEvent.dispatchResourceEvent(this, ResourceEvent.GROUP_PROGRESS, this.curGroupName, res, this.loadGroupList.length, this.curGroupList.length);
					}
				}
			}
		}

		/** 资源组加载成功 */
		private groupLoadSucc(): void {
			ResourceEvent.dispatchResourceEvent(this, ResourceEvent.GROUP_COMPLETE, this.curGroupName);
			this.loadGroupList = [];
			this.loadedGroups.push(this.curGroupName);
			this.curGroupName = "";
			this.curGroupList = null;
			if (this.waitLoadGroup.length > 0) {
				this.loadGroup(this.waitLoadGroup.shift());
			}
		}

		// ----------------------------------------------- ResourceItem的加载与解析 -----------------------------------------------

		/** 添加一个ResourceItem加载项
		 *  @desc 先检查资源的版本号，再从localStorage取，如果没有则放进加载队列
		 */
		public addRes(res: ResourceItem, isPriority: boolean = false, needVer: boolean = true): void {
			//统一加版本号：
			if (needVer) {
				if (res.url.indexOf("?") > -1) {
					res.url = res.url.slice(0, res.url.indexOf("?"));
				}
				res.url = this.getVersion(res.url);
			}
			var hasItem: ResourceItem = this._loadingResDic[res.name];
			if (hasItem) {
				if (hasItem.key == res.key && hasItem.type == res.type) {
					if(res.groupName) hasItem.groupName = res.groupName + "";
					hasItem.addCallback(res.getCallback());
					res.dispose();
					return;
				}
			} else {
				this._loadingResDic[res.name] = res;
			}
			//看localStorage是否有这个资源，有就直接返回图片
			if (res.url.indexOf("?") > -1) {
				var arr = res.url.split("?");
				var key = arr[0];
				var ver = arr[1];
				var local = egret.localStorage.getItem(key);
				if (local && local != "") {
					let r = local.split("?");
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
							return;//localStorage取出里有资源，直接取
						} catch (err) {
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
		}

		/** 开始加载一个ResourceItem */
		private startLoad(): void {
			//看还剩余几个加载器
			var len = this._loaderList.length;
			if (len > 0 && this._resList.length > 0) {
				for (var i = 0; i < len; i++) {
					if (this._resList.length <= 0) {
						break;
					}
					var load = this._loaderList.pop();//减小底层运算
					var res = this._resList.shift();//加载有优先级
					load.addEventListener(egret.Event.COMPLETE, this.handleLoad, this);
					load.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleLoadErr, this);
					load.addEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
					load.startLoad(res);
				}
			}
		}

		/** 解析一个加载完毕的ResourceItem */
		public analyzer(res: ResourceItem): void {
			let analyzer: AnalyzerBase = this.analyzerDic[res.type];
			if (!analyzer) {
				let clazz = this.analyzerClassMap[res.type];
				if (!clazz) {
					if (DEBUG) {
						egret.$error(3203, res.type);
					}
					return;
				}
				analyzer = this.analyzerDic[res.type] = new clazz();
			}
			analyzer.analyzerFile(res, this.analyzerCom, this);
		}

		/** ResourceItem解析成功回调 */
		public analyzerCom(res: ResourceItem): void {
			//还需要加版本号
			if (!this.storageFull && res.isLocal == false && res.type === ResourceItem.TYPE_ZIP) {
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
				case ResourceItem.TYPE_ZIP:
					var zipItem = new ZipItem();
					zipItem.setRes(res);
					return;
				case ResourceItem.TYPE_IMAGE:
					if (this._loadedSheetDic[res.name]) {
						var sheet: SheetItem = this._loadedSheetDic[res.name];
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
						var font: FontItem = this._loadedFontDic[res.name];
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
				case ResourceItem.TYPE_FONT:
					if (this._loadedFontDic[res.name]) {
						this.checkGroupList(res);
						return;
					}
					var fontItem = new FontItem();
					fontItem.setJson(res);
					this._loadedFontDic[res.name] = fontItem;
					var imgItem = new ResourceItem(res.name, fontItem.getTexturePath(), ResourceItem.TYPE_IMAGE);
					imgItem.groupName = res.groupName;
					this.addRes(imgItem, true);
					return;
				case ResourceItem.TYPE_SHEET:
					if (this._loadedSheetDic[res.name]) {
						this.checkGroupList(res);
						return;
					}
					var sheetObj = res.getRes();
					var sheetUrl = res.key;
					sheetUrl = AnalyzerBase.getStringSprit(sheetUrl) + sheetObj["file"];
					var sheetItem = new SheetItem();
					sheetItem.setJson(res);
					this._loadedSheetDic[res.name] = sheetItem;
					//还要加版本号
					var sheetImg = new ResourceItem(res.name, sheetUrl, ResourceItem.TYPE_IMAGE);
					sheetImg.groupName = res.groupName;
					this.addRes(sheetImg, true);
					return;
				case ResourceItem.TYPE_JSON:
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
						ResourceEvent.dispatchResourceEvent(this, ResourceEvent.CONFIG_COMPLETE);
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
		}


		private handleLoad(e: egret.Event): void {
			var loader: LoadItem = <LoadItem>e.target;
			loader.resItem.data = loader.data;
			this.analyzer(loader.resItem);
			//加回去
			loader.removeEventListener(egret.Event.COMPLETE, this.handleLoad, this);
			loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleLoadErr, this);
			loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
			loader.reset();
			this._loaderList.push(loader);
			this.startLoad();
		}

		private handleProgress(e: egret.ProgressEvent): void { }

		private handleLoadErr(e: egret.IOErrorEvent): void {
			var loader: LoadItem = <LoadItem>e.target;
			loader.removeEventListener(egret.Event.COMPLETE, this.handleLoad, this);
			loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleLoadErr, this);
			loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
			//加载失败，回调的资源是空
			// loader.resItem.executeCall(null);
			loader.resItem.dispose();
			loader.reset();
			this._loaderList.push(loader);
			this.startLoad();
		}

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
		public getRes(key: string): any {
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
		}

		/** 通过key异步获取资源
         * @method RES.getResAsync
         * @param key {string}
         * @param compFunc {Function} 回调函数。示例：compFunc(data,url):void。
         * @param thisObject {any}
         */
		public getResAsync(key: string, compFunc: Function, thisObject: any): boolean {
			if (this._loadedFontDic[key]) {
				compFunc.call(thisObject, this._loadedFontDic[key].getRes(), key);
				return true;
			}
			else if (this._loadedResDic[key]) {
				let item = this._loadedResDic[key];
				compFunc.call(thisObject, item.getRes(), key);
				return true;
			}
			else {
				//sheet里找
				let t = this.findSheet(key);
				if (t) {
					compFunc.call(thisObject, t, key);
					return true;
				}
			}
			//还要加载sheet里的
			if (this._resourceJson["resources"][key]) {
				let obj = this._resourceJson["resources"][key];
				let item = new ResourceItem(key, this._resourceRoot + obj.url, obj.type);
				item.needCallback(compFunc, thisObject);
				this.addRes(item);
				return true;
			}
			else {
				for (let index in this._resourceJson["sheet"]) {
					let obj = this._resourceJson["sheet"][index];
					if (obj) {
						if (obj.subkeys.indexOf(key) > -1) {
							let item = new ResourceItem(index, this._resourceRoot + obj.url, ResourceItem.TYPE_SHEET);
							item.needCallback(compFunc, thisObject, key);
							this.addRes(item);
							return true;
						}
					}
				}
				if (key.indexOf(".") > -1) {
					let arr = key.split(".");
					if (this._resourceJson["sheet"][arr[0]]) {
						let obj = this._resourceJson["sheet"][arr[0]];
						if (obj) {
							if (obj.subkeys.indexOf(arr[1]) > -1) {
								let item = new ResourceItem(arr[0], this._resourceRoot + obj.url, ResourceItem.TYPE_SHEET);
								item.needCallback(compFunc, thisObject, arr[1]);
								this.addRes(item);
								return true;
							}
						}
					}
				}
			}
			return false;
		}

		/** 通过url获取资源
		 * @method RES.getResByUrl
		 * @param url {string}
		 * @param compFunc {Function}
		 * @param thisObject {any}
		 * @param type {string}
         */
		public getResByUrl(url: string, compFunc: Function, thisObject: any, type: string = "", priority = false): void {
			if (this.getRes(url)) {
				compFunc.call(thisObject, this.getRes(url));
				return;
			}
			let item = new ResourceItem(url, url, type);
			item.needCallback(compFunc, thisObject);
			this.addRes(item, priority, false);
		}

		// ----------------------------------------------- util -----------------------------------------------

		/** 通过资源在default.res.json中的key获取其URL */
		public getUrlByKey(key: string): string {
			if (this._resourceJson && this._resourceJson["resources"] && this._resourceJson["resources"][key]) {
				return this._resourceJson["resources"][key]["url"];
			}
			return key;
		}

		/**是否是空闲*/
		public isIdle(): boolean {
			return this._loaderList.length == this._loaderS;
		}

		/** ArrayBuffer to String */
		private ab2str(buf) {
			var binary = '';
			var bytes = new Uint8Array(buf);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return binary;
		}

		/** String to ArrayBuffer */
		private str2ab(str) {
			var buf = new ArrayBuffer(str.length * 2);//2 bytes for each char
			var bufView = new Uint8Array(buf);
			for (var i = 0, strLen = str.length; i < strLen; i++) {
				bufView[i] = str.charCodeAt(i);
			}
			return buf;
		}

		/**key 对应配置文件里的 name 属性或 sbuKeys 属性的一项。 */
		public hasRes(key: string): boolean {
			if (this._resourceJson["resources"][key]) {
				return true;
			} else {
				//再在sheet里找，没有就没有了，返回null
				for (let index in this._resourceJson["sheet"]) {
					let obj = this._resourceJson["sheet"][index];
					if (obj) {
						if (obj.subkeys.indexOf(key) > -1) {
							return true;
						}
					}
				}
			}
			if (key.indexOf(".") > -1) {
				let arr = key.split(".");
				if (this._resourceJson["sheet"][arr[0]]) {
					let obj = this._resourceJson["sheet"][arr[0]];
					if (obj) {
						if (obj.subkeys.indexOf(arr[1]) > -1) {
							return true;
						}
					}
				}
			}
			return false;
		}

		/** 检查sheet文件里是否含有指定的资源 */
		private findSheet(key: string): any {
			var t = null;
			for (let sheet in this._loadedSheetDic) {
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
		}

		/**用来加载自定义皮肤的 */
		public loadEXMlGroup(arr: Array<string>): void {
			this.curGroupList = arr;
			var len = arr.length;
			var item: ResourceItem;
			this.curGroupName = "thmGroup";
			for (var i = 0; i < len; i++) {
				let name = this.curGroupList[i];
				item = new ResourceItem(name, this.curGroupList[i], ResourceItem.TYPE_XML);
				item.groupName = "thmGroup";
				this.addRes(item, false, false);
			}
		}

		// ----------------------------------------------- todo -----------------------------------------------

		public createGroup($name: string, $keys: Array<string>, $override: boolean = false): boolean {
			//暂时没实现
			return false;
		}

		public destroyRes($name: string, $force: boolean = true): boolean {
			//暂时没实现
			return false;
		}

		public setMaxRetryTimes($retry: number): void {
			//暂时没实现
		}

		public parseConfig($data: any, $folder: string): void {
			//暂时没实现
		}

		public registerAnalyzer($type: string, $analyzerClass: any): void {
			//暂时没实现
		}

	}
}