module game {
	export class SelectVideoBaseUI extends BaseUI {
		public constructor() {
			super();
		}
		/** 初始化设置*/
		public initSetting(): void {
			super.initSetting();
		}
		// ---------------------------------- 接收Mediator通知 ----------------------------------

		/** 接收Mediator通知*/
		public onMediatorCommand(type: SelectVideoCommands, params: any = null): void {
			switch (type)
			{
			}
		}
		/** 注册事件*/
		protected initListener(mediator: SelectVideoMediator): void {

		}
		public dispose(): void {
			super.dispose();
		}
	}
}