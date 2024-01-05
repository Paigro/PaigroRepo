import Player from "./player.js";
import Bullet from "./bullet.js";
import Enemy from "./enemy.js";
import PowerUp from "./powerUp.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });

        this.bulletsPoolSize = 100; // Maxima capacidad de la pool de balas.
        this.enemiesPoolSize = 10; // Maxima capacidad de la pool de enemigos.
        this.powerUpsPoolSize = 1; // Maxima capacidad de la pool de PowerUps.
    }

    init(data) {
        this.numPlayers = data.nPlayers; // Guardamos la cantidad de jugadores pasados por el menu.
    }

    create() {
        // CONTROL DEL JUEGO:
        this.endGame = 0;
        this.winGame = false;
        this.backgroundSpeed = 5;
        // TEXTO FINAL:
        this.finalText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "", {
            fontSize: '40px',
            fill: '#fff',
            fontFamily: 'gummy',
            stroke: '#' + Math.floor(Math.random() * 16777215).toString(16),
            strokeThickness: 5
        }).setOrigin(0.5, 0.5).setVisible(false).setDepth(2);
        // FONDO:
        this.background = this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1); // Ponemos el fondo.
        this.backgroundContrast = this.add.image(0, this.cameras.main.height, 'backgroundContrast').setOrigin(0, 1).setAlpha(0).setDepth(1); // Ponemos el fondo constrastado.
        // JUGADORES:
        this.players = []; // Array para guardar los jugadores.
        for (let i = 1; i <= this.numPlayers; i++) {
            const player = new Player(this, ((this.cameras.main.width) / (this.numPlayers + 1)) * i, this.cameras.main.height - 40, i);
            this.players.push(player);
            console.log("Jugador creado: " + i);
        }
        // BALAS:
        this.bulletsPool = this.physics.add.group({ // Pool de balas.
            classType: Bullet,
            maxSize: this.bulletsPoolSize,
        });
        for (let i = 0; i < this.bulletsPoolSize; i++) {
            let bullet = this.bulletsPool.get(this, 0, 0);
            bullet.setActive(false).setVisible(false);
        }
        // ENEMIGOS:
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
                if (this.timeToNewEnemy <= 0 && this.endGame < this.numPlayers && !this.winGame) {
                    this.spawnEnemy(Phaser.Math.Between(16, this.cameras.main.width - 16), -16) // Generamos el enemigo.
                    this.timeToNewEnemy = Phaser.Math.Between(2, 6); // Reseteamos con un tiempo aleatorio.
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        // POWERUPS:
        this.powerUpsPool = this.physics.add.group({ // Pool de enemigos.
            classType: PowerUp,
            maxSize: this.powerUpsPoolSize,
        });
        for (let i = 0; i < this.powerUpsPoolSize; i++) {
            let enemy = this.powerUpsPool.get(this, 0, 0);
            enemy.setActive(false).setVisible(false);
        }
        this.timeToNewPowerUp = Phaser.Math.Between(0, 2); // Generamos un tiempo aleatorio para el siguiente enemigo.
        this.time.addEvent({
            delay: 1000, // 1 segundo.
            callback: () => {
                this.timeToNewPowerUp--; // Disminuimos el tiempo.
                if (this.timeToNewPowerUp <= 0 && this.endGame < this.numPlayers && !this.winGame) {
                    this.spawnPowerUp(Phaser.Math.Between(16, this.cameras.main.width - 16), -16) // Generamos el enemigo.
                    this.timeToNewPowerUp = Phaser.Math.Between(0, 2); // Reseteamos con un tiempo aleatorio.
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        // COLISIONES:
        this.physics.add.collider(this.players, this.enemiesPool, (player, enemy) => this.enemyPlayerCollision(player, enemy));
        this.physics.add.collider(this.bulletsPool, this.enemiesPool, (bullet, enemy) => this.enemyBulletCollision(bullet, enemy));
        this.physics.add.collider(this.players, this.powerUpsPool, (player, powerUp) => this.playerPowerUpCollision(player, powerUp));
    }

    update(time, delta) {
        if (this.background.y < this.background.height && this.endGame < this.numPlayers) {
            this.background.y += this.backgroundSpeed; // Movemos el fondo si no ha llegado hasta el final.
            this.backgroundContrast.y += this.backgroundSpeed; // Movemos el fondo contrastado si no ha llegado hasta el final.
            //console.log("PosY fondo: " + this.bacground.y);
        }
        else if (this.background.y >= this.background.height && this.endGame < this.numPlayers) {
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

    spawnPowerUp(x, y) {
        let powerUp = this.powerUpsPool.get();
        if (powerUp) {
            powerUp.setActive(true).setVisible(true).setX(x).setY(y);
        }
    }

    enemyBulletCollision(bullet, enemy) {
        enemy.anims.play('enemyexplosion').on('animationcomplete', (animation, frame) => {
            if (animation.key === 'enemyexplosion') {
                enemy.reset();
            }
        }, this);
        bullet.reset();
    }

    enemyPlayerCollision(player, enemy) {
        console.log("Colision enemigo jugador");
        player.setActive(false).setVisible(false).setPosition(-100, -100);
        player.body.setVelocityY(0).setVelocityX(0);
        enemy.reset();

        this.gameOver();
    }

    playerPowerUpCollision(player, powerUp) {
        console.log("Colision jugador PowerUp");
        player.upgradeShoot();
        powerUp.reset();
    }

    gameOver() {
        if (this.endGame <= this.numPlayers) {
            this.endGame++;
        }
        if (this.endGame >= this.numPlayers) {
            this.endText("DEFEAT");
        }
    }

    win() {
        this.winGame = true;
        for (let i = 0; i < this.numPlayers; i++) {
            this.players[i].stop();
            this.players[i].goAway();
        }
        this.endText("VICTORY");
    }

    endText(text) {
        this.finalText.setText("" + text).setVisible(true);
        this.tweens.add({
            targets: this.backgroundContrast,
            alpha: 1,
            duration: 5000,
            ease: 'Power1',
            repeat: 0,
            onComplete: () => {
                this.scene.start("Title");
            }
        });
    }
}