export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'Boot', active: false });
    }

    init() {

    }

    preload() {
        this.load.spritesheet('player1', './assets/images/twinbee.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player2', './assets/images/winbee.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('enemy', './assets/images/enemy.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('explosion', './assets/images/explosion.png', { frameWidth: 16, frameHeight: 16 });

        this.load.image('background', './assets/images/background.png');
        this.load.image('backgroundContrast', './assets/images/background_hcontrast.png');
        this.load.image('bullet', './assets/images/bullet.png');
        this.load.image('green', './assets/images/green.png');
    }

    create() {
        this.animations();
    }

    animations() {
        // Anmimaciones del twinbee:
        this.anims.create({
            key: 'twinstraight',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'twinleft',
            frames: this.anims.generateFrameNumbers('player1', { start: 1, end: 1 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'twinright',
            frames: this.anims.generateFrameNumbers('player1', { start: 2, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'twinshoot',
            frames: this.anims.generateFrameNumbers('player1', { start: 3, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        //Animaciones del winbee:
        this.anims.create({
            key: 'winstraight',
            frames: this.anims.generateFrameNumbers('player2', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'winleft',
            frames: this.anims.generateFrameNumbers('player2', { start: 1, end: 1 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'winright',
            frames: this.anims.generateFrameNumbers('player2', { start: 2, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'winshoot',
            frames: this.anims.generateFrameNumbers('player2', { start: 3, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        // Animacion del enemigo:
        this.anims.create({
            key: 'enemyrotation',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        // Animacion de la explosion del enemigo:
        this.anims.create({
            key: 'enemyexplosion',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 2
        });
    }

}