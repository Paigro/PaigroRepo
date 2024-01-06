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
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 480 },
                debug: false
            }
        },
        scene: [Boot, Menu, Level],
        title: "Examen extraordinario 2021-2022 PVLI",
        version: "1.0.0"
    };

    new Phaser.Game(config);
};