module game{
    export class MyModel
    {
        private static instance: MyModel;
        public static getInstance(): MyModel
        {
            if (this.instance == null)
            {
                this.instance = new MyModel();
            }
            return this.instance;
        }

        public constructor()
        {

        }
    }
}