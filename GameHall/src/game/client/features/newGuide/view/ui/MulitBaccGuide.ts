module game
{
	export class MulitBaccGuide extends BaseUI
	{
		private bgRect:eui.Rect;
		private arrImg:eui.Rect;
		private btn_skip:eui.Button;
		private btn_skipIcon:eui.Rect;
		private btn_startGame:eui.Button;
		private label1:eui.ALabel;
		private container:egret.DisplayObjectContainer;

		//打开一个多桌的界面，然后往里面添加假数据
		private multiBacc:MultiBaccUI1;
		private _page:number = 0;

		public constructor()
		{
			super();
			this.skinName = SystemPath.skin_path + "guide/NewGuide.exml";
		}

		// ---------------------------------- 初始化 ----------------------------------

		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.container = new egret.DisplayObjectContainer();
			this.bitmap = new egret.Bitmap();
			this.bg = new egret.Shape();

			this.multiBacc = new MultiBaccUI1(true);
			this.addChildAt(this.multiBacc,1);//添加到最底层

			this.page = 1;
		}

		private renderTexture:egret.RenderTexture;
		private bitmap:egret.Bitmap;
		private bg:egret.Shape;

		/**
		 * 设置镂空
		 * @param x 镂空区域坐标
		 * @param y 镂空区域坐标
		 * @param erase 镂空区域
		 * */
		private setHollows(arr:Array<HollowZone>):void
		{
			// console.warn("setHollows");
			this.bg.graphics.clear();
			this.bg.graphics.beginFill(0,0.6);
			this.bg.graphics.drawRect(0,0,StageUtil.width,StageUtil.height);
			this.bg.graphics.endFill();
			this.container.addChild(this.bg);

			for(let i = arr.length - 1;i >= 0;i--)
			{
				this.container.addChild(arr[i].erase);
				arr[i].erase.x = arr[i].x;
				arr[i].erase.y= arr[i].y;
				arr[i].erase.blendMode = egret.BlendMode.ERASE;
			}

			var renderTexture:egret.RenderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(this.container);

			this.bitmap.texture = renderTexture;
			this.addChildAt(this.bitmap,this.getChildIndex(this.multiBacc) + 1);
		}

		/**清除镂空 */
		private clearHollow():void
		{
			this.container.removeChildren();
			if(this.contains(this.bitmap))
			{
				this.removeChild(this.bitmap);
			}
		}

		private createZone(x:number,y:number,w:number,h:number):HollowZone
		{
			let zone = new HollowZone();
			zone.x = x;
			zone.y = y;
			zone.erase = new egret.Shape();
			zone.erase.graphics.beginFill(0x411111);
			zone.erase.graphics.drawRect(0,0,w,h);
			zone.erase.graphics.endFill();

			return zone;
		}

		private set page(value:number)
		{
			this._page = value;
			if(value > 7)
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
					break;
				case 2:
					{
						let pt = this.multiBacc.userName.localToGlobal(0,0);
						this["page" + value].y = pt.y + 35 + 20;

						let pt1 = this.multiBacc.userBalance.localToGlobal(0,0);

						this.setHollows([this.createZone(15,pt.y - 15,273,53),this.createZone(pt1.x - 44,pt.y - 15,290,70)]);
					}
					break;
				case 3:
					{
						let pt = this.multiBacc.topMsg.localToGlobal(0,0);
						this["page" + value].y = pt.y + 35 + 20;

						let pt1 = this.multiBacc.assetBtn.localToGlobal(0,0);
						this.setHollows([this.createZone(15,pt.y - 15,470,53),this.createZone(pt1.x - 15,pt.y - 15,345,76)]);
					}
					break;
				case 4:
					{
						let list = this.multiBacc.mulitList.getItems();
						let item = list[list.length - 1];
						let pt = item.localToGlobal(0,0);
						
						this["page" + value].y = pt.y + item.height + 20;

						this.setHollows([this.createZone(pt.x - 15,pt.y - 15,item.width + 30,item.height + 30)]);
					}
					break;
				case 5:
					{
						let list = this.multiBacc.mulitList.getItems();
						let item:MulitBaccItemUI1 = <MulitBaccItemUI1>list[list.length - 1];
						item.showHideMore(true);
						
						this.multiBacc.mulitList.updateItemsLocation();
						let pt = item.localToGlobal(0,0);
						this["page" + value].y = pt.y + item.height + 20;

						this.setHollows([this.createZone(pt.x - 15,pt.y - 15,item.width + 30,item.height + 30)]);
					}
					break;
				case 6:
					{
						let list = this.multiBacc.mulitList.getItems();
						let item:MulitBaccItemUI1 = <MulitBaccItemUI1>list[list.length - 1];
						item.showHideMore(false);
						
						this.multiBacc.mulitList.updateItemsLocation();
						item = <MulitBaccItemUI1>list[list.length - 2];
						item.touchGroup.visible = true;

						let pt = item.localToGlobal(0,0);
						this["page" + value].y = pt.y - this["page" + value].height;
						this.setHollows([this.createZone(pt.x - 15,pt.y - 15,item.width + 30,item.height + 30)]);
					}
					break;
				case 7:
					this.setHollows([]);
					this.btn_startGame.visible = true;
					break;
				default:
					this.setHollows([]);
					this.btn_startGame.visible = true;
					break;
			}
		}

		// ---------------------------------- 接收Mediator通知 ----------------------------------

		/** 收到mediator的通知 */
		public onMediatorCommand(type: NewGuideCommands, params: any = null): void
		{
			switch (type)
			{
				case NewGuideCommands.initListener:
					this.initListener(params);
					break;
			}
		}

		// ---------------------------------- 监听事件 ----------------------------------

		/** 注册事件监听器 */
		protected initListener(mediator: NewGuideMediator): void
		{
			this.registerEvent(this,egret.TouchEvent.TOUCH_TAP,this.onTap,this);
		}

		/** */
		private onTap(e:egret.TouchEvent):void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			if(e.target == this.btn_skip || e.target == this.btn_startGame)
			{
				CommonLoadingUI.getInstance().start();
				BaccaratController.getInstance().sendMultiClubEnter().then(() =>
				{
					MediatorManager.closeMediator(Mediators.NewGuide.name);
					MediatorManager.openMediator(Mediators.Mediator_MultiBaccMediator);
				});
			}
			else
			{
				this.page = (this._page + 1);
			}
		}

		// ---------------------------------- 刷新 ----------------------------------



		// ---------------------------------- 用户操作 ----------------------------------
		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
		public dispose(): void
		{
			this.multiBacc.dispose();
			super.dispose();
		}
	}
}