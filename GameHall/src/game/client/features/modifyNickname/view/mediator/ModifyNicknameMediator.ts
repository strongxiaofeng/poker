module game{
    export class ModifyNicknameMediator extends BaseMediator
    {
        public constructor()
        {
            super();
        }
        /**初始化数据*/
        protected initClientData(): void
        {

        }
        /**初始化UI*/
        protected initUI():void
        {
            var currentUI: any;
			currentUI = egret.getDefinitionByName("game.ModifyNicknameUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI();
			UIManager.OpenUI(this.ui, Mediators.Mediator_ModifyNickname.layer);
        }
        /**初始化数据*/
        protected initData():void{

        }
// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.removeRegister(Mediators.Mediator_ModifyNickname.name);
			super.dispose();
		}
    }
}