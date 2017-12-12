// // 公用的筹码对象池
// module game
// {
// 	/** 筹码对象池,父类调用后需在父类dispos()函数中执行对象池的dispos()函数 */
// 	export class ChipObjectPool
// 	{
// 		/** 构造函数 */
// 		public constructor()
// 		{
// 		}
// 		/** 单例对象 */
// 		private static _instance: ChipObjectPool;
// 		/** 获取单例对象
// 		 *  @param type - 对象类型
// 		 */
// 		public static getInstance()
// 		{
// 			if (!this._instance)
// 			{
// 				this._instance = new ChipObjectPool();
// 			}
// 			return this._instance;
// 		}
// 		/** 释放资源 */
// 		public dispos(): void
// 		{
// 			this.items = [];
// 		}
// 		/** 对象池数组 */
// 		private items = [];
// 		/** 获取对象池中对象 */
// 		public getItem(): CommonChipItem
// 		{
// 			var item: CommonChipItem;
// 			if (this.items.length > 0)
// 			{
// 				item = this.items.pop();
// 			}
// 			else
// 			{
// 				item = new CommonChipItem();
// 			}
// 			return item;
// 		}
// 		/** 将对象退回池中 */
// 		public storeItem(item: any): void
// 		{
// 			if (item && (item instanceof CommonChipItem))
// 			{
// 				//对象池中没有这个对象 才回收它，已经回收过的不能重复回收
// 				if (this.items.indexOf(item) == -1)
// 				{
// 					item.clear();
// 					if (item.parent) item.parent.removeChild(item);
// 					this.items.push(item);
// 				}
// 			}
// 			else
// 			{
// 				item = null;
// 			}
// 		}
// 		/**
// 		 * 将当前对象池里的所有筹码都去除tween动画
// 		 * 并退回到对象池中
// 		 *  */
// 		public clearTween():void
// 		{
// 			for(let i = this.items.length -1;i >=0;i--)
// 			{
// 				CTween.removeTweens(this.items[i]);
// 				this.storeItem(this.items[i]);
// 			}
// 		}
// 	}
// }
//# sourceMappingURL=ChipObjectPool.js.map