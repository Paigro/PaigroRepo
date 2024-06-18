import Player from "./player.js";
import Ball from "./ball.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });

        this.timeLeft = 90;
    }

    init(data) {
        this.diff = data.diff; // Guardamos la cantidad de jugadores pasados por el menu.
        // PAIGRO AQUI: falta hacer cosas con la dificultad.
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
        //------POSICIONES DE LOS JUGADORES en Y:
        this.posPlayerX = this.cameras.main.centerX - 40;
        //------IMAGENES:
        this.background = this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setScale(2, 2); // Fondo.
        this.table = this.add.image(this.cameras.main.centerX + 250, this.cameras.main.centerY + 160, 'table').setRotation(Phaser.Math.DegToRad(90)).setScale(2.2, 2.2); // Mesa.
        this.score = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 200, 'score'); // Marcador.
        //------SCORES DE LOS JUGADORES:
        this.scorePenguin = 0;
        this.scoreRat = 0;
        //------LIMITES DERECHO E IZQUIERDO:
        this.createLimits()
        //------PLAYERS:
        this.players = [];
        this.player1 = new Player(this, this.posPlayerX, this.cameras.main.centerY, 1);
        this.player1.setScale(2, 2);
        // Lo metemo al array.
        this.players[0] = this.player1;
        //------POOL DE BOLAS:
        this.ballsPool = [];
        //------TEXTOS:
        // Texto para llevar la puntuacion del juego.
        this.pointsText = this.add.text(this.score.x, this.score.y - 15, this.scorePenguin + " " + this.scoreRat, {
            fontSize: 30, // Como de grande es el texto.
            fill: '#000000', // Relleno.
            fontFamily: 'babelgam', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(2);

        // Texto para llevar la cuenta del tiempo.
        this.timeText = this.add.text(this.cameras.main.centerX, 100, "Time left: " + this.timeLeft, {
            fontSize: 40, // Como de grande es el texto.
            fill: '#000000', // Relleno.
            fontFamily: 'babelgam', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(2);
        // Evento de tiempo para que se vaya reduciendo 1 cada segundo y cuando llegue a 0 active el fin e juego.
        this.time.addEvent({
            delay: 1000, // 1 segundo.
            callback: () => {
                if (this.timeLeft > 0 && !this.end)
                    this.timeLeft--;
                this.timeText.setText("Time left: " + this.timeLeft); // Actualizamos el texto de tiempo.
                if (this.timeLeft == 0) {
                    this.endGameByTime(); // Llamamos al fin de juego.
                }
            },
            callbackScope: this, // Creo que para que acceda bien a la escena y pueda acceder bien a las cosas dentro de ella.
            loop: true // Para que se haga continuamente.
        });

        //----Textos finales del juego.
        // Testo que dice la puntuacion final de cada jugador.
        this.finalText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, "Penguin Score:  " + this.scorePenguin + "\nRat score: " + this.scoreRat, {
            fontSize: 40, // Como de grande es el texto.
            fill: '#00f', // Color de relleno
            stroke: '#fff', // Color de los bordes.
            strokeThickness: 4, // Como de grande es el borde.
            fontFamily: 'babelgam', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(11).setVisible(false);
        // Texto que dice
        this.lostWinText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, " ", {
            fontSize: 60, // Como de grande es el texto.
            fill: '#00f', // Color de relleno
            stroke: '#fff', // Color de los bordes.
            strokeThickness: 4, // Como de grande es el borde.
            fontFamily: 'babelgam', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(11).setVisible(false);
        //------COLISIONES:
        // Colision jugadores con paredes.
        this.physics.add.collider(this.players, this.wallR);
        this.physics.add.collider(this.players, this.wallU);
        this.physics.add.collider(this.players, this.wallD);
        // Colisiones entre las bolas y  las paredes.
        this.physics.add.collider(this.ballsPool, this.wallR);
        this.physics.add.collider(this.ballsPool, this.wallU);
        this.physics.add.collider(this.ballsPool, this.wallD);
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
            this.checkCollision();
            this.checkEndGame();
        }
    }

    updateTexts() {
        // Actualizamos el texto de la puntuacion.
        this.pointsText.setText(this.scorePenguin + " " + this.scoreRat);
    }

    spawnBalls() {
        for (let i = 0; i < 5; i++) {
            let ball = new Ball(this, this.cameras.main.centerX - 50, this.cameras.main.centerY - 60 + i * 100);
            ball.setScale(2, 2);
            this.ballsPool.push(ball);
        }
    }

    checkCollision() {
        // Para parar las bolas cuando llegan a la zona.
        this.ballsPool.forEach(ball => {
            // Verifica la colision con cada zona.
            const collisionZone = this.physics.world.overlap(ball, this.ballZone);
            if (collisionZone) { // Si colisiona con la zona, paramos la bola y le pasamos la zona con la que ha colisionado (1).
                if (!ball.getIsPicked()) {
                    ball.stop();
                    ball.setZone(1);
                }
            }
        });

        // Stun de los jugadores cuando les viene una bola en movimiento.
        this.ballsPool.forEach(ball => {
            this.players.forEach(player => {
                const collision = this.physics.world.overlap(ball, player);
                if (collision) {
                    //console.log("colision jugador-bola");
                    if (ball.body.velocity.x != 0) {
                        player.stun();
                        this.stunSound.play({ volume: 0.1, loop: false }); // Sonido de stun.
                    }
                }
            });
        });

        // Choque entre bolas.        
        this.physics.add.collider(this.ballsPool, this.ballsPool, (ball1, ball2) =>
            this.checkCollisionsBetweenBalls(ball1, ball2)
        );
    }

    checkCollisionsBetweenBalls(ball1, ball2) {
        if (ball1 != ball2) {
            //console.log("colision entre bolas");
            ball1.body.setVelocityY(ball1.body.velocity.y * -1);
            ball2.body.setVelocityY(ball2.body.velocity.y * -1);
            if (ball1.body.velocity.y > 0 || ball1.body.velocity.y < 0) {
                this.collideSound.play({ volume: 0.5, loop: false }); // Sonido de colision.
            }
        }
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

    createLimits() { // Crea los limites izquierdo e inferior de la partida.
        //------Pared Derecha:
        this.wallR = this.add.graphics();
        this.wallR.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        this.wallR.setPosition(this.cameras.main.width, 0);
        this.physics.add.existing(this.wallR);
        this.wallR.body.setSize(10, this.cameras.main.height);
        this.wallR.body.setAllowGravity(false).setImmovable(true);
        this.wallR.setVisible(false);

        //------Pared Arriba:
        this.wallU = this.add.graphics();
        this.wallU.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        this.wallU.setPosition(0, this.cameras.main.centerY - 100);
        this.physics.add.existing(this.wallU);
        this.wallU.body.setSize(this.cameras.main.width, 10);
        this.wallU.body.setAllowGravity(false).setImmovable(true);
        this.wallU.setVisible(false);

        //------Pared Abajo:
        this.wallD = this.add.graphics();
        this.wallD.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        this.wallD.setPosition(0, this.cameras.main.height - 10);
        this.physics.add.existing(this.wallD);
        this.wallD.body.setSize(this.cameras.main.width, 10);
        this.wallD.body.setAllowGravity(false).setImmovable(true);
        this.wallD.setVisible(false);

        //------Zona Bolas Arriba:        
        this.ballZone = this.add.zone(this.cameras.main.centerX - 70, this.cameras.main.centerY - 100, 10, 500);
        this.physics.world.enable(this.ballZone);
        this.ballZone.body.setAllowGravity(false);
        this.ballZone.body.setImmovable(true);
        this.ballZone.setOrigin(0, 0);
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
        this.updateTexts();
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
        this.tweens.add({ // Transicion final.
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
}