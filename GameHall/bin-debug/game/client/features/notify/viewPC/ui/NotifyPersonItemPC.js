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
    /**PC联系人的item */
    var NotifyPersonItemPC = (function (_super) {
        __extends(NotifyPersonItemPC, _super);
        function NotifyPersonItemPC() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "notify/notifyItemSkin_person.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        NotifyPersonItemPC.prototype.onAdd = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
        };
        NotifyPersonItemPC.prototype.onOver = function () {
            this.hoverImg.visible = true;
        };
        NotifyPersonItemPC.prototype.onOut = function () {
            this.hoverImg.visible = false;
        };
        NotifyPersonItemPC.prototype.dataChanged = function () {
            var data = this.data;
            this.bigGroup.visible = false;
            this.smallGroup.visible = false;
            this.ownerGroup.visible = false;
            this.myPlayerGroup.visible = false;
            if (data.mode == 1 || data.mode == 2) {
                this.head_default.source = data.mode == 1 ? "news_pic_system_png" : "news_pic_club_pc_png";
                this.bigGroup.visible = true;
                this.nameTxt.text = data.name;
                this.typeTxt.text = data.type;
            }
            else if (data.mode == 3 || data.mode == 4) {
                this.smallGroup.visible = true;
                this.snameTxt.text = data.name;
                this.numTxt.text = data.num + "人";
            }
            else if (data.mode == 5) {
                this.ownerGroup.visible = true;
                this.onameTxt.text = data.name;
                this.showImg(data.imgUrl, this.osheadImg, this.oshead_default);
            }
            else if (data.mode == 6) {
                this.myPlayerGroup.visible = true;
                this.showImg(data.imgUrl, this.msheadImg, this.mshead_default);
            }
        };
        /**展示头像 */
        NotifyPersonItemPC.prototype.showImg = function (str, img, imgDefault) {
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
        NotifyPersonItemPC.prototype.onTap = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var data = this.data;
            //打开系统消息列表
            if (data.mode == 1) {
                //先关闭俱乐部公告列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
                //先关闭聊天列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChatMediatorPC.name);
                //打开系统消息列表
                if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name)) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifySystemNoticeMediatorPC);
                }
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
            }
            else if (data.mode == 3) {
                game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_openOwnersPerson);
            }
            else if (data.mode == 4) {
                game.NotifyController.getInstance().sendNotification(game.NotifyConst.Notify_openPlayersPerson);
            }
            else if (data.mode == 5) {
                //先关闭俱乐部公告列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
                //先关闭系统消息列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
                //打开聊天窗口
                if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyChatMediatorPC.name)) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyChatMediatorPC, data);
                }
            }
            else if (data.mode == 6) {
                //先关闭俱乐部公告列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyClubAnnounceMediatorPC.name);
                //先关闭系统消息列表
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifySystemNoticeMediatorPC.name);
                //先关闭当前聊天
                game.MediatorManager.closeMediator(game.Mediators.Mediator_NotifyChatMediatorPC.name);
                //打开聊天窗口
                if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_NotifyChatMediatorPC.name)) {
                    game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyChatMediatorPC, data);
                }
            }
        };
        NotifyPersonItemPC.prototype.onRemove = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
            this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
        };
        return NotifyPersonItemPC;
    }(eui.ItemRenderer));
    game.NotifyPersonItemPC = NotifyPersonItemPC;
    __reflect(NotifyPersonItemPC.prototype, "game.NotifyPersonItemPC");
    var NotifyPersonItemDataPC = (function () {
        function NotifyPersonItemDataPC() {
        }
        return NotifyPersonItemDataPC;
    }());
    game.NotifyPersonItemDataPC = NotifyPersonItemDataPC;
    __reflect(NotifyPersonItemDataPC.prototype, "game.NotifyPersonItemDataPC");
})(game || (game = {}));
//# sourceMappingURL=NotifyPersonItemPC.js.map