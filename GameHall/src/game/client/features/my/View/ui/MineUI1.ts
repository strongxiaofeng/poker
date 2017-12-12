module game{
    export class MineUI1 extends MineBaseUI{
        public constructor() {
            super();
            this.skinName = "resource/skins/game_skins/mobile/my/mineSkin.exml";
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }
    }
}