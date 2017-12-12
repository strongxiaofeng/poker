namespace eui.sys {
    /**
     * @private
     */
    export const enum ATextInputKeys {
        prompt,
        displayAsPassword,
        textColor,
        maxChars,
        maxWidth,
        maxHeight,
        text,
        restrict,
        inputType,

		/**新加属性 */
		size,
		textAlign,
		verticalAlign,
		fontFamily,
		lineSpacing,
		multiline,
		promptColor
    }
}

namespace eui {
    import FocusEvent = egret.FocusEvent;
    /**
     *
     */
    /**
     * The TextInput is a textfield input component, the user can input and edit the text.
     *
     * @version Egret 2.5.7
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TextInputExample.ts
     * @language en_US
     */
    /**
     * TextInput 是一个文本输入控件，供用户输入和编辑统一格式文本
     *
     * @version Egret 2.5.7
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TextInputExample.ts
     * @language zh_CN
     */
    export class ATextInput extends Component {
        constructor() {
            super();
            this.$TextInput = {
                0: null,          //prompt,
                1: null,          //displayAsPassword
                2: null,          //textColor
                3: null,          //maxChars
                4: null,          //maxWidth
                5: null,          //maxHeight
                6: "",            //text
                7: null,          //restrict
                8:egret.TextFieldInputType.TEXT, //inputType,

				/**新增*/
				9:30,  //size
				10:"left",  //textAlign
				11:"top",  //verticalAlign
				12:"SimHei",  //fontFamily
				13:5, //lineSpacing
				14:false,  //multiline
				15:0x000000  //promptColor
            }
        }

		/** -----------------------  新增属性 ------------------------------------- */
		public get multiline():boolean {
            if (this.textDisplay) {
                return this.textDisplay.multiline;
            }
            return this.$TextInput[sys.ATextInputKeys.multiline];
        }
        public set multiline(value:boolean) {
            this.$TextInput[sys.ATextInputKeys.multiline] = value;
            if (this.textDisplay) {
                this.textDisplay.multiline = value;
            }
            if (this.promptDisplay) {
                this.promptDisplay.multiline = value;
            }
            this.invalidateProperties();
        }

		public get lineSpacing():number {
            if (this.textDisplay) {
                return this.textDisplay.lineSpacing;
            }
            return this.$TextInput[sys.ATextInputKeys.lineSpacing];
        }
        public set lineSpacing(value:number) {
            this.$TextInput[sys.ATextInputKeys.lineSpacing] = value;
            if (this.textDisplay) {
                this.textDisplay.lineSpacing = value;
            }
            if (this.promptDisplay) {
                this.promptDisplay.lineSpacing = value;
            }
            this.invalidateProperties();
        }

		public get fontFamily():string {
            if (this.textDisplay) {
                return this.textDisplay.fontFamily;
            }
            return this.$TextInput[sys.ATextInputKeys.size];
        }
        public set fontFamily(value:string) {
            this.$TextInput[sys.ATextInputKeys.fontFamily] = value;
            if (this.textDisplay) {
                this.textDisplay.fontFamily = value;
            }
            if (this.promptDisplay) {
                this.promptDisplay.fontFamily = value;
            }
            this.invalidateProperties();
        }

        public get size():number {
            if (this.textDisplay) {
                return this.textDisplay.size;
            }
            return this.$TextInput[sys.ATextInputKeys.size];
        }
        public set size(value:number) {
            this.$TextInput[sys.ATextInputKeys.size] = value;
            if (this.textDisplay) {
                this.textDisplay.size = value;
            }
            if (this.promptDisplay) {
                this.promptDisplay.size = value;
            }
            this.invalidateProperties();
        }

        public get textAlign():string {
            if (this.textDisplay) {
                return this.textDisplay.textAlign;
            }
            return this.$TextInput[sys.ATextInputKeys.textAlign];
        }
        public set textAlign(value:string) {
            this.$TextInput[sys.ATextInputKeys.textAlign] = value;
            if (this.textDisplay) {
                this.textDisplay.textAlign = value;
            }
            if (this.promptDisplay) {
                this.promptDisplay.textAlign = value;
            }
            this.invalidateProperties();
        }

        public get verticalAlign():string {
            if (this.textDisplay) {
                return this.textDisplay.verticalAlign;
            }
            return this.$TextInput[sys.ATextInputKeys.verticalAlign];
        }
        public set verticalAlign(value:string) {
            this.$TextInput[sys.ATextInputKeys.verticalAlign] = value;
            if (this.textDisplay) {
                this.textDisplay.verticalAlign = value;
            }
            if (this.promptDisplay) {
                this.promptDisplay.verticalAlign = value;
            }
            this.invalidateProperties();
        }

        public get promptColor():number {
            if (this.promptDisplay) {
                return this.promptDisplay.textColor;
            }
            return this.$TextInput[sys.ATextInputKeys.promptColor];
        }
        public set promptColor(value:number) {
            this.$TextInput[sys.ATextInputKeys.promptColor] = value;
            if (this.promptDisplay) {
                this.promptDisplay.textColor = value;
            }
            this.invalidateProperties();
        }


        /**
         * @private
         */
        $TextInput:Object;
        /**
         * [SkinPart] 实体文本输入组件
         */
        public textDisplay:EditableText;
        /**
         * [SkinPart] 当text属性为空字符串时要显示的文本。
         */
        public promptDisplay:Label;

        public get prompt():string {
            if (this.promptDisplay) {
                return this.promptDisplay.text;
            }
            return this.$TextInput[sys.ATextInputKeys.prompt];
        }
        public set prompt(value:string) {
            this.$TextInput[sys.ATextInputKeys.prompt] = value;
            if (this.promptDisplay) {
                this.promptDisplay.text = value;
            }
            this.invalidateProperties();
            this.invalidateState();
        }
        public get displayAsPassword(): boolean {
            if (this.textDisplay) {
                return this.textDisplay.displayAsPassword;
            }
            let v = this.$TextInput[sys.ATextInputKeys.displayAsPassword];
            return v ? v : false;
        }
        public set displayAsPassword(value: boolean) {
            this.$TextInput[sys.ATextInputKeys.displayAsPassword] = value;
            if (this.textDisplay) {
                this.textDisplay.displayAsPassword = value;
            }
            this.invalidateProperties();
        }
        public set inputType(value: string) {
            this.$TextInput[sys.ATextInputKeys.inputType] = value;
            if (this.textDisplay) {
                this.textDisplay.inputType = value;
            }
            this.invalidateProperties();
        }
        public get inputType(): string {
            if (this.textDisplay) {
                return this.textDisplay.inputType;
            }
            return this.$TextInput[sys.ATextInputKeys.inputType];
        }
        public get textColor():number {
            if (this.textDisplay) {
                return this.textDisplay.textColor;
            }
            return this.$TextInput[sys.ATextInputKeys.textColor];
        }
        public set textColor(value:number) {
            this.$TextInput[sys.ATextInputKeys.textColor] = value;
            if (this.textDisplay) {
                this.textDisplay.textColor = value;
            }
            this.invalidateProperties();
        }
        public get maxChars():number {
            if (this.textDisplay) {
                return this.textDisplay.maxChars;
            }
            let v = this.$TextInput[sys.ATextInputKeys.maxChars];
            return v ? v : 0;
        }
        public set maxChars(value:number) {
            this.$TextInput[sys.ATextInputKeys.maxChars] = value;
            if (this.textDisplay) {
                this.textDisplay.maxChars = value;
            }
            this.invalidateProperties();
        }
        public get maxWidth():number {
            if (this.textDisplay) {
                return this.textDisplay.maxWidth;
            }
            let v = this.$TextInput[sys.ATextInputKeys.maxWidth];
            return v ? v : 100000;
        }
        public set maxWidth(value:number) {
            this.$TextInput[sys.ATextInputKeys.maxWidth] = value;
            if (this.textDisplay) {
                this.textDisplay.maxWidth = value;
            }
            this.invalidateProperties();
        }
        public get maxHeight():number {
            if (this.textDisplay) {
                //return this.textDisplay.maxHeight;
            }
            let v = this.$TextInput[sys.ATextInputKeys.maxHeight];
            return v ? v : 100000;
        }
        public set maxHeight(value:number) {
            this.$TextInput[sys.ATextInputKeys.maxHeight] = value;
            if (this.textDisplay) {
                this.textDisplay.maxHeight = value;
            }
            this.invalidateProperties();
        }
        public get text():string {
            if (this.textDisplay) {
                return this.textDisplay.text;
            }
            return this.$TextInput[sys.ATextInputKeys.text];
        }
        public set text(value:string) {
            this.$TextInput[sys.ATextInputKeys.text] = value;
            if (this.textDisplay) {
                this.textDisplay.text = value;
            }
            this.invalidateProperties();
            this.invalidateState();
        }
        public get restrict():string {
            if (this.textDisplay) {
                return this.textDisplay.restrict;
            }
            return this.$TextInput[sys.ATextInputKeys.restrict];
        }
        public set restrict(value:string) {
            this.$TextInput[sys.ATextInputKeys.restrict] = value;
            if (this.textDisplay) {
                this.textDisplay.restrict = value;
            }
            this.invalidateProperties();
        }

        /**
         * @private
         */
        private isFocus:boolean = false;

        /**
         * @private
         * 焦点移入
         */
        private focusInHandler(event:FocusEvent):void {
            this.isFocus = true;
            this.invalidateState();
        }

        /**
         * @private
         * 焦点移出
         */
        private focusOutHandler(event:FocusEvent):void {
            this.isFocus = false;
            this.invalidateState();
        }

        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        protected getCurrentState():string {
            let skin = this.skin;
            if (this.prompt && !this.isFocus && !this.text) {
                if (this.enabled && skin.hasState("normalWithPrompt")) {
                    return "normalWithPrompt";
                }
                else if (!this.enabled && skin.hasState("disabledWithPrompt")) {
                    return "disabledWithPrompt";
                }
            }
            else {
                if (this.enabled) {
                    return "normal";
                }
                else {
                    return "disabled";
                }
            }
        }

        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        protected partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            let values = this.$TextInput;
            if (instance == this.textDisplay) {
                this.textDisplayAdded();
                if (this.textDisplay instanceof EditableText) {
                    this.textDisplay.addEventListener(FocusEvent.FOCUS_IN, this.focusInHandler, this);
                    this.textDisplay.addEventListener(FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
                }
            }
            else if (instance == this.promptDisplay) {
                if (values[sys.ATextInputKeys.prompt]) {
                    this.promptDisplay.text = values[sys.ATextInputKeys.prompt];
                }
				if (values[sys.ATextInputKeys.size]) {
					this.promptDisplay.size = values[sys.ATextInputKeys.size];
				}
				if (values[sys.ATextInputKeys.textAlign]) {
					this.promptDisplay.textAlign = values[sys.ATextInputKeys.textAlign];
				}
				if (values[sys.ATextInputKeys.verticalAlign]) {
					this.promptDisplay.verticalAlign = values[sys.ATextInputKeys.verticalAlign];
				}
				if (values[sys.ATextInputKeys.fontFamily]) {
					this.promptDisplay.fontFamily = values[sys.ATextInputKeys.fontFamily];
				}
				if (values[sys.ATextInputKeys.promptColor]) {
					this.promptDisplay.textColor = values[sys.ATextInputKeys.promptColor];
				}
            }
        }

        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        protected partRemoved(partName:string, instance:any):void {
            super.partRemoved(partName, instance);
            if (instance == this.textDisplay) {
                this.textDisplayRemoved();
                if (this.textDisplay instanceof EditableText) {
                    this.textDisplay.removeEventListener(FocusEvent.FOCUS_IN, this.focusInHandler, this);
                    this.textDisplay.removeEventListener(FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
                }
            }
            else if (instance == this.promptDisplay) {
                this.$TextInput[sys.ATextInputKeys.prompt] = this.promptDisplay.text;
                this.$TextInput[sys.ATextInputKeys.promptColor] = this.promptDisplay.textColor;
            }
        }

        /**
         * @private
         */
        private textDisplayAdded():void {
            let values = this.$TextInput;
            if (values[sys.ATextInputKeys.displayAsPassword]) {
                this.textDisplay.displayAsPassword = values[sys.ATextInputKeys.displayAsPassword];
            }
            if (values[sys.ATextInputKeys.textColor]) {
                this.textDisplay.textColor = values[sys.ATextInputKeys.textColor];
            }
            if (values[sys.ATextInputKeys.maxChars]) {
                this.textDisplay.maxChars = values[sys.ATextInputKeys.maxChars];
            }
            if (values[sys.ATextInputKeys.maxWidth]) {
                this.textDisplay.maxWidth = values[sys.ATextInputKeys.maxWidth];
            }
            if (values[sys.ATextInputKeys.maxHeight]) {
                this.textDisplay.maxHeight = values[sys.ATextInputKeys.maxHeight];
            }
            if (values[sys.ATextInputKeys.text]) {
                this.textDisplay.text = values[sys.ATextInputKeys.text];
            }
            if (values[sys.ATextInputKeys.restrict]) {
                this.textDisplay.restrict = values[sys.ATextInputKeys.restrict];
            }
            if (values[sys.ATextInputKeys.inputType]) {
                this.textDisplay.inputType = values[sys.ATextInputKeys.inputType];
            }


            if (values[sys.ATextInputKeys.size]) {
                this.textDisplay.size = values[sys.ATextInputKeys.size];
            }
            if (values[sys.ATextInputKeys.textAlign]) {
                this.textDisplay.textAlign = values[sys.ATextInputKeys.textAlign];
            }
            if (values[sys.ATextInputKeys.verticalAlign]) {
                this.textDisplay.verticalAlign = values[sys.ATextInputKeys.verticalAlign];
            }
            if (values[sys.ATextInputKeys.fontFamily]) {
                this.textDisplay.fontFamily = values[sys.ATextInputKeys.fontFamily];
            }
            if (values[sys.ATextInputKeys.lineSpacing]) {
                this.textDisplay.lineSpacing = values[sys.ATextInputKeys.lineSpacing];
            }
            if (values[sys.ATextInputKeys.multiline]) {
                this.textDisplay.multiline = values[sys.ATextInputKeys.multiline];
            }
        }
        /**
         * @private
         */
        private textDisplayRemoved() {
            let values = this.$TextInput;
            values[sys.ATextInputKeys.displayAsPassword] = this.textDisplay.displayAsPassword;
            values[sys.ATextInputKeys.textColor] = this.textDisplay.textColor;
            values[sys.ATextInputKeys.maxChars] = this.textDisplay.maxChars;
            values[sys.ATextInputKeys.maxWidth] = this.textDisplay.maxWidth;
            values[sys.ATextInputKeys.maxHeight] = this.textDisplay.maxHeight;
            values[sys.ATextInputKeys.text] = this.textDisplay.text;
            values[sys.ATextInputKeys.restrict] = this.textDisplay.restrict;
            values[sys.ATextInputKeys.inputType] = this.textDisplay.inputType;

            values[sys.ATextInputKeys.size] = this.textDisplay.size;
            values[sys.ATextInputKeys.textAlign] = this.textDisplay.textAlign;
            values[sys.ATextInputKeys.verticalAlign] = this.textDisplay.verticalAlign;
            values[sys.ATextInputKeys.fontFamily] = this.textDisplay.fontFamily;
            values[sys.ATextInputKeys.lineSpacing] = this.textDisplay.lineSpacing;
            values[sys.ATextInputKeys.multiline] = this.textDisplay.multiline;
        }
    }
}
