export default class Ball extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, speed, enemy) {
        super(scene, x, y, 'energy'); // Llamada a la constructora padre.

        this.scene = scene;

        scene.physics.add.existing(this); // Metemos fisicas al Sprite.

        this.body.setAllowGravity(false) // Cambiamos el body y le quitamos la gravedad.

        this.speed = speed; // Velocidad de la bola.

        this.isPicked = false; // Si esta cogida o no.
        this.player; // Jugador que ha lanzado la bola.

        this.isInZone = true; // Si esta en una zona o no.
        this.zone; // Zona en la que esta.

        scene.add.existing(this); // Metemos el sprite en la escena.

        scene.physics.world.enable(this);
        this.body.setCircle(16); // Hace que sea un circulo de radio 16 px.

        this.nEnemy = enemy
        this.killed = false
        this.anims.play('energyCreate', true);

        this.body.setVelocityX(this.speed);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.x > this.scene.cameras.main.width) {
            this.destroyEntity();
        }
    }

    stop() { // Para el objeto completamente.
        this.body.setVelocity(0, 0);
        if (!this.isInZone) {
            this.player = 0;
            this.isInZone = true;
        }
    }

    damage() { // Golpeado por un boton.
        this.anims.play('energyEnd', true);
        this.body.setVelocity(0, 0);
        this.scene.damageEnemy(this.nEnemy);
        this.destroyEntity();
    }

    kill() { // Ha colisionado con la zona.
        this.killed = true;
        this.anims.play('energyIdle', true);
    }

    destroyEntity() {
        this.destroy();
    }

    gethasKilled() {
        return this.killed
    }
}