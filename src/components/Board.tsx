import React from "react";
import Dot from "./Dot";
import { useSelector } from "react-redux";
import { getMatrix } from "../Store/selectors";

const renderMatrix = (matrix: Array<Array<number>> = []) => {
  return matrix.map((e: Array<number>, i: number) => (
    <div className="board__row" key={i}>
      {e.map((el: number, index: number) => (
        <React.Fragment key={i + "" + index}>
          <Dot size={20} spacing={2} className={el === 1 ? "dot-pad" : "dot-board"} />
        </React.Fragment>
      ))}
    </div>
  ));
};

const Board = () => {
  const matrix = useSelector(getMatrix, (left, right) => {
    return false;
  });
  const Matrix = renderMatrix(matrix);
  return <div className="board__container">{Matrix}</div>;
};
export default Board;
