import { Overworld } from "./Overworld.js";

(function () {
  const overworldConfig = {
    element: document.querySelector(".game-container"),
  };
  // This is the main entry point for the game
  const overworld = new Overworld(overworldConfig);
  overworld.init();
})();
