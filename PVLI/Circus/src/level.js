import Player from "./player.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });
    }

    init(data) {
        this.goal = data.difficulty;
    }

    preload() {

    }

    create() {
        // Sonidos:
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        this.stageMusic = this.sound.add('stageMusic');
        //this.stageMusic.play({ volume: 0.1, loop: true });
        // Suelo:
        this.createFloor();
        // Fondos:
        this.background1 = this.add.image(-800, this.cameras.main.height, 'background1').setOrigin(0, 1);
        this.background2 = this.add.image(this.background1.x + this.background1.width, this.cameras.main.height, 'background1').setOrigin(0, 1);
        this.background3 = this.add.image(this.background2.x + this.background2.width, this.cameras.main.height, 'background1').setOrigin(0, 1);

        this.player = new Player(this, 50, this.cameras.main.height - 260);
        // Camara sigue al jugador con offset:
        this.camera = this.cameras.main.startFollow(this.player, true, 1, 0, -460, 120);
        //this.cameras.main.setFollowOffset(-462, 1000); // Tambien esta este metodo para el offset de algo que quiere seguir a otra cosa.
        this.physics.add.collider(this.player, this.floor, () => { // Metemos la colision entre el jugador y el suelo.
            this.player.jumpFinished();
        });
        this.physics.add.collider(this.player, this.wall) // Metemos la colision entre el jugador y el suelo.
    }

    update(time, delta) {

    }

    createFloor() {
        // Por graphic:
        this.floor = this.add.graphics();
        this.floor.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        this.floor.setPosition(0, this.cameras.main.height - 120)
        this.physics.add.existing(this.floor);
        this.floor.body.setSize((this.goal * 800) / 10, 120);
        this.floor.body.setAllowGravity(false).setImmovable(true)//setCollideWorldBounds(true);
        this.floor.setVisible(false);

        this.wall = this.add.graphics();
        this.wall.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        //this.wall.setPosition(0, this.cameras.main.height - 120)
        this.physics.add.existing(this.wall);
        this.wall.body.setSize(10, this.cameras.main.height);
        this.wall.body.setAllowGravity(false).setImmovable(true)//setCollideWorldBounds(true);
        this.wall.setVisible(false);

        // Por sprite:
        /*this.floorGraphic = this.add.graphics(); // Hacemos el graphic que usaremos como textura
        this.floorGraphic.fillStyle(0xFF6600).generateTexture('floorTexture', this.cameras.main.width, 120); // Creamos la textura.
        this.floor = this.add.sprite(0, this.cameras.main.height, 'floorTexture').setDepth(3).setOrigin(0, 1); // Creamos el sprite que usaremos como suelo y le ponemos la nueva textura.
        this.physics.add.existing(this.floor); // Le ponemos fisicas al suelo.
        this.floor.body.setAllowGravity(false).setImmovable(true); // Desactivamos la gravedad y su movilidad para que el jugador no lo mueva.*/
    }

}