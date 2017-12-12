namespace eui {
    /**
	 * 需要设置缩放的最大宽度时，在皮肤中设置fixedWidth，不设置width，就可以了
     */
    export class ABitmapLabel extends BitmapLabel {
        /**预设宽度阀值 */
        public fixedWidth: number = 0;
		private defaultScaleX:number = 1;

        public constructor(text?: string) {
            super(text);
        }

		$setScaleX(value: number): any {
			if(value>0) {
                this.defaultScaleX = value;
            }
           return super.$setScaleX(value);
        }

		public invalidateSize(): void {
            super.invalidateSize();
			if(this.fixedWidth>0) {
                if(this.textWidth*this.defaultScaleX > this.fixedWidth) {
                    super.$setScaleX(this.fixedWidth/this.textWidth);
                }
                else{
                    super.$setScaleX(this.defaultScaleX);
                }
            }
        }
    }
}
