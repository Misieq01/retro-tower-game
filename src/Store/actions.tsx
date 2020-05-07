import { GameActionTypes, Settings,Cloak, INITIALIZE_GAME,START_GAME,UPDATE_MATRIX,TICK_ACTION,CLICK_HANDLER } from "./types";

export const initializeGame = (settings: Settings): GameActionTypes => {
  return {
    type: INITIALIZE_GAME,
    payload: settings,
  };
};

export const startGame = (): GameActionTypes => {
  return {
    type: START_GAME
  }
}
export const startClock = (): GameActionTypes => {
  return {
    type: TICK_ACTION
  }
}
export const clickHandler = (cloak:Cloak): GameActionTypes => {
  return {
    type: CLICK_HANDLER,
    payload: cloak
  }
}
export const updateMatrix = (matrix: Array<Array<number>>): GameActionTypes => {
  return {
    type: UPDATE_MATRIX,
    payload: matrix
  }
}
