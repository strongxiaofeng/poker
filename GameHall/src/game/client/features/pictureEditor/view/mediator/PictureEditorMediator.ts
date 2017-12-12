module game{
    export class PictureEditorMediator extends BaseMediator
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
			currentUI = egret.getDefinitionByName("game.PictureEditorUI" + GlobalConfig.multiSkinType);
			this.ui = new currentUI(this.data);
			UIManager.OpenUI(this.ui, Mediators.Mediator_PictureEditor.layer);
        }
        /**初始化数据*/
        protected initData():void
        {
            this.addRegister(Mediators.Mediator_PictureEditor.name, this);
            this.notifyUI(PictureEditorCommands.initListener,this);
        }
        /** 修改俱乐部头像 */
        public static Type_ClubPicture: string = "Type_ClubPicture";
        /** 修改用户头像 */
        public static Type_UserPicture: string = "Type_UserPicture";
// ---------------------------------- dispose ----------------------------------
		public dispose(): void {
			this.removeRegister(Mediators.Mediator_PictureEditor.name);
			super.dispose();
		}
    }
}