module com {

	export class XMLAnalyzer extends TextAnalyzer {

		public constructor() {
			super();
		}

		protected parseString(str: string, callBack: Function, thisObj: any, resItem: ResourceItem): void {
			resItem.data = str;
			var obj = egret.XML.parse(str);
			resItem.setRes(obj);
			callBack.call(thisObj, resItem);
		}

	}
}