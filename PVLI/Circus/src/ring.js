export default class Ring extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'ring'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Metemos fisicas al contenedor.
        this.body.setSize(20, 30).setOffset(6, 70).setImmovable(true); // Cambiamos el body dependiendo del que sea.

        this.setScale(3.5, 3.5);

        this.body.setAllowGravity(false); // Quitamos la gravedad.

        scene.add.existing(this); // Metemos el sprite en la escena.

        this.speed = 100;
        this.isMovible = true;

        this.anims.play('ringAnim');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.isMovible) {
            this.move();
        }
        if (this.x < this.scene.cameras.main.worldView.left - 30) {
            this.deactivate();
        }
    }

    move() {
        this.body.setVelocityX(-this.speed);
    }

    activate(x, y) {
        this.setActive(true).setVisible(true).setX(x).setY(y); // Lo activamos.
        this.body.setAllowGravity(false); // Le volvemos a poner gravedad
    }

    deactivate() {
        this.setActive(false).setVisible(false).setPosition(0, -50); // Lo desactivamos.
        this.body.setAllowGravity(false).setVelocity(0, 0); // Le quitamos la gravedad.
    }

    stop() {
        this.isMovible = false;
        this.body.setVelocity(0, 0);
    }
}