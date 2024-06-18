export default class Ball extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'ball'); // Llamada a la constructora padre.

        this.scene = scene;

        scene.physics.add.existing(this); // Metemos fisicas al Sprite.

        this.body.setSize(16, 16).setAllowGravity(false) // Cambiamos el body y le quitamos la gravedad.
        // NOTA: obviamente si se hace inmovable luego no revota...
        //this.body.setAllowGravity(false).setImmovable(true); // Hacemos que sea inmovible a las colisiones.

        this.speed = 60; // Velocidad de la bola.

        this.isPicked = false; // Si esta cogida o no.
        this.player; // Jugador que ha lanzado la bola.

        this.isInZone = true; // Si esta en una zona o no.
        this.zone; // Zona en la que esta.

        scene.add.existing(this); // Metemos el sprite en la escena.

        scene.physics.world.enable(this);
        this.body.setBounce(0.9); // Hace que rebote. Al tener un valor mayor que 1, al rebota su velocidad aumente.
        this.body.setCircle(8); // Hace que sea un circulo de radio 8 px.
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

    stop() { // Para el objeto completamente.
        this.body.setVelocity(0, 0);
        if (!this.isInZone) {
            this.player = 0;
            this.isInZone = true;
        }
    }
}