module game
{
	export class MediatorManager
	{

		/**打开过的mediator对象池 */
		private static mediatorDic: Dictionary = new Dictionary();

		/**记录几个主要显示模块的开始加载的时间 */
        private static saveLoadTime(name: string, loadOver: boolean=false){
            if(!name || !name.length) return;

            // switch(name){
            //     case Mediators.Mediator_HomePage.name:
			// 		if(loadOver) LoadTimeRecorder.getMainViewTime();
            //         else LoadTimeRecorder.setMainViewTime();
            //         break;
            //     case Mediators.Mediator_Baccarat.name:
			// 		if(loadOver) LoadTimeRecorder.getBaccaratViewTime();
            //         else LoadTimeRecorder.setBaccaratViewTime();
            //         break;
            //     case Mediators.Mediator_BaccaratMi.name:
			// 		if(loadOver) LoadTimeRecorder.getBaccaratMiViewTime();
            //         else LoadTimeRecorder.setBaccaratMiViewTime();
            //         break;
            //     case Mediators.Mediator_DragonTiger.name:
			// 		if(loadOver) LoadTimeRecorder.getDTViewTime();
            //         else LoadTimeRecorder.setDTViewTime();
            //         break;
            //     case Mediators.Mediator_Roulette.name:
			// 		if(loadOver) LoadTimeRecorder.getRouletteViewTime();
            //         else LoadTimeRecorder.setRouletteViewTime();
            //         break;
            //     case Mediators.Mediator_Sicbo.name:
			// 		if(loadOver) LoadTimeRecorder.getSicboViewTime();
            //         else LoadTimeRecorder.setSicboViewTime();
            //         break;

            // }
        }
		/**打开某个游戏的mediator */
		public static openMediator(m: MediatorClass, data: any = null,direction = 0): void
		{
			DebugUtil.debug("MediatorManager openMediator " + m.name + " direction:"+direction);
			var name = m.name;
            this.saveLoadTime(name);
			if(direction)
			{
				m.direction = direction;
			}
			let layer = m.layer;
			if (!GlobalConfig.isMobile && m.layer_pc) {
				layer = m.layer_pc;
			}
			if ((m.res && GlobalConfig.isMobile) || (m.res_pc && (!GlobalConfig.isMobile)))
			{
				var resGroup = "";
				if (GlobalConfig.isMobile) {
					resGroup = ResGroups.getMultiGroupName(m.res);
				} else {
					resGroup = ResGroups.getMultiGroupName(m.res_pc);
				}
				var soundGroup = m.sounds;
				this.checkResLoad(resGroup, soundGroup, name, data, layer, m.direction);
			}
			else
			{
				this.checkSoundLoad(m.sounds, name, data, layer, m.direction);
			}
		}
		/**检查这个游戏的图片资源加载了没 */
		private static checkResLoad(resGroup: string, soundGroup: string, name: string, data: any = null, layer:number, direction?:any)
		{
			DebugUtil.debug("检查资源组是否被加载 "+resGroup);
			if (!com.LoadManager.getInstance().isMultiGroupLoaded(resGroup))
			{
				this.loadResMultiGroup(resGroup, soundGroup, name, data, layer, direction);
			}
			else
			{
				this.checkSoundLoad(soundGroup, name, data, layer, direction);
			}
		}
		private static async loadResMultiGroup(resGroup: string, soundGroup: string, name: string, data: any = null, layer:number, direction?:any)
		{
			CommonLoadingUI.getInstance().start();
			DebugUtil.debug("加载multi组 "+resGroup);
			await com.LoadManager.getInstance().loadMultiGroup(
				resGroup,
				(progress: Array<number>) =>
				{
					DebugUtil.debug("加载进度："+progress[0]+"/"+progress[1]);
					// CommonLoadingUI.getInstance().setProgress(itemLoaded, itemTotal);
				},
				this
			);
			DebugUtil.debug("加载multi组 "+resGroup+" 完成");
			CommonLoadingUI.getInstance().stop();
			this.checkSoundLoad(soundGroup, name, data, layer, direction);
		}
		/**检查这个游戏的音效资源加载了没 */
		private static checkSoundLoad(soundGroup: string, name: string, data: any = null, layer:number, direction?:any): void
		{
			if (soundGroup && SoundLoader.getSheet(soundGroup) == null)
			{
				CommonLoadingUI.getInstance().start();
				SoundLoader.loadSoundSheet(soundGroup, () =>
				{
					CommonLoadingUI.getInstance().stop();
					this.startMediator(name, data, layer, direction);
				}, this);
			}
			else
			{
				this.startMediator(name, data, layer, direction);
			}
		}
		/**启用指定的mediator */
		private static startMediator(name: string, data: any = null, layer:number, direction?:any): void
		{
			// ComponentProgressLoading.getInstance().closeLoading();
			//如果要启用的mediator的UI 是在UI层级的，要关闭之前的UI层级的mediator
			if(layer == enums.LayerConst.LAYER_UI)
			{
				this.closeUIMediator(direction);
			}

			//如果重复打开相同的Mediator,要先停用再重新启用，不然会UI泄漏
			var mediator: BaseMediator = this.mediatorDic.getValue(name);
			if(mediator && mediator.isStart) mediator.dispose();

			if (!mediator)
			{
				var cls = egret.getDefinitionByName("game." + name);
				mediator = new cls();
				this.mediatorDic.setValue(name, mediator);
			}

			DebugUtil.debug("MediatorManager startMediator "+name);
			mediator.start(data);
			this.saveLoadTime(name, true);
		}
		/**停用指定的Mediator */
		public static closeMediator(name: string, direction?:any): void
		{
			DebugUtil.debug("MediatorManager closeMediator "+name);
			if(!this.isMediatorOpen(name))
			{
				return;
			}

			var m: BaseMediator = this.mediatorDic.getValue(name);
			if (m)
			{
				m.dispose(direction);
			}
		}
		/** 判断某个mediator是否打开了 */
		public static isMediatorOpen(name: string): boolean
		{
			var m: BaseMediator = this.mediatorDic.getValue(name);
			if (m)
			{
				return m.isStart;
			}
			return false;
		}

		/**停用所有Mediator 当返回登录界面时需要这个*/
		public static closeAllMediator(): void
		{
			var arr: BaseMediator[] = this.mediatorDic.getAllValue();
			if (arr.length > 0)
			{
				for (var i = 0; i < arr.length; i++)
				{
					if (arr[i]) arr[i].dispose();
				}
			}
		}
		/**停用当前的UI层的mediator 在打开一个新的UI层Mediator时调用 */
		private static closeUIMediator(direction?: any): void
		{
			var keys: string[] = this.mediatorDic.getAllKey();
			if (keys.length > 0)
			{
				for (var i = 0; i < keys.length; i++)
				{
					var name = keys[i];
					var m: BaseMediator = this.mediatorDic.getValue(name);
					if(m && m.isStart && m.ui && m.ui.layer == enums.LayerConst.LAYER_UI)
					{
						m.dispose(direction);
					}
				}
			}
		}
		/**全局消息提示 */
		public static tipMsg(msg: string, color: number = 0x00ff00): void
		{
			// this.openMediator(Mediators.Mediator_PopTip, {type:"tip",msg:msg, color:color});
		}
		/**全局倒数提示 执行回调 */
		public static tipDownTime(callBack: Function, thisObj: any): void
		{
			// this.openMediator(Mediators.Mediator_PopTip, {type:"downtime",callback:callBack, callbackObj:thisObj});
		}
		/*通用确定取消界面*/
		public static tipConfirm(params){
			// this.openMediator(Mediators.Mediator_ComfirAndCancelMediator,params);
		}
	}
}
