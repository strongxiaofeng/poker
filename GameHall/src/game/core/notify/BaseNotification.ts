module game {
	/**
	 *
	 * @author 
	 */
    export class BaseNotification implements INotification
	{
		public constructor() 
		{
		}
		
		/**
		 * 注册
		 * */
        public addRegister(name: string,obj: any):void
		{
            NotifyManager.getInstance().addObj(name,obj); 
		}
		
		/**
		 * 移除
		 * */
        public removeRegister(name: string):void
        {
            NotifyManager.getInstance().removeObj(name);
        }

        /**
         * 子类需要重写
         * */
        public listNotification(): Array<string>
        {
            return [];
        }
		
        /**
         * 子类需要重写
         * */
        public handleNotification(type: string,body: any): void
        {
            
        }
        
        public sendNotification(type: string,body: any = null): void
        {
            NotifyManager.getInstance().distribute(type,body);
        }
	}
}
