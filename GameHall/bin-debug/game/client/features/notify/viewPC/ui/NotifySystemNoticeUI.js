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
    /**系统消息列表界面 */
    var NotifySystemNoticeUI = (function (_super) {
        __extends(NotifySystemNoticeUI, _super);
        function NotifySystemNoticeUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyList.exml";
            return _this;
        }
        NotifySystemNoticeUI.prototype.initSetting = function () {
            this.listTitle.text = "系统消息";
            this.itemList.itemRenderer = game.NotifySystemNoticeItem;
            this.itemList.useVirtualLayout = false;
            this.ac = new eui.ArrayCollection();
            this.itemList.dataProvider = this.ac;
        };
        NotifySystemNoticeUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case game.NotifyCommands.updateSysList:
                    this.updateSysList(params);
                    break;
                case game.NotifyCommands.selectSysMsg:
                    this.selectItem(params);
                    break;
            }
        };
        /**选中一条系统消息 */
        NotifySystemNoticeUI.prototype.selectItem = function (id) {
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
        NotifySystemNoticeUI.prototype.updateSysList = function (info) {
            if (info.messages && info.messages instanceof Array) {
                var arr = [];
                for (var i = info.messages.length - 1; i >= 0; i--) {
                    var msg = info.messages[i];
                    var data = new game.NotifyItemData();
                    data.id = msg.id;
                    data.type = 1;
                    data.is_read = msg.is_read;
                    data.name = msg.title;
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
                    arr.push(data);
                }
                arr.sort(function (a, b) {
                    return b.time - a.time;
                });
                this.ac.source = arr;
                this.ac.refresh();
            }
        };
        NotifySystemNoticeUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return NotifySystemNoticeUI;
    }(game.BaseUI));
    game.NotifySystemNoticeUI = NotifySystemNoticeUI;
    __reflect(NotifySystemNoticeUI.prototype, "game.NotifySystemNoticeUI");
})(game || (game = {}));
//# sourceMappingURL=NotifySystemNoticeUI.js.map