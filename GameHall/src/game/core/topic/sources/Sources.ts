module topic {

    export class Sources extends BaseResponse {
        public constructor() {
            super();
        }
        public snapshot: SourcesSnapshot;
    }

    export class SourcesSnapshot {
        public version: number;
        // {
        //     "B1": {
        //             "type": "baccarat",
        //             "source_topic": "baccarat_source/B1",
        //             "road_map_topic": "/road_map/B1",
        //             "group": "group 1"
        //         }
        // }
        public sources: any;
    }

    export class RoomSources {
        public type: string;
        public source_topic: string;
        public road_map_topic: string;
        public group: string;
    }

}