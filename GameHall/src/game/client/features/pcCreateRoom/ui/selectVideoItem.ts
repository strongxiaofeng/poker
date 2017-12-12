module game
{
	export class selectVideoItem extends eui.ItemRenderer
	{
		/** 详细按钮*/
		private showVideoBtn:eui.AButton;
		/** 视频源名称*/
		private sourceName:eui.ALabel;
		/** 台桌数*/
		private tables:eui.ALabel;
		/** 视频来源*/
		private Source:eui.ALabel;
		/** 背景*/
		private bgBtn:eui.AButton;
		/** */
		private mainGroup:eui.Group;

		public constructor()
		{
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.skinName = SystemPath.skin_path + "createRoom/selectVideoItem.exml";
			this.addEventListener(egret.Event.COMPLETE,this.complete, this);
		}

		/**每次添加到舞台时 初始化 */
		private onAdd()
		{
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap,this);
			this.mainGroup.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.hiden,this);
			this.bgBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT,this.hiden,this);
			this.bgBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
				this.sourceName.textColor = 0x000000;
			},this);
			this.bgBtn.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
				this.sourceName.textColor = 0xffffff;
			},this);
			this.bgBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,()=>{
				this.sourceName.textColor = 0xffffff;
			},this);
		}

		/** 点击到item*/
		public itemTap():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			/** 发送通知UI，显示视频group*/
			ClubController.getInstance().sendNotification(NotifyConst.Notify_PC_SelectVideo, [this.data,this.sourceName.text]);
		}

		/** 取消点击状态*/
		public itemTapOff():void
		{
			this.selected = false;
			this.showBtn();
		}
		/** 取消点击状态*/
		public itemTapOn():void
		{
			this.selected = true;
			this.showBtn();
		}
		/** 取消点击状态*/
		public clearTap():void
		{
			this.selected = false;
			this.showBtn();
		}

		private showBtn():void
		{
			if(this.selected)
			{
				this.bgBtn.setState = "down";
			}
			else
			{
				this.bgBtn.setState = "up";
			}
		}

		/**根据this.data刷新数据 */
        protected dataChanged(): void
		{
			try{
				this.name = this.data;
				this.showData();
			} catch (e){ }
		}

		/** 显示高亮*/
		private show():void
		{
			this.bgBtn.setState = "disabled";
		}
		/** 隐藏高亮*/
		private hiden():void
		{
			this.showBtn();
		}

		/** UI加载完成*/
		private complete():void
		{
			this.dataChanged();
		}

		/** 更新数据*/
		private showData():void
		{
			this.sourceName.text = ClubModel.getInstance().getRoomSourcesName(this.data);
			// 个数
			this.tables.text =  ClubModel.getInstance().getRoomSourcesNum(this.data) + "";
			// 描述文字
			this.Source.text =  ClubModel.getInstance().getRoomSourcesTxt(this.data);
			this.sourceName.textColor = 0xffffff;
			this.bgBtn.setState = "up";
			this.mainGroup.touchThrough = true;
		}

		/**每次从舞台移除时 清除 */
		private onRemove()
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{ },this);
			this.mainGroup.removeEventListener(mouse.MouseEvent.MOUSE_OUT,this.hiden,this);
			this.bgBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER,this.show,this);
			this.bgBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT,this.hiden,this);
			this.bgBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{},this);
			this.bgBtn.removeEventListener(egret.TouchEvent.TOUCH_END,()=>{},this);
			this.bgBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,()=>{},this);
		}
	}
}
