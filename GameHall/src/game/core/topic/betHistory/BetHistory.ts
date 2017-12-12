module topic {

    export class BetHistory extends BaseResponse {
        public constructor() {
            super();
        }
        public snapshot: BetHistorySnapshot;
    }

    export class BetHistorySnapshot {
        public count: number;
        public total_bet: number;
        public total_payout: number;
        public total_valid_bet: number;
        public list: Array<BetHistoryItem>;
    }

    export class BetHistoryItem {
        public type: string;
        public history: GameHistory;
    }

    export class GameHistory {
        public club_id: number;
        public round_id: string;
        public room_id: string;
        public room_name: string;
        public dealer_name: string;
        public user_id: number;
        public username: string;
        public bet: number;
        public valid_bet: number;
        public round_result: Array<string>;
        public surplus: number;
        public payout: number;
        public bets: Array<{ bet_map: {}; bet_time: number }>;
        public start_bet_time: number;
        public stop_bet_time: number;
        public payout_time: number;
        public payouts: {};
    }

    export class BaccaratHistory extends GameHistory {
        public cards: Array<{ card: number; position: string }>;
        public natural_winner: boolean;
        public score: {
            banker: number;
            player: number;
            tie: boolean;
            banker_pair: boolean;
            player_pair: boolean;
        };
    }

    export class RouletteHistory extends GameHistory {
        public result: number;
    }

    export class DragonTigerHistory extends GameHistory {
        public cards: Array<{ card: number; position: string }>;
        public score: {
            dragon: number;
            tiger: number;
            tie: boolean;
        };
    }

    export class SicboHistory extends GameHistory { }

}