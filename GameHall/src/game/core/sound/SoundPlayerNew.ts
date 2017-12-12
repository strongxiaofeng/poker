module game {
	export class SoundPlayerNew {
		public constructor() {
		}

        /**音效开关*/
    	private static isSoundOpen:boolean = true;
        /**背景音乐开关*/
    	private static isMusicOpen:boolean = true;
        /**声音是否激活 当屏幕失去激活时 声音也不激活*/
    	public static isMusicActive:boolean = true;
    	/**正在播放的 音效通道*/
        private static effectChannels:egret.SoundChannel[] = [];
        /**上次背景音乐名*/
        private static lastMusic:string = "";
        /**上次背景音乐通道*/
        private static lastMusicChannel: egret.SoundChannel;
		/** 检查合集音效的播放channel 是否到达停止时间的计时器 */
		private static sheetInterval:any;
		/** 正在播放的合集音效数组 */
		private static PlayingSheetSounds:Array<PlayingSheetSound> = [];

		/**聊天语音的url与Sound对象 */
		private static voiceDic: Dictionary = new Dictionary();

		/**开关背景音乐 */
		public static setMusicOpen(b:boolean)
		{
			this.isMusicOpen = b;
			if(b)
			{
				this.updateBgm();
			}
			else{
				if(this.lastMusicChannel) {
					this.lastMusicChannel.stop();
				}
				this.lastMusicChannel = null;
				this.lastMusic = "";
			}
		}
		/**开关语音 音效 */
		public static setSoundOpen(b:boolean)
		{
			this.isSoundOpen = b;
			if(!b)
			{
				if(this.effectChannels.length > 0)
				{
					for(let i=0; i<this.effectChannels.length; i++)
					{
						this.effectChannels[i].volume = 0;
					}
				}
				
				
				SoundPlayerNew.stopCurrentEffect();

				// if(this.PlayingSheetSounds.length > 0)
				// {
				// 	for(let i=0; i<this.PlayingSheetSounds.length; i++)
				// 	{
				// 		this.PlayingSheetSounds[i].channel.volume = 0;
				// 	}
				// }
			}
		}
		/**
		 * 加载并播放聊天语音
		 */
		public static playVoice(url:string, callback:Function=null, callbackObj:any=null)
		{
			var sound : egret.Sound;
			if(!this.voiceDic.getValue(url))
			{
				sound = new egret.Sound();
				sound.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
					this.voiceDic.setValue(url,sound);
					var channel = sound.play(0, 1);
					channel.addEventListener(egret.Event.SOUND_COMPLETE, ()=>{
						if(callback && callbackObj)
						{
							callback.apply(callbackObj);
						}
					}, this);
				}, this);
				sound.load(url);
			}
			else{
				sound = this.voiceDic.getValue(url);
				var channel = sound.play(0, 1);
				channel.addEventListener(egret.Event.SOUND_COMPLETE, ()=>{
					if(callback && callbackObj)
					{
						callback.apply(callbackObj);
					}
				}, this);
			}
		}

		/**
		 * 播放一个游戏音效/语音
		 * soundKey: SoundConst中的声音key
		 * loop: 循环次数
		 * isPlayBackSound: 是否是视频回放中的声音
		 * priority: 语音优先级 默认3（最低级别）级别1：进入房间语音；级别2：发牌结果、连开、连赢、连输；级别3：其他语音。当有更高级别的语音在播放时，不播放低级别的语音。
		 * */
		public static playEffect(soundKey:Array<string>, loop:number=1, isPlayBackSound:boolean=false, callback:Function=null, callbackObj:any = null, priority=3):void
		{
			// console.log("SoundPlayerNew playEffect ",soundKey);
			if(!this.isSoundOpen || !this.isMusicActive) return;

			var soundName = soundKey[0];
			var sheetName = soundKey[1];
			//单独音效
			if(soundKey.length == 1)
			{
				var sound = SoundLoader.getSingleSound(soundName);
				if(sound){
					//播放这个单音效
					var channel = sound.play(0, loop);
					this.effectChannels.push(channel);
					channel.addEventListener(egret.Event.SOUND_COMPLETE,(e:Event)=>{
						var index = this.effectChannels.indexOf(channel);
						this.effectChannels.splice(index,1);
						if(callback){
							callback.call(callbackObj);
                		}
					}, this);
				}
				else{
					//即时加载 再播放
					SoundLoader.loadSingleSound(soundName, ()=>{
						this.playEffect(soundKey, loop, isPlayBackSound, callback, callbackObj);
					}, this);
				}
			}
			//合集
			else if(soundKey.length == 2)
			{
				//有优先级更高的语音在播，就不播当前这个语音
				if(this.isHighPriorityExists(priority)){
					DebugUtil.debug("SoundPlayerNew "+soundKey[0]+"优先级不满足播放 return");
					return;
				}
				var sheetObj = SoundLoader.getSheet(sheetName);

				//json中的sheet名字 不一定是我们定的名字，而是生成json配置的时候产生的名字,比如我们用dragon座位sheetname,实际名字是dragontiger
				var sheetNameInJson = "";
				for(var name in sheetObj.json){
					if(name){
						sheetNameInJson = name;
						break;
					}
				}
				var startTime = sheetObj.json[sheetNameInJson][soundName].startPosition;
				var endTime = sheetObj.json[sheetNameInJson][soundName].endPosition;

				DebugUtil.debug("开始播放合集声音"+sheetNameInJson+"的音效片段 "+soundName+" startTime:"+startTime+" endTime:"+endTime);
				this.playSheetSound(soundName, sheetObj.sound, startTime, endTime, callback, callbackObj, priority);
			}
		}
		/**停止当前的音效 退出房间时要调*/
		public static stopCurrentEffect(): void{
			// while(this.effectChannels.length > 0){
			// 	this.effectChannels.pop().stop();
			// }
			while(this.PlayingSheetSounds.length > 0){
				this.PlayingSheetSounds.pop().channel.stop();
			}
		}
		/**是否有更高级别的语音在播放 */
		private static isHighPriorityExists(priority: number): boolean
		{
			if(this.PlayingSheetSounds && this.PlayingSheetSounds.length>0)
			{
				for(var i=0; i<this.PlayingSheetSounds.length; i++)
				{
					var playingSheetObj = this.PlayingSheetSounds[i];
					if(playingSheetObj.priority < priority)
					{
						console.log("有优先级更高的语音在播放：",playingSheetObj.name);
						return true;
					}
				}
			}
			return false;
		}
		/** 检测该播放哪首背景音乐 or 停止音乐 */
		public static updateBgm(): void{
			if(!this.isMusicOpen || !this.isMusicActive) return;
			
			var music = SoundConst.mainBgm[0];
            if(MediatorManager.isMediatorOpen(Mediators.Mediator_BaccaratMediator.name)) {
                music = SoundConst.gameBgm[0];
            }

			if(music.length > 0) {
				this.playMusic(music);
			}
			else{
				if(this.lastMusicChannel) {
					this.lastMusicChannel.stop();
				}
				this.lastMusicChannel = null;
				this.lastMusic = "";
			}
		}
		/**当页面激活 和 取消激活时执行 */
		public static setActive(b:boolean)
		{
			this.setMusicOpen(b);
			this.setSoundOpen(b);
			// if(b)
			// {
			// 	this.isMusicActive = true;
			// 	this.updateBgm();
			// }
			// else
			// {
			// 	this.isMusicActive = false;

			// 	if(this.lastMusicChannel) {
			// 		this.lastMusicChannel.stop();
			// 	}
			// 	this.lastMusicChannel = null;
			// 	this.lastMusic = "";
			// }
		}

		/**播放指定的背景音乐 */
		private static playMusic(name:string){
            if(!this.isMusicOpen || !this.isMusicActive) return;
            if(!name) return;
			if(this.lastMusic == name && this.lastMusicChannel && this.lastMusicChannel.position != 0) return;
			if(this.lastMusicChannel) this.lastMusicChannel.stop();

			this.lastMusic = name;
			var music = SoundLoader.getSingleSound(name);
			if(music){
				//播放这个单音效
				this.lastMusicChannel = music.play(0);
			}
			else{
				//即时加载 再看是否还需要播放
				SoundLoader.loadSingleSound(name, ()=>{
					this.updateBgm();
				}, this);
			}
		}
		/**
		 * 播放sheet中的一个音效片段。只支持播放单次 不可以循环 
		 * */
		private  static playSheetSound(soundName: string, sound:egret.Sound, startTime:number, endTime:number, callback:Function=null, callbackObj:any = null, priority){
			var channel = sound.play(startTime, 1);
			if(endTime == 0)
			{
				channel["isEnd"] = false;
				channel.addEventListener(egret.Event.SOUND_COMPLETE,(e:Event)=>{
					channel["isEnd"] = true;
				}, this);
			}

			var playSheetObj = new PlayingSheetSound();
			playSheetObj.name = soundName;
			playSheetObj.priority = priority;
			playSheetObj.channel = channel;
			playSheetObj.endTime = endTime;
			playSheetObj.callback = callback;
			playSheetObj.callbackObj = callbackObj;
			this.PlayingSheetSounds.push(playSheetObj);

			this.startCheckSheetSound(true);
		}
		/**
		 * 开启 or 关闭 sheet音效片段终点的计时器 
		 * */
		private static startCheckSheetSound(b:boolean): void
		{
			if(b)
			{
				if(!this.sheetInterval){
					this.sheetInterval = setInterval(()=>{
						this.checkEndSound();
					}, 10, this);
				}
			}
			else
			{
				clearInterval(this.sheetInterval);
				this.sheetInterval = null;
			}
		}

		/**
		 * 遍历所有正在播放的合集音效 是否到达停止时间
		 */
		private static checkEndSound(): void{
			if(this.PlayingSheetSounds.length > 0)
			{
				for(var i=0; i<this.PlayingSheetSounds.length; i++)
				{
					var playSheetObj = this.PlayingSheetSounds[i];
					//这个合集音效播放位置已经超过了该音效片段的 endtime， 应该停下来了
					if(playSheetObj.endTime>0 && playSheetObj.channel.position >= playSheetObj.endTime)
					{
						DebugUtil.debug("到达停止时间，停止一个音效片段 "+playSheetObj.name);
						this.PlayingSheetSounds.splice(i--, 1);
						playSheetObj.channel.stop();

						if(playSheetObj.callback && playSheetObj.callbackObj)
						{
							playSheetObj.callback.call(playSheetObj.callbackObj);
						}
					}
					else if(playSheetObj.endTime == 0 && playSheetObj.channel["isEnd"])
					{
						DebugUtil.debug("语音播放结束，停止一个音效片段 "+playSheetObj.name);
						this.PlayingSheetSounds.splice(i--, 1);
						if(playSheetObj.callback && playSheetObj.callbackObj)
						{
							playSheetObj.callback.call(playSheetObj.callbackObj);
						}
					}
				}
			}
			else
			{
				//没有正在播放的合集音效，就停止interval,减小性能开销
				this.startCheckSheetSound(false);
			}
		}



	}

	class PlayingSheetSound{
		public name: string;
		public priority: number;
		public channel:egret.SoundChannel;
		public endTime:number;
		public callback:Function;
		public callbackObj:any;
	}
}
