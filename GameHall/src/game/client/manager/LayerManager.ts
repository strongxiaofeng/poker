module game
{
	/**
	 *
	 * @desc 界面层级管理器
	 *
	 */
    export class LayerManager
    {
        private static instance : LayerManager;
        public static getInstance(): LayerManager{
            if(this.instance == null){
                this.instance = new LayerManager();
            }
            return this.instance;
        }

        public static DesignWidth = 1920;
        public static DesignHeight = 1080;
        private bgLayer: egret.DisplayObjectContainer;
        private uiLayer: egret.DisplayObjectContainer;
        private titleLayer: egret.DisplayObjectContainer;
        private menuLayer: egret.DisplayObjectContainer;
        private tipLayer: egret.DisplayObjectContainer;
        private topLayer: egret.DisplayObjectContainer;
        private systemLayer: egret.DisplayObjectContainer;
        private rooUI: egret.DisplayObjectContainer;
        public constructor()
        {
            this.bgLayer = new egret.DisplayObjectContainer();
            this.uiLayer = new egret.DisplayObjectContainer();
            this.titleLayer = new egret.DisplayObjectContainer();
            this.menuLayer = new egret.DisplayObjectContainer();
            this.tipLayer = new egret.DisplayObjectContainer();
            this.topLayer = new egret.DisplayObjectContainer();
            this.systemLayer = new egret.DisplayObjectContainer();
        }

        public onStageResize():void
        {
            if(this.rooUI)
            {
                if(GlobalConfig.isMobile)
                {
                    return;
                }
                else
                {
                    if(StageUtil.height > LayerManager.DesignHeight)
                    {
                        this.rooUI.y = (StageUtil.height - LayerManager.DesignHeight)/2;
                        this.rooUI.scaleY = LayerManager.DesignHeight/StageUtil.height;
                    }
                    else
                    {
                        this.rooUI.y = 0;
                        this.rooUI.scaleY = 1;
                    }
                }
            }
        }
		/**
		 * 初始化根显示对象
		 */
        public initRootLayer(root: egret.DisplayObjectContainer): void
        {
            this.rooUI = root;
            root.addChild(this.bgLayer);
            root.addChild(this.uiLayer);
            root.addChild(this.titleLayer);
            root.addChild(this.menuLayer);
            root.addChild(this.tipLayer);
            root.addChild(this.topLayer);
            root.addChild(this.systemLayer);
            this.onStageResize();
        }
		/** 添加显示
         * @param display {egret.DisplayObject} 要添加到UI的显示对象
         * @param layer {number} UI层级
         */
        public addUI(display: egret.DisplayObject, layer: number, index:number=-1): void
        {
            if(index>-1)
            {
                switch (layer)
                {
                    case enums.LayerConst.LAYER_BG:
                        this.bgLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_UI:
                        this.uiLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_TITLE:
                        this.titleLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_MENU:
                        this.menuLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_TIP:
                        this.tipLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_TOP:
                        this.topLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_SYSTEM:
                        this.systemLayer.addChildAt(display, index);
                        break;
                    case enums.LayerConst.LAYER_ROOT:
                        this.rooUI.addChildAt(display, index);
                        break;
                } 
            }
            else
            {
                switch (layer)
                {
                    case enums.LayerConst.LAYER_BG:
                        this.bgLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_UI:
                        this.uiLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_TITLE:
                        this.titleLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_MENU:
                        this.menuLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_TIP:
                        this.tipLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_TOP:
                        this.topLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_SYSTEM:
                        this.systemLayer.addChild(display);
                        break;
                    case enums.LayerConst.LAYER_ROOT:
                        this.rooUI.addChild(display);
                        break;
                }
            }
        }
        /**
         * 设置uilayer的显示和隐藏
         */
        public showOrHideUI(value: boolean)
        {
            this.uiLayer.visible = value;
        }
        public openTouch()
        {
            // this.rooUI.touchThrough = true;
            this.rooUI.touchEnabled = true;
            this.rooUI.touchChildren = true;
        }
        public forbitTouch()
        {
            // this.rooUI.touchThrough = false;
            this.rooUI.touchEnabled = false;
            this.rooUI.touchChildren = false;
        }

        /**
         * ui公共排版函数
         * */
        public setLayer(display: egret.DisplayObject, type: number, offX: number = 0, offY = 0): void
        {
            if (display)
            {
                if (display.parent)
                {
                    switch (type)
                    {
                        case 1://居中
                            display.x = (StageUtil.width - display.width) / 2 + offX;
                            display.y = (StageUtil.height - display.height) / 2 + offY;
                            break;
                    }
                }
            }
        }
    }
}
