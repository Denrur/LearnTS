import { Sprite } from "./Sprite.js";

export type GameObjectConfig = {
  x: number;
  y: number;
  src?: string;
  animations?: Record<string, Array<[number, number]>>;
  currentAnimation?: string;
  direction?: "down" | "up" | "left" | "right";
  isPlayerControlled?: boolean;
};

export class GameObject {
  x: number;
  y: number;
  sprite: Sprite;
  direction: "down" | "up" | "left" | "right";
  constructor(config: GameObjectConfig) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./images/characters/people/hero.png",
    });
  }

  update(state: object) {
    if (Object.keys(state).length > 0) {
      console.log("GameObject state", state);
    }
  }

  init() {
    console.log("GameObject initialized!", this);
  }
}
