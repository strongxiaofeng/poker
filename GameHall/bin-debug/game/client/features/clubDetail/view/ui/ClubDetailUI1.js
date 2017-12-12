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
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    var ClubDetailUI1 = (function (_super) {
        __extends(ClubDetailUI1, _super);
        function ClubDetailUI1() {
            var _this = _super.call(this) || this;
            /**房间类型
             * 0全部/1普通/2私有
            */
            _this.roomType = 0;
            _this.pwdRoomID = '';
            _this.commonArr = [];
            _this.privateArr = [];
            _this.allArr = [];
            _this._pageIndex = 1;
            _this.listLoader = game.ListLoader.getInstance();
            _this.skinName = "resource/skins/game_skins/mobile/clubDetail/clubDetail.exml";
            return _this;
        }
        ClubDetailUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.gameIDList.itemRenderer = game.ClubDetailItemUI1;
            this.gameIDList.useVirtualLayout = false;
            this.gameIDList.dataProvider = this.deskData;
            this.hidePwd();
            this["chipImg"].right = this.userBalance.width + 30;
            // this.myScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            // this.txtPwd.visible = true;
            // this.myScroller.throwSpeed = 0;
            this.isHaveRoom(game.ClubModel.getInstance().getTheClubRooms());
            this.initListener(true);
            this.allRoom.setState = "down";
            this.commonRoom.setState = "up";
            this.privateRoom.setState = "up";
            this.roomType = 0;
            this._pageIndex = 1;
        };
        ClubDetailUI1.prototype.initListener = function (b) {
            if (b) {
                this.registerEvent(this.joinInput, egret.TouchEvent.FOCUS_OUT, this.onFocus, this);
                this.registerEvent(this.joinInput, egret.TouchEvent.CHANGE, this.onFocus, this);
                this.registerEvent(this.allRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
                this.registerEvent(this.commonRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
                this.registerEvent(this.privateRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            }
            else {
                this.removeAllEvent();
            }
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        ClubDetailUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                // 初始化监听
                case ClubDetailUICommands.ClubDetailNotify_initListener:
                    this.registerEvent(this.joinConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
                    this.registerEvent(this.joinCancelBtn, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
                    this.listLoader.setList(this.myScroller, this.pullDownRefreshList, this, this.pullUpRefreshList);
                    break;
                // 玩家昵称
                case ClubDetailUICommands.ClubDetailNotify_userName:
                    this.userName.text = params;
                    break;
                // 余额
                case ClubDetailUICommands.ClubDetailNotify_userBalance:
                    this.userBalance.text = game.NumberUtil.getSplitNumStr(params);
                    this["chipImg"].right = this.userBalance.width + 30;
                    break;
                //房卡数量
                case ClubDetailUICommands.ClubDetailNotify_HomeCardNum:
                    if (!params)
                        return;
                    this["roomCardTxt"].text = "\u623F\u5361\uFF1A" + game.NumberUtil.getSplitNumStr(params * 100);
                    this["roomCardImg"].right = this["roomCardTxt"].width + 130;
                    break;
                // 是否显示广告
                case ClubDetailUICommands.ClubDetailNotify_isRoasting:
                    break;
                // 更新俱乐部名列表
                case ClubDetailUICommands.ClubDetailNotify_clubRoomArr:
                    this.updataList();
                    break;
                // setting数据发生改变（限额，房间名，是否有密码等）
                case ClubDetailUICommands.ClubDetailNotify_setting:
                    this.updataItemFuc(params, "initData");
                    break;
                case ClubDetailUICommands.ClubDetailNotify_isMy:
                    this.isMy(params);
                    break;
                case ClubDetailUICommands.ClubDetailNotify_showPwd:
                    this.showPwd(params);
                    break;
                case ClubDetailUICommands.ClubDetailNotify_roadMap:
                    this.runItemFuc(params, 'updataRoadData');
                    break;
                case ClubDetailUICommands.ClubDetailNotify_showRedMsg:
                    this.showRedMsg(params);
                    break;
                case ClubDetailUICommands.ClubDetailNotify_noRoomCard:
                    var tipData = new game.TipMsgInfo();
                    tipData.msg = [{ text: game.LanguageUtil.translate(params), textColor: enums.ColorConst.Golden }];
                    tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
                    tipData.comfirmCallBack = this.confirmBack;
                    tipData.thisObj = this;
                    game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
                    break;
            }
        };
        ClubDetailUI1.prototype.confirmBack = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_TipMsg.name);
        };
        /** 点击事件 */
        ClubDetailUI1.prototype.handleTap = function (event) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            switch (event.target) {
                case this.allRoom:
                    this.allRoom.setState = "down";
                    this.commonRoom.setState = "up";
                    this.privateRoom.setState = "up";
                    this.roomType = 0;
                    break;
                case this.commonRoom:
                    this.allRoom.setState = "up";
                    this.commonRoom.setState = "down";
                    this.privateRoom.setState = "up";
                    this.roomType = 1;
                    break;
                case this.privateRoom:
                    this.allRoom.setState = "up";
                    this.commonRoom.setState = "up";
                    this.privateRoom.setState = "down";
                    this.roomType = 2;
                    break;
            }
            this.pageIndex = 1;
            this.updataList();
        };
        ClubDetailUI1.prototype.isMy = function (b) {
            this["roomCardGroup"].visible = false;
            this["balanceGroup"].visible = false;
            if (b) {
                this["roomCardGroup"].visible = true;
            }
            else {
                this["balanceGroup"].visible = true;
            }
        };
        // 点击响应时间
        ClubDetailUI1.prototype.onTouchBtn = function (evt) {
            switch (evt.target) {
                case this.joinConfirmBtn:
                    this.reqEnterPwd();
                    break;
                case this.joinCancelBtn:
                    this.hidePwd();
                    this.pwdRoomID = '';
                    break;
            }
        };
        // 移出事件
        ClubDetailUI1.prototype.onFocus = function (evt) {
            var txt = this.joinInput.text;
            if (!txt || txt == '' || txt.length != 6) {
                this.joinConfirmBtn.setState = 'disabled';
                this.joinConfirmBtn.enabled = false;
            }
            else {
                this.joinConfirmBtn.setState = 'up';
                this.joinConfirmBtn.enabled = true;
            }
        };
        /** 发送进入密码房间请求 */
        ClubDetailUI1.prototype.reqEnterPwd = function () {
            var txt = this.joinInput.text;
            var exp = /\d{6}/;
            if (!txt || txt == '' || txt.length != 6 || !exp.test(txt)) {
                this.showRedMsg('房间密码错误');
            }
            else {
                game.ClubController.getInstance().sendNotification(game.NotifyConst.Notify_Baccarat_EnterPwd, [this.pwdRoomID, txt]);
            }
        };
        /** 弹出（红、绿）提示框 */
        ClubDetailUI1.prototype.showRedMsg = function (msg) {
            var group = this["redMsgGroup"];
            this["redMsgTxt"].text = msg;
            game.CTween.removeTweens(group);
            group.alpha = 1;
            group.visible = true;
            // CTween.get(group).wait(1000).to({ alpha: 0 }, 2000).call(() =>
            // {
            //     group.visible = false;
            // })
            game.CTweenManagerController.getInstance().startCTween(2, [group]);
        };
        /** 显示密码框 */
        ClubDetailUI1.prototype.showPwd = function (roomID) {
            // this.txtPwd.visible = true;
            game.CTweenManagerController.getInstance().startCTween(1, [this.txtPwd, this.pwGroup]);
            game.LayerManager.getInstance().addUI(this.txtPwd, enums.LayerConst.LAYER_TOP);
            this.joinInput.text = '';
            this.pwdRoomID = roomID;
        };
        ClubDetailUI1.prototype.hidePwd = function () {
            this.addChild(this.txtPwd);
            // this.txtPwd.visible = false;
            game.CTweenManagerController.getInstance().startCTween(1, [this.txtPwd, this.pwGroup], false);
        };
        /** 执行某个item的方法 */
        ClubDetailUI1.prototype.runItemFuc = function (roomID, fucName, params) {
            if (params === void 0) { params = null; }
            if (this.gameIDList) {
                for (var i = 0; i < this.gameIDList.dataProvider.length; i++)
                    if (this.gameIDList.getElementAt(i)) {
                        if (this.gameIDList.getElementAt(i)["data"] == roomID) {
                            this.gameIDList.getElementAt(i)[fucName](params);
                        }
                    }
            }
        };
        /** 通过souresID执行所有使用这个souresID（同一个视频源）的方法 */
        ClubDetailUI1.prototype.updataItemFuc = function (souresID, fucName, params) {
            if (params === void 0) { params = null; }
            var arr = game.ClubModel.getInstance().getTheClubRooms();
            if (arr && arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    var newSouresID = game.ClubModel.getInstance().roomIDTosouceID(arr[i]);
                    if (newSouresID == souresID) {
                        this.runItemFuc(arr[i], fucName, params);
                    }
                }
            }
        };
        // 当尺寸发生变化时
        ClubDetailUI1.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
            if (this.gameIDList) {
                for (var i = 0; i < this.gameIDList.dataProvider.length; i++)
                    if (this.gameIDList.getElementAt(i)) {
                        this.gameIDList.getElementAt(i)["setContenWH"](game.StageUtil.width);
                    }
            }
        };
        /** 刷新List数据 */
        ClubDetailUI1.prototype.updataList = function () {
            this.deskData = null;
            this.deskData = new eui.ArrayCollection();
            var pageNum = 10;
            var listData = game.ClubModel.getInstance().getTheClubRooms();
            var privateArrN = [];
            var commonArrN = [];
            if (listData && listData.length) {
                for (var i = 0; i < listData.length; i++) {
                    var locked = game.ClubModel.getInstance().getlockBool(listData[i]);
                    if (locked == true) {
                        privateArrN.push(listData[i]);
                    }
                    else {
                        commonArrN.push(listData[i]);
                    }
                }
            }
            //俱乐部的全部房间
            var arr = listData.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            //私人房
            var arrP = privateArrN.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            //普通房
            var arrC = commonArrN.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            var arrNum;
            switch (this.roomType) {
                case 0:
                    arrNum = listData.length;
                    if (arr.length >= 0) {
                        this.allArr = arr;
                        this.deskData.source = this.allArr;
                        this.deskData.refresh();
                    }
                    break;
                case 1:
                    arrNum = commonArrN.length;
                    if (arrC.length >= 0) {
                        this.commonArr = arrC;
                        this.deskData.source = this.commonArr;
                        this.deskData.refresh();
                    }
                    break;
                case 2:
                    arrNum = privateArrN.length;
                    if (arrP.length >= 0) {
                        this.privateArr = arrP;
                        this.deskData.source = this.privateArr;
                        this.deskData.refresh();
                    }
                    break;
            }
            if (this.pageIndex * pageNum >= arrNum) {
                this.listLoader.setAllLoaded();
            }
            else {
                this.listLoader.setLoadComplete();
            }
            this.gameIDList.dataProvider = this.deskData;
            this.gameIDList.validateNow();
            if (listData && listData.length) {
                this.label_HaveNothing.visible = false;
            }
            else {
                this.label_HaveNothing.visible = true;
            }
        };
        Object.defineProperty(ClubDetailUI1.prototype, "pageIndex", {
            get: function () {
                return this._pageIndex;
            },
            set: function (v) {
                this._pageIndex = v;
                if (this._pageIndex == 0) {
                    this._pageIndex = 1;
                }
                this.updataList();
            },
            enumerable: true,
            configurable: true
        });
        /** 上拉加载*/
        ClubDetailUI1.prototype.pullUpRefreshList = function () {
            this.pageIndex--;
        };
        /** 下拉加载*/
        ClubDetailUI1.prototype.pullDownRefreshList = function () {
            this.pageIndex++;
        };
        //是否有房间
        ClubDetailUI1.prototype.isHaveRoom = function (arr) {
            if (!arr || !arr.length || arr.length == 0) {
                this.label_HaveNothing.visible = true;
            }
            else {
                this.label_HaveNothing.visible = false;
            }
        };
        ClubDetailUI1.prototype.dispose = function () {
            this.hidePwd();
            this.deskData = null;
            this.gameIDList = null;
            this.listLoader.dispose();
            this.listLoader = null;
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
        };
        return ClubDetailUI1;
    }(game.ClubDetailBaseUI));
    game.ClubDetailUI1 = ClubDetailUI1;
    __reflect(ClubDetailUI1.prototype, "game.ClubDetailUI1");
})(game || (game = {}));
//# sourceMappingURL=ClubDetailUI1.js.map