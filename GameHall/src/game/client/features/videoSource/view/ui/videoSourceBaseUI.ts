module game {
	export class videoSourceBaseUI extends BaseUI {
		public data:string = '';
		public constructor(data:string) {
			super();
			this.data = data;
		}
	}
}