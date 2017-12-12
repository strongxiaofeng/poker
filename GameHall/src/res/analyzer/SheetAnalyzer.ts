
module R {

    /**
     * SpriteSheet解析器
     * @private
     */
    export class SheetAnalyzer extends BinAnalyzer {

        public constructor() {
            super();
            this._dataFormat = egret.HttpResponseType.TEXT;
        }

        public getRes(name:string):any {
            let R:any = this.fileDic[name];
            if (!R) {
                R = this.textureMap[name];
            }
            if (!R) {
                let prefix:string = R.AnalyzerBase.getStringPrefix(name);
                R = this.fileDic[prefix];
                if (R) {
                    let tail:string = R.AnalyzerBase.getStringTail(name);
                    R = (<egret.SpriteSheet> R).getTexture(tail);
                }
            }
            return R;
        }

        /**
         * 一项加载结束
         */
        public onLoadFinish(event:egret.Event):void {
            let request = event.target;
            let data:any = this.RItemDic[request.$hashCode];
            delete this.RItemDic[request.hashCode];
            let RItem:ResourceItem = data.item;
            let compFunc:Function = data.func;
            RItem.loaded = (event.type == egret.Event.COMPLETE);
            if (RItem.loaded) {
                if (request instanceof egret.HttpRequest) {
                    RItem.loaded = false;
                    let imageUrl:string = this.analyzeConfig(RItem, request.response);
                    if (imageUrl) {
                        this.loadImage(imageUrl, data);
                        this.recycler.push(request);
                        return;
                    }
                }
                else {
                    let texture:egret.Texture = new egret.Texture();
                    texture._setBitmapData(request.data);
                    this.analyzeBitmap(RItem, texture);
                }
            }
            if (request instanceof egret.HttpRequest) {
                this.recycler.push(request);
            }
            else {
                this.recyclerIamge.push(request);
            }
            compFunc.call(data.thisObject, RItem);
        }

        public sheetMap:any = {};

        private textureMap:any = {};

        /**
         * 解析并缓存加载成功的配置文件
         */
        public analyzeConfig(RItem:ResourceItem, data:string):string {
            let name:string = RItem.name;
            let config:any;
            let imageUrl:string = "";
            try {
                let str:string = <string> data;
                config = JSON.parse(str);
            }
            catch (e) {
                egret.$warn(1017, RItem.url, data);
            }
            if (config) {
                this.sheetMap[name] = config;
                imageUrl = this.getRelativePath(RItem.url, config["file"]);
            }
            return imageUrl;
        }

        /**
         * 解析并缓存加载成功的位图数据
         */
        public analyzeBitmap(RItem:ResourceItem, texture:egret.Texture):void {
            let name:string = RItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }
            let config:any = this.sheetMap[name];
            delete this.sheetMap[name];
            let targetName:string = RItem.data && RItem.data.subkeys ? "" : name;
            let spriteSheet:egret.SpriteSheet  = this.parseSpriteSheet(texture, config, targetName);
            this.fileDic[name] = spriteSheet;
        }

        /**
         * 获取相对位置
         */
        public getRelativePath(url:string, file:string):string {
            url = url.split("\\").join("/");

            let params = url.match(/#.*|\?.*/);
            let paramUrl = "";
            if (params) {
                paramUrl = params[0];
            }

            let index:number = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url + paramUrl;
        }

        protected parseSpriteSheet(texture:egret.Texture, data:any, name:string):egret.SpriteSheet  {
            let frames:any = data.frames;
            if(!frames){
                return null;
            }
            let spriteSheet:egret.SpriteSheet = new egret.SpriteSheet(texture);
            let textureMap:any = this.textureMap;
            for(let subkey in frames){
                let config:any = frames[subkey];
                let texture:egret.Texture = spriteSheet.createTexture(subkey,config.x,config.y,config.w,config.h,config.offX, config.offY,config.sourceW,config.sourceH);
                if(config["scale9grid"]){
                    let str:string = config["scale9grid"];
                    let list:string[] = str.split(",");
                    texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]),parseInt(list[1]),parseInt(list[2]),parseInt(list[3]));
                }
                if(textureMap[subkey]==null){
                    textureMap[subkey] = texture;
                    if(name){
                        this.addSubkey(subkey,name);
                    }
                }
            }
            return spriteSheet;
        }

        public destroyRes(name:string):boolean {
            let sheet:any = this.fileDic[name];
            if (sheet) {
                delete this.fileDic[name];
                let texture;
                for (let subkey in sheet._textureMap) {
                    if (texture == null) {
                        texture = sheet._textureMap[subkey];
                        this.onRourceDestroy(texture);
                        texture = null;
                    }
                    delete this.textureMap[subkey];
                }
                if(sheet.dispose) {
                    sheet.dispose();
                }
                return true;
            }
            return false;
        }

        /**
         * ImageLoader对象池
         */
        private recyclerIamge:egret.ImageLoader[] = [];

        private loadImage(url:string, data:any):void {
            let loader = this.getImageLoader();
            this.RItemDic[loader.hashCode] = data;
            loader.load($getVirtualUrl(url));
        }

        private getImageLoader():egret.ImageLoader {
            let loader = this.recyclerIamge.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        }

        protected onRourceDestroy(texture:any) {
            if (texture) {
                texture.dispose();
            }
        }
    }
}
