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
    var MineBaseUI = (function (_super) {
        __extends(MineBaseUI, _super);
        function MineBaseUI() {
            return _super.call(this) || this;
        }
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        MineBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initShowData();
            this.showCirclePicture();
            this.haveRoomMaster();
            this.label_InfoNum.visible = false;
            this.label_InfoNum2.visible = false;
        };
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        MineBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case MineCommands.initListener:
                    this.initListener(params);
                    break;
                case MineCommands.updateMsgRead:
                    this.shwoUnRead();
                    break;
            }
        };
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        MineBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.btn_PersonalCenter, egret.TouchEvent.TOUCH_TAP, mediator.goPersonalCenterFun, mediator);
            this.registerEvent(this.btn_RoomMaster, egret.TouchEvent.TOUCH_TAP, mediator.HomeOwner, mediator);
            this.registerEvent(this.btn_InfoNotice, egret.TouchEvent.TOUCH_TAP, mediator.onNoticeInfo, mediator);
            this.registerEvent(this.btn_InfoNotice2, egret.TouchEvent.TOUCH_TAP, mediator.onNoticeInfo, mediator);
            this.registerEvent(this.btn_Setting, egret.TouchEvent.TOUCH_TAP, mediator.openSystem, mediator);
            this.registerEvent(this.btn_Setting2, egret.TouchEvent.TOUCH_TAP, mediator.openSystem, mediator);
        };
        /**
         * 当舞台尺寸发生变化
         */
        MineBaseUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
        };
        /**初始化数据*/
        MineBaseUI.prototype.initShowData = function () {
            this.label_NickName.text = game.PersonalInfoModel.getInstance().nick;
            this.label_Accountnum.text = game.PersonalInfoModel.getInstance().username;
            this.label_ID.text = game.PersonalInfoModel.getInstance().user_id;
            this.label_version.text = game.LanguageUtil.translate("mine_lbl_version_info") + ":" + "v1.0.0";
        };
        /*显示圆形头像*/
        MineBaseUI.prototype.showCirclePicture = function () {
            //判断头像是不是默认
            if (game.PersonalInfoModel.getInstance().avatar) {
                this.img_HeadPicture.source = game.PersonalInfoModel.getInstance().avatar;
            }
            //显示圆形剪切图片的方法
            var w = this.img_HeadPicture.width;
            var c = new egret.Shape();
            c.graphics.beginFill(0);
            c.graphics.drawCircle(0, 0, w / 2);
            c.x = w / 2 + 13;
            c.y = 100;
            this.group_Picture.addChild(c);
            this.img_HeadPicture.mask = c;
        };
        MineBaseUI.prototype.shwoUnRead = function () {
            var bool = game.NotifyModel.getInstance().unread_count > 0;
            // let model = ClubModel.getInstance();
            // let CreatNum = model.getCreatedClubNum();
            var CreatNum = 0;
            this.img_Info2.visible = false;
            this.img_Info.visible = false;
            if (CreatNum == 0) {
                this.img_Info2.visible = bool;
            }
            else if (CreatNum != 0) {
                this.img_Info.visible = bool;
            }
        };
        /**有无房主显示*/
        MineBaseUI.prototype.haveRoomMaster = function () {
            // let model = ClubModel.getInstance();
            // let CreatNum = model.getCreatedClubNum();
            var CreatNum = 0;
            if (CreatNum == 0) {
                this.img_last.visible = false;
                this.btn_RoomMaster.visible = false;
                this.btn_InfoNotice.visible = false;
                this.btn_Setting.visible = false;
                this.btn_InfoNotice2.visible = true;
                this.btn_Setting2.visible = true;
            }
            else if (CreatNum != 0) {
                this.img_last.visible = true;
                this.btn_RoomMaster.visible = true;
                this.btn_InfoNotice.visible = true;
                this.btn_Setting.visible = true;
                this.btn_InfoNotice2.visible = false;
                this.btn_Setting2.visible = false;
            }
            this.shwoUnRead();
        };
        return MineBaseUI;
    }(game.BaseUI));
    game.MineBaseUI = MineBaseUI;
    __reflect(MineBaseUI.prototype, "game.MineBaseUI");
})(game || (game = {}));
//# sourceMappingURL=MineBaseUI.js.map