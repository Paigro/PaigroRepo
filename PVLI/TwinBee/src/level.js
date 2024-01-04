import Player from "./player.js";
import Bullet from "./bullet.js";
import Enemy from "./enemy.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });

        this.bulletsPoolSize = 100; // Maxima capacidad de la pool de balas.
        this.enemiesPoolSize = 10; // Maxima capacidad de la pool de enemigos.
    }

    init(data) {
        this.numPlayers = data.nPlayers; // Guardamos la cantidad de jugadores pasados por el menu.
        //console.log("Numero jugadores: " + this.numPlayers);
    }

    preload() {

    }

    create() {
        


        this.background = this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1); // Ponemos el fondo.
        // Jugadores:
        this.players = []; // Array para guardar los jugadores.
        for (let i = 1; i <= this.numPlayers; i++) {
            const player = new Player(this, ((this.cameras.main.width) / (this.numPlayers + 1)) * i, this.cameras.main.height - 40, i);
            this.players.push(player);
            console.log("Jugador creado: " + i);
        }
        // Pool de balas:
        this.bulletsPool = this.physics.add.group({ // Pool de balas.
            classType: Bullet,
            maxSize: this.bulletsPoolSize,
        });
        for (let i = 0; i < this.bulletsPoolSize; i++) {
            let bullet = this.bulletsPool.get(this, 0, 0);
            bullet.setActive(false).setVisible(false);
        }
        // Pool de enemigos:
        this.enemiesPool = this.physics.add.group({ // Pool de enemigos.
            classType: Enemy,
            maxSize: this.enemiesPoolSize,
        });
        for (let i = 0; i < this.enemiesPoolSize; i++) {
            let enemy = this.enemiesPool.get(this, 0, 0);
            enemy.setActive(false).setVisible(false);
        }
        this.timeToNewEnemy = Phaser.Math.Between(2, 6); // Generamos un tiempo aleatorio para el siguiente enemigo.
        this.time.addEvent({
            delay: 1000, // 1 segundo.
            callback: () => {
                this.timeToNewEnemy--; // Disminuimos el tiempo.
                if (this.timeToNewEnemy <= 0) {
                    this.spawnEnemy(Phaser.Math.Between(16, this.cameras.main.width),-16) // Generamos el enemigo.
                    this.timeToNewEnemy = Phaser.Math.Between(2, 6); // Reseteamos con un tiempo aleatorio.
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        // PowerUps:













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

    spawnEnemy(x, y) {
        let enemy = this.enemiesPool.get();
        if (enemy) {
            enemy.setActive(true).setVisible(true).setX(x).setY(y);
        }
    }

    gameOver() {
        console.log("HAS PERDIDO");
    }

    win() {
        console.log("HAS GANADO");
    }
}