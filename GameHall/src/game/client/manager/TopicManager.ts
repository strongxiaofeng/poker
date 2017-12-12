module game {

	export class TopicManager {
		private static instance: TopicManager;
        public static getInstance(): TopicManager
        {
            if (this.instance == null)
            {
                this.instance = new TopicManager();
            }
            return this.instance;
        }

		/**发请求的seq和topic的字典 */
        private _requestPool: Dictionary;
		/**游戏socket */
		private gameSocket: GameSocket;
		/**当前seq 累加 */
        private _sequences: number;
        /**存放原始的snapshot，key:topic, value:BaseResponse*/
        private snapshotDic:Dictionary;
		/**发送请求的回调字典 */
        private _seqCallback: Dictionary;
		/**注册topic监听的字典 */
        private _topicListeners: Dictionary;

		public constructor() {
            this._requestPool = new Dictionary();
			this.gameSocket = new GameSocket();
            this.snapshotDic = new Dictionary();
            this._seqCallback = new Dictionary();
            this._topicListeners = new Dictionary();
            this._sequences = 1;
		}


		/**连接游戏socket */
		public connect(host: string, callback:Function, callbackobj:any, errCallback: Function):void
		{
			this.gameSocket.connectByUrl(host, callback, callbackobj, errCallback);
		}
        public disconnect():void {
            this.gameSocket.disconnect();
        }
		/**
         * 添加协议监听
         */
        public addSocketListener(topic: string, callBack: Function, thisObject: any): void
        {
            this._topicListeners.setValue(topic, new RequestHandler(callBack, thisObject));
        }
		/**
         * 移除协议监听
         */
        public removeSocketListener(topic: string): void
        {
            this._topicListeners.removeKey(topic);
        }

		// -------------------------------------------   接收topic -----------------------------------------------

		/**收到服务器数据 准备处理 */
		public onDataIn(message: topic.BaseResponse)
		{
			//返回有错误的话，直接执行回调 不继续派发消息
			if(message.code != null && message.code != 0)
			{
				NotifyManager.getInstance().distribute(NotifyConst.Notify_Error, message);
				if(message.seq > 0)
				{
					this.checkSeqCallback(message);
				}
                return;
			}
            this.handleData(message);
		}
		/**处理数据 */
		private handleData(message: topic.BaseResponse)
		{
			let topic:string;
			//有seq 回调
			if(message.seq > 0)
			{
				topic = TopicManager.getInstance().getTopicBySeq(message.seq);
				if(!topic)
				{
					DebugUtil.debug("前端没有发送过这个seq：" + JSON.stringify(message));
					return;
				}

				message = this.updateSnapshot(topic,message,true);
				this.snapshotDic.setValue(topic,message);
				this.dispatchTopic(topic,message);
				this.checkSeqCallback(message);
			}
			//没有seq的是服务器主动推过来的，自带topic
			else if(message.topic && typeof message.topic === "string")
			{
				topic = message.topic;
				message = this.updateSnapshot(topic,message);
				this.snapshotDic.setValue(topic,message);
				this.dispatchTopic(topic,message);
			}

		}
		/**寻找此消息的seq是否注册过回调 并执行回调 */
		private checkSeqCallback(resp: topic.BaseResponse)
		{
			let callbacker = this._seqCallback.getValue(resp.seq);
            if (callbacker)
            {
                this._seqCallback.removeKey(resp.seq);
                callbacker.callBack.call(callbacker.thisObject, resp);
            }
		}
        /**
         * 把处理完的数据派发出去
         */
        private dispatchTopic(topic: string, data: any): void
        {
            let clsName: string;
            let arr = topic.split("/");
            let topicType: string = arr[1];
            let type = TopicType[topicType];

			if (type == null)
            {
                DebugUtil.debug("H5不存在这个topic:" + topic + "   " + data);
                return;
            }
            clsName = TopicType[topicType + "Class"];
            let cls: any = egret.getDefinitionByName("topic." + clsName);
            if (cls == null)
            {
                DebugUtil.debug("H5不存在这个topic的Class:" + topic);
                return;
            }

			let resp: topic.BaseResponse = new cls();
            resp.decode(data);
            resp.topic = topic;
            resp.topicType = topicType;

            DebugUtil.debug("派发消息 "+"/" + topicType + this._topicListeners.toString());
            let reHandler: RequestHandler = this._topicListeners.getValue("/" + topicType);
            if (reHandler != null)
            {
                reHandler._callBack.call(reHandler._thisObject, resp);
            }

        }
        /**将新数据更新至前端已有的原始snapshot, isSeq:是否是返回消息*/
        private updateSnapshot(topic:string,msg:any,isSeq = false):any
        {
			//前端已有的snapshot
            let lastTopicData = this.snapshotDic.getValue(topic);
			if(!lastTopicData)
			{
                lastTopicData = msg;
			}
			else{
                let lastVersion = -1;

                if(lastTopicData.snapshot && lastTopicData.snapshot.version>-1)
                {
                    lastVersion = lastTopicData.snapshot.version;
                }
                if(isSeq)
                {
                    lastTopicData.seq = msg.seq;
                }

                let lastSnapshot = lastTopicData.snapshot;
                let addition:any;

                if(msg.push && msg.push.addition)
                {
                    addition = msg.push.addition;
                    if(lastVersion > -1 && lastVersion + 1 == msg.push.version)
                    {
                        lastTopicData.snapshot.version = msg.push.version;
                    }
                    else
                    {
                        // this.close();
                        DebugUtil.debug("msg.version不连贯 last " + lastVersion + " cur " + msg.push.version + "|" + JSON.stringify(msg));
                        // PopErrorView.getInstance().showError("msg.version不连贯 last " + lastVersion + " cur " + msg.push.version + "|" + JSON.stringify(msg));
                    }
                }
                else if(msg.snapshot && msg.snapshot.addition)
                {
                    // lastTopicData = msg;
                    if(lastVersion > -1 && lastVersion + 1 == msg.snapshot.version)
                    {
                        lastTopicData.snapshot.version = msg.snapshot.version;
                    }
                    else
                    {
                        // this.close();
                        DebugUtil.debug("msg.version不连贯 last " + lastVersion + " cur " + msg.snapshot.version + "|" + JSON.stringify(msg));
                        // PopErrorView.getInstance().showError("msg.version不连贯 last " + lastVersion + " cur " + msg.push.version + "|" + JSON.stringify(msg));
                    }
                    addition = msg.snapshot.addition;
                }

                if(addition)
                {
                    //addition是个索引数组，包含多条增量数据:
                    //遍历所有增量
                    for(let i = 0;i < addition.length;i++)
                    {
                        this.handleSingleAddition(lastSnapshot, addition[i], msg);
                    }
                }
                else
                {
                    let keep_alive = TopicType.keep_alive;
                    if(msg.topic != keep_alive && (msg.snapshot == null || GlobalVariable.isEmptyObject(msg.snapshot)) && (msg.push == null || GlobalVariable.isEmptyObject(msg.push)))
                    {
                        DebugUtil.debug("收到一个空的snapshot:" + JSON.stringify(msg));
                    }

                    //如果收到新的snapshot 的 version比历史version低，不覆盖version。
                    //因为服务器不保证请求返回的snapshot的version连贯性,骰宝可能出现新收到的snapshot version比历史增量的version低
                    //byxiaofeng
                    if(lastTopicData.snapshot && msg.snapshot && lastTopicData.snapshot.version > msg.snapshot.version){
                        msg.snapshot.version = lastTopicData.snapshot.version;
                    }
                    lastTopicData = msg;
                }
			}
			return lastTopicData;
		}
		/**
         * 更新单条增量
         * */
        private handleSingleAddition(lastSnapshot:any, addition:any, msg:any):void
        {
            for(let type in addition)
            {
                if(type.indexOf("$") > -1)
                {
                    let targetObj;
                    let action;
                    let propertyName;
                    let index;
                    let value;

                    //snapshot的第一级子目录
                    if(type == "$")
                    {
                        targetObj = lastSnapshot;
                    }
                    //更深的子目录
                    else
                    {
                        // targetObj = eval("lastSnapshot" + type.replace("$",""));
                        let targetObjs: any = JsonPath.jsonPath(lastSnapshot,type);
                        if(!targetObjs){
                            DebugUtil.debug("增量的目标对象不存在 "+type);
                        }
                        else{
                            if(targetObjs.length>1){
                                DebugUtil.debug("增量的目标对象数量大于1，不能确定目标对象 "+type);
                            }
                            targetObj = targetObjs.pop();
                        }
                    }

                    action = addition[type][0];
                    propertyName = addition[type][1];
                    if(!action || !propertyName){
                        DebugUtil.debug("增量的操作类型为空或属性名为空");
                    }
                    if(action == "a.insert" || action == "a.set"){
                        index = addition[type][2];
                        value = addition[type][3];
                    }
                    else if(action == "a.remove") {
                        index = addition[type][2];
                    }
                    else if(action == "a.append" || action == "o.add" || action == "o.set") {
                        value = addition[type][2];
                    }

                    if(action == "a.insert"){
                        targetObj[propertyName].splice(index,0,value)
                    }
                    else if(action == "a.append"){
                        targetObj[propertyName].push(value);
                    }
                    else if(action == "a.remove"){
                        targetObj[propertyName].splice(index,1)
                    }
                    else if(action == "a.set"){
                        targetObj[propertyName].splice(index,1, value)
                    }
                    else if(action == "o.add" || action == "o.set"){
                        targetObj[propertyName] = value;
                    }
                    else if(action == "o.remove"){
                        targetObj[propertyName] = null;
                        delete targetObj[propertyName];
                    }
                }
            }
        }
		/**根据seq获取发送此seq消息的topic */
		private getTopicBySeq(seq:number): string
		{
			let topic = this._requestPool.getValue(seq);

            if(topic && topic.length)
            {
                this._requestPool.removeKey(seq);
            }
            return topic;
		}




		// -------------------------------------------   发送topic -----------------------------------------------

		/**获取一个新的seq */
		private getSequence(): number
        {
            return this._sequences++;
        }
		/**
		 * 发送协议
		 */
        public sendCMD(req: topic.BaseRequest): void
        {
            req.seq = this.getSequence();
            this._requestPool.setValue(req.seq, req.topic);
            this.gameSocket.sendCMD(req);
        }
		/**获取一个topic的snapshot */
        public getTopicSnapshot(type: string, params: any = null,callBack: Function = null, thisObject: any = null): number
        {
            let req = new topic.BaseRequest();
            req.topic = type;
            req.op = "snapshot";
            if (params)
            {
                req.snapshot = params;
            }
            this.sendCMD(req);
            if (callBack && thisObject)
            {
                this._seqCallback.setValue(req.seq, { "callBack": callBack, "thisObject": thisObject });
            }
            return req.seq;
        }
        /**订阅一个topic */
        public getTopicSubscribe(type: string,callBack: Function = null, thisObject: any = null): number
        {
            DebugUtil.debug('TopicManager 收到订阅topic地址：'+type);
            if (type == null)
            {
                DebugUtil.error("","错误的订阅")
            }
            let req = new topic.BaseRequest();
            req.topic = type;
            req.op = "subscribe";
            this.sendCMD(req);
            if (callBack && thisObject)
            {
                this._seqCallback.setValue(req.seq, { "callBack": callBack, "thisObject": thisObject });
            }
            return req.seq;
        }
        /**取消订阅一个topic */
        public getTopicUnsubscribe(type: string,callBack: Function = null, thisObject: any = null): number
        {
            let req = new topic.BaseRequest();
            req.topic = type;
            req.op = "unsubscribe";
            this.sendCMD(req);
            if (callBack && thisObject)
            {
                this._seqCallback.setValue(req.seq, { "callBack": callBack, "thisObject": thisObject });
            }
            return req.seq;
        }
        /**
         * 更新一个topic,把要更新的内容传进去来,返回sequence
         * updata支持回调函数
         */
        public getTopicUpdate(type: string, update: any, callBack: Function = null, thisObject: any = null): number
        {
            let req = new topic.BaseUpdate();
            req.topic = type;
            req.op = "update";
            req.update = update;
            this.sendCMD(req);
            DebugUtil.debug(req,LogConst.LOGTYPE_MSG_FIRED);
            if (callBack && thisObject)
            {
                this._seqCallback.setValue(req.seq, { "callBack": callBack, "thisObject": thisObject });
            }
            return req.seq;
        }

	}
}