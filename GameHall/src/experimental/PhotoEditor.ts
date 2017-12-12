module game {
	/**1.图片选择器 */
	export class PhotoEditor {

		public constructor() {


		}
		/**1.选择 */
		public static picker(callBack:Function,obj:any):void
		{
			egret.experimental.pickPhoto().then(function(data){
				let saveImage: HTMLImageElement = new Image;
				saveImage.onload = () =>
				{
					//避免onload再次执行
					saveImage.onload = null;
					let bmd = new egret.BitmapData(saveImage);
					let texture = new egret.Texture();
					texture.bitmapData = bmd;
					callBack.call(obj,texture);
				}
				saveImage.src = data;
			}).catch(function(err){
				callBack.call(obj,err);
			});
		}

		/**裁剪图片
		 * bitMap:你要裁剪图片
		 * rectangle:裁剪的矩形
		*/
		public static cutBitmap(bitMap:egret.DisplayObject,rectangle:egret.Rectangle,callBack:Function,obj:any):void
		{
			//使用 RenderTexture 进行显示
			let renderTexture:egret.RenderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(bitMap,rectangle);
			callBack.call(obj,renderTexture);

		}
		/**使图片放大缩小
		 * imgMap:你要变化的图片
		 * changeNum：变化的倍数
		*/
		public static changeBitmapZoom(imgMap:egret.DisplayObject,changeNum:number,callBack?:Function,obj?:any):void
		{
			imgMap.scaleX *= changeNum;
			imgMap.scaleY *= changeNum;
		}
		/**检查手势
		 * group：手势移动的区域
		 *
		*/
		public static checkFinger(group:eui.Group,touchPointID1:number,touchPointID2:number,changeX1:number,changeY1:number,changeX2:number,changeY2:number,callBack:Function,obj:any):void
		{
		}
		/**手指判断(几根手指)
		 * touchPointID1:第一根手指的e.touchPointID
		 * touchPointID2:第二根手指的e.touchPointID
		*/
		public static isFinger(touchPointID1:number,touchPointID2:number,callBack:Function,obj:any):void
		{
			let fingerNum:number;//1一根手指，2两根及以上
			if((touchPointID1 != undefined && touchPointID2 != undefined) || (touchPointID1 != null && touchPointID2 != null))
			{
				if(touchPointID1 != touchPointID2)
				{
					fingerNum = 2;
				}
				else
				{
					fingerNum = 1;
				}
			}
			else
			{
				fingerNum = 1;
			}
			callBack.call(obj,fingerNum);
		}
		/**距离判断(两指间距离判断)
		 * nowDistance:当前两点距离
		 * lastDistance：上一次两点距离
		*/
		public static fingerDistance(nowDistance:number,lastDistance:number,callBack:Function,obj:any):void
		{
			let fingerDistanceType:number;//0:不变，1:变大，2:变小
			if(nowDistance != undefined && lastDistance != undefined)
			{
				if(nowDistance > lastDistance)
				{
					fingerDistanceType = 1;
				}
				else if(nowDistance < lastDistance)
				{
					fingerDistanceType = 2;
				}
				else
				{
					fingerDistanceType = 0;
				}
				callBack.call(obj,fingerDistanceType);
			}
		}
	}
}