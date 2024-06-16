export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y, player) {
        super(scene, x, y,); // Llamada a la constructora padre.



        this.nPlayer = player;
        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.body.setSize(32, 32);
        this.scene.add.existing(this); // Lo metemos en la escena.

        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(); // Setear las teclas.
        this.speed = 60; // Velocidad del jugador.

        this.playerSprite = scene.add.sprite(0, 0, 'player').setOrigin(0, 0); // Guardamos el srpite del jugador.
        this.add([this.playerSprite]); // Metemos al contenedor el sprite del jugador.
        this.body.setAllowGravity(false);

        this.hasBall = false;
        this.ballInRange = false;
        this.actualBall = null;
        this.isStun;
        this.stunTimer = 0;

        scene.add.existing(this); // Metemos el contenedor en la escena.
    }

    preUpdate(t, dt) {
        this.move();

        if (this.isStun && this.stunTimer >= 100) {
            this.isStun = false
            this.stunTimer = false;
        }
        this.stunTimer++;

        if (!this.ballInRange) {
            this.scene
        }
    }

    playerKeys() {
        if (this.nPlayer === 1) {
            this.keys = this.scene.input.keyboard.addKeys({
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                shoot: Phaser.Input.Keyboard.KeyCodes.SPACE,
            });
        }
        else {
            this.keys = this.scene.input.keyboard.addKeys({
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                shoot: Phaser.Input.Keyboard.KeyCodes.DOWN,
            });
        }
    }

    move() {
        if (!this.isStun) {
            if (this.nPlayer != 3) { // 3 = IA

                if (this.keys.right.isDown) { // Movimiento derecha.

                    this.body.setVelocityX(this.speed);


                }
                else if (this.keys.left.isDown) { // Movimiento izquierda.

                    this.body.setVelocityX(-this.speed);

                }
                else if (Phaser.Input.Keyboard.JustUp(this.keys.shoot)) {
                    if (this.hasBall) {
                        this.shootBall();
                    }
                    else {

                        this.checkCollisions();
                    }
                }

                if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left)) {
                    this.body.setVelocity(0);
                }
            }
            if (this.actualBall != null) {
                if (this.nPlayer === 1) {
                    this.actualBall.setPosition(this.x + 15, this.y - 10);
                }
                else {
                    this.actualBall.setPosition(this.x + 15, this.y + 40);
                }
            }
        }
        this.animations(); // Llamamos para actualizar la animacion.

    }

    animations() {
        if (this.nPlayer === 1) {
            if (!this.isStun) {
                if (!this.hasBall && (this.body.velocity.x > 0 || this.body.velocity.x < 0)) { // Movimiento sin bola.
                    this.playerSprite.anims.play('penguinWalkAlone', true);
                }
                else if (this.hasBall && (this.body.velocity.x > 0 || this.body.velocity.x < 0)) { // Movimiento con bola.
                    this.playerSprite.anims.play('penguinWalkBall', true);
                }
                else {
                    if (this.hasBall) { // Parado con bola.
                        this.playerSprite.anims.play('penguinIdleBall', true);
                    }
                    else { // Parado sin bola.
                        this.playerSprite.anims.play('penguinIdleAlone', true);
                    }
                }
            }
            else {
                this.playerSprite.anims.play('penguinDead', true);
            }
        }
        else {
            if (!this.isStun) {
                if (!this.hasBall && (this.body.velocity.x > 0 || this.body.velocity.x < 0)) { // Movimiento sin bola.
                    this.playerSprite.anims.play('ratWalkAlone', true);
                }
                else if (this.hasBall && (this.body.velocity.x > 0 || this.body.velocity.x < 0)) { // Movimiento con bola.
                    this.playerSprite.anims.play('ratWalkBall', true);
                }
                else {
                    if (this.hasBall) { // Parado con bola.
                        this.playerSprite.anims.play('ratIdleBall', true);
                    }
                    else { // Parado sin bola.
                        this.playerSprite.anims.play('ratIdleAlone', true);
                    }
                }
            }
            else {
                this.playerSprite.anims.play('ratDead', true);
            }
        }
    }

    checkCollisions() {
        if (this.nPlayer === 1) {
            this.scene.checkCollisionPlayer1();
        }
        else {
            this.scene.checkCollisionPlayer2();
        }
    }

    choice(ball) {
        if (!this.hasBall) { // Si no tiene bola.
            this.pickBall(ball);
        }
        else if (this.hasBall) { // Si tiene bola.
            this.shootBall(ball);
        }
    }

    shootBall() {
        if (this.y > this.scene.cameras.main.centerY) {
            this.actualBall.body.setVelocityY(-50);
        }
        else {
            this.actualBall.body.setVelocityY(50);
        }
        console.log("Disparar bola");
        this.actualBall.setIsPicked(false);
        this.actualBall.isInZone = false;
        this.actualBall = null;
        this.hasBall = false;
    }

    pickBall(ball) {
        //console.log(this.nPlayer === 2)
        this.hasBall = true;
        this.actualBall = ball;
        ball.setIsPicked(true);
        if (this.nPlayer === 1) {
            console.log("Coger bola1");
            ball.setPosition(this.x + 15, this.y - 10);
        }
        else {
            console.log("Coger bola2");
            ball.setPosition(this.x + 15, this.y + 40);
        }
        ball.setPlayer(this.nPlayer);
    }

    automaticMove() {

    }

    stun() {
        console.log("Stun.");
        this.isStun = true;
        this.body.setVelocity(0, 0);
        this.stunTimer = 0;
    }
}