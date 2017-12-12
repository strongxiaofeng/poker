namespace eui {


    let SplitRegex = new RegExp("(?=[\\u00BF-\\u1FFF\\u2C00-\\uD7FF]|\\b|\\s)(?![。，！、》…）)}”】\\.\\,\\!\\?\\]\\:])");

    /**
     * @private
     * 根据样式测量文本宽度
     */
    function measureTextWidth(text, values:any, style?:egret.ITextStyle):number {
        style = style || <egret.ITextStyle>{};
        let italic:boolean = style.italic == null ? values[egret.sys.TextKeys.italic] : style.italic;
        let bold:boolean = style.bold == null ? values[egret.sys.TextKeys.bold] : style.bold;
        let size:number = style.size == null ? values[egret.sys.TextKeys.fontSize] : style.size;
        let fontFamily:string = style.fontFamily || values[egret.sys.TextKeys.fontFamily] || egret.TextField.default_fontFamily;
        return egret.sys.measureText(text, fontFamily, size, bold, italic);
    }

    /**
     * 自定义的多语言Label
     * 当设置了isFixed为true时，不会自动换行 而是缩放scaleX
    */
    export class ALabel extends Label
    {

        /**是否允许多行压缩*/
        public isFixedMultiLine:boolean = false;
        /**允许多行压缩的行数 */
        public multiFixedLineNumber:number = 1;


        /**是否允许换行,默认不允许 */
        public newlineAble :boolean = false;
        /**是否开启超过预设宽度时缩放scaleX */
        public isFixed:boolean = false;
        /**预设宽度阀值 */
        private fixedWidth: number = 0;
        /**text后缀，这个后缀会在翻译text内容之后添加 */
        public tailFix: string = "";
        /**text前缀，这个前缀会在翻译text内容之前添加 */
        public preFix: string = "";
        /**多语言的key */
        private _key = "";
        /**默认颜色 */
        public color_default: number = 0xffffff;
        /**按下颜色 */
        private _color_press: number = -1;


        public static defaultFont = "Microsoft YaHei,SimHei,SimSun,sans-serif";

        public constructor(text?:string) {
            super(text);
            this.fontFamily = ALabel.defaultFont;

        }
        public get color_press(): number
        {
            return this._color_press;
        }
        public set color_press(n:number)
        {
            this._color_press = n;
            if(n >= 0)
            {
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showPressColor, this);
            }
        }
        /**显示按下颜色 */
        protected showPressColor()
        {
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.hidePressColor, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.hidePressColor, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.hidePressColor, this);
            this.textColor = this._color_press;
            let text = this.text;
            this.text = text+"a";
            this.text = text;
        }
        /**显示默认颜色 */
        protected hidePressColor()
        {
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.hidePressColor, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.hidePressColor, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.hidePressColor, this);
            this.textColor = this.color_default;
            let text = this.text;
            this.text = text+"a";
            this.text = text;
        }

        public set size(value:number) {
            this.$setSize(value);

            if(this.isFixed){
                this.checkFixedWidth();
            }
        }
        /**不接受其他字体的设置 */
        $setFontFamily(value:string):boolean
        {
            return super.$setFontFamily(ALabel.defaultFont);
        }

        $invalidateContentBounds():void {
            super.$invalidateContentBounds(); //这个方法在5.0的父类没有的
            this.invalidateSize();
        }
        public set width(value: number) {
            this.$setWidth(value);

            //设置宽度时，同时设置fixedWidth
            if(this.isFixed){
                this.fixedWidth = value;
                this.checkFixedWidth();
            }
        }
        $setWidth(value:number):boolean {
            if(this.isFixed && this.fixedWidth > 0){
                //当设置width小于fixedWidth时，将width设置为fixedWidth
                if(this.textWidth <this.fixedWidth) {
                    value = this.fixedWidth;
                }
            }

            let result1:boolean = super.$setWidth(value);
            let result2:boolean = super.$setWidth.call(this, value);
            this.checkMultiFixedWidth();
            return result1 && result2;
        }
        $setHeight(value:number):boolean {
            let result1:boolean = super.$setHeight(value);
            let result2:boolean = super.$setHeight.call(this, value);
            return result1 && result2;
        }
        $setText(value:string):boolean
        {
            this._key = value;
            value = this.preFix + game.LanguageUtil.translate(value) + this.tailFix;
            // value = this.preFix +value + this.tailFix;
            let result:boolean = super.$setText(value);
            PropertyEvent.dispatchPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, "text");

            if(this.isFixed){
                this.checkFixedWidth();
            }

            this.checkMultiFixedWidth();

            return result;
        }
        /**重置多语言 */
        public reload():void
        {
            this.text = this._key;
        }
        /**处理文字长度是否超出fixedWidth */
        private checkFixedWidth(){
            this.height = this.size;
            if(this.fixedWidth < this.textWidth) {
                this.$setWidth(this.textWidth);
                this.scaleX = this.fixedWidth/this.textWidth;
            }
            else{
                this.$setWidth(this.fixedWidth);
                this.scaleX = 1;
            }
        }
        /**处理多行的文字长度压缩 */
        private checkMultiFixedWidth(){
            if(this.isFixedMultiLine){
                let size = this.$TextField[egret.sys.TextKeys.fontSize];
                let length:number = measureTextWidth(this.text, this.$TextField, this["textArr"][0].style);
                let defaultw = this.$TextField[egret.sys.TextKeys.textFieldWidth] || this.width;
                let expectedLength = defaultw*this.multiFixedLineNumber;
                if(length > expectedLength){
                    // var moreLength = length-expectedLength;
                    let actualyWidth = Math.ceil(length/this.multiFixedLineNumber + size/2);
                    this.width = actualyWidth;
                    this.scaleX = defaultw/actualyWidth;
                }
            }
        }

        /**
         * 重写这个方法，让他不自动换行
         */
        $getLinesArr():Array<egret.ILineElement> {
            let values = this.$TextField;
            if (!values[egret.sys.TextKeys.textLinesChanged]) {
                return this["linesArr"];
            }

            values[egret.sys.TextKeys.textLinesChanged] = false;
            let text2Arr:Array<egret.ITextElement> = this["textArr"];

            this["linesArr"].length = 0;
            values[egret.sys.TextKeys.textHeight] = 0;
            values[egret.sys.TextKeys.textWidth] = 0;

            let textFieldWidth:number = values[egret.sys.TextKeys.textFieldWidth];
            //宽度被设置为0
            if (!isNaN(textFieldWidth) && textFieldWidth == 0) {
                values[egret.sys.TextKeys.numLines] = 0;
                return [{width: 0, height: 0, charNum: 0, elements: [], hasNextLine: false}];
            }

            let linesArr:Array<egret.ILineElement> = this["linesArr"];
            let lineW:number = 0;
            let lineCharNum:number = 0;
            let lineH:number = 0;
            let lineCount:number = 0;
            let lineElement:egret.ILineElement;

            for (let i:number = 0, text2ArrLength:number = text2Arr.length; i < text2ArrLength; i++) {
                let element:egret.ITextElement = text2Arr[i];
                //可能设置为没有文本，忽略绘制
                if(!element.text) {
                    if (lineElement) {
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        values[egret.sys.TextKeys.textWidth] = Math.max(values[egret.sys.TextKeys.textWidth], lineW);
                        values[egret.sys.TextKeys.textHeight] += lineH;
                    }
                    continue;
                }
                element.style = element.style || <egret.ITextStyle>{};

                let text:string = element.text.toString();
                let textArr:string[] = text.split(/(?:\r\n|\r|\n)/);

                for (let j:number = 0, textArrLength:number = textArr.length; j < textArrLength; j++) {
                    if (linesArr[lineCount] == null) {
                        lineElement = {width: 0, height: 0, elements: [], charNum: 0, hasNextLine: false};
                        linesArr[lineCount] = lineElement;
                        lineW = 0;
                        lineH = 0;
                        lineCharNum = 0;
                    }

                    if (values[egret.sys.TextKeys.type] == egret.TextFieldType.INPUT) {
                        lineH = values[egret.sys.TextKeys.fontSize];
                    }
                    else {
                        lineH = Math.max(lineH, element.style.size || values[egret.sys.TextKeys.fontSize]);
                    }

                    let isNextLine:boolean = true;
                    if (textArr[j] == "") {
                        if (j == textArrLength - 1) {
                            isNextLine = false;
                        }
                    }
                    else {
                        let w:number = measureTextWidth(textArr[j], values, element.style);
                        if (isNaN(textFieldWidth)) {//没有设置过宽
                            lineW += w;
                            lineCharNum += textArr[j].length;
                            lineElement.elements.push(<egret.IWTextElement>{
                                width: w,
                                text: textArr[j],
                                style: element.style
                            });

                            if (j == textArrLength - 1) {
                                isNextLine = false;
                            }
                        }
                        else {
                            // 重写这里 不允许换行
                            if(!this.newlineAble){
                                lineElement.elements.push(<egret.IWTextElement>{
                                    width: w,
                                    text: textArr[j],
                                    style: element.style
                                });
                                lineW += w;
                                lineCharNum += textArr[j].length;

                                if (j == textArrLength - 1) {
                                    isNextLine = false;
                                }
                            }
                            //允许换行，和egret.TextField的处理一致
                            else {
                                if (lineW + w <= textFieldWidth) {//在设置范围内
                                    lineElement.elements.push(<egret.IWTextElement>{
                                        width: w,
                                        text: textArr[j],
                                        style: element.style
                                    });
                                    lineW += w;
                                    lineCharNum += textArr[j].length;

                                    if (j == textArrLength - 1) {
                                        isNextLine = false;
                                    }
                                }
                                else {
                                    let k:number = 0;
                                    let ww:number = 0;
                                    let word:string = textArr[j];
                                    let words:string[];
                                    if (values[egret.sys.TextKeys.wordWrap]) {
                                        words = word.split(SplitRegex);
                                    }
                                    else {
                                        words = word.match(/./g);
                                    }
                                    let wl:number = words.length;
                                    let charNum = 0;
                                    for (; k < wl; k++) {

                                        // detect 4 bytes unicode, refer https://mths.be/punycode
                                        var codeLen = words[k].length;
                                        var has4BytesUnicode = false;
                                        if (codeLen == 1 && k < wl-1) // when there is 2 bytes high surrogate
                                        {
                                            var charCodeHigh = words[k].charCodeAt(0);
                                            var charCodeLow = words[k+1].charCodeAt(0);
                                            if ( charCodeHigh >= 0xD800 && charCodeHigh <= 0xDBFF && (charCodeLow & 0xFC00) == 0xDC00) { // low
                                                var realWord = words[k]+words[k+1];
                                                codeLen = 2;
                                                has4BytesUnicode = true;
                                                w  = measureTextWidth(realWord, values, element.style);
                                            } else {
                                                w = measureTextWidth(words[k], values, element.style);
                                            }
                                        } else {
                                            w = measureTextWidth(words[k], values, element.style);
                                        }

                                        // w = measureTextWidth(words[k], values, element.style);
                                        if (lineW != 0 && lineW + w > textFieldWidth && lineW + k != 0) {
                                            break;
                                        }
                                        if (ww + w > textFieldWidth) {//纯英文，一个词就超出宽度的情况
                                            var words2:Array<string> = words[k].match(/./g);
                                            for (var k2 = 0, wl2 = words2.length; k2 < wl2; k2++) {

                                                // detect 4 bytes unicode, refer https://mths.be/punycode
                                                var codeLen2 = words2[k2].length;
                                                var has4BytesUnicode2 = false;
                                                if (codeLen2 == 1 && k2 < wl2-1) // when there is 2 bytes high surrogate
                                                {
                                                    var charCodeHigh2 = words2[k2].charCodeAt(0);
                                                    var charCodeLow2 = words2[k2+1].charCodeAt(0);
                                                    if ( charCodeHigh2 >= 0xD800 && charCodeHigh2 <= 0xDBFF && (charCodeLow2 & 0xFC00) == 0xDC00) { // low
                                                        var realWord2 = words2[k2]+words2[k2+1];
                                                        codeLen2 = 2;
                                                        has4BytesUnicode2 = true;
                                                        w  = measureTextWidth(realWord2, values, element.style);
                                                    } else {
                                                        w = measureTextWidth(words2[k2], values, element.style);
                                                    }
                                                } else {
                                                    w = measureTextWidth(words2[k2], values, element.style);
                                                }
                                                // w = measureTextWidth(words2[k2], values, element.style);

                                                if(k2>0 && lineW+w>textFieldWidth){
                                                    break;
                                                }
                                                // charNum += words2[k2].length;
                                                charNum += codeLen2;
                                                ww += w;
                                                lineW +=w;
                                                lineCharNum += charNum;

                                                if (has4BytesUnicode2) {
                                                    k2 ++;
                                                }
                                            }
                                        } else {
                                            // charNum += words[k].length;
                                            charNum += codeLen;
                                            ww += w;
                                            lineW += w;
                                            lineCharNum += charNum;
                                        }

                                        if (has4BytesUnicode) {
                                            k ++;
                                        }

                                    }

                                    if (k > 0) {
                                        lineElement.elements.push(<egret.IWTextElement>{
                                            width: ww,
                                            text: word.substring(0, charNum),
                                            style: element.style
                                        });

                                        let leftWord:string = word.substring(charNum);
                                        let m:number;
                                        let lwleng = leftWord.length;
                                        for (m = 0; m < lwleng; m++) {
                                            if (leftWord.charAt(m) != " ") {
                                                break;
                                            }
                                        }
                                        textArr[j] = leftWord.substring(m);
                                    }
                                    if (textArr[j] != "") {
                                        j--;
                                        isNextLine = false;
                                    }
                                }
                            }
                        }
                    }

                    if (isNextLine) {
                        lineCharNum++;
                        lineElement.hasNextLine = true;
                    }

                    if (j < textArr.length - 1) {//非最后一个
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        values[egret.sys.TextKeys.textWidth] = Math.max(values[egret.sys.TextKeys.textWidth], lineW);
                        values[egret.sys.TextKeys.textHeight] += lineH;

                        //if (this._type == TextFieldType.INPUT && !this._multiline) {
                        //    this._numLines = linesArr.length;
                        //    return linesArr;
                        //}
                        lineCount++;
                    }


                }

                if (i == text2Arr.length - 1 && lineElement) {
                    lineElement.width = lineW;
                    lineElement.height = lineH;
                    lineElement.charNum = lineCharNum;
                    values[egret.sys.TextKeys.textWidth] = Math.max(values[egret.sys.TextKeys.textWidth], lineW);
                    values[egret.sys.TextKeys.textHeight] += lineH;
                }
            }

            values[egret.sys.TextKeys.numLines] = linesArr.length;
            return linesArr;
        }

    }
}
