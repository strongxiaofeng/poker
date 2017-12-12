
module R {
    /**
     * @private
     */
    export class ImageAnalyzer extends AnalyzerBase {

        /**
         * 构造函数
         */
        public constructor() {
            super();
        }

        /**
         * 字节流数据缓存字典
         */
        protected fileDic:any = {};
        /**
         * 加载项字典
         */
        protected RItemDic:any[] = [];

        /**
         * @inheritDoc
         */
        public loadFile(RItem:ResourceItem, compFunc:Function, thisObject:any):void {
            if (this.fileDic[RItem.name]) {
                compFunc.call(thisObject, RItem);
                return;
            }
            let loader = this.getLoader();
            this.RItemDic[loader.$hashCode] = {item: RItem, func: compFunc, thisObject: thisObject};
            loader.load($getVirtualUrl(RItem.url));
        }

        /**
         * Loader对象池
         */
        protected recycler:egret.ImageLoader[] = [];

        /**
         * 获取一个Loader对象
         */
        private getLoader():egret.ImageLoader {
            let loader = this.recycler.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        }

        /**
         * 一项加载结束
         */
        protected onLoadFinish(event:egret.Event):void {
            let request = <egret.ImageLoader> (event.$target);
            let data:any = this.RItemDic[request.$hashCode];
            delete this.RItemDic[request.$hashCode];
            let RItem:ResourceItem = data.item;
            let compFunc:Function = data.func;
            RItem.loaded = (event.$type == egret.Event.COMPLETE);
            if (RItem.loaded) {
                let texture:egret.Texture = new egret.Texture();
                texture._setBitmapData(request.data);

                this.analyzeData(RItem, texture)
            }
            this.recycler.push(request);
            compFunc.call(data.thisObject, RItem);
        }

        /**
         * 解析并缓存加载成功的数据
         */
        protected analyzeData(RItem:ResourceItem, texture:egret.Texture):void {
            let name:string = RItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }

            this.fileDic[name] = texture;
            let config:any = RItem.data;
            if (config && config["scale9grid"]) {
                let str:string = config["scale9grid"];
                let list:string[] = str.split(",");
                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
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

        protected onRourceDestroy(texture:any) {
            texture.dispose();
        }
    }
}