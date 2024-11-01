import Level from "./level.js";
import Boot from "./boot.js";
import Menu from "./menuP.js";

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        mode: Phaser.Scale.FIT,
        min: {
            width: 384,
            height: 192
        },
        max: {
            width: 768,
            height: 384
        },
        zoom: 2
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Boot, Menu, Level],
    title: "Examen Extraordinaria? 2023-2024 PVLI",
    version: "1.0.0"
};

new Phaser.Game(config);