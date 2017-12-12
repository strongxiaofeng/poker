module game {

    export class NameEditUI1 extends NameEditBaseUI {

        public constructor(data) {
            super(data);
            this.skinName = "resource/skins/game_skins/mobile/nameEdit/nameEditSkin.exml";
        }

        // ---------------------------------- dispose ----------------------------------

        public dispose(): void {
            super.dispose();
        }

    }

}