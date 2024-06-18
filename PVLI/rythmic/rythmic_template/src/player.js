export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y); // Llamada a la constructora padre.


        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.speed = 60; // Velocidad del jugador.

        this.body.setAllowGravity(false);

        this.lives = 5;

        this.hasDied = false;
        scene.add.existing(this); // Metemos el contenedor en la escena.
    }

    preUpdate(t, dt) {
        this.animations(); // Llamamos para actualizar la animacion.
    }

    animations() {
        if (!this.hasDied) {
            this.anims.play('playerIdle', true);
        }
        else {
            this.anims.play('playerDead', true);
        }
    }

    getLives() {
        return this.lives;
    }

    damage() {
        if (this.lives > 1) {
            this.lives--;
        } else {
            this.scene.defeat();
            this.hasDied = true
        }
    }
}