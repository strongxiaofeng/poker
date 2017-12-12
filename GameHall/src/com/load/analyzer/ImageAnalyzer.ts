module com {

	export class ImageAnalyzer extends AnalyzerBase {

		public constructor() {
			super();
		}

		public analyzerFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void {
			var base: string = "data:" + "image/png" + ";base64,";
			if (resItem.isLocal) {
				base = base + resItem.data;
			}
			else {
				var base64 = this._arrayBufferToBase64(resItem.data);
				//往localStorage存一个base64
				resItem.data = base64;
				base = base + base64;
			}
			this.parseBase64(base, compFunc, thisObject, resItem);
		}

		private _arrayBufferToBase64(buffer): string {
			var binary = '';
			var bytes = new Uint8Array(buffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return window.btoa(binary);
		}

		protected parseBase64(base64: string, callBack: Function, thisObj: any, resItem: ResourceItem): void {
			var saveImage: HTMLImageElement = new Image;
			saveImage.onload = () => {
				saveImage.onload = null;
				var bmd = new egret.BitmapData(saveImage);
				//把图像数据传回去
				var texture = new egret.Texture();
				texture._setBitmapData(bmd);
				resItem.setRes(texture);
				callBack.call(thisObj, resItem);
			}
			saveImage.src = base64;
		}

	}
}