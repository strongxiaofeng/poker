module game {
	export class LoadGameUI extends BaseUI{
		/**遮罩 */
		private maskShape:egret.Shape;
		private loadGroup: eui.Group;
		private circle: eui.Image;
		private light: eui.Image;
		public constructor() {
			super();
			this.skinName =SystemPath.skin_path + "load/loadGame.exml";
		}

		public initSetting()
		{
			super.initSetting();

			this.maskShape = new egret.Shape();
			this.addChild(this.maskShape);
			this.loadGroup.addChild(this.maskShape);
			this.circle.mask = this.maskShape;

			this.circle.visible = false;
		}
		
		public onStageResize(evt: egret.Event): void {
            super.onStageResize(evt);
        }

        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void {
			switch(type)
			{
				case LoadGameCommands.setProgress:
					this.setProgress(params);
					break;
			}
        }
		/**显示加载进度 传入百分比的前面数字 */
		private setProgress(data: number): void
		{
			// this.loadingTxt.text = data+"%";
			
			this.circle.visible = data > 1;
			let endAng = data/100*Math.PI*2 - Math.PI/2;
			let r = this.circle.width/2;
			let num:number,lineW:number,str:number;
            if (game.GlobalConfig.isMobile) {
                num = r + 10;
                lineW = 30;
				str = 0;
            }
            else {
                num = r + 15;
                lineW = 34;
				str = Math.PI / 90;
            }
			//改变弧形遮罩
			this.maskShape.graphics.clear();
			this.maskShape.graphics.lineStyle(lineW, 0xff0000);
			this.maskShape.graphics.drawArc(this.circle.x, this.circle.y, num, -Math.PI/2+0.08, endAng - str);
			this.maskShape.graphics.beginFill(0xff0000);
			this.maskShape.graphics.drawCircle(-500, -500, 100);
			this.maskShape.graphics.endFill();
			
			//计算光点位置
			let x = Math.cos(endAng) * r + this.circle.x;
			let y = Math.sin(endAng) * r + this.circle.y;
			this.light.x = x;
			this.light.y = y;
		}
		/**关闭 */
		public dispose()
		{
			super.dispose();
			this.maskShape.graphics.clear();
		}
	}
}