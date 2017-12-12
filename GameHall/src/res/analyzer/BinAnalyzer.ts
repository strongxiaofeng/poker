
module R {
    /**
     * @private
     */
    export class BinAnalyzer extends AnalyzerBase {
        /**
         * 构造函数
         */
        public constructor() {
            super();
        }

        /**
         * 字节流数据缓存字典
         */
        public fileDic:any = {};
        /**
         * 加载项字典
         */
        public RItemDic:any[] = [];

        /**
         * @inheritDoc
         */
        public loadFile(RItem:ResourceItem, compFunc:Function, thisObject:any):void {
            if (this.fileDic[RItem.name]) {
                compFunc.call(thisObject, RItem);
                return;
            }
            let request:egret.HttpRequest = this.getRequest();
            this.RItemDic[request.hashCode] = {item: RItem, func: compFunc, thisObject: thisObject};


            request.open($getVirtualUrl(RItem.url));
            request.send();
        }

        public _dataFormat:string = egret.HttpResponseType.ARRAY_BUFFER;

        /**
         * Loader对象池
         */
        protected recycler:egret.HttpRequest[] = [];
        /**
         * 获取一个URLLoader对象
         */
        private getRequest():egret.HttpRequest {
            let request:egret.HttpRequest = this.recycler.pop();
            if (!request) {
                request = new egret.HttpRequest();
                request.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            request.responseType = this._dataFormat;
            return request;
        }

        /**
         * 一项加载结束
         */
        public onLoadFinish(event:egret.Event):void {
            let request:egret.HttpRequest = <egret.HttpRequest> (event.target);
            let data:any = this.RItemDic[request.hashCode];
            delete this.RItemDic[request.hashCode];
            let RItem:ResourceItem = data.item;
            let compFunc:Function = data.func;
            RItem.loaded = (event.type == egret.Event.COMPLETE);
            if (RItem.loaded) {
                this.analyzeData(RItem, request.response)
            }
            this.recycler.push(request);
            compFunc.call(data.thisObject, RItem);
        }

        /**
         * 解析并缓存加载成功的数据
         */
        public analyzeData(RItem:ResourceItem, data:any):void {
            let name:string = RItem.name;
            if (this.fileDic[name] || (data != "" && !data)) {
                return;
            }
            this.fileDic[name] = data;
        }

        /**
         * @inheritDoc
         */
        public getRes(name:string):any {
            return this.fileDic[name];
        }

        /**
         * @inheritDoc
         */
        public hasR(name:string):boolean {
            let R:any = this.getRes(name);
            return R != null;
        }

        /**
         * @inheritDoc
         */
        public destroyRes(name:string):boolean {
            if (this.fileDic[name]) {
                this.onRourceDestroy(this.fileDic[name]);
                delete this.fileDic[name];
                return true;
            }
            return false;
        }

        protected onRourceDestroy(Rource:any) {
        }
    }
}