module com {

	/**不需要处理，因为都是按二进制数据的方式加载进来的 */
	export class BinAnalyzer extends AnalyzerBase {

		public constructor() {
			super();
		}

		public analyzerFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void {
			resItem.setRes(resItem.data);
			compFunc.call(thisObject, resItem);
		}

	}
}