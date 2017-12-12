
module R {
    /**
     * @private
     */
    export class SoundAnalyzer extends AnalyzerBase {

        /**
         * 构造函数
         */
        public constructor() {
            super();
        }

        /**
         * 字节流数据缓存字典
         */
        protected soundDic:any = {};
        /**
         * 加载项字典
         */
        protected RItemDic:any[] = [];

        /**
         * @inheritDoc
         */
        public loadFile(RItem:ResourceItem, callBack:Function, thisObject:any):void {
            if (this.soundDic[RItem.name]) {
                callBack.call(thisObject, RItem);
                return;
            }
            let sound = new egret.Sound();
            sound.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            this.RItemDic[sound.$hashCode] = {item: RItem, func: callBack, thisObject: thisObject};
            sound.load($getVirtualUrl(RItem.url));
            if (RItem.data) {
                sound.type = RItem.data.soundType;
            }
        }

        /**
         * 一项加载结束
         */
        protected onLoadFinish(event:egret.Event):void {
            let sound = <egret.Sound> (event.$target);
            sound.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            let data:any = this.RItemDic[sound.$hashCode];
            delete this.RItemDic[sound.$hashCode];
            let RItem:ResourceItem = data.item;
            let compFunc:Function = data.func;
            RItem.loaded = (event.$type == egret.Event.COMPLETE);
            if (RItem.loaded) {
                this.analyzeData(RItem, sound)
            }
            compFunc.call(data.thisObject, RItem);
        }

        /**
         * 解析并缓存加载成功的数据
         */
        protected analyzeData(RItem:ResourceItem, data:egret.Sound):void {
            let name:string = RItem.name;
            if (this.soundDic[name] || !data) {
                return;
            }
            this.soundDic[name] = data;
        }

        /**
         * @inheritDoc
         */
        public getRes(name:string):any {
            return this.soundDic[name];
        }

        /**
         * @inheritDoc
         */
        public hasR(name:string):boolean {
            return !!this.getRes(name);
        }

        /**
         * @inheritDoc
         */
        public destroyRes(name:string):boolean {
            if (this.soundDic[name]) {
                delete this.soundDic[name];
                return true;
            }
            return false;
        }
    }
}