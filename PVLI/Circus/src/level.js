export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });
    }

    init(data) {
        this.timeToMeteor = data.timeToMeteor; // Guardamos el tiempo entre meteoritos.
        this.fuelNeedded = data.fuelNeedded; // Guardamos el fuel necesario para superar el nivel.
        this.sound.stopAll(); // Quitamos el resto de sonidos.
    }

    preload() {

    }

    create() {
        this.floor = this.add.sprite(0, this.cameras.main.height - 100, 'none')

    }

    update(time, delta) {

    }

}