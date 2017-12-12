module topic {

    export class UpdateRooms {

        public action: string;
        public create: any;

        public constructor() {
            this.action = "create";
            this.create = new UpdateRoomsCreate();
        }

    }

    export class UpdateRoomsCreate {
        public type: string;
        public source: string;
        public room_name: string;
        public room_permission: string; // "public"
        public room_password: string;
        public preference: RoomPreference;
    }
    export class UpdateRoomsCreateNormal {
        public type: string;
        public source: string;
        public room_name: string;
        public room_permission: string; // "public"
        public preference: RoomPreference;
    }

    export class RoomPreference {
        public chips: Array<number>;
        public limit: RoomLimit;
        public is_no_commission: boolean;
    }

    export class RoomLimit {
        public max: any | BaccratRoomLimit;
        public min: any | BaccratRoomLimit;
    }

    export class BaccratRoomLimit {
        public banker: number;
        public player: number;
        public tie: number;
        public banker_pair: number;
        public player_pair: number;
    }

}