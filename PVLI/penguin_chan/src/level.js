import Player from "./player.js";
import Ball from "./ball.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });

        this.timeLeft = 90;
    }

    init(data) {
        this.numPlayers = data.nPlayers; // Guardamos la cantidad de jugadores pasados por el menu.
    }

    create() {
        //------CONTROL DE JUEGO:
        this.end = false;
        //------SONIDOS:
        this.winSound = this.sound.add('winSound'); // Metemos el sonido de ganar.
        this.loseSound = this.sound.add('loseSound'); // Metemos el sonido de perder.
        this.collideSound = this.sound.add('collideSound'); // Metemos el sonido de colision entre bolas.
        this.throwSound = this.sound.add('throwBallSound'); // Metemos el sonido de lanzar bolas.
        this.stunSound = this.sound.add('stunSound'); // Metemos el sonido de stun.
        //------POSICIONES DE LOS JUGADORES:
        this.posPlayer1 = this.cameras.main.centerY - 168;
        this.posPlayer2 = this.cameras.main.centerY + 100;
        //------IMAGENES:
        this.background = this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setScale(2, 2);
        this.table = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'table');
        this.score = this.add.image(this.cameras.main.width - 130, this.cameras.main.centerY, 'score')
        //------SCORES DE LOS JUGADORES:
        this.scorePenguin = 0;
        this.scoreRat = 0;
        //------LIMITES DERECHO E IZQUIERDO:
        this.createLimits()
        //------PLAYERS:
        this.players = [];
        this.player1 = new Player(this, this.cameras.main.centerX, this.posPlayer2, 1);
        if (this.numPlayers == 1) {
            this.player2 = new Player(this, this.cameras.main.centerX, this.posPlayer1, 3)
        }
        else {
            this.player2 = new Player(this, this.cameras.main.centerX, this.posPlayer1, 2)
        }
        this.players[0] = this.player1;
        this.players[1] = this.player2
        //------POOL DE BOLAS:
        this.ballsPool = [];
        //------TEXTOS:
        this.pointsText = this.add.text(this.score.x, this.score.y - 15, this.scorePenguin + " " + this.scoreRat, { // Texto para llevar la cuenta del fuel que lleva el jugador.
            fontSize: 30, // Como de grande es el texto.
            fill: '#000000', // Relleno.
            fontFamily: 'babelgam', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(2);
        this.timeText = this.add.text(this.cameras.main.centerX, 100, "Time left: " + this.timeLeft, { // Texto para llevar la cuenta del fuel que lleva el jugador.
            fontSize: 40, // Como de grande es el texto.
            fill: '#000000', // Relleno.
            fontFamily: 'babelgam', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(2);
        this.time.addEvent({
            delay: 1000, // 1 segundo.
            callback: () => {
                if (this.timeLeft > 0 && !this.end)
                    this.timeLeft--;
                this.timeText.setText("Time left: " + this.timeLeft); // Actualizamos el texto final dependiendo de si se ha ganado o perdido.
                if (this.timeLeft == 0) {
                    this.endGameByTime();
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        this.finalText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, "Penguin Score:  " + this.scorePenguin + "\nRat score: " + this.scoreRat, { // Texto para llevar la cuenta del fuel que lleva el jugador.
            fontSize: 60, // Como de grande es el texto.
            fill: '#00f', // Color de relleno
            stroke: '#fff', // Color de los bordes.
            strokeThickness: 4, // Como de grande es el borde.
            fontFamily: 'babelgam', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(11).setVisible(false);
        this.lostWinText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, " ", {
            fontSize: 100, // Como de grande es el texto.
            fill: '#00f', // Color de relleno
            stroke: '#fff', // Color de los bordes.
            strokeThickness: 4, // Como de grande es el borde.
            fontFamily: 'babelgam', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(11).setVisible(false);
        //------COLISIONES:
        // Colision jugadores con paredes.
        this.physics.add.collider(this.player1, this.wallD);
        this.physics.add.collider(this.player1, this.wallI);
        this.physics.add.collider(this.player2, this.wallD);
        this.physics.add.collider(this.player2, this.wallI);
        //------SPAWNEA LAS BOLAS INICIALES.
        this.spawnBalls();
        //------RECTANGULO FINAL:
        this.rect = this.add.graphics();
        this.rect.fillStyle(0x000000).fillRect(0, 0, this.cameras.main.width, this.cameras.main.height).setDepth(10).setAlpha(0);
        //------FIN DEL CREATE:
        this.createEnd = true;
    }

    update(time, delta) {
        if (this.createEnd) {
            this.updateTexts();
            this.checkCollision();
            this.checkEndGame();
        }
    }

    updateTexts() {
        this.pointsText.setText(this.scorePenguin + " " + this.scoreRat); // Actualizamos el texto final dependiendo de si se ha ganado o perdido.
    }

    spawnBalls() {
        for (let i = 0; i < 5; i++) {
            let ball = new Ball(this, this.cameras.main.centerX - 80 + i * 40, this.posPlayer1 + 20);
            this.ballsPool.push(ball);
        }
        for (let i = 0; i < 5; i++) {
            let ball = new Ball(this, this.cameras.main.centerX - 80 + i * 40, this.posPlayer2 + 30);
            this.ballsPool.push(ball);
        }
    }

    // Para parar las bolas cuando llegan a la zona.
    checkCollision() {
        this.ballsPool.forEach(ball => {
            // Verifica la colisión con cada zona
            const collisionDown = this.physics.world.overlap(ball, this.ballZoneDown);
            const collisionUp = this.physics.world.overlap(ball, this.ballZoneUp);
            if (collisionUp) {
                if (!ball.getIsPicked()) {
                    ball.stop();
                    ball.setZone(1);
                }
            } else if (collisionDown) {
                if (!ball.getIsPicked()) {
                    ball.stop();
                    ball.setZone(2);
                }
            }
        });

        // Stun de los jugadores cuando les viene una bola en movimiento.
        this.ballsPool.forEach(ball => {
            this.players.forEach(player => {
                const collision = this.physics.world.overlap(ball, player);
                if (collision) {
                    //console.log("colision jugador-bola");
                    if (ball.body.velocity.y != 0) {
                        player.stun();
                        this.stunSound.play({ volume: 0.1, loop: false }); // Sonido de stun.
                    }
                }
            });
        });

        // Choque entre bolas.
        this.ballsPool.forEach(ball => {
            this.ballsPool.forEach(ball2 => {
                const collision = this.physics.world.overlap(ball, ball2);
                if (collision) {
                    if (ball != ball2) {
                        //console.log("colision entre bolas");
                        ball.body.setVelocityY(ball.body.velocity.y * -1);
                        ball2.body.setVelocityY(ball2.body.velocity.y * -1);
                        if (ball.body.velocity.y > 0 || ball.body.velocity.y < 0) {
                            this.collideSound.play({ volume: 0.5, loop: false }); // Sonido de colision.
                        }
                    }
                }
            })
        });
    }

    checkCollisionPlayer1() {
        this.ballsPool.forEach(ball => {
            const collision = this.physics.world.overlap(ball, this.player1);
            if (collision) {
                //console.log("colision jugador1-bola");
                this.player1.choice(ball);
                return true;
            }
            else {
                return false;
            }
        });
    }

    checkCollisionPlayer2() {
        this.ballsPool.forEach(ball => {
            const collision = this.physics.world.overlap(ball, this.player2);
            if (collision) {
                //console.log("colision jugador1-bola");
                this.player2.choice(ball);
                return true;
            }
            else {
                return false;
            }
        });
    }

    createLimits() { // Crea los limites izquierdo e inferior de la partida.
        //------Pared Derecha:
        this.wallD = this.add.graphics();
        this.wallD.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        this.wallD.setPosition(this.cameras.main.centerX + 120, 0);
        this.physics.add.existing(this.wallD);
        this.wallD.body.setSize(10, this.cameras.main.height);
        this.wallD.body.setAllowGravity(false).setImmovable(true);
        this.wallD.setVisible(false);

        //------Pared Izquierda:
        this.wallI = this.add.graphics();
        this.wallI.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        this.wallI.setPosition(this.cameras.main.centerX - 120, 0);
        this.physics.add.existing(this.wallI);
        this.wallI.body.setSize(10, this.cameras.main.height);
        this.wallI.body.setAllowGravity(false).setImmovable(true);
        this.wallI.setVisible(false);

        //------Zona Bolas Abajo:
        this.ballZoneDown = this.add.zone(this.cameras.main.centerX - 100, this.cameras.main.centerY + 125, 200, 20);
        this.physics.world.enable(this.ballZoneDown);
        this.ballZoneDown.body.setAllowGravity(false);
        this.ballZoneDown.body.setImmovable(true);
        this.ballZoneDown.setOrigin(0, 0);

        //------Zona Bolas Arriba:        
        this.ballZoneUp = this.add.zone(this.cameras.main.centerX - 100, this.cameras.main.centerY - 170, 200, 20);
        this.physics.world.enable(this.ballZoneUp);
        this.ballZoneUp.body.setAllowGravity(false);
        this.ballZoneUp.body.setImmovable(true);
        this.ballZoneUp.setOrigin(0, 0);
    }

    checkEndGame() {
        // Reseteamos por si acaso.
        this.scorePenguin = 0;
        this.scoreRat = 0;

        this.ballsPool.forEach(ball => {
            if (ball.getZone() === 1) { // Zona 1 = zona arriba.
                this.scorePenguin++;
            }
            else if (ball.getZone() === 2) { // Zona 2 = zona abajo.
                this.scoreRat++;
            }
        });

        if (this.scoreRat >= 10) {
            this.defeat();
            this.end = true;
        }
        else if (this.scorePenguin >= 10) {
            this.victory();
            this.end = true;
        }
    }

    endGameByTime() {
        if (this.scoreRat > this.scorePenguin) {
            this.defeat();
            this.end = true;
        }
        else if (this.scorePenguin > this.scoreRat) {
            this.victory();
            this.end = true;
        } else {
            this.tie();
            this.end = true;
        }
    }

    throwSoundPlay() {
        this.throwSound.play({ volume: 0.5, loop: false }); // Sonido de lanzar.
    }

    victory() {
        //console.log("VICTORIA");
        this.lostWinText.setText("YOU WIN").setVisible(true);
        this.finalText.setText("Penguin Score:  " + this.scorePenguin + "\nRat score: " + this.scoreRat).setVisible(true);
        this.exitMenu();
        this.player1.setWin(1);
        this.player2.setWin(2);
        this.winSound.play({ volume: 0.1, loop: true }); // Sonido de ganar.
    }

    defeat() {
        //console.log("DERROTA");
        this.lostWinText.setText("YOU LOST").setVisible(true);
        this.finalText.setText("Penguin Score:  " + this.scorePenguin + "\nRat score: " + this.scoreRat).setVisible(true);
        this.exitMenu();
        this.player1.setWin(2);
        this.player2.setWin(1);
        this.loseSound.play({ volume: 0.1, loop: true }); // Sonido de perder.
    }

    tie() {
        // console.log("TIE");
        this.lostWinText.setText("TIE").setVisible(true);
        this.finalText.setText("Penguin Score:  " + this.scorePenguin + "\nRat score: " + this.scoreRat).setVisible(true);
        this.exitMenu();
    }

    exitMenu() {
        this.tweens.add({ // Transicion de derrota.
            targets: this.rect,
            alpha: 1,
            duration: 4000,
            ease: 'power1',
            repeat: 0,
            onComplete: () => {
                this.scene.start("MenuP"); // Volvemos al menu.            
            }
        });

    }
    /*
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
}*/
}