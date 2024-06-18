
export default class Boot extends Phaser.Scene {

  constructor() {
    super({ key: 'Boot', active: true });
  }

  init() {

  }

  preload() {
    // Imagenes:
    this.load.image('area', './assets/area.png');
    this.load.image('a', './assets/A_button.png');
    this.load.image('d', './assets/D_button.png');
    this.load.image('f', './assets/f_button.png');
    this.load.image('s', './assets/s_button.png');
    this.load.image('background', './assets/jungle.png');
    this.load.image('heart', './assets/heart.png');

    // SpriteSheets:
    this.load.spritesheet("energy", "assets/energy.png", {
      frameWidth: 32, frameHeight: 32
    });
    this.load.spritesheet("player", "assets/CH_Idle.png", {
      frameWidth: 128, frameHeight: 128
    });
    this.load.spritesheet("player_dead", "assets/CH_Dead.png", {
      frameWidth: 128, frameHeight: 128
    });
    this.load.spritesheet("player_hurt", "assets/CH_Hurt.png", {
      frameWidth: 128, frameHeight: 128
    });
    this.load.spritesheet("skeleton", "assets/SK_Idle.png", {
      frameWidth: 128, frameHeight: 128
    });
    this.load.spritesheet("skeleton_atk", "assets/SK_Attack.png", {
      frameWidth: 128, frameHeight: 128
    });
    this.load.spritesheet("skeleton_dead", "assets/SK_Dead.png", {
      frameWidth: 128, frameHeight: 128
    });

    // Musica:
    this.load.audio('forest', './assets/sounds/forestMusic.mp3');
  }

  create() {
    this.loadAnimations();
    this.scene.start('MenuP');
  }

  loadAnimations() {
    this.anims.create({
      key: 'playerIdle',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 5 }),
      frameRate: 6,
      repeat: 1
    });
    this.anims.create({
      key: "playerDead",
      frames: this.anims.generateFrameNumbers("player_dead", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 1
    });
    this.anims.create({
      key: "playerHurt",
      frames: this.anims.generateFrameNumbers("player_hurt", { start: 0, end: 2 }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: "skIdle",
      frames: this.anims.generateFrameNumbers("skeleton", { start: 0, end: 6 }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: "skAttack",
      frames: this.anims.generateFrameNumbers("skeleton_atk", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 1
    });
    this.anims.create({
      key: "skDead",
      frames: this.anims.generateFrameNumbers("skeleton_dead", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: "energyIdle",
      frames: this.anims.generateFrameNumbers("energy", { start: 1, end: 2 }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: "energyCreate",
      frames: this.anims.generateFrameNumbers("energy", { start: 0, end: 2 }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: "energyEnd",
      frames: this.anims.generateFrameNumbers("energy", { start: 3, end: 3 }),
      frameRate: 5,
      repeat: 1
    });

  }
}