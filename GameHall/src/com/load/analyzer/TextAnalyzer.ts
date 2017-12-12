module com {

	export class TextAnalyzer extends AnalyzerBase {

		public constructor() {
			super();
		}

		public analyzerFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void {
			var str = resItem.data;
			this.parseString(str, compFunc, thisObject, resItem);
		}

		private _arrayBufferToString(buffer): string {
			var binary = '';
			var bytes = new Uint8Array(buffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return binary;
		}

		protected parseString(str: string, callBack: Function, thisObj: any, resItem: ResourceItem): void {
			resItem.setRes(str);
			callBack.call(thisObj, resItem);
		}

	}
}