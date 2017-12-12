module game
{

    export class RoomInfoBaseUI extends BaseUI
    {

        public constructor(data)
        {
            super();
            this.data = data;
            this.skinName = SystemPath.skin_path + "roomInfo/roomInfoSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 黄色背景遮罩 */
        protected imgBgd: eui.Image;
        /** 右边的整个group */
        protected groupMenu: eui.Group;
        /** 房间信息 */
        protected labelInfo: eui.ALabel;
        /** 关闭按钮 */
        protected btnClose: eui.AButton;
        /** 闲次数 */
        protected numPlayer: eui.ALabel;
        /** 庄次数 */
        protected numBanker: eui.ALabel;
        /** 和次数 */
        protected numTie: eui.ALabel;
        /** 闲百分比 */
        protected ratePlayer: eui.BitmapLabel;
        /** 庄百分比 */
        protected rateBanker: eui.BitmapLabel;
        /** 和百分比 */
        protected rateTie: eui.BitmapLabel;
        /** 饼状图group */
        protected groupCircle: eui.Group;
        /** 总局数 */
        protected numRound: eui.BitmapLabel;
        /** 闲饼状图 */
        protected circlePlayer: eui.Image;
        /** 庄饼状图 */
        protected circleBanker: eui.Image;
        /** 和饼状图 */
        protected circleTie: eui.Image;

        /** 连线group */
        protected groupLine: eui.Group;
        /** 锚点group */
        protected groupDots: eui.Group;
        // dotB1 dotP1 dotT1 - dotB15 dotP15 dotT15

        /** 庄赔率 */
        protected ratioBanker: eui.ALabel;
        protected ratioBankerTip: eui.ALabel;
        /** 闲最低限额 */
        protected minP: eui.ALabel;
        /** 庄最低限额 */
        protected minB: eui.ALabel;
        /** 和最低限额 */
        protected minT: eui.ALabel;
        /** 闲对最低限额 */
        protected minPP: eui.ALabel;
        /** 庄对最低限额 */
        protected minBP: eui.ALabel;
        /** 闲最高限额 */
        protected maxP: eui.ALabel;
        /** 庄最高限额 */
        protected maxB: eui.ALabel;
        /** 和最高限额 */
        protected maxT: eui.ALabel;
        /** 闲对最高限额 */
        protected maxPP: eui.ALabel;
        /** 庄对最高限额 */
        protected maxBP: eui.ALabel;

        // ---------------------------------- 变量声明 ----------------------------------

        protected data: any;

        protected maskP: egret.Shape;
        protected maskB: egret.Shape;
        protected maskT: egret.Shape;

        protected polyline: egret.Shape;

        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void
        {
            super.initSetting();
            this.maskB = new egret.Shape();
            this.maskP = new egret.Shape();
            this.maskT = new egret.Shape();
            this.groupCircle.addChild(this.maskB);
            this.groupCircle.addChild(this.maskP);
            this.groupCircle.addChild(this.maskT);
            this.polyline = new egret.Shape();
            this.groupLine.addChild(this.polyline);
            CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu]);
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: RoomInfoUICommands, params: any = null): void
        {
            switch (type) {
                case RoomInfoUICommands.initListener:
                    this.initListener(params);
                    break;
                case RoomInfoUICommands.setRoomInfo:
                    if (GlobalConfig.isMobile) {
                        this.labelInfo.text = "";
                        if (params["roomName"]) {
                            this.labelInfo.text =
                                LanguageUtil.translate("global_lbl_room_text") + "：" + params["roomName"];
                        }
                        if (params["dealerName"]) {
                            this.labelInfo.text = this.labelInfo.text + "     " +
                                LanguageUtil.translate("global_lbl_dealer") + "：" + params["dealerName"];
                        }
                    }

                    break;
                case RoomInfoUICommands.setLimitInfo:
                    this.setLimitInfo(params);
                    break;
                case RoomInfoUICommands.setRoundInfo:
                    this.setRoundInfo(params);
                    if (this.timeoutObj["setRoundInfo"]) {
                        clearTimeout(this.timeoutObj["setRoundInfo"]);
                    }
                    this.timeoutObj["setRoundInfo"] = setTimeout(() =>
                    {
                        this.setRoundInfo(params);
                    }, 200);
                    break;
                case RoomInfoUICommands.setPolyline:
                    this.setPolyline(params);
                    if (this.timeoutObj["setPolyline"]) {
                        clearTimeout(this.timeoutObj["setPolyline"]);
                    }
                    this.timeoutObj["setPolyline"] = setTimeout(() =>
                    {
                        this.setPolyline(params);
                    }, 200);
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: RoomInfoMediator): void
        {
            if (GlobalConfig.isMobile) this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.imgBgd, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void
        {
            switch (event.target) {
                case this.btnClose:
                case this.imgBgd:
                    CTweenManagerController.getInstance().startCTween(4, [this.imgBgd, this.groupMenu], false, this.closeCallBack, this);
                    break;
            }
        }

        public closeCallBack()
        {
            MediatorManager.closeMediator(Mediators.Mediator_RoomInfo.name);
        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 设置房间限额信息 */
        protected setLimitInfo(limit: { max: topic.BaccratRoomLimit, min: topic.BaccratRoomLimit }): void
        {
            if (!GlobalConfig.isMobile) return;
            if (!limit || !limit.max || !limit.min) { return; }
            [this.minP.text,
            this.minB.text,
            this.minT.text,
            this.minPP.text,
            this.minBP.text,
            this.maxP.text,
            this.maxB.text,
            this.maxT.text,
            this.maxPP.text,
            this.maxBP.text] = [NumberUtil.getSplitNumStr(limit.min.player, 3),
            NumberUtil.getSplitNumStr(limit.min.banker, 3),
            NumberUtil.getSplitNumStr(limit.min.tie, 3),
            NumberUtil.getSplitNumStr(limit.min.player_pair, 3),
            NumberUtil.getSplitNumStr(limit.min.banker_pair, 3),
            NumberUtil.getSplitNumStr(limit.max.player, 3),
            NumberUtil.getSplitNumStr(limit.max.banker, 3),
            NumberUtil.getSplitNumStr(limit.max.tie, 3),
            NumberUtil.getSplitNumStr(limit.max.player_pair, 3),
            NumberUtil.getSplitNumStr(limit.max.banker_pair, 3)];
        }

        /** 设置房间局数信息 */
        protected setRoundInfo(roundInfo: { banker: number, player: number, tie: number }): void
        {
            let total = roundInfo.banker + roundInfo.player + roundInfo.tie;
            this.numPlayer.text = roundInfo.player + "";
            this.numBanker.text = roundInfo.banker + "";
            this.numTie.text = roundInfo.tie + "";
            this.numRound.text = total + "";
            let ratioB = 0, ratioP = 0, ratioT = 0;
            if (total > 0) {
                ratioB = ~~(roundInfo.banker * 100 / total);
                ratioT = ~~(roundInfo.tie * 100 / total);
                ratioP = 100 - ratioB - ratioT;
            }
            this.ratePlayer.text = ratioP + "%";
            this.rateBanker.text = ratioB + "%";
            this.rateTie.text = ratioT + "%";
            this.setMask(1, ratioP);
            this.setMask(2, ratioB);
            this.setMask(3, ratioT);
        }

        /** 设置百分比饼状图遮罩
         * @param type {number} 1 - player | 2 - banker | 3 - tie
         * @param percent {number} 百分比数字 (0 - 100)
         */
        protected setMask(type: number, percent: number): void
        {
            let x = this.groupCircle.width / 2;
            // let x = GlobalConfig.isMobile ? 270 : 93;
            let y = this.groupCircle.height / 2;
            // let y = GlobalConfig.isMobile ? 220 : 93;
            let endAngle = (percent / 100) * 2 * Math.PI - Math.PI / 2;
            if (percent == 100) {
                endAngle = 2 * Math.PI - Math.PI / 2;
            }
            let mask: egret.Shape, circle: eui.Image, r: number;
            switch (type) {
                case 1:
                    r = this.circlePlayer.height / 2;
                    // r = GlobalConfig.isMobile ? 150 : 63;
                    mask = this.maskP;
                    circle = this.circlePlayer;
                    break;
                case 2:
                    r = this.circleBanker.height / 2;
                    // r = GlobalConfig.isMobile ? 180 : 75;
                    mask = this.maskB;
                    circle = this.circleBanker;
                    break;
                case 3:
                    r = this.circleTie.height / 2;
                    // r = GlobalConfig.isMobile ? 120 : 51;
                    mask = this.maskT;
                    circle = this.circleTie;
                    break;
            }
            mask.graphics.clear();
            mask.graphics.beginFill(0x666666);
            mask.graphics.moveTo(x, y);
            mask.graphics.lineTo(x, y - r);
            mask.graphics.drawArc(x, y, r, -Math.PI / 2, endAngle, false);
            mask.graphics.lineTo(x, y);
            mask.graphics.endFill();
            circle.mask = mask;
        }

        /** 设置房间局数走势
         * @param roundInfo {Array<string>} P - player | B - banker | T - tie
         */
        protected setPolyline(roundInfo: Array<string>): void
        {
            this.polyline.graphics.clear();
            let count = GlobalConfig.isMobile ? 15 : 12;
            for (let i = 1; i <= count; i++) {
                // dotB1 dotP1 dotT1 - dotB15 dotP15 dotT15
                (this["dotB" + i] as eui.Image).visible = false;
                (this["dotP" + i] as eui.Image).visible = false;
                (this["dotT" + i] as eui.Image).visible = false;
            }
            if (roundInfo.length == 0) { return; }
            this.polyline.graphics.lineStyle(4, 0xcccccc);
            let r = (this["dotB1"] as eui.Image).width;
            // let r = GlobalConfig.isMobile ? 35 : 18;
            for (let i = 0; i < roundInfo.length; i++) {
                let num = i + 1;
                let param = roundInfo[i].toUpperCase();
                (this[`dot${param}${num}`] as eui.Image).visible = true;
                let x = (this[`dot${param}${num}`] as eui.Image).x + r / 2;
                // let x = GlobalConfig.isMobile ? (-10 + 50 * i + r / 2) : (25 * i + 47 + r / 2);
                let y = (this[`dot${param}${num}`] as eui.Image).y + r / 2;
                // let y = (param == "B" ? -7 : (param == "P" ? 470 : 232)) + r / 2;
                // if (!GlobalConfig.isMobile) {
                //     y = (param == "B" ? 39 : (param == "P" ? 153 : 98)) + r / 2;
                // }
                if (num == 1) {
                    this.polyline.graphics.moveTo(x, y);
                } else {
                    this.polyline.graphics.lineTo(x, y);
                }
            }
            this.polyline.graphics.endFill();
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void
        {
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }

    }

}