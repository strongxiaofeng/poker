module game
{
    export class OwnersWatchItemUI1 extends OwnersWatchBaseItemUI
    {
        
        public constructor()
        {
            super();
        }

        /**  点击响应*/
        protected onTouchTap(evt: egret.TouchEvent): void
        {
            super.onTouchTap(evt);
            switch (evt.target) {

            }
        }



        /**当移除这个item时执行的清除方法 由子类重写*/
        public onRemove()
        {
            super.onRemove();
        }

    }
}
