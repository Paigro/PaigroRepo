export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, n) {
        super(scene, x, y, 'player' + n); // Llamada a la constructora padre.

        scene.physics.add.existing(this); // Le ponemos fisicas.
        this.body.setCollideWorldBounds(); // Para que no salga de los limites del mundo.
        this.body.setSize(16, 16, true); // Para que la caja de colision sea igual al sprite.

        this.scene.add.existing(this); // Lo metemos en la escena.
        //this.body.setSize(60, 60, true);

        this.keys;
        this.playerKeys(n);
        this.speed = 60;
        this.playerNumber = n;
    }

    init() {

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
    }

    update() {

    }

    move() {

        this.body.setVelocity(0);

        if (this.keys.up.isDown) {
            this.body.setVelocityY(-this.speed);
        }
        else if (this.keys.down.isDown) {
            this.body.setVelocityY(this.speed);
        }

        if (this.keys.right.isDown) {
            this.body.setVelocityX(this.speed);
        }
        else if (this.keys.left.isDown) {
            this.body.setVelocityX(-this.speed);
        }
        // Disparo:
        if (this.keys.shoot.isDown) {
            console.log("Pium pium.");
        }

        this.animations();
    }

    playerKeys(player) {
        if (player === 1) {
            this.keys = this.scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                shoot: Phaser.Input.Keyboard.KeyCodes.SPACE
            });

        } else {
            this.keys = this.scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                shoot: Phaser.Input.Keyboard.KeyCodes.ENTER
            });
        }
    }

    animations() {
        // Animaciones del twinbee:
        if (this.playerNumber === 1) {
            if (this.body.velocity.x < 0) {
                this.anims.play('twinleft');
            }
            else if (this.body.velocity.x > 0) {
                this.anims.play('twinright')
            }
            else {
                this.anims.play('twinstraight')
            }
        }
        // Animaciones del winbee:
        else {
            if (this.body.velocity.x < 0) {
                this.anims.play('winleft');
            }
            else if (this.body.velocity.x > 0) {
                this.anims.play('winright')
            }
            else {
                this.anims.play('winstraight')
            }
        }
    }
}