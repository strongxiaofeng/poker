module topic {

    export class SystemNotify extends BaseResponse {
        public constructor() {
            super();
        }

        public snapshot: SystemNotifySnapshot;

        public timestamp: number;
    }

    export class SystemNotifySnapshot {
        public type: string;
        public time: number;
        public duplicate_login: { platform: string };
        public club_locked: { club_id: number };
    }
    
}