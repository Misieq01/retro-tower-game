export const INITIALIZE_GAME = "INITIALIZE_GAME";
export const START_GAME = "START_GAME";
export const TICK_ACTION = "TICK_ACTION";
export const CLICK_HANDLER = "CLICK_HANDLER";
  //BEFORE_INITIALIZATION
  //INITIALIZED
  //PLAYING
  //WON
  //LOST
export interface InitialState {
  gameState: 'LOST' | 'WON' | 'PLAYING' |'INITIALIZATION';
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


export type GameActionTypes = InitializeGameAction | StartGameAction | TickAction | ClickHandlerAction;
