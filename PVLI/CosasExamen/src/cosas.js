//------TEXTOS:
this.text = this.add.text(x, y, "TEXTO", {
    fontSize: 20, // Size de la letra.
    fill: '#fff', // Color del texto.
    fontFamily: 'Pixeled', // Fuente.
    stroke: '#' + Math.floor(Math.random() * 16777215).toString(16), // Color de fondo aleatorio.
    strokeThickness: 5 // Size del color de fondo.
})
this.text.setText("TEXTO: " + algo);
//------BOTONES:
this.button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "TEXTO", {
    fontSize: 20, // Size de la letra.
    fill: '#fff', // Color del texto.
    fontFamily: 'Pixeled', // Fuente.
    stroke: '#' + Math.floor(Math.random() * 16777215).toString(16), // Color de fondo aleatorio.
    strokeThickness: 5 // Size del color de fondo.
}).setOrigin(0.5, 0.5).setInteractive();
//------TECLAS:
this.keys = scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.UP,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    interact: Phaser.Input.Keyboard.KeyCodes.E,
    esc: Phaser.Input.Keyboard.KeyCodes.ESC
});
if (Phaser.Input.Keyboard.JustUp(this.keys.UP)) { /*Cosas para hacer.*/ }
if (this.keys.A.isDown) { /*Cosas para hacer.*/ }
//------POOL DE OBJETOS POR GRUPO DE FISICAS:
this.ringsPoolSize = cantidad;
this.ringsPool = this.physics.add.group({ // Pool de enemigos.
    classType: Ring,
    maxSize: this.ringsPoolSize,
});
for (let i = 0; i < this.ringsPoolSize; i++) {
    let ring = this.ringsPool.get(this, 0, 0);
    ring.deActivate();
    /*ring.setActive(false).setVisible(false);
    ring.body.setAllowGravity(false);*/
}
//------EVENTOS TIEMPO:
this.time.addEvent({
    delay: 1000, // 1 segundo.
    callback: () => { /*Cosas para hacer*/ },
    callbackScope: this,
    loop: true // Para que se haga continuamente.
});
//------DELAY:
this.time.delayedCall(1000, method(), [], this); // Cuando pase el tiempo (1 seg) se hace el metodo, argumentos del metodo, callbackScope
//------TIMER:
this.timeToNewPowerUp = Phaser.Math.Between(6, 10); // Generamos un tiempo aleatorio para el siguiente enemigo.
this.time.addEvent({
    delay: 1000, // Cada 1 segundo se ejecuta lo del callback.
    callback: () => {
        this.timeToNewPowerUp--; // Disminuimos el tiempo.
        if (this.timeToNewPowerUp <= 0 && this.endGame < this.numPlayers && !this.winGame) { // Cuando toque y no sea final de partida.
            this.spawnPowerUp(Phaser.Math.Between(32, this.cameras.main.width - 32), -16) // Generamos el enemigo.
            this.timeToNewPowerUp = Phaser.Math.Between(6, 10); // Reseteamos con un tiempo aleatorio.
        }
    },
    callbackScope: this,
    loop: true // Para que se haga continuamente.
});
//------CAMARA SIGUE A JUGADOR:
this.camera = this.cameras.main.startFollow(objetivo, redondeaCoordenadasAPixeles/*(true)*/, lerpX, lerpY, offsetX, offsetY);
this.cameras.main.setFollowOffset(offsetX, offsetY); // Tambien esta este metodo para cambiar el offset pero si pones el lerpY en 0 se la pela lo que le digas en el offsetY de este metodo
//------OBJETO VA A OTRO:
this.physics.moveToObject(gameObject, destination, [speed], [maxTime]); // Para hacer que un objeto siga a otro.
//------TILEMAP:
const map = this.make.tilemap({ key: 'map', tileWidth: 8, tileHeigth: 8 }); // Creacion del tilemap.
const tileset = map.addTilesetImage('ground_ts', 'tileset'); // Metemos el tileset (lo primero mirar en el json, lo segundo la imagen del tileset del boot).
const groundLayer = map.createLayer('ground', tileset, 0, 0); // Se pueden meter layers, metemos la del suelo (lo primero el nombre de la capa de tiled).
groundLayer.setCollisionByProperty({ collides: true }); // Colision por propiedad, hay que ponerlo en Tiled.
this.physics.add.collider(objeto, groundLayer); // Colisiones de la layer del tilemap con lo que le digamos.
//------IMAGENES:
this.image.setCrop(x, y, width, heigth); // Luego se puede cambiar los dos ultimos numeros en partida. X e Y del punto superior izquierdo del area recortada.
this.setFlip(true / false); // Flipea la imagen, tambien hay especificas para eje X e Y.
//------MATH.RND:
Phaser.Math.RND.real() // Numero decimal entre 0 y 1.
Phaser.Math.RND.between(n, m) // Numero entero entre n y m.
Phaser.Math.RND.pick(array); // Numero aleatorio del array dado.
Phaser.Math.RND.shuffle(array); // Baraja un array
Phaser.Math.RND.realInRange(n, m); // Numero decimales entre n y m.
Phaser.math.RND.bool() // Booleano aleatorio.
Phaser.Math.RND.color(); // Genera un color aleatorio en formato hexadecimal.
Phaser.Math.RND.string(5); // Genera una cadena de 5 caracteres aleatorios.
Phaser.Math.between(n, m); // Me gusta mas este para generar numeros aleatorios entre n y m.
//------PONER SONIDOS:
this.pickSound.play({ volume: 0.2, loop: false }); // Sonido de coger cosas.
//------ACTIVATE Y DESACTIVATE:
activate(x, y, velX, velY)  // Activa el objeto, su visibilidad y modifica su posicion.
{
    this.setActive(true).setVisible(true).setX(x).setY(y); // Lo activamos.
    this.body.setAllowGravity(false).setVelocityX(velX).setVelocityY(velY); // Po si acaso.
}
deactivate()  // Desactiva el objeto, su visibilidad, modifica su posicion y para su movimiento.
{
    this.setActive(false).setVisible(false).setPosition(0, -50); // Lo desactivamos.
    this.body.setVelocity(0, 0); // Lo paramos.
}
//------RECTANUGULOS: se les pueden añadir fisicas y demas cosas, ver Circus.
this.rect = this.add.graphics();
this.rect.fillStyle(0x000000).fillRect(0, 0, this.cameras.main.width, this.cameras.main.height).setDepth(2).setAlpha(0);
//------GUARDADO LOCAL:
this.highScore = sessionStorage.getItem('highScoreData'); // Cargarlos.
sessionStorage.setItem('highScoreData', this.highScoreData); // Guardarlos.

