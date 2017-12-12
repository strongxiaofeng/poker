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
    var PCJoinedClubUI = (function (_super) {
        __extends(PCJoinedClubUI, _super);
        function PCJoinedClubUI() {
            var _this = _super.call(this) || this;
            _this.numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            _this.skinName = game.SystemPath.skin_path + "joinedClub/joinedClubSkin.exml";
            _this.listLoader = game.ListLoader.getInstance();
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        PCJoinedClubUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
            this.tipGroup.visible = false;
            this.showCirclerun();
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        PCJoinedClubUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PCJoinedCommands.initListener:
                    this.initListeners(params);
                    break;
                case PCJoinedCommands.getListData:
                    this.updateList(params);
                    break;
                case PCJoinedCommands.hidenListLoading:
                    this.listLoader.setLoadComplete();
                    break;
                case PCJoinedCommands.setAllLoaded:
                    this.listLoader.setAllLoaded();
                    break;
                case PCJoinedCommands.showGroupTip:
                    this.isShowTipGroup(true);
                    break;
                case PCJoinedCommands.showTotalClub:
                    this.updateClubNum(params + "");
                    break;
            }
        };
        /**注册事件 手动调用*/
        PCJoinedClubUI.prototype.initListeners = function (mediator) {
            var _this = this;
            // this.registerEvent(this.joinedClubScroller, egret.Event.CHANGE, (e: egret.Event)=>{
            // 	let list = e.target.viewport;
            // 	if(list.contentHeight < list.height) return;
            // 	if (list.scrollV + list.height - list.contentHeight > 150) {
            // 		mediator.requestJoinedClubList();
            // 	}
            // }, this);
            this.listLoader.setList(this.joinedClubScroller, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
            this.registerEvent(this.addBtn, egret.TouchEvent.TOUCH_TAP, this.showJoinGroup, this);
            this.registerEvent(this.joinCancelBtn, egret.TouchEvent.TOUCH_TAP, function () { _this.showJoinGroup(null); }, this);
            this.registerEvent(this.joinConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.joinClub, this);
        };
        /** 初始化list*/
        PCJoinedClubUI.prototype.initList = function () {
            this.joinedClubScroller.scrollPolicyV = eui.ScrollPolicy.ON;
            this.arrayCollection = new eui.ArrayCollection();
            this.joinClubList.itemRenderer = game.PCJoindClubItem;
            this.joinClubList.dataProvider = this.arrayCollection;
        };
        // ---------------------------------- 用户操作 ----------------------------------
        /** 显示俱乐部弹框*/
        PCJoinedClubUI.prototype.showJoinGroup = function (e) {
            if (e) {
                this.joinGroup.visible = true;
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.text = "";
                this.joinInput.addEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                game.LayerManager.getInstance().addUI(this.joinGroup, enums.LayerConst.LAYER_TOP);
            }
            else {
                this.joinGroup.visible = false;
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.removeEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                this.addChild(this.joinGroup);
            }
        };
        /** 输入邀请码响应事件 */
        PCJoinedClubUI.prototype.onJoinInput = function () {
            var txt = this.joinInput.text;
            if (this.checkNumIllegal(txt)) {
                this.joinInput.text = txt.slice(0, -1);
            }
            this.joinConfirmBtn.enabled = txt.length && txt.length > 0;
            this.joinConfirmBtn.setState = this.joinConfirmBtn.enabled ? 'up' : 'disabled';
        };
        /** 加入一个俱乐部 */
        PCJoinedClubUI.prototype.joinClub = function () {
            var _this = this;
            this.joinConfirmBtn.enabled = false;
            this.joinConfirmBtn.setState = 'disabled';
            var txt = this.joinInput.text;
            var exp = /\d{8}/;
            if (!exp.test(txt)) {
                var msg = "邀请码错误或已失效";
                this.showJoinError(msg);
            }
            else {
                game.ClubController.getInstance().joinClub(txt).then(function (obj) {
                    if (obj.locked) {
                        var tipData = new game.TipMsgInfo();
                        tipData.msg = [{ text: '抱歉您在"' + obj.name + '"的权限已被锁定 \n 请联系房主', textColor: enums.ColorConst.Golden }];
                        tipData.confirmText = "我知道了";
                        // tipData.comfirmCallBack = this.confirmBack;
                        // tipData.thisObj = this;
                        game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    }
                    else {
                        _this.onJoinSuccess(obj.id);
                    }
                }).catch(function (e) {
                    game.DebugUtil.debug(e + "加入俱乐部失败");
                    _this.onJoinFailed(txt, e);
                    //owner_join  加入自己的俱乐部
                    //repeat_join  加入已加入的俱乐部
                    //invitation_code_unavailable 邀请码不可用？不知道这个啥时候出来的
                });
            }
        };
        /** 输入其他字符*/
        PCJoinedClubUI.prototype.checkNumIllegal = function (str) {
            if (!str)
                return true;
            if (str == "")
                return true;
            str = str + "";
            for (var i = 0; i < str.length; i++) {
                if (this.numArr.indexOf(str.charAt(i)) < 0) {
                    return true;
                }
            }
            return false;
        };
        /** 显示加入俱乐部失败提示*/
        PCJoinedClubUI.prototype.showJoinError = function (msg) {
            var _this = this;
            this.joinTipMsg.text = "";
            this.joinTipMsg.text = msg;
            this.joinTipGroup.alpha = 1;
            this.joinTipGroup.visible = true;
            game.CTween.get(this.joinTipGroup).wait(2500).to({
                alpha: 0
            }, 500).call(function () {
                _this.joinTipGroup.visible = false;
                _this.joinTipGroup.alpha = 1;
                _this.joinTipMsg.text = "";
            }, this);
        };
        /** 加入俱乐部失败的回调
         * @param txt 加入俱乐部输入框输入的文本
         * @param e 加入失败的返回参数
        */
        PCJoinedClubUI.prototype.onJoinFailed = function (txt, e) {
            var msg = "邀请码错误或已失效";
            // switch (e)
            // {
            // 	case "owner_join":
            // 		msg = "此是您创建的俱乐部";
            // 		break;
            // 	case "repeat_join":
            // 		msg = "您已加入此俱乐部";
            // 		break;
            // 	case "invitation_code_unavailable":
            // 		msg = "邀请码错误或已失效";
            // 		break;
            // }
            if (e == "owner_join") {
                msg = "此俱乐部是您创建的";
            }
            else if (e == "invitation_code_unavailable") {
                msg = "邀请码错误或已失效";
            }
            else {
                var js = JSON.parse(e);
                if (js.message == "repeat_join")
                    msg = "您已加入此俱乐部";
            }
            this.showJoinError(msg);
        };
        /** 加入俱乐部成功回调*/
        PCJoinedClubUI.prototype.onJoinSuccess = function (clubID) {
            var _this = this;
            var joinedClubNum = (game.ClubModel.getInstance().getJoinedClubNum() + 1) || 1;
            game.ClubController.getInstance().getClubList(game.ClubModel.ClubType_Joined, joinedClubNum).then(function () {
                var clubInfo = game.ClubModel.getInstance().getJoinedClubById(+clubID);
                if (clubID) {
                    _this.showJoinGroup(null);
                    var creatorName = clubInfo.creator_name;
                    var clubName = clubInfo.name;
                    var tipData = new game.TipMsgInfo();
                    tipData.msg = [
                        { text: "您已加入由", textColor: enums.ColorConst.Golden },
                        { text: creatorName, textColor: enums.ColorConst.LightGray },
                        { text: "创建的", textColor: enums.ColorConst.Golden },
                        { text: clubName, textColor: enums.ColorConst.LightGray }
                    ];
                    tipData.confirmText = "我知道了";
                    tipData.comfirmCallBack = function () {
                        game.CommonLoadingUI.getInstance().start();
                        game.GlobalConfig.setClubId(clubID)
                            .then(function () {
                            game.CommonLoadingUI.getInstance().stop();
                            //是否进行过新手引导
                            var guidedUser = localStorage.getItem("guidedUser");
                            var name = game.LoginController.getInstance().sendingName;
                            var guided = false;
                            if (!guidedUser)
                                guidedUser = "";
                            if (guidedUser.length > 0) {
                                var arr = guidedUser.split(":");
                                if (arr.indexOf(name) > -1) {
                                    guided = true;
                                }
                            }
                            if (!guided) {
                                var value = guidedUser;
                                if (guidedUser.length > 0)
                                    value += ":" + name;
                                else
                                    value += name;
                                localStorage.setItem("guidedUser", value);
                                game.CommonLoadingUI.getInstance().start();
                                game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratMediator, null);
                                game.MediatorManager.openMediator(game.Mediators.Mediator_BaccaratGuide);
                            }
                            else {
                                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn, "createBtn");
                                game.MediatorManager.openMediator(game.Mediators.Mediator_LeftBar, false);
                                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_PCNavChangeBtn);
                                game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedRoomList);
                            }
                        }).catch(function (e) {
                            game.CommonLoadingUI.getInstance().stop();
                            game.DebugUtil.debug(e.message + "订阅俱乐部失败");
                        });
                    };
                    tipData.thisObj = _this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                }
                else {
                    game.DebugUtil.debug("获取俱乐部信息失败");
                }
            }).catch(function (e) {
                game.DebugUtil.debug(e + "加入俱乐部失败");
                var msg = "邀请码错误或已失效";
                _this.showJoinError(msg);
            });
        };
        // ---------------------------------- 刷新 ----------------------------------
        /** 刷新列表*/
        PCJoinedClubUI.prototype.updateList = function (listData) {
            if (!listData)
                listData = [];
            this.arrayCollection.source = listData;
            this.arrayCollection.refresh();
            var num = listData.length || 0;
            this.isShowTipGroup(listData.length <= 0);
        };
        /** 是否显示没有俱乐部提示*/
        PCJoinedClubUI.prototype.isShowTipGroup = function (b) {
            this.tipGroup.visible = b;
        };
        /** 刷新总俱乐部数*/
        PCJoinedClubUI.prototype.updateClubNum = function (num) {
            if (parseInt(num) >= 10) {
                this.joinedNum.width = 80;
                this.joinedNum.right = 40;
            }
            this.joinedNum.text = num || 0 + "";
        };
        /** 按钮圈旋转*/
        PCJoinedClubUI.prototype.showCirclerun = function () {
            this.btnCircle.rotation = 0;
            game.CTween.get(this.btnCircle, { loop: true }).to({ rotation: -360 }, 4000);
        };
        // ---------------------------------- dispose ----------------------------------
        PCJoinedClubUI.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            this.showJoinGroup(null);
            game.CTween.removeTweens(this.btnCircle);
            _super.prototype.dispose.call(this);
        };
        return PCJoinedClubUI;
    }(game.BaseUI));
    game.PCJoinedClubUI = PCJoinedClubUI;
    __reflect(PCJoinedClubUI.prototype, "game.PCJoinedClubUI");
})(game || (game = {}));
//# sourceMappingURL=PCJoinedClubUI.js.map