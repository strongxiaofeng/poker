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
    var ExitClubItem = (function (_super) {
        __extends(ExitClubItem, _super);
        function ExitClubItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "exitClub/exitClubItem.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            _this.addEventListener(egret.Event.COMPLETE, _this.complete, _this);
            return _this;
        }
        /**每次添加到舞台时 初始化 */
        ExitClubItem.prototype.onAdd = function () {
            this.exitClubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPopUp, this);
            this.exitClubBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.showLabelColoer, this);
            this.exitClubBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.showLabelColoer, this);
        };
        /**退出提示*/
        ExitClubItem.prototype.showPopUp = function () {
            var tipData = new game.TipMsgInfo();
            tipData.msg = [{ text: game.LanguageUtil.translate("mine_lbl_warning_quite") + this.data.name + "?", textColor: enums.ColorConst.Golden }];
            tipData.cancelText = game.LanguageUtil.translate("global_btn_cancel_text");
            tipData.confirmText = game.LanguageUtil.translate("global_btn_ok_text");
            tipData.cancelCallBack = this.cancelCallBack;
            tipData.comfirmCallBack = this.exitClub;
            tipData.thisObj = this;
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        /** 退出俱乐部取消回调 */
        ExitClubItem.prototype.cancelCallBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 退出俱乐部 */
        ExitClubItem.prototype.exitClub = function () {
            var _this = this;
            var clubId = this.data.id + "";
            game.ClubController.getInstance().leaveClub(clubId).then(function () {
                if (game.GlobalConfig.clubId == +clubId) {
                    if (!game.GlobalConfig.isMobile) {
                        // 	MediatorManager.openMediator(Mediators.Mediator_ClubHome);
                        // } else {
                        game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedClub);
                    }
                }
                game.DebugUtil.debug("退出俱乐部成功:" + _this.data.id);
            }).catch(function (e) {
                game.DebugUtil.debug("退出俱乐部失败" + e.massage);
            });
        };
        /**根据this.data刷新数据 */
        ExitClubItem.prototype.dataChanged = function () {
            // try {
            this.showClubItem(this.data);
            // } catch (e) {
            // 	DebugUtil.debug(e + "item数据加载错误");
            // }
        };
        /** UI加载完成*/
        ExitClubItem.prototype.complete = function () {
            this.dataChanged();
        };
        /** 显示俱乐部名称*/
        ExitClubItem.prototype.showClubItem = function (data) {
            this.clubName.text = data.name || "";
            this.creator.text = "" + (data.creator_name || "");
            this.joinedTime.text = game.LanguageUtil.translate("founder_lbl_join_time") + ":" + game.TimeUtil.getFormatBySecond(this.data.join_time, 6).split("-").join("/");
            this.showGameType();
            this.requestClubChips(data.id);
            this.requestClubRooms(data.id);
            this.clubIcon.mask = null;
            this.clubIcon.mask = this.clubIconMask;
            if (data.img)
                this.showClubIcon(data.img);
        };
        /** 显示俱乐部游戏类型*/
        ExitClubItem.prototype.showGameType = function () {
            var _this = this;
            game.ClubController.getInstance().getClubGameType(this.data.id)
                .then(function (arr) {
                var text = game.LanguageUtil.translate("global_lbl_no");
                var types = [];
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
                text = types.join(",") || text;
                _this.gameType.text = text;
            }).catch(function (e) {
                game.DebugUtil.debug("请求俱乐部游戏类型失败" + e.message);
            });
        };
        /** 获取俱乐部房间数*/
        ExitClubItem.prototype.requestClubRooms = function (id) {
            var clubInfo = game.ClubModel.getInstance().getClubInfo(+id);
            this.roomNum.text = (clubInfo.rooms_count || 0) + "";
        };
        /** 请求玩家俱乐部筹码余额*/
        ExitClubItem.prototype.requestClubChips = function (clubId) {
            var _this = this;
            game.ClubController.getInstance().subscribeAccount(clubId, game.PersonalInfoModel.getInstance().user_id, true).then(function () {
                var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id, clubId) || 0;
                _this.chipNum.text = game.NumberUtil.getSplitNumStr(balance);
            }).catch(function (e) {
                game.DebugUtil.debug(e + "订阅用户在某俱乐部的信息失败");
            });
        };
        /** 显示俱乐部徽标*/
        ExitClubItem.prototype.showClubIcon = function (url) {
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
                // this.clubIcon.mask = this.clubIconMask;
                _this.clubIcon.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        /** 显示文本颜色*/
        ExitClubItem.prototype.showLabelColoer = function (e) {
            if (e.type == mouse.MouseEvent.MOUSE_OVER) {
                this.exitClubBtn.getChildByName("labelDisplay").textColor = 0xFF5050;
            }
            else {
                this.exitClubBtn.getChildByName("labelDisplay").textColor = 0xE7B56F;
            }
        };
        /**每次从舞台移除时 清除 */
        ExitClubItem.prototype.onRemove = function () {
            this.exitClubBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showPopUp, this);
            this.exitClubBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.showLabelColoer, this);
            this.exitClubBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.showLabelColoer, this);
        };
        return ExitClubItem;
    }(eui.ItemRenderer));
    game.ExitClubItem = ExitClubItem;
    __reflect(ExitClubItem.prototype, "game.ExitClubItem");
})(game || (game = {}));
//# sourceMappingURL=ExitClubItem.js.map