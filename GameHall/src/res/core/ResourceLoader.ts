
module R {

	/**
	 * @class R.RourceLoader
	 * @classdesc
	 * @extends egret.EventDispatcher
	 * @private
	 */
	export class ResourceLoader extends egret.EventDispatcher{
		/**
		 * 构造函数
		 * @method R.RourceLoader#constructor
		 */
		public constructor(){
			super();
		}
        /**
         * 最大并发加载数
         */
        public thread: number = 2;
        /**
         * 正在加载的线程计数
         */
        private loadingCount:number = 0;
        /**
         * 一项加载结束回调函数。无论加载成功或者出错都将执行回调函数。示例：callBack(RItem:ResourceItem):void;
		 * @member {Function} R.RourceLoader#callBack
         */
        public callBack:Function = null;
        /**
         * R单例的引用
		 * @member {any} R.RourceLoader#ResInstance
         */
        public resInstance:any = null;

		/**
		 * 当前组加载的项总个数,key为groupName
		 */
		private groupTotalDic:any = {};
		/**
		 * 已经加载的项个数,key为groupName
		 */
		private numLoadedDic:any = {};
		/**
		 * 正在加载的组列表,key为groupName
		 */
		private itemListDic:any = {};
		/**
		 * 加载失败的组,key为groupName
		 */
		private groupErrorDic:any = {};

        private retryTimesDic: any = {};
        public maxRetryTimes = 3;
        private failedList: Array<ResourceItem> = new Array<ResourceItem>();

		/**
		 * 优先级队列,key为priority，value为groupName列表
		 */
		private priorityQueue:any = {};
		/**
		 * 检查指定的组是否正在加载中
		 * @method R.RourceLoader#isGroupInLoading
		 * @param groupName {string}
		 * @returns {boolean}
		 */
		public isGroupInLoading(groupName:string):boolean{
			return this.itemListDic[groupName]!==undefined;
		}
		/**
		 * 开始加载一组文件
		 * @method R.RourceLoader#loadGroup
		 * @param list {egret.Array<ResourceItem>} 加载项列表
		 * @param groupName {string} 组名
		 * @param priority {number} 加载优先级
		 */
		public loadGroup(list:Array<ResourceItem>,groupName:string,priority:number=0):void{
			if(this.itemListDic[groupName]||!groupName)
				return;
			if(!list||list.length==0){
                egret.$warn(3201, groupName);
				let event:ResourceEvent = new ResourceEvent(ResourceEvent.GROUP_LOAD_ERROR);
				event.groupName = groupName;
				this.dispatchEvent(event);
				return;
			}
			if(this.priorityQueue[priority])
				this.priorityQueue[priority].push(groupName);
			else
				this.priorityQueue[priority] = [groupName];
			this.itemListDic[groupName] = list;
            let length:number = list.length;
            for(let i:number=0;i<length;i++){
                let RItem:ResourceItem = list[i];
				RItem.groupName = groupName;
			}
			this.groupTotalDic[groupName] = list.length;
			this.numLoadedDic[groupName] = 0;
			this.next();
		}
		/**
		 * 延迟加载队列
		 */
		private lazyLoadList:Array<ResourceItem> = new Array<ResourceItem>();
		/**
		 * 加载一个文件
		 * @method R.RourceLoader#loadItem
		 * @param RItem {egret.ResourceItem} 要加载的项
		 */
		public loadItem(RItem:ResourceItem):void{
			this.lazyLoadList.push(RItem);
			RItem.groupName = "";
			this.next();
		}
		/**
		 * 资源解析库字典类
		 */
		private analyzerDic:any = {};
		/**
		 * 加载下一项
		 */
		private next():void{
            while(this.loadingCount<this.thread) {
                let RItem:ResourceItem = this.getOneResourceItem();
                if(!RItem)
                    break;
                this.loadingCount++;
                if(RItem.loaded){
                    this.onItemComplete(RItem);
                }
                else{
					let analyzer:AnalyzerBase = this.resInstance.$getAnalyzerByType(RItem.type);
                    analyzer.loadFile(RItem,this.onItemComplete,this);
                }
            }
		}

		/**
		 * 当前应该加载同优先级队列的第几列
		 */
		private queueIndex:number = 0;
		/**
		 * 获取下一个待加载项
		 */
		private getOneResourceItem():ResourceItem{
            if (this.failedList.length > 0)
                return this.failedList.shift();
			let maxPriority:number = Number.NEGATIVE_INFINITY;
			for(let p in this.priorityQueue){
				maxPriority = Math.max(maxPriority,<number><any> p);
			}
			let queue:any[] = this.priorityQueue[maxPriority];
			if(!queue||queue.length==0){
				if(this.lazyLoadList.length==0)
					return null;
				//后请求的先加载，以便更快获取当前需要的资源
				return this.lazyLoadList.pop();
			}
			let length:number = queue.length;
			let list:Array<ResourceItem>;
			for(let i:number=0;i<length;i++){
				if(this.queueIndex>=length)
					this.queueIndex = 0;
				list = this.itemListDic[queue[this.queueIndex]];
				if(list.length>0)
					break;
				this.queueIndex++;
			}
			if(list.length==0)
				return null;
			return list.shift();
		}
		/**
		 * 加载结束
		 */
		private onItemComplete(RItem:ResourceItem):void{
            this.loadingCount--;
			let groupName:string = RItem.groupName;
			if(!RItem.loaded){//加载失败
                let times = this.retryTimesDic[RItem.name] || 1;
                if (times > this.maxRetryTimes) {
                    delete this.retryTimesDic[RItem.name];
                    ResourceEvent.dispatchResourceEvent(this.resInstance, ResourceEvent.ITEM_LOAD_ERROR, groupName, RItem);
                }
                else {
                    this.retryTimesDic[RItem.name] = times + 1;
                    this.failedList.push(RItem);
                    this.next();
                    return;
                }
			}

			if(groupName){
				this.numLoadedDic[groupName]++;
                let itemsLoaded:number = this.numLoadedDic[groupName];
                let itemsTotal:number = this.groupTotalDic[groupName];
				if(!RItem.loaded){
					this.groupErrorDic[groupName] = true;
				}
                ResourceEvent.dispatchResourceEvent(this.resInstance,ResourceEvent.GROUP_PROGRS,groupName,RItem,itemsLoaded,itemsTotal);
				if(itemsLoaded==itemsTotal){
					let groupError:boolean = this.groupErrorDic[groupName];
					this.removeGroupName(groupName);
					delete this.groupTotalDic[groupName];
					delete this.numLoadedDic[groupName];
					delete this.itemListDic[groupName];
					delete this.groupErrorDic[groupName];
					if(groupError){
						ResourceEvent.dispatchResourceEvent(this,ResourceEvent.GROUP_LOAD_ERROR,groupName);
					}
					else{
						ResourceEvent.dispatchResourceEvent(this,ResourceEvent.GROUP_COMPLETE,groupName);
					}
				}
			}
            else{
                this.callBack.call(this.resInstance,RItem);
            }
			this.next();
		}
		/**
		 * 从优先级队列中移除指定的组名
		 */
		private removeGroupName(groupName:string):void{
			for(let p in this.priorityQueue){
				let queue:any[] = this.priorityQueue[p];
				let index:number = 0;
				let found:boolean = false;
                let length:number = queue.length;
                for(let i:number=0;i<length;i++){
                    let name:string = queue[i];
					if(name==groupName){
						queue.splice(index,1);
						found = true;
						break;
					}
					index++;
				}
				if(found){
					if(queue.length==0){
						delete this.priorityQueue[p];
					}
					break;
				}
			}
		}
	}
}
