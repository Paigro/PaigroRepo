export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu', active: false });
    }

    init() {
        this.sound.stopAll(); // Quitamos el resto de sonidos.
    }

    create() {
        /*// Musica:
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        this.menuMusic = this.sound.add('menuMusic', { loop: true });
        this.menuMusic.play();*/
        // Titulo del juego:
        this.tittle = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 20, "Jetpac", {
            fontSize: 20,
            fill: '#fff',
            fontFamily: 'Pixeled',
        }).setOrigin(0.5, 0.5);
        //this.stars = this.add.image(this.cameras.main.centerX, 200, 'stars').setScale(4, 4);
        // Boton facil:
        this.createButton("Easy", 20, 'white', 2, 2);
        // Boton normal:
        this.createButton("Normal", 40, 'white', 3, 1);
        // Boton dificil:
        this.createButton("Hard", 60, 'white', 5, 1 / 2);
    }

    createButton(text, y, textColor, fuel, time) {
        let button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + y, text, {
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