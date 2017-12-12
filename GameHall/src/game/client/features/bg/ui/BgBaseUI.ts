module game
{
	export class BgBaseUI extends BaseUI
	{
		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "bg/bgSkin.exml";
		}

		/**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
		public onMediatorCommand(type: any, params: any = null): void
		{
			switch(type)
			{
				case BgCommands.setHide:
					this.setHide(params);
					break;
			}
		}

		public setHide(bool:boolean):void
		{
			this.visible = !bool;
		}
	}
}