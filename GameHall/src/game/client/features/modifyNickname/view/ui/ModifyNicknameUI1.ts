module game{
    export class ModifyNicknameUI1 extends ModifyNicknameBaseUI{
        public constructor() {
            super();
            this.skinName = "resource/skins/game_skins/mobile/my/modifyNickname.exml";
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }
    }
}