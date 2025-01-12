import { GameObject } from "./GameObject.js";

type SpriteConfig = {
  animations?: Record<string, Array<[number, number]>>;
  currentAnimation?: string;
  src: string;
  gameObject: GameObject;
};

export class Sprite {
  private isInitialized: boolean = false;
  animations: Record<string, Array<[number, number]>>;
  currentAnimation: string;
  currentAnimationFrame: number;
  image: HTMLImageElement;
  isLoaded: boolean = false;
  gameObject: GameObject;
  shadow: HTMLImageElement;
  isShadowLoaded: boolean = false;
  useShadow: boolean;

  constructor(config: SpriteConfig) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.useShadow = true;
    this.shadow = new Image();
    if (this.useShadow) {
      this.shadow.src = "./images/characters/shadow.png";
      this.shadow.onload = () => {
        this.isShadowLoaded = true;
      };
    }

    this.animations = config.animations || {
      idleDown: [[0, 0]],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    this.gameObject = config.gameObject;
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.gameObject.init();
      this.init();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = this.gameObject.x - 7;
    const y = this.gameObject.y - 18;
    if (this.isShadowLoaded) {
      ctx.drawImage(this.shadow, x, y);
    }
    if (this.isLoaded) {
      ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
    }
  }

  init() {
    console.log("Sprite initialized", this);
  }
}
