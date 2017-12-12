var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    /**俱乐部公告列表界面 */
    var NotifyClubAnnounceUI = (function (_super) {
        __extends(NotifyClubAnnounceUI, _super);
        function NotifyClubAnnounceUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyList.exml";
            return _this;
        }
        NotifyClubAnnounceUI.prototype.initSetting = function () {
            this.listTitle.text = "俱乐部公告";
            this.itemList.itemRenderer = game.NotifyClubAnnounceItem;
            this.itemList.useVirtualLayout = false;
            this.ac = new eui.ArrayCollection();
            this.source = [];
            this.itemList.dataProvider = this.ac;
        };
        NotifyClubAnnounceUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.updateAnnounceList:
                    this.updateAnnounceList(params);
                    break;
                case game.NotifyCommands.selectClubAnnounce:
                    this.selectItem(params);
                    break;
            }
        };
        /**选中一条公告 */
        NotifyClubAnnounceUI.prototype.selectItem = function (id) {
            this.selectedId = id;
            for (var i = 0; i < this.itemList.numChildren; i++) {
                var child = this.itemList.getChildAt(i);
                child.setSelectById(id);
            }
            // for(let i=0; i<this.ac.length; i++)
            // {
            // 	let itemdata = (<NotifyItemData>this.ac.getItemAt(i));
            // 	if(itemdata.id == id)
            // 	{
            // 		itemdata.isSelect = true;
            // 	}
            // 	else
            // 	{
            // 		itemdata.isSelect = false;
            // 	}
            // }
            // this.ac.refresh();
        };
        NotifyClubAnnounceUI.prototype.updateAnnounceList = function (info) {
            if (info.announcements && info.announcements instanceof Array) {
                for (var i = info.announcements.length - 1; i >= 0; i--) {
                    var msg = info.announcements[i];
                    var data = new game.NotifyItemData();
                    data.id = msg.id;
                    data.club_id = msg.club_id;
                    data.type = 2;
                    data.name = msg.title;
                    data.club_name = msg.club_name;
                    data.is_read = msg.is_read;
                    data.mode = "small";
                    data.time = msg.publish_time;
                    var date = new Date(msg.publish_time);
                    data.showTime = game.NumberUtil.formatDate(date);
                    if (msg.id == this.selectedId) {
                        data.isSelect = true;
                    }
                    else {
                        data.isSelect = false;
                    }
                    this.source.push(data);
                }
                this.source.sort(function (a, b) {
                    return b.time - a.time;
                });
                this.ac.source = this.source;
                this.ac.refresh();
            }
        };
        NotifyClubAnnounceUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return NotifyClubAnnounceUI;
    }(game.BaseUI));
    game.NotifyClubAnnounceUI = NotifyClubAnnounceUI;
    __reflect(NotifyClubAnnounceUI.prototype, "game.NotifyClubAnnounceUI");
})(game || (game = {}));
//# sourceMappingURL=NotifyClubAnnounceUI.js.map