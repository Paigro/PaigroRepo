import Player from "./player.js";
import Bullet from "./bullet.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });

        this.bulletsPoolSize = 1;
    }

    init(data) {
        this.numPlayers = data.nPlayers; // Guardamos la cantidad de jugadores pasados por el menu.
        //console.log("Numero jugadores: " + this.numPlayers);
    }

    preload() {

    }

    create() {
        this.background = this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1); // Ponemos el fondo.

        this.players = []; // Array para guardar los jugadores.
        for (let i = 1; i <= this.numPlayers; i++) {
            const player = new Player(this, ((this.cameras.main.width) / (this.numPlayers + 1)) * i, this.cameras.main.height - 40, i);
            this.players.push(player);
            console.log("Jugador creado: " + i);
        }

        this.bulletsPool = this.physics.add.group({ // Pool de balas.
            classType: Bullet,
            maxSize: this.bulletsPoolSize,
        });
        for (let i = 0; i < this.bulletsPoolSize; i++) {
            let bullet = this.bulletsPool.get(this, 0, 0);
            bullet.setActive(false).setVisible(false);
        }

    }

    update(time, delta) {
        if (this.background.y < this.background.height) {
            this.background.y += 0.5; // Movemos el fondo si no ha llegado hasta el final.
            //console.log("PosY fondo: " + this.bacground.y);
        }
        else {
            this.win();
        }
    }

    shoot(x, y) {
        let bullet = this.bulletsPool.get();
        if (bullet) {
            bullet.setActive(true).setVisible(true).setX(x).setY(y);
        }
    }

    gameOver() {
        console.log("HAS PERDIDO");
    }

    win() {
        console.log("HAS GANADO");
    }
}