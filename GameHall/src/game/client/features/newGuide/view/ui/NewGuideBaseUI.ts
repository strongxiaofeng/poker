module game
{
	/**构造函数需要把需要引导的ui传进来 */
	export class NewGuideBaseUI extends BaseUI
	{
		protected btn_skip:eui.Button;
		protected btn_startGame:eui.Button;
		private container:egret.DisplayObjectContainer;

		/**当前页 */
		protected _page:number = 0;

		private renderTexture:egret.RenderTexture;
		private bitmap:egret.Bitmap;
		private bg:egret.Shape;

		/**需要引导的ui */
		public guideUI:BaseUI;

		/**构造函数需要把需要引导的ui传进来 */
		public constructor(guideUI:BaseUI)
		{
			super();
			this.guideUI = guideUI;
		}


		/**组件创建完成初始化数据等操作 */
		public initSetting(): void
		{
			this.container = new egret.DisplayObjectContainer();
			this.bitmap = new egret.Bitmap();
			this.bg = new egret.Shape();

			this.addChildAt(this.guideUI,1);//添加到最底层
			this.page = 1;
		}

		/**重写这个函数 */
		public set page(value:number)
		{
			// this._page = value;

			// this.clearHollow();
		}

		/**
		 * 设置镂空
		 * @param x 镂空区域坐标
		 * @param y 镂空区域坐标
		 * @param erase 镂空区域
		 * */
		protected setHollows(arr:Array<HollowZone>):void
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
			this.addChildAt(this.bitmap,this.getChildIndex(this.guideUI) + 1);
		}

		protected clearHollow():void
		{
			this.container.removeChildren();
			if(this.contains(this.bitmap))
			{
				this.removeChild(this.bitmap);
			}
		}

		/**生成镂空区域 */
		protected createZone(x:number,y:number,w:number,h:number):HollowZone
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
		/**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
		public dispose(): void
		{
			this.guideUI.dispose();
			super.dispose();
		}
	}
}