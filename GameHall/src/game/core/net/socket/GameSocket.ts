module game {
	export class GameSocket {
    	private socket: egret.WebSocket;
		private successCallback: Function;
		private successCallbackObj: any;
		private errCallback: Function;
		/**主动断开 */
		private isCloseBySelf:boolean;
		public constructor() {
        	this.socket = new egret.WebSocket();
        	this.socket.type = egret.WebSocket.TYPE_STRING;
			this.socket.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
			this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
			this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onDataIn, this);
			this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIoError, this);
		}

		public connect(host: string, port: number, callback:Function, callbackobj:any, errCallback: Function){
			this.successCallback = callback;
			this.successCallbackObj = callbackobj;
			this.errCallback = errCallback;
			this.socket.connect(host, port);
		}
		public connectByUrl(url: string, callback:Function, callbackobj:any, errCallback: Function){
			this.successCallback = callback;
			this.successCallbackObj = callbackobj;
			this.errCallback = errCallback;
			this.socket.connectByUrl(url);
		}
		public disconnect():void {
			this.isCloseBySelf = true;
			this.socket.close();
		}
		/**
		 * 当socket连接上
		 */
        private onSocketConnected(evt: egret.Event): void
        {
			DebugUtil.debug('socket 连上了');
			if(this.successCallback && this.successCallbackObj)
			{
				this.successCallback.call(this.successCallbackObj);
			}
		}
		/**
		 * 当socket连接上
		 */
        private onSocketClose(evt: egret.Event): void
        {
			DebugUtil.debug('socket 关闭了');
			if(this.isCloseBySelf) return;
			this.isCloseBySelf = false;
			
			let tipData = new TipMsgInfo();
			tipData.msg = [
				{ text: "连接已断开\n请检测网络", textColor: enums.ColorConst.Golden }
			];
			tipData.confirmText = "我知道了";
			tipData.thisObj = this;
			tipData.comfirmCallBack = function () {
				MediatorManager.closeAllMediator();
				MediatorManager.openMediator(Mediators.Mediator_Login);
			};
			MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
		}
        /**
         * 当发生IO错误
         */
        private onIoError(evt: egret.IOErrorEvent): void
        {
			DebugUtil.debug('socket IO错误');
		}
		/**
         * 接收数据返回
         */
        private onDataIn(evt: egret.ProgressEvent): void
        {
            if (this.socket)
            {
                let str = this.socket.readUTF();
                DebugUtil.debug(str, LogConst.LOGTYPE_MSG_RECV);
                let message = JSON.parse(str);
				TopicManager.getInstance().onDataIn(message);
			}
		}
        /**
         * 发送数据到服务器
         */
        public sendCMD(cmd: topic.BaseRequest): void
        {
            if(this.socket && this.socket.connected)
            {
                let str = JSON.stringify(cmd);
                DebugUtil.debug(str,LogConst.LOGTYPE_MSG_FIRED);
                this.socket.writeUTF(str);
                this.socket.flush();
            }
        }
	}


}