module game {
	export class AnnounceAlertMediator extends BaseMediator{
		public constructor() {
			super();
		}

		/**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
		protected initUI(): void{
			//按时间从新到旧排序
			var arr = <Array<AnnounceItemDetail>>this.data;
			arr.sort(function(a:AnnounceItemDetail,b:AnnounceItemDetail){
				return a.publish_time-b.publish_time>0 ? -1 : 1;
			});

			this.ui = new AnnounceAlertUI(arr);
			UIManager.OpenUI(this.ui, Mediators.Mediator_AnnounceAlertMediator.layer);
		}


		public dispose(direction?:any): void{
			super.dispose(direction);
		}
	}
}