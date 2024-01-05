export default class Title extends Phaser.Scene {

    constructor() {
        super({ key: 'Title', active: true });
    }

    init() {

    }

    preload() {

    }

    create() {
        // Titulo del juego:
        this.tittle = this.add.text(this.cameras.main.centerX, 40, "TwinBee", {
            fontSize: '40px',
            fill: '#fff',
            fontFamily: 'gummy',
            stroke: '#' + Math.floor(Math.random() * 16777215).toString(16),
            strokeThickness: 5
        }).setOrigin(0.5, 0.5);
        // Boton de 1 jugador:
        this.createButton("1 player", 80, 'white', 'orange', 1);
        // Boton de 2 jugadores:
        this.createButton("2 player", 40, 'white', 'orange', 2);
    }

    update(time, delta) {

    }

    createButton(text, y, textColor, strokeColor, players) {
        let button = this.add.text(this.cameras.main.centerX, this.cameras.main.height - y, text, {
            fontSize: '30px',
            fill: textColor,
            fontFamily: 'gummy',
            stroke: strokeColor,
            strokeThickness: 5
        }).setOrigin(0.5, 0.5).setInteractive();

        button.on("pointerdown", () => {
            //console.log("Texto boton: " + text);
            this.scene.start("Level", { nPlayers: players });
        });
    }

}