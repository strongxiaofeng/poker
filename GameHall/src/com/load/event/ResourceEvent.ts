module com {

	export class ResourceEvent extends egret.Event {

		public static ITEM_LOAD_ERROR: string = "itemLoadError";
		public static CONFIG_COMPLETE: string = "configComplete";
		public static CONFIG_LOAD_ERROR: string = "configLoadError";
		public static GROUP_PROGRESS: string = "groupProgress";
		public static GROUP_COMPLETE: string = "groupComplete";
		public static GROUP_LOAD_ERROR: string = "groupLoadError";

		public itemsLoaded: number = 0;
		public itemsTotal: number = 0;
		public groupName: string = "";
		public resItem: ResourceItem = null;

		public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
			super(type, bubbles, cancelable);
		}

		public static dispatchResourceEvent(target: egret.IEventDispatcher, type: string,
			groupName: string = "", resItem: ResourceItem = null, itemsLoaded: number = 0, itemsTotal: number = 0): boolean {
			let event: ResourceEvent = egret.Event.create(ResourceEvent, type);
			event.groupName = groupName;
			event.resItem = resItem;
			event.itemsLoaded = itemsLoaded;
			event.itemsTotal = itemsTotal;
			let result = target.dispatchEvent(event);
			egret.Event.release(event);
			return result;
		}

	}
}