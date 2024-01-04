export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'bullet'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.
        this.body.setCollideWorldBounds(); // Para que no salga de los limites del mundo.
        this.body.setSize(6, 6, true); // Para que la caja de colision sea igual al sprite.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.speed = 60;

        this.on('worldbounds', () => {
            console.log('Buenos dias');
        });
    }

    init() {

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
        if (this.y <= 0) {
            console.log('El sprite ha salido de los límites del mundo');
            this.setActive(false).setVisible(false);
        }
    }

    update() {

    }

    move() {
        this.body.setVelocityY(-this.speed);
    }
}