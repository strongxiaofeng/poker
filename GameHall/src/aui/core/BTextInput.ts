
module eui {
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
		promptColor
    }

	/**可以在皮肤中预览，但是只能预览到TextInput的属性，不能预览新增的属性 */
	export class BTextInput extends eui.TextInput{
		public constructor() {
			super();
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
		

		protected partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            let values = this.$TextInput;
            if (instance == this.textDisplay) {
				if (values[sys.ATextInputKeys.size]) {
					this.textDisplay.size = values[sys.ATextInputKeys.size];
				}
				if (values[sys.ATextInputKeys.textAlign]) {
					this.textDisplay.textAlign = values[sys.ATextInputKeys.textAlign];
				}
				if (values[sys.ATextInputKeys.verticalAlign]) {
					this.textDisplay.verticalAlign = values[sys.ATextInputKeys.verticalAlign];
				}
            }
            else if (instance == this.promptDisplay) {
				if (values[sys.ATextInputKeys.size]) {
					this.promptDisplay.size = values[sys.ATextInputKeys.size];
				}
				if (values[sys.ATextInputKeys.textAlign]) {
					this.promptDisplay.textAlign = values[sys.ATextInputKeys.textAlign];
				}
				if (values[sys.ATextInputKeys.verticalAlign]) {
					this.promptDisplay.verticalAlign = values[sys.ATextInputKeys.verticalAlign];
				}
				if (values[sys.ATextInputKeys.promptColor]) {
					this.promptDisplay.textColor = values[sys.ATextInputKeys.promptColor];
				}
            }
        }

        protected partRemoved(partName:string, instance:any):void {
            super.partRemoved(partName, instance);
            let values = this.$TextInput;
            if (instance == this.textDisplay) {
				values[sys.ATextInputKeys.size] = this.textDisplay.size;
				values[sys.ATextInputKeys.textAlign] = this.textDisplay.textAlign;
				values[sys.ATextInputKeys.verticalAlign] = this.textDisplay.verticalAlign;
            }
            else if (instance == this.promptDisplay) {
                this.$TextInput[sys.ATextInputKeys.promptColor] = this.promptDisplay.textColor;
            }
        }
	}
}