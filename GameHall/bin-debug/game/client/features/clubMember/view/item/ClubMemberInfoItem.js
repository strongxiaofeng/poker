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
    var ClubMemberInfoItem = (function (_super) {
        __extends(ClubMemberInfoItem, _super);
        function ClubMemberInfoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "clubMember/clubMemberInfoItemSkin.exml";
            return _this;
        }
        Object.defineProperty(ClubMemberInfoItem.prototype, "avatar", {
            get: function () {
                return this._avatar;
            },
            set: function (url) {
                if (!url) {
                    return;
                }
                if (this._avatar == url) {
                    return;
                }
                this._avatar = url;
                var ip = game.GlobalConfig.defaultIP;
                if (ip[ip.length - 1] == '/') {
                    ip = ip.slice(0, ip.length - 1);
                }
                if (url[0] == '/') {
                    url = url.slice(1);
                }
                var fullUrl = "http:" + ip + "/" + url + ("?" + new Date().getTime());
                try {
                    com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                        this.imgAvatar.source = data;
                    }, this, com.ResourceItem.TYPE_IMAGE);
                }
                catch (err) {
                    game.DebugUtil.debug("获取用户头像失败");
                }
            },
            enumerable: true,
            configurable: true
        });
        ClubMemberInfoItem.prototype.dataChanged = function () {
            try {
                this.setState(false);
                this.init();
            }
            catch (e) {
                // this.init();
            }
        };
        ClubMemberInfoItem.prototype.init = function () {
            var data = game.PersonalInfoModel.getInstance().getPlayerInfoById(this.data.user_id);
            this.imgAvatar.mask = this.imgMask;
            this.avatar = data.avatar;
            this.img_lock.visible = data.locked;
            this.imgAvatar.alpha = data.locked ? 0.3 : 1;
            this.labelNick.text = data.nick;
            var joinTime = game.TimeUtil.getFormatBySecond(data.join_time, 6);
            this.btnUser.text = game.LanguageUtil.translate("加入时间") + "\uFF1A" + joinTime;
        };
        ClubMemberInfoItem.prototype.setState = function (down) {
            this.btnUser.textColor = down ? 0x000000 : 0xffffff;
            this.btnUser.alpha = down ? 1 : 0.5;
            this.labelNick.textColor = down ? 0x000000 : 0xffffff;
            this.imgArrow.visible = down;
            this.imgBgd.visible = down;
        };
        return ClubMemberInfoItem;
    }(eui.AItemRenderer));
    game.ClubMemberInfoItem = ClubMemberInfoItem;
    __reflect(ClubMemberInfoItem.prototype, "game.ClubMemberInfoItem");
})(game || (game = {}));
//# sourceMappingURL=ClubMemberInfoItem.js.map