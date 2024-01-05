export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'Boot', active: false });
    }

    init() {

    }

    preload() {
        // Imagenes:
        this.load.image('stars', './assets/sprites/stars.png');
        console.log(this.textures.exists('stars'));
        // SpriteSheets:

        // Musica:
        this.load.audio('menuMusic', './assets/sounds/menu.mp3');
    }

    create() {

    }
}