module com {

    export class FontItem {

        public jsonItem: ResourceItem;
        public imgItem: ResourceItem;
        private _loaded = false;
        private _bitmapFont: egret.BitmapFont;
        private _config: any;

        public constructor() { }

        public getRes(): egret.BitmapFont {
            return this._bitmapFont;
        }

        public setJson(json: ResourceItem): void {
            this.jsonItem = json;
            let data = json.getRes();
            let config: any;
            let imageUrl: string = "";
            try {
                let str: string = <string>data;
                config = JSON.parse(str);
            } catch (e) {
            }
            if (config == null) {
                config = <string>data;
            }
            this._config = config;
            this.creatFont();
        }

        public setImg(img: ResourceItem): void {
            this.imgItem = img;
            this.creatFont();
        }

        public getTexturePath(): string {
            if (this.jsonItem) {
                let key = this.jsonItem.name;// ey.replace(".fnt", "_fnt");
                let url = com.LoadManager.getInstance().getUrlByKey(key);
                if (url.indexOf("resource/") == -1) {
                    url = "resource/" + url;
                }
                url = url.replace(".fnt", ".png");
                return url;
                // let url = this.jsonItem.key;
                // if (url.indexOf("fonts/") == -1) {
                //     url = "fonts/" + url;
                // }
                // if (url.indexOf("resource/") == -1) {
                //     url = "resource/" + url;
                // }
                // if (this._config instanceof Object) {
                //     url = AnalyzerBase.getStringSprit(url) + this._config["file"];
                //     return url;
                // }
                // let fntText = this._config;
                // let file: string = "";
                // let lines = fntText.split("\n");
                // let pngLine = lines[2];
                // let index: number = pngLine.indexOf("file=\"");
                // if (index != -1) {
                //     pngLine = pngLine.substring(index + 6);
                //     index = pngLine.indexOf("\"");
                //     file = pngLine.substring(0, index);
                // }
                // url = url.split("\\").join("/");
                // index = url.lastIndexOf("/");
                // if (index != -1) {
                //     url = url.substring(0, index + 1) + file;
                // } else {
                //     url = file;
                // }
                // return url;
            }
            return "";
        }

        private creatFont(): void {
            if (this.jsonItem && this.imgItem) {
                let config: any = this.jsonItem.getRes();
                let bitmapFont: egret.BitmapFont = new egret.BitmapFont(this.imgItem.getRes(), config);
                this._bitmapFont = bitmapFont;
                this._loaded = true;
            }
        }

        public executeCall(): void {
            if (this.jsonItem) {
                this.jsonItem.executeCall(this.jsonItem.getRes());
            }
        }

        public get Loaded(): boolean {
            return this._loaded;
        }

    }
}
