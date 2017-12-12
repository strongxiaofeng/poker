module game {
	export class AnnounceListData {
		public count: number;
		public announcements: Array<AnnounceItem>;
	}

	export class AnnounceItem{
		public id: number;
		public title: string;
		public publish_time: number;
		public pop_up: boolean;
		public club_id:number;;
		public club_name:string;;
		public club_img:string;
		public is_read: boolean;
	}
	export class AnnounceItemDetail{
		public id: number;
		public title: string;
		public content: string;
		public publish_time: number;
		public pop_up: boolean;
	}
	export class AnnounceLastData
	{
		public announcement:AnnounceItemDetail;
		public is_read:boolean;
	}
}