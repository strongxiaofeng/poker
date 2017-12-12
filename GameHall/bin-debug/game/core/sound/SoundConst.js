var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SoundConst = (function () {
        function SoundConst() {
        }
        /**大厅的背景音乐 */
        SoundConst.BgSound_Hall = "resource/music/hall.mp3";
        /**房间内的背景音乐 */
        SoundConst.BgSound_Room = "resource/music/room.mp3";
        SoundConst.Sheet_Baccarat = "baccarat";
        SoundConst.Sheet_Public = "public";
        /**合集名对应的路径 */
        SoundConst.sheetUrl = {
            baccarat: "/Baccarat/baccarat",
            public: "/Public/public"
        };
        /**非多语言的音效的路径 没有使用合集*/
        SoundConst.soundUrl = {
            add_chips: "/sfx/add_chips.mp3",
            btnclick: "/sfx/btnclick.mp3",
            cards_dealing: "/sfx/cards_dealing.mp3",
            clock_bomb: "/sfx/clock_bomb.mp3",
            Coins_Drop: "/sfx/Coins_Drop.mp3",
            enjoy_dealer: "/sfx/enjoy_dealer.mp3",
            main: "/sfx/hall.mp3",
            mimaster_change: "/sfx/mimaster_change.mp3",
            play: "/sfx/room.mp3",
            sweeping_chips: "/sfx/sweeping_chips.mp3",
            time_out_notice: "/sfx/time_out_notice.mp3",
        };
        // ---------------------------------------非多语言的音效名 没有使用合集 --------------------------------
        SoundConst.mainBgm = ["main"];
        SoundConst.gameBgm = ["play"];
        SoundConst.click = ["btnclick"];
        SoundConst.chips = ["sweeping_chips"];
        SoundConst.enjoy_dealer = ["enjoy_dealer"];
        SoundConst.mimaster = ["mimaster_change"];
        SoundConst.cards_dealing = ["cards_dealing"];
        SoundConst.clock_bomb = ["clock_bomb"];
        SoundConst.time_out_notice = ["time_out_notice"];
        // ---------------------------------------多语言的音效和所属合集--------------------------------
        SoundConst.count_down = ["count_down_1", "public"];
        SoundConst.stop_bet = ["end_bet", "public"];
        SoundConst.loss_game = ["loss_game_1", "public"];
        SoundConst.start_bet = ["start_bet_1", "public"];
        SoundConst.welcome = ["welcome_1", "public"];
        SoundConst.winX3 = ["winX3_1", "public"];
        SoundConst.bet_success = ["bet_success", "public"];
        SoundConst.player_0 = ["player_0", "baccarat"];
        SoundConst.player_1 = ["player_1", "baccarat"];
        SoundConst.player_2 = ["player_2", "baccarat"];
        SoundConst.player_3 = ["player_3", "baccarat"];
        SoundConst.player_4 = ["player_4", "baccarat"];
        SoundConst.player_5 = ["player_5", "baccarat"];
        SoundConst.player_6 = ["player_6", "baccarat"];
        SoundConst.player_7 = ["player_7", "baccarat"];
        SoundConst.player_8 = ["player_8", "baccarat"];
        SoundConst.player_9 = ["player_9", "baccarat"];
        SoundConst.banker_0 = ["banker_0", "baccarat"];
        SoundConst.banker_1 = ["banker_1", "baccarat"];
        SoundConst.banker_2 = ["banker_2", "baccarat"];
        SoundConst.banker_3 = ["banker_3", "baccarat"];
        SoundConst.banker_4 = ["banker_4", "baccarat"];
        SoundConst.banker_5 = ["banker_5", "baccarat"];
        SoundConst.banker_6 = ["banker_6", "baccarat"];
        SoundConst.banker_7 = ["banker_7", "baccarat"];
        SoundConst.banker_8 = ["banker_8", "baccarat"];
        SoundConst.banker_9 = ["banker_9", "baccarat"];
        SoundConst.baccarat_bwin = ["bwin", "baccarat"];
        SoundConst.baccarat_pwin = ["pwin", "baccarat"];
        SoundConst.baccarat_tie_game = ["tie_game", "baccarat"];
        SoundConst.baccarat_tie_bpair = ["tie_bpair", "baccarat"];
        SoundConst.baccarat_tie_ppair = ["tie_ppair", "baccarat"];
        SoundConst.baccarat_bwin_bpair = ["bwin_bpair", "baccarat"];
        SoundConst.baccarat_bwin_ppair = ["bwin_ppair", "baccarat"];
        SoundConst.baccarat_pwin_bpair = ["pwin_bpair", "baccarat"];
        SoundConst.baccarat_pwin_ppair = ["pwin_ppair", "baccarat"];
        SoundConst.baccarat_welcome = ["welcome", "baccarat"];
        SoundConst.baccarat_banker_drawcard = ["banker_drawcard", "baccarat"];
        SoundConst.baccarat_player_drawcard = ["player_drawcard", "baccarat"];
        SoundConst.baccarat_tie_bpair_ppair = ["tie_bpair_ppair", "baccarat"];
        SoundConst.baccarat_bwin_bpair_ppair = ["bwin_bpair_ppair", "baccarat"];
        SoundConst.baccarat_pwin_bpair_ppair = ["pwin_bpair_ppair", "baccarat"];
        SoundConst.tiger1 = ["tiger1", "dragon"];
        SoundConst.tiger2 = ["tiger2", "dragon"];
        SoundConst.tiger3 = ["tiger3", "dragon"];
        SoundConst.tiger4 = ["tiger4", "dragon"];
        SoundConst.tiger5 = ["tiger5", "dragon"];
        SoundConst.tiger6 = ["tiger6", "dragon"];
        SoundConst.tiger7 = ["tiger7", "dragon"];
        SoundConst.tiger8 = ["tiger8", "dragon"];
        SoundConst.tiger9 = ["tiger9", "dragon"];
        SoundConst.tiger10 = ["tiger10", "dragon"];
        SoundConst.tiger11 = ["tiger11", "dragon"];
        SoundConst.tiger12 = ["tiger12", "dragon"];
        SoundConst.tiger13 = ["tiger13", "dragon"];
        SoundConst.dragon1 = ["dragon1", "dragon"];
        SoundConst.dragon2 = ["dragon2", "dragon"];
        SoundConst.dragon3 = ["dragon3", "dragon"];
        SoundConst.dragon4 = ["dragon4", "dragon"];
        SoundConst.dragon5 = ["dragon5", "dragon"];
        SoundConst.dragon6 = ["dragon6", "dragon"];
        SoundConst.dragon7 = ["dragon7", "dragon"];
        SoundConst.dragon8 = ["dragon8", "dragon"];
        SoundConst.dragon9 = ["dragon9", "dragon"];
        SoundConst.dragon10 = ["dragon10", "dragon"];
        SoundConst.dragon11 = ["dragon11", "dragon"];
        SoundConst.dragon12 = ["dragon12", "dragon"];
        SoundConst.dragon13 = ["dragon13", "dragon"];
        SoundConst.dragon_dragonx3 = ["dragonx3", "dragon"];
        SoundConst.dragon_dwin = ["dwin", "dragon"];
        SoundConst.dragon_tie_game = ["tie_game", "dragon"];
        SoundConst.dragon_tiex2 = ["tiex2", "dragon"];
        SoundConst.dragon_tigerx3 = ["tigerx3", "dragon"];
        SoundConst.dragon_twin = ["twin", "dragon"];
        SoundConst.dragon_welcome = ["welcome", "dragon"];
        SoundConst.win0 = ["0win", "roulette"];
        SoundConst.win1 = ["1win", "roulette"];
        SoundConst.win2 = ["2win", "roulette"];
        SoundConst.win3 = ["3win", "roulette"];
        SoundConst.win4 = ["4win", "roulette"];
        SoundConst.win5 = ["5win", "roulette"];
        SoundConst.win6 = ["6win", "roulette"];
        SoundConst.win7 = ["7win", "roulette"];
        SoundConst.win8 = ["8win", "roulette"];
        SoundConst.win9 = ["9win", "roulette"];
        SoundConst.win10 = ["10win", "roulette"];
        SoundConst.win11 = ["11win", "roulette"];
        SoundConst.win12 = ["12win", "roulette"];
        SoundConst.win13 = ["13win", "roulette"];
        SoundConst.win14 = ["14win", "roulette"];
        SoundConst.win15 = ["15win", "roulette"];
        SoundConst.win16 = ["16win", "roulette"];
        SoundConst.win17 = ["17win", "roulette"];
        SoundConst.win18 = ["18win", "roulette"];
        SoundConst.win19 = ["19win", "roulette"];
        SoundConst.win20 = ["20win", "roulette"];
        SoundConst.win21 = ["21win", "roulette"];
        SoundConst.win22 = ["22win", "roulette"];
        SoundConst.win23 = ["23win", "roulette"];
        SoundConst.win24 = ["24win", "roulette"];
        SoundConst.win25 = ["25win", "roulette"];
        SoundConst.win26 = ["26win", "roulette"];
        SoundConst.win27 = ["27win", "roulette"];
        SoundConst.win28 = ["28win", "roulette"];
        SoundConst.win29 = ["29win", "roulette"];
        SoundConst.win30 = ["30win", "roulette"];
        SoundConst.win31 = ["31win", "roulette"];
        SoundConst.win32 = ["32win", "roulette"];
        SoundConst.win33 = ["33win", "roulette"];
        SoundConst.win34 = ["34win", "roulette"];
        SoundConst.win35 = ["35win", "roulette"];
        SoundConst.win36 = ["36win", "roulette"];
        SoundConst.roulette_bigX3 = ["bigX3", "roulette"];
        SoundConst.roulette_blackX3 = ["blackX3", "roulette"];
        SoundConst.roulette_evenX3 = ["evenX3", "roulette"];
        SoundConst.roulette_oddX3 = ["oddX3", "roulette"];
        SoundConst.roulette_redX3 = ["redX3", "roulette"];
        SoundConst.roulette_sameX2 = ["sameX2", "roulette"];
        SoundConst.roulette_smallX3 = ["smallX3", "roulette"];
        SoundConst.roulette_welcome = ["welcome", "roulette"];
        SoundConst.sicbo_big_1 = ["big_1", "sicbo"];
        SoundConst.sicbo_big_2 = ["big_2", "sicbo"];
        SoundConst.sicbo_big_3 = ["big_3", "sicbo"];
        SoundConst.sicbo_big_4 = ["big_4", "sicbo"];
        SoundConst.sicbo_big_5 = ["big_5", "sicbo"];
        SoundConst.sicbo_big_6 = ["big_6", "sicbo"];
        SoundConst.sicbo_big_7 = ["big_7", "sicbo"];
        SoundConst.sicbo_big_8 = ["big_8", "sicbo"];
        SoundConst.sicbo_big_9 = ["big_9", "sicbo"];
        SoundConst.sicbo_big_10 = ["big_10", "sicbo"];
        SoundConst.sicbo_big_11 = ["big_11", "sicbo"];
        SoundConst.sicbo_big_12 = ["big_12", "sicbo"];
        SoundConst.sicbo_big_13 = ["big_13", "sicbo"];
        SoundConst.sicbo_big_14 = ["big_14", "sicbo"];
        SoundConst.sicbo_big_15 = ["big_15", "sicbo"];
        SoundConst.sicbo_big_16 = ["big_16", "sicbo"];
        SoundConst.sicbo_big_17 = ["big_17", "sicbo"];
        SoundConst.sicbo_big_18 = ["big_18", "sicbo"];
        SoundConst.sicbo_big_19 = ["big_19", "sicbo"];
        SoundConst.sicbo_big_20 = ["big_20", "sicbo"];
        SoundConst.sicbo_big_21 = ["big_21", "sicbo"];
        SoundConst.sicbo_big_22 = ["big_22", "sicbo"];
        SoundConst.sicbo_big_23 = ["big_23", "sicbo"];
        SoundConst.sicbo_big_24 = ["big_24", "sicbo"];
        SoundConst.sicbo_big_25 = ["big_25", "sicbo"];
        SoundConst.sicbo_bigbet = ["bigbet", "sicbo"];
        SoundConst.sicbo_small_1 = ["small_1", "sicbo"];
        SoundConst.sicbo_small_2 = ["small_2", "sicbo"];
        SoundConst.sicbo_small_3 = ["small_3", "sicbo"];
        SoundConst.sicbo_small_4 = ["small_4", "sicbo"];
        SoundConst.sicbo_small_5 = ["small_5", "sicbo"];
        SoundConst.sicbo_small_6 = ["small_6", "sicbo"];
        SoundConst.sicbo_small_7 = ["small_7", "sicbo"];
        SoundConst.sicbo_small_8 = ["small_8", "sicbo"];
        SoundConst.sicbo_small_9 = ["small_9", "sicbo"];
        SoundConst.sicbo_small_10 = ["small_10", "sicbo"];
        SoundConst.sicbo_small_11 = ["small_11", "sicbo"];
        SoundConst.sicbo_small_12 = ["small_12", "sicbo"];
        SoundConst.sicbo_small_13 = ["small_13", "sicbo"];
        SoundConst.sicbo_small_14 = ["small_14", "sicbo"];
        SoundConst.sicbo_small_15 = ["small_15", "sicbo"];
        SoundConst.sicbo_small_16 = ["small_16", "sicbo"];
        SoundConst.sicbo_small_17 = ["small_17", "sicbo"];
        SoundConst.sicbo_small_18 = ["small_18", "sicbo"];
        SoundConst.sicbo_small_19 = ["small_19", "sicbo"];
        SoundConst.sicbo_small_20 = ["small_20", "sicbo"];
        SoundConst.sicbo_small_21 = ["small_21", "sicbo"];
        SoundConst.sicbo_small_22 = ["small_22", "sicbo"];
        SoundConst.sicbo_small_23 = ["small_23", "sicbo"];
        SoundConst.sicbo_small_24 = ["small_24", "sicbo"];
        SoundConst.sicbo_small_25 = ["small_25", "sicbo"];
        SoundConst.sicbo_triple1 = ["triple1", "sicbo"];
        SoundConst.sicbo_triple2 = ["triple2", "sicbo"];
        SoundConst.sicbo_triple3 = ["triple3", "sicbo"];
        SoundConst.sicbo_triple4 = ["triple4", "sicbo"];
        SoundConst.sicbo_triple5 = ["triple5", "sicbo"];
        SoundConst.sicbo_triple6 = ["triple6", "sicbo"];
        SoundConst.sicbo_triplebet = ["triplebet", "sicbo"];
        SoundConst.sicbo_triples = ["triples", "sicbo"];
        SoundConst.sicbo_welcome = ["welcome", "sicbo"];
        SoundConst.sicbo_big3 = ["asktheway_1", "sicbo"];
        SoundConst.sicbo_small3 = ["asktheway_2", "sicbo"];
        SoundConst.sicbo_odd3 = ["asktheway_3", "sicbo"];
        SoundConst.sicbo_even3 = ["asktheway_4", "sicbo"];
        return SoundConst;
    }());
    game.SoundConst = SoundConst;
    __reflect(SoundConst.prototype, "game.SoundConst");
})(game || (game = {}));
//# sourceMappingURL=SoundConst.js.map