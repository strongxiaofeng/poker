module game
{
	/**
	 *
	 * @desc 基本的UI界面显示类
	 *
	 */
    export class BaseUI extends eui.Component
    {

        private eventDic: Dictionary;
        /** 统一的timeout管理 */
        public timeoutObj: Object;
        /** 统一的interval管理 */
        public intervalObj: Object;
        private _layer: number = 0;

        public constructor()
        {
            super();
            this.eventDic = new Dictionary();
            this.timeoutObj = {};
            this.intervalObj = {};
            this.addEventListener(egret.Event.COMPLETE, this.uiComplete, this);
        }
        /**UI创建完成 */
        protected uiComplete()
        {
            this.removeEventListener(egret.Event.COMPLETE, this.uiComplete, this);
            this.initSetting();
            this.initSettingOver();
        }

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void
        {
        }
        /**执行initsetting完成 派发事件 让mediator执行initdata */
        public initSettingOver()
        {
            this.onStageResize(null);
            this.timeoutObj["initSettingOver"] = setTimeout(() =>
            {
                this.dispatchEventWith("settingComplete");
            }, 0);
        }

        public get layer(): number
        {
            return this._layer;
        }
        public set layer(n: number)
        {
            this._layer = n;
        }

        /**在pc版的适配时，对这个UI启用整体遮罩，避免超出部分被看到 */
        public openTotalMask(): void
        {
            if (!GlobalConfig.isMobile) this.mask = new egret.Rectangle(0, 0, LayerManager.DesignWidth, LayerManager.DesignHeight);
        }

        /**取消这个UI的整体遮罩 */
        public closeTotalMask(): void
        {
            this.mask = null;
        }

        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void
        {

        }
        /**页面重新获得焦点 */
        public onActive(): void
        {

        }
        /**
         * 当舞台尺寸发生变化,需被子类继承
         */
        public onStageResize(evt: egret.Event): void
        {
            if (GlobalConfig.isMobile)
            {
                this.width = StageUtil.width;
                this.height = StageUtil.height;
            } else
            {
                var stageW = StageUtil.width,
                    stageH = StageUtil.height;
                this.scaleX = stageW / LayerManager.DesignWidth;
                this.scaleY = stageH / LayerManager.DesignHeight;
            }
        }

        public removeTimeout(): void
        {
            for (let key in this.timeoutObj)
            {
                if (this.timeoutObj[key])
                {
                    clearTimeout(this.timeoutObj[key]);
                }
            }
        }

        public removeInterval(): void
        {
            for (let key in this.intervalObj)
            {
                if (this.intervalObj[key])
                {
                    clearInterval(this.intervalObj[key]);
                }
            }
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
        /**统一的为 包含img和label的group 添加按下样式 ;
         * img是AImage对象，name必须取为img ；
         * label是ALabel对象，name必须取为label */
        protected addDownListener(group: eui.Group)
        {
            group.touchEnabled = true;
            group.touchChildren = false;
            group.touchThrough = false;

            let img: eui.AImage = <eui.AImage>group.getChildByName("img");
            let label: eui.ALabel = <eui.ALabel>group.getChildByName("label");
            let down = () =>
            {
                img.source = img.source_press;
                label.textColor = label.color_press;

                let str = label.text;
                label.text = str + "a";
                label.text = str;
            }
            let up = () =>
            {
                img.source = img.source_default;
                label.textColor = label.color_default;

                let str = label.text;
                label.text = str + "a";
                label.text = str;
            }
            this.registerEvent(group, egret.TouchEvent.TOUCH_BEGIN, down, this);
            this.registerEvent(group, egret.TouchEvent.TOUCH_CANCEL, up, this);
            this.registerEvent(group, egret.TouchEvent.TOUCH_END, up, this);
            this.registerEvent(group, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, up, this);
        }
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        public dispose(): void
        {
            this.removeTimeout();
            this.removeInterval();
            this.removeAllEvent();
            if (this.parent)
            {
                this.parent.removeChild(this);
            }
        }
    }
}
