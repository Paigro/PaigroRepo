export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, player) {
        super(scene, x, y, 'player'); // Llamada a la constructora padre.

        this.nPlayer = player;

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.body.setSize(32, 32); // Cambiamos su body.
        this.scene.add.existing(this); // Lo metemos en la escena.

        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(); // Setear las teclas.

        this.speed = 60; // Velocidad del jugador.

        this.body.setAllowGravity(false);

        this.hasBall = false;
        this.ballInRange = false;
        this.actualBall = null;

        this.isStun = false;
        this.stunTimer = 0;
        this.hasWon = 0;

        scene.add.existing(this); // Metemos el contenedor en la escena.
    }

    preUpdate(t, dt) {

        if (this.hasWon == 0) {
            this.move();
        }
        this.animations(); // Llamamos para actualizar la animacion.
        if (this.isStun && this.stunTimer >= 100) {
            this.isStun = false
            this.stunTimer = false;
        }
        this.stunTimer++;
    }

    playerKeys() {
        this.keys = this.scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.W,
            right: Phaser.Input.Keyboard.KeyCodes.S,
            shoot: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
    }

    move() {
        if (!this.isStun) {
            if (this.keys.right.isDown) { // Movimiento derecha.
                this.body.setVelocityY(this.speed);
            }
            else if (this.keys.left.isDown) { // Movimiento izquierda.
                this.body.setVelocityY(-this.speed);
            }
            else if (Phaser.Input.Keyboard.JustUp(this.keys.shoot)) {
                this.spaceBar();
            }

            if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left)) {
                this.body.setVelocity(0);
            }

            // Posicion de la bola.
            if (this.actualBall != null) {
                this.actualBall.setPosition(this.x + 50, this.y - 10);
            }
        }
    }

    animations() {
        if (this.hasWon === 0) {
            if (!this.isStun) {
                if (!this.hasBall && (this.body.velocity.x > 0 || this.body.velocity.x < 0)) { // Movimiento sin bola.
                    this.anims.play('penguinWalkAlone', true);
                }
                else if (this.hasBall && (this.body.velocity.x > 0 || this.body.velocity.x < 0)) { // Movimiento con bola.
                    this.anims.play('penguinWalkBall', true);
                }
                else {
                    if (this.hasBall) { // Parado con bola.
                        this.anims.play('penguinIdleBall', true);
                    }
                    else { // Parado sin bola.
                        this.anims.play('penguinIdleAlone', true);
                    }
                }
            }
            else {
                this.anims.play('penguinDead', true);
            }

        }
        else {
            let animal = '';
            animal = 'penguin';

            if (this.hasWon === 1) { // Ganar.
                this.playerSprite.anims.play(animal + 'Win', true);
            }
            else if (this.hasWon === 2) { // Perder
                this.playerSprite.anims.play(animal + 'Defeat', true);
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

    spaceBar() {
        this.canAct = false;
        if (this.hasBall) {
            this.shootBall();
        }
        else {
            this.checkCollisions();
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
        this.actualBall.body.setVelocityX(70);

        //console.log("Disparar bola.");
        this.actualBall.setIsPicked(false);
        this.actualBall.isInZone = false;
        this.actualBall = null;
        this.hasBall = false;
        this.scene.throwSoundPlay();
    }

    pickBall(ball) {
        this.hasBall = true;
        this.actualBall = ball;
        ball.setIsPicked(true);
        //console.log("Coger bola.");
    }

    stun() {
        //console.log("Stun.");
        this.isStun = true;
        this.body.setVelocity(0, 0);
        this.stunTimer = 0;
    }

    setWin(hasWon) {
        this.hasWon = hasWon;
    }
}