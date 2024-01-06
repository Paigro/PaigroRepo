export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'Boot', active: true });
    }

    preload() {
        // Tilemap:
        this.load.tilemapTiledJSON('room', './assets/map/room.json');
        this.load.tilemapTiledJSON('map', './assets/map/tilemap.json');
        this.load.image('tileset', './assets/sprites/tileset.png');
        // Imagenes:
        this.load.image('spaceship', './assets/sprites/spaceship.png');
        this.load.image('fuel', './assets/sprites/fuel.png');
        //console.log(this.textures.exists());
        // SpriteSheets:
        this.load.spritesheet('explosion', './assets/sprites/explosion.png', { frameWidth: 24, frameHeight: 17 });
        this.load.spritesheet('player', './assets/sprites/jetpac.png', { frameWidth: 17, frameHeight: 24 });
        this.load.spritesheet('meteor', './assets/sprites/meteor.png', { frameWidth: 16, frameHeight: 14 });
        // Musica:
        this.load.audio('dropSound', './assets/sounds/drop.wav');
        this.load.audio('explosionSound', './assets/sounds/explosion.wav');
        this.load.audio('loseSound', './assets/sounds/lose.wav');
        this.load.audio('pickSound', './assets/sounds/pick.wav');
        this.load.audio('winSound', './assets/sounds/win.wav');
    }


    create() {
        this.scene.start("Menu");
        this.loadAnimations();
    }

    loadAnimations() {
        this.anims.create({
            key: 'playerIdle',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'playerWalk',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'playerFlight',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'meteor',
            frames: this.anims.generateFrameNumbers('meteor', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: 0
        });
    }
}