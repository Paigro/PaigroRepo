import Player from "./player.js";
import Fuel from "./fuel.js";
import Ship from "./ship.js";
import Meteor from "./meteor.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });

        this.meteorsPoolSize = 10;
    }

    init(data) {
        this.timeToMeteor = data.timeToMeteor; // Guardamos el tiempo entre meteoritos.
        this.fuelNeedded = data.fuelNeedded; // Guardamos el fuel necesario para superar el nivel.
        this.sound.stopAll(); // Quitamos el resto de sonidos.
    }

    create() {
        // LOGS INICIALES:
        console.log("Fuel necesario: " + this.fuelNeedded);
        console.log("Meteroritos time: " + this.timeToMeteor);
        // TILEMAP:
        const map = this.make.tilemap({ key: 'map' }); // Creacion del tilemap.
        const tileset = map.addTilesetImage('ground_ts', 'tileset'); // Metemos el tileset (lo primero mirar en el json, lo segundo la imagen del tileset).
        const groundLayer = map.createLayer('ground', tileset, 0, 0); // Se pueden meter layers, metemos la del suelo.
        // OBJETOS:
        this.player = new Player(this, this.cameras.main.centerX, this.cameras.main.height - 32) // Metemos el jugador
        this.fuel = new Fuel(this, 100, 100).setActive(false).setVisible(false); // Metemos el fuel.
        this.ship = new Ship(this, this.cameras.main.centerX + 20, this.cameras.main.height - 8, this.fuelNeedded) // Metemos la nave.


        /*
        Cosas que podrian servir:
        this.physics.world.setBounds(0, 0, 256, 192);
        worldLayer.setCollisionByProperty({ collides: true }); // Colision por propiedades de los tiles.
        this.physics.world.wrap(this.player, 0); // 16 es el margen opcional para evitar rebotes inmediatos al envolver. No parece funcionar.
        this.miSonido.play({ volume: 0.5, loop: true }); // También puedes configurar opciones como volumen, bucle, etc.
        */


        // CHEAT KEYS:
        /*this.cheatKeys = this.input.keyboard.addKeys({
            C: Phaser.Input.Keyboard.KeyCodes.C,
            P: Phaser.Input.Keyboard.KeyCodes.P,
            U: Phaser.Input.Keyboard.KeyCodes.U
        });*/
        // CONTROL DEL JUEGO:
        this.fuelActive = false; // Para saber si hay fuel activo (en el suelo o con el jugador).
        this.playerHasFuel = false; // Para comprobar la posesion de fuel del jugador.
        this.endGame = false; // Para controlar la victoria.
        // SONIDOS:
        this.dropSound = this.sound.add('dropSound'); // Metemos el sonido de recargar la nave.
        this.explosionSound = this.sound.add('explosionSound'); // Metemos el sonido de la explosion del metrorito.
        this.loseSound = this.sound.add('loseSound'); // Metemos el sonido de perder.
        this.pickSound = this.sound.add('pickSound'); // Metemos el sonido de coger objetos.
        this.winSound = this.sound.add('winSound'); // Metemos el sonido de victoria
        // TEXTOS:
        this.countText = this.add.text(this.ship.x + 30, this.ship.y - 40, this.ship.actualFuel + "/" + this.fuelNeedded, { // Texto para llevar la cuenta del fuel que lleva el jugador.
            fontSize: 10, // Como de grande es el texto.
            fill: '#fff', // Relleno.
            fontFamily: 'Pixeled', // Fuente del texto.
        }).setOrigin(0.5, 0.5).setDepth(2);
        this.finalText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "", { // Texto final de derrota o victoria.
            fontSize: 25, // Como de grande es el texto.
            fill: '#fff', // Relleno.
            fontFamily: 'Pixeled', // Fuente del texto.

        }).setOrigin(0.5, 0.5).setVisible(false).setDepth(3);
        // METEORS
        this.meteorsPool = this.physics.add.group({ // Pool de enemigos.
            classType: Meteor,
            maxSize: this.meteorsPoolSize,
        });
        for (let i = 0; i < this.meteorsPool; i++) {
            let meteor = this.meteorsPool.get(this, 0, 0);
            meteor.setActive(false).setVisible(false);
        }
        this.time.addEvent({
            delay: this.timeToMeteor * 1000, // 1 segundo.
            callback: () => {
                if (!this.endGame) {
                    this.spawnMeteor(Phaser.Math.Between(16, this.cameras.main.width - 16), -16) // Generamos los meteoritos.
                }
            },
            callbackScope: this,
            loop: true // Para que se haga continuamente.
        });
        // COLISIONES:
        groundLayer.setCollisionBetween(0, 3); // Metemos la colision de los tiles para que el jugador choque con ellos.
        this.physics.add.collider(this.player, groundLayer); // Metemos la colision del jugador con los tiles del suelo.
        this.physics.add.collider(this.fuel, groundLayer); // Metemos la colision del fuel con los tiles del suelo.
        this.physics.add.collider(this.player, this.fuel, () => this.playerFuelCollision()); // Colision entre jugador y fuel.
        this.physics.add.collider(this.meteorsPool, groundLayer, (meteor) => this.meteorGroundCollision(meteor))
        this.physics.add.collider(this.player, this.meteorsPool, (player, meteor) =>
            this.playerMeteorsCollision(player, meteor)

        );
        this.physics.add.overlap(this.player, this.ship, () => { // Comprobar que el jugador interactua con el trigger de la nave.
            this.playerShipCollision();
        });
        // RECTANGULO FINAL:
        this.rect = this.add.graphics();
        this.rect.fillStyle(0x000000).fillRect(0, 0, this.cameras.main.width, this.cameras.main.height).setDepth(2).setAlpha(0);
    }

    update(time, delta) {
        if (!this.fuelActive) { // Solo si no hay fuel en la escena activo (en el suelo o con el jugador) generamos otro.
            this.spawnFuel();
        }
        //this.checkCheatKeys();
    }

    spawnFuel() {
        this.fuel.appear(); // Hacemos que aparezca un fuel.
        this.fuelActive = true; // Ponemos que hay un fuel activo en la escena.
    }

    spawnMeteor(x, y) {
        let meteor = this.meteorsPool.get();
        if (meteor) {
            meteor.activate(x, y);
        }
    }

    playerFuelCollision() {
        this.player.addFuel(); // LE ponemos el fuel al contenedor del jugador.
        this.fuel.disappear(); // Hacemos que el fuel desaparezca.
        this.playerHasFuel = true; // Actualizamos la posesion de fuel del jugador.
        this.pickSound.play({ volume: 0.2, loop: false }); // Sonido de coger cosas.
    }

    playerShipCollision() {
        if (this.playerHasFuel) {
            this.ship.addFuel(); // Le ponemos fuel a la nave.
            this.player.removeFuel(); // Quitamos el fuel del contenedor del jugador.
            this.fuelActive = false; // Decimos que ya no hay fuel activo.
            this.spawnFuel(); // Generamos otro fuel.
            this.dropSound.play({ volume: 0.3, loop: false }); // Sonido de caer.
            this.playerHasFuel = false; // Actualizamos la posesion de fuel del jugador.
            this.countText.setText(this.ship.actualFuel + "/" + this.fuelNeedded); // Actualizamos el texto contador.
        }
    }

    playerMeteorsCollision(player, meteor) {
        player.die()
        meteor.explode()
        this.explosionSound.play({ volume: 0.2, loop: false }); // Sonido de explosion.
    }

    meteorGroundCollision(meteor) {
        meteor.explode();
        this.explosionSound.play({ volume: 0.2, loop: false }); // Sonido de explosion.
    }

    win() {
        if (!this.endGame) { // Para que solo se haga 1 vez.
            this.winSound.play({ volume: 0.2, loop: false }); // Sonido de victoria.
        }
        this.endGame = true;
        this.endText("VICTORY", 'green');
        this.tweens.add({ // Hacer que la nave se vaya cuando se complete el objetivo.
            targets: this.ship,
            scaleX: 0.4,
            scaleY: 0.4,
            y: -200,
            duration: 4000,
            ease: 'linear',
            repeat: 0,
            onComplete: () => {
                this.exitMenu();
            }
        });
    }

    defeat() {
        if (!this.endGame) { // Para que solo se haga 1 vez.
            this.loseSound.play({ volume: 0.2, loop: false }); // Sonido de derrota.
        }
        this.endGame = true;
        this.endText("DEFEAT", 'red');
        this.tweens.add({ // Transicion de derrota.
            targets: this.rect,
            alpha: 1,
            duration: 4000,
            ease: 'power1',
            repeat: 0,
            onComplete: () => {
                this.exitMenu();
            }
        });
    }

    endText(text, strokeColor) {
        this.finalText.setText("" + text).setVisible(true).setStroke(strokeColor, 5); // Actualizamos el texto final dependiendo de si se ha ganado o perdido.
        this.countText.setVisible(false); // Quitamos el texto que lleva la cuenta del fuel.
    }

    exitMenu() {
        this.scene.start("Menu"); // Volvemos al menu.
    }

    /*checkCheatKeys() {
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