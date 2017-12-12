module game {

    export class DataCenterBaseUI extends BaseUI {

        public constructor() {
            super();
            this.skinName = SystemPath.skin_path + "dataCenter/dataCenterSkin.exml";
        }

        // ---------------------------------- 皮肤组件（protected） ----------------------------------

        /** 默认俱乐部图标 */
        protected maskClubIcon: eui.Image;
        /**　俱乐部图标 */
        protected imgClubIcon: eui.Image;
        /** 今日盈余 */
        protected labelProfit: eui.BitmapLabel;
        /** 投注数额 */
        protected labelBet: eui.BitmapLabel;
        /** 投注次数 */
        protected labelTime: eui.BitmapLabel;
        /** 筹码存量 */
        protected labelChip: eui.BitmapLabel;
        /** 房卡消耗 */
        protected labelCard: eui.BitmapLabel;
        /** 实时数据按钮 */
        protected btnRealTime: eui.AButton;
        /** 投注记录按钮 */
        protected btnBetRecord: eui.AButton;
        /** 额度记录按钮 */
        protected btnQuotaRecord: eui.AButton;



        // ---------------------------------- 变量声明 ----------------------------------


        // ---------------------------------- 初始化 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
        }

        // ---------------------------------- 接收Mediator通知 ----------------------------------

        /** 收到mediator的通知 */
        public onMediatorCommand(type: DataCenterUICommands, params: any = null): void {
            switch (type) {
                case DataCenterUICommands.initListener:
                    this.initListener(params);
                    break;
                case DataCenterUICommands.setClubIcon:
                    this.setClubIcon(params);
                    break;
                case DataCenterUICommands.setClubData:
                    this.setClubData(params);
                    break;
                case DataCenterUICommands.setBtnState:
                    this.setBtnState();
                    break;
            }
        }

        // ---------------------------------- 监听事件 ----------------------------------

        /** 注册事件监听器 */
        protected initListener(mediator: DataCenterMediator): void {
            this.registerEvent(this.btnRealTime, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnBetRecord, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
            this.registerEvent(this.btnQuotaRecord, egret.TouchEvent.TOUCH_TAP, this.onHandleTap, this);
        }

        /** 响应点击事件 */
        protected onHandleTap(event: egret.TouchEvent): void {

        }

        // ---------------------------------- UI操作 ----------------------------------

        /** 设置俱乐部图标
         * @param url {string} 俱乐部图标URL
         */
        protected setClubIcon(url: string): void {
            if (url) {
                let ip = GlobalConfig.defaultIP
                if (ip[ip.length - 1] == '/') {
                    ip = ip.slice(0, ip.length - 1);
                }
                if (url[0] == '/') {
                    url = url.slice(1);
                }
                let fullUrl = "http:" + ip + "/" + url + ("?" + new Date().getTime());
                com.LoadManager.getInstance().getResByUrl(fullUrl, (data) => {
                    this.imgClubIcon.visible = true;
                    this.imgClubIcon.source = data;
                    this.imgClubIcon.mask = this.maskClubIcon;
                }, this, com.ResourceItem.TYPE_IMAGE);
            } else {
                this.imgClubIcon.mask = null;
                this.maskClubIcon.$maskedObject = null;
                this.imgClubIcon.visible = false;
            }
        }

        /** 设置俱乐部数据 */
        protected setClubData(data: { profit: number; bet: number; time: number; chip: number; card: number; }): void {
            this.labelProfit.text = NumberUtil.getSplitNumStr(data.profit || 0, 3);
            this.labelBet.text = NumberUtil.getSplitNumStr(data.bet || 0, 3);
            this.labelTime.text = NumberUtil.getSplitNumStr(data.time * 100 || 0, 3);
            this.labelChip.text = NumberUtil.getSplitNumStr(data.chip || 0, 3);
            this.labelCard.text = NumberUtil.getSplitNumStr(Math.abs(data.card) * 100 || 0, 3);
        }

        /** 设置按钮样式 */
        protected setBtnState(): void {

        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }
}