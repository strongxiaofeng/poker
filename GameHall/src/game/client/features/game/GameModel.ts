module game {
	export class GameModel {
		public constructor() {
		}
        private static instance: GameModel;
		public static getInstance(): GameModel
        {
            if (this.instance == null)
            {
                this.instance = new GameModel();
            }
            return this.instance;
        }

        /** 邀请码登陆状态*/
        public static invitationData = null;

        /**服务器时间 */
        private _timestamp: topic.Timestamp;
        /**服务器时间修正值 */
        private _offTime: number;

        public set timestamp(obj: topic.Timestamp)
        {
            this._offTime = egret.getTimer();//更新服务器时的时间
            this._timestamp = obj;
        }
        /**获取当前服务器时间 */
        public get serverTime(): number
        {
            if(this._timestamp)
            {
                return this._timestamp.snapshot.timestamp + egret.getTimer() - this._offTime;
            }
            else
            {
                return new Date().getTime();
            }
        }
	}

}