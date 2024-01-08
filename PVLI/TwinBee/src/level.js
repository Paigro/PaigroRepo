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
        // CHEAT KEYS:
        this.cheatKeys = this.input.keyboard.addKeys({
            C: Phaser.Input.Keyboard.KeyCodes.C,
            P: Phaser.Input.Keyboard.KeyCodes.P,
            U: Phaser.Input.Keyboard.KeyCodes.U
        });
        // CONTROL DEL JUEGO:
        this.endGame = 0; // Para controlar el numero de jugadores muertos para la derrota.
        this.winGame = false; // Para controlar la victoria.
        this.backgroundSpeed = 0.5; // Distancia en Y que se va a mover el fondo y los PowerUps.
        // SONIDOS:
        this.shootSound = this.sound.add('shootSound'); // Metemos el sonido del disparo.
        this.deadSound = this.sound.add('deadSound'); // Metemos el sonido de muerte del jugador.
        this.explosionSound = this.sound.add('explosionSound'); // Metemos el sonido de la explosion del enemigo.
        this.luckySound = this.sound.add('luckySound'); // Metemos el sonido del PowerUp.
        // TEXTO FINAL:
        this.finalText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "", {
            fontSize: '40px', // Como de grande es el texto.
            fill: '#fff', // Relleno.
            fontFamily: 'gummy', // Fuente del texto.
            stroke: '#' + Math.floor(Math.random() * 16777215).toString(16), // Fondo de las letras aleatorio.
            strokeThickness: 5 // Como de grande es el fondo de las letras.
        }).setOrigin(0.5, 0.5).setVisible(false).setDepth(2);
        // FONDO:
        this.background = this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1); // Ponemos el fondo.
        this.backgroundContrast = this.add.image(0, this.cameras.main.height, 'backgroundContrast').setOrigin(0, 1).setAlpha(0).setDepth(1); // Ponemos el fondo constrastado, invisible y por encima del otro fondo.
        // JUGADORES:
        this.players = []; // Array para guardar los jugadores.
        for (let i = 1; i <= this.numPlayers; i++) {
            const player = new Player(this, ((this.cameras.main.width) / (this.numPlayers + 1)) * i, this.cameras.main.height - 40, i);
            this.players.push(player);
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
                if (this.timeToNewEnemy <= 0 && this.endGame < this.numPlayers && !this.winGame) { // Cuando toque y no sea final de partida.
                    this.spawnEnemy(Phaser.Math.Between(16, this.cameras.main.width - 16), -16) // Generamos el enemigo.
                    this.timeToNewEnemy = Phaser.Math.Between(2, 6); // Reseteamos con un tiempo aleatorio.
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        // POWERUPS:
        this.powerUpsPool = this.physics.add.group({ // Pool de PowerUps.
            classType: PowerUp,
            maxSize: this.powerUpsPoolSize,
        });
        for (let i = 0; i < this.powerUpsPoolSize; i++) {
            let enemy = this.powerUpsPool.get(this, 0, 0);
            enemy.setActive(false).setVisible(false);
        }
        this.timeToNewPowerUp = Phaser.Math.Between(6, 10); // Generamos un tiempo aleatorio para el siguiente enemigo.
        this.time.addEvent({
            delay: 1000, // Cada 1 segundo se ejecuta lo del callback.
            callback: () => {
                this.timeToNewPowerUp--; // Disminuimos el tiempo.
                if (this.timeToNewPowerUp <= 0 && this.endGame < this.numPlayers && !this.winGame) { // Cuando toque y no sea final de partida.
                    this.spawnPowerUp(Phaser.Math.Between(32, this.cameras.main.width - 32), -16) // Generamos el enemigo.
                    this.timeToNewPowerUp = Phaser.Math.Between(6, 10); // Reseteamos con un tiempo aleatorio.
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        // COLISIONES:
        this.physics.add.collider(this.players, this.enemiesPool, (player, enemy) => {
            this.enemyPlayerCollision(player, enemy);
        });
        this.physics.add.collider(this.bulletsPool, this.enemiesPool, (bullet, enemy) => {
            this.enemyBulletCollision(bullet, enemy);
        });
        this.physics.add.collider(this.players, this.powerUpsPool, (player, powerUp) => {
            this.playerPowerUpCollision(player, powerUp);
        });
    }

    update(time, delta) {
        this.checkCheatKeys();
        if (this.background.y < this.background.height && this.endGame < this.numPlayers) {
            this.background.y += this.backgroundSpeed; // Movemos el fondo si no ha llegado hasta el final.
            this.backgroundContrast.y += this.backgroundSpeed; // Movemos el fondo contrastado si no ha llegado hasta el final.
        }
        else if (this.background.y >= this.background.height && this.endGame < this.numPlayers) {
            this.win();
        }
    }

    shoot(x, y, desviation) {
        this.shootSound.play({ volume: 0.1, loop: false });
        let bullet = this.bulletsPool.get();
        if (bullet) {
            bullet.setActive(true).setVisible(true).setX(x).setY(y);
            bullet.body.setVelocityX(desviation);
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
        this.explosionSound.play({ volume: 0.1, loop: false });
        enemy.anims.play('enemyexplosion', true).on('animationcomplete', (animation, frame) => {
            if (animation.key === 'enemyexplosion') {
                enemy.reset();
            }
        }, this);
        bullet.reset();
    }

    enemyPlayerCollision(player, enemy) {
        this.deadSound.play({ volume: 0.1, loop: false });
        player.setActive(false).setVisible(false).setPosition(-100, -100);
        player.body.setVelocityY(0).setVelocityX(0);
        enemy.reset();

        this.gameOver();
    }

    playerPowerUpCollision(player, powerUp) {
        this.luckySound.play({ volume: 0.1, loop: false });
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
        for (let i = 0; i < this.numPlayers; i++) { // Recorremos todos los jugadores.
            this.players[i].stop(); // Hacemos que el jugador no pueda moverse.
            this.players[i].goAway(); // El tween que hace que los jugadores salgan de la partida.
        }
        this.endText("VICTORY");
    }

    endText(text) {
        this.finalText.setText("" + text).setVisible(true); // Actualizamos el texto final dependiendo de si se ha ganado o perdido.
        this.tweens.add({
            targets: this.backgroundContrast, // Target.
            alpha: 1, // Para que haga la imagen completamente visible.
            duration: 5000, // Duracion: 5 segundos.
            ease: 'Power1',
            repeat: 0, // Para que no se repita.
            yoyo: false, // No queremos que haga yoyo.
            onComplete: () => {
                this.scene.start("Title"); // Vuelta al menu principal cuando se acabe el tween. Pone que dure 3 segundos esto pero lo pongo 5 porque si.
            }
        });
    }

    fasterBackground() {
        this.backgroundSpeed += 0.5;
    }

    checkCheatKeys() {
        if (Phaser.Input.Keyboard.JustUp(this.cheatKeys.C)) { // Cheat show/hide colliders.
            console.log("Cheat: colliders.")
            this.physics.world.colliders.visible = !this.physics.world.colliders.visible;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.cheatKeys.P)) { // Cheat faster.
            console.log("Cheat: background speed.")
            this.fasterBackground();
        }
        else if (Phaser.Input.Keyboard.JustUp(this.cheatKeys.U)) { // Cheat upgrade player shoot.
            if (this.players[0]) {
                console.log("Cheat: upgrade player.")
                this.players[0].upgradeShoot();
            }
        }
    }
}