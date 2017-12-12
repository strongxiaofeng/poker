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
    var HomeUI1 = (function (_super) {
        __extends(HomeUI1, _super);
        function HomeUI1() {
            return _super.call(this) || this;
            // this.skinName = SystemPath.skin_path + "home/homeSkin.exml";
        }
        /**组件创建完成初始化数据等操作 */
        HomeUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.tipLabel.visible = false;
            this.showCreateGroup(null);
            this.showJoinGroup(null);
            this.setAvatarMask();
            this.currentClub.visible = false;
            this.clubFace.horizontalCenter = 0;
            this.lockGroup.visible = false;
        };
        // ---------------------------------- 刷新 ----------------------------------
        /** 显示玩家头像 */
        HomeUI1.prototype.showAvatar = function () {
            if (game.PersonalInfoModel.getInstance().avatar) {
                this.avatar.source = game.PersonalInfoModel.getInstance().avatar;
            }
            this.avatar.left = 40;
        };
        /** 显示玩家昵称 */
        HomeUI1.prototype.showNickName = function (name) {
            this.nickName.text = name || "";
        };
        /** 设置房卡数量 */
        HomeUI1.prototype.setCardLabel = function (n) {
            var _this = this;
            if (n === void 0) { n = 0; }
            var str = game.LanguageUtil.translate("global_lbl_room_card");
            var num = game.NumberUtil.getSplitNumStr(n * 100);
            this.cardLabel.text = str + num;
            if (this.timeoutObj["setCardLabel"]) {
                clearTimeout(this.timeoutObj["setCardLabel"]);
            }
            this.timeoutObj["setCardLabel"] = setTimeout(function () {
                var w = _this.cardLabel.textWidth;
                _this.cardIcon.right = 60 + 60 + 15 + w || 0;
            }, 50);
        };
        /** 设置头像圆形遮罩 */
        HomeUI1.prototype.setAvatarMask = function () {
            //显示圆形剪切图片的方法
            var w = this.avatar.width;
            var mask = new egret.Shape();
            mask.graphics.beginFill(0xff0000);
            mask.graphics.drawCircle(0, 0, w / 2);
            mask.x = 40 + w / 2;
            mask.y = 70;
            this.infoGroup.addChild(mask);
            this.avatar.mask = mask;
        };
        /** 设置clubIcon */
        HomeUI1.prototype.setClubIcon = function (url) {
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
        /** 星型图标动画 */
        HomeUI1.prototype.shineImg = function (img, show) {
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
        /** 显示当前俱乐部信息 */
        HomeUI1.prototype.showClub = function (clubInfo) {
            _super.prototype.showClub.call(this, clubInfo);
            if (clubInfo && clubInfo.img) {
                this.setClubIcon(clubInfo.img);
            }
            this.myClubCard.text = Math.abs(clubInfo.room_card_used | 0) + "";
        };
        /** 显示joingroup */
        HomeUI1.prototype.showJoinGroup = function (evt) {
            var _this = this;
            if (evt) {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                // this.joinGroup.visible = true;
                // this.joinInputGroup.visible = true;
                game.CTweenManagerController.getInstance().startCTween(1, [this.joinGroup, this.joinInputGroup]);
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.text = "";
                this.joinInput.addEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                this.joinInput.addEventListener(egret.Event.FOCUS_OUT, this.outJoinInput, this);
                this.joinInput.addEventListener(egret.Event.FOCUS_IN, this.inJoinInput, this);
                game.LayerManager.getInstance().addUI(this.joinGroup, enums.LayerConst.LAYER_TOP);
            }
            else {
                // this.joinGroup.visible = false;
                // this.joinInputGroup.visible = false;
                game.CTweenManagerController.getInstance().startCTween(1, [this.joinGroup, this.joinInputGroup], false, function () {
                    _this.addChild(_this.joinGroup);
                }, this);
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.removeEventListener(egret.Event.CHANGE, this.onJoinInput, this);
            }
        };
        /** 输入邀请码响应事件 */
        HomeUI1.prototype.onJoinInput = function () {
            var txt = this.joinInput.text;
            this.joinConfirmBtn.enabled = txt.length && txt.length > 0;
            this.joinConfirmBtn.setState = this.joinConfirmBtn.enabled ? 'up' : 'disabled';
        };
        /** 输入邀请码失去焦点*/
        HomeUI1.prototype.outJoinInput = function () {
            // let reg = new RegExp(/\D/);
            // if(reg.test(this.joinInput.text))
            // {
            //     this.joinInput.textColor = 0xff0000;
            //     this.showJoinError("请输入俱乐部邀请码");
            // }
        };
        /** 邀请码输入获得焦点*/
        HomeUI1.prototype.inJoinInput = function () {
            // this.joinInput.textColor = 0xffffff;
        };
        /** 显示joinError */
        HomeUI1.prototype.showJoinError = function (param) {
            this.joinTipLabel.text = "";
            this.joinTipLabel.text = param;
            this.joinTipGroup.alpha = 1;
            this.joinTipGroup.visible = true;
            // CTween.get(this.joinTipGroup).wait(2500).to({
            //     alpha: 0
            // }, 500).call(() => {
            //     this.joinTipGroup.visible = false;
            //     this.joinTipGroup.alpha = 1;
            //     this.joinTipLabel.text = "";
            // }, this);
            game.CTweenManagerController.getInstance().startCTween(2, [this.joinTipGroup]);
        };
        /** 显示创建group */
        HomeUI1.prototype.showCreateGroup = function (evt) {
            var _this = this;
            if (evt) {
                game.SoundPlayerNew.playEffect(game.SoundConst.click);
                // this.createGroup.visible = true;
                // this.createInputGroup.visible = true;
                game.CTweenManagerController.getInstance().startCTween(1, [this.createGroup, this.createInputGroup]);
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.text = "";
                this.createInput.addEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect();
                game.LayerManager.getInstance().addUI(this.createGroup, enums.LayerConst.LAYER_TOP);
            }
            else {
                // this.createGroup.visible = false;
                // this.createInputGroup.visible = false;
                game.CTweenManagerController.getInstance().startCTween(1, [this.createGroup, this.createInputGroup], false, function () {
                    _this.addChild(_this.createGroup);
                }, this);
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.removeEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect(false);
            }
        };
        /** 输入俱乐部名称响应事件 */
        HomeUI1.prototype.onCreateInput = function () {
            var txt = this.createInput.text;
            this.createConfirmBtn.enabled = txt.length && txt.length > 0;
            this.createConfirmBtn.setState = this.createConfirmBtn.enabled ? 'up' : 'disabled';
        };
        /** 显示create错误 */
        HomeUI1.prototype.showCreateError = function (params) {
            this.createErrorMsg.text = game.LanguageUtil.translate(params);
            this.createTipGroup.alpha = 1;
            this.createTipGroup.visible = true;
            // CTween.get(this.createTipGroup).wait(1500).to({
            //     alpha: 0
            // }, 1500).call(() => {
            //     this.createTipGroup.visible = false;
            //     this.createTipGroup.alpha = 1;
            //     this.createErrorMsg.text = "";
            // }, this);
            game.CTweenManagerController.getInstance().startCTween(2, [this.createTipGroup]);
        };
        /** 显示创建俱乐部动画效果 */
        HomeUI1.prototype.showCreateEffect = function (show) {
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
        // ---------------------------------- dispose ----------------------------------
        HomeUI1.prototype.dispose = function () {
            game.CTweenManagerController.getInstance().endAllCTween();
            _super.prototype.dispose.call(this);
            game.CTweenManagerController.getInstance().endAllCTween();
        };
        return HomeUI1;
    }(game.HomeBaseUI));
    game.HomeUI1 = HomeUI1;
    __reflect(HomeUI1.prototype, "game.HomeUI1");
})(game || (game = {}));
//# sourceMappingURL=HomeUI1.js.map