import {
  InitialState,
  GameActionTypes,
  INITIALIZE_GAME,
  START_GAME,
  UPDATE_MATRIX,
  TICK_ACTION,
  CLICK_HANDLER,
} from "./types";

const initialState: InitialState = {
  //game states:
  //BEFORE_INITIALIZATION
  //INITIALIZED
  //PLAYING
  //WON
  //LOST
  gameState: "BEFORE_INITIALIZATION",
  matrix: [],
  boardSize: [0, 0],
  padSize: 0,
  initialSpeed: 0,
  velocity: 0,
  speed: 0,
  padRow: 0,
  direction: "right",
};

const reducer = (state = initialState, action: GameActionTypes): InitialState => {
  let { matrix, padSize, padRow, boardSize, direction, gameState } = { ...state };
  switch (action.type) {
    case INITIALIZE_GAME:
      const [height, width] = action.payload.boardSize;
      const board = Array(height);
      for (let i = 0; i < height; i++) {
        board[i] = Array(width);
        for (let j = 0; j < width; j++) {
          if (j < action.payload.padSize && i === height - 1) {
            board[i][j] = 1;
          } else {
            board[i][j] = 0;
          }
        }
      }
      return {
        ...state,
        gameState: "INITIALIZED",
        matrix: board,
        boardSize: [height, width],
        padSize: action.payload.padSize,
        initialSpeed: action.payload.initialSpeed,
        velocity: action.payload.velocity,
        padRow: height - 1,
      };
    case START_GAME:
      return { ...state, gameState: "PLAYING" };
    case TICK_ACTION:
      const movingRow = matrix[padRow];
      const padPositon = [movingRow.indexOf(1), movingRow.indexOf(1) + padSize];
      if (padPositon[0] === 0) {
        direction = "right";
      } else if (padPositon[1] === boardSize[1]) {
        direction = "left";
      }
      if (direction === "right") {
        matrix[padRow][padPositon[0]] = 0;
        matrix[padRow][padPositon[1]] = 1;
        // if()
      } else if (direction === "left") {
        matrix[padRow][padPositon[1] - 1] = 0;
        matrix[padRow][padPositon[0] - 1] = 1;
      }
      return { ...state, matrix: matrix, direction: direction };
    case UPDATE_MATRIX:
      return { ...state, matrix: action.payload };
    case CLICK_HANDLER:
      if (gameState === "INITIALIZED") {
        return { ...state, gameState: "PLAYING" };
      }
      if (gameState === "PLAYING" && padRow > 0) {
        if (padRow === state.boardSize[0] - 1) {
          matrix[padRow].forEach((e, i) => {
            if (e === 1) {
              matrix[padRow - 1][i] = 1;
            }
          });
        } else {
          padSize = 0
          matrix[padRow].forEach((e, i) => {
            if ((matrix[padRow][i] === matrix[padRow + 1][i])) {
              if(e === 1){
                matrix[padRow - 1][i] = 1
                padSize++
              }
            }else{
              matrix[padRow][i] = 0
            }
          });
        }
        if(padSize === 0 && gameState === 'PLAYING'){
          return {...state,gameState: 'LOST'}
        }
        return { ...state, padRow: padRow - 1, matrix: matrix,padSize: padSize };
      }else if(padRow === 0 && gameState==='PLAYING'){
        return {...state,gameState: 'WON'}
      }
      return state
    default:
      return state;
  }
};

export default reducer;
