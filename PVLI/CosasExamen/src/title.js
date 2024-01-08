export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });
    }
    init() {
        this.sound.stopAll(); // Quitamos el resto de sonidos.
    }
    create() {
        //------Titulo del juego:
        this.tittle = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "TEXTO", {
            fontSize: 20, // Size de la letra.
            fill: '#fff', // Color del texto.
            fontFamily: 'Pixeled', // Fuente.
            stroke: '#' + Math.floor(Math.random() * 16777215).toString(16), // Color de fondo aleatorio.
            strokeThickness: 5 // Size del color de fondo.
        }).setOrigin(0.5, 0.5);
        //------Botones
        this.createButton("Easy", 20, 'white', 2, 2);


    }
    createButton(text, yOffset, textColor, fuel, time) {
        let button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + yOffset, text, {
            fontSize: 10,
            fill: textColor,
            fontFamily: 'Pixeled',
        }).setOrigin(0.5, 0.5).setInteractive();

        button.on("pointerdown", () => {
            //console.log("Texto boton: " + text);
            this.scene.start("Level", { fuelNeedded: fuel, timeToMeteor: time });
        });
    }

}