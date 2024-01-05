import Bullet from "./bullet.js";

export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, n) {
        super(scene, x, y, 'player' + n); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.
        this.body.setCollideWorldBounds(); // Para que no salga de los limites del mundo.
        this.body.setSize(16, 16, true); // Para que la caja de colision sea igual al sprite.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.movible = true;
        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(n); // Setear las teclas.
        this.speed = 60; // Velocidad del jugador.
        this.playerNumber = n; // Numero del jugador que corresponde.
        this.shootLevel = 1;
        this.shootTime = 1;
        this.shootTimer = 0;
        this.canShoot = false;
        this.maxUpgrades = 3;
    }

    init() {

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.movible) {
            this.move(t);
        }
        if (!this.canShoot) {
            this.shootTimer += dt / 1000;
        }
        if (this.shootTimer >= this.shootTime) {
            this.canShoot = true;
        }
    }

    move(t) {

        this.body.setVelocity(0);

        if (this.keys.up.isDown) { // Movimiento arriba.
            this.body.setVelocityY(-this.speed);
        }
        else if (this.keys.down.isDown) { // Movimiento abajo.
            this.body.setVelocityY(this.speed);
        }

        if (this.keys.right.isDown) { // Movimiento derecha.
            this.body.setVelocityX(this.speed);
        }
        else if (this.keys.left.isDown) { // Movimiento izquierda.
            this.body.setVelocityX(-this.speed);
        }

        if (this.keys.shoot.isDown && this.canShoot) { // Disparo
            this.shootTimer = 0;
            this.canShoot = false;
            this.shoot();
        }

        this.animations(); // Llamamos para actualizar la animacion.
    }

    playerKeys(player) {
        if (player === 1) {
            this.keys = this.scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                shoot: Phaser.Input.Keyboard.KeyCodes.SPACE
            });

        } else {
            this.keys = this.scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                shoot: Phaser.Input.Keyboard.KeyCodes.ENTER
            });
        }
    }

    animations() {
        // Animaciones del twinbee:
        if (this.playerNumber === 1) {
            if (this.body.velocity.x < 0) {
                this.anims.play('twinleft');
            }
            else if (this.body.velocity.x > 0) {
                this.anims.play('twinright');
            }
            else {
                this.anims.play('twinstraight');
            }
        }
        // Animaciones del winbee:
        else {
            if (this.body.velocity.x < 0) {
                this.anims.play('winleft');
            }
            else if (this.body.velocity.x > 0) {
                this.anims.play('winright');
            }
            else {
                this.anims.play('winstraight');
            }
        }
    }

    shoot() {
        //console.log("Pium pium.");

        if (this.playerNumber === 1) {
            this.anims.play('twinshoot');
        }
        else {
            this.anims.play('winshoot');
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
        }
    }

    upgradeShoot() {
        //console.log("Upgrade shoot.");
        if (this.shootLevel <= this.maxUpgrades) {
            this.shootLevel++;
        }
        else if (this.shootLevel > this.maxUpgrades && this.shootTime >= 0.4) {
            this.shootTime -= 0.2;
            //console.log(this.shootTime);
        }
    }

    goAway() {
        this.body.setCollideWorldBounds(false);
        this.scene.tweens.add({
            targets: this,
            y: -100,
            duration: 3000,
            ease: 'Power1',
            repeat: 0
        });
    }

    stop() {
        //console.log("Stop player.");
        this.body.setVelocityY(0).setVelocityX(0);
        this.movible = false;
    }
}