module game {
	/**
	 * 多语言的声音 都用合集
	 * 非多语言的音效,即时加载
	 * 
	 */
	export class SoundLoader {
		/**合集名对应的声音文件和配置 */
		private static soundSheets = {
			"baccarat":null,
			"dragon":null,
			"public":null,
			"roulette":null,
			"sicbo":null,
		};
		/**正在加载的sheet */
		private static loadingSheetSound:string = "";
		/**非合集的音效字典 */
		private static singSoundsDic = new Dictionary();
		/**正在加载的单音效队列 */
		private static loadingSingleSounds:Array<string> =[];


		/**通过name加载一个声音合集，name必须是定义好的5个name之一 */
		public static loadSoundSheet(name:string, callback:Function=null, callbackObj:any=null)
		{
			// if(!SoundPlayerNew.isMusicOpen) {
			// 	callback.call(callbackObj);
			// 	return;
			// }

			DebugUtil.debug("加载声音合集 "+name);
			this.loadingSheetSound = name;
			var mp3Url = SystemPath.music_path + LanguageUtil.local + SoundConst.sheetUrl[name]+".mp3";
			var jsonUrl = SystemPath.music_path + LanguageUtil.local + SoundConst.sheetUrl[name]+".json";

			com.LoadManager.getInstance().getResByUrl(jsonUrl, (jsonData)=>{
				com.LoadManager.getInstance().getResByUrl(mp3Url, (data: any)=>
                {
                    if (data)
                    {
						DebugUtil.debug("声音合集"+this.loadingSheetSound+"加载完成");

						//将这个合集的声音文件和json文件存起来
						var sheet:SoundSheetObj = new SoundSheetObj();
						sheet.json = jsonData;
						sheet.sound = data;
						this.soundSheets[this.loadingSheetSound] = sheet;
						this.loadingSheetSound = "";

						if(callback && callbackObj){
							callback.call(callbackObj);
						}
                    }
                }, this, com.ResourceItem.TYPE_SOUND);
			}, this, com.ResourceItem.TYPE_JSON);
		}
		/**加载单个音效 */
		public static loadSingleSound(name:string, callback:Function=null, callbackObj:any=null): void
		{
			if(this.loadingSingleSounds.indexOf(name) >= 0){
				//已经正在加载的单音效 不重复去加载
				return;
			}
			else{
				DebugUtil.debug("开始加载单个声音:"+name);
				this.loadingSingleSounds.push(name);
			}

			var url = SystemPath.music_path + SoundConst.soundUrl[name];
			com.LoadManager.getInstance().getResByUrl(url, (data: any)=>
                {
                    if (data)
                    {
						DebugUtil.debug("单个声音 "+name+"加载完成");
						this.singSoundsDic.setValue(name, data);

						//从加载队列移除该音效
						let loadIndex = this.loadingSingleSounds.indexOf(name);
						this.loadingSingleSounds.splice(loadIndex, 1);


						if(callback && callbackObj){
							callback.call(callbackObj);
						}
                    }
                }, this, com.ResourceItem.TYPE_SOUND);
		}

		/**通过name获取非合集的音效 如果这个音效还未加载完，返回null*/
		public static getSingleSound(name): egret.Sound
		{
			var sound = this.singSoundsDic.getValue(name);
			if(sound){
				return sound;
			}
			else{
				return null;
			}
		}
		/**通过sheet名 获取sheet的声音和json配置 */
		public static getSheet(name): SoundSheetObj
		{
			var sheet = this.soundSheets[name];
			console.log("通过name"+name+"获取音效集:",sheet, this.soundSheets);
			if(sheet){
				return sheet;
			}
			else{
				return null;
			}
		}
	}

	class SoundSheetObj{
		json:any;
		sound:egret.Sound;
	}
}