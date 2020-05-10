import { InitialState, GameActionTypes, INITIALIZE_GAME, START_GAME, TICK_ACTION, CLICK_HANDLER } from "./types";

import { setUpBoard, bounce, setMoving, setPadPostion, trimPad, levelUpPad } from "../utils/gameControls";

const initialState: InitialState = {
  gameState: 'INITIALIZATION',
  matrix: [],
  boardSize: [0, 0],
  padSize: 0,
  velocity: 0,
  speed: 0,
  padRow: 0,
  direction: "right",
};

const reducer = (state = initialState, action: GameActionTypes): InitialState => {
  let { matrix, padSize, padRow, boardSize, direction, gameState,speed,velocity } = { ...state };
  switch (action.type) {
    case INITIALIZE_GAME:
      const [height, width] = action.payload.boardSize;
      return {
        ...state,
        gameState: 'PLAYING',
        matrix: setUpBoard(height, width, action.payload.padSize),
        boardSize: [height, width],
        padSize: action.payload.padSize,
        speed: action.payload.speed,
        velocity: action.payload.velocity,
        padRow: height - 1,
      };
    case START_GAME:
      return { ...state, gameState: "PLAYING" };
    case TICK_ACTION:
      const padPosition = setPadPostion(matrix, padRow, padSize);
      direction = bounce(padPosition, boardSize[1], direction);
      if (direction === "right") {
        matrix = setMoving(matrix, padRow, padPosition[1], padPosition[0]);
      } else if (direction === "left") {
        matrix = setMoving(matrix, padRow, padPosition[0] - 1, padPosition[1] - 1);
      }
      return { ...state, matrix: matrix, direction: direction };
    case CLICK_HANDLER:
      if (gameState === "PLAYING" && padRow >= 0) {
        if (padRow === state.boardSize[0] - 1) {
          //FIRST ROW ONLY
          action.payload.resume(speed - velocity)
          return { ...state, matrix: levelUpPad(padRow, matrix), padRow: padRow - 1,speed: speed - velocity };
        } else if (padRow === 0) {
          //LAST ROW ONLY
          ({ matrix, padSize } = trimPad(matrix, padRow, padRow + 1));
          return { ...state, matrix: matrix, gameState: padSize === 0 ? "LOST" : "WON", padSize: padSize };
        } else {
          // DEFAULT ACTION FOR ROW
          ({ matrix, padSize } = trimPad(matrix, padRow, padRow + 1));
          if(padSize === 0){
            return { ...state, matrix: matrix, padSize: padSize, gameState: "LOST" }
          }else {
            action.payload.resume(speed - velocity);
            return {
                ...state,
                padRow: padRow - 1,
                matrix: levelUpPad(padRow, matrix),
                padSize: padSize,
                speed: speed - velocity
              }
          }
        }
      }else{
        return {...state,gameState:'INITIALIZATION'}
      }
    default:
      return state;
  }
};

export default reducer;
