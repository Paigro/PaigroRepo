export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'Boot', active: false });
    }

    init() {

    }

    preload() {
        this.load.spritesheet('player1', './assets/images/twinbee.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player2', './assets/images/winbee.png', { frameWidth: 16, frameHeight: 16 });



        this.load.image('background', './assets/images/background.png');
        this.load.image('backgroundContrast', './assets/images/background_hcontrast.png');
    }

    create() {

    }

    update(time, delta) {

    }
}