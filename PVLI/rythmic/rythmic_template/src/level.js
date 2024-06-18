import Player from "./player.js";
import Ball from "./ball.js";
import Enemy from "./enemy.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });

        this.timeLeft = 90;
    }

    init(data) {
        this.diff = data.diff;
    }

    create() {
        //------CONTROL DE JUEGO:
        this.end = false;
        this.nEnemies = 4;
        //------SONIDOS:
        this.forestSound = this.sound.add('forest'); // Metemos el sonido de bosques.
        this.forestSound.play({ volume: 0.2, loop: true }); // Sonido de bosque.
        //------IMAGENES:
        this.background = this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(0); // Fondo.
        this.heart = this.add.image(this.cameras.main.width - 40, 40, 'heart').setOrigin(0, 1).setDepth(1).setScale(0.6, 0.6); // Corazones.
        //------SCORES DE LOS JUGADORES:
        this.scorePenguin = 0;
        this.scoreRat = 0;
        //------POOL DE ENEMIGOS:
        this.buttonsPool = [];
        //------LIMITES DERECHO E IZQUIERDO:
        this.createZones();
        //------PLAYERS:
        this.players = [];
        this.player = new Player(this, 700, this.cameras.main.centerY);
        // Lo metemo al array.
        this.players[0] = this.player;
        //------POOL DE BOLAS:
        this.energyPool = [];
        //------POOL DE ENEMIGOS:
        this.enemiesPool = [];
        this.createEnemies();
        //------TEXTOS:
        // Texto para las vidas.
        this.livesText = this.add.text(this.cameras.main.width - 40, 40, this.playerLives, {
            fontSize: 25, // Como de grande es el texto.
            fill: '#f00', // Relleno.
            fontFamily: 'bitdragon', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(2);

        /*// Texto para llevar la cuenta del tiempo.
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
        });*/

        //----Textos finales del juego.
        // Testo que dice la puntuacion final de cada jugador.
        this.finalText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, " ", {
            fontSize: 40, // Como de grande es el texto.
            fill: '#fff', // Color de relleno
            stroke: '#fff', // Color de los bordes.
            strokeThickness: 4, // Como de grande es el borde.
            fontFamily: 'bitdragon', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(11).setVisible(false);
        // Texto que dice
        this.lostWinText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, " ", {
            fontSize: 60, // Como de grande es el texto.
            fill: '#f00', // Color de relleno
            stroke: '#fff', // Color de los bordes.
            strokeThickness: 4, // Como de grande es el borde.
            fontFamily: 'bitdragon', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(11).setVisible(false);
        //------RECTANGULO FINAL:
        this.rect = this.add.graphics();
        this.rect.fillStyle(0x000000).fillRect(0, 0, this.cameras.main.width, this.cameras.main.height).setDepth(10).setAlpha(0);
        //------KEYS:
        this.keys = this.input.keyboard.addKeys({
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            F: Phaser.Input.Keyboard.KeyCodes.F,
            // NOTA: Lo he puesto en el escape para que justo al salir al menu no iniciase otra partida inmediatamente.
            esc: Phaser.Input.Keyboard.KeyCodes.ESC
        });
        //------FIN DEL CREATE:
        this.createEnd = true;
    }

    update(time, delta) {
        if (this.createEnd) {
            this.updateTexts();
            this.checkCollisions();
            this.checkKeys();
            this.chckEnemiesAreDead();
        }
    }

    createZones() {

        for (let i = 0; i < 4; i++) {
            let zone = this.add.sprite(300, 100 + 80 * i, 'area');
        }
        this.a = this.add.sprite(600, 100, 'a');
        this.s = this.add.sprite(600, 180, 's');
        this.d = this.add.sprite(600, 260, 'd');
        this.f = this.add.sprite(600, 340, 'f');

        this.buttonsPool.push(this.a);
        this.buttonsPool.push(this.s);
        this.buttonsPool.push(this.d);
        this.buttonsPool.push(this.f);

        this.physics.add.existing(this.a);
        this.physics.add.existing(this.s);
        this.physics.add.existing(this.d);
        this.physics.add.existing(this.f);


        //------Pared Derecha:
        this.wallR = this.add.graphics();
        this.wallR.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        this.wallR.setPosition(this.cameras.main.width - 120, 0);
        this.physics.add.existing(this.wallR);
        this.wallR.body.setSize(10, this.cameras.main.height);
        this.wallR.body.setAllowGravity(false).setImmovable(true);
        this.wallR.setVisible(false);
    }

    createEnemies() {
        for (let i = 0; i < this.nEnemies; i++) {
            let enemy = new Enemy(this, 40, 60 + 80 * i, i);
            this.enemiesPool.push(enemy);
        }
    }


    corchetes() { ; } // Por alguna razon no funcionan los corchetes ni punto y coma ni el igual y los parentesis se ponen mal a veces si ortas no
    // ===============


    shootEnergy(x, y, enemy) {

        let energy = new Ball(this, x, y, this.diff, enemy)
        this.energyPool.push(energy)
    }

    updateTexts() {
        // Actualizamos el texto de vidas.
        this.playerLives = this.player.getLives();
        this.livesText.setText(this.playerLives);
    }

    checkCollisions() {
        this.energyPool.forEach(energy => {
            // Verifica la colision la zona.
            const collision = this.physics.world.overlap(energy, this.wallR);
            if (collision) {
                if (!energy.gethasKilled()) {

                    energy.kill();
                    this.player.damage();
                }
            }
        });
    }

    checkKeys() {
        if (this.keys.A.isDown) {
            this.checkButtons();
            this.a.setScale(1.3, 1.3);
        }

        if (this.keys.S.isDown) {
            this.checkButtons();
            this.s.setScale(1.3, 1.3);
        }

        if (this.keys.D.isDown) {
            this.checkButtons();
            this.d.setScale(1.3, 1.3);
        }

        if (this.keys.F.isDown) {
            this.checkButtons();
            this.f.setScale(1.3, 1.3);
        }

        // Quitar la escala de los botones al levantar la tecla.
        if (this.keys.A.isUp) {
            this.a.setScale(1, 1);
        }

        if (this.keys.S.isUp) {
            this.s.setScale(1, 1);
        }

        if (this.keys.D.isUp) {
            this.d.setScale(1, 1);
        }

        if (this.keys.F.isUp) {
            this.f.setScale(1, 1);
        }

        if (this.end) {
            if (this.keys.esc.isDown) {
                this.scene.start("MenuP"); // Volvemos al menu.      
            }
        }

    }

    checkButtons() {
        this.energyPool.forEach(energy => {
            // Verifica la colision la zona.
            const collision = this.physics.world.overlap(energy, this.buttonsPool);
            if (collision) { // Si colisiona con la zona de arriba, paramos la bola y le pasamos la zona con la que ha colisionado (1).
                energy.damage();
            }
        });

    }

    damageEnemy(nEnemy) {
        this.enemiesPool[nEnemy].damage();
    }

    chckEnemiesAreDead() {
        let n = 0;
        for (let i = 0; i < this.nEnemies; i++) {
            if (this.enemiesPool[i].getIsDead()) {
                n++;
            }
        }
        if (n == this.nEnemies) {
            this.victory();
        }
    }

    victory() {
        this.lostWinText.setText("YOU WIN").setVisible(true);
        this.finalText.setText("MENU").setVisible(true);
        this.exitMenu();
    }

    defeat() {
        this.lostWinText.setText("YOU LOST").setVisible(true);
        this.finalText.setText("MENU").setVisible(true);
        this.exitMenu();
    }

    exitMenu() {
        this.energyPool.forEach(energy => {
            energy.destroyEntity()
        });
        this.enemiesPool.forEach(enemy => {
            enemy.destroy()
        });
        this.tweens.add({ // Transicion final.
            targets: this.rect,
            alpha: 1,
            duration: 4000,
            ease: 'power1',
            repeat: 0,
            onComplete: () => {
                this.end = true
            }
        });
    }
}