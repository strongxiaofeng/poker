module eui {
	export class AComponent extends Component{
		public constructor() {
			super();
		}

		// setSkinName(url:string)
		// {
		// 	com.LoadManager.getInstance().getResByUrl(url, (data)=>{
		// 		this.initSkin(data);
		// 	}, this, com.ResourceItem.TYPE_XML);
		// }

		// /**根据XML皮肤 添加显示对象 */
		// private initSkin(xml: egret.XML)
		// {
		// 	let children = <egret.XML[]>xml.children;
		// 	this._createChildren(this, children);
		// }
		// private _createChildren(parent:egret.DisplayObjectContainer, children: egret.XML[])
		// {
		// 	if(children.length > 0)
		// 	{
		// 		for(let i=0; i<children.length; i++)
		// 		{
		// 			let childXml = <egret.XML>children[i];
		// 			let child = this.createChildByXml(parent, childXml);
		// 			if(childXml.children && childXml.children.length>0)
		// 			{
		// 				this._createChildren(child, <egret.XML[]>childXml.children);
		// 			}
		// 		}
		// 	}

		// }
		// /**添加一个子节点 赋值它的属性 */
		// private createChildByXml(parent:egret.DisplayObjectContainer, xml: egret.XML): any
		// {
		// 	var namespace = xml.prefix;
		// 	var cls = xml.localName;

		// 	if(namespace == "e") namespace = "eui";
		// 	let child = this.createChildByCls(namespace+"."+cls);
		// 	parent.addChild(child);

		// 	//为节点添加属性
		// 	var attrs = xml.attributes;
		// 	for(var key in attrs)
		// 	{
		// 		let value = attrs[key];
		// 		//value是有效的值
		// 		if(value && value.length>0)
		// 		{
		// 			let lastChar = value.charAt(value.length-1);
		// 			//百分比的属性值
		// 			if(lastChar == "%")
		// 			{
		// 				value = parseFloat(value.slice(0, value.length-1));
		// 				if(key == "width")
		// 				{
		// 					child.width = parent.width* value / 100;
		// 				}
		// 				else if(key == "height")
		// 				{
		// 					child.height = parent.height* value / 100;
		// 				}
		// 			}
		// 			//Image的source处理下 把key变成texture
		// 			else if(cls=="Image" && key=="source")
		// 			{
		// 				child.source = com.LoadManager.getInstance().getRes(value);
		// 			}
		// 			else{
		// 				child[key] = attrs[key];
		// 			}
		// 		}
		// 		//value是null "" 0 等等
		// 		else{
		// 			child[key] = attrs[key];
		// 		}
		// 	}
		// 	return child;
		// }
		// /**new个子节点对象 */
		// private createChildByCls(clazz:string): any
		// {
		// 	if(clazz == "eui.AButton")
		// 	{

		// 	}
		// 	var child = eval("new "+clazz+"()");
		// 	return child;
		// }
		// /**new个AButton对象 */
		// private createAbutton(xml: egret.XML)
		// {
		// 	let mouseTexture: string = xml.attributes.mouseTexture;


		// 	var haveMouseOver = mouseTexture ? true: false;
		// 	var defaultImgUrl = defaultImgUrl;
		// 	var pressImgUrl = pressImgUrl;
		// 	var mouseOverImgUrl = mouseOverImgUrl;
		// 	var disableImgUrl = disableImgUrl;

		// }


	}
}