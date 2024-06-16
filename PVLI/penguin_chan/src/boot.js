export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'Boot', active: true });
    }

    init() {

    }

    preload() {
        // Imagenes:
        this.load.image('background', './assets/background.png');
        this.load.image('ball', './assets/ball16.png');
        this.load.image('table', './assets/table.png');
        this.load.image('score', './assets/score.png');


        this.load.spritesheet('rat', './assets/rat32.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('penguin', './assets/penguin40.png', { frameWidth: 40, frameHeight: 40 });

        /*// Musica:
        this.load.audio('failureMusic', './assets/sounds/failure.mp3');
        this.load.audio('finalSound', './assets/sounds/final.wav');
        this.load.audio('jumpSound', './assets/sounds/jump.wav');
        this.load.audio('menuMusic', './assets/sounds/menu.mp3');
        this.load.audio('scoreSound', './assets/sounds/score.wav');
        this.load.audio('stageMusic', './assets/sounds/stage.mp3');*/

    }

    create() {
        this.loadAnimations();
        this.scene.start('MenuP');
        console.log("buenos dias1");
    }

    loadAnimations() {
        this.anims.create({
            key: 'penguinIdleAlone',
            frames: this.anims.generateFrameNumbers('penguin', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'ratIdleAlone',
            frames: this.anims.generateFrameNumbers('rat', { start: 5, end: 5 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinIdleBall',
            frames: this.anims.generateFrameNumbers('penguin', { start: 5, end: 5 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'ratIdleBall',
            frames: this.anims.generateFrameNumbers('rat', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinWalkAlone',
            frames: this.anims.generateFrameNumbers('penguin', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'ratWalkAlone',
            frames: this.anims.generateFrameNumbers('rat', { start: 3, end: 5 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinWalkBall',
            frames: this.anims.generateFrameNumbers('penguin', { start: 5, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'ratWalkBall',
            frames: this.anims.generateFrameNumbers('rat', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinDead',
            frames: this.anims.generateFrameNumbers('penguin', { start: 9, end: 10 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'ratDead',
            frames: this.anims.generateFrameNumbers('rat', { start: 8, end: 9 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinDefeat',
            frames: this.anims.generateFrameNumbers('penguin', { start: 8, end: 8 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'ratDefeat',
            frames: this.anims.generateFrameNumbers('rat', { start: 6, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'penguinWin',
            frames: this.anims.generateFrameNumbers('penguin', { start: 11, end: 12 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'ratWin',
            frames: this.anims.generateFrameNumbers('rat', { start: 11, end: 12 }),
            frameRate: 6,
            repeat: -1
        });
    }
}