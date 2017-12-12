module game {
	export class ClubHomeController extends BaseController{
		private static instance:ClubHomeController;
        public static getInstance(): ClubHomeController{
            if(this.instance == null) {
                this.instance = new ClubHomeController();
            }
            return this.instance;
        } 

        public constructor()
        {
            super();
        }
        public initDtoListener(): void
        {
        }
	}
}