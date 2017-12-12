module game
{

	export class CreateRoomInfoUI1 extends CreateRoomInfoBaseUI
	{

		/** 创建房间maingroup*/
		private MainGroup: eui.Group;
		/** 选择视频源按钮*/
		private videoBtn: eui.AButton;
		/**　视频资源名*/
		protected videoSource:eui.ALabel;
		/** 房间名*/
		private roomName:eui.EditableText;
		/** 普通房间按钮*/
		private ordinaryRoom: eui.AButton;
		/** 私人房间按钮*/
		private personalRoom: eui.AButton;
		/** 房间密码*/
		private roomKey: eui.ALabel;
		/** 私人俱乐部密码组*/
		private personalGroup: eui.Group;
		/** 是否免佣*/
		private isFree: eui.ToggleButton;
		/** 筹码金额*/
		private chipNum0:eui.ALabel;
		private chipNum1:eui.ALabel;
		private chipNum2:eui.ALabel;
		/** 筹码设置*/
		private chipNumEdit0:eui.EditableText;
		private chipNumEdit1:eui.EditableText;
		private chipNumEdit2:eui.EditableText;
		/** 确定按钮*/
		private sureBtn:eui.AButton;
		/** 限额*/
		private limit:any;
		/** 限额组*/
		private limitArr:any;
		/** 类型*/
		private type:any;
		/** 上一次设置的chip*/
		private chipArr:Array<any>;
		/** CWteeen*/
		private loadCircle:LoadCircle;
		/** 创建的模式*/
		private roomModel;
		/** 是否免佣*/
		private isfree:boolean;
		private showIsFree:eui.ALabel;
		/** 房间密码*/
		private key;
		/** 视频资源名变量*/
		private video;
		/** 房间名变量*/
		private nameText;
		/** 动画变量名 方便清除动画*/
		private CTweenObj:any;
		private numArr = ["0","1","2","3","4","5","6","7","8","9","."];
		public constructor(type)
		{
			super();
			this.skinName = "resource/skins/game_skins/mobile/homeOwner/createClubRoom/createRoomSkin.exml";
			this.type = type;
		}

		/**组件创建完成初始化数据等操作 */
        public initSetting(): void
		{
			super.initSetting();
        }

		/** 初始化UI*/
		protected initUI(): void
		{
			super.initUI();
			this.initInput();
			this.initMask();
			this.initcode();
			this.personalGroup.visible = false;
			this.sureBtn.enabled = false;
			this.initChip();
			this.personalRoom.setState = "down";
			this.ordinaryRoom.setState = "up";
			/** 显示过渡loading*/
			this.loadCircle = new LoadCircle();
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.verticalCenter = 0;
			this.loadCircle.start();
		}

		/** 初始化变量*/
		private initcode(): void
		{
			this.chipArr = [50, 10000, 1000000];
			this.nameText = "";
			this.video = "";
			this.key = "";
			this.isfree = true;
			this.showIsFree.text = LanguageUtil.translate(this.isfree?"global_btn_yes":"global_btn_no");
			this.roomModel = "public";
			this.CTweenObj = {};
			this.limitArr = [
				this["limit10"], this["limit11"], this["limit20"],
				this["limit21"], this["limit30"], this["limit31"],
				this["limit40"], this["limit41"], this["limit50"],
				this["limit51"],
			]
			this.getKey();
		}

		private initMask():void
		{
			for(let i = 1; i <= 5; i++)
			{
				this["mask" + i + 0].visible = false;
				this["mask" + i + 1].visible = false;
			}
		}

		/** 初始化输入框*/
		private initInput():void
		{
			for(let i = 1; i <= 5; i++)
			{
				this["limit" + i + 0].prompt = LanguageUtil.translate("global_lbl_min");
				this["limit" + i + 1].prompt = LanguageUtil.translate("global_lbl_max");
			}
		}

		/** 初始化筹码输入和显示*/
		private initChip():void
		{
			this.chipNumEdit0.text = NumberUtil.getSplitNumStr(this.chipArr[0]);
			this.chipNumEdit1.text = NumberUtil.getSplitNumStr(this.chipArr[1]);
			this.chipNumEdit2.text = NumberUtil.getSplitNumStr(this.chipArr[2]);
			this.chipNum0.text = NumberUtil.getSplitNumStr(this.chipArr[0], 1);
			this.chipNum1.text = NumberUtil.getSplitNumStr(this.chipArr[1], 1);
			this.chipNum2.text = NumberUtil.getSplitNumStr(this.chipArr[2], 1);
		}

		/** 注册事件*/
		protected initListener(mediator: CreateRoomInfoMediator): void
		{
			this.registerEvent(this.sureBtn, egret.TouchEvent.TOUCH_END, this.sendCreateRoom, this);
			this.registerEvent(this.isFree, egret.TouchEvent.TOUCH_TAP, this.tapIsFree, this);
			this.registerEvent(this.videoBtn, egret.TouchEvent.TOUCH_TAP, mediator.selectVideo, mediator);
			this.registerEvent(this.personalRoom, egret.TouchEvent.TOUCH_TAP, this.showPersonal, this);
			this.registerEvent(this.ordinaryRoom, egret.TouchEvent.TOUCH_TAP, this.showOrdinary, this);
			this.registerEvent(this.personalGroup, egret.TouchEvent.TOUCH_TAP, this.getKey, this);
			this.registerEvent(this.chipNumEdit0, egret.TouchEvent.FOCUS_OUT, this.editChip0, this);
			this.registerEvent(this.chipNumEdit1, egret.TouchEvent.FOCUS_OUT, this.editChip1, this);
			this.registerEvent(this.chipNumEdit2, egret.TouchEvent.FOCUS_OUT, this.editChip2, this);
			this.registerEvent(this.chipNumEdit0, egret.TouchEvent.FOCUS_IN, this.focusChip0, this);
			this.registerEvent(this.chipNumEdit1, egret.TouchEvent.FOCUS_IN, this.focusChip1, this);
			this.registerEvent(this.chipNumEdit2, egret.TouchEvent.FOCUS_IN, this.focusChip2, this);
			this.registerEvent(this.videoSource, egret.TouchEvent.CHANGE, this.testBtnEnable, this);
			this.registerEvent(this.roomName, egret.TouchEvent.CHANGE, this.testBtnEnable, this);
			this.registerEvent(this.roomName, egret.TouchEvent.FOCUS_IN, this.focusRoomName, this);
			for(let i = 0; i<this.limitArr.length; i++)
			{
				this.registerEvent(this.limitArr[i], egret.TouchEvent.FOCUS_OUT, this.limitCheck, this);
				this.registerEvent(this.limitArr[i], egret.TouchEvent.FOCUS_IN, this.limitShow, this);
			}
			for(let i = 1; i <= 5; i++)
			{
				this.registerEvent(this["mask" + i + 0], egret.TouchEvent.TOUCH_TAP, this.inputMask,this);
				this.registerEvent(this["mask" + i + 1], egret.TouchEvent.TOUCH_TAP, this.inputMask,this);
			}
		}
// ---------------------------------- 检测 ----------------------------------
		/** 按钮是否启用*/
		private testBtnEnable(e:egret.TouchEvent)
		{
			let b = true;
			if(StringUtil.getStrLen(this.roomName.text) == 0) b = false;
			for(let i = 0; i<this.limitArr.length; i++)
			{
				if(this.limitArr[i].text.length == 0) b = false;
			}
			this.sureBtn.enabled = b;
			this.sureBtn.setState = b?"up":"disabled";
		}

		/**testIllegal 前端校验 点击确定时判断*/
		private testIllegal():boolean
		{
			if(this.videoSource.text == "")
			{
				this.showTipMsg("视频资源不能为空");
				return false;
			}
			if(StringUtil.getStrLen(this.roomName.text) == 0)
			{
				this.showTipMsg("房间名称不能为空");
				return false;
			}
			for(let i=0;i<this.roomName.text.length; i++)
			{
				if(this.roomName.text[i] == " ")
				{
					this.roomName.textColor = 0xff0000;
					let str = this.roomName.text;
					this.roomName.text = "";
					this.roomName.text = str;
					this.showTipMsg("房间名称不能有空格");
					return false;
				}
			}
			if(StringUtil.getStrLen(this.roomName.text) > 20)
			{
				this.showTipMsg("房间名称字符长度不能大于20位字符");
				this.showInput(this.roomName, this.roomName.text);
				return false;
			}
			for(let i = 0; i<this.limitArr.length; i++)
			{
				//投注限额不能为空
				if(this.limitArr[i].text.length == 0)
				{
					this.showTipMsg("投注限额不能为空");
					return false;
				}
				//限额只能为数字
				if(this.checkNumIllegal2(this.limitArr[i].text, true))
				{
					this.showTipMsg("限额只能为数字");
					this.showInput(this.limitArr[i], this.limitArr[i].text);
					return false;
				}
				//最多输入14位整数和1位小数
				if(this.checkNumIllegal(this.limitArr[i].text, 14, true))
				{
					this.showTipMsg("最多输入14位整数和1位小数");
					this.showInput(this.limitArr[i], this.limitArr[i].text);
					return false;
				}
			}
			if(this.checkNumIllegal2(this.chipNumEdit0.text, true)
			|| this.checkNumIllegal2(this.chipNumEdit1.text, true)
			|| this.checkNumIllegal2(this.chipNumEdit2.text, true))
			{
				this.showTipMsg("请输入数字");
				return false;
			}
			if(this.checkNumIllegal(this.chipNumEdit0.text, 9, true)
			|| this.checkNumIllegal(this.chipNumEdit1.text, 9, true)
			|| this.checkNumIllegal(this.chipNumEdit2.text, 9, true))
			{
				this.showTipMsg("最多输入9位整数和1位小数");
				return false;
			}
			if(this.chipArr[0] == 0 || this.chipArr[1] == 0 || this.chipArr[2] == 0)
			{
				this.showTipMsg("筹码配置必须大于0");
				return false;
			}
			return true;
		}

		/** 限额失去焦点检测及显示*/
		private limitCheck(e:egret.TouchEvent):void
		{
			//判断所有限额输入来判断是否启用按钮
			let isEnable = true;
			for(let i = 0; i<this.limitArr.length; i++)
			{
				if(this.limitArr[i].text.length == 0) isEnable = false;
			}
			this.sureBtn.enabled = isEnable;
			this.sureBtn.setState = isEnable?"up":"disabled";
			/** 判断是否为空，数字显示处理*/
			if(e.target.text.length == 0)
			{
				this.showTipMsg("投注限额不能为空");
				this.sureBtn.enabled = false;
				this.sureBtn.setState = "disabled";
				return;
			}
			if(this.checkNumIllegal2(e.target.text))
			{
				this.showTipMsg("请输入数字");
				this.showInput(e.target, e.target.text);
				return;
			}
			if(this.checkNumIllegal(e.target.text, 14))
			{
				this.showTipMsg("最多输入14位整数和1位小数");
				this.showInput(e.target, e.target.text);
				return;
			}
			e.target.text = NumberUtil.getSplitNumStr((+e.target.text)*10*10);
			for(let i = 1; i <= 5; i++)
			{
				this["mask" + i + 0].visible = false;
				this["mask" + i + 1].visible = false;
			}
		}
		/** 限额获得焦点显示*/
		private limitShow(e:egret.TouchEvent):void
		{
			/** 数字显示处理*/
			e.target.textColor = 0xE7B56F;
			e.target.text = e.target.text.split(",").join("");
			let str = e.target.name.slice(-2);
			for(let i = 1; i <= 5; i++)
			{
				this["mask" + i + 0].visible = true;
				this["mask" + i + 1].visible = true;
			}
			this["mask" + str].visible = false;
		}

		/** 点击限额遮罩，先数去焦点再获得焦点，防止点击输入框失效*/
		private inputMask(e:egret.TouchEvent):void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			for(let i = 1; i <= 5; i++)
			{
				this["mask" + i + 0].visible = false;
				this["mask" + i + 1].visible = false;
			}
		}

// ---------------------------------- 发送创建 ----------------------------------
		/** 发送创建房间*/
		private sendCreateRoom():void
		{
			if(!this.testIllegal()) return;
			/** 判断视频资源*/
			if(this.videoSource.text)
			{
				this.video = this.videoSource.text;
			}else{
				this.showTipMsg("视频资源错误");
				return;
			}
			let limit:topic.RoomLimit = new topic.RoomLimit();
			let max:topic.BaccratRoomLimit = new topic.BaccratRoomLimit();
			let min:topic.BaccratRoomLimit = new topic.BaccratRoomLimit();
			max.banker = (+this["limit11"].text.split(",").join(""))*10*10;
			max.player = (+this["limit21"].text.split(",").join(""))*10*10;
			max.tie = (+this["limit31"].text.split(",").join(""))*10*10;
			max.banker_pair = (+this["limit41"].text.split(",").join(""))*10*10;
			max.player_pair = (+this["limit51"].text.split(",").join(""))*10*10;
			min.banker = (+this["limit10"].text.split(",").join(""))*10*10;
			min.player = (+this["limit20"].text.split(",").join(""))*10*10;
			min.tie = (+this["limit30"].text.split(",").join(""))*10*10;
			min.banker_pair = (+this["limit40"].text.split(",").join(""))*10*10;
			min.player_pair = (+this["limit50"].text.split(",").join(""))*10*10;
			/** 判断限额*/
			// for(let key in max)
				// {
				// 	if(min[key] > max[key])
				// 	{
				// 		this.showTipMsg("投注项最大限额必须大于最低限额");
				// 		return;
				// 	}
				// 	if(min[key] <= 0 && max[key] <= 0)
				// 	{
				// 		this.showTipMsg("投注限额不能为空");
				// 		return;
				// 	}
			// }
			let isFalse = false;//需要全部判断完了才return
			for(let i = 1; i <= 5; i++)
			{
				if((+this["limit"+ i +"1"].text.split(",").join(""))*10*10 < (+this["limit"+ i +"0"].text.split(",").join(""))*10*10)
				{
					this["limit"+ i +"1"].textColor = 0xff0000;
					this["limit"+ i +"0"].textColor = 0xff0000;
					isFalse = true;
				}
				else
				{
					this["limit"+ i +"1"].textColor = 0xE7B56F;
					this["limit"+ i +"0"].textColor = 0xE7B56F;
				}
					let str = this["limit"+ i +"1"].text;
					let str1 = this["limit"+ i +"0"].text;
					this["limit"+ i +"1"].text = "";
					this["limit"+ i +"1"].text =  str;
					this["limit"+ i +"0"].text =  "";
					this["limit"+ i +"0"].text =  str1;
			}
			if(isFalse)
			{
				this.showTipMsg("最大限额不能低于最小限额");
				return;
			}
			limit.max = max;
			limit.min = min;
			this.limit = limit;
			this.nameText = (this.roomName.text.trim());
			this.key = this.personalGroup.visible ? this.roomKey.text : "";
			this.isfree = this.isFree.currentState == "up"? true: false;
			let chips:Array<number> = [+this.chipNumEdit0.text.split(",").join("")*10*10,+this.chipNumEdit1.text.split(",").join("")*10*10,+this.chipNumEdit2.text.split(",").join("")*10*10];
			// this.MainGroup.addChild(this.loadCircle);
			CommonLoadingUI.getInstance().start();
			/** 发送创建请求*/
			ClubController.getInstance().createRoom(GlobalConfig.clubId, this.type, this.video, this.nameText, chips, this.limit, this.roomModel, this.key, this.isfree)
			.then(()=>{
				ClubController.getInstance().getSubscribeRoomList(GlobalConfig.clubId)
				.then(()=>
				{
					this.createBack();
				}).catch((e:Error)=>
				{
					DebugUtil.debug(e + "发送创建请求失败");
				});
			}).catch((e)=>{
					DebugUtil.debug("创建失败" + e);
					CommonLoadingUI.getInstance().stop();
					let msg:string = "";
					switch (e.message)
					{
						case "name_exists":
							msg = "founder_lbl_roomname_exists";
							break;
						case "name_character":
							msg = "home_lbl_name_character";
							break;
						case "name_length":
							msg = "founder_lbl_roomname_length";//房间名称输入字符数最大为20
							break;
						case "name_empty":
							msg = "founder_lbl_roomname_empty";//房间名为空
							break;
						case "name_illegal":
							msg = "信息包含敏感词汇";//信息包含敏感词汇
							break;
							default:
							msg = "房间创建失败";
							break;
					}
					this.showTipMsg(LanguageUtil.translate(msg));
				}
			)
		}

		/** 创建成功的回调*/
		private createBack():void
		{
			// this.MainGroup.removeChild(this.loadCircle);
			CommonLoadingUI.getInstance().stop();
			// let tipData = new TipMsgInfo()
			// tipData.msg = [
			// 	{text:LanguageUtil.translate("home_lbl_create_club"), textColor:enums.ColorConst.Golden},
			// 	{text:this.nameText, textColor:enums.ColorConst.LightGray},
			// ]
			// tipData.confirmText = LanguageUtil.translate("global_btn_I_know");
			// tipData.thisObj = this;
			// tipData.comfirmCallBack = function () {
			// 	MediatorManager.openMediator(Mediators.Mediator_roomManagerMediator);
			// };
			// MediatorManager.openMediator(Mediators.Mediator_TipMsg, tipData);
			MediatorManager.openMediator(Mediators.Mediator_roomManagerMediator);
		}

// ---------------------------------- 显示 ----------------------------------

		/** 输入房间名*/
		private focusRoomName():void
		{
			let str = this.roomName.text;
			this.roomName.text = "";
			this.roomName.textColor = 0xE7B56F;
			this.roomName.text = str;
			StringUtil.sliceByLen(this.roomName.text, this.roomName.text.length);
		}

		/** 设置筹码*/
		private editChip0():void
		{
			this.chipArr[0] = (+this.chipNumEdit0.text)*10*10;
			if(this.chipNumEdit0.text.length == 0 || +this.chipNumEdit0.text == 0)
			{
				this.showTipMsg("筹码金额编辑为空");
				return;
			}
			if(this.checkNumIllegal2(+this.chipNumEdit0.text + ""))
			{
				this.showTipMsg("请输入数字");
				this.checkNum(this.chipNumEdit0, this.chipNumEdit0.text);
				return;
			}
			if(this.checkNumIllegal(+this.chipNumEdit0.text + ""))
			{
				this.showTipMsg("最多输入9位整数和1位小数");
				this.checkNum(this.chipNumEdit0, this.chipNumEdit0.text);
				return;
			}
			this.chipNum0.text = NumberUtil.getSplitNumStr(this.chipArr[0], 3);
			this.chipNumEdit0.text = NumberUtil.getSplitNumStr(this.chipArr[0]);
		}
		private editChip1():void
		{
			this.chipArr[1] = (+this.chipNumEdit1.text)*10*10;
			if(this.chipNumEdit1.text.length == 0 || +this.chipNumEdit1.text == 0)
			{
				this.showTipMsg("筹码金额编辑为空");
				return;
			}
			if(this.checkNumIllegal2(+this.chipNumEdit1.text + ""))
			{
				this.showTipMsg("请输入数字");
				this.checkNum(this.chipNumEdit1, this.chipNumEdit1.text);
				return;
			}
			if(this.checkNumIllegal(+this.chipNumEdit1.text + ""))
			{
				this.showTipMsg("最多输入9位整数和1位小数");
				this.checkNum(this.chipNumEdit1, this.chipNumEdit1.text);
				return;
			}
			this.chipNum1.text = NumberUtil.getSplitNumStr(this.chipArr[1], 3);
			this.chipNumEdit1.text = NumberUtil.getSplitNumStr(this.chipArr[1]);
		}
		private editChip2():void
		{
			this.chipArr[2] = (+this.chipNumEdit2.text)*10*10;
			if(this.chipNumEdit2.text.length == 0 || +this.chipNumEdit2.text == 0)
			{
				this.showTipMsg("筹码金额编辑为空");
				return;
			}
			if(this.checkNumIllegal2(+this.chipNumEdit2.text + ""))
			{
				this.showTipMsg("请输入数字");
				this.checkNum(this.chipNumEdit2, this.chipNumEdit2.text);
				return;
			}
			if(this.checkNumIllegal(+this.chipNumEdit2.text + ""))
			{
				this.showTipMsg("最多输入9位整数和1位小数");
				this.checkNum(this.chipNumEdit2, this.chipNumEdit2.text);
				return;
			}
			this.chipNum2.text = NumberUtil.getSplitNumStr(this.chipArr[2], 3);
			this.chipNumEdit2.text = NumberUtil.getSplitNumStr(this.chipArr[2]);
		}
		/** 筹码编辑获得焦点*/
		private focusChip0():void
		{
			this.chipNumEdit0.text = this.chipNumEdit0.text.split(",").join("");
		}
		private focusChip1():void
		{
			this.chipNumEdit1.text = this.chipNumEdit1.text.split(",").join("");
		}
		private focusChip2():void
		{
			this.chipNumEdit2.text = this.chipNumEdit2.text.split(",").join("");
		}

		/** 生产密码*/
		private getKey():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			let key:number,newKey:string = "";
			if(this.roomKey.text)
			{
				key = parseInt(this.roomKey.text);
			}
			else
			{
				key = 123456;
			}
			for(let i = 0; i < 6; i++)
			{
				newKey = newKey + ("" + Math.floor(Math.random()*10));
			}
			DebugUtil.debug(newKey + "旧密码" + key);
			if( parseInt(newKey) == key)
			{
				this.getKey();
			}
			this.roomKey.text = newKey;
		}

		/** 错误通知*/
		protected showTipMsg(msg:string):void
		{
			if(this.CTweenObj["tipMsgGroup"])
			{
				CTween.removeTweens(this.tipMsgGroup);
				this.tipMsg.text = "";
                this.tipMsgGroup.alpha = 1;
                this.tipMsgGroup.visible = false;
			}
			this.tipMsg.text = LanguageUtil.translate(msg);
            this.tipMsgGroup.alpha = 1;
            this.tipMsgGroup.visible = true;
			// this.CTweenObj["tipMsgGroup"] = CTween.get(this.tipMsgGroup).wait(1500).to({
            //     alpha: 0
            // }, 1500).call(() => {
            //     this.tipMsg.text = "";
            //     this.tipMsgGroup.alpha = 1;
            //     this.tipMsgGroup.visible = false;
            // }, this);
			CTweenManagerController.getInstance().startCTween(2,[this.tipMsgGroup]);
		}

		/** 输入框错误显示*/
		private showInput(target:eui.EditableText, str:string):void
		{
			if(target && str)
			{
				target.text = "";
				target.textColor = 0xff0000;
				target.text = str;
			}
		}

		/** 切换到私人模式*/
		private showPersonal():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.personalGroup.visible = true;
			this.roomModel = "private";
			this.personalRoom.currentState = "up";
			this.ordinaryRoom.currentState = "down";
		}

		/** 切换到普通模式*/
		private showOrdinary():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.personalGroup.visible = false;
			this.roomModel = "public";
			this.personalRoom.setState = "down";
			this.ordinaryRoom.setState = "up";
		}
		
		/** 点击是否免佣*/
		private tapIsFree():void
		{
			SoundPlayerNew.playEffect(SoundConst.click);
			this.showIsFree.text = LanguageUtil.translate(this.isFree.currentState == "up"?"global_btn_yes":"global_btn_no");
		}

		/** 去掉输入的其他字符*/
		public checkNum(target:eui.EditableText,str:string): void
		{
			if(!str) return ;
			if(str == "") return ;
			let strArr = [];
			// let isNum:boolean = false;
			for(let i = 0; i<str.length; i++)
			{
				if(this.numArr.indexOf(str.charAt(i)) <0)
				{
					//包含除数字之外的字符
					// isNum = true;
				}
				else
				{
					strArr.push(str.charAt(i));
				}
			}
			target.text = strArr.join("");
		}

		/** 输入除数字外的其他字符*/
		public checkNumIllegal2(str:string, isDeal:boolean = false): boolean
		{
			if(!str) return true;
			if(str == "") return true;
			str = str + "";
			if(isDeal) str = str.split(",").join("");
			for(let i = 0; i<str.length; i++)
			{
				if(this.numArr.indexOf(str.charAt(i)) <0)
				{
					//包含除数字之外的字符
					return true;
				}
			}
			return false;
		}

		/** 输入长度大于 len 位或小数点后超过1位
		 * @param str 输入的内容
		 * @param len 需要限制的长度，不算小数点，默认是9位和1位小数
		 * @param isDeal 是否需要转化，去掉逗号 默认是false不需要
		*/
		public checkNumIllegal(str:string, len = 9, isDeal:boolean = false): boolean
		{
			if(!str) return true;
			if(str == "") return true;
			/** 转化成数字，1. = 1、1.0 = 1、.1=0.1*/
			if(isDeal) str = str.split(",").join("");
			str = +str + "";
			if(!+str) return true;//转换之后再判断一下是不是NaN
			if(str.indexOf('.') != -1){
				let n = 0;
				if(Number(str.length) - Number(str.indexOf('.')) > 2 )//小数点后只有俩位
				{
					return true;
				}
				for(let i = 0; i < str.length; i++)
				{
					if(str[i] == ".")
					{
						n += 1;
					}
				}
				if(n > 1) return true;
				/** 小数点只有一位，但是后面啥也没有的时候长度就是14位*/
				if(str.length > len + 2) return true;
			}
			else
			{
				if(str.length > len)//只有9为整数
				{
					return true;
				}
			}
			return false;
		}

		 public dispose(): void {
			 CTween.removeTweens(this.tipMsgGroup);
			 CTweenManagerController.getInstance().endAllCTween();
            super.dispose();
        }

	}
}