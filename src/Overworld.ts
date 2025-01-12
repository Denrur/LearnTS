import { OverworldMap, overworldMaps } from "./OverworldMap.js";
import { InputController } from "./InputController.js";

export type OverworldConfig = {
  element: Element | null;
};

export class Overworld {
  private isInitialized: boolean = false;
  element: Element | null;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  map: OverworldMap | null = null;
  inputController: InputController | null = null;

  constructor(config: OverworldConfig) {
    this.element = config.element;
    if (!this.element) throw new Error("Element not found");
    this.canvas = this.element.querySelector(".game-canvas");
    if (!this.canvas) throw new Error("Canvas not found");
    this.ctx = this.canvas.getContext("2d");
  }

  startGameLoop() {
    const step = () => {
      this.update();
      this.render();
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  update() {
    Object.values(this.map!.gameObjects).forEach((gameObject) => {
      gameObject.update({
        direction: this.inputController!.inputDirection,
      });
    });
  }

  render() {
    this.ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    this.map!.drawLowerImage(this.ctx!);
    Object.values(this.map!.gameObjects).forEach((gameObject) => {
      gameObject.sprite.draw(this.ctx!);
    });
    this.map!.drawUpperImage(this.ctx!);
  }

  init() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      console.log("Overworld initialized", this);
    }
    this.map = new OverworldMap(overworldMaps.DemoRoom);
    this.inputController = new InputController();
    this.inputController.init();
    if (this.ctx && this.map) {
      this.startGameLoop();
    } else {
      throw new Error(
        `Initialization failed: ctx ${this.ctx} or map ${this.map} is null`
      );
    }
  }
}
