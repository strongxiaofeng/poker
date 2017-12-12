module game
{
    /**
     * 负责将UI展现到舞台上，从舞台上清除
     * */
    export class UIManager
    {
        private static uiDic: Dictionary = new Dictionary();
        public constructor()
        {
        }

        /**打开一个UI */
        public static OpenUI(ui: BaseUI, layer: number, direction?, index:number=-1): void
        {
            var uiName: string = egret.getQualifiedClassName(ui);
            DebugUtil.debug("UIManager open UI " + uiName+" 方向 "+direction);

            ui.layer = layer;
            LayerManager.getInstance().addUI(ui, layer, index);
            this.uiDic.setValue(egret.getQualifiedClassName(ui), ui);

            if (direction && GlobalConfig.isMobile)
            {
                LayerManager.getInstance().forbitTouch();
                var dir = {};
                if (VIEWDIRECTION.TOP == direction)
                {
                    dir = { "y": 0 };
                    ui.x = 0;
                    ui.y = -StageUtil.height;
                } else if (VIEWDIRECTION.BOTTOM == direction)
                {
                    dir = { "y": 0 };
                    ui.x = 0;
                    ui.y = StageUtil.height;
                } else if (VIEWDIRECTION.LEFT == direction)
                {
                    dir = { "x": 0 };
                    ui.y = 0;
                    ui.x = -StageUtil.width;
                } else if (VIEWDIRECTION.RIGHT == direction)
                {
                    dir = { "x": 0 };
                    ui.y = 0;
                    ui.x = StageUtil.width;
                }
                egret.Tween.removeTweens(ui);
                egret.Tween.get(ui).wait(200).to(dir, 400).call(function ()
                {
                    egret.Tween.removeTweens(ui);
                    LayerManager.getInstance().openTouch();
                }, this);
            }
            else
            {
                ui.x = 0;
                ui.y = 0;
            }
        }

        private static lastState:Dictionary = new Dictionary();

        /**隐藏其他的ui，主要用于视频回放 */
        public static hideOtherUI(ui: BaseUI):void
        {
            this.lastState.clear();
            let arr = this.uiDic.getAllValue();
            for(let i = arr.length - 1;i >= 0;i--)
            {
                let type = egret.getQualifiedClassName(arr[i]);
                if(ui != arr[i] && type != "NavbarUI1")
                {
                    this.lastState.setValue(egret.getQualifiedClassName(arr[i]),arr[i].visible);
                    arr[i].visible = false;
                }
            }
        }

        /**显示当前显示列表的ui */
        public static showOtherUI():void
        {
            let arr = this.uiDic.getAllValue();
            for(let i = arr.length - 1;i >= 0;i--)
            {
                arr[i].visible = this.lastState.getValue(egret.getQualifiedClassName(arr[i]));
            }
        }

        /**关闭当前界面 */
        public static closeCur():void
        {

        }

        /**关闭一个UI */
        public static closeUI(ui: BaseUI, direction?): void
        {
            if (!ui) return;

            var uiName: string = egret.getQualifiedClassName(ui);
            DebugUtil.debug("UIManager close UI " + uiName+" 方向 "+direction);
            this.uiDic.removeKey(uiName);

            if (direction && GlobalConfig.isMobile)
            {
                var dir = {};
                if (VIEWDIRECTION.TOP == direction)
                {
                    dir = { "y": StageUtil.height };
                    ui.x = 0;
                } else if (VIEWDIRECTION.BOTTOM == direction)
                {
                    dir = { "y": -StageUtil.height };
                    ui.x = 0;
                } else if (VIEWDIRECTION.LEFT == direction)
                {
                    dir = { "x": StageUtil.width };
                    ui.y = 0;
                } else if (VIEWDIRECTION.RIGHT == direction)
                {
                    dir = { "x": -StageUtil.width };
                    ui.y = 0;
                }
                egret.Tween.removeTweens(ui);
                egret.Tween.get(ui).to(dir, 400).call(function ()
                {
                    egret.Tween.removeTweens(ui);
                    ui.dispose();
                }, this);
            } else
            {
                ui.dispose();
            }
        }

        public static onStageResize(e: egret.Event)
        {
            if (this.uiDic)
            {
                var uis = this.uiDic.getAllValue();
                for (let i = 0; i < uis.length; i++)
                {
                    var ui: BaseUI = uis[i];
                    if (ui)
                    {
                        ui.onStageResize(e);
                    }
                }
            }
        }
    }
}
