module game{
    export class PersonalInformationUI1 extends PersonalInformationBaseUI{
        public constructor() {
            super();
            this.skinName = "resource/skins/game_skins/mobile/my/personalCenterSkin.exml";
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }
    }
}