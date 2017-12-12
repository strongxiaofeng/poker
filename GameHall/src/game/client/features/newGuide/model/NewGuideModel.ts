module game
{
	export class NewGuideModel
	{
		private static _instance:NewGuideModel;

		public constructor()
		{

		}

		public static getInstance():NewGuideModel
		{
			if(this._instance == null)
			{
				this._instance = new NewGuideModel();
			}

			return this._instance;
		}


		public getConfig(type:number):any
		{
			switch(type)
			{
				case 1://pc版多桌

					break;
			}
		}

		private _config = {
			"1":{
				"path":"/resource/skins/game_skins/pc/guide/MulitBaccGuide.exml",

			}
		};
	}

	export class GuideConfig
	{
		public path:string;

		public totalPage:number;

		public arrHole;
	}

	/**需要镂空的区域的对象 */
	export class HollowZone
	{
		/**镂空坐标 */
		public x:number;
		public y:number;
		/**镂空区域 */
		public erase:egret.Shape;
	}
}