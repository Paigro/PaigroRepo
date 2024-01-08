export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu', active: false });
    }

    init(data) {
        this.highscore = data.highScore; // Guardamos el highscore que le pase el Level.
    }

    preload() {

    }

    create() {
        // Musica:
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        this.menuMusic = this.sound.add('menuMusic');
        this.menuMusic.play({ volume: 0.1, loop: true });
        // Titulo del juego:
        this.tittle = this.add.text(this.cameras.main.centerX, 200, "Circus", {
            fontSize: 40,
            fill: '#fff',
            fontFamily: 'arcade_classic',
        }).setOrigin(0.5, 0.5);
        this.stars = this.add.image(this.cameras.main.centerX, 200, 'stars').setScale(4, 4);
        // Boton facil:
        this.createButton("Easy", 40, 'white', 50);
        // Boton normal:
        this.createButton("Normal", 100, 'white', 100);
        // Boton dificil:
        this.createButton("Hard", 160, 'white', 200);
    }

    update(time, delta) {

    }

    createButton(text, y, textColor, dif) {
        let button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + y, text, {
            fontSize: 30,
            fill: textColor,
            fontFamily: 'arcade_classic',
        }).setOrigin(0.5, 0.5).setInteractive();

        button.on("pointerdown", () => {
            this.scene.start("Level", { difficulty: dif, highScore: this.highscore }); // Mandamos la dificultad del nivel y el highscore que haya.
        });
    }

}