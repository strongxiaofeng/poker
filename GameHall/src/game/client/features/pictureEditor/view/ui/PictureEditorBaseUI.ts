module game{
    export class PictureEditorBaseUI extends BaseUI
    {
        public constructor(data) {
            super();
            this.data = data;
        }
        protected data:any;
        /**圆形遮罩*/
        private circlePicture:egret.Shape;
        private group_Choose:eui.Group;
        private group_ShowChoose:eui.Group;
        private img_PictureEditor:eui.Image;
        private img_ChooseShow:eui.Image;
        /**遮罩图片*/
        protected imgMask:eui.Image;
        //图片选择相关
        private btn_Choose:eui.AButton;
        private label_Choose:eui.ALabel;
        private img_Out:eui.Image;
        //图片编辑相关
        private img_EditorCircle:eui.Image;
        private btn_Cancel:eui.AButton;
        private label_Cancel:eui.ALabel;
        private btn_Sure:eui.AButton;
        private label_Sure:eui.ALabel;
        //手指
        private fingers:Array<Finger>;
        private lastPt:egret.Point;
        //相对图片交集矩形相关
		private cutImgX:number;
		private cutImgY:number;
		private cutImgW:number;
		private cutImgH:number;
        //图片变化group
        private group_ImgOut:eui.Group;
        //判断是否变大
        private changeBig:Boolean;
        //转菊花
        private loadCircle:game.LoadCircle;
        private group_Out:eui.Group;
        //上传失败
        private errGroup:eui.Group;
        private label_Again:eui.ALabel;

        private group_Cancel:eui.Group;
        private group_Sure:eui.Group;
        //x,y的中心(相对于group_Choose)
        private chooseCenterX:number;
        private chooseCenterY:number;
        //返回
        private group_BackBtn:eui.AButton;
        //top条名称
        private label_title:eui.ALabel;
        //club需要的图
        private img_clubNeed:eui.ALabel;
//----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        public initSetting():void{
            super.initSetting();
            this.showCirclePicture();
            this.initCircle();
            this.theUIName(this.data);
            this.img_EditorCircle.visible = false;
            this.btn_Cancel.visible = false;
            this.btn_Sure.visible = false;
            // this.label_Cancel.visible = false;
            // this.label_Sure.visible = false;
            this.btn_Choose.visible = true;
            // this.label_Choose.visible = true;
            // this.img_Out.visible = true;
            this.group_Choose.touchEnabled = false;
            this.fingers = [];
            this.fingerPingch();
            StageUtil.maxTouches(2);
        }
//------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        public onMediatorCommand(type:PictureEditorCommands,params:any = null){
            switch (type) {
                case PictureEditorCommands.initListener:
                    this.initListener(params);
                    break;
            }
        }
//------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        protected initListener(mediator:PictureEditorMediator):void{
            this.registerEvent(this.group_BackBtn,egret.TouchEvent.TOUCH_TAP,this.closeUI,this);
            this.registerEvent(this.btn_Choose,egret.TouchEvent.TOUCH_TAP,this.pictureChoose,this);
            this.registerEvent(this.btn_Cancel,egret.TouchEvent.TOUCH_TAP,this.pictureCancel,this);
            this.registerEvent(this.btn_Sure,egret.TouchEvent.TOUCH_TAP,this.pictureSure,this);
            this.registerEvent(this.group_Choose,egret.TouchEvent.TOUCH_BEGIN,this.handleTouch,this);
            this.registerEvent(this.group_Choose,egret.TouchEvent.TOUCH_MOVE,this.handleTouch,this);
            this.registerEvent(this.group_Choose,egret.TouchEvent.TOUCH_END,this.handleTouch,this);
            this.registerEvent(this.group_Choose,egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.handleTouch,this);
        }
        /**显示圆形图片*/
        private showCirclePicture():void{
            if(this.data == PictureEditorMediator.Type_UserPicture){
                this.img_ChooseShow.source = "main_btn_all_mine_p_png";
                //判断头像是不是默认
                if(PersonalInfoModel.getInstance().avatar){
                    this.img_ChooseShow.source = PersonalInfoModel.getInstance().avatar;
                }
            }else{
                this.img_ChooseShow.source = "main_pic_defaultclub_png";
                //判断头像是不是默认
                let clubInfo = ClubModel.getInstance().getClubInfo(GlobalConfig.clubId);
                let url = clubInfo.img;
                if (url) this.setClubIcon(url);
            }
            this.groupChoose();
            //画圆
			this.circlePicture = new egret.Shape();
			this.circlePicture.graphics.beginFill(0X000000);
			this.circlePicture.graphics.drawCircle(0,0,710/2);
            this.circlePicture.graphics.endFill();
            this.circlePicture.x = 710/2 + 2;
            this.circlePicture.y = 710/2;
            //显示圆形剪切图片
            this.group_ShowChoose.addChild(this.circlePicture);
			this.img_ChooseShow.mask = this.circlePicture;
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
        /**
         * 当舞台尺寸发生变化
         */
        public onStageResize(evt: egret.Event): void {
            super.onStageResize(evt);
            if(GlobalConfig.isFixedHight){
                this.group_Cancel.width = StageUtil.width/2-32;
                this.group_Sure.width = StageUtil.width/2-32;
                this.group_Sure.right = 0;
                this.group_Cancel.left = 0;

            }
            if(GlobalConfig.isFixedHight){
                this.chooseCenterX = StageUtil.width/2;
            }
            else
            {
                this.chooseCenterX = 540;
            }
        }
        /**group_Choose的手动适配*/
        private groupChoose():void{
            this.group_Choose.height = 1275;
            this.group_Choose.left = 0;
            this.group_Choose.right = 0;
            this.group_Choose.top = 158;
            this.group_Choose.bottom = 157;
        }
        /**初始化转菊花*/
        private initCircle():void{
            this.loadCircle = new LoadCircle();
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.bottom = 100;
            this.group_Out.addChild(this.loadCircle);
            this.loadCircle.visible = false;
        }
        /**当前页面名称*/
        private theUIName(type:string):void{
            switch(type){
                case PictureEditorMediator.Type_ClubPicture:
                    this.label_title.text = "founder_btn_change_club_icon";
                    this.img_clubNeed.visible = true;
                    this.img_Out.visible = false;
                    break;
                case PictureEditorMediator.Type_UserPicture:
                    this.label_title.text = "global_btn_change_head";
                    this.img_clubNeed.visible = false;
                    this.img_Out.visible = true;
                    break;
            }
        }
        /**关闭UI*/
        private closeUI():void{
            MediatorManager.closeMediator(Mediators.Mediator_PictureEditor.name);
        }
        //---------------------------图片选择区-------------------------
        /**选择图片*/
        private pictureChoose():void{
            game.PhotoEditor.picker(this.pickOver,this);
        }
        /**显示图片*/
        private pickOver(texture:egret.Texture):void{
            if(texture == null){
                //点击之后按钮启用
                // this.label_Again.text = "仅支持图片上传";
                // this.label_Again.visible = true;
                this.tipErr("仅支持图片上传");
                this.btn_Choose.touchEnabled = true;
                this.btn_Choose.setState = "up";
                return;
            }else{
                this.label_Again.text = "图片上传失败，请重试";
                this.errGroup.visible = false;
            }
            this.group_ImgOut.visible = true;
			this.img_PictureEditor.texture = texture;
            this.img_EditorCircle.visible = true;
            let w = texture.textureWidth;
            let h = texture.textureHeight;
            this.isPictureShow(w,h);
            this.pictureShowOut();
		}
        /**选择的图片出来之后要执行的东西*/
        private pictureShowOut():void{
            this.img_ChooseShow.visible = false;
            this.btn_Cancel.visible = true;
            this.btn_Sure.visible = true;
            this.btn_Choose.visible = false;
            //点击之后按钮禁用
            this.btn_Choose.setState = "disabled";
            this.btn_Choose.touchEnabled = false;
            this.btn_Sure.touchEnabled = true;
            this.btn_Sure.setState = "up";
            this.btn_Cancel.touchEnabled = true;
            this.btn_Cancel.setState = "up";
            
            // this.label_Cancel.visible = true;
            // this.label_Sure.visible = true;
            // this.label_Choose.visible = false;
            this.circlePicture.visible = false;
            if(this.data == PictureEditorMediator.Type_UserPicture){
                this.img_Out.visible = false;
            }
            this.group_Choose.touchEnabled = true;
            this.img_PictureEditor.mask = this.imgMask;
            this.img_ChooseShow.mask = null;

        }
        /**选择的图片出来之后展示图片的判断*/
        private isPictureShow(w:number,h:number):void{
            let r = w > h ? h : w;
            if(r < 710){
                let a = 710/r;
                this.img_PictureEditor.width = w*a;
                this.img_PictureEditor.height = h*a;
                this.group_ImgOut.x = this.chooseCenterX - a*w/2;
                this.group_ImgOut.y = this.group_Choose.height/2 - a*h/2;
            }
            else
            {
                this.img_PictureEditor.width = w;
                this.img_PictureEditor.height = h;
                this.group_ImgOut.x = this.chooseCenterX - w/2;
                this.group_ImgOut.y = this.group_Choose.height/2 - h/2;
            }
            this.img_PictureEditor.verticalCenter = 0;
            this.img_PictureEditor.horizontalCenter = 0;
        }
        /*取消*/
        private pictureCancel():void{
            //还原图片
            this.img_ChooseShow.visible = true;
            this.img_ChooseShow.mask = this.circlePicture;
            this.img_ChooseShow.width = 710;
            this.img_ChooseShow.height = 710;
            this.img_ChooseShow.verticalCenter = 0;
            this.img_ChooseShow.horizontalCenter = 0;
            //group还原
            this.group_ImgOut.visible = false;
            this.img_EditorCircle.visible = false;
            //按钮变化
            this.btn_Cancel.visible = false;
            this.btn_Sure.visible = false;
            // this.label_Cancel.visible = false;
            // this.label_Sure.visible = false;
            this.btn_Choose.visible = true;
            // this.label_Choose.visible = true;
            this.circlePicture.visible = true;
            if(this.data == PictureEditorMediator.Type_UserPicture){
                this.img_Out.visible = true;
            }
            this.group_Choose.touchEnabled = false;
            //点击之后按钮启用
            this.btn_Choose.touchEnabled = true;
            this.btn_Choose.setState = "up";
            this.btn_Sure.setState = "disabled";
            this.btn_Sure.touchEnabled = false;
            this.btn_Cancel.setState = "disabled";
            this.btn_Cancel.touchEnabled = false;
            //失败提示
            // this.label_Again.visible = false;
            this.errGroup.visible = false;
        }

        //------------------------------图片变化区---------------------------
        /**当前手指数量 */
        private addFinger(finger:Finger):number
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
        private removeFinger(touchPointID:number):number
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
        private getFinger(touchPointID:number):Finger
        {
            for(let i = this.fingers.length - 1;i >= 0;i--)
            {
                if(this.fingers[i].id == touchPointID)
                {
                    return this.fingers[i];
                }
            }
        }
        private handleTouch(e:egret.TouchEvent):void
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
                    let a = this.img_PictureEditor.scaleX;
                    if(this.fingers.length > 1 || this.fingers.length == 0)
                    {
                        if(finger)
                        {
                            if(a >= 1)
                            {
                                finger.startX = e.stageX;
                                finger.startY = e.stageY;
                            }
                            a >= 1 ? this.changeBig = true : this.changeBig = false;
                        }
                        return;
                    }

                    if(finger)
                    {
                        finger.endX = e.stageX;
                        finger.endY = e.stageY;
                        //移动范围的判断
                        if(this.changeBig == true)
                        {
                            let a = this.img_PictureEditor.scaleX;
                            this.isOneMove(finger,w*a,h*a);
                        }
                        else
                        {
                            this.isOneMove(finger,w,h);
                        }
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
            let x2 = this.chooseCenterX;
            let y2 = this.group_Choose.height/2;
            //移动范围的判断
            if(w == 710)
            {
                if(h !=710){
                    if(y <= y2 - 710/2 && y >= y2 + 710/2 - h)
                    {
                        this.group_ImgOut.x = x1;
                        this.group_ImgOut.y = y;
                    }
                }
            }
            else if(w > 710)
            {
                if(h == 710)
                {
                    if(x <= x2 - 710/2 && x >= x2 + 710/2 - w)
                    {
                        this.group_ImgOut.x = x;
                        this.group_ImgOut.y = y1;
                    }
                }
                else if(h > 710)
                {   if(y <= y2 - 710/2 && y >= y2 + 710/2 - h && x <= x2 - 710/2 && x >= x2 + 710/2 - w)
                    {
                        this.group_ImgOut.x = x;
                        this.group_ImgOut.y = y;
                    }
                }
            }
        }
        /**手势库*/
        private fingerPingch():void{
            var type:string = GestureType.PINCH;//缩放图片的手势的类型
            var event:string = GestureState.CHANGED;//事件发生变化
            var config = {};
            config[type] = {};
            config[type][event] = this.onTapRecognized.bind(this);//两根手指缩放的库
            GestureManager.add(this, config, false);
        }
        /**什么手势，图片做什么变化*/
        private onTapRecognized(e:GestureEvent):void {
            let changeScale = this.img_PictureEditor.scaleX - 0.01;
            let a = this.img_PictureEditor.scaleX;
            let x = this.group_ImgOut.x;
            let y = this.group_ImgOut.y;
            let w = this.img_PictureEditor.width;
            let h = this.img_PictureEditor.height;
            let x2 = this.chooseCenterX;
            let y2 = this.group_Choose.height/2;
            //缩小范围判断
            if(changeScale >= 1 && e.dScale < 1)
            {
                if(y > y2 + 710/2 - a*h && y <= y2 - 710/2 && x > x2 + 710/2 - a*w && x <= x2 - 710/2)
                {
                    this.img_PictureEditor.scaleX -= 0.01;
                    this.img_PictureEditor.scaleY -= 0.01;
                }
                if( y <= y2 - 710/2 && y == y2 + 710/2 - a*h && x > x2 + 710/2 - a*w && x < x2 - 710/2)
                {
                    this.img_PictureEditor.scaleX -= 0.01;
                }
                if( x <= x2 - 710/2 && x == x2 + 710/2 - a*w && y > y2 + 710/2 - a*h && y < y2 - 710/2)
                {
                    this.img_PictureEditor.scaleY -= 0.01;
                }
            }
            //放大
            if (e.dScale > 1)
            {
                this.img_PictureEditor.scaleX += 0.01;
                this.img_PictureEditor.scaleY += 0.01;
            }
        }
        //----------------------------------图片剪切区--------------------------------------------
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
        protected showEditPic:egret.Bitmap = new egret.Bitmap;
        /**上传图片*/
		private showCutPhoto(renderTexture:egret.RenderTexture):void{
            this.showEditPic.texture = renderTexture;
            // this.group_Out.addChild(this.showEditPic);
            let renderT = new egret.RenderTexture();
            renderT.drawToTexture(this.showEditPic,new egret.Rectangle(0,0,700,700),1);
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
                        // this.label_Again.visible = true;
                        this.tipErr("图片上传失败，请重试");
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
                        // this.label_Again.visible = true;
                        this.tipErr("图片上传失败，请重试");
                    });
                    break;
            }
		}
        /**错误提示*/
        private tipErr(txt:string):void{
            this.label_Again.text = txt;
            CTweenManagerController.getInstance().startCTween(2,[this.errGroup]);
        }
		/**判断剪切框和图片是否有交集，如果有求出交集矩形*/
		private isIntersection():void{

			//图片左上顶点的x
			let imgX1 = this.group_ImgOut.x;
			//图片左上顶点的y
			let imgY1 = this.group_ImgOut.y;
			//图片右下顶点的x
			let imgX2 = this.group_ImgOut.x + this.group_ImgOut.width;
			//图片右下顶点的y
			let imgY2 = this.group_ImgOut.y + this.group_ImgOut.height;
			//剪切框的位置是不变的，在中心(centerX,centerY),剪切框的宽高710,710;
            let centerX = this.chooseCenterX;
            let centerY = this.group_Choose.height/2;
			//剪切框左上顶点的x
			let cutX1 = centerX - 710/2;
			//剪切框左上顶点的Y
			let cutY1 = centerY - 710/2;
			//剪切框右下顶点的Y
			let cutX2 = centerX + 710/2;
			//剪切框右下顶点的Y
			let cutY2 = centerY + 710/2;

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
        public dispose(): void {
            super.dispose();
            CTweenManagerController.getInstance().endAllCTween();
            StageUtil.maxTouches(1);
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