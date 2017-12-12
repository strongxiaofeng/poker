module topic {

    export class UpdateSources {

        public action: string;
        public create: UpdateSourcesCreate;

        public constructor() {
            this.action = "create";
            this.create = new UpdateSourcesCreate();
        }

    }

    export class UpdateSourcesCreate {
        public type: string;
        public group: string;
        public preference: SourcePreference;
    }

    export class SourcePreference {
        public video: string;
        public video_for_dealer: string;
        public status_time: StatusTime;
    }

    export class StatusTime {
        public bet_time: number;
        public payout_time: number;
        public open_round_time: number;
        public mi_time: number;
        public mi_time_next: number;
    }

}