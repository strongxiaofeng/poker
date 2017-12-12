// module game {
//     export class ChipItemRender extends eui.ItemRenderer {
//         private static NAME: string = "SFCommonChipItemRender";
//         private bgFace: eui.Image;
//         private icon: eui.Image;
//         private act1: eui.Image;
//         private act2: eui.Image;
//         private commonChipModel: ChipModel;
//         private effect_player: component.SFEffect;
//         private sourceCount: number;
//         /**这玩意在左边还是右边*/
//         private parentDir: string = "left";
//         private spe: string = "";
//         public constructor() {
//             super();
//             if (GlobalConfig.isMobile) {
//                 this.skinName = enums.SystemPath.skin_path + "chip/ChipItemSkin.exml";
//             }
//             else {
//                 this.skinName = enums.SystemPath.skin_path + "chip/PCChipItemSkin.exml";
//             }
//             this.commonChipModel = ChipModel.getInstance();
//             this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
//         }
//         /** 当组件初始化完毕 */
//         protected createChildren(): void {
//             if (!GlobalConfig.isMobile) {
//                 this.effect_player.scaleX = 1;
//                 this.effect_player.scaleY = 1;
//             } else {
//                 this.effect_player.scaleX = 2;
//                 this.effect_player.scaleY = 2;
//             }
//         }
//         /** 当数据发生变化的时候 */
//         public dataChanged(): void {
//             this.effect_player.visible = false;
//             if (this.commonChipModel.currentSelectChipData != null) {
//                 if (this.commonChipModel.point * 100 == this.data.count
//                     && this.data.type == this.commonChipModel.currentSelectChipData.type) {
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
//             if (this.data.count > 5000) {
//                 chipW = 191;
//                 bgW = 215;
//                 bgH = 196;
//             } else {
//                 chipW = 172;
//                 bgW = 194;
//                 bgH = 194;
//             }
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
//         }
//         /** 设置选中状态 noEffect:不需要选中动画 */
//         public setSelect(value: boolean, noEffect: boolean = false): void {
//             if (value) {
//                 this.act1.visible = true;
//                 this.act2.visible = true;
//                 this.judgeView();
//                 if (!noEffect) {
//                     if (GlobalConfig.isMobile) {
//                         egret.Tween.get(this.act2).wait(100).to({ verticalCenter: -100 }, 200).to({ verticalCenter: 0 }, 200).call(this.actComplement, this);
//                         egret.Tween.get(this.act1).to({ verticalCenter: -100 }, 200).to({ verticalCenter: 0 }, 200);
//                     }
//                     else {
//                         egret.Tween.get(this.act2).wait(100).to({ verticalCenter: -10 }, 200).to({ verticalCenter: 0 }, 200).call(this.actComplement, this);
//                         egret.Tween.get(this.act1).to({ verticalCenter: -10 }, 200).to({ verticalCenter: 0 }, 200);
//                     }
//                 }
//                 if (this.data.type == 1) {
//                     this.bgFace.source = "chips_pic_rolllight_png";
//                     this.effect_player.source = "chip_round";
//                 } else {
//                     this.effect_player.source = "chip_rect";
//                     this.bgFace.source = "chips_pic_edit2_png";
//                 }
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
//         /** 当显示对象从舞台移除 */
//         private onRemoveFromStage(evt: egret.Event): void {
//             if (this.effect_player != null) {
//                 this.effect_player.visible = false;
//                 this.effect_player.stop();
//             }
//         }
//     }
// } 
//# sourceMappingURL=ChipItemRender.js.map