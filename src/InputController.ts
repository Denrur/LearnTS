export type Direction = "up" | "down" | "left" | "right";

export class InputController {
  keys: Record<string, string>;
  heldDirections: Direction[];
  constructor() {
    this.heldDirections = [];
    this.keys = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    };
  }

  get inputDirection(): Direction {
    return this.heldDirections[0];
  }
  init() {
    console.log("InputController initialized", this);
    document.addEventListener("keydown", (e) => {
      const dir = this.keys[e.code] as Direction;
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener("keyup", (e) => {
      const dir = this.keys[e.code] as Direction;
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
  isKeyDown(key: string) {
    return this.keys[key] || false;
  }
}
