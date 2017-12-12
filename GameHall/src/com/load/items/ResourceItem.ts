module com {

	export class CallBackObj {
		/**加载时传的subkey */
		public constructor(callBack: Function, thisObj: any, subkey: string) {
			this.callBack = callBack;
			this.thisObj = thisObj;
			this.subkey = subkey;
		}
		public callBack: Function;
		public thisObj: any;
		public subkey: string;
	}

	/**记录加载对象的信息和数据，有多少个加载对象，就有多少个这玩意，卸载资源的时候直接卸载这个玩意 */
	export class ResourceItem {
		public static TYPE_XML: string = "xml";
		public static TYPE_IMAGE: string = "image";
		public static TYPE_BIN: string = "bin";
		public static TYPE_TEXT: string = "text";
		public static TYPE_JSON: string = "json";
		public static TYPE_SHEET: string = "sheet";
		public static TYPE_FONT: string = "font";
		public static TYPE_SOUND: string = "sound";
		public static TYPE_ZIP: string = "zip";
		public static TYPE_WEBP: string = "webp";

		public name: string;
		public type: string;
		public groupName: string = "";
		private _key: string;
		private _url: string;
		private _version: string;
		private _loaded: boolean = false;
		/**是否来自localstorage */
		public isLocal = false;
		/**被引用的原始数据对象，在被解析后，就会被释放*/
		public data: any = null;
		/**存放解析后的资源*/
		private _res: any = null;
		/**回调列表..*/
		private _callBackList: Array<CallBackObj>;

		public constructor(name: string, url: string, type: string = ResourceItem.TYPE_TEXT, isWebp = false) {
			this.name = name;
			this.url = url;
			this.type = type;
			this._callBackList = new Array<CallBackObj>();
		}

		public set url(str: string) {
			this._url = str;
			var arr = this._url.split("?");
			if (arr.length == 2) {
				this._key = arr[0];
				this._version = arr[1];
			} else {
				this._key = this._url;
				this._version = "";
			}
		}

		public get url(): string {
			return this._url;
		}

		public addCallback(callbackList: Array<CallBackObj>): void {
			this._callBackList = this._callBackList.concat(callbackList);
		}

		public needCallback(callback: Function, thisObj: any, subkey: string = ""): void {
			this._callBackList.push(new CallBackObj(callback, thisObj, subkey));
		}

		public getCallback(): Array<CallBackObj> {
			return this._callBackList;
		}

		public get loaded(): boolean {
			return this._loaded;
		}

		public setRes(res: any): void {
			this._res = res;
			this._loaded = true;
		}

		//执行资源的回调
		public executeCall(res: any): void {
			if (this._loaded) {
				let len = this._callBackList.length;
				for (let i = 0; i < len; i++) {
					this._callBackList[i].callBack.call(this._callBackList[i].thisObj, res, this.name);
					this._callBackList[i].callBack = null;
					this._callBackList[i].thisObj = null;
				}
				//执行完毕，清空回调函数的引用
				this._callBackList = new Array<CallBackObj>();
			}
		}

		public getRes(): any {
			return this._res;
		}

		/**获取资源的key值 */
		public get key(): string {
			return this._key;
		}

		public get version(): string {
			return this._version;
		}

		/**释放资源-调用完也清空这个对象的引用*/
		public dispose(): void {
			this._callBackList = null;
			this.data = null;
			this._res = null;
			this.name = null;
			this._url = null;
			this.type = null;
			this.groupName = null;
			this._key = null;
			this._version = null;
		}

	}
}