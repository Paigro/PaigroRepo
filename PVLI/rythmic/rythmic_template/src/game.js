import Level from "./level.js";
import Boot from "./animInfo.js";
import Menu from "./menuP.js";

let config = {
  type: Phaser.AUTO,
  parent: "juego",
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    mode: Phaser.Scale.FIT,
    width: 768,
    height: 512,
    zoom: 1,
  },
  scene: [],
  fps: {
    target: 60
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
    checkCollision: {
      up: true,
      down: true,
      left: true,
      right: true,
    },
  },
  scene: [Boot, Menu, Level],
  title: "PVLI Extraordinaria 23/24",
  version: "template",
  transparent: false,
};

new Phaser.Game(config);
