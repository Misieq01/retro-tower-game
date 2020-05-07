export const INITIALIZE_GAME = "INITIALIZE_GAME";
export const START_GAME = "START_GAME";
export const TICK_ACTION = "TICK_ACTION";
export const UPDATE_MATRIX = "UPDATE_MATRIX";
export const CLICK_HANDLER = "CLICK_HANDLER";

export interface InitialState {
  gameState: string;
  matrix: Array<Array<number>>;
  boardSize: Array<number>;
  padSize: number ;
  initialSpeed: number ;
  speed: number;
  velocity: number ;
  padRow: number;
  direction: string
}
export interface Settings {
  boardSize: Array<number>;
  padSize: number;
  initialSpeed: number;
  velocity: number;
}

export interface Cloak {
    resume: () => void;
    pause: () => void;
}

interface InitializeGameAction {
  type: typeof INITIALIZE_GAME;
  payload: Settings;
}
interface StartGameAction{
  type: typeof START_GAME;
}
interface TickAction{
  type: typeof TICK_ACTION;
}
interface ClickHandlerAction{
  type: typeof CLICK_HANDLER;
  payload: Cloak
}
interface UpdateMatrixAction{
  type: typeof UPDATE_MATRIX;
  payload: Array<Array<number>>
}

export type GameActionTypes = InitializeGameAction | StartGameAction | UpdateMatrixAction | TickAction | ClickHandlerAction;
