module eui {
	/***带悬停样式的按钮 */
	export class AButtonNew extends Component{
        /** 按钮上的图片显示对象。*/
        public imgDisplay: Image;
        /** 按钮上的文本标签。*/
        public labelDisplay: ALabel;
        /** 按钮上的图标显示对象。*/
        public iconDisplay: Image;
		/**当前状态 normal press*/
		private state: string = "normal";
        /** 是否处于悬停状态 */
        private isMouseOver: boolean = false;
        /** 是否处于禁用状态 */
        private disabled: boolean = false;
		/**是否启用悬停图片功能 */
		private haveMouseOver:boolean;

		public defaultImgUrl: string | egret.Texture;
		public pressImgUrl: string | egret.Texture;
		public mouseOverImgUrl: string | egret.Texture;
		public disableImgUrl: string | egret.Texture;

		/**
		 * @param haveMouseOver 是否支持鼠标悬停样式
		 * @param defaultImgUrl 默认的图片资源
		 * @param pressImgUrl 按下的图片资源
		 * @param mouseOverImgUrl 悬停的图片资源
		 * @param disableImgUrl 禁用的图片资源
		 */
		public constructor(haveMouseOver:boolean, defaultImgUrl:string | egret.Texture, pressImgUrl:string | egret.Texture="", mouseOverImgUrl:string | egret.Texture="", disableImgUrl:string | egret.Texture="") {
			super();
			this.haveMouseOver = haveMouseOver;
			this.defaultImgUrl = defaultImgUrl;
			this.pressImgUrl = pressImgUrl;
			this.mouseOverImgUrl = mouseOverImgUrl;
			this.disableImgUrl = disableImgUrl;
			this.initView();
		}


		private initView(){
			this.imgDisplay = new eui.Image();
			this.imgDisplay.width = this.width;
			this.imgDisplay.height = this.height;
			this.addChild(this.imgDisplay);

			this.checkMouseStage();
            this.touchChildren = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			if(this.haveMouseOver){
				this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
            	this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
			}
		}
		public set width(value: number) {
            this.$setWidth(value);
            if(this.imgDisplay){
                this.imgDisplay.width = value;
			}
			if(this.labelDisplay)
			{
				this.labelDisplay.width = value;
			}
        }
		public set height(value: number) {
            this.$setHeight(value);
            if(this.imgDisplay){
                this.imgDisplay.height = value;
            }
			if(this.labelDisplay)
			{
				this.labelDisplay.height = value;
			}
        }

		set enabled (b:boolean)
		{
			this.touchEnabled = b;
			this.disabled = !b;
			this.checkMouseStage();
		}
		set text(s:string)
		{
			if(!this.labelDisplay)
			{
				this.labelDisplay = new eui.ALabel();
				this.labelDisplay.width = this.width;
				this.labelDisplay.height = this.height;
				this.labelDisplay.horizontalCenter = 0;
				this.labelDisplay.verticalCenter = 0;
				this.addChild(this.labelDisplay);
			}
			this.labelDisplay.text = s;
		}
		set icon(url:string)
		{
			if(!this.iconDisplay)
			{
				this.iconDisplay = new eui.Image();
				this.iconDisplay.left = 5;
				this.iconDisplay.verticalCenter = 0;
				this.addChild(this.iconDisplay);
			}
			this.iconDisplay.source = url;
		}
        /**按下*/
        protected onTouchBegin(event: egret.TouchEvent): void
        {
			this.state = "press";
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            this["touchCaptured"] = true;
            this.invalidateState();
            event.updateAfterEvent();
            this.checkMouseStage();
        }
		/**鼠标移入 */
        private onOver(e: egret.TouchEvent): void
        {
            this.isMouseOver = true;
            this.checkMouseStage();
        }
		/**鼠标移出 */
        private onOut(e: egret.TouchEvent): void
        {
            this.isMouseOver = false;
            this.checkMouseStage();
        }
		/**舞台上触摸弹起事件*/
        private onStageTouchEndA(event: egret.Event): void
        {
			this.state = "normal";
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            this["touchCaptured"] = false;
            this.invalidateState();
            this.checkMouseStage();
        }
        /**解除触碰事件处理。*/
        protected onTouchCancle(event: egret.TouchEvent): void
        {
			this.state = "normal";
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEndA, this);
            this["touchCaptured"] = false;
            this.invalidateState();
            this.checkMouseStage();
        }

		/**根据当前状态刷新鼠标悬停的样式 */
        private checkMouseStage(): void
        {
			//禁用
			if(this.disabled){
				this.imgDisplay.source = this.disableImgUrl ? this.disableImgUrl : this.defaultImgUrl;
			}
			//按下
			else if(this.state == "press"){
				this.imgDisplay.source = this.pressImgUrl ? this.pressImgUrl : this.defaultImgUrl;
			}
			//鼠标悬停
			else if(this.haveMouseOver && this.isMouseOver){
				this.imgDisplay.source = this.mouseOverImgUrl ? this.mouseOverImgUrl : this.defaultImgUrl;
			}
			//普通
			else{
				this.imgDisplay.source = this.defaultImgUrl;
			}
        }


        dispose(): void
		{
		}

		$updateRenderNode(): void
		{
			// super.$updateRenderNode();
			this.imgDisplay.width = this.width;
			this.imgDisplay.height = this.height;
		}

	}
}