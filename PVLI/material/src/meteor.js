export default class Meteor extends Phaser.GameObjects.Sprite {

    /*constructor(scene, x, y) {
        super(scene, x, y, 'fuel'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.movible = true;

        this.body.setImmovable(true);
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
    }*/
}