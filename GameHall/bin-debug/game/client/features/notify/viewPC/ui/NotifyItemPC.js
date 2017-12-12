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
    /**PC消息主页 最近联系人的item */
    var NotifyItemPC = (function (_super) {
        __extends(NotifyItemPC, _super);
        function NotifyItemPC() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyItemSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        NotifyItemPC.prototype.onAdd = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
        };
        NotifyItemPC.prototype.onOver = function () {
            this.hoverImg.visible = true;
        };
        NotifyItemPC.prototype.onOut = function () {
            this.hoverImg.visible = false;
        };
        NotifyItemPC.prototype.dataChanged = function () {
            var data = this.data;
            this.bigGroup.visible = data.mode == 3 ? false : true;
            this.smallGroup.visible = data.mode == 3 ? true : false;
            this.newImg.visible = !data.isRead;
            this.setSelect(data.isSelect);
            if (data.mode == 1 || data.mode == 2) {
                this.head_default.source = data.mode == 1 ? "news_pic_system_png" : "news_pic_club_pc_png";
                this.showImg(data.imgUrl, this.headImg, this.head_default);
                this.nameTxt.text = data.name;
                this.typeTxt.text = data.type;
                this.lastmsgTxt.text = game.StringUtil.sliceByLen2(data.lastMsg, 20);
                this.dateTxt.text = data.time > 0 ? game.TimeUtil.getFormatBySecond(data.time, 2) : "";
            }
            else {
                this.showImg(data.imgUrl, this.sheadImg, this.shead_default);
                this.snameTxt.text = data.name;
                this.slastmsgTxt.text = game.StringUtil.sliceByLen2(data.lastMsg, 20);
                this.sdateTxt.text = data.time > 0 ? game.TimeUtil.getFormatBySecond(data.time, 2) : "0";
            }
        };
        /**设置选中样式 */
        NotifyItemPC.prototype.setSelect = function (b) {
            console.warn(this.data.id + "选中状态 " + b);
            this.selectedBg.visible = b;
            this.nameTxt.textColor = b ? 0x000000 : 0xC8C8C8;
            this.typeTxt.textColor = b ? 0x000000 : 0xDBBA85;
            this.lastmsgTxt.textColor = b ? 0x000000 : 0x747474;
            this.dateTxt.textColor = b ? 0x000000 : 0xBEBEBE;
            this.snameTxt.textColor = b ? 0x000000 : 0xC8C8C8;
            this.slastmsgTxt.textColor = b ? 0x000000 : 0x747474;
            this.sdateTxt.textColor = b ? 0x000000 : 0xBEBEBE;
            this.arrow.source = b ? "window_btn_into_p_pc_png" : "window_btn_into_pc_png";
        };
        /**根据我在和谁聊天的id 来比对选中状态 */
        NotifyItemPC.prototype.setSelectById = function (id) {
            var data = this.data;
            console.warn("选中id " + id + " 当前item的对方id " + data.id);
            if (id == data.id) {
                this.setSelect(true);
            }
            else {
                this.setSelect(false);
            }
        };
        /**展示头像 */
        NotifyItemPC.prototype.showImg = function (str, img, imgDefault) {
            if (!str)
                return;
            com.LoadManager.getInstance().getResByUrl(game.GlobalConfig.defaultUrl + str, function (t) {
                if (t) {
                    img.texture = t;
                    img.mask = imgDefault;
                }
                else {
                    img.mask = null;
                    imgDefault.visible = true;
                }
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        /**点击了这个item */
        NotifyItemPC.prototype.onTap = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var data = this.data;
            if (data.mode == 1) {
                //先关闭俱乐部公告列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
                //先关闭聊天列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChatMediatorPC.name);
                //打开系统消息列表
                if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name)) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifySystemNoticeMediatorPC);
                }
                game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectNotify, { mode: 1 });
            }
            else if (data.mode == 2) {
                //先关闭系统消息列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
                //先关闭聊天列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChatMediatorPC.name);
                //打开俱乐部公告列表
                if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name)) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC);
                }
                game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectNotify, { mode: 2 });
            }
            else if (data.mode == 3) {
                //先关闭俱乐部公告列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
                //先关闭系统消息列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
                if (game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyChatMediatorPC.name)) {
                    //先关闭当前聊天
                    game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChatMediatorPC.name);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyChatMediatorPC, data);
                }
                else {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyChatMediatorPC, data);
                }
                game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_selectNotify, { mode: 3, user_id: data.id });
            }
        };
        NotifyItemPC.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
            this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
        };
        return NotifyItemPC;
    }(eui.ItemRenderer));
    game.NotifyItemPC = NotifyItemPC;
    __reflect(NotifyItemPC.prototype, "game.NotifyItemPC");
    /**PC消息主页 最近联系人的item 数据类型*/
    var NotifyItemDataPC = (function () {
        function NotifyItemDataPC() {
        }
        return NotifyItemDataPC;
    }());
    game.NotifyItemDataPC = NotifyItemDataPC;
    __reflect(NotifyItemDataPC.prototype, "game.NotifyItemDataPC");
})(game || (game = {}));
//# sourceMappingURL=NotifyItemPC.js.map