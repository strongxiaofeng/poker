module eui {
	export class BaseList extends eui.Group{
        /**常量方向 竖 */
        public static Direction_V: number = 1;
        /**常量方向 横 */
        public static Direction_H: number = 2;
		/**刷新item大小的事件 */
		public static Event_UpdateSize: string = "updateSize";
		/**修复删除item之后的滑动位置的事件 */
		public static Event_FixLocationAfterDelete: string = "fixLocationAfterDelete";
        /**1竖着排 2横着排 */
        private _direction:number=1;
        /**竖着排时 列数 */
        private _colNum: number=1;
        /**横着排时 行数 */
        private _rowNum: number=1;
        /**竖向间距 */
        private _vgap: number=0;
        /**横向间距 */
        private _hgap: number=0;
		/**滚轮事件启用时，每次滚动的距离 */
		private _wheelDistance:number = 20;
		/**最大item数量 */
		private _maxLength: number = 999;
		/**item增加时自动滚向最底部 */
		private _autoScrollToBottom: boolean=false;
        /**子项渲染类 */
        private _itemRenderer:any;
		/**items容器 */
		private contentGroup: eui.Group;

		public constructor() {
			super();
			this.name = "BaseList"+Math.random();
			this.contentGroup = new Group();
			this.addChild(this.contentGroup);

			if(this._direction == BaseList.Direction_V) this.contentGroup.percentWidth = 100;
			else if(this._direction == BaseList.Direction_H) this.contentGroup.percentHeight = 100;
		}
		/**收哪些通知 */
        public listNotification(): Array<string>
        {
            return [
				game.NotifyConst.Notify_MouseWheel
			];
        }
		
        /**处理收到的通知 */
        public handleNotification(type: string,body: any): void
        {
            switch(type)
			{
				case game.NotifyConst.Notify_MouseWheel://up down
					if(body == "up")
					{
						this.scrollUp();
					}
					else{
						this.scrollDown();
					}
					break;
			}
        }


		// ------------------------------------ 设置一些属性 -------------------------------------

		/**设置渲染类 */
		public set itemRenderer(itemClass:any)
		{
			this._itemRenderer = itemClass;
		}
		/**设置扩充方向 */
		public set direction(n: number)
		{
			this._direction = n==BaseList.Direction_H ? BaseList.Direction_H : BaseList.Direction_V;
			
			if(this._direction == BaseList.Direction_V) this.contentGroup.percentWidth = 100;
			else if(this._direction == BaseList.Direction_H) this.contentGroup.percentHeight = 100;
		}
		/**设置列数 仅在竖向扩充时有效*/
		public set column(n: number)
		{
			this._colNum = n;
		}
		/**设置行数 仅在横向扩充时有效*/
		public set row(n: number)
		{
			this._rowNum = n;
		}
		/**设置横间距*/
		public set hgap(n: number)
		{
			this._hgap = +n;
		}
		/**设置竖间距*/
		public set vgap(n: number)
		{
			this._vgap = +n;
		}
		/**自动滚到底部 */
		public set autoScrollToBottom(b: boolean)
		{
			this._autoScrollToBottom = b;
		}
		public get autoScrollToBottom(): boolean
		{
			return this._autoScrollToBottom;
		}
		/**设置 启用禁用滚轮事件 */
		public set mouseWheelEnable(b:boolean)
		{
			if(b)
			{
				game.NotifyManager.getInstance().addObj(this.name, this); 
			}
			else
			{
				game.NotifyManager.getInstance().removeObj(this.name); 
			}
		}
		/**设置每次滚动的距离 默认100 */
		public set mouseWheelDistance(n: number)
		{
			this._wheelDistance = n;
		}
		/**设置最大item数量，当超过这个数量时会从队首自动删除item */
		public set maxLength(n: number)
		{
			if(n>0) this._maxLength = n;
		}



		// ------------------------------------ 添加，获取，删除 item对象 -------------------------------------


		/**在末尾添加新的item，已存在的item不刷新 */
		public addItems(itemDatas:any[])
		{
			for(let i=0; i<itemDatas.length; i++)
			{
				let item = this.createItem();
				item.needUpdateLocation = i==itemDatas.length-1 ? true : false;
				item.data = itemDatas[i];
				this.contentGroup.addChild(item);
			}
			//超出长度自动删除
			if(this.contentGroup.numChildren > this._maxLength)
			{
				for(let i= this.contentGroup.numChildren-this._maxLength-1; i>=0; i--)
				{
					let item: BaseItem = <BaseItem>this.contentGroup.getChildAt(i);
					item.dispose(false);
				}
			}
		}
		/**获取item对象 item[key]==value */
		public getItem(key:string, value:any): any
		{
			if(this.contentGroup.numChildren > 0)
            {
                for(var i=this.contentGroup.numChildren-1; i>=0; i--)
                {
                    var child: BaseItem = <BaseItem>this.contentGroup.getChildAt(i);
                    if(child.isInited && child[key] == value)
                    {
						return child;
                    }
                }
            }
		}
		/**获取所有item对象 */
		public getItems(): Array<BaseItem>
		{
			let arr:Array<BaseItem> = new Array<BaseItem>();
			if(this.contentGroup.numChildren > 0)
            {
                for(var i=this.contentGroup.numChildren-1; i>=0; i--)
                {
                    var child: BaseItem = <BaseItem>this.contentGroup.getChildAt(i);
                    if(child.isInited)
                    {
						arr.push(child);
                    }
                }
            }
			return arr;
		}
		/**以item[key] == value为判断条件 移除某个item */
		public removeItem(key:string, value:any)
		{
			let item: BaseItem = this.getItem(key, value);
			if(item)
			{
				item.dispose(false);
			}
		}
		/**清除所有item */
		public removeAll()
		{
			if(this.contentGroup.numChildren > 0)
			{
				for(let i=this.contentGroup.numChildren-1; i>=0; i--)
				{
					(<BaseItem>(this.contentGroup.getChildAt(i))).dispose(true);
				}
			}
		}
		/**手动滚到底部 */
		public goBottom()
		{
			//竖向
			if(this._direction == BaseList.Direction_V)
			{
				if(this.contentGroup.height > this.height)
				{
					this.scrollV = this.contentGroup.height-this.height;
				}
				else{
					this.scrollV = 0;
				}
			}
			//横向 暂不实现
			else{

			}
		}
		/**是否在最底部 */
		public get isBottom(): boolean
		{
			//竖向
			if(this._direction == BaseList.Direction_V)
			{
				if(this.contentGroup.height > this.height)
				{
					return this.scrollV >= this.contentGroup.height-this.height;
				}
				else{
					return true;
				}
			}
			//横向 暂不实现
			else
			{
				return true;
			}
		}
		/**删除一个item之后要修复位置 */
		public fixLocationAfterDelete()
		{
			//竖向
			if(this._direction == BaseList.Direction_V)
			{
				/**内容超出 需要滑动 */
				if(this.contentGroup.height-this.height>0)
				{
					if(this.scrollV<0) this.scrollV = 0;
					else if(this.scrollV>this.contentGroup.height-this.height) this.scrollV = this.contentGroup.height-this.height;
				}
				else
				{
					this.scrollV = 0;
				}
			}
			//横向 暂不实现
			else{

			}
		}


		/**创建一个新的item对象 */
		private createItem(): BaseItem
		{
			let item = <BaseItem> (new (this._itemRenderer)());
			item.registerEvent(item, BaseList.Event_UpdateSize, this.updateItemsLocation, this);
			item.registerEvent(item, BaseList.Event_FixLocationAfterDelete, this.fixLocationAfterDelete, this);
			return item;
		}
		/**当一个item大小变化 要调整list的排版 */
		public updateItemsLocation()
		{
			let curW:number=0, curH:number=0;
			for(let i=0; i<this.contentGroup.numChildren; i++)
			{
				let item = this.contentGroup.getChildAt(i);
				let w = item.width;
				let h = item.height;

				//竖
				if(this._direction == AList.Direction_V)
				{
					item.x = (i%this._colNum) * (w + this._hgap);
					//一列
					if(this._colNum == 1)
					{
						console.log("重设item y："+curH);
						item.y = curH;
						curH += (h+this._vgap);
					}
					//多列
					else
					{
						item.y = Math.floor(i/this._colNum) * (h + this._vgap);
					}
				}
				//横
				else{
					item.y = (i%this._rowNum) * (h + this._vgap);
					//一行
					if(this._rowNum == 1)
					{
						item.x = curW;
						curW += (w+this._hgap);
					}
					//多行
					else
					{
						item.x = Math.floor(i/this._rowNum) * (w + this._hgap);
					}
				}
			}
			if(this._autoScrollToBottom)
			{
				this.goBottom();
			}
		}
		/**上滑 */
		private scrollUp()
		{
			//竖向
			if(this._direction == BaseList.Direction_V)
			{
				if(this.contentGroup.height > this.height)
				{
					if(this.scrollV-100 >=0)
					{
						this.scrollV-=100;
					}
					else
					{
						this.scrollV = 0;
					}
				}
				else{
					this.scrollV = 0;
				}
			}
			//横向 暂不实现
			else{

			}
		}
		/**下滑 */
		private scrollDown()
		{
			//竖向
			if(this._direction == BaseList.Direction_V)
			{
				if(this.contentGroup.height > this.height)
				{
					if(this.scrollV+100 <= this.contentGroup.height-this.height)
					{
						this.scrollV+=100
					}
					else
					{
						this.scrollV = this.contentGroup.height-this.height;
					}
				}
				else{
					this.scrollV = 0;
				}
			}
			//横向 暂不实现
			else{

			}
		}
		/**关闭控间 完全释放内存 */
		public dispose()
		{
			this.mouseWheelEnable = false;
			this.removeAll();
		}

	}
}