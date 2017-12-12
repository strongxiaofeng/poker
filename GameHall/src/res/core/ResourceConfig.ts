
module R {

	/**
	 * @class R.ResourceConfig
	 * @classdesc
     * @private
	 */
    export class ResourceConfig {

        public constructor() {
            R["configInstance"] = this;
        }

        /**
         * 根据组名获取组加载项列表
		 * @method R.ResourceConfig#getGroupByName
         * @param name {string} 组名
		 * @returns {Array<egret.ResourceItem>}
         */
        public getGroupByName(name:string):Array<ResourceItem> {
            let group:Array<ResourceItem> = new Array<ResourceItem>();
            if (!this.groupDic[name])
                return group;
            let list:any[] = this.groupDic[name];
            let length:number = list.length;
            for (let i:number = 0; i < length; i++) {
                let obj:any = list[i];
                group.push(this.parseResourceItem(obj));
            }
            return group;
        }
        /**
         * 根据组名获取原始的组加载项列表
         * @method R.ResourceConfig#getRawGroupByName
         * @param name {string} 组名
         * @returns {any[]}
         */
        public getRawGroupByName(name:string):any[]{
            if (this.groupDic[name])
                return this.groupDic[name];
            return [];
        }

        /**
         * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
         * 可以监听RourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
		 * @method R.ResourceConfig#createGroup
         * @param name {string} 要创建的加载资源组的组名
         * @param keys {egret.string[]} 要包含的键名列表，key对应配置文件里的name属性或sbuKeys属性的一项或一个资源组名。
         * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
		 * @returns {boolean}
         */
        public createGroup(name:string, keys:string[], override:boolean = false):boolean {
            if ((!override && this.groupDic[name]) || !keys || keys.length == 0)
                return false;
            let groupDic:any = this.groupDic;
            let group:any[] = [];
            let length:number = keys.length;
            for (let i:number = 0; i < length; i++) {
                let key:string = keys[i];
                let g:any[] = groupDic[key];
                if(g){
                    let len:number = g.length;
                    for(let j:number=0;j<len;j++){
                        let item:any = g[j];
                        if (group.indexOf(item) == -1)
                            group.push(item);
                    }
                }
                else{
                    let item = this.keyMap[key];
                    if (item){
                        if(group.indexOf(item) == -1)
                            group.push(item);
                    }
                    else{
                        egret.$warn(3200, key);
                    }
                }

            }
            if (group.length == 0)
                return false;
            this.groupDic[name] = group;
            return true;
        }

        /**
         * 一级键名字典
         */
        private keyMap:any = {};
        /**
         * 加载组字典
         */
        private groupDic:any = {};

        /**
         * 解析一个配置文件
		 * @method R.ResourceConfig#parseConfig
         * @param data {any} 配置文件数据
         * @param folder {string} 加载项的路径前缀。
         */
        public parseConfig(data:any, folder:string):void {
            if (!data)
                return;
            let Rources:any[] = data["Rources"];
            if (Rources) {
                let length:number = Rources.length;
                for (let i:number = 0; i < length; i++) {
                    let item:any = Rources[i];
                    let url:string = item.url;
                    if(url&&url.indexOf("://")==-1)
                        item.url = folder + url;
                    this.addItemToKeyMap(item);
                }
            }
            let groups:any[] = data["groups"];
            if (groups) {
                let length = groups.length;
                for (let i = 0; i < length; i++) {
                    let group:any = groups[i];
                    let list:any[] = [];
                    let keys:string[] = (<string> group.keys).split(",");
                    let l:number = keys.length;
                    for (let j:number = 0; j < l; j++) {
                        let name:string = keys[j].trim();
                        let item = this.keyMap[name];
                        if (item && list.indexOf(item) == -1) {
                            list.push(item);
                        }
                    }
                    this.groupDic[group.name] = list;
                }
            }
        }

        /**
         * 添加一个二级键名到配置列表。
         * @method R.ResourceConfig#addSubkey
         * @param subkey {string} 要添加的二级键名
         * @param name {string} 二级键名所属的资源name属性
         */
        public addSubkey(subkey:string,name:string):void{
            let item:any = this.keyMap[name];
            if(item&&!this.keyMap[subkey]){
                this.keyMap[subkey] = item;
            }
        }

        /**
         * 添加一个加载项数据到列表
         */
        private addItemToKeyMap(item:any):void{
            if(!this.keyMap[item.name])
                this.keyMap[item.name] = item;
            if(item.hasOwnProperty("subkeys")){
                let subkeys:any[] = (<string><any> (item.subkeys)).split(",");
                item.subkeys = subkeys;
                let length:number = subkeys.length;
                for(let i:number = 0;i < length;i++){
                    let key:string = subkeys[i];
                    if(this.keyMap[key]!=null)
                        continue;
                    this.keyMap[key] = item;
                }
            }
        }

        /**
         * 获取加载项的name属性
         * @method R.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        public getName(key:string):string{
            let data:any = this.keyMap[key];
            return data?data.name:"";
        }

        /**
         * 获取加载项类型。
		 * @method R.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
		 * @returns {string}
         */
        public getType(key:string):string {
            let data:any = this.keyMap[key];
            return data ? data.type : "";
        }

        public getRawResourceItem(key:string):any{
            return this.keyMap[key];
        }

        /**
         * 获取加载项信息对象
		 * @method R.ResourceConfig#getResourceItem
         * @param key {string} 对应配置文件里的key属性或sbuKeys属性的一项。
		 * @returns {egret.ResourceItem}
         */
        public getResourceItem(key:string):ResourceItem {
            let data:any = this.keyMap[key];
            if (data)
                return this.parseResourceItem(data);
            return null;
        }

        /**
         * 转换Object数据为ResourceItem对象
         */
        private parseResourceItem(data:any):ResourceItem {
            let RItem:ResourceItem = new ResourceItem(data.name, data.url, data.type);
            RItem.data = data;
            return RItem;
        }
    }
}
