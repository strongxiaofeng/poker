module game
{
	/**
	 *
	 * @desc 基本的UI界面显示类
	 *
	 */
    export class UIComponent extends eui.Component
    {
        private eventDic: Dictionary;
        public isLoaded:boolean = false;
        /**是否需要重载-->主要是多语言 */
        public needReload = false;

        /**要加载多资源组 */
        public multiGroupName = "";
        /**要加载的多语言的音效组*/
        public soundGroupName = "";
        /**要加载的声音合集*/
        public soundSheetName = "";

        public viewName:string;

        public constructor()
        {
            super();
            this.eventDic = new Dictionary();
        }

        protected childrenCreated():void
        {
            super.childrenCreated();
            // egret.setTimeout(this.createComplete,this,100);
            this.createComplete();
        }

        private createComplete():void
        {
            DebugUtil.debug("UIComponent createComplete: " + this.skinName);
            this.initComponent();
            this.initSetting();
            this.initData();
            this.initListeners();
            this.initLanguage();
            this.onStageResize(null);
            this.isLoaded = true;
        }

        /**页面重新获得焦点 */
        public onActive():void
        {

        }

        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        public onStageResize(evt: egret.Event): void
        {
            if(GlobalConfig.isMobile)
            {
                this.height = StageUtil.height;
            }
            else
            {
               this.calcSize();
            }
            // this.freshPos();
        }
        /**按舞台等比例缩放 */
        public calcSize():void
        {
            var stageW = StageUtil.width,
                stageH = StageUtil.height;

            this.scaleX = stageW/LayerManager.DesignWidth;
            this.scaleY = stageH/LayerManager.DesignHeight;
        }
        /**
         * 初始化组件,需被子类继承
         */
        protected initComponent(): void
        {

        }
        /**
         * 重置一些显示元素的初始状态
         */
        protected initSetting():void
        {

        }
        /**
        * 初始化数据
        */
        protected initData(): void
        {

        }
        /**
         * 初始化语言包,需子类继承
         */
        protected initLanguage(): void
        {

        }
        /**
         * 初始化事件监听器,需被子类继承
         */
        protected initListeners(): void
        {
            // StageUtil.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
        }
        public openModule(params: any, needLoadSkin: boolean, layer: number, direction: number): void
        {

        }
        public close($isDispos, direction?): void
        {

        }
        /**
         * 事件注册，所有事件的注册都需要走这里
         */
        protected registerEvent(target: egret.EventDispatcher, type: string, callBack: Function, thisObject: any): void
        {
            var eventParams: any = {};
            eventParams.target = target;
            eventParams.type = type;
            eventParams.callBack = callBack;
            eventParams.thisObject = thisObject;
            if (target)
            {
                target.addEventListener(type, callBack, thisObject);
                this.eventDic.setValue(target.hashCode + type, eventParams);
            }
        }
        /**
         * 统一移除所有事件
         */
        protected removeAllEvent(): void
        {
            var eventList: Array<any> = this.eventDic.getAllValue();
            while (eventList.length > 0)
            {
                var tempEvent: any = eventList.shift();
                if (tempEvent.target != null)
                {
                    tempEvent.target.removeEventListener(tempEvent.type, tempEvent.callBack, tempEvent.thisObject);
                }
            }
            this.eventDic.clear();
        }
        /**
         * 重载语言包,比如在游戏里面直接切换语言,需被子类继承
         */
        protected reloadLanguage(): void
        {
            let len = this.skin.$elementsContent.length;
            for(let i = 0;i < len;i++)
            {
                if(this.skin.$elementsContent[i] instanceof eui.ALabel)
                {
                    let label:eui.ALabel = <eui.ALabel>this.skin.$elementsContent[i];
                    label.reload();
                }
                if(this.skin.$elementsContent[i] instanceof eui.AButton)
                {
                    let button:eui.AButton = <eui.AButton>this.skin.$elementsContent[i];
                    button.reload();
                }
                if(this.skin.$elementsContent[i] instanceof eui.Group)
                {
                    let group:eui.Group = <eui.Group>this.skin.$elementsContent[i];
                    this.reloadGroup(group);
                }
            }
        }

        //递归
        private reloadGroup(group:eui.Group):void
        {
            let len = group.numChildren;
            for(let i = 0;i < len;i++)
            {
                let child = group.getChildAt(i);

                if(child instanceof eui.ALabel)
                {
                    child.reload();
                }
                if(child instanceof eui.AButton)
                {
                    child.reload();
                }
                if(child instanceof eui.Group)
                {
                    this.reloadGroup(child);
                }
            }
        }

        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispos($isDispos: boolean = false): void
        {
            // StageUtil.stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
            this.removeAllEvent();
            if ($isDispos)
            {
                //todo释放资源
            }
            if (this.parent)
            {
                this.parent.removeChild(this);
            }
        }
    }
}
