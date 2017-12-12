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
    var PCCreateRoomUI1 = (function (_super) {
        __extends(PCCreateRoomUI1, _super);
        function PCCreateRoomUI1() {
            var _this = _super.call(this) || this;
            _this.numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
            _this.timeConst = 10;
            _this.skinName = game.SystemPath.skin_path + "createRoom/createRoomSkin.exml";
            _this.selectBtnLight = 1;
            return _this;
        }
        /**组件创建完成初始化数据等操作 */
        PCCreateRoomUI1.prototype.initSetting = function () {
            _super.prototype.initSetting.call(this);
            this.initcode();
            this.showUI();
        };
        /**
         * 收到mediator的通知，每个UI要复写这个方法
         * */
        PCCreateRoomUI1.prototype.onMediatorCommand = function (type, params) {
            if (params === void 0) { params = null; }
            switch (type) {
                case PCCreateRoomCommands.initListener:
                    this.initListeners(params);
                    break;
                case PCCreateRoomCommands.upDateselectVideoList:
                    this.showSelctVideoList(params);
                    break;
                case PCCreateRoomCommands.upDateVideoList:
                    this.showVideoList(params);
                    break;
                case PCCreateRoomCommands.showSelectVideo:
                    this.initeGroup(params);
                    break;
                case PCCreateRoomCommands.showVideoGroupName:
                    this.videoGroupName.text = params || "";
                    break;
                case PCCreateRoomCommands.showVideoName:
                    this.videoName.text = params + "" || "";
                    break;
                case PCCreateRoomCommands.updateVideo:
                    this.updateVideo(params, "upData");
                    break;
                case PCCreateRoomCommands.showSource:
                    this.updateVideo(params, "upDateRoadMap");
                    break;
                case PCCreateRoomCommands.showGameTypeData:
                    this.TypeList(params);
                    break;
                case PCCreateRoomCommands.showGameType:
                    this.gameType.text = params;
                    this.isShowType = true;
                    this.showType();
                    break;
                case PCCreateRoomCommands.showPreview:
                    this.showPreview(params);
                    break;
            }
        };
        /**注册事件 手动调用*/
        PCCreateRoomUI1.prototype.initListeners = function (mediator) {
            var _this = this;
            this.registerEvent(this.selectVideoList, eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.registerEvent(this.sureBtn, egret.TouchEvent.TOUCH_TAP, this.sendCreaeRoom, this);
            this.registerEvent(this.isFreeBtn, egret.TouchEvent.TOUCH_TAP, this.showIsFree, this);
            this.registerEvent(this.passWordGroup, egret.TouchEvent.TOUCH_TAP, this.getKey, this);
            this.registerEvent(this.selectType, egret.TouchEvent.TOUCH_TAP, this.showType, this);
            this.registerEvent(this.selectVideoBtn, mouse.MouseEvent.MOUSE_OUT, this.selectBtn, this);
            this.registerEvent(this.selectVideoBtn, egret.TouchEvent.TOUCH_TAP, this.selectBtn, this);
            this.registerEvent(this.closeSelectGroup, egret.TouchEvent.TOUCH_TAP, function () { _this.initeGroup(1); }, this);
            this.registerEvent(this.closeSelectGroup, mouse.MouseEvent.MOUSE_OVER, this.showSelectCloseBtn, this);
            this.registerEvent(this.closeSelectGroup, mouse.MouseEvent.MOUSE_OUT, this.hidenSelectCloseBtn, this);
            this.registerEvent(this.closeVideoGroup, egret.TouchEvent.TOUCH_TAP, function () {
                _this.initeGroup(2);
                _this.clearTap();
            }, this);
            this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.closeCreate, this);
            this.registerEvent(this.privateBtn, egret.TouchEvent.TOUCH_TAP, this.showPersonal, this);
            this.registerEvent(this.publicBtn, egret.TouchEvent.TOUCH_TAP, this.showOrdinary, this);
            this.registerEvent(this.roomName, egret.TouchEvent.CHANGE, this.checkBtnEnable, this);
            this.registerEvent(this.roomName, egret.TouchEvent.FOCUS_OUT, this.focusRoomName, this);
            this.registerEvent(this.editChip0, egret.TouchEvent.FOCUS_OUT, this.showChip0, this);
            this.registerEvent(this.editChip1, egret.TouchEvent.FOCUS_OUT, this.showChip1, this);
            this.registerEvent(this.editChip2, egret.TouchEvent.FOCUS_OUT, this.showChip2, this);
            this.registerEvent(this.editChip0, egret.TouchEvent.CHANGE, this.showChipChange0, this);
            this.registerEvent(this.editChip1, egret.TouchEvent.CHANGE, this.showChipChange1, this);
            this.registerEvent(this.editChip2, egret.TouchEvent.CHANGE, this.showChipChange2, this);
            this.registerEvent(this.editChip0, egret.TouchEvent.FOCUS_IN, this.focusChip0, this);
            this.registerEvent(this.editChip1, egret.TouchEvent.FOCUS_IN, this.focusChip1, this);
            this.registerEvent(this.editChip2, egret.TouchEvent.FOCUS_IN, this.focusChip2, this);
            for (var i = 0; i < this.limitArr.length; i++) {
                this.registerEvent(this.limitArr[i], egret.TouchEvent.CHANGE, this.limitCheckBtnEnable, this);
                this.registerEvent(this.limitArr[i], egret.TouchEvent.FOCUS_OUT, this.limitCheck, this);
                this.registerEvent(this.limitArr[i], egret.TouchEvent.FOCUS_IN, this.limitShow, this);
            }
            for (var i = 0; i <= 4; i++) {
                this.registerEvent(this["mask" + i + 0], egret.TouchEvent.TOUCH_TAP, this.inputMask, this);
                this.registerEvent(this["mask" + i + 1], egret.TouchEvent.TOUCH_TAP, this.inputMask, this);
            }
        };
        /** 点击item*/
        PCCreateRoomUI1.prototype.itemTap = function (e) {
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (this.selectVideoList) {
                for (var i = 0; i < this.selectVideoList.dataProvider.length; i++) {
                    if (this.selectVideoList.getElementAt(i)) {
                        this.selectVideoList.getElementAt(i)["itemTapOff"]();
                    }
                }
                e.itemRenderer["itemTapOn"]();
            }
        };
        /** 清除选中状态*/
        PCCreateRoomUI1.prototype.clearTap = function () {
            if (this.selectVideoList) {
                for (var i = 0; i < this.selectVideoList.dataProvider.length; i++) {
                    if (this.selectVideoList.getElementAt(i)) {
                        this.selectVideoList.getElementAt(i)["clearTap"]();
                    }
                }
            }
        };
        /** 初始化变量*/
        PCCreateRoomUI1.prototype.initcode = function () {
            this.isMoving = false;
            this.isShowType = false;
            this.videoData = "";
            this.type = "baccarat";
            this.nameText = "";
            this.video = "";
            this.roomModel = "public";
            this.isfree = false;
            this.key = "";
            this.limitArr = [
                this["limit00"], this["limit01"],
                this["limit10"], this["limit11"],
                this["limit20"], this["limit21"],
                this["limit30"], this["limit31"],
                this["limit40"], this["limit41"],
            ];
            this.chipArr = [0.5, 100, 10000];
        };
        /** 初始化UI*/
        PCCreateRoomUI1.prototype.showUI = function () {
            this.initMask();
            this.initInput();
            this.initChip();
            this.initeGroup(1);
            this.initList();
            this.showIsFree();
            this.sureBtn.enabled = false;
            this.sureBtn.setState = "disabled";
            this.publicBtn.setState = "down";
            this.privateBtn.setState = "up";
            this.loadCircle = new game.LoadCircle();
            this.loadCircle.horizontalCenter = 0;
            this.loadCircle.verticalCenter = 0;
            this.loadCircle.start();
            this.tipGroup.visible = false;
            this.previewGroup.visible = false; //初始化隐藏
            this.getKey();
        };
        /**
         *  初始化group
         *  @param 1 —— 只显示创建房间group
         *  @param 2 —— 显示创建房间和选择视频组group
         *  @param 3 —— 三个group都显示
        */
        PCCreateRoomUI1.prototype.initeGroup = function (type) {
            switch (type) {
                case 1:
                    this.selectBtnLight = 1;
                    this.groupMove(this.mainGroup, this.mainGroup.left, 479);
                    this.groupMove(this.selectVideoGroup, this.selectVideoGroup.left, 542);
                    this.groupMove(this.videoGroup, this.videoGroup.left, 503);
                    /** 创建房间*/
                    break;
                case 2:
                    this.selectBtnLight = 2;
                    this.groupMove(this.mainGroup, this.mainGroup.left, 214);
                    this.groupMove(this.selectVideoGroup, this.selectVideoGroup.left, 786);
                    this.groupMove(this.videoGroup, this.videoGroup.left, 503);
                    /** 请求视频组数据*/
                    game.ClubController.getInstance().getSubscribeSouresList();
                    break;
                case 3:
                    this.selectBtnLight = 3;
                    this.groupMove(this.mainGroup, this.mainGroup.left, 0);
                    this.groupMove(this.selectVideoGroup, this.selectVideoGroup.left, 572);
                    this.groupMove(this.videoGroup, this.videoGroup.left, 1007);
                    /** 显示视频数据*/
                    break;
            }
            if (this.selectBtnLight != 1) {
                this.selectVideoBtn.setState = "down";
            }
            else {
                this.selectVideoBtn.setState = "up";
            }
        };
        /** 初始化输入框*/
        PCCreateRoomUI1.prototype.initInput = function () {
            for (var i = 0; i <= 4; i++) {
                this["limit" + i + 0].prompt = game.LanguageUtil.translate("global_lbl_min");
                this["limit" + i + 1].prompt = game.LanguageUtil.translate("global_lbl_max");
            }
        };
        /** 初始化显示筹码设置*/
        PCCreateRoomUI1.prototype.initChip = function () {
            this.editChip0.text = game.NumberUtil.getSplitNumStr(this.chipArr[0] * 10 * 10);
            this.editChip1.text = game.NumberUtil.getSplitNumStr(this.chipArr[1] * 10 * 10);
            this.editChip2.text = game.NumberUtil.getSplitNumStr(this.chipArr[2] * 10 * 10);
            this.chip0.text = game.NumberUtil.getSplitNumStr(this.chipArr[0] * 10 * 10, 1);
            this.chip1.text = game.NumberUtil.getSplitNumStr(this.chipArr[1] * 10 * 10, 1);
            this.chip2.text = game.NumberUtil.getSplitNumStr(this.chipArr[2] * 10 * 10, 1);
        };
        /** 初始化列表*/
        PCCreateRoomUI1.prototype.initList = function () {
            this.selectVideoArr = new eui.ArrayCollection();
            this.selectVideoList.dataProvider = this.selectVideoArr;
            this.selectVideoList.itemRenderer = game.selectVideoItem;
            this.selectVideoList.validateNow();
            this.videoArr = new eui.ArrayCollection();
            this.videoList.dataProvider = this.videoArr;
            this.videoList.itemRenderer = game.videoItem;
            this.videoList.validateNow();
            this.gameTypeArr = new eui.ArrayCollection();
            this.gameTypeList.dataProvider = this.gameTypeArr;
            this.gameTypeList.itemRenderer = game.gameTypeItem;
            this.gameTypeList.validateNow();
        };
        PCCreateRoomUI1.prototype.initMask = function () {
            for (var i = 0; i <= 4; i++) {
                this["mask" + i + 0].visible = false;
                this["mask" + i + 1].visible = false;
            }
        };
        /** 选择视频源按钮*/
        PCCreateRoomUI1.prototype.selectBtn = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_TAP:
                    this.initeGroup(2);
                    this.clearTap();
                    break;
                case mouse.MouseEvent.MOUSE_OUT:
                    if (this.selectBtnLight > 1) {
                        this.selectVideoBtn.setState = "down";
                    }
                    else {
                        this.selectVideoBtn.setState = "up";
                    }
                    break;
            }
        };
        // ---------------------------------- 检测数据 ----------------------------------
        /** 按钮是否启用*/
        PCCreateRoomUI1.prototype.checkBtnEnable = function () {
            var b = true;
            if (this.roomName.text == "") {
                b = false;
            }
            if (game.StringUtil.getStrLen(this.roomName.text) == 0) {
                b = false;
            }
            this.roomName.text = this.roomName.text.trim();
            for (var i = 0; i < this.limitArr.length; i++) {
                if (this.limitArr[i].text.length == 0)
                    b = false;
            }
            this.sureBtn.enabled = b;
            this.sureBtn.setState = b ? "up" : "disabled";
        };
        /** 按钮是否启用*/
        PCCreateRoomUI1.prototype.limitCheckBtnEnable = function (e) {
            var b = true;
            this.checkLimit(e.target);
            if (this.roomName.text.length == 0)
                b = false;
            for (var i = 0; i < this.limitArr.length; i++) {
                if (this.limitArr[i].text.length == 0)
                    b = false;
            }
            this.sureBtn.enabled = b;
            this.sureBtn.setState = b ? "up" : "disabled";
        };
        /** 限额失去焦点检测及显示*/
        PCCreateRoomUI1.prototype.limitCheck = function (e) {
            for (var i = 0; i <= 4; i++) {
                this["mask" + i + 0].visible = false;
                this["mask" + i + 1].visible = false;
            }
            /** 判断是否为空，数字显示处理*/
            if (game.StringUtil.getStrLen(e.target.text) == 0) {
                this.showTipMsg("founder_lbl_limit_empty");
                return;
            }
            e.target.text = game.NumberUtil.getSplitNumStr(e.target.text * 10 * 10);
        };
        /** 限额获得焦点显示*/
        PCCreateRoomUI1.prototype.limitShow = function (e) {
            /** 数字显示处理*/
            e.target.textColor = 0xE7B56F;
            e.target.text = e.target.text.split(",").join("");
            var str = e.target.name.slice(-2);
            for (var i = 0; i <= 4; i++) {
                this["mask" + i + 0].visible = true;
                this["mask" + i + 1].visible = true;
            }
            this["mask" + str].visible = false;
        };
        /** 前端效验，点击确定时判断*/
        PCCreateRoomUI1.prototype.checkIllegal = function () {
            if (this.videoName.text.length == 0) {
                /** 视频资源不能为空*/
                this.showTipMsg("视频资源不能为空");
                return true;
            }
            if (this.roomName.text.length == 0) {
                /** 房间名称不能为空*/
                this.showTipMsg("founder_lbl_roomname_empty");
                return true;
            }
            if (this.roomName.text.length > 20) {
                /** 房间名称长度不能大于20位字符*/
                this.showTipMsg("founder_lbl_roomname_length");
                return true;
            }
            // this.checkLimit();
            // 投注限额不能为空
            for (var i = 0; i < this.limitArr.length; i++) {
                if (this.limitArr[i].text) {
                    //输入长度大于14位或小数点后1位继续输入
                    if (this.limitArr[i].text.length == 0) {
                        this.showTipMsg("founder_lbl_limit_empty");
                        return true;
                    }
                }
                if (this.limitArr[i].text) {
                    //输入长度大于14位或小数点后1位继续输入
                    if (this.limitArr[i].text.split(",").join("") <= 0) {
                        this.showTipMsg("founder_lbl_limit_zero");
                        return true;
                    }
                }
                //限额最多输入14位整数和1位小数
                if (this.checkNumIllegal(this.limitArr[i].text.split(",").join(""))) {
                    // this.limitArr[i].textColor = 0xFF0000;
                    this.showTipMsg("founder_lbl_chip_limit_format");
                    return true;
                }
            }
            if (this.checkNumIllegal(+this.editChip0.text.split(",").join("") + "", 9)
                || this.checkNumIllegal(+this.editChip1.text.split(",").join("") + "", 9)
                || this.checkNumIllegal(+this.editChip2.text.split(",").join("") + "", 9)) {
                /** 筹码只能是正数，小数点后面只有1位小数*/
                this.showTipMsg("founder_lbl_chip_format");
                return true;
            }
            if (this.editChip0.text.length == 0 || this.editChip1.text.length == 0 || this.editChip2.text.length == 0) {
                this.showTipMsg("founder_lbl_amount_cannot_empty");
                return true;
            }
            if (+this.editChip0.text == 0 || +this.editChip1.text == 0 || +this.editChip2.text == 0) {
                this.showTipMsg("founder_lbl_chip_zero");
                return true;
            }
            return false;
        };
        /** 输入其他字符*/
        PCCreateRoomUI1.prototype.checkNumIllegal2 = function (str) {
            if (!str)
                return true;
            if (str == "")
                return true;
            str = str + "";
            for (var i = 0; i < str.length; i++) {
                if (this.numArr.indexOf(str.charAt(i)) < 0) {
                    //包含除数字之外的字符
                    return true;
                }
            }
            return false;
        };
        /** 输入长度大于len位或小数点后超过1位
         * len 默认 14
        */
        PCCreateRoomUI1.prototype.checkNumIllegal = function (str, len) {
            if (len === void 0) { len = 14; }
            if (!str)
                return true;
            if (str == "")
                return true;
            str = str + "";
            if (str.indexOf('.') != -1) {
                var n = 0;
                if (Number(str.length) - Number(str.indexOf('.')) > 2) {
                    return true;
                }
                for (var i = 0; i < str.length; i++) {
                    if (str[i] == ".") {
                        n++;
                    }
                }
                if (n > 1) {
                    return true;
                }
                if (str.length > len + 2) {
                    return true;
                }
            }
            else {
                if (str.length > len) {
                    return true;
                }
            }
            // if(num[0] == ".") return true;
            return false;
        };
        /** 房间名失去焦点判断*/
        PCCreateRoomUI1.prototype.focusRoomName = function () {
            if (this.roomName.text.length == 0) {
                this.showTipMsg("founder_lbl_roomname_empty");
            }
        };
        PCCreateRoomUI1.prototype.checkLimit = function (target) {
            if (target.text) {
                var num = target.text;
                if (this.checkNumIllegal2(target.text)) {
                    target.text = num.slice(0, -1);
                }
                if (this.checkNumIllegal(target.text)) {
                    target.text = num.slice(0, -1);
                }
            }
        };
        // ---------------------------------- 创建 ----------------------------------
        /** 发送创建房间请求*/
        PCCreateRoomUI1.prototype.sendCreaeRoom = function () {
            var _this = this;
            game.SoundPlayerNew.playEffect(game.SoundConst.click);
            if (this.checkIllegal())
                return;
            /** 视频资源*/
            if (this.videoName.text) {
                this.video = this.videoName.text;
            }
            else {
                this.showTipMsg("视频资源错误");
                return;
            }
            var limit = new topic.RoomLimit();
            var max = new topic.BaccratRoomLimit();
            var min = new topic.BaccratRoomLimit();
            max.banker = (+this["limit01"].text.split(",").join("")) * 10 * 10;
            max.player = (+this["limit11"].text.split(",").join("")) * 10 * 10;
            max.tie = (+this["limit21"].text.split(",").join("")) * 10 * 10;
            max.banker_pair = (+this["limit31"].text.split(",").join("")) * 10 * 10;
            max.player_pair = (+this["limit41"].text.split(",").join("")) * 10 * 10;
            min.banker = (+this["limit00"].text.split(",").join("")) * 10 * 10;
            min.player = (+this["limit10"].text.split(",").join("")) * 10 * 10;
            min.tie = (+this["limit20"].text.split(",").join("")) * 10 * 10;
            min.banker_pair = (+this["limit30"].text.split(",").join("")) * 10 * 10;
            min.player_pair = (+this["limit40"].text.split(",").join("")) * 10 * 10;
            var isFalse = false; //需要全部判断完了才return
            for (var i = 0; i <= 4; i++) {
                if ((+this["limit" + i + "1"].text.split(",").join("")) * 10 * 10 < (+this["limit" + i + "0"].text.split(",").join("")) * 10 * 10) {
                    this.showTipMsg("founder_lbl_limit_warning");
                    this["limit" + i + "1"].textColor = 0xff0000;
                    this["limit" + i + "0"].textColor = 0xff0000;
                    isFalse = true;
                }
                else {
                    this["limit" + i + "1"].textColor = 0xE7B56F;
                    this["limit" + i + "0"].textColor = 0xE7B56F;
                }
                var str = this["limit" + i + "1"].text;
                var str1 = this["limit" + i + "0"].text;
                this["limit" + i + "1"].text = "";
                this["limit" + i + "1"].text = str;
                this["limit" + i + "0"].text = "";
                this["limit" + i + "0"].text = str1;
            }
            if (isFalse)
                return;
            limit.max = max;
            limit.min = min;
            this.nameText = this.roomName.text;
            this.key = this.passWordGroup.visible ? this.passWord.text : "";
            this.isfree = this.isFreeBtn.currentState == "up" ? true : false;
            var chips = [+this.chipArr[0] * 10 * 10, +this.chipArr[1] * 10 * 10, +this.chipArr[2] * 10 * 10];
            this.mainGroup.addChild(this.loadCircle);
            /** 发送创建请求*/
            game.ClubController.getInstance().createRoom(game.GlobalConfig.clubId, this.type, this.video, this.nameText, chips, limit, this.roomModel, this.key, this.isfree)
                .then(function () {
                game.ClubController.getInstance().getSubscribeRoomList(game.GlobalConfig.clubId);
                _this.createBack();
            }).catch(function (e) {
                game.DebugUtil.debug("创建失败" + e);
                if (_this.loadCircle && _this.mainGroup.contains(_this.loadCircle)) {
                    _this.mainGroup.removeChild(_this.loadCircle);
                }
                var msg = "";
                switch (e.message) {
                    case game.ErrorCode.ROOM_NAME_EXIST:
                        msg = "founder_lbl_roomname_exists";
                        break;
                    case "name_character":
                        msg = "home_lbl_name_character";
                        break;
                    case "name_length":
                        msg = "founder_lbl_roomname_length"; //房间名称输入字符数最大为20
                        break;
                    case "name_empty":
                        msg = "founder_lbl_roomname_empty"; //房间名为空
                        break;
                    case "name_illegal":
                        msg = "global_lbl_information_contains_sensitive_words"; //信息包含敏感词汇
                        break;
                    default:
                        msg = "房间创建失败";
                        break;
                }
                _this.showTipMsg(msg);
            });
        };
        /** 创建成功的回调*/
        PCCreateRoomUI1.prototype.createBack = function () {
            this.mainGroup.removeChild(this.loadCircle);
            var tipData = new game.TipMsgInfo();
            tipData.msg = [
                { text: game.LanguageUtil.rePlaceLanguage("home_lbl_create_club", "%s", this.nameText), textColor: enums.ColorConst.Golden }
                // {text:this.nameText, textColor:enums.ColorConst.LightGray},
            ];
            tipData.confirmText = game.LanguageUtil.translate("global_btn_I_know");
            tipData.thisObj = this;
            tipData.comfirmCallBack = function () {
                this.closeCreate();
                game.MediatorManager.openMediator(game.Mediators.Mediator_PCCreatedRoomList);
            };
            game.MediatorManager.openMediator(game.Mediators.Mediator_TipMsg, tipData);
        };
        // ---------------------------------- 操作处理 ----------------------------------
        /** 点击限额遮罩，先数去焦点再获得焦点，防止点击输入框失效*/
        PCCreateRoomUI1.prototype.inputMask = function (e) {
            for (var i = 0; i <= 4; i++) {
                this["mask" + i + 0].visible = false;
                this["mask" + i + 1].visible = false;
            }
        };
        /** 显示是否免佣*/
        PCCreateRoomUI1.prototype.showIsFree = function () {
            this.isFreeLabel.text = game.LanguageUtil.translate(this.isFreeBtn.currentState == "up" ? "global_btn_yes" : "global_btn_no");
        };
        /** 生产密码*/
        PCCreateRoomUI1.prototype.getKey = function () {
            var key, newKey = "";
            if (this.passWord.text) {
                key = this.passWord.text;
            }
            else {
                key = "123456";
            }
            for (var i = 0; i < 6; i++) {
                newKey = newKey + ("" + Math.floor(Math.random() * 10));
            }
            game.DebugUtil.debug(newKey + "旧密码" + key);
            if (newKey == key) {
                this.getKey();
            }
            this.passWord.text = newKey;
        };
        /** 设置筹码*/
        PCCreateRoomUI1.prototype.showChip0 = function () {
            this["input1"].alpha = "0.5";
            this["input2"].alpha = "0.5";
            this.chipArr[0] = this.editChip0.text;
            if (this.editChip0.text.length == 0) {
                this.showTipMsg("founder_lbl_amount_cannot_empty");
                return;
            }
            if (this.checkNumIllegal2(+this.editChip0.text + "")) {
                this.showTipMsg("founder_lbl_chip_character");
                return;
            }
            if (+this.editChip0.text <= 0) {
                // this.sureBtn.
                this.showTipMsg("founder_lbl_chip_zero");
                return;
            }
            if (this.checkNumIllegal(+this.editChip0.text.split(",").join("") + "", 9)) {
                this.showTipMsg("founder_lbl_chip_format");
                return;
            }
            this.chip0.text = game.NumberUtil.getSplitNumStr(this.chipArr[0] * 10 * 10, 3);
            this.editChip0.text = game.NumberUtil.getSplitNumStr(this.chipArr[0] * 10 * 10);
        };
        PCCreateRoomUI1.prototype.showChip1 = function () {
            this["input3"].alpha = "0.5";
            this["input4"].alpha = "0.5";
            this["input5"].alpha = "0.5";
            this.chipArr[1] = this.editChip1.text;
            if (this.editChip1.text.length == 0) {
                this.showTipMsg("founder_lbl_amount_cannot_empty");
                return;
            }
            if (this.checkNumIllegal2(+this.editChip1.text + "")) {
                this.showTipMsg("founder_lbl_chip_character");
                return;
            }
            if (+this.editChip1.text <= 0) {
                // this.sureBtn.
                this.showTipMsg("founder_lbl_chip_zero");
                return;
            }
            if (this.checkNumIllegal(+this.editChip1.text.split(",").join("") + "", 9)) {
                this.showTipMsg("founder_lbl_chip_format");
                return;
            }
            this.chip1.text = game.NumberUtil.getSplitNumStr(this.chipArr[1] * 10 * 10, 3);
            this.editChip1.text = game.NumberUtil.getSplitNumStr(this.chipArr[1] * 10 * 10);
        };
        PCCreateRoomUI1.prototype.showChip2 = function () {
            this["input6"].alpha = "0.5";
            this["input7"].alpha = "0.5";
            this.chipArr[2] = this.editChip2.text;
            if (this.editChip2.text.length == 0) {
                this.showTipMsg("founder_lbl_amount_cannot_empty");
                return;
            }
            if (this.checkNumIllegal2(+this.editChip2.text + "")) {
                this.showTipMsg("founder_lbl_chip_character");
                return;
            }
            if (+this.editChip2.text <= 0) {
                // this.sureBtn.
                this.showTipMsg("founder_lbl_chip_zero");
                return;
            }
            if (this.checkNumIllegal(+this.editChip2.text.split(",").join("") + "", 9)) {
                this.showTipMsg("founder_lbl_chip_format");
                return;
            }
            this.chip2.text = game.NumberUtil.getSplitNumStr(this.chipArr[2] * 10 * 10, 3);
            this.editChip2.text = game.NumberUtil.getSplitNumStr(this.chipArr[2] * 10 * 10);
        };
        /** 筹码编辑获得焦点*/
        PCCreateRoomUI1.prototype.focusChip0 = function () {
            this.editChip0.text = this.editChip0.text.split(",").join("");
            this["input1"].alpha = "0.6";
            this["input2"].alpha = "0.6";
        };
        PCCreateRoomUI1.prototype.focusChip1 = function () {
            this.editChip1.text = this.editChip1.text.split(",").join("");
            this["input3"].alpha = "0.6";
            this["input4"].alpha = "0.6";
            this["input5"].alpha = "0.6";
        };
        PCCreateRoomUI1.prototype.focusChip2 = function () {
            this.editChip2.text = this.editChip2.text.split(",").join("");
            this["input6"].alpha = "0.6";
            this["input7"].alpha = "0.6";
        };
        PCCreateRoomUI1.prototype.showChipChange0 = function () {
            var num = this.editChip0.text;
            if (this.checkNumIllegal2(this.editChip0.text)) {
                this.editChip0.text = num.slice(0, -1);
            }
            if (this.checkNumIllegal(this.editChip0.text, 9)) {
                this.editChip0.text = num.slice(0, -1);
            }
        };
        PCCreateRoomUI1.prototype.showChipChange1 = function () {
            var num = this.editChip1.text;
            if (this.checkNumIllegal2(this.editChip1.text)) {
                this.editChip1.text = num.slice(0, -1);
            }
            if (this.checkNumIllegal(this.editChip1.text, 9)) {
                this.editChip1.text = num.slice(0, -1);
            }
        };
        PCCreateRoomUI1.prototype.showChipChange2 = function () {
            var num = this.editChip2.text;
            if (this.checkNumIllegal2(this.editChip2.text)) {
                this.editChip2.text = num.slice(0, -1);
            }
            if (this.checkNumIllegal(this.editChip2.text, 9)) {
                this.editChip2.text = num.slice(0, -1);
            }
        };
        /** 退出创建*/
        PCCreateRoomUI1.prototype.closeCreate = function () {
            this.clearTap();
            game.MediatorManager.closeMediator(game.Mediators.Mediator_PCCreateRoom.name);
        };
        /** 切换到私人模式*/
        PCCreateRoomUI1.prototype.showPersonal = function () {
            this.passWordGroup.visible = true;
            this.roomModel = "private";
            this.privateBtn.setState = "down";
            this.publicBtn.setState = "up";
        };
        /** 切换到普通模式*/
        PCCreateRoomUI1.prototype.showOrdinary = function () {
            this.passWordGroup.visible = false;
            this.roomModel = "public";
            this.privateBtn.setState = "up";
            this.publicBtn.setState = "down";
        };
        /**
         * 位移动画
         * @param begin —— 位移开始时的位置
         * @param end —— 位移结束时的位置
         * @param speed —— 位移时间
        */
        PCCreateRoomUI1.prototype.groupMove = function (groupObj, begin, end, speed) {
            if (speed === void 0) { speed = 500; }
            if (begin == end)
                return;
            game.CTween.removeTweens(groupObj);
            game.CTween.get(groupObj)
                .wait(10)
                .to({ left: end }, speed)
                .call(function () {
                /** 回调函数，请求数据*/
            });
        };
        /** x=显示选择视频组按钮高亮*/
        PCCreateRoomUI1.prototype.showSelectCloseBtn = function () {
            this.closeSelectGroup.setState = "disabled";
        };
        PCCreateRoomUI1.prototype.hidenSelectCloseBtn = function () {
            this.clearTap();
            this.closeSelectGroup.setState = "up";
        };
        /** 显示视频组列表数据*/
        PCCreateRoomUI1.prototype.showSelctVideoList = function (listData) {
            if (!listData)
                return;
            this.selectVideoArr = null;
            this.selectVideoArr = new eui.ArrayCollection();
            this.selectVideoArr.source = listData;
            this.selectVideoList.dataProvider = this.selectVideoArr;
            this.selectVideoArr.refresh();
            this.selectVideoList.validateNow();
        };
        /** 显示视频列表数据*/
        PCCreateRoomUI1.prototype.showVideoList = function (arr) {
            if (!arr)
                return;
            this.videoArr = null;
            this.videoArr = new eui.ArrayCollection();
            this.videoArr.source = arr;
            this.videoList.dataProvider = this.videoArr;
            this.videoArr.refresh();
            this.videoList.validateNow();
        };
        /** 显示类型列表数据*/
        PCCreateRoomUI1.prototype.TypeList = function (arr) {
            if (!arr)
                return;
            this.gameTypeArr.source = arr;
            this.gameTypeArr.refresh();
        };
        /** 刷新视频列表数据*/
        PCCreateRoomUI1.prototype.updateVideo = function (sourceID, funcName) {
            if (this.videoList) {
                for (var i = 0; i < this.videoList.dataProvider.length; i++) {
                    if (this.videoList.getElementAt(i)) {
                        if (this.videoList.getElementAt(i)["data"] == sourceID) {
                            this.videoList.getElementAt(i)[funcName]();
                        }
                    }
                }
            }
        };
        /** 预览视频*/
        PCCreateRoomUI1.prototype.showPreview = function (params) {
            this.previewGroup.visible = true;
            this.closePreviewBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hidenPreview, this);
            game.LayerManager.getInstance().addUI(this.previewGroup, enums.LayerConst.LAYER_TOP);
            this.xplayer = game.StreamVideo.getInstance().connectByUrl(this, "video:" + game.GlobalConfig.mediaCdn, this.onVideoConnected, this.onVideoConnectError, params);
            this.timer = new egret.Timer(1000, this.timeConst);
            this.previewTime.text = "10s";
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.timer.start();
        };
        PCCreateRoomUI1.prototype.timerFunc = function (e) {
            var showTime = this.timeConst - e.target.currentCount;
            this.previewTime.text = showTime + "s";
        };
        PCCreateRoomUI1.prototype.timerComFunc = function () {
            if (this.timer) {
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
                this.timer.stop();
                this.timer = null;
            }
            this.hidenPreview();
        };
        PCCreateRoomUI1.prototype.onVideoConnected = function () {
            game.StreamVideo.getInstance().popVideo(true);
            game.StreamVideo.getInstance().setPos(0, 0, 942, 528);
        };
        PCCreateRoomUI1.prototype.onVideoConnectError = function () {
        };
        /** 关闭预览*/
        PCCreateRoomUI1.prototype.hidenPreview = function () {
            this.previewGroup.visible = false;
            this.closePreviewBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hidenPreview, this);
            this.addChild(this.previewGroup);
            this.closeVideo();
        };
        /** 错误通知*/
        PCCreateRoomUI1.prototype.showTipMsg = function (str) {
            var _this = this;
            this.tipGroup.visible = true;
            this.tipGroup.alpha = 1;
            this.tipMsgLabel.text = game.LanguageUtil.translate(str);
            game.CTween.removeTweens(this.tipGroup);
            game.CTween.get(this.tipGroup)
                .wait(2500)
                .to({ alpha: 0.01 }, 500)
                .call(function () {
                _this.tipGroup.visible = false;
                game.CTween.removeTweens(_this.tipGroup);
            });
        };
        /** 显示游戏类型*/
        PCCreateRoomUI1.prototype.showType = function () {
            this.isShowType = !this.isShowType;
            this.gameTypeGroup.visible = this.isShowType;
        };
        PCCreateRoomUI1.prototype.closeVideo = function () {
            game.StreamVideo.getInstance().popVideo(false);
            game.StreamVideo.getInstance().close(this.xplayer);
            this.xplayer = null;
            game.MediatorManager.closeMediator(game.Mediators.Mediator_VideoLoading.name);
        };
        // ---------------------------------- dispose ----------------------------------
        PCCreateRoomUI1.prototype.dispose = function () {
            game.CTween.removeTweens(this.tipGroup);
            this.timerComFunc();
            this.videoArr = null;
            this.videoList = null;
            this.selectVideoArr = null;
            this.selectVideoList = null;
            this.gameTypeArr = null;
            this.gameTypeList = null;
            _super.prototype.dispose.call(this);
        };
        return PCCreateRoomUI1;
    }(game.BaseUI));
    game.PCCreateRoomUI1 = PCCreateRoomUI1;
    __reflect(PCCreateRoomUI1.prototype, "game.PCCreateRoomUI1");
})(game || (game = {}));
//# sourceMappingURL=PCCreateRoomUI1.js.map