import { GameObject, GameObjectConfig } from "./GameObject.js";
import { withGrid } from "./utils.js";
import { Direction } from "./InputController.js";

export class Character extends GameObject {
  movingProgressLeft: number;
  direcionUpdate: {
    up: () => void;
    down: () => void;
    left: () => void;
    right: () => void;
  };
  isPlayerControlled: boolean;
  constructor(config: GameObjectConfig) {
    super(config);
    this.movingProgressLeft = withGrid(0);
    this.isPlayerControlled = config.isPlayerControlled || false;

    this.direcionUpdate = {
      up: () => {
        this.y -= 1;
      },
      down: () => {
        this.y += 1;
      },
      left: () => {
        this.x -= 1;
      },
      right: () => {
        this.x += 1;
      },
    };
  }

  update(state: { direction: Direction }): void {
    if (state.direction) {
      console.log("Character state", state);
    }
    this.updatePosition();
    if (
      this.isPlayerControlled &&
      this.movingProgressLeft === 0 &&
      state.direction
    ) {
      this.direction = state.direction;
      this.movingProgressLeft = withGrid(1);
    }
  }
  updatePosition(): void {
    if (this.movingProgressLeft > 0) {
      this.movingProgressLeft -= 1;
      this.direcionUpdate[this.direction]();
    }
  }
}
