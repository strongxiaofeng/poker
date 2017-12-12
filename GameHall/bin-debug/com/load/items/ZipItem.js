var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    /**存放zip文件的item */
    var ZipItem = (function () {
        function ZipItem() {
            this._resMap = {};
        }
        ZipItem.prototype.getRes = function (subName) {
            return this._resMap[subName];
        };
        ZipItem.prototype.setRes = function (res) {
            this._resItem = res;
            this.parseZip();
        };
        ZipItem.prototype.parseZip = function () {
            //1.解压
            var jszip = new JSZip(this._resItem.getRes());
            var files = jszip.file(new RegExp("."));
            var groupName = this._resItem.groupName;
            var len = files.length;
            var res;
            var resList = new Array();
            var gourpList = new Array();
            for (var i = 0; i < len; i++) {
                res = this.analyzeFile(files[i]);
                res.groupName = groupName;
                if (res) {
                    gourpList.push(res.name);
                    resList.push(res);
                }
            }
            //2.重新组合成资源组
            len = resList.length;
            com.LoadManager.getInstance().setGroupList(gourpList);
            for (var i = 0; i < len; i++) {
                com.LoadManager.getInstance().analyzer(resList[i]);
            }
            this._resItem.dispose();
            this._resItem = null;
        };
        ZipItem.prototype.analyzeFile = function (file) {
            var name_split = file.name.split("/");
            var fileName = name_split[name_split.length - 1];
            var prefix = com.AnalyzerBase.getStringPrefix(fileName);
            var tail = com.AnalyzerBase.getStringTail(fileName, true);
            if (tail.indexOf('.webp') > -1) {
                tail = tail.replace('.webp', '');
            }
            prefix = prefix + "_" + tail; //格式是写死的
            tail = tail.toLocaleLowerCase();
            var data;
            var index = file.name.indexOf("/resource");
            var path = file.name.slice(index + 1);
            var res = new com.ResourceItem(prefix, path);
            switch (tail) {
                case "png":
                case "jpg":
                case "jpeg":
                    // res = new ResourceItem();
                    res.type = com.ResourceItem.TYPE_IMAGE;
                    res.data = file.asArrayBuffer();
                    break;
                case "cc":
                    res.type = com.ResourceItem.TYPE_BIN;
                    res.data = file.asArrayBuffer();
                    break;
                case "json":
                    //判断是否是sheet
                    data = file.asText();
                    var json = JSON.parse(data);
                    res.type = com.ResourceItem.TYPE_JSON;
                    if (json.file && json.frames) {
                        res.type = com.ResourceItem.TYPE_SHEET;
                    }
                    res.data = data;
                    break;
                case "fnt":
                    res.type = com.ResourceItem.TYPE_FONT;
                    res.data = file.asText();
                    break;
            }
            return res;
        };
        return ZipItem;
    }());
    com.ZipItem = ZipItem;
    __reflect(ZipItem.prototype, "com.ZipItem");
})(com || (com = {}));
//# sourceMappingURL=ZipItem.js.map