module topic {

    export class Account extends BaseResponse {
        public constructor() {
            super();
        }
        public snapshot: AccountSnapshot;
    }

    export class AccountSnapshot {
        public timestamp: number;
        public version: number;
        public balance: number;
        public transfer_type: string; // "bet/payout/recharge/rollback"
    }

}