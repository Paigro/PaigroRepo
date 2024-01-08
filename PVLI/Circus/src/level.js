import Player from "./player.js";
import Fire from "./fire.js";
import Ring from "./ring.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });
        this.ringsPoolSize = 10;
    }

    init(data) {
        this.goal = data.difficulty;
    }

    preload() {

    }

    create() {
        // Control de juego:
        this.endGame = false;
        // Sonidos:
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        this.stageMusic = this.sound.add('stageMusic');
        //this.stageMusic.play({ volume: 0.1, loop: true });
        // Suelo:
        this.createLimits();
        // Fondos:
        this.backgrounds = [];
        this.lastbackground = 0;

        for (let i = 1; i <= 3; i++) {
            // Calcula la posicion x
            let x = 0;
            if (i - 1 > 0) {
                x = this.backgrounds[i - 2].x + this.backgrounds[i - 2].width;
            }

            if (i % 2 === 0) {
                const background = (this.add.image(x, this.cameras.main.height, 'background2').setOrigin(0, 1));
                this.backgrounds.push(background);
            } else {
                const background = (this.add.image(x, this.cameras.main.height, 'background1').setOrigin(0, 1));
                this.backgrounds.push(background);
            }
        }
        // Pool de aros:
        this.ringsPool = this.physics.add.group({ // Pool de enemigos.
            classType: Ring,
            maxSize: this.ringsPoolSize,
        });
        for (let i = 0; i < this.ringsPoolSize; i++) {
            let ring = this.ringsPool.get(this, 0, 0);
            ring.setActive(false).setVisible(false);
            ring.body.setAllowGravity(false);
        }
        this.time.addEvent({
            delay: 2000, // 3.5 segundo.
            callback: () => {
                if (!this.endGame) {
                    this.spawnRings(this.cameras.main.worldView.right + 20, this.cameras.main.height - 340) // Generamos los meteoritos.
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        // Array de fuegos:
        this.fires = [];
        this.player = new Player(this, 50, this.cameras.main.height - 260);
        // Camara sigue al jugador con offset:
        this.camera = this.cameras.main.startFollow(this.player, true, 1, 0, -460, 120);
        //this.cameras.main.setFollowOffset(-462, 1000); // Tambien esta este metodo para el offset de algo que quiere seguir a otra cosa.
        this.physics.add.collider(this.player, this.wall) // Metemos la colision entre el jugador y el suelo.
        this.physics.add.collider(this.player, this.floor, () => { // Metemos la colision entre el jugador y el suelo.
            this.player.jumpFinished();
        });
        this.physics.add.collider(this.player, this.ringsPool, (player, ring) => {
            this.playerRingCollision(player, ring);
        })
        this.physics.add.collider(this.player, this.fires, (player, fire) => {
            this.playerFireCollsion(player, fire);
        })

        // Creacion de cosas del juego:
        this.spawnFires();
    }

    update(time, delta) {
        if (this.cameras.main.worldView.left >= this.backgrounds[this.lastbackground].x + this.backgrounds[this.lastbackground].width) {
            console.log(this.backgrounds.length - this.lastbackground - 1);
            // Pone el ultimo fondo a la derecha del todo
            this.backgrounds[this.lastbackground].x = this.backgrounds[this.backgrounds.length - this.lastbackground - 1].x + this.backgrounds[this.lastbackground].width;

            // Actualizacion del last background
            this.lastbackground++;
            if (this.lastbackground >= this.backgrounds.length) {
                this.lastbackground = 0;
            }
        }
    }

    createLimits() {
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
        this.physics.add.existing(this.wall);
        this.wall.body.setSize(10, this.cameras.main.height);
        this.wall.body.setAllowGravity(false).setImmovable(true)//setCollideWorldBounds(true);
        this.wall.setVisible(false);

        // O por sprite:
        /*this.floorGraphic = this.add.graphics(); // Hacemos el graphic que usaremos como textura
        this.floorGraphic.fillStyle(0xFF6600).generateTexture('floorTexture', this.cameras.main.width, 120); // Creamos la textura.
        this.floor = this.add.sprite(0, this.cameras.main.height, 'floorTexture').setDepth(3).setOrigin(0, 1); // Creamos el sprite que usaremos como suelo y le ponemos la nueva textura.
        this.physics.add.existing(this.floor); // Le ponemos fisicas al suelo.
        this.floor.body.setAllowGravity(false).setImmovable(true); // Desactivamos la gravedad y su movilidad para que el jugador no lo mueva.*/
    }

    spawnFires() {
        for (let i = 0; i < (this.goal - 30) / 10; i++) {
            let fire = new Fire(this, 1600 + (800 * (i + 1)), this.cameras.main.height - 170);
            //console.log(800 * (3 * (i + 1))) // Antigua cuenta que no funciona.
            console.log(1600 + (800 * (i + 1)))
            this.fires[i] = fire;
        }
    }

    spawnRings(x, y) {
        //console.log("Spawn ring.");
        let ring = this.ringsPool.get();
        if (ring) {
            ring.activate(x, y);
        }
    }

    playerRingCollision(player, ring) {
        player.die();
        this.endGame = true;
        this.defeat();
    }

    playerFireCollsion(player, fire) {
        player.die();
        this.endGame = true;
        this.defeat();
    }

    visctory() {
        console.log("VICTORY");
    }

    defeat() {
        this.ringsPool.children.each((child) => {
            // 'child' es cada elemento del grupo
            child.stop();
        }, this);
        console.log("DEFEAT");
    }

    setText(text) {

    }

    exitMenu() {

    }

}