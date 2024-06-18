export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'MenuP', active: false });
    }

    init(data) {
        this.highscore = data.highScore; // Guardamos el highscore que le pase el Level.
    }

    preload() {

    }

    create() {
        //------CONTROL DEL MENU:
        this.buttonSelected = 0; // Boton que esta seleccionado.
        this.ball = this.add.image(this.cameras.main.centerX - 50, this.cameras.main.centerY + 40, 'ball').setScale(2, 2); // Feedback de boton seleccionado.
        this.ball.x = this.cameras.main.centerX - 100;
        //------MUSICA:
        this.sound.stopAll(); // Quitamos el resto de sonidos.
        //------TITULO DE JUEGO:
        this.tittle = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, "Penguin-chan wars", {
            fontSize: 100,
            fill: '#00f',
            stroke: '#fff',
            strokeThickness: 4,
            fontFamily: 'babelgam',
        }).setOrigin(0.5, 0.5);
        //------BOTONES:
        // Boton 1:
        this.createButton("1 player", 40, 'white', 1);
        // Boton 2:
        this.createButton("2 player", 100, 'white', 2);
        //------TECLAS:
        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
        //------FIN DEL CREATE:
        this.createEnd = true;
    }

    update(time, delta) {
        if (this.createEnd) {
            this.checkKeys();
        }
    }

    createButton(text, y, textColor, dif) {
        let button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + y, text, {
            fontSize: 40,
            fill: textColor,
            fontFamily: 'babelgam',
        }).setOrigin(0.5, 0.5);
    }

    checkKeys() {
        if (Phaser.Input.Keyboard.JustUp(this.keys.W) && this.buttonSelected != 0) {
            console.log("W");
            this.buttonSelected = 0;
            this.ball.y = this.cameras.main.centerY + 40;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.keys.S) && this.buttonSelected != 1) {
            console.log("S");
            this.buttonSelected = 1
            this.ball.y = this.cameras.main.centerY + 100;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.keys.SPACE)) {
            if (this.buttonSelected == 0) {
                console.log("Scena con 1");
                this.scene.start("Level", { nPlayers: 1 }); // Mandamos la dificultad del nivel.
            }
            else {
                console.log("Scena con 2");
                this.scene.start("Level", { nPlayers: 2 }); // Mandamos la dificultad del nivel.
            }
        }
    }
}