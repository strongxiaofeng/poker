module game {

    export class ClubMemberInfoItem extends eui.AItemRenderer {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "clubMember/clubMemberInfoItemSkin.exml";
        }

        private btnUser: eui.ALabel;//加入时间：2017/10/01
        private imgAvatar: eui.Image;
        private imgMask: eui.Image;
        private labelNick: eui.ALabel;

        private imgArrow: eui.Image;
        private imgBgd: eui.Image;
        private img_lock: eui.Image;

        private _avatar: string;
        public get avatar(): string {
            return this._avatar;
        }
        public set avatar(url: string) {
            if (!url) { return; }
            if (this._avatar == url) { return; }
            this._avatar = url;
            let ip = GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            let fullUrl = "http:" + ip + "/" + url + ("?" + new Date().getTime());
            try {
                com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                    this.imgAvatar.source = data;
                }, this, com.ResourceItem.TYPE_IMAGE);
            } catch (err) {
                DebugUtil.debug("获取用户头像失败");
            }
        }

        protected dataChanged() {
            try {
                this.setState(false);
                this.init();
            } catch (e) {
                // this.init();
            }
        }

        protected init() {
            let data = PersonalInfoModel.getInstance().getPlayerInfoById(this.data.user_id);
            this.imgAvatar.mask = this.imgMask;
            this.avatar = data.avatar;
            this.img_lock.visible = data.locked;
            this.imgAvatar.alpha = data.locked ? 0.3 : 1;
            this.labelNick.text = data.nick;
            let joinTime = TimeUtil.getFormatBySecond(data.join_time, 6);
            this.btnUser.text = `${LanguageUtil.translate("加入时间")}：${joinTime}`;
        }

        public setState(down: boolean): void {
            this.btnUser.textColor = down ? 0x000000 : 0xffffff;
            this.btnUser.alpha = down ? 1 : 0.5;
            this.labelNick.textColor = down ? 0x000000 : 0xffffff;
            this.imgArrow.visible = down;
            this.imgBgd.visible = down;
        }

    }
}