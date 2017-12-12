module game {
    export class roomManagerUI1 extends roomManagerBaseUI {
        /** scroller */
        public listScroller: eui.Scroller;
        /** List */
        public roomList: eui.List;
        /** List数据源 */
        public roomListData: eui.ArrayCollection;
        public roomlistCommon: eui.ArrayCollection;
        public roomlistPrivate: eui.ArrayCollection;
        private commonArr: Array<any> = [];
        private privateArr: Array<any> = [];
        private allArr: Array<any> = [];

        public roomCardTxt:eui.Label;

        //列表为空时
        private noListGroup:eui.Group;
        private creatNowBtn:eui.AButton;
        //user info
        // private img_headPicture: eui.Image;
        private userName: eui.ALabel;
        /**btn*/
        private allRoom: eui.AButton;
        private commonRoom: eui.AButton;
        private privateRoom: eui.AButton;
        /** 列表上拉刷新loading*/
        protected listLoader: ListLoader;
        /**房间类型
         * 0全部/1普通/2私有
        */
        protected roomType: number = 0;
        public constructor() {
            super();
            this.listLoader = ListLoader.getInstance();
            this.skinName = "resource/skins/game_skins/mobile/homeOwner/roomManager/roomManager.exml";
        }

        protected setRoomNum(num: number): void {
            this.userName.text = LanguageUtil.translate("房间数量") + "：" + NumberUtil.getSplitNumStr(num * 100);
        }

        /**筛选房间名*/
        protected chooseRoomName(): void {
            let pageNum = 10;
            //俱乐部的全部房间
            let listData = ClubModel.getInstance().getTheClubAllRooms();
            this.setRoomNum(listData.length||0);
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
                    if(listData.length == 0){
                        this.noList(true);
                    }else{
                        this.noList(false);
                    }
                    if (arr.length >= 0) {
                        this.allArr = arr;
                        this.roomListData.source = this.allArr;
                        this.roomListData.refresh();
                    }
                    break;
                case 1:
                    arrNum = commonArrN.length;
                    if(commonArrN.length == 0){
                        this.noList(true);
                    }else{
                        this.noList(false);
                    }
                    if (arrC.length >= 0) {
                        this.commonArr = arrC;
                        this.roomListData.source = this.commonArr;
                        this.roomListData.refresh();
                    }
                    break;
                case 2:
                    arrNum = privateArrN.length;
                    if(privateArrN.length == 0){
                        this.noList(true);
                    }else{
                        this.noList(false);
                    }
                    if (arrP.length >= 0) {
                        this.privateArr = arrP;
                        this.roomListData.source = this.privateArr;
                        this.roomListData.refresh();
                    }
                    break;
            }
            if (this.pageIndex * pageNum >= arrNum) {
                this.listLoader.setAllLoaded();
            } else {
                this.listLoader.setLoadComplete();
            }
        }
        private _pageIndex: number = 1;
        private get pageIndex(): number {
            return this._pageIndex;
        }
        private set pageIndex(v: number) {
            this._pageIndex = v;
            if (this._pageIndex == 0) {
                this._pageIndex = 1;
            }
            this.chooseRoomName();
        }

        /** 上拉加载*/
        public pullUpRefreshList(): void {
            this.pageIndex--;
        }

        /** 下拉加载*/
        public pullDownRefreshList(): void {
            this.pageIndex++;
        }
        /**注册事件*/
        protected initListener(): void {
            this.registerEvent(this.allRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.commonRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.privateRoom, egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.registerEvent(this.creatNowBtn, egret.TouchEvent.TOUCH_TAP, this.openCreateRoom, this);
        }

        /** 点击事件 */
        protected handleTap(event: egret.TouchEvent): void {
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
        }
        /**列表为空*/
        private noList(isAir:boolean):void{
            this.noListGroup.visible = isAir;
        }
        /**打开创建房间*/
        private openCreateRoom():void{
            MediatorManager.openMediator(Mediators.Mediator_CreateRoomInfo,"baccarat");
        }
        /** 初始化 */
        public initSetting() {
            // this.initUserDate();
            this.initListener();
            this.roomListData = new eui.ArrayCollection();
            this.roomList.itemRenderer = roomManagerItem;
            this.roomList.dataProvider = this.roomListData;
            // this.roomListData.source = ClubModel.getInstance().getTheClubAllRooms().slice(0, 10);
            this.roomList.useVirtualLayout = false;
            this.roomListData.refresh();
            this.roomList.validateNow();
            this.listScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            // this.listScroller.throwSpeed = 0;
            this.allRoom.setState = "down";
            this.commonRoom.setState = "up";
            this.privateRoom.setState = "up";
            this._pageIndex = 1;
        }
        // /**初始化用户信息*/
        // private initUserDate(): void {
        //     this.userName.text = PersonalInfoModel.getInstance().nick;
        //     if (PersonalInfoModel.getInstance().avatar) {
        //         this.img_headPicture.source = PersonalInfoModel.getInstance().avatar;
        //     }
        // }
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        public onMediatorCommand(type: roomManagerCommands, params: any = null): void {
            switch (type) {
                // 初始化监听
                case roomManagerCommands.initListener:
                    this.listLoader.setList(this.listScroller, this.pullDownRefreshList, this, this.pullUpRefreshList);
                    break;
                // setting数据发生改变（限额，房间名，是否有密码等）
                case roomManagerCommands.Notify_setting:
                    this.runItemFuc(params, "initData");
                    this.runItemFuc(params, "updatStage");
                    break;
                // 更新俱乐部名列表
                case roomManagerCommands.Notify_clubRoomArr:
                    // this.isHaveRoom(params);
                    // this.chooseRoomName();
                    this.pageIndex = this.pageIndex;
                    break;
                case roomManagerCommands.updateRoadMap:
                    this.runItemFuc(params, "updataRoadData");
                    break;
                case roomManagerCommands.roomCardNum:
                    this.roomCardTxt.text = `房卡：${params}`
                    break;
                case roomManagerCommands.Notify_info:
                    this.runItemFuc(params, "getOnlineNum");
                    break;
                    
            }
        }

        public updataList() {
            switch (this.roomType) {
                case 0:
                    this.roomListData.source = this.allArr;
                    break;
                case 1:
                    this.roomListData.source = this.commonArr;
                    break;
                case 2:
                    this.roomListData.source = this.privateArr;
                    break;
            }
            this.roomListData.refresh();
        }


        /** 执行某个item的方法 */
        public runItemFuc(roomID: string, fucName: string, params: any = null) {
            if (this.roomList) {
                for (let i = 0; i < this.roomList.dataProvider.length; i++)
                    if (this.roomList.getElementAt(i)) {
                        if (this.roomList.getElementAt(i)["data"] == roomID) {
                            this.roomList.getElementAt(i)[fucName](params);
                        }
                    }
            }
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            this.listLoader.dispose();
            this.listLoader = null;
            super.dispose();
        }
    }
}