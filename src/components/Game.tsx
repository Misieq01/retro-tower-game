import React, { useEffect, useRef } from "react";
import Board from "./Board";
import { initializeGame } from "../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import { startClock, clickHandler } from "../Store/actions";
import { getGameState } from "../Store/selectors";
import { intervalTimer } from "../utils/clock";

const Game = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(getGameState);
  let cloak = useRef(null);
  
  useEffect(() => {
    if (gameState === 'INITIALIZATION'){
      dispatch(initializeGame({ boardSize: [20, 15], padSize: 5, initialSpeed: 1000, velocity: 0.1 }));
    }
    if (gameState === "PLAYING") {
      cloak.current = intervalTimer(() => dispatch(startClock()),100);
      return;
    }
    if (gameState === "LOST" || gameState === 'WON') {
      cloak.current.pause();
      return;
    }
  }, [dispatch, gameState, cloak]);


  const inputHandler = () => {
    dispatch(clickHandler(cloak.current));
  };


  return (
    <div className="game__container" onClick={inputHandler}>
      <div className="game__wrapper">
        <h1 className="game__title">Retro Tower</h1>
        {gameState === "PLAYING" ? (
          <h2 className="game__text">Click to place next layers</h2>
        ) : null}
        {gameState === "LOST" ? <h2 className="game__text">Ooops it's look like you lost</h2> : null}
        {gameState === "WON" ? <h2 className="game__text">Congratuliations you won</h2> : null}
        {gameState === 'WON' || gameState === 'LOST' ? <h2 className="game__restart-text">Click and try again ;)</h2> : null}
      </div>
      <Board />
    </div>
  );
};
export default Game;
