module com {

	/**存放zip文件的item */
	export class ZipItem {

		private _resItem: ResourceItem;
		private _resMap: any = {};

		public constructor() { }

		public getRes(subName: string): any {
			return this._resMap[subName];
		}

		public setRes(res: ResourceItem): void {
			this._resItem = res;
			this.parseZip();
		}

		private parseZip(): void {
			//1.解压
			let jszip = new JSZip(this._resItem.getRes());
			let files = jszip.file(new RegExp("."));
			let groupName = this._resItem.groupName;
			let len = files.length;
			let res: ResourceItem;
			let resList = new Array<ResourceItem>();
			let gourpList = new Array<string>();
			for (let i = 0; i < len; i++) {
				res = this.analyzeFile(files[i]);
				res.groupName = groupName;
				if (res) {
					gourpList.push(res.name);
					resList.push(res);
				}
			}
			//2.重新组合成资源组
			len = resList.length;
			LoadManager.getInstance().setGroupList(gourpList);
			for (let i = 0; i < len; i++) {
				LoadManager.getInstance().analyzer(resList[i]);
			}
			this._resItem.dispose();
			this._resItem = null;
		}

		private analyzeFile(file: JSZipObject): ResourceItem {
			let name_split = file.name.split("/");
			let fileName = name_split[name_split.length - 1];
			let prefix = com.AnalyzerBase.getStringPrefix(fileName);
			let tail = com.AnalyzerBase.getStringTail(fileName, true);
			if (tail.indexOf('.webp') > -1) {
				tail = tail.replace('.webp', '');
			}
			prefix = prefix + "_" + tail;//格式是写死的
			tail = tail.toLocaleLowerCase();
			let data: any;
			let index = file.name.indexOf("/resource");
			let path = file.name.slice(index + 1);
			let res: ResourceItem = new ResourceItem(prefix, path);
			switch (tail) {
				case "png":
				case "jpg":
				case "jpeg":
					// res = new ResourceItem();
					res.type = ResourceItem.TYPE_IMAGE;
					res.data = file.asArrayBuffer();
					break;
				case "cc":
					res.type = ResourceItem.TYPE_BIN;
					res.data = file.asArrayBuffer();
					break;
				case "json":
					//判断是否是sheet
					data = file.asText();

					let json = JSON.parse(data);
					res.type = ResourceItem.TYPE_JSON;
					if (json.file && json.frames) {
						res.type = ResourceItem.TYPE_SHEET;
					}
					res.data = data;
					break;
				case "fnt":
					res.type = ResourceItem.TYPE_FONT;
					res.data = file.asText();
					break;
			}
			return res;
		}

	}
}