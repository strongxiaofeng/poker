module game {

    export class HomeUI1 extends HomeBaseUI {

        public constructor() {
            super();
            // this.skinName = SystemPath.skin_path + "home/homeSkin.exml";
        }
        private joinGroupBgd:eui.Image;
        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.tipLabel.visible = false;

            this.showCreateGroup(null);
            this.showJoinGroup(null);
            this.setAvatarMask();
            this.currentClub.visible = false;
            this.clubFace.horizontalCenter = 0;
            this.lockGroup.visible = false;
        }

        // ---------------------------------- 刷新 ----------------------------------

        /** 显示玩家头像 */
        protected showAvatar(): void {
            if (PersonalInfoModel.getInstance().avatar) {
                this.avatar.source = PersonalInfoModel.getInstance().avatar;
            }
            this.avatar.left = 40;
        }

        /** 显示玩家昵称 */
        protected showNickName(name: string): void {
            this.nickName.text = name || "";
        }

        /** 设置房卡数量 */
        protected setCardLabel(n: number = 0): void {
            let str = LanguageUtil.translate("global_lbl_room_card");
            let num = NumberUtil.getSplitNumStr(n * 100);
            this.cardLabel.text = str + num;
            if (this.timeoutObj["setCardLabel"]) {
                clearTimeout(this.timeoutObj["setCardLabel"]);
            }
            this.timeoutObj["setCardLabel"] = setTimeout(() => {
                let w = this.cardLabel.textWidth;
                this.cardIcon.right = 60 + 60 + 15 + w || 0;
            }, 50);
        }

        /** 设置头像圆形遮罩 */
        protected setAvatarMask(): void {
            //显示圆形剪切图片的方法
            let w = this.avatar.width;
            let mask: egret.Shape = new egret.Shape();
            mask.graphics.beginFill(0xff0000);
            mask.graphics.drawCircle(0, 0, w / 2);
            mask.x = 40 + w / 2;
            mask.y = 70;
            this.infoGroup.addChild(mask);
            this.avatar.mask = mask;
        }

        /** 设置clubIcon */
        protected setClubIcon(url: string): void {
            let ip = GlobalConfig.defaultIP
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            let fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, (data) => {
                this.clubIcon.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        }

        /** 星型图标动画 */
        protected shineImg(img: eui.Image, show: boolean = true): void {
            if (show) {
                let w = this.shineGroup.width;
                let h = this.shineGroup.height;
                img.scaleX = img.scaleY = Math.random() * 1 + 0.5;
                img.rotation = Math.random() * 360 - 180;
                img.x = Math.random() * w;
                img.y = h - Math.random() * Math.sin(img.x * Math.PI / w) * h;
                img.alpha = 0;
                CTween.removeTweens(img);
                CTween.get(img)
                    .wait(Math.random() * 800)
                    .to({ alpha: 1 }, 600)
                    .to({ alpha: 0 }, 400)
                    .call(() => {
                        this.shineImg(img);
                    }, this);
            } else {
                CTween.removeTweens(img);
            }
        }

        /** 显示当前俱乐部信息 */
        protected showClub(clubInfo: ClubListInfo): void {
            super.showClub(clubInfo);
            if (clubInfo && clubInfo.img) {
                this.setClubIcon(clubInfo.img);
            }
            this.myClubCard.text = Math.abs(clubInfo.room_card_used | 0) + "";
        }

        /** 显示joingroup */
        protected showJoinGroup(evt?: egret.TouchEvent): void {
            if (evt) {
			    SoundPlayerNew.playEffect(SoundConst.click);
                // this.joinGroup.visible = true;
                // this.joinInputGroup.visible = true;
                CTweenManagerController.getInstance().startCTween(1,[this.joinGroup,this.joinInputGroup]);
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.text = "";
                this.joinInput.addEventListener(egret.Event.CHANGE, this.onJoinInput, this);
                this.joinInput.addEventListener(egret.Event.FOCUS_OUT, this.outJoinInput, this);
                this.joinInput.addEventListener(egret.Event.FOCUS_IN, this.inJoinInput, this);
                LayerManager.getInstance().addUI(this.joinGroup, enums.LayerConst.LAYER_TOP);
            } else {
                // this.joinGroup.visible = false;
                // this.joinInputGroup.visible = false;
                CTweenManagerController.getInstance().startCTween(1,[this.joinGroup,this.joinInputGroup],false,()=>{
                    this.addChild(this.joinGroup);
                },this);
                this.joinTipGroup.visible = false;
                this.joinConfirmBtn.enabled = false;
                this.joinConfirmBtn.setState = 'disabled';
                this.joinInput.removeEventListener(egret.Event.CHANGE, this.onJoinInput, this);
            }
        }

        /** 输入邀请码响应事件 */
        protected onJoinInput(): void {
            let txt = this.joinInput.text;
            this.joinConfirmBtn.enabled = txt.length && txt.length > 0;
            this.joinConfirmBtn.setState = this.joinConfirmBtn.enabled?'up':'disabled';
        }
        /** 输入邀请码失去焦点*/
        private outJoinInput():void
        {
            // let reg = new RegExp(/\D/);
            // if(reg.test(this.joinInput.text))
            // {
            //     this.joinInput.textColor = 0xff0000;
            //     this.showJoinError("请输入俱乐部邀请码");
            // }
        }
        /** 邀请码输入获得焦点*/
        private inJoinInput():void
        {
            // this.joinInput.textColor = 0xffffff;
        }

        /** 显示joinError */
        protected showJoinError(param: string): void {
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
            CTweenManagerController.getInstance().startCTween(2,[this.joinTipGroup]);
        }

        /** 显示创建group */
        protected showCreateGroup(evt?: egret.TouchEvent): void {
            if (evt) {
			    SoundPlayerNew.playEffect(SoundConst.click);
                // this.createGroup.visible = true;
                // this.createInputGroup.visible = true;
                CTweenManagerController.getInstance().startCTween(1,[this.createGroup,this.createInputGroup]);
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.text = "";
                this.createInput.addEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect();
                LayerManager.getInstance().addUI(this.createGroup, enums.LayerConst.LAYER_TOP);
            } else {
                // this.createGroup.visible = false;
                // this.createInputGroup.visible = false;
                CTweenManagerController.getInstance().startCTween(1,[this.createGroup,this.createInputGroup],false,()=>{
                    this.addChild(this.createGroup);
                },this);
                this.createTipGroup.visible = false;
                this.createConfirmBtn.enabled = false;
                this.createConfirmBtn.setState = 'disabled';
                this.createInput.removeEventListener(egret.Event.CHANGE, this.onCreateInput, this);
                this.showCreateEffect(false);
            }
        }

        /** 输入俱乐部名称响应事件 */
        protected onCreateInput(): void {
            let txt = this.createInput.text;
            this.createConfirmBtn.enabled = txt.length && txt.length > 0;
            this.createConfirmBtn.setState = this.createConfirmBtn.enabled?'up':'disabled';
        }

        /** 显示create错误 */
        protected showCreateError(params: string): void {
            this.createErrorMsg.text = LanguageUtil.translate(params);
            this.createTipGroup.alpha = 1;
            this.createTipGroup.visible = true;
            // CTween.get(this.createTipGroup).wait(1500).to({
            //     alpha: 0
            // }, 1500).call(() => {
            //     this.createTipGroup.visible = false;
            //     this.createTipGroup.alpha = 1;
            //     this.createErrorMsg.text = "";
            // }, this);
            CTweenManagerController.getInstance().startCTween(2,[this.createTipGroup]);
        }

        /** 显示创建俱乐部动画效果 */
        protected showCreateEffect(show: boolean = true): void {
            if (show) {
                if (this.intervalObj["spinImg"]) {
                    clearInterval(this.intervalObj["spinImg"]);
                }
                this.intervalObj["spinImg"] = setInterval(() => {
                    this.spinImg.rotation = (this.spinImg.rotation + 3) % 360 - 180;
                }, 50);
                for (let i = 0; i < 9; i++) {
                    let img = this["shineImg" + i];
                    this.shineImg(img, true);
                }
            } else {
                if (this.intervalObj["spinImg"]) {
                    clearInterval(this.intervalObj["spinImg"]);
                }
                for (let i = 0; i < 9; i++) {
                    let img = this["shineImg" + i];
                    this.shineImg(img, false);
                }
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
            CTweenManagerController.getInstance().endAllCTween();
        }

    }

}