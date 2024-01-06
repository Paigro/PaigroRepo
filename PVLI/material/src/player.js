export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y,); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.body.setSize(17, 24);
        //this.scene.add.existing(this); // Lo metemos en la escena.

        this.movible = true;
        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(); // Setear las teclas.
        this.speed = 60; // Velocidad del jugador.

        this.playerSprite = scene.add.sprite(0, 0, 'player').setOrigin(0, 0);
        this.add([this.playerSprite]);
        scene.add.existing(this)
        this.playerSprite.anims.play('playerIdle', true);
    }

    init() {

    }

    preUpdate(t, dt) {
        if (this.movible) {
            this.move();
            this.checkBounds();
        }
        /*if (!this.canShoot) {
            this.shootTimer += dt / 1000;
        }
        if (this.shootTimer >= this.shootTime) {
            this.canShoot = true;
        }*/
    }

    update() {
        console.log("buenos dias");
    }

    move() {


        if (this.keys.up.isDown) { // Movimiento arriba.
            this.body.setVelocityY(-this.speed);
        }

        if (this.keys.right.isDown) { // Movimiento derecha.
            this.body.setVelocityX(this.speed);
            this.playerSprite.setFlip(false); // Poner el jugador flipeado en la posicion normal.
        }
        else if (this.keys.left.isDown) { // Movimiento izquierda.
            this.body.setVelocityX(-this.speed);
            this.playerSprite.setFlip(true); // Flipear al jugador.
        }
        if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left) /*&& !this.keys.up.isDown*/) {
            this.body.setVelocity(0);
        }

        this.animations(); // Llamamos para actualizar la animacion.

    }

    playerKeys() {
        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        });
    }

    animations() {
        if (this.body.velocity.y >= 0) {
            if (this.body.velocity.x < 0) {
                this.playerSprite.anims.play('playerWalk', true);
            }
            else if (this.body.velocity.x > 0) {
                this.playerSprite.anims.play('playerWalk', true);
            }
            else {
                this.playerSprite.anims.play('playerIdle', true);
            }
        }
        else {
            this.playerSprite.anims.play('playerFlight'); // No funciona bien.
        }
    }

    checkBounds() {
        if (this.x >= this.scene.cameras.main.width) {
            this.x = 0;
        }
        else if (this.x <= 0) {
            this.x = this.scene.cameras.main.width;
        }
    }

    shoot() {
        /*//console.log("Pium pium.");
 
         if (this.playerNumber === 1) {
             this.anims.play('twinshoot', true);
             // Temporizador para detener la animación después de 3 segundos
             this.scene.time.delayedCall(1000, () => {
                 this.anims.play('twinstraight');
             }, [], this);
         }
         else {
             this.anims.play('winshoot', true);
         }
 
         if (this.shootLevel === 1) {
             this.scene.shoot(this.x, this.y, 0);
         }
         else if (this.shootLevel === 2) {
             this.scene.shoot(this.x - 4, this.y, -1.5);
             this.scene.shoot(this.x + 4, this.y, 1.5);
         }
         else if (this.shootLevel === 3) {
             this.scene.shoot(this.x - 8, this.y, -4);
             this.scene.shoot(this.x - 4, this.y, -1.5);
             this.scene.shoot(this.x + 4, this.y, 1.5);
             this.scene.shoot(this.x + 8, this.y, 4);
         }*/
    }

    upgradeShoot() {
        //console.log("Upgrade shoot.");
        /*if (this.shootLevel <= this.maxUpgrades) {
            this.shootLevel++;
        }
        else if (this.shootLevel > this.maxUpgrades && this.shootTime >= 0.4) {
            this.shootTime -= 0.2;
            //console.log(this.shootTime);
        }*/
    }

    goAway() {
        /*this.body.setCollideWorldBounds(false);
        this.scene.tweens.add({
            targets: this,
            y: -100,
            duration: 3000,
            ease: 'Power1',
            repeat: 0
        });*/
    }

    stop() {
        //console.log("Stop player.");
        this.body.setVelocityY(0).setVelocityX(0);
        this.movible = false;
    }
}