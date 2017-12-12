module game
{
	export class OwnersWatchBaseItemUI extends eui.AItemRenderer
	{
		/** 座位1 */
		public seatLabel1: eui.ALabel;
		public seatImg1: eui.AImage;
		/** 座位2 */
		public seatLabel2: eui.ALabel;
		public seatImg2: eui.AImage;
		/** 座位3 */
		public seatLabel3: eui.ALabel;
		public seatImg3: eui.AImage;
		/** 座位5 */
		public seatLabel5: eui.ALabel;
		public seatImg5: eui.AImage;
		/** 座位6 */
		public seatLabel6: eui.ALabel;
		public seatImg6: eui.AImage;
		/** 座位7 */
		public seatLabel7: eui.ALabel;
		public seatImg7: eui.AImage;
		/** 座位8 */
		public seatLabel8: eui.ALabel;
		public seatImg8: eui.AImage;
		//座号图片资源
		protected green_source = "looker_pic_seatbg_png";
		protected y_source = "looker_pic_seatbg2_png";
		protected green_pc_source = "looker_pic_seat_pc_png";
		protected y_pc_source = "looker_pic_seat2_pc_png";

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "ownersWatch/item/ownersWatchItem.exml";
		}

		public dataChanged()
		{
			super.dataChanged();
			if (!this.data) return;
			this.initData();
		}

		/**在item启用时 自动执行的初始化方法 */
		public onAdd()
		{
			this.initMouseEvent(true);
			this.initData();
		}

		/** 初始化数据 */
		public initData()
		{
			if (!this.data) return;
			this.setSeats();
		}



		/** 设置座位 */
		public setSeats()
		{
			if (!this.data) return;
			let data = this.data.seats;
			let seatsNum = [1, 2, 3, 5, 6, 7, 8];
			for (let i = 0; i < seatsNum.length; i++) {
				let key = seatsNum[i];
				if (data[key]) {
					(<eui.Label>this[`seatLabel${key}`]).text = data[key];
					(<eui.Image>this[`seatImg${key}`]).visible = false;
					(<eui.Image>this[`seatNImg${key}`]).source = GlobalConfig.isMobile ? this.green_source : this.green_pc_source;
					(<eui.Label>this[`seatNLabel${key}`]).textColor = 0xF9F5E5;
				}
				else {
					(<eui.Label>this[`seatLabel${key}`]).visible = false;
					(<eui.Image>this[`seatImg${key}`]).visible = true;
					(<eui.Image>this[`seatNImg${key}`]).source = GlobalConfig.isMobile ? this.y_source : this.y_pc_source;
					(<eui.Label>this[`seatNLabel${key}`]).textColor = 0x686868;
				}
			}
		}

		/** 点击事件 */
		protected initMouseEvent(b: boolean): void
		{
			if (b) {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			}
			else {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			}
		}

		/**  点击响应*/
		protected onTouchTap(evt: egret.TouchEvent): void
		{
			switch (evt.target) {
				// case this.playerBetZone:

				// 	break;
				default:
					CommonLoadingUI.getInstance().start();
					if (this.data) {
						BaccaratController.getInstance().isMyRoomEnter(this.data.topic).then(() =>
						{
							MediatorManager.openMediator(Mediators.Mediator_BaccaratMediator, this.data.topic.split('/')[3]);
						})
					}
					else {
						CommonLoadingUI.getInstance().stop();
					}
					break;
			}
		}


		/**当移除这个item时执行的清除方法 由子类重写*/
		public onRemove()
		{
			this.initMouseEvent(false)
		}
	}
}
