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
    var MenuMediator = (function (_super) {
        __extends(MenuMediator, _super);
        function MenuMediator() {
            return _super.call(this) || this;
        }
        /**初始化 当前皮肤类型界面 pc还是移动，哪一套UI*/
        MenuMediator.prototype.initUI = function () {
            var currentUI = egret.getDefinitionByName("game.PCMenuUI");
            this.ui = new currentUI();
            game.UIManager.OpenUI(this.ui, game.Mediators.Mediator_Menu.layer);
        };
        /** 分发游戏数据 */
        MenuMediator.prototype.initData = function () {
            this.addRegister(game.Mediators.Mediator_Menu.name, this);
            // 初始化UI
            this.notifyUI(MenuUICommands.initListener, this);
            this.notifyUI(MenuUICommands.setVisible, false);
        };
        /** 注册通知 */
        MenuMediator.prototype.listNotification = function () {
            return [
                game.NotifyConst.Notify_PC_AddMenu,
                game.NotifyConst.Notify_PC_CloseMenu,
                game.NotifyConst.Notify_PC_CloseMenuDirect
            ];
        };
        /** 接收通知 */
        MenuMediator.prototype.handleNotification = function (type, body) {
            switch (type) {
                case game.NotifyConst.Notify_PC_AddMenu:
                    if (body.level == 2 && this.menuInfo2) {
                        if (this.menuInfo3 && this.menuInfo3.ui) {
                            var name_1 = this.menuInfo3.mediatorClass.name + "";
                            game.MediatorManager.closeMediator(name_1);
                            this.menuInfo3 = null;
                        }
                        if (this.menuInfo2 && this.menuInfo2.ui) {
                            var name_2 = this.menuInfo2.mediatorClass.name + "";
                            game.MediatorManager.closeMediator(name_2);
                            this.menuInfo2 = null;
                        }
                    }
                    if (body.level == 3 && this.menuInfo3) {
                        if (this.menuInfo3 && this.menuInfo3.ui) {
                            var name_3 = this.menuInfo3.mediatorClass.name + "";
                            game.MediatorManager.closeMediator(name_3);
                            this.menuInfo3 = null;
                        }
                    }
                    this["menuInfo" + body.level] = body;
                    this.notifyUI(MenuUICommands.addUI, body);
                    this.notifyUI(MenuUICommands.setVisible, true);
                    this.notifyUI(MenuUICommands.tweenUI, {
                        info1: this.menuInfo1,
                        info2: this.menuInfo2,
                        info3: this.menuInfo3,
                    });
                    break;
                case game.NotifyConst.Notify_PC_CloseMenu:
                    if ([1, 2, 3].indexOf(body) > -1) {
                        this["closeUI" + body]();
                    }
                    break;
                case game.NotifyConst.Notify_PC_CloseMenuDirect:
                    if ([1, 2, 3].indexOf(body) > -1) {
                        this["closeUI" + body](true);
                    }
                    break;
            }
        };
        /**isDirect 是否直接关闭 不缓动 */
        MenuMediator.prototype.closeUI1 = function (isDirect) {
            if (isDirect === void 0) { isDirect = false; }
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (this.menuInfo3 && this.menuInfo3.ui) {
                this.sendNotification(game.NotifyConst.Notify_PC_MenuClosed, this.menuInfo3.mediatorClass.name);
                game.MediatorManager.closeMediator(this.menuInfo3.mediatorClass.name);
            }
            if (this.menuInfo2 && this.menuInfo2.ui) {
                this.sendNotification(game.NotifyConst.Notify_PC_MenuClosed, this.menuInfo2.mediatorClass.name);
                game.MediatorManager.closeMediator(this.menuInfo2.mediatorClass.name);
            }
            if (this.menuInfo1 && this.menuInfo1.ui) {
                this.sendNotification(game.NotifyConst.Notify_PC_MenuClosed, this.menuInfo1.mediatorClass.name);
                game.MediatorManager.closeMediator(this.menuInfo1.mediatorClass.name);
            }
            this.menuInfo1 = null;
            this.menuInfo2 = null;
            this.menuInfo3 = null;
            this.notifyUI(MenuUICommands.setVisible, false);
        };
        /**isDirect 是否直接关闭 不缓动 */
        MenuMediator.prototype.closeUI2 = function (isDirect) {
            var _this = this;
            if (isDirect === void 0) { isDirect = false; }
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.sendNotification(game.NotifyConst.Notify_PC_DataCenterBtnState);
            this.notifyUI(MenuUICommands.closeUI, {
                isDirect: isDirect,
                level: 2,
                callBack: function () {
                    if (_this.menuInfo3 && _this.menuInfo3.ui) {
                        _this.sendNotification(game.NotifyConst.Notify_PC_MenuClosed, _this.menuInfo3.mediatorClass.name);
                        game.MediatorManager.closeMediator(_this.menuInfo3.mediatorClass.name);
                    }
                    if (_this.menuInfo2 && _this.menuInfo2.ui) {
                        _this.sendNotification(game.NotifyConst.Notify_PC_MenuClosed, _this.menuInfo2.mediatorClass.name);
                        game.MediatorManager.closeMediator(_this.menuInfo2.mediatorClass.name);
                    }
                    _this.menuInfo2 = null;
                    _this.menuInfo3 = null;
                },
                thisObj: this
            });
        };
        /**isDirect 是否直接关闭 不缓动 */
        MenuMediator.prototype.closeUI3 = function (isDirect) {
            var _this = this;
            if (isDirect === void 0) { isDirect = false; }
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            this.notifyUI(MenuUICommands.closeUI, {
                level: 3,
                callBack: function () {
                    if (_this.menuInfo3 && _this.menuInfo3.ui) {
                        _this.sendNotification(game.NotifyConst.Notify_PC_MenuClosed, _this.menuInfo3.mediatorClass.name);
                        game.MediatorManager.closeMediator(_this.menuInfo3.mediatorClass.name);
                    }
                    _this.menuInfo3 = null;
                },
                thisObj: this
            });
        };
        /**关闭mediator, 要清除他的ui和数据,不再接受通知 */
        MenuMediator.prototype.dispose = function (direction) {
            this.closeUI3();
            this.closeUI2();
            this.closeUI1();
            this.removeRegister(game.Mediators.Mediator_Menu.name);
            _super.prototype.dispose.call(this);
        };
        return MenuMediator;
    }(game.BaseMediator));
    game.MenuMediator = MenuMediator;
    __reflect(MenuMediator.prototype, "game.MenuMediator");
    var MenuInfo = (function () {
        function MenuInfo() {
        }
        return MenuInfo;
    }());
    game.MenuInfo = MenuInfo;
    __reflect(MenuInfo.prototype, "game.MenuInfo");
})(game || (game = {}));
//# sourceMappingURL=MenuMediator.js.map