export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y,); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.body.setSize(17, 24);
        //this.scene.add.existing(this); // Lo metemos en la escena.

        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(); // Setear las teclas.
        this.speed = 60; // Velocidad del jugador.

        this.playerSprite = scene.add.sprite(0, 0, 'player').setOrigin(0, 0); // Guardamos el srpite del jugador.
        this.add([this.playerSprite]); // Metemos al contenedor el sprite del jugador.

        scene.add.existing(this); // Metemos el contenedor en la escena.

        this.playerSprite.anims.play('playerIdle', true); // Hacemos que se reproduzca la animacion idle del jugador.
    }

    preUpdate(t, dt) {
        this.move();
        this.checkBounds();
    }

    playerKeys() {
        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        });
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
    }
}