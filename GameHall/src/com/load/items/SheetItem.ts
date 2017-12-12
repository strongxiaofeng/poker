module com {

	/**
	 * 由于由两个资源组成，所以需要等待另一个资源加载完成后，才算加载完
	 * 加载完，执行一次解析，之后就直接取
	 */
	export class SheetItem {

		public jsonItem: ResourceItem;
		public imgItem: ResourceItem;
		private _loaded = false;
		private textureMap: any = {};

		public constructor() { }

		public getRes(subName: string): egret.Texture {
			return this.textureMap[subName];
		}

		public setJson(json: ResourceItem): void {
			this.jsonItem = json;
			this.creatSheet();
		}

		public setImg(img: ResourceItem): void {
			this.imgItem = img;
			this.creatSheet();
		}

		private creatSheet(): void {
			if (this.jsonItem && this.imgItem) {
				let frames: any = this.jsonItem.getRes().frames;
				if (!frames) {
					return null;
				}
				let spriteSheet: egret.SpriteSheet = new egret.SpriteSheet(this.imgItem.getRes());
				let textureMap: any = this.textureMap;
				for (let subkey in frames) {
					let config: any = frames[subkey];
					let texture: egret.Texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
					if (config["scale9grid"]) {
						let str: string = config["scale9grid"];
						let list: string[] = str.split(",");
						texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
					}
					if (textureMap[subkey] == null) {
						textureMap[subkey] = texture;
					}
				}
				this._loaded = true;
			}
		}

		public executeCall(): void {
			if (this.jsonItem) {
				let callList = this.jsonItem.getCallback();
				let len = callList.length;
				for (let i = 0; i < len; i++) {
					if (callList[i].subkey != "") {
						if (this.textureMap[callList[i].subkey]) {
							callList[i].callBack.call(callList[i].thisObj, this.textureMap[callList[i].subkey], callList[i].subkey);
						}
					}
					else {
						callList[i].callBack.call(callList[i].thisObj, this.jsonItem.getRes(), this.jsonItem.name);
					}
				}
			}
		}

		public get Loaded(): boolean {
			return this._loaded;
		}

	}
}