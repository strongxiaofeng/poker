module topic {

    export class UpdateAccount {

        public action: string;
        public user_id: number;
        public transfer: AccountTransfer

        public constructor() {
            this.transfer = new AccountTransfer();
        }

    }

    export class AccountTransfer {
        public cash: number;
        public attachment: TransferAttachment;
    }

    export class TransferAttachment {
        public type: string;
        public round_id: string;
        public serial_number: string;
    }

}