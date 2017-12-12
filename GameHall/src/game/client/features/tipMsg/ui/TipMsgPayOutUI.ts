module game {
	/** 派彩 */
	export class TipMsgPayOutUI extends BaseUI{
        private data:any;
        //派彩金额
		private payOutNum:eui.BitmapLabel;
        //天生赢家
        private isWinnerGroup:eui.Group;
        //派彩动画
        public payOutBg: eui.Image;
        public payOutTxtGroup: eui.Group;
        public payOutImg0: eui.Image;
        public payOutImg1: eui.Image;
        public payOutImg2: eui.Image;
        public payOutImg3: eui.Image;
        public payOutImg4: eui.Image;
        public payOutImg5: eui.Image;
        public payOutImg6: eui.Image;
        /**
         * data[payOutN,isWin]
         * data[派彩金额，是否是天生赢家]
        */
		public constructor(data) {
			super();
			this.data = data;
			this.skinName = SystemPath.skin_path + "tipMsg/tipMsgPayOutSkin.exml";
		}
        public initSetting(): void 
		{
			this.isWin();
            this.payOutN();
            this.payOutCTween();
        }
        public onMediatorCommand(type: any, params: any = null): void 
		{

        }
        /**是否是天生赢家*/
        private isWin():void{
            this.isWinnerGroup.visible = this.data[1];
        }
        /**派彩金额*/
        private payOutN():void{
            if(this.data[0] > 0){
                this.payOutNum.text = NumberUtil.getSplitNumStr(this.data[0]);
            }else{
                MediatorManager.closeMediator(Mediators.Mediator_TipPayOut.name);
            }
        }
        /**派彩动画*/
        private payOutCTween():void{
            let y0 = 144;
            let y3 = 152;

            for (let i = 0; i < 7; i++) {
                if (i < 3) {
                    (<eui.Image>this[`payOutImg${i}`]).y = y0 - i * 18.5;
                }
                else {
                    (<eui.Image>this[`payOutImg${i}`]).y = y3 - (i - 3) * 18.5;
                }

            }

            this.payOutBg.visible = false;
            this.payOutTxtGroup.visible = false;
            this.payOutBg.alpha = 0.01;
            this.payOutTxtGroup.alpha = 0.01;
            for (let i = 0; i < 7; i++) {
                this[`payOutImg${i}`].visible = false;
                this[`payOutImg${i}`].y = this[`payOutImg${i}`].y - 150;
                this[`payOutImg${i}`].rotation = 0;
                (<eui.Image>this[`payOutImg${i}`]).anchorOffsetX = 50;
                (<eui.Image>this[`payOutImg${i}`]).anchorOffsetY = 50;
            }
            let index = 0;
            this.showChipMove(index);
        }
        public showChipMove(index: number)
        {
            if (index < 7) {
                this[`payOutImg${index}`].visible = true;
                if (index == 2 || index == 6) {
                    CTween.get(this[`payOutImg${index}`]).to({ y: this[`payOutImg${index}`].y + 150 }, 200)
                        .to({ rotation: -10 }, 50)
                        .to({ rotation: 10 }, 50)
                        .to({ rotation: -10 }, 50)
                        .to({ rotation: 10 }, 50)
                        .to({ rotation: 0 }, 50)
                        .call(() =>
                        {
                            index++;
                            this.showChipMove(index)
                        })
                }
                else {
                    CTween.get(this[`payOutImg${index}`]).to({ y: this[`payOutImg${index}`].y + 150 }, 200)
                        .call(() =>
                        {
                            index++;
                            this.showChipMove(index)
                        })
                }
            }
            else if (index == 7) {
                this.payOutBg.visible = true;
                this.payOutTxtGroup.visible = true;
                CTween.get(this.payOutTxtGroup).to({ alpha: 1 }, 1000);
                CTween.get(this.payOutBg).to({ alpha: 1 }, 1000)
            }
            else {
                return;
            }
        }
        public dispose(): void 
		{
			super.dispose();
			CTween.removeTweens(this);
		}
	}
}