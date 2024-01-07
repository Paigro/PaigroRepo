export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'Boot', active: true });



    }

    init() {

    }

    preload() {
        // Imagenes:
        this.load.image('stars', './assets/sprites/stars.png');
        this.load.image('background1', './assets/sprites/background.png');
        this.load.image('background2', './assets/sprites/background2.png');
        this.load.image('platform', './assets/sprites/platform.png');
        //console.log(this.textures.exists('stars'));
        // SpriteSheets:
        this.load.spritesheet('clown', './assets/sprites/clown.png', { frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('lion', './assets/sprites/lion.png', { frameWidth: 36, frameHeight: 16 });
        this.load.spritesheet('ring', './assets/sprites/ring.png', { frameWidth: 26, frameHeight: 80 });
        this.load.spritesheet('fire', './assets/sprites/fire.png', { frameWidth: 25, frameHeight: 31 });
        // Musica:
        this.load.audio('failureMusic', './assets/sounds/failure.mp3');
        this.load.audio('finalSound', './assets/sounds/final.wav');
        this.load.audio('jumpSound', './assets/sounds/jump.wav');
        this.load.audio('menuMusic', './assets/sounds/menu.mp3');
        this.load.audio('scoreSound', './assets/sounds/score.wav');
        this.load.audio('stageMusic', './assets/sounds/stage.mp3');

    }

    create() {
        this.scene.start("Menu");
        this.loadAnimations();
    }

    loadAnimations() {

    }
}