module game {

    export class RouletteBaseUI extends BaseUI {

        public constructor(data) {
            super();
            this.skinName = SystemPath.skin_path + "roulette/rouletteSkin.exml";
            this.data = data;
        }

        // ---------------------------------------- 变量声明 ----------------------------------------

        protected data: any;

		/** 统一的筹码存放对象
         *  key - betType
         *  value - chipGroup
         */
        protected chipGroups: Object = {};
        /** 法式轮盘上的筹码存放对象 */
        protected chipGroupsTop: Object = {};
        /** 统一的筹码池对象 */
        protected chipObjectPool: ChipObjectPool;

        // ---------------------------------------- 皮肤组件(protected) ----------------------------------------

        // grid_0 ~ grid_36 （数字0~36）
        // grid_37 ~ grid_39 （第一列~第三列）
        // grid_40 ~ grid_42 （第一打~第三打）
        // grid_43 （小）
        // grid_44 （双）
        // grid_45 （红）
        // grid_46 （黑）
        // grid_47 （单）
        // grid_48 （大）

        // 英式轮盘下注区
        /** 英式轮盘数字高亮背景容器 */
        protected groupGirdNum: eui.Group;
        /** 英式轮盘筹码容器 */
        protected groupGridChip: eui.Group;
        /** 英式轮盘点击检测区域 */
        protected groupGridTouch: eui.Group;

        // ---------------------------------------- 接收Mediator通知 ----------------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: RouletteUICommands, params: any = null): void {
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
        }

        // ---------------------------------------- 初始化操作 ----------------------------------------

        public initSetting(): void {
            super.initSetting();
            this.chipGroups = {};
            this.chipGroupsTop = {};
        }

        // ---------------------------------------- 监听事件 ----------------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: RouletteMediator): void {
            this.registerEvent(this.groupGridTouch, egret.TouchEvent.TOUCH_TAP, this.onTouchGrid, this);
            this.registerEvent(this, RouletteMediator.betGrid, mediator.getBetsByGrid, mediator);
            this.registerEvent(this, RouletteMediator.betRoll, mediator.getBetsByRoll, mediator);
        }

        /** 英式轮盘点击事件 */
        protected onTouchGrid(evt: egret.TouchEvent): void {
            let name: string = evt.target.name;
            if (name && name.indexOf("touch_") == 0) {
                let type = name.substr(6);
                this.dispatchEventWith(RouletteMediator.betGrid, false, type);
            }
        }

        // ---------------------------------------- UI操作 ----------------------------------------

        /** tipError */
        protected tipError(msg: string): void { }

        /** tipSuccess */
        protected tipSuccess(msg: string): void { }

        // ---------------------------------------- 筹码操作 ----------------------------------------

        /** 添加筹码 */
        protected addChip() { }

        /** 根据筹码位置键值获取筹码坐标值 */
        protected getChipPos() { }

        /** 所有筹码样式设置 */
        protected setAllChip() { }

        /** 回收筹码 */
        protected recycleChip() { }

        /** 回收所有筹码 */
        protected recycleAllChip() { }

        // ---------------------------------------- 高亮效果 ----------------------------------------

        /** 取消所有区域高亮 */
        protected clearAllHighLight(): void {
            // 取消英式轮盘高亮
            for (let i = 0; i <= 48; i++) {
                (this["grid_" + i] as eui.Image).visible = false;
            }
            // 取消法式轮盘高亮
        }

        /** 显示英式轮盘高亮 */
        protected highLightGrid(targetName: string): void {
            let nums = this.getGridNumByBet(targetName);
            for (let i = nums.length - 1; i >= 0; i--) {
                this.highLightGridNum(nums[i]);
            }
        }

        /** 显示法式轮盘高亮 */
        protected highLightRoll(targetName: string): void {
            let nums = this.getRollNumByBet(targetName);
            for (let i = nums.length - 1; i >= 0; i--) {
                this.highLightRollNum(nums[i]);
                // 显示法式轮盘高亮的同时需要显示英式轮盘的高亮
                if (0 <= nums[i] && nums[i] <= 36) {
                    this.highLightGridNum(nums[i]);
                }
            }
        }

        /** 根据下注区域获取英式轮盘高亮数字 */
        protected getGridNumByBet(targetName: string): Array<number> {
            let nums: Array<number> = [];
            let strArr: Array<string> = targetName.split("_");
            // grid_37 ~ grid_39 （第一列~第三列）
            // grid_40 ~ grid_42 （第一打~第三打）
            switch (strArr[0]) {
                case "big":
                    nums = RouletteModel.bigNum;
                    nums.push(48);
                    break;
                case "small":
                    nums = RouletteModel.smallNum;
                    nums.push(43);
                    break;
                case "single":
                    nums = RouletteModel.singleNum;
                    nums.push(47);
                    break;
                case "double":
                    nums = RouletteModel.doubleNum;
                    nums.push(44);
                    break;
                case "red":
                    nums = RouletteModel.redNum;
                    nums.push(45);
                    break;
                case "black":
                    nums = RouletteModel.blackNum;
                    nums.push(46);
                    break;
                case "four":
                    nums = [0, 1, 2, 3];
                    break;
                case "dozen":
                    nums = RouletteModel.getDozen(+strArr[1]);
                    nums.push(39 + +strArr[1])
                    break;
                case "column":
                    nums = RouletteModel.getColumn(+strArr[1]);
                    nums.push(36 + +strArr[1])
                    break;
                case "direct":
                case "split":
                case "street":
                case "three":
                case "corner":
                case "line":
                    strArr.forEach((str) => {
                        if (/\d+/.test(str)) {
                            nums.push(+str);
                        }
                    }, this);
                    break;
            }
            return nums;
        }

        /** 根据下注区域获取法式轮盘高亮数字 */
        protected getRollNumByBet(targetName: string): Array<number> {
            let nums: Array<number> = [];
            return nums;
        }

        /** 隐藏或显示英式轮盘某个区数字区域的高亮 */
        protected highLightGridNum(num: number): void {
            if (0 <= num && num <= 48) {
                (this["grid_" + num] as eui.Image).visible = true;
            }
        }

        /** 隐藏或显示法式轮盘中部某个区数字区域的高亮 */
        protected highLightRollNum(num: number): void { }

        // ---------------------------------------- 七人座 ----------------------------------------

        // ---------------------------------------- dispose ----------------------------------------

        public dispose(): void {
            this.chipGroups = {};
            this.chipGroupsTop = {};
            super.dispose();
        }

    }
}