module game {
	/**绿色提示 比如 复制成功 */
	export class TipMsgRedUI extends BaseUI{
		private txt: eui.ALabel;
		private text: string;
		private redGroup:eui.Group;
		public constructor(text:string) {
			super();
			this.text = text;
			this.skinName = SystemPath.skin_path + "tipMsg/tipMsgRedSkin.exml";
		}
        public initSetting(): void 
		{
			this.txt.text = this.text;
			// CTween.get(this)
			// 	.to({alpha:0.01}, 1000)
			// 	.call(()=>{
			// 		CTween.removeTweens(this);
			// 		this.alpha = 1;
			// 		MediatorManager.closeMediator(Mediators.Mediator_TipRed.name);
			// 	})
			CTweenManagerController.getInstance().startCTween(2,[this.redGroup],true,()=>{
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