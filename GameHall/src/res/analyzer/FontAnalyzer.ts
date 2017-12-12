
module R {
    /**
     * @private
     */
    export class FontAnalyzer extends SheetAnalyzer {

        public constructor() {
            super();
        }

        public analyzeConfig(RItem:ResourceItem, data:string):string {
            let name:string = RItem.name;
            let config:any;
            let imageUrl:string = "";
            try {
                let str:string = <string> data;
                config = JSON.parse(str);
            }
            catch (e) {
            }
            if (config) {
                imageUrl = this.getRelativePath(RItem.url, config["file"]);
            }
            else {
                config = <string> data;
                imageUrl = this.getTexturePath(RItem.url, config);
            }
            this.sheetMap[name] = config;
            return imageUrl;
        }

        public analyzeBitmap(RItem:ResourceItem, texture:egret.Texture):void {

            let name:string = RItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }

            let config:any = this.sheetMap[name];
            delete this.sheetMap[name];
            let bitmapFont:egret.BitmapFont = new egret.BitmapFont(texture, config);
            this.fileDic[name] = bitmapFont;
        }

        private getTexturePath(url:string, fntText:string):string {

            let file:string = "";
            let lines = fntText.split("\n");
            let pngLine = lines[2];
            let index:number = pngLine.indexOf("file=\"");
            if (index != -1) {
                pngLine = pngLine.substring(index + 6);
                index = pngLine.indexOf("\"");
                file = pngLine.substring(0, index);
            }

            url = url.split("\\").join("/");
            index = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url;
        }

        protected onRourceDestroy(font:egret.BitmapFont) {
            if (font) {
                font.dispose();
            }
        }
    }
}