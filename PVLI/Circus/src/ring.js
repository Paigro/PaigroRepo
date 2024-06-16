export default class Ring extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'ring'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Metemos las fisicas.
        this.body.setSize(20, 30).setOffset(6, 70).setImmovable(true).setAllowGravity(false); // Cambiamos el body, le ponemos un offset, lo hacemos inmovible a las colisiones y desactivamos la gravedad..

        this.setScale(3.5, 3.5); // Cambiamos la escala.

        scene.add.existing(this); // Metemos el sprite en la escena.

        this.speed = 100; // Velocidad a la que se va a mover.
        this.isMovible = true; // Para que no sea afectado por las colisiones con otros objetos.

        this.anims.play('ringAnim'); // Ponemos la animacion del aro.
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt); // Llamamos al preupdate del padre.
        if (this.isMovible) {
            this.move(); // Si se puede mover se mueve.
        }
        if (this.x < this.scene.cameras.main.worldView.left - 30) {
            this.deactivate(); // Si ha salido por la izquierda de la camara una distancia lo desactivamos.
        }
    }

    move() { // Movimiento.
        this.body.setVelocityX(-this.speed); // Hacia la izquierda.
    }

    activate(x, y) { // Activa el objeto, su visibilidad y modifica su posicion.
        this.setActive(true).setVisible(true).setX(x).setY(y); // Lo activamos.
        this.body.setAllowGravity(false); // Por si acaso.
    }

    deactivate() { // Desactiva el objeto, su visibilidad, modifica su posicion y para su movimiento.
        this.setActive(false).setVisible(false).setPosition(0, -50); // Lo desactivamos.
        this.body.setVelocity(0, 0); // Lo paramos.
    }
}