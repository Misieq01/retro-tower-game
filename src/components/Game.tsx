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
    dispatch(initializeGame({ boardSize: [20, 16], padSize: 5, initialSpeed: 1000, velocity: 0.1 }));
  }, [dispatch]);
  useEffect(() => {
    if (gameState === "PLAYING") {
      cloak.current = intervalTimer(() => dispatch(startClock()), 60);
    }
    if(gameState === 'LOST'){
      cloak.current.pause()
    }
  }, [dispatch, gameState, cloak]);
  const inputHandler = () => {
    dispatch(clickHandler(cloak.current));
  };
  return (
    <div className="game__container" onClick={inputHandler}>
      <div className="game__wrapper">
        <h1 className="game__title">Retro Tower</h1>
        {gameState === "INITIALIZED" || gameState === 'PLAYING' ? <h2 className="game__text">Click to start the game and place next layers</h2> : null}
        {gameState === "LOST" ? <h2 className="game__text">Ooops it's look like you lost</h2> : null}
        {gameState === "WON" ? <h2 className="game__text">Congratuliations you won</h2> : null}
      </div>
      <Board />
    </div>
  );
};
export default Game;
