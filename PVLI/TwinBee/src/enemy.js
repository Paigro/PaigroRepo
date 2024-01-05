export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'enemy'); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.
        //this.body.setCollideWorldBounds(); // Para que no salga de los limites del mundo.
        this.body.setSize(16, 16, true); // Para que la caja de colision sea igual al sprite.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.speed = 60;

        this.anims.play('enemyrotation');
    }

    init() {

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
        if (this.y >= this.scene.cameras.main.height) {
            //console.log('Enemigo sale por abajo.');
            this.reset();
        }
    }

    move() {
        this.body.setVelocityY(this.speed);
    }

    reset() {
        //console.log("Reset enemigo.");
        this.anims.play('enemyrotation');
        this.setActive(false).setVisible(false).setPosition(-50, -50);
        this.body.setVelocityY(0);
    }
}