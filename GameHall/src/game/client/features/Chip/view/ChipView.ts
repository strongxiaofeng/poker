// module game {

//     /** 筹码列表显示对象
//      *  @desc 在父级UI中调整位置时尽量使用left属性以免单例同时具有left与right属性值导致位置显示错误 - xucheng@20170206
//      */
// 	export class ChipView extends BaseUI {

// 		public constructor() {
// 			super();
// 			if (GlobalConfig.isMobile) {
// 				this.skinName = enums.SystemPath.skin_path + "chip/ChipViewSkin.exml";
// 			} else {
// 				this.skinName = enums.SystemPath.skin_path + "chip/HorChipViewSkin.exml";
// 			}
// 		}

// 		/** 单例对象 */
// 		private static instance: ChipView;

// 		/** 获取单例 */
// 		public static getInstance(): ChipView {
// 			if (ChipView.instance == null) {
// 				ChipView.instance = new ChipView();
// 			}
// 			return ChipView.instance;
// 		}

// 		// -------------------------------- 皮肤组件声明 --------------------------------

// 		/** 主容器 */
// 		private container: eui.Group
// 		/** 向前按钮 */
// 		private upBtn: eui.Button;
// 		/** 向后按钮 */
// 		private downBtn: eui.Button;
// 		private scrollView: eui.Scroller;
// 		private chipList: eui.List;
// 		private dataList: eui.ArrayCollection;
// 		private currentItemRender: ChipItemRender;
// 		private commonChipMode: ChipModel;
// 		/** 自定义筹码容器 */
// 		private customGroup: eui.Group;
// 		/** 自定义筹码组件 */
// 		private customChip: CustomChipItem;

// 		private selectPoint: number;

// 		// -------------------------------- 重写父类函数 --------------------------------		

// 		/** 当舞台尺寸发生变化,需被子类继承 */
// 		public onStageResize(evt: egret.Event): void {
// 			//这里故意去掉变化，因为这是一个公共控件，他的变化通过父类来控制
// 			super.onStageResize(evt);
// 			// if (GlobalConfig.isMobile) this.height = StageUtil.height;
// 			// egret.setTimeout(this.delayRender, this, 30);
// 		}

// 		/** 初始化组件,需被子类继承 */
// 		protected initComponent(): void {
// 			super.initComponent();
// 			this.customChip = new CustomChipItem();
// 			this.customGroup.addChild(this.customChip);
// 			this.dataList = new eui.ArrayCollection();
// 			this.commonChipMode = ChipModel.getInstance();
// 			this.chipList.itemRenderer = ChipItemRender;
// 			this.chipList.useVirtualLayout = false;
// 			this.scrollView.verticalScrollBar = null;
// 			this.scrollView.horizontalScrollBar = null;
// 			this.selectPoint = 0;
// 		}

// 		/** 初始化数据 */
// 		protected initData(): void {
// 		}

// 		/** 注册事件监听器 */
// 		protected initListeners(): void {
// 			this.registerEvent(this.upBtn, egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
// 			this.registerEvent(this.downBtn, egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
// 			this.registerEvent(this.chipList, eui.ItemTapEvent.ITEM_TAP, this.onClickListItem, this);
// 			this.registerEvent(this.customChip, egret.TouchEvent.TOUCH_TAP, this.onClickCustom, this);
// 			if (!GlobalConfig.isMobile) this.registerEvent(this, mouse.MouseEvent.MOUSE_OVER, this.registWheel, this);
// 			if (!GlobalConfig.isMobile) this.registerEvent(this, mouse.MouseEvent.MOUSE_OUT, this.registWheel, this);
// 		}

// 		private registWheel(evt: egret.Event): void {
// 			if (evt.type == mouse.MouseEvent.MOUSE_OUT) {
// 				MouseWheelManager.getInstance().unregisterWheel(this);
// 			} else {
// 				MouseWheelManager.getInstance().registerWheel(this.chipList, MouseWheelManager.ScrollH, this, 80);
// 			}
// 		}

// 		/** 子类需要重写 */
// 		public listNotification(): Array<string> {
// 			return [
// 				NotifyConst.Notify_NumKeyBoard_Close,
// 			];
// 		}

// 		/** 子类需要重写 */
// 		public handleNotification(type: string, body: any): void {
// 			switch (type) {
// 				case NotifyConst.Notify_NumKeyBoard_Close:
// 					this.selectChip(-1);
// 					break;
// 			}
// 		}

// 		// -------------------------------- 初始化 --------------------------------

// 		/** 手动改变控件位置 for mobile only */
// 		public resizeLayout(bottom: number, top: number): void {
// 			if (GlobalConfig.isMobile) {
// 				this.height = StageUtil.height;
// 				this.container.top = top;
// 				this.container.height = (StageUtil.height - top - bottom) / this.scaleNum;
// 				// this.container.height = StageUtil.height * (1080 - bottom - top) / 1080;
// 				// this.scaleY = 1080 / StageUtil.height;
// 				// if (bottom < 100) this.container.height = this.container.height / this.scaleY;
// 			}
// 			egret.setTimeout(this.delayRender, this, 100);
// 		}

// 		/** 手动设置的scale值 for mobile only */
// 		private scaleNum: number = 1;

// 		/** 手动改变控件scale for mobile only */
// 		public setScale(scale: number): void {
// 			if (!GlobalConfig.isMobile) { return; }
// 			this.scaleNum = scale || 1;
// 			this.scaleX = this.scaleNum;
// 			this.scaleY = this.scaleNum;
// 		}

// 		/** 设置需要显示的筹码数量 for PC only */
// 		public setNum(num: number): void {
// 			if (GlobalConfig.isMobile) { return; }
// 			let w = 650;
// 			switch (num) {
// 				case 5:
// 					w = 650;
// 					break;
// 				case 6:
// 					w = 760;
// 					break;
// 			}
// 			// this.scrollView.width = w;
// 			this.width = w + 100;
// 		}

// 		private getChipItem(money: number): ChipItemData {
// 			let item = new ChipItemData();
// 			let source: string;
// 			let type: number = 2;
// 			let num: number;
// 			num = money / 100;
// 			source = ChipConstType.getChipSource(money, 0);
// 			switch (num) {
// 				case 100000:
// 				case 200000:
// 				case 300000:
// 				case 500000:
// 				case 1000000:
// 				case 2000000:
// 				case 3000000:
// 				case 5000000:
// 				case 10000000:
// 				case 20000000:
// 				case 30000000:
// 				case 50000000:
// 				case 100000000:
// 				case 200000000:
// 				case 300000000:
// 				case 500000000:
// 					type = 2;
// 					break;
// 				default:
// 					type = 1;
// 					break;
// 			}
// 			item.count = money;
// 			item.type = type;
// 			item.source = source;
// 			return item;
// 		}

// 		/** 设置chip数据 */
// 		public setChipData(paramsList: Array<number>, pdir: string = "left", spe?): void {
// 			this.customChip.setData({
// 				count: 0,
// 				source: "chips_pic_edit_png",
// 				type: 3,
// 				pdir: pdir,
// 				spe: spe
// 			});
// 			if (paramsList == null) {
// 				paramsList = GlobalVariable.availbleChips;
// 			}
// 			this.dataList.removeAll();
// 			this.chipList.dataProvider = null;
// 			/**是否保留上次的选中筹码*/
// 			var isRecoverLastSelect: boolean = false;
// 			let chipItem: ChipItemData;
// 			//手机版
// 			if (GlobalConfig.isMobile) {
// 				for (let i: number = paramsList.length - 1; i >= 0; i--) {
// 					chipItem = this.getChipItem(paramsList[i]);
// 					this.dataList.addItem(chipItem);
// 					if (this.commonChipMode.currentSelectChipData
// 						&& this.commonChipMode.currentSelectChipData.count > 0
// 						&& paramsList[i] /*/ 100*/ == this.commonChipMode.currentSelectChipData.count) {
// 						isRecoverLastSelect = true;
// 					}
// 				}
// 				//恢复自定义筹码
// 				// if (ChipModel.getInstance().currentSelectChipData
// 				// 	&& ChipModel.getInstance().isCurrentModify) {
// 				// 	isRecoverLastSelect = true;
// 				// }
// 				if (!isRecoverLastSelect) this.commonChipMode.currentSelectChipData = this.dataList.getItemAt(this.dataList.length - 1);
// 			}
// 			//电脑版和手机版的排序不一样
// 			else {
// 				for (let i: number = 0; i < paramsList.length; i++) {
// 					chipItem = this.getChipItem(paramsList[i]);
// 					this.dataList.addItem(chipItem);
// 					if (this.commonChipMode.currentSelectChipData
// 						&& this.commonChipMode.currentSelectChipData.count > 0
// 						&& paramsList[i] /*/ 100*/ == this.commonChipMode.currentSelectChipData.count) {
// 						isRecoverLastSelect = true;
// 					}
// 				}
// 				//恢复自定义筹码
// 				// if (ChipModel.getInstance().currentSelectChipData
// 				// 	&& ChipModel.getInstance().isCurrentModify) {
// 				// 	isRecoverLastSelect = true;
// 				// }
// 				if (!isRecoverLastSelect) this.commonChipMode.currentSelectChipData = this.dataList.getItemAt(0);
// 			}

// 			if (this.chipList != null) {
// 				this.chipList.dataProvider = this.dataList;
// 				this.chipList.validateNow();
// 				setTimeout(() => {
// 					this.delayRender();
// 				}, 100, this);
// 			}

// 			// if (!isRecoverLastSelect && this.chipList) {
// 			// 	//第一次进房间的时候默认选中第一个
// 			// 	if (GlobalConfig.isMobile) {
// 			// 		if (this.chipList.numChildren >= 1) {
// 			// 			this.chipList.getElementAt(this.chipList.numChildren - 1)["setSelect"](true)
// 			// 		}
// 			// 	} else {
// 			// 		if (this.chipList.numChildren > 0) {
// 			// 			this.chipList.getElementAt(0)["setSelect"](true);
// 			// 		}
// 			// 	}
// 			// }
// 		}

// 		/** 延迟渲染 */
// 		private delayRender(): void {
// 			// (<eui.LinearLayoutBase>this.chipList.layout).gap = -5;
// 			if (GlobalConfig.isMobile) {
// 				this.scrollView.height = this.container.height - 200 - 80;
// 				this.downBtn.top = this.scrollView.height + 40;
// 				this.customGroup.top = this.scrollView.height + 80;
// 				this.customChip.width = 220;
// 				this.customChip.height = 200;
// 				this.customChip.verticalCenter = 0;
// 				this.customChip.horizontalCenter = 0;
// 			} else {
// 				this.height = 100;
// 				this.customChip.height = 100;
// 				this.customChip.width = 110;
// 				this.customChip.scaleY = 0.96;
// 				this.customChip.horizontalCenter = 0;
// 				this.customChip.verticalCenter = 0;
// 			}
// 		}

// 		/** 选中满足最小限额的筹码
// 		 *  @param point - 最低限额金钱
// 		 */
// 		public selectMinChip(point: number, isCustom: boolean = false): void {
// 			setTimeout(() => {
// 				if (!isCustom) {
// 					this.selectPoint = point >= this.selectPoint ? point : this.selectPoint;
// 				} else {
// 					this.selectPoint = point;
// 				}
// 				let index: number = this.chipList.numElements - 1;
// 				if (GlobalConfig.isMobile) {
// 					for (let i = this.chipList.numElements - 1; i >= 0; i--) {
// 						if ((<ChipItemRender>this.chipList.getElementAt(i)).data.count >= this.selectPoint) {
// 							this.selectPoint = (<ChipItemRender>this.chipList.getElementAt(i)).data.count;
// 							index = i;
// 							break;
// 						}
// 					}
// 					this.selectChip(index);
// 					this.showSelectedChip(this.chipList.numElements - 1 - index);
// 				} else {
// 					for (let i = 0; i < this.chipList.numElements; i++) {
// 						if ((<ChipItemRender>this.chipList.getElementAt(i)).data.count >= this.selectPoint) {
// 							this.selectPoint = (<ChipItemRender>this.chipList.getElementAt(i)).data.count;
// 							index = i;
// 							break;
// 						}
// 					}
// 					this.selectChip(index);
// 					this.showSelectedChip(index);
// 				}
// 			}, 100, this);
// 		}

// 		/** 将选中的筹码展示在列表中心 */
// 		private showSelectedChip(index: number): void {
// 			if (GlobalConfig.isMobile) {
// 				if (this.chipList.contentHeight > this.scrollView.height) {
// 					let h = this.chipList.contentHeight * (this.dataList.length - 1 - index) / (this.dataList.length - 1);
// 					let sV = h + 100 > this.scrollView.height ? h + 100 - this.scrollView.height : 0;
// 					sV = sV > this.chipList.contentHeight - this.scrollView.height ? this.chipList.contentHeight - this.scrollView.height : sV;
// 					egret.Tween.get(this.chipList).to({ scrollV: sV }, 10);
// 				}
// 			}
// 			else {
// 				if (this.chipList.contentWidth > this.scrollView.width) {
// 					let h = this.chipList.contentWidth * index / (this.dataList.length - 1);
// 					let sH = h + 100 > this.scrollView.width ? h + 100 - this.scrollView.width : 0;
// 					sH = sH > this.chipList.contentWidth - this.scrollView.width ? this.chipList.contentWidth - this.scrollView.width : sH;
// 					egret.Tween.get(this.chipList).to({ scrollH: sH }, 10);
// 				}
// 			}
// 		}

// 		/** 选中某个筹码 */
// 		private selectChip(index: number): void {
// 			this.customChip.setSelect(false);
// 			for (let i: number = 0; i < this.chipList.numElements; i++) {
// 				if (this.chipList.getElementAt(i) != null) {
// 					if (index == i) {
// 						(<ChipItemRender>this.chipList.getElementAt(i)).setSelect(true);
// 						ChipModel.getInstance().currentSelectChipData = (<ChipItemRender>this.chipList.getElementAt(i)).data;
// 						ChipModel.getInstance().isCurrentModify = false;
// 						this.selectPoint = (<ChipItemRender>this.chipList.getElementAt(i)).data.count;
// 					} else {
// 						this.chipList.getElementAt(i)["setSelect"](false);
// 					}
// 				}
// 			}
// 			if (index < 0 || index > this.dataList.length - 1) {
// 				ChipModel.getInstance().currentSelectChipData = this.customChip.data;
// 				ChipModel.getInstance().isCurrentModify = true;
// 				this.customChip.setSelect(true);
// 				this.selectPoint = 0;
// 			}
// 		}

// 		/** 当按钮点击结束 */
// 		private onTouchEnd(evt: egret.TouchEvent): void {
// 			switch (evt.target) {
// 				case this.downBtn:
// 					if (GlobalConfig.isMobile) {
// 						if (this.chipList.height >= this.chipList.contentHeight) {
// 							break;
// 						}
// 						if (this.chipList.scrollV > 180) {
// 							egret.Tween.get(this.chipList).to({ scrollV: this.chipList.scrollV - 180 }, 500);
// 						} else {
// 							egret.Tween.get(this.chipList).to({ scrollV: 0 }, 500);
// 						}
// 					}
// 					else {
// 						if (this.chipList.width >= this.chipList.contentWidth) {
// 							break;
// 						}
// 						if (this.chipList.scrollH > 180) {
// 							egret.Tween.get(this.chipList).to({ scrollH: this.chipList.scrollH - 180 }, 500);
// 						} else {
// 							egret.Tween.get(this.chipList).to({ scrollH: 0 }, 500);
// 						}
// 					}
// 					break;
// 				case this.upBtn:
// 					if (GlobalConfig.isMobile) {
// 						if (this.chipList.height >= this.chipList.contentHeight) {
// 							break;
// 						}
// 						if (this.chipList.scrollV < this.chipList.contentHeight - this.scrollView.height - 180) {
// 							egret.Tween.get(this.chipList).to({ scrollV: this.chipList.scrollV + 180 }, 500);
// 						} else {
// 							egret.Tween.get(this.chipList).to({ scrollV: this.chipList.contentHeight - this.scrollView.height }, 500);
// 						}
// 					}
// 					else {
// 						if (this.chipList.width >= this.chipList.contentWidth) {
// 							break;
// 						}
// 						if (this.chipList.scrollH < this.chipList.contentWidth - this.scrollView.width - 180) {
// 							egret.Tween.get(this.chipList).to({ scrollH: this.chipList.scrollH + 180 }, 500);
// 						} else {
// 							egret.Tween.get(this.chipList).to({ scrollH: this.chipList.contentWidth - this.scrollView.width }, 500);
// 						}
// 					}

// 					break;
// 			}
// 		}

// 		/** 当点击了列表中某个条目 */
// 		private onClickListItem(evt: eui.ItemTapEvent): void {
// 			if (GlobalConfig.isSoundNew) {
// 				SoundPlayerNew.playEffect(SoundConstNew.chips);
// 			}
// 			else {
// 				SoundPlayer.playEffect(SoundConst.chips, 1);
// 			}

// 			this.currentItemRender = <ChipItemRender>evt.itemRenderer;
// 			if (this.currentItemRender != null) {
// 				DebugUtil.debug(LogUserActions.CLICK.replace("%s", "chip " + this.currentItemRender.data.count).replace("%d", "chip list"), LogConst.LOGTYPE_USER_ACTION);
// 				ChipModel.getInstance().currentSelectChipData = this.currentItemRender.data;
// 				ChipModel.getInstance().isCurrentModify = false;
// 				for (let i: number = 0; i < this.chipList.numElements; i++) {
// 					if (this.chipList.getElementAt(i) != null) {
// 						if (this.currentItemRender == this.chipList.getElementAt(i)) {
// 							this.currentItemRender.setSelect(true);
// 							this.selectPoint = this.currentItemRender.data.count;
// 						} else {
// 							this.chipList.getElementAt(i)["setSelect"](false);
// 						}
// 					}
// 				}
// 				this.customChip.setSelect(false);
// 			}
// 		}

// 		/** 点击了自定义筹码 */
// 		private onClickCustom(event: egret.TouchEvent): void {
// 			if (GlobalConfig.isGuest) {
// 				MediatorManager.tipMsg(LanguageUtil.translate("g_warning_visitors"),0xFF0000);
// 				return;
// 			}
// 			if (GlobalConfig.isSoundNew) {
// 				SoundPlayerNew.playEffect(SoundConstNew.chips);
// 			}
// 			else {
// 				SoundPlayer.playEffect(SoundConst.chips, 1);
// 			}

// 			DebugUtil.debug(LogUserActions.CLICK.replace("%s", "chip " + 0).replace("%d", "chip list"), LogConst.LOGTYPE_USER_ACTION);
// 			ChipModel.getInstance().currentSelectChipData = this.customChip.data;
// 			ChipModel.getInstance().isCurrentModify = true;
// 			for (let i: number = 0; i < this.chipList.numElements; i++) {
// 				if (this.chipList.getElementAt(i) != null) {
// 					this.chipList.getElementAt(i)["setSelect"](false);
// 				}
// 			}
// 			if (event.target.parent &&
// 				(event.target.parent == this.customChip.penBtn
// 					|| event.target == this.customChip.penBtn)) {
// 				this.customChip.setSelect(true, true);
// 			} else {
// 				this.customChip.setSelect(true);
// 			}
// 			this.selectPoint = 0;
// 		}

// 	}

// 	class ChipItemData {
// 		public count;
// 		public source;
// 		public type;
// 	}
// }