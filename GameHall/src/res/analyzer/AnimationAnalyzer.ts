
module R {

    /**
     * SpriteSheet解析器
     * @private
     */
    export class AnimationAnalyzer extends BinAnalyzer {

        public constructor() {
            super();
            this._dataFormat = egret.HttpResponseType.TEXT;
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
                    this.analyzeBitmap(RItem, (<egret.ImageLoader>request).data);
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
                if (config["file"]) {
                    imageUrl = this.getRelativePath(RItem.url, config["file"]);
                }
                else {
                    let arr = RItem.url.split("?");
                    let arr2 = arr[0].split("/");
                    arr2[arr2.length - 1] = arr2[arr2.length - 1].split(".")[0] + ".png";
                    imageUrl = "";
                    for (let i = 0; i < arr2.length; i++) {
                        imageUrl += arr2[i] + (i < arr2.length - 1 ? "/" : "");
                    }
                    if (arr.length == 2) imageUrl += arr[2];
                }
            }
            return imageUrl;
        }

        /**
         * 解析并缓存加载成功的位图数据
         */
        public analyzeBitmap(RItem:ResourceItem, data:egret.BitmapData):void {
            let name:string = RItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            let config:any = this.sheetMap[name];
            delete this.sheetMap[name];
            let targetName:string = RItem.data && RItem.data.subkeys ? "" : name;
            let spriteSheet:any = this.parseAnimation(data, config, targetName);
            this.fileDic[name] = spriteSheet;
        }

        /**
         * 获取相对位置
         */
        public getRelativePath(url:string, file:string):string {
            url = url.split("\\").join("/");
            let index:number = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url;
        }

        private parseAnimation(bitmapData:egret.BitmapData, data:any, name:string):egret.Texture[] {
            let attributes = Object.keys(data.mc);
            let list:any[] = data.mc[attributes[0]].frames;
            let len = list.length;
            let config;
            let animationFrames:egret.Texture[] = [];
            for (let i = 0; i < len; i++) {
                config = data.R[list[i].R];
                let texture = new egret.Texture();
                texture._bitmapData = bitmapData;
                texture.$initData(config.x, config.y, config.w, config.h, list[i].x, list[i].y, list[i].sourceW, list[i].sourceH, bitmapData.width, bitmapData.height);
            }
            return animationFrames;
        }

        public destroyRes(name:string):boolean {
            let sheet:any = this.fileDic[name];
            if (sheet) {
                delete this.fileDic[name];
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
    }
}
