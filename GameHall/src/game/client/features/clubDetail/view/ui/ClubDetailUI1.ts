module game
{
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    export class ClubDetailUI1 extends ClubDetailBaseUI
    {
        /** 玩家昵称 */
        protected userName: eui.ALabel;
        /** 用户余额 */
        protected userBalance: eui.BitmapLabel;
        /**主界面 */
        private mainGroup: eui.Group;
        /**房间列表LIST */
        private gameIDList: eui.List;
        /**装房间列表的scroller */
        private myScroller: eui.Scroller;
        /** 密码输入框 */
        protected txtPwd: eui.Group;
        protected pwGroup: eui.Group;
        protected joinInput: eui.TextInput;
        protected joinConfirmBtn: eui.AButton;
        protected joinCancelBtn: eui.AButton;
        /**判断是否有房间的label*/
        private label_HaveNothing: eui.ALabel;
        /**btn*/
        private allRoom: eui.AButton;
        private commonRoom: eui.AButton;
        private privateRoom: eui.AButton;

        public constructor()
        {
            super();
            this.listLoader = ListLoader.getInstance();
            this.skinName = "resource/skins/game_skins/mobile/clubDetail/clubDetail.exml";
        }

        public initSetting()
        {
            super.initSetting();
            this.gameIDList.itemRenderer = ClubDetailItemUI1;
            this.gameIDList.useVirtualLayout = false;
            this.gameIDList.dataProvider = this.deskData;
            this.hidePwd();
            this["chipImg"].right = this.userBalance.width + 30;
            // this.myScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            // this.txtPwd.visible = true;
            // this.myScroller.throwSpeed = 0;
            this.isHaveRoom(ClubModel.getInstance().getTheClubRooms());
            this.initListener(true)
            this.allRoom.setState = "down";
            this.commonRoom.setState = "up";
            this.privateRoom.setState = "up";
            this.roomType = 0;
            this._pageIndex = 1;
        }

        public initListener(b: boolean)
        {
            if (b) {
                this.registerEvent(this.joinInput, egret.TouchEvent.FOCUS_OUT, this.onFocus, this);
                this.registerEvent(this.joinInput, egret.TouchEvent.CHANGE, this.onFocus, this);
                this.registerEvent(this.allRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
                this.registerEvent(this.commonRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
                this.registerEvent(this.privateRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            }
            else {
                this.removeAllEvent();
            }
        }

        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: any, params: any = null): void
        {
            switch (type) {
                // 初始化监听
                case ClubDetailUICommands.ClubDetailNotify_initListener:
                    this.registerEvent(this.joinConfirmBtn, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
                    this.registerEvent(this.joinCancelBtn, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
                    this.listLoader.setList(this.myScroller, this.pullDownRefreshList, this, this.pullUpRefreshList);
                    break;
                // 玩家昵称
                case ClubDetailUICommands.ClubDetailNotify_userName:
                    this.userName.text = params;
                    break;
                // 余额
                case ClubDetailUICommands.ClubDetailNotify_userBalance:
                    this.userBalance.text = NumberUtil.getSplitNumStr(params);
                    this["chipImg"].right = this.userBalance.width + 30;
                    break;
                //房卡数量
                case ClubDetailUICommands.ClubDetailNotify_HomeCardNum:
                    if (!params) return;
                    this["roomCardTxt"].text = `房卡：${NumberUtil.getSplitNumStr(params * 100)}`;
                    this["roomCardImg"].right = this["roomCardTxt"].width + 130;
                    break;
                // 是否显示广告
                case ClubDetailUICommands.ClubDetailNotify_isRoasting:

                    break;
                // 更新俱乐部名列表
                case ClubDetailUICommands.ClubDetailNotify_clubRoomArr:
                    this.updataList();
                    break;
                // setting数据发生改变（限额，房间名，是否有密码等）
                case ClubDetailUICommands.ClubDetailNotify_setting:
                    this.updataItemFuc(params, "initData");
                    break;
                case ClubDetailUICommands.ClubDetailNotify_isMy:
                    this.isMy(params);
                    break;
                case ClubDetailUICommands.ClubDetailNotify_showPwd:
                    this.showPwd(params);
                    break;
                case ClubDetailUICommands.ClubDetailNotify_roadMap:
                    this.runItemFuc(params, 'updataRoadData');
                    break;
                case ClubDetailUICommands.ClubDetailNotify_showRedMsg:
                    this.showRedMsg(params);
                    break;
                case ClubDetailUICommands.ClubDetailNotify_noRoomCard:
                    let tipData = new TipMsgInfo();
                    tipData.msg = [{ text: LanguageUtil.translate(params), textColor: enums.ColorConst.Golden }];
                    tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
                    tipData.comfirmCallBack = this.confirmBack;
                    tipData.thisObj = this;
                    MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
                    break;
            }
        }
        protected confirmBack(){
            MediatorManager.closeMediator(Mediators.Mediator_TipMsg.name);
        }
        /**房间类型
         * 0全部/1普通/2私有
        */
        protected roomType: number = 0;
        /** 点击事件 */
        protected handleTap(event: egret.TouchEvent): void
        {
			SoundPlayerNew.playEffect(SoundConst.click);
            switch (event.target) {
                case this.allRoom:
                    this.allRoom.setState = "down";
                    this.commonRoom.setState = "up";
                    this.privateRoom.setState = "up";
                    this.roomType = 0;
                    break;
                case this.commonRoom:
                    this.allRoom.setState = "up";
                    this.commonRoom.setState = "down";
                    this.privateRoom.setState = "up";
                    this.roomType = 1;
                    break;
                case this.privateRoom:
                    this.allRoom.setState = "up";
                    this.commonRoom.setState = "up";
                    this.privateRoom.setState = "down";
                    this.roomType = 2;
                    break;
            }
            this.pageIndex = 1;
            this.updataList();
        }
        public isMy(b: boolean)
        {
            this["roomCardGroup"].visible = false;
            this["balanceGroup"].visible = false;
            if (b) {
                this["roomCardGroup"].visible = true;
            }
            else {
                this["balanceGroup"].visible = true;
            }
        }

        // 点击响应时间
        protected onTouchBtn(evt: egret.TouchEvent): void
        {
            switch (evt.target) {
                case this.joinConfirmBtn:
                    this.reqEnterPwd()
                    break;
                case this.joinCancelBtn:
                    this.hidePwd();
                    this.pwdRoomID = '';
                    break;
            }
        }

        // 移出事件
        protected onFocus(evt: egret.TouchEvent): void
        {
            let txt = this.joinInput.text;
            if (!txt || txt == '' || txt.length != 6) {
                this.joinConfirmBtn.setState = 'disabled';
                this.joinConfirmBtn.enabled = false;
            }
            else {
                this.joinConfirmBtn.setState = 'up';
                this.joinConfirmBtn.enabled = true;
            }
        }

        private pwdRoomID: string = '';

        /** 发送进入密码房间请求 */
        public reqEnterPwd()
        {
            let txt = this.joinInput.text;
            let exp = /\d{6}/;
            if (!txt || txt == '' || txt.length != 6 || !exp.test(txt)) {
                this.showRedMsg('房间密码错误');
            }
            else {
                ClubController.getInstance().sendNotification(NotifyConst.Notify_Baccarat_EnterPwd, [this.pwdRoomID, txt]);
            }
        }

        /** 弹出（红、绿）提示框 */
        public showRedMsg(msg: string)
        {
            var group = this["redMsgGroup"];
            this["redMsgTxt"].text = msg;
            CTween.removeTweens(group);
            group.alpha = 1;
            group.visible = true;
            // CTween.get(group).wait(1000).to({ alpha: 0 }, 2000).call(() =>
            // {
            //     group.visible = false;
            // })
            CTweenManagerController.getInstance().startCTween(2,[group]);
        }

        /** 显示密码框 */
        public showPwd(roomID: string)
        {
            // this.txtPwd.visible = true;
            CTweenManagerController.getInstance().startCTween(1,[this.txtPwd,this.pwGroup]);
            LayerManager.getInstance().addUI(this.txtPwd, enums.LayerConst.LAYER_TOP);
            this.joinInput.text = '';
            this.pwdRoomID = roomID;
        }

        public hidePwd(): void
        {
            this.addChild(this.txtPwd);
            // this.txtPwd.visible = false;
            CTweenManagerController.getInstance().startCTween(1,[this.txtPwd,this.pwGroup],false);
        }

        /** 执行某个item的方法 */
        public runItemFuc(roomID: string, fucName: string, params: any = null)
        {
            if (this.gameIDList) {
                for (let i = 0; i < this.gameIDList.dataProvider.length; i++)
                    if (this.gameIDList.getElementAt(i)) {
                        if (this.gameIDList.getElementAt(i)["data"] == roomID) {
                            this.gameIDList.getElementAt(i)[fucName](params);
                        }
                    }
            }
        }

        /** 通过souresID执行所有使用这个souresID（同一个视频源）的方法 */
        public updataItemFuc(souresID: string, fucName: string, params: any = null)
        {
            let arr = ClubModel.getInstance().getTheClubRooms();
            if (arr && arr.length) {
                for (let i = 0; i < arr.length; i++) {
                    let newSouresID = ClubModel.getInstance().roomIDTosouceID(arr[i]);
                    if (newSouresID == souresID) {
                        this.runItemFuc(arr[i], fucName, params)
                    }
                }
            }
        }


        // 当尺寸发生变化时
        public onStageResize(evt: egret.Event): void
        {
            super.onStageResize(evt);
            if (this.gameIDList) {
                for (let i = 0; i < this.gameIDList.dataProvider.length; i++)
                    if (this.gameIDList.getElementAt(i)) {
                        this.gameIDList.getElementAt(i)["setContenWH"](StageUtil.width);
                    }
            }
        }
        /** 列表上拉刷新loading*/
        protected listLoader: ListLoader;
        private commonArr: Array<any> = [];
        private privateArr: Array<any> = [];
        private allArr: Array<any> = [];
        /** 刷新List数据 */
        public updataList()
        {
            this.deskData = null;
            this.deskData = new eui.ArrayCollection();
            let pageNum = 10;
            let listData = ClubModel.getInstance().getTheClubRooms();

            let privateArrN: Array<any> = [];
            let commonArrN: Array<any> = [];
            if (listData && listData.length) {
                for (let i = 0; i < listData.length; i++) {
                    let locked = ClubModel.getInstance().getlockBool(listData[i]);
                    if (locked == true) {
                        privateArrN.push(listData[i]);
                    } else {
                        commonArrN.push(listData[i]);
                    }
                }
            }
            //俱乐部的全部房间
            let arr = listData.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            //私人房
            let arrP = privateArrN.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            //普通房
            let arrC = commonArrN.slice((this.pageIndex - 1) * pageNum, this.pageIndex * pageNum);
            let arrNum;
            switch (this.roomType) {
                case 0:
                    arrNum = listData.length;
                    if (arr.length >= 0) {
                        this.allArr = arr;
                        this.deskData.source = this.allArr;
                        this.deskData.refresh();
                    }
                    break;
                case 1:
                    arrNum = commonArrN.length;
                    if (arrC.length >= 0) {
                        this.commonArr = arrC;
                        this.deskData.source = this.commonArr;
                        this.deskData.refresh();
                    }
                    break;
                case 2:
                    arrNum = privateArrN.length;
                    if (arrP.length >= 0) {
                        this.privateArr = arrP;
                        this.deskData.source = this.privateArr;
                        this.deskData.refresh();
                    }
                    break;
            }
            if (this.pageIndex * pageNum >= arrNum) {
                this.listLoader.setAllLoaded();
            } else {
                this.listLoader.setLoadComplete();
            }
            this.gameIDList.dataProvider = this.deskData;
            this.gameIDList.validateNow();
            if (listData && listData.length) {
                this.label_HaveNothing.visible = false;
            }
            else {
                this.label_HaveNothing.visible = true;
            }
        }
        private _pageIndex: number = 1;
        private get pageIndex(): number
        {
            return this._pageIndex;
        }
        private set pageIndex(v: number)
        {
            this._pageIndex = v;
            if (this._pageIndex == 0) {
                this._pageIndex = 1;
            }
            this.updataList();
        }

        /** 上拉加载*/
        public pullUpRefreshList(): void
        {
            this.pageIndex--;
        }

        /** 下拉加载*/
        public pullDownRefreshList(): void
        {
            this.pageIndex++;
        }

        //是否有房间
        private isHaveRoom(arr: Array<any>): void
        {
            if (!arr || !arr.length || arr.length == 0) {
                this.label_HaveNothing.visible = true;
            }
            else {
                this.label_HaveNothing.visible = false;
            }
        }

        public dispose()
        {
            this.hidePwd();
            this.deskData = null;
            this.gameIDList = null;
            this.listLoader.dispose();
            this.listLoader = null;
            CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }
    }
}