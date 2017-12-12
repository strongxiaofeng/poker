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
    var ClubHomeBaseUI = (function (_super) {
        __extends(ClubHomeBaseUI, _super);
        function ClubHomeBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "club/clubSkin.exml";
            _this.listLoader = game.ListLoader.getInstance();
            return _this;
        }
        /** 初始化设置*/
        ClubHomeBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initList();
            this.ClubList.useVirtualLayout = false; //取消egret大数据优化
            this.guidGroup1.visible = false;
            this.guidGroup.visible = false;
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 接收Mediator通知*/
        ClubHomeBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case ClubHomeCommand.initListener:
                    this.initListener(params);
                    break;
                case ClubHomeCommand.updateNickName:
                    this.updateNickName(params);
                    break;
                case ClubHomeCommand.updateRoomCard:
                    this.updateRoomcard(params);
                    break;
                case ClubHomeCommand.updateList:
                    this.updateList(params);
                    break;
                case ClubHomeCommand.updateUserInfo:
                    this.updateFace(params);
                    break;
                // case ClubHomeCommand.setLoading:
                // 	// if(params.length == 1) this.setLoading(params[0]);
                // 	// if(params.length == 3) this.setLoading(params[0], params[1], params[2]);
                //     break;
                // case ClubHomeCommand.showNullTip:
                //     // this.setLoading(true, true, 3);
                // 	// this.isShowTipLoading = true;
                //     break;
                case ClubHomeCommand.hidenListLoading:
                    this.listLoader.setLoadComplete();
                    break;
                case ClubHomeCommand.setAllLoaded:
                    this.listLoader.setAllLoaded();
                    break;
                case ClubHomeCommand.showTip:
                    this.guidGroup1.visible = true;
                    this.guidGroup.visible = true;
                    break;
            }
        };
        /** 注册事件*/
        ClubHomeBaseUI.prototype.initListener = function (mediator) {
            // this.registerEvent(this.ClubScroller, egret.Event.CHANGE, (e:egret.TouchEvent)=>{
            // 	this.pullList(mediator, e);
            // }, this);
            this.listLoader.setList(this.ClubScroller, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
        };
        // ---------------------------------- 更新UI ----------------------------------
        /**更新头像*/
        ClubHomeBaseUI.prototype.updateFace = function (face) {
            this.HomeOwnerFace.mask = this.userFaceMask;
            if (face) {
                this.HomeOwnerFace.source = face;
            }
        };
        /** 显示昵称*/
        ClubHomeBaseUI.prototype.updateNickName = function (nick) {
            this.Homeowner.text = nick || "";
        };
        /** 更新房卡 */
        ClubHomeBaseUI.prototype.updateRoomcard = function (card) {
            var str = game.LanguageUtil.translate("global_lbl_room_card");
            var num = game.NumberUtil.getSplitNumStr(card * 100 || 0);
            this.RoomCard.text = "" + str + num;
            this.RoomCardicon.right = 135 + this.RoomCard.textWidth || 0;
        };
        /**初始化list */
        ClubHomeBaseUI.prototype.initList = function () {
            this.ListData = new eui.ArrayCollection();
            this.ClubList.dataProvider = this.ListData;
            this.ClubList.itemRenderer = game.ClubHomeItem;
            this.ClubScroller.viewport = this.ClubList;
        };
        /**
         * 设置滚动条
         * num 是距离底部的距离
        */
        ClubHomeBaseUI.prototype.changeScrollV = function (num) {
            this.ClubScroller.viewport.scrollV = this.ClubList.contentHeight - this.ClubList.height + num;
        };
        // ---------------------------------- 测试数据 ----------------------------------
        /**更新list数据*/
        ClubHomeBaseUI.prototype.updateList = function (arr) {
            if (arr.length > 0) {
                this.ListData.source = arr;
                this.ListData.refresh();
                this.ClubList.validateNow();
                this.guidGroup.visible = false;
                this.guidGroup1.visible = false;
            }
            else {
                this.guidGroup.visible = true;
                this.guidGroup1.visible = true;
            }
        };
        ClubHomeBaseUI.prototype.setTimeOut = function (name, time, data, callback, thisobj) {
            if (this.timeoutObj[name]) {
                clearTimeout(this.timeoutObj[name]);
            }
            this.timeoutObj[name] = setTimeout(function () {
                callback.call(thisobj, data);
            }, time);
        };
        ClubHomeBaseUI.prototype.dispose = function () {
            this.ListData.source = [];
            this.ClubList.dataProvider = this.ListData;
            this.ListData.refresh();
            this.ClubList.validateNow();
            this.listLoader.dispose();
            this.listLoader = null;
            _super.prototype.dispose.call(this);
        };
        return ClubHomeBaseUI;
    }(game.BaseUI));
    game.ClubHomeBaseUI = ClubHomeBaseUI;
    __reflect(ClubHomeBaseUI.prototype, "game.ClubHomeBaseUI");
})(game || (game = {}));
//# sourceMappingURL=ClubHomeBaseUI.js.map