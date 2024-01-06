export default class Ship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, maxFuel) {
        super(scene, x, y, 'spaceship'); // Llamada a la constructora padre.

        this.setOrigin(0, 1);

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.body.allowGravity = false; // Le quitamos la gravedad a la nave.

        this.body.isTrigger = true; // Lo hacemos trigger.

        this.body.setImmovable(true); // Lo hacemos inmovible.
        
        this.actualFuel = 0; // Fuel que lleva el jugador metido en la nave.
        this.maxFuel = maxFuel; // Fuel objetivo del nivel.
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.checkFuel()) {
            this.scene.win();
        }
    }

    addFuel() {
        this.actualFuel++; // Suma fuel.
        //console.log(this.actualFuel + "/" + this.maxFuel)
    }

    checkFuel() {
        return this.actualFuel === this.maxFuel; // Comprobacion de si se ha llegado al objetivo.
    }
}