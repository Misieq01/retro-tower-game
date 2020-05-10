const drawPad = (firstDot: number, secondDot: number): number => {
  return firstDot === secondDot && firstDot === 1 ? 1 : 0;
};

const checkPadSize = (row: Array<number>): number => {
  let padSize = 0;
  row.forEach((e) => {
    padSize = e === 1 ? padSize + 1 : padSize;
  });
  return padSize;
};

export const setUpBoard = (height: number, width: number, padSize: number): Array<Array<number>> => {
  const board = Array(height);
  for (let i = 0; i < height; i++) {
    board[i] = Array(width);
    for (let j = 0; j < width; j++) {
      if (j < padSize && i === height - 1) {
        board[i][j] = 1;
      } else {
        board[i][j] = 0;
      }
    }
  }
  return board;
};

export const bounce = (padPosition: Array<number>, width: number, direction: string): string => {
  if (padPosition[0] === 0) {
    return "right";
  } else if (padPosition[1] === width) {
    return "left";
  } else {
    return direction;
  }
};

export const setMoving = (
  matrix: Array<Array<number>>,
  padRow: number,
  add: number,
  remove: number
): Array<Array<number>> => {
  matrix[padRow][remove] = 0;
  matrix[padRow][add] = 1;
  return matrix;
};

export const setPadPostion = (matrix: Array<Array<number>>, padRow: number, padSize: number): Array<number> => {
  return [matrix[padRow].indexOf(1), matrix[padRow].indexOf(1) + padSize];
};

export const trimPad = (
  matrix: Array<Array<number>>,
  currentRow: number,
  previousRow: number
): { matrix: Array<Array<number>>; padSize: number } => {
  const newMatrix = [...matrix];
  newMatrix[currentRow] = newMatrix[currentRow].map((e, i) => {
    const test = drawPad(e, newMatrix[previousRow][i]);
    return test;
  });
  const padSize = checkPadSize(newMatrix[currentRow]);
  return { matrix: padSize === 0 ? matrix : newMatrix, padSize };
};

export const levelUpPad = (currentRow: number, matrix: Array<Array<number>>): Array<Array<number>> => {
  matrix[currentRow].forEach((e,i)=>{
    if(e === 1){
      matrix[currentRow - 1][i] = 1
    }
  })
  return matrix
};
