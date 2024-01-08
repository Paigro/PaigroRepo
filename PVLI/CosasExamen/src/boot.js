export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
    }
    preload() { //------Aqui cargar imagenes, spritesheets, sonidos, json, etc...
        //------Tilemap json:
        this.load.tilemapTiledJSON('nombre', './ruta/ruta/archivo.json');
        //------Imagen:
        this.load.image('nombre', './ruta/ruta/imagen.png');
        //------Spritesheet:
        this.load.spritesheet('nombre', './ruta/ruta/imagen.png', { frameWidth: 24, frameHeight: 17 });
        //------Musica:
        this.load.audio('nombre', './ruta/ruta/sonido.wav');
    }

    create() { //------Aqui crear animaciones y demas:
        this.loadAnimations(); // Metodo aparte para no satura el create.
        this.scene.start("Menu"); // Ir al menu aqui.
    }

    loadAnimations() { //------https://photonstorm.github.io/phaser3-docs/Phaser.Animations.Animation.html
        this.anims.create({
            key: 'nombre', //------Nombre.
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }), //------Frames por spritesheet
            frames: [ //------O asi:
                { key: 'spriteSheet', frame: 0 },
                { key: 'spriteSheet', frame: 1 }],
            frameRate: 6, //------Velocidad en frames por segundo.
            repeat: -1, //------Veces que se hace la animacion: 0 se hace 1 vez, 1 se hace otra mas, etc... -1 se repite constantemente.
            yoyo: true, //------Yoyo, pues igual que el yoyo de los tweens.
        });
        //------Para que al acabar un animacion haga algo:
        sprite.on('animationcomplete', () => {
            // Lógica que deseas ejecutar cuando se completa la animación
            console.log('Animación completada');
            // Puedes llamar a una función de callback aquí si lo prefieres
            // callbackAlCompletar();
        }, this);
    }
}