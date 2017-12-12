// OwnersDeskSnapshot
module topic
{

    export class OwnersBase extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public code: number;
        public isPush: boolean;
        public seq: number;
        public snapshot: OwnersDeskSnapshot;
        public topic: string;
        public topicType: string;
    }

    export class OwnersDeskSnapshot
    {
        public desk_count: number;
        public desks_info: any;
        public player_count: number;
        public timestamp: number;
        public version: number;
    }

    export class StatisticsBase extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public code: number;
        public isPush: boolean;
        public seq: number;
        public snapshot: statisticsSnapshot;
        public topic: string;
        public topicType: string;
    }

    export class statisticsSnapshot
    {
        public statistics: statistics;
    }

    export class statistics
    {
        public statistics_today: { bet: number, payout: number, surplus: number };
        public statistics_round: { bet: number, payout: number, surplus: number };
    }



}