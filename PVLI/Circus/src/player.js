export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y,); // Llamada a la constructora padre.

        scene.physics.add.existing(this);
        //this.body.enable = false;
        //this.body.allowGravity = false;
        this.body.setSize(36 * 3.5, 16 * 3.5);

        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(); // Setear las teclas.
        this.ySpeed = 400; // Velocidad del jugador.
        this.xSpeed = 200;
        this.isJumping = false;

        this.lionSprite = scene.add.sprite(0, 0, 'lion').setOrigin(0, 0).setScale(3.5, 3.5); // Guardamos el sprite del leon.
        this.clownSprite = scene.add.sprite(18, 24, 'clown').setOrigin(0.5, 1).setScale(3.5, 3.5); // Guardamos el sprite del payaso.
        this.add([this.lionSprite, this.clownSprite]); // Metemos al contenedor el sprite del payaso.
        // Metemos las fisicas al leon y al payaso para que tengan sus propios colliders y les quitamos la gravedad para que no se caigan:
        scene.physics.add.existing(this.clownSprite);
        this.clownSprite.body.allowGravity = false;

        scene.add.existing(this); // Metemos el contenedor en la escena.
        //this.playerSprite.anims.play('playerIdle', true);
    }

    preUpdate(t, dt) {
        this.move();
        //this.checkBounds();
        /*if (this.body.velocity.y < 0 || this.body.velocity.y > 0) {
            this.isJumping = true;
        }
        else {
            this.isJumping = false;
        }

        if (!this.isJumping) {
            this.body.setVelocityX(0);
        }*/
    }

    playerKeys() {
        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        });
    }

    move() {
        if (!this.isJumping) {
            if (this.keys.up.isDown) { // Movimiento arriba.
                this.body.setVelocityY(-this.ySpeed);
                this.isJumping = true;
            }

            if (this.keys.right.isDown) { // Movimiento derecha.
                this.body.setVelocityX(this.xSpeed);
            }
            else if (this.keys.left.isDown) { // Movimiento izquierda.
                this.body.setVelocityX(-this.xSpeed);
            }

            if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left)) {
                this.body.setVelocityX(0);
            }
        }


        //this.animations(); // Llamamos para actualizar la animacion.

    }

    /*animations() {
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
        if (this.x > this.scene.cameras.main.width - 2) {
            this.x = -10;
        }
        else if (this.x < -10) {
            this.x = this.scene.cameras.main.width - 2;
        }
    }

    addFuel() {
        this.fuelSprite = this.scene.add.sprite(0, -10, 'fuel').setOrigin(0, 0);
        this.add([this.fuelSprite]);
    }

    removeFuel() {
        this.remove(this.fuelSprite);
    }

    die() {
        this.setActive(false).setVisible(false).setPosition(-100, -100);
        this.body.setVelocityY(0).setVelocityX(0);
        this.body.allowGravitY = false;
        this.scene.defeat();
    }*/

    jumpFinished() {
        this.isJumping = false;
    }
}