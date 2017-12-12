module game
{
    /**
     * 俱乐部房间列表UI组件
     * by 郑戎辰
     */
    export class PCMultiBaccUI1 extends MultiBaccBaseUI
    {
        public videoInfoGroup:eui.Group;
        public infoGroup:eui.Group;
        /** 放所有元素的group */
        public bodyGroup: eui.Group;

        /** 右边选择视频 */
        public souresScroller: eui.Scroller;
        public souresList: eui.List;
        public souresData: eui.ArrayCollection;
        public roomNameLabel: eui.ALabel;
        public souresPlayerName: eui.ALabel;

        /** 右下角消息 */
        public recordScroller: eui.Scroller;
        public recordList: eui.BaseList;
        public msgData: Array<any>;
        private videoGroup: eui.Group;

        public msgArrData: Array<any> = [];
        public msgMax: number = 0;

        private xplayer: XPlayer;

        private setTimeNum: any;
        private updataSetTimeNum: any;

        public constructor(isGuide: boolean = false)
        {
            super(isGuide);
        }

        public initSetting()
        {
            super.initSetting();
            if(this._isGuide){
                
                this.souresData = new eui.ArrayCollection();
                for(let i = 0;i < 12;i++)
                {
                    this.souresData.addItem({"num":i});
                }

                this.souresList.itemRenderer = souresItem;
                this.souresList.useVirtualLayout = false;
                this.souresList.dataProvider = this.souresData;
                this.souresData.refresh();
                this.souresScroller.scrollPolicyH = eui.ScrollPolicy.OFF;

                this.msgData = [[["bet",90000000,"百家乐1号房"],90000000],
                [["bet",8000000,"百家乐3号房"],90000000],
                [["payout",100000,"百家乐1号房"],90000000],
                [["bet",2000000,"百家乐2号房"],90000000],
                [["payout",80000000,"百家乐3号房"],90000000],
                [["bet",100000,"百家乐1号房"],90000000],
                [["bet",5000000,"百家乐3号房"],90000000],
                [["payout",100000,"百家乐5号房"],90000000]];
                this.recordList.itemRenderer = msgItem;
                this.recordScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                this.recordList.mouseWheelEnable = true;

                this.recordList.addItems(this.msgData);
                return;
            }
            this.setSouresList();
            this.initMsgList();
            let arr = ClubModel.getInstance().multiRoomList;
            if (arr && arr['length']) {
                this.setTimeNum = setTimeout(() =>
                {
                    let e: any = {};
                    e['item'] = { num: 0, roomID: arr[0] };
                    e['itemRenderer'] = this.souresList.getElementAt(0);
                    this.onListItem(e);
                    this.setTimeNum = null;
                }, this, 1000)
            }

        }

        public initListener()
        {
            super.initListener();
            this.registerEvent(this.souresList, eui.ItemTapEvent.ITEM_TAP, this.onListItem, this);
        }

        private clearSouresItemState(): void
        {
            if (this.souresList.numElements > 0) {
                for (let i = this.souresList.numElements - 1; i >= 0; i--) {
                    let item = this.souresList.getChildAt(i) as souresItem;
                    if (item) {
                        item.select(false);
                    }
                }
            }
        }

        private onListItem(e: eui.ItemTapEvent): void
        {
            this.closeVideo();
            this.clearSouresItemState();
            let data = e.item;
            let item = <souresItem>e.itemRenderer;
            item.select(true);
            this.roomNameLabel.text = ClubModel.getInstance().getRoomName(data.roomID);
            this.souresPlayerName.text = data.num + 1 + '号桌';

            // let source = ClubModel.getInstance().getSourceToSourceID(data.soureceID);
            let source = ClubModel.getInstance().getRoomSource(data.roomID);
            let pt = this.videoGroup.localToGlobal(-60, 0);
            StreamVideo.getInstance().connectByUrl(this, "video:" + GlobalConfig.mediaCdn, this.onVideoConnected, this.onVideoConnectError, source.video, pt);
            StreamVideo.getInstance().absolute = true;
        }

        private onVideoConnected(): void
        {
            StreamVideo.getInstance().popVideo(true);
            let pt = this.videoGroup.localToGlobal(0, 0);
            StreamVideo.getInstance().setPos(pt.x, pt.y, this.videoGroup.width, this.videoGroup.height - 40, true);
        }

        private onVideoConnectError(): void
        {
        }

        private closeVideo(): void
        {
            StreamVideo.getInstance().popVideo(false);
            StreamVideo.getInstance().close(this.xplayer);
            this.xplayer = null;
            MediatorManager.closeMediator(Mediators.Mediator_VideoLoading.name);
        }
        /**
		 * 收到mediator的通知，每个UI要复写这个方法
		 * */
        public onMediatorCommand(type: any, params: any = null): void
        {
            super.onMediatorCommand(type, params)
            switch (type) {

            }
        }

        /** 是否显示列表为空 */
        public showListMsg(b: boolean)
        {
            if (b) {
                this.label_HaveNothing.visible = true;
                this.bodyGroup.visible = false;
            }
            else {
                this.label_HaveNothing.visible = false;
                this.bodyGroup.visible = true;
            }
        }

        /** 设置视频List */
        public setSouresList()
        {
            let arr = ClubModel.getInstance().multiRoomList;
            let sourceArr = [];
            if (arr && arr['length']) {
                for (let i = 0; i < arr.length; i++) {
                    // let soureceID = ClubModel.getInstance().getRoomSourceID(arr[i]);
                    // sourceArr.push({ num: i, soureceID: soureceID })
                    sourceArr.push({ num: i, roomID: arr[i] })
                }
                this.souresData = new eui.ArrayCollection(sourceArr);
                // this.souresData.source = sourceArr;
                this.souresList.itemRenderer = souresItem;
                this.souresList.useVirtualLayout = false;
                this.souresList.dataProvider = this.souresData;
                this.souresData.refresh();
                this.souresScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
        }

        /** 刷新视频List */
        public upDataSouresList()
        {
            this.souresData = null;
            this.souresData = new eui.ArrayCollection();
            let arr = ClubModel.getInstance().multiRoomList;
            let sourceArr = [];
            if (arr && arr['length']) {
                for (let i = 0; i < arr.length; i++) {
                    // let soureceID = ClubModel.getInstance().getRoomSourceID(arr[i]);
                    // sourceArr.push({ num: i, soureceID: soureceID })
                    sourceArr.push({ num: i, roomID: arr[i] })
                }
            }
            this.souresData.source = sourceArr;
            this.souresList.dataProvider = this.souresData;
            this.souresData.refresh();

            if (this.updataSetTimeNum) {
                clearTimeout(this.updataSetTimeNum);
            }
            this.updataSetTimeNum = setTimeout(() =>
            {
                let e: any = {};
                e['item'] = { num: 0, roomID: arr[0] };
                e['itemRenderer'] = this.souresList.getElementAt(0);
                this.onListItem(e);
                this.updataSetTimeNum = null;
            }, this, 1000)
        }

        /** 设置右下角消息的list */
        public initMsgList()
        {
            this.msgData = [];
            this.recordList.itemRenderer = msgItem;
            this.recordScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            this.recordList.mouseWheelEnable = true;
        }

        /** 刷新消息List */
        public upDataMsgList(arr: Array<any>)
        {
            if (arr && arr['length']) {
                this.msgData = arr;
                this.recordList.addItems(arr);
            }
        }

        /** 有房间成功下注显示的通知 */
        public showOkeyBetMsg(msgArr: Array<any>)
        {
            if (msgArr && msgArr['length']) {
                if (msgArr[1] > this.msgMax) {
                    this.msgMax = msgArr[1]
                }
                for (let i = 0; i < this.msgArrData.length; i++) {
                    let arr = this.msgArrData[i];
                    arr[1] = this.msgMax
                }
                this.msgArrData.unshift([msgArr, this.msgMax]);
                this.recordList.removeAll();
                this.recordList.addItems(this.msgArrData);
            }
        }

        /** 执行soureList所有item的方法 */
        public runAllSoureceItemFuc(fucName: string, params: any = null)
        {
            if (this.souresList) {
                for (let i = 0; i < this.souresList.dataProvider.length; i++)
                    if (this.souresList.getElementAt(i)) {
                        this.souresList.getElementAt(i)[fucName](params);
                    }
            }
        }

        /** 执行soureList某个item的方法 */
        public runSoureceItemFuc(roomID: string, fucName: string, params: any = null)
        {
            if (this.souresList) {
                for (let i = 0; i < this.souresList.dataProvider.length; i++)
                    if (this.souresList.getElementAt(i)) {
                        if (this.souresList.getElementAt(i)["data"] == roomID) {
                            this.souresList.getElementAt(i)[fucName](params);
                        }
                    }
            }
        }

        public upDataMulitList()
        {
            BaccaratController.getInstance().sendMultiClubEnter(this.thePage).then(() =>
            {
                this.mulitList.removeAll();
                let arr = ClubModel.getInstance().multiRoomList;
                this.mulitList.addItems(arr);
                this.isHaveNextPage();
                this.runAllItemFuc('setIndexNum');
                this.upDataSouresList();
            })
        }

        public dispose(): void
        {
            this.closeVideo();
            if (this.setTimeNum) {
                clearTimeout(this.setTimeNum);
                this.setTimeNum = null;
            }
            if (this.updataSetTimeNum) {
                clearTimeout(this.updataSetTimeNum);
                this.updataSetTimeNum = null;
            }

            super.dispose();
        }
    }
}