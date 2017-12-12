class TestListUI extends eui.Component{
	private scroller1: eui.Scroller;
	private list: eui.BaseList;
	private input1: eui.EditableText;
	private input2: eui.EditableText;
	private input3: eui.EditableText;
	private btn1: eui.Button;
	private btn2: eui.Button;
	private btn3: eui.Button;
	private btn4: eui.Button;
	private btn5: eui.Button;
	private btn6: eui.Button;

	private scroller2: eui.Scroller;
	private list2: eui.BaseList;
	private input11: eui.EditableText;
	private input22: eui.EditableText;
	private input33: eui.EditableText;
	private btn11: eui.Button;
	private btn22: eui.Button;
	private btn33: eui.Button;
	private btn44: eui.Button;
	public constructor() {
		super();
		this.skinName = "resource/skins/game_skins/testList.exml";

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init()
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

		this.list.itemRenderer = TestListItem;
		this.list.mouseWheelEnable = true;
		this.list.mouseWheelDistance = 25;
		this.list.maxLength = 6;
		var dataArr = [3,43,22,121,545];
		this.list.addItems(dataArr);

		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addData, this);
		this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.excute, this);
		this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.delete, this);
		this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearItems, this);
		this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBottom, this);
		this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeAutoGoBottom, this);



		this.list2.itemRenderer = TestListItem2;
		var dataArr2 = [3,43,22,121,545,151,2,455,111,223,45,48,"aa","sd"];
		this.list2.addItems(dataArr2);

		this.btn11.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addData2, this);
		this.btn22.addEventListener(egret.TouchEvent.TOUCH_TAP, this.excute2, this);
		this.btn33.addEventListener(egret.TouchEvent.TOUCH_TAP, this.delete2, this);
		this.btn44.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearItems2, this);
	}

	private addData()
	{
		this.list.addItems([this.input1.text]);
	}
	private excute()
	{
		let item: TestListItem = this.list.getItem("data", this.input2.text);
		item.update();
	}
	private delete()
	{
		this.list.removeItem("data", this.input3.text);
	}
	private clearItems()
	{
		this.list.removeAll();
	}
	private goBottom()
	{
		this.list.goBottom();
	}
	private changeAutoGoBottom()
	{
		this.list.autoScrollToBottom = !this.list.autoScrollToBottom;
		this.btn6.label = "自动滚动"+this.list.autoScrollToBottom;
	}

	private addData2()
	{
		this.list2.addItems([this.input11.text]);
	}
	private excute2()
	{
		let item: TestListItem = this.list2.getItem("data", this.input22.text);
		item.update();
	}
	private delete2()
	{
		this.list2.removeItem("data", this.input33.text);
	}
	private clearItems2()
	{
		this.list2.removeAll();
	}

}