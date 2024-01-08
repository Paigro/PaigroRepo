export default class Fire extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fire'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Metemos fisicas al contenedor.
        this.body.setSize(25, 31); // Cambiamos el body dependiendo del que sea.

        this.body.setAllowGravity(false).setImmovable(true);

        this.setScale(3.5, 3.5);

        scene.add.existing(this); // Metemos el sprite en la escena.

        this.anims.play('fireAnim');
    }

    preUpdate(t, dt) {
    }

    activate(x, y) {
        this.setActive(true).setVisible(true).setX(x).setY(y); // Lo activamos.
        this.body.setAllowGravity(false); // Le volvemos a poner gravedad
    }

    deactivate() {
        this.setActive(false).setVisible(false).setPosition(0, -50); // Lo desactivamos.
        this.body.setAllowGravity(false); // Le quitamos la gravedad.
    }
}