module R {
	/**注册解析器 */
    export function registerAnalyzer(type:string, analyzerClass:any) {
        instance.registerAnalyzer(type, analyzerClass);
    }
	/**获取解析器 */
    export function getAnalyzer(type:string):AnalyzerBase {
        return instance.$getAnalyzerByType(type);
    }
    /**
     * 注册版本控制器,通过RES模块加载资源时会从版本控制器获取真实url
     */
    export function registerVersionController(vcs:VersionController):void {
        instance.$registerVersionController(vcs);
    }
    /**
     * 获得版本控制器.
     */
    export function getVersionController():VersionController {
        return instance.vcs;
    }
    /**
     * 加载配置文件并解析。
     * @param url 配置文件路径(resource.json的路径)。
     * @param resourceRoot 资源根路径。配置中的所有url都是这个路径的相对值。最终url是这个字符串与配置里资源项的url相加的值。
     * @param type 配置文件的格式。确定要用什么解析器来解析配置文件。默认"json"
     */
    export function loadConfig(url:string,resourceRoot:string="",type:string="json"):void{
        instance.loadConfig(url,resourceRoot,type);
    }
    /**
     * 根据组名加载一组资源。
     * @param name 要加载资源组的组名。
     * @param priority 加载优先级,可以为负数,默认值为 0。
     */
    export function loadGroup(name:string,priority:number=0):void{
        instance.loadGroup(name,priority);
    }
    /**
     * 检查某个资源组是否已经加载完成。
     */
    export function isGroupLoaded(name:string):boolean{
        return instance.isGroupLoaded(name);
    }
    /**
     * 根据组名获取组加载项列表。
     */
    export function getGroupByName(name:string):Array<ResourceItem>{
        return instance.getGroupByName(name);
    }
    /**
     * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
     */
    export function createGroup(name:string,keys:string[],override:boolean = false):boolean{
        return instance.createGroup(name,keys,override);
    }
    /**
     * 检查配置文件里是否含有指定的资源。
     */
    export function hasRes(key:string):boolean{
        return instance.hasRes(key);
    }
    /**
     * 运行时动态解析一个配置文件,此操作不会清空之前已存在的配置。
     * @param data 配置文件数据，请参考 resource.json 的配置文件格式。传入对应的 json 对象即可。
     * @param folder 加载项的路径前缀。
     */
    export function parseConfig(data:any, folder:string=""):void {
        instance.parseConfig(data,folder);
    }
    /**
     * 同步方式获取缓存的已经加载成功的资源。
     */
    export function getRes(key:string):any{
        return instance.getRes(key);
    }
    /**
     * 异步方式获取配置里的资源。只要是配置文件里存在的资源，都可以通过异步方式获取。
     */
    export function getResAsync(key:string,compFunc:Function,thisObject:any):void{
        instance.getResAsync(key,compFunc,thisObject);
    }
    /**
     * 通过完整URL方式获取外部资源。
     */
    export function getResByUrl(url:string,compFunc:Function,thisObject:any,type:string=""):void{
        instance.getResByUrl(url,compFunc,thisObject,type);
    }
    /**
     * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
     * @param name 配置文件中加载项的name属性或资源组名。
     * @param force 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值 true。
     */
    export function destroyRes(name:string, force?:boolean):boolean{
        return instance.destroyRes(name, force);
    }
    /**
     * 设置最大并发加载线程数量，默认值是 2。
     */
    export function setMaxLoadingThread(thread:number):void{
        instance.setMaxLoadingThread(thread);
    }
    /**
     * 设置资源加载失败时的重试次数，默认值是 3。
     */
    export function setMaxRetryTimes(retry: number): void {
        instance.setMaxRetryTimes(retry);
    }
    /**
     * 添加事件侦听器,参考 ResourceEvent 定义的常量。
     * @param type 事件的类型。
     * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
     * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
     * @param thisObject 侦听函数绑定的 this 对象。
     * @param useCapture 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
     * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
     * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
     * @param priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
     * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
     * @see R.ResourceEvent
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    export function addEventListener(type:string, listener:(event:egret.Event)=>void, thisObject:any, useCapture:boolean = false, priority:number = 0):void {
        instance.addEventListener(type,listener,thisObject,useCapture,priority);
    }
    /**
     * 移除事件侦听器,参考ResourceEvent定义的常量。
     * @param type 事件名。
     * @param listener 侦听函数。
     * @param thisObject 侦听函数绑定的this对象。
     * @param useCapture 是否使用捕获，这个属性只在显示列表中生效。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    export function removeEventListener(type:string, listener:(event:egret.Event)=>void,thisObject:any,useCapture:boolean = false):void {
        instance.removeEventListener(type,listener,thisObject,useCapture);
    }

    export function $getVirtualUrl(url){
        if (instance.vcs){
            return instance.vcs.getVirtualUrl(url);
        }
        else{
            return url;
        }
    }


    /**
     * @private
     */
    class Resource extends egret.EventDispatcher{
        public constructor(){
            super();
            this.init();
        }

        public vcs:VersionController;

        /**
         * 解析器字典
         */
        private analyzerDic:any = {};


        private analyzerClassMap:any = {};

        /**
         * 根据type获取对应的文件解析库
         */
        $getAnalyzerByType(type:string):AnalyzerBase{
            let analyzer:AnalyzerBase = this.analyzerDic[type];
            if (!analyzer) {
                let clazz = this.analyzerClassMap[type];
                if (!clazz) {
                    if (DEBUG) {
                        egret.$error(3203, type);
                    }
                    return null;
                }
                analyzer = this.analyzerDic[type] = new clazz();
            }
            return analyzer;
        }

        /**
         * 注册一个自定义文件类型解析器
         * @param type 文件类型字符串，例如：bin,text,image,json等。
         * @param analyzerClass 自定义解析器的类定义
         */
        public registerAnalyzer(type:string, analyzerClass:any):void {
            this.analyzerClassMap[type] = analyzerClass;
        }

        public $registerVersionController(vcs:VersionController){
            this.vcs = vcs;
        }

        /**
         * 多文件队列加载器
         */
        private resLoader:ResourceLoader;
        /**
         * 初始化
         */
        private init():void{
            this.vcs = new VersionController();
            let analyzerClassMap = this.analyzerClassMap;
            analyzerClassMap[ResourceItem.TYPE_BIN] = BinAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_IMAGE] = ImageAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_TEXT] = TextAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_JSON] = JsonAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_SHEET] = SheetAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_FONT] = FontAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_SOUND] = SoundAnalyzer;
            analyzerClassMap[ResourceItem.TYPE_XML] = XMLAnalyzer;

            this.resConfig = new ResourceConfig();
            this.resLoader = new ResourceLoader();
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.resInstance = this;
            this.resLoader.addEventListener(ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
            this.resLoader.addEventListener(ResourceEvent.GROUP_LOAD_ERROR,this.onGroupError,this);
        }

        /**
         * 配置文件组组名
         */
        private static GROUP_CONFIG:string = "RES__CONFIG";

        private configItemList:any[] = [];

        private loadingConfigList:any[];

        private callLaterFlag:boolean = false;
        /**
         * 配置文件加载解析完成标志
         */
        private configComplete:boolean = false;
        /**
         * 开始加载配置
		 * @method R.loadConfig
		 * @param url {string}
		 * @param resourceRoot {string}
		 * @param type {string}
         */
        public loadConfig(url:string,resourceRoot:string,type:string="json"):void{

            let configItem:any = {url:url,resourceRoot:resourceRoot,type:type};
            this.configItemList.push(configItem);
            if(!this.callLaterFlag){
                egret.callLater(this.startLoadConfig,this);
                this.callLaterFlag = true;
            }
        }

        private startLoadConfig():void{
            this.callLaterFlag = false;
            let configList:any[] = this.configItemList;
            this.configItemList = [];
            this.loadingConfigList = configList;
            let length:number = configList.length;
            let itemList:Array<ResourceItem> = [];
            for(let i:number=0;i<length;i++){
                let item:any = configList[i];
                let resItem:ResourceItem = new ResourceItem(item.url,item.url,item.type);
                itemList.push(resItem);
            }

            let callback:egret.AsyncCallback = {


                onSuccess:(data:any)=>{
                    this.resLoader.loadGroup(itemList,Resource.GROUP_CONFIG,Number.MAX_VALUE);
                },

                onFail:(err:number,data:any)=>{
                    ResourceEvent.dispatchResourceEvent(this,ResourceEvent.CONFIG_LOAD_ERROR);
                }

            };

            if (this.vcs){
                this.vcs.fetchVersion(callback);
            }
            else{
                this.resLoader.loadGroup(itemList,Resource.GROUP_CONFIG,Number.MAX_VALUE);
            }

        }
        /**
         * 已经加载过组名列表
         */
        private loadedGroups:string[] = [];
        /**
         * 检查某个资源组是否已经加载完成
         */
        public isGroupLoaded(name:string):boolean{
            return this.loadedGroups.indexOf(name)!=-1;
        }
        /**
         * 根据组名获取组加载项列表
         */
        public getGroupByName(name:string):Array<ResourceItem>{
            return this.resConfig.getGroupByName(name);
        }

        private groupNameList:any[] = [];
        /**
         * 根据组名加载一组资源
         */
        public loadGroup(name:string,priority:number=0):void{
            if(this.loadedGroups.indexOf(name)!=-1){
                ResourceEvent.dispatchResourceEvent(this,ResourceEvent.GROUP_COMPLETE,name);
                return;
            }
            if(this.resLoader.isGroupInLoading(name))
                return;
            if(this.configComplete){
                let group:Array<ResourceItem> = this.resConfig.getGroupByName(name);
                this.resLoader.loadGroup(group,name,priority);
            }
            else{
                this.groupNameList.push({name:name,priority:priority});
            }
        }
        /**
         * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
         * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
         * @method R.ResourceConfig#createGroup
         * @param name {string} 要创建的加载资源组的组名
         * @param keys {egret.string[]} 要包含的键名列表，key对应配置文件里的name属性或一个资源组名。
         * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
         * @returns {boolean}
         */
        public createGroup(name:string,keys:string[],override:boolean=false):boolean{
            if(override){
                let index:number = this.loadedGroups.indexOf(name);
                if(index!=-1){
                    this.loadedGroups.splice(index,1);
                }
            }
            return this.resConfig.createGroup(name,keys,override);
        }
        /**
         * res配置数据
         */
        private resConfig:ResourceConfig;
        /**
         * 队列加载完成事件
         */
        private onGroupComp(event:ResourceEvent):void{
            if(event.groupName==Resource.GROUP_CONFIG){
                let length:number = this.loadingConfigList.length;
                for(let i:number = 0;i < length;i++){
                    let config:any = this.loadingConfigList[i];
                    let resolver:AnalyzerBase = this.$getAnalyzerByType(config.type);
                    let data:any = resolver.getRes(config.url);
                    resolver.destroyRes(config.url);
                    this.resConfig.parseConfig(data,config.resourceRoot);
                }
                this.configComplete = true;
                this.loadingConfigList = null;
                ResourceEvent.dispatchResourceEvent(this,ResourceEvent.CONFIG_COMPLETE);
                this.loadDelayGroups();
            }
            else{
                this.loadedGroups.push(event.groupName);
                this.dispatchEvent(event);
            }

        }
        /**
         * 启动延迟的组加载
         */
        private loadDelayGroups():void{
            let groupNameList:any[] = this.groupNameList;
            this.groupNameList = [];
            let length:number = groupNameList.length;
            for(let i:number=0;i<length;i++){
                let item:any = groupNameList[i];
                this.loadGroup(item.name,item.priority);
            }

        }
        /**
         * 队列加载失败事件
         */
        private onGroupError(event:ResourceEvent):void{
            if(event.groupName==Resource.GROUP_CONFIG){
                this.loadingConfigList = null;
                ResourceEvent.dispatchResourceEvent(this,ResourceEvent.CONFIG_LOAD_ERROR);
            }
            else{
                this.dispatchEvent(event);
            }
        }
        /**
         * 检查配置文件里是否含有指定的资源
		 * @method R.hasRes
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
		 * @returns {boolean}
         */
        public hasRes(key:string):boolean{
            let type:string = this.resConfig.getType(key);
            if(type==""){
                let prefix:string = R.AnalyzerBase.getStringTail(key);
                type = this.resConfig.getType(prefix);
                if(type==""){
                    return false;
                }
            }
            return true;
        }
        /**
         * 运行时动态解析一个配置文件,
         * @param data {any} 配置文件数据，请参考resource.json的配置文件格式。传入对应的json对象即可。
         * @param folder {string} 加载项的路径前缀。
         */
        public parseConfig(data:any, folder:string):void {
            this.resConfig.parseConfig(data,folder);
            if(!this.configComplete&&!this.loadingConfigList){
                this.configComplete = true;
                this.loadDelayGroups();
            }
        }
        /**
         * 通过key同步获取资源
		 * @method R.getRes
		 * @param key {string}
		 * @returns {any}
         */
        public getRes(key:string):any{
            let type:string = this.resConfig.getType(key);
            if(type==""){
                let prefix:string = R.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(prefix);
                if(type==""){
                    return null;
                }
            }

            let analyzer:AnalyzerBase = this.$getAnalyzerByType(type);
            return analyzer.getRes(key);
        }

        /**
         * 异步获取资源参数缓存字典
         */
        private asyncDic:any = {};
        /**
         * 通过key异步获取资源
         * @method R.getResAsync
         * @param key {string}
         * @param compFunc {Function} 回调函数。示例：compFunc(data,url):void。
         * @param thisObject {any}
         */
        public getResAsync(key:string,compFunc:Function,thisObject:any):void{
            let type:string = this.resConfig.getType(key);
            let name:string = this.resConfig.getName(key);
            if(type==""){
                name = R.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(name);
                if(type==""){
                    egret.$callAsync(compFunc, thisObject);
                    return;
                }
            }
            let analyzer:AnalyzerBase = this.$getAnalyzerByType(type);
            let res:any = analyzer.getRes(key);
            if(res){
                egret.$callAsync(compFunc, thisObject, res, key);
                return;
            }
            let args:any = {key:key,compFunc:compFunc,thisObject:thisObject};
            if(this.asyncDic[name]){
                this.asyncDic[name].push(args);
            }
            else{
                this.asyncDic[name] = [args];
                let resItem:ResourceItem = this.resConfig.getResourceItem(name);
                this.resLoader.loadItem(resItem);
            }
        }

        private _loadedUrlTypes = {};
        /**
         * 通过url获取资源
		 * @method R.getResByUrl
		 * @param url {string}
		 * @param compFunc {Function}
		 * @param thisObject {any}
		 * @param type {string}
         */
        public getResByUrl(url:string,compFunc:Function,thisObject:any,type:string=""):void{
            if(!url){
                egret.$callAsync(compFunc, thisObject);
                return;
            }
            if(!type)
                type = this.getTypeByUrl(url);

            if (this._loadedUrlTypes[url] != null && this._loadedUrlTypes[url] != type) {
                egret.$warn(3202);
            }
            this._loadedUrlTypes[url] = type;

            let analyzer:AnalyzerBase = this.$getAnalyzerByType(type);

            let name:string = url;
            let res:any = analyzer.getRes(name);
            if(res){
                egret.$callAsync(compFunc, thisObject, res, url);
                return;
            }
            let args:any = {key:name,compFunc:compFunc,thisObject:thisObject};
            if(this.asyncDic[name]){
                this.asyncDic[name].push(args);
            }
            else{
                this.asyncDic[name] = [args];
                let resItem:ResourceItem = new ResourceItem(name,url,type);
                this.resLoader.loadItem(resItem);
            }
        }

        /**
         * 通过url获取文件类型
         */
        private getTypeByUrl(url:string):string{
            let suffix:string = url.substr(url.lastIndexOf(".")+1);
            if(suffix){
                suffix = suffix.toLowerCase();
            }
            let type:string;
            switch(suffix){
                case ResourceItem.TYPE_XML:
                case ResourceItem.TYPE_JSON:
                case ResourceItem.TYPE_SHEET:
                    type = suffix;
                    break;
                case "png":
                case "jpg":
                case "gif":
                case "jpeg":
                case "bmp":
                    type = ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    type = ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                    type = ResourceItem.TYPE_TEXT;
                    break;
                case "mp3":
                case "ogg":
                case "mpeg":
                case "wav":
                case "m4a":
                case "mp4":
                case "aiff":
                case "wma":
                case "mid":
                    type = ResourceItem.TYPE_SOUND;
                    break;
                default:
                    type = ResourceItem.TYPE_BIN;
                    break;
            }
            return type;
        }
        /**
         * 一个加载项加载完成
         */
        private onResourceItemComp(item:ResourceItem):void{
            let argsList:any[] = this.asyncDic[item.name];
            delete this.asyncDic[item.name];
            let analyzer:AnalyzerBase = this.$getAnalyzerByType(item.type);
            let length:number = argsList.length;
            for(let i:number=0;i<length;i++){
                let args:any = argsList[i];
                let res:any = analyzer.getRes(args.key);
                args.compFunc.call(args.thisObject,res,args.key);
            }
        }
        /**
         * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
		 * @method R.destroyRes
         * @param name {string} 配置文件中加载项的name属性或资源组名
         * @param force {boolean} 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值true
		 * @returns {boolean}
         */
        public destroyRes(name:string, force:boolean = true):boolean{
            let group:any[] = this.resConfig.getRawGroupByName(name);
            if(group && group.length > 0){
                let index:number = this.loadedGroups.indexOf(name);
                if(index!=-1){
                    this.loadedGroups.splice(index,1);
                }
                let length:number = group.length;
                for(let i:number=0;i<length;i++){
                    let item:any = group[i];
                    if(!force && this.isResInLoadedGroup(item.name)) {

                    }
                    else {
                        item.loaded = false;
                        let analyzer:AnalyzerBase = this.$getAnalyzerByType(item.type);
                        analyzer.destroyRes(item.name);
                        this.removeLoadedGroupsByItemName(item.name);
                    }
                }
                return true;
            }
            else{
                let type:string = this.resConfig.getType(name);
                if (type == "") {
                    type = this._loadedUrlTypes[name];

                    if (type == null || type == "") {
                        return false;
                    }
                    delete this._loadedUrlTypes[name];
                    let analyzer:AnalyzerBase = this.$getAnalyzerByType(type);
                    analyzer.destroyRes(name);
                    return true;
                }
                let item = this.resConfig.getRawResourceItem(name);
                item.loaded = false;
                let analyzer = this.$getAnalyzerByType(type);
                let result = analyzer.destroyRes(name);
                this.removeLoadedGroupsByItemName(item.name);
                return result;
            }
        }
        private removeLoadedGroupsByItemName(name:string):void {
            let loadedGroups:string[] = this.loadedGroups;
            let loadedGroupLength:number = loadedGroups.length;
            for(let i:number = 0 ; i < loadedGroupLength ; i++) {
                let group:any[] = this.resConfig.getRawGroupByName(loadedGroups[i]);
                let length:number = group.length;
                for(let j:number = 0 ; j < length ; j++) {
                    let item:any = group[j];
                    if(item.name == name) {
                        loadedGroups.splice(i, 1);
                        i--;
                        loadedGroupLength = loadedGroups.length;
                        break;
                    }
                }
            }
        }
        private isResInLoadedGroup(name:string):boolean {
            let loadedGroups:string[] = this.loadedGroups;
            let loadedGroupLength:number = loadedGroups.length;
            for(let i:number = 0 ; i < loadedGroupLength ; i++) {
                let group:any[] = this.resConfig.getRawGroupByName(loadedGroups[i]);
                let length:number = group.length;
                for(let j:number = 0 ; j < length ; j++) {
                    let item:any = group[j];
                    if(item.name == name) {
                        return true;
                    }
                }
            }
            return false;
        }
        /**
         * 设置最大并发加载线程数量，默认值是2.
         * @method R.setMaxLoadingThread
         * @param thread {number} 要设置的并发加载数。
         */
        public setMaxLoadingThread(thread:number):void{
            if(thread<1){
                thread = 1;
            }
            this.resLoader.thread = thread;
        }

        /**
         * 设置资源加载失败时的重试次数。
         * @param retry 要设置的重试次数。
         */
        public setMaxRetryTimes(retry:number):void{
            retry = Math.max(retry, 0);
            this.resLoader.maxRetryTimes = retry;
        }
    }
    /**
     * Resource单例
     */
    let instance:Resource = new Resource();
}