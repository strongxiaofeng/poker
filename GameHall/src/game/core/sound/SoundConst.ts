module game
{
	export class SoundConst
	{
		/**大厅的背景音乐 */
		public static BgSound_Hall:string = "resource/music/hall.mp3";
		/**房间内的背景音乐 */
		public static BgSound_Room:string = "resource/music/room.mp3";
		
    	
		public static Sheet_Baccarat:string = "baccarat";
		public static Sheet_Public:string = "public";

		/**合集名对应的路径 */
		public static sheetUrl = {
			baccarat:"/Baccarat/baccarat",
			public:"/Public/public"
		}
		
		/**非多语言的音效的路径 没有使用合集*/
		public static soundUrl = {
			add_chips:"/sfx/add_chips.mp3",
			btnclick:"/sfx/btnclick.mp3",
			cards_dealing:"/sfx/cards_dealing.mp3",
			clock_bomb:"/sfx/clock_bomb.mp3",
			Coins_Drop:"/sfx/Coins_Drop.mp3",
			enjoy_dealer:"/sfx/enjoy_dealer.mp3",
			main:"/sfx/hall.mp3",
			mimaster_change:"/sfx/mimaster_change.mp3",
			play:"/sfx/room.mp3",
			sweeping_chips:"/sfx/sweeping_chips.mp3",
			time_out_notice:"/sfx/time_out_notice.mp3",
		}

		// ---------------------------------------非多语言的音效名 没有使用合集 --------------------------------

        public static mainBgm = ["main"];
        public static gameBgm = ["play"];
        public static click = ["btnclick"];
        public static chips = ["sweeping_chips"];
        public static enjoy_dealer = ["enjoy_dealer"];
        public static mimaster = ["mimaster_change"];
        public static cards_dealing = ["cards_dealing"];
        public static clock_bomb = ["clock_bomb"];
        public static time_out_notice = ["time_out_notice"];
		

    	// ---------------------------------------多语言的音效和所属合集--------------------------------
        
        public static count_down = ["count_down_1", "public"];
        public static stop_bet = ["end_bet", "public"];
        public static loss_game = ["loss_game_1", "public"];
        public static start_bet = ["start_bet_1", "public"];
        public static welcome = ["welcome_1", "public"];
        public static winX3 = ["winX3_1", "public"];
        public static bet_success = ["bet_success", "public"];

        public static player_0 = ["player_0", "baccarat"];
        public static player_1 = ["player_1", "baccarat"];
        public static player_2 = ["player_2", "baccarat"];
        public static player_3 = ["player_3", "baccarat"];
        public static player_4 = ["player_4", "baccarat"];
        public static player_5 = ["player_5", "baccarat"];
        public static player_6 = ["player_6", "baccarat"];
        public static player_7 = ["player_7", "baccarat"];
        public static player_8 = ["player_8", "baccarat"];
        public static player_9 = ["player_9", "baccarat"];
        public static banker_0 = ["banker_0", "baccarat"];
        public static banker_1 = ["banker_1", "baccarat"];
        public static banker_2 = ["banker_2", "baccarat"];
        public static banker_3 = ["banker_3", "baccarat"];
        public static banker_4 = ["banker_4", "baccarat"];
        public static banker_5 = ["banker_5", "baccarat"];
        public static banker_6 = ["banker_6", "baccarat"];
        public static banker_7 = ["banker_7", "baccarat"];
        public static banker_8 = ["banker_8", "baccarat"];
        public static banker_9 = ["banker_9", "baccarat"];
        public static baccarat_bwin = ["bwin", "baccarat"];
        public static baccarat_pwin = ["pwin", "baccarat"];
        public static baccarat_tie_game = ["tie_game", "baccarat"];
        public static baccarat_tie_bpair = ["tie_bpair", "baccarat"];
        public static baccarat_tie_ppair = ["tie_ppair", "baccarat"];
        public static baccarat_bwin_bpair = ["bwin_bpair", "baccarat"];
        public static baccarat_bwin_ppair = ["bwin_ppair", "baccarat"];
        public static baccarat_pwin_bpair = ["pwin_bpair", "baccarat"];
        public static baccarat_pwin_ppair = ["pwin_ppair", "baccarat"];
        public static baccarat_welcome = ["welcome", "baccarat"];
        public static baccarat_banker_drawcard = ["banker_drawcard", "baccarat"];
        public static baccarat_player_drawcard = ["player_drawcard", "baccarat"];
        public static baccarat_tie_bpair_ppair = ["tie_bpair_ppair", "baccarat"];
        public static baccarat_bwin_bpair_ppair = ["bwin_bpair_ppair", "baccarat"];
        public static baccarat_pwin_bpair_ppair = ["pwin_bpair_ppair", "baccarat"];

        public static tiger1 = ["tiger1", "dragon"];
        public static tiger2 = ["tiger2", "dragon"];
        public static tiger3 = ["tiger3", "dragon"];
        public static tiger4 = ["tiger4", "dragon"];
        public static tiger5 = ["tiger5", "dragon"];
        public static tiger6 = ["tiger6", "dragon"];
        public static tiger7 = ["tiger7", "dragon"];
        public static tiger8 = ["tiger8", "dragon"];
        public static tiger9 = ["tiger9", "dragon"];
        public static tiger10 = ["tiger10", "dragon"];
        public static tiger11 = ["tiger11", "dragon"];
        public static tiger12 = ["tiger12", "dragon"];
        public static tiger13 = ["tiger13", "dragon"];
        public static dragon1 = ["dragon1", "dragon"];
        public static dragon2 = ["dragon2", "dragon"];
        public static dragon3 = ["dragon3", "dragon"];
        public static dragon4 = ["dragon4", "dragon"];
        public static dragon5 = ["dragon5", "dragon"];
        public static dragon6 = ["dragon6", "dragon"];
        public static dragon7 = ["dragon7", "dragon"];
        public static dragon8 = ["dragon8", "dragon"];
        public static dragon9 = ["dragon9", "dragon"];
        public static dragon10 = ["dragon10", "dragon"];
        public static dragon11 = ["dragon11", "dragon"];
        public static dragon12 = ["dragon12", "dragon"];
        public static dragon13 = ["dragon13", "dragon"];
        public static dragon_dragonx3 = ["dragonx3", "dragon"];
        public static dragon_dwin = ["dwin", "dragon"];
        public static dragon_tie_game = ["tie_game", "dragon"];
        public static dragon_tiex2 = ["tiex2", "dragon"];
        public static dragon_tigerx3 = ["tigerx3", "dragon"];
        public static dragon_twin = ["twin", "dragon"];
        public static dragon_welcome = ["welcome", "dragon"];


        public static win0 =  ["0win", "roulette"];
        public static win1 =  ["1win", "roulette"];
        public static win2 =  ["2win", "roulette"];
        public static win3 =  ["3win", "roulette"];
        public static win4 =  ["4win", "roulette"];
        public static win5 =  ["5win", "roulette"];
        public static win6 =  ["6win", "roulette"];
        public static win7 =  ["7win", "roulette"];
        public static win8 =  ["8win", "roulette"];
        public static win9 =  ["9win", "roulette"];
        public static win10 = ["10win", "roulette"];
        public static win11 = ["11win", "roulette"];
        public static win12 = ["12win", "roulette"];
        public static win13 = ["13win", "roulette"];
        public static win14 = ["14win", "roulette"];
        public static win15 = ["15win", "roulette"];
        public static win16 = ["16win", "roulette"];
        public static win17 = ["17win", "roulette"];
        public static win18 = ["18win", "roulette"];
        public static win19 = ["19win", "roulette"];
        public static win20 = ["20win", "roulette"];
        public static win21 = ["21win", "roulette"];
        public static win22 = ["22win", "roulette"];
        public static win23 = ["23win", "roulette"];
        public static win24 = ["24win", "roulette"];
        public static win25 = ["25win", "roulette"];
        public static win26 = ["26win", "roulette"];
        public static win27 = ["27win", "roulette"];
        public static win28 = ["28win", "roulette"];
        public static win29 = ["29win", "roulette"];
        public static win30 = ["30win", "roulette"];
        public static win31 = ["31win", "roulette"];
        public static win32 = ["32win", "roulette"];
        public static win33 = ["33win", "roulette"];
        public static win34 = ["34win", "roulette"];
        public static win35 = ["35win", "roulette"];
        public static win36 = ["36win", "roulette"];
        public static roulette_bigX3 = ["bigX3", "roulette"];
        public static roulette_blackX3 = ["blackX3", "roulette"];
        public static roulette_evenX3 = ["evenX3", "roulette"];
        public static roulette_oddX3 = ["oddX3", "roulette"];
        public static roulette_redX3 = ["redX3", "roulette"];
        public static roulette_sameX2 = ["sameX2", "roulette"];
        public static roulette_smallX3 = ["smallX3", "roulette"];
        public static roulette_welcome = ["welcome", "roulette"];

        public static sicbo_big_1 = ["big_1", "sicbo"];
        public static sicbo_big_2 = ["big_2", "sicbo"];
        public static sicbo_big_3 = ["big_3", "sicbo"];
        public static sicbo_big_4 = ["big_4", "sicbo"];
        public static sicbo_big_5 = ["big_5", "sicbo"];
        public static sicbo_big_6 = ["big_6", "sicbo"];
        public static sicbo_big_7 = ["big_7", "sicbo"];
        public static sicbo_big_8 = ["big_8", "sicbo"];
        public static sicbo_big_9 = ["big_9", "sicbo"];
        public static sicbo_big_10 = ["big_10", "sicbo"];
        public static sicbo_big_11 = ["big_11", "sicbo"];
        public static sicbo_big_12 = ["big_12", "sicbo"];
        public static sicbo_big_13 = ["big_13", "sicbo"];
        public static sicbo_big_14 = ["big_14", "sicbo"];
        public static sicbo_big_15 = ["big_15", "sicbo"];
        public static sicbo_big_16 = ["big_16", "sicbo"];
        public static sicbo_big_17 = ["big_17", "sicbo"];
        public static sicbo_big_18 = ["big_18", "sicbo"];
        public static sicbo_big_19 = ["big_19", "sicbo"];
        public static sicbo_big_20 = ["big_20", "sicbo"];
        public static sicbo_big_21 = ["big_21", "sicbo"];
        public static sicbo_big_22 = ["big_22", "sicbo"];
        public static sicbo_big_23 = ["big_23", "sicbo"];
        public static sicbo_big_24 = ["big_24", "sicbo"];
        public static sicbo_big_25 = ["big_25", "sicbo"];
        public static sicbo_bigbet   = ["bigbet", "sicbo"];
        public static sicbo_small_1  = ["small_1", "sicbo"];
        public static sicbo_small_2  = ["small_2", "sicbo"];
        public static sicbo_small_3  = ["small_3", "sicbo"];
        public static sicbo_small_4  = ["small_4", "sicbo"];
        public static sicbo_small_5  = ["small_5", "sicbo"];
        public static sicbo_small_6  = ["small_6", "sicbo"];
        public static sicbo_small_7  = ["small_7", "sicbo"];
        public static sicbo_small_8  = ["small_8", "sicbo"];
        public static sicbo_small_9  = ["small_9", "sicbo"];
        public static sicbo_small_10 = ["small_10", "sicbo"];
        public static sicbo_small_11 = ["small_11", "sicbo"];
        public static sicbo_small_12 = ["small_12", "sicbo"];
        public static sicbo_small_13 = ["small_13", "sicbo"];
        public static sicbo_small_14 = ["small_14", "sicbo"];
        public static sicbo_small_15 = ["small_15", "sicbo"];
        public static sicbo_small_16 = ["small_16", "sicbo"];
        public static sicbo_small_17 = ["small_17", "sicbo"];
        public static sicbo_small_18 = ["small_18", "sicbo"];
        public static sicbo_small_19 = ["small_19", "sicbo"];
        public static sicbo_small_20 = ["small_20", "sicbo"];
        public static sicbo_small_21 = ["small_21", "sicbo"];
        public static sicbo_small_22 = ["small_22", "sicbo"];
        public static sicbo_small_23 = ["small_23", "sicbo"];
        public static sicbo_small_24 = ["small_24", "sicbo"];
        public static sicbo_small_25 = ["small_25", "sicbo"];
        public static sicbo_triple1  = ["triple1", "sicbo"];
        public static sicbo_triple2  = ["triple2", "sicbo"];
        public static sicbo_triple3  = ["triple3", "sicbo"];
        public static sicbo_triple4  = ["triple4", "sicbo"];
        public static sicbo_triple5  = ["triple5", "sicbo"];
        public static sicbo_triple6  = ["triple6", "sicbo"];
        public static sicbo_triplebet= ["triplebet", "sicbo"];
        public static sicbo_triples  = ["triples", "sicbo"];
        public static sicbo_welcome = ["welcome", "sicbo"];
        public static sicbo_big3 = ["asktheway_1", "sicbo"];
        public static sicbo_small3 = ["asktheway_2", "sicbo"];
        public static sicbo_odd3 = ["asktheway_3", "sicbo"];
        public static sicbo_even3 = ["asktheway_4", "sicbo"];
	}
}