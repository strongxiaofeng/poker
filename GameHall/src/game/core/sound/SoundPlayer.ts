module game
{
	export class SoundPlayer
	{
		private static _instance: SoundPlayer;

		/**当前播放的背景音乐url */
		private _bgUrl: string;
		private _callBack:Function;
		private _thisObj:any;
		private _bgSoundChannel:egret.SoundChannel;

		private soundDic:Dictionary;
		private channelDic:Dictionary;

		public static getInstance(): SoundPlayer
		{
			if (this._instance == null)
			{
				this._instance = new SoundPlayer();
			}

			return this._instance;
		}

		public constructor()
		{
			this.soundDic = new Dictionary();
			this.channelDic = new Dictionary();
		}

		/**
		 * 播放音乐
		 * @param url mp3地址
		 * @param callBack 回调函数，播放完成会调用这个函数
		 * @param thisObj 回调函数的对象
		 *  */
		public playSound(url: string, callBack: Function, thisObj: any): void
		{
			// url = "resource/music/room.mp3";
			this._callBack = callBack;
			this._thisObj = thisObj;
			this.startLoad(url);
		}

		/**播放背景音乐 */
		public playBgSound(url: string):void
		{
			if(this._bgUrl)
			{
				this.closeSound(this._bgUrl);
			}
			this._bgUrl = url;
			this.startLoad(url);
		}

		private startLoad(url:string): void
		{
			//创建 Sound 对象
			var sound = new egret.Sound();
			this.soundDic.setValue(url,sound);
			//添加加载完成侦听
			sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			//开始加载
			DebugUtil.debug("加载音乐："+url);
			sound.load(url);
		}

		private onLoadComplete(event: egret.Event): void
		{
			//获取加载到的 Sound 对象
			var sound: egret.Sound = <egret.Sound>event.currentTarget;
			let url = this.soundDic.getKeyByValue(sound);
			let loops = 1;
			//播放音乐
			if(url == this._bgUrl)
			{
				loops = 0;
			}
			var channel: egret.SoundChannel = sound.play(0, loops);
			channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
			this.channelDic.setValue(url,channel);
		}

		private onSoundComplete(event: egret.Event): void
		{
			egret.log("onSoundComplete");
			//获取加载到的 Sound 对象
			var channel: egret.SoundChannel = <egret.SoundChannel>event.currentTarget;
			let url = this.channelDic.getKeyByValue(channel);

			if(this._callBack)
			{
				this._callBack.call(this._thisObj);
			}

			if(url != this._bgUrl)//背景音乐不关闭
			{
				this.closeSound(url);
			}
		}

		/**sound里面都是用url作为key */
		private closeSound(url:string):void
		{
			let channel:egret.SoundChannel = this.channelDic.getValue(url);
			let sound:egret.Sound = this.soundDic.getValue(url);

			if(channel)
			{
				channel.stop();
				this.channelDic.removeKey(url);
			}

			if(sound)
			{
				sound.close();
				this.soundDic.removeKey(url);
			}
		}

		public stop():void
		{
			let arr = this.channelDic.getAllValue();
			let channel:egret.SoundChannel;
			for(let i = arr.length - 1;i >= 0;i--)
			{
				channel = arr[i];
				if(channel)
				{
					channel.stop();
					this.channelDic.removeValue(channel);
				}
			}

			let arr_sound = this.soundDic.getAllValue();
			let sound:egret.Sound;
			for(let i = arr_sound.length - 1;i >= 0;i--)
			{
				sound = arr_sound[i];
				if(sound)
				{
					sound.close();
					this.soundDic.removeValue(sound);
				}
			}
		}

		public play():void
		{
			if(this.soundDic.getKeyLength() > 0)
			{
				//已经有声音在播放了
				return;
			}

			if(this._bgUrl)
			{
				this.playBgSound(this._bgUrl);
			}
		}
	}
}