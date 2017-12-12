// module game
// {
// 	export class NumKeyBoard extends BaseView
// 	{
// 		public static NAME: string = "NumKeyBoard";
// 		private num_1: eui.Button;
// 		private num_2: eui.Button;
// 		private num_3: eui.Button;
// 		private num_4: eui.Button;
// 		private num_5: eui.Button;
// 		private num_6: eui.Button;
// 		private num_7: eui.Button;
// 		private num_8: eui.Button;
// 		private num_0: eui.Button;
// 		private delBtn: eui.Button;
// 		//没有确认按钮，这个是小数点
// 		private enterBtn: eui.Button;
// 		private num_9: eui.Button;
//         private bg_black:eui.Rect;
//         private arrow_img:eui.Image;
//         private numGroup:eui.Group;
// 		public constructor()
// 		{
// 			super();
//             this._skinName = enums.SystemPath.skin_path + "chip/NumKeyBoardSkin.exml";
// 		}
// 		//初始化组件
// 		protected initComponent(): void
// 		{
//     		var black:eui.Image;
//     		var white:eui.Image;
//     		for(var i = 0;i < 10;i++)
//     		{
//     		    if(this["num_" + i])
//     		    {
//                     black = new eui.Image("room_pic_"+ i +"_2_png" );
//                     black.name = "black" + i;
//                     this.numGroup.addChild(black);
//                     black.touchEnabled = false;
//                     black.x = this["num_" + i].x;
//                     black.y = this["num_" + i].y;
//                     white = new eui.Image("room_pic_"+ i +"_png");
//                     white.name = "white" + i;
//                     this.numGroup.addChild(white);
//                     white.touchEnabled = false;
//                     white.x = this["num_" + i].x;
//                     white.y = this["num_" + i].y;
//     		    }
//     		}
//     		//删除键
//             black = new eui.Image("room_pic_delete_2_png");
//             black.name = "del_black";
//             this.numGroup.addChild(black);
//             black.touchEnabled = false;
//             black.x = this.delBtn.x;
//             black.y = this.delBtn.y;
//             white = new eui.Image("room_pic_delete_png");
//             white.name = "del_white";
//             this.numGroup.addChild(white);
//             white.touchEnabled = false;
//             white.x = this.delBtn.x;
//             white.y = this.delBtn.y;
//             //dot
//             black = new eui.Image("room_pic_dot_2_png");
//             black.name = "dot_black";
//             this.numGroup.addChild(black);
//             black.touchEnabled = false;
//             black.x = this.enterBtn.x;
//             black.y = this.enterBtn.y;
//             white = new eui.Image("room_pic_dot_png");
//             white.name = "dot_white";
//             this.numGroup.addChild(white);
//             white.touchEnabled = false;
//             white.x = this.enterBtn.x;
//             white.y = this.enterBtn.y;
// 		}
// 		//初始化数据
// 		public initData(): void
// 		{
// 		}
// 		//事件注册
// 		public initListeners(): void
// 		{
//             StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handleTab,this);
//             StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.handleTab,this);
//             if(NotifyManager.getInstance().hasObj(NumKeyBoard.NAME))
//             {
//                 this.removeRegister(NumKeyBoard.NAME);
//             }
//             this.addRegister(NumKeyBoard.NAME,this);
// 		}
// 		/**
//          * 子类需要重写
//          * */
//         public listNotification(): Array<string>
//         {
//             return [NotifyConst.Notify_NumKeyBoard_Need_Close];
//         }
//         /**
//          * 子类需要重写
//          * */
//         public handleNotification(type: string,body: any): void
//         {
//             switch(type)
//             {
//                 case NotifyConst.Notify_NumKeyBoard_Need_Close:
//                     this.close(true,0);
//                     break;
//             }
//         }
//         private handleTab(e:egret.TouchEvent):void
//         {
//             var isUp = e.type == egret.TouchEvent.TOUCH_END;
//             if(isUp)
//             {
//                 for(var i = 0; i < 10; i++) {
//                     this.numGroup.getChildByName("white" + i).visible = true;
//                 }
//                 this.numGroup.getChildByName("del_white").visible = true;
//                 this.numGroup.getChildByName("dot_white").visible = true;
//             }
//             for(var i = 0;i < 10;i++)
//             {
//                 if(e.target == this["num_" + i])
//                 {
//                     this.numGroup.getChildByName("white" + i).visible = isUp;
//                     if(isUp)
//                     {
//                         this.sendNotification(NotifyConst.Notify_NumKeyBoard_Num,i);
//                     }
//                     return;
//                 }
//             }
//             if(e.target == this.delBtn)
//             {
//                 this.numGroup.getChildByName("del_white").visible = isUp;
//                 if(isUp) {
//                     this.sendNotification(NotifyConst.Notify_NumKeyBoard_Num,"del");
//                 }
//                 return;
//             }
//             if(e.target == this.enterBtn) 
//             {
//                 this.numGroup.getChildByName("dot_white").visible = isUp;
//                 if(isUp) {
//                     //this.close(true,0);
//                     this.sendNotification(NotifyConst.Notify_NumKeyBoard_Num,'.');
//                 }
//                 return;
//             }
//             if(e.target == this || e.target == this.bg_black || e.target == this.arrow_img || e.target == this.numGroup) //还在ui上
//             {
//                 return;
//             }
//             //关闭
//             this.close(true,0);
//         }
// 		//当舞台尺寸发生变化
// 		public onStageResize(evt: egret.Event): void
// 		{
// 			// super.onStageResize(evt);
// 		}
// 		//模块关闭
// 		public dispos(isDispos: boolean): void
// 		{
// 			super.dispos(isDispos);
//             StageUtil.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handleTab,this);
//             StageUtil.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.handleTab,this);
//             this.sendNotification(NotifyConst.Notify_NumKeyBoard_Close);
//             this.removeRegister(NumKeyBoard.NAME);
// 		}
//         public openModule(params: any,needLoadSkin: boolean,layer: number,direction: number,offx?,offy?,pdir?,spe?):void
//         {
//             super.openModule(params,needLoadSkin,layer,direction);
//             this.x = offx;
//             this.y = offy - this.height/2;
//             if(spe == "Multibaccarat")
//             {
//                 this.scaleX = this.scaleY = 0.8;
//                 this.y = this.y - 100;
//                 this.arrow_img.source = "room_pic_keyboardbg3_png";
//                 return;
//             }
//             else
//             {
//                 this.scaleX = this.scaleY = 1;
//                 this.arrow_img.source = "room_pic_keyboardbg2_png";
//             }
//             switch(pdir)
//             {
//                 case "left":
//                     this.x = offx;
//                     this.arrow_img.x = 0;
//                     this.bg_black.x = 15;
//                     this.numGroup.x = 0;
//                     break;
//                 case "right":
//                     this.x = offx - this.width;
//                     this.arrow_img.scaleX = -1;
//                     this.arrow_img.x = this.width;
//                     this.bg_black.x = 0;
//                     this.numGroup.x = -18;
//                     break;
//                 case "right-bottom":
//                     this.x = offx - this.width;
//                     this.arrow_img.scaleX = -1;
//                     this.arrow_img.x = this.width;
//                     this.bg_black.x = 0;
//                     this.numGroup.x = -18;
//             }
//         }
// 	}
// } 
//# sourceMappingURL=NumKeyBoard.js.map