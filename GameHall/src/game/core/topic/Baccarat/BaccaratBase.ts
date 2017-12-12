module topic
{

    export class BaccaratBase extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public snapshot: any;
    }

    export class BaccSnapshot extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public timestamp: number;
        public version: number;
        //   {
        //     "timestamp": 1,
        //         "version": 1,
        //             "topics": {
        //         "desk": "/baccarat_desk/club_id/B1_1/desk_id_xxx"
        //     }
        // }
        public topics: any;
    }

    export class baccarat
    {
        public type: string; // "baccarat"
        public source_topic: string; // "baccarat_source_player/B1"
        public setting_topic: string; // "baccarat_setting/club_id/CB1_1000"
        public base_topic: string; // "baccarat_base/club_id/CB1_1000"
        public road_map_topic: string; // "/road_map/B1"
    }

    export class BaccInfoBase extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public topic: string;
        public topicType: string;
        public isPush: boolean;
        public snapshot: any;
    }

    export class BaccSettingBase extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public chips: Array<number>;
        public is_no_commission: boolean;
        public limit: { max: BaccratRoomLimit, min: BaccratRoomLimit };
        public room_name: string;
        public room_password: string;
        public room_permission: string;
        public status: string;
        public create_time: number;

    }

    export class BaccDeskBase extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public snapshot: BaccDeskSnapshot;
    }

    export class BaccDeskSnapshot
    {
        public bet: { 1: BaccPlayersbase, 2: BaccPlayersbase, 3: BaccPlayersbase, 5: BaccPlayersbase, 6: BaccPlayersbase, 7: BaccPlayersbase, 8: BaccPlayersbase };
        public bet_statistics: { banker: { amount: number, users: number }, banker_pair: { amount: number, users: number }, player: { amount: number, users: number }, player_pair: { amount: number, users: number }, tie: { amount: number, users: number } };
        public desk: { 1: { balance: number, nick: string, type: string, user_id: string }, 2: { any }, 3: { any }, 5: { any }, 6: { any }, 7: { any }, 8: { any } };
        public natural_winner: boolean;
        public payout: { 1: BaccPlayersbase, 2: BaccPlayersbase, 3: BaccPlayersbase, 5: BaccPlayersbase, 6: BaccPlayersbase, 7: BaccPlayersbase, 8: BaccPlayersbase };
        public seat_number: number;
        public stage: string;
        public timestamp: number;
        public version: number;
    }

    export class BaccPlayersbase
    {
        public banker: number;
        public banker_pair: number;
        public player: number;
        public player_pair: number;
        public tie: number;

    }



    export class BaccSourcePlayerBase extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public snapshot: BaccSourcePlayerSnapshot;
    }

    export class BaccSourcePlayerSnapshot extends BaseResponse
    {
        public cards: {};
        public cards_order: Array<string>;
        public dealer_name: string;
        public round_id: string;
        public round_statistics: { banker: number, player: number, rounds: number, tie: number };
        public score: Baccarat_score;
        public stage: string;
        public status_time: { bet_time: number, mi_time: number, mi_time_next: number, open_round_time: number, payout_time: number };
        public timestamp: number;
        public version: number;
        public video: string;
        public stop_bet_ts: number;
    }

    export class Baccarat_score
    {
        public banker: number;
        public player: number;
        public banker_pair: boolean;
        public player_pair: boolean;
        public tie: boolean
    }



    export class BaccRoadMapBase extends BaseResponse
    {
        public constructor()
        {
            super();
        }
        public snapshot: { list: [{ banker_peek: { bead_road, big_road }, bead_road, big_eye_road, big_road, cockroach_road, player_peek: { bead_road, big_road }, small_road }] };
    }
}