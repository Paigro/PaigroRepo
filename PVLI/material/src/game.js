import Boot from "./boot.js";
import Menu from "./menu.js";
import Level from "./level.js";

window.onload = () => {

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [Boot, Menu, Level]
    };

    new Phaser.Game(config);
};