module game {
	/**
	 * @desc 处理一些http请求的类
	 */
	export class HttpUtil {
		/**
		 * 发送http请求
		 */ 
        public static sendRequest($url:string,str:string,$loadCallBack:Function,$ioErrorCallBack:Function,$thisObject:any,$dataFormat:string=egret.URLLoaderDataFormat.TEXT,$method:string=egret.URLRequestMethod.POST,flag = false,moduleName = ""):void{
            var httpItem: HttpItem = new HttpItem($loadCallBack,$ioErrorCallBack,$dataFormat,$thisObject,flag,moduleName);
            httpItem.load($url,str,$method);
		}

		public static sendRequestByHeader($url:string,$vars:egret.URLVariables,header:egret.URLRequestHeader,$loadCallBack:Function,$ioErrorCallBack:Function,$thisObject:any,$dataFormat:string=egret.URLLoaderDataFormat.TEXT,$method:string=egret.URLRequestMethod.POST):void
		{
			var httpItem: HttpItem = new HttpItem($loadCallBack,$ioErrorCallBack,$dataFormat,$thisObject);
            httpItem.loadByHeader($url,$vars,$method,header);
		}
	}
}
