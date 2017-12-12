class TestListItem2 extends eui.BaseItem{
	private txt: eui.Label;
	private btn1: eui.Button;
	private rect: eui.Rect;
	public constructor() {
		super();
		this.skinName = "resource/skins/game_skins/testItem2.exml";
	}

	/**初始化数据 子类重写*/
	public initData()
	{
		this.txt.text = this.data;
	}

	/**初始化事件 子类重写*/
	public initListener()
	{
		this.registerEvent(this.btn1, egret.TouchEvent.TOUCH_TAP, this.beFirst, this);
	}
	/**供外部调用的方法 */
	public update()
	{
		var array = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
		var str = "0x";
		for(let i=0; i<6; i++)
		{
			str += array[Math.floor(Math.random()*16)];
		}
		this.rect.fillColor = +str;
	}
	/**清除这个item 子类重写 */
	public dispose(isRemoveAll:boolean=false)
	{
		super.dispose(isRemoveAll);
	}
}