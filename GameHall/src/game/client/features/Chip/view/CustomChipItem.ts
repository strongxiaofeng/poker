// module game {

//     export class CustomChipItem extends BaseView {

//         private static NAME: string = "CustomChipItem";

//         public penBtn: eui.Button;
//         private bgFace: eui.Image;
//         private icon: eui.Image;
//         private act1: eui.Image;
//         private act2: eui.Image;
//         private numSelf: eui.EditableText;
//         /**用于显示数字（解决EditableText不能压缩的问题）*/
//         private numSelfA: eui.ALabel;
//         private commonChipModel: ChipModel;
//         public effect_player: component.SFEffect;
//         private sourceCount: number;

//         private numKeyBoard: game.NumKeyBoard;
//         /**这玩意在左边还是右边*/
//         private parentDir: string = "left";
//         private spe: string = "";
//         /**是否是自定义筹码 */
//         public isModifyChip: boolean = false;
//         /**校验输入内容 */
//         private textArr: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", '.'];

//         /**上次输入内容 */
//         private lastContent: string = "";

//         public constructor() {
//             super();
//             if (GlobalConfig.isMobile) {
//                 this.skinName = enums.SystemPath.skin_path + "chip/CustomChipItemSkin.exml";
//             }
//             else {
//                 this.skinName = enums.SystemPath.skin_path + "chip/PCCustomChipItemSkin.exml";
//             }
//             this.commonChipModel = ChipModel.getInstance();
//             this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
//         }
//         /**
//          * 当组件初始化完毕
//          */
//         protected initComponent(): void {
//             this.numSelf.prompt = LanguageUtil.translate("g_custom");
//             this.numSelf.promptColor = 0xFFC832;
//             this.numSelf.type = egret.TextFieldType.DYNAMIC;
//             this.numSelfA.text = this.numSelf.text = NumberUtil.getSplitNumStr(UserInfoModel.getInstance().getCustomizeChip());
//             this.effect_player.scaleX = 2;
//             this.effect_player.scaleY = 2;
//             if (!GlobalConfig.isMobile) {
//                 this.effect_player.scaleX = 1;
//                 this.effect_player.scaleY = 1;
//             }
//             this.penBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchPenBtn, this);
//             if (!GlobalConfig.isMobile) {
//                 this.numSelf.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
//             }
//             this.showNumselfA(true);
//         }
//         /**
//          * 点击了编辑自定义输入框按钮
//          */
//         private onTouchPenBtn(evt: egret.TouchEvent): void {
//             if (GlobalConfig.isGuest) {
//                 return;
//             }
//             evt.stopImmediatePropagation();
//             if (!GlobalConfig.isMobile) {
//                 this.numSelf.type = egret.TextFieldType.INPUT;
//                 this.numSelf.setFocus();
//                 this.numSelf.addEventListener(egret.Event.CHANGE, this.handleChange, this);
//                 GlobalConfig.isKeyBoard = true;
//             }
//             else {
//                 this.showNumKeyBoard();
//                 this.numSelf.addEventListener(egret.Event.CHANGE, this.handleChange, this);
//             }
//             if (UserInfoModel.getInstance().getCustomizeChip() != 0 && UserInfoModel.getInstance().getCustomizeChip() != null) {
//                 this.numSelf.text = UserInfoModel.getInstance().getCustomizeChip()/100 + "";
//             } else {
//                 this.numSelf.text = "";
//             }
//             this.setNumberWidth();
//             this.showNumselfA(false);
//         }

//         /** 当焦点离开的时候 */
//         public onFocusOut(evt: egret.FocusEvent): void {
//             GlobalConfig.isKeyBoard = false;
//             this.numSelf.type = egret.TextFieldType.DYNAMIC;
//             let numStr: string = this.numSelf.text;
//             while (numStr.indexOf(",") > -1) {
//                 numStr = numStr.replace(",", "");
//             }
//             if (numStr.length > 0) {
//                 if (RegExpUtil.testNumber(numStr) && parseFloat(numStr) != 0) {
//                     this.sourceCount = Math.round(parseFloat(numStr)*100);
//                     if (this.numSelf.text.length != 0) {
//                         ComponentProgressLoading.getInstance().showConnect();
//                         UserInfoController.getInstance().changeChips(this.sourceCount);
//                     }
//                 } else {
//                     MediatorManager.tipMsg(LanguageUtil.translate("bacc_warning_maxium_length"),0xFF0000);
//                     if (UserInfoModel.getInstance().getCustomizeChip() != 0 && UserInfoModel.getInstance().getCustomizeChip() != null) {
//                         this.numSelf.text = NumberUtil.getSplitNumStr(UserInfoModel.getInstance().getCustomizeChip());
//                     } else {
//                         this.numSelf.text = "";
//                     }
//                 }
//             } else {
//                 if (UserInfoModel.getInstance().getCustomizeChip() != 0 && UserInfoModel.getInstance().getCustomizeChip() != null) {
//                     this.numSelf.text = NumberUtil.getSplitNumStr(UserInfoModel.getInstance().getCustomizeChip());
//                 } else {
//                     this.numSelf.text = "";
//                 }
//             }
//             if (this.stage) {
//                 this.stage.$screen.updateScreenSize();
//             }
//             this.setNumberWidth();
//             this.showNumselfA(true);
//             this.numSelf.removeEventListener(egret.Event.CHANGE, this.handleChange, this);
//             this.numSelf.text = NumberUtil.getSplitNumStr(parseFloat(this.numSelf.text)*100);
//         }

//         /** 压缩输入的数字文本 */
//         private setNumberWidth(): void {
//             var numbers: string = this.formatText(this.numSelf.text);
//             if (GlobalConfig.isMobile) {
//                 switch (numbers.length) {
//                     case 6:
//                         this.numSelf.size = 36;
//                         break;
//                     case 7:
//                         this.numSelf.size = 32;
//                         break;
//                     case 8:
//                         this.numSelf.size = 28;
//                         break;
//                     case 9:
//                         this.numSelf.size = 26;
//                         break;
//                     case 10:
//                         this.numSelf.size = 24;
//                         break;
//                     case 11: 
//                         this.numSelf.size = 22;
//                         break;
//                     default:
//                         this.numSelf.size = 40;
//                         break;
//                 }
//             } else {
//                 switch (numbers.length) {
//                     case 6:
//                         this.numSelf.size = 22;
//                         break;
//                     case 7:
//                         this.numSelf.size = 20;
//                         break;
//                     case 8:
//                         this.numSelf.size = 18;
//                         break;
//                     case 9:
//                         this.numSelf.size = 16;
//                         break;
//                     case 10:
//                         this.numSelf.size = 14;
//                         break;
//                     case 11:
//                         this.numSelf.size = 12;
//                         break;
//                     default:
//                         this.numSelf.size = 24;
//                         break;
//                 }
//             }
//         }

//         /** 文本输入 */
//         private handleChange(e): void {
//             if (!this.checkText(this.numSelf.text)) {
//                 MediatorManager.tipMsg(LanguageUtil.translate("bacc_warning_maxium_length"),0xFF0000);
//                 this.numSelf.text = this.lastContent;
//             }
//             else {
//                 this.lastContent = this.numSelf.text;
//             }
//             this.setNumberWidth();
//         }

//         /**上次的输入字符长度 */
//         private lastLength: number = 0;

//         /**输入内容是否合法 */
//         private checkText(str: string): boolean {
//             /**整数部分 */
//             var integer: string;
//             /**小数部分 */
//             var float: string;
//             /**小数点的位置 */
//             var pointIndex = str.indexOf('.');
//             if (pointIndex == -1) {
//                 integer = str;
//                 float = "";
//             } else {
//                 if (pointIndex == 0) {
//                     DebugUtil.debug("以小数点开头，输入失败");
//                     return false;
//                 } else if (pointIndex != str.lastIndexOf('.')) {
//                     DebugUtil.debug("输入了2个小数点，输入失败");
//                     return false;
//                 } else {
//                     integer = str.slice(0, pointIndex);
//                     float = "0" + str.slice(pointIndex);
//                 }
//             }
//             if (integer.length > 9) {
//                 DebugUtil.debug("整数部分超过9位了，输入失败");
//                 return false;
//             }
//             if (float.length > 3) {
//                 DebugUtil.debug("小数部分超过1位了，输入失败");
//                 return false;
//             }
//             var len = str.length;
//             //是否包含数字之外的字符
//             if (len > 0) {
//                 for (var i = 0; i < len; i++) {
//                     var s = str.charAt(i);
//                     if (this.textArr.indexOf(s) == -1) {
//                         DebugUtil.debug("输入了除数字和小数点之外的字符，输入失败");
//                         return false;
//                     }
//                 }
//             }
//             return true;
//         }

//         /**筛选输入框的内容，只保留数字 */
//         private formatText(str: string) {
//             var text = "";
//             var len = str.length;
//             if (len > 0) {
//                 for (var i = 0; i < len; i++) {
//                     var s = str.charAt(i);
//                     if (this.textArr.indexOf(s) != -1) {
//                         text += s;
//                     }
//                 }
//             }
//             return text;
//         }

//         /** 修改自定义金钱返回 */
//         private onModifyChipBack(code: number): void {
//             ComponentProgressLoading.getInstance().closeLoading();
//             this.numSelf.text = NumberUtil.getSplitNumStr(UserInfoModel.getInstance().getCustomizeChip());
//             switch (code) {
//                 case 0:
//                     DebugUtil.debug("返回修改筹码成功");
//                     this.data.count = UserInfoModel.getInstance().getCustomizeChip();
//                     break;
//                 case 1:
//                     MediatorManager.tipMsg(LanguageUtil.translate("g_warning_set_chips"),0xFF0000);
//                     break;
//             }
//             if (UserInfoModel.getInstance().getCustomizeChip() != 0 && UserInfoModel.getInstance().getCustomizeChip() != null) {
//                 this.numSelf.text = NumberUtil.getSplitNumStr(UserInfoModel.getInstance().getCustomizeChip()) + "";
//             } else {
//                 this.numSelf.text = "";
//             }
//             this.numSelfA.text = this.numSelf.text;
//         }

//         /**显示小键盘*/
//         private showNumKeyBoard(): void {
//             //判断容器在哪边
//             var pt = this.localToGlobal(0, 0);
//             var offx = pt.x;
//             var offy = pt.y;
//             // if (this.numKeyBoard) {
//             //     this.numKeyBoard.dispos(true);
//             // }
//             // this.numKeyBoard == null;
//             this.numKeyBoard = new NumKeyBoard();
//             if (this.parentDir == "left") {
//                 offx = pt.x + this.width;
//                 offy = pt.y + this.height / 2 - 10;
//             } else if (this.parentDir == "right") {
//                 offx = pt.x;
//                 offy = pt.y + this.height / 2 - 10;
//             } else if (this.parentDir == "right-bottom") {
//                 offx = pt.x;
//                 offy = pt.y - this.height / 2 - 10;
//             }
//             this.numKeyBoard.openModule(null, true, enums.LayerConst.LAYER_TIP, VIEWDIRECTION.NONE, offx, offy, this.parentDir, this.spe);
//             this.numKeyBoard.initListeners();
//             this.numKeyBoard.initData();
//         }

//         /** 注册 */
//         public addRegister(name: string, obj: any): void {
//             NotifyManager.getInstance().addObj(name, obj);
//         }

//         /** 移除 */
//         public removeRegister(name: string): void {
//             NotifyManager.getInstance().removeObj(name);
//         }

//         /** 子类需要重写 */
//         public listNotification(): Array<string> {
//             return [
//                 NotifyConst.Notify_NumKeyBoard_Num,
//                 NotifyConst.Notify_NumKeyBoard_Close,
//                 NotifyConst.UPDATE_USERINFO_CHIP,
//             ];
//         }

//         /** 子类需要重写 */
//         public handleNotification(type: string, body: any): void {
//             switch (type) {
//                 case NotifyConst.Notify_NumKeyBoard_Num:
//                     var str = this.numSelf.text.split(",").join("");
//                     this.numSelf.text = str;
//                     if (body == "del") {
//                         this.numSelf.text = str.slice(0, str.length - 1);
//                     } else {
//                         if (!this.checkText(str + body)) {
//                             MediatorManager.tipMsg(LanguageUtil.translate("bacc_warning_maxium_length"),0xFF0000);
//                             return;
//                         }
//                         if (GlobalConfig.isMobile) this.numSelf.text = str + body;
//                     }
//                     this.setNumberWidth();
//                     break;
//                 case NotifyConst.Notify_NumKeyBoard_Close:
//                     this.onFocusOut(null);
//                     break;
//                 case NotifyConst.UPDATE_USERINFO_CHIP:
//                     this.onModifyChipBack(body);
//                     break;
//             }
//         }

//         public sendNotification(type: string, body: any = null): void {
//             NotifyManager.getInstance().distribute(type, body);
//         }

//         /** 当数据发生变化的时候 */
//         public setData(data: any): void {
//             this.data = data;
//             this.isModifyChip = true;
//             this.numSelfA.visible = true;
//             this.effect_player.visible = false;
//             this.parentDir = this.data.pdir;
//             this.spe = this.data.spe;
//             this.penBtn.visible = true;
//             this.numSelf.visible = true;
//             if (NotifyManager.getInstance().hasObj(CustomChipItem.NAME)) {
//                 this.removeRegister(CustomChipItem.NAME);
//             }
//             this.addRegister(CustomChipItem.NAME, this);
//             if (UserInfoModel.getInstance().getCustomizeChip() != 0 && UserInfoModel.getInstance().getCustomizeChip() != null) {
//                 this.numSelf.text = NumberUtil.getSplitNumStr(UserInfoModel.getInstance().getCustomizeChip()) + "";
//                 this.data.count = UserInfoModel.getInstance().getCustomizeChip();
//             } else {
//                 this.numSelf.text = "";
//             }
//             if (this.commonChipModel.currentSelectChipData != null) {
//                 if (this.commonChipModel.point == this.data.count
//                     && this.commonChipModel.currentSelectChipData.type == 3) {
//                     this.setSelect(true, true);
//                 } else {
//                     this.bgFace.source = null;
//                 }
//             } else {
//                 this.bgFace.source = null;
//             }
//             this.act1.visible = false;
//             this.act2.visible = false;
//             this.icon.source = this.data.source;
//             this.act1.source = this.data.source;
//             this.act2.source = this.data.source;
//             //有可能采用多套资源，这里需要动态设定图片尺寸
//             var chipW, chipH, bgW, bgH;
//             chipH = 172;
//             chipW = 191;
//             bgW = 215;
//             bgH = 196;
//             //电脑版的大小要小一些
//             if (!GlobalConfig.isMobile) {
//                 chipW = 100;
//                 chipH = 100;
//                 bgW = 100;
//                 bgH = 100;
//             }
//             this.icon.width = chipW, this.icon.height = chipH;
//             this.act1.width = chipW, this.act1.height = chipH;
//             this.act2.width = chipW, this.act2.height = chipH;
//             this.bgFace.width = bgW, this.bgFace.height = bgH;
//             this.setNumberWidth();
//         }
// 		/**
// 		 * 设置选中状态 noEffect:不需要选中动画
// 		 */
//         public setSelect(value: boolean, noEffect: boolean = false): void {
//             if (value) {
//                 this.act1.visible = true;
//                 this.act2.visible = true;
//                 this.judgeView();
//                 if (!noEffect) {
//                     if (GlobalConfig.isMobile) {
//                         egret.Tween.get(this.act2).wait(100).to({ verticalCenter: -100 }, 200).to({ verticalCenter: 0 }, 200).call(this.actComplement, this);
//                         egret.Tween.get(this.act1).to({ verticalCenter: -100 }, 200).to({ verticalCenter: 0 }, 200);
//                         egret.Tween.get(this.numSelf).to({ verticalCenter: -100 }, 200).to({ verticalCenter: 0 }, 200);
//                         egret.Tween.get(this.numSelfA).to({ verticalCenter: -100 }, 200).to({ verticalCenter: 0 }, 200);
//                     }
//                     else {
//                         egret.Tween.get(this.act2).wait(100).to({ verticalCenter: -10 }, 200).to({ verticalCenter: 0 }, 200).call(this.actComplement, this);
//                         egret.Tween.get(this.act1).to({ verticalCenter: -10 }, 200).to({ verticalCenter: 0 }, 200);
//                         egret.Tween.get(this.numSelf).to({ verticalCenter: -10 }, 200).to({ verticalCenter: 0 }, 200);
//                         egret.Tween.get(this.numSelfA).to({ verticalCenter: -10 }, 200).to({ verticalCenter: 0 }, 200);
//                     }
//                 }
//                 this.effect_player.source = "chip_rect";
//                 this.bgFace.source = "chips_pic_edit2_png";
//                 this.effect_player.visible = true;
//                 this.effect_player.play();
//             } else {
//                 this.effect_player.visible = false;
//                 this.effect_player.stop();
//                 this.bgFace.source = null;
//             }
//         }

//         public judgeView() {
//             if (MediatorManager.isMediatorOpen(Mediators.Mediator_Baccarat.name)) {
//                 /**点击统计*/
//                 DebugUtil.clickLog("LobbyView", "PlayView_touchMoney" + this.data.count);
//             } else if (MediatorManager.isMediatorOpen(Mediators.Mediator_DragonTiger.name)) {
//                 /**点击统计*/
//                 DebugUtil.clickLog("DragonTigerLobbyView", "DTPlayView_touchMoney" + this.data.count);
//             } else if (MediatorManager.isMediatorOpen(Mediators.Mediator_Roulette.name)) {
//                 /**点击统计*/
//                 DebugUtil.clickLog("RouletteLobbyView", "Roulette_touchMoney" + this.data.count);
//             } else if (MediatorManager.isMediatorOpen(Mediators.Mediator_Sicbo.name)) {
//                 /**点击统计*/
//                 DebugUtil.clickLog("SicboLobbyView", "Sicbo_touchMoney" + this.data.count);
//             }
//         }

//         private actComplement(): void {
//             this.act2.visible = false;
//             this.act1.visible = false;
//         }

//         /**
//          * 当显示对象从舞台移除
//          */
//         private onRemoveFromStage(evt: egret.Event): void {
//             if (this.effect_player != null) {
//                 this.effect_player.visible = false;
//                 this.effect_player.stop();
//             }
//         }

//         /**显示numSelfA*/
//         private showNumselfA(flag: boolean): void {
//             this.numSelfA.text = NumberUtil.getSplitNumStr(parseFloat(this.formatText(this.numSelf.text))*100);        
//             if(this.numSelfA.text==="0"){
//                 this.numSelfA.text = LanguageUtil.translate("g_custom");
//             }
//             if (flag) {
//                 this.numSelf.alpha = 0.01;
//                 this.numSelfA.alpha = 1;
//             } else {
//                 this.numSelf.alpha = 1;
//                 this.numSelfA.alpha = 0.01
//             }
//         }
//     }
// }