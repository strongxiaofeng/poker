module game{
    export class PCPEBaseUI1 extends BaseUI
    {
        public constructor(data) {
            super();
            this.data = data;
            this.skinName = "resource/skins/game_skins/pc/my/pictureEditor.exml";
        }
        protected data:any;
        /**最大的Group*/
        protected groupPE:eui.Group;
        //转菊花
        protected loadCircle:game.LoadCircle;
        /**圆形遮罩*/
        protected circlePicture:egret.Shape;
        /**图片显示group*/
        protected group_ShowChoose:eui.Group;
        /**图片显示*/
        protected img_ChooseShow:eui.Image;
        /**图片显示的外圈*/
        protected img_Out:eui.Image;
        /**页面名称*/
        protected labelTop:eui.ALabel;
        /**俱乐部需要的图片*/
        protected img_clubNeed:eui.Image;
        /**图片选择按钮*/
        protected btn_Choose:eui.AButton;
        /**图片选择大Group*/
        protected group_Choose:eui.Group;
        /**遮罩图片*/
        protected imgMask:eui.Image;
        /**取消按钮*/
        protected btn_Cancel:eui.AButton;
        /**确定按钮*/
        protected btn_Sure:eui.AButton;
        /**编辑的图片*/
        protected img_PictureEditor:eui.Image;
        /**编辑图片的Group*/
        protected group_ImgOut:eui.Group;
        /**编辑图片的圆框遮罩*/
        protected img_EditorCircle:eui.Image;
        /**提示的Group*/
        protected groupErr:eui.Group;
        protected label_Again:eui.ALabel;
        /**两个按钮时的Group*/
        protected groupTwoBtn:eui.Group;
        //相对图片交集矩形相关
		protected cutImgX:number;
		protected cutImgY:number;
		protected cutImgW:number;
		protected cutImgH:number;
        //手指
        private fingers:Array<Finger>;
        private lastPt:egret.Point;
        /**判断是否变大*/
        private changeBig:boolean;
        /**判断是否可变小*/
        private changeMin:boolean;
        /**选择按钮移入效果相关*/
        private labelChoose:eui.ALabel;
        /**放大按钮*/
        private changeBigBtn:eui.AButton;
        /**缩小按钮*/
        private changeLittleBtn:eui.AButton;
        /**放大缩小按钮框*/
        private groupChangeBtn:eui.Group;
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        public initSetting():void{
            super.initSetting();
            this.initShowData(this.data);
            this.initCircle();
            this.showCirclePicture();
            this.pictureCancel();
            this.fingers = [];
            this.labelChoose.touchEnabled = false;
        }
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        public onMediatorCommand(type:PCPECommands,params:any = null){
            switch (type) {
                case PCPECommands.initListener:
                    this.initListener(params);
                    break;
            }
        }
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        protected initListener(mediator:PictureEditorMediator):void{
            this.registerEvent(this.btn_Choose,egret.TouchEvent.TOUCH_BEGIN,()=>{
                //相关效果
                this.labelChoose.visible = false;
            },this);
            this.registerEvent(this.btn_Choose,egret.TouchEvent.TOUCH_END,()=>{
                //相关效果
                this.labelChoose.visible = true;
            },this);
            this.registerEvent(this.btn_Choose, mouse.MouseEvent.MOUSE_OVER,()=>{
                this.labelChoose.visible = true;
            }, this);
            this.registerEvent(this.btn_Choose, mouse.MouseEvent.MOUSE_OUT,()=>{
                this.labelChoose.visible = false;
            }, this);
            this.registerEvent(this.btn_Choose,egret.TouchEvent.TOUCH_TAP,this.pictureChoose,this);
            this.registerEvent(this.btn_Cancel,egret.TouchEvent.TOUCH_TAP,this.closeUI,this);
            this.registerEvent(this.btn_Sure,egret.TouchEvent.TOUCH_TAP,this.pictureSure,this);
            this.registerEvent(this.group_Choose,egret.TouchEvent.TOUCH_BEGIN,this.handleTouch,this);
            this.registerEvent(this.group_Choose,egret.TouchEvent.TOUCH_MOVE,this.handleTouch,this);
            this.registerEvent(this.group_Choose,egret.TouchEvent.TOUCH_END,this.handleTouch,this);
            this.registerEvent(this.group_Choose,egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.handleTouch,this);
            this.registerEvent(this.btn_Cancel, mouse.MouseEvent.MOUSE_OVER,()=>{
                (this.btn_Cancel.getChildByName("labelDisplay") as eui.Label).textColor = 0x654D29;
            }, this);
            this.registerEvent(this.btn_Cancel, mouse.MouseEvent.MOUSE_OUT,()=>{
                (this.btn_Cancel.getChildByName("labelDisplay") as eui.Label).textColor = 0xff0400;
            }, this);
            this.registerEvent(this.btn_Sure, mouse.MouseEvent.MOUSE_OVER,()=>{
                (this.btn_Sure.getChildByName("labelDisplay") as eui.Label).textColor = 0x654D29;
            }, this);
            this.registerEvent(this.btn_Sure, mouse.MouseEvent.MOUSE_OUT,()=>{
                (this.btn_Sure.getChildByName("labelDisplay") as eui.Label).textColor = 0x00cc3e;
            }, this);
            this.registerEvent(this.changeBigBtn,egret.TouchEvent.TOUCH_TAP,this.imgChange,this);
            this.registerEvent(this.changeLittleBtn,egret.TouchEvent.TOUCH_TAP,this.imgChange,this);
        }
        /**初始化转菊花*/
        protected initCircle():void{
            this.loadCircle = new LoadCircle(false);
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.bottom = 150;
            this.groupPE.addChild(this.loadCircle);
            this.loadCircle.visible = false;
        }
        /**初始化和刷新数据数据*/
        protected initShowData(type: string): void {
            switch (type) {
                case PCPEMediator.Type_ClubPicture:
                    this.img_clubNeed.visible = true;
                    this.img_Out.visible = false;
                    this.labelTop.text = "founder_btn_change_club_icon";

                    this.img_ChooseShow.source = "mine_pic_defaultclub_pc_png";
                    //判断头像是不是默认
                    let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
                    let url = clubInfo.img;
                    if (url) this.setClubIcon(url);
                    break;
                case PCPEMediator.Type_UserPicture:
                    this.img_clubNeed.visible = false;
                    this.img_Out.visible = true;
                    this.labelTop.text = "global_btn_change_head";

                    this.img_ChooseShow.source = "mine_pic_defaultmember_pc_png";
                    //判断头像是不是默认
                    if(PersonalInfoModel.getInstance().avatar){
                        this.img_ChooseShow.source = PersonalInfoModel.getInstance().avatar;
                    }
                    break;
            }
        }
        /** 设置club头像 */
        protected setClubIcon(url: string): void {
            let ip = GlobalConfig.defaultIP
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            let fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, (data) => {
                this.img_ChooseShow.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        }
        /**显示圆形图片*/
        protected showCirclePicture():void{
            //画圆
			this.circlePicture = new egret.Shape();
			this.circlePicture.graphics.beginFill(0X000000);
			this.circlePicture.graphics.drawCircle(0,0,330/2);
            this.circlePicture.graphics.endFill();
            this.circlePicture.x = 330/2 + 60;
            this.circlePicture.y = 330/2 + 31;
            //显示圆形剪切图片
            this.group_ShowChoose.addChild(this.circlePicture);
			this.img_ChooseShow.mask = this.circlePicture;
        }
        //---------------------------图片选择区-------------------------
        /**选择图片*/
        protected pictureChoose():void{
            game.PhotoEditor.picker(this.pickOver,this);
        }
        /**显示图片*/
        protected pickOver(texture:egret.Texture):void{
            if(texture == null){
                //点击之后按钮启用
                this.label_Again.text = "仅支持图片上传";
                this.groupErr.visible = true;
                this.btn_Choose.touchEnabled = true;
                this.btn_Choose.setState = "up";
                return;
            }else{
                this.label_Again.text = "图片上传失败，请重试";
                this.groupErr.visible = false;
            }
            this.group_ImgOut.visible = true;
			this.img_PictureEditor.texture = texture;
            this.img_EditorCircle.visible = true;
            this.groupChangeBtn.visible = true;
            
            let w = texture.textureWidth;
            let h = texture.textureHeight;
            this.isPictureShow(w,h);
            this.pictureShowOut();
		}
        /**选择的图片出来之后展示图片的判断*/
        protected isPictureShow(w:number,h:number):void{
            let r = w > h ? h : w;
            if(r < 340){
                let a = 340/r;
                this.img_PictureEditor.width = w*a;
                this.img_PictureEditor.height = h*a;
                this.group_ImgOut.x = (this.img_Out.x + this.img_Out.width/2) - a*w/2;
                this.group_ImgOut.y = (this.img_Out.y + this.img_Out.height/2) - a*h/2;
            }
            else
            {
                this.img_PictureEditor.width = w;
                this.img_PictureEditor.height = h;
                this.group_ImgOut.x = (this.img_Out.x + this.img_Out.width/2) - w/2;
                this.group_ImgOut.y = (this.img_Out.y + this.img_Out.height/2) - h/2;
            }
            let changeScale = this.img_PictureEditor.scaleX - 0.1;
            let min = r*changeScale > 340 ? true : false;
            if(min){
                this.changeBtnUse(0,true);
            }else{
                this.changeBtnUse(2,false);
            }
            this.img_PictureEditor.verticalCenter = 0;
            this.img_PictureEditor.horizontalCenter = 0;
        }
        /**选择的图片出来之后要执行的东西*/
        protected pictureShowOut():void{
            this.group_ShowChoose.visible = false;
            this.groupTwoBtn.visible = true;
            this.btn_Choose.visible = false;
            //点击之后按钮禁用
            this.btn_Choose.setState = "disabled";
            this.btn_Choose.touchEnabled = false;
            this.btn_Sure.touchEnabled = true;
            this.btn_Sure.setState = "up";
            this.btn_Cancel.touchEnabled = true;
            this.btn_Cancel.setState = "up";

            this.img_PictureEditor.mask = this.imgMask;
            this.group_Choose.touchEnabled = true;
        }
        /**图片选择界面*/
        protected pictureCancel():void{
            //还原图片
            this.img_EditorCircle.visible = false;
            //group还原
            this.group_ShowChoose.visible = true;
            this.group_ImgOut.visible = false;
            //按钮变化
            this.groupTwoBtn.visible = false;
            this.btn_Choose.visible = true;
            
            this.group_Choose.touchEnabled = false;
            this.group_ImgOut.touchEnabled = false;
            //点击之后按钮启用
            this.btn_Choose.touchEnabled = true;
            this.btn_Choose.setState = "up";
            this.btn_Sure.setState = "disabled";
            this.btn_Sure.touchEnabled = false;
            this.btn_Cancel.setState = "disabled";
            this.btn_Cancel.touchEnabled = false;
            //失败提示
            this.groupErr.visible = false;
            //放大缩小按钮框
            this.groupChangeBtn.visible = false;
        }
        //------------------------------图片变化区---------------------------
        /**当前手指数量 */
        protected addFinger(finger:Finger):number
        {
            for(let i = this.fingers.length - 1;i >= 0;i--)
            {
                if(this.fingers[i].id == finger.id)
                {
                    this.fingers[i] = finger;//更新手指数量(包含手指数据)
                    return this.fingers.length;
                }
            }

            this.fingers.push(finger);
            return this.fingers.length;
        }

        /**移除手指*/
        protected removeFinger(touchPointID:number):number
        {
            for(let i = this.fingers.length - 1;i >= 0;i--)
            {
                if(this.fingers[i].id == touchPointID)
                {
                    this.fingers.splice(i,1);
                }
            }
            return this.fingers.length;
        }

        /**获取指定touchid的手指信息*/
        protected getFinger(touchPointID:number):Finger
        {
            for(let i = this.fingers.length - 1;i >= 0;i--)
            {
                if(this.fingers[i].id == touchPointID)
                {
                    return this.fingers[i];
                }
            }
        }
        /**图片变化*/
        private imgChange(evt:egret.TouchEvent):void {
            let isChangeBig:boolean;
            switch(evt.target){
                case this.changeBigBtn: 
                    isChangeBig = true;
                    break;
                case this.changeLittleBtn: 
                    isChangeBig = false;
                    break;
            }
            let changeScale = this.img_PictureEditor.scaleX - 0.1;
            let a = this.img_PictureEditor.scaleX;
            let x = this.group_ImgOut.x;
            let y = this.group_ImgOut.y;
            let w = this.img_PictureEditor.width;
            let h = this.img_PictureEditor.height;
            let x2 = (this.img_Out.x + this.img_Out.width/2);
            let y2 = (this.img_Out.y + this.img_Out.height/2);
            //能否缩小的判断
            let isMin = w >= h ? h : w;
            this.changeMin = isMin*changeScale > 340 ? true : false;
            //放大
            if (isChangeBig)
            {   
                this.changeBtnUse(2,true);
                this.img_PictureEditor.scaleX += 0.1;
                this.img_PictureEditor.scaleY += 0.1;
            }else{
                 //缩小范围判断
                if(this.changeMin && !isChangeBig)
                {   
                    this.changeBtnUse(2,true);
                    if(y > y2 + 340/2 - changeScale*h && y <= y2 - 340/2 && x > x2 + 340/2 - changeScale*w && x <= x2 - 340/2)
                    {
                        this.img_PictureEditor.scaleX -= 0.1;
                        this.img_PictureEditor.scaleY -= 0.1;
                    }
                    if( y <= y2 - 340/2 && y == y2 + 340/2 - changeScale*h && x > x2 + 340/2 - changeScale*w && x < x2 - 340/2)
                    {
                        this.img_PictureEditor.scaleX -= 0.1;
                    }
                    if( x <= x2 - 340/2 && x == x2 + 340/2 - changeScale*w && y > y2 + 340/2 - changeScale*h && y < y2 - 340/2)
                    {
                        this.img_PictureEditor.scaleY -= 0.1;
                    }
                }else{
                    this.changeBtnUse(2,false);
                }
            }
            a >= 1 ? this.changeBig = true : this.changeBig = false;
        }
        protected handleTouch(e:egret.TouchEvent):void
        {
            let finger:Finger;
            switch(e.type)
            {
                case egret.TouchEvent.TOUCH_BEGIN:
                    finger = new Finger();
                    finger.id = e.touchPointID;
                    finger.startX = e.stageX;
                    finger.startY = e.stageY;
                    this.addFinger(finger);
                    this.lastPt = new egret.Point(this.group_ImgOut.x,this.group_ImgOut.y);
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    finger = this.getFinger(e.touchPointID);
                    let w = this.group_ImgOut.width;
                    let h = this.group_ImgOut.height;
                    if(finger)
                    {
                        finger.endX = e.stageX;
                        finger.endY = e.stageY;
                        this.isOneMove(finger,w,h);
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    finger = this.getFinger(e.touchPointID);
                    this.removeFinger(e.touchPointID);
                    break;
            }
        }
        /**判断什么时候一根手指移动*/
        private isOneMove(finger:Finger,w:number,h:number):void{
            let pt = finger.changePoint();
            let x = this.lastPt.x + pt.x;
            let y = this.lastPt.y + pt.y;
            let x1 = this.group_ImgOut.x;
            let y1 = this.group_ImgOut.y;
            let x2 = (this.img_Out.x + this.img_Out.width/2);
            let y2 = (this.img_Out.y + this.img_Out.height/2);
            //移动范围的判断
            if(w == 340)
            {
                if(h !=340){
                    if(y <= y2 - 340/2 && y >= y2 + 340/2 - h)
                    {
                        this.group_ImgOut.x = x1;
                        this.group_ImgOut.y = y;
                    }
                }
            }
            else if(w > 340)
            {
                if(h == 340)
                {
                    if(x <= x2 - 340/2 && x >= x2 + 340/2 - w)
                    {
                        this.group_ImgOut.x = x;
                        this.group_ImgOut.y = y1;
                    }
                }
                else if(h > 340)
                {   if(y <= y2 - 340/2 && y >= y2 + 340/2 - h && x <= x2 - 340/2 && x >= x2 + 340/2 - w)
                    {
                        this.group_ImgOut.x = x;
                        this.group_ImgOut.y = y;
                    }
                }
            }
        }
        //----------------------------------图片剪切区--------------------------------------------
        /**放大缩小按钮的禁用与启用
         * isType 0全部按钮，1变大按钮，2缩小按钮;isTrue 是否启用
        */
        protected changeBtnUse(isType:number,isTrue:boolean):void{
            switch(isType){
                case 0:
                    if(isTrue){
                        this.changeBigBtn.setState = "up";
                        this.changeLittleBtn.setState = "up";
                    }else{
                        this.changeBigBtn.setState = "disabled";
                        this.changeLittleBtn.setState = "disabled";
                    }
                    this.changeBigBtn.touchEnabled = isTrue;
                    this.changeLittleBtn.touchEnabled = isTrue;
                    break;
                case 1:
                    if(isTrue){
                        this.changeBigBtn.setState = "up";
                    }else{
                        this.changeBigBtn.setState = "disabled";
                    }
                    this.changeBigBtn.touchEnabled = isTrue;
                    break;
                case 2:
                    if(isTrue){
                        this.changeLittleBtn.setState = "up";
                    }else{
                        this.changeLittleBtn.setState = "disabled";
                    }
                    this.changeLittleBtn.touchEnabled = isTrue;
                    break;
            }
        }
        /**确定*/
        private pictureSure():void{
            //点击之后按钮禁用
            this.btn_Sure.setState = "disabled";
            this.btn_Sure.touchEnabled = false;
            this.btn_Cancel.setState = "disabled";
            this.btn_Cancel.touchEnabled = false;
            this.btn_Choose.touchEnabled = true;
            this.btn_Choose.setState = "up";
            //转菊花的开启
            this.loadCircle.visible = true;
            this.loadCircle.start();

            this.changeBtnUse(0,false);
            //此时页面不可点
            this.group_Choose.touchEnabled = false;
            this.pickEditor();
        }
        /**剪切图片*/
        private pickEditor():void{
			this.isIntersection();
			let cutRectangle:egret.Rectangle = new egret.Rectangle(this.cutImgX,this.cutImgY,this.cutImgW,this.cutImgH);
        	game.PhotoEditor.cutBitmap(this.group_ImgOut,cutRectangle,this.showCutPhoto,this);
		}
        /**关闭UI*/
        private closeUI():void{
            GameController.getInstance().sendNotification(NotifyConst.Notify_PC_CloseMenu,2);
        }
        protected showEditPic:egret.Bitmap = new egret.Bitmap;
        /**上传图片*/
		private showCutPhoto(renderTexture:egret.RenderTexture):void{
            this.showEditPic.texture = renderTexture;
            // this.group_Out.addChild(this.showEditPic);
            let renderT = new egret.RenderTexture();
            renderT.drawToTexture(this.showEditPic,new egret.Rectangle(0,0,340,340),1);
            switch(this.data){
                case PictureEditorMediator.Type_ClubPicture:
                    ClubController.getInstance().editClub(GlobalConfig.clubId + "", null, null, null, renderT).then(()=>{
                        //转菊花的关闭
                        this.loadCircle.stop();
                        this.loadCircle.visible = false;
                        //关闭图片编辑页面
                        this.closeUI();
                    }).catch(()=>{
                        //转菊花的关闭
                        this.loadCircle.stop();
                        this.loadCircle.visible = false;
                        //回到图片选择界面
                        this.pictureCancel()
                        //显示上传失败
                        this.groupErr.visible = true;
                    });
                    break;
                case PictureEditorMediator.Type_UserPicture:
                    //显示剪切图片
                    PersonalInfoController.getInstance().updatePlayerInfo(
                        null,
                        renderT
                    ).then(()=>{//上传图片成功时执行
                        //转菊花的关闭
                        this.loadCircle.stop();
                        this.loadCircle.visible = false;
                        //关闭图片编辑页面
                        this.closeUI();
                    }).catch((err)=>{//上传图片失败时执行
                        //转菊花的关闭
                        this.loadCircle.stop();
                        this.loadCircle.visible = false;
                        //回到图片选择界面
                        this.pictureCancel()
                        //显示上传失败
                        this.groupErr.visible = true;
                    });
                    break;
            }
		}
        /**判断剪切框和图片是否有交集，如果有求出交集矩形*/
		protected isIntersection():void{

			//图片左上顶点的x
			let imgX1 = this.group_ImgOut.x;
			//图片左上顶点的y
			let imgY1 = this.group_ImgOut.y;
			//图片右下顶点的x
			let imgX2 = this.group_ImgOut.x + this.group_ImgOut.width;
			//图片右下顶点的y
			let imgY2 = this.group_ImgOut.y + this.group_ImgOut.height;
			//剪切框的位置是不变的，在中心(centerX,centerY),剪切框的宽高340,340;
            let centerX = (this.img_Out.x + this.img_Out.width/2);
            let centerY = (this.img_Out.y + this.img_Out.height/2);
			//剪切框左上顶点的x
			let cutX1 = centerX - 340/2;
			//剪切框左上顶点的Y
			let cutY1 = centerY - 340/2;
			//剪切框右下顶点的Y
			let cutX2 = centerX + 340/2;
			//剪切框右下顶点的Y
			let cutY2 = centerY + 340/2;

			//设置交集矩形的左上顶点的x,y;右下顶点的x,y;
			//交集矩形的左上顶点的x
			let startX = imgX1 > cutX1 ? imgX1 : cutX1;
			//交集矩形的左上顶点的y
			let startY = imgY1 > cutY1 ? imgY1 : cutY1;
			//交集矩形的右下顶点的x
			let endX = imgX2 < cutX2 ? imgX2 : cutX2;
			//交集矩形的右下顶点的y
			let endY = imgY2 < cutY2 ? imgY2 : cutY2;
			//判断是否有交集
			if(startX >= endX || startY >= endY){
			}
			else
			{
				//相对图片交集矩形的左上顶点的x
				this.cutImgX = startX - imgX1;
				//相对图片交集矩形的左上顶点的y
				this.cutImgY = startY - imgY1;
				//相对图片交集矩形的宽
				this.cutImgW = endX - startX;
				//相对图片交集矩形的高
				this.cutImgH = endY - startY;
			}
		}
    }
    //-----------------------------关于手指----------------------------
    class Finger
    {
        public id:number;
        public startX:number;
        public startY:number;
        public endX:number;
        public endY:number;

        /**终点和起点的距离 */
        public getDistance():number
        {
            let dis = egret.Point.distance(new egret.Point(this.startX,this.startY),new egret.Point(this.endX,this.endY));
            return dis;
        }

        /**改变的坐标 */
        public changePoint():egret.Point
        {
            let pt = new egret.Point(this.endX - this.startX,this.endY - this.startY);
            return pt;
        }
    }
}