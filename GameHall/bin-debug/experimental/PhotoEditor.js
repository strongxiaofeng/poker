var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**1.图片选择器 */
    var PhotoEditor = (function () {
        function PhotoEditor() {
        }
        /**1.选择 */
        PhotoEditor.picker = function (callBack, obj) {
            egret.experimental.pickPhoto().then(function (data) {
                var saveImage = new Image;
                saveImage.onload = function () {
                    //避免onload再次执行
                    saveImage.onload = null;
                    var bmd = new egret.BitmapData(saveImage);
                    var texture = new egret.Texture();
                    texture.bitmapData = bmd;
                    callBack.call(obj, texture);
                };
                saveImage.src = data;
            }).catch(function (err) {
                callBack.call(obj, err);
            });
        };
        /**裁剪图片
         * bitMap:你要裁剪图片
         * rectangle:裁剪的矩形
        */
        PhotoEditor.cutBitmap = function (bitMap, rectangle, callBack, obj) {
            //使用 RenderTexture 进行显示
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(bitMap, rectangle);
            callBack.call(obj, renderTexture);
        };
        /**使图片放大缩小
         * imgMap:你要变化的图片
         * changeNum：变化的倍数
        */
        PhotoEditor.changeBitmapZoom = function (imgMap, changeNum, callBack, obj) {
            imgMap.scaleX *= changeNum;
            imgMap.scaleY *= changeNum;
        };
        /**检查手势
         * group：手势移动的区域
         *
        */
        PhotoEditor.checkFinger = function (group, touchPointID1, touchPointID2, changeX1, changeY1, changeX2, changeY2, callBack, obj) {
        };
        /**手指判断(几根手指)
         * touchPointID1:第一根手指的e.touchPointID
         * touchPointID2:第二根手指的e.touchPointID
        */
        PhotoEditor.isFinger = function (touchPointID1, touchPointID2, callBack, obj) {
            var fingerNum; //1一根手指，2两根及以上
            if ((touchPointID1 != undefined && touchPointID2 != undefined) || (touchPointID1 != null && touchPointID2 != null)) {
                if (touchPointID1 != touchPointID2) {
                    fingerNum = 2;
                }
                else {
                    fingerNum = 1;
                }
            }
            else {
                fingerNum = 1;
            }
            callBack.call(obj, fingerNum);
        };
        /**距离判断(两指间距离判断)
         * nowDistance:当前两点距离
         * lastDistance：上一次两点距离
        */
        PhotoEditor.fingerDistance = function (nowDistance, lastDistance, callBack, obj) {
            var fingerDistanceType; //0:不变，1:变大，2:变小
            if (nowDistance != undefined && lastDistance != undefined) {
                if (nowDistance > lastDistance) {
                    fingerDistanceType = 1;
                }
                else if (nowDistance < lastDistance) {
                    fingerDistanceType = 2;
                }
                else {
                    fingerDistanceType = 0;
                }
                callBack.call(obj, fingerDistanceType);
            }
        };
        return PhotoEditor;
    }());
    game.PhotoEditor = PhotoEditor;
    __reflect(PhotoEditor.prototype, "game.PhotoEditor");
})(game || (game = {}));
//# sourceMappingURL=PhotoEditor.js.map