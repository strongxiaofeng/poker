namespace eui
{
	/**
	 * 带鼠标悬停效果的按钮
	 */
    export class AButton extends Button
    {
        /** [SkinPart] 按钮上的图片显示对象。*/
        public imgDisplay: Image = null;
        /** [SkinPart] 按钮上的鼠标悬停图片显示对象。*/
        public mouseDisplay: Image = null;
        /** [SkinPart] 按钮上的文本标签。*/
        public labelDisplay: IDisplayText = null;
        /** [SkinPart] 按钮上的图标显示对象。*/
        public iconDisplay: Image = null;
        /** @private */
        private _mouseTexture: string | egret.Texture = null;
        // private _mouseTextColor:number;
        /** 是否处于悬停状态 */
        private isMouseOver: boolean = false;

        /**多语言的key */
        private _key = "";


        private _setState: string;
        public get setState(): string {
            return this._setState;
        }
        public set setState(v: string) {
            if (this._setState == v) { return; }
            this.currentState = v;
            this._setState = v;
            if (this.labelDisplay && this.labelDisplay.text) {
                let text = this.labelDisplay.text;
                this.labelDisplay.text = " " + text + " ";
                // egret.callLater(function () {
                    this.labelDisplay.text = text;
                // }, this);
            }
        }


        /**
         * 创建一个按钮实例
         */
        public constructor()
        {
            super();
            this.touchChildren = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
        }

        protected childrenCreated():void
        {
            super.childrenCreated();
            if(this.labelDisplay instanceof eui.ALabel)
            {
                (<eui.Label>this.labelDisplay).fontFamily = eui.ALabel.defaultFont;
                this.label = this.label;
            }
        }

        private onOver(e: egret.TouchEvent): void
        {
            this.isMouseOver = true;
            this.checkMouseStage();
        }
        private onOut(e: egret.TouchEvent): void
        {
            this.isMouseOver = false;
            this.checkMouseStage();
        }
        // private lastTextColor:number;
        /**根据当前状态刷新鼠标悬停的样式 */
        private checkMouseStage(): void
        {
            //设置文本在hover状态的颜色
            if (this.isMouseOver && this.setState != "down" && this.getCurrentState() == "up") {
                this.currentState = "hover";
            }
            else {
                if (this.setState == "down") {
                    this.currentState = "down";
                } else if (this.setState == "disabled") {
                    this.currentState = "disabled";
                } else {
                    this.currentState = "up";
                }
            }

            //悬停图片
            if (this.mouseDisplay)
            {
                if (!this.imgDisplay)
                {
                    this.imgDisplay = <Image>this.getChildAt(0);
                }

                if (this.isMouseOver && this.getCurrentState() == "up")
                {
                    this.mouseDisplay.visible = true;
                    this.imgDisplay.visible = false;
                    // this.lastTextColor = (this.labelDisplay as eui.Label).textColor;
                    // (this.labelDisplay as eui.Label).textColor = this._mouseTextColor;
                }
                else
                {
                    this.mouseDisplay.visible = false;
                    this.imgDisplay.visible = true;
                    // (this.labelDisplay as eui.Label).textColor = this.lastTextColor;
                }

                this.setChildIndex(this.mouseDisplay, 1);
                this.mouseDisplay.width = this.imgDisplay.width;
                this.mouseDisplay.height = this.imgDisplay.height;
                this.mouseDisplay.anchorOffsetX = this.imgDisplay.anchorOffsetX;
                this.mouseDisplay.anchorOffsetY = this.imgDisplay.anchorOffsetY;
                this.mouseDisplay.scaleX = this.imgDisplay.scaleX;
                this.mouseDisplay.scaleY = this.imgDisplay.scaleY;
                if (this.imgDisplay.scale9Grid) this.mouseDisplay.scale9Grid = this.imgDisplay.scale9Grid.clone();
            }
        }

        /** 要在按钮上显示的文本。*/
        public get label(): string
        {
            return this["_label"];
        }
        public set label(value: string)
        {
            this._key = value;
            this["_label"] = value;
            if (this.labelDisplay)
            {
                this.labelDisplay.text = game.LanguageUtil.translate(value);
            }
        }

        /**重置多语言 */
        public reload(): void
        {
            this.label = this._key;
        }

        /** 要在按钮上显示的图标数据*/
        public get icon(): string | egret.Texture
        {
            return this["_icon"];
        }
        public set icon(value: string | egret.Texture)
        {
            this["_icon"] = value;
            if(!this.iconDisplay)
            {
                this.iconDisplay = new eui.Image();
                this.addChild(this.mouseDisplay);
            }
            this.iconDisplay.source = value;
        }
        public set iconPress(value: string | egret.Texture)
        {
            this["_iconPress"] = value;
        }

        // /** 鼠标滑过的文本颜色 */
        // public get mouseTextColor():number
        // {
        //     return this._mouseTextColor;
        // }

        // public set mouseTextColor(value:number)
        // {
        //     this._mouseTextColor = value;
        // }

        /** 鼠标滑过的资源 */
        public get mouseTexture(): string | egret.Texture
        {
            return this._mouseTexture;
        }
        public set mouseTexture(value: string | egret.Texture)
        {
            this._mouseTexture = value;
            if (!this.mouseDisplay)
            {
                this.mouseDisplay = new Image(value);
                this.addChildAt(this.mouseDisplay, 1);
                this.mouseDisplay.name = "mouseDisplay";
                this.mouseDisplay.left = 0;
                this.mouseDisplay.right = 0;
                this.mouseDisplay.top = 0;
                this.mouseDisplay.bottom = 0;
                this.mouseDisplay.visible = false;
            }
        }

        /**解除触碰事件处理。*/
        protected onTouchCancle(event: egret.TouchEvent): void
        {
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);

            if(this.iconDisplay && this["_icon"])
            {
                this.iconDisplay.source = this["_icon"];
            }

            this["touchCaptured"] = false;
            this.invalidateState();
            this.checkMouseStage();
        }
        /**触碰事件处理。*/
        protected onTouchBegin(event: egret.TouchEvent): void
        {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);

            if(this.iconDisplay && this["_iconPress"])
            {
                this.iconDisplay.source = this["_iconPress"];
            }

            this["touchCaptured"] = true;
            this.invalidateState();
            event.updateAfterEvent();
            this.checkMouseStage();
            this.currentState = "down";
        }

        protected onTouchEnd(event: egret.TouchEvent): void{
            this.currentState = "up";
        }

        /**舞台上触摸弹起事件*/
        private onStageTouchEndA(event: egret.Event): void
        {
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);

            if(this.iconDisplay && this["_icon"])
            {
                this.iconDisplay.source = this["_icon"];
            }

            if (this.contains(event.target))
            {
                this.buttonReleased();
            }
            this["touchCaptured"] = false;
            this.invalidateState();
            this.checkMouseStage();
        }
    }
}