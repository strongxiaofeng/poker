module enums {
	/**
	 *
	 * @desc 层级的枚举常量
	 *
	 */
	export class LayerConst {
		public static LAYER_BG: number = 0;        //背景底层
		public static LAYER_UI: number = 1;        //UI层
		public static LAYER_TITLE: number = 2;        //TITLE层

		public static LAYER_MENU: number = 3; // PC版三级菜单

		public static LAYER_TIP: number = 4;       //提示层
		public static LAYER_TOP: number = 5;       //顶层
		/**TOP层的上层，最顶层··（系统提示断线，被顶号等）*/
		public static LAYER_SYSTEM: number = 6;
		public static LAYER_ROOT: number = 7;
	}
}
