module eui {
	export class BaseItem extends eui.Component{
		/**是否初始化完成 完成之前不接受函数调用*/
		public isInited:boolean = false;
		/**这个item的初始数据 */
		public data: any;
		/**事件池 */
        private eventDic: game.Dictionary;
		/**是否在这个item添加完成之后要刷新整个list的排版。只有在每次添加的最后一个item才执行这个操作 */
		public needUpdateLocation:boolean = false;
		public constructor() {
			super();
            this.eventDic = new game.Dictionary();
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.initSetting,this);
		}
		/**初始化完成 */
		protected initSetting()
		{
			this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.initSetting,this);
			this.isInited = true;
			if(this.needUpdateLocation) this.updateLocation();
			this.initData();
			this.initListener();
		}
		/**当自身宽高改变后，要调这个方法来刷新在list中的站位大小 */
		protected updateLocation()
		{
			this.dispatchEventWith(BaseList.Event_UpdateSize);
		}
		/**当移除这个item后 要修复list的滑动位置 */
		private updateListScrollLocationAfterDispose()
		{
			this.dispatchEventWith(BaseList.Event_FixLocationAfterDelete);
		}
		/**置顶 */
		public beFirst()
		{
			if(this.parent)
			{
				this.parent.setChildIndex(this, 0);
				this.updateLocation();
			}
		}
		/**置底 */
		public beLast()
		{
			if(this.parent)
			{
				this.parent.setChildIndex(this, this.parent.numChildren);
				this.updateLocation();
			}
		}
		/**
         * 事件注册，所有事件的注册都需要走这里
         */
        public registerEvent(target: egret.EventDispatcher, type: string, callBack: Function, thisObject: any): void
        {
            var eventParams: any = {};
            eventParams.target = target;
            eventParams.type = type;
            eventParams.callBack = callBack;
            eventParams.thisObject = thisObject;
            if (target)
            {
                target.addEventListener(type, callBack, thisObject);
                this.eventDic.setValue(target.hashCode + type, eventParams);
            }
        }
        /**
         * 统一移除所有事件
         */
        protected removeAllEvent(): void
        {
            var eventList: Array<any> = this.eventDic.getAllValue();
            while (eventList.length > 0)
            {
                var tempEvent: any = eventList.shift();
                if (tempEvent.target != null)
                {
                    tempEvent.target.removeEventListener(tempEvent.type, tempEvent.callBack, tempEvent.thisObject);
                }
            }
            this.eventDic.clear();
        }

		// ----------------------必须重写的方法-------------------------------

		/**初始化数据 子类重写*/
		public initData()
		{

		}
		/**初始化事件 子类重写*/
		public initListener()
		{

		}
		/**清除这个item 子类重写  isRemoveAll:清除整个list*/
		public dispose(isRemoveAll:boolean)
		{
			this.isInited = false;
			if(this.parent) this.parent.removeChild(this);
			if(!isRemoveAll)
			{
				this.updateLocation();
				this.updateListScrollLocationAfterDispose();
			}
            this.removeAllEvent();
		}
	}
}