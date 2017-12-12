module game {
	/**绿色提示 比如 复制成功 */
	export class TipMsgGreenUI extends BaseUI{
		private txt: eui.ALabel;
		private text: string;
		private greenGroup:eui.Group;
		public constructor(text:string) {
			super();
			this.text = text;
			this.skinName = SystemPath.skin_path + "tipMsg/tipMsgGreenSkin.exml";
		}
        public initSetting(): void 
		{
			this.txt.text = this.text;
			// CTween.get(this)
			// 	.to({alpha:0.01}, 1000)
			// 	.call(()=>{
			// 		CTween.removeTweens(this);
			// 		this.alpha = 1;
			// 		MediatorManager.closeMediator(Mediators.Mediator_TipGreen.name);
			// 	})
			CTweenManagerController.getInstance().startCTween(2,[this.greenGroup],true,()=>{
					MediatorManager.closeMediator(Mediators.Mediator_TipGreen.name);
			},this);
        }
        public onMediatorCommand(type: any, params: any = null): void 
		{

        }
        public dispose(): void 
		{
			super.dispose();
			CTween.removeTweens(this);
			CTweenManagerController.getInstance().endAllCTween();
		}
	}
}