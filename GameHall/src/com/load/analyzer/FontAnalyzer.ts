module com {

	export class FontAnalyzer extends AnalyzerBase {

		public constructor() {
			super();
		}

		public analyzerFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void {
			resItem.setRes(resItem.data);
			compFunc.call(thisObject, resItem);
		}

	}
}