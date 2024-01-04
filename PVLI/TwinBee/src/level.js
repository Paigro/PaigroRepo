import Player from "./player.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level', active: false });
    }

    init(data) {
        this.numPlayers = data.nPlayers;
        //console.log("Numero jugadores: " + this.numPlayers);
    }

    preload() {

    }

    create() {
        this.background = this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1);

        this.players = [];

        for (let i = 1; i <= this.numPlayers; i++) {
            const player = new Player(this, ((this.cameras.main.width) / (this.numPlayers + 1)) * i, this.cameras.main.height - 40, i);
            this.players.push(player);
            console.log("Jugador creado:" + i);
        }


    }

    update(time, delta) {
        if (this.background.y < this.background.height) {
            this.background.y += 0.5;
            //console.log("PosY fondo: " + this.bacground.y);
        }
        else {
            this.win();
        }
    }

    gameOver() {
        console.log("HAS PERDIDO");
    }

    win() {
        console.log("HAS GANADO");
    }
}