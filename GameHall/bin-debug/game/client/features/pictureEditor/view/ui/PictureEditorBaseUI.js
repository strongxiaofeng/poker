var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var PictureEditorBaseUI = (function (_super) {
        __extends(PictureEditorBaseUI, _super);
        function PictureEditorBaseUI(data) {
            var _this = _super.call(this) || this;
            _this.showEditPic = new egret.Bitmap;
            _this.data = data;
            return _this;
        }
        //----------------------------------初始化------------------------------------------------------
        /**初始化一些东西*/
        PictureEditorBaseUI.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
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
            game.StageUtil.maxTouches(2);
        };
        //------------------------------------接收通知---------------------------------------------------
        /**收到miditor的通知*/
        PictureEditorBaseUI.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PictureEditorCommands.initListener:
                    this.initListener(params);
                    break;
            }
        };
        //------------------------------------事件监听---------------------------------------------------
        /**注册事件*/
        PictureEditorBaseUI.prototype.initListener = function (mediator) {
            this.registerEvent(this.group_BackBtn, egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
            this.registerEvent(this.btn_Choose, egret.TouchEvent.TOUCH_TAP, this.pictureChoose, this);
            this.registerEvent(this.btn_Cancel, egret.TouchEvent.TOUCH_TAP, this.pictureCancel, this);
            this.registerEvent(this.btn_Sure, egret.TouchEvent.TOUCH_TAP, this.pictureSure, this);
            this.registerEvent(this.group_Choose, egret.TouchEvent.TOUCH_BEGIN, this.handleTouch, this);
            this.registerEvent(this.group_Choose, egret.TouchEvent.TOUCH_MOVE, this.handleTouch, this);
            this.registerEvent(this.group_Choose, egret.TouchEvent.TOUCH_END, this.handleTouch, this);
            this.registerEvent(this.group_Choose, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.handleTouch, this);
        };
        /**显示圆形图片*/
        PictureEditorBaseUI.prototype.showCirclePicture = function () {
            if (this.data == game.PictureEditorMediator.Type_UserPicture) {
                this.img_ChooseShow.source = "main_btn_all_mine_p_png";
                //判断头像是不是默认
                if (game.PersonalInfoModel.getInstance().avatar) {
                    this.img_ChooseShow.source = game.PersonalInfoModel.getInstance().avatar;
                }
            }
            else {
                this.img_ChooseShow.source = "main_pic_defaultclub_png";
                //判断头像是不是默认
                var clubInfo = game.ClubModel.getInstance().getClubInfo(game.GlobalConfig.clubId);
                var url = clubInfo.img;
                if (url)
                    this.setClubIcon(url);
            }
            this.groupChoose();
            //画圆
            this.circlePicture = new egret.Shape();
            this.circlePicture.graphics.beginFill(0X000000);
            this.circlePicture.graphics.drawCircle(0, 0, 710 / 2);
            this.circlePicture.graphics.endFill();
            this.circlePicture.x = 710 / 2 + 2;
            this.circlePicture.y = 710 / 2;
            //显示圆形剪切图片
            this.group_ShowChoose.addChild(this.circlePicture);
            this.img_ChooseShow.mask = this.circlePicture;
        };
        /** 设置club头像 */
        PictureEditorBaseUI.prototype.setClubIcon = function (url) {
            var _this = this;
            var ip = game.GlobalConfig.defaultIP;
            if (ip[ip.length - 1] == '/') {
                ip = ip.slice(0, ip.length - 1);
            }
            if (url[0] == '/') {
                url = url.slice(1);
            }
            var fullUrl = "http:" + ip + "/" + url;
            com.LoadManager.getInstance().getResByUrl(fullUrl, function (data) {
                _this.img_ChooseShow.source = data;
            }, this, com.ResourceItem.TYPE_IMAGE);
        };
        /**
         * 当舞台尺寸发生变化
         */
        PictureEditorBaseUI.prototype.onStageResize = function (evt) {
            _super.prototype.onStageResize.call(this, evt);
            if (game.GlobalConfig.isFixedHight) {
                this.group_Cancel.width = game.StageUtil.width / 2 - 32;
                this.group_Sure.width = game.StageUtil.width / 2 - 32;
                this.group_Sure.right = 0;
                this.group_Cancel.left = 0;
            }
            if (game.GlobalConfig.isFixedHight) {
                this.chooseCenterX = game.StageUtil.width / 2;
            }
            else {
                this.chooseCenterX = 540;
            }
        };
        /**group_Choose的手动适配*/
        PictureEditorBaseUI.prototype.groupChoose = function () {
            this.group_Choose.height = 1275;
            this.group_Choose.left = 0;
            this.group_Choose.right = 0;
            this.group_Choose.top = 158;
            this.group_Choose.bottom = 157;
        };
        /**初始化转菊花*/
        PictureEditorBaseUI.prototype.initCircle = function () {
            this.loadCircle = new game.LoadCircle();
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.bottom = 100;
            this.group_Out.addChild(this.loadCircle);
            this.loadCircle.visible = false;
        };
        /**当前页面名称*/
        PictureEditorBaseUI.prototype.theUIName = function (type) {
            switch (type) {
                case game.PictureEditorMediator.Type_ClubPicture:
                    this.label_title.text = "founder_btn_change_club_icon";
                    this.img_clubNeed.visible = true;
                    this.img_Out.visible = false;
                    break;
                case game.PictureEditorMediator.Type_UserPicture:
                    this.label_title.text = "global_btn_change_head";
                    this.img_clubNeed.visible = false;
                    this.img_Out.visible = true;
                    break;
            }
        };
        /**关闭UI*/
        PictureEditorBaseUI.prototype.closeUI = function () {
            game.MediatorManager.closeMediator(game.Mediators.Mediator_PictureEditor.name);
        };
        //---------------------------图片选择区-------------------------
        /**选择图片*/
        PictureEditorBaseUI.prototype.pictureChoose = function () {
            game.PhotoEditor.picker(this.pickOver, this);
        };
        /**显示图片*/
        PictureEditorBaseUI.prototype.pickOver = function (texture) {
            if (texture == null) {
                //点击之后按钮启用
                // this.label_Again.text = "仅支持图片上传";
                // this.label_Again.visible = true;
                this.tipErr("仅支持图片上传");
                this.btn_Choose.touchEnabled = true;
                this.btn_Choose.setState = "up";
                return;
            }
            else {
                this.label_Again.text = "图片上传失败，请重试";
                this.errGroup.visible = false;
            }
            this.group_ImgOut.visible = true;
            this.img_PictureEditor.texture = texture;
            this.img_EditorCircle.visible = true;
            var w = texture.textureWidth;
            var h = texture.textureHeight;
            this.isPictureShow(w, h);
            this.pictureShowOut();
        };
        /**选择的图片出来之后要执行的东西*/
        PictureEditorBaseUI.prototype.pictureShowOut = function () {
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
            if (this.data == game.PictureEditorMediator.Type_UserPicture) {
                this.img_Out.visible = false;
            }
            this.group_Choose.touchEnabled = true;
            this.img_PictureEditor.mask = this.imgMask;
            this.img_ChooseShow.mask = null;
        };
        /**选择的图片出来之后展示图片的判断*/
        PictureEditorBaseUI.prototype.isPictureShow = function (w, h) {
            var r = w > h ? h : w;
            if (r < 710) {
                var a = 710 / r;
                this.img_PictureEditor.width = w * a;
                this.img_PictureEditor.height = h * a;
                this.group_ImgOut.x = this.chooseCenterX - a * w / 2;
                this.group_ImgOut.y = this.group_Choose.height / 2 - a * h / 2;
            }
            else {
                this.img_PictureEditor.width = w;
                this.img_PictureEditor.height = h;
                this.group_ImgOut.x = this.chooseCenterX - w / 2;
                this.group_ImgOut.y = this.group_Choose.height / 2 - h / 2;
            }
            this.img_PictureEditor.verticalCenter = 0;
            this.img_PictureEditor.horizontalCenter = 0;
        };
        /*取消*/
        PictureEditorBaseUI.prototype.pictureCancel = function () {
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
            if (this.data == game.PictureEditorMediator.Type_UserPicture) {
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
        };
        //------------------------------图片变化区---------------------------
        /**当前手指数量 */
        PictureEditorBaseUI.prototype.addFinger = function (finger) {
            for (var i = this.fingers.length - 1; i >= 0; i--) {
                if (this.fingers[i].id == finger.id) {
                    this.fingers[i] = finger; //更新手指数量(包含手指数据)
                    return this.fingers.length;
                }
            }
            this.fingers.push(finger);
            return this.fingers.length;
        };
        /**移除手指*/
        PictureEditorBaseUI.prototype.removeFinger = function (touchPointID) {
            for (var i = this.fingers.length - 1; i >= 0; i--) {
                if (this.fingers[i].id == touchPointID) {
                    this.fingers.splice(i, 1);
                }
            }
            return this.fingers.length;
        };
        /**获取指定touchid的手指信息*/
        PictureEditorBaseUI.prototype.getFinger = function (touchPointID) {
            for (var i = this.fingers.length - 1; i >= 0; i--) {
                if (this.fingers[i].id == touchPointID) {
                    return this.fingers[i];
                }
            }
        };
        PictureEditorBaseUI.prototype.handleTouch = function (e) {
            var finger;
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    finger = new Finger();
                    finger.id = e.touchPointID;
                    finger.startX = e.stageX;
                    finger.startY = e.stageY;
                    this.addFinger(finger);
                    this.lastPt = new egret.Point(this.group_ImgOut.x, this.group_ImgOut.y);
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    finger = this.getFinger(e.touchPointID);
                    var w = this.group_ImgOut.width;
                    var h = this.group_ImgOut.height;
                    var a = this.img_PictureEditor.scaleX;
                    if (this.fingers.length > 1 || this.fingers.length == 0) {
                        if (finger) {
                            if (a >= 1) {
                                finger.startX = e.stageX;
                                finger.startY = e.stageY;
                            }
                            a >= 1 ? this.changeBig = true : this.changeBig = false;
                        }
                        return;
                    }
                    if (finger) {
                        finger.endX = e.stageX;
                        finger.endY = e.stageY;
                        //移动范围的判断
                        if (this.changeBig == true) {
                            var a_1 = this.img_PictureEditor.scaleX;
                            this.isOneMove(finger, w * a_1, h * a_1);
                        }
                        else {
                            this.isOneMove(finger, w, h);
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    finger = this.getFinger(e.touchPointID);
                    this.removeFinger(e.touchPointID);
                    break;
            }
        };
        /**判断什么时候一根手指移动*/
        PictureEditorBaseUI.prototype.isOneMove = function (finger, w, h) {
            var pt = finger.changePoint();
            var x = this.lastPt.x + pt.x;
            var y = this.lastPt.y + pt.y;
            var x1 = this.group_ImgOut.x;
            var y1 = this.group_ImgOut.y;
            var x2 = this.chooseCenterX;
            var y2 = this.group_Choose.height / 2;
            //移动范围的判断
            if (w == 710) {
                if (h != 710) {
                    if (y <= y2 - 710 / 2 && y >= y2 + 710 / 2 - h) {
                        this.group_ImgOut.x = x1;
                        this.group_ImgOut.y = y;
                    }
                }
            }
            else if (w > 710) {
                if (h == 710) {
                    if (x <= x2 - 710 / 2 && x >= x2 + 710 / 2 - w) {
                        this.group_ImgOut.x = x;
                        this.group_ImgOut.y = y1;
                    }
                }
                else if (h > 710) {
                    if (y <= y2 - 710 / 2 && y >= y2 + 710 / 2 - h && x <= x2 - 710 / 2 && x >= x2 + 710 / 2 - w) {
                        this.group_ImgOut.x = x;
                        this.group_ImgOut.y = y;
                    }
                }
            }
        };
        /**手势库*/
        PictureEditorBaseUI.prototype.fingerPingch = function () {
            var type = GestureType.PINCH; //缩放图片的手势的类型
            var event = GestureState.CHANGED; //事件发生变化
            var config = {};
            config[type] = {};
            config[type][event] = this.onTapRecognized.bind(this); //两根手指缩放的库
            GestureManager.add(this, config, false);
        };
        /**什么手势，图片做什么变化*/
        PictureEditorBaseUI.prototype.onTapRecognized = function (e) {
            var changeScale = this.img_PictureEditor.scaleX - 0.01;
            var a = this.img_PictureEditor.scaleX;
            var x = this.group_ImgOut.x;
            var y = this.group_ImgOut.y;
            var w = this.img_PictureEditor.width;
            var h = this.img_PictureEditor.height;
            var x2 = this.chooseCenterX;
            var y2 = this.group_Choose.height / 2;
            //缩小范围判断
            if (changeScale >= 1 && e.dScale < 1) {
                if (y > y2 + 710 / 2 - a * h && y <= y2 - 710 / 2 && x > x2 + 710 / 2 - a * w && x <= x2 - 710 / 2) {
                    this.img_PictureEditor.scaleX -= 0.01;
                    this.img_PictureEditor.scaleY -= 0.01;
                }
                if (y <= y2 - 710 / 2 && y == y2 + 710 / 2 - a * h && x > x2 + 710 / 2 - a * w && x < x2 - 710 / 2) {
                    this.img_PictureEditor.scaleX -= 0.01;
                }
                if (x <= x2 - 710 / 2 && x == x2 + 710 / 2 - a * w && y > y2 + 710 / 2 - a * h && y < y2 - 710 / 2) {
                    this.img_PictureEditor.scaleY -= 0.01;
                }
            }
            //放大
            if (e.dScale > 1) {
                this.img_PictureEditor.scaleX += 0.01;
                this.img_PictureEditor.scaleY += 0.01;
            }
        };
        //----------------------------------图片剪切区--------------------------------------------
        /**确定*/
        PictureEditorBaseUI.prototype.pictureSure = function () {
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
        };
        /**剪切图片*/
        PictureEditorBaseUI.prototype.pickEditor = function () {
            this.isIntersection();
            var cutRectangle = new egret.Rectangle(this.cutImgX, this.cutImgY, this.cutImgW, this.cutImgH);
            game.PhotoEditor.cutBitmap(this.group_ImgOut, cutRectangle, this.showCutPhoto, this);
        };
        /**上传图片*/
        PictureEditorBaseUI.prototype.showCutPhoto = function (renderTexture) {
            var _this = this;
            this.showEditPic.texture = renderTexture;
            // this.group_Out.addChild(this.showEditPic);
            var renderT = new egret.RenderTexture();
            renderT.drawToTexture(this.showEditPic, new egret.Rectangle(0, 0, 700, 700), 1);
            switch (this.data) {
                case game.PictureEditorMediator.Type_ClubPicture:
                    game.ClubController.getInstance().editClub(game.GlobalConfig.clubId + "", null, null, null, renderT).then(function () {
                        //转菊花的关闭
                        _this.loadCircle.stop();
                        _this.loadCircle.visible = false;
                        //关闭图片编辑页面
                        _this.closeUI();
                    }).catch(function () {
                        //转菊花的关闭
                        _this.loadCircle.stop();
                        _this.loadCircle.visible = false;
                        //回到图片选择界面
                        _this.pictureCancel();
                        //显示上传失败
                        // this.label_Again.visible = true;
                        _this.tipErr("图片上传失败，请重试");
                    });
                    break;
                case game.PictureEditorMediator.Type_UserPicture:
                    //显示剪切图片
                    game.PersonalInfoController.getInstance().updatePlayerInfo(null, renderT).then(function () {
                        //转菊花的关闭
                        _this.loadCircle.stop();
                        _this.loadCircle.visible = false;
                        //关闭图片编辑页面
                        _this.closeUI();
                    }).catch(function (err) {
                        //转菊花的关闭
                        _this.loadCircle.stop();
                        _this.loadCircle.visible = false;
                        //回到图片选择界面
                        _this.pictureCancel();
                        //显示上传失败
                        // this.label_Again.visible = true;
                        _this.tipErr("图片上传失败，请重试");
                    });
                    break;
            }
        };
        /**错误提示*/
        PictureEditorBaseUI.prototype.tipErr = function (txt) {
            this.label_Again.text = txt;
            game.CTweenManagerController.getInstance().startCTween(2, [this.errGroup]);
        };
        /**判断剪切框和图片是否有交集，如果有求出交集矩形*/
        PictureEditorBaseUI.prototype.isIntersection = function () {
            //图片左上顶点的x
            var imgX1 = this.group_ImgOut.x;
            //图片左上顶点的y
            var imgY1 = this.group_ImgOut.y;
            //图片右下顶点的x
            var imgX2 = this.group_ImgOut.x + this.group_ImgOut.width;
            //图片右下顶点的y
            var imgY2 = this.group_ImgOut.y + this.group_ImgOut.height;
            //剪切框的位置是不变的，在中心(centerX,centerY),剪切框的宽高710,710;
            var centerX = this.chooseCenterX;
            var centerY = this.group_Choose.height / 2;
            //剪切框左上顶点的x
            var cutX1 = centerX - 710 / 2;
            //剪切框左上顶点的Y
            var cutY1 = centerY - 710 / 2;
            //剪切框右下顶点的Y
            var cutX2 = centerX + 710 / 2;
            //剪切框右下顶点的Y
            var cutY2 = centerY + 710 / 2;
            //设置交集矩形的左上顶点的x,y;右下顶点的x,y;
            //交集矩形的左上顶点的x
            var startX = imgX1 > cutX1 ? imgX1 : cutX1;
            //交集矩形的左上顶点的y
            var startY = imgY1 > cutY1 ? imgY1 : cutY1;
            //交集矩形的右下顶点的x
            var endX = imgX2 < cutX2 ? imgX2 : cutX2;
            //交集矩形的右下顶点的y
            var endY = imgY2 < cutY2 ? imgY2 : cutY2;
            //判断是否有交集
            if (startX >= endX || startY >= endY) {
            }
            else {
                //相对图片交集矩形的左上顶点的x
                this.cutImgX = startX - imgX1;
                //相对图片交集矩形的左上顶点的y
                this.cutImgY = startY - imgY1;
                //相对图片交集矩形的宽
                this.cutImgW = endX - startX;
                //相对图片交集矩形的高
                this.cutImgH = endY - startY;
            }
        };
        PictureEditorBaseUI.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            game.CTweenManagerController.getInstance().endAllCTween();
            game.StageUtil.maxTouches(1);
        };
        return PictureEditorBaseUI;
    }(game.BaseUI));
    game.PictureEditorBaseUI = PictureEditorBaseUI;
    __reflect(PictureEditorBaseUI.prototype, "game.PictureEditorBaseUI");
    //-----------------------------关于手指----------------------------
    var Finger = (function () {
        function Finger() {
        }
        /**终点和起点的距离 */
        Finger.prototype.getDistance = function () {
            var dis = egret.Point.distance(new egret.Point(this.startX, this.startY), new egret.Point(this.endX, this.endY));
            return dis;
        };
        /**改变的坐标 */
        Finger.prototype.changePoint = function () {
            var pt = new egret.Point(this.endX - this.startX, this.endY - this.startY);
            return pt;
        };
        return Finger;
    }());
    __reflect(Finger.prototype, "Finger");
})(game || (game = {}));
//# sourceMappingURL=PictureEditorBaseUI.js.map