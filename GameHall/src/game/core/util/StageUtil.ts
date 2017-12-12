module game {
    /**
    *
    * @author 
    *
    */
    export class StageUtil {
        public static stage:egret.Stage;
        public static canvasHeight:number=0;
        public static scaleMode;
    	  public constructor() {
    	  }
    	  public static get width():number{
              if(this.stage) return this.stage.stageWidth;
              else return -1;
    	  }
    	  public static get height():number{
              if(this.stage) return this.stage.stageHeight;
              else return -1;
        }
        public static get frameRate():number{
            if(this.stage) return this.stage.frameRate;
            else return -1;
        }
        /**
         * 获取离上边界距离
         */ 
        public static get top(): number {
            var top = 0;
            if(GlobalConfig.isMobile) {
                top = document.documentElement.clientHeight - window.innerHeight;
                if(top > 44) top = top / 2;
            }
            return top;
        }
        public static setMaxTouched(n:number = 1): void{
            if(this.stage) this.stage.maxTouches = n;;
        }
        /**将内容复制到剪切板 */
        public static copyTxt(txt:string): void
        {
            window["copyTxt"](txt);
        }

        /**设置屏幕同时可触摸数量 */
        public static maxTouches(num:number):void
        {
            this.stage.maxTouches = num;
        }
    }
}
