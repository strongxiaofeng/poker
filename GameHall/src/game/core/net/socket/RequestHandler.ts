module game {
	/**
	 *
	 * @author 帅波
	 * @date 2016.05.20
	 * @desc 封装一个请求回调函数
	 *
	 */
	export class RequestHandler {
    	
        public _callBack: Function;
        public _timeOutCallback: Function;          //超时以后的回调
        public _thisObject: any;
        public _isRPC: Boolean;                     //是否是RPC回调，如果是回调成功一次就移除监听，如果不是，监听常驻
        public _sendTime: number=0;                 //协议发送的时候所处的时间
        public _timeout: number = 0;                //设定超时时间,默认单位是毫秒
        public _clientData: any=null;               //客户端回调参数，如果需要的话
        
        public constructor(callBack: Function,thisObject: any,isRPC: Boolean = false,timeOutCallback: Function = null,timeout:number=3000,clientData:any=null) {
            this._callBack = callBack;
            this._thisObject = thisObject;
            this._isRPC = isRPC;
            this._timeOutCallback = timeOutCallback;
            this._timeout = timeout;
            //this._sendTime = model.SFSingleModel.getInstance().serverTime;
            this._clientData = clientData;
		}
	}
}
