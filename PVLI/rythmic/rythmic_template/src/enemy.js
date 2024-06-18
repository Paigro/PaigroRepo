export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, player) {
        super(scene, x, y); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.scene.add.existing(this); // Lo metemos en la escena.

        this.lives = 2;

        this.nEnemy = player;

        //----Para el disparo:
        this.timeToShoot = 400;
        this.timerToShoot = 0;
        this.doubleBall = false;

        this.hasDead = false;

        this.body.setAllowGravity(false);

        scene.add.existing(this); // Metemos el contenedor en la escena.

        this.anims.play('skIdle', true);
        this.generateRandoms();
    }

    preUpdate(t, dt) {
        if (!this.hasDead) {
            if (this.timerToShoot >= this.timeToShoot) {
                this.shoot();
                this.timerToShoot = 0;
            }
            this.timerToShoot++;
        }
    }

    shoot() {
        this.anims.play('skAttack', true)
        this.scene.shootEnergy(this.x + 32, this.y + 30, this.nEnemy);
        if (this.doubleBall) {
            this.scene.shootEnergy(this.x, this.y + 30, this.nEnemy);
            this.doubleBall = false;
        }

        this.generateRandoms();
    }

    generateRandoms() {
        this.timeToShoot = Phaser.Math.Between(100, 300);
        //this.timeToShoot = Phaser.Math.Between(20, 100);
        let random = Phaser.Math.Between(1, 10);
        if ((random % 2) == 0) {
            this.doubleBall = true;
        }
    }

    damage() {
        if (this.lives > 1) {
            this.lives--;
        } else {
            this.anims.play('skDead', true);
            this.hasDead = true;
        }
    }

    getIsDead() {
        return this.hasDead;
    }
}