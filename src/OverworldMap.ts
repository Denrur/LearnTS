import { GameObject } from "./GameObject.js";
import { withGrid } from "./utils.js";
import { Character } from "./Character.js";

type OverworldMapConfig = {
  gameObjects: Record<string, GameObject>;
  lowerSrc: string;
  upperSrc: string;
};

export class OverworldMap {
  gameObjects: Record<string, GameObject>;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  isInitialized: boolean = false;
  isUpperImageLoaded: boolean = false;
  isLowerImageLoaded: boolean = false;
  constructor(config: OverworldMapConfig) {
    this.gameObjects = config.gameObjects || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    if (!this.isInitialized) {
      this.init();
      this.isInitialized = true;
    }
  }
  drawLowerImage(ctx: CanvasRenderingContext2D) {
    if (!this.isLowerImageLoaded) {
      console.log("Drawing lower image", this.lowerImage);
      this.isLowerImageLoaded = true;
    }
    ctx.drawImage(this.lowerImage, 0, 0);
    // }
  }
  drawUpperImage(ctx: CanvasRenderingContext2D) {
    if (!this.isUpperImageLoaded) {
      console.log("Drawing upper image", this.upperImage);
      this.isUpperImageLoaded = true;
    }
    ctx.drawImage(this.upperImage, 0, 0);
    // }
  }

  init() {
    console.log("OverworldMap initialized", this);
  }
}

export const overworldMaps: Record<string, OverworldMapConfig> = {
  DemoRoom: {
    lowerSrc: "./images/maps/DemoLower.png",
    upperSrc: "./images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Character({
        x: withGrid(5),
        y: withGrid(6),
        isPlayerControlled: true,
      }),
      npcA: new Character({
        x: withGrid(7),
        y: withGrid(9),
        src: "./images/characters/people/npc1.png",
      }),
    },
  },
  Kitchen: {
    lowerSrc: "./images/maps/KitchenLower.png",
    upperSrc: "./images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Character({ x: withGrid(5), y: withGrid(6) }),
      npcA: new Character({
        x: withGrid(7),
        y: withGrid(9),
        src: "./images/characters/people/npc1.png",
      }),
      npB: new Character({
        x: withGrid(3),
        y: withGrid(9),
        src: "./images/characters/people/npc2.png",
      }),
    },
  },
};
