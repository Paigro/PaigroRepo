export default class Ball extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'ball'); // Llamada a la constructora padre.

        this.scene = scene;

        scene.physics.add.existing(this); // Metemos fisicas al Sprite.

        this.body.setSize(16, 16).setAllowGravity(false).setImmovable(true); // Cambiamos el body, le quitamos la gravedad y hacemos que sea inmovible a las colisiones.

        this.speed = 60;

        this.isPicked = false;

        this.player; // Jugador que ha lanzado la bola.

        this.zone; // Zona en la que esta.

        this.isInZone = true;

        scene.add.existing(this); // Metemos el sprite en la escena.

        scene.physics.world.enable(this);
        this.body.setBounce(1, 1);
        this.body.setCircle(8);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.y <= 0 || this.y >= this.scene.cameras.main.height) {
            console.log("desactivar");
            this.destroy();
        }
        if (!this.isInZone) {
            this.setZone(0);
        }
    }

    activate(x, y, nplayer) { // Activa el objeto, su visibilidad y lo pone en la posicion recibida.
        this.setActive(true).setVisible(true).setX(x).setY(y); // Lo activamos.
        if (nplayer == 1) {
            this.body.setVelocityY(-this.speed)
        }
        else {
            this.body.setVelocityY(this.speed)
        }

    }

    getIsPicked() {
        return this.isPicked;
    }

    setIsPicked(isPicked) {
        this.isPicked = isPicked;
    }

    getIPlayer() {
        return this.player;
    }

    setPlayer(player) {
        this.player = player;
    }

    setIsInZone(isInZone) {
        this.isInZone = isInZone;
    }

    getZone() {
        return this.zone;
    }

    setZone(zone) {
        this.zone = zone;
    }

    deActivate() { // Desactiva el objeto, su visibilidad, modifica su posicion y para su movimiento.
        this.setActive(false).setVisible(false).setPosition(0, -50); // Lo desactivamos.
        this.body.setVelocity(0, 0); // Lo paramos.
    }

    stop() { // Para el objeto completamente.
        this.body.setVelocity(0, 0);
        if (!this.isInZone) {
            this.player = 0;
            this.isInZone = true;
        }
    }
}