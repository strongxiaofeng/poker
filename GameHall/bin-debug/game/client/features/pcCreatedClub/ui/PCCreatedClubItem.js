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
    var PCCreatedClubItem = (function (_super) {
        __extends(PCCreatedClubItem, _super);
        function PCCreatedClubItem() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.COMPLETE, _this.onAdd, _this);
            _this.skinName = game.SystemPath.skin_path + "createdClub/createdClubItem.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        /**绿色提示（复制成功） */
        PCCreatedClubItem.prototype.showTxt = function (text) {
            var _this = this;
            game.CTween.removeTweens(this.tipGreenGroup);
            this.tipGreenGroup.visible = true;
            this.tipGreenGroup.alpha = 1;
            this.tipGreenTxt.text = text;
            game.CTween.get(this.tipGreenGroup)
                .to({ alpha: 0.01 }, 2000)
                .call(function () {
                _this.hideGreenTip();
            });
        };
        /**隐藏绿色提示 */
        PCCreatedClubItem.prototype.hideGreenTip = function () {
            game.CTween.removeTweens(this.tipGreenGroup);
            this.tipGreenGroup.visible = false;
        };
        /**每次添加到舞台时 初始化 */
        PCCreatedClubItem.prototype.onAdd = function () {
            var _this = this;
            this.tipGreenGroup.visible = false;
            this.mainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openClub, this);
            this.mainGroup.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onLight, this);
            this.mainGroup.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onLight, this);
            this.ShareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                game.StageUtil.copyTxt(game.ClubModel.getInstance().getClubShareUrl(_this.data.id));
                game.MediatorManager.closeMediator(game.Mediators.Mediator_TipGreen.name);
                _this.showTxt(game.LanguageUtil.translate("global_lbl_copy_successfully"));
            }, this);
        };
        /** 打开俱乐部*/
        PCCreatedClubItem.prototype.openClub = function (e) {
            if (this.data && this.data.id) {
                game.CommonLoadingUI.getInstance().start();
                game.GlobalConfig.setClubId(this.data.id)
                    .then(function () {
                    game.CommonLoadingUI.getInstance().stop();
                    game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, true);
                    game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedRoomList);
                    game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn);
                }).catch(function (e) {
                    game.DebugUtil.debug(e.message + "订阅俱乐部失败");
                });
            }
        };
        /**根据this.data刷新数据 */
        PCCreatedClubItem.prototype.dataChanged = function () {
            this.update(this.data);
        };
        /** 刷新*/
        PCCreatedClubItem.prototype.update = function (data) {
            if (!data)
                return;
            this.clubName.text = data.name;
            this.inviteNum.text = data.invitation_code;
            this.playersNum.text = (this.data.users | 0) + ""; //所有玩家
            this.roomCardNum.text = Math.abs(data.room_card_used || 0) + "";
            this.showRoomNum();
            this.clubIcon.mask = this.clubIconMask;
            if (data && data.img)
                this.showClubIcon(data.img);
            this.showPlayerOnline();
            this.showCreatedTime(data.create_time);
            this.showGameType();
            this.getProfit();
            this.light.visible = false;
        };
        /** 显示房间数*/
        PCCreatedClubItem.prototype.showRoomNum = function () {
            this.roomNum.text = (this.data.rooms_count || 0) + "";
        };
        /** 显示在线人数*/
        PCCreatedClubItem.prototype.showPlayerOnline = function () {
            this.playersOnline.text = (this.data.online_users || 0) + "";
        };
        /** 设置头像圆形遮罩 */
        PCCreatedClubItem.prototype.setAvatarMask = function () {
            //显示圆形剪切图片的方法
            var w = this.clubIcon.width;
            var H = this.clubIcon.height;
            this.Mask = new egret.Shape();
            this.Mask.graphics.beginFill(0xff0000);
            this.Mask.graphics.drawCircle(0, 0, w / 2);
            this.Mask.x = this.clubIcon.x + w / 2;
            this.Mask.y = this.clubIcon.y + H / 2;
            this.Mask.alpha = 0.6;
            // this.iconGroup.addChild(this.Mask);
            // this.clubIcon.mask = this.Mask;
        };
        /** 请求今日盈余*/
        PCCreatedClubItem.prototype.getProfit = function () {
            this.profitNum.text = game.NumberUtil.getSplitNumStr(this.data.today_surplus, 3);
            // DataCenterController.getInstance().getTodayStatistics(this.data.id).then((data: {
            // 	surplus: number;
            // 	bet: number;
            // 	bet_count: number;
            // 	balance: number;
            // 	room_card_used: number
            // }) => {
            // 	this.profitNum.text = NumberUtil.getSplitNumStr(data.surplus,3);
            // }).catch((e)=>{
            // 	DebugUtil.debug( e + "请求今日盈余失败");
            // });
        };
        /** 显示俱乐部徽标*/
        PCCreatedClubItem.prototype.showClubIcon = function (url) {
            var _this = this;
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
        /** 显示俱乐部游戏类型*/
        PCCreatedClubItem.prototype.showGameType = function () {
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
        };
        /** 显示创建时间*/
        PCCreatedClubItem.prototype.showCreatedTime = function (t) {
            var time = new Date(t);
            var Y = time.getFullYear() + '/';
            var M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '/';
            var D = time.getDate() < 10 ? "0" + time.getDate() : time.getDate() + '';
            this.createdTime.text = Y + M + D;
        };
        /** item高亮*/
        PCCreatedClubItem.prototype.onLight = function (e) {
            // this.createdClubItemBg.source = e.type == mouse.MouseEvent.MOUSE_OVER ?  "created_btn_bg_p_pc_png" : "created_btn_bg_pc_png";
            this.light.visible = e.type == mouse.MouseEvent.MOUSE_OVER;
        };
        /**每次从舞台移除时 清除 */
        PCCreatedClubItem.prototype.onRemove = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.mainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openClub, this);
            this.mainGroup.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onLight, this);
            this.mainGroup.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onLight, this);
            this.hideGreenTip();
        };
        return PCCreatedClubItem;
    }(eui.ItemRenderer));
    game.PCCreatedClubItem = PCCreatedClubItem;
    __reflect(PCCreatedClubItem.prototype, "game.PCCreatedClubItem");
})(game || (game = {}));
//# sourceMappingURL=PCCreatedClubItem.js.map