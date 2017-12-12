module game
{
	export class PCMulitBaccGuide extends NewGuideBaseUI
	{
		public constructor()
		{
			let ui:BaseUI = new PCMultiBaccUI1(true);
			super(ui);
			this.skinName = SystemPath.skin_path + "guide/MulitBaccGuide.exml";
		}

		/**重写这个函数 */
		public set page(value:number)
		{
			this._page = value;
			let ui = <PCMultiBaccUI1>this.guideUI;
			if(value > 9)
			{
				return;
			}
			this.clearHollow();

			if(value - 1 > 0)
			{
				this["page" + (value - 1)].visible = false;
			}
			this["page" + value].visible = true;
			this.btn_startGame.visible = false;

			switch(value)
			{
				case 1:
					this.setHollows([]);
					// console.warn(this["page" + value]);
					break;
				case 2:
					{
						let list = ui.mulitList.getItems();
						let item = list[list.length - 1];
						let pt = item.localToGlobal(0,0);

						this["page" + value].y = pt.y + item.height + 20;
						this.setHollows([this.createZone(pt.x,pt.y,item.width,item.height)]);
					}
					break;
				case 3:
					{
						let list = ui.mulitList.getItems();
						let item = list[list.length - 1];
						let pt = item.localToGlobal(0,0);

						this["page" + value].y = pt.y + 262 + 20;
						this.setHollows([this.createZone(pt.x,pt.y,550,262)]);
					}
					break;
				case 4:
					{
						let list = ui.mulitList.getItems();
						let item = list[list.length - 1];
						let pt = item.localToGlobal(0,0);

						this["page" + value].y = pt.y + item.height + 20;
						this.setHollows([this.createZone(pt.x,pt.y + 260,550,37)]);
					}
					break;
				case 5:
					{
						let list = ui.mulitList.getItems();
						let item = list[list.length - 1];
						let pt = item.localToGlobal(0,0);

						this["page" + value].y = pt.y + 53 + 20;
						this["page" + value].x = pt.x + (item.width - 278 - 157);
						this.setHollows([this.createZone(pt.x + (item.width - 278 - 20),pt.y + 4,278,53)]);
					}
					break;
				case 6:
					{
						let list = ui.mulitList.getItems();
						let item = list[list.length - 1];
						let pt = item.localToGlobal(0,0);

						this["page" + value].y = pt.y + item.height + 20;
						this["page" + value].x = pt.x + (item.width - 550 - 157);
						this.setHollows([this.createZone(pt.x + (item.width - 550 - 20 - 52),pt.y + 53,550,254)]);
					}
					break;
				case 7:
					{
						let pt = ui.videoInfoGroup.localToGlobal(0,0);

						this["page" + value].y = pt.y + 200;
						this["page" + value].x = pt.x - 20 - 620;
						this.setHollows([this.createZone(1361,85,544,500)]);
					}
					break;
				case 8:
					{
						let pt = ui.infoGroup.localToGlobal(0,0);

						this["page" + value].y = pt.y + ui.infoGroup.height/2 - 20;
						this["page" + value].x = pt.x - 620 - 20;
						this.setHollows([this.createZone(1361,599,544,460)]);
					}
					break;
				case 9:
					this.setHollows([]);
					this.btn_skip.visible = false;
					this.btn_startGame.visible = true;
					break;
				default:
					this.setHollows([]);
					this.btn_skip.visible = false;
					this.btn_startGame.visible = true;
					break;
			}
		}
	}
}