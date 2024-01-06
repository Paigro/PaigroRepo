export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.
        this.body.setCollideWorldBounds(); // Para que no salga de los limites del mundo.
        //this.body.setSize(16, 16, true); // Para que la caja de colision sea igual al sprite.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.movible = true;
        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(); // Setear las teclas.
        this.speed = 60; // Velocidad del jugador.





    }

    init() {

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.movible) {
            this.move();
        }
        /*if (!this.canShoot) {
            this.shootTimer += dt / 1000;
        }
        if (this.shootTimer >= this.shootTime) {
            this.canShoot = true;
        }*/
    }

    move() {


        if (this.keys.up.isDown) { // Movimiento arriba.
            this.body.setVelocityY(-this.speed);
        }

        if (this.keys.right.isDown) { // Movimiento derecha.
            this.body.setVelocityX(this.speed);
        }
        else if (this.keys.left.isDown) { // Movimiento izquierda.
            this.body.setVelocityX(-this.speed);
        }
        if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left)) {
            this.body.setVelocity(0);
        }

        /* this.animations(); // Llamamos para actualizar la animacion.*/

    }

    playerKeys() {
        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            left: Phaser.Input.Keyboard.KeyCodes.A,
        });
    }

    animations() {
        /*// Animaciones del twinbee:
        if (this.playerNumber === 1) {
            if (this.body.velocity.x < 0) {
                this.anims.play('twinleft', true);
            }
            else if (this.body.velocity.x > 0) {
                this.anims.play('twinright', true);
            }
            else {
                this.anims.play('twinstraight', true);
            }
        }
        // Animaciones del winbee:
        else {
            if (this.body.velocity.x < 0) {
                this.anims.play('winleft', true);
            }
            else if (this.body.velocity.x > 0) {
                this.anims.play('winright', true);
            }
            else {
                this.anims.play('winstraight', true);
            }
        }*/
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