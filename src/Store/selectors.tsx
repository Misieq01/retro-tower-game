import { InitialState } from "./types";

export const getGameState = (state: InitialState) => state.gameState;
export const getGameSettings = (state: InitialState) => {
  return {
    boardSize: state.boardSize,
    padSize: state.padSize,
    initialSpeed: state.initialSpeed,
    velocity: state.velocity,
  };
};
export const getMatrix = (state:InitialState) => state.matrix
export const getControlData = (state:InitialState) => {
  return {
    matrix: state.matrix,
    padSize: state.padSize,
    padRow: state.padRow,
    speed: state.speed,
    boundries: [0,state.boardSize[1] - 1],
    velocity: state.velocity
  }
}
