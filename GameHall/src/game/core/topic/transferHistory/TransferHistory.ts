module topic {

    export class TransferHistory extends BaseResponse {
        public constructor() {
            super();
        }
        public snapshot: TransferHistorySnapshot;
    }

    export class TransferHistorySnapshot {
        public count: number;
        public total_transfer: number;
        public total_balance: number;
        public list: Array<TransferHistoryItem>;
    }

    export class TransferHistoryItem {
        public user_id: number;
        public username: string;
        public round_id: string;
        /** bet | payout | reward_dealer | recharge | rollback */
        public transfer_type: string;
        public serial_number: string;
        public balance: number;
        public balance_after: number;
        public time: number;
    }

}