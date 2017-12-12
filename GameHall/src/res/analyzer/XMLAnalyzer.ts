
module R {
    /**
     * @private
     */
    export class XMLAnalyzer extends BinAnalyzer{

        public constructor(){
            super();
            this._dataFormat = egret.HttpResponseType.TEXT;
        }

        /**
         * 解析并缓存加载成功的数据
         */
        public analyzeData(RItem:ResourceItem,data:any):void{
            let name:string = RItem.name;
            if(this.fileDic[name]||!data){
                return;
            }
            try{
                let xmlStr:string = <string> data;
                let xml:any = egret.XML.parse(xmlStr);
                this.fileDic[name] = xml;
            }
            catch (e){
            }
        }
    }
}