
module R {
    /**
     * @private
     */
    export class JsonAnalyzer extends BinAnalyzer {

        public constructor() {
            super();
            this._dataFormat = egret.HttpResponseType.TEXT;
        }

        /**
         * 解析并缓存加载成功的数据
         */
        public analyzeData(RItem:ResourceItem, data:any):void {
            let name:string = RItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            try {
                let str:string = <string> data;
                this.fileDic[name] = JSON.parse(str);
            }
            catch (e) {
                egret.$warn(1017, RItem.url, data);
            }
        }
    }
}