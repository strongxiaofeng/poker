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
    var ClubHomeItem = (function (_super) {
        __extends(ClubHomeItem, _super);
        function ClubHomeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/game_skins/mobile/club/clubListItem.exml";
            _this.addEventListener(egret.Event.COMPLETE, _this.Complete, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        /**当启用这个item时执行的初始化方法 由子类重写*/
        ClubHomeItem.prototype.onAdd = function () {
        };
        ClubHomeItem.prototype.dataChanged = function () {
            this.type = this.data.type;
        };
        ClubHomeItem.prototype.Complete = function () {
            this.type = this.data.type;
            this.removeEventListener(egret.Event.COMPLETE, this.Complete, this);
        };
        Object.defineProperty(ClubHomeItem.prototype, "type", {
            set: function (type) {
                switch (type) {
                    case ClubHomeItem.Label:
                        this.myClubGroup.visible = false;
                        this.joinClubGroup.visible = false;
                        this.clubLabelGroup.visible = true;
                        this.CreateLabel();
                        break;
                    case ClubHomeItem.Create:
                        this.myClubGroup.visible = true;
                        this.joinClubGroup.visible = false;
                        this.clubLabelGroup.visible = false;
                        this.CreateClub();
                        break;
                    case ClubHomeItem.Join:
                        this.myClubGroup.visible = false;
                        this.joinClubGroup.visible = true;
                        this.clubLabelGroup.visible = false;
                        this.CreateJoin();
                        break;
                    default:
                        this.myClubGroup.visible = false;
                        this.joinClubGroup.visible = false;
                        this.clubLabelGroup.visible = false;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**创建文本item*/
        ClubHomeItem.prototype.CreateLabel = function () {
            this.sharGroup.visible = false; //隐藏分享按钮
            this.maskGroup.visible = false; //隐藏锁
            if (this.data.listData == "joined") {
                this.height = 50;
                this.clubLabel.text = game.LanguageUtil.translate("club_lbl_club_list_title_item_joined");
                this.staticGroup.visible = false;
            }
            else {
                this.height = 125;
                this.clubLabel.text = game.LanguageUtil.translate("club_lbl_club_list_title_item_self");
                this.staticGroup.visible = true;
                this.clubNum.text = game.LanguageUtil.translate("club_lbl_club_total") + ":" + this.data.listData.length;
                this.showStatic(this.data.listData);
            }
        };
        /** 统计数*/
        ClubHomeItem.prototype.showStatic = function (arr) {
            var roomN = 0, onLineN = 0;
            this.data.listData.forEach(function (info) {
                roomN += info.rooms_count | 0;
                onLineN += info.online_users | 0;
            }, this);
            this.roomNum.text = game.LanguageUtil.translate("club_lbl_rooms_total") + ":" + game.NumberUtil.getSplitNumStr(roomN * 100);
            this.playerOnline.text = game.LanguageUtil.translate("club_lbl_online_players_ount") + ":" + game.NumberUtil.getSplitNumStr(onLineN * 100);
        };
        /**创建我的俱乐部item*/
        ClubHomeItem.prototype.CreateClub = function () {
            this.initMouseEvent(true);
            this.maskGroup.visible = false; //隐藏锁
            this.sharGroup.visible = true; //显示分享按钮
            this.clubInvitation.text = this.data.invitation_code;
            this.clubItemName.text = this.data.name;
            this.allPlayer.text = (this.data.users | 0) + ""; //所有玩家
            this.roomCard.text = Math.abs(this.data.room_card_used || 0) + "";
            this.height = 350;
            var img = this.data.img;
            if (img) {
                this.setClubIcon(img, this.createClubFaceImg, this.createClubFaceMask);
            }
            /** 获取房间数*/
            this.rooms.text = (this.data.rooms_count || 0) + "";
            this.players.text = game.NumberUtil.getSplitNumStr(this.data.online_users * 100 || 0);
            this.showGameType();
            this.getProfit();
        };
        /** 请求今日盈余*/
        ClubHomeItem.prototype.getProfit = function () {
            var _this = this;
            game.DataCenterController.getInstance().getTodayStatistics(this.data.id).then(function (data) {
                _this.profits.text = game.NumberUtil.getSplitNumStr(data.surplus, 3);
            }).catch(function (e) {
                game.DebugUtil.debug(e + "请求今日盈余失败");
            });
        };
        /**创建加入的俱乐部item*/
        ClubHomeItem.prototype.CreateJoin = function () {
            this.initMouseEvent(true);
            this.sharGroup.visible = false; //隐藏分享按钮
            this.maskGroup.visible = this.data.locked; //隐藏锁
            this.joinedClubItemName.text = this.data.name; //把item数据的topic给name
            this.clubCreate.text = this.data.creator_name || "";
            this.height = 350;
            /** 获取玩家在俱乐部的筹码余额*/
            this.getChip(this.data.id);
            var img = this.data.img;
            if (img) {
                this.setClubIcon(img, this.joinedClubFaceImg, this.joinedClubFaceMask);
            }
            this.joinedRooms.text = (this.data.rooms_count || 0) + "";
            this.showGameType();
        };
        /** 设置clubIcon */
        ClubHomeItem.prototype.setClubIcon = function (url, img, mask) {
            var ip = game.GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            var fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                img.source = data;
                img.mask = mask;
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        /**获取玩家在俱乐部的筹码余额*/
        ClubHomeItem.prototype.getChip = function (clubId) {
            var _this = this;
            game.ClubController.getInstance().subscribeAccount(+clubId, game.PersonalInfoModel.getInstance().user_id, true).then(function () {
                var balance = game.ClubModel.getInstance().getPayerBalance(game.PersonalInfoModel.getInstance().user_id, +clubId) || 0;
                _this.chips.text = game.NumberUtil.getSplitNumStr(balance);
            }).catch(function (e) {
                game.DebugUtil.debug(e + "订阅用户在某俱乐部的信息失败");
            });
        };
        /** 显示俱乐部游戏类型*/
        ClubHomeItem.prototype.showGameType = function () {
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
                _this.games.text = text;
                _this.joinedGameType.text = text;
            }).catch(function (e) {
                game.DebugUtil.debug("请求俱乐部游戏类型失败" + e.message);
            });
        };
        /** 点击事件 */
        ClubHomeItem.prototype.initMouseEvent = function (b) {
            if (b) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        };
        /** 点击响应*/
        ClubHomeItem.prototype.onTouchEnd = function (e) {
            var _this = this;
            if (this.maskGroup.visible) {
                var tipData = new game.TipMsgInfo();
                tipData.msg = [{ text: game.LanguageUtil.rePlaceLanguage("global_lbl_club_locked", "%s", this.data.name), textColor: enums.ColorConst.Golden }];
                tipData.confirmText = "global_btn_I_know";
                tipData.comfirmCallBack = this.confirmBack;
                tipData.thisObj = this;
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                return;
            }
            /** 创建的和加入的都在这里进入俱乐部*/
            if (!this.data.id)
                return;
            game.GlobalConfig.clubId = this.data.id;
            var target = e.target;
            //分享
            if (target == this.sharBtn) {
                game.StageUtil.copyTxt(game.ClubModel.getInstance().getClubShareUrl(this.data.id));
                game.MediatorManager.closeMediator(game.Mediators.Mediator_TipGreen.name);
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipGreen, "global_lbl_copy_successfully");
            }
            else {
                game.ClubController.getInstance().getSubscribeRoomList(this.data.id).then(function () {
                    if (_this.data.creator == game.PersonalInfoModel.getInstance().user_id) {
                        game.MediatorManager.openMediator(game.Mediators.Mediator_HomeOwnerClub);
                    }
                    else {
                        game.MediatorManager.openMediator(game.Mediators.Mediator_ClubGames);
                    }
                }).catch(function (data) {
                    game.DebugUtil.debug('订阅我的俱乐部topic返回错误:' + data);
                });
            }
        };
        /** 无法进入俱乐部弹框的确定返回*/
        ClubHomeItem.prototype.confirmBack = function () { };
        /**当移除这个item时执行的清除方法 由子类重写*/
        ClubHomeItem.prototype.onRemove = function () {
            this.initMouseEvent(false);
        };
        ClubHomeItem.Label = "Label";
        ClubHomeItem.Create = "Create";
        ClubHomeItem.Join = "Join";
        return ClubHomeItem;
    }(eui.AItemRenderer));
    game.ClubHomeItem = ClubHomeItem;
    __reflect(ClubHomeItem.prototype, "game.ClubHomeItem");
})(game || (game = {}));
//# sourceMappingURL=ClubHomeItem.js.map