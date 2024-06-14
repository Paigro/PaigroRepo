import Player from "./player.js";
import Fire from "./fire.js";
import Ring from "./ring.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });

        this.ringsPoolSize = 10; // Como de grande es la pool de aros de fuego.
    }

    init(data) {
        this.goal = data.difficulty;
        if (data.highScore == null) { // Por si acaso si llega mal la highscore del Menu lo seteamos aqui a 0.
            this.highScore = 0;
            //this.highScore = sessionStorage.getItem('highScoreData');
        }
        else {
            this.highScore = sessionStorage.getItem('highScoreData');

            //this.highScore = data.highScore; // Sino, la guardamos
        }
    }

    create() {
        //------CONTROL DE JUEGO:
        this.endGame = false;
        this.score = this.goal * 100;
        this.endCreate = false;
        this.cheatSpawn = false;
        //------SONIDOS:
        this.stageMusic = this.sound.add('stageMusic');
        this.failureMusic = this.sound.add('failureMusic');
        this.finalSound = this.sound.add('finalSound');
        this.scoreSound = this.sound.add('scoreSound');
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        this.stageMusic.play({ volume: 0.1, loop: true }); // Sonido del juego.
        //------LIMITES IZQUIERDO E INFERIOR:
        this.createLimits();
        //------FONDOS:
        this.backgrounds = [];      // Array de fondos
        this.leftBackground = 0;    // Fondo de la izquieda
        this.rightBackground = 3;   // Fondo de la derecha
        for (let i = 1; i <= 4; i++) {
            // Calcula la posicion x
            let x = 0;
            // x es 0 si el fondo que se esta creando es 0, si no se hace el if
            if (i - 1 > 0) {
                x = this.backgrounds[i - 2].x + this.backgrounds[i - 2].width;  // como i-1 es el fondo que estamos creando, cogemos la posicion x del i-2 que es el anterior, 
                //y le sumamos el ancho de una imagen, para ver la posicion x del actual
            }

            // si i es par entonces se coloca el fondo 2, si no el fondo 1
            if (i % 2 === 0) {
                const background = (this.add.image(x, this.cameras.main.height, 'background2').setOrigin(0, 1));
                this.backgrounds.push(background); // añade el background al array
            } else {
                const background = (this.add.image(x, this.cameras.main.height, 'background1').setOrigin(0, 1));
                this.backgrounds.push(background); // añade el background al array
            }
            // -----actualizacion de posiciones de los fondos en el update-----
        }
        //------MARCAS DE DISTANCIA:
        for (let i = 0; i <= this.goal; i += 10) {
            let mark = this.add.graphics(); // Grafico de marca.
            // Configurar las propiedades del objeto mark.
            mark.fillStyle(0x000000, 1); // Relleno negro con opacidad 1.
            mark.fillRect(0, 0, 100, 50); // Rectangulo en la posiciOn (0, 0) y size 100*50.
            mark.lineStyle(4, 0xFF0000, 1); // LInea roja con grosor 4 y opacidad 1.
            mark.strokeRect(0, 0, 100, 50); // Contorno del rectángulo en la posición (0, 0) con tamaño 100*50.
            mark.setPosition(80 * i, this.cameras.main.height - 100); // setea la posicion.

            // Poner el texto:
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 125, this.goal - i + "M", {
                fontSize: '20px',
                color: 'red',
                fontFamily: 'arcade_classic',

            }).setOrigin(0, 0).setPosition(80 * i + 5, this.cameras.main.height - 95);
        }
        //------TEXTOS:
        this.highscoreText = this.add.text(this.cameras.main.centerX, 40, "HIGHSCORE: " + this.highScore, { // Texto para llevar la cuenta del fuel que lleva el jugador.
            fontSize: 25, // Como de grande es el texto.
            fill: 'red', // Relleno.
            fontFamily: 'arcade_classic', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(3);
        this.scoreText = this.add.text(this.cameras.main.centerX, 70, "SCORE: " + this.score, { // Texto para llevar la cuenta del fuel que lleva el jugador.
            fontSize: 25, // Como de grande es el texto.
            fill: 'white', // Relleno.
            fontFamily: 'arcade_classic', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(3);
        this.finalText = this.add.text(this.cameras.main.worldView.right + this.cameras.main.centerX, this.cameras.main.worldView.height + this.cameras.main.centerY, "", { // Texto final de derrota o victoria.
            fontSize: 70, // Como de grande es el texto.
            fill: '#fff', // Relleno.
            fontFamily: 'arcade_classic', // Fuente del texto.

        }).setOrigin(0.5, 0.5).setVisible(false).setDepth(3);
        //------POOL DE AROS:
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
            delay: 3500, // 3.5 segundos.
            callback: () => {
                if (!this.cheatSpawn) {
                    if (!this.endGame) {
                        this.spawnRings(this.cameras.main.worldView.right + 20, this.cameras.main.height - 340) // Generamos los aros.
                    }
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        //------ARRAY DE FUEGOS
        this.fires = [];
        //------JUGADOR QUE SEA SEGUIDO POR LA CAMARA:
        this.player = new Player(this, 50, this.cameras.main.height - 260);
        this.camera = this.cameras.main.startFollow(this.player, true, 1, 0, -460, 120,);
        //------PUNTO FINAL:
        this.stage = this.add.sprite(((this.goal * 800) / 10) + 40, this.cameras.main.height - 120, 'platform').setScale(3.5, 3.5).setOrigin(0, 1);
        this.physics.add.existing(this.stage);
        this.stage.body.setImmovable(true).setAllowGravity(false).setSize(37, 30);
        //------COLISIONES:
        this.physics.add.collider(this.player, this.wall) // Metemos la colision entre el jugador y el suelo. this.wall ya existe porque se hace al principio del create al llamar a createlimits().
        this.physics.add.collider(this.player, this.floor, () => { // Metemos la colision entre el jugador y el suelo.
            this.player.jumpFinished(); // Para que el jugador sepa que ya puede volver a saltar.
        });
        this.physics.add.collider(this.player, this.ringsPool, (player, ring) => { // Colision jugador con aro.
            this.playerRingCollision(player, ring);
        })
        this.physics.add.collider(this.player, this.fires, (player, fire) => { // Colision jugador con fuego.
            this.playerFireCollsion(player, fire);
        })
        this.physics.add.collider(this.player, this.stage, (player, stage) => { // Colision jugador con plataforma.
            this.playerStageCollision();
        })
        //------PUNTUACION DESCENDENTE.
        this.time.addEvent({
            delay: 1000, // 1 segundo.
            callback: () => {
                if (!this.endGame) {
                    /*if (this.score > 0) { this.score -= 50; }*/ // Me la pela que aparezca puntuacion negativa o no.
                    this.score -= 50;
                    this.scoreText.setText("SCORE: " + this.score);
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        //------FUEGOS:
        this.spawnFires();
        //------RECTANGULO FINAL:
        this.rect = this.add.graphics();
        this.rect.fillStyle(0x000000).fillRect(0, 0, this.cameras.main.width, this.cameras.main.height).setDepth(2).setAlpha(0);
        this.endCreate = true;
        //------CHEAT KEYS:
        this.cheatKeys = this.input.keyboard.addKeys({
            V: Phaser.Input.Keyboard.KeyCodes.V,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            W: Phaser.Input.Keyboard.KeyCodes.W
        });


        //------COSITAS:
        //this.physics.moveToObject(gameObject, destination, [speed], [maxTime]); // Para hacer que un objeto siga a otro.
        //this.cameras.main.setFollowOffset(-462, 1000); // Tambien esta este metodo para el offset de algo que quiere seguir a otra cosa.


    }

    update(time, delta) {
        if (this.endCreate) {
            this.torosDelFondo();
            this.updateTextsPos();
            this.checkCheatKeys();
            //this.checkCollisions();
        }
        //console.log("x: " + this.finalText.x + "/y: " + this.finalText.y);
    }

    torosDelFondo() { // Movimiento del fondo hecho por Andres.
        // si la posicion mas a la izquierda que ve la camara es mayor o igual que la posicion x del fondo mas a la izquierda + el ancho de un fondo.
        // (es decir, el fondo de mas a la izquierda se sale de pantalla) el fondo de la izquierda se pone a la derecha
        if (this.cameras.main.worldView.left >= this.backgrounds[this.leftBackground].x + this.backgrounds[this.leftBackground].width) {

            // Pone el fondo de la izquierda a la derecha del fondo mas a la derecha
            this.backgrounds[this.leftBackground].x = this.backgrounds[this.rightBackground].x + this.backgrounds[this.leftBackground].width;

            // Actualizacion del fondo de la derecha e izquierda
            this.leftBackground++;
            this.rightBackground++;

            //Si los indices se salen de los limites se resetean
            if (this.leftBackground >= this.backgrounds.length) {
                this.leftBackground = 0;
            } if (this.rightBackground >= this.backgrounds.length) {
                this.rightBackground = 0;
            }
        }

        // si la posicion mas a la izquierda que ve la camara es menor que la posicion x del fondo mas a la izquierda.
        // (es decir, el limite del fondo de la izquierda se ve en pantalla) el fondo de la derecha se pone a la izquierda
        if (this.cameras.main.worldView.left < this.backgrounds[this.leftBackground].x) {

            // Pone el fondo de la derecha a la izquierda del fondo mas a la izquierda
            this.backgrounds[this.rightBackground].x = this.backgrounds[this.leftBackground].x - this.backgrounds[this.leftBackground].width;

            // Actualizacion del fondo de la derecha e izquierda
            this.rightBackground--;
            this.leftBackground--;

            //Si los indices se salen de los limites se resetean
            if (this.rightBackground < 0) {
                this.rightBackground = this.backgrounds.length - 1;
            } if (this.leftBackground < 0) {
                this.leftBackground = this.backgrounds.length - 1;
            }
        }
    }

    createLimits() { // Crea los limites izquierdo e inferior de la partida.
        //------Por graphic:
        this.floor = this.add.graphics(); // Cremos el graphic.
        this.floor.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2); // Le asignamos propiedades.
        this.floor.setPosition(0, this.cameras.main.height - 120) // Lo ponemos en la posicion adecuada.
        this.physics.add.existing(this.floor); // Ponemos las fisicas.
        this.floor.body.setSize(((this.goal * 800) / 10) + 200, 120); // Cambiamos como de grande es dependiendo del nivel que sea.
        this.floor.body.setAllowGravity(false).setImmovable(true); // Le quitamos la gravedad y que sea afectado por las colisiones de otros objetos.
        this.floor.setVisible(false); // Lo hacemos invisible.
        //------ por sprite:
        /*this.floorGraphic = this.add.graphics(); // Hacemos el graphic que usaremos como textura
        this.floorGraphic.fillStyle(0xFF6600).generateTexture('floorTexture', this.cameras.main.width, 120); // Creamos la textura.
        this.floor = this.add.sprite(0, this.cameras.main.height, 'floorTexture').setDepth(3).setOrigin(0, 1); // Creamos el sprite que usaremos como suelo y le ponemos la nueva textura.
        this.physics.add.existing(this.floor); // Le ponemos fisicas al suelo.
        this.floor.body.setAllowGravity(false).setImmovable(true); // Desactivamos la gravedad y su movilidad para que el jugador no lo mueva.*/
        //------Lo mismo pero con la pared:
        this.wall = this.add.graphics();
        this.wall.fillStyle(0xFF6600).fillRect(0, 0, this.cameras.main.width, 120).setDepth(2);
        this.physics.add.existing(this.wall);
        this.wall.body.setSize(10, this.cameras.main.height);
        this.wall.body.setAllowGravity(false).setImmovable(true)//setCollideWorldBounds(true);
        this.wall.setVisible(false);
    }

    spawnFires() { // Spawnea fuegos dependiendo del nivel cada cierta distancias tras pasar 30 metros.
        for (let i = 0; i < (this.goal - 20) / 10; i++) { // Metemos los fuegos necesarios dependiendo del nivel.
            let fire = new Fire(this, 1600 + (800 * (i + 1)), this.cameras.main.height - 170); // Empiezan a los 30 metros y depues cada 10.
            //console.log(800 * (3 * (i + 1))) // Antigua cuenta que no funciona.
            //console.log(1600 + (800 * (i + 1)))
            //console.log((this.goal - 20) / 10)
            this.fires[i] = fire; // Los metemos en el array de fuegos.
        }
    }

    spawnRings(x, y) { // Spawnea aros de fuego en la posicion recibida.
        let ring = this.ringsPool.get(); // Como el resto de pools que he hecho.
        if (ring) {
            ring.activate(x, y);
        }
    }

    playerRingCollision(player, ring) { // Colision jugador con los aros de fuego.
        this.defeat();
    }

    playerFireCollsion(player, fire) { // Colision jugador con los fuegos.
        this.defeat();
    }

    playerStageCollision() { // Colision jugador con plataforma final.
        this.victory();
    }

    updateTextsPos() { // Actualizamos constantemente la x de los textos a medida que se mueva la camara para que se vean siempre.
        this.highscoreText.x = this.cameras.main.worldView.right - this.cameras.main.centerX;
        this.scoreText.x = this.cameras.main.worldView.right - this.cameras.main.centerX;
    }

    stopRings() { // Recorre todos los aros de fuego de la pool para que paren su movimiento.
        this.ringsPool.children.each((child) => { // Foreach que recorre todos los hijos del grupo y que usamos para que todos se paren y no se sigan moviendo.
            child.stop();
        }, this);
    }

    victory() { // Para la victoria.
        this.endGame = true;
        this.stopRings(); // Paramos todos los aros.
        this.player.victory(); // Para que se hagan las correspondientes animaciones.
        this.endText("VICTORY", 'yellow'); // Actualizamos el texto final con victoria.
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        this.finalSound.play({ volume: 0.1, loop: true }); // Sonido de victoria.
        this.rect.setX(this.cameras.main.worldView.left); // Ponemos el rect en posicion.
        this.tweens.add({ // Transicion del alpha del rect.
            targets: this.rect,
            alpha: 1,
            duration: 4000,
            ease: 'power1',
            repeat: 0,
            onComplete: () => {
                this.exitMenu(); // Volvemos al menu, antes de ello compara los scores y ejecuta la animacion si debe.
            }
        });
    }

    defeat() { // Para la derrota.
        this.endGame = true;
        this.stopRings(); // Paramos todos los aros.
        this.player.die(); // Para que se hagan las correspondientes animaciones.
        this.endText("DEFEAT", 'red'); // Actualizamos el texto final con derrota.
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        this.failureMusic.play({ volume: 0.1, loop: true }); // Sonido de derrota.
        this.rect.setX(this.cameras.main.worldView.left); // Ponemos el rect en posicion.
        this.tweens.add({ // Transicion del alpha del rect.
            targets: this.rect,
            alpha: 1,
            duration: 4000,
            ease: 'power1',
            repeat: 0,
            onComplete: () => {
                this.scene.start("Menu", { highScore: this.highScoreData }); // Se vuelve al Menu mandando el highscore.
            }
        });
    }

    endText(text, strokeColor) { // Actualiza el texto final, su posicion y su visibilidad.
        this.finalText.setText("" + text).setVisible(true).setStroke(strokeColor, 15).setX(this.cameras.main.worldView.right - this.cameras.main.centerX); // Actualizamos el texto final dependiendo de si se ha ganado o perdido.
    }

    scoreAnimation() { // Animacion wapa wapa de puntuacion final.
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        this.scoreSound.play({ volume: 0.1, loop: true }); // Sonido del juego.
        this.time.addEvent({
            delay: 10, // 10 algos.
            callback: () => {
                this.scoreText.setText("SCORE: " + this.score); // Actualizamos el texto del score.
                this.highscoreText.setText("HIGHSCORE: " + this.highScore) // Actualizamos el texto de highscore.
                if (this.score > 0) {
                    this.score -= 10; // Bajamos la score de 10 en 10.
                    this.highScore += 10; // Subimos la highscore de 10 en 10.
                }
                else {
                    this.scene.start("Menu", { highScore: this.highScore }); // Se vuelve al Menu mandando el highscore.
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
    }

    exitMenu() { // Para salir al menu.
        if (this.score > this.highScore) { // Si la puntuacion de esta partida es mayor a la guardada en el highscore esta se actualiza y llama a la animacion to wapa wapa.
            this.highScoreData = this.score;
            this.highScore = 0;
            this.highscoreText.setText("HIGHSCORE: " + this.highScore) // Actualizamos el texto de highscore.
            sessionStorage.setItem('highScoreData', this.highScoreData);
            this.scoreAnimation();
        }
        else {
            this.scene.start("Menu", { highScore: this.highScoreData }); // Se vuelve al Menu mandando el highscore.
        }
    }

    checkCheatKeys() { // Truquitos.
        if (Phaser.Input.Keyboard.JustUp(this.cheatKeys.V)) { // Cheat velocidad jugador.
            console.log("Cheat: velocidad.");
            this.player.cheatVelocidad();
        }
        else if (Phaser.Input.Keyboard.JustUp(this.cheatKeys.S)) { // Cheat spawn aros.
            console.log("Cheat: quitar spawns.");
            this.cheatSpawn = true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.cheatKeys.W)) { // Cheat spawn aros.
            console.log("Cheat: ganar.");
            this.victory();
        }
    }
}