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
    var ExitClubBaseUI = (function (_super) {
        __extends(ExitClubBaseUI, _super);
        function ExitClubBaseUI() {
            var _this = _super.call(this) || this;
            _this.skinName = game.SystemPath.skin_path + "exitClub/exitClubSkin.exml";
            _this.listLoader = game.ListLoader.getInstance();
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        ExitClubBaseUI.prototype.initSetting = function () {
            this.initecode();
            this.initList();
        };
        /** 初始化变量*/
        ExitClubBaseUI.prototype.initecode = function () {
        };
        // ---------------------------------- 接收Mediator通知 ----------------------------------
        /** 收到mediator的通知 */
        ExitClubBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case ExitClubCommands.initListener:
                    this.initListener(params);
                    break;
                case ExitClubCommands.showList:
                    this.showList(params);
                    break;
                case ExitClubCommands.showAllNum:
                    this.showClubNum(params);
                    break;
                case ExitClubCommands.hidenListLoading:
                    this.listLoader.setLoadComplete();
                    break;
                case ExitClubCommands.setAllLoaded:
                    this.listLoader.isFirstLoad = true;
                    this.listLoader.setAllLoaded();
                    break;
            }
        };
        // ---------------------------------- 监听事件 ----------------------------------
        /** 注册事件监听器 */
        ExitClubBaseUI.prototype.initListener = function (mediator) {
            this.listLoader.setList(this.joinedClubScroll, mediator.pullDownRefreshList, mediator, mediator.pullUpRefreshList);
        };
        /** 初始化list*/
        ExitClubBaseUI.prototype.initList = function () {
            this.clubListArr = new eui.ArrayCollection();
            this.joinedClubList.itemRenderer = game.ExitClubItem;
            this.joinedClubList.dataProvider = this.clubListArr;
        };
        /** 显示列表*/
        ExitClubBaseUI.prototype.showList = function (arr) {
            arr.sort(function (a, b) {
                return b["join_time"] - a["join_time"];
            });
            this.clubListArr = new eui.ArrayCollection();
            this.joinedClubList.dataProvider = this.clubListArr;
            this.clubListArr.source = arr;
            this.clubListArr.refresh();
            this.joinedClubList.validateNow();
        };
        /** 显示俱乐部统计*/
        ExitClubBaseUI.prototype.showClubNum = function (params) { };
        // ---------------------------------- dispos ----------------------------------
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        ExitClubBaseUI.prototype.dispose = function () {
            this.listLoader.dispose();
            this.listLoader = null;
            _super.prototype.dispose.call(this);
        };
        return ExitClubBaseUI;
    }(game.BaseUI));
    game.ExitClubBaseUI = ExitClubBaseUI;
    __reflect(ExitClubBaseUI.prototype, "game.ExitClubBaseUI");
})(game || (game = {}));
//# sourceMappingURL=ExitClubBaseUI.js.map