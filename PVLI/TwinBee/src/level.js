export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });
    }

    init(data) {
        this.numPlayers = data.nPlayers;
        console.log("Numero jugadores: " + this.numPlayers);
    }

    preload() {

    }

    create() {

    }

    update(time, delta) {

    }
}