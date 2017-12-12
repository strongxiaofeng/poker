module game{
    export class MyController extends BaseController{
        private static instance: MyController;
        public static getInstance(): MyController
        {
            if (this.instance == null)
            {
                this.instance = new MyController();
            }
            return this.instance;
        }

        public constructor()
        {
            super();
        }
    }
}