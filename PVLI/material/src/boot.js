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
        //this.load.audio('', '');
    }

    create() {
        this.scene.start("Menu");
        this.loadAnimations();
    }

    loadAnimations(){

    }
}