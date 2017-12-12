module game {

    export class GameRuleUI1 extends GameRuleBaseUI {

        public constructor(data) {
            super(data);
            this.skinName = "resource/skins/game_skins/mobile/gameRule/gameRuleSkin.exml";
        }

        private groupBasic:eui.Group;
        private groupCard:eui.Group;
        private groupCount:eui.Group;
        private groupResult:eui.Group;
        private groupDouble:eui.Group;
        private groupThird:eui.Group;
        private groupThird0:eui.Group;

        private imgGroup1:eui.Group;

        private bgImg1:eui.Image;

        private longLabel0:eui.ALabel;
        private longLabel1:eui.ALabel;
        private longLabel2:eui.ALabel;
        private longLabel3:eui.ALabel;
        private longLabel4:eui.ALabel;
        private longLabel10:eui.ALabel;
        private longLabel13:eui.ALabel;
        private longLabel14:eui.ALabel;
        private longLabel15:eui.ALabel;
        private longLabel16:eui.ALabel;

        private longLabelIcon2:eui.Image;
        private longLabelIcon4:eui.Image;
        /**变化的高度*/
        private changeH:number = 0;

        // ---------------------------------- 设置文本是否换行 ----------------------------------

        /**组件创建完成初始化数据等操作 */
        public initSetting(): void {
            super.initSetting();
            this.checkLabel0();
            this.checkLabel1();
            this.checkLabel2();
            // this.checkLabel3();
            // this.checkLabel4();
            this.checkLabel5();
            this.checkLabel6();
        }

    /** groupBasic*/
        /** 判断是否换行*/
        private checkLabel0():void
        {
            this.labelWrap([this.longLabel0],this.groupBasic);
            this.moveDown(this.groupBasic);
        }

    /** groupCard*/
        private checkLabel1():void
        {
            this.labelWrap([this.longLabel1,this.longLabel2],this.groupCard,true,this.longLabelIcon2);
            this.moveDown(this.groupCard);
        }
    /** groupCount*/
        private checkLabel2():void
        {
            this.labelWrap([this.longLabel3,this.longLabel4],this.groupCount,true,this.longLabelIcon4);
            this.moveDown(this.groupCount);
            
        }
    /** groupResult*/
        private checkLabel3():void
        {
            this.labelWrap([this.longLabel13],this.groupResult);
            this.moveDown(this.groupResult);
        }
    /** groupDouble*/
        private checkLabel4():void
        {
            
        }
    /** groupThird*/
        private checkLabel5():void
        {
            this.labelWrap([this.longLabel14],this.groupThird);
            this.moveDown(this.groupThird);
        }
    /** groupThird0*/
        private checkLabel6():void
        {
            this.labelWrap([this.longLabel15,this.longLabel16],this.groupThird0);
            this.moveDown(this.groupThird0);
        }
        /** 换行
         * @param laArr 判断的文本的数组
         * @param group 当前Group
         * @param isAdjacent 是否相邻
        */
        private labelWrap(labArr:Array<eui.ALabel>, group:eui.Group,isAdjacent:boolean = false,icon?:eui.Image):void
        {   
            let lastH = 0;
            for(let i = 0; i < labArr.length; i++){
                labArr[i].newlineAble = true;
                //text高度
                let txtH = labArr[i].textHeight;
                //label高度
                let labH = labArr[i].height;
                //判断是否要换行
                if(labH < txtH){
                    if(isAdjacent && lastH){
                        this.txtMoveH(labArr[i],lastH);
                        this.iconMoveH(icon,lastH);
                    }
                    labArr[i].height = txtH;
                    let moveH = txtH - labH;
                    lastH = moveH;
                    this.changeH += moveH;
                }
                let str = labArr[i].text;
                labArr[i].text = str;
            }
        }
        /**图标下移*/
        private iconMoveH(icon:eui.Image,moveH:number):void{
            icon.top = icon.top + moveH;
        }
        /**文本下移*/
        private txtMoveH(txt:eui.Label,moveH:number){
            txt.top = txt.top + moveH;
        }
        /**
         * group下移函数
        */
        private moveDown(group:eui.Group):void{
            switch(group){
                case this.groupBasic:
                    this.moveH(this.groupBasic,[this.groupCard,this.groupCount,this.groupResult,this.groupDouble,this.groupThird,this.groupThird0]);
                    break;
                case this.groupCard:
                    this.moveH(this.groupCard,[this.groupCount,this.groupResult,this.groupDouble,this.groupThird,this.groupThird0]);
                    break;
                case this.groupCount:
                    this.moveH(this.groupCount,[this.groupResult,this.groupDouble,this.groupThird,this.groupThird0]);
                    break;
                case this.groupResult:
                    this.moveH(this.groupResult,[this.groupDouble,this.groupThird,this.groupThird0]);
                    break;
                case this.groupDouble:
                    this.moveH(this.groupDouble,[this.groupThird,this.groupThird0]);
                    break;
                case this.groupThird:
                    this.moveH(this.groupThird,[this.groupThird0]);
                    break;
                case this.groupThird0:
                    this.moveH(this.groupThird0,[]);
                    break;
            }
        }
        /**下移具体操作
         * 
        */
        private moveH(group:eui.Group,arr:Array<eui.Group>):void{
            let owerH = group.height;
            group.height = owerH + this.changeH;
            if(arr.length > 0){
                for(let i = 0;i < arr.length;i++){
                    arr[i].top = arr[i].top + this.changeH
                }
            }
        }
        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}