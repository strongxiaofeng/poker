
module R {
    /**
     * @private
     */
    export class TextAnalyzer extends BinAnalyzer{

        public constructor(){
            super();
            this._dataFormat = egret.HttpResponseType.TEXT;
        }
    }
}