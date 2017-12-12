module game {
	/**
	 * 通知管理类
	 * @author beiyuan
	 */
	export class NotifyManager 
	{
        private static instance: NotifyManager;
        
        /**
         * 对象字典
         * */
        private ObjDic:Object;
        
        /**
         * type字典
         * 一个type对应多个Obj，方便消息的派发
         * */
        private typeDic:Object;
        
		public constructor() 
		{
            this.ObjDic = new Object();
            this.typeDic = new Object();
		}
		
		public static getInstance():NotifyManager
		{
            if(this.instance == null) {
                this.instance = new NotifyManager();
            }

            return this.instance;
		}
		
		/**派发*/
        public distribute(type: string,body: Object):void
		{
            var arr: Array<string> = this.typeDic[type];
            if(arr)
            {
                var new_arr = arr.slice(); 
                var len = new_arr.length;
                var name:string;
                var n:INotification;
                
                for(var i = 0; i < len; i++) 
                {
                    name = new_arr[i];
                    
                    n = <INotification>this.ObjDic[name];
                    if(n)
                    {
                        n.handleNotification(type,body);
                    }
                }
            }
		}
		
		public hasObj(name:string):boolean
		{
            if(this.ObjDic[name])
            {
                return true;
            }
            else
            {
                return false;
            }
		}
		
		public addObj(name:string,obj:Object):void
		{
            if(this.ObjDic[name])
            {
                DebugUtil.debug("Notify repeat Register:" + name);
                // this.removeObj(name);
                // throw new Error("Notify repeat Register:"+name);
            }
            else
            {
                this.ObjDic[name] = obj;
                //再组建一个type的字典
                this.configurationType(name,obj);
            }
		}
		
		/**
		 * type字典重构
		 * */
        private configurationType(name: string,obj:Object):void
		{
		    var n = <INotification>obj;
            if(n)
            {
                var list = n.listNotification();
                var len = list.length;
                var type = "";
                for(var i = 0;i < len;i++)
                {
                    type = list[i];
                    if(this.typeDic[type])
                    {
                        //添加到末尾
                        this.typeDic[type].push(name);
                    }
                    else
                    {
                        this.typeDic[type] = [name];
                    }
                }
            }
		}
		
        public removeObj(name: string):void
		{
            if(this.ObjDic[name])
            {
                this.cleanType(name);
                delete this.ObjDic[name];
            }
		}
		
        private cleanType(name: string):void
        {
            var n = <INotification>this.ObjDic[name];
            if(n) 
            {
                var list = n.listNotification();
                var len = list.length;
                var type:string;
                var arr:Array<string>;
                for(var i = 0; i < len; i++) 
                {
                    type = list[i];
                    arr = this.typeDic[type];
                    if(arr) 
                    {
                        var index = arr.indexOf(name);
                        if(index > -1)
                        {
                            arr.splice(index,1);
                            if(arr.length > 0)
                            {
                                this.typeDic[type] = arr;
                            }
                            else
                            {
                                arr = null;
                                this.typeDic[type] = null;
                                delete this.typeDic[type];
                            }
                        }
                    }
                }
            }
        }
	}
}
