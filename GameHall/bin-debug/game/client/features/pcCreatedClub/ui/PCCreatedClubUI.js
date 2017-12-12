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
    var PCCreatedClubUI = (function (_super) {
        __extends(PCCreatedClubUI, _super);
        function PCCreatedClubUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "createdClub/createdClubSkin.exml";
            _this.listLoader = game.ListLoader.getInstance();
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        PCCreatedClubUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
            this.tipGroup.visible = false;
            this.showCreateGroup(null);
            this.showCirclerun();
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        PCCreatedClubUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PCCreatedCommands.initListener:
                    this.initListeners(params);
                    break;
                case PCCreatedCommands.getListData:
                    this.updateList(params);
                    break;
                case PCCreatedCommands.getPlayerOnline:
                    var num = 0;
                    for (var i = 0; i < params.length; i++) {
                        num += params[i];
                    }
                    this.showPlayersNum(num + "");
                    break;
                case PCCreatedCommands.getRoomNum:
                    var rooms = params || 0;
                    this.showRoomNum(rooms + "");
                    break;
                case PCCreatedCommands.hidenListLoading:
                    this.listLoader.setLoadComplete();
                    break;
                case PCCreatedCommands.setAllLoaded:
                    this.listLoader.setAllLoaded();
                    break;
                case PCCreatedCommands.showGroupTip:
                    this.isShowTipGroup(true);
                    break;
                case PCCreatedCommands.showTotalNum:
                    this.showClubNum(params + "");
                    break;
            }
        };
        /**注册事件 手动调用*/
        PCCreatedClubUI.prototype.initListeners = function (mediator) {
            var _this = this;
            this.registerEvent(this.addBtn, egret.TouchEvent.TOUCH_TAP, this.showCreateGroup, this);
            this.registerEvent(this.createCancelBtn, egret.TouchEvent.TOUCH_TAP, function () {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                _this.showCreateGroup(null);
            }, this);
            this.registerEvent(this.createConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.createClub, this);
            this.listLoader.setList(this.createdClubScroller, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
        };
        /** 初始化list*/
        PCCreatedClubUI.prototype.initList = function () {
            this.createdClubScroller.scrollPolicyV = eui.ScrollPolicy.ON;
            this.arrayCollection = new eui.ArrayCollection();
            this.createdClubList.itemRenderer = game.PCCreatedClubItem;
            this.createdClubList.useVirtualLayout = false;
            this.createdClubList.dataProvider = this.arrayCollection;
        };
        /** 刷新列表*/
        PCCreatedClubUI.prototype.updateList = function (listData) {
            if (!listData)
                listData = [];
            this.arrayCollection.source = listData;
            this.arrayCollection.refresh();
        };
        /** 是否显示没有俱乐部提示*/
        PCCreatedClubUI.prototype.isShowTipGroup = function (b) {
            this.tipGroup.visible = b;
        };
        /** 显示俱乐部总数*/
        PCCreatedClubUI.prototype.showClubNum = function (num) {
            if (parseInt(num) >= 10) {
                this.clubNum.width = 80;
                this.clubNum.right = 40;
            }
            this.clubNum.text = num || 0 + "";
        };
        /** 显示房间总数*/
        PCCreatedClubUI.prototype.showRoomNum = function (num) {
            if (parseInt(num) >= 10) {
                this.roomNum.width = 80;
                this.roomNum.right = 40;
            }
            this.roomNum.text = num || 0 + "";
        };
        /** 显示在线人数*/
        PCCreatedClubUI.prototype.showPlayersNum = function (num) {
            if (parseInt(num) >= 10) {
                this.playersOnline.width = 80;
                this.playersOnline.right = 40;
            }
            this.playersOnline.text = num || 0 + "";
        };
        /** 显示创建俱乐部弹框*/
        PCCreatedClubUI.prototype.showCreateGroup = function (e) {
            if (e) {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                this.createGroup.visible = true;
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.text = "";
                this.createInput.addEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect();
                game.LayerManager.getInstance().addUI(this.createGroup, enums.LayerConst.LAYER_TOP);
            }
            else {
                this.createGroup.visible = false;
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.removeEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect(false);
                this.addChild(this.createGroup);
            }
        };
        /** 输入俱乐部名称响应事件 */
        PCCreatedClubUI.prototype.onCreateInput = function () {
            var txt = this.createInput.text.trim();
            this.createInput.text = txt;
            this.createConfirmBtn.enabled = txt.length && txt.length > 0;
            this.createConfirmBtn.setState = this.createConfirmBtn.enabled ? 'up' : 'disabled';
        };
        /** 创建一个俱乐部 */
        PCCreatedClubUI.prototype.createClub = function () {
            var _this = this;
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.createConfirmBtn.enabled = false;
            this.createConfirmBtn.setState = 'disabled';
            game.ClubController.getInstance().createClub(this.createInput.text).then(function () {
                _this.onCreateSuccess(_this.createInput.text);
            }).catch(function (errorCode) {
                var msg = "";
                switch (errorCode) {
                    case "name_length":
                        msg = "home_lbl_name_length";
                        break;
                    case "name_empty":
                        msg = "home_lbl_name_empty";
                        break;
                    case "name_character":
                        msg = "home_lbl_name_character";
                        break;
                    case "name_illegal":
                        msg = "home_lbl_name_illegal";
                        break;
                    case "name_exists":
                        msg = "home_lbl_name_exists";
                        break;
                }
                _this.showCreateError(game.LanguageUtil.translate(msg));
            });
        };
        /** 创建俱乐部成功回调
         * @param clubName {string} 俱乐部名称
         */
        PCCreatedClubUI.prototype.onCreateSuccess = function (clubName) {
            var _this = this;
            var createdClubNum = (game.ClubModel.getInstance().getCreatedClubNum() + 1) || 1;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Created, createdClubNum).then(function () {
                var clubInfo = game.ClubModel.getInstance().getCreatedClubByName(clubName);
                _this.showCreateGroup(null);
                var tipData = new game.TipMsgInfo();
                tipData.msg = [
                    { text: game.LanguageUtil.rePlaceLanguage("home_lbl_create_club", "%s", _this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text.trim(), textColor: enums.ColorConst.White }
                ];
                if (clubInfo) {
                    tipData.confirmText = game.LanguageUtil.translate("club_lbl_manage");
                    tipData.thisObj = _this;
                    tipData.comfirmCallBack = function () {
                        game.CommonLoadingUI.getInstance().start();
                        game.GlobalConfig.setClubId(clubInfo.id)
                            .then(function () {
                            game.CommonLoadingUI.getInstance().stop();
                            game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, true);
                            game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedRoomList);
                            game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn, "");
                        }).catch(function (e) {
                            game.CommonLoadingUI.getInstance().stop();
                            game.DebugUtil.debug(e + "进入俱乐部失败");
                        });
                    };
                }
                else {
                    tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                    tipData.thisObj = null;
                    tipData.comfirmCallBack = null;
                }
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
            }).catch(function () {
                _this.showCreateGroup(null);
                var tipData = new game.TipMsgInfo();
                tipData.msg = [
                    { text: game.LanguageUtil.rePlaceLanguage("home_lbl_create_club", "%s", _this.createInput.text.trim()), textColor: enums.ColorConst.Golden }
                    // { text: this.createInput.text.trim(), textColor: enums.ColorConst.LightGray }
                ];
                tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                tipData.thisObj = null;
                tipData.comfirmCallBack = null;
                game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
            });
        };
        /** 按钮圈旋转*/
        PCCreatedClubUI.prototype.showCirclerun = function () {
            this.btnCircle.rotation = 0;
            game.CTween.get(this.btnCircle, { loop: true }).to({ rotation: -360 }, 4000);
        };
        /** 显示创建俱乐部动画效果 */
        PCCreatedClubUI.prototype.showCreateEffect = function (show) {
            var _this = this;
            if (show === void 0) { show = true; }
            if (show) {
                if (this.intervalObj["spinImg"]) {
                    clearInterval(this.intervalObj["spinImg"]);
                }
                this.intervalObj["spinImg"] = setInterval(function () {
                    _this.spinImg.rotation = (_this.spinImg.rotation + 3) % 360 - 180;
                }, 50);
                for (var i = 0; i < 9; i++) {
                    var img = this["shineImg" + i];
                    this.shineImg(img, true);
                }
            }
            else {
                if (this.intervalObj["spinImg"]) {
                    clearInterval(this.intervalObj["spinImg"]);
                }
                for (var i = 0; i < 9; i++) {
                    var img = this["shineImg" + i];
                    this.shineImg(img, false);
                }
            }
        };
        /** 星型图标动画 */
        PCCreatedClubUI.prototype.shineImg = function (img, show) {
            var _this = this;
            if (show === void 0) { show = true; }
            if (show) {
                var w = this.shineGroup.width;
                var h = this.shineGroup.height;
                img.scaleX = img.scaleY = Math.random() * 1 + 0.5;
                img.rotation = Math.random() * 360 - 180;
                img.x = Math.random() * w;
                img.y = h - Math.random() * Math.sin(img.x * Math.PI / w) * h;
                img.alpha = 0;
                game.CTween.removeTweens(img);
                game.CTween.get(img)
                    .wait(Math.random() * 800)
                    .to({ alpha: 1 }, 600)
                    .to({ alpha: 0 }, 400)
                    .call(function () {
                    _this.shineImg(img);
                }, this);
            }
            else {
                game.CTween.removeTweens(img);
            }
        };
        /** 显示create错误*/
        PCCreatedClubUI.prototype.showCreateError = function (params) {
            var _this = this;
            this.createErrorMsg.text = game.LanguageUtil.translate(params);
            this.createTipGroup.alpha = 1;
            this.createTipGroup.visible = true;
            game.CTween.get(this.createTipGroup).wait(1500).to({
                alpha: 0
            }, 1500).call(function () {
                _this.createTipGroup.visible = false;
                _this.createTipGroup.alpha = 1;
                _this.createErrorMsg.text = "";
            }, this);
        };
        // ---------------------------------- dispose ----------------------------------
        PCCreatedClubUI.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            this.showCreateGroup(null);
            game.CTween.removeTweens(this.createTipGroup);
            game.CTween.removeTweens(this.btnCircle);
            _super.prototype.dispose.call(this);
        };
        return PCCreatedClubUI;
    }(game.BaseUI));
    game.PCCreatedClubUI = PCCreatedClubUI;
    __reflect(PCCreatedClubUI.prototype, "game.PCCreatedClubUI");
})(game || (game = {}));
//# sourceMappingURL=PCCreatedClubUI.js.map