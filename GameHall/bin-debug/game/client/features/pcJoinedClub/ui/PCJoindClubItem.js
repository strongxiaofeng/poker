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
    var PCJoindClubItem = (function (_super) {
        __extends(PCJoindClubItem, _super);
        function PCJoindClubItem() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            _this.skinName = game.SystemPath.skin_path + "joinedClub/joinedClubItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.complete, _this);
            return _this;
        }
        /**每次添加到舞台时 初始化 */
        PCJoindClubItem.prototype.onAdd = function () {
            this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onLight, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onLight, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openClub, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeBg, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.changeBg, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.changeBg, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.changeBg, this);
        };
        /**根据this.data刷新数据 */
        PCJoindClubItem.prototype.dataChanged = function () {
            this.update(this.data);
            this.clubIconMask.visible = false;
        };
        /** UI加载完成*/
        PCJoindClubItem.prototype.complete = function () {
            this.update(this.data);
            this.clubIconMask.visible = false;
        };
        /** 刷新*/
        PCJoindClubItem.prototype.update = function (data) {
            if (!data)
                return;
            this.isOpen = false;
            // this.setMask();
            this.clubName.text = data.name || "";
            this.creator.text = game.LanguageUtil.translate("global_lbl_creator") + (data.creator_name || "");
            if (data && data.locked) {
                this.lock.visible = true;
            }
            else {
                this.lock.visible = false;
            }
            this.light.visible = false;
            this.showGameType();
            this.requestClubRooms(data.id);
            this.requestClubChips(data.id);
            this.clubIcon.mask = this.clubIconMask;
            this.setAvatarMask();
            if (data && data.img)
                this.showClubIcon(data.img);
        };
        /** 打开俱乐部*/
        PCJoindClubItem.prototype.openClub = function (e) {
            var _this = this;
            if (this.lock.visible) {
                /** 被锁提示*/
                var tipData = new game.TipMsgInfo();
                tipData.msg = [{ text: game.LanguageUtil.rePlaceLanguage("global_lbl_club_locked", "%s", this.data.name), textColor: enums.ColorConst.Golden }];
                tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                tipData.comfirmCallBack = function () { };
                tipData.thisObj = this;
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                return;
            }
            if (this.isOpen)
                return;
            this.isOpen = true;
            game.CommonLoadingUI.getInstance().start();
            game.GlobalConfig.setClubId(this.data.id)
                .then(function () {
                _this.isOpen = false;
                game.CommonLoadingUI.getInstance().stop();
                game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedRoomList);
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn);
            })
                .catch(function (e) {
                game.DebugUtil.debug(e + "订阅加入的俱乐部失败");
            });
        };
        /** 显示俱乐部游戏类型*/
        PCJoindClubItem.prototype.showGameType = function () {
            // ClubController.getInstance().getClubGameType(this.data.id)
            // .then((arr: Array<string>) =>
            // {
            var arr = this.data.rooms_type;
            var text = game.LanguageUtil.translate("global_lbl_no");
            var types = [];
            if (arr) {
                arr.forEach(function (v) {
                    switch (v.toLowerCase()) {
                        case "baccarat":
                            types.push(game.LanguageUtil.translate("global_lbl_baccarat"));
                            break;
                        case "roulette":
                            types.push(game.LanguageUtil.translate("founder_btn_search_type_rt"));
                            break;
                        case "sicbo":
                            types.push(game.LanguageUtil.translate("founder_btn_search_type_sibo"));
                            break;
                        case "dragontiger":
                            types.push(game.LanguageUtil.translate("founder_btn_search_type_dt"));
                            break;
                    }
                });
            }
            text = types.join(",") || text;
            this.gameType.text = text;
            // }).catch((e: Error) => {
            // DebugUtil.debug("请求俱乐部游戏类型失败" + e.message)
            // });
        };
        /** 获取俱乐部房间数*/
        PCJoindClubItem.prototype.requestClubRooms = function (id) {
            this.roomNum.text = (this.data.rooms_count || 0) + "";
        };
        /** 请求玩家俱乐部筹码余额*/
        PCJoindClubItem.prototype.requestClubChips = function (clubId) {
            var _this = this;
            game.ClubController.getInstance().subscribeAccount(clubId, game.PersonalInfoModel.getInstance().user_id, false).then(function () {
                var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id, clubId) || 0;
                _this.chipNum.text = game.NumberUtil.getSplitNumStr(balance);
            }).catch(function (e) {
                game.DebugUtil.debug(e + "订阅用户在某俱乐部的信息失败");
            });
        };
        /** 设置头像圆形遮罩 */
        PCJoindClubItem.prototype.setAvatarMask = function () {
            //显示圆形剪切图片的方法
            var w = this.clubIcon.width;
            var H = this.clubIcon.height;
            var mask = new egret.Shape();
            mask.graphics.beginFill(0xff0000);
            mask.graphics.drawCircle(0, 0, w / 2);
            mask.x = this.clubIcon.x + w / 2;
            mask.y = this.clubIcon.y + H / 2;
            // this.addChild(mask);
            // this.clubIcon.mask = mask;
        };
        /** 显示俱乐部徽标*/
        PCJoindClubItem.prototype.showClubIcon = function (url) {
            var _this = this;
            if (!url)
                return;
            var ip = game.GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            var fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                _this.clubIcon.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        /** 显示或隐藏高亮线*/
        PCJoindClubItem.prototype.onLight = function (e) {
            this.light.visible = e.type == mouse.MouseEvent.MOUSE_OVER;
        };
        /** 切换item背景图*/
        PCJoindClubItem.prototype.changeBg = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.itemBgUp.visible = false;
                this.itemBgDown.visible = true;
            }
            else {
                this.itemBgUp.visible = true;
                this.itemBgDown.visible = false;
            }
        };
        /** 设置遮罩*/
        PCJoindClubItem.prototype.setMask = function () {
            var w = this.clubIcon.width;
            var h = this.clubIcon.height;
            var shop = new egret.Shape();
            shop.graphics.beginFill(0xff0000);
            shop.graphics.drawCircle(0, 0, w / 2);
            shop.x = 50 + w / 2;
            shop.y = this.clubIcon.y + h / 2;
            this.addChild(shop);
            this.clubIcon.mask = shop;
        };
        /**每次从舞台移除时 清除 */
        PCJoindClubItem.prototype.onRemove = function () {
            this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onLight, this);
            this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onLight, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openClub, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeBg, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.changeBg, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.changeBg, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.changeBg, this);
        };
        return PCJoindClubItem;
    }(eui.ItemRenderer));
    game.PCJoindClubItem = PCJoindClubItem;
    __reflect(PCJoindClubItem.prototype, "game.PCJoindClubItem");
})(game || (game = {}));
//# sourceMappingURL=PCJoindClubItem.js.map