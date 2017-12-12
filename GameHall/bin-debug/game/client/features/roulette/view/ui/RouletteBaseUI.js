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
    var RouletteBaseUI = (function (_super) {
        __extends(RouletteBaseUI, _super);
        function RouletteBaseUI(data) {
            var _this = _super.call(this) || this;
            /** 统一的筹码存放对象
             *  key - betType
             *  value - chipGroup
             */
            _this.chipGroups = {};
            /** 法式轮盘上的筹码存放对象 */
            _this.chipGroupsTop = {};
            _this.skinName = game.SystemPath.skin_path + "roulette/rouletteSkin.exml";
            _this.data = data;
            return _this;
        }
        // ---------------------------------------- 接收Mediator通知 ----------------------------------------
        /** 收到mediator的通知 */
        RouletteBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case RouletteUICommands.initListener:
                    this.initListener(params);
                    break;
                case RouletteUICommands.clearAllHighLight:
                    this.clearAllHighLight();
                    break;
                case RouletteUICommands.highLightGrid:
                    this.highLightGrid(params);
                    break;
                case RouletteUICommands.highLightRoll:
                    this.highLightRoll(params);
                    break;
            }
        };
        // ---------------------------------------- 初始化操作 ----------------------------------------
        RouletteBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.chipGroups = {};
            this.chipGroupsTop = {};
        };
        // ---------------------------------------- 监听事件 ----------------------------------------
        /** 注册事件监听器 */
        RouletteBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.groupGridTouch, egret.TouchEvent.TOUCH_TAP, this.onTouchGrid, this);
            this.registerEvent(this, game.RouletteMediator.betGrid, mediator.getBetsByGrid, mediator);
            this.registerEvent(this, game.RouletteMediator.betRoll, mediator.getBetsByRoll, mediator);
        };
        /** 英式轮盘点击事件 */
        RouletteBaseUI.prototype.onTouchGrid = function (evt) {
            var name = evt.target.name;
            if (name && name.indexOf("touch_") == 0) {
                var type = name.substr(6);
                this.dispatchEventWith(game.RouletteMediator.betGrid, false, type);
            }
        };
        // ---------------------------------------- UI操作 ----------------------------------------
        /** tipError */
        RouletteBaseUI.prototype.tipError = function (msg) { };
        /** tipSuccess */
        RouletteBaseUI.prototype.tipSuccess = function (msg) { };
        // ---------------------------------------- 筹码操作 ----------------------------------------
        /** 添加筹码 */
        RouletteBaseUI.prototype.addChip = function () { };
        /** 根据筹码位置键值获取筹码坐标值 */
        RouletteBaseUI.prototype.getChipPos = function () { };
        /** 所有筹码样式设置 */
        RouletteBaseUI.prototype.setAllChip = function () { };
        /** 回收筹码 */
        RouletteBaseUI.prototype.recycleChip = function () { };
        /** 回收所有筹码 */
        RouletteBaseUI.prototype.recycleAllChip = function () { };
        // ---------------------------------------- 高亮效果 ----------------------------------------
        /** 取消所有区域高亮 */
        RouletteBaseUI.prototype.clearAllHighLight = function () {
            // 取消英式轮盘高亮
            for (var i = 0; i <= 48; i++) {
                this["grid_" + i].visible = false;
            }
            // 取消法式轮盘高亮
        };
        /** 显示英式轮盘高亮 */
        RouletteBaseUI.prototype.highLightGrid = function (targetName) {
            var nums = this.getGridNumByBet(targetName);
            for (var i = nums.length - 1; i >= 0; i--) {
                this.highLightGridNum(nums[i]);
            }
        };
        /** 显示法式轮盘高亮 */
        RouletteBaseUI.prototype.highLightRoll = function (targetName) {
            var nums = this.getRollNumByBet(targetName);
            for (var i = nums.length - 1; i >= 0; i--) {
                this.highLightRollNum(nums[i]);
                // 显示法式轮盘高亮的同时需要显示英式轮盘的高亮
                if (0 <= nums[i] && nums[i] <= 36) {
                    this.highLightGridNum(nums[i]);
                }
            }
        };
        /** 根据下注区域获取英式轮盘高亮数字 */
        RouletteBaseUI.prototype.getGridNumByBet = function (targetName) {
            var nums = [];
            var strArr = targetName.split("_");
            // grid_37 ~ grid_39 （第一列~第三列）
            // grid_40 ~ grid_42 （第一打~第三打）
            switch (strArr[0]) {
                case "big":
                    nums = game.RouletteModel.bigNum;
                    nums.push(48);
                    break;
                case "small":
                    nums = game.RouletteModel.smallNum;
                    nums.push(43);
                    break;
                case "single":
                    nums = game.RouletteModel.singleNum;
                    nums.push(47);
                    break;
                case "double":
                    nums = game.RouletteModel.doubleNum;
                    nums.push(44);
                    break;
                case "red":
                    nums = game.RouletteModel.redNum;
                    nums.push(45);
                    break;
                case "black":
                    nums = game.RouletteModel.blackNum;
                    nums.push(46);
                    break;
                case "four":
                    nums = [0, 1, 2, 3];
                    break;
                case "dozen":
                    nums = game.RouletteModel.getDozen(+strArr[1]);
                    nums.push(39 + +strArr[1]);
                    break;
                case "column":
                    nums = game.RouletteModel.getColumn(+strArr[1]);
                    nums.push(36 + +strArr[1]);
                    break;
                case "direct":
                case "split":
                case "street":
                case "three":
                case "corner":
                case "line":
                    strArr.forEach(function (str) {
                        if (/\d+/.test(str)) {
                            nums.push(+str);
                        }
                    }, this);
                    break;
            }
            return nums;
        };
        /** 根据下注区域获取法式轮盘高亮数字 */
        RouletteBaseUI.prototype.getRollNumByBet = function (targetName) {
            var nums = [];
            return nums;
        };
        /** 隐藏或显示英式轮盘某个区数字区域的高亮 */
        RouletteBaseUI.prototype.highLightGridNum = function (num) {
            if (0 <= num && num <= 48) {
                this["grid_" + num].visible = true;
            }
        };
        /** 隐藏或显示法式轮盘中部某个区数字区域的高亮 */
        RouletteBaseUI.prototype.highLightRollNum = function (num) { };
        // ---------------------------------------- 七人座 ----------------------------------------
        // ---------------------------------------- dispose ----------------------------------------
        RouletteBaseUI.prototype.dispose = function () {
            this.chipGroups = {};
            this.chipGroupsTop = {};
            _super.prototype.dispose.call(this);
        };
        return RouletteBaseUI;
    }(game.BaseUI));
    game.RouletteBaseUI = RouletteBaseUI;
    __reflect(RouletteBaseUI.prototype, "game.RouletteBaseUI");
})(game || (game = {}));
//# sourceMappingURL=RouletteBaseUI.js.map