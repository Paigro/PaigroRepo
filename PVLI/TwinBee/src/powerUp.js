export default class PowerUp extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'green'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.
        //this.body.setCollideWorldBounds(); // Para que no salga de los limites del mundo.
        this.body.setSize(16, 16, true); // Para que la caja de colision sea igual al sprite.

        this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this); // Lo metemos en la escena.

        this.scene.tweens.add({
            targets: this,
            rotation: -1.5,
            duration: 400,
            ease: 'Power1',
            repeat: -1,
            yoyo: true,
        });
    }

    init() {

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
        if (this.y >= this.scene.cameras.main.height) {
            //console.log('PowerUp sale por abajo.');
            this.reset()
        }
    }

    move() {
        this.y += this.scene.backgroundSpeed;
    }

    reset() {
        //console.log("Reset PowerUp.");
        this.setActive(false).setVisible(false).setPosition(-50, -50);
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
    }
}