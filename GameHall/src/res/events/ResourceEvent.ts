module R {
	/**
	 * 资源加载事件。
	 */
	export class ResourceEvent extends egret.Event{
		/**
		 * 一个加载项加载失败事件。
		 */
		public static ITEM_LOAD_ERROR:string = "itemLoadError";
		/**
		 * 配置文件加载并解析完成事件。注意：若有配置文件加载失败，将不会抛出此事件，若要处理配置加载失败，请同时监听 CONFIG_LOAD_ERROR 事件。
		 */
		public static CONFIG_COMPLETE:string = "configComplete";
		/**
		 * 配置文件加载失败事件。
		 */
		public static CONFIG_LOAD_ERROR:string = "configLoadError";
		/**
		 * 延迟加载组资源加载进度事件。
		 */
		public static GROUP_PROGRS:string = "groupProgRs";
		/**
		 * 延迟加载组资源加载完成事件。注意：若组内有资源项加载失败，将不会抛出此事件，若要处理组加载失败，请同时监听 GROUP_LOAD_ERROR 事件。
		 */
		public static GROUP_COMPLETE:string = "groupComplete";
		/**
		 * 延迟加载组资源加载失败事件。
		 */
		public static GROUP_LOAD_ERROR:string = "groupLoadError";
		/**
		 * 创建一个作为参数传递给事件侦听器的 Event 对象。
		 * @param type  事件的类型，可以作为 Event.type 访问。
		 * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
		 * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
		 * @language zh_CN
		 */
		public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
			super(type, bubbles, cancelable);
		}
		/**
		 * 已经加载的文件数。
		 */
		public itemsLoaded:number=0;
		/**
		 * 要加载的总文件数。
		 */
		public itemsTotal:number=0;
		/**
		 * 资源组名。
		 */
		public groupName:string = "";
		/**
		 * 一次加载项加载结束的项信息对象。
		 */
		public RItem:ResourceItem = null;

        /**
         * 使用指定的EventDispatcher对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
		 * @method R.RourceEvent.dispatchResourceEvent
		 * @param target {egret.IEventDispatcher} 
		 * @param type {string} 
		 * @param groupName {string} 
		 * @param RItem {egret.ResourceItem} 
		 * @param itemsLoaded {number} 
		 * @param itemsTotal {number}
		 * @private
         */
        public static dispatchResourceEvent(target:egret.IEventDispatcher,type:string,
                                                    groupName:string="",RItem:ResourceItem=null,itemsLoaded:number=0,itemsTotal:number=0):boolean{
			let event:ResourceEvent = egret.Event.create(ResourceEvent, type);
			event.groupName = groupName;
			event.RItem = RItem;
			event.itemsLoaded = itemsLoaded;
			event.itemsTotal = itemsTotal;
			let Result = target.dispatchEvent(event);
			egret.Event.release(event);
			return Result;
        }
	}
}