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
    var PCNavbarUI1 = (function (_super) {
        __extends(PCNavbarUI1, _super);
        function PCNavbarUI1() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "navbar/navbarSkin.exml";
            return _this;
        }
        // ---------------------------------- 初始化 ----------------------------------
        /**组件创建完成初始化数据等操作 */
        PCNavbarUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.updateAll();
            this.setAvatarMask();
            this.initecode();
            this.updateBtnState("homeBtn");
            this.musicOnBtn.visible = true;
            this.musicOffBtn.visible = false;
            this.videoOnBtn.visible = true;
            this.videoOffBtn.visible = false;
            this.coveredGroup.visible = false;
            this.showLogo();
        };
        PCNavbarUI1.prototype.showLogo = function () {
            var _this = this;
            if (!game.GlobalConfig.poweredby_icon) {
                this.logo.source = "login_pic_uee_pc_png";
            }
            else {
                game.DebugUtil.debug("top条请求logo " + game.GlobalConfig.defaultUrl + game.GlobalConfig.poweredby_icon);
                com.LoadManager.getInstance().getResByUrl(game.GlobalConfig.defaultUrl + game.GlobalConfig.poweredby_icon, function (t) {
                    if (t) {
                        _this.logo.source = t;
                        // let w = t.textureWidth ,h = t.textureHeight;
                        // this.logo.height = h*(75/w);
                    }
                    else {
                        _this.logo.source = "login_pic_uee_pc_png";
                    }
                }, this, com.ResourceItem.TYPE_IMAGE);
            }
        };
        /** 初始化变量*/
        PCNavbarUI1.prototype.initecode = function () {
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        PCNavbarUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PCNavbarCommands.initListener:
                    this.initListener(params);
                    break;
                case PCNavbarCommands.updateInfo:
                    this.updateAll();
                    break;
                case PCNavbarCommands.changeBtn:
                    this.updateBtnState(params);
                    break;
                case PCNavbarCommands.changeIcon:
                    this.changeIcon(params);
                    break;
                case PCNavbarCommands.changeBalance:
                    this.changeBalance(params);
                    break;
                case PCNavbarCommands.showMainGroup:
                    this.showMainGroup(params);
                    break;
                case PCNavbarCommands.mineMoney:
                    this.refreshChip(params);
                    break;
                case PCNavbarCommands.showNewMsg:
                    this.redPoint.visible = params;
                    break;
                case PCNavbarCommands.showRoomCard:
                    this.updateRoomCard(game.ClubModel.getInstance().getRoomCardNum());
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        PCNavbarUI1.prototype.initListener = function (mediator) {
            var _this = this;
            this.registerEvent(this.homeBtn, egret.TouchEvent.TOUCH_TAP, this.touchHome, this);
            this.registerEvent(this.joinBtn, egret.TouchEvent.TOUCH_TAP, this.touchJoin, this);
            this.registerEvent(this.createBtn, egret.TouchEvent.TOUCH_TAP, this.touchCreate, this);
            this.registerEvent(this.userGroup, egret.TouchEvent.TOUCH_TAP, this.openMineInfo, this);
            this.registerEvent(this.musicOnBtn, egret.TouchEvent.TOUCH_TAP, this.isOpenMusic, this);
            this.registerEvent(this.musicOffBtn, egret.TouchEvent.TOUCH_TAP, this.isOpenMusic, this);
            this.registerEvent(this.videoOnBtn, egret.TouchEvent.TOUCH_TAP, this.isOpenVoice, this);
            this.registerEvent(this.videoOffBtn, egret.TouchEvent.TOUCH_TAP, this.isOpenVoice, this);
            this.registerEvent(this.multilingualBtn, egret.TouchEvent.TOUCH_TAP, this.multilingual, this);
            this.registerEvent(this.chatBtn, egret.TouchEvent.TOUCH_TAP, this.openChat, this);
            this.registerEvent(this.musicOnBtn, mouse.MouseEvent.MOUSE_OVER, function () { _this.showCoveredGroup(196); }, this);
            this.registerEvent(this.musicOnBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup, this);
            this.registerEvent(this.musicOffBtn, mouse.MouseEvent.MOUSE_OVER, function () { _this.showCoveredGroup(196); }, this);
            this.registerEvent(this.musicOffBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup, this);
            this.registerEvent(this.videoOnBtn, mouse.MouseEvent.MOUSE_OVER, function () { _this.showCoveredGroup(134); }, this);
            this.registerEvent(this.videoOnBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup, this);
            this.registerEvent(this.videoOffBtn, mouse.MouseEvent.MOUSE_OVER, function () { _this.showCoveredGroup(134); }, this);
            this.registerEvent(this.videoOffBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup, this);
            this.registerEvent(this.multilingualBtn, mouse.MouseEvent.MOUSE_OVER, function () { _this.showCoveredGroup(75); }, this);
            this.registerEvent(this.multilingualBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup, this);
            this.registerEvent(this.chatBtn, mouse.MouseEvent.MOUSE_OVER, function () { _this.showCoveredGroup(14); }, this);
            this.registerEvent(this.chatBtn, mouse.MouseEvent.MOUSE_OUT, this.hidenCoveredGroup, this);
            //点击logo跳转
            this.registerEvent(this.logo, egret.TouchEvent.TOUCH_TAP, function () {
                window.open(game.GlobalConfig.poweredby_icon_url);
            }, this);
        };
        // ---------------------------------- 刷新 ----------------------------------
        /** 刷新个人信息*/
        PCNavbarUI1.prototype.updateAll = function () {
            var model = game.PersonalInfoModel.getInstance();
            this.updateUserFace(model.avatar);
            this.updateNickName(model.nick);
            this.updateRoomCard(game.ClubModel.getInstance().getRoomCardNum());
            this.updateChips(game.ClubModel.getInstance().getPayerBalance(model.user_id));
        };
        /** 刷新头像*/
        PCNavbarUI1.prototype.updateUserFace = function (texture) {
            if (texture)
                this.avatar.source = texture;
        };
        /** 头像遮罩*/
        PCNavbarUI1.prototype.setAvatarMask = function () {
            var w = this.avatar.width;
            var H = this.avatar.height;
            var mask = new egret.Shape();
            mask.graphics.beginFill(0xff0000);
            mask.graphics.drawCircle(0, 0, w / 2);
            mask.x = w / 2;
            mask.y = H / 2;
            this.userGroup.addChild(mask);
            this.avatar.mask = mask;
        };
        /** 刷新昵称*/
        PCNavbarUI1.prototype.updateNickName = function (nick) {
            this.userName.text = nick;
        };
        /** 刷新房卡*/
        PCNavbarUI1.prototype.updateRoomCard = function (card) {
            if (this.cardIcon.visible)
                this.roomCard.text = game.NumberUtil.getSplitNumStr(card * 100 || 0);
            // this.cardIcon.x = 312 - this.roomCard.textWidth - 10;
            this.add.x = 260 + this.roomCard.textWidth;
            if (this.add.x >= 380)
                this.add.x = 380;
        };
        /** 刷新筹码*/
        PCNavbarUI1.prototype.updateChips = function (chips) {
            if (this.chipIcon.visible)
                this.roomCard.text = game.NumberUtil.getSplitNumStr(chips);
            // this.chipIcon.x = 317 - this.roomCard.textWidth - 10;
            // if(this.chipIcon.x <= 211) this.chipIcon.x = 211;
        };
        /** 主按钮状态切换
         * @param 字符串 homeBtn 切换成主页按钮选中状态
         * @param 字符串 joinBtn 切换成加入的按钮选中状态
         * @param 字符串 createBtn 切换成创建的按钮选中状态
         * @param 不传参默认为所有按钮都未选中状态，房间列表需要
        */
        PCNavbarUI1.prototype.updateBtnState = function (str) {
            switch (str) {
                case "homeBtn":
                    this.homeBtn.setState = "down";
                    this.joinBtn.setState = "up";
                    this.createBtn.setState = "up";
                    break;
                case "joinBtn":
                    this.homeBtn.setState = "up";
                    this.joinBtn.setState = "down";
                    this.createBtn.setState = "up";
                    break;
                case "createBtn":
                    this.homeBtn.setState = "up";
                    this.joinBtn.setState = "up";
                    this.createBtn.setState = "down";
                    break;
                default:
                    this.homeBtn.setState = "up";
                    this.joinBtn.setState = "up";
                    this.createBtn.setState = "up";
                    break;
            }
        };
        /** 切换图标
         * @param chip 显示 筹码图标和筹码
         * @param card 显示 房卡图标和房卡
        */
        PCNavbarUI1.prototype.changeIcon = function (type) {
            var model = game.PersonalInfoModel.getInstance();
            switch (type) {
                case "chip":
                    this.chipIcon.visible = true;
                    this.cardIcon.visible = false;
                    this.add.visible = false;
                    this.updateChips(game.ClubModel.getInstance().getPayerBalance(model.user_id));
                    break;
                case "card":
                    this.chipIcon.visible = false;
                    this.cardIcon.visible = true;
                    this.add.visible = true;
                    this.updateRoomCard(game.ClubModel.getInstance().getRoomCardNum());
                    // if(GlobalConfig.clubId && PersonalInfoModel.getInstance().user_id)
                    // {
                    // 	ClubController.getInstance().unsubscribeAccount(GlobalConfig.clubId, PersonalInfoModel.getInstance().user_id);
                    // }
                    break;
            }
        };
        /** 刷筹码*/
        PCNavbarUI1.prototype.changeBalance = function (balance) {
            var model = game.PersonalInfoModel.getInstance();
            this.updateChips(game.ClubModel.getInstance().getPayerBalance(model.user_id));
        };
        /** 刷新筹码*/
        PCNavbarUI1.prototype.refreshChip = function (params) {
            this.roomCard.text = game.NumberUtil.getSplitNumStr(params);
        };
        /** 显示或隐藏导航栏
         * b   显示或隐藏
        */
        PCNavbarUI1.prototype.showMainGroup = function (b) {
            this.mainGroup.visible = b;
        };
        /** 设置显示覆盖group*/
        PCNavbarUI1.prototype.showCoveredGroup = function (right) {
            switch (right) {
                case 196:
                    this.coveredLabel.text = "音乐";
                    break;
                case 134:
                    this.coveredLabel.text = "音效";
                    break;
                case 75:
                    this.coveredLabel.text = "语言";
                    break;
                case 14:
                    this.coveredLabel.text = "消息";
                    break;
            }
            this.coveredGroup.right = right;
            this.coveredGroup.visible = true;
        };
        /** 隐藏覆盖group*/
        PCNavbarUI1.prototype.hidenCoveredGroup = function () {
            this.coveredGroup.visible = false;
        };
        // ---------------------------------- 用户操作 ----------------------------------
        /** 点击主页按钮*/
        PCNavbarUI1.prototype.touchHome = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.updateBtnState("homeBtn");
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_Home.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_Home);
            }
        };
        /** 点击加入的按钮*/
        PCNavbarUI1.prototype.touchJoin = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.updateBtnState("joinBtn");
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_PCJoinedClub.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCJoinedClub);
            }
        };
        /** 点击创建的按钮*/
        PCNavbarUI1.prototype.touchCreate = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.updateBtnState("createBtn");
            if (!game.MediatorManager.isMediatorOpen(game.Mediators.Mediator_PCCreatedClub.name)) {
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedClub);
            }
        };
        /**打开PC个人中心*/
        PCNavbarUI1.prototype.openMineInfo = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            game.MediatorManager.openMediator(game.Mediators.Mediator_PCMineMediator, game.PCMineMediator.Type_User);
        };
        /** 开启背景音乐*/
        PCNavbarUI1.prototype.isOpenMusic = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var b = this.musicOnBtn.visible ? false : true;
            this.musicOnBtn.visible = b;
            this.musicOffBtn.visible = !b;
            game.SoundPlayerNew.setMusicOpen(b);
            // MediatorManager.openMediator(Mediators.Mediator_VideoLoading);
        };
        /** 开启语音*/
        PCNavbarUI1.prototype.isOpenVoice = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            var b = this.videoOnBtn.visible ? false : true;
            this.videoOnBtn.visible = b;
            this.videoOffBtn.visible = !b;
            game.SoundPlayerNew.setSoundOpen(b);
        };
        /** 打开多语言设置*/
        PCNavbarUI1.prototype.multilingual = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (game.GlobalConfig.isMobile) {
                game.Mediators.Mediator_MultiLanguage.layer = enums.LayerConst.LAYER_UI;
            }
            else {
                game.Mediators.Mediator_MultiLanguage.layer = enums.LayerConst.LAYER_TIP;
            }
            game.MediatorManager.openMediator(game.Mediators.Mediator_MultiLanguage);
        };
        /** 打开聊天*/
        PCNavbarUI1.prototype.openChat = function () {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            game.MediatorManager.openMediator(game.Mediators.Mediator_NotifyMediatorPC);
        };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        PCNavbarUI1.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PCNavbarUI1;
    }(game.BaseUI));
    game.PCNavbarUI1 = PCNavbarUI1;
    __reflect(PCNavbarUI1.prototype, "game.PCNavbarUI1");
})(game || (game = {}));
//# sourceMappingURL=PCNavbarUI1.js.map