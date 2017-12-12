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
    var NotifyItem = (function (_super) {
        __extends(NotifyItem, _super);
        function NotifyItem() {
            var _this = _super.call(this) || this;
            /**
             * 类型
             * 1 系统消息
             * 2 俱乐部公告
             * 3 房主消息
             * 4 玩家消息
             *  */
            _this._type = 0;
            /**显示模式 */
            _this._mode = "big";
            /**最后一条消息，字符长度超过这个长度，就省略后面的 */
            _this.constNum = 24;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyItemSkin.exml";
            // this.addEventListener(egret.Event.COMPLETE,this.init,this);
            _this.touchChildren = false;
            return _this;
        }
        NotifyItem.prototype.dataChanged = function () {
            var data = this.data;
            this.nameTxt.text = data.name;
            this.snameTxt.text = data.name;
            this.typeTxt.text = data.typeName;
            if (data.lastMsg) {
                if (game.StringUtil.getStrLen(data.lastMsg) > this.constNum) {
                    this.lastmsgTxt.text = game.StringUtil.sliceByLen(data.lastMsg, this.constNum, 0) + "...";
                }
                else {
                    this.lastmsgTxt.text = data.lastMsg;
                }
            }
            else {
                this.lastmsgTxt.text = "";
            }
            if (data.is_read != null) {
                this.newImg.visible = !data.is_read;
            }
            else {
                this.newImg.visible = false;
            }
            this.chipAskGroup.visible = false;
            this.bigGroup.visible = data.mode === "big";
            this.smallGroup.visible = data.mode === "small";
            if (data.time) {
                if (data.type > 2 && data.type != 8 && data.type != 7) {
                    var date = new Date(data.time);
                    this.dateTxt.text = game.NumberUtil.formatDate(date);
                    this.sdateTxt.text = this.dateTxt.text;
                }
                else {
                    if (data.showTime) {
                        this.dateTxt.text = data.showTime;
                        this.sdateTxt.text = data.showTime;
                        this.askDateTxt.text = data.showTime;
                    }
                    else {
                        this.dateTxt.text = "";
                        this.sdateTxt.text = "";
                        this.askDateTxt.text = "";
                    }
                }
            }
            else {
                this.dateTxt.text = "";
                this.sdateTxt.text = "";
                this.askDateTxt.text = "";
            }
            if (data.isVoice) {
                this.lastmsgTxt.text = "[语音]";
            }
            this.clubImg.visible = false;
            this.sclubImg.visible = false;
            this.lockedImg.visible = false;
            this.headMask.visible = false;
            this.typeTxt.textColor = 0xDBBA85;
            // console.warn("data.type:",data.type);
            switch (data.type) {
                case 1:
                    this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_system_png"));
                    break;
                case 2:
                    this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_club_png"));
                    if (data.imgURL) {
                        com.LoadManager.getInstance().getResByUrl(data.imgURL, this.showHeadImg, this, com.ResourceItem.TYPE_IMAGE);
                    }
                    // this.sclubImg.visible = true;
                    // this.clubImg.visible = true;
                    break;
                case 3://房主头像
                    this.showHeadImg(com.LoadManager.getInstance().getRes("mine_pic_default_mini_png"));
                    if (data.imgURL) {
                        com.LoadManager.getInstance().getResByUrl(data.imgURL, this.showHeadImg, this, com.ResourceItem.TYPE_IMAGE);
                    }
                    this.typeTxt.textColor = enums.ColorConst.sBlue;
                    break;
                case 4://玩家头像
                    this.showHeadImg(com.LoadManager.getInstance().getRes("mine_pic_default_mini_png"));
                    if (data.imgURL) {
                        com.LoadManager.getInstance().getResByUrl(data.imgURL, this.showHeadImg, this, com.ResourceItem.TYPE_IMAGE);
                    }
                    break;
                case 5://俱乐部的图标
                    this.clubImg.visible = true;
                    this.sclubImg.visible = true;
                    if (data.members) {
                        this.dateTxt.text = data.members + "人";
                    }
                    this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_club_png"));
                    if (data.imgURL) {
                        com.LoadManager.getInstance().getResByUrl(data.imgURL, this.showHeadImg, this, com.ResourceItem.TYPE_IMAGE);
                    }
                    this.typeTxt.textColor = enums.ColorConst.Green;
                    break;
                case 6://玩家头像
                    this.lockedImg.visible = data.islocked;
                    this.headMask.visible = data.islocked;
                    this.headMask.graphics.clear();
                    this.headMask.graphics.beginFill(0, 0.6);
                    this.headMask.graphics.drawCircle(71.5, 71.5, 71.5);
                    this.headMask.graphics.endFill();
                    this.typeTxt.text = "";
                    this.dateTxt.text = "";
                    this.showHeadImg(com.LoadManager.getInstance().getRes("mine_pic_default_mini_png"));
                    if (data.imgURL) {
                        com.LoadManager.getInstance().getResByUrl(data.imgURL, this.showHeadImg, this, com.ResourceItem.TYPE_IMAGE);
                    }
                    break;
                case 7:
                    this.bigGroup.visible = false;
                    this.smallGroup.visible = false;
                    this.chipAskGroup.visible = true;
                    // this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_chips_png"));
                    console.warn("data.obj:", data.obj);
                    //改变状态
                    var status_1 = data.obj.message_type == "send" ? "news_pic_request2_png" : "news_pic_request1_png";
                    com.LoadManager.getInstance().getResAsync(status_1, this.status, this);
                    this.askNameTxt.text = data.name;
                    if (data.imgURL) {
                        com.LoadManager.getInstance().getResByUrl(data.imgURL, this.chipImg, this, com.ResourceItem.TYPE_IMAGE);
                    }
                    break;
                case 8:
                    this.sclubImg.visible = false;
                    com.LoadManager.getInstance().getResAsync("news_pic_chips_png", this.showHeadImg, this);
                    // this.showHeadImg(com.LoadManager.getInstance().getRes("news_pic_chips_png"));
                    break;
            }
            this._type = data.type;
            this.width = game.StageUtil.width;
        };
        NotifyItem.prototype.chipImg = function (t) {
            this.askImg.texture = t;
            this.askImg.mask = this.ask_default;
        };
        NotifyItem.prototype.status = function (t) {
            this.statusImg.texture = t;
        };
        NotifyItem.prototype.showHeadImg = function (t) {
            this.headImg.texture = t;
            // this.sheadImg.texture = t;
            this.shead_default.texture = t;
            this.headImg.mask = this.head_default;
            // this.sheadImg.mask = this.shead_default;
        };
        Object.defineProperty(NotifyItem.prototype, "type", {
            /**
             * 只读
             * 类型
             * 1 系统消息
             * 2 俱乐部公告
             * 3 房主消息
             * 4 玩家消息
             *  */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        return NotifyItem;
    }(eui.ItemRenderer));
    game.NotifyItem = NotifyItem;
    __reflect(NotifyItem.prototype, "game.NotifyItem");
    var NotifyItemData = (function () {
        function NotifyItemData() {
            /**
             * 类型
             * 1 系统消息
             * 2 俱乐部公告
             * 3 房主消息
             * 4 玩家消息
             * 5 显示俱乐部
             * 6 俱乐部成员
             * 7 请求筹码单独的item
             * 8 请求筹码
             *  */
            this.type = 0;
            this.isVoice = false;
        }
        return NotifyItemData;
    }());
    game.NotifyItemData = NotifyItemData;
    __reflect(NotifyItemData.prototype, "game.NotifyItemData");
})(game || (game = {}));
//# sourceMappingURL=NotifyItem.js.map