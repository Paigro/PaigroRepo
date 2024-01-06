export default class Fuel extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fuel'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.movible = true;

        this.body.setImmovable(true);
    }

    init() {

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.checkBounds();
    }

    checkBounds() {
        if (this.x >= this.scene.cameras.main.width) {
            this.x = 0;
        }
        else if (this.x <= 0) {
            this.x = this.scene.cameras.main.width;
        }
    }

    stop() {
        //console.log("Stop player.");
        this.body.setVelocityY(0).setVelocityX(0);
        this.movible = false;
    }

    appear() {
        this.body.allowGravity = true;
        this.setActive(true).setVisible(true).setPosition(Phaser.Math.Between(16, this.scene.cameras.main.width - 16), 0);
    }

    disappear() {
        this.setActive(false).setVisible(false).setPosition(-10, -10);
        this.body.allowGravity = false;
    }
}