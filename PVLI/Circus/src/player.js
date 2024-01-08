export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y,); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Metemos fisicas al contenedor.
        this.body.setSize(36 * 3.5, 16 * 3.5); // HAcemos el boddy igual a como si fuese el del leon solo y escalado porque es chico.

        this.lionSprite = scene.add.sprite(0, 0, 'lion').setOrigin(0, 0).setScale(3.5, 3.5); // Guardamos el sprite del leon.
        this.clownSprite = scene.add.sprite((36 * 3.5) / 2, 0, 'clown').setOrigin(0.5, 1).setScale(3.5, 3.5); // Guardamos el sprite del payaso.
        this.add([this.lionSprite, this.clownSprite]); // Metemos al contenedor el sprite del payaso y el leon.
        scene.physics.add.existing(this.clownSprite); // Metemos fisicas al payaso. Al leon no porque estamos haciendo que el boddy del contenedor sea igual al que tendria el leon para ahorrar en boddies.
        this.clownSprite.body.allowGravity = false; // Quitamos la gravedad del payaso.

        scene.add.existing(this); // Metemos el contenedor en la escena.

        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(); // Setear las teclas.
        this.ySpeed = 400; // Velocidad del jugador.
        this.xSpeed = 200;
        this.isJumping = false; // Para comprobar si esta saltando o no.
        this.isMovible = true; // Para comprobar si se puede mover o no.

        this.lionSprite.anims.play('lionIdle', true); // En principio daria igual poner esto aqui porque el jugador cae y cuando llegue al suelo ya se pondran pero por si acaso.
        this.clownSprite.anims.play('clownIdle', true);
    }

    preUpdate(t, dt) {
        if (this.isMovible) {
            this.move(); // Se mueve cuando se tiene que mover.
        }
    }

    playerKeys() { // Teclas para mover el jugador.
        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        });
    }

    move() { // Movimiento.
        if (!this.isJumping) { // Solo se puede modificar el movimiento si no se esta saltando.
            if (this.keys.up.isDown) { // Movimiento arriba.
                this.body.setVelocityY(-this.ySpeed);
                this.isJumping = true;
            }

            if (this.keys.right.isDown) { // Movimiento derecha.
                this.body.setVelocityX(this.xSpeed);
                this.lionSprite.setFlip(false); // Flipear al leon.
                this.clownSprite.setFlip(false); // Flipear al payaso.
            }
            else if (this.keys.left.isDown) { // Movimiento izquierda.
                this.body.setVelocityX(-this.xSpeed / 4); // La velocidad hacia atras es mas lenta.
                this.lionSprite.setFlip(true); // Flipear al leon.
                this.clownSprite.setFlip(true); // Flipear al payaso.

            }
            if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left)) {
                this.body.setVelocityX(0); // Cuando se dejan de pulsar las teclas se para.
            }
        }

        this.animations(); // Llamamos para actualizar la animacion de cada cosa.
    }

    animations() {
        if (!this.isJumping) { // Si no esta saltando.
            if (this.body.velocity.x > 0 || this.body.velocity.x < 0) { // Caminando.
                this.lionSprite.anims.play('lionWalk', true);
                this.clownSprite.anims.play('clownIdle', true);
            }
            else { // Idle.
                this.lionSprite.anims.play('lionIdle', true);
                this.clownSprite.anims.play('clownIdle', true);
            }
        }
        else { // Si  esta saltando.
            this.lionSprite.anims.play('lionJump', true);
            this.clownSprite.anims.play('clownJump', true);
        }
    }

    die() { // Cuando el jugador muere.
        this.stop();
        this.lionSprite.anims.play('lionDead', true); // Animacion de muerte del leon.
        this.clownSprite.anims.play('clownDead', true); // Animacion de muerte del payaso.
    }

    victory() { // Cuando el jugador gana.
        this.stop();
        this.lionSprite.anims.play('lionIdle', true); // Animacion de victoria del leon.
        this.clownSprite.anims.play('clownWin', true); // Animacion de victoria del payaso.
    }

    jumpFinished() { // Reseteo del salto cuando toca el suelo.
        this.isJumping = false;
    }

    cheatVelocidad() {
        this.xSpeed += 100;
    }

    stop() {
        this.isMovible = false; // No se puede mover.
        this.body.setVelocityY(0).setVelocityX(0); // Quitamos las velocidades para que se quede en el sitio.
        this.body.setAllowGravity(false); // Quitamos la gravedad para que se quede en el sitio.
    }
}