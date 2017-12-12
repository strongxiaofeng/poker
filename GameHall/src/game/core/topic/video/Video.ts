module topic {

    export class Video extends BaseResponse {
        public constructor() {
            super();
        }
        public snapshot: VideoSnapshot;
    }

    export class VideoSnapshot {
        public room_name: string;
        public type: string;
        public round_id: string;
        public video: string;
        public history: BetHistoryItem;
    }

}