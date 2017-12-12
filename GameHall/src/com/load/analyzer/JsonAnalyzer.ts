module com {

	export class JsonAnalyzer extends TextAnalyzer {

		public constructor() {
			super();
		}

		protected parseString(str: string, callBack: Function, thisObj: any, resItem: ResourceItem): void {
			resItem.data = str;
			var obj = JSON.parse(str);
			resItem.setRes(obj);
			callBack.call(thisObj, resItem);
		}

	}
}