module eui {
    /**
     * 自定义的List，他的ItemRenderer必须是AItemRenderer的子类
     *
     */
	export class AList extends eui.DataGroup{
        /**常量方向 竖 */
        public static Direction_V: number = 1;
        /**常量方向 横 */
        public static Direction_H: number = 2;
        /**横着排1 还是竖着排2 */
        private _direction:number;
        /**行数 */
        private _rowNum: number;
        /**列数 */
        private _colNum: number;
        /**竖向间距 */
        private _vgap: number;
        /**横向间距 */
        private _hgap: number;
        /**子项渲染类 */
        private render:any;
        /**数据源结构 */
        private _ArrayCollection: eui.ArrayCollection;
        /**子项对象池 */
        private pool: AItemRenderer[];

        public constructor(){
            super();
            this.useVirtualLayout = false;
            this._direction = AList.Direction_V;
            this._rowNum = 1;
            this._colNum = 1;
            this._vgap = 0;
            this._hgap = 0;
            this._ArrayCollection = null;
            this.render = null;
            this.pool = [];
        }

        /**设置子项渲染类 */
        public setItemRenderer(render:any)
        {
            this.render = render;
            this.refreshList();
        }
        public setDataProvider(ac: ArrayCollection)
        {
            if(ac)
            {
                if(this._ArrayCollection)
                {
                    if(ac.hashCode != this._ArrayCollection.hashCode)
                    {
                        this.addCollectEvent(false);
                        this._ArrayCollection = ac;
                        this.refreshList();
                        this.addCollectEvent(true);
                    }
                    else{
                        this.refreshList();
                    }
                }
                else{
                    this._ArrayCollection = ac;
                    this.refreshList();
                    this.addCollectEvent(true);
                }
            }
            else{
                this.addCollectEvent(false);
                this._ArrayCollection = ac;
            }
        }
        /**设置添加子项的方向 */
        public set direction(n: number)
        {
            this._direction = n;
            this.refreshList();
        }
        /**设置行数 */
        public set rowNum(n: number)
        {
            this._rowNum = n;
            this.refreshList();
        }
        /**设置列数 */
        public set colNum(n: number)
        {
            this._colNum = n;
            this.refreshList();
        }
        public set vgap(n: number)
        {
            this._vgap = n;
            this.refreshList();
        }
        public set hgap(n: number)
        {
            this._hgap = n;
            this.refreshList();
        }
        /**
         * 调用某个itemRender的某个方法 根据itemrender.key==value找到对应的ItemRender,比如
         * @functionName 要调用的函数名
         * @params 传递的参数
         */
        public excuteItemRenderFunction(key:string, value:any, functionName:string, params:any=null)
        {
            if(this.numChildren > 0)
            {
                for(var i=this.numChildren-1; i>=0; i--)
                {
                    var child: AItemRenderer = <AItemRenderer>this.getChildAt(i);
                    if(child[key] == value)
                    {
                        if(child[functionName])
                        {
                            child[functionName](params);
                        }
                        else
                        {
                            game.DebugUtil.debug("item没有这个方法 "+functionName);
                        }
                    }
                }
            }
        }
        /**
         * 调用所有itemRender的某个方法
         * @functionName 要调用的函数名
         * @params 传递的参数
         */
        public excuteAllItemRenderFunction(key:string, value:any, functionName:string, params:any=null)
        {
            if(this.numChildren > 0)
            {
                for(var i=this.numChildren-1; i>=0; i--)
                {
                    var child: AItemRenderer = <AItemRenderer>this.getChildAt(i);
                    if(child[functionName])
                    {
                        child[functionName](params);
                    }
                    else
                    {
                        game.DebugUtil.debug("item没有这个方法 "+functionName);
                    }
                }
            }
        }
        /**注册 or 移除 collection数据改变事件 */
        private addCollectEvent(b : boolean)
        {
            if(b)
            {
                this._ArrayCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
            }
            else{
                this._ArrayCollection.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
            }
        }
        /**当数据源结构发生变化 */
        protected onCollectionChange(e: eui.CollectionEvent)
        {
            this.refreshList();
        }
        /**刷新列表 */
        private refreshList()
        {
            this.removeItems();
            if(this._ArrayCollection && this._ArrayCollection.length>0)
            {
                for(var i=0; i<this._ArrayCollection.length; i++)
                {
                    var data = this._ArrayCollection.getItemAt(i);
                    var item = this.getItem();
                    this.addChild(item);
                    //竖
                    if(this.direction == AList.Direction_V)
                    {
                        item.x = (i%this._colNum) * (item.width + this._hgap);
                        item.y = Math.floor(i/this._colNum) * (item.height + this._vgap);
                    }
                    //横
                    else{
                        item.x = Math.floor(i/this._rowNum) * (item.width + this._hgap);
                        item.y = (i%this._rowNum) * (item.height + this._vgap);
                    }
                    item.data = data;
                }
            }
        }
        /**移除已有的item */
        private removeItems()
        {
            if(this.numChildren > 0)
            {
                for(var i=this.numChildren-1; i>=0; i--)
                {
                    var child: AItemRenderer = <AItemRenderer>this.getChildAt(i);
                    this.removeChild(child);
                    // child.dispose();
                    this.pool.push(child);
                }
            }
        }
        /**从对象池获取 或者new一个Item */
        private getItem(): eui.AItemRenderer
        {
            var item: AItemRenderer;
            if(this.pool.length > 0)
            {
                item = this.pool.pop();
            }
            else{
                let renderClass = this.render;
                item = <AItemRenderer> (new renderClass());
            }
            // item.onAdd();
            return item;
        }
        /**销毁这个对象 */
        public dispose()
        {
            this.removeItems();
            this.render = null;
            this._ArrayCollection = null;
            this.pool = [];
            this.pool = null;
        }
    }
}