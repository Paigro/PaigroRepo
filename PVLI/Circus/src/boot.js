export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'Boot', active: true });
    }

    init() {

    }

    preload() {
        // Imagenes:
        this.load.image('stars', './assets/sprites/stars.png');
    }

    create() {

    }

    update(time, delta) {

    }

    createButton(text, y, textColor, strokeColor, players) {

    }

}