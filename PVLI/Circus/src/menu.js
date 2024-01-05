export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu', active: true });
    }

    init() {

    }

    preload() {

    }

    create() {
        // Titulo del juego:
        this.tittle = this.add.text(this.cameras.main.centerX, 200, "Circus", {
            fontSize: '40px',
            fill: '#fff',
            fontFamily: 'arcade_classic',
        }).setOrigin(0.5, 0.5);
        this.stars = this.add.image(this.cameras.main.centerX, 200, 'stars'); // Ponemos las estrellas.
        // Boton facil:
        this.createButton("Easy", 40, 'white', 'orange', 1);
        // Boton normal:
        this.createButton("Normal", 100, 'white', 'orange', 2);
        // Boton dificil:
        this.createButton("Hard", 160, 'white', 'orange', 2);
    }

    update(time, delta) {

    }

    createButton(text, y, textColor, dif) {
        let button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + y, text, {
            fontSize: '30px',
            fill: textColor,
            fontFamily: 'arcade_classic',
        }).setOrigin(0.5, 0.5).setInteractive();

        button.on("pointerdown", () => {
            //console.log("Texto boton: " + text);
            this.scene.start("Level", { difficulty: dif });
        });
    }

}