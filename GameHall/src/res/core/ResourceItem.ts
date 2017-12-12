
module R {

	/**
	 * 资源项。对应 Resource.json 中 resources 数组中的一项。
	 * @version Egret 2.4
	 * @platform Web,Native
	 * @language zh_CN
	 */
	export class ResourceItem{

		public static TYPE_XML:string = "xml";
		public static TYPE_IMAGE:string = "image";
		public static TYPE_BIN:string = "bin";
		public static TYPE_TEXT:string = "text";
        public static TYPE_JSON:string = "json";
        public static TYPE_SHEET:string = "sheet";
        public static TYPE_FONT:string = "font";
        public static TYPE_SOUND:string = "sound";

		public constructor(name:string,url:string,type:string){
			this.name = name;
			this.url = url;
			this.type = type;
		}

		public name:string;
		public url:string;
		public type:string;
		public groupName:string = "";
		public data:any = null;
		
		private _loaded:boolean = false;
		public get loaded():boolean{
			return this.data?this.data.loaded:this._loaded;
		}
		public set loaded(value:boolean){
			if(this.data)
				this.data.loaded = value;
			this._loaded = value;
		}

		public toString():string{
			return "[ResourceItem name=\""+this.name+"\" url=\""+this.url+"\" type=\""+this.type+"\"]";
		}
	}
}