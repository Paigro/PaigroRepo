export default class Meteor extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'meteor'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.body.setSize(18, 16, true); // Para que la caja de colision sea igual al sprite.

        this.movible = true;

        this.body.setImmovable(true);

        this.anims.play('meteor', true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.checkBounds();
    }

    checkBounds() {
        if (this.x > this.scene.cameras.main.width - 2) {
            this.x = -10;
        }
        else if (this.x < -10) {
            this.x = this.scene.cameras.main.width - 2;
        }
    }

    activate(x, y) {
        this.setActive(true).setVisible(true).setX(x).setY(y); // Lo activamos.
        this.body.allowGravity = true; // Le volvemos a poner gravedad
        this.body.setVelocityX(50); // Para que tenga movimiento horizontal.
    }

    deactivate() {
        this.body.allowGravity = false;
        this.anims.play('meteor', true);
        this.setActive(false).setVisible(false).setPosition(-50, -50);
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
    }

    explode() {
        this.body.allowGravity = false;
        this.body.setVelocityX(0);
        this.anims.play('explosion', true).on('animationcomplete', (animation, frame) => {
            if (animation.key === 'explosion') {
                this.deactivate();
            }
        }, this);
    }
}