export default class Fire extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fire'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Metemos fisicas al contenedor.
        this.body.setSize(16, 27).setOffset(5, 6).setAllowGravity(false).setImmovable(true); // Cambiamos el body, le quitamos la gravedad y hacemos que sea inmovible a las colisiones.

        this.setScale(3, 3); // Cambiamos su escala que sino es muy chico.

        scene.add.existing(this); // Metemos el sprite en la escena.

        this.anims.play('fireAnim'); // Ponemos la animacion del fuego.
    }

    activate(x, y) { // Activa el objeto, su visibilidad y lo pone en la posicion recibida.
        this.setActive(true).setVisible(true).setX(x).setY(y); // Lo activamos.
    }
}