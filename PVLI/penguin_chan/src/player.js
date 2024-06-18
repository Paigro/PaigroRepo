export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y, player) {
        super(scene, x, y,); // Llamada a la constructora padre.

        this.nPlayer = player;

        scene.physics.add.existing(this); // Le ponemos fisicas.

        this.body.setSize(32, 32); // Cambiamos su body.
        this.scene.add.existing(this); // Lo metemos en la escena.

        this.keys; // Para guardar las teclas para el movimiento.
        this.playerKeys(); // Setear las teclas.

        this.speed = 60; // Velocidad del jugador.

        this.playerSprite = scene.add.sprite(0, 0, 'player').setOrigin(0, 0); // Guardamos el sprite del jugador.
        this.add([this.playerSprite]); // Metemos al contenedor el sprite del jugador.

        this.body.setAllowGravity(false);

        this.hasBall = false;
        this.ballInRange = false;
        this.actualBall = null;

        this.isStun;
        this.stunTimer = 0;
        this.hasWon = 0;

        //------Para la IA:
        this.canAct;
        this.direction = 1;
        this.timeToChangeDirection = 200;
        this.timerDirection = 100;
        this.timeToAct = 25;
        this.timerToAct = 0;

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

        if (!this.isStun) {
            this.IA();
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
            if (this.nPlayer != 3) { // Jugadores humanos.

                if (this.keys.right.isDown) { // Movimiento derecha.
                    this.body.setVelocityX(this.speed);
                }
                else if (this.keys.left.isDown) { // Movimiento izquierda.
                    this.body.setVelocityX(-this.speed);
                }
                else if (Phaser.Input.Keyboard.JustUp(this.keys.shoot)) {
                    this.spaceBar();
                }

                if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left)) {
                    this.body.setVelocity(0);
                }
            }
            else { // IA:
                if (this.direction > 0) { // Se mueve hacia la derecha.
                    this.body.setVelocityX(this.speed);
                }
                else if (this.direction < 0) { // Se mueve hacia la izquierda
                    this.body.setVelocityX(-this.speed);
                }
            }

            // Posicion de la bola.
            if (this.actualBall != null) {
                if (this.nPlayer === 1) {
                    this.actualBall.setPosition(this.x + 15, this.y - 10);
                }
                else {
                    this.actualBall.setPosition(this.x + 15, this.y + 45);
                }
            }
        }
    }

    animations() {
        if (this.hasWon === 0) {
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
        } else {
            let animal = '';
            if (this.nPlayer === 1) {
                animal = 'penguin';
            }
            else {
                animal = 'rat';
            }

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
        if (this.y > this.scene.cameras.main.centerY) {
            this.actualBall.body.setVelocityY(-50);
        }
        else {
            this.actualBall.body.setVelocityY(50);
        }
        //console.log("Disparar bola");
        this.actualBall.setIsPicked(false);
        this.actualBall.isInZone = false;
        this.actualBall = null;
        this.hasBall = false;
        this.scene.throwSoundPlay();
    }

    pickBall(ball) {
        //console.log(this.nPlayer === 2)
        this.hasBall = true;
        this.actualBall = ball;
        ball.setIsPicked(true);
        if (this.nPlayer === 1) {
            //console.log("Coger bola1");
            ball.setPosition(this.x + 15, this.y - 10);
        }
        else {
            //console.log("Coger bola2");
            ball.setPosition(this.x + 15, this.y + 40);
        }
        ball.setPlayer(this.nPlayer);
    }

    stun() {
        //console.log("Stun.");
        this.isStun = true;
        this.body.setVelocity(0, 0);
        this.stunTimer = 0;
    }

    IA() {
        if (this.nPlayer === 3) {
            // Se ve que tarda 200 en ir de un lado a otro entonces el time = 200 y el timer inicialmente empieza en 100 porque esta en el medio
            if (this.timerDirection >= this.timeToChangeDirection) {
                this.timerDirection = 0;
                if (this.direction < 0) {
                    this.direction = 1; // Cambia de direccion a la derecha.
                }
                else {
                    this.direction = -1; // Cambia de direccion a la izquierda.
                }
                //console.log("IA: cambio de direccion.");
            }
            if (this.timerToAct >= this.timeToAct) {
                this.calculateIAAction(); // Calcula si puede actuar o no.
                this.timeToAct = Phaser.Math.Between(50, 100); // Nuevo tiempo para que actue la IA.
                this.timerToAct = 0; // Reset del timer.
            }

            if (this.canAct) {
                this.spaceBar();
            }
            this.timerToAct++;
            this.timerDirection++;
        }
    }

    calculateIAAction() {
        let randomNumber = Phaser.Math.Between(1, 10);
        if ((randomNumber % 2) == 0) {
            //console.log("IA: puede actuar.");
            this.canAct = true;
        }
        else {
            //console.log("IA: no puede actuar.");
            this.canAct = false;
        }
    }

    setWin(hasWon) {
        this.hasWon = hasWon;
    }
}