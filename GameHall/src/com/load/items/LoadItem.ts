module com {

	/**加载对象 */
	export class LoadItem extends egret.URLLoader {

		private _res: ResourceItem;
		private _urlRequest: egret.URLRequest = null;
		public index = 0;

		public constructor(req?: egret.URLRequest) {
			super(req);
			this._urlRequest = new egret.URLRequest();
		}

		public startLoad(res: ResourceItem): void {
			this._res = res;
			this._urlRequest.url = res.url;
			this._request = this._urlRequest;
			switch (res.type) {
				case ResourceItem.TYPE_XML:
				case ResourceItem.TYPE_TEXT:
				case ResourceItem.TYPE_JSON:
				case ResourceItem.TYPE_SHEET:
				case ResourceItem.TYPE_FONT:
					this.dataFormat = egret.URLLoaderDataFormat.TEXT;
					break;
				case ResourceItem.TYPE_IMAGE:
				case ResourceItem.TYPE_BIN:
				case ResourceItem.TYPE_ZIP:
				case ResourceItem.TYPE_WEBP:
					this.dataFormat = egret.URLLoaderDataFormat.BINARY;
					break;
				case ResourceItem.TYPE_SOUND:
					this.dataFormat = egret.URLLoaderDataFormat.SOUND;
					break;
			}
			this.load(this._request);
		}

		public reset(): void {
			//解除引用
			this._res = null;
			this.data = null;
		}

		/**获取资源的key值 */
		public getKey(): string {
			return this._res.key;
		}

		public getVersion(): string {
			return this._res.version;
		}

		public get resItem(): ResourceItem {
			return this._res;
		}

	}
}